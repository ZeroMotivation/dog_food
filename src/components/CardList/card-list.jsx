import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../context/userContext';
import Card from '../Card/card';
import { NotFound } from '../NotFound/NotFound';
import { SortContext } from '../../context/sortContext';
import './index.css';

const CardList = ({cards}) => {
	const navigate = useNavigate();
	const { isLoading } = useContext(UserContext)
	const { selectedTabId } = useContext(SortContext);
	return (
		<>
			{!cards.length && !isLoading && <NotFound buttonText="Назад" title="Простите по вашему запросу ничего не найдено" buttonAction={ () => navigate(-1) }/>}
			<div className="cards">
				{ cards.sort((a, b) => {
					switch(selectedTabId) {
						case "cheap":
							return a.price - b.price;
						case "low":
							return b.price - a.price;
						case "sale":
							return b.discount - a.discount;
						default:
							return 0;
					}
				}).map(item => <Card key={item._id} {...item}/>) }
			</div>
		</>
	);
};

export default CardList;
