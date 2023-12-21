import React from 'react';
import './index.scss';
import { Collection } from './Collection';

const cats = [
    { "name": "Все" },
    { "name": "Море" },
    { "name": "Горы" },
    { "name": "Архитектура" },
    { "name": "Города" }
];

function App() {
  const [categoryId, setCategoryId] = React.useState(0);
  const [isLoading, setIsLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState('');
  const [collections, setCollections] = React.useState([]);

  React.useEffect(() => {
    setIsLoading(true);
    fetch(`https://65848fa7022766bcb8c758c9.mockapi.io/api/photos/photo-collections?${
        categoryId ? `category=${categoryId}` : '' 
      }`,
    )
      .then((res) => res.json())
      .then((json) => {
        setCollections(json);
      })
      .catch((err) => {
        console.warn(err);
        alert('Ошибка при получении данных')
      }).finally(() => {
        setIsLoading(false);
      })
  }, [categoryId]);

  return (
    <div className="App">
      <h1>Моя коллекция фотографий</h1>
      <div className="top">
        <ul className="tags">
          {cats.map((obj, index) => (
            <li 
              onClick={() => setCategoryId(index)} 
              className={categoryId === index ? 'active' : ''} 
              key={obj.name}>
              {obj.name}
            </li>
          ))}
        </ul>
        <input 
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="search-input" 
          placeholder="Поиск по названию" 
        />
      </div>
      <div className="content">
        {isLoading ? (
          <h2>Loading...</h2>
        ) : (
          collections.filter(obj =>{
          return obj.name.toLowerCase().includes(searchValue.toLowerCase())
        }).map((obj, index) => (
            <Collection 
              key={index}
              name={obj.name}
              images={obj.photos}
            />
          )))}
      </div>
      <ul className="pagination">
        <li>1</li>
        <li className="active">2</li>
        <li>3</li>
      </ul>
    </div>
  );
}

export default App;
