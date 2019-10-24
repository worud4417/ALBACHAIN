import * as SetTargetAction from './SetTargetAction';
import * as LoginAction from './LoginAction';
import * as JobOfferAction from './JobOfferAction';
import * as MatchedJobAction from './MatchedJobAction';

const ActionCreators = Object.assign({},
        SetTargetAction,
        LoginAction,
        JobOfferAction,
        MatchedJobAction
    );

export default ActionCreators;