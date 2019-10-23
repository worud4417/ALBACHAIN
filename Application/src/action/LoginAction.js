import types from './Types';

export function Login(user){
    return {
        type:types.LOGIN,
        user:user
    };
}

export function Logout(){
    return {
        type:types.LOGOUT
    };
}