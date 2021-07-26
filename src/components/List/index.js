import React, { useEffect, useState } from 'react'
import { useGlobalContext } from '../../context'
import Item from '../Item/index'

const List = () => {
  const { people } = useGlobalContext()

  return (
    <>
      <ul>
        {people.map((item, id) => {
          return (
            <li key={id}>
              <Item key={item.id} {...item} />
            </li>
          )
        })}
      </ul>
    </>
  )
}

export default List
