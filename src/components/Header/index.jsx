import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import SearchPage from "../SearchPage";
import { gapi, loadAuth2 } from "gapi-script";
import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Header = (props) => {
  const [inputSearch, setInputSearch] = useState("");
  const navigate = useNavigate();
  const clientId =
    "921844704692-a5d8lqqg00nf3lqtls6mo1frkfi5jm02.apps.googleusercontent.com";

  const signOut = () => {
    const setAuth2 = async () => {
      const auth2 = await loadAuth2(
        gapi,
        clientId,
        "https://www.googleapis.com/auth/youtube.force-ssl"
      );
      if (auth2.isSignedIn.get()) {
        auth2.signOut();
      }
    };

    setAuth2().then(() => {
      navigate("/");
    });
  };

  return (
    <div className="header">
      <div className="header__left">
        <MenuIcon />
        <Link to="/" className="text-decoration-none">
          <span className="header__logo">TheVictory</span>
        </Link>
      </div>

      <div className="input-group d-flex justify-content-center ">
        <div class="form-outline">
          <input
            type="search"
            id="form1"
            class="form-control"
            placeholder="Search"
            onChange={(e) => setInputSearch(e.target.value)}
            value={inputSearch}
          />
        </div>
        <Link to={`/search/${inputSearch}`}>
          <button
            id="search-button"
            type="button"
            class="btn btn-primary"
            onClick={<SearchPage />}
          >
            <i className="fas fa-search header__searchbutton"></i>
          </button>
        </Link>
      </div>

      <div className="header__right">
        <VideoCallIcon className="header__icon" />
        <AppsIcon className="header__icon" />
        <NotificationsIcon className="header__icon" />
        <Avatar
          alt="Nouman Ahmed"
          stc="https://avatars1.githubusercontent.com/u/35970677?s=60&v=4"
        />

        <button className="btn btn-danger" onClick={signOut}>
          LogOut
        </button>
      </div>
    </div>
  );
};

export default Header;
