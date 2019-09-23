import React from 'react';
import {StatusBar, Text, TouchableOpacity, View, WebView} from 'react-native';
import {connect} from "react-redux";
import {AppState} from "../../types/store/StoreTypes";
import {FAQDispatchProps, FAQProps, FAQState, FAQStateProps} from "../../types/components/FAQ";
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
        const {programs, FAQ} = this.props.messages;
        const {selectedContentType} = this.state;

        return (
            <View style={{marginTop: StatusBar.currentHeight, flex: 1}}>

                <View style={{flexDirection: 'row'}}>
                    <TouchableOpacity style={{flex: 1, paddingVertical: 16}}
                                      onPress={this.setProgramsActive}>
                        <Text style={{textAlign: 'center'}}>
                            Programs
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={{flex: 1,  paddingVertical: 16}}
                                      onPress={this.setFAQActive}>
                        <Text style={{textAlign: 'center'}}>
                            FAQ
                        </Text>
                    </TouchableOpacity>
                </View>

                <WebView
                    originWhitelist={['*']}
                    style={{flex: 1}}
                    source={{html: selectedContentType === "PROGRAMS" ? programs : FAQ}}/>

            </View>
        );
    }

    private setProgramsActive = () => this.setState({selectedContentType: "PROGRAMS"})
    private setFAQActive = () => this.setState({selectedContentType: "FAQ"})
}

const mapStateToProps = (state: AppState): FAQStateProps => ({
    messages: state.message.indexedMessages,
    error: state.message.error
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): FAQDispatchProps => ({
    retrieveMessages: () => dispatch(fetchMessages())
});

export default connect<FAQStateProps, FAQDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(FAQ)
