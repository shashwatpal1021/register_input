import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RegisterPage from './RegisterPage';
import ViewPage from './ViewPage';
import Home from './Home';

const App = () => {
	return (
		<Router>
			<Routes>
				<Route
					path='/'
					element={<Home />}
				/>
				<Route
					path='/register'
					element={<RegisterPage />}
				/>
				<Route
					path='/view'
					element={<ViewPage />}
				/>
			</Routes>
		</Router>
	);
};

export default App;
