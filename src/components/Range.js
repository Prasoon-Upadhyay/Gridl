import React from 'react'
import useWords from '../hooks/use-words';

const Range = () => {

    const {setDifficulty, difficulty} = useWords();
 
    const difficultyMapping = {

      0 : {
          value: '😹🫵',
          color: '#10ff20ba'
      },
      1 : {
          value: 'E A S Y',
          color: '#87dd10ba'
      },
      2 : {
          value: 'M E D I U M',
          color: 'rgb(255, 200, 0)'
      },
      3 : {
          value: 'T O U G H',
          color: 'rgb(236, 112, 4)'
      },
      4 : {
          value: 'H A R D',
          color: 'red'
      },

      5 : {
          value: 'T R Y H A R D',
          color: 'crimson'
      }
  }

    const handleChange = (e) => { 
      setDifficulty(Number(e.target.value))
    } 

    return (
      <div className='mt-5'>
      <h1 className='mt-4 mb-4  '>Gridl</h1> 
        <h3>Select a difficulty</h3> 
          <input className='mt-4' style = {{'width' : "420px", 'background' : '#000' }} onChange={handleChange} type="range"   min="0" max="5" />
          <h3 className='mt-4' style={{'color': difficultyMapping?.[difficulty].color}} >{difficultyMapping?.[difficulty].value}</h3>
      </div>
    )
}

export default Range;