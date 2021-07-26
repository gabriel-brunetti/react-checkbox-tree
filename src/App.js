import React from 'react'
import List from './components/List/'
import './App.css'
import { useGlobalContext } from './context'

function App() {
  const { people } = useGlobalContext()
  return (
    <ul className={'list-container'}>
      <List data={people} />
    </ul>
  )
}

export default App
