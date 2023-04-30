import { useContext, useEffect } from "react";
import CardList from "../../components/CardList/card-list"
import Sort from "../../components/Sort/sort"
import Spinner from "../../components/Spinner"
import { CardContext } from "../../context/cardContext";

const tabs = [
		{
			id: "cheap",
			title: "Сначала дешёвые",
		},
		{
			id: "low",
			title: "Сначала дорогие",
		},
		{
			id: "sale",
			title: "По скидке",
		},
  ];

	const Asc = (collection) => collection.sort((a, b) => a - b);
	const Desc = (collection) => collection.sort((a, b) => b - a);

export const CatalogPage = () => {
    const {cards} = useContext(CardContext);
    return (
        <>
            <Sort currentSort={null} tabs={tabs} onChangeSort={null}/>
            <div className='content__cards'>
                <CardList cards={cards}/>
            </div>
        </>
    )
}