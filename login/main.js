'use strict'

let usuario = document.getElementById('nome')
let senha = document.getElementById('senha')
let divForm = document.getElementById('form')
let botaoLogin = document.getElementById('botao-login')
let msg = document.getElementById('msg')

let uservalido = ''
let senhavalida = ''


//banco de dados localstorage
/*banco = {
    nome: marcos,
    senha: sjsjsjsj,
    email: asmdnas@saidnas.com
}*/


const getBanco = () => JSON.parse(localStorage.getItem('db_users')) ?? []
//const setBanco = (banco) => localStorage.setItem('db_users', JSON.stringify(banco))



//funções
const usuarioErrado = () => {
    if(usuario.value.length <= 4){
        usuario.setAttribute("style", "border-bottom: solid red 2px;")
        divForm.setAttribute("style", "border: solid red 1px;")

        uservalido = false
    } else{
        usuario.setAttribute("style", "border-bottom: solid #00d9ff 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")
        uservalido = true
    }
}

const senhaErrada = () =>{
    if(senha.value.length < 8){
        
        senha.setAttribute("style", "border-bottom: solid red 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 5px 0 red, 0 2px 2px 0 rgba(0, 0, 0, 0.24);")
        senhavalida = false
    } else{
        senha.setAttribute("style", "border-bottom: solid #00d9ff 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")
        senhavalida = true
    }
}

const proximoInput = (evento) => {
    if (evento.key == 'Enter'){
        senha.focus()
    }
}

const clickBotao = (evento) =>{
    if (evento.key == 'Enter'){
        logar()
    }
}

//fazer:
//verificar se existe esse usuário no localstorage.
//se existir validar se nome e senha batem para logar.

function logar () {

    msg.setAttribute('style', 'display: none')

    if(uservalido == true && senhavalida == true){

        var dados = getBanco()

        let usuarioValido = {
            nome: '',
            senha: ''
        }

        dados.forEach((item) =>{
            
            if(usuario.value == item.nome && senha.value == item.senha){
                usuarioValido = {
                    user: item.nome,
                    pass: item.senha
                }
                
            }

            console.log (usuarioValido)
            
        })
        //apenas para testes console.log(usuarioValido)

        if(usuario.value == usuarioValido.user && senha.value == usuarioValido.pass){


            window.location.href = "http://127.0.0.1:5500/logado/index.html"

            let token_user = Math.random().toString(16).substring(2) +  Math.random().toString(16).substring(2)

            localStorage.setItem('token', token_user)
            localStorage.setItem('usuarioLogado', JSON.stringify(usuarioValido))
        
            
        }else{
            msg.setAttribute('style', 'display: block')
            msg.innerHTML = '<p>Usuario ou senha incorretos</p>'
        }


    }else{
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")
        msg.setAttribute('style', 'display: block')
        msg.innerHTML = '<p>preencha os campos corretamente</p>'
    }
   
    
}

usuario.addEventListener('keyup', usuarioErrado)
usuario.addEventListener('keypress', proximoInput)

senha.addEventListener('keypress', clickBotao)
senha.addEventListener('keyup', senhaErrada)

botaoLogin.addEventListener('click', logar)




