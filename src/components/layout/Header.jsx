import EventNoteIcon from '@mui/icons-material/EventNote';
import {NavLink} from "react-router-dom";
import React, {useContext} from "react";
import AuthContext from "../../store/auth-context";

// import classes from './Header.module.css'

function Header() {
    const authCtx = useContext(AuthContext);

    return (<header>
        <h1><EventNoteIcon/> Memo app</h1>
        <nav>
            <ul>
                <li>
                    <h1><NavLink to={'/notes'} activeClassName={"active"}>Notes</NavLink></h1>
                </li>
                {authCtx.isLoggedIn && <li>
                    <h1><NavLink to={'/new-note'} activeClassName={"active"}>Add a note</NavLink></h1>
                </li>}
            </ul>
        </nav>
        <nav>
            {!authCtx.isLoggedIn && <ul>
                <li>
                    <h1><NavLink to={'/login'} activeClassName={"active"}>Login</NavLink></h1>
                </li>
                <li>
                    <h1><NavLink to={'/register'} activeClassName={"active"}>Register</NavLink></h1>
                </li>
            </ul>}
            {authCtx.isLoggedIn && <ul>
                <li>
                    <h1><NavLink to={'/logout'} activeClassName={"active"}>Logout</NavLink></h1>
                </li>
            </ul>}
        </nav>
    </header>)
        ;
}

export default Header;