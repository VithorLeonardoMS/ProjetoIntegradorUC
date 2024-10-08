import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../model/Usuario";
import { menuPerfil } from "./menuPerfil";
const rl = require("readline-sync")

export function menuFiltrarPosts(redeMain:RedeMain, usuarioLogado:Usuario): void {
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(`-------------------------`);
		console.log(`-        Filtrar        -`);
		console.log(`-------------------------`);
		console.log(`- 0. Voltar             -`);
		console.log(`- 1. Pelo nome          -`);
		console.log(`- 2. Postagens          -`);
		console.log(`- 3. Cursos Internos    -`);
		console.log(`- 4. Cursos Externos    -`);
        console.log(`- 5. Aulas              -`);
        console.log(`- 6. Mais likes         -`);
        console.log(`- 7. Menos Envios       -`);
        console.log(`- 8. Data de envio      -`);
		console.log(`- 9. Carga Horaria      -`);
		console.log(`-------------------------`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		                                            limitMessage: 'Digite um numero de 0 a 9'});

		switch (opcao) {
		case '0': break;
		case '1': break;
		case '2': break;
		case '3': break;
		case '4': break;
		case '5': break;
		case '6': break;
		case '7': break;
		case '8': break;

		}
		
		console.clear();
	}
}