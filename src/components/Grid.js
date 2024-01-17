import {React, useCallback, useEffect, useRef, useState} from 'react'
import useWords from '../hooks/use-words'   
import useGame from '../hooks/use-game';
import StatisticsModal from './StatisticsModal';

const Grid = () => {

    const {difficulty , grid, wordArray, setWordArray, buildMatrix } = useWords();
    const {timer, statistics , setTimer,incrementScoreAndCalcStats, score, disableGrid, selectedGlow} = useGame();

    const [progressArr, setProgressArr] = useState([]); 
    const [completedArr, setCompletedArr] = useState([])     

    const myRef = useRef(null)
    const gridRef = useRef(null)                    //grid reference to disable grid later.

    const decrementTimer = useCallback( () => {     //useCallback so that setInterval is not called and computer on every render (only on initial render => []).
        setTimer( (oldTimer) => oldTimer - 1)
    }, [] )
    

    //--------------------------------------------------useEffect for Timer --------------------------------------------------//
    useEffect( () => {  
        if(timer <= 0)
        {    

            disableGrid(gridRef) //disabling grid 
            return;
        }

        const timerFunction = setInterval(decrementTimer, 1000)           
        return () => clearInterval(timerFunction)

    }, [timer])
    
    // ------------------------------------useEffect for Initial Render------------------------------//
    
    useEffect(() => { 
        buildMatrix(5  + difficulty)   

    }, [])
 
        
    // ------------------------------------useEffect for every change in the progressArray (when a letter is clicked)------------------------------//
    useEffect( () => { 
  
        const progressWord = progressArr.map( (ele) => ele.textContent ).join('').toLowerCase() 
        if(wordArray.indexOf(progressWord) !== -1)                                      // The letters in progressArray matches a word in the wordArray
        {    
            myRef.current.classList.toggle('score-add')                                 // adding effect of score add on correct word.
            setTimeout( () =>  myRef.current.classList.toggle('score-add') , 1500)      // removing effect after 1.5s cz animation runs for 1s.

            progressArr.forEach( (ele) => {
                selectedGlow('finished', ele) 
            })

            const returnWord = wordArray.splice(wordArray.indexOf(progressWord), 1)     // the word is popped

            setWordArray([...wordArray])                                                // removed from wordArray
            setCompletedArr([...completedArr.concat(returnWord)])                       // word added in completedArr
            setProgressArr([])                                                          // progressArr reset 
             
            incrementScoreAndCalcStats(progressWord);
        
        }   
    }, [progressArr])
    
    //------------------------------------- useEffect to check if the game win condition is met on every change of completedArray -------------------------------------------//

    useEffect( () => {

        if(wordArray.length === 0 && completedArr.length !== 0)
        {
            setProgressArr([])
            setWordArray([]) 
            setTimer(0)
            disableGrid(gridRef)
        }

    }, [completedArr])

    // ----------------------------------------------------Grid Letter Selection Logic--------------------------------------------------------//

    const handleClick = (e) => {  

        if(progressArr.length >= 2)                                         // Condition to compare the orientation of the target element with previous two elements of the neighbours
        {

            const xN1 = Number(progressArr[progressArr.length - 1].attributes[0].value)  //1st neighbour of target element (Horizontal)
            const xN2 = Number(progressArr[progressArr.length - 2].attributes[0].value)  //2nd neighbour of target element (Horizontal)

            const yN1 = Number(progressArr[progressArr.length - 1].attributes[1].value)  //1st neighbour of target element (Vertical)
            const yN2 = Number(progressArr[progressArr.length - 2].attributes[1].value)  //2nd neighbour of target element (Vertical)
            
            if(xN2 - xN1 === xN1 - e.target.attributes[0].value && xN1 + 1 === Number(e.target.attributes[0].value) && yN1 === Number(e.target.attributes[1].value) )          // checks if the target ele is in orientation with the previous two horizontal elements. 
            {
                selectedGlow('toggle', e.target)                 //checks if the target element already exists (removed from progressArray if exists)
                setProgressArr([...progressArr,e.target])  
            }

            else if(yN2 - yN1 === yN1 - e.target.attributes[1].value && yN1 + 1 === Number(e.target.attributes[1].value) && xN1 === Number(e.target.attributes[0].value) )       // checks if the target ele is in orientation with the previous two vertical elements. 
            { 
                selectedGlow('toggle', e.target)  
                setProgressArr([...progressArr,e.target]) 
            }

            
            else if(progressArr.indexOf(e.target) !== -1)                   //checks if the target element already exists (removed from progressArray if exists)
            {   
                selectedGlow('toggle', e.target)
                progressArr.splice(progressArr.indexOf(e.target), 1) 
                setProgressArr([...progressArr]) 
            }
            
            else                                                            // condition in which the target element does not satisfy the orientation of the previous two elements (array reset and the target element added)
            {
                setProgressArr([]);  
                progressArr.forEach( (ele) => selectedGlow('toggle', ele))

                setProgressArr([e.target])
                selectedGlow('toggle',e.target)
            }
        }

        else if(progressArr.length === 1)                                   // condition to check if the target element is a neighbour of the first element (will reset the array if not)
        {
            const xN1 = Number(progressArr[progressArr.length - 1].attributes[0].value)    
            const yN1 = Number(progressArr[progressArr.length - 1].attributes[1].value)  

            if(xN1 + 1 === Number(e.target.attributes[0].value) && yN1 === Number(e.target.attributes[1].value) )           //if horizontal neighbour
            { 
                setProgressArr([...progressArr, e.target])
                selectedGlow('toggle', e.target)
            }

            else if(yN1 + 1 === Number(e.target.attributes[1].value) && xN1 === Number(e.target.attributes[0].value))       //if vertical neighbour
            { 
                setProgressArr([...progressArr, e.target])
                selectedGlow('toggle', e.target)
            }

            else if(progressArr.indexOf(e.target) !== -1)                   //checks if the target element already exists (removed from progressArray if exists)
            {   
                selectedGlow('toggle', e.target)
                progressArr.splice(progressArr.indexOf(e.target), 1) 
                setProgressArr([...progressArr]) 
            }

            else                                                            // condition in which the target element is not a neighbour of the first element (array reset and the target element added)
            {
                setProgressArr([]);  
                progressArr.forEach( (ele) => selectedGlow('toggle', ele))

                setProgressArr([e.target])
                selectedGlow('toggle',e.target)
            }

        }

        else  // No elements in array.
        {
            setProgressArr([...progressArr, e.target])
            selectedGlow('toggle', e.target)
        }
    } 
      
    // ------------------------------------------Rendering Data-------------------------------------------//
 
    const renderedGrid = grid.map( (row, i) => {
        const renderedRow = row.map((element, j) => {
            return <div className={`col col-lg-10/12 col-md-10/12 `}> <span   i = {i}  j = {j} onClick = {handleClick} >{element.letter.toUpperCase()}</span></div>
        })
        return <div className='row mb-3   mt-3'>{renderedRow}</div>
    })

    const renderedProgress = progressArr.map( (element) => {
        return <b className='progress-text'>{element.textContent.toUpperCase()}</b> 
    })

    const renderedCompleted = completedArr.map( (word, i) => {
        return <p className='col-lg-4'>{i + 1}.  {word.toUpperCase()}  </p>
    } ) 
    
    // ------------------------------------------ return -------------------------------------------//
    return (
        <div>
            <div className='text-center container justify-content-center '> 

                <div className = 'score row justify-content-center'>
                    <b className='score-text'>{score}</b> <b  style={{'opacity': '0'}} ref={myRef}> {completedArr.length > 0 ? '+' + String( 10 + completedArr[completedArr?.length - 1]?.length) : ''}</b>
                </div>

                <div className=' row'>
                    <p className='timer fs-2'>{timer}</p>
                    {renderedCompleted}
                </div>

                <div ref={gridRef} className='mt-3   container justify-content-center gridCon   '>
                    {renderedGrid} 
                </div>     

                <div className='mt-4'>
                    {timer > 0 ? renderedProgress  :  <h1 className='text-danger'>GAME OVER</h1>    }
                </div>

                <div>
                    <h2 className='won-text'>{wordArray.length === 0 ? 'YOU WON' : '' }</h2>
                </div>
                <button className='btnClass m-2 mt-3 mb-5' disabled = {(wordArray.length === 0 && completedArr.length !== 0) || timer <= 0 ? true : false} onClick = {() => { setProgressArr([]);  progressArr.forEach( (ele) => selectedGlow('toggle', ele))} }> C L E A R </button>
                <button className='btnClass m-2 ' onClick = {() => window.location.reload() }> R E T R Y </button> 
                <button type="button" class="btnClass m-2" data-bs-toggle="modal" data-bs-target="#staticBackdrop" disabled = {(wordArray.length === 0 && completedArr.length !== 0) || timer <= 0 ? false : true}>  S T A T S  </button>
  
            </div>
            <div>
                {((wordArray.length === 0 && completedArr.length !== 0) || timer <= 0 ) && <StatisticsModal statistics={statistics} />}
            </div>
        </div>  
    )
}

export default Grid;