import Types from '../action/Types';
import produce from 'immer';

let jobOffer = [

]

export default (state = jobOffer,action) => {
    switch(action.type){
        case Types.JOB_OFFER :
            return produce(state, draft=>{
                draft.push(action.payload);
            })
        case Types.INIT_JOB_OFFER :
            return draft = [];
        default :
            return state;
    }
}