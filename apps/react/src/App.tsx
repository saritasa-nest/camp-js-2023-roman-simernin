import { FC, Suspense } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import { RootRouter } from './routes/RootRouter';
import { store } from './store';
import { AppHeader } from './components/AppHeader/AppHeader';
import { Loader } from './components/Loader/Loader';

export const App: FC = () => (
	<Provider store={store}>
		<BrowserRouter>
			<div>
				<Suspense fallback={<Loader isLoading={true}/>}>
					<AppHeader/>
					<RootRouter />
				</Suspense>
			</div>
		</BrowserRouter>
	</Provider>
);
