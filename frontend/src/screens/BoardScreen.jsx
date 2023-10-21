import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setGameData, setContestantsData } from '../slices/appSlice'
import Board from '../components/Board'
import BoardForm from '../components/BoardForm'
import Scoreboard from '../components/Scoreboard'
import { FullScreen, useFullScreenHandle } from "react-full-screen";

const BoardScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const handle = useFullScreenHandle()
    const { board_id } = useParams()
    const { boardData } = useSelector(state => state.data)
    const { gameData } = useSelector(state => state.app)

    const currentBoard = boardData.filter(board => board._id === board_id)[0]

    const resetGame = () => {
        dispatch(setGameData({ gameStarted: false, turnData: [] }))
        dispatch(setContestantsData({
            contestant1: { name: 'contestant 1', score: 0 },
            contestant2: { name: 'contestant 2', score: 0 },
            contestant3: { name: 'contestant 3', score: 0 },
        }))
    }

    useEffect(() => {
        if (!currentBoard) {
            toast.error('Board does not exist')
            navigate('/dashboard')
            return
        }
    },[])

    return (
        <>
        <FullScreen handle={handle}>
            <Board board={currentBoard} handle={handle} />
        </FullScreen>
        { !gameData?.gameStarted && <BoardForm /> }
        <button onClick={e => resetGame()}>Reset Data</button>
        </>
    )
}

export default BoardScreen