import {getDaysDiff} from "../../../utils";

export const isNameValid = (value) => {
	return value.trim().length > 0 && value.trim().length <= 200;
};

export const isCategoriesValid = (value) => {
	return value.length > 0 && value.length <= 5;
}

export const isExpirationDateValid = (value) => {
	const daysFromNow = getDaysDiff(value);
	return !!value ? daysFromNow >= 30 : true;
}
