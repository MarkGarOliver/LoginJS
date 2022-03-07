'use strict'


var nome = document.getElementById('nome')
var email = document.getElementById('email')
var senha = document.getElementById('senha')
var confirmSenha = document.getElementById('confirmSenha')
var botaoCadastrar = document.getElementById('botaoCad')
var msg = document.getElementById('msg')


var nomeValido = null
var emailValido = null
var senhaValida = null



const getBanco = () => JSON.parse(localStorage.getItem('db_users')) ?? []
const setBanco = (dados) => localStorage.setItem('db_users', JSON.stringify(dados))


//verifica se usuario já existe.
const verificaUsername = () => {
    var listaUser = getBanco()
    if(listaUser.length == 0){
        nomeValido = true
    }else{
        listaUser.forEach((elemento) =>{
            if(nome.value == elemento.nome){
                nomeValido = false
            }else{
                nomeValido = true
            }
        })
    } 
}

const verificaEmail = () => {
    var listaUser = getBanco()
    listaUser.forEach(elemento => {
        if(email.value == elemento.email){
            emailValido = false
            msg.innerHTML = '<p>Email já cadastrado<p/>'
            msg.setAttribute('style', 'display: block')
        }else {
            emailValido = true
        }
    });
}

const verificaSenhasIguais = () => {

    var strsenha = `${senha.value}`
    var tamsenha = strsenha.length

    

    if (senha.value == confirmSenha.value){ //verifica se as senhas são iguais
        
        if(tamsenha >= 8){
            senhaValida = true
        }else{
            msg.innerHTML = '<p>senha muito pequena<p/>'
            msg.setAttribute('style', 'display: block')

            senhaValida == false
        }
        //mudar style de senha e confirmar senha para verdinho       
    }else{
        
        msg.innerHTML = '<p>As senhas não são iguais<p/>'
        msg.setAttribute('style', 'display: block')
        senhaValida = false
    }
}




const cadastrar = () => {
    verificaUsername()
    if(nomeValido == false){
        msg.innerHTML = '<p>Este nome de usuário não está disponível<p/>'
        msg.setAttribute('style', 'display: block')
    }else{
        //usuario é valido
        console.log('usuario valido')
        verificaEmail()
        if(emailValido == false){
            msg.setAttribute('style', 'display: block') 
        }else{
            //email valido
            console.log('email valido')
            verificaSenhasIguais()
            if(senhaValida == false){
                msg.setAttribute('style', 'display: block') 
            }else if(senhaValida == true){
                console.log('senha valida')
                
                var listaUsers = getBanco()
    

                nome = nome.value
                email = email.value
                senha = senha.value
                confirmSenha = confirmSenha.value

                const banco = {
                    nome: `${nome}`,
                    senha: `${senha}`,
                    email: `${email}`
                }

                listaUsers.push(banco)

                setBanco(listaUsers)

                console.log(banco)

                // deixar no fim da função, para limpar as mensagens de erro | msg.setAttribute('style', 'display: none')
                window.location.href = "http://127.0.0.1:5500/cadastro/index.html"

                








                


            }
        }
    }
        
    }
 /*
    var listaUsers = getBanco()
    

    nome = nome.value
    email = email.value
    senha = senha.value
    confirmSenha = confirmSenha.value

    const banco = {
        nome: `${nome}`,
        senha: `${senha}`,
        email: `${email}`
    }

    listaUsers.push(banco)

    setBanco(listaUsers)

    console.log(banco)

    // deixar no fim da função, para limpar as mensagens de erro | msg.setAttribute('style', 'display: none')
    window.location.href = "http://127.0.0.1:5500/cadastro/index.html"

    */



botaoCadastrar.addEventListener('click', cadastrar)


/*

prioridades de problemas = 

1º usuario nao valido? msg == usuario ja existe
2º email nao valido? msg == email nao valido / ja cadastrado
3º validação da senha? msg =senha ...

*/