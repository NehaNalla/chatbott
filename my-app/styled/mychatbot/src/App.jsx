import ChatBot from 'react-chatbotify'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  const flow={
    "start":{
      "meassage":"hello world"
    }
  }
  return (
    <>
    <ChatBot/>
      category id<input type="text"/>
      <button value="submit">submit</button>
    </>
  )
}

export default App
