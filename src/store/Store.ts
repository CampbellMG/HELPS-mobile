import {AuthReducer} from './reducers/AuthReducer';
import thunk from 'redux-thunk';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import {UserReducer} from './reducers/UserReducer';
import {WorkshopReducer} from './reducers/WorkshopReducer';
import {RoomReducer} from './reducers/RoomReducer';
import {EmailReducer} from './reducers/EmailReducer';
import {MessageReducer} from './reducers/MessageReducer';
import {AdvisorReducer} from './reducers/AdvisorReducer';
import {SessionReducer} from './reducers/SessionReducer';
import {SkillReducer} from './reducers/SkillReducer';

const reducer = combineReducers({
    auth: AuthReducer,
    room: RoomReducer,
    user: UserReducer,
    email: EmailReducer,
    workshops: WorkshopReducer,
    advisors: AdvisorReducer,
    message: MessageReducer,
    session: SessionReducer,
    skill: SkillReducer
});

export const configureStore = () => (
    createStore(reducer, applyMiddleware(thunk))
);