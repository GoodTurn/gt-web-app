import React from 'react';

const SingleProfileSpec = (props) => {
    return (
      <div className="spec">
        <img className="spec-image" src={props.path} alt="foo-bar" />
        <span className="spec-text">{props.spec.value}</span>
      </div>
    )
}

export default SingleProfileSpec;
