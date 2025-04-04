// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore, collection, getDocs, addDoc, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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
        onAuthStateChanged(auth, (user) => {
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
        await signOut(auth);
    } catch (error) {
        throw error;
    }
}

// Funções do Firestore
export async function getCategories() {
    try {
        const categoriesCol = collection(db, 'categories');
        const snapshot = await getDocs(categoriesCol);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Erro ao carregar categorias:', error);
        throw error;
    }
}

export async function addCategory(categoryData) {
    try {
        const categoriesCol = collection(db, 'categories');
        const docRef = await addDoc(categoriesCol, categoryData);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar categoria:', error);
        throw error;
    }
}

export async function deleteCategory(categoryId) {
    try {
        const categoryRef = doc(db, 'categories', categoryId);
        await deleteDoc(categoryRef);
    } catch (error) {
        console.error('Erro ao deletar categoria:', error);
        throw error;
    }
}

export async function getEvents() {
    try {
        const eventsCol = collection(db, 'events');
        const snapshot = await getDocs(eventsCol);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Erro ao carregar eventos:', error);
        throw error;
    }
}

export async function addEvent(eventData) {
    try {
        const eventsCol = collection(db, 'events');
        const docRef = await addDoc(eventsCol, eventData);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar evento:', error);
        throw error;
    }
}

export async function deleteEvent(eventId) {
    try {
        const eventRef = doc(db, 'events', eventId);
        await deleteDoc(eventRef);
    } catch (error) {
        console.error('Erro ao deletar evento:', error);
        throw error;
    }
}

export async function getRehearsals() {
    try {
        const rehearsalsCol = collection(db, 'rehearsals');
        const snapshot = await getDocs(rehearsalsCol);
        return snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data()
        }));
    } catch (error) {
        console.error('Erro ao carregar ensaios:', error);
        throw error;
    }
}

export async function addRehearsal(rehearsalData) {
    try {
        const rehearsalsCol = collection(db, 'rehearsals');
        const docRef = await addDoc(rehearsalsCol, rehearsalData);
        return docRef.id;
    } catch (error) {
        console.error('Erro ao adicionar ensaio:', error);
        throw error;
    }
}

export async function deleteRehearsal(rehearsalId) {
    try {
        const rehearsalRef = doc(db, 'rehearsals', rehearsalId);
        await deleteDoc(rehearsalRef);
    } catch (error) {
        console.error('Erro ao deletar ensaio:', error);
        throw error;
    }
}

// Exportar as instâncias e funções
export { db, auth };