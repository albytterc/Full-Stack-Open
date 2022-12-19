import { useState } from "react";


const App = () => {
  const data = [
    "If it hurts, do it more often.",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.",
  ];
  const [anecdotes, setAnecdotes] = useState(data);
  const origVotes = Array(data.length).fill(0);
  const [votes, setVotes] = useState(origVotes);
  const [mostPopular, setMostPopular] = useState(-1);

  const getRandInt = (max) => {
    return Math.floor(Math.random() * max);
  };

  const [selected, setSelected] = useState(getRandInt(anecdotes.length));

  const updateSelected = () => {
    // const minusOne = anecdotes.slice(0, selected).concat(anecdotes.slice(selected + 1));
    // setAnecdotes(minusOne);
    const randInt = getRandInt(data.length);
    setSelected(randInt);
  };

  const castVote = () => {
    const copy = [...votes];
    copy[selected]++;
    setVotes(copy);
    const mostPopular = copy.indexOf(Math.max(...copy));
    setMostPopular(mostPopular);
  }


  const reset = () => {
    // debugger;
    setAnecdotes(data);
    setSelected(getRandInt(data.length));
    
  };

  return (
    <div>
      <h1>Anecdote of the Day</h1>
      <q>{anecdotes[selected]}</q>
      <p>Has {votes[selected]} vote{votes[selected] !== 1 && (<>s</>)}</p>
      <br />
      <button onClick={castVote}>Vote</button>
      <button disabled={anecdotes.length <= 1} onClick={updateSelected}>
        Show next anecdote
      </button>
      {anecdotes.length <= 1 && <button onClick={reset}>Start Over</button>}
      <h1>Most Popular Anecdote</h1>
      {mostPopular !== -1 ? (
        <>
          <q>{anecdotes[mostPopular]}:</q>
          <p>Has {votes[mostPopular]} vote{votes[mostPopular] !== 1 && (<>s</>)}</p>
        </>
      ) : (<p>No votes casted</p>)}
    </div>
  );
};

export default App;
