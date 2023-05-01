import { useContext, useEffect, useState } from 'react';
import { createSearchParams, useLocation, useNavigate, useParams } from 'react-router-dom';
import { CardList } from '../../components/CardList/card-list';
import { CardContext } from '../../context/cardContext';
import { UserContext } from '../../context/userContext';
import { getIssues } from '../../utils/utils';
import './index.css';

export const CatalogPage = () => {

  const { searchQuery, setSort } = useContext(UserContext);
  const { cards } = useContext(CardContext);
  const [pageSize, setPageSize] = useState(9);
  const [page, setPage] = useState(1);
  const [paginatedCards, setPaginatedCards] = useState([]);
  const [optionsPage, setOptionsPage] = useState([]);

  const PAGE_SIZE = 9;
  const TOTAL_PAGES= Math.ceil(cards.length / PAGE_SIZE);

  useEffect(() => {
    const total = cards.length;
    const pages = Math.ceil(total / PAGE_SIZE);
    const pageCounter = new Array(pages).fill({}).map((e, i) => ({
      value: i + 1, label: `${i + 1}`
    }));
    setOptionsPage(pageCounter);
    setPage(1);
  }, [cards, pageSize])

  useEffect(() => {
    const paginated = cards.slice(pageSize * (page - 1), pageSize * page);
    setPaginatedCards(paginated)
  }, [cards, pageSize, page]);
  const navigate = useNavigate();

  useEffect(() => {
    navigate({
      pathname: "/",
      search: createSearchParams({
        page: page,
        pageSize: pageSize,
      }).toString()
  });

  }, [navigate, page, pageSize]);

  const sortedItems = [{ id: 'newest' }, { id: 'cheapest' }, { id: 'richest' }, { id: 'popular' }];

  return <div className="content">
    {searchQuery && (
      <p>
        По запросу {searchQuery} найдено {cards?.length}
        {getIssues(cards.length)}
      </p>
    )}
    <div className='sort-cards'>
      {sortedItems.map((e) =>
        <span key={e.id} className='sort-item' onClick={() => setSort(e.id)}>{e.id}</span>
      )}
    </div>
    <CardList cards={paginatedCards} />
    <div className="navigation">
      <div className="navigation__left">
        <i className="fa-solid fa-angles-left navigation__btn" onClick={() => setPage(1)}></i>
        <i className="fa-solid fa-chevron-left navigation__btn" onClick={() => page === 1 ? setPage(TOTAL_PAGES) : setPage(page - 1)}></i>
      </div>
      <span className="navigation__page">{page}</span>
      <div className="navigation__right">
        <i className="fa-solid fa-chevron-right navigation__btn" onClick={() => page === TOTAL_PAGES ? setPage(1) : setPage(page + 1)}></i>
        <i class="fa-solid fa-angles-right navigation__btn" onClick={() => setPage(TOTAL_PAGES)}></i>
      </div>
    </div>
  </div>
};
