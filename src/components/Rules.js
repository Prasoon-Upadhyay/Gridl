import React, { useState } from 'react'
import RuleCard from './RuleCard'
import { IoMdArrowDown } from "react-icons/io";
import { FaLongArrowAltRight } from "react-icons/fa";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";

const Rules = () => {
    

    const [isOpen, setIsOpen] = useState(false)

    const handleClick=  () => {
        setIsOpen(!isOpen)
    }

    return (
        <div>  
                <a onClick = {handleClick} class="linkClass " data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                    Rules {isOpen ? <IoMdArrowDropup />  :  <IoMdArrowDropdown /> }
                </a> 
            <div class="collapse container" id="collapseExample">   
                <div className='row justify-content-center '>
                    <div className='col-lg-4'>
                        <RuleCard num = {1} title = 'How to Play?' > <li> In Gridl, you can only move Down (<IoMdArrowDown />), Left-to-Right (<FaLongArrowAltRight />), when a letter is selected it will have a glow like  <span className='selected'>A</span> , when a word is correct it will be glow like  <span className='finished'>Z</span> . Finish the game within 40 seconds to win. </li> <li>Only some selected words are correct, not all words of the English language will grant you points.</li></RuleCard>
                    </div>
                    <div className='col-lg-4'>
                        <RuleCard num = {2} title = "Score Compuation"> The scores depend on the size of your word, the difficulty level selected and the time taken to solve the grid. <li    style={{'fontFamily': 'monospace' }}> Time Bonus = Time Left / 2 - Offset   </li> (if Difficulty is lower than Medium. ) <li>Difficulty Bonus is granted if Difficulty is higher than Easy. </li>  </RuleCard>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Rules