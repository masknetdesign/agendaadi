# Agenda ADI

Sistema de gerenciamento de eventos e ensaios para a igreja ADI.

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agendaadi.git
```

2. Crie um arquivo `firebase-config.js` na raiz do projeto com suas credenciais do Firebase:
```javascript
// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "sua-api-key",
    authDomain: "seu-auth-domain",
    projectId: "seu-project-id",
    storageBucket: "seu-storage-bucket",
    messagingSenderId: "seu-messaging-sender-id",
    appId: "seu-app-id"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

// Função para verificar autenticação
async function checkAuth() {
    return new Promise((resolve) => {
        auth.onAuthStateChanged((user) => {
            resolve(user);
        });
    });
}

// Função para login
async function login(email, password) {
    try {
        const userCredential = await auth.signInWithEmailAndPassword(email, password);
        return userCredential.user;
    } catch (error) {
        throw error;
    }
}

// Função para logout
async function logout() {
    try {
        await auth.signOut();
    } catch (error) {
        throw error;
    }
}

export { db, auth, checkAuth, login, logout };
```

3. Configure o Firebase:
   - Crie um projeto no [Firebase Console](https://console.firebase.google.com)
   - Ative o Authentication e o Firestore
   - Configure as regras de segurança do Firestore
   - Crie um usuário administrador

4. Acesse a aplicação:
   - Abra `index.html` para visualizar os eventos
   - Acesse `admin.html` para gerenciar eventos (requer login)

## Estrutura do Projeto

- `index.html` - Página principal com visualização de eventos
- `admin.html` - Área administrativa
- `firebase-config.js` - Configuração do Firebase (não versionado)
- `firebase-config.example.js` - Exemplo de configuração
- `styles/` - Arquivos CSS
- `scripts/` - Arquivos JavaScript

## Segurança

- O arquivo `firebase-config.js` contém credenciais sensíveis e não deve ser compartilhado
- Use o arquivo `firebase-config.example.js` como referência para configuração
- Configure as regras de segurança do Firestore adequadamente 