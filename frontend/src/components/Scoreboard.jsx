import { useSelector } from 'react-redux'

const Scoreboard = () => {
    const { contestantsData } = useSelector(state => state.app)

    return (
        <div className='col bg-white mx-8 p-4 rounded-t-xl'>
            <div className='flex gap-4 justify-around items-center text-center text-3xl xl:text-5xl 2xl:text-7xl'>
                <div className='col'>
                    <h3>{contestantsData.contestant1.name}</h3>
                    <h3>{contestantsData.contestant1.score}</h3>
                </div>
                <div className='col'>
                    <h3>{contestantsData.contestant2.name}</h3>
                    <h3>{contestantsData.contestant2.score}</h3>
                </div>
                <div className='col'>
                    <h3>{contestantsData.contestant3.name}</h3>
                    <h3>{contestantsData.contestant3.score}</h3>
                </div>
            </div>
        </div>
    )
}

export default Scoreboard