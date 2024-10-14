import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
import { menuEditPerfil } from "./menuEditPerfil";
const rl = require("readline-sync")

export function menuPerfil(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(`--------------------------`);
		console.log(`-        Perfil          -`);
		console.log(`--------------------------`);
		console.log(`- 0. Voltar              -`);
		console.log(`- 1. Editar              -`);
		console.log(`- 2. Ver                 -`);
		console.log(`- 3. Salvos              -`);
        console.log(`- 4. Meus Cursos         -`);
		console.log(`--------------------------`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4'],
		                                            limitMessage: 'Digite 0, 1, 2, 3 ou 4.'});

		switch (opcao) {
		case '0': break;//
		case '1': menuEditPerfil(redeMain); break;//Pronto
		case '2': usuarioLogado.printarUs(usuarioLogado.getPerfil()); break;
		case '3': usuarioLogado.printarUs(usuarioLogado.getPostsSalvos()); break;//Implementar opcao de acesso ao objeto
        case '4': usuarioLogado.printarUs(usuarioLogado.getPostsCriados()) ;break;//Implementar opcao de acesso ao objeto
        
		}
		
		console.clear();
	}
}