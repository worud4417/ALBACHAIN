const url = require("./IpAddress");

export function fetchJobOfferEmployer(id){
    let uri = url.url+"/employerjoboffer?ID="+id;

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

export function fetchJobSearchEmployee(){
    let uri = url.url+"/employeejobsearch";

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

export function fetchJobOfferSubmit(id,startdate,period,text){
    let uri = url.url+"/employerjoboffer";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID : id,
            STARTDATE : startdate,
            PERIOD : period,
            TEXT : text
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

export default {fetchJobOfferEmployer,fetchJobSearchEmployee,fetchJobOfferSubmit};