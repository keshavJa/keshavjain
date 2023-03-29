import { LightningElement, api, track } from 'lwc';

export default class CurrencyInput extends LightningElement {
    @api currencyCode;
    @api numericValue;

    @track displayValue;

    get currencyLabel() {
        return this.currencyCode ? 'Amount (' + this.currencyCode + ')' : 'Amount';
    }

    connectedCallback() {
        this.displayValue = this.numericValue;
    }

    handleClick() {
        this.template.querySelector('lightning-input').readOnly = false;
    }
}
