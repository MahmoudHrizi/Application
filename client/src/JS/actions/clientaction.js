import axios from "axios";
import { toast } from "react-toastify";
import {
    GET_LIST_PRODUITS,
    GET_LIST_PRODUITS_FAIL,
    GET_LIST_PRODUITS_SUCCES,
    ADD_PRODUIT,
    ADD_PRODUIT_SUCCES,
    ADD_PRODUIT_FAIL,
    GET_MY_LISTE_PRODUIT,
    GET_MY_LISTE_PRODUIT_FAIL,
    GET_MY_LISTE_PRODUIT_SUCCES,
    COMMANDER_PRODUIT_FAIL,
    COMMANDER_PRODUIT_SUCCES,
    AFFICHER_PANIER,
    AFFICHER_PANIER_FAIL,
    AFFICHER_PANIER_SUCCES,
    MODIFIER_PRODUIT,
    MODIFIER_PRODUIT_FAIL,
    MODIFIER_PRODUIT_SUCCES,
    DELETE_PRODUIT,
    DELETE_PRODUIT_FAIL,
    DELETE_PRODUIT_SUCCES,
    REFRESH_PANIER,
    REFRESH_PANIER_FAIL,
    REFRESH_PANIER_SUCCES
  } from "../const";

  export const getallProduits = () => async (dispatch) => {
    
  
    try {
      const res = await axios.get("/api/user/afficherProduits");
      dispatch({
        type: GET_LIST_PRODUITS_SUCCES,
        payload: res.data,
      });
      console.log(res.data)
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GET_LIST_PRODUITS_FAIL,
      });
    }
  };

  export const ajouterProduit = (formData) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: ADD_PRODUIT,
    });
    try {
      const res = await axios.post("/api/user/ajouterProduit", formData, config);
      dispatch({
        type: ADD_PRODUIT_SUCCES,
        payload: res.data,
      });
      toast.success("produit ajouter", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const response = error.response.data;
      if (Array.isArray(response)) {
        response.forEach((err) => {
          toast.info(err.msg, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      dispatch({
        type: ADD_PRODUIT_FAIL,
      });
    }
  };

  export const getMypoduits = () => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: GET_MY_LISTE_PRODUIT,
    });
  
    try {
      const res = await axios.get("/api/user/afficherMesProduits",config);
      dispatch({
        type: GET_MY_LISTE_PRODUIT_SUCCES,
        payload: res.data,
      });
      console.log(res.data)
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GET_MY_LISTE_PRODUIT_FAIL,
      });
    }
  };

  export const CommanderProduit = (idProduit,idUser) => async (dispatch) => {
    
    try {
      const res = await axios.post(`/api/user/commanderProduit/${idProduit}/${idUser}`);
      dispatch({
        type: COMMANDER_PRODUIT_SUCCES,
      });
    } catch (error) {
      const response = error.response.data;
      if (Array.isArray(response)) {
        response.forEach((err) => {
          toast.info(err.msg, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      dispatch({
        type: COMMANDER_PRODUIT_FAIL,
      });
    }
  };

  export const afficherPanier = () => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: AFFICHER_PANIER,
    });
  
    try {
      const res = await axios.get("/api/user/afficherPanier",config);
      dispatch({
        type: AFFICHER_PANIER_SUCCES,
        payload: res.data,
      });
      //console.log(res.data)
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: AFFICHER_PANIER_FAIL,
      });
    }
  };

  export const modifierProduit = (formData,idproduit) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: MODIFIER_PRODUIT,
    });
    try {
      const res = await axios.put(`/api/user/updateProduit/${idproduit}`, formData, config);
      dispatch({
        type: MODIFIER_PRODUIT_SUCCES,
        payload: res.data,
      });
      toast.success("produit modifier", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const response = error.response.data;
      if (Array.isArray(response)) {
        response.forEach((err) => {
          toast.info(err.msg, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      dispatch({
        type: MODIFIER_PRODUIT_FAIL,
      });
    }
  };

  export const deleteProduit = (idProduit) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: DELETE_PRODUIT,
    });
    try {
      await axios.delete(`/api/user/deleteproduit/${idProduit}`, config);
      dispatch({
        type: DELETE_PRODUIT_SUCCES,
        payload: idProduit,
      });
      toast.success("produit supprimer", {
        draggable: true,
        position: toast.POSITION.TOP_RIGHT,
      });
    } catch (error) {
      const response = error.response.data;
      // check if the response is an array and alert it
      if (Array.isArray(response)) {
        response.forEach((err) => {
          toast.info(err.msg, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      dispatch({
        type:DELETE_PRODUIT_FAIL,
      });
    }
  };

  export const refreshPanier = (idUser) => async (dispatch) => {
  
    
    dispatch({
      type: REFRESH_PANIER,
    });
    try {
      await axios.post(`/api/user/refereshPanier/${idUser}`);
      dispatch({
        type: REFRESH_PANIER_SUCCES,
      });

    } catch (error) {
      const response = error.response.data;
      // check if the response is an array and alert it
      if (Array.isArray(response)) {
        response.forEach((err) => {
          toast.info(err.msg, {
            draggable: true,
            position: toast.POSITION.TOP_RIGHT,
          });
        });
      }
      dispatch({
        type:REFRESH_PANIER_FAIL,
      });
    }
  };


