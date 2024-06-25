import React from 'react';
import './ChatArea.css';
import Wall from '../assets/swall.jpg';
function Wallpaper(){
    return (
        <div className="chat-area">
            <img src={Wall} className='img-wall'/>
        </div>
    );
}

export default Wallpaper;