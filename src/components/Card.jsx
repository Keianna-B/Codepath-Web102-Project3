import { useState, useEffect } from 'react';

const Card = (props) => {
  const dictionary = {
    안녕하세요: 'hello',
    고맙습니다: 'thank you',
    하다: 'to do',
    있다 : 'to have',
    네: 'yes',
    아니요: 'no',
    가다 : 'to go',
    오다: 'to come',
    주세요: 'give me',
    주세요: 'please',
    죄송합니다: 'sorry',
    감사합니다: 'thank you',
    아마도: 'maybe',
    냉장고 : 'refrigerator',
    사과: 'apple',
    사랑: 'love',
    사람 : 'person',
    '안녕히 계세요': 'goodbye',
    '안녕히 가세요': 'goodbye',
    '잘 자요': 'good night',
    '잘 지내요': 'how are you',
    먹다 : 'to eat',
    마시다: 'to drink',
    보다: 'to see',
    듣다: 'to hear',
    읽다: 'to read',
    쓰다: 'to write',    
  };

  const [shuffledDictionary, setShuffledDictionary] = useState(() => {
    const shuffledKeys = Object.keys(dictionary).sort(
      () => Math.random() - 0.5
    );
    return Object.fromEntries(
      shuffledKeys.map((key) => [key, dictionary[key]])
    );
  });

  const [history, setHistory] = useState([Object.keys(shuffledDictionary)[0]]);

  function addHistory(element) {
    setHistory([...history, element]);
  }

  const [seen, setSeen] = useState(false);
  const [index, setIndex] = useState(0);
  const [begun, begin] = useState(false);
  const [display, changeDisplay] = useState(
    Object.keys(shuffledDictionary)[index]
  );
  const [guess, setGuess] = useState('');

  useEffect(() => {
    changeDisplay(Object.keys(shuffledDictionary)[index]);
  }, [index, shuffledDictionary]);

  const beginGame = () => {
    if (!begun) {
      return (
        <div className='card'>
          <button
            className='begin-btn'
            onClick={() => begin(true)}>
            Begin
          </button>
        </div>
      );
    } else {
      return (
        <div className='game'>
          <div
            className='card'
            onClick={() => {
              changeDisplay(
                display === Object.keys(shuffledDictionary)[index]
                  ? shuffledDictionary[Object.keys(shuffledDictionary)[index]]
                  : Object.keys(shuffledDictionary)[index]
              );
              setSeen(true);
            }}>
            <p>{display}</p>
          </div>
          {index > 0 && (
            <button
              className='back-btn'
              onClick={() => {
                if (index > 0) {
                  setIndex(index - 1);
                  changeDisplay(Object.keys(shuffledDictionary)[index]);
                }
              }}>
              Back
            </button>
          )}

          {index < Object.keys(shuffledDictionary).length - 1 && (
            <button
              className='next-btn'
              onClick={() => {
                addHistory(Object.keys(shuffledDictionary)[index + 1]);
                setIndex(index + 1);
                setSeen(false);
              }}>
              Next
            </button>
          )}
          {seen === false && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  guess ===
                  shuffledDictionary[Object.keys(shuffledDictionary)[index]]
                ) {
                  alert('Correct!');
                } else {
                  alert('Incorrect. Try again.');
                }
                setGuess('');
              }}>
              <input
                className='input'
                type='text'
                value={guess}
                onChange={(e) => setGuess(e.target.value)}
              />
              <button type='submit'>Submit</button>
            </form>
          )}
        </div>
      );
    }
  };

  return beginGame();
};

export default Card;