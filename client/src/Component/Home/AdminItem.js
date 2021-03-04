import React from 'react'
import { useDispatch, useSelector } from "react-redux";
import {deleteUser} from "../../JS/actions/adminaction";
const AdminItem = ({user}) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(
        (state) => state.adminReducer.isLoading
      );
      if (isLoading) {
        return (
          <h1>loaadingauth.....</h1>
        );
      }
    const handleSubmit=(e)=>{
        e.preventDefault();
        dispatch(deleteUser(user._id))
    }
    return (
        <div className='user-item'>
            <div className='user_img'>
            <img src={user.avatar} alt="userimg"/>
            </div>
            <div className='user_info'>
            <p>Name:{user.Name}</p>
            <p>LastName:{user.LastName}</p>
            <p>email:{user.email}</p>
            </div>
            <button className="btn-delete" onClick={handleSubmit}><i class="far fa-trash-alt"></i></button>
        </div>
    )
}

export default AdminItem
