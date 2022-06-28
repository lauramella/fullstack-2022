import { useState } from 'react'

const Header = ({text}) => <h2>{text}</h2>

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const Votes = ({amount}) => <div>has {amount} votes</div>

const MostVotes = ({anecdotes, votes}) => {
  let most = 0;
  let index = 0;
  for (let i = 0; i < anecdotes.length; i++) {
    if (votes[i]> most) {
      most = anecdotes[i];
      index = i;
    }
  }
  return(
    <div>
      <Header text={'Anecdote with most votes'} />
      {anecdotes[index]}
      <div>has {votes[index]} votes</div>
    </div>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]

  const random = Math.floor(Math.random() * anecdotes.length)
  const points = Array(anecdotes.length).fill(0)
  const copy = [...points]
   
  const [selected, setSelected] = useState(random)
  const [votes, setVotes] = useState([...copy])
  
  const addVote = (selected) => {
    const copy = [...votes]
    copy[selected] = copy[selected] + 1
    setVotes(copy)
  }

  return (
    <div>
      <Header text={'Anecdote of the day'} /> 
      {anecdotes[selected]}
      <Votes amount={votes[selected]} />
      <Button handleClick={() => addVote(selected)} text='vote' />
      <Button handleClick={() => setSelected(Math.floor(Math.random() * anecdotes.length))} text='next anekdote' /> 
      <MostVotes anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App
