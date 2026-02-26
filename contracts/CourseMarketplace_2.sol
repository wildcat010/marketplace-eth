// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

contract CourseMarketplace is Ownable, ReentrancyGuard {

    enum State { Purchased, Activated, Deactivated }

    struct Course {
        uint id;
        uint price;
        bytes32 proof;
        address owner;
        bytes16 courseId;
        State state;
    }

    uint public totalOwnedCourses;
    mapping(bytes32 => Course) private ownedCourses; // courseHash -> Course
    mapping(uint => bytes32) private ownedCourseHash; // id -> courseHash
    mapping(bytes32 => bytes32[]) private emailToCourses; // emailHash -> array of courseHashes
    mapping(bytes32 => bool) private emailExists; // tracks unique emails

    bool public isStopped;

    // EVENTS
    event CoursePurchased(address indexed buyer, bytes16 indexed courseId, uint price);
    event ContractStopped(address indexed by);
    event ContractResumed(address indexed by);
    event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);
    event Withdraw(address indexed to, uint amount);
    event Shutdown(address indexed owner, uint amount);

    modifier contractActive() {
        require(!isStopped, "Contract is stopped");
        _;
    }

    error HasOwnership();

    constructor() {}

    // =========================
    // CONTRACT CONTROL
    // =========================
    function stopContract() external onlyOwner {
        isStopped = true;
        emit ContractStopped(msg.sender);
    }

    function resumeContract() external onlyOwner {
        isStopped = false;
        emit ContractResumed(msg.sender);
    }

    // =========================
    // COURSE PURCHASE
    // =========================
    function purchaseCourse(bytes16 courseId, bytes32 proof, bytes32 emailHash)
        external
        payable
        contractActive
    {
        bytes32 courseHash = keccak256(abi.encodePacked(courseId, emailHash, msg.sender));

        if (ownedCourses[courseHash].owner == msg.sender) {
            revert HasOwnership();
        }

        uint id = totalOwnedCourses++;
        ownedCourseHash[id] = courseHash;

        ownedCourses[courseHash] = Course({
            id: id,
            price: msg.value,
            proof: proof,
            owner: msg.sender,
            courseId: courseId,
            state: State.Purchased
        });

        emailToCourses[emailHash].push(courseHash);

        // track unique emails
        if (!emailExists[emailHash]) {
            emailExists[emailHash] = true;
        }

        emit CoursePurchased(msg.sender, courseId, msg.value);
    }

    // =========================
    // WITHDRAW & SHUTDOWN
    // =========================
    function withdraw(uint amount) external onlyOwner nonReentrant {
        require(amount <= address(this).balance, "Insufficient balance");
        (bool success, ) = owner().call{value: amount}("");
        require(success, "Transfer failed");
        emit Withdraw(owner(), amount);
    }

    function withdrawAllBalance() external onlyOwner nonReentrant {
        uint balance = address(this).balance;
        require(balance > 0, "No balance to withdraw");
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
        emit Withdraw(owner(), balance);
    }

    function shutdown() external onlyOwner nonReentrant {
        isStopped = true;
        uint balance = address(this).balance;
        (bool success, ) = owner().call{value: balance}("");
        require(success, "Transfer failed");
        emit Shutdown(owner(), balance);
    }

    // =========================
    // DATA RETRIEVAL
    // =========================
    function getOwnedCourseHash(uint index) external view returns(bytes32) {
        return ownedCourseHash[index];
    }

    function getOwnedCourse(bytes32 hash) external view returns(Course memory) {
        return ownedCourses[hash];
    }

    function getCoursesByEmail(bytes32 emailHash) external view returns(Course[] memory) {
        bytes32[] storage hashes = emailToCourses[emailHash];
        Course[] memory courses = new Course[](hashes.length);

        for (uint i = 0; i < hashes.length; i++) {
            courses[i] = ownedCourses[hashes[i]];
        }

        return courses;
    }

    function hasCourseOwnership(bytes32 courseHash) external view returns(bool) {
        return ownedCourses[courseHash].owner == msg.sender;
    }
}