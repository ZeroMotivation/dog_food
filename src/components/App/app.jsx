import React, { useEffect, useRef, useState } from "react";
import { Footer } from "../Footer/footer";
import { Header } from "../Header/header";
import "./index.sass";
import { api } from "../../utils/api";
import { findLike, useDebounce } from "../../utils/utils";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { ProductPage } from "../../pages/Product/ProductPage";
import { CatalogPage } from "../../pages/Catalog/CatalogPage";
import { UserContext } from "../../context/userContext";
import { CardContext } from "../../context/cardContext";
import { FaqPage } from "../../pages/FAQ/FaqPage";
import { NotFound } from "../../pages/NotFound/NotFound";
import { Favorites } from "../../pages/FavoritePage/Favorites";
import { Form } from "../Form/Form";
import { RegistrationForm } from "../Form/RegistrationForm";
import { Modal } from "../Modal/Modal";
import { Login } from "../Auth/Login/Login";
import { Register } from "../Auth/Register/Register";
import { ResetPass } from "../Auth/ResetPassword/ResetPassword";
import { parseJwt } from "../../utils/parseJWT";
import { Profile } from "../Profile/Profile";
import { Cart } from "../../pages/CartPage/Cart";

function App() {
  const [cards, setCards] = useState([]);
  const [searchQuery, setSearchQuery] = useState(undefined);
  const [parentCounter, setParentCounter] = useState(0);
  const [currentUser, setCurrentUser] = useState({});
  const [favorites, setFavorites] = useState([]);
  const [formData, setFormData] = useState([]);
  const [activeModal, setShowModal] = useState(false);
  const [isAuthentificated, setIsAuthentificated] = useState(false);
  const [cart, setToCart] = useState([]);

  const filteredCards = (products, id) => {
    return products;
  };
  const handleSearch = (search) => {
    api
      .searchProducts(search)
      .then((data) => setCards(filteredCards(data, currentUser._id)));
  };

  const debounceValueInApp = useDebounce(searchQuery, 500);

  function handleProductLike(product) {
    const isLiked = findLike(product, currentUser);
    isLiked
      ?
      api.deleteLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        setCards(filteredCards(newCards, currentUser._id));
        setFavorites((state) => state.filter((f) => f._id !== newCard._id));
      })
      :
      api.addLike(product._id).then((newCard) => {
        const newCards = cards.map((e) =>
          e._id === newCard._id ? newCard : e
        );
        setCards(filteredCards(newCards, currentUser._id));
        setFavorites((favor) => [...favor, newCard]);
      });
      return isLiked;
  }

  useEffect(() => {
    if (debounceValueInApp === undefined) return;
    handleSearch(debounceValueInApp);
  }, [debounceValueInApp]);

  useEffect(() => {
    Promise.all([api.getUserInfo(), api.getProductList()]).then(
      ([userData, productData]) => {
        setCurrentUser(userData);
        const items = filteredCards(productData.products, userData._id);
        setCards(items);
        const fav = items.filter((e) => findLike(e, userData));
        setFavorites(fav);
      }
    );
  }, [isAuthentificated]);

  const setSortCards = (sort) => {
    if (sort === "cheapest") {
      const newCards = cards.sort((a, b) => a.price - b.price);
      setCards([...newCards]);
    }
    if (sort === "richest") {
      const newCards = cards.sort((a, b) => b.price - a.price);
      setCards([...newCards]);
    }
    if (sort === "popular") {
      const newCards = cards.sort((a, b) => b.likes.length - a.likes.length);
      setCards([...newCards]);
    }
    if (sort === "newest") {
      const newCards = cards.sort(
        (a, b) => new Date(a.created_at) - new Date(b.created_at)
      );
      setCards([...newCards]);
    }
  };

  const contextValue = {
    setSort: setSortCards,
    currentUser,
    setCurrentUser,
    searchQuery,
    setSearchQuery,
    setParentCounter,
    parentCounter,
    isAuthentificated,

  };
  const contextCardValue = {
    cards: cards,
    setParentCounter,
    handleProductLike,
    favorites,
    setFavorites,
    cart,
    setToCart,
  };

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token')
    const uncodedToken = parseJwt(token);
    if (uncodedToken?._id) {
      setIsAuthentificated(true)
    }
  }, [navigate]);

  const authRoutes = <> <Route
    path="login"
    element={
      <Modal activeModal={activeModal} setShowModal={setShowModal}>
        <Login setShowModal={setShowModal} />
      </Modal>
    }
  ></Route>
    <Route
      path="register"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <Register setShowModal={setShowModal} />
        </Modal>
      }
    ></Route>
    <Route
      path="reset-password"
      element={
        <Modal activeModal={activeModal} setShowModal={setShowModal}>
          <ResetPass setShowModal={setShowModal} />
        </Modal>
      }
    ></Route></>

  return (
    <>
      <UserContext.Provider value={contextValue}>
        <CardContext.Provider value={contextCardValue}>
          <Header setShowModal={setShowModal} />
          {isAuthentificated ?
            <main className="content container">
              <Routes>
                <Route path="/" element={<CatalogPage />}>
                  {/* <Route path="/:page" element={<CatalogPage />}></Route> */}
                </Route>
                <Route path="product/:productId" element={<ProductPage />} />
                <Route path="fakeRout/:productId" element={<ProductPage />} />
                <Route path="faq" element={<FaqPage />} />
                <Route path="favorites" element={<Favorites />} />
                <Route path="profile" element={<Profile />} />
                <Route path="cart" element={<Cart />} />
                  {authRoutes}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            :
            <div className="not__auth">Пожалуйста, авторизуйтесь
              <Routes>
                {authRoutes}
              </Routes>
            </div>
          }
          <Footer />
        </CardContext.Provider>
      </UserContext.Provider>
    </>
  );
}

export default App;
