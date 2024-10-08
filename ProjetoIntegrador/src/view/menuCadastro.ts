import { RedeMain } from "../Controlers/RedeMain";
const rl = require("readline-sync")

export function menuCadastro(redeMain:RedeMain): void {
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(`-------------------------`);
		console.log(`-        Cadastro       -`);
		console.log(`-------------------------`);
		console.log(`- 0. Sair               -`);
		console.log(`- 1. Login              -`);
		console.log(`- 2. Cadastro           -`);
		console.log(`- 3. Entrar Sem Cadastro -`);
		console.log(`-------------------------`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3'],
		                                            limitMessage: 'Digite 0, 1, 2 ou 3.'});

		switch (opcao) {
		case '0': break;
		case '1': redeMain.login(); break;
		case '2': redeMain.cadastro(); break;
		case '3': //Implementar
		}
		
		console.clear();
	}
}
