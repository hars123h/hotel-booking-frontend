import React, {useState} from 'react';
import {  toast } from 'react-toastify';
import { login } from '../actions/auth.action';
import LoginForm from '../components/LoginForm';
import {useDispatch} from 'react-redux';
import { useNavigate } from 'react-router-dom';



const Login = () => {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.table({name, email, password})
    // console.log('Send Login data', {email, password });

    try {
      const res = await login({
        email,
        password
      })
      // console.log("Res", res);
      if(res.data) {
        console.log('Save user Res in Redux and Local Storage');
        //console.log(res.data);
        window.localStorage.setItem('auth', JSON.stringify(res.data))

        //save user and  token in redux
        dispatch({
          type: 'LOGGED_IN_USER',
          payload: res.data
        })
        navigate('/private');
      }
      // toast.success("Login  success. Please Login")
      // navigate('/login')
    }
    catch (err) {
      console.log(err);
      if (err.response.status === 400)
        toast.error(err.response.data)

    }
  }
  return <>
       <div className="container-fluid bg-secondary p-5 text-center">
      <h1> Login Page</h1>
  </div>

  <div className="container">
    <div className="row">
      <div className="col-md-6 offset-md-3">
        <LoginForm
         handleSubmit={handleSubmit}
           email={email}
           setEmail={setEmail}
           password={password}
           setPassword={setPassword}
         />
      </div>
    </div>
  </div>

  </>;
};

export default Login;
