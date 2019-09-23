import React, {ReactElement} from 'react';
import {AppState} from "../../types/store/StoreTypes";
import {ThunkDispatch} from "redux-thunk";
import {connect} from "react-redux";
import {EventDispatchProps, EventProps, EventState, EventStateProps} from "../../types/components/Events";
import {Agenda, AgendaItemsMap} from "react-native-calendars";
import {HELPSEvent} from "../../types/model/HELPSEvent";
import {StatusBar, Text, TouchableOpacity, View} from 'react-native';
import {bookSession, retrieveSessions, retrieveUserSessions} from '../../store/actions/SessionActions';
import {bookWorkshop, retrieveUserWorkshops, retrieveWorkshops} from '../../store/actions/WorkshopActions';
import moment from 'moment';
import {Workshop} from '../../types/model/Workshop';
import {Session} from '../../types/model/Session';
import {PRIMARY, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_TERTIARY} from '../../res/Colours';

class Events extends React.Component<EventProps, EventState> {
    private get events(): AgendaItemsMap<HELPSEvent> {
        return [...this.props.sessions, ...this.props.workshops].reduce((accumulator, currentValue) => {
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
        const isSession = 'purpose' in (event as Session);
        const {bookSession, bookWorkshop} = this.props;
        return (
            <View style={{backgroundColor: 'white', padding: 16, marginTop: 8, marginBottom: 8, marginRight: 8, elevation: 5}}>
                <View style={{flexDirection: 'row', marginBottom: 12}}>
                    <Text style={{fontSize: 18, color: TEXT_SECONDARY}}>{moment(event.startTime).format('hh:MM a')}</Text>
                    <Text style={{fontSize: 18, color: TEXT_SECONDARY}}> - </Text>
                    <Text style={{fontSize: 18, color: TEXT_SECONDARY}}>{moment(event.startTime).format('hh:MM a')}</Text>
                </View>

                {isSession ? this.renderSession(event as Session) : this.renderWorkshop(event as Workshop)}

                <TouchableOpacity
                    style={{backgroundColor: PRIMARY, padding: 8, borderRadius: 4, alignSelf: 'flex-end', paddingHorizontal: 16, marginTop: 8}}
                    onPress={() => isSession ? bookSession(event as Session) : bookWorkshop(event as Workshop)}>
                    <Text style={{color: 'white'}}>Book</Text>
                </TouchableOpacity>
            </View>
        );
    };

    private renderSession(session: Session): ReactElement {
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

    private renderWorkshop(workshop: Workshop): ReactElement {
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
    bookWorkshop: workshop => dispatch(bookWorkshop(workshop))
});

export default connect<EventStateProps, EventDispatchProps, {}, AppState>(mapStateToProps, mapDispatchToProps)(Events);
