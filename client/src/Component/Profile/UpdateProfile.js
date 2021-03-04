import React,{ useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import{Updateprofile } from "../../JS/actions/authaction"
const UpdateProfile = ({user}) => {
    const dispatch = useDispatch();
    const [formData, setForm] = useState({
        Name: user.Name,
        LastName: user.LastName,
        email: user.email,
        PhoneNumber: user.PhoneNumber,
      });
      const handleChange = (e) =>
        setForm({ ...formData, [e.target.name]: e.target.value });
    
      const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(Updateprofile(formData))
        console.log(formData);
      };
      
    return (
        <div className="register-session">
        <form className="register-form" onSubmit={handleSubmit}>
          <div className="register_container">
           
            <input
               type="text"
               value={formData.Name}
               className="input_text"
               placeholder=" NameProduit"
               name="Name"
               onChange={handleChange}
               required
            />
            <br />
            <input
              type="text"
              className="input_text"
              name="LastName"
              value={formData.LastName}
              placeholder="Last Name"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="email"
              className="input_text"
              value={formData.email}
              placeholder="Email"
              name="email"
              onChange={handleChange}
              required
            />
            <br />
            <input
              type="text"
              className="input_text"
              name="PhoneNumber"
              value={formData.PhoneNumber}
              placeholder="phoneNumber"
              onChange={handleChange}
              required
            />
            <br />
            
            <input type="submit" value="Register" className="btn-register" />
          </div>
        </form>
      </div>
    )
}

export default UpdateProfile
