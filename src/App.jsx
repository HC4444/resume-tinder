import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ImageSwiper from './components/ImageSwiper'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <ImageSwiper />
        
    </>
  )
}

export default App
