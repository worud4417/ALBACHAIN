import {combineReducers} from 'redux';
import SetTargetReducer from './SetTargetReducer';

export default combineReducers({
    status:SetTargetReducer
})