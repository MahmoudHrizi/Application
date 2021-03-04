import axios from "axios";
import {
    REGISTER_USER_SUCCESS,
    REGISTER_USER,
    REGISTER_USER_FAIL,
    LOGIN_USER,
    LOGIN_USER_FAIL,
    LOGIN_USER_SUCCESS,
    SET_LOADING,
    AUTH_FAIL,
    GET_AUTH_USER,
    LOGOUT,
    UPDATE_PROFIL,
    UPDATE_PROFIL_SUCCES,
    UPDATE_PROFIL_FAIL

  } from "../const";

  export const register = (formData) => async (dispatch) => {
    dispatch({
        type: REGISTER_USER,
      });
    try {
      const res = await axios.post("/api/user/register", formData);
      
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: res.data, // { user : {name , lastName , ... }}
      });
    } catch (error) {
      //response is the error array from the server
      const response = error.response.data;
      // check if the response is an array and alert it
      if (Array.isArray(response)) {
        response.forEach((err) => {
         alert(err.msg)
        });
      }
      console.log(response);
      dispatch({
        type: REGISTER_USER_FAIL,
      });
    }
  };

  export const login = (formData) => async (dispatch) => {
    try {
      const res = await axios.post("/api/user/login", formData);
  
      // save the token in the localstorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("nbrProduits",0);
      //console.log(res.data.user.Name);
      // dispatch the action with a payload
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: res.data, // {token , user  }
      });
    } catch (error) {
      //response is the error array from the server
      const response = error.response.data;
      // check if the response is an array and alert it
      if (Array.isArray(response)) {
        response.forEach((err) => {
         alert(err.msg)
        });
      }
  
      dispatch({
        type: LOGIN_USER_FAIL,
      });
    }
  };
  export const getAuthUser = () => async (dispatch) => {
    dispatch({
      type: SET_LOADING,
    });
  
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    try {
      const res = await axios.get("/api/user/current", config);
  
      dispatch({
        type: GET_AUTH_USER,
        payload: res.data, // { user : {name , lastName , ... }}
      });
    } catch (error) {
      dispatch({
        type: AUTH_FAIL,
      });
    }
  };
  export const logout = () => async (dispatch) => {
    localStorage.removeItem("token");
    localStorage.removeItem('nbrProduits');
    dispatch({
      type: LOGOUT,
    });
  };

  export const Updateprofile = (formData) => async (dispatch) => {
    dispatch({
        type: UPDATE_PROFIL,
      });
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
    try {
      const res = await axios.put("/api/user/updateProfile", formData,config);
      
      dispatch({
        type: UPDATE_PROFIL_SUCCES,
        payload: res.data, // { user : {name , lastName , ... }}
      });
    } catch (error) {
      //response is the error array from the server
      const response = error.response.data;
      // check if the response is an array and alert it
      if (Array.isArray(response)) {
        response.forEach((err) => {
         alert(err.msg)
        });
      }
      console.log(response);
      dispatch({
        type: UPDATE_PROFIL_FAIL
    })
  }
}
