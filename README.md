# Agenda ADI

Sistema de gerenciamento de eventos e ensaios para igreja.

## Configuração do Ambiente

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agendaadi.git
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
   - Copie o arquivo `.env.example` para `.env`
   - Preencha as variáveis de ambiente com suas credenciais do Firebase

4. Inicie o servidor de desenvolvimento:
```bash
npm start
```

## Variáveis de Ambiente

O projeto requer as seguintes variáveis de ambiente:

- `FIREBASE_API_KEY`: Chave da API do Firebase
- `FIREBASE_AUTH_DOMAIN`: Domínio de autenticação do Firebase
- `FIREBASE_PROJECT_ID`: ID do projeto no Firebase
- `FIREBASE_STORAGE_BUCKET`: Bucket de armazenamento do Firebase
- `FIREBASE_MESSAGING_SENDER_ID`: ID do remetente de mensagens do Firebase
- `FIREBASE_APP_ID`: ID do aplicativo do Firebase

## Segurança

- Nunca compartilhe suas chaves de API
- Mantenha o arquivo `.env` fora do controle de versão
- Use o arquivo `.env.example` como modelo para configurar suas variáveis de ambiente 