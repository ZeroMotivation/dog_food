import { Select } from 'antd';
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
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [paginatedCards, setPaginatedCards] = useState([]);
  const [optionsPage, setOptionsPage] = useState([]);

  useEffect(() => {
    const total = cards.length;
    const pages = Math.ceil(total / pageSize);
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

  const params = useParams();
  const location = useLocation();

  console.log(params);

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

  const optionsSize = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 50, label: '50' },
  ];


  const handleChange = (v) => {
    setPageSize(v)
  }


  return <>
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
    <Select style={{
      width: 120,
    }} defaultValue={10} options={optionsSize} onChange={handleChange} className="" />

    <Select style={{
      width: 120,
    }} defaultValue={1} value={page} options={optionsPage} onChange={setPage} className="" />

    {/* <select></select> */}
  </>
};
