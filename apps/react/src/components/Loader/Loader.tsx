import { CircularProgress } from '@mui/material';
import { FC, PropsWithChildren, memo } from 'react';

import styles from './Loader.module.css';

/** Loader props. */
type LoaderProps = PropsWithChildren<{

	/** Is loading. */
	readonly isLoading: boolean;
}>;

/** Loader component. */
const LoaderComponent: FC<LoaderProps> = ({ isLoading, children }) => {

	if (!isLoading) {
		return (
			<>
				{children}
			</>
		);
	}

	return (
		<div className={styles['loader-container']}>
			<CircularProgress />
		</div>
	);
};

export const Loader = memo(LoaderComponent);
