import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import VideoCard from "../VideoCard";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import "./style.css";

const ListVideosChannel = () => {
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";

  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const {channelId} = useParams()
 
  useEffect(() => {
    fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${channelId}&type=video&maxResults=21&key=AIzaSyBECTQ9-UglEFWRsemrTyGIsqHUoAqmd8c`)
    .then((response) => response.json())
    .then((data) => {
      setVideoCards(data.items)
      //console.log(data.items);
     // createVideoCards(data.items);
    })
    .catch(() => setIsError(true));
  }, []);

  if (isError) {
    return (
      <Alert severity="error" className="alert alert-danger">
        Recherche non trouvée
      </Alert>
    );
  }
  return (
    <div className="recommendedvideos">
      {isLoading ? (
        <div className="d-flex justify-content-center">
          <CircularProgress className="spinner text-info " role="status" />
        </div>
      ) : null}
      <div className="recommendedvideos__videos">
        {videoCards.map((video,index) => {
          return (
            <Link key={index} to={`/video/${video.id.videoId}`}>
              <VideoCard
                title={video.snippet.title}
                image={video.snippet.thumbnails.medium.url}
                views={"0"}
                timestamp={"0"}
                channel={""}
                channelImage={""}
                
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ListVideosChannel;
