import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../components/Loader';
import { toast } from 'react-toastify';
import { useGetBoardsQuery } from '../slices/boardsApiSlice.js';
import { useGetCluesQuery } from '../slices/cluesApiSlice';
import { setBoardData, setClueData } from '../slices/dataSlice';

import BoardTable from '../components/BoardTable';
import ClueTable from '../components/ClueTable';

const DashboardScreen = () => {
	const dispatch = useDispatch();
	const { boardData, clueData } = useSelector((state) => state.data);
	const {
		data: clueQuery,
		isSuccess: clueSuccess,
		isLoading: clueLoading
	} = useGetCluesQuery();

	const {
		data: boardQuery,
		isSuccess: boardSuccess,
		isLoading: boardLoading
	} = useGetBoardsQuery();
	
	useEffect(() => {
		try {
			if (boardSuccess) dispatch(setBoardData(boardQuery));
			if (clueSuccess) dispatch(setClueData(clueQuery));
		} catch (err) {
			toast.error(err?.data?.message || err.error);
		}
	}, [boardSuccess, clueSuccess]);

	const loadBoardTable = () => {
		if (boardLoading) {
			return <Loader />
		} else if (boardSuccess && boardData.length === 0) {
			return <h3>No boards, create one!</h3>
		} else if (boardSuccess) {
			return <BoardTable data={ boardData } />
		}
	}

	const loadClueTable = () => {
		if (clueLoading) {
			return <Loader />
		} else if (clueSuccess && clueData.length === 0) {
			return <h3>No clues, create one!</h3>
		} else if (clueSuccess) {
			return <ClueTable data={ clueData } />
		}
	}

	return (
		<div className='container mx-auto flex justify-center items-center'>
			<div className='col gap-4 w-10/12'>
				<h1 className='text-4xl'>Dashboard</h1>
				<div className='relative flex items-center'>
					<button className='primary-btn absolute right-0 bg-highlight'>New</button>
					<h2>Boards</h2>
				</div>
				<div className='shadow'>
					{ loadBoardTable() }
				</div>
				<div className='relative flex items-center'>
					<h2>Clues</h2>
				</div>
				<div className='shadow'>
					{ loadClueTable() }
				</div>
			</div>
		</div>
	)
}

export default DashboardScreen;