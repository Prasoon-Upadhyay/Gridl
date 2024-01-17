import { useContext } from "react";
import { WordsContext } from "../context/words";

function useWords(){

    return useContext(WordsContext)

}

export default useWords;