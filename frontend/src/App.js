
import './App.css';
import {BrowserRouter,Routes,Route} from 'react-router-dom';
import Student from './Components/Student.js'
import CreateStudent from './Components/CreateStudent';
import UpdateStudent from './Components/UpdateStudent';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Student />}></Route>
        <Route path='/create' element={<CreateStudent />}></Route>
        <Route path='/update/:id' element={<UpdateStudent />}></Route>
      </Routes>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
