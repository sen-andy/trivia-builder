import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import Board from '../components/Board'

const BoardScreen = () => {
    const navigate = useNavigate();
    const { board_id } = useParams();
    const { boardData } = useSelector(state => state.data);

    const currentBoard = boardData.filter(board => board._id === board_id)[0];

    useEffect(() => {
        if (!currentBoard) {
            toast.error('Board does not exist');
            navigate('/dashboard');
            return;
        }
    },[])

    return (
        <Board board={currentBoard} />
    )
}

export default BoardScreen