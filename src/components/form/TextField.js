import React from 'react';
import PropTypes from 'prop-types';
import BaseField from "./BaseField";

export default class TextField extends BaseField {
    static propTypes = {
        name: PropTypes.string,
        label: PropTypes.string,
        prefix: PropTypes.string,
        suffix: PropTypes.string,
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
        this.refMainContainer.current.classList.add('textfield--focused');
    }

    onFocusLost() {
        this.refMainContainer.current.classList.remove('textfield--focused');
    }

    onChange(event) {
        this.setCurrentValue(event.target.value);

        if (event.target.value !== '') {
            this.refMainContainer.current.classList.add('textfield--filled');
        } else {
            this.refMainContainer.current.classList.remove('textfield--filled');
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
                customClassName += ' textfield--underline';
                break;

            case 'background':
                customClassName += ' textfield--background';
                break;

            default:
                customClassName = '';
        }

        if (this.props.disabled) {
            customClassName += ' textfield--disabled';
        }

        if (this.value) {
            customClassName += ' textfield--filled';
        }

        if (!this.props.label) {
            customClassName += ' textfield--no-label';
        }

        if (this.props.size === 'small') {
            customClassName += ' textfield--small';
        }

        if (this.props.addClassName) {
            customClassName += ` ${this.props.addClassName}`;

        }

        return (
            <>
                <div className={'textfield' + customClassName} ref={this.refMainContainer} key={value}>
                    <div className="textfield__box">
                        <input
                            name={this.props.name}
                            type={this.props.isPassword ? 'password' : 'text'}
                            className={`textfield__input`}
                            id={id}
                            onFocus={this.onFocus}
                            onBlur={this.onFocusLost}
                            defaultValue={this.value}
                            onChange={this.onChange}
                            {...rest}
                        />
                        {this.props.label ? <label htmlFor={id} className="textfield__label">{this.props.label}</label> : ''}
                        {this.props.prefix ? <i className={'textfield__prefix textfield__prefix--' + this.props.prefix}></i> : ''}
                        {this.props.suffix ? <i className={'textfield__suffix textfield__prefix--' + this.props.suffix}></i> : ''}
                    </div>
                </div>
                {
                    errorMessage && errorMessage.length > 0 ?
                        <div className="helper helper--error-show">
                            <div className="helper__text helper__text--error">{errorMessage}</div>
                        </div> : ''
                }
            </>
        );
    }
};