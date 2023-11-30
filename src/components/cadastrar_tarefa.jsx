//Componente para incluir tarefas no banco de dados
//declaração da função do componente IncluirTarefa
import { useForm } from "react-hook-form";
import { api } from "./config_axios";
import { useState } from "react";
//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
//form onSubmit={handleSubmit(salvar)}
const Cadastrar_tarefa = () => {
    const{ register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");
    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {  
        try {
                    const response = await api.post("tarefa", campos);
                    setAviso(`Tarefa cadastrada com sucesso!"
                    ${response.data.id}`);
                } catch (error) {
                    setAviso("Erro ao cadastrar a tarefa!");
                }
    }
    
    //aqui é o que vai ser exibido em tela
    return ( 
        <div className="container">
            <h4 className="fst-italic mt-3">Cadastrar Tarefa</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="titulo">Titulo: </label>
                    <input type="text" className="form-control" id="titulo"
                    required autoFocus {...register("titulo")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="descricao">Descrição: </label>
                        <input type="text" className="form-control" id="descricao"
                        required {...register("descricao")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="foto">status: </label>
                        <input type="text" className="form-control" id="foto"
                        required {...register("foto")}/>
                </div>
                <div className="row mt-2">
                    <div className="col-sm-4">
                        <div className="form-group">
                            <label htmlFor="data_criacao">Data de Criação: </label>
                            <input type="date" className="form-control" id="data_criacao" 
                            required {...register("ano")}></input>
                        </div>
                    </div>
                </div>
                <div className="col-sm-8">
                    <div className="form-group">
                        <label htmlFor="data_limite">Data Limite: </label>
                        <input type="date" className="form-control" id="data_limite" 
                        required {...register("preco")}></input>
                    </div>
                </div>
                <input type="submit" className="btn btn-primary mt-3"
                value="Enviar" />
                <input type="reset" className="btn btn-danger mt-3 ms-3"
                value="Limpar"/>
        </form>
        <div className="alert"></div>
        </div>
    )
}

export default Cadastrar_tarefa;