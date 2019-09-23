import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {MessageDictionary} from "../model/Message";
import {Workshop} from "../model/Workshop";
import {Session} from "../model/Session";

export interface EventStateProps {
    workshops: Workshop[]
    assignedWorkshops: Workshop[]
    sessions: Session[]
    assignedSessions: Session[]
}

export interface EventDispatchProps {
    retrieveSessions: () => void
    retrieveUserSessions: () => void
    retrieveWorkshops: () => void
    retrieveUserWorkshops: () => void
    bookWorkshop: (workshop: Workshop) => void
    bookSession: (session: Session) => void
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