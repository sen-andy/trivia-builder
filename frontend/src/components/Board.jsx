import { useState } from 'react'

const Board = ({ board }) => {
    const [ selectedClue, setSelectedClue ] = useState('');

    const clueSelected = e => {
        if (e.target.textContent === '') return
        const [ col, row ] = e.target.value
        setSelectedClue(board.clues[col].questions[row].question)
        e.target.textContent = ''
    }

    const populateBoard = () => {
        return board.clues.map((clueSet, clueIndex) => {
            const categoryBtn = <button key={clueIndex} className="board-item category">{clueSet.category}</button>
            const clueBtns = board.scores.map((score, index) => <button key={[clueIndex, index]} value={`${clueIndex}${index}`} onClick={e => clueSelected(e)} className="board-item">{score}</button>);
            return [categoryBtn, clueBtns]
        });
    }
    
    return (
        <div className='pt-[56.25%] relative'>
            { selectedClue &&
                <div className='absolute inset-x-0 inset-y-0 bg-highlight col justify-center z-10'>
                    <h1 className='font-korinna text-white text-center text-9xl text-shadow'>{selectedClue}</h1>
                    <button onClick={e => setSelectedClue('')}>Answered</button>
                </div>
            }
            <div className='grid grid-flow-col grid-row grid-rows-6 grid-cols-6 absolute top-0 w-full h-full p-2 bg-dark'>
                { populateBoard() }
            </div>
        </div>
    )
}

export default Board