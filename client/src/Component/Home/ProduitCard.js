import React from 'react'
import "./ProduitCard.css";
import { useDispatch,useSelector} from "react-redux";
import {CommanderProduit} from "../../JS/actions/clientaction"
import {Redirect } from "react-router-dom";
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ProduitCard = ({produit}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const nbrProduit = useSelector((state) => state.authReducer.nbrProduit);
  const commanderProduit =()=>{
    if(!isAuth){
      toast.info("login or register", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    }
    if(isAuth){
      dispatch(CommanderProduit(produit._id,user._id));
      localStorage.setItem("nbrProduits",Number(nbrProduit)+1);
    }
    
  }
    return (
      <React.Fragment>
        <ToastContainer/>
        <div className="card">
          <div className="poster">
            <img src={produit.productImage} alt="avengertof" />
          </div>
          <div className="name">
            <h2>{produit.NameProduit}</h2>
              <div className="reference">
                <p>{produit.Réference}</p>
              </div>
              <div className="Prix">
                <h2>{produit.Prix} DT</h2>
              </div>
              <div className="option">
                  <button onClick={commanderProduit} className="btn-panier"><i class="fas fa-cart-arrow-down"></i></button>
               </div>
            </div>
          </div>
      </React.Fragment>
    )
}

export default ProduitCard
