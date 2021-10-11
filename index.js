const express = require('express');
const app = express();
const porta = process.env.PORT || 3000;
const path = require("path");

let listaprincipal = [
    {
    imagem: "https://i.pinimg.com/originals/96/69/7e/96697ef35d09ed8c9855e82bd77e460b.jpg",    
    nome: "Lancer Evolution X",
    modelo: "X",
    marca: "Mitsubishi",
    velocidade: "293",
    tipo: "De corrida",
    informacoes: "Possui ar condicionado, capaciadade de até 5 pessoas dentro, porta malas espaçoso, vem com step reserva."
  }];

app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname, "public")));

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

app.get("/lista", function (req, res) {

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

app.get("/criar", function (req, res) {
    res.render("criar");
});

app.get("/criar", function (req, res) {
    const { imagem, nome, modelo, marca, velocidade, tipo, informacoes } = req.body;
    const site = { imagem:imagem, nome: nome, modelo:modelo, marca:marca, velocidade:velocidade, tipo: tipo, informacoes: informacoes };
    res.render("criar", site);
    res.render("/")
});

app.get("/recebecar" , function (req, res) {
    res.render("lista")
    const {nome, marca} = req.query;
    res.send({nome: nome, marca: marca});
})

app.post("/recebecar" , function (req, res) {
    const { imagem, nome, modelo, marca, velocidade, tipo, informacoes, } = req.body;
    
    let novocarro = { imagem:imagem, 
        nome: nome, 
        modelo:modelo, 
        marca:marca, 
        velocidade:velocidade, 
        tipo: tipo, 
        informacoes: informacoes
    }

    listaprincipal.push(novocarro)

    message = `Perfeito, carro cadastrado com sucesso.`;

    setTimeout(() => {
        message = ""
    }, 5000);

    res.redirect("/lista");
})



app.listen(porta, () => console.log(`Servidor rodando em http://localhost:${porta}`));
