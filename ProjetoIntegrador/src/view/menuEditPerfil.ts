import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
import { menuPerfil } from "./menuPerfil";
import { menuUsuario } from "./menuUsuario";
const rl = require("readline-sync")

export function menuEditPerfil(redeMain:RedeMain, usuarioLogado:Usuario): void {
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(`-------------------------------`);
		console.log(`-        Editar perfil        -`);
		console.log(`-------------------------------`);
		console.log(`- 0. Sair                     -`);
		console.log(`- 1. trocar nome              -`);
		console.log(`- 2. trocar senha             -`);
		console.log(`- 3. trocar foto de perfil    -`);
		console.log(`-------------------------------`);
		
		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3'],
		                                            limitMessage: 'Digite 0, 1, 2 ou 3.'});

		switch (opcao) {
		case '0': menuPerfil(redeMain,usuarioLogado); break;
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
		}
		
		console.clear();
	}
}