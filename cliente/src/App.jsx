import { BrowserRouter, Routes, Route } from "react-router-dom";
import RegisterPages from './pages/RegisterPages.jsx'; 
import LoginPages from './pages/LoginPages.jsx';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<h1>Homee</h1>} /> {/* Ahora el login es la página principal */}
        <Route path="/login" element={<LoginPages/>} />
        <Route path="/register" element={<RegisterPages/>} />
        <Route path="/task" element={<h1>Task</h1>} />
        <Route path="/task/:id" element={<h1>Update task</h1>} />
        <Route path="/profile" element={<h1>Profile</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
