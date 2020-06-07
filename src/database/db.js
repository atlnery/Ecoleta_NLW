// importar a dependência do sqlite3
const sqlite3 = require("sqlite3").verbose()

// criar o objeto que irá fazer op no bd
/* const db = {
    propriedade: "valor"
}  OU */ 

//Database - classe
const db = new sqlite3.Database("./src/database/database.db")

// exportar o objeto para outras aplicações
module.exports = db 

/*
        TODAS AS OPERAÇÕES ABAIXO FORAM OBJETO DE EXPLICAÇÃO DO BD
        E FORAM MANTIDAS PARA POSTERIOR ESTUDO
*/


// utilizar objeto de bd para operações
/* db.serialize( () => {
    // Criar tabela com comandos SQL
    db.run(`
        CREATE TABLE IF NOT EXISTS places (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            image TEXT,
            name TEXT,
            adress TEXT,
            adress2 TEXT, 
            state TEXT, 
            city TEXT,
            items TEXT
        );   
    `) //  crase pra conseguir quebrar a linha 
    
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
        "https://images.unsplash.com/photo-1528323273322-d81458248d40?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=801&q=80",
        "Papersider",
        "Guilherme Gemballa, Jardim América",
        "Número 260",
        "Santa Catarina",
        "Rio do Sul",
        "Papéis e Papelão"
    ]

    function afterInsertData(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Cadastrado com sucesso")
        console.log(this) //não pode usar arrow function se houver this
    }

    db.run(query, values, afterInsertData)

    // Consultar dados
    db.all(`SELECT name FROM places`, function(err, rows) {
        if (err) {
            return console.log(err)
        }

        console.log("Aqui estão seus registros")
        console.log(rows)
    })
    

    // Deletar dados
    db.run(`DELETE FROM places `, [], function(err) {
        if (err) {
            return console.log(err)
        }

        console.log("Registro deletado com sucesso")
    }) */
//}) 



