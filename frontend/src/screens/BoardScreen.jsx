import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { toast } from 'react-toastify'
import { setGameData } from '../slices/appSlice'
import { ArrowsPointingOutIcon, ArrowsPointingInIcon } from '@heroicons/react/20/solid'
import Board from '../components/Board'
import BoardForm from '../components/BoardForm'

const BoardScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const { board_id } = useParams()
    const { boardData } = useSelector(state => state.data)
    const { gameData } = useSelector(state => state.app)

    const currentBoard = boardData.filter(board => board._id === board_id)[0]

    const startGame = () => {

    }

    const resetGame = () => {
        dispatch(setGameData({}))
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
        <Board board={currentBoard} />
        { gameData.gameStarted
            ? null
            : <BoardForm startGame={startGame} />
        }
        <button onClick={e => resetGame()}>Reset Data</button>
        </>
    )
}

export default BoardScreen