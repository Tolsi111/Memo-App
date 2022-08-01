import React from "react";
import EventNoteIcon from '@mui/icons-material/EventNote';
import {NavLink} from "react-router-dom";
// import classes from './Header.module.css'

function Header() {
    return (<header>
        <h1><EventNoteIcon/> Memo app</h1>
        <nav>
            <ul>
                <li>
                    <h1><NavLink to={'/notes'} activeClassName={"active"}>Notes</NavLink></h1>
                </li>
                <li>
                    <h1><NavLink to={'/new-note'} activeClassName={"active"}>Add a note</NavLink></h1>
                </li>
            </ul>
    </nav>
</header>)
    ;
}

export default Header;