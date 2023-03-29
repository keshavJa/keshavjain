public with sharing class QuoteController {


    //method to get record of Quote object
    @AuraEnabled(cacheable=true)
    public static QuoteDto getQuoteDTORecord(Id recordId) {
        if(recordId != null){
            QuoteDto quoteDto = new QuoteDto(QuoteSelector.getQuoteRecord(recordId));
            return quoteDto;
        }
      return new QuoteDto();
    }

    //method to update Quote object
    @AuraEnabled
    public static Quote__c updateQuote(Quote__c quote, Id recordId) {
        if(recordId != null && quote != null ){ 
            quote.Id = recordId;
            update quote;
        }
        return quote;
    }
}