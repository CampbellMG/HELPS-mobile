import {AuthAction, AuthActionType} from '../../types/store/AuthActionTypes';
import {Dispatch} from 'redux';
import {resetTo} from '../../components/navigation/NavigationService'
import {AsyncStorage} from "react-native";

const requestLogin = (): AuthAction => ({
    type: AuthActionType.REQUEST_LOGIN
});


const receiveLogin = (isAdmin: boolean): AuthAction => ({
    type: AuthActionType.RECEIVE_LOGIN,
    payload: isAdmin
});

const doLogout = (): AuthAction => ({
    type: AuthActionType.LOGOUT
});

const loginError = (message: string): AuthAction => ({
    type: AuthActionType.LOGIN_ERROR,
    payload: message
});

const receiveRegister = (): AuthAction => ({
    type: AuthActionType.RECEIVE_REGISTER
});

const registerError = (message: string): AuthAction => ({
    type: AuthActionType.REGISTER_ERROR,
    payload: message
});

export const LS_STORAGE_KEY = 'id_token';
export const LS_ADMIN_KEY = 'id_admin';

export const getExistingSession = () => async (dispatch: Dispatch<any>) => {
    dispatch(requestLogin());

    const token = await AsyncStorage.getItem(LS_STORAGE_KEY);
    const isAdmin = await AsyncStorage.getItem(LS_ADMIN_KEY) == '1';

    if (token !== null) {
        dispatch(receiveLogin(isAdmin));
        resetTo('HomeTabs');
        return;
    }
};

export const login = (username: string, password: string) => async (dispatch: Dispatch<any>) => {
    dispatch(requestLogin());

    const loginResponse = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json'
        }),
        body: JSON.stringify({username, password})
    });

    const loginResult = await loginResponse.json();

    if (!loginResponse.ok || !loginResult.accessToken) {
        dispatch(loginError(loginResult.message ? loginResult.message : 'Login request failed'));
        return;
    }

    // This is a bit sketchy but will work for now
    await AsyncStorage.setItem(LS_STORAGE_KEY, loginResult.accessToken);
    await AsyncStorage.setItem(LS_ADMIN_KEY, loginResult.isAdmin ? '1' : '0');

    dispatch(receiveLogin(loginResult.isAdmin));

    resetTo('HomeTabs');
};

export const logout = () => async (dispatch: Dispatch<any>) => {
    await AsyncStorage.removeItem(LS_STORAGE_KEY);
    resetTo('Login');
    dispatch(doLogout());
};

export async function fetchToken(): Promise<string | null> {
    return AsyncStorage.getItem(LS_STORAGE_KEY);
}

export const NO_TOKEN_MESSAGE: string = 'No token, have you authenticated?';

export const fetchWithAuthHeader = (token: string, path: string): Promise<Response> =>
    fetch(path, {
        headers: new Headers({
            'Authorization': `Bearer ${token}`
        })
    });
