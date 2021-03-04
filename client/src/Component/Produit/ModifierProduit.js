import React ,{ useState }from 'react'
import { useDispatch, useSelector } from "react-redux";
import {modifierProduit} from "../../JS/actions/clientaction";


const ModifierProduit = ({produit}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state) => state.clientReducer.isLoading
      );
  const [newProduit, setForm] = useState({
    NameProduit:produit.NameProduit,
    Réference: produit.Réference,
    Categories: produit.Categories,
    Prix:produit.Prix,
  });

  const [imageProduit, setimageProduit] = useState("");
  const handleChange = (e) =>
    setForm({ ...newProduit, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(newProduit);
    const formData = new FormData();
    formData.append("NameProduit", newProduit.NameProduit);
    formData.append("Réference", newProduit.Réference);
    formData.append("Categories", newProduit.Categories);
    formData.append("Prix", newProduit.Prix);
    formData.append("productImage",imageProduit);
    console.log(formData)
    dispatch(modifierProduit(formData,produit._id));
    //history.push("/login");
  };
    return (
        <div className="register-session">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register_container">
            <input
              type="text"
              value={newProduit.NameProduit}
              className="input_text"
              placeholder=" NameProduit"
              name="NameProduit"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              value={newProduit.Réference}
              className="input_text"
              name="Réference"
              placeholder="Réference"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              value={newProduit.Categories}
              className="input_text"
              placeholder="Categories"
              name="Categories"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              value={newProduit.Prix}
              className="input_text"
              placeholder="Prix"
              name="Prix"
              onChange={handleChange}
              required
            />
            <br/>
            <br />
            <input
              type="file"
              className="input_text"
              placeholder="ajouter photo"
              name="imageProduit"
              onChange={(e) => {
                setimageProduit(e.target.files[0]);
                //console.log("files", e.target.files[0]);
              }}
              required
            />
            <br/>
            <input type="submit" value="modifier produit" className="btn-register" />
          </div>
        </form>
      </div>
    )
}

export default ModifierProduit
