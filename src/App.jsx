//import './App.css';
import Cadastrar_tarefa from './components/cadastrar_tarefa';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
      <Router>
        <Routes>
          <Route exact path="/" Component={Cadastrar_tarefa}/>
        </Routes>
      </Router>
    </>
  )
}
export default App;