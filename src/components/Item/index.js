import React, { useState, useEffect } from 'react'
import List from '../List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const Item = ({ id, name, children }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [checked, setChecked] = useState(false)
  const checkedIds = JSON.parse(localStorage.getItem('check')) || []

  children = Object.entries(children).map((item) => {
    return item[1]
  })

  useEffect(() => {
    const expandedIds = JSON.parse(localStorage.getItem('expanded')) || []
    expandedIds.forEach((item) => {
      if (item === id) {
        setCollapsed(false)
      }
    })
  }, [id])

  useEffect(() => {
    const expandedIds = JSON.parse(localStorage.getItem('expanded')) || []
    if (!collapsed) {
      localStorage.setItem('expanded', JSON.stringify([...expandedIds, id]))
    } else {
      const items = expandedIds.filter((idEx) => idEx !== id)
      localStorage.setItem('expanded', JSON.stringify(items))
    }
  }, [collapsed, id])

  useEffect(() => {
    checkedIds.forEach((item) => {
      if (item === id) {
        setChecked(true)
      }
    })
  }, [checkedIds, id])

  const toggleCollapse = (e) => {
    setCollapsed((val) => !val)
  }

  const toggleChecked = () => {
    let checkedStatus = !checked
    const childrenId = children.map((children) => children.id)
    const checkedItems = JSON.parse(localStorage.getItem('check')) || []
    if (checkedStatus) {
      localStorage.setItem(
        'check',
        JSON.stringify([...checkedItems, id, ...childrenId])
      )
    } else {
      let items = checkedItems.filter((idItem) => idItem !== id)
      console.log(checkedItems)
      localStorage.setItem('check', JSON.stringify(items))
    }
    setChecked(checkedStatus)
  }

  return (
    <div className='item-container'>
      <div className='checkbox-container' onClick={toggleChecked}>
        <input
          type='checkbox'
          name='checkbox'
          id='checkbox'
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <span>{name}</span>
      </div>

      {children.length > 0 && (
        <FontAwesomeIcon icon={faChevronDown} onClick={toggleCollapse} />
      )}

      <ul className={collapsed ? 'collapsed' : ''}>
        {children.map((item, id) => {
          return <li key={id}>oi'</li>
        })}
      </ul>
    </div>
  )
}

export default Item
