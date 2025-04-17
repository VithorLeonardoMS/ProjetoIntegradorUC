import { RedeMain } from "../Controlers/RedeMain";
import { Usuario } from "../classes/Usuario";
import { menuEditPerfil } from "./menuEditPerfil";
import { menuUsuario } from "./menuUsuario";
const rl = require("readline-sync")

export function menuPerfil(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";

	while (opcao != '0') {
		console.clear();

		console.log(` ________________________`);
		console.log(`|        Perfil          |`);
		console.log(`|------------------------|`);
		console.log(`| 0. Voltar              |`);
		console.log(`| 1. Editar              |`);
		console.log(`| 2. Ver                 |`);
		console.log(`| 3. Salvos              |`);
        console.log(`| 4. Meus Cursos         |`);
		console.log(`|________________________|`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4'],
		                                            limitMessage: 'Digite 0, 1, 2, 3 ou 4.'});

		switch (opcao) {
		case '0': menuUsuario(redeMain); break;//Implementar
		case '1': menuEditPerfil(redeMain); break;//Pronto
		case '2': usuarioLogado.printarUs(usuarioLogado.getPerfil());
			rl.question(" ~ Tecle enter para continuar ~",{
				hideEchoBack:true,
				mask: ""
			})
			break;
		case '3': redeMain.acessarPostRl(usuarioLogado,usuarioLogado.getPostsCriadosObject()); break;//Pronto
        case '4': redeMain.acessarPostRl(usuarioLogado,usuarioLogado.getPostsCriadosObject()) ;break;//Pronto
        
		}
		
		console.clear();
	}
}