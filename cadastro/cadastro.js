'use strict'


var nome = document.getElementById('nome')
var email = document.getElementById('email')
var senha = document.getElementById('senha')
var confirmSenha = document.getElementById('confirmSenha')
var botaoCadastrar = document.getElementById('botaoCad')
var msg = document.getElementById('msg')

//variaveis usadas para validar as informações inseridas

var nomeValido = null
var emailValido = null
var senhaValida = null


//funções para buscar os dados dentro do localstorage e outra para inserir
const getBanco = () => JSON.parse(localStorage.getItem('db_users')) ?? []
const setBanco = (dados) => localStorage.setItem('db_users', JSON.stringify(dados))


//verifica se usuario já existe no localstorage
const verificaUsername = () => {
    var listaUser = getBanco()
    if(listaUser.length == 0){
        nomeValido = true
    }else{
        listaUser.forEach((elemento) =>{
            if(nome.value == elemento.nome){ //se existir a variavel de validação recebe null e nao permite a criação de um usuario com o mesmo nome
                nomeValido = false
            }else{
                nomeValido = true
            }
        })
    } 
}

//verifica se já existe determinado email cadastrado no localstorage
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

//verifica se a senha é valida = maior que 8 caracteres e se as senhas sao iguais
const verificaSenhasIguais = () => {

    var strsenha = `${senha.value}` //converti a senha para string 
    var tamsenha = strsenha.length //precisei fazer dessa forma para conseguir o tamanho da senha

    

    if (senha.value == confirmSenha.value){ //verifica se as senhas são iguais
        
        if(tamsenha >= 8){
            senhaValida = true
        }else{
            msg.innerHTML = '<p>senha muito pequena<p/>'
            msg.setAttribute('style', 'display: block')

            senhaValida == false
        }
        //mudar style de senha e confirmar senha para verdinho =--- fazer 
    }else{
        
        msg.innerHTML = '<p>As senhas não são iguais<p/>'
        msg.setAttribute('style', 'display: block')
        senhaValida = false
    }
}



/*

ação do botão cadastrar, aqui valido cada informação de acordo com uma prioridade
sendo ela: 

1º Validar Nome
2º Validar E-mail
3º Validar Senha

após a validação da senha aprovada, é feita a inserção no localstorage do novo usuário

*/

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
                
                //crio um array com os dados do novo usuario
                const banco = {
                    nome: `${nome}`,
                    senha: `${senha}`,
                    email: `${email}`
                }
                
                //insiro esses dados ao array que peguei do localstorage
                listaUsers.push(banco)

                //envio o array/json para o localstorage novamente
                setBanco(listaUsers)

            }
        }
    }
        
    }

botaoCadastrar.addEventListener('click', cadastrar)