import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
import { menuFiltrarPosts } from "./menuFiltrarPosts";
import { menuPerfil } from "./menuPerfil";
const rl = require("readline-sync")

export function menuUsuario(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(` _______________________ `);
		console.log(`|        Usuario        |`);
		console.log(`|-----------------------|`);
		console.log(`| 0. Deslogar           |`);
		console.log(`| 1. Perfil             |`);
		//console.log(`| ~. Notificacoes       |`);
		console.log(`| 2. //Seguindo         |`);
		console.log(`| 3. Buscar Usuarios    |`);
		console.log(`| 4. Buscar Postagens   |`);
		console.log(`|_______________________|`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4', '5'],
		                                            limitMessage: 'Digite 0, 1, 2, 3, 4 ou 5.'});

		switch (opcao) {
		case '0':usuarioLogado.deslogar(); break;
		case '1': menuPerfil(redeMain); break;//pronto
		case '2': break;//Implementar futuramente
		case '3': redeMain.pesquisarUsuariosRl(usuarioLogado); break;//Pronto
		case '4': menuFiltrarPosts(redeMain); break;//Implementar
		}
		
		console.clear();
	}
}