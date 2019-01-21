pragma solidity ^0.4.24;

// Contract source: https://github.com/HydroBlockchain/ERC-1484/blob/master/contracts/AddressSet/AddressSet.sol
library AddressSet {
    struct Set {
        address[] members;
        mapping(address => uint) memberIndices;
    }

    function insert(Set storage self, address other) internal {
        if (!contains(self, other)) {
            self.memberIndices[other] = self.members.push(other);
        }
    }

    function remove(Set storage self, address other) internal {
        if (contains(self, other)) {
            // replace other with the last element
            self.members[self.memberIndices[other] - 1] = self.members[length(self) - 1];
            // reflect this change in the indices
            self.memberIndices[self.members[self.memberIndices[other] - 1]] = self.memberIndices[other];
            delete self.memberIndices[other];
            // remove the last element
            self.members.pop();
        }
    }

    function contains(Set storage self, address other) internal view returns (bool) {
        return ( // solium-disable-line operator-whitespace
            self.memberIndices[other] > 0 && 
            self.members.length >= self.memberIndices[other] && 
            self.members[self.memberIndices[other] - 1] == other
        );
    }

    function length(Set storage self) internal view returns (uint) {
        return self.members.length;
    }
}