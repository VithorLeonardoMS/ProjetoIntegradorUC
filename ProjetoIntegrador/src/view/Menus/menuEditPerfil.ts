import { RedeMain } from "../../Controlers/RedeMain";
import { Usuario } from "../../classes/Usuario";
import { menuPerfil } from "./menuPerfil";
import { menuUsuario } from "./menuUsuario";
const rl = require("readline-sync")

export function menuEditPerfil(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";

	while (opcao != '0') {
		console.clear();
		//Pronto
		console.log(` ______________________________`);
		console.log(`|        Editar perfil         |`);
		console.log(`|------------------------------|`);
		console.log(`| 0. Sair                      |`);
		console.log(`| 1. Trocar nome               |`);
		console.log(`| 2. Trocar senha              |`);
		console.log(`| 3. Trocar foto de perfil     |`);
		console.log(`| 4. Trocar email              |`);
		if(usuarioLogado.getListagemTipo() == "Linhas"){
		console.log(`| 5. Listar em linhas (Ativo)  |`);
		console.log(`| 6. Listar em tabelas         |`);
		} else{
		console.log(`| 5. Listar em linhas          |`);
		console.log(`| 6. Listar em tabelas (Ativo) |`);
		
		}
		console.log(`|______________________________|`);
		
		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3','4','5' , '6'],
		                                            limitMessage: 'Digite 0, 1, 2, 3, 4, 5 ou 6'});

		switch (opcao) {
		case '0': menuPerfil(redeMain); break;
		case '1': 
			usuarioLogado.setNome(
				rl.question("Qual novo nome de Usuario? ")
			);
			break;
		case '2': 
			let senha:string = rl.question("Qual a nova senha? ")
			while(senha != "0" && senha.length < 8 || senha.includes(" ")){
				console.info("0 -> para cancelar")
				
				if (senha.length < 8 || senha.includes(" ")) {
					console.warn("A senha deve ter pelo menos 8 caracteres e nao pode conter espacos!");
					senha = rl.question("Qual a nova senha? ");
				} 
			}
			
			if(senha == "0"){
				console.log("Cadastro cancelado pelo usuário");
			} else{
				usuarioLogado.setSenha(senha);
			}
			break;
		case '3': 
			usuarioLogado.setFotoPerfil(
				rl.question("Qual a nova foto de perfil? ")
			)
		    break;
		case '4':
			let novoEMail:string = rl.question("Qual o novo e-Mail? ")
			while(novoEMail.includes(" ")){
				if(novoEMail != "0"){
					console.info("0 -> para cancelar")
					console.warn("O novo e-Mail nao pode conter espacos!");
					novoEMail = rl.question("Qual o novo novo e-Mail? ");
				}
			}

			if(novoEMail == "0"){
				console.log("Cadastro cancelado pelo usuário");
			} else{
				usuarioLogado.setEMail(novoEMail);
			}

			
			break;
		case "5":
			if(usuarioLogado.getListagemTipo() == "Linhas"){
				console.log("Esta opção já está ativa!")
			} else{
				usuarioLogado.setListagemTipo("Linhas")
				console.log("Vizualizar por linhas Ativo!");
			}
			break;
		case "6":
			if(usuarioLogado.getListagemTipo() == "Tabelas"){
				console.log("Esta opção já está ativa!")
			} else{
				usuarioLogado.setListagemTipo("Tabelas")
				console.log("Vizualizar por Tabelas ativo!");
			}
			break;
		}
		
		console.clear();
	}
}