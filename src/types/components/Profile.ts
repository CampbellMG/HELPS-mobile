import {ImageStyle, TextStyle, ViewStyle} from "react-native";
import {Student} from "../model/Student";

export interface ProfileStateProps {
    profile: Student[]
}

export interface ProfileDispatchProps {
    logout: () => void
    updateUser: (user: Student) => void
    retrieveUser: () => void
}

export interface ProfileProps extends ProfileDispatchProps, ProfileStateProps {

}

export interface ProfileState {
    isEditing: boolean
    profile?: Student
}

export interface ProfileStyles {
    container: ViewStyle
    imageWrapper: ViewStyle
    image: ImageStyle
    inputLabel: TextStyle
    usernameInput: TextStyle
    passwordInput: TextStyle
    buttonWrapper: ViewStyle
    button: ViewStyle
}

