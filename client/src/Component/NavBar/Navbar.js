import React from 'react'
import { Link } from "react-router-dom";
import AuthLinks from "./AuthLinks";
import GuestLinks from "./GuestLinks";
import { useSelector } from "react-redux";
//import logo2 from "../../img/logo2.jpg";
import "./Navbar.css";
const Navbar = () => {
    const isAuth = useSelector((state) => state.authReducer.isAuth);
    const user = useSelector((state)=>state.authReducer.user);
    
    const displayMenu=()=> {
      if(isAuth && user.role==="client" ){
        return <Link to="/ajouterProduit" className="link-navigation nav">Mes produits</Link>
      }else if(isAuth && user.role==="Admin"){
        return <Link to="/dashboard" className="link-navigation nav">Liste Users</Link>
      }else{
        return null
      }
       
    }
    return (

      <div className="navigation dark">
            <div className="navigation-container w-row">
              <div className="logo-col w-col w-col-2">
                <div className="nav-logo-div">

                  <Link to="/">
                    <h2 className="nav-logo-div w-inline-block w--current">logo
                    <img src="https://assets-global.website-files.com/5fd01dbcd387a144a2fab08d/5fd01dbcd387a1d851fab0d6_MOON_Ultra_Logo_Mark_(Light)%402x.png" loading="lazy" sizes="(max-width: 991px) 100vw, 130px" srcset="https://assets-global.website-files.com/5fd01dbcd387a144a2fab08d/5fd01dbcd387a1d851fab0d6_MOON_Ultra_Logo_Mark_(Light)%25402x-p-500.png 500w, https://assets-global.website-files.com/5fd01dbcd387a144a2fab08d/5fd01dbcd387a1d851fab0d6_MOON_Ultra_Logo_Mark_(Light)%402x.png 641w" alt="" class="logo"></img>
                    </h2>
                  </Link>
                </div>
              </div>
              <div className="link-col w-col w-col-8">
                <div className="nav-links-div">
                <div className="nav-links-wrapper main-nav">
                  <Link to ="/" className="link-navigation nav">Shope</Link>
                 {displayMenu()} 
                  </div>
                </div>

              </div>
              <div className="cart-col w-col w-col-2">
                <div className="cart-wrapper">
                  <div className="html-embed nav-cart w-embed">
                    <div id="toggle" className="toggle shopify-buy-frame shopify-buy-frame--toggle">
                      <div className="is-inline shopify-buy__cart-toggle">
                          <div className="navbar-menu link-navigation buy">
                               {isAuth ? <AuthLinks /> : <GuestLinks />}
                            </div>
                        </div>
                        </div>
                     </div>
                   </div>                 
                  </div>            
                 </div>
              </div>

    )
}

export default Navbar
