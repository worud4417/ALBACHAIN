pragma solidity >=0.4.0 <=0.6.0;

contract AlbaChain{
    
    struct Recode{
        address employerAddress;
        address employeeAddress;
        uint256 startDate;
    }
    
    Recode[] private recodes;
    
    function setRecode(address _employerAdderss, address _employeeAddress, uint256 startDate) public {
        recodes.push(Recode(_employerAdderss,_employeeAddress,startDate));
    }
    
    function getEmployeeRecode(address _employeeAddress) public view returns(address[] memory, uint256[] memory){
        address[] memory term1 = new address[](recodes.length);
        uint256[] memory term2 = new uint256[](recodes.length);
        
        for(uint i =0;i<recodes.length;i++){
            if(recodes[i].employeeAddress == _employeeAddress){
                term1[i] = recodes[i].employerAddress;
                term2[i] = recodes[i].startDate;
            }
        }
        
        return (term1,term2);
    }
    
    function getEmployerRecode(address _employerAddress) public view returns(address[] memory, uint256[] memory){
        address[] memory term1 = new address[](recodes.length);
        uint256[] memory term2 = new uint256[](recodes.length);
        
        for(uint i =0;i<recodes.length;i++){
            if(recodes[i].employerAddress == _employerAddress){
                term1[i] = recodes[i].employeeAddress;
                term2[i] = recodes[i].startDate;
            }
        }
        
        return (term1,term2);
    }
}
