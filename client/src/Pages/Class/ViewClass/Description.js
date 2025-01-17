import React from "react";

const Description = ({ description }) => {
  return (
    <div className="description">
      <div className="content">
        <div className="Con">
          <div className="heading">About This Gig</div>
          <div className="detail">{description ?? "No Description Found"}</div>
        </div>

        <div className="Con">
          <div className="heading">Note:</div>
          <div className="detail">
            Lorem Ipsum Dolor Sit Amet, Consectetur Adipiscing Elit. Ipsum Sed
            Dui Nibh Pellentesque. Faucibus Lacus, Turpis Consequat In Mattis.
            Nulla Mi Integer Interdum Nibh Massa Elementum Elit Arcu. Turpis
            Phasellus Pulvinar Mattis Lectus.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Description;
