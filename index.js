// Importando o módulo Express para facilitar a criação do servidor HTTP
import express from "express";

// Criando a instância do servidor Express
const server = express();

// Adiciona middleware para permitir que o Express interprete dados JSON enviados no body das requisições
server.use(express.json());

// Array de clientes (banco de dados em memória, usado como exemplo)
let customers = [
  { id: 1, name: "eumesmo", site: "www.google.com" },
  { id: 2, name: "fulano", site: "www.example.com" },
  { id: 3, name: "beltrano", site: "www.testsite.com" },
  { id: 4, name: "ciclano", site: "www.meusite.com" },
  { id: 5, name: "amigo", site: "www.sitio.com" }
];

// ROTA GET: retorna todos os clientes cadastrados
server.get("/customers", (req, res) => {
  return res.json(customers);
});

// ROTA GET: retorna um cliente específico pelo ID fornecido na URL
server.get("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id); // Converte o parâmetro id da URL para número
  const customer = customers.find(item => item.id === id); // Busca o cliente pelo ID no array
  const status = customer ? 200 : 404; // Define status 200 se achou, 404 se não achou
  return res.status(status).json(customer); // Retorna o cliente (ou null se não achou)
});

// ROTA POST: cria um novo cliente usando os dados do body da requisição
server.post("/customers", (req, res) => {
  const { name, site } = req.body; // Obtém os dados do cliente enviados pelo usuário
  // Calcula o próximo ID com base no último cliente do array
  const nextID = customers.length > 0
    ? customers[customers.length - 1].id + 1
    : 1;
  // Monta o novo objeto cliente
  const newCustomer = { id: nextID, name, site };
  customers.push(newCustomer); // Adiciona o novo cliente ao array
  return res.status(201).json(newCustomer); // Retorna o novo cliente criado, com status 201
});

// ROTA PUT: atualiza um cliente existente pelo ID fornecido na URL
server.put("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const { name, site } = req.body;

  const customer = customers.find(c => c.id === id);
  if (!customer) {
    return res.status(404).json({ message: "Cliente não encontrado" });
  }

  // Atualiza apenas os campos recebidos
  if (name) customer.name = name;
  if (site) customer.site = site;

  return res.status(200).json(customer);
});

//delete 


// ROTA DELETE: remove um cliente existente pelo ID fornecido na URL
server.delete("/customers/:id", (req, res) => {
  const id = parseInt(req.params.id); // Converte o parâmetro id da URL para número
  const index = customers.findIndex(item => item.id === id); // Procura o índice do cliente no array

  const status = index >= 0 ? 200 : 404; // Se achou retorna 200, senão 404

  if (index >= 0) {
    customers.splice(index, 1);
    return res.status(200).json({ message: "Cliente removido com sucesso" });
  } else {
    return res.status(404).json({ error: "Cliente não encontrado" });
  }
});
         // Inicializa o servidor na porta 3000 e exibe mensagem no console
server.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
