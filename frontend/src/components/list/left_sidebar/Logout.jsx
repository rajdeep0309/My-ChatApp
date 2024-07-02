import React from "react";
import './list.css';  
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Logout() {
    
    const navigate = useNavigate();
    
    const onChangeHandler = (e) => {
    //   console.log('Logout');
      const user = JSON.parse(localStorage.getItem('userData'));
    //   const user= user;
      axios.post('http://localhost:3001/api/v1/user/logout',{user},{
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
    });
        localStorage.removeItem('accessToken');
        // localStorage.removeItem('userData');
        navigate('/');
    };

    return (
        <button className="logout-button" onClick={onChangeHandler}>
            Logout
        </button>
    );
}

export default Logout;
