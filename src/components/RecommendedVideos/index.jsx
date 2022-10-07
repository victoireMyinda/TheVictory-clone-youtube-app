import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import VideoCard from "../VideoCard";
import axios from "axios";
import { DateTime } from "luxon";
import CircularProgress from "@material-ui/core/CircularProgress";
import Alert from "@material-ui/lab/Alert";

import "./style.css";

const RecommendedVideos = () => {
  const tokenUser =
    "eyJhbGciOiJSUzI1NiIsImtpZCI6ImVkMzZjMjU3YzQ3ZWJhYmI0N2I0NTY4MjhhODU4YWE1ZmNkYTEyZGQiLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJhY2NvdW50cy5nb29nbGUuY29tIiwiYXpwIjoiOTIxODQ0NzA0NjkyLWE1ZDhscXFnMDBuZjNscXRsczZtbzFmcmtmaTVqbTAyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwiYXVkIjoiOTIxODQ0NzA0NjkyLWE1ZDhscXFnMDBuZjNscXRsczZtbzFmcmtmaTVqbTAyLmFwcHMuZ29vZ2xldXNlcmNvbnRlbnQuY29tIiwic3ViIjoiMTE1MjE3NDk3MzMwNDYwMjQzNjUzIiwiZW1haWwiOiJteWluZGF2aWN0b2lyZUBnbWFpbC5jb20iLCJlbWFpbF92ZXJpZmllZCI6dHJ1ZSwiYXRfaGFzaCI6ImZTR3R0ZzBIelJZaS1yMk1nN2VSd3ciLCJuYW1lIjoidmljdG9pcmUgbXlpbmRhIiwicGljdHVyZSI6Imh0dHBzOi8vbGgzLmdvb2dsZXVzZXJjb250ZW50LmNvbS9hLS9BQ05QRXUtd1p6dUtPd0VhNUdJaEVXTnl0RjczaXZGbnlRNW51R253c3hUbVB3PXM5Ni1jIiwiZ2l2ZW5fbmFtZSI6InZpY3RvaXJlIiwiZmFtaWx5X25hbWUiOiJteWluZGEiLCJsb2NhbGUiOiJmciIsImlhdCI6MTY2NDk2NDQ0MSwiZXhwIjoxNjY0OTY4MDQxLCJqdGkiOiI0NTJhMDI1NjYxNTBlZGUwMjY5ZGZlMTEzYWY4MmYyNjFmZmRmZTJkIn0.3wthbNOBLaCWGwKQGr-IxSUaA3mm7b_j66FpJh6S6DCGuBaRL4QQMQFWqRl5xbeLLA7U2o7g6Yn96OOwpIMJ_IBIzfKevbIZy-QvKx1fDJbmIfCy_KDB0YcE93u1nPVLy7XBiplaNMD2pBUk-MuOu9Aq27z8Za3ERrMHw7koheJpAJSjAeeDXca_cy14ro2maarbThdQLfRLTyK21JIDR4Ic-4ncDfGIQAW4DAiWVUWbrNM7dP7iKIK_gwsS8Zd1WZGwooMQse-01AGzBLQQKhzq2T4q2q1twgRe6aJXO38GI85k-VAXBRQXQYit_TDTFBQOaM5a66TVU19u2varNw";
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";

  const [videoCards, setVideoCards] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=12&regionCode=US&key=AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I`
      )
      .then((response) => {
        console.log(response.data.items);
        createVideoCards(response.data.items);
      })
      .catch((error) => {
        console.log(error);
        setIsError(true);
      });
  }, []);

  async function createVideoCards(videoItems) {
    let newVideoCards = [];
    for (const video of videoItems) {
      const videoId = video.id;
      const snippet = video.snippet;
      const channelId = snippet.channelId;
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/channels?part=snippet&id=${channelId}&key=AIzaSyAxYTdTGDlgbCAqKpQhTrVlpCN4l3Eyl0I`
      );
      const channelImage = response.data.items[0].snippet.thumbnails.medium.url;

      const title = snippet.title;
      const image = snippet.thumbnails.medium.url;
      const views = video.statistics.viewCount;
      const timestamp = DateTime.fromISO(snippet.publishedAt).toRelative();
      const channel = snippet.channelTitle;

      newVideoCards.push({
        videoId,
        image,
        title,
        channel,
        views,
        timestamp,
        channelImage,
      });
    }
    setVideoCards(newVideoCards);
    setIsLoading(false);
  }

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
        {videoCards.map((item) => {
          return (
            <Link key={item.videoId} to={`/video/${item.videoId}`}>
              <VideoCard
                title={item.title}
                image={item.image}
                views={item.views}
                timestamp={item.timestamp}
                channel={item.channel}
                channelImage={item.channelImage}
              />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default RecommendedVideos;
