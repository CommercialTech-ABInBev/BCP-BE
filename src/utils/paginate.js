export default ({ page, pageSize = 50 }) => {
    const offset = +page * parseInt(pageSize);
    const limit = parseInt(pageSize);

    return {
        offset,
        limit,
    };
};