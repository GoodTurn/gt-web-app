import React from 'react';
import SingleProfileSpec from '../components/singleProfileSpec';

const SingleProfile = (props) => {

  //future state -- have the dates be stored in full conext so they can be sorted and the most recent can be pulled.
  let specs = [];
  const profile = props.profile
    const educ = profile.education;
    if (educ[0]) {
      specs.push({spec: educ[0], path: '../pics/education2.png'});
    }
    const work = profile.work;
    if (work[0]) {
      specs.push({spec: {value: work[0].value + " at " + work[0].employer}, path: '../pics/work.png'});
    }
    const relation = profile.relation;
    if (profile.relationship_status) {
      specs.push({spec: {value: profile.relationship_status}, path: '../pics/relationship.png'});
    } else if (relation[0]) {
      let type = "";
      switch (relation[0].value) {
        case 'Pet(s)':
          if (Number(relation[0].quantity) === 1) {
            type = 'Pet';
          } else {
            type = 'Pets';
          }
          break;
        case 'Child(ren)':
          if (Number(relation[0].quantity) === 1) {
            type = 'Child';
          } else {
            type = 'Children';
          }
          break;
        case 'Sibling(s)':
          if (Number(relation[0].quantity) === 1) {
            type = 'Sibling';
          } else {
            type = 'Siblings';
          }
          break;
        default:

      }
      specs.push({spec: { value: relation[0].quantity + " " + type }, path: '../pics/relationship.png'});
    }
    const lived = profile.lived;
    if (lived[0]) {
      specs.push({spec: lived[0], path: '../pics/location.png'});
    }
  specs = specs.map((spec, i) => {
    return <SingleProfileSpec
      spec={spec.spec}
      key={i}
      path={spec.path} />
  });

  const id = (props.selectedID === profile.id) ? "selected-profile" : "";



  return (
    <div onClick={() => {props.onProfileSelect(profile);}} id={id} className="profile-item">
      <div className="item-box">
        <div className="item-pic-container">
          <img className="item-pic" src={profile.pic} alt="" />
        </div>
          <div className="item-content">
            <div className="item-name"><span className="item-name-names">{profile.first_name} {profile.last_name}</span><span className="item-distance">{profile.distance}</span></div>
            <div className="specs">
              {specs}
            </div>
          </div>
      </div>
      {profile.gtky[0] && <div className="ice-breaker-box">
        <div className="ice-breaker-item">
          <div className="ice-breaker-question">
            Ask me about...
          </div>
          <div className="ice-breaker-answer">
            {profile.gtky[0]}
          </div>
        </div>
      </div>}
    </div>
  );
};

export default SingleProfile;
