import types from './Types';

export function SetTarget(status){
    return {
        type:types.SET_TARGET,
        status:status
    };
}