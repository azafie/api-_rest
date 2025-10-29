🧩 CRUD de Clientes com Node.js e Express

Este projeto é um CRUD completo (Create, Read, Update, Delete) desenvolvido em Node.js utilizando o framework Express.
O objetivo é demonstrar o funcionamento básico de uma API REST para gerenciar uma lista de clientes.

🚀 Tecnologias utilizadas

Node.js — Ambiente de execução JavaScript.

Express.js — Framework para criação de servidores HTTP.

Insomnia — Ferramenta para testar as requisições da API (similar ao Postman).

📂 Estrutura básica do projeto
project/
├── index.js        # Código principal do servidor
├── package.json    # Dependências e scripts do projeto
└── README.md       # Documentação do projeto

🧠 Explicação do código
1️⃣ Importação do Express
import express from "express";


Importa o módulo Express, responsável por criar e gerenciar o servidor HTTP.

2️⃣ Criação da instância do servidor
const server = express();


Cria uma instância do servidor usando o Express, permitindo definir rotas e middlewares.

3️⃣ Middleware para interpretar JSON
server.use(express.json());


Permite que o servidor entenda dados enviados em formato JSON no corpo (body) das requisições.

4️⃣ "Banco de dados" temporário (em memória)
let customers = [
  { id: 1, name: "eumesmo", site: "www.google.com" },
  { id: 2, name: "fulano", site: "www.example.com" },
  { id: 3, name: "beltrano", site: "www.testsite.com" },
  { id: 4, name: "ciclano", site: "www.meusite.com" },
  { id: 5, name: "amigo", site: "www.sitio.com" }
];


Cria um array com objetos representando os clientes.

Funciona como um banco de dados em memória apenas para fins de teste.

📡 Rotas da API (CRUD)
➕ POST /customers — Criar cliente
server.post("/customers", (req, res) => {
  const { name, site } = req.body;
  const nextID = customers.length > 0
    ? customers[customers.length - 1].id + 1
    : 1;
  const newCustomer = { id: nextID, name, site };
  customers.push(newCustomer);
  return res.status(201).json(newCustomer);
});


Cria um novo cliente com os dados enviados no body.

Calcula automaticamente o próximo ID.

Retorna o novo cliente criado (status 201).

🔍 GET /customers — Listar todos os clientes
server.get("/customers", (req, res) => {
  return res.json(customers);
});


Retorna todos os clientes cadastrados no array.

🔎 GET /customers/:id — Buscar cliente por ID
server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const customer = customers.find(item => item.id === id);
  const status = customer ? 200 : 404;
  return res.status(status).json(customer);
});


Busca um cliente específico pelo ID informado na URL.

Retorna 404 se o cliente não existir.

✏️ PUT /customers/:id — Atualizar cliente existente
server.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, site } = req.body;
  const customer = customers.find(c => c.id === id);
  
  if (!customer) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  if (name) customer.name = name;
  if (site) customer.site = site;

  return res.status(200).json(customer);
});


Atualiza apenas os campos enviados no body.

Retorna erro 404 caso o cliente não seja encontrado.

❌ DELETE /customers/:id — Excluir cliente
server.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = customers.findIndex(item => item.id === id);

  if (index >= 0) {
    customers.splice(index, 1);
    return res.status(200).json({ message: "Cliente removido com sucesso" });
  } else {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
});


Remove o cliente do array se o ID existir.

Retorna mensagem de sucesso ou erro 404.

🚀 Inicialização do servidor
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});


Inicia o servidor na porta 3000.

⚙️ Como usar a API (CRUD completo)

A seguir estão os exemplos de uso na ordem CRUD —
Criar, Listar, Atualizar e Deletar clientes, utilizando o Insomnia ou qualquer cliente HTTP.

🟢 1️⃣ Criar um novo cliente (CREATE)

Método: POST
URL: http://localhost:3000/customers

Corpo da requisição (Body → JSON):
{
  "name": "joaosilva",
  "site": "www.joaosite.com"
}

Resposta esperada:
{
  "id": 6,
  "name": "joaosilva",
  "site": "www.joaosite.com"
}


✅ Novo cliente criado com sucesso (status 201).

🔵 2️⃣ Listar clientes (READ)
a) Listar todos

Método: GET
URL: http://localhost:3000/customers

Exemplo de resposta:
[
  { "id": 1, "name": "eumesmo", "site": "www.google.com" },
  { "id": 2, "name": "fulano", "site": "www.example.com" },
  { "id": 3, "name": "beltrano", "site": "www.testsite.com" },
  { "id": 6, "name": "joaosilva", "site": "www.joaosite.com" }
]

b) Listar um cliente específico

Método: GET
URL: http://localhost:3000/customers/2

Resposta esperada:
{
  "id": 2,
  "name": "fulano",
  "site": "www.example.com"
}

🟡 3️⃣ Atualizar um cliente (UPDATE)

Método: PUT
URL: http://localhost:3000/customers/3

Corpo da requisição (Body → JSON):
{
  "name": "beltrano atualizado",
  "site": "www.siteatualizado.com"
}

Resposta esperada:
{
  "id": 3,
  "name": "beltrano atualizado",
  "site": "www.siteatualizado.com"
}


✅ Cliente atualizado com sucesso (status 200).

🔴 4️⃣ Deletar um cliente (DELETE)

Método: DELETE
URL: http://localhost:3000/customers/5

Resposta esperada:
{
  "message": "Cliente removido com sucesso"
}


✅ Cliente excluído do sistema (status 200).

🔁 Resumo rápido do CRUD
Operação	Método	URL	Descrição
C	POST	/customers	Cria um novo cliente
R	GET	/customers	Lista todos os clientes
R	GET	/customers/:id	Mostra um cliente específico
U	PUT	/customers/:id	Atualiza os dados de um cliente
D	DELETE	/customers/:id	Remove um cliente existente




Exibe uma mensagem no terminal confirmando o funcionamento.

📬 Testando com Insomnia
Método	URL	Descrição
GET	http://localhost:3000/customers	Lista todos os clientes
GET	http://localhost:3000/customers/:id	Retorna um cliente específico
POST	http://localhost:3000/customers	Cria um novo cliente
PUT	http://localhost:3000/customers/:id	Atualiza um cliente existente
DELETE	http://localhost:3000/customers/:id	Remove um cliente

💡 Dica: Use o Insomnia (ou Postman) para enviar e testar as requisições JSON.

🧱 Próximos passos

🔹 Conectar a API a um banco de dados real (MySQL ou SQLite).
🔹 Adicionar validações e tratamento de erros.
🔹 Implementar autenticação e rotas protegidas.
🔹 Criar interface frontend para interagir com a API.

🧑‍💻 Autor

Emerson Oliveira
💻 Desenvolvedor e estudante de Análise e Desenvolvimento de Sistemas
📘 Apaixonado por PHP, Node.js e sistemas web.