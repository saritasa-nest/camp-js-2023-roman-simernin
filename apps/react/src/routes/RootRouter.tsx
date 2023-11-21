import { FC } from 'react';
import { Navigate, RouteObject, useRoutes } from 'react-router-dom';

import { genresRoutes } from '../features/genres/routes';
import { authRoutes } from '../features/auth/routes';

import { AuthGuard } from './guards/AuthGuard';
import { NotAuthGuard } from './guards/NotAuthGuard';

const routes: RouteObject[] = [
	{
		path: '*',
		element: <Navigate to="genres" />,
	},
	{
		element: <AuthGuard/>,
		children: [...genresRoutes],
	},
	{
		element: <NotAuthGuard/>,
		children: [...authRoutes],
	},
];

/** Root router component. */
export const RootRouter: FC = () => useRoutes(routes);
