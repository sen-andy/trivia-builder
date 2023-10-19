import { useEffect } from 'react';
import Hero from '../components/Hero';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const HomeScreen = () => {
	const navigate = useNavigate();

	const { userInfo } = useSelector((state) => state.auth);
	useEffect(() => {
		if (userInfo) navigate('/dashboard');
	}, [navigate]);

	return (
		<main>
			<Hero />
		</main>
	)
}

export default HomeScreen;