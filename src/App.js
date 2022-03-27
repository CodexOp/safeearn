import logo from './logo.svg';
import './App.css';
import Sidebar from './components/sidebar/Sidebar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Dash from './components/dashboard/Dash';
import Calculator from './components/calculator/Calculator';
import Todo from './components/todo/Todo';
import Swap from './components/swap/Swap';
import Faq from './components/faq/Faq';

function App() {
  return (
    <>
    <Router>
      <Sidebar />
      <Routes>
        <Route  path='/'  exact element={<Dash/>}/>
        <Route path='/calculator' element={<Calculator/>} />
        <Route path='/upvote' element={<Todo />} />
        <Route path='/swap' element={<Swap />} />
        <Route path='/faq' element={<Faq/>} />
      </Routes>
    </Router>

    </>
  );
}

export default App;
