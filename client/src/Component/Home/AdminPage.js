import React,{useEffect} from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getallUsers} from "../../JS/actions/adminaction";
import AdminItem from './AdminItem'
import "./AdminPage.css"
const AdminPage = () => {
    const dispatch = useDispatch();
    const listUsers = useSelector((state) => state.adminReducer.listUsers);
  const isLoading = useSelector(
    (state) => state.adminReducer.isLoading
  );
  useEffect(() => {
    dispatch(getallUsers());
    }, [dispatch]);
  
  if (isLoading) {
    return (
      <h1>loaadingauth.....</h1>
    );
  }
    return (
        <div className="user-container">
           {listUsers.map((user)=>{
               return <AdminItem user={user}/>
           })}
        </div>
    )
}

export default AdminPage
