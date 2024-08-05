import { Link } from 'react-router-dom';
const Home = () => {
	return (
		<div className='min-h-screen bg-gray-900 flex flex-row items-center justify-center py-8'>
			<div className='p-6 rounded-lg'>
				<div className='space-x-4'>
					<Link
						to='/register'
						className='bg-blue-600 text-white px-6 py-3 rounded-lg '>
						Register
					</Link>
					<Link
						to='/view'
						className='bg-green-600 text-white px-6 py-3 rounded-lg'>
						View
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Home;
