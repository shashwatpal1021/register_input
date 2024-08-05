// src/ViewPage.jsx
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

let a = 5
const ViewPage = () => {
	const [pairs, setPairs] = useState([]);
	const [currentIndex, setCurrentIndex] = useState(0);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('http://localhost:3000/api/pairs');
				setPairs(response.data);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};
		fetchData();
	}, []);

	const handleNext = () => {
		if (currentIndex < pairs.length - 1) {
			setCurrentIndex(currentIndex + 1);
		}
	};

	const handleBack = () => {
		if (currentIndex > 0) {
			setCurrentIndex(currentIndex - 1); 
			
		}
	};

	return (
		<div className='min-h-screen bg-gray-900 flex flex-row items-center justify-center py-8 w-full'>
			<div className='w-1/2 mx-auto p-6 border border-gray-300 rounded-lg bg-white'>
				{pairs.length > 0 ? (
					<div className='flex flex-col items-center space-y-4'>
						<div className='flex items-start p-8 rounded-lg w-full justify-between'>
							<p className='text-lg font-medium mb-2'>
								{pairs[currentIndex].name}
							</p>
							<p className='text-lg font-medium'>{pairs[currentIndex].value}</p>
						</div>
						<div className='flex w-full justify-around mt-4'>
							<button
								onClick={handleBack}
								className={`p-3 rounded-lg transition ${currentIndex === 0
									? 'bg-gray-400 text-gray-700'
									: 'bg-blue-600 text-white'
									}`}
								disabled={currentIndex === 0}>
								Back
							</button>
							<button
								onClick={handleNext}
								className={`p-3 rounded-lg transition ${currentIndex === pairs.length - 1
									? 'bg-gray-400 text-gray-700'
									: 'bg-blue-600 text-white'
									}`}
								disabled={currentIndex === pairs.length - 1}>
								Next
							</button>
						</div>
					</div>
				) : (
					<p className='text-gray-600 text-center'>No data available</p>
				)}
				<Link
					to='/'
					className='bg-red-600 text-white p-3 rounded-lg mt-4 block text-center'>
					Close
				</Link>
			</div>
		</div>
	);
};

export default ViewPage;
