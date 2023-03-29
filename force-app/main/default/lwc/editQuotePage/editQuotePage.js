/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */

import { LightningElement, api } from "lwc";

export default class EditQuotePage extends LightningElement {
  @api recordId;
  @api totalQuoteAmt;
  showAQP = false;


  // Total Quote Amt from child cmp editQuote when wire method invoke to pass child cmp adjustQuotePrice
  handleSendTQAEvent(event){
    this.totalQuoteAmt = event.detail;
  }

  handleShowAQP(event){
    this.showAQP = event.detail;
  }

  handleCloseAQP(){
    this.showAQP = false;
  }

  // method to call child cmp method for refresh wire data
  handleRefreshEditQuote(){
    this.template.querySelector('c-edit-quote').refreshQuoteDataFun();
    this.handleCloseAQP();
  }

  
        
}
