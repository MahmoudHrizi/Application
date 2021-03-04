import React, { useState } from 'react';

import "./Filter.css";
const Filter = ({updateinput,updatcategorie}) => {
  
  return (
<div className="search-header">
     
       
        <form className="search">
          <input type="text"  placeholder="Search Produit with name" onChange={(e)=>updateinput(e.target.value)}/>
          <span style={{color:"white"}}>OR</span>
          <select className="search-category " onChange={(e)=>updatcategorie(e.target.value)}>
          <option disabled>Search with category </option>
              <option >phone</option>
              <option>Laptop</option>
              <option>Ecrans</option>
              <option>watch</option>
              <option>Bureautique</option>
          </select>

        </form>
        
      </div>
      
    
  );
};

export default Filter;