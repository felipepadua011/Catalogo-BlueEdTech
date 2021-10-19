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

app.get("/quem", function (req, res) {
    res.render("quem");
})

app.post("quem", function (req, res) {

})
app.get("/lista", async (req,res) => {
    const carro = await Carro.findAll();
    const carro4 = await Carrodescricao.findAll();

    listaprincipal = [];

    for (let item = 0; item < carro.length; item++) {
        let novocarro = { imagem: carro[item].imagem,
            id: carro[item].id,
            nome: carro[item].nome, 
            tipo: carro4[item].tipo,
            }
        listaprincipal.push(novocarro);
      }

    res.render("lista", {
        message: message,
        listaprincipal: listaprincipal
    });
});

app.get("/detalhes", function (req, res) {
    res.render("detalhes");
});

app.get("/detalhes/:id", async (req,res) => {
    const carro = await Carro.findByPk(req.params.id);
    const carro2 = await Carrofabricacao.findByPk(req.params.id);
    const carro3 = await Carrovalor.findByPk(req.params.id);
    const carro4 = await Carrodescricao.findByPk(req.params.id);
    const carro5 = await Carromotor.findByPk(req.params.id);

    let novocarro = { imagem: carro.imagem,
        nome: carro.nome, 
        modelo: carro.modelo,  
        marca: carro.marca, 
        velocidade: carro2.velocidade,
        tipo: carro4.tipo,
        motor: carro5.motor,
        valor: carro3.valor,
        fabricadoem: carro2.fabricadoem,
        fabricadono: carro2.fabricadono,
        cambio: carro5.cambio,
        informacoes: carro4.informacoes,
    }

    res.render("detalhes.ejs", { carro: novocarro });

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
    
    carro.nome = nome;
    carro.imagem = imagem;
    carro.modelo = modelo;
    carro.marca = marca;
    carro5.velocidade = velocidade;
    carro4.tipo = tipo;
    carro5.motor = motor;
    carro3.valor = valor;
    carro2.fabricadoem = fabricadoem;
    carro2.fabricadono = fabricadono;
    carro5.cambio = cambio;
    carro4.informacoes = informacoes;

    const carroCarro = await carro.save();
    const carroFab = await carro2.save();
    const carroValue = await carro3.save();
    const carroDesc = await carro4.save();
    const carroMot = await await carro5.save();

    message = `Perfeito, carro editado com sucesso.`;

    setTimeout(() => {
        message = ""
    }, 5000);

    res.redirect("/lista");
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

    message ="Carro cadastrado com sucesso";
    
    setTimeout(() => {
        message = ""
    }, 5000);
    
    res.redirect("/lista");
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


app.get("/deletar/:id", async (req,res) => {
    const carro = await Carro.findByPk(req.params.id);
    const carro2 = await Carrofabricacao.findByPk(req.params.id);
    const carro3 = await Carrovalor.findByPk(req.params.id);
    const carro4 = await Carrodescricao.findByPk(req.params.id);
    const carro5 = await Carromotor.findByPk(req.params.id);

    await carro.destroy();
    await carro2.destroy();
    await carro3.destroy();
    await carro4.destroy();
    await carro5.destroy();
    res.redirect("/lista");
});

db.conectado();

app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
