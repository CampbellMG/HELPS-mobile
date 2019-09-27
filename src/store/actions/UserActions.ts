import {Dispatch} from 'redux';
import {UserAction, UserActionType} from '../../types/store/UserActionTypes';
import {Student} from '../../types/model/Student';
import {LS_STORAGE_KEY} from './AuthActions';
import {AsyncStorage} from "react-native";

const requestUser = (): UserAction => ({
    type: UserActionType.REQUEST_USER
});

const receiveUser = (user: Student[]): UserAction => ({
    type: UserActionType.RECEIVE_USER,
    payload: user
});

const userError = (message: string): UserAction => ({
    type: UserActionType.USER_ERROR,
    payload: message
});

export const updateUser = (user: Student) => async (dispatch: Dispatch<any>) => {
    dispatch(requestUser());

    const token = await AsyncStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('http://localhost:5000/api/students', {
        method: 'PUT',
        headers: new Headers({
            'Authorization': `Bearer ${token}`,
            'content-type': 'application/json'
        }),
        body: JSON.stringify(user)
    });

    await dispatchUsers(dispatch)
};

async function dispatchUsers(dispatch: Dispatch<any>) {
    dispatch(requestUser());

    const token = await AsyncStorage.getItem(LS_STORAGE_KEY);

    if (token === null) {
        dispatch(userError('No token, have you authenticated?'));
        return;
    }

    const userResponse = await fetch('http://localhost:5000/api/students', {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });

    let userResult = await userResponse.json();

    if (!userResponse.ok) {
        dispatch(userError(userResult.message ? userResult.message : 'Retrieve user request failed'));
        return;
    }

    if (!Array.isArray(userResult)) {
        userResult = [userResult];
    }

    const students = userResult as Student[];

    dispatch(receiveUser(students));
}

export const retrieveUser = () => async (dispatch: Dispatch<any>) => {
    await dispatchUsers(dispatch);
};