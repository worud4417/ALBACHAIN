const url = require("./IpAddress");

export function GetEmployeeImage(id){
    const uri = url.url + "/image/" + id + "-ee.jpg";
    return uri;
}

export function GetEmployerImage(id){
    const uri = url.url + "/image/" + id + "-er.jpg";
    return uri;
}

export default {GetEmployeeImage,GetEmployerImage};