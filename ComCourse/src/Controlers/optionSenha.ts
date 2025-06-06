let rl = require("readline-sync");

/**
     * optionSenha()-> Cria um while que permite que o usuário insira uma senha, caso a senha esteja errada,
     * ele ainda pode tentar novamente mais 3 vezes, digitando 0 ele cancela a operação.
     * Leva uma função de callback que executa o que for desejado com a senha que o usuario inserir,
     * a função de callback retorna uma boolean, caso retorne true o processo encerra.
     * Se a função de callback retornar true, o método também retorna true
     * @example RedeMain linha 136 em login rl
     * @param callback 
     * @returns {boolean}
     */
export function optionSenha(callback:(senhaTestando:string) => boolean):boolean{
    let senhaTeste:string = '1'
    let contagem = 4
    while(senhaTeste != "0" && contagem != 0){
        console.info("0 -> para cancelar")
        senhaTeste = rl.question("Digite a senha: ",{hideEchoBack:true});
        if (senhaTeste.length < 8) {
            console.warn("A senha deve ter pelo menos 8 caracteres!");
            continue; // Volta para o início do loop
        }
        if(callback(senhaTeste)){
            senhaTeste = "0"
            return true;
        } else{
            contagem--
            console.warn("Senha incorreta!")
            console.info(`Tentativas restantes: ${contagem}`)
        }
        
    }
    return false;
}