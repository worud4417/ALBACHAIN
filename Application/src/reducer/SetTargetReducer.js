import Types from '../action/Types';

let status = 1
export default (state = status,action) => {
    switch(action.type){
        case Types.SET_TARGET :
            return state = action.status;
        default :
            return state;
    }
}