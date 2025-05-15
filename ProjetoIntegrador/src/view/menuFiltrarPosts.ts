import { RedeMain } from "../Controlers/RedeMain";
import { olharDinamico } from "../Controlers/olharDinamico/olharDinamico";
import { Usuario } from "../classes/Usuario";
import { menuPerfil } from "./menuPerfil";
const rl = require("readline-sync")

export function menuFiltrarPosts(redeMain:RedeMain): void {
	const usuarioLogado = redeMain.getUsuarioLogado()
	let opcao = "";
	const filtragem = {
		postagens: true,
		cursosInternos: true,
		cursosExternos: true,
		aulas: true
	}

	let ordem: "maisLikes" | "menosLikes" | "dataDeEnvio" | "cargaHoraria" | "nenhum" = "nenhum"

	while (opcao != '0') {
		console.clear();

		console.log(` _______________________`);
		console.log(`|        Filtrar        |`);
		console.log(`|-----------------------|`);
		console.log(`| 0. Voltar             |`);
		console.log(`| 1. Pesquisar          |`);
		console.log(`| Opcoes de filtragem:  |`);
		if(filtragem.postagens){
		console.log(`| 2. Postagens         ✔|`);
		} else{
		console.log(`| 2. Postagens          |`);
		}
		if(filtragem.cursosExternos){
		console.log(`| 3. Cursos Internos   ✔|`);
		} else{
		console.log(`| 3. Cursos Internos    |`);
		}
		if(filtragem.cursosInternos){
		console.log(`| 4. Cursos Externos   ✔|`);
		} else{
		console.log(`| 4. Cursos Externos    |`);
		}
		if(filtragem.aulas){
		console.log(`| 5. Aulas             ✔|`);
		} else{
		console.log(`| 5. Aulas              |`);
		}
		console.log(`| Ordenar:              |`)

		if(ordem = "maisLikes"){
		console.log(`| 6. Mais likes        ✔|`);
		} else{
		console.log(`| 6. Mais likes         |`);
		}
		if(ordem = "menosLikes"){
		console.log(`| 7. Menos likes       ✔|`);
		} else{
		console.log(`| 7. Menos likes        |`);
		}
        if(ordem = "dataDeEnvio"){
		console.log(`| 8. Data de envio     ✔|`);
		} else{
		console.log(`| 8. Data de envio      |`);
		}
        if(ordem = "cargaHoraria"){
		console.log(`| 9. Carga Horaria     ✔|`);
		} else{
		console.log(`| 9. Carga Horaria      |`);
		}
		console.log(`|_______________________|`);

		opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'],
		                                            limitMessage: 'Digite um numero de 0 a 9'});
		switch (opcao) {//Implementar com opcao de acesso aos objetos...
		case '0': break;
		case '1':
			
			break;
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