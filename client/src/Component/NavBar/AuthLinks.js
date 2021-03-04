import React from 'react'
import { useSelector, useDispatch } from "react-redux";
import { Link,Redirect } from "react-router-dom";
import { logout } from "../../JS/actions/authaction";
import {refreshPanier} from "../../JS/actions/clientaction";
const AuthLinks = ({history}) => {
    const dispatch = useDispatch();
  const user = useSelector((state) => state.authReducer.user);
  const nbrProduit = useSelector((state) => state.authReducer.nbrProduit);
  const logOut =()=>{
    dispatch(logout())
    dispatch(refreshPanier(user._id))

  }
    return (
        <React.Fragment>
      
      
      <button onClick={logOut} className="log-out">
        <i className="fas fa-sign-out-alt"></i>Logout
      </button>
      <Link to="/Profile" className="profile-link">
        <span className="user-name">
          {user.Name[0] + " " + user.LastName[0]}
        </span>
      </Link>
      <div className="link-navigation buy">

        <i class="fas fa-shopping-cart"></i>

        </div> <Link to ="/Panier" className="panier-link">
                  <div className="cart">

                   {nbrProduit}
                    </div>
                    </Link>

    </React.Fragment>
    )
}

export default AuthLinks
