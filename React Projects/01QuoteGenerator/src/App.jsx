import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [quote, setQuote] = useState(["I love Thor", "Thor Probably"])
  const apiKey = 'vNdwEH+BGOKs7soAYTRl1g==4s3Z4o49RRTMo2w0';

  const GenQuote = () => {
    const qt = [];
    fetch('https://api.api-ninjas.com/v1/quotes', {
      method: 'GET',
      headers: {
        'X-Api-Key': apiKey
      }
    })
      .then(response => response.json())  
      .then(data => {
        let currQt = data[0];  
        setQuote([currQt['quote'], currQt['author']]);
      })
      .catch(error => {
        console.error("Error:", error);  
      });
  }

  return (
    <div className='w-screen h-screen bg-black/85 flex flex-col justify-center gap-10'>


      {/* Quote Part */}
      <div className=' border-4 border-yellow-400 w-auto h-auto flex flex-col justify-center items-center p-5'>
        <p className='font-sans text-yellow-400 text-3xl '>{quote[0]}</p>
        <p className='font-sans text-yellow-400 font-bold text-l self-end'>-{quote[1]}</p>
      </div>

      {/* Press Here to gen Quote Part */}
      <div className='flex justify-center'>
        <button className='bg-blue-500 text-white hover:bg-blue-700 p-1 rounded-md'
          onClick={GenQuote}
        >Generate Quote</button>
      </div>
    </div>
  )
}

export default App
