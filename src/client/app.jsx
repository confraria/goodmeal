import { h, Fragment } from 'preact';
import { Router, route } from 'preact-router';
import { Login } from './login.jsx';
import { Register } from './register.jsx';
import { handleRoute, useUserHook, useReadyHook } from './data.js';
import { RestaurantDetail } from './restaurant/restaurant-detail.jsx';
import { Header } from './header.jsx';
import { UserList } from './user/user-list.jsx';
import { UserDetail } from './user/user-detail.jsx';
import { ReviewEditor } from './review/review-editor.jsx';
import { RestaurantEditor } from './restaurant/restaurant-editor.jsx';
import { Home } from './home.jsx';

export function App() {
	const { user, isAdmin, isOwner } = useUserHook();
	const { ready } = useReadyHook();
	const doRoute = (path) => () => {
		route(path);
	};

	const router = (
		<Router onChange={handleRoute}>
			<Login path="login" onLogin={doRoute('/')} />
			<Register path="register" onRegister={doRoute('/login')} />
			<Home path="/" />
			{isOwner && <RestaurantEditor path="restaurant/new" />}
			<RestaurantDetail path="restaurant/:id" />
			<ReviewEditor path="review/:restaurant/new" />
			{isAdmin && <ReviewEditor path="review/:id/edit" />}
			{isAdmin && <UserList path="users" />}
			{isAdmin && <UserDetail path="user/new" onSave={doRoute('/users')} />}
			{isAdmin && <UserDetail path="user/:id" onSave={doRoute('/users')} />}
		</Router>
	);
	return (
		<Fragment>
			{ready && user && <Header />}
			{ready && router}
		</Fragment>
	);
}

export const app = <App />;
