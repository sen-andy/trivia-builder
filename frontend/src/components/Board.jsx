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

        return board.clues.map((clueSet, clueIndex) => {
            const categoryBtn = <button disabled={true} key={clueIndex} className="board-item category">{clueSet.category}</button>
            const clueBtns = board.scores.map((amount, index) => {
                const isPastClue = prevClueLocation.includes(`${clueIndex}${index}`)
                return (<button disabled={isPastClue} key={[clueIndex, index]} value={`${clueIndex}${index}`} onClick={e => clueSelected(e)} className="board-item">
                    {!isPastClue ? `$${amount}` : ''}
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
            amount: Number(e.target.textContent.slice(1))
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
        <div className={`aspect-video relative landscape:h-full ${handle.active ? 'mx-auto portrait:w-full' : '-mt-6 md:mx-4 md:-mt-4 xl:mx-8 xl:-mt-0' }`}>
            
            { handle.active ? null :
                <button onClick={handle.active ? handle.exit : handle.enter} className='absolute top-4 right-4 opacity-10 bg-dark text-light rounded-full z-30 hover:opacity-70'>
                    <ArrowsPointingOutIcon className='p-2 h-10 w-10' />
                </button>
            }
            
            { selectedClue.question ?
                <div className={`absolute bg-highlight h-full col justify-center z-10`}>
                    <div className='flex items-center h-full p-2 lg:p-4'>
                        <h1 className='font-korinna text-white text-center md:text-5xl lg:text-7xl xl:text-9xl text-shadow'>{selectedClue.question}</h1>
                    </div>
                    <div className='flex justify-evenly justify-self-end gap-1 mx-1 lg:gap-2 lg:mx-2 2xl:gap-4 2xl:mx-4'>
                        { Object.keys(contestantsData).map((key) => (
                            <div key={key} className='col w-full items-center max-w-2xl rounded overflow-hidden'>
                                <div className='flex justify-evenly w-full'>
                                    <button value={key} className={`bg-green duration-200 ease-out w-full hover:w-[150%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, true)}><CheckIcon className='h-5 w-5 mx-auto text-white lg:h-20 lg:w-20' /></button>
                                    <button value={key} className={`bg-red duration-200 ease-out w-full hover:w-[150%] disabled:bg-gray disabled:pointer-events-none`} onClick={e => answerQuestion(e, false)}><XMarkIcon className='h-5 w-5 mx-auto text-white lg:h-20 lg:w-20' /></button>
                                </div>
                                <div className='relative bg-light w-full'>
                                    <h1 className='text-lg py-1 px-[1vw] my-0.5 text-light rounded-l-lg bg-dark opacity-75 absolute bottom-0 right-0 md:text-xl lg:text-2xl xl:text-4xl'>{contestantsData[key].name}</h1>
                                    <h1 className='text-2xl py-1 px-[1vw] text-dark text-left md:text-4xl lg:text-6xl xl:text-8xl'>{startingScore[key]}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                :
                <div className='absolute bottom-0 left-0 right-0 col justify-center z-20 opacity-20 pointer-events-none'>
                    <div className='flex justify-evenly justify-self-end gap-1 mx-1 lg:gap-2 lg:mx-2 2xl:gap-4 2xl:mx-4'>
                        { Object.keys(contestantsData).map((key) => (
                            <div key={key} className='col w-full items-center max-w-2xl rounded overflow-hidden'>
                                <div className='relative bg-light w-full'>
                                    <h1 className='name'>{contestantsData[key].name}</h1>
                                    <h1 className='score'>{startingScore[key]}</h1>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            }
            <div className='grid grid-flow-col grid-row grid-rows-6 grid-cols-6 absolute top-0 w-full h-full p-0.5 lg:p-2 bg-dark'>
                { populateBoard() }
            </div>
        </div>
    )
}

export default Board