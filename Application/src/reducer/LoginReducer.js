import Types from '../action/Types';

let user = {
    id : "",
    name : "",
    callnumber : "",
    address : "",
    registration : "",
    socialsecurity : ""
}
export default (state = user,action) => {
    switch(action.type){
        case Types.LOGIN : 
            return state = action.user;
        case Types.LOGOUT :
            let term ={
                id : "",
                name : "",
                callnumber : "",
                address : "",
                registration : "",
                socialsecurity : ""
            }
            return state = term
        default :
            return state;
    }
}