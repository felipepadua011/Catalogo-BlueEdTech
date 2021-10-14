const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require("path");
require('dotenv').config();
const db = require("./model/database");
const carro = require('./model/carro');

let listaprincipal = [
    {
    imagem: "https://cdn.autopapo.com.br/box/uploads/2020/02/17174829/nova-ram-2500-2020-dianteira.jpeg",    
    nome: "Dodge Ram",
    modelo: "Ram 2500",
    marca: "Dodge",
    velocidade: "293",
    tipo: "De corrida",
    motor: "Turbodiesel de 6,7 litros, 365 cavalos de potência e 110,7 kgfm de torque.",
    valor: "289.900",
    fabricadoem: "2014",
    fabricadono: "México",
    cambio: "Automática",
    informacoes: "Com mais de 6 metros de comprimento, é um dos maiores à venda no Brasil atualmente. Outros números impactantes: o entre-eixos, de 3,80m. Já com a capacidade de carga, de 1.030 kg, daria para levar o Uno na caçamba, caso coubesse."
}];

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "view/public")));

app.use(express.urlencoded());

let message = "";

app.get("/", (req, res) => {

    res.render("home", {
        message,
        listaprincipal,
    });

});

app.post("/", function (req, res) {
})

app.get("/lista", async (req,res) => {
    // const carro = await carro.findAll();

    res.render("lista", {
        message,
        listaprincipal,
    });
    
});

app.get("/detalhes", function (req, res) {
    res.render("detalhes", { det: "Cadastro dos Pokemons" });
});

app.get("/detalhes/:id", (req, res) => {
  const id = req.params.id
  const principal = listaprincipal[id]
  res.render("detalhes.ejs", { principal })
});

app.get("/editar/:id", async (req,res) => {
    // const carro = await carro.findByPk(req.params.id);
    res.render("editar.ejs", { carro: carro });
});

app.post("/editar/:id", async (req,res) =>{
    // const carro = await carro.findByPk(req.params.id);
    const { imagem, nome, modelo, marca, velocidade, tipo, motor, valor, fabricadoem, fabricadono, cambio, informacoes } = req.body;
    
    carro.Nome = nome;
    carro.Descriçao = descricao;
    carro.Setor = setor;
    carro.modelo;
    carro.marca;
    carro.velocidade;
    carro.tipo;
    carro.motor;
    carro.valor;
    carro.fabricadoem;
    carro.fabricadono;
    carro.cambio;
    carro.informacoes;

    await carro.save();
});


app.get("/criar", function (req, res) {
    res.render("criar");
});

app.post("/criar", async (req,res) => {    
    const { imagem, nome, modelo, marca, velocidade, tipo, motor, valor, fabricadoem, fabricadono, cambio, informacoes } = req.body;
    // const carro = await carro.create ({ 
    //     nome: nome, 
    //     modelo:modelo, 
    //     marca:marca, 
    //     velocidade:velocidade, 
    //     tipo: tipo, 
    //     motor: motor, 
    //     valor: valor, 
    //     fabricadoem: fabricadoem, 
    //     fabricadono: fabricadono, 
    //     cambio:cambio, 
    //     informacoes: informacoes });

});

app.get("/recebecar" , function (req, res) {
    res.render("lista")
    const {nome, marca} = req.query;
    res.send({nome: nome, marca: marca});
})

app.post("/recebecar" , function (req, res) {
    const { imagem, nome, modelo, marca, velocidade, tipo, motor, valor, fabricadoem, fabricadono, cambio, informacoes } = req.body;
    
    let novocarro = { imagem:imagem, 
        nome: nome, 
        modelo:modelo, 
        marca:marca, 
        velocidade:velocidade, 
        tipo: tipo, 
        motor: motor, 
        valor: valor, 
        fabricadoem: fabricadoem, 
        fabricadono: fabricadono, 
        cambio:cambio,
        informacoes: informacoes
    }

    listaprincipal.push(novocarro)

    message = `Perfeito, carro cadastrado com sucesso.`;

    setTimeout(() => {
        message = ""
    }, 5000);

    res.redirect("/lista");
})

app.get('/deletar/:id', async (req,res) => {
    // const carro = await carro.findByPk(req.params.id);

    // await carro.destroy();
    res.render("deletar")
});

db.conectado();

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
