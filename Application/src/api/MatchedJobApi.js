const url = require("./IpAddress");

export function fetchMatchRequest(_id,ID){
    const uri = url.url+"/employeejobsearch";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            _id:_id,
            ID:ID
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

export function fetchMatchingEmployee(id){
    const uri = url.url + "/employeematchedjob?ID="+id;

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

export function fetchMatchedEmployee(id){
    const uri = url.url + '/employeematchedjob/matched?ID='+id;

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

export function fetchMatchinglistEmployer(id){
    const uri = url.url + '/employermatchedjob?ID='+id;

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

export default {fetchMatchRequest};