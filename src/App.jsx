import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RecommendedVideos from "./components/RecommendedVideos";
import SearchPage from "./components/SearchPage";
//import ErrorPage from "./pages/ErrorPage";
import VideoPlayer from "./components/VideoPLayer";
import GoogleLogin from "./components/GoogleLogin";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Routes>
        <Route
          path="/video/:videoId"
          element={
            <div className="container-fluid">
              <Header />
              <div className="row">
                <div className="col-10">
                  <VideoPlayer />
                </div>
              </div>
            </div>
          }
        />

        <Route
          path="/search/:searchQuery"
          element={
            <div className="container-fluid">
              <Header />
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <SearchPage />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/userAuth"
          element={
            <div className="app__mainpage container-fluid">
              <Header />
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <RecommendedVideos />
                </div>
              </div>
            </div>
          }
        />

        <Route
          exact
          path="/"
          element={
            <div className="container-fluid">
              <div className="row">
                <div className="col-12 ">
                  <GoogleLogin />
                </div>
              </div>
            </div>
          }
        />

        {/* <Route path="*">
          <div>
            <ErrorPage />
          </div>
        </Route> */}
      </Routes>
    </div>
  );
};

export default App;
