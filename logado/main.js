'use strict'

let titulo = document.getElementById('titulo')

let usuarioLogado = JSON.parse(localStorage.getItem('usuarioLogado'))

titulo.innerHTML = `Olá ${usuarioLogado.user}`

if (localStorage.getItem('token') == null){
    alert('VOCÊ PRECISA ESTAR LOGADO PARA ACESSAR ESSA PÁGINA')
    window.location.href = 'http://127.0.0.1:5500/login'

    
}

function sair() {
    localStorage.removeItem('usuarioLogado')
    localStorage.removeItem('token')
    window.location.href = 'http://127.0.0.1:5500/login'
}