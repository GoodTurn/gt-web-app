import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link, Redirect } from 'react-router-dom';
import { Field, FieldArray, reduxForm } from 'redux-form';
import ProfileOverview from '../containers/profileOverview';
import { updateInfo, messageClear } from '../actions/action_updateInfo.js';
import { deleteAccount } from '../actions/action_deleteAccount.js';

class UserProfileEdit extends Component {
  state = { error: '' }

  componentWillMount() {
    this.props.messageClear();
  }

  delete = () => {
    this.props.deleteAccount(this.props.login.data.profileid);
  }

  save = (values) => {
    this.setState({ error: '' });
    const badValidation = this.validateProfile(values)
    if (badValidation) {
      this.setState({ error: badValidation })
    } else {
      this.props.updateInfo(values);
    }
  }

  validateProfile = (values) => {

    function blank(field) {
      return (field === "")
    }

    function badCharacters(field) {
      const encoded = encodeURI(field);
      field = field.replace(/ /g,"%20");
      if (field !== encoded) {
        for (var j = 0; j < field.length; j++) {
          if (field[j] !== encoded[j]) {
            return `Invalid character ${field[j]}`;
          }
        }
      } else {
        return false;
      }
    }


    //firstName
    let message = "";
    if (blank(values.first_name))  {
      message = 'Please enter a first name';
      return message;
    } else if (badCharacters(values.first_name)) {
      message = badCharacters(values.first_name);
      return message;
    }

    //lastName
    if (blank(values.last_name))  {
      message = 'Please enter a last name';
      return message;
    } else if (badCharacters(values.last_name)) {
      message = badCharacters(values.last_name);
      return message;
    }

    // education
    const education = values.education
    for (var i = 0; i < education.length; i++) {
      if (education[i] === undefined) {
        message = 'Please do not leave fields blank in the Education section';
        return message;
      }
      if (education[i].value === undefined || blank(education[i].value)) {
        message = 'Please do not leave fields blank in the Education section';
        return message;
      }
      if (education[i].start === undefined || blank(education[i].start)) {
        message = 'Please do not leave fields blank in the Education section';
        return message;
      }
      if (education[i].end === undefined || blank(education[i].end)) {
        message = 'Please do not leave fields blank in the Education section';
        return message;
      }
      if (typeof Number(education[i].start) !== 'number' || education[i].start.length !== 4) {
        message = 'Start years and end years should be four digits';
        return message;
      }
      if (typeof Number(education[i].end) !== 'number' || education[i].end.length !== 4) {
        message = 'Start years and end years should be four digits';
        return message;
      }
      for (var key in education[i]) {
        if (badCharacters(education[i][key])) {
          message = badCharacters(education[i][key]);
          return message;
        }
      }
    }

    // work
    const work = values.work
    for (i = 0; i < work.length; i++) {
      if (work[i] === undefined) {
        message = 'Please do not leave fields blank in the Work Experience section';
        return message;
      }
      if (work[i].value === undefined || blank(work[i].value)) {
        message = 'Please do not leave fields blank in the Work Experience section';
        return message;
      }
      if (work[i].start === undefined || blank(work[i].start)) {
        message = 'Please do not leave fields blank in the Work Experience section';
        return message;
      }
      if (work[i].end === undefined || blank(work[i].end)) {
        message = 'Please do not leave fields blank in the Work Experience section';
        return message;
      }
      if (typeof Number(work[i].start) !== 'number' || work[i].start.length !== 4) {
        message = 'Start years and end years should be four digits';
        return message;
      }
      if (typeof Number(work[i].end) !== 'number' || work[i].end.length !== 4) {
        message = 'Start years and end years should be four digits';
        return message;
      }
      if (work[i].employer === undefined || blank(work[i].employer)) {
        message = 'Please do not leave fields blank in the Work Experience section';
        return message;
      }
      for (key in work[i]) {
        if (badCharacters(work[i][key])) {
          message = badCharacters(work[i][key]);
          return message;
        }
      }
    }

    // relation
    const relation = values.relation
    for (i = 0; i < relation.length; i++) {
      if (relation[i] === undefined) {
        message = 'Please do not leave fields blank in the Relationships section';
        return message;
      }
      if (relation[i].quantity === undefined || relation[i].value === undefined) {
        message = "Please select one of the given options in the Relationships section";
        return message;
      }
      for (key in relation[i]) {
        if (relation[i][key] === "") {
          message = "Please select one of the given options in the Relationships section";
          return message;
        }
      }
    }

    const lived = values.lived;
    for (i = 0; i < lived.length; i++) {
      if (lived[i] === undefined) {
        message = 'Please do not leave fields blank in the Places section';
        return message;
      }

      if (blank(lived[i].value)) {
        message = 'Please do not leave fields blank in the Places section';
        return message;
      }

      if (badCharacters(lived[i].value)) {
        message = badCharacters(lived[i].value);
        return message;
      }
    }


    const gtky = values.gtky;
    for (i = 0; i < gtky.length; i++) {
      if (badCharacters(gtky[i])) {
        message = badCharacters(gtky[i]);
        return message;
      }
    }
    return false
  }

  render () {
    if (!this.props.login.loggedIn) {
      return (
        <Redirect to='/login' />
      )
    } else if (this.props.login.edited) {
      return (
        <Redirect to='/profile' />
      )
    }

    const education = ({ fields, meta: { touched, error } }) => (
      <div className="user-spec-fields">
        <div className="user-add-new-container" onClick={() => fields.unshift()}>
          <span className="user-add-new">+</span>
        </div>
        {fields.map((value, i) =>
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              <div className="user-minus-new-container" onClick={() => fields.remove(i)}>
                <span className="user-minus-new">-</span>
              </div>
              { (i !== fields.length - 1 && <div className="user-down-new-container" onClick={() => fields.move(i, i+1)}>
                <span className="user-down-new">&darr;</span>
              </div>) || <div className="user-empty-new-container"><span className="user-empty-new"></span></div>}
              <Field name={`${value}.value`} component="input" className="user-spec-value-input" type="text" placeholder="School" />
            </div>
            <div className="user-spec-dates">
              <Field name={`${value}.start`} component="input" className="user-spec-dates-input" type="text" placeholder="Start year" /> - <Field name={`${value}.end`} component="input" className="user-spec-dates-input" type="text" placeholder="End year" />
            </div>
            {error && <div>error</div>}
          </div>
        )}
      </div>
    )


    const work = ({ fields, meta: { touched, error } }) => (
      <div className="user-spec-fields">
        <div className="user-add-new-container" onClick={() => fields.unshift()}>
          <span className="user-add-new">+</span>
        </div>
        {fields.map((value, i) =>
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              <div className="user-minus-new-container" onClick={() => fields.remove(i)}>
                <span className="user-minus-new">-</span>
              </div>
              { (i !== fields.length - 1 && <div className="user-down-new-container" onClick={() => fields.move(i, i+1)}>
                <span className="user-down-new">&darr;</span>
              </div>) || <div className="user-empty-new-container"><span className="user-empty-new"></span></div>}
              <Field name={`${value}.value`} component="input" className="user-spec-value-input" type="text" placeholder="Title" />
              <span className="user-at">at</span>
              <Field name={`${value}.employer`} component="input" className="user-spec-value-input" type="text" placeholder="Employer" />
            </div>
            <div className="user-spec-dates">
              <Field name={`${value}.start`} component="input" className="user-spec-dates-input" type="text" placeholder="Start year" /> - <Field name={`${value}.end`} component="input" className="user-spec-dates-input" type="text" placeholder="End year" />
            </div>
          </div>
        )}
      </div>
    )

    const quantity = ['0','1','2','3','4','5','6','7','8','9','10+'];
    const relations = ['Child(ren)', 'Sibling(s)', 'Pet(s)'];
    const relationships = ['Single', 'In a relationship', 'Engaged', 'Married', "It's complicated", 'Separated', 'Divorced', 'Widowed']
    const relation = ({ fields, meta: { touched, error } }) => (
      <div>
        <div className="user-spec-fields">
          <div className="user-relationship-status">
            <div>Relationship Status (optional):</div>
            <Field className="user-spec-value-input" name="relationship_status" component="select">
              <option value=""></option>
              {relationships.map( relationshipOption =>
                <option value={relationshipOption} key={relationshipOption}>{relationshipOption}</option>
              )}
            </Field>
          </div>
        </div>
        <div className="user-spec-fields">
          <div className="user-add-new-container" onClick={() => fields.unshift()}>
            <span className="user-add-new">+</span>
          </div>
          {fields.map((value, i) =>
            <div key={i} className="user-spec">
              <div className="user-spec-value">
                <div className="user-minus-new-container" onClick={() => fields.remove(i)}>
                  <span className="user-minus-new">-</span>
                </div>
                { (i !== fields.length - 1 && <div className="user-down-new-container" onClick={() => fields.move(i, i+1)}>
                  <span className="user-down-new">&darr;</span>
                </div>) || <div className="user-empty-new-container"><span className="user-empty-new"></span></div>}
                <Field className="user-spec-value-input-relation-q" name={`${value}.quantity`} component="select">
                  <option value=""></option>
                  {quantity.map(quantityOption =>
                    <option value={quantityOption} key={quantityOption}>{quantityOption}</option>)}
                </Field>
                <Field className="user-spec-value-input-relation" name={`${value}.value`} component="select">
                  <option value=""></option>
                  {relations.map(relationsOption =>
                    <option value={relationsOption} key={relationsOption}>{relationsOption}</option>)}
                </Field>
              </div>
              <div></div>
            </div>
          )}
        </div>
      </div>
    );

    const lived = ({ fields, meta: { touched, error } }) => (
      <div className="user-spec-fields">
        <div className="user-add-new-container" onClick={() => fields.unshift()}>
          <span className="user-add-new">+</span>
        </div>
        {fields.map((value, i) =>
          <div key={i} className="user-spec">
            <div className="user-spec-value">
              <div className="user-minus-new-container" onClick={() => fields.remove(i)}>
                <span className="user-minus-new">-</span>
              </div>
              { (i !== fields.length - 1 && <div className="user-down-new-container" onClick={() => fields.move(i, i+1)}>
                <span className="user-down-new">&darr;</span>
              </div>) || <div className="user-empty-new-container"><span className="user-empty-new"></span></div>}
              <Field name={`${value}.value`} component="input" className="user-spec-value-input" type="text" placeholder="Where have you lived?" />
            </div>
            {error && <div>error</div>}
          </div>
        )}
      </div>
    )

    const gtky = ({ fields }) => (
      <div className="user-spec-fields">
        {fields.map((value, i) =>
          <div key={i} className="user-spec-gtky">
            <div className="user-spec-value gray-text">{this.props.gtkyKEY[i]}</div>
            <Field name={`${value}`} component="input" className="user-spec-value-input-gtky" type="text" />
          </div>
        )}
      </div>
    )

    const { handleSubmit } = this.props;


    return (
      <div>
        <ProfileOverview />
        <div className="user-wrapper">
          <div className="user">
            <div className="user-container">
              <div className="user-top-buttons">
                <Link to="/profile"><button className="user-back">CANCEL</button></Link>
              </div>
              <div className="user-forms">
                <form onSubmit={handleSubmit(this.save)}>
                  <div>
                    <h4>Name</h4>
                    <div className="user-spec-fields">
                      <div className="user-spec">
                        <div className="user-spec-value-name">
                          <Field name="first_name" component="input" className="user-spec-value-input" type="text" placeholder="First Name" />
                          <Field name="last_name" component="input" className="user-spec-value-input" type="text" placeholder="Last Name" />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/education2.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Education</h4>
                    <FieldArray name="education" component={education} />
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/work.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Work Experience</h4>
                    <FieldArray name="work" component={work} />
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/relationship.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Relationships</h4>
                    <FieldArray name="relation" component={relation} />
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <img className="user-item-pic" src="../pics/location.png" alt="" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Places You Lived</h4>
                    <FieldArray name="lived" component={lived} />
                  </div>

                  <div>
                    <div className="user-item-pic-container">
                      <div className="user-item-pic" />
                      <hr size="1px" color="#ece6e2" />
                    </div>
                    <h4>Optional Inputs</h4>
                    <FieldArray name="gtky" component={gtky} />
                  </div>

                </form>
              </div>

              <div className="user-bottom-buttons">
                <div>
                  <Link to="/profile"><button className="user-save" onClick={handleSubmit(this.save)}>SAVE</button></Link>
                  <span className="user-error">{ this.state.error }</span>
                </div>
                <button className="user-delete" onClick={this.delete}>DELETE PROFILE</button>
              </div>
            </div>
          </div>
        </div>
      </div>
  )}
}

function mapStateToProps(store) {
  return {
    login: store.login,
    gtkyKEY: store.gtkyKEY,
    initialValues: store.login.data
  };
}

 function mapDispatchToProps(dispatch) {
   return bindActionCreators({ updateInfo, deleteAccount, messageClear }, dispatch);
 }

  UserProfileEdit = reduxForm({
    form: 'profileUpdate'
  })(UserProfileEdit);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfileEdit);
