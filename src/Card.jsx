import { useState, useEffect } from 'react';
let streak = 0; // Initialize streak outside of the component to maintain its value across renders
let recordStreak = 0; // Initialize finalStreak outside of the component to maintain its value across renders
let needsReview = [];

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
          <div>
            {index > 0 && (
            <button className='shuffle-btn' onClick={() => {
              setShuffledDictionary(() => {
                const shuffledKeys = Object.keys(dictionary).sort(
                  () => Math.random() - 0.5
                );
                return Object.fromEntries(
                  shuffledKeys.map((key) => [key, dictionary[key]])
                );
              setIndex(0);
              setSeen(false);}) } }>
              Shuffle
              </button>)}
              {index > 0 && (
            <button className='review-btn' onClick={() => {
              setShuffledDictionary(() => {
                const reviewKeys = needsReview.length > 0 ? needsReview : Object.keys(dictionary);
                const shuffledKeys = reviewKeys.sort(() => Math.random() - 0.5);
                return Object.fromEntries(
                  shuffledKeys.map((key) => [key, dictionary[key]])
                );
              });
              setIndex(0);
              setSeen(false);
            }}>Review</button>)}
              </div>
          {seen === false && (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                if (
                  guess ===
                  shuffledDictionary[Object.keys(shuffledDictionary)[index]]
                ) {
                  alert('Correct!');
                  streak++;
                  if(needsReview.includes(Object.keys(shuffledDictionary)[index])) {
                    needsReview = needsReview.filter(item => item !== Object.keys(shuffledDictionary)[index]);
                  }


                } else {
                  alert('Incorrect. Try again.');
                  if(recordStreak < streak) {
                    recordStreak = streak;
                  }
                  streak = 0;
                  needsReview.push(Object.keys(shuffledDictionary)[index]);

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
        {  index === Object.keys(shuffledDictionary).length - 1 && (
            <button
              className='finish-btn'
              onClick={() => {
                alert('Game Over! Your current streak is ' + streak + '. Your longest streak is ' + recordStreak);
                finalStreak = 0; // Reset final streak for next game
                setIndex(0);
                setSeen(false);
                begin(false);
                needsReview = [];
                streak = 0;
              }}>
              Finish
            </button>
          )}
          <h3>Streak: {streak}</h3>
        </div>
      );
    }
  };

  return beginGame();
};

export default Card;