import React from "react";

const GoogleMap = ({ address }) => {
  const mapSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&t=&z=13&ie=UTF8&iwloc=&output=embed`;

  return (
    <div className="mapouter">
      <div className="gmap_canvas">
        <iframe width="320" height="320" id="gmap_canvas" src={mapSrc}></iframe>
      </div>
    </div>
  );
};

export default GoogleMap;
