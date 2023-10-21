import { useState, useRef, useEffect } from 'react'
import { ArrowsPointingOutIcon, CheckIcon, XMarkIcon } from '@heroicons/react/20/solid'
import { useSelector, useDispatch } from 'react-redux'
import { setGameData, setContestantsData } from '../slices/appSlice'

const Board = ({ board, handle }) => {
    const dispatch = useDispatch()
    const { gameData, contestantsData } = useSelector(state => state.app)
    const [ selectedClue, setSelectedClue ] = useState({ target:'', question: '', amount: '' })
    const [ startingScore, setStartingScore ] = useState({ contestant1: '', contestant2: '', contestant3: ''})
    const turnData = useRef({ tryCount: 0, clueLocation: '', scoreChanges: {} })

    useEffect(() => {
        if (contestantsData) {
            setStartingScore({
                contestant1: contestantsData.contestant1.score,
                contestant2: contestantsData.contestant2.score,
                contestant3: contestantsData.contestant3.score
            })
        }
    }, [contestantsData])

    const populateBoard = () => {
        const prevClueLocation = gameData.turnData?.length > 0 ? gameData.turnData.map(turn => turn.clueLocation) : []

        console.log(prevClueLocation)

        return board.clues.map((clueSet, clueIndex) => {
            const categoryBtn = <button key={clueIndex} className="board-item category">{clueSet.category}</button>
            const clueBtns = board.scores.map((amount, index) => {
                const isPastClue = prevClueLocation.includes(`${clueIndex}${index}`)
                return (<button disabled={isPastClue} key={[clueIndex, index]} value={`${clueIndex}${index}`} onClick={e => clueSelected(e)} className="board-item">
                    {!isPastClue ? amount : ''}
                </button>)
            })
            return [categoryBtn, clueBtns]
        })
    }

    const endTurn = () => {
        dispatch(setGameData({...gameData, turnData: [...gameData.turnData, turnData.current] }))
        let newScoreData = {
            contestant1: {
                name: contestantsData.contestant1.name,
                score: contestantsData.contestant1.score
            },
            contestant2: {
                name: contestantsData.contestant2.name,
                score: contestantsData.contestant2.score
            },
            contestant3: {
                name: contestantsData.contestant3.name,
                score: contestantsData.contestant3.score
            }
        }
        for (const key of Object.keys(turnData.current.scoreChanges)) {
            newScoreData[key].score += turnData.current.scoreChanges[key].score
        }
        dispatch(setContestantsData(newScoreData))
        selectedClue.target.textContent = ''
        selectedClue.target.disabled = true
        setSelectedClue({ target:'', question: '', amount: '' })
        turnData.current = { tryCount: 0, clueLocation: '', scoreChanges: {} }
    }

    const clueSelected = e => {
        const [ col, row ] = e.target.value
        turnData.current.clueLocation = e.target.value
        setSelectedClue({
            target: e.target,
            question: board.clues[col].questions[row].question,
            amount: Number(e.target.textContent)
        })
    }

    
    const answerQuestion = (e, isCorrect) => {
        const btn = e.target.value
            ? e.target
            : e.target.parentNode.value
                ? e.target.parentNode
                : e.target.parentNode.parentNode
        const key = btn.value
        const newScore = (isCorrect ? 1 : -1) * Number(selectedClue.amount)
        setStartingScore(({ ...startingScore, [key]: `${Number(startingScore[key]) + newScore}` }))

        console.log(Number(startingScore[key]) + newScore)

        turnData.current.tryCount++
        turnData.current.scoreChanges[key] = {
            name: contestantsData[key].name,
            score: newScore
        }
        if (isCorrect) {
            endTurn()
        } else {
            btn.disabled = true
            btn.previousSibling.disabled = true
            if (turnData.current.tryCount === 3) endTurn()
        }
    }
    
    return (
        <div className='pt-[56.25%] relative mx-8'>
            
            { handle.active ? null :
                <button onClick={handle.active ? handle.exit : handle.enter} className='absolute top-4 right-4 opacity-10 bg-dark text-light rounded-full z-30 hover:opacity-70'>
                    <ArrowsPointingOutIcon className='p-2 h-10 w-10' />
                </button>
            }
            
            { selectedClue.question &&
                <div className='absolute inset-x-0 inset-y-0 bg-highlight col justify-center z-10'>
                    <div className='flex items-center h-full'>
                        <h1 className='font-korinna text-white text-center text-9xl text-shadow'>{selectedClue.question}</h1>
                    </div>
                    <div className='flex justify-evenly gap-4 justify-self-end'>
                        { Object.keys(contestantsData).map((key) => (
                            <div key={key} className='col w-full items-center max-w-2xl h-full'>
                                <div className='flex justify-evenly w-full'>
                                    <button value={key} className={`bg-green duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, true)}><CheckIcon className='h-20 w-20 mx-auto text-white' /></button>
                                    <button value={key} className={`bg-red duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, false)}><XMarkIcon className='h-20 w-20 mx-auto text-white' /></button>
                                </div>
                                <div className='relative bg-light w-full'>
                                    <h1 className='text-4xl  py-1 px-[1vw] my-1 text-light rounded-l-lg bg-dark opacity-75 absolute bottom-0 right-0'>{contestantsData[key].name}</h1>
                                    <h1 className='text-8xl  py-1 px-[1vw] text-dark text-left'>{startingScore[key]}</h1>
                                </div>
                            </div>
                        ))}
                        {/* <div className='col w-full items-center max-w-2xl h-full'>
                            <div className='flex justify-evenly w-full'>
                                <button value='contestant1' className={`bg-green duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, true)}><CheckIcon className='h-20 w-20 mx-auto text-white' /></button>
                                <button value='contestant1' className={`bg-red duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, false)}><XMarkIcon className='h-20 w-20 mx-auto text-white' /></button>
                            </div>
                            <div className='relative bg-light w-full'>
                                <h1 className='text-4xl  py-1 px-[1vw] my-1 text-light rounded-l-lg bg-dark opacity-75 absolute bottom-0 right-0'>{contestantsData.contestant1.name}</h1>
                                <h1 className='text-8xl  py-1 px-[1vw] text-dark text-left'>{`${turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant1.name) ? turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant1.name).score + contestantsData.contestant1.score : contestantsData.contestant1.score }`}</h1>
                            </div>
                        </div>
                        <div className='col w-full items-center max-w-2xl h-full'>
                            <div className='flex justify-evenly w-full'>
                                <button value='contestant2' className={`bg-green duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, true)}><CheckIcon className='h-20 w-20 mx-auto text-white' /></button>
                                <button value='contestant2' className={`bg-red duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, false)}><XMarkIcon className='h-20 w-20 mx-auto text-white' /></button>
                            </div>
                            <div className='relative bg-light w-full'>
                                <h1 className='text-4xl  py-1 px-[1vw] my-1 text-light rounded-l-lg bg-dark opacity-75 absolute bottom-0 right-0'>{contestantsData.contestant2.name}</h1>
                                <h1 className='text-8xl  py-1 px-[1vw] text-dark text-left'>{`${turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant2.name ) ? turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant2.name).score + contestantsData.contestant2.score : contestantsData.contestant2.score }`}</h1>
                            </div>
                        </div>
                        <div className='col w-full items-center max-w-2xl h-full'>
                            <div className='flex justify-evenly w-full'>
                                <button value='contestant3' className={`bg-green duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, true)}><CheckIcon className='h-20 w-20 mx-auto text-white' /></button>
                                <button value='contestant3' className={`bg-red duration-200 ease-out w-full hover:w-[300%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, false)}><XMarkIcon className='h-20 w-20 mx-auto text-white' /></button>
                            </div>
                            <div className='relative bg-light w-full'>
                                <h1 className='text-4xl  py-1 px-[1vw] my-1 text-light rounded-l-lg bg-dark opacity-75 absolute bottom-0 right-0'>{contestantsData.contestant3.name}</h1>
                                <h1 className='text-8xl  py-1 px-[1vw] text-dark text-left'>{`${turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant3.name ) ? turnData.current.scoreChanges.find(obj => obj.name === contestantsData.contestant3.name).score + contestantsData.contestant3.score : contestantsData.contestant3.score }`}</h1>
                            </div>
                        </div> */}
                    </div>
                </div>
            }
            <div className='grid grid-flow-col grid-row grid-rows-6 grid-cols-6 absolute top-0 w-full h-full p-2 bg-dark'>
                { populateBoard() }
            </div>
        </div>
    )
}

export default Board