import React from "react";
import { GoPrimitiveDot, GoX } from "react-icons/go";
import "./InfoPanel.css";

const InfoPanel = ({ room }) => (
  <div className="infoPanel">
    <div className="infoLeft">
      <GoPrimitiveDot color="lime" />
      <h3>{room}</h3>
    </div>
    <div className="infoRight">
      <a href="/">
        <GoX color="#F7F3E3" size="30px" />
      </a>
    </div>
  </div>
);
export default InfoPanel;
