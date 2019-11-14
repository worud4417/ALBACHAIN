const url = require("./IpAddress");

export async function GetEmployeeImage(id){
    let uri = url.url + "/image/" + id + "-ee.jpg";

    var result = await fetch(uri);
    if(result.status == 404){
        uri = url.url + "/image/" + "default.jpg";
    }
    return uri;
}

export async function GetEmployerImage(id){
    let uri = url.url + "/image/" + id + "-er.jpg";

    var result = await fetch(uri);
    if(result.status == 404){
        uri = url.url + "/image/" + "default.jpg";
    }

    return uri;
}

export default {GetEmployeeImage,GetEmployerImage};