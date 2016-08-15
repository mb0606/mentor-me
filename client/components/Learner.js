import React, { Component } from 'react';

class Learner extends Component {

  componentDidMount() {
    let user = JSON.parse(localStorage.getItem('user'));
    socket.emit('join global', user.username);
  }

  render() {

    return (
      <div>
        {this.props.children}
      </div>
    );
  }
}
