import { lazy } from 'react';
import { Navigate, RouteObject } from 'react-router-dom';

const GenresPage = lazy(() => import('./pages/GenresPage').then(module => ({ default: module.GenresPage })));

export const genresRoutes: RouteObject[] = [
	{
		path: 'genres',
		children: [
			{
				path: '',
				element: <GenresPage />,
			},
			{
				path: '*',
				element: <Navigate to="" />,
			},
		],
	},
];
