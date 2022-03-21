import './App.css';
import Nav from './Components/nav';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import Apistate from './context/Apistate';



function App() {
  return (
    <Apistate>
    <Router>
      <Nav/>
    <Routes>
        <Route index exact path="/"/>
        <Route path="/product" />
        <Route path="/category"/>
    </Routes>

  </Router>
  </Apistate>
  );
}

export default App;
