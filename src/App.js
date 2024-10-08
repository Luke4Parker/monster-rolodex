import { useState, useEffect } from 'react';
import CardList from './components/card-list/card-list.component';
import SearchBox from './components/search-box/search-box.component';
import './App.css';

const App = () => {

  const [searchField, setSearchField] = useState('');
  const [monsters, setMonsters] = useState([]);
  const [filteredMonsters, setFilteredMonsters] = useState(monsters);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
        .then((res) => res.json())
        .then((users) => setMonsters(users)
      );
  }, []);

  useEffect(()=>{
    const newFilteredMonsters = monsters.filter((m)=>{
      return m.name.toLocaleLowerCase().includes(searchField);
    });
    setFilteredMonsters(newFilteredMonsters);
  }, [monsters, searchField]);

  const onSearchChange = (event) => {
    const searchFieldString = event.target.value.toLocaleLowerCase();
    setSearchField(searchFieldString);
  }
  
  return (
    <div className="App">
      <h1 className='app-title'>
        Monsters Rolodex
      </h1>
      <SearchBox 
      onChangeHandler={onSearchChange} 
      className={'monster-search-box'} 
      placeholder={'Search Monsters'}/>
      
      <CardList monsters={filteredMonsters}/>
    </div>
  );
}

export default App;
