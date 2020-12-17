import React, {useState, createContext} from 'react';


export const QuestionContext = createContext();

export const QuestionProvider = props =>{
  const [question, setQuestion] = useState('');
  
  return(<QuestionContext.Provider value={[question,setQuestion]}>{props.children}</QuestionContext.Provider>)
}