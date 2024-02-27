import React from "react";
import { render } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import moment from 'moment';
import ProductForm from "./ProductForm";
import categories from "../../../mocks/categories";

describe("Product Form", () => {
    let onSubmitMock;
	const history = {};

    beforeEach(() => {
        window.getSelection = () => {
            return {
              removeAllRanges: () => {}
            };
          }
        onSubmitMock = jest.fn();
        history.push = jest.fn();
    })

    it('renders with all form elements', () => {
        const { getByLabelText, getByText } = render(<ProductForm categories={categories} onSave={onSubmitMock} />);
        expect(getByLabelText(/name/i)).toBeInTheDocument();
        expect(getByLabelText(/brand/i)).toBeInTheDocument();
        expect(getByLabelText(/rating/i)).toBeInTheDocument();
        expect(getByLabelText(/categories/i)).toBeInTheDocument();
        expect(getByLabelText(/items in stock/i)).toBeInTheDocument();
        expect(getByLabelText(/expiration date/i)).toBeInTheDocument();
        expect(getByLabelText(/receipt date/i)).toBeInTheDocument();
        expect(getByText(/featured/i)).toBeInTheDocument();
        expect(getByText(/submit/i)).toBeInTheDocument();
    });

    it('validates form submission with missing inputs', () => {
        const { getByText } = render(<ProductForm categories={categories} onSave={onSubmitMock} />);

        userEvent.click(getByText(/submit/i));

        expect(getByText('Name is required, the length must not be greater than 200')).toBeInTheDocument();
        expect(getByText('A product must have from 1 to 5 categories')).toBeInTheDocument();
        expect(getByText('If a product has an expiration date it must expire not less than 30 days since now')).toBeInTheDocument();
        expect(onSubmitMock).not.toHaveBeenCalled();
    });

    it('displays validation errors with invalid inputs', () => {
        const { getByText, getByLabelText } = render(<ProductForm categories={categories} onSave={onSubmitMock} />);
        const submitButton = getByText(/submit/i);

        // text length over 200 characters
        userEvent.type(getByLabelText(/name/i), 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.');
        userEvent.click(submitButton);

        expect(getByText('Name is required, the length must not be greater than 200')).toBeInTheDocument();

        // select more than 5 categories
        userEvent.type(getByLabelText(/categories/i), ['1', '2', '3', '4', '5', '6']);
        userEvent.click(submitButton);

        expect(getByText('A product must have from 1 to 5 categories')).toBeInTheDocument();

        // today as expiration date
        userEvent.type(getByLabelText(/expiration date/i), moment().format('YYYY-MM-DD'));
        userEvent.click(submitButton);
        
        expect(getByText('If a product has an expiration date it must expire not less than 30 days since now')).toBeInTheDocument();
    });

    it('submits form successfully', () => {
        const { getByText, getByLabelText } = render(<ProductForm categories={categories} onSave={onSubmitMock} />);
        const submitButton = getByText(/submit/i);
        const productName = 'product name';

        userEvent.type(getByLabelText(/name/i), productName);
        userEvent.selectOptions(getByLabelText(/categories/i), ['2']);
        userEvent.type(getByLabelText(/expiration date/i), moment().add(31, 'days').format('YYYY-MM-DD'));

        userEvent.click(submitButton);

        expect(getByLabelText(/name/i).getAttribute('aria-invalid')).toBe('false');
        expect(getByLabelText(/categories/i).getAttribute('aria-invalid')).toBe('false');
        expect(getByLabelText(/expiration date/i).getAttribute('aria-invalid')).toBe('false');
        // Doesn`t with display: none
        // expect(queryByText('Name is required, the length must not be greater than 200')).not.toBeVisible();
        // expect(queryByText('A product must have from 1 to 5 categories')).not.toBeVisible();
        // expect(queryByText('If a product has an expiration date it must expire not less than 30 days since now')).not.toBeVisible();
        expect(onSubmitMock).toHaveBeenCalled();
    });
});