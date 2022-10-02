import React, { useState } from "react";
import { Link } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import VideoCallIcon from "@material-ui/icons/VideoCall";
import AppsIcon from "@material-ui/icons/Apps";
import NotificationsIcon from "@material-ui/icons/Notifications";
import Avatar from "@material-ui/core/Avatar";
import SearchPage from "../SearchPage";

import "../../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./style.css";

const Header = () => {
  const [inputSearch, setInputSearch] = useState("");

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
      </div>
    </div>
  );
};

export default Header;
