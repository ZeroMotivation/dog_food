import React, { useEffect, useRef, useState } from "react";
import { UserContext } from "../../context/userContext";
import { ReactComponent as Like } from "./like.svg";
import "./index.css";
import { Link } from "react-router-dom";
import { findLike } from "../../utils/utils";
import { CardContext } from "../../context/cardContext";
import { calcDiscountPrice } from "../../utils/product";

export const Card = ({
  product,
  pictures,
  name,
  discount,
  tags,
  price,
  setParentCounter,
  onProductLike,
}) => {
  const { currentUser } = React.useContext(UserContext);
  const {cart, setToCart } = React.useContext(CardContext);

  const [inCart, setCart] = useState(false);

  const isLiked = findLike(product, currentUser);
  const handleLikeClick = () => {
    onProductLike(product);
  };

  const ref = useRef();

  return (
    <div ref={ref} className="card">
      <div className="card__sticky card__sticky_type_top-left">
        {discount ? <span className="card__discount">{discount}%</span> : <></>}
        {tags.length ? tags.map(t => <span className={`tag ${t === "new" ? "tag_type_new" : "tag_type_sale"}`}>{t}</span>) : <></>}
      </div>
      <div className="card__sticky card__sticky_type_top-right">
        <button
          className={`card__favorite ${
            isLiked ? "card__favorite_active" : "card__favorite_not_active"
          }`}
          onClick={handleLikeClick}
        >
          <Like className="card__liked" />
        </button>
      </div>
      <Link to={`/product/${product._id}`} className="card__link">
        <img src={pictures} alt="card__image" className="card__image" />
        <div className="card__desc">
          {discount !== 0 ? (
            <div>
              <span className="card__price cross">{price}p</span>
              <span className="card__new-price">{calcDiscountPrice(price, discount)}р</span>
            </div>
          ) : <span className="card__price">{price}p</span>}
          <span className="card_wight">{product.wight}</span>
          <p className="card__name">{name}</p>
        </div>
      </Link>
      <span
        onClick={() => {
        if(!inCart) {
          setCart(true);
          setParentCounter(state =>  {console.log(state);return state + 1});
        }
        else {
          setCart(false);
          cart.splice(cart.indexOf(product), 1);
          setParentCounter(state => state - 1);
        }
        setToCart(() => [...cart, product]);
        // if(!cart.some(p => p._id === product._id)) {
        //   setToCart(() => [...cart, product]);
        //   setParentCounter(state => state + 1);
        // }
        return;
        }}
        className="card__card btn btn_type_primary"
      >
        {inCart ? "Убрать из корзины" : "Добавить в корзину"}
      </span>
    </div>
  );
};

