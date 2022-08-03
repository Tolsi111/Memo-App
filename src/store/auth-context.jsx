import React, {useState} from 'react';

const AuthContext = React.createContext({
    token: '',
    isLoggedIn: false,
    email: '',
    login: (token) => {
    },
    logout: () => {
    }

})

function computeRemainingTime (expirationTime) {
    const currentTime = new Date().getTime();
    const convertedExpirationTime = new Date(expirationTime).getTime();

    return convertedExpirationTime - currentTime;
};

export function AuthContextProvider(props) {
    const initialToken = localStorage.getItem('token')
    const initialEmail = localStorage.getItem('email')
    const [token, setToken] = useState(initialToken);
    const [email, setEmail] = useState(initialEmail);

    const userIsLoggedIn = !!token;

    function logoutHandler() {
        setToken(null)
        setEmail(null)
        localStorage.removeItem('token');
    }

    function loginHandler(token, email, expirationTime) {
        setToken(token);
        setEmail(email);
        localStorage.setItem('token',token);
        localStorage.setItem('email',email);

        const remainingTime = computeRemainingTime(expirationTime);

        console.log(remainingTime)

        setTimeout(logoutHandler, remainingTime);
    }

    const contextValue = {
        token: token,
        isLoggedIn: userIsLoggedIn,
        email: email,
        login: loginHandler,
        logout: logoutHandler
    }

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>
}

export default AuthContext;