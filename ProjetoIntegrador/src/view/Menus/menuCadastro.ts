import { RedeMain } from "../../Controlers/RedeMain";
const rl = require("readline-sync")

export function menuCadastro(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(` ________________________`);
		console.log(`|        Cadastro        |`);
		console.log(`|------------------------|`);
		console.log(`| 0. Sair                |`);
		console.log(`| 1. Login               |`);
		console.log(`| 2. Cadastro            |`);
		console.log(`| //Entrar Sem Cadastro  |`);
		console.log(`|________________________|`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2'],
		                                            limitMessage: 'Digite 0, 1 ou 2.'});

		switch (opcao) {
		case '0': break;
		case '1': redeMain.loginRl(); break;
		case '2': redeMain.cadastroRl(); break;
		case '3': //Ideia futura
		}
		
		console.clear();
	}
}
