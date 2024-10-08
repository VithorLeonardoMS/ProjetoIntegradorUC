import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../model/Usuario";
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
		console.log(`- 3. Buscar Usuarios    -`);
		console.log(`- 4. Buscar Postagens   -`);
		console.log(`-------------------------`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4'],
		                                            limitMessage: 'Digite 0, 1, 2, 3 ou 4.'});

		switch (opcao) {
		case '0': break;
		case '1': console.info(usuarioLogado.getPerfil()); break;
		case '2': break;//
		case '3': break;
        case '4': menuFiltrarPosts(redeMain,usuarioLogado); break;
		}
		
		console.clear();
	}
}