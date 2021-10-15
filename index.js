const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require("path");
require('dotenv').config();
const db = require("./model/database");
const Carro = require('./model/carro');
const Carrofabricacao = require('./model/carro2');
const Carrovalor = require('./model/carro3');
const Carrodescricao = require('./model/carro4');
const Carromotor = require('./model/carro5');


let listaprincipal = [];

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
    const carro = await Carro.findAll();
    const carro2 = await Carrofabricacao.findAll();
    const carro3 = await Carrovalor.findAll();
    const carro4 = await Carrodescricao.findAll();
    const carro5 = await Carromotor.findAll();

    res.render("lista", {
        carro,
        carro2,
        carro3,
        carro4,
        carro5,
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
    const carro = await Carro.findByPk(req.params.id);
    const carro2 = await Carrofabricacao.findByPk(req.params.id);
    const carro3 = await Carrovalor.findByPk(req.params.id);
    const carro4 = await Carrodescricao.findByPk(req.params.id);
    const carro5 = await Carromotor.findByPk(req.params.id);

    res.render("editar.ejs", { carro, carro2, carro3, carro4, carro5,});
});

app.post("/editar/:id", async (req,res) =>{
    const carro = await Carro.findByPk(req.params.id);
    const carro2 = await Carrofabricacao.findByPk(req.params.id);
    const carro3 = await Carrovalor.findByPk(req.params.id);
    const carro4 = await Carrodescricao.findByPk(req.params.id);
    const carro5 = await Carromotor.findByPk(req.params.id);
    const { imagem, nome, modelo, marca, velocidade, tipo, motor, valor, fabricadoem, fabricadono, cambio, informacoes } = req.body;
    
    carro.nome;
    carro.imagem;
    carro.modelo;
    carro.marca;
    carro5.velocidade;
    carro4.tipo;
    carro5.motor;
    carro3.valor;
    carro2.fabricadoem;
    carro2.fabricadono;
    carro5.cambio;
    carro4.informacoes;

    await Carro.save();
    await Carrofabricacao.save();
    await Carrovalor.save();
    await Carrodescricao.save();
    await Carromotor.save();
});


app.get("/criar", function (req, res) {
    res.render("criar");
});

app.post("/criar", async (req,res) => {    
    const { imagem, nome, modelo, marca, velocidade, tipo, motor, valor, fabricadoem, fabricadono, cambio, informacoes } = req.body;
    const carro = await Carro.create ({ 
        nome: nome, 
        modelo:modelo, 
        marca:marca,
        imagem: imagem,    
    });
    
    const carro2 = await Carrofabricacao.create ({ 
        fabricadoem: fabricadoem, 
        fabricadono: fabricadono
    });

    const carro3 = await Carrovalor.create ({ 
        valor: valor
    });

    const carro4 = await Carrodescricao.create ({ 
        tipo: tipo, 
        informacoes: informacoes 
    });

    const carro5 = await Carromotor.create ({ 
        velocidade:velocidade,
        motor: motor, 
        cambio:cambio
    });
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
    const carro = await Carro.findByPk(req.params.id);
    const carro2 = await Carrofabricacao.findByPk(req.params.id);
    const carro3 = await Carrovalor.findByPk(req.params.id);
    const carro4 = await Carrodescricao.findByPk(req.params.id);
    const carro5 = await Carromotor.findByPk(req.params.id);

    await Carro.destroy();
    await Carrofabricacao.destroy();
    await Carrovalor.destroy();
    await Carrodescricao.destroy();
    await Carromotor.destroy();
    res.render("deletar")
});

db.conectado();

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
