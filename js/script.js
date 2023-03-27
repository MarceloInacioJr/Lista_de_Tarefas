var caixa = '\n<label><input type="checkbox"><span class="checkmark"></span></label>\n';
var cxaux = "";

// constantes
const tipoAdd = document.querySelector("#tipo");
const nomeGrupo = document.querySelector("#nome-grupo");
const nomeMeta = document.querySelector("#nome-meta");
const qtdCaixa = document.querySelector("#qtd-item");
const ap = document.querySelector("#apelido");

let adicionar = document.querySelector("#btn-adicionar");
let cancelar = document.querySelector("#btn-cancelar");
let btnIniciar = document.querySelector("#btn-iniciar");

grupos = new Array();
tarefas = new Array();

function returnIdGrupo(){
    grupos = JSON.parse(localStorage.getItem("gruposCriados"));
   
        let a = grupos[grupos.length-1].idGrupoAPP;
        a++;
        return a.toString();
    
}

if (localStorage.gruposCriados) {
    mostrar();
}

tipoAdd.addEventListener("change", () => {
    
    let i = document.querySelector("#nome-grupo");
    i.classList.toggle("desabilitar");
    
    let inputGrupo = document.querySelector("#id-grupo");
    inputGrupo.classList.toggle("desativar");

    document.querySelector("#formulario").appendChild(i)
    if (tipoAdd.value === "grupo") {
        console.log(tipoAdd.value)
        nomeGrupo.disabled = false;
    } else if(tipoAdd.value ==="tarefa") {
        console.log(tipoAdd.value)
        nomeGrupo.disabled = true;
    }
});

// functions
adicionar.addEventListener("click", () => {
    location.reload()

    nomeGrupoAdd = nomeGrupo.value;
    nomeMetaAdd = nomeMeta.value;
    qtdCaixaAdd = qtdCaixa.value;
    apAdd = ap.value;
    // localStorage
    if (tipoAdd.value === "grupo") {
        // grupos
        if (localStorage.gruposCriados) {
            grupos = JSON.parse(localStorage.getItem('gruposCriados'));
        }
        
        if(localStorage.gruposCriados){
            idGrupoAPP = returnIdGrupo()
        }else{
            idGrupoAPP=1;
        }
        console.log(idGrupoAPP)
        grupos.push({idGrupoAPP, nomeGrupoAdd, nomeMetaAdd, qtdCaixaAdd, apAdd });
        localStorage.setItem('gruposCriados', JSON.stringify(grupos));
    } else {
        // tarefas
        if (localStorage.tarefasCriadas) {
            tarefas = JSON.parse(localStorage.getItem('tarefasCriadas'));
        }
        idGrupoAPP = selectForm()
        console.log(idGrupoAPP)
        tarefas.push({ nomeMetaAdd, qtdCaixaAdd, idGrupoAPP, apAdd});
        localStorage.setItem('tarefasCriadas', JSON.stringify(tarefas));
    }

    mostrar();
});

selectForm();


 function selectForm(){

    let grupos = JSON.parse(localStorage.getItem('gruposCriados'));
    let inputType = document.querySelector("#input-type");
    console.log(tipoAdd.value);

    
        let select = document.createElement("select");
        select.setAttribute("name", "selectGrupo");
        select.setAttribute("id", "id-grupo");
        select.setAttribute("class", "desativar");
        inputType.appendChild(select);
        for (let i in grupos) {
           let option = document.createElement("option");
           option.setAttribute("value",`${grupos[i].idGrupoAPP}`)
           option.innerHTML = grupos[i].nomeGrupoAdd;
           select.appendChild(option);
        }

     let valor = document.querySelector("#id-grupo").value
     return valor
         

    }



function mostrar() {
    let qbraiten = 1;
    document.getElementById("boardgeral").innerHTML = " ";

    let grupos = JSON.parse(localStorage.getItem('gruposCriados'));
    for (let i in grupos) {
        insereNoBody(grupos[i].idGrupoAPP, grupos[i].nomeGrupoAdd, grupos[i].nomeMetaAdd, grupos[i].qtdCaixaAdd, qbraiten, grupos[i].apAdd);
    }

    let tarefas = JSON.parse(localStorage.getItem('tarefasCriadas'));
    for (let i in tarefas) {
        insereNoGrupo(tarefas[i].nomeMetaAdd, tarefas[i].qtdCaixaAdd, 1, tarefas[i].idGrupoAPP, tarefas[i].apAdd);
    }
}


cancelar.addEventListener("click", () => {
    modal();
});

btnIniciar.addEventListener("click", () => {
    modal();
});


// modal
function modal() {
    var desaparecer = document.querySelector("#desaparecer");
    desaparecer.classList.toggle("desativar");
    var form = document.querySelector("#formulario");
    form.classList.toggle("desativar");
}

//criando grupo
function insereNoBody(idgrup, grpMeta, nmMeta, qtditem, qbraiten, apelido) {
    if (idgrup === '') {
    }
    else {
        var grptag = "<fieldset class=\"grupo\" id=\"" + idgrup + "\"><legend>" + grpMeta;
        grptag = grptag + "</legend>\n</fieldset>";
        document.getElementById("boardgeral").innerHTML += grptag;
        insereNoGrupo(nmMeta, qtditem, qbraiten, idgrup, apelido);
        //gerar um numero de id de grupo, sequencial a quantidade de class "grupo";
    }
}

// criando tarefas
function insereNoGrupo(nomeMeta, quantidade, quebrar, idgrp, apld) {

    if (idgrp === '') {

    }
    else {
        var grptag2 = "<button class=\"accordion\">" + nomeMeta;
        grptag2 += "</button>\n<div class=\"panel\"><div ";
        grptag2 += "class=\"elementos\"></div></div>";
         
        document.getElementById(idgrp).innerHTML += grptag2;
        
        

        //Loop para inserir caixas de meta, em semanas, de acordo com a quantidade
        if (quebrar == 1) {
            for (i = 1; i <= quantidade; i++) {
                cxaux += caixa;
            }
            document.getElementById(idgrp).innerHTML += "\n<fieldset class=\"caixa\"><legend>" + apld + "</legend>\n<div class=\"itens\">" + cxaux + "</div></fieldset>";
        }
        else {
            for (i = 1; i <= quantidade; i++) {
                cxaux += caixa;
                if (i % quebrar == 0) {
                    document.getElementById(idgrp).innerHTML += "\n<fieldset class=\"caixa\"><legend>" + apld + " " + ('00' + ((i / 5))).slice(-2) + "</legend>\n<div class=\"itens\">" + cxaux + "</div></fieldset>";
                    cxaux = "";
                }
            }
        }
        cxaux = "";
        accordion();
    }
}

//funcao para funcionalidade do acordion
function accordion() {
    var acc = document.getElementsByClassName("accordion");
    var i;
    for (i = 0; i < acc.length; i++) {
        acc[i].addEventListener("click", function () {
            this.classList.toggle("active");
            var panel = this.nextElementSibling;
            if (panel.style.display === "block") {
                panel.style.display = "none";
                panel.style.margin = "0";
            } else {
                panel.style.display = "block";
                panel.style.margin = "0";
            }
        });
    }
}