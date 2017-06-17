import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import axios from 'axios';


class Help extends Component {
  constructor(props) {
    super(props);
    this.state = {sent: false};
    this.contact = this.contact.bind(this);
  }


  contact(values) {
    axios.post('/help/',{
      email: values.email,
      subject: values.subject,
      body: values.body
    }).then((response) => {
      if(response.status === 200) {
        this.setState({ sent: true })
      }
    })
  }

  render() {
    const { handleSubmit } = this.props;

    return (
      <div className="about-page">
        <div className="about-container">
          <h2>Contact Us</h2>
          <div>
            <form
              onSubmit={handleSubmit(this.contact)}
              className="help-content">
              <Field
                className="help-field"
                component="input"
                type="email"
                placeholder="Email"
                name="email"
              />
              <Field
                className="help-field"
                component="input"
                type="text"
                placeholder="Subject"
                name="subject"
              />
              <Field
                className="help-field"
                component="textarea"
                placeholder="Describe your problem here."
                name="body"
              />
              <button
                className="help-submit"
                type="submit">Send</button>
            </form>
          </div>
          {this.state.sent && <h6>Your submission has been sent.</h6>}
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

Help = reduxForm({
  form: 'contactForm'
})(Help);

Help = connect(mapStateToProps)(Help)

export default Help;
