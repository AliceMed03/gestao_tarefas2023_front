//import './App.css';
import { Router } from 'express';
import cadastrar_tarefa from './components/cadastrar_tarefa';
import {Routes,Route} from 'react-router-dom';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
      <Router>
        <Routes>
          <Route path="/" element={<cadastrar_tarefa/>}/>
        </Routes>
      </Router>
    </>
  )
}
export default App;