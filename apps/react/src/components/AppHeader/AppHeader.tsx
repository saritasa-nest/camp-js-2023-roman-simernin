import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { logout } from '@js-camp/react/store/auth/dispatchers';
import { FC, memo } from 'react';
import { Button } from '@mui/material';
import { selectIsAuthenticated } from '@js-camp/react/store/auth/selectors';

import styles from './AppHeader.module.css';

/** App header component. */
const AppHeaderComponent: FC = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	/** Handle logout. */
	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header
			hidden={!isAuthenticated}
			className={`${
				styles['app-header']} 
				${!isAuthenticated && styles['app-header_not-authenticated']}`
			}>
			<Button
				type="button"
				onClick={handleLogout}>Logout</Button>
		</header>
	);
};

export const AppHeader = memo(AppHeaderComponent);
