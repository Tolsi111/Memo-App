import {useState, useEffect, useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faCheck, faInfoCircle, faTimes} from "@fortawesome/free-solid-svg-icons";
import classes from "./Forms.module.css";
import AuthContext from "../../store/auth-context";
import {useNavigate} from "react-router-dom";

const PWD_REGEX = /^(?=.*[a-z]).{6,24}$/;

function Profile() {

    const authCtx = useContext(AuthContext);

    const navigate = useNavigate();

    const [pwd, setPwd] = useState('');
    const [validPwd, setValidPwd] = useState(false);
    const [pwdFocus, setPwdFocus] = useState(false);

    const [matchPwd, setMatchPwd] = useState('');
    const [validMatch, setValidMatch] = useState(false);
    const [matchFocus, setMatchFocus] = useState(false);

    const [isLoading, setIsLoading] = useState(false);

    const [errMsg, setErrMsg] = useState('');
    const [success, setSuccess] = useState(false);

    useEffect(() => {
        setValidPwd(PWD_REGEX.test(pwd));
        setValidMatch(pwd === matchPwd);
    }, [pwd, matchPwd])

    function handleLogout() {
        authCtx.logout();
        navigate('/notes');
    }

    function handleSubmit(event) {
        event.preventDefault();
        setIsLoading(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA', {
            method: 'POST',
            body: JSON.stringify({
                idToken: authCtx.token,
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
                return res.json();
            } else {
                return res.json().then(data => {
                    setErrMsg(data.error.message);
                });
            }
        }).then(data => {
            const expirationTime = new Date(new Date().getTime() + (+data.expiresIn * 1000));
            authCtx.login(data.idToken, data.email, expirationTime.toISOString());
        });
    }

    return (
        <section>
            <h1>Profile</h1>
            <br/>
            <h3>Logged in as : {authCtx.email}</h3>
            <form onSubmit={handleSubmit} autoComplete="off">
                {!success && <>
                <label htmlFor="change-password">Change password:
                    {!success && <FontAwesomeIcon icon={faCheck} className={validPwd ? classes.valid : classes.hide}/>}
                    {!success && <FontAwesomeIcon icon={faTimes} className={validPwd || !pwd ? classes.hide : classes.invalid}/>}
                </label>
                <p className={errMsg ? classes.errmsg : classes.offscreen} >{errMsg}</p>
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
                    <button disabled={!validPwd || !validMatch}>Confirm Change Password</button>
                </>}
                {isLoading && <p>Loading...</p>}
                {success && <p>Password changed!</p>}
            </form>
            <button onClick={handleLogout}>Logout</button>
        </section>
    );
}

export default Profile;