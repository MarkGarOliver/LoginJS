'use strict'


var nome = document.getElementById('nome')
var email = document.getElementById('email')
var senha = document.getElementById('senha')
var confirmSenha = document.getElementById('confirmSenha')
var botaoCadastrar = document.getElementById('botaoCad')
var msg = document.getElementById('msg')

var divForm = document.getElementById('form')




//variaveis usadas para validar as informações inseridas

var nomeValido = null
var emailValido = null
var emailValido2 = null
var senhaValida = null


//funções para buscar os dados dentro do localstorage e outra para inserir
const getBanco = () => JSON.parse(localStorage.getItem('db_users')) ?? []
const setBanco = (dados) => localStorage.setItem('db_users', JSON.stringify(dados))


//============================================VALIDAR USUARIO===============================================//

const leightNome = () => {

    //abaixo uso o trim() para remover qualquer espaço desnecessário no nome de usuário
    var nomeSemEspaco = `${nome.value}`
    nomeSemEspaco.trim()

    if(nomeSemEspaco.length <= 4){
        nome.setAttribute("style", "border-bottom: solid red 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 5px 0 red, 0 2px 2px 0 rgba(0, 0, 0, 0.24);")
    } else{
        nome.setAttribute("style", "border-bottom: solid #00d9ff 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")
    }
}

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


//=============================================VERIFICA EMAIL====================================================//

//VALIDAR EMAIL --- 

const validaEmail = () => {
    
    var usuario = email.value.substring(0, email.value.indexOf("@"));
    var dominio = email.value.substring(email.value.indexOf("@")+ 1, email.value.length);

    if ((usuario.length >=1) &&
    (dominio.length >=3) &&
    (usuario.search("@")==-1) &&
    (dominio.search("@")==-1) &&
    (usuario.search(" ")==-1) &&
    (dominio.search(" ")==-1) &&
    (dominio.search(".")!=-1) &&
    (dominio.indexOf(".") >=1)&&
    (dominio.lastIndexOf(".") < dominio.length - 1)) {
        console.log('email valido')


        
        email.setAttribute("style", "border-bottom: solid #00d9ff 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 20px 0 rgba(0, 0, 0, 0.2), 0 5px 5px 0 rgba(0, 0, 0, 0.24);")

        emailValido2 = true
        
    }else{
        console.log('email nao valido')

        email.setAttribute("style", "border-bottom: solid red 2px;")
        divForm.setAttribute("style", "box-shadow: 0 0 5px 0 red, 0 2px 2px 0 rgba(0, 0, 0, 0.24);")

        emailValido2 = false
    }

    
}

const msgEmailError = () => {
    if(emailValido2 == false){
        msg.innerHTML = '<p>Email Invalido<p/>'
        msg.setAttribute('style', 'display: block')
    }
}


//verifica se já existe determinado email cadastrado no localstorage
const verificaEmail = () => {

    console.log('verificando email')

    var listaUser = getBanco()
    console.log(listaUser.length)

    if(listaUser.length == 0){
        emailValido = true
        console.log('estava vazio')
    }else{
        listaUser.forEach(elemento => {
            if(email.value == elemento.email){
                emailValido = false
                msg.innerHTML = '<p>Email já cadastrado<p/>'
                msg.setAttribute('style', 'display: block')
            }else if(email.value !== elemento.email) {
                emailValido = true
            }
        });
    }

 
}

//verifica se a senha é valida = maior que 8 caracteres e se as senhas sao iguais
const verificaSenhasIguais = () => {

    console.log('validando senha')

    var strsenha = `${senha.value}` //converti a senha para string 
    strsenha = strsenha.trim()      //removendo os espaços desnecessários
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

const EnterCadastrar = (evento) => {
    if(evento.key == 'Enter'){
        botaoCadastrar.click()
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
    msg.setAttribute('style', 'display: none')

    if(email.value !== '' && nome.value !== '' && senha.value !== ''){
        verificaUsername()
        if(nomeValido == false){
            msg.innerHTML = '<p>Este nome de usuário não está disponível<p/>'
            msg.setAttribute('style', 'display: block')
        }else{
            //usuario é valido
            console.log('usuario valido')
            verificaEmail()
            msgEmailError()
            if(emailValido == false){
                msg.setAttribute('style', 'display: block')
            }else if(emailValido == true && emailValido2 == true){
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
    
                    window.location.href = "http://127.0.0.1:5500/login"
    
    
                }   
            }
        }

    }else{
        msg.innerHTML = '<p>Preencha todos os campos corretamente<p/>'
        msg.setAttribute('style', 'display: block')
    }
}



botaoCadastrar.addEventListener('click', cadastrar)
confirmSenha.addEventListener('keypress', EnterCadastrar)

nome.addEventListener('keyup', leightNome)
email.addEventListener('keyup', validaEmail)