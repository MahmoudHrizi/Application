import {
  REGISTER_USER,
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  LOGIN_USER,
  LOGIN_USER_FAIL,
  LOGIN_USER_SUCCESS,
  SET_LOADING,
  GET_AUTH_USER,
  AUTH_FAIL,
  LOGOUT,
  COMMANDER_PRODUIT_SUCCES,
  UPDATE_PROFIL,
  UPDATE_PROFIL_SUCCES,
  UPDATE_PROFIL_FAIL
  
} from "../const";
  
  const initialState = {
    token: null,
    user: null,
    isLoading: false,
    isAuth: false,
    isRegister: false,
    nbrProduit:localStorage.getItem("nbrProduits")
  };
  
  export default (state = initialState, { type, payload }) => {
    switch (type) {
      case REGISTER_USER:
      case LOGIN_USER:
      case SET_LOADING:
        case  UPDATE_PROFIL:
        return { ...state, isLoading: true };
        case REGISTER_USER_SUCCESS:
      return {
        ...state,
        isRegister: true,
        user: payload.user,
        token: payload.token,
        isLoading: false,
      };
      case  UPDATE_PROFIL_SUCCES:
        return{
          ...state,
          isLoading:false,
          user:payload
        }
        case UPDATE_PROFIL_FAIL:
          return{
            ...state,
            isLoading:false
          }
      case GET_AUTH_USER:
      return {
        ...state,
        isAuth: true,
        isRegister: true,
        isLoading: false,
        user: payload.user,
      };
      case LOGIN_USER_SUCCESS:
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        token: payload.token,
        user: payload.user,
        isRegister: true,
      };
      case LOGIN_USER_FAIL:
        return {
          ...state,
          isAuth: false,
          isLoading: false,
          user: null,
          token: null,
        };
      case REGISTER_USER_FAIL:
        return {
          ...state,
          isRegister: false,
          isLoading: false,
          user: null,
          token: null,
        };
        case AUTH_FAIL:
    case LOGOUT:
      return {
        ...state,
        isAuth: false,
        isLoading: false,
        token: null,
        user: null,
        isRegister: false,
        nbrProduit:0
      };
      case COMMANDER_PRODUIT_SUCCES:
        return {...state,nbrProduit:localStorage.getItem("nbrProduits")}
      default:
        return state;
    }
  };