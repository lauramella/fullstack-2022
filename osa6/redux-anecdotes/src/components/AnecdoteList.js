import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { addVote} from '../reducers/anecdoteReducer'
import { notificationOn, notificationOff } from '../reducers/notificationReducer'

const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes)
  const dispatch = useDispatch()
  
    const vote = ({ id, content }) => {
      console.log('vote', id)
      dispatch(addVote(id))
      dispatch(notificationOn(`You voted ${content}`))
      setTimeout(() => dispatch(notificationOff()), 5000)
    }
  
  return (
    <>
      {anecdotes
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </>
  )
}
  
export default AnecdoteList