/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import AdjustQuotePriceModal from 'c/adjustQuotePrice';
import updateQuote from '@salesforce/apex/QuoteController.quoteDMLOperation';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
const UPDATE_OPERATION = 'update';

export default class QuoteTotalSummary extends LightningElement {
    @api recordId;
    @api totalQuoteAmt;

    //showModal = false;
    quoteToBeUpdate = {};

    // this is to open modal dialouge and send amount and receive amount to update quote record
    handleAdjustQuote() {
        AdjustQuotePriceModal.open({
            size: 'small',
            totalQuoteAmt:this.totalQuoteAmt,
        }).then((result) => {
            if(result){
                if(this.totalQuoteAmt !== result){
                    this.quoteToBeUpdate['TotalQuotedAmount__c'] = result;
                    updateQuote({ quote : this.quoteToBeUpdate, recordId : this.recordId, operationType :UPDATE_OPERATION})
                    .then(result =>{  
                        this.dispatchEvent(new CustomEvent('refresheditquote')); 
                        this.showNotification('', 'Amount Updated Successfully !', 'success');  
                    })
                    .catch(error => {
                        this.showNotification('Error', error.message, 'error');
                    })
                }
            }
        });
    }

    

    showNotification(title, message, variant){
    const evt = new ShowToastEvent({
                title: title,
                message: message,
                variant: variant
            });
            this.dispatchEvent(evt);
    }
}
