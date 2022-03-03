'use strict'

let usuario = document.getElementById('nome')
let senha = document.getElementById('senha')
let divForm = document.getElementById('form')
let botaoLogin = document.getElementById('botao-login')

let uservalido = ''
let senhavalida = ''

const usuarioErrado = () => {
    if(usuario.value.length <= 4){
        usuario.setAttribute("style", "border-bottom: solid red 1px;")
        divForm.setAttribute("style", "box-shadow: 0 0 5px 0 red, 0 2px 2px 0 rgba(0, 0, 0, 0.24);")
        uservalido = false
    } else{
        usuario.setAttribute("style", "border-bottom: solid green 1px;")
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")
        uservalido = true
    }
}

const senhaErrada = () =>{
    if(senha.value.length < 8){
        senha.setAttribute("style", "border-bottom: solid red 1px;")
        divForm.setAttribute("style", "box-shadow: 0 0 5px 0 red, 0 2px 2px 0 rgba(0, 0, 0, 0.24);")
        senhavalida = false
    } else{
        senha.setAttribute("style", "border-bottom: solid green 1px;")
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

const logar = () =>{
    if(uservalido == true && senhavalida == true){
        console.log('usuario e senha ok')
        alert('logado !!')
    }else{
        console.log('usuario ou senha errado')
        alert('usuario ou senha errado')
    }

}

usuario.addEventListener('keyup', usuarioErrado)
usuario.addEventListener('keypress', proximoInput)

senha.addEventListener('keypress', clickBotao)
senha.addEventListener('keyup', senhaErrada)

botaoLogin.addEventListener('click', logar)




