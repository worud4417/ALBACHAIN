import Types from '../action/Types';
import produce from 'immer';

let user = [{
    
}

]

const auth = {
    user:{
        ID: '',
        ...
    },
    isLogined: false

}

export default (state = user,action) => {
    switch(action.type){
        case Types.LOGIN : 
            return produce(state,draft => {
                draft.push(action.payload);
            })
        case Types.LOGOUT :
            return draft = [];
        default :
            return state;
    }
}