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
    public static Quote__c quoteDMLOperation(Quote__c quote, Id recordId, String operationType) {
        if(recordId != null && quote != null && BaseDto.OPERATION_TYPE_UPDATE == operationType ){ 
            if(BaseDto.OPERATION_TYPE_UPDATE == operationType){
                quote.Id = recordId;
                update quote;
            }  
            if(BaseDto.OPERATION_TYPE_INSERT == operationType){
                // insert DML
            }     
            if(BaseDto.OPERATION_TYPE_DELETE == operationType){
                // Delete DML
            }           
        }
        return quote;
    }
}