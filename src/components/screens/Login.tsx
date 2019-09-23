import React from 'react';
import {Image, KeyboardAvoidingView, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {LoginStyle} from "../../styles/Login";
import {LoginDispatchProps, LoginProps, LoginState, LoginStateProps} from "../../types/components/Login";
import {connect} from "react-redux";
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from 'redux-thunk';
import {getExistingSession, login} from "../../store/actions/AuthActions";

class Login extends React.Component<LoginProps, LoginState> {

    constructor(props: LoginProps) {
        super(props);

        this.state = {
            username: '',
            password: ''
        }
    }

    componentDidMount(): void {
        this.props.getExistingSession();
    }

    render() {
        const {username, password} = this.state;
        return (
            <View style={LoginStyle.container}>
                <View style={LoginStyle.imageWrapper}>
                    <Image style={LoginStyle.image}
                           source={require('../../../assets/uts.png')}/>
                </View>

                <KeyboardAvoidingView behavior='position'>
                    <Text style={LoginStyle.inputLabel}>
                        Email
                    </Text>
                    <TextInput style={LoginStyle.usernameInput}
                               onChangeText={this.onUserNameChanged}
                               value={username}/>

                    <Text style={LoginStyle.inputLabel}>
                        Password
                    </Text>
                    <TextInput style={LoginStyle.passwordInput}
                               secureTextEntry
                               onChangeText={this.onPasswordChanged}
                               value={password}/>

                    <TouchableOpacity style={LoginStyle.buttonWrapper}
                                      onPress={this.onLogin}>
                        <Text style={LoginStyle.button}>Login</Text>
                    </TouchableOpacity>
                </KeyboardAvoidingView>
            </View>
        );
    }

    private onUserNameChanged = (username: string) => this.setState({username});
    private onPasswordChanged = (password: string) => this.setState({password});
    private onLogin = () => this.props.login(this.state.username, this.state.password);
}

const mapStateToProps = (state: AppState): LoginStateProps => ({
    error: state.auth.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): LoginDispatchProps => ({
    login: (username, password) => dispatch(login(username, password)),
    getExistingSession: () => dispatch(getExistingSession())
});

export default connect<LoginStateProps, LoginDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Login)


