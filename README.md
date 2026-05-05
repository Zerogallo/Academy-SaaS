# 🏋️ Academy SaaS – Sistema de Gestão para Academias

Sistema completo de gestão de academia com controle de check-in, tempo de treino, esteira, treinos periodizados (A/B/C), ranking gamificado, perfil do aluno com comentários e reações, e renovação obrigatória de avaliação a cada 3 meses.

![React](https://img.shields.io/badge/React-18-61DAFB?logo=react)
![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite)
![NestJS](https://img.shields.io/badge/NestJS-10-E0234E?logo=nestjs)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite)
![JWT](-000000?logo=jsonwebtokens)

---

## ✨ Funcionalidades

- **Check-in / Check-out**  
  Registro de entrada e saída com cálculo automático do tempo na academia.  
  Timer em tempo real e botão visual (roxo/verde) indicando sessão ativa.

- **Controle de Esteira**  
  Sessão separada com timer individual.  
  Metas diárias (60 min academia / 30 min esteira) exibidas em **barras de progresso animadas**.

- **Treinos Periodizados (A/B/C)**  
  - **Treino A:** Peito, Ombro, Tríceps  
  - **Treino B:** Costas, Bíceps  
  - **Treino C:** Pernas, Abdômen  
  - Página dedicada com detalhes completos: aparelho, séries, repetições, dicas.  
  - Treino recomendado do dia destacado com badge “⭐ Recomendado”.

- **Ranking Gamificado**  
  - Top 3 com medalhas 🥇🥈🥉 (ouro, prata, bronze)  
  - Filtro por **última semana** ou **último mês**  
  - Exibe tempo total na academia + esteira

- **Perfil do Aluno**  
  - Upload de foto, edição de nome  
  - **Comentário público** que aparece no ranking  
  - Botões 👍 / 👎 para interação entre os alunos

- **Avaliação Obrigatória**  
  - Renovação a cada 3 meses  
  - Sistema alerta e impede o acesso à ficha se vencida

- **Autenticação JWT**  
  - Registro, login, proteção de rotas

---

## 🛠️ Tecnologias

### Backend
- [NestJS](https://nestjs.com/) – framework Node.js progressivo
- [TypeORM](https://typeorm.io/) – ORM para SQLite
- [SQLite](https://sqlite.org/) – banco de dados leve
- [Passport JWT](https://www.passportjs.org/) – autenticação
- [Multer](https://github.com/expressjs/multer) – upload de fotos

### Frontend
- [React 18](https://react.dev/) – biblioteca de interfaces
- [Vite](https://vitejs.dev/) – build tool
- [React Router DOM](https://reactrouter.com/) – roteamento
- [Axios](https://axios-http.com/) – consumo da API
- CSS puro (responsivo)

---


## 🚀 Como executar o projeto

### Pré-requisitos
```bash
- Node.js 18+ e npm instalados
- Git (opcional)
```

### Backend
```bash
cd backend
npm install
npm run start:dev
```
### Frontend
```bash
cd frontend
npm install
npm run dev
```

Acesse http://localhost:5173 no navegador.

Nota: Certifique-se de que o backend está rodando antes de usar o frontend.

---

🔌 Principais Endpoints da API

Método Rota Descrição
```bash
POST /auth/register Cadastro (multipart/form-data)
POST /auth/login Login → retorna JWT
GET /users/profile Dados do usuário logado
PUT /users/profile Atualizar nome/foto
GET /users/needs-evaluation Verifica necessidade de avaliação
POST /users/renew-evaluation Renova avaliação
POST /checkins/in Check-in
POST /checkins/out Check-out
GET /checkins/active Sessão ativa
POST /treadmill/start Iniciar esteira
POST /treadmill/end Finalizar esteira
GET /treadmill/active Sessão de esteira ativa
GET /workouts/all Lista todos os treinos (A,B,C)
GET /workouts/today Treino recomendado do dia
GET /workouts/:type Detalhes de um treino (A/B/C)
GET /rankings?period=week/month Ranking top 3
GET /stats/today Minutos acumulados (barras de progresso)
GET /comments/all Todos os comentários
POST /comments/me Criar/editar comentário próprio
POST /comments/:id/react 👍 ou 👎 em um comentário
```
---

👨‍💻 Autor

Desenvolvido como um trabalho freelancer para um cliente dono de academia.
Para contratar soluções personalizadas, entre em contato via LinkedIn.

---
