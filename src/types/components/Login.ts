import {ImageStyle, TextStyle, ViewStyle} from "react-native";

export interface LoginStateProps {
    error: string
}

export interface LoginDispatchProps {
    login: (username: string, password: string) => void
}

export interface LoginProps extends LoginDispatchProps, LoginStateProps {

}

export interface LoginState {
    username: string
    password: string
}

export interface LoginStyles {
    container: ViewStyle
    imageWrapper: ViewStyle
    image: ImageStyle
    inputLabel: TextStyle
    usernameInput: TextStyle
    passwordInput: TextStyle
    buttonWrapper: ViewStyle
    button: ViewStyle
}