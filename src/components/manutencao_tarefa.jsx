import {useForm} from "react-hook-form";
import { useState, useEffect } from "react";
import { api } from "./config_axios.js";
import ItemLista from "./ItemLista.jsx";  

const ManutencaoTarefas = () => {
//Servem para manipular os dados do formulário
    const {register, handleSubmit, reset} = useForm();
//Servem para guardar e setar as informções do objeto
    const [tarefas, setTarefas] = useState([]);

    const obterLista = async () => {
        try {
            const lista = await api.get("tarefa");
            if (lista.data && lista.data.tarefas) {
                setTarefas(lista.data.tarefas);
                console.log("Estado atual de tarefas:", tarefas);
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
    try {
        const response = await api.get(`tarefa/filtro/${campos.palavra}`);
        if (response.status === 200) {
            const lista = response.data;
            
            if (lista.success) {
                setTarefas(lista.tarefa);
            } else {
                alert("Não há tarefas cadastradas com a palavra chave pesquisada");
            }
         } else {
          alert(`Erro na solicitação: ${response.statusText}`);
         }
       
    } catch (error) {
        
        alert("Não há tarefas cadastradas com a palavra chave pesquisada");
    }
}

const excluir = async(id,titulo) => {
    if(!window.confirm(`Confirma a exclusão da tarefa ${titulo}?`)){
        return;
    }
    try{
        await api.delete(`tarefa/${id}`);
        setTarefas(tarefas.filter(tarefas => tarefas.id !== id));
    }catch(error){
        alert(`Erro: ..Não foi possível excluir a tarefa ${titulo}: ${error}`);
    }
}

//alterar os registros
const alterar = async (id, titulo) => {
    const novoStatus = prompt(`Digite o novo status da tarefa ${titulo}`);
    if (novoStatus === "" || novoStatus === null) {
        alert('Digite um status válido! (status em branco)');
        return;
    }
    try {
        // Chamando o backend e passando os dados
        await api.put(`tarefa/${id}`, { status: novoStatus });

        // Atualizando a lista de tarefas
        obterLista();
        // Recarregar a página para atualizar a lista
    } catch (error) {
        alert(`Erro: Não foi possível alterar a tarefa ${titulo}: ${error}`);
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

export default ManutencaoTarefas;