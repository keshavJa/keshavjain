/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";
import AdjustQuotePriceModal from 'c/adjustQuotePrice';
import updateQuote from '@salesforce/apex/QuoteController.updateQuote';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';

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
                    updateQuote({ quote : this.quoteToBeUpdate, recordId : this.recordId})
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


    
    /*handleAdjustQuote(){
        
        this.showModal = true;
        console.log( 'handleAdjustQuote = ' +  this.showModal);
        // Creates the event with the contact ID data.
        const selectedEvent = new CustomEvent('showaqp', { detail: this.showModal });
        console.log( 'handleAdjustQuote selectedEvent = ' +  selectedEvent);
        // Dispatches the event.
        this.dispatchEvent(selectedEvent);
    } */
    /*async handleAdjustQuote() {
        const result = await AdjustQuotePriceModal.open({
            // `label` is not included here in this example.
            // it is set on lightning-modal-header instead
            size: 'small',
            description: 'Accessible description of modal\'s purpose',
            content: 'Passed into content api',
            totalQuoteAmt:this.totalQuoteAmt,
        });
        // if modal closed with X button, promise returns result = 'undefined'
        // if modal closed with OK button, promise returns result = 'okay'
        console.log(result);
    } */
}
