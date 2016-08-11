import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import * as actions from '../actions/calendar';
import Modal from 'react-modal';
import Popup from './Popup.js'
import AppointmentEdit from './AppointmentEdit.js'
import {connect} from 'react-redux'

BigCalendar.setLocalizer(
  BigCalendar.momentLocalizer(Moment)
);

export default class Calendar extends Component {

  componentWillMount() {

    console.log(this.props.mentor.id)

    if(this.props.mentor.id){

      this.props.fetchAppointments(this.props.mentor.id);
    }
  }

  constructor(props) {
    super(props);

      this.state = {
        events: [],
        modalIsOpen: false,
        editModalIsOpen: false

      };
  }

  openEdit(event) {
    console.log('event inside', slotInfo.end)

    this.props.selectedAppointment(event)

    this.setState({
      modalIsOpen: false,
      editModalIsOpen: !this.state.editModalIsOpen

    });
  }

  open(slotInfo) {

    this.props.selectedSlot(slotInfo)

    this.setState({
      editModalIsOpen: false,
      modalIsOpen: !this.state.modalIsOpen

    });
  }

  appointmentFormat() {

    return this.props.appointments.map((appointment, i) => {

        let obj =   {
            key: i,
            isSelected: false,
            start: new Date(appointment.startTime),
            end: new Date(appointment.endTime),
            title: appointment.notes
          }
          return obj;
    });
  }

  eventStyleGetter (event) {

    console.log("isSelected console log", isSelected);

    var backgroundColor = '#' + event.hexColor;
    var style = {
        backgroundColor: '#5f5f5f',
        borderRadius: '0px',
        opacity: 1,
        color: 'white',
        width: '100%',
        border: '0px',
        display: 'block'
    };
    return {
        style: style
    };
  }

  render() {

    return (

      <div className="spacer30" style={{ height: 640 }}>

        <BigCalendar
            	selectable
            	events={this.props.appointments ? this.appointmentFormat() : []}
            	onSelectEvent={event =>
                this.openEdit(event)
              }
            	defaultView="month"
            	scrollToTime={new Date(1970, 1, 1, 6)}
            	defaultDate={new Date(2016, 8, 8)}

            	onSelectSlot={(slotInfo) => this.open({ start: slotInfo.start, end: slotInfo.end,
          }

          )}
        />
      <AppointmentEdit
              isOpen={this.state.editModalIsOpen}
              event={this.state.current}
                  />
      <Popup
            isOpen={this.state.modalIsOpen}
            event={this.state.current}
                />
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    appointments: state.learner.appointments,
    auth: state.auth,
    mentor: state.learner.currentMentor,
  };
}


export default connect (mapStateToProps, actions)(Calendar);
