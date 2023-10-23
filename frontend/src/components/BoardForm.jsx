import { useState } from 'react'
import { setContestantsData, setGameData } from '../slices/appSlice'
import { useDispatch } from 'react-redux'

const BoardForm = () => {
    const dispatch = useDispatch()

    const [ contestant1, setContestant1] = useState({ name: '', score: 0 })
    const [ contestant2, setContestant2] = useState({ name: '', score: 0 })
    const [ contestant3, setContestant3] = useState({ name: '', score: 0 })

    const submitHandler = e => {
        e.preventDefault()
        dispatch(setContestantsData({contestant1, contestant2, contestant3}))
        dispatch(setGameData({ gameStarted: true, turnData: [] }))
    }

    return (
        <div className='col h-full bg-[#fff] md:mt-4 xl:mt-8'>
            <div className='mx-auto grow gap-4 p-8'>
                <h1>Game Setup</h1>

                <form className='col gap-4 items-start lg:justify-end lg:items-between' onSubmit={submitHandler}>
                    <div className='col gap-4 md:flex-row [&>div]:gap-2'>
                        <div className='col'>
                            <label htmlFor='contestant1'>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 1'
                                value={contestant1.name}
                                onChange={e => setContestant1({ ...contestant1, name: e.target.value })}
                            />
                        </div>
                        <div className='col'>
                            <label>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 2'
                                value={contestant2.name}
                                onChange={e => setContestant2({ ...contestant2, name: e.target.value })}
                            />
                        </div>
                        <div className='col'>
                            <label>Contestant's Name</label>
                            <input
                                className='input'
                                type='text'
                                placeholder='Contestant 3'
                                value={contestant3.name}
                                onChange={e => setContestant3({ ...contestant3, name: e.target.value })}
                            />
                        </div>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" />
                        <label>Smartphone Buzzer(Under Construction)</label>
                    </div>
                    <button className='primary-btn bg-highlight' type='submit'>Start Game</button>
                </form>
            </div>
        </div>
    )
}

export default BoardForm