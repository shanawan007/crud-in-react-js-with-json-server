import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';

const ProtectedRoutes = (props) => {
  const Component = props.Component;
  const navigate = useNavigate();
  const loggedIn = localStorage.getItem('user-info');
  const login = JSON.parse(loggedIn)
  useEffect(()=>{
    if(!login){
      navigate('/login')
    }
    else if(!login.roleAdmin){
      navigate('/');
    }
  },[]);
return(
  <div>
    <Component />
  </div>
)
}
export default ProtectedRoutes;