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

export function fetchMatchRequestApprove(_id){
    const uri = url.url + '/employermatchedjob';

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            _id:_id
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        return responseJson;
    }).catch((error) => {
        if(error.message == "Network request failed"){
            alert("네트워크 오류")
        }
        return {error:false};
    })
}

export function fetchMatchRequestReject(_id){
    const uri = url.url + '/employermatchedjob';

    return fetch(uri,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            _id:_id
        })
    }).then((response) => response.json())
    .then((responseJson) => {
        console.log(responseJson)
        return responseJson;
    }).catch((error) => {
        if(error.message == "Network request failed"){
            alert("네트워크 오류")
        }
        return {error:false};
    })
}

export function fetchMatchedJobEmployer(id){
    const uri = url.url + '/employermatchedjob/working?ID='+id;

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