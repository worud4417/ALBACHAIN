import Types from '../action/Types';

const user = {
    user:{
        id:"",
        name:"",
        callnumber:"",
        registration:"",
        socialsecurity:"",
        rating:"",
        address:""
    },
    isLogined: false
}

export default (state = user,action) => {
    switch(action.type){
        case Types.LOGIN : 
                state.user = action.payload.user;
                state.isLogined = true;
            return state;
        case Types.LOGOUT :
            state.user = {
                id: "",
                name : "",
                callnumber : "",
                registration : "",
                socialsecurity : "",
                rating : "",
                address : ""
            };
            state.isLogined = false;
            return state;
        default :
            return state;
    }
}