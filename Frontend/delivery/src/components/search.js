import React, { useState } from 'react';

function SearchBar({handlesubmit}) {
    const [searchInput, setSearchInput] = useState("");

    const handlechange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    }

    return (
      <div class='SearchBar'>
        <form onSubmit={handlesubmit}>
            <input
                type="text"
                placeholder='ID de la commande'
                onChange={handlechange}
                value={searchInput}
            />
            <input type='Submit' value="Rechercher"/>
        </form>
      </div>
    );
  }
  
  export default SearchBar;