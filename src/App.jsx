import React from 'react'
import axios from 'axios'

function App() {

  // for test API
  async function makeRequest() {
    const response = await axios.get('http://127.0.0.1:8000/api/')
    console.log(response); 
  }
  makeRequest()

  return (
    <div>App</div>
  )
}

export default App