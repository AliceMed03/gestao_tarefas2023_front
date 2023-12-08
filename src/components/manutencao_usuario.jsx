import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "./config_axios";
import ItemLista from "./ItemLista.jsx";  

const ManutencaoUsuarios = () => {
//Servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
//Servem para guardar e setar as informções do objeto
    const [usuarios, setUsuarios] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("usuario");
            if (lista.data && lista.data.usuario) {
                setTarefas(lista.data.usuario);
                console.log("Estado atual dos usuários:", usuario);
            } else {
                alert("Resposta da API não possui a estrutura esperada.");
            }
        } catch (error) {
            alert(`Erro: Não foi possível obter os dados: ${error}`);
        }
    }  


//define o método que será executado assim que o componente for renderizado
useEffect(() => {
    obterLista();
},[]);

const filtrarLista = async (campos) => {
    try{
        const lista = await api.get(`usuario/filtro/${campos.palavra}`);
        lista.data.length
        ? setUsuarios(lista.data)
        : alert("Não há usuarios cadastrados com a palavra chave pesquisada");
    }catch(error){
        alert(`Erro: ..Não foi possível obter os dados: ${error}`);
    }
}

const excluir = async(id,username) => {
    if(!window.confirm(`Confirma a exclusão do usuário ${username}?`)){
        return;
    }
    try{
        await api.delete(`usuarios/${id}`);
        setUsuarios(usuarios.filter(usuarios => usuarios.id !== id));
        
    }catch(error){
        alert(`Erro: ..Não foi possível excluir o usuário ${username}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id,senha,index) => {
    const novaSenha = prompt(`Digite a nova senha do usuário ${senha}`);
    if (novaSenha == "") {
        alert('Digite um usuário válido!')
        return;
    }
    try{//captura os erros 
        //chamando o backend e passando os dados
        await api.put(`usuarios/${id}`,{senha: novaSenha});
        const usuariosAtualizados = [...usuarios];
        const indiceUsuarios = usuariosAtualizados.findIndex(usuarios => usuario.id === id);
        usuariosAtualizados[indiceUsuarios].senha = novaSenha;
        setUsuarios(usuariosAtualizados);
        obterLista();
    }catch(error){
        alert(`Erro: ..Não foi possível alterar a senha do usuário ${titulo}: ${error}`);
    }
}

    return (
       <div className="container">
        <div className="row">
            <div className="col-sm-7">
                <h4 className="fst-italic mt-3">Manutenção de Tarefas</h4>
            </div>
            <div className="col-sm-5">
                <form onSubmit={handleSubmit(filtrarLista)}>
                    <div className="input-group mt-3">
                        <input type="text" className="form-control" placeholder="Titulo" required {...register("palavra")} />
                        <input type="submit" className="btn btn-primary" value="Pesquisar" />
                        <input type="button" className="btn btn-danger" value="Todos" onClick={()=>{reset({palavra:""});obterLista();}}/>
                    </div>
                </form>
            </div>
        </div>

        <table className="table table-striped mt-3">
            <thead>
                <tr>
                    <th>Cód.</th>
                    <th>Titulo</th>
                    <th>Descrição</th>
                    <th>Status</th>
                    <th>Data de Criação</th>
                    <th>Data Limite</th>
                    <th>Ações</th>
                </tr>
            </thead>
            <tbody>
                {tarefas.map((tarefa) => (
                    <ItemLista
                        key={tarefa.id}
                        id={tarefa.id}
                        titulo={tarefa.titulo}
                        descricao={tarefa.descricao}
                        status={tarefa.status}
                        data_criacao={tarefa.data_criacao}
                        data_limite={tarefa.data_limite}
                        excluirClick={()=>excluir(tarefa.id,tarefa.titulo)}
                        alterarClick={()=>alterar(tarefa.id,tarefa.titulo)}
                    />
                ))}
            </tbody>
        </table>

       </div> 
    );
};

export default ManutencaoUsuarios;