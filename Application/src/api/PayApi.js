const url = require("./IpAddress");

export function fetchEmployeePay(id){
    const uri = url.url+"/employeepay?ID="+id;

    return fetch(uri,{
        method:"GET"
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

export function fetchEmployerPay(id){
    const uri = url.url+"/employerpay?ID="+id;

    return fetch(uri,{
        method:"GET"
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

export default {fetchEmployeePay,fetchEmployerPay};