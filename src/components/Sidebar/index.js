import React,{useState} from 'react';
import { MdHome } from "react-icons/md";
import { BsDatabaseFillAdd } from "react-icons/bs";
import { LuDot } from "react-icons/lu";
import { TbHelpSquareFilled } from "react-icons/tb";
import './index.css';
const iconSize = 20
const Sidebar = () => {
    const [isDropDown,setDropDown] = useState(true)
    const displayMode = isDropDown ? "block":"none";
    return (
        <div className="sidebar">
            <div className="logo-image-container">
                <img className='logo1' src='https://res.cloudinary.com/dbb5puzve/image/upload/v1735836374/digitrac_short_logo_y5617q.png' alt='logo'/>
                <img className='logo2' src='https://res.cloudinary.com/dbb5puzve/image/upload/v1735836367/digitrac_full_logo_dol2n6.png' alt='logo'/>
            </div>
            <ul className="options-container">
                <li><a href="#home"><MdHome size={iconSize}/><span className="sidebar-span">Home</span></a></li>
                <li onClick = {()=>setDropDown(prevState=>!prevState)}><a href="#master"><BsDatabaseFillAdd size={iconSize} /><span className="sidebar-span">Masters</span></a></li>
                <li className="drop-down-item" style={{display:displayMode}}><a href="/branch"><LuDot  size={iconSize}/><span className="sidebar-span">Branch</span></a></li>
                <li><a href="#contact"><TbHelpSquareFilled  size={iconSize}/><span className="sidebar-span">Help</span></a></li>
            </ul>
        </div>
    );
};

export default Sidebar;