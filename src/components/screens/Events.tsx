import React from 'react';
import {View} from 'react-native';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {fetchMessages} from "../../store/actions/MessageActions";
import {connect} from "react-redux";
import {EventDispatchProps, EventStateProps} from "../../types/components/Events";

class Events extends React.Component<{}, {}> {
    render() {
        return (
            <View/>
        );
    }
}

const mapStateToProps = (state: AppState): EventStateProps => ({
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EventDispatchProps => ({
});

export default connect<EventStateProps, EventDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Events)
