import React from 'react';
import {createRoot} from 'react-dom/client';
import {Provider} from 'react-redux';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';
import {store} from './app/store';
import {ConfigProvider, theme} from 'antd';
import {Paths} from './paths';
import reportWebVitals from './reportWebVitals';
import {Login} from './pages/login';
import {Register} from './pages/register';
import {Home} from './pages/home';
import {Auth} from './features/auth/auth';
import './index.css';

const router = createBrowserRouter([
	{
		path: Paths.home,
		element: <Home/>
	},
	{
		path: Paths.login,
		element: <Login/>
	},
	{
		path: Paths.register,
		element: <Register/>
	}
]);

const container = document.getElementById('root')!;
const root = createRoot(container);

root.render(
	<React.StrictMode>
		<Provider store={store}>
			<ConfigProvider theme={{
				algorithm: theme.darkAlgorithm
			}}>
				<Auth>
					<RouterProvider router={router}/>
				</Auth>
			</ConfigProvider>
		</Provider>
	</React.StrictMode>
);

reportWebVitals();
