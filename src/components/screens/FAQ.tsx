import React from 'react';
import {TouchableOpacity, View, WebView} from 'react-native';
import {connect} from "react-redux";
import {AppState} from "../../types/store/StoreTypes";
import {ContentType, FAQDispatchProps, FAQProps, FAQState, FAQStateProps} from "../../types/components/FAQ";
import {ThunkDispatch} from 'redux-thunk';
import {fetchMessages} from "../../store/actions/MessageActions";

class FAQ extends React.Component<FAQProps, FAQState> {

    constructor(props: FAQProps) {
        super(props);

        this.state = {
            selectedContentType: 'PROGRAMS'
        }
    }


    componentDidMount(): void {
        this.props.retrieveMessages();
    }

    render() {
        return (
            <View>
                {this.renderInformationBlock("PROGRAMS")}
                {this.renderInformationBlock("FAQ")}
            </View>
        );
    }

    private renderInformationBlock(type: ContentType) {
        const {programs, FAQ} = this.props.messages;
        const {selectedContentType} = this.state;

        return (
            <View>
                <TouchableOpacity onPress={() => this.setState({selectedContentType: type})}>
                    {type}
                </TouchableOpacity>
                {selectedContentType === type &&
                <WebView originWhitelist={['*']}
                         source={{html: type === "PROGRAMS" ? programs : FAQ}}/>}

            </View>
        )
    }
}

const mapStateToProps = (state: AppState): FAQStateProps => ({
    messages: state.message.indexedMessages,
    error: state.message.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): FAQDispatchProps => ({
    retrieveMessages: () => dispatch(fetchMessages())
});

export default connect<FAQStateProps, FAQDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(FAQ)
