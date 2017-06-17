import React from 'react';
import SelectedProfileSpec from '../components/selectedProfileSpec.js'
import SelectedProfileGTKY from '../components/selectedProfileGTKY.js'
import { connect } from 'react-redux';


const SelectedProfile = (props) => {
  const selectedProfile = props.selectedProfile.selectedProfile
  let education = "";
  let work = "";
  let relationship_status = "";
  let relation = "";
  let lived = "";
  let gtkys = "";
    if (selectedProfile) {
      if (selectedProfile.first_name) {
      education = selectedProfile.education.map((spec, i) => {
        if(!spec.value) {spec.value = ""}
        if(!spec.start) {spec.start = ""}
        if(!spec.end) {spec.end = ""}
        let educSpec = {value: spec.value + " (" + spec.start + " - " + spec.end + ")"}

        return <SelectedProfileSpec
          spec={educSpec}
          key={i}
          path='../pics/education2.png' />
      });
      work = selectedProfile.work.map((spec, i) => {
        if(!spec.value) {spec.value = ""}
        if(!spec.employer) {spec.employer = ""}
        if(!spec.start) {spec.start = ""}
        if(!spec.end) {spec.end = ""}
        let workSpec = {value: spec.value + " at " + spec.employer + " (" + spec.start + " - " + spec.end + ")"}
        return <SelectedProfileSpec
          spec={workSpec}
          key={i}
          path='../pics/work.png' />
      });
      if(selectedProfile.relationship_status) {
        const relationSpec = {value: selectedProfile.relationship_status}
        relationship_status = <SelectedProfileSpec
          spec={relationSpec}
          path='../pics/relationship.png' />
      }
      relation = selectedProfile.relation.map((spec, i) => {
          let type = "";

          switch (spec.value) {
            case 'Pet(s)':
              if (Number(spec.quantity) === 1) {
                type = 'Pet';
              } else {
                type = 'Pets';
              }
              break;
            case 'Child(ren)':
              if (Number(spec.quantity) === 1) {
                type = 'Child';
              } else {
                type = 'Children';
              }
              break;
            case 'Sibling(s)':
              if (Number(spec.quantity) === 1) {
                type = 'Sibling';
              } else {
                type = 'Siblings';
              }
              break;
            default:

          }
          let relationSpec = {value: spec.quantity + " " + type}
          if(!spec.value || !spec.quantity) {
            relationSpec = {value: ""}
            return <SelectedProfileSpec
              spec={relationSpec}
              key={i}
              path='../pics/relationship.png' />
          } else {
            return <SelectedProfileSpec
              spec={relationSpec}
              key={i}
              path='../pics/relationship.png' />
          }
      });
      lived = selectedProfile.lived.map((spec, i) => {
        return <SelectedProfileSpec
          spec={spec}
          key={i}
          path='../pics/location.png' />
      });
      gtkys = selectedProfile.gtky.map((gtky, i) => {
        if (gtky) {
          return <SelectedProfileGTKY
            question={props.gtkyKEY[i]}
            answer={gtky}
            key={props.gtkyKEY[i]} />
        } else {
          return "";
        }
      });
    }
  }



  return (
    <div id="profile-modal" className="selected-profile-box">
      {selectedProfile.first_name &&
      <div className="selected-profile-container">
        <div className="selected-profile-item">

          <div className="selected-profile-pic-container">
            { selectedProfile ? (<img className="selected-profile-pic" src={selectedProfile.pic} alt="" />) : (<img className="selected-profile-pic" alt="" />)}
          </div>
          <div className="selected-profile-name-specs">
            <div className="selected-profile-name">{ selectedProfile ? selectedProfile.first_name : "" } { selectedProfile ? selectedProfile.last_name : "" }</div>

            <div className="selected-profile-specs">
              { selectedProfile ? education ? education : "" : ""}
              { selectedProfile ? work ? work : "" : ""}
              { selectedProfile.relationship_status ? relationship_status ? relationship_status : "" : "" }
              { selectedProfile ? relation ? relation : "" : "" }
              { selectedProfile ? lived ? lived : "" : ""}
            </div>
          </div>
          <div className="selected-profile-ice-breaker-box">
            {selectedProfile ? gtkys : ""}
          </div>

        </div>
      </div>
      }
    </div>
  );
};

function mapStateToProps(store) {
  return {
    selectedProfile: store.profiles,
    gtkyKEY: store.gtkyKEY,
  };
};

export default connect(mapStateToProps)(SelectedProfile);
