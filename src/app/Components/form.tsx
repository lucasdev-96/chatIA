'use client';

import { useState } from "react"
import { model } from "../backend/gemini";
export const Form = () => {
    const [text, setText] = useState('')
    const [getResponse, setResponse] = useState('')
    const [historyFromGemini, setHistoryFromGemini] = useState([{text: ''}])
    const [historyFromUser, setHistoryFromUser] = useState([{text: ''}])

    const [history, setHistory] = useState([{user: '', model: ''}])


    const handleChange = async (event: any): Promise<any> => {
        setText(event.target.value)
    }

     async function run() {
        const prompt = text;
        const chat =  model.startChat({history: [{role: 'user', parts: historyFromUser}, {role: 'model', parts: historyFromGemini}]});


          const result = await chat.sendMessage(prompt);
          const response =  result.response;
          setResponse(response.text());
          setHistoryFromGemini([...historyFromGemini, {text: response.text()}]);
          setHistoryFromUser([...historyFromUser, {text: prompt}]);


          setHistory([...history, {user: prompt, model: response.text()}])
      }
      

      const handleKeyDown = (event:any) => {
        if (event.key === 'Enter' && text !== '') {
            run();
            setResponse('')
            setText('')

        }
      };
    
    const handleClick = async (event: any): Promise<any> => {
        
        if (text !== '') {
            run();
            setText('')
        }

    }
    return (
        <>
          <div style={{color: 'white', marginBottom: '100px', textAlign: 'justify', maxWidth: '40vw', fontSize: '20px'}}>
           {history.map(({user, model}, index) => (
                <div key={index}>
                    <h3>{user ? `User: ${user}` : ''}</h3>
                    <h3 style={{marginBottom: '30px'}}>{user ? `IA Bolada: ${model}` : ''}</h3>

                </div>
           )) }
       </div>

       <div style={{width: '50vw', borderRadius: '30px', padding: '30px', backgroundColor: 'white'}}>
           <input    onKeyDown={handleKeyDown} id="text" placeholder="Escreva sua mensagem!" type="text" style={{width: '80%', outline: 'none', color: 'black'}}  onChange={handleChange} value={text}    />
           <button style={{color: 'black'}} onClick={handleClick}>Enviar</button>
       </div>
        </>

    )
}