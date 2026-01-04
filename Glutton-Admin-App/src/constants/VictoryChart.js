export const getMaxYValue = (data) => {
    return data.reduce((maxY, dataPoint) => Math.max(maxY, dataPoint.y), -Infinity);
};

export const getMaxTotalValue = (data) => {
    return data.reduce((max, item) => {
        return Math.max(max, item.total);
    }, -Infinity);
};