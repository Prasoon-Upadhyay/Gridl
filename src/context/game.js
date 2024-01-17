import { createContext, useState } from "react";

const GameContext = createContext();


function GameProvider( {children} )
{
    const [isStart, setIsStart] = useState(false)
    const [timer, setTimer] = useState(50)
    const [statistics, setStatistics] = useState([])
    const [score, setScore] = useState(0)

    const gameStart = () => {
        setIsStart(true);

    } 

    const selectedGlow = (operation,ele) => { 
 
        if(operation === 'toggle')
        {
            ele.classList.toggle('selected')
        }
        
        else if(operation === "finished")
        {  
            ele.classList.add('finished')
        }  
    }

    const incrementScoreAndCalcStats = (word) => { 

        if(statistics.length === 0)                               
        {
            
            setStatistics([{word: word, wordScore : 10 + word.length, time: 50 - timer}])
        }
        
        else if(statistics.length === 1)
        {
            setStatistics([...statistics, {word: word, wordScore : 10 + word.length, time: 50 - timer - statistics[0].time}])
        }
        else
        {  
            let sum = 0;
            for(const ele of statistics)
            {
                sum += ele.time
            }

            setStatistics([...statistics, {word: word, wordScore : 10 + word.length, time: 50 - timer  - sum  }])

        } 
        setScore(score + 10 + word.length)
    } 
    const disableGrid = (grid) => {
 
        for(const element of grid.current.children)    
        {
            element.classList.add('disabled--span')
        }

    } 
    
    const values = {
        timer,
        setTimer,
        statistics,
        gameStart,
        disableGrid,
        score,
        setScore,
        selectedGlow,
        incrementScoreAndCalcStats,
        isStart, 
    }

    return <GameContext.Provider value = { values }>
        {children}
    </GameContext.Provider>
}


export {GameContext};
export default GameProvider;