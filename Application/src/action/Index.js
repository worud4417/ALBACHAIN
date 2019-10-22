import * as SetTargetAction from './SetTargetAction';
import * as LoginAction from './LoginAction';

const ActionCreators = Object.assign({},
        SetTargetAction,
        LoginAction
    );

export default ActionCreators;