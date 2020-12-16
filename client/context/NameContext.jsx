import React, {useState, createContext} from 'react';


export const NameContext = createContext();

export const NameProvider = props =>{
    const [name, setName] = useState('');
    
    return(<NameContext.Provider value={[name,setName]}></NameContext.Provider>)
}