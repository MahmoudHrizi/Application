import React , { useState }from 'react'
import { useDispatch, useSelector } from "react-redux";
import {ajouterProduit} from "../../JS/actions/clientaction";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
const AjouterProduit = () => {
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state) => state.clientReducer.isLoading
      );
  const [newProduit, setForm] = useState({
    NameProduit: "",
    Réference: "",
    Categories: "",
    Prix: "",
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
    dispatch(ajouterProduit(formData));
    //history.push("/login");
  };
  if (isLoading) {
    return (<Loader
      type="Bars"
      color="#00BFFF"
      height={100}
      width={100}
      timeout={3000} //3 secs
    />);
  }
    return (
        <div className="register-session">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register_container">
            <input
              type="text"
              className="input_text"
              placeholder=" NameProduit"
              name="NameProduit"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              className="input_text"
              name="Réference"
              placeholder="Réference"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              className="input_text"
              placeholder="Categories"
              name="Categories"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
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
            <input type="submit" value="ajouter produit" className="btn-register" />
          </div>
        </form>
      </div>
    )
}

export default AjouterProduit
