import React, { Component } from 'react';
import { connect } from 'react-redux';
import SingleProfile from '../components/singleProfile';
import { activate } from '../actions/action_feed';
import { selectProfile } from '../actions/action_selectProfile';
import { getLocation } from '../actions/action_login';

class ProfileFeed extends Component {
  componentWillMount() {
    if(!this.props.appActivated.feed && this.props.login.data.profileid) {
      const { getLocation, activate } = this.props;
      const userId = this.props.login.data.profileid;
      getLocation(userId);
      activate();
    }
  }

  componentDidUpdate() {
    if(!this.props.appActivated.feed && this.props.login.data.profileid) {
      const { getLocation, activate } = this.props;
      const userId = this.props.login.data.profileid;
      getLocation(userId);
      activate();
    }
  }

  selectProfile = (props) => {
    this.props.selectProfile(props);
    this.props.showSelected();
  }

  render() {
    const profiles = this.props.profiles.temp;
    let profileItems;
    if(profiles[0]) {
      profileItems = profiles.map((profile, i) => {
        return <SingleProfile
          key={profile.id}
          profile={profile}
          onProfileSelect={this.selectProfile}
          selectedID={this.props.profiles.selectedProfile ? this.props.profiles.selectedProfile.id : null}/>
      });
    } else {
      return (
        (this.props.profiles.term) ? <p className="ice-breaker-question">No results match the search term.</p> : <div className="profile-list center">
          <img className="loader" src="../pics/GoodTurnG.png" alt=""/>
        </div>
      );
    }

    return (
      <div className="profile-list">
        {profileItems}
        <div className="filler"></div>
      </div>
    );
  }
};

function mapStateToProps(store) {
  return {
    profiles: store.profiles,
    login: store.login,
    appActivated: store.appActivated
  };
}

export default connect(mapStateToProps, {
  selectProfile,
  getLocation,
  activate
})(ProfileFeed);
