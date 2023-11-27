import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { logout } from '@js-camp/react/store/auth/dispatchers';
import { memo } from 'react';
import { Button } from '@mui/material';
import { selectIsAuthenticated } from '@js-camp/react/store/auth/selectors';
import clsx from 'clsx';

import styles from './AppHeader.module.css';

/** App header component. */
const AppHeaderComponent = () => {
	const dispatch = useAppDispatch();
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	/** Handle logout. */
	const handleLogout = () => {
		dispatch(logout());
	};

	const headerStyles = clsx(
		styles.appHeader, 
		!isAuthenticated && styles.appHeader_notAuthenticated);

	return (
		<header
			className={headerStyles}>
			<Button
				type="button"
				onClick={handleLogout}>Logout</Button>
		</header>
	);
};

AppHeaderComponent.displayName = 'camp-app-header';

export const AppHeader = memo(AppHeaderComponent);
