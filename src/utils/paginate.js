module.exports = ({ page, pageSize = 5 }) => {
    const offset = +page * parseInt(pageSize);
    const limit = parseInt(pageSize);

    return {
        offset,
        limit,
    };
};