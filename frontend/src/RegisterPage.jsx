import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const RegisterPage = () => {
	const [pairs, setPairs] = useState([{ name: '', value: '' }]);
	const [statusMessage, setStatusMessage] = useState('');

	const handleInputChange = (index, event) => {
		const values = [...pairs];
		values[index][event.target.name] = event.target.value;
		setPairs(values);
	};

	const handleAddPair = () => {
		setPairs([...pairs, { name: '', value: '' }]);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			const response = await axios.post(
				'http://localhost:3000/api/pairs',
				pairs
			);
			setStatusMessage('Registered successfully!');
			setTimeout(() => {
				setStatusMessage("")
			}, 2000)
			// console.log('Submitted pairs:', response.data);
		} catch (error) {
			console.error('Error submitting pairs:', error);
			setStatusMessage('Failed to register pairs. Please try again.');
		}
	};
	return (
		<div className='min-h-screen bg-gray-900 flex flex-col items-center justify-center'>
			<div className='w-1/2 mx-auto p-6 border border-gray-300 rounded-md bg-white '>
				<h1 className='text-2xl font-bold mb-6 text-gray-700'>Register</h1>
				<form
					onSubmit={handleSubmit}
					className='space-y-4 '>
					{pairs.map((pair, index) => (
						<div
							key={index}
							className='flex  space-x-4  justify-between'>
							<input
								type='text'
								name='name'
								required
								value={pair.name}
								onChange={(event) => handleInputChange(index, event)}
								placeholder='Name'
								className='p-3 w-full border rounded-lg '
							/>
							<input
								type='text'
								name='value'
								value={pair.value}
								onChange={(event) => handleInputChange(index, event)}
								required
								placeholder='Value'
								className='p-3 w-full border  rounded-lg '
							/>
						</div>
					))}
					<div className='flex space-x-4'>
						<button
							type='button'
							onClick={handleAddPair}
							className='w-full bg-blue-600 text-white p-3 rounded-lg'>
							Add Another Pair
						</button>
						<button
							type='submit'
							className='w-full bg-green-600 text-white p-3 rounded-lg'>
							Submit
						</button>
					</div>
				</form>
				<Link
					to='/'
					className='bg-red-600 text-white p-3 rounded-lg mt-4 block text-center'>
					Close
				</Link>
				{statusMessage && (
					<div
						className={`mt-4 p-3 rounded-lg ${statusMessage.includes('successfully')
							? 'bg-green-100 text-green-700'
							: 'bg-red-100 text-red-700'
							}`}>
						{statusMessage}
					</div>
				)}
			</div>
		</div>

	);
};

export default RegisterPage;
