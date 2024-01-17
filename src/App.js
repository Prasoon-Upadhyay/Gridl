 
import useWords from './hooks/use-words' 
import Grid from './components/Grid'; 
import Error from './components/Error';
import useGame from './hooks/use-game';
import HomePage from './components/HomePage';

const App = () => {
  
    const {isStart, gameStart} = useGame();
    const { err } = useWords(); 
 
    const handleClick = () => {
        gameStart();
    }

    const renderedElement = isStart ? ( err ? <Error>{err}</Error> :  <Grid />) :  <button className='btnClass mt-5' onClick={handleClick}>S T A R T </button>
   
    return (
        <div className='text-center'> 
            <div className='topDiv '>
                {!isStart &&<HomePage/>}
                {renderedElement} 
            </div>
        </div>
    )
}

export default App