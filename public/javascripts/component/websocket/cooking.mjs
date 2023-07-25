import { componentCss } from './style.mjs';
export class CookingComponent extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: 'open' });
        // add style
        const style = document.createElement('style');
        style.textContent = componentCss;
        shadowRoot.appendChild(style);

        // Create the form element
        const form = document.createElement('form');
        const h2 = document.createElement('div');
        const fieldSet = document.createElement('fieldset');
        const legend = document.createElement('legend');
        legend.textContent = 'select payment result';
        form.appendChild(h2);
        form.appendChild(fieldSet);
        fieldSet.appendChild(legend);

        // Create the success radio input
        const successLabel = document.createElement('label');
        const successRadio = document.createElement('input');
        successRadio.type = 'radio';
        successRadio.id = 'success';
        successRadio.name = 'result';
        successRadio.value = 'success';
        successRadio.checked = true;
        successRadio.required = true;
        successLabel.appendChild(successRadio);
        successLabel.appendChild(document.createTextNode('Success'));
        fieldSet.appendChild(successLabel);

        // Create the fail radio input
        const failLabel = document.createElement('label');
        const failRadio = document.createElement('input');
        failRadio.type = 'radio';
        failRadio.id = 'fail';
        failRadio.name = 'result';
        failRadio.value = 'fail';
        failLabel.appendChild(failRadio);
        failLabel.appendChild(document.createTextNode('Fail'));
        fieldSet.appendChild(failLabel);

        // Create the error code input
        const errorCodeInput = document.createElement('input');
        errorCodeInput.type = 'text';
        errorCodeInput.id = 'errorcode';
        errorCodeInput.name = 'errorcode';
        errorCodeInput.placeholder = 'Error Code';
        errorCodeInput.disabled = true;
        fieldSet.appendChild(errorCodeInput);

        // Create the submit button
        const submitButton = document.createElement('button');
        submitButton.type = 'submit';
        submitButton.textContent = 'Submit';
        form.appendChild(submitButton);

        shadowRoot.appendChild(form);

        this.form = form;
        this.h2 = h2;
        this.errorCodeInput = errorCodeInput;
        this.successRadio = successRadio;
        this.failRadio = failRadio;
    }

    connectedCallback() {
        this.form.addEventListener('submit', this.handleSubmit.bind(this));
        this.successRadio.addEventListener('change', this.handleRadioChange.bind(this));
        this.failRadio.addEventListener('change', this.handleRadioChange.bind(this));
        this.h2.textContent = `mock cooking payment`;
    }

    disconnectedCallback() {
        this.form.removeEventListener('submit', this.handleSubmit);
        this.successRadio.removeEventListener('change', this.handleRadioChange);
        this.failRadio.removeEventListener('change', this.handleRadioChange);
    }

    handleSubmit(event) {
        event.preventDefault();

        const result = this.form.elements['result'].value;
        const errorCode = this.form.elements['errorcode'].value;
        const formData = {
        result,
        errorCode
        };

        const formSubmitEvent = new CustomEvent('formSubmit', {
        bubbles: true,
        detail: {
            formData
        }
        });

        this.dispatchEvent(formSubmitEvent);
    }

    handleRadioChange() {
        if (this.failRadio.checked) {
        this.errorCodeInput.disabled = false;
        } else {
        this.errorCodeInput.disabled = true;
        this.errorCodeInput.value = '';
        }
    }
}
customElements.define('cooking-component', CookingComponent);
