import React from 'react';
import {View} from 'react-native';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {ProfileDispatchProps, ProfileProps, ProfileState, ProfileStateProps} from "../../types/components/Profile";

class Profile extends React.Component<ProfileProps, ProfileState> {
    render() {
        return (
            <View/>
        );
    }
}

const mapStateToProps = (state: AppState): ProfileStateProps => ({});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): ProfileDispatchProps => ({});

export default connect<ProfileStateProps, ProfileDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Profile)
