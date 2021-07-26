import React, { useState, useEffect } from 'react'
import List from '../List'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import './style.css'

const Item = ({ item, children, isChecked }) => {
  const [collapsed, setCollapsed] = useState(false)
  const [checked, setChecked] = useState(false)

  useEffect(() => {
    const collapsedIDs = JSON.parse(localStorage.getItem('expanded')) || []

    collapsedIDs.forEach((element) => {
      if (element === item.id) {
        setCollapsed(false)
      }
    })
  }, [item])

  useEffect(() => {
    let expandeds = JSON.parse(localStorage.getItem('expanded')) || []
    if (!collapsed) {
      localStorage.setItem('expanded', JSON.stringify([...expandeds, item.id]))
    } else {
      const items = expandeds.filter((id) => id !== item.id)
      localStorage.setItem('expanded', JSON.stringify(items))
    }
  }, [collapsed, item])

  useEffect(() => {
    setChecked(isChecked)
  }, [isChecked])

  useEffect(() => {
    const checkedIds = JSON.parse(localStorage.getItem('check')) || []
    checkedIds.forEach((item) => {
      if (item === item.id) {
        setChecked(true)
      }
    })
  }, [item])

  const toggleCollapse = () => setCollapsed(!collapsed)

  const toggleChecked = () => {
    let checkedStatus = !checked
    const childrenId = children.map((children) => children.id)
    const checkedItems = JSON.parse(localStorage.getItem('check')) || []
    if (checkedStatus) {
      localStorage.setItem(
        'check',
        JSON.stringify([...checkedItems, item.id, ...childrenId])
      )
    } else {
      let items = checkedItems.filter((idItem) => idItem !== item.id)
      console.log(checkedItems)
      localStorage.setItem('check', JSON.stringify(items))
    }
    setChecked(checkedStatus)
  }

  return (
    <li className='item-container'>
      <div className='checkbox-container'>
        <div className='checkbox-input' onClick={toggleChecked}>
          <input
            type='checkbox'
            name='checkbox'
            id='checkbox'
            checked={checked}
            onChange={() => setChecked(!checked)}
          />
          <span>{item.name}</span>
        </div>
        {children.length > 0 ? (
          <FontAwesomeIcon
            icon={faChevronDown}
            onClick={toggleCollapse}
            className={`icon ${collapsed ? 'clicked' : ''}`}
          />
        ) : (
          ''
        )}
      </div>

      <ul className={(collapsed ? 'collapsed' : '', 'nestedList-container')}>
        {collapsed && children?.length > 0 && (
          <List data={children} checked={checked} />
        )}
      </ul>
    </li>
  )
}

export default Item
