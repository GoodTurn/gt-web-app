import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';

// COMPONENTS
import ProfileOverview from './profileOverview';

import { updatePic, messageClear, changeEditStatus } from '../actions/action_updateInfo';


class UserProfilePic extends Component {
  componentWillMount() {
    this.props.messageClear();
  }

  state = { file: '', imagePreviewUrl: this.props.login.data.pic };



  _handleImageChange = (e) => {
    e.preventDefault();

    let reader = new FileReader();
    let file = e.target.files[0];

    reader.onloadend = () => {
      this.setState({
        file: file,
        imagePreviewUrl: reader.result
      });
    }

    reader.readAsDataURL(file)
  }

  save = () => {

    let imageExtension = this.state.imagePreviewUrl.split(';')[0].split('/');
    imageExtension = imageExtension[imageExtension.length - 1];

    const newImage = {
      imageName: 'profile' + this.props.login.data.profileid,
      imageBody: this.state.imagePreviewUrl,
      imageExtension: imageExtension,
      userEmail: this.props.login.data.email
    }

    this.props.updatePic(newImage, this.props.login.data.profileid);
  }

  render() {
    if (!this.props.login.loggedIn) {
      return (
        <Redirect to='/login' />
      )
    } else if (this.props.login.edited) {
      return (
        <Redirect to='/profile' />
      )
    }



    return (
      <div>
        <ProfileOverview />
        <div className="user-wrapper">
          <div className="user">
            <div className="user-container">
              <div>
                <div className="user-top-buttons">
                  <Link to="/profile"><button className="user-back">CANCEL</button></Link>
                </div>
                <div className="user-forms">
                  <h4>Profile Picture</h4>
                  <div className="user-spec-fields">
                    <div className="user-spec">
                      <div className="user-image-upload-container">
                        <input id="upload-demo" type="file" name="images" accept="image/*" onChange={(e)=>this._handleImageChange(e)} />
                        <img className="account-pic" src={this.state.imagePreviewUrl} alt="" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="user-bottom-buttons">
                <Link to="/profile"><button className="user-save" onClick={this.save}>SAVE</button></Link>
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
    login: store.login
  }
}

export default connect(mapStateToProps, { updatePic, messageClear, changeEditStatus })(UserProfilePic);
