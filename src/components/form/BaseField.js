import React from 'react';

export default class BaseField extends React.Component {
    errorMessage = '';
    value: any = null;

    constructor(props) {
        super(props);

        this.validate = this.validate.bind(this);
    }

    validate(): void {
        if (!this.props.validators) {
            this.errorMessage = '';

            return;
        }

        this.props.validators.some((validator) => {
            let valid = validator.isValid(this.value);

            if (!valid) {
                this.errorMessage = validator.message;

                return false;
            }

            return true;
        });
    }

    isValid(): boolean {
        this.validate();

        this.setState({});
        return this.errorMessage === '';
    }
};