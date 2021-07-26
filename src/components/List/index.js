import React, { useEffect, useState } from 'react'
import Item from '../Item/index'
import './style.css'

const List = ({ data, checked }) => {
  const nestedItem = (item) => {
    const children = Object.values(item.children)
    return (
      <Item key={item.id} item={item} children={children} isChecked={checked} />
    )
  }

  return <>{data.map(nestedItem)}</>
}

export default List
