import { connect } from '../util/db.js';

test('database connect', async () => {
	let result = await connect({});
	expect(result).toBeTruthy();
});
