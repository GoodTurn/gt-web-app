import React from 'react';

const About = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <h2>Our Mission</h2>
        <div className="about-content">
          <div>
            <p>We want to help you make real, personal connections with the people around you.</p>
            <p>Think about it. There are hundreds of people within 100, 200, 400 feet of you each day.</p>
            <ul>
              <li>Do you  know their names?</li>
              <li>What they do?</li>
              <li>How they define themselves?</li>
            </ul>
            <p>For this reason we do not define GoodTurn as social media. We are a <i>social medium</i>--GoodTurn enables you to better socialize with the strangers in your vicinity.</p>
          </div>
          <div className="about-pic">
            <img className="about-pic" src="../pics/Carousel/4.jpg" alt="" />
          </div>
        </div>
      </div>
    </div>
  )
};

export default About;
