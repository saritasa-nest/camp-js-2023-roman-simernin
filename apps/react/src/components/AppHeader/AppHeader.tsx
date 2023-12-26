import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { logout } from '@js-camp/react/store/auth/dispatchers';
import { memo } from 'react';
import { Button } from '@mui/material';
import { selectAuth } from '@js-camp/react/store/auth/selectors';
import clsx from 'clsx';

import styles from './AppHeader.module.css';

/** App header component. */
const AppHeaderComponent = () => {
	const dispatch = useAppDispatch();
	const { isAuthenticated } = useAppSelector(selectAuth);

	/** Handle logout. */
	const handleLogout = () => {
		dispatch(logout());
	};

	return (
		<header className={clsx(
			styles.appHeader,
			!isAuthenticated && styles.appHeader_notAuthenticated,
		)}>
			<Button
				type="button"
				onClick={handleLogout}>
					Logout
			</Button>
		</header>
	);
};

const AppHeader = memo(AppHeaderComponent);
AppHeader.displayName = 'camp-app-header';
export { AppHeader };
