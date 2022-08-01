import {initializeApp} from "firebase/app";
import {getDatabase} from "firebase/database";

function StartFirebase() {
    const firebaseConfig = {
        apiKey: "AIzaSyDNdPXneiScTdz5FGRt0PhxSzaLXuGqlPA",
        authDomain: "react-app-3f88c.firebaseapp.com",
        databaseURL: "https://react-app-3f88c-default-rtdb.europe-west1.firebasedatabase.app",
        projectId: "react-app-3f88c",
        storageBucket: "react-app-3f88c.appspot.com",
        messagingSenderId: "289629530021",
        appId: "1:289629530021:web:c62ad6918234c3ce356a4c",
        measurementId: "G-CMJF3Y0C14"
    };

    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    return getDatabase(app);
}

export default StartFirebase;