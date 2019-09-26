import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {Workshop} from "../model/Workshop";
import {Session} from "../model/Session";
import {NavigationScreenProp} from 'react-navigation';

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
    cancelWorkshop: (workshop: Workshop) => void
    cancelSession: (session: Session) => void
}

export interface EventProps extends EventDispatchProps, EventStateProps {
    navigation: NavigationScreenProp<{}, { showOnlyBooked: boolean }>
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