import axios from "axios";
import { toast } from "react-toastify";
import {
   GET_ALL_USERS,
   GET_ALL_USERS_SUCCES,
   GET_ALL_USERS_FAIL,
 DELETE_USER,
   DELETE_USER_SUCCES,
   DELETE_USER_FAIL
   
  } from "../const";

  export const getallUsers = () => async (dispatch) => {
    
    dispatch({
        type: GET_ALL_USERS,
      });
      const config = {
        headers: {
          Authorization: localStorage.getItem("token"),
        },
      };
    try {
      const res = await axios.get("/api/admin/listUsers",config);
      dispatch({
        type: GET_ALL_USERS_SUCCES,
        payload: res.data,
      });
      console.log(res.data)
    } catch (error) {
      console.log(error.response);
      dispatch({
        type: GET_ALL_USERS_FAIL,
      });
    }
  };

  export const deleteUser = (idUser) => async (dispatch) => {
    const config = {
      headers: {
        Authorization: localStorage.getItem("token"),
      },
    };
    dispatch({
      type: DELETE_USER,
    });
    try {
      await axios.delete(`/api/admin/deleteUser/${idUser}`, config);
      dispatch({
        type: DELETE_USER_SUCCES,
        payload: idUser,
      });
      toast.success("USER supprimer", {
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
        type:DELETE_USER_FAIL,
      });
    }
  };