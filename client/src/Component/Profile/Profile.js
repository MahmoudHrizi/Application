import React ,{useState}from 'react'
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import UpdateProfile from './UpdateProfile'
import './Profile.css'
const Profile = () => {
    const [show, setshow] = useState(false);
    const user = useSelector((state) => state.authReducer.user);
    const onOpenModal = () => {
        setshow(true);
      };
    
      const onCloseModal = () => {
        setshow(false);
      };
    
    return (
        <>
        <div className="profile-container">
            <div className='img-profile'>
            <img src={user.avatar} alt='avatar'/>
            </div>
            <div className="info-container">
            <p>name: {user.Name}</p>
            <p>LastName: {user.LastName}</p>
            <p>email: {user.email}</p>
            <p>PhoneNumber: {user.PhoneNumber}</p>
            </div>
            <button onClick={onOpenModal}>update</button>
        </div>
        
        <Modal open={show} onClose={onCloseModal} center>
        <UpdateProfile user={user}/>
      </Modal>
      </>
    )
}

export default Profile
