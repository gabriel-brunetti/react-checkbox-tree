import React, { useContext, useEffect, useState, useCallback } from 'react'
import dataJSON from './db/data.json'

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [people, setPeople] = useState([])

  const fetchData = useCallback(() => {
    const person = Object.entries(dataJSON).map((item) => {
      return item[1]
    })
    setPeople(person)
  }, [])

  useEffect(() => {
    fetchData()
  }, [fetchData])

  return (
    <AppContext.Provider value={{ people }}>{children}</AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
