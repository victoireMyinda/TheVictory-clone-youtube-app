import React from "react";
import Header from "./components/Header";
import SideBar from "./components/SideBar";
import RecommendedVideos from "./components/RecommendedVideos";
import SearchPage from "./components/SearchPage";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <div className="App">
      <Router>
        <Header />
        <Switch>
          <Route path="/search/:searchQuery">
            <div className="app__mainpage container-fluid">
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <SearchPage />
                </div>
              </div>
            </div>
          </Route>

          <Route path="/">
            <div className="app__mainpage container-fluid">
              <div className="row">
                <div className="col-2">
                  <SideBar />
                </div>
                <div className="col-10">
                  <RecommendedVideos />
                </div>
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

export default App;
