import { Aula } from "../../classes/Postagem/Aula";
import { CursoExterno } from "../../classes/Postagem/CursoExterno";
import { CursoInterno } from "../../classes/Postagem/CursoInterno";
import { Postagem } from "../../classes/Postagem/Postagem";

type Ordem = "maisLikes" | "menosLikes" | "dataDeEnvio" | "cargaHoraria" | "nenhum";
type Post = Postagem | CursoExterno | CursoInterno | Aula;

export function ordenarPosts(posts:Post[],ordem:Ordem): Post[]{
    let listaNova:Post[]
    const inicial: null | Post = posts[0]
    listaNova = inicial? [inicial] : [];

    switch (ordem) {
        case "cargaHoraria":
            posts.forEach((post,i)=>{
                const cargaAtual = post.getCargaHoraria()
                if(cargaAtual){
                    let teste = true;
                    let cargaAuxiliar:number | undefined;
                    for(let j = 0; teste && listaNova.length > j; j++){
                        cargaAuxiliar = listaNova[j].getCargaHoraria()
                        if(cargaAuxiliar && cargaAuxiliar < cargaAtual){
                                listaNova.splice(j, 0, post);
                                teste = false;
                        }
                    }
                    if(!teste){//Caso post.getCargaHoraria() for menor que todas as outras cargas horárias
                        listaNova.push(post)
                    }
                }
            })
            break;
        case "dataDeEnvio":
            
            break;
        case "maisLikes":
            break;
        case "menosLikes":
            break;
        case "nenhum":
            break
    }   
    return listaNova;
}

function oredenar(){

}