import './public/styles/App.css';
import Calculator from './components/calculator';
import Header from './components/header';

function App() {
  return (
    <div className="App">     
      <Header/>       
      <Calculator></Calculator>
    </div>
  );
}

export default App;
