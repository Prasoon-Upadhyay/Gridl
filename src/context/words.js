import { createContext, useState } from "react";
import {generate} from 'random-words';

const WordsContext = createContext();

function WordsProvider( { children })
{
        
    const [grid, setGrid] = useState([]);
    const [wordArray, setWordArray] = useState([])
    const [difficulty, setDifficulty] = useState(5) 
    const [err, setError] = useState('')

    const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
    const orientations = ['horizontal', 'vertical'] 
    let orientation; 


    const getWords = (n) => {
        return generate({exactly: n-2, minLength : 3, maxLength: (n-2)})
    }

    const getRandomNum = (n) => {
        return Math.floor(Math.random() * n)
    }
    
    const getRandomAlpha = () => {
        return alphabet[Math.floor(Math.random() * 26)]
    }

    const buildMatrix = (n) => {
         
        const arr = Array(n)
        const words = getWords(n)
 
        for(let i = 0; i < n; i++ )
        {
            const row = Array(n).fill(0)
            
            for(let j = 0 ; j < n; j++)
            {
                row[j] = {
                    letter: getRandomAlpha(),
                    isFlagged: false
                }
            }

            arr[i] = row
        }

         
        words.forEach( (word) => {
            
            setMatrix(word, arr, n)
        })
         
        setGrid(arr)
        setWordArray(words)
    }
 
    
    const checkIndicesDown = (i,j, word, arr) => {
        for(let p = 0; p < word.length; p++ )
        {
            if(arr[i + p][j].isFlagged === true){
                return false;
            }
        }
        
        return true;
    }

    const checkIndicesRight = (i, j, word, arr) =>
    {
        for(let q = 0; q < word.length; q++)
        {
            if(arr[i][j + q].isFlagged === true)
            {
                return false;
            }
        }
        return true;
    }
 
    const getRandomIndices = (arr, n) => { 
        let i = getRandomNum(n);
        let j = getRandomNum(n);  
        
        while(arr[i][j].isFlagged === true)
        {
            i = getRandomNum(n);
            j = getRandomNum(n);  
        }
        
        return [i, j]
        
    }
    
    const setMatrix = (word, arr, n) => {   
        let ctr = 0
        let i,j;
        let validIndex = false; 
        orientation = orientations[Math.floor(Math.random() * 2)] 
        try
        {
            while(!validIndex)
            {  
                ctr++ 
                if(ctr > 10000)
                {   
                    throw new Error('There was a problem with generating your grid')
                }
                
                [i,j] = getRandomIndices(arr, n);    

                switch(orientation)
                {
                    case 'vertical':    while(arr.length - i < word.length )
                                        {   
                                            [i,j] = getRandomIndices(arr, n)
                                        }
                                        validIndex = checkIndicesDown(i, j, word, arr)
                                        break
                
                    case 'horizontal':  while(arr.length - j < word.length )
                                        { 
                                            [i,j] = getRandomIndices(arr, n)
                                        }
                                        validIndex = checkIndicesRight(i, j, word, arr)   
                                        break 
                    default:break;
                } 
            }  
            switch(orientation)
            {
                case 'vertical':    for(let k = 0; k < word.length ; k++)
                                    {
                                        arr[k + i][j].isFlagged = true
                                        arr[k + i][j].letter = word.charAt(k) 
                                    }
                                    break;

                case 'horizontal':  for(let k = 0; k < word.length ; k++)
                                    {
                                        arr[i][j + k].isFlagged = true
                                        arr[i][j + k].letter = word.charAt(k) 
                                    }
                                    break; 
                default:break
            }
        }    

        catch(e)
        { 
            setError(e.message)
        }
        
    }  
    return <WordsContext.Provider value={{wordArray, buildMatrix, setDifficulty, difficulty, grid, setWordArray, err}}>
        {children}
    </WordsContext.Provider>
 
}

export {WordsContext};
export default WordsProvider;