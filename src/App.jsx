import { useState, useEffect } from 'react';

function App() {
  const [count, setCount] = useState(0);
  const [select, setSelect] = useState([]);
  const [buttonValues, setButtonValues] = useState([]);
  const [showPlayAgain, setShowPlayAgain] = useState(false);
  const [highScore, setHighScore] =useState([0]);


  useEffect(()=>{
    fetch('https://api.giphy.com/v1/gifs/trending?api_key=BDgbrZlN9K9behTFHEYMQCCOlgbI1NPD&limit=50')
    .then(response => response.json())
  
    .then(data => {
      
      const gifUrls = data.data.map(gif => gif.images.downsized.url);
      
      setButtonValues(gifUrls);
      
    })
    .catch(error => console.error(error));
}, []);
   
const handleButtonClick = (url) => {
  const uniqueUrls = new Set(); // Set to store unique URLs
  const newButtonValues = [];

  while (uniqueUrls.size < 8) {
    const randomIndex = Math.floor(Math.random() * buttonValues.length);
    const randomUrl = buttonValues[randomIndex];

    // Ensure the URL is not already in the uniqueUrls Set
    if (!uniqueUrls.has(randomUrl)) {
      uniqueUrls.add(randomUrl);
      newButtonValues.push(randomUrl);
    }
  }

  setButtonValues(newButtonValues);
  setSelect(current => [...current, url]);
  setCount(count + 1);
};


  useEffect(() => {
    const hasRepeatedValue = new Set(select).size !== select.length;

    if (hasRepeatedValue) {
      setCount(0)
      setSelect([]);
      setShowPlayAgain(true)
      setHighScore(prevScore => ([...prevScore , count]) )
    }


  
  }, [select , count]);



  return (
    <div className='App' style={{ opacity: showPlayAgain ? '50%' : '100%' }}>
      
      <div className="playAgain" style={{ display: showPlayAgain ? 'block' : 'none' }}>
        <h2>You Lost! better luck next time </h2>
        <button onClick={() => setShowPlayAgain(false)}>Play again</button>
      </div>
      <div className="score">
      <h2>Score: {count}</h2>
      <h2>HighScore:{Math.max(...highScore)}</h2>
      </div>
      <div className= "btn">
      <button onClick={() => handleButtonClick(buttonValues[0])}><img src={buttonValues[0]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[1])}><img src={buttonValues[1]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[2])}><img src={buttonValues[2]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[3])}><img src={buttonValues[3]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[4])}><img src={buttonValues[4]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[5])}><img src={buttonValues[5]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[6])}><img src={buttonValues[6]}/></button>
      <button onClick={() => handleButtonClick(buttonValues[7])}><img src={buttonValues[7]}/></button>
      </div>
      
    </div>
  );
}

export default App;
