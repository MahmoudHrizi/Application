import React ,{useState} from 'react'
import { useDispatch,useSelector} from "react-redux";
import {CommanderProduit,deleteProduit} from "../../JS/actions/clientaction"
import ModifierProduit from "../Produit/ModifierProduit";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { ToastContainer ,toast} from "react-toastify";
const MyProduitsCard = ({produit}) => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const nbrProduit = useSelector((state) => state.clientReducer.nbrProduit);
  const [show, setshow] = useState(false);


  const onOpenModal = () => {
    setshow(true);
  };

  const onCloseModal = () => {
    setshow(false);
  };

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
                <h2>{produit.Prix}</h2>
              </div>
              <div className="option">
                  
                  <button  onClick={() => { dispatch(deleteProduit(produit._id));}} className="btn-option"><i class="far fa-trash-alt"></i></button>
                  <button onClick={onOpenModal} className="btn-option"><i class="fas fa-pen-alt"></i></button>
               </div>
            </div>
            <Modal open={show} onClose={onCloseModal} center>
        <ModifierProduit produit={produit}/>
      </Modal>
          </div>
      </React.Fragment>




      
/*<React.Fragment>
        <ToastContainer/>

        <div className="card">
          
        <div className="option">
        <button  onClick={() => {
              dispatch(deleteProduit(produit._id));
            }}>delete</button>
        <button onClick={onOpenModal}>update</button>
        </div>
      </div>
      <Modal open={show} onClose={onCloseModal} center>
        <ModifierProduit produit={produit}/>
      </Modal>
      
      </div>
      </React.Fragment>*/
    )
}

export default MyProduitsCard
