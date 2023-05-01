import React, { useContext, useEffect, useState } from "react";
import Logo from "../Logo/logo";
import { Search } from "../Search/search";
import "./style.css";

import IconBasket from "./basketMaterial/BasketMaterial";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { Link, useNavigate } from "react-router-dom";
import { ReactComponent as Like } from "../Card/like.svg";
import { ReactComponent as LoginIcon } from "./images/login.svg";
import {ReactComponent as ProfileIcon} from "./images/profile.svg";



export const Header = ({ setShowModal }) => {
  const { currentUser, searchQuery, setSearchQuery, parentCounter, isAuthentificated } =
    useContext(UserContext);
  const [counter, setCounter] = useState(parentCounter);
  const { favorites } = useContext(CardContext);

  useEffect(() => {
    setCounter((st) => st + 1);
    return () => setCounter(parentCounter);
  }, [parentCounter]);

  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className="header" id="head">
      <div className="container">
        <div className="header__wrapper">
          <Logo />
          <Search searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
          <div className="header__right">
            <div>
              <IconBasket count={counter} />
            </div>
            <div>
              <Link to={"/favorites"} className="header__bubble-link">
                <Like className="header__liked" />
                {favorites.length !== 0 && (
                  <span className="header__bubble">{favorites.length}</span>
                )}
              </Link>
            </div>
            {!isAuthentificated ? <Link to={"/login"} className="header__link" onClick={() => setShowModal(true)}>
              <LoginIcon />
            </Link> :
              <Link to={"/profile"} className="header__link" onClick={() => setShowModal(true)}>
                <ProfileIcon />
              </Link>
            }
          </div>
        </div>
      </div>
    </div>
  );
};
