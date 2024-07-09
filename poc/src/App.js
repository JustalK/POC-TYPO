import './App.css';
import { useState, useRef } from 'react'
var Typo = require("typo-js");
var dictionary = new Typo("en_US", false, false, { dictionaryPath: "./dictionaries" });

function App() {
  const refTimer = useRef(null)
  const [words, setWords] = useState([])

  const handleChange = (e) => {
    const word = e.target.value;
    if (refTimer.current) {
      clearTimeout(refTimer.current)
    }

    refTimer.current = setTimeout(() => {
      const is_spelled_correctly = dictionary.check(word);
      const array_of_suggestions = dictionary.suggest(word);
      setWords(array_of_suggestions)
      console.log(is_spelled_correctly)
    }, 250)
  }

  return (
    <div className="App">
      <textarea rows="5" cols="33" onChange={handleChange}></textarea>
      <div>Suggestion</div>
      {words.map((w) => {
        return (<div>{w}</div>)
      })}
    </div>
  );
}

export default App;
