import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {MessageDictionary} from "../model/Message";

export type ContentType = 'PROGRAMS' | 'FAQ';

export interface FAQStateProps {
    error: string
    messages: MessageDictionary
}

export interface FAQDispatchProps {
    retrieveMessages: () => void
}

export interface FAQProps extends FAQDispatchProps, FAQStateProps {

}

export interface FAQState {
    selectedContentType: ContentType
}

export interface FAQStyles {
    container: ViewStyle
    imageWrapper: ViewStyle
    image: ImageStyle
    inputLabel: TextStyle
    usernameInput: TextStyle
    passwordInput: TextStyle
    buttonWrapper: ViewStyle
    button: ViewStyle
}