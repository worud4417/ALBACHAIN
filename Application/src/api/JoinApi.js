const url = require("./IpAddress");

export function fetchJoinEmployee(id,password,name,callnumber,socialsecurity){
    const uri = url.url+"/employeejoin";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id,
            PASSWORD:password,
            NAME:name,
            CALLNUMBER:callnumber,
            SOCIALSECURITY:socialsecurity
        })
    }).then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson;
    }).catch((error)=>{
        if(error.message == "Network request failed"){
            alert("네트워크 오류");
        }
        return {error:false};
    })
}

export function fetchJoinEmployer(id,password,name,callnumber,registration,address){
    const uri = url.url+"/employerjoin";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id,
            PASSWORD:password,
            NAME:name,
            CALLNUMBER:callnumber,
            REGISTRATION:registration,
            ADDRESS:address
        })
    }).then((response)=>response.json())
    .then((responseJson)=>{
        return responseJson
    }).catch((error)=>{
        if(error.message == "Network request failed"){
            alert("네트워크 오류");
        }
        return {error:false};
    })
}

export default {fetchJoinEmployee,fetchJoinEmployer};