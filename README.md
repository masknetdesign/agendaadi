# Agenda ADI - Sistema de Eventos da Igreja

Sistema web para gerenciamento de eventos e ensaios da igreja.

## Funcionalidades

- Visualização de eventos e ensaios
- Filtragem por categoria e dia da semana
- Área administrativa para gerenciamento de conteúdo
- Sistema de notificações em tempo real
- Interface responsiva e moderna

## Configuração

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/agendaadi.git
cd agendaadi
```

2. Configure as variáveis de ambiente:
- Copie o arquivo `.env.example` para `.env`
- Preencha as variáveis com suas credenciais do Firebase

```bash
cp .env.example .env
```

3. Configure o Firebase:
- Crie um projeto no [Firebase Console](https://console.firebase.google.com)
- Ative o Firestore Database
- Configure as regras de segurança do Firestore
- Copie as credenciais do projeto para o arquivo `.env`

4. Implante no GitHub Pages:
- Vá para Settings > Pages no seu repositório
- Configure a branch main como source
- O site estará disponível em `https://seu-usuario.github.io/agendaadi`

## Estrutura do Projeto

- `index.html` - Página principal para visualização de eventos
- `admin.html` - Área administrativa
- `firebase-config.js` - Configuração do Firebase
- `.env` - Variáveis de ambiente (não incluir no git)
- `.env.example` - Exemplo de variáveis de ambiente

## Segurança

- Nunca compartilhe ou comite o arquivo `.env`
- Configure adequadamente as regras de segurança do Firestore
- Use autenticação para a área administrativa

## Contribuição

1. Faça um Fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/nova-feature`)
3. Commit suas mudanças (`git commit -m 'Adiciona nova feature'`)
4. Push para a branch (`git push origin feature/nova-feature`)
5. Abra um Pull Request

## Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes. 