// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

contract CourseMarketplace {

  enum State {
    Purchased,
    Activated,
    Deactivated
  }

  struct Course {
    uint id; // 32
    uint price; // 32
    bytes32 proof; // 32
    address owner; // 20
    bytes16 courseId; // 16
  }

  // number of all courses + id of the course
  uint public totalOwnedCourses;

  // mapping of courseHash to Course data
  mapping(bytes32 => Course) private ownedCourses;

  // mapping of courseID to courseHash
  mapping(uint => bytes32) private ownedCourseHash;

  mapping(bytes32 => bytes32[]) private emailToCourses;

  bytes32[] private allEmailHashes;

  address payable public owner;

  /// The course has been purchased
  error hasOwnership();

  modifier restricted(address newOwner) {
        require(msg.sender == owner, "Only manager allowed");
        require(owner != newOwner, "Same address");
        _;
    }

  constructor(){
    owner = payable(msg.sender);
  }

  function purchaseCourse(
    bytes16 courseId, // 0x00000000000000000000000000003130
    bytes32 proof, // 0x0000000000000000000000000000313000000000000000000000000000003130
    bytes32 emailHash
  )
    external
    payable
  {

    bytes32 courseHash = keccak256(abi.encodePacked(courseId, emailHash, msg.sender));

    if(hasCourseOwnership(courseHash)){
        revert hasOwnership();
    } 


    uint id = totalOwnedCourses++;

    ownedCourseHash[id] = courseHash;
    ownedCourses[courseHash] = Course({
      id: id,
      price: msg.value,
      proof: proof,
      owner: msg.sender,
      courseId: courseId
    });

    // Map emailHash to purchased course
    emailToCourses[emailHash].push(courseHash);

    // Optional: track all email hashes (only if new)
    if(emailToCourses[emailHash].length == 1) {
      allEmailHashes.push(emailHash);
    }
  }

  function getOwnedCourseHash(uint index) external view returns(bytes32){
    return ownedCourseHash[index];
  }

  function getOwnedCourse(bytes32 hash) external view returns(Course memory){
    return ownedCourses[hash];
  }

  function hasCourseOwnership(bytes32 hash) internal view returns(bool){
    return(ownedCourses[hash].owner == msg.sender);
    }  

  function setContractOwner(address newOwner) external restricted(newOwner){
    owner = payable(newOwner);
  } 

  function getCoursesByEmail(bytes32 emailHash) external view returns (Course[] memory) {
    bytes32[] storage hashes = emailToCourses[emailHash];
    Course[] memory courses = new Course[](hashes.length);

    for (uint i = 0; i < hashes.length; i++) {
        courses[i] = ownedCourses[hashes[i]];
    }

    return courses;
  }
}