import types from './Types';

export function JobOffer(jobOffer){
    return {
        type:types.JOB_OFFER,
        payload:jobOffer
    };
}

export function InitJobOffer(){
    return {
        type:types.INIT_JOB_OFFER
    }
}