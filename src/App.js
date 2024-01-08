
import './App.css';
import { Routes, Route } from "react-router-dom";
import Login  from "./login"
import Signup from "./signup"
import HomePage from "./homepage"
function App() {
  return (
    <div className="App">
      
       <Routes>
        <Route path="/" element={<Login/>} />
          <Route path="/signup" element={<Signup/>} />
          <Route path="/homepage" element={<HomePage/>} />
          
      </Routes>

      
      
    </div>
  );
}

export default App;
