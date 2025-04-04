// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBkrBLKuklZgPm1nz2G997ULiYycZMb9F8",
    authDomain: "avisoseeventos.firebaseapp.com",
    databaseURL: "https://avisoseeventos-default-rtdb.firebaseio.com",
    projectId: "avisoseeventos",
    storageBucket: "avisoseeventos.appspot.com",
    messagingSenderId: "247706769451",
    appId: "1:247706769451:web:ce31cd9d0ca22cd267b26e",
    measurementId: "G-QE1Z4RQ60T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Função para verificar autenticação
export async function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    });
}

// Função para login
export async function login(email, password) {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Função para logout
export async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
}

// Exportar as instâncias do Firebase
export { db, auth };