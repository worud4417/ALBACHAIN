import Types from '../action/Types';
import produce from 'immer';

let matchedJob = [

]

export default (state = matchedJob,action) => {
    switch(action.type){
        case Types.MATCHEDJOB :
            return produce(state, draft =>{
                draft.push(action.payload);
            })
        case Types.INIT_MATCHEDJOB :
            return draft = [];
        default :
            return state;
    }
}