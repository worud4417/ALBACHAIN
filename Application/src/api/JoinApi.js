const url = require("./IpAddress");

export function fetchJoinEmployee(id,password,name,callnumber,socialsecurity,image){
    const uri = url.url+"/employeejoin";

    let body = new FormData();
    body.append('image',{uri:image.uri,name:id,filename:id+"-ee.jpg",type:'image/jpg'});
    body.append('ID',id);
    body.append('PASSWORD',password);
    body.append("NAME",name);
    body.append("CALLNUMBER",callnumber);
    body.append("SOCIALSECURITY",socialsecurity)
    body.append("Content-Type","image/jpg");

    return fetch(uri,{
        method:"POST",
        headers:{
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo"
        },
        body:body
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

export function fetchJoinEmployer(id,password,name,callnumber,registration,address,image){
    const uri = url.url+"/employerjoin";

    let body = new FormData();
    body.append('image',{uri:image.uri,name:id,filename:id+"-er.jpg",type:'image/jpg'});
    body.append('ID',id);
    body.append('PASSWORD',password);
    body.append("NAME",name);
    body.append("CALLNUMBER",callnumber);
    body.append("REGISTRATION",registration);
    body.append("ADDRESS",address);
    body.append("Content-Type","image/jpg");

    return fetch(uri,{
        method:"POST",
        headers:{
            "Content-Type": "multipart/form-data",
            "otherHeader": "foo"
        },
        body : body
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

export function fetchDeleteEmployer(id){
    const uri = url.url+"/employerjoin";

    return fetch(uri,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id
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

export function fetchDeleteEmployee(id){
    const uri = url.url+"/employeejoin";

    return fetch(uri,{
        method:"DELETE",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id
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

export function fetchUpdateEmployer(id,password,callnumber,name,address){
    const uri = url.url+"/employerjoin/update";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id,
            PASSWORD:password,
            CALLNUMBER:callnumber,
            NAME:name,
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

export function fetchUpdateEmployee(id,password,callnumber,name){
    const uri = url.url+"/employeejoin/update";

    return fetch(uri,{
        method:"POST",
        headers:{
            Accept:"application/json",
            'Content-Type' : 'application/json',
        },
        body:JSON.stringify({
            ID:id,
            PASSWORD:password,
            CALLNUMBER:callnumber,
            NAME:name
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

export default {fetchJoinEmployee,fetchJoinEmployer,
    fetchDeleteEmployee,fetchDeleteEmployer};