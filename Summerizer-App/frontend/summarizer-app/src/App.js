import React, { useState } from 'react';
import axios from 'axios';

const App = () => {
  const [inputText, setInputText] = useState('');
  const [summary, setSummary] = useState('');

  const summarizerText = async () => {
    try{
      const res = await axios.post(
        `${process.env.REACT_APP_BACKEND_URL}/api/summarize`,
        {text : inputText}
      );
      setSummary(res.data.summary);
    } catch(error) {
      console.error('Error calling backend API : ', error);
    }
  };
  
  return (
    <div>
      <h1>Text Summarizer</h1>
      <textarea name="" id="" 
        cols="50" 
        rows="10"
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      ></textarea>
      <br />
      <button>Summarizer</button>
      <h2>Summary : </h2>
      <p>{summary} </p>
    </div>
  );
};

export default App