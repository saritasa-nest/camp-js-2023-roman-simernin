import { CircularProgress } from '@mui/material';
import { Fragment, PropsWithChildren, memo } from 'react';

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
			<Fragment>
				{children}
			</Fragment>
		);
	}

	return (
		<div className={styles.loaderContainer}>
			<CircularProgress />
		</div>
	);
};

const Loader = memo(LoaderComponent);
Loader.displayName = 'camp-loader';
export { Loader };
