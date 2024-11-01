import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
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
		if(usuarioLogado.getListagemTipo() == "Linhas"){
		console.log(`| 4. Listar em linhas (Ativo)  |`);
		console.log(`| 5. Listar em tabelas         |`);
		} else{
		console.log(`| 4. Listar em linhas          |`);
		console.log(`| 5. Listar em tabelas (Ativo) |`);
		
		}
		console.log(`|______________________________|`);
		
		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3'],
		                                            limitMessage: 'Digite 0, 1, 2 ou 3.'});

		switch (opcao) {
		case '0': menuPerfil(redeMain); break;
		case '1': 
			usuarioLogado.setNome(
			rl.question("Qual novo nome de Usuário? ")
			);
			break;
		case '2': 
			usuarioLogado.setSenha(
				rl.questionInt("Qual a nova senha? ")
			)
			break;
		case '3': 
			usuarioLogado.setFotoPerfil(
				rl.question("Quala nova foto de prfil? ")
			)
		    break;
		case "4":
			if(usuarioLogado.getListagemTipo() == "Linhas"){
				console.log("Esta opção já está ativa!")
			} else{
				usuarioLogado.setListagemTipo("Linhas")
				console.log("Vizualizar por linhas Ativo!");
			}
			break;
		case "5":
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