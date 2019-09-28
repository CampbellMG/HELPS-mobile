import React from 'react';
import {FlatList, StatusBar, Text, TextInput, TouchableOpacity, View} from 'react-native';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {ProfileDispatchProps, ProfileProps, ProfileState, ProfileStateProps} from "../../types/components/Profile";
import {logout} from "../../store/actions/AuthActions";
import {retrieveUser, updateUser} from "../../store/actions/UserActions";
import {INPUT_BACKGROUND, NAV_BAR_GREY, PRIMARY, TEXT_SECONDARY} from "../../res/Colours";
import {StudentKeyMap} from "../../types/model/Student";

class Profile extends React.Component<ProfileProps, ProfileState> {
    constructor(props: ProfileProps) {
        super(props);

        this.state = {
            isEditing: false,
            profile: props.profile.length > 0 ? props.profile[0] : undefined
        }

    }

    componentDidMount(): void {
        this.props.retrieveUser()
    }

    componentDidUpdate(prevProps: Readonly<ProfileProps>, prevState: Readonly<ProfileState>, snapshot?: any): void {
        if (!this.state.profile && this.props.profile.length > 0) {
            this.setState({profile: this.props.profile[0]})
        }
    }

    render() {
        const {isEditing} = this.state
        return (
            <View style={{marginTop: StatusBar.currentHeight, backgroundColor: 'white', flex: 1}}>
                {this.renderProfileForm()}
                <View style={{flexDirection: 'row'}}>
                    {this.renderButton('Logout', this.logout)}
                    {this.renderButton(isEditing ? 'Save' : 'Edit', isEditing ? this.onSave : this.onEdit)}
                </View>

            </View>
        );
    }

    private renderProfileForm() {
        const {profile} = this.state
        if (!profile) {
            return <View/>
        }

        return (
            <FlatList data={Object.keys(profile)}
                      keyExtractor={item => item}
                      renderItem={({item}) => (
                          <View style={{marginHorizontal: 8}}>
                              <Text style={{marginLeft: 8, marginTop: 8, color: TEXT_SECONDARY}}>{StudentKeyMap[item]}</Text>
                              <TextInput value={profile[item].toString()}
                                         style={{
                                             backgroundColor: this.state.isEditing ? NAV_BAR_GREY : INPUT_BACKGROUND,
                                             borderWidth: 1,
                                             borderRadius: 5,
                                             margin: 8,
                                             paddingHorizontal: 8,
                                             paddingVertical: 4
                                         }}
                                         editable={this.state.isEditing}
                                         onChangeText={value => {
                                             profile[item] = value;
                                             this.forceUpdate()
                                         }}/>
                          </View>
                      )}/>
        )
    }

    private renderButton = (title: string, action: () => void) => (
        <TouchableOpacity onPress={action}
                          style={{
                              flex: 1,
                              backgroundColor: PRIMARY,
                              margin: 16,
                              borderRadius: 10,
                              alignItems: 'center',
                              paddingVertical: 16
                          }}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 18}}>
                {title}
            </Text>
        </TouchableOpacity>
    )

    private logout = () => this.props.logout();
    private onEdit = () => this.setState({isEditing: true});
    private onSave = () => {
        const {profile} = this.state;
        if (profile) {
            this.props.updateUser(profile)
        }

        this.setState({isEditing: false})
    }
}

const mapStateToProps = (state: AppState): ProfileStateProps => ({
    profile: state.user.user
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ProfileDispatchProps => ({
    logout: () => dispatch(logout()),
    updateUser: user => dispatch(updateUser(user)),
    retrieveUser: () => dispatch(retrieveUser())
});

export default connect<ProfileStateProps, ProfileDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Profile)
