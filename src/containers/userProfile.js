import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect, Link } from 'react-router-dom';
import ProfileOverview from '../containers/profileOverview';
import { changeEditStatus, messageClear } from '../actions/action_updateInfo';


class UserProfile extends Component {

  editStatus = () => {
    this.props.changeEditStatus();
  }

  render() {
    if (!this.props.login.loggedIn) {
      return (
        <Redirect to='/login' />
      )
    }

    const profile = this.props.login.data;

    const education = profile.education.map((spec, i) => {
      if(spec) {
        return (
        <div key={i} className="user-spec">
          <div className="user-spec-value">
            {spec.value}
          </div>
          <div className="user-spec-dates">
            {spec.start} - {spec.end}
          </div>
        </div>
      )} else {
        return (
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              Blank
            </div>
            <div className="user-spec-dates">
            </div>
          </div>
        )
      }
    });

    const work = profile.work.map((spec, i) => {
      if(spec) {
        return (
        <div key={i} className="user-spec">
          <div className="user-spec-value">{spec.value} <span className="user-at">at</span> {spec.employer}</div>
          <div className="user-spec-dates">{spec.start} - {spec.end}</div>
        </div>
      )} else {
        return (
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              Blank
            </div>
            <div className="user-spec-dates">
            </div>
          </div>
        )
      }
    });

    const relation = profile.relation.map((spec, i) => {
      if(spec) {
        return (
        <div key={i} className="user-spec">
          <div className="user-spec-value"></div>
          <div className="user-spec-dates">{spec.quantity + " " + spec.value}</div>
        </div>
      )} else {
        return (
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              Blank
            </div>
            <div className="user-spec-dates">
            </div>
          </div>
        )
      }
    });

    const lived = profile.lived.map((spec, i) => {
      if (spec) {
        return (
        <div key={i} className="user-spec">
          <div className="user-spec-value">{spec.value}</div>
        </div>
      )} else {
        return (
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              Blank
            </div>
          </div>
        )
      }
    });

    const gtky = profile.gtky.map((answer, i) => {
      return (
        <div key={i} className="user-spec">
          <div className="user-spec-value gray-text">{this.props.gtkyKEY[i]}</div>
          <div className="user-spec-dates">{answer}</div>
        </div>
      )
    })


    return (
      <div>
        <ProfileOverview />
        <div className="user-wrapper">
          <div className="user">
            <div className="user-container">
              <div className="user-top-buttons">
                <Link to="/"><button onClick={this.editStatus} className="user-back">BACK</button></Link>
                <Link to="/picture"><button onClick={this.editStatus} className="user-edit">CHANGE PIC</button></Link>
                <Link to="/edit"><button onClick={this.editStatus} className="user-edit">EDIT</button></Link>
              </div>
              <div className="user-forms">
                  <p className="user-message">{this.props.login.message}</p>
                  <div>
                    <h4>Name</h4>
                    <div className="user-spec-fields">
                      <div className="user-spec">
                        <div className="user-spec-value-title">{profile.first_name} &nbsp;&nbsp;{profile.last_name}</div>
                      </div>
                    </div>
                    <h4>Profile Picture</h4>
                    <div className="user-spec-fields">
                      <div className="user-spec">
                        <img className="account-pic" src={profile.pic} alt="" />
                      </div>
                    </div>
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/education2.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Education</h4>
                    <div className="user-spec-fields">
                      {education}
                    </div>
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/work.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Work Experience</h4>
                    <div className="user-spec-fields">
                      {work}
                    </div>
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/relationship.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Relationships</h4>
                    <div className="user-spec-fields">
                      {profile.relationship_status && <div className="user-spec">
                        <div className="user-spec-value user-relationship-status">Relationship Status:</div>
                        <div className="user-spec-dates">{profile.relationship_status}</div>
                      </div>}
                      {relation}
                    </div>
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/location.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Places You Lived</h4>
                    <div className="user-spec-fields">
                      {lived}
                    </div>
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <div className="user-item-pic" ></div>
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Optional Inputs</h4>
                    <div className="user-spec-fields">
                      {gtky}
                    </div>
                  </div>

              </div>
              <div className="user-bottom-buttons">
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

function mapStateToProps(store) {
  return {
    login: store.login,
    gtkyKEY: store.gtkyKEY,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ changeEditStatus, messageClear }, dispatch);
};



export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
