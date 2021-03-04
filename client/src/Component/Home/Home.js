import React,{ useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getallProduits } from "../../JS/actions/clientaction";
import ProduitCard from './ProduitCard';
import Filter from "./Filter";
import "./Home.css";
import CarouselTest from './CarouselTest'
import Footer from './Footer'
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Home = () => {
  const user = useSelector(
    (state) => state.authReducer.user
  );
    const dispatch = useDispatch();
    const [searchinput, setsearchinput] = useState("");
  const [searchcategorie, setsearchCategorie] = useState("");
  const listProduits = useSelector((state) => state.clientReducer.listProduits);
  const isLoading = useSelector(
    (state) => state.authReducer.isLoading
  );
 
  if (isLoading) {
    return (
      <Loader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />
    );
  }
  
  useEffect(() => {
  dispatch(getallProduits());
  }, [dispatch]);

  const updateinput = (search) => {
    setsearchinput(search);
  };

  const updatcategorie = (categorie) => {
    setsearchCategorie(categorie);
  };
  
  const displayProduits = () => {
    let filtredProduits = [];
    if (
      searchinput === "" ||
      (searchinput !== "" && searchcategorie === "")
    ) {
      filtredProduits = listProduits.filter((produit) => {
        return produit.NameProduit.toLowerCase().includes(searchinput.toLowerCase());
      });
    }
    if (searchinput !== "" && searchcategorie !== "") {
      filtredProduits = listProduits.filter((produit) => {
        return (
          produit.NameProduit.toLowerCase().includes(searchinput.toLowerCase()) &&
          produit.Categories === searchcategorie
        );
      });
    }
    if (searchinput === "" && searchcategorie!=="") {
      console.log(true);
      filtredProduits = listProduits.filter((produit) => {
        return produit.Categories === searchcategorie;
      });
    }

    if (filtredProduits.length !== 0) {
      return filtredProduits.map((produit) => {
        return <ProduitCard produit={produit} key={produit._id} />;
      });
    } else {
      return (
        <h1 style={{ color: "white", marginTop: "220px", padding: "10px" }}>
          There is no produits ...
        </h1>
      );
    }
  };
//console.log(user)
    return (
      <React.Fragment>

       
        <div className="home-container">
        <CarouselTest/> 
           <Filter   updateinput={updateinput} updatcategorie={updatcategorie} />
         
        <div className="List-container">
        <div className="List-produit">{ displayProduits()}</div>
      </div>
      <Footer/>
      </div>
      
    </React.Fragment>
    )

}

export default Home
