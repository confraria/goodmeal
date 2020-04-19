export const deleteModel = (model) => async (req, res) => {
	const deleted = await model.findByIdAndDelete(req.params.id).exec();
	if (!deleted) {
		res.status(404).send({ message: 'Resource not found' });
		return;
	}
	return { ok: true };
};

export const listModel = (model, select) => async () => {
	return await model.find().select(select).exec();
};

export const getModel = (model, select) => async (req, res) => {
	const result = await model.findById(req.params.id).select(select).lean().exec();
	if (result) {
		return result;
	}
	return res.status(404).send({ message: 'resource doenst exists' });
};

export const updateModel = (model, select) => async (req) => {
	const { id } = req.params;
	const doc = await model.findById(id);
	Object.assign(doc, req.body);
	await doc.save();
	return await model.findById(id).select(select).lean().exec();
};
