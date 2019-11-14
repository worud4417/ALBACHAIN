pragma solidity  >=0.4.24 <=0.5.6;

import "./Ownable.sol";

contract AlbaChain is Ownable{
    
    struct Record{
        uint32 pay;
        uint256 employer;
        uint256 employee;
        uint256 startDate;
        uint256 endDate;
    }
    
    mapping (uint256 => uint256) employeeCounter;
    mapping (uint256 => uint256) employerCounter;
    
    Record[] private records;
    
    function setRecord(uint256 _employer, uint256 _employee, uint256 _startDate, uint256 _endDate, uint32 _pay) public onlyOwner{
        records.push(Record(_pay,_employer,_employee,_startDate,_endDate));
        employerCounter[_employer]++;
        employeeCounter[_employee]++;
    }
    
    function getCounter(uint256 user) view public returns(uint256){
        uint256 a = employeeCounter[user];
        return (a);
    }
    
    function getAllRecord() public view returns(uint32[] memory,uint256[] memory, uint256[] memory,uint256[] memory,uint256[] memory){
        uint32[] memory term1 = new uint32[](records.length);
        uint256[] memory term2 = new uint256[](records.length);
        uint256[] memory term3 = new uint256[](records.length);
        uint256[] memory term4 = new uint256[](records.length);
        uint256[] memory term5 = new uint256[](records.length);
        
        for(uint i =0;i<records.length;i++){
                term1[i] = records[i].pay;
                term2[i] = records[i].employer;
                term3[i] = records[i].startDate;
                term4[i] = records[i].endDate;
                term5[i] = records[i].employee;
        }
        return (term1,term2,term3,term4,term5);
    }
    
    function getEmployeeRecord(uint256 _employee) public view returns(uint32[] memory,uint256[] memory, uint256[] memory,uint256[] memory){
        uint32[] memory term1 = new uint32[](employeeCounter[records.length]);
        uint256[] memory term2 = new uint256[](employeeCounter[records.length]);
        uint256[] memory term3 = new uint256[](employeeCounter[records.length]);
        uint256[] memory term4 = new uint256[](employeeCounter[records.length]);
        
        for(uint i =0;i<records.length;i++){
            if(records[i].employee == _employee){
                term1[i] = records[i].pay;
                term2[i] = records[i].employer;
                term3[i] = records[i].startDate;
                term4[i] = records[i].endDate;
            }
        }
        
        return (term1,term2,term3,term4);
    }
    
    function getEmployerRecord(uint256 _employer) public view returns(uint32[] memory, uint256[] memory, uint256[] memory, uint256[] memory){
        uint32[] memory term1 = new uint32[](records.length);
        uint256[] memory term2 = new uint256[](records.length);
        uint256[] memory term3 = new uint256[](records.length);
        uint256[] memory term4 = new uint256[](records.length);
        
        for(uint i =0;i<records.length;i++){
            if(records[i].employer == _employer){
                term1[i] = records[i].pay;
                term2[i] = records[i].employee;
                term3[i] = records[i].startDate;
                term4[i] = records[i].endDate;
            }
        }
        
        return (term1,term2,term3,term4);
    }
    
// ---------
// Dont accept ETH;
// ---------
    function () external payable { 
        revert();
    }
}
