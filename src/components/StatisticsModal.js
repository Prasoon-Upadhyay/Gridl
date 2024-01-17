import React from 'react' 
import useGame from '../hooks/use-game';
import useWords from '../hooks/use-words';

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

import { IoStatsChart } from "react-icons/io5";
import { RxCrossCircled } from "react-icons/rx"; 

ChartJS.register(ArcElement, Tooltip, Legend);

const StatisticsModal = ( { statistics } ) => {

    const {score} = useGame();
    const {wordArray, difficulty} = useWords();

    let timeBonus;
    const difficultyBonus = difficulty >= 2 ? difficulty * 5 : 0

    const words = statistics.map( (obj) => (obj.word.charAt(0).toUpperCase() + obj.word.substring(1)) )  
    const timeTaken = statistics.map ( (obj) => obj.time) 
     
    
    // const colorArray = ['216,0,50', '233,87,147', '255,152,0']
    // const randomColor = colorArray[Math.floor(Math.random() * 3)]
    
    const themeColor = '255,152,0'
    
    const barColors = [ 
        `rgba(${themeColor},1)`,
        `rgba(${themeColor},0.875)`,
        `rgba(${themeColor},0.75)`, 
        `rgba(${themeColor},0.625)`,
        `rgba(${themeColor},0.5)`, 
        `rgba(${themeColor},0.375)`,  
        `rgba(${themeColor},0.25)`, 
        `rgba(${themeColor},0.125)`, 
    ];

    if(wordArray.length !== 0)                  //All words not guessed. New label and color for that label added to statistics.
    {  
        words.push('No Word Guessed')
        timeTaken.push(50 - timeTaken.reduce((prev, acc) => prev + acc))
        barColors[statistics.length] = 'rgba(180,120,160, 0.2)'
    }

    else{ 
        timeBonus = Math.ceil((50 - timeTaken.reduce((prev, acc) => prev + acc) ) * 0.5) - (difficulty < 3 ? Math.floor(10/(difficulty + 1)) : 0)
    }

    
    const data = { 
        labels : words,
        datasets : [{
            label : "Time taken (in seconds) "  ,
            data: timeTaken  ,
            backgroundColor: barColors,

            borderColor : [
                "#0f0f0f",
                "#0f0f0f",
                "#0f0f0f", 
                '#0f0f0f',
                "#0f0f0f",
                '#0f0f0f',
                '#0f0f0f',
                "#0f0f0f"
            ],
            borderWidth: 6
        }],


      } ;
 
    const options = {
        plugins: {
            legend: {
                labels: { 
                    font: {
                        family : 'Poppins, sans-serif'
                    }
                }
            }
        }
    }

    return ( 
    <div >  
        <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
            <div class="modal-dialog" style={{'border': `2px solid rgb(${themeColor})`}}>
                <div class="modal-content">
                    <div class="modal-header text-center ">
                        <h1 style={{'color': `rgb(${themeColor})`}} class="modal-title   fs-4" id="staticBackdropLabel">Stastistics <IoStatsChart /> </h1>
                        <button type="button" style={{'backgroundColor': `rgb(${themeColor})`, 'transition': '0.3s'}} class="btn-close" data-bs-dismiss="modal" aria-label="Close"> </button>
                    </div>
                    <div class="modal-body"  style={{'border': `0`}}  >
                        {statistics.length > 0 ? <Doughnut data={data} options={options} /> : <h2 className='text-danger mt-3 mb-3'>No Words Guessed <RxCrossCircled /></h2>}
                        <h1 style={{'color': `rgb(${themeColor})`}} >Final Score : {score + (timeBonus || 0) + difficultyBonus}</h1>
                        <p>Time Bonus : {timeBonus ? timeBonus : 0}</p>
                        <p>Difficulty Bonus : {difficultyBonus}</p>
                    </div>
                    <div class="modal-footer justify-content-center ">
                        <button onClick = {() => window.location.reload()} style={{'backgroundColor': `rgb(${themeColor})`}} type="button" class="  btnClass"  >R E T R Y</button> 
                    </div>

                </div>
            </div>
        </div>
    </div>
)
}

export default StatisticsModal;