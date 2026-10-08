export const create = async ({ model, data, options = {} } = {}) => {
    const [doc] = await model.create([data], options);
    return doc;
};

export const findOne = async ({ model, filter, options = {} } = {}) => {
    return await model.findOne(filter, options);
};




export const findById = async ({ model, id, options = {} } = {}) => {
    return await model.findById(id, options);
};

export const findByIdAndUpdate = async ({ model, id, update, options = {} } = {}) => {
    return await model.findByIdAndUpdate(id, update, {
        new: true,
        runValidators: true,
        ...options,
    });
};
