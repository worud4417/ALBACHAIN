import {combineReducers} from 'redux';
import SetTargetReducer from './SetTargetReducer';
import LoginReducer from './LoginReducer';
import JobOfferReducer from './JobOfferReducer';

export default combineReducers({
    status:SetTargetReducer,
    user:LoginReducer,
    jobOffer:JobOfferReducer
})