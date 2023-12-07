//Componente para incluir usuários no banco de dados
//declaração da função do componente IncluirTarefa
import { useForm } from "react-hook-form";
import { api } from "./config_axios";
import { useState } from "react";
//register serve para definir os nomes dos campos do form (validações)
//handleSubmit, para indicar o método a ser acionado no evento onSubmit do form
//form onSubmit={handleSubmit(salvar)}
const Cadastrar_usuario = () => {
    const{ register, handleSubmit } = useForm();
    const [aviso, setAviso] = useState("");
    //método chamado ao enviar form onSubmit
    const salvar = async (campos) => {  
        try {
                    const response = await api.post("usuario", campos);
                    setAviso(`Usuário cadastrado com sucesso!"
                    ${response.data.id}`);
                } catch (error) {
                    setAviso("Erro ao cadastrar o usuário!");
                }
    }
    
    //aqui é o que vai ser exibido em tela
    return ( 
        <div className="container">
            <h4 className="fst-italic mt-3">Cadastrar Usuário</h4>
            <form onSubmit={handleSubmit(salvar)}>
                <div className="form-group">
                    <label htmlFor="username">Username: </label>
                    <input type="text" className="form-control" id="username"
                    required autoFocus {...register("username")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="email">E-mail: </label>
                        <input type="text" className="form-control" id="email"
                        required {...register("email")}/>
                </div>
                <div className="form-group mt-2">
                    <label htmlFor="senha">Senha: </label>
                        <input type="password" className="form-control" id="senha"
                        required {...register("senha")}/>
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

export default Cadastrar_usuario;