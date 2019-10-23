import * as SetTargetAction from './SetTargetAction';
import * as LoginAction from './LoginAction';
import * as JobOfferAction from './JobOfferAction';

const ActionCreators = Object.assign({},
        SetTargetAction,
        LoginAction,
        JobOfferAction
    );

export default ActionCreators;