import { h } from 'preact';
import { useRef } from 'preact/hooks';
import { create } from './data.js';
import { route } from 'preact-router';

export function RestaurantEditor({ restaurant, onCreate }) {
	const nameRef = useRef();

	const handleSubmit = async (e) => {
		e.preventDefault();
		const name = nameRef.current.value;
		await create({ name });
		route('/');
	};

	return (
		<div className="container max-w-screen-lg mx-auto">
			<form onSubmit={handleSubmit} className="mt-10">
				<div className="mb-5">
					<label className="label" for="name">
						Name
					</label>
					<input className="field" ref={nameRef} id="name" />
				</div>
				<div className="mb-5">
					<button className="button">Save</button>
				</div>
			</form>
		</div>
	);
}
