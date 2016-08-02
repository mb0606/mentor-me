import React, { Component } from 'react';
import { Link } from 'react-router';

import MentorProfile from './MentorProfile';

export default class MentorCard extends Component {

  render() {
    const imgPath = 'client/assets/images/user.jpg';
    const { mentor } = this.props;

    return (
      <div className="row">
        <div className="card">
          <div className="card-block">
            <h4 className="card-title">{ mentor.firstname }</h4>
            <p className="card-text">This is where the mentor will provide a description of themselves and what they can offer to potential learners.</p>
            <Link to={ this.props.link } >
              <button className="btn-global" >
                See { mentor.firstname }'s Profile
              </button>
            </Link>
          </div>
        </div>
      </div>
    )
  }


}