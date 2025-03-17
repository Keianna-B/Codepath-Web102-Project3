import './App.css'
import Card from './Components/Card.jsx';

function App() {

  return (
    <div className='App'>
      <div className='top'>
        <h1 className='title'>Korean Interactive Flashcards</h1>
        <p className='description'>
          Use these Korean flashcards to test your knowledge:
        </p>
        <p className='card-count'>27 Cards</p>
      </div>
      <Card />
    </div>
  );
}

export default App
