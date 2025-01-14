$(document).ready(function()
{
    listarCurso();
    grid();
    listaridDisciplina();
});

function validar() {
   
    let erro = false;

    let validado = verificar("id_nome", 'Nome');
    if (!validado) {
        erro = true;
    }

    validado = verificar("id_idade", 'Idade');
    if (!validado) {
        erro = true;
    }
    
    validado = verificar("id_data", 'Data de Ingresso');
    if (!validado) {
        erro = true;
    }

    validado = verificar("id_curso", 'Curso');
    if (!validado) {
        erro = true;
    }


    validado = verificarCheck(formulario.disciplina, 'Disciplinas');
    if (!validado) {
        erro = true;
    }

    
    validado = verificarCheck(formulario.graduado, 'Graduado');
    if (!validado) {
        erro = true;
    }

    return erro;

}

function verifica() {
   
    let erro = validar();
    let curso = {
        nome: formulario.nome.value,
        idade: parseFloat(formulario.idade.value),
        data: parseInt(formulario.value),
        Disciplina: {
            id: parseInt(formulario.disciplina.value)
        },
        curso: {
            id: parseInt(formulario.curso.value)
        },
        graduado: formulario.graduado.value

    };
    
    if (!erro) {
        $.ajax({

            type: 'POST',
            url: 'https://localhost:5001/api/Estudante/Cadastrar',
            contentType: 'application/json; charset=utf-8',
            data: JSON.stringify(curso),
            success: function(resposta){
                alert(resposta);
            },
            error: function(erro, mensagem, excecao){
                alert('Algo está incorreto!');
    }

        }
        );
    }
}


function verificar(campo, nomeCampo) {
    
    if (($('#'+campo).val() == '') || ($('#'+campo).val() == null) || ($('#'+campo).val() == 0)) {
        $('#'+campo).attr('class','vermelho');
        alert('Preencha o campo ' + nomeCampo + ',por favor!');
        return false;
    } else {
        return true;
    }
}

function verificarCheck(checkboxes, nomeCampo)
{
        if ($(checkboxes).is(':checked'))
        {
            return true;
        }
       alert('Preencha o campo ' + nomeCampo + ',por favor!');
       return false;
}

function remover(campo) {
    $('#'+campo).attr('class','verde');
}

function listarCurso()
{
    $.get('https://localhost:5001/api/Estudante/Listar')
    .done(function(resposta){
        
        for (i = 0;i < resposta.length; i++)
        {
            let option = $('<option></option>').val(resposta[i].id).html(resposta[i].nome);
            $('#id_curso').append(option);
        }
    })
    .fail(function(erro, mensagem, excecao){
        alert('Algo está incorreto!');
    });
}

function grid()
{
    $.get('https://localhost:5001/api/Estudante/EstudanteCadastrado')
    .done(function(resposta){
        
        for (i = 0;i < resposta.length; i++)
        {
            let linha = $('<tr></tr>');
            let celulaId = $('<td></td>').html(resposta[i].id);
            let celulaNome = $('<td></td>').html(resposta[i].nome);
            let celulaIdade = $('<td class="numero" ></td>').html(resposta[i].idade);
            let celulaData = $('<td></td>').html(resposta[i].data);
            let celulaCurso = $('<td></td>').html(resposta[i].cursoEstudante.nome);
            let celulaGraduado = $('<td></td>').html(resposta[i].graduado);
            let celulaAcoes = $('<td></td>')
            let botaoVisualizar = $('<button></button>').attr('type','button').html('Visualizar').attr('onclick','visualizar('+ resposta[i].id +')');
            let botaoExcluir = $('<button></button>').attr('type','button').html('Excluir').attr('onclick','excluir('+ resposta[i].id +')');
            let botaoAlterar = $('<button></button>').attr('type', 'button').html('Alterar').attr('onclick', 'consultar(' + resposta[i].id + ')');
            linha.append(celulaNome,celulaIdade,celulaData,celulaCurso,celulaGraduado,celulaAcoes.append(botaoVisualizar),celulaAcoes.append(botaoExcluir),celulaAcoes.append(botaoAlterar));
            $('#grid').append(linha);
           

        }
    })
    .fail(function(erro, mensagem, excecao){
        alert('Algo está incorreto!');
    });
}

function excluir(id)
{
    $.ajax({

        type: 'DELETE',
        url: 'https://localhost:5001/api/Estudante/Excluir',
        contentType: 'application/json; charset=utf-8',
        data: JSON.stringify(id),
        success: function(resposta){
            alert(resposta);
        },
        error: function(erro, mensagem, excecao){
            alert('Algo está incorreto!!');
}

    }
    );

}

function visualizar(id)
{
    $.get('https://localhost:5001/api/Estudante/Consultar?idEstudante=' + id)
    .done(function(resposta){
         
        let visu = resposta.nome;
        visu += '\n';
        let visualizacao = resposta.idade;
        visualizacao += '\n';
        visualizacao += resposta.data;
        visualizacao += '\n';
        visualizacao += resposta.cursoEstudante.nome;
        visualizacao += '\n';
        visualizacao += resposta.cursoDisciplina.nome;
        visualizacao += '\n';
        visualizacao += resposta.graduado;
        alert(visu+visualizacao);
       
    })
    .fail(function(erro, mensagem, excecao){
        alert('Algo está incorreto!');
    });
}

function alterar() {
    let erro = validar();
    
    if (!erro) {
        let estudante = {
            nome: formulario.nome.value,
            idade: parseFloat(formulario.idade.value),
            idade: parseFloat(formulario.data.value),
            Disciplina: {
                id: parseInt(formulario.disciplina.value)
            },
            curso: {
                id: parseInt(formulario.curso.value)
            },
            tipo: formulario.graduado.value
    
        };

        $.ajax({
            type: 'PUT',
            url: 'https://localhost:5001/api/Estudante/Alterar',
            contentType: "application/json; charset=utf-8",
            data: JSON.stringify(estudante),
            success: function(resposta) { 
                alert(resposta);
                limpar();
            },
            error: function(erro, mensagem, excecao) { 
                alert(mensagem + ': ' + excecao);
            }
        });
    }
}

function consultar(id) {
    $.get('https://localhost:5001/api/Estudante/Consultar?idCurso=' + id)
        .done(function(resposta) { 
            formulario.id.value = resposta.Id;
            formulario.nome.value = resposta.nome;
            formulario.data.value = resposta.data;
            formulario.idade.value = resposta.idade;
            formulario.curso.value = resposta.cursoEstudante.id;
            formulario.disciplina.value = resposta.cursoDisciplina.id;
            formulario.disciplina[resposta.cursoDisciplina.id].checked = true;
            formulario.graduado[resposta.cursoEstudante.id].checked = true;
            formulario.graduado.value = resposta.Graduado;
            formulario.botao.innerHTML = 'ALTERAR';
            formulario.botao.onclick = alterar;
        })
        .fail(function(erro, mensagem, excecao) { 
            alert(mensagem + ': ' + excecao);
        });
}
function limpar() {
    formulario.nome.value = '';
    formulario.idade.value = '';
    formulario.data.value = '';
    formulario.curso.value = 0;
    for(i = 0; i < formulario.graduado.length; i++) {
        formulario.graduado[i].checked = false;
    }
    for(i = 0; i < formulario.disciplina.length; i++) {
        formulario.disciplina[i].checked = false;
    }
    formulario.botao.innerHTML = 'CADASTRAR';
    formulario.botao.onclick = verifica;
}


function listaridDisciplina() {
    $.get('https://localhost:5001/api/Estudante/Listardisciplina')
        .done(function(resposta) { 
            for(i = 0; i < resposta.length; i++) {
                if (i > 0)
                {
                    $('#iddisciplina').append($('<br>'));
                }

                $('#iddisciplina').append($('<input>').attr('type', 'checkbox').attr('name', 'disciplina').val(resposta[i].id));
                $('#iddisciplina').append(resposta[i].nome);
            }
        })
        .fail(function(erro, mensagem, excecao) { 
            alert('Algo está incorreto!');
        });
}

