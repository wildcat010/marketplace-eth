pragma solidity >=0.7.0 <0.9.0;

contract CourseMarketplace {
    enum State{
        Purchased,
        Activated,
        Desactivated
    }

    struct Course{
        uint id;
        uint price;
        bytes32 proof;
        address owner;
        State state;
    }
}