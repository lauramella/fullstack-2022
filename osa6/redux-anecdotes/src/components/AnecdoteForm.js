import React from 'react'
import { useDispatch } from 'react-redux'
import { create } from '../reducers/anecdoteReducer'
import { notificationOn, notificationOff } from '../reducers/notificationReducer'

const AnecdoteForm = () => {
  const dispatch = useDispatch()
  const add = (event) => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    dispatch(create(anecdote))
    dispatch(notificationOn(`New anecdote ${anecdote} added`))
    setTimeout(() => dispatch(notificationOff()), 5000)
  }

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={add}>
        <div><input name='anecdote' /></div>
            <button type='submit'>create</button>
      </form>
    </>
  )
}

export default AnecdoteForm