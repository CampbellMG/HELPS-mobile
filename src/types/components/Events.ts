import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {MessageDictionary} from "../model/Message";

export interface EventStateProps {
}

export interface EventDispatchProps {
}

export interface EventProps extends EventDispatchProps, EventStateProps {

}

export interface EventState {
}

export interface EventStyles {
    container: ViewStyle
    imageWrapper: ViewStyle
    image: ImageStyle
    inputLabel: TextStyle
    usernameInput: TextStyle
    passwordInput: TextStyle
    buttonWrapper: ViewStyle
    button: ViewStyle
}