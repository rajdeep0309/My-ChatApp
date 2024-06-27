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
					<Route path='/' element={<Login />} />
					<Route path='/wallpaper' element={<Wallpaper />} />
					<Route path='/chat' element={<ChatWindow />}></Route>
				</Routes>
			</BrowserRouter>
		</div>
	);
}

export default App;
