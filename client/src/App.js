import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import './App.css';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Register from "./Component/authForm/Register";
import Login from "./Component/authForm/Login";
import Home from "./Component/Home/Home";
import PrivateRoute from "./Component/PrivateRoute";
//import AjouterProduit from './Component/Produit/AjouterProduit'
import Myproduitliste from './Component/Produit/Myproduitliste'
import Navbar from './Component/NavBar/Navbar'
import Panier from './Component/Panier/Panier'
import Profile from './Component/Profile/Profile'
import AdminPage from './Component/Home/AdminPage'
import {getAuthUser} from "./JS/actions/authaction";
function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.authReducer.isLoading);
  const isAuth = useSelector((state) => state.authReducer.isAuth);
  const user = useSelector(
    (state) => state.authReducer.user
  );
  useEffect(() => {
    dispatch(getAuthUser());
  }, [dispatch]);
 
  
console.log("user",user)
  return (
    <Router>
       <Navbar />
      <Switch>
      <div className="home-container">
        <Route exact path="/" component={Home} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <PrivateRoute path="/ajouterProduit" component={Myproduitliste}/>
        <PrivateRoute path="/Panier" component={Panier}/>
        <PrivateRoute path="/Profile" component={Profile}/>
        <PrivateRoute path="/dashboard" component={AdminPage}/>
        </div>
      </Switch>
    </Router>
  );
}

export default App;
