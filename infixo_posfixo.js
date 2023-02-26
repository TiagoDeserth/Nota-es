function operando(caracter){
    var regex = /^[a-zA-Z0-9]+$/; //Cadeia de alfanuméricos
    if(regex.test(caracter)){
        return true;
    }else{
        return false;
    }
}

function operador(caracter){
    var regex = /^[-*+–/^]+$/gi;
    if(regex.test(caracter)){
        return true;
    }else{
        return false;
    }
}

function obterPrioridade(caracter){
    var retorno = 0;
    var regex1 = /^[+-–]+$/gi;
    var regex2 = /^[*/]+$/gi;

    if('(' == caracter){
        retorno = 1;
    }else if(regex1.test(caracter)){
        retorno = 2;
    }else if(regex2.test(caracter)){
        retorno = 3;
    }else if ('^' == caracter){
        retorno = 4;
    }
    return retorno;
}

function transformar(){
  var expressao = document.getElementById("expressao").value;
  transformar1(expressao)
}

function transformar1(arrayDeCaracteres){
    //Converte uma expressão da forma Infixa na forma Posfixa. Segue a lógica explica anteriormente na introdução sobre expressões
    var pilha = [];
    var prioridade = 0;
    var caracter = ""; var resultado = "";

    //Varre todos os elementos da expressão de entrada e, para cada elemento, verifica se é operador ou operando. Se for operando, já adicona a saída
    for(i = 0; i < arrayDeCaracteres.length; i++){
        caracter = arrayDeCaracteres.charAt(i);

        if(operando(caracter)){
            resultado += caracter;
        }else if(operador(caracter)){
            prioridade = obterPrioridade(caracter);
            aux = pilha.pop();
            prioridade2 = obterPrioridade(aux);
            //alert('Caracter: '+caracter+'\n'+prioridade+'\nAux: '+aux+'\n'+prioridade2);
            pilha.push(aux);
            if(typeof aux === 'undefined'){
            }else{
                while((pilha.length > 1) && (prioridade2 >= prioridade)){
                    resultado += pilha.pop();
                }
            }
            pilha.push(caracter);
        }else if('(' === caracter){
            //Insere o objeto no topo da pilha
            pilha.push(caracter);
        }else if(')' === caracter){
            var item = pilha.pop();
            while ((item != '(') && (item != undefined)){
                resultado += item;
                //Recupera e remove o objeto do topo da pilha
                item = pilha.pop();
            }
        }
    }

    while(pilha.length > 1){
        resultado += pilha.pop();
    }

    console.log(resultado);
}