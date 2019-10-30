const url = require("./IpAddress");

export function fetchGetEmployeeRecode(id){
    let uri = url.url+"/employeecareerlookup?ID="+id;
    
    return fetch(uri,{
        method:"GET"
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

export default {fetchGetEmployeeRecode};