import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { search, activate, removeFeed } from '../actions/action_feed';


class Searchbar extends Component {

  onInputChange = (term) => {
    this.props.search(term);
  }

  pullFeed = () => {
    this.props.activate();
    this.props.removeFeed();

  }

  render() {
    return (
      <div className="searchBar">
        <input className="profileSearch" placeholder="Search profiles"
          value={this.props.profiles.term}
          onChange={event => this.onInputChange(event.target.value)} />
        <div className="refresh-container" onClick={this.pullFeed}>
          <img className="refresh" src="../pics/WhiteG.png" alt="" />
        </div>
      </div>
    );
  }
};

function mapStateToProps(store) {
  return { profiles: store.profiles }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ search, activate, removeFeed }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Searchbar);
