import React ,{ useState,useEffect }from 'react';
import { useDispatch, useSelector } from "react-redux";
import {afficherPanier } from "../../JS/actions/clientaction";
import PanierItem from './PanierItem'
import "./Panier.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const Panier = () => {
    const dispatch = useDispatch();
    const monPanier = useSelector((state) => state.clientReducer.monPanier);
  const isLoading = useSelector(
    (state) => state.clientReducer.isLoading
  );
  useEffect(() => {
    dispatch(afficherPanier());
  }, [dispatch]);

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
    return (
        <div className="Panier-container">
            {monPanier.map((produit)=>{
                return <PanierItem produit={produit}/>
            })}
        </div>
    )
}

export default Panier
