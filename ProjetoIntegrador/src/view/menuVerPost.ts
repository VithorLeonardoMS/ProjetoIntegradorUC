import { Aula } from "../classes/Postagem/Aula";
import { CursoExterno } from "../classes/Postagem/CursoExterno";
import { CursoInterno } from "../classes/Postagem/CursoInterno";
import { Postagem } from "../classes/Postagem/Postagem";
import { RedeMain } from "../Controlers/RedeMain";

const rl = require("readline-sync")

export function menuVerPosts(redeMain:RedeMain,post: Postagem | Aula | CursoExterno | CursoInterno ): void {
    const usuarioLogado = redeMain.getUsuarioLogado()
    let opcao = "";

	while (opcao != '0') {
		console.clear();
		console.log(`--------------------------`);
		usuarioLogado.printarUs(post.getPostagem(usuarioLogado))
		console.log(`--------------------------`);
		console.log(`- 0. Voltar              -`);
        usuarioLogado.hasLike(post)?
        console.log(`- 1. Like (Dado)         -`):
        console.log(`- 1. Like                -`);
        usuarioLogado.hasDeslike(post)?
		console.log(`- 2. Deslike (Dado)      -`):
        console.log(`- 2. Deslike             -`);
		console.log(`- 3. Comentarios         -`);
        if(post instanceof CursoInterno){
        console.log(`- 4. Acessar Aulas       -`);

        }

		console.log(`--------------------------`);

        if(post instanceof CursoInterno){
            opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3', '4'],
                limitMessage: 'Digite 0, 1, 2, 3 ou 4.'});
        } else{
            opcao = rl.question('Menu selecionado: ', {limit: ['0', '1', '2', '3'],
                                                        limitMessage: 'Digite 0, 1, 2 ou 3.'});
            
        }

		switch (opcao) {
		case '0': break;
		case '1': 
            usuarioLogado.processarLike(post)?
                            console.log("Like dado!"):
                            console.log("Like retirado!");
            break;
		case '2': 
            usuarioLogado.processarDesike(post)?
            console.log("Deslike dado!"):
            console.log("Deslike retirado!");
            break;
		case '3': post.getAllComents(); break; //Implementar opcao de acesso ao objeto
        case '4': 
            if(post instanceof CursoInterno){
                //Acessar aulas por aqui, implementar
            }
            break;
        
		}
		
		console.clear();
	}
}