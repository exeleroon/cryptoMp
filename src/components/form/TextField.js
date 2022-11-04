import React from 'react';
import PropTypes from 'prop-types';
import BaseField from "./BaseField";

export default class TextField extends BaseField {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
        underline: PropTypes.bool,
        disabled: PropTypes.bool,
        variant: PropTypes.oneOf(['underline', 'background']),
        value: PropTypes.string,
        onChange: PropTypes.func,
        errorMessage: PropTypes.string,
        size: PropTypes.string,
        isPassword: PropTypes.bool,
        addClassName: PropTypes.string
    };

    value: string = '';
    savedPropValue = '';
    name = '';

    constructor(props) {
        super(props);

        this.name = props.name;

        this.refMainContainer = React.createRef();

        this.onFocus = this.onFocus.bind(this);
        this.onFocusLost = this.onFocusLost.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onFocus() {
        this.refMainContainer.current.classList.add('abc__textfield--focused');
    }

    onFocusLost() {
        this.refMainContainer.current.classList.remove('abc__textfield--focused');
    }

    onChange(event) {
        this.setCurrentValue(event.target.value);

        if (event.target.value !== '') {
            this.refMainContainer.current.classList.add('abc__textfield--filled');
        } else {
            this.refMainContainer.current.classList.remove('abc__textfield--filled');
        }

        if (this.props.onChange) {
            const event = {
                target: this,
            };

            this.props.onChange(event);
        }
    }

    setCurrentValue(value: string): void {
        this.value = value;
    }

    render() {
        let {id, value, onChange, errorMessage, variant, label, isPassword, size, ...rest} = this.props;

        if (this.savedPropValue !== value) {
            this.savedPropValue = value;
            this.setCurrentValue(value);
        }

        if (!id) {
            id = 'tf' + Math.random();
        }

        let customClassName = '';

        switch (variant) {
            case 'underline':
                customClassName += ' abc__textfield--underline';
                break;

            case 'background':
                customClassName += ' abc__textfield--background';
                break;

            default:
                customClassName = '';
        }

        if (this.props.disabled) {
            customClassName += ' abc__textfield--disabled';
        }

        if (this.value) {
            customClassName += ' abc__textfield--filled';
        }

        if (!this.props.label) {
            customClassName += ' abc__textfield--no-label';
        }

        if (this.props.size === 'small') {
            customClassName += ' abc__textfield--small';
        }

        if (this.props.addClassName) {
            customClassName += ` ${this.props.addClassName}`;

        }

        return (
            <>
                <div className={'abc__textfield' + customClassName} ref={this.refMainContainer} key={value}>
                    <div className="abc__textfield__box">
                        <input
                            name={this.props.name}
                            type={this.props.isPassword ? 'password' : 'text'}
                            className={`abc__textfield__input`}
                            id={id}
                            onFocus={this.onFocus}
                            onBlur={this.onFocusLost}
                            defaultValue={this.value}
                            onChange={this.onChange}
                            {...rest}
                        />
                        {this.props.label ? <label htmlFor={id} className="abc__textfield__label">{this.props.label}</label> : ''}
                        {this.props.prefix ? <i className={'abc__textfield__prefix abc__textfield__prefix--' + this.props.prefix}></i> : ''}
                        {this.props.suffix ? <i className={'abc__textfield__suffix abc__textfield__prefix--' + this.props.suffix}></i> : ''}
                        {this.props.underline || this.props.underline === undefined ? <div className="abc__textfield__underline"></div> : ''}
                    </div>
                </div>
                {
                    errorMessage && errorMessage.length > 0 ?
                        <div className="abc__helper abc__helper--error-show">
                            <div className="abc__helper__text abc__helper__text--error">{errorMessage}</div>
                        </div> : ''
                }
            </>
        );
    }
};