import React from "react";
import "./style.css";
import VideoPlayer from "../VideoPLayer";

const VideoRow = ({ views, description, timestamp, channel, title, image }) => {
  return (
    <div className="videorow" onClick={<VideoPlayer />}>
      <img src={image} alt="" />
      <div className="videorow__text">
        <h3>{title}</h3>
        <p className="videorow__headline">
          {channel} • {views} views • {timestamp}
        </p>
        <p className="videorow__description">{description}</p>
      </div>
    </div>
  );
};

export default VideoRow;
