import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
import { menuFiltrarPosts } from "./menuFiltrarPosts";
import { menuPerfil } from "./menuPerfil";
const rl = require("readline-sync")

export function menuUsuario(redeMain:RedeMain, usuarioLogado:Usuario): void {
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(`-------------------------`);
		console.log(`-        Usuario        -`);
		console.log(`-------------------------`);
		console.log(`- 0. Deslogar           -`);
		console.log(`- 1. Perfil             -`);
		console.log(`- 2. Notificacoes       -`);
		console.log(`- 3. //Seguindo         -`);
		console.log(`- 4. Buscar Usuarios    -`);
		console.log(`- 5. Buscar Postagens   -`);
		console.log(`-------------------------`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4'],
		                                            limitMessage: 'Digite 0, 1, 2, 3 ou 4.'});

		switch (opcao) {
		case '0': break;
		case '1': menuPerfil(redeMain,usuarioLogado); break;
		case '2': break;//Implementar
		case '3': break;//Implementar futuramente
		case '4': break;//Implemenatr 
        case '4': menuFiltrarPosts(redeMain,usuarioLogado); break;
		}
		
		console.clear();
	}
}