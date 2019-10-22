import Types from '../action/Types';

let status = 1 //1 = 고용주 2 = 아르바이트생
export default (state = status,action) => {
    switch(action.type){
        case Types.SET_TARGET :
            return state = action.status;
        default :
            return state;
    }
}