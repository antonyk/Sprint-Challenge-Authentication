import React, {useState, useEffect} from 'react'
import axiosWithAuth from './axiosWithAuth'

export default function Jokes(props) {

  const [jokes, setJokes] = useState([])

  useEffect(() => {

    getJokes()

  }, [])

  function getJokes() {
    // axios to get friends list
    // set state with friends result
    axiosWithAuth().get('/api/jokes')
      .then(res => {
        console.log('response: ', res);
        setJokes(res.data)
      })
      .catch(err => {
        console.log({err});
      })
  }


  return (
    <>
    <div>
      <ul>
        {jokes.map(item => (<li>{item.joke}</li>))}
      </ul>
    </div>
    </>
  )

}