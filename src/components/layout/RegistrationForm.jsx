import {useRef, useState, useEffect} from "react";
import {faCheck, faTimes, faInfoCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import classes from './Forms.module.css'

const EMAIL_REGEX = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const PWD_REGEX = /^(?=.*[a-z]).{6,24}$/;

function RegistrationForm() {
    const userRef = useRef();
    const errRef = useRef();

    const [isLoading,setIsLoading] = useState(false);

    const [user, setUser] = useState('');
    const [validName, setValidName] = useState(false);
    const [userFocus, setUserFocus] = useState(false);

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        userRef.current.focus();
    }, [])

    useEffect(() => {
        setValidName(EMAIL_REGEX.test(user));
    }, [user])

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    useEffect(() => {
        setErrMsg('');
    }, [user, pwd, matchPwd])

    function handleSubmit(event) {
        //https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA
        event.preventDefault();
        console.log("Start Sign Up!")
        setIsLoading(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA', {
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
                // ...
                setSuccess(true);
            } else {
                return res.json().then(data => {
                    setErrMsg(data.error.message);
                });
            }
        });
    }

    return (
        <>
            {success ? (
                <section>
                    <h1>Success!</h1>
                </section>
            ) : (
                <section>
                    <p ref={errRef} className={errMsg ? classes.errmsg : classes.offscreen} >{errMsg}</p>
                    <h1>Register</h1>
                    <form onSubmit={handleSubmit} autoComplete="off">
                        <label htmlFor="username">
                            Email:
                            <FontAwesomeIcon icon={faCheck} className={validName ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validName || !user ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="text"
                            id="username"
                            ref={userRef}
                            onChange={(e) => setUser(e.target.value)}
                            value={user}
                            required
                            onFocus={() => setUserFocus(true)}
                            onBlur={() => setUserFocus(false)}
                        />
                        <p id="uidnote" className={userFocus && user && !validName ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            please enter a valid email.<br/>
                            Letters, numbers, underscores, hyphens allowed.
                        </p>


                        <label htmlFor="password">
                            Password:
                            <FontAwesomeIcon icon={faCheck} className={validPwd ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="password"
                            onChange={(e) => setPwd(e.target.value)}
                            value={pwd}
                            required
                            onFocus={() => setPwdFocus(true)}
                            onBlur={() => setPwdFocus(false)}
                        />
                        <p id="pwdnote" className={pwdFocus && !validPwd ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            6 to 24 characters.<br/>
                            Must include a lowercase letter.<br/>
                        </p>


                        <label htmlFor="confirm_pwd">
                            Confirm Password:
                            <FontAwesomeIcon icon={faCheck} className={validMatch && matchPwd ? classes.valid : classes.hide}/>
                            <FontAwesomeIcon icon={faTimes} className={validMatch || !matchPwd ? classes.hide : classes.invalid}/>
                        </label>
                        <input
                            type="password"
                            id="confirm_pwd"
                            onChange={(e) => setMatchPwd(e.target.value)}
                            value={matchPwd}
                            required
                            onFocus={() => setMatchFocus(true)}
                            onBlur={() => setMatchFocus(false)}
                        />
                        <p id="confirmnote" className={matchFocus && !validMatch ? classes.instructions : classes.offscreen}>
                            <FontAwesomeIcon icon={faInfoCircle}/>
                            Must match the first password input field.
                        </p>
                        {!isLoading && <button disabled={!validName || !validPwd || !validMatch ? true : false}>Sign Up</button>}
                        {isLoading && <p>Loading...</p>}
                    </form>
                </section>
            )}
        </>
    );
}

export default RegistrationForm;