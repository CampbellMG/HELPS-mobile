import React, {ReactElement} from 'react';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {EventDispatchProps, EventProps, EventState, EventStateProps} from "../../types/components/Events";
import {Agenda, AgendaItemsMap} from "react-native-calendars";
import {HELPSEvent} from "../../types/model/HELPSEvent";
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {bookSession, cancelSession, retrieveSessions, retrieveUserSessions} from '../../store/actions/SessionActions';
import {
    bookWorkshop,
    cancelWorkshop,
    retrieveUserWorkshops,
    retrieveWorkshops
} from '../../store/actions/WorkshopActions';
import moment from 'moment';
import {Workshop} from '../../types/model/Workshop';
import {isSession, Session} from '../../types/model/Session';
import {PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_TERTIARY} from '../../res/Colours';

class Events extends React.Component<EventProps, EventState> {

    private showOnlyBooked: boolean;

    private get events(): AgendaItemsMap<HELPSEvent> {
        let events: HELPSEvent[] = [...this.props.sessions, ...this.props.assignedWorkshops];

        if (!this.showOnlyBooked) {
            const assignedWorkshopIds = this.props.assignedWorkshops.map(workshop => workshop.id);
            events = this.props.workshops.filter(workshop => !assignedWorkshopIds.includes(workshop.id));
        }

        return events.reduce((accumulator, currentValue) => {
            const startTime = moment(currentValue.startTime).format("YYYY-MM-DD");
            if (startTime in accumulator) {
                accumulator[startTime].push(currentValue);
            } else {
                accumulator[startTime] = [currentValue];
            }

            return accumulator;
        }, {});
    }

    componentDidMount(): void {
        this.props.retrieveWorkshops();
        this.props.retrieveUserWorkshops();
        this.props.retrieveSessions();
        this.props.retrieveUserSessions();

        this.showOnlyBooked = this.props.navigation.getParam('showOnlyBooked');
    }

    render() {
        return (
            <Agenda items={this.events}
                    style={{flex: 1, marginTop: StatusBar.currentHeight}}
                    renderEmptyDate={() => <View/>}
                    refreshing={false}
                    renderEmptyData={() => <View/>}
                    renderItem={this.renderEvent}
                    rowHasChanged={(first, second) => first.id === second.id}
                    theme={{
                        agendaDayNumColor: PRIMARY,
                        agendaDayTextColor: PRIMARY,
                        agendaKnobColor: PRIMARY,
                        agendaTodayColor: PRIMARY,
                        arrowColor: PRIMARY,
                        dotColor: PRIMARY,
                        selectedDayBackgroundColor: PRIMARY,
                        selectedDotColor: PRIMARY,
                        indicatorColor: PRIMARY
                    }}/>
        );
    }

    private renderEvent = (event: HELPSEvent): ReactElement => {
        const eventIsSession = isSession(event);
        const {bookSession, bookWorkshop} = this.props;
        return (
            <View style={{
                backgroundColor: 'white',
                padding: 16,
                marginTop: 8,
                marginBottom: 8,
                marginRight: 8,
                elevation: 5
            }}>
                <View style={{flexDirection: 'row', marginBottom: 12}}>
                    <Text
                        style={{fontSize: 18, color: TEXT_SECONDARY}}>{moment(event.startTime).format('hh:MM a')}</Text>
                    <Text style={{fontSize: 18, color: TEXT_SECONDARY}}> - </Text>
                    <Text
                        style={{fontSize: 18, color: TEXT_SECONDARY}}>{moment(event.startTime).format('hh:MM a')}</Text>
                </View>

                {eventIsSession ? Events.renderSession(event as Session) : Events.renderWorkshop(event as Workshop)}

                <TouchableOpacity
                    style={{
                        backgroundColor: PRIMARY,
                        padding: 8,
                        borderRadius: 4,
                        alignSelf: 'flex-end',
                        paddingHorizontal: 16,
                        marginTop: 8
                    }}
                    onPress={() => this.handleEventSelection(event)}>
                    <Text style={{color: 'white'}}>{this.showOnlyBooked ? 'Cancel' : 'Book'}</Text>
                </TouchableOpacity>
            </View>
        );
    };

    private static renderSession(session: Session): ReactElement {
        return (
            <View style={{backgroundColor: 'white'}}>

                <Text style={{fontSize: 20, color: TEXT_PRIMARY}}>{session.type}</Text>
                <Text style={{fontSize: 16, color: TEXT_TERTIARY, marginTop: 8}}>{session.purpose}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}>{session.subjectName}</Text>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}> - </Text>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}>{session.assignmentType}</Text>
                </View>
                <Text style={{fontSize: 16, color: TEXT_TERTIARY}}>{session.roomId}</Text>

            </View>
        );
    }

    private static renderWorkshop(workshop: Workshop): ReactElement {
        return (
            <View style={{backgroundColor: 'white'}}>
                <Text style={{fontSize: 20, color: TEXT_PRIMARY}}>{workshop.title}</Text>
                <Text style={{fontSize: 16, color: TEXT_TERTIARY, marginTop: 8}}>{workshop.description}</Text>
                <View style={{flexDirection: 'row'}}>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}>{workshop.targetGroup}</Text>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}> - </Text>
                    <Text style={{fontSize: 16, color: TEXT_TERTIARY}}>{workshop.availablePlaces}</Text>
                </View>
            </View>
        );
    }

    private handleEventSelection(event: HELPSEvent) {
        if (this.showOnlyBooked) {
            if (isSession(event)) {
                return this.props.cancelSession(event);
            }

            return this.props.cancelWorkshop(event as Workshop);
        }

        if (isSession(event)) {
            return this.props.bookSession(event);
        }

        this.props.bookWorkshop(event as Workshop);
    }
}

const mapStateToProps = (state: AppState): EventStateProps => ({
    workshops: state.workshops.workshops,
    assignedWorkshops: state.workshops.userWorkshops,
    sessions: state.session.sessions,
    assignedSessions: state.session.userSessions
});

const mapDispatchToProps = (dispatch: ThunkDispatch<{}, {}, any>): EventDispatchProps => ({
    retrieveSessions: () => dispatch(retrieveSessions()),
    retrieveUserSessions: () => dispatch(retrieveUserSessions()),
    retrieveWorkshops: () => dispatch(retrieveWorkshops()),
    retrieveUserWorkshops: () => dispatch(retrieveUserWorkshops()),
    bookSession: session => dispatch(bookSession(session)),
    bookWorkshop: workshop => dispatch(bookWorkshop(workshop)),
    cancelWorkshop: workshop => dispatch(cancelWorkshop(workshop)),
    cancelSession: session => dispatch(cancelSession(session))
});

export default connect<EventStateProps, EventDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Events);
