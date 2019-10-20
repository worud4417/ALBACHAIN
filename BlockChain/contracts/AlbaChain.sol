pragma solidity >=0.4.0 <=0.6.0;

import "./Ownable.sol";

contract AlbaChain is Ownable{
    
    struct Recode{
        address employerAddress;
        address employeeAddress;
        uint256 startDate;
    }
    
    mapping (address=>uint256) employeeCounter;
    mapping (address=>uint256) employerCounter;
    
    Recode[] private recodes;
    
    function setRecord(address _employerAddress, address _employeeAddress, uint256 startDate) public onlyOwner{
        recodes.push(Recode(_employerAddress,_employeeAddress,startDate));
        employerCounter[_employerAddress]++;
        employeeCounter[_employeeAddress]++;
    }
    
    function getEmployeeRecord(address _employeeAddress) public view returns(address[] memory, uint256[] memory){
        address[] memory term1 = new address[](employeeCounter[_employeeAddress]);
        uint256[] memory term2 = new uint256[](employeeCounter[_employeeAddress]);
        
        for(uint i =0;i<employeeCounter[_employeeAddress];i++){
            if(recodes[i].employeeAddress == _employeeAddress){
                term1[i] = recodes[i].employerAddress;
                term2[i] = recodes[i].startDate;
            }
        }
        
        return (term1,term2);
    }
    
    function getEmployerRecord(address _employerAddress) public view returns(address[] memory, uint256[] memory){
        address[] memory term1 = new address[](employerCounter[_employerAddress]);
        uint256[] memory term2 = new uint256[](employerCounter[_employerAddress]);
        
        for(uint i =0;i<employerCounter[_employerAddress];i++){
            if(recodes[i].employerAddress == _employerAddress){
                term1[i] = recodes[i].employeeAddress;
                term2[i] = recodes[i].startDate;
            }
        }
        
        return (term1,term2);
    }
}
