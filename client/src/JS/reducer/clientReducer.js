import {
    GET_LIST_PRODUITS,
    GET_LIST_PRODUITS_FAIL,
    GET_LIST_PRODUITS_SUCCES,
    ADD_PRODUIT,
    ADD_PRODUIT_FAIL,
    ADD_PRODUIT_SUCCES,
    GET_MY_LISTE_PRODUIT,
    GET_MY_LISTE_PRODUIT_FAIL,
    GET_MY_LISTE_PRODUIT_SUCCES,
    COMMANDER_PRODUIT_SUCCES,
    COMMANDER_PRODUIT_FAIL,
    AFFICHER_PANIER,
    AFFICHER_PANIER_SUCCES,
    AFFICHER_PANIER_FAIL,
    MODIFIER_PRODUIT,
    MODIFIER_PRODUIT_FAIL,
    MODIFIER_PRODUIT_SUCCES,
    DELETE_PRODUIT_SUCCES,
    DELETE_PRODUIT_FAIL,
    DELETE_PRODUIT,
    REFRESH_PANIER_SUCCES,
    REFRESH_PANIER,
    REFRESH_PANIER_FAIL
} from "../const";
    
    const initialState = {
      listProduits:[],
      isLoading: false,
      mylistproduit:[],
      monPanier:[],
    };
    
    export default (state = initialState, { type, payload }) => {
      switch (type) {
         case ADD_PRODUIT:
         case   GET_MY_LISTE_PRODUIT:
         case AFFICHER_PANIER:
          case MODIFIER_PRODUIT:
          case DELETE_PRODUIT:
          case REFRESH_PANIER:
           return {...state,isLoading:true}
         case GET_LIST_PRODUITS_SUCCES:
             return{...state,listProduits:payload,isLoading:false};
        case GET_LIST_PRODUITS_FAIL:
        case GET_MY_LISTE_PRODUIT_FAIL:
        case ADD_PRODUIT_FAIL:
        case COMMANDER_PRODUIT_FAIL :
        case AFFICHER_PANIER_FAIL:
        case MODIFIER_PRODUIT_FAIL:
        case DELETE_PRODUIT_FAIL:
          case REFRESH_PANIER_FAIL:
            return{...state,isLoading:false}
        case ADD_PRODUIT_SUCCES:
          return{...state,listProduits:[...state.listProduits,payload],isLoading:false,mylistproduit:[payload,...state.mylistproduit]}
          case GET_MY_LISTE_PRODUIT_SUCCES:
          case MODIFIER_PRODUIT_SUCCES:
            return {...state,isLoading:false,mylistproduit:payload}
          case AFFICHER_PANIER_SUCCES:
            return{...state,isLoading:false,monPanier:payload}
          case DELETE_PRODUIT_SUCCES:
            return {
              ...state,
              isLoading: false,
              mylistproduit: state.mylistproduit.filter((produit) => produit._id !== payload),
            };
        case REFRESH_PANIER_SUCCES:
          return {...state,monPanier:[],isLoading:false}
        default:
          return state;
      }
    };