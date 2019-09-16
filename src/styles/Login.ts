import {StyleSheet} from "react-native";
import {LoginStyles} from "../types/components/Login";
import {PRIMARY} from "../res/Colours";

export const LoginStyle = StyleSheet.create<LoginStyles>({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'stretch',
        justifyContent: 'center',
        padding: 32
    },
    imageWrapper: {
        borderWidth: 5,
        borderColor: PRIMARY,
        paddingVertical: 30,
        paddingHorizontal: 60,
        borderRadius: 1000,
        alignSelf: 'center',
        marginBottom: 128
    },
    image: {
        height: 125,
        width: 74
    },
    inputLabel: {
        fontSize: 16
    },
    usernameInput: {
        borderWidth: 2,
        borderColor: PRIMARY,
        borderRadius: 10,
        marginBottom: 32,
        marginTop: 8,
        fontSize: 16,
        padding: 8,
        paddingHorizontal: 16
    },
    passwordInput: {
        borderWidth: 2,
        borderColor: PRIMARY,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 32,
        marginTop: 8,
        fontSize: 16,
        padding: 8,
        paddingHorizontal: 16
    },
    buttonWrapper: {
        backgroundColor: PRIMARY,
        padding: 15,
        borderRadius: 10,
        marginTop: 32
    },
    button: {
        fontSize: 30,
        color: 'white',
        textAlign: 'center'
    }
});