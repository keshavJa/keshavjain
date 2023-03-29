/*
 * Provus Services Quoting
 * Copyright (c) 2023 Provus Inc. All rights reserved.
 */
import { api } from 'lwc';
import LightningModal from 'lightning/modal';

export default class AdjustQuotePrice extends LightningModal {
  @api totalQuoteAmt;

    handleCurrencyChange(event){
    if(this.totalQuoteAmt != event.detail.value){
      this.totalQuoteAmt = event.detail.value;
    }
  }

  handleClose() {
      this.close(this.totalQuoteAmt);
  }
}
