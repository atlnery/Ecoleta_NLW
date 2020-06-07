const express = require("express")
const server = express()

// pegar o bd
const db = require("./database/db.js")

// config pasta public - para pegar estilização 
server.use(express.static("public"))

// habilitar o uso do req.body na aplicação 
server.use(express.urlencoded({ extended: true }))

//utilizando template engine
//como foi feito isso, será alterada toda a estrutra de server.get
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
     //servidor
     express: server,  
     //para evitar bugs, como haver alterações recentes, mas devolver page antiga armazenada
     noCache: true 
})

// configurar caminhos da aplicação 

/*          home page 
    configurar caminho get - protocol http
    @param req: pergunta 
    @param res: resposta
*/

/* server.get("/", (req, res) => { //arrow funcion
     res.sendFile(__dirname + "/views/index.html")
})   por conta do nunjucks */

server.get("/", (req, res) => { //arrow funcion
    return res.render("index.html")
})  


server.get("/create-point", (req, res) => { 
     
     //req.query: query string da nossa url 
     console.log(req.query)
     //req.query
     
     return res.render("create-point.html")
})   

// POST salvar dados do form cadastro 
server.post("/savepoint", (req, res) => {

     //req.body : corpo do formulario
     //console.log(req.body)

     // Inserir dados
     const query = `
     INSERT INTO places (
          image,
          name,    
          adress,
          adress2,
          state,
          city,
          items
     ) VALUES (?,?,?,?,?,?,?); 
     `

     const values = [
          req.body.image,
          req.body.name,
          req.body.adress,
          req.body.adress2,
          req.body.state,
          req.body.city,
          req.body.items,
     ]
     
     function afterInsertData(err) {
          if (err) {
               console.log(err)
               return res.send("Erro no cadastro!")
          }

          console.log("Cadastrado com sucesso")
          console.log(this) //não pode usar arrow function se houver this

          return res.render("create-point.html", { saved : true})
     }

     db.run(query, values, afterInsertData)
})


server.get("/search", (req, res) => { 

     const search = req.query.search

     if (search == "") {
          // pesquisa vazia
          return res.render("search-results.html", { total: 0})
     }

     // pegar os dados do banco de dados 
     db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows) {
          if (err) {
               return console.log(err)
          }
          
          const total = rows.length
          return res.render("search-results.html", { places: rows, total })
     })
})  

// ligar o servidor 
server.listen(3000)