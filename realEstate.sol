//SPDX-License-Indentifer: MIT;
pragma solidity^0.8.17;

contract realEstate{
    struct Property{
        uint256 propertyPrice;
        address owner;
        string name;
        string description;
        string location;
        bool forSale;
    }
    mapping(uint256 => Property) properties;
    uint256[] propertyIds;
    event propertySold(uint256 _propertyId);

    function listProperty(uint256 _propertyId, uint256 _propertyPrice, string calldata _name, string calldata _description, string calldata _location) public{
        Property memory newProperty = Property({
            propertyPrice : _propertyPrice,
            owner : msg.sender,
            name : _name,
            description : _description,
            location : _location,
            forSale : true
        });

        properties[_propertyId] = newProperty;
        propertyIds.push(_propertyId);
    }

    function buyProperty(uint256 _propertyId) public payable{
        Property storage property = properties[_propertyId];
        require(property.forSale,"Not for sale");
        require(property.propertyPrice <= msg.value,"Insufficient funds");
        property.forSale = false;
        property.owner = msg.sender;
        // payable(msg.sender).transfer(msg.value);
        (bool sent, bytes memory data) = payable(msg.sender).call{value:msg.value}('');
        require(sent,"Failed to send ether");
        emit propertySold(_propertyId);
    }

    function propertyListed() public view returns(uint256){
        return propertyIds.length;
    }

    function ownerOfProperty(uint256 _propertyId) public view returns(address){
         Property storage property = properties[_propertyId];
         return property.owner;
    }
}