import Cadastrar_tarefa from './components/cadastrar_tarefa';
import Menu_superior from './components/menu_superior';
import Manutencao_tarefa from './components/manutencao_tarefa';
import FormularioLogin from './components/login';
import Cadastrar_usuario from './components/cadastrar_usuario';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import { AuthProvider, useAuth } from './components/AuthProvider';

const ProtectedRoute = ({ children }) => {
    const { autenticado } = useAuth();
    return autenticado ? children : <Navigate to="/login" />;
};

const RoutesWithAuth = () => {
    const { autenticado } = useAuth();

    return (
        <Router>
            {autenticado && <Menu_superior />}
            <Routes>
                <Route path="/login" element={<FormularioLogin />} />
                <Route path="/" element={autenticado ? <Navigate to="/tarefa" /> : <FormularioLogin />} />
                <Route path="/tarefa" element={<ProtectedRoute><Cadastrar_tarefa /></ProtectedRoute>} />
                <Route path="/manutencao" element={<ProtectedRoute><Manutencao_tarefa /></ProtectedRoute>} />
                <Route path="/user" element={<ProtectedRoute><Cadastrar_usuario /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
};

const App = () => {
    return (
        <AuthProvider>
            <RoutesWithAuth/>
        </AuthProvider>
    );
};
  
export default App;