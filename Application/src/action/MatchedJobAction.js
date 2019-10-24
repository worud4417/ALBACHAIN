import types from './Types';

export function MatchedJob(job){
    return {
        type:types.MATCHEDJOB,
        payload:job
    }
}

export function InitMatchedJob(){
    return {
        type:types.INIT_MATCHEDJOB
    }
}