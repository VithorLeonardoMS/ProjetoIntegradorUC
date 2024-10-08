import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../model/Usuario";
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
		case '0': break;
		case '1': break;
		case '2': break;
		case '3': break
		}
		
		console.clear();
	}
}