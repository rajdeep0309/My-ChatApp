import React from 'react';
import ChatWindow from './components/ChatWindow';
import Signup from './components/signup/SignupPage';
import Login from './components/signup/LoginPage';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Wallpaper from './components/Wallpaper';

function App() {
	return (
		<div className='App'>
			<BrowserRouter>
				<Routes>
					<Route path='/signup' element={<Signup />} />
					<Route path='/login' element={<Login />} />
					<Route path='/wallpaper' element={<Wallpaper />} />
					<Route path='/' element={<ChatWindow />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
