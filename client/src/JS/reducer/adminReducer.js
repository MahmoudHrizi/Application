import {
    GET_ALL_USERS,
    GET_ALL_USERS_FAIL,
    GET_ALL_USERS_SUCCES,
    DELETE_USER,
    DELETE_USER_FAIL,
    DELETE_USER_SUCCES
} from "../const";
    
    const initialState = {
      listUsers:[],
      isLoading: false,
    };
    
    export default (state = initialState, { type, payload }) => {
      switch (type) {
         
          case GET_ALL_USERS:
          case DELETE_USER:
           return {...state,isLoading:true}
         case GET_ALL_USERS_SUCCES:
             return{...state,listUsers:payload,isLoading:false};
        case DELETE_USER_SUCCES:
          return{...state,isLoading:false,listUsers: state.listUsers.filter((user) => user._id !== payload)}
          
        case GET_ALL_USERS_FAIL:
        case DELETE_USER_FAIL:
          return{...state,isLoading:false,}
        default:
          return state;
      }
    };