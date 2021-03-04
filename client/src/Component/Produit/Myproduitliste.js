import React, { useState,useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux";
import {getMypoduits,ajouterProduit  } from "../../JS/actions/clientaction";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AjouterProduit from "../Produit/AjouterProduit";
import MyProduitsCard from '../Home/MyProduitsCard'
import "./Myproduitliste.css";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

const Myproduitliste = () => {
    const [show, setshow] = useState(false);
    const dispatch = useDispatch();
    const mylistproduit = useSelector((state) => state.clientReducer.mylistproduit);
  const isLoading = useSelector(
    (state) => state.clientReducer.isLoading
  );
  useEffect(() => {
    dispatch(getMypoduits());
  }, [dispatch]);
  if (isLoading) {
    return  <Loader
    className="Spinner"
    type="Bars"
    color="#00BFFF"
    height={100}
    width={100}
    timeout={3000} //3 secs
  />;
  }
  const onOpenModal = () => {
    setshow(true);
  };

  const onCloseModal = () => {
    setshow(false);
  };

  
    return (
      <div className="produit">
        
          
            <ToastContainer />
        <div className="cat">
        {mylistproduit.length ===0 ? <h1>there is no produits </h1> :mylistproduit.map((produit)=> {
            return <MyProduitsCard produit={produit} key={produit._id}/>
        })}
        
        </div>
        <Modal open={show} onClose={onCloseModal} center>
        <AjouterProduit />
      </Modal>
        <button className="add-btn" onClick={onOpenModal}>
            Add new produit
          </button>
     
      </div>
    )
}

export default Myproduitliste
