import React from 'react'
import ReactDOM from 'react-dom/client'
import App from "./App"
import WordsProvider from './context/words'
import GameProvider from './context/game'

import './index.css'

const el = document.getElementById("root")
const root = ReactDOM.createRoot(el)
root.render( <WordsProvider>
                <GameProvider>
                    <App />
                </GameProvider>
            </WordsProvider>)
