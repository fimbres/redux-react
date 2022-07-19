import { initializeApp } from "firebase/app";

const firebaseConfig = {
    apiKey: "AIzaSyBeBad9Rxdv9pN0R31xFI65fY6aaR8L_lU",
    authDomain: "redux-toolkit-project-6cfe2.firebaseapp.com",
    databaseURL: "https://redux-toolkit-project-6cfe2-default-rtdb.firebaseio.com",
    projectId: "redux-toolkit-project-6cfe2",
    storageBucket: "redux-toolkit-project-6cfe2.appspot.com",
    messagingSenderId: "572290845552",
    appId: "1:572290845552:web:a7216fa05bdcd9a24c5db5",
    measurementId: "G-MG2N18W2EC"
};

export const initialize = () => {
    return initializeApp(firebaseConfig);
};
