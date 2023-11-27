import { memo, useEffect, FC } from 'react';
import { fetchGenres } from '@js-camp/react/store/genre/dispatchers';
import { selectGenres, selectAreGenresLoading } from '@js-camp/react/store/genre/selectors';
import { useAppDispatch, useAppSelector } from '@js-camp/react/store';
import { Loader } from '@js-camp/react/components/Loader/Loader';

import { GenreCard } from '../../components/GenreCard';

/** Genres page component. */
const GenresPageComponent: FC = () => {
	const dispatch = useAppDispatch();
	const genres = useAppSelector(selectGenres);
	const isLoading = useAppSelector(selectAreGenresLoading);

	useEffect(() => {
		dispatch(fetchGenres());
	}, [dispatch]);

	return (
		<Loader isLoading={isLoading}>
			<h1>Genres</h1>
			{genres.map(genre => <GenreCard key={genre.id} genre={genre} />)}
		</Loader>
	);
};

export const GenresPage = memo(GenresPageComponent);
