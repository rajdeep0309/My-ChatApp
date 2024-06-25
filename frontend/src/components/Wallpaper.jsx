import React from 'react';
import './ChatArea.css';
import Wall from '../assets/swall.jpg';
function Wallpaper(){
    return (
        <div className="bg-wallpaper">
            <img src={Wall}/>
        </div>
    );
}

export default Wallpaper;