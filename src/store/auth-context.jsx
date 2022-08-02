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

export function AuthContextProvider(props) {
    const [token, setToken] = useState('');
    const [email, setEmail] = useState('');

    const userIsLoggedIn = !!token;

    function loginHandler(token, email) {
        console.log("login");
        setToken(token);
        setEmail(email);
    }

    function logoutHandler() {
        console.log("logout");
        setToken(null)
        setEmail(null)
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