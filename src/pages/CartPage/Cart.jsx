import React from "react";
import { useNavigate } from "react-router-dom";
import { CardContext } from "../../context/cardContext";
import { useContext } from "react";
import { CardList } from "../../components/CardList/card-list";
import "./index.css";

export function Cart() {
  const { cart } = useContext(CardContext);
  const navigate = useNavigate();

  return (
    <div className="cart">
      <span className="cart__back" onClick={() => navigate(-1)}>
        <i className="fa-solid fa-chevron-left"></i>
        Назад
      </span>
      <h2 className="cart__title">Корзина</h2>
      <div className="cart__cards">
        { cart.length ?
          <CardList cards={cart} /> :
          (<div className="cart__not-found">
            <i className="fa-solid fa-face-frown cart__sad"></i>
            <span>В корзине ничего нет</span>
            <span className="cart__back-btn" onClick={() => navigate(-1)}>Назад</span>
          </div>)
        }
      </div>
    </div>
  )
}