import { useAppSelector } from '@js-camp/react/store';
import { selectAuth } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

/** Guard requires that the user is not authenticated. */
export const NotAuthGuard: FC = () => {
	const { isAuthenticated } = useAppSelector(selectAuth);

	if (isAuthenticated) {
		return <Navigate to='' replace />;
	}

	return <Outlet/>;
};
