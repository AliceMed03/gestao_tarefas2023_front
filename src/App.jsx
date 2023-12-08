//import './App.css';
import Cadastrar_tarefa from './components/cadastrar_tarefa';
import Cadastrar_usuario from './components/cadastrar_usuario';
import Manutencao_tarefa from './components/manutencao_tarefa';
import Manutencao_usuario from './components/manutencao_usuario';

import 'bootstrap/dist/css/bootstrap.min.css';

import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
      <Router>
        <Routes>
          <Route exact path="/tarefa" Component={Cadastrar_tarefa}/>
          <Route exact path="/usuario" Component={Cadastrar_usuario}/>
          <Route exact path="/manutencaoTarefa" Component={Manutencao_tarefa}/>
          <Route exact path="/manutencaoUsuario" Component={Manutencao_usuario}/>
        </Routes>
      </Router>
    </>
  )
}
export default App;