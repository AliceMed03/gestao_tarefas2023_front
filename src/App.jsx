//import './App.css';
import cadastrar_tarefa from './components/cadastrar_tarefa';
import {Routes,Route} from 'react-router-dom';
const App = () => {
  return(  //tudo que vai aqui no return é o que aparece na aplicação
    <>
      <Routes>
        <Route path="/" element={<cadastrar_tarefa/>}/>
      </Routes>
    </>
  )
}
export default App;