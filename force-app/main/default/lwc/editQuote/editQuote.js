/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api, wire, track } from "lwc";
import getQuoteRecord from '@salesforce/apex/QuoteController.getQuoteDTORecord';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import updateQuote from '@salesforce/apex/QuoteController.updateQuote';
import { refreshApex } from '@salesforce/apex';
import SAVE_RECORD_MESSAGE_LABEL from '@salesforce/label/c.Save_Record_Message';
import SUCCESS_MESSAGE_TITLE_LABEL from '@salesforce/label/c.Success_Message_Title';

export default class EditQuote extends LightningElement {
  @api recordId;
  @track quoteData;
  @track refreshQuoteData;
  isDateChange = false;

  quoteToBeUpdate = {};

  @wire(getQuoteRecord, { recordId: '$recordId'})
  wiredQuote(result) {
    this.refreshQuoteData = result;
    if (this.refreshQuoteData.data) {
        let data = this.refreshQuoteData.data;
        this.quoteData = data;
        this.error = undefined;
        // event to share Total Quote Amount to display on cmp adjustQuotePrice
        if(this.refreshQuoteData.data.totalQuotedAmount){   
          const sendAmtEvent = new CustomEvent('sendtqa', { detail: this.quoteData.totalQuotedAmount });
          this.dispatchEvent(sendAmtEvent);
        }
    } else if (this.refreshQuoteData.error) {
        this.error = this.refreshQuoteData.error;
        this.quoteData = undefined;
        this.showNotification('Error', this.error.message, 'error');
    }
}

handleSDChange(event){ 
  this.quoteToBeUpdate['StartDate__c'] = event.target.value;
  this.isDateChange = true;
}

handleEDChange(event){ 
  this.quoteToBeUpdate['EndDate__c'] = event.target.value;
  this.isDateChange = true;
}

// METHOD TO UPDATE DATE ON QUOTE OBJECT
handleSubmit(){ 
  if(this.isDateChange){
    updateQuote({ quote : this.quoteToBeUpdate, recordId : this.recordId})
    .then(result =>{
      this.showNotification(SUCCESS_MESSAGE_TITLE_LABEL, SAVE_RECORD_MESSAGE_LABEL, 'success');
      refreshApex(this.refreshQuoteData);      
      this.isDateChange = false;
    })
    .catch(error => {  
        this.showNotification('Error', error.body.pageErrors[0].message, 'error');
    })
  }
}

showNotification(title, message, variant){
  const evt = new ShowToastEvent({
            title: title,
            message: message,
            variant: variant
        });
        this.dispatchEvent(evt);
}

// METHOD WILL BE INVOKE FROM PARENT CMP. TO REFRESH WIRE DATA
@api
refreshQuoteDataFun(){
  refreshApex(this.refreshQuoteData);
}

renderedCallback() {}
}
