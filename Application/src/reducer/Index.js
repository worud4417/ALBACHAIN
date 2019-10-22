import {combineReducers} from 'redux';
import SetTargetReducer from './SetTargetReducer';
import LoginReducer from './LoginReducer';

export default combineReducers({
    status:SetTargetReducer,
    user:LoginReducer
})