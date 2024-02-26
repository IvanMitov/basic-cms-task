import moment from "moment";

export const repeat = (n) => Array.from(Array(n).keys());

export function getMultiSelected(target) {
    return Array.from(target.options).reduce((acc, {selected, value}) => {
        if (selected) {
            acc.push(value)
        }
        return acc;
    }, [])
}

export function getDaysDiff(timeA = moment().startOf('day'), timeB = moment().startOf('day')) {
    return moment(timeA).diff(timeB, "days");
}

export function generateId() {
    return parseInt(Date.now().toString(10));
}
