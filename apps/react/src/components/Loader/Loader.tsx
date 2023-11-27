import { CircularProgress } from '@mui/material';
import { PropsWithChildren, memo } from 'react';

import styles from './Loader.module.css';

/** Loader props. */
type LoaderProps = PropsWithChildren<{

	/** Is loading. */
	readonly isLoading: boolean;
}>;

/** Loader component. */
const LoaderComponent = ({ isLoading, children }: LoaderProps) => {

	if (!isLoading) {
		return (
			<>
				{children}
			</>
		);
	}

	return (
		<div className={styles.loaderContainer}>
			<CircularProgress />
		</div>
	);
};

export const Loader = memo(LoaderComponent);
