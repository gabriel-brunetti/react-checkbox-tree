import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const Item = ({ id, name, children, level }) => {
  const [collapsed, setCollapsed] = useState(true)
  const [checked, setChecked] = useState(false)

  children = Object.entries(children).map((item) => {
    return item[1]
  })

  const toggleCollapse = (e) => {
    setCollapsed(!collapsed)
  }

  const toggleChecked = () => {
    setChecked(!checked)
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
        {children.map((person, id) => {
          return (
            <li key={id}>
              <Item key={person.id} {...person} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Item
