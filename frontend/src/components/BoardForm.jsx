import { useState } from 'react'
import { setGameData } from '../slices/appSlice'
import { useDispatch } from 'react-redux'

const BoardForm = ({ startGame }) => {
    const dispatch = useDispatch()

    const [ contestant1, setContestant1 ] = useState('')
    const [ contestant2, setContestant2 ] = useState('')
    const [ contestant3, setContestant3 ] = useState('')

    const submitHandler = e => {
        e.preventDefault()
        dispatch(setGameData({contestant1, contestant2, contestant3, gameStarted: true}))
    }

    return (
        <div className='container mx-auto'>
            <div className='p-8 bg-white col gap-4 w-full'>
                <h1>Game Setup</h1>

                <form className='col gap-4 items-start lg:flex-row lg:items-end lg:justify-between' onSubmit={submitHandler}>
                    <div className='col gap-4 md:flex-row [&>div]:gap-2'>
                        <div className='col'>
                            <label htmlFor='contestant1'>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 1'
                                value={contestant1}
                                onChange={e => setContestant1(e.target.value)}
                            />
                        </div>
                        <div className='col'>
                            <label htmlFor='contestant2'>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 2'
                                value={contestant2}
                                onChange={e => setContestant2(e.target.value)}
                            />
                        </div>
                        <div className='col'>
                            <label htmlFor='contestant3'>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 3'
                                value={contestant3}
                                onChange={e => setContestant3(e.target.value)}
                            />
                        </div>
                    </div>
                    <button className='primary-btn bg-highlight' type='submit'>Start Game</button>
                </form>
            </div>
        </div>
    )
}

export default BoardForm