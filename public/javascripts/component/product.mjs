export class ControlProductComponent extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.render();

        // Event listener for the submit button
        this.shadowRoot.querySelector('#submitButton').addEventListener('click', () => {
        console.log('submit');
        const idInput= this.shadowRoot.querySelector('#idInput');
        const nameInput = this.shadowRoot.querySelector('#nameInput');
        const descriptionInput = this.shadowRoot.querySelector('#descriptionInput');
        const imageInput = this.shadowRoot.querySelector('#imageInput');
        const discountInput = this.shadowRoot.querySelector('#discountInput');
        const priceInput = this.shadowRoot.querySelector('#priceInput');
        const toolpriceInput = this.shadowRoot.querySelector('#toolpriceInput');
        const cookingTimeInput = this.shadowRoot.querySelector('#cookingtimeInput');
        const saleoutInput = this.shadowRoot.querySelector('#saleoutInput');
        const hotInput = this.shadowRoot.querySelector('#hotInput');
        const toolInput = this.shadowRoot.querySelector('#toolInput');
        const newInput = this.shadowRoot.querySelector('#newInput');
        const brandInput = this.shadowRoot.querySelector('#brandInput');
        this.dispatchEvent(new CustomEvent('formSubmit', {
            detail: {
            id: idInput.value,
            name: nameInput.value,
            description: descriptionInput.value,
            image: imageInput.value,
            discount: discountInput.value,
            price: priceInput.value,
            toolPrice: toolpriceInput.value,
            cookingTime: cookingTimeInput.value,
            isSaleout: saleoutInput.checked,
            isHot: hotInput.checked,
            hasTool: toolInput.checked,
            isNew: newInput.checked,
            isBrand: brandInput.checked,
            }
        }));
        });
    }

    render() {
        const template = document.createElement('template');
        template.innerHTML = `
        <style>
            form {
            padding: 8px;
            border: 1px solid #ccc;
            border-radius: 4px;
            width: 300px;
            }
            fieldset {
            margin: 10px;
            display: flex;
            }

            legend {
            font-weight: bold;
            margin-bottom: 5px;
            }

            label {
            display: block;
            margin-bottom: 5px;
            }

            input[type="number"] {
            width: 100px;
            }

            button {
            margin: 8px;
            }
        </style>
        <form>
            <fieldset>
            <legend>ID</legend>
            <input id="idInput" type="text" disabled>
            </fieldset>
            <fieldset>
            <legend>Name</legend>
            <input id="nameInput" type="text">
            </fieldset>
            <fieldset>
            <legend>Description</legend>
            <textarea id="descriptionInput"></textarea>
            </fieldset>
            <fieldset>
            <legend>Image Name</legend>
            <input id="imageInput" type="text">
            </fieldset>
            <fieldset>
            <legend>Discount</legend>
            <input id="discountInput" type="number" value="1" max="1" min="0" step="0.01">
            </fieldset>
            <fieldset>
            <legend>Price</legend>
            <input id="priceInput" type="number" value="100" min="0">
            </fieldset>
            <fieldset>
            <legend>Tool Price</legend>
            <input id="toolpriceInput" type="number" value="100" min="0">
            </fieldset>
            <fieldset>
            <legend>Cooking Time(sec)</legend>
            <input id="cookingtimeInput" type="number" value="100" min="0">
            </fieldset>
            <fieldset>
            <legend>Is Saleout</legend>
            <label><input id="saleoutInput" type="radio" name="isSaleout" value="true"> Yes</label>
            <label><input id="notsaleoutInput" type="radio" name="isSaleout" value="false" checked> No</label>
            </fieldset>
            <fieldset>
            <legend>Is Hot</legend>
            <label><input id="hotInput" type="radio" name="isHot" value="true"> Yes</label>
            <label><input id="nothotInput" type="radio" name="isHot" value="false" checked> No</label>
            </fieldset>
            <fieldset>
            <legend>Has Tool</legend>
            <label><input id="toolInput" type="radio" name="hasTool" value="true"> Yes</label>
            <label><input id="nottoolInput" type="radio" name="hasTool" value="false" checked> No</label>
            </fieldset>
            <fieldset>
            <legend>Is New</legend>
            <label><input id="newInput" type="radio" name="isNew" value="true"> Yes</label>
            <label><input id="notnewInput" type="radio" name="isNew" value="false" checked> No</label>
            </fieldset>
            <fieldset>
            <legend>Is Brand</legend>
            <label><input id="brandInput" type="radio" name="isBrand" value="true"> Yes</label>
            <label><input id="notbrandInput" type="radio" name="isBrand" value="false" checked> No</label>
            </fieldset>
            <button id="submitButton" type="button">Submit</button>
        </form>
        `;

        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['id', 'name', 'description', 'image', 'price', 'toolprice', 'cooking' ,'discount', 'saleout', 'hot', 'tool', 'new', 'brand'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
        const input = this.shadowRoot.querySelector(`#${name}Input`);
        if (name === 'description') {
            const textarea = this.shadowRoot.querySelector(`#${name}Input`);
            textarea.value = newValue;
        }
        if (input && input.type === 'text' || input.type === 'number') {
            input.value = newValue;
        }
        if (input && input.type === 'radio' && newValue === '') {
            input.checked = true;
            const noInput = this.shadowRoot.querySelector(`#not${name}Input`);
            noInput.checked = false;
        }
        if (input && input.type === 'radio' && newValue === null) {
            input.checked = false;
            const noInput = this.shadowRoot.querySelector(`#not${name}Input`);
            noInput.checked = true;
        }
        }
    }
}

customElements.define('control-product', ControlProductComponent);
