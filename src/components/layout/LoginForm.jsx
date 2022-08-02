import React, {useContext} from "react";
import {useRef, useState, useEffect} from "react";
import classes from './Forms.module.css'
import AuthContext from "../../store/auth-context";

function LoginForm() {
    const userRef = useRef();
    const errRef = useRef();

    const authCtx = useContext(AuthContext);

    const [isLoading,setIsLoading] = useState(false);

    const [user, setUser] = useState('');
    const [pwd, setPwd] = useState('');
    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd])

    function handleSubmit(event) {
        //https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA
        event.preventDefault();
        console.log("Start Sign Up!")
        setIsLoading(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA', {
            method: 'POST',
            body: JSON.stringify({
                email: user,
                password: pwd,
                returnSecureToken: true
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(res => {
            setIsLoading(false);
            if (res.ok) {
                setSuccess(true);
                return res.json();
            } else {
                return res.json().then(data => {
                    setErrMsg(data.error.message)
                });
            }
        }).then(data => {
            console.log(data);
            authCtx.login(data.idToken,data.email);
        });
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>You are logged in!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen}>{errMsg}</p>
                    <h1>Sign In</h1>
                    <form onSubmit={handleSubmit}>
                        <label htmlFor="username">Email:</label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            autoComplete="off"
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                        />

                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                        />
                        {!isLoading && <button>Sign In</button>}
                        {isLoading && <p>Loading...</p>}
                    </form>
                </section>
            )}
        </>
    );

}

export default LoginForm;