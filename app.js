import express from "express"

import produtosRouter from "./router/produtosFake.js"

const app = express()

// Permite ler JSON no corpo da requisição  
app.use(express.json())

const port = 3000


let usuarios = [
    {
        id: 1,
        nome: "Joaquim",
        email: "joaquim@gmail.com"
    },{
        id: 2,
        nome: "flavia",
        email: "flavia@gmail.com"
    }
]

app.use("/produtos", produtosRouter)

app.put("/usuario/:id", (req, res) => {
    const { id } = req.params
    const { nome, email } = req.body

    // const usuario = usuarios.find(
    //     usuario => usuario.id === parseInt(id)
    // )
    // usuario.nome = novoNome
    // usuario.email = novoEmail
    
    const indice = usuarios.findIndex((usuario) => {
        return usuario.id == id
    })
    
    usuarios[indice].nome = nome
    usuarios[indice].email = email

    res.send(usuarios)
} )


app.delete("/usuario/:id", (req, res) => {

    const { id } = req.params
    
    const indice = usuarios.findIndex((usuario) => {
        return usuario.id == id
    })
     
    

usuarios.splice(indice, 1)
res.send(usuarios)

})
//Banco de dados da shoop (em memoria)



app.get("/usuarios", (req, res) => {
    res.send(usuarios)
})

// app.get("/", (req, res) => {
//     res.send("Bem vindo a minha API! ")
// })

app.post("/criarUsuario", (req, res) => {
    const { nome, email }  = req.body

    const id = usuarios[usuarios.length - 1].id + 1

    const pessoaNova = {
        "id": id,
        nome,
        email
    }

    usuarios.push(pessoaNova)
    
    res.send(usuarios)

})  

app.listen(port, () => {
    console.log(`Exemple app listening on port ${port}`)
})