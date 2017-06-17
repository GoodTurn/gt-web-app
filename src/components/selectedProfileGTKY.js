import React from 'react';

const SelectedProfileGTKY = (props) => {
  return (
    <div className="selected-profile-ice-breaker-item">
      <div className="selected-profile-ice-breaker-question">
        {props.question}
      </div>
      <div className="selected-profile-ice-breaker-answer">
        {props.answer}
      </div>
    </div>
  )
}

export default SelectedProfileGTKY;
