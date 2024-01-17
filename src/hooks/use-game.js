import { useContext } from "react";
import { GameContext } from "../context/game";

function useGame()
{
    return useContext(GameContext);
}

export default useGame;