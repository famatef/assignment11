export const create = async ({ model, data, options = {} } = {}) => {
    const [doc] = await model.create([data], options);
    return doc;
};

export const findOne = async ({ model, filter, options = {} } = {}) => {
    return await model.findOne(filter, options);
};

export const findOneAndUpdate = async ({ model, filter, update, options = {} } = {}) => {
    return await model.findOneAndUpdate(filter, update, {
        returnDocument: "after",
        runValidators: true,
        ...options,
    });
};
export const find = async ({ model, filter, options = {} } = {}) => {
    const data = model.find(filter)
    if (options?.limit)data.limit(options?.limit)
    if (options?.skip)data.skip(options?.skip)
    if (options?.sort)data.sort(options?.sort)
    if (options?.populate)data.populate(options?.populate)
    return await data.exec()
};




export const findById = async ({ model, id, options = {} } = {}) => {
    return await model.findById(id, options);
};

export const findByIdAndUpdate = async ({ model, id, update, options = {} } = {}) => {
    return await model.findByIdAndUpdate(id, update, {
        returnDocument: "after",
        runValidators: true,
        ...options,
    });
};
