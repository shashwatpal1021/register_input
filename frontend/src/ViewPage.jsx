import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ViewPage = () => {
	const [pairs, setPairs] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [edit, setEdit] = useState(false);
	const [name, setName] = useState('');
	const [value, setValue] = useState('');
	const limit = 1; // Number of items per page

	const fetchPairs = async (page) => {
		try {
			const response = await axios.get(`http://localhost:3000/api/pairs?page=${page}&limit=${limit}`);
			setPairs(response.data.data);
			setTotalPages(Math.ceil(response.data.total / limit));
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	};

	useEffect(() => {
		fetchPairs(currentPage);
	}, [currentPage]);

	useEffect(() => {
		if (pairs.length > 0) {
			setName(pairs[0].name);
			setValue(pairs[0].value);
		}
	}, [pairs]);

	const handleNext = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const handleBack = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	const handleEdit = async (id) => {
		try {
			const response = await axios.put(
				`http://localhost:3000/api/pairs/${id}`,
				{ name, value }
			);
			setEdit(false);
			setPairs(response.data);
			console.log('Updated pair:', response.data);
		} catch (error) {
			console.error('Error updating pair:', error);
		}
	};

	const handleDelete = async (id) => {
		try {
			console.log("fronre", id)
			const response = await axios.delete(
				`http://localhost:3000/api/pairs/${id}`,
			);
			console.log("wnewkebwn", response.data)
			setPairs(response.data);
			setEdit(false);
			// console.log('Updated pair:', response.data);
		} catch (error) {
			console.error('Error updating pair:', error);
		}
		setEdit(false);
	};


	return (
		<div className="min-h-screen bg-gray-900 flex flex-row items-center justify-center py-8 w-full">
			<div className="w-1/2 mx-auto p-6 border border-gray-300 rounded-lg bg-white">
				{pairs.length > 0 ? (
					<div className="flex flex-col items-center space-y-4">
						{edit ? (
							<div className="flex w-full justify-between p-8 rounded-lg">
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
									className="text-lg font-medium mb-2 p-2 border border-gray-300 rounded"
								/>
								<input
									type="text"
									value={value}
									onChange={(e) => setValue(e.target.value)}
									className="text-lg font-medium mb-2 p-2 border border-gray-300 rounded"
								/>
								<button
									onClick={() => handleEdit(pairs[0].id)}
									className="bg-blue-600 text-white p-3 rounded-lg"
								>
									Save
								</button>
							</div>
						) : (
							<div className="flex w-full justify-between p-8 rounded-lg">
								<p className="text-lg font-medium mb-2">{pairs[0].name}</p>
								<p className="text-lg font-medium">{pairs[0].value}</p>
								<div className="space-x-4">
									<button
										onClick={() => setEdit(true)}
										className="bg-green-600 text-white p-3 rounded-lg"
									>
										Edit
									</button>
									<button
										onClick={() => handleDelete(pairs[0].id)}
										className="bg-red-600 text-white p-3 rounded-lg"
									>{}
										Delete
									</button>

								</div>
							</div>
						)}
						<div className="flex w-full justify-around mt-4">
							<button
								onClick={handleBack}
								className={`p-3 rounded-lg transition ${currentPage === 1 ? 'bg-gray-400 text-gray-700' : 'bg-blue-600 text-white'
									}`}
								disabled={currentPage === 1}
							>
								Back
							</button>
							<button
								onClick={handleNext}
								className={`p-3 rounded-lg transition ${currentPage === totalPages ? 'bg-gray-400 text-gray-700' : 'bg-blue-600 text-white'
									}`}
								disabled={currentPage === totalPages}
							>
								Next
							</button>
						</div>
					</div>
				) : (
					<p className="text-gray-600 text-center">No data available</p>
				)}
				<Link to="/" className="bg-red-600 text-white p-3 rounded-lg mt-4 block text-center">
					Close
				</Link>
			</div>
		</div>
	);
};

export default ViewPage;
