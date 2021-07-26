import React, { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'

const Item = ({ id, name, children, level }) => {
  children = Object.entries(children).map((item) => {
    return item[1]
  })

  return (
    <article>
      <p>{name}</p>
      <ul>
        {children.map((person, id) => {
          return (
            <li key={id}>
              <Item key={person.id} {...person} />
            </li>
          )
        })}
      </ul>
    </article>
  )
}

export default Item
