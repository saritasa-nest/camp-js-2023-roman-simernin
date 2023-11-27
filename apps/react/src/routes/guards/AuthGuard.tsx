import { useAppSelector } from '@js-camp/react/store';
import { selectAuth } from '@js-camp/react/store/auth/selectors';
import { FC } from 'react';
import { Navigate, Outlet } from 'react-router';

/** Guard protects against unauthenticated users. */
export const AuthGuard: FC = () => {
	const { isAuthenticated } = useAppSelector(selectAuth);

	if (!isAuthenticated) {
		return <Navigate to='auth' replace />;
	}

	return <Outlet/>;
};
