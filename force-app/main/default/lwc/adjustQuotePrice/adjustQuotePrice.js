/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */
import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AdjustQuotePrice extends LightningModal {
  @api totalQuoteAmt;
  //quoteToBeUpdate = {};

    handleCurrencyChange(event){
    if(this.totalQuoteAmt != event.detail.value){
      this.totalQuoteAmt = event.detail.value;
      //this.quoteToBeUpdate[TOTAL_QUOTED_AMOUNT] = this.totalQuoteAmt;
    }
  }

  handleClose() {
      this.close(this.totalQuoteAmt);
  }
}

/*
import { LightningElement, api } from "lwc";
import updateQuote from '@salesforce/apex/QuoteDto.updateQuote';

export default class AdjustQuotePrice extends LightningElement {
  @api recordId;
  @api totalQuoteAmt;
  adjustedAmountLabel = "Adjusted Amount";
  adjustedAmount = 0;
  quoteToBeUpdate = {};

  handleCurrencyChange(event){
    if(this.totalQuoteAmt != event.detail.value){
      this.totalQuoteAmt = event.detail.value;
      this.quoteToBeUpdate['TotalQuotedAmount__c'] = this.totalQuoteAmt;
    }
  }

  handleCancel(){
    this.dispatchEvent(new CustomEvent('closeaqp'));
  }

  handleSubmit(){
    

    if(this.quoteToBeUpdate){
      console.log(' totalQuoteAmt = ' + this.totalQuoteAmt);
      updateQuote({ quote : this.quoteToBeUpdate, recordId : this.recordId})
      .then(result =>{        
        console.log(' AdjustQuotePrice handleSubmit  = ' , result);
        this.dispatchEvent(new CustomEvent('refresheditquote'));

    })
    .catch(error => {

    })
  }
  }
}
*/
