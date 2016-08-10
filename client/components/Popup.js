import React, { Component } from 'react';
import BigCalendar from 'react-big-calendar';
import Moment from 'moment';
import { reduxForm } from 'redux-form';
import * as actions from '../actions/calendar';

import Modal from 'react-modal';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255,255,255, .1)',
    zIndex: 900,
  },

  content: {
    minWidth: '400',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
  },
};

export default class Popup extends Component {
  constructor(props){
    super(props);

    this.state = {
      modalIsOpen: this.props.isOpen,
      event: this.props.event,
      delete: "",
      date: "",
      startTime: "",
      endTime:""
    };

  }

  componentWillReceiveProps(nextProps){

    this.setState({
      event: nextProps.event,
      modalIsOpen: nextProps.isOpen,
    });
  }

  close() {
    this.setState({
      modalIsOpen: false
    });
  }

  handleFormSubmit(formProps) {
    let userId = this.props.auth.currentUser.id
    let mentorId = this.props.mentor.id

    this.props.createAppointment(formProps, userId, mentorId)
    this.close() //not closing modal still on create

    }

render(){
  //
  // if(!this.props.isOpen){
  //     return <noscript/>
  //   }

  const { appointments, auth, mentor, handleSubmit, fields: { date, startTime, endTime, location, notes } } = this.props;

return (


  <Modal
    isOpen={this.state.modalIsOpen}
    style={customStyles}>
    <div className="modal-header">

      <i className="fa fa-times-circle-o fa-2x" aria-hidden="true" onClick={this.close.bind(this)}></i>
    </div>
    <form onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>

    <div className="spacer30"> </div>
      <div className="form-group">
        <input type="date" className="form-control" placeholder="Date" {...date} />
      </div>
      <div className="form-group">
        <input type="time" className="form-control" placeholder="Start time" {...startTime}/>
      </div>
      <div className="form-group">
        <input type="time" className="form-control" placeholder="End time" {...endTime}/>
      </div>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Location" {...location} />
      </div>
      <div className="form-group">
        <textarea className="form-control" placeholder="Notes" {...notes} />
      </div>
      <div>
        <button className="btn-global" type="submit">Create Appt</button>
      </div>

    </form>

  </Modal>

  )

  }
}

export default reduxForm({
  form: 'appointment',
  fields: ['date', 'startTime', 'endTime', 'location', 'notes']},
  state => ({
  auth: state.auth,
  mentor: state.learner.currentMentor,
  initialValues: state.appointments.event
}), actions)(Popup);