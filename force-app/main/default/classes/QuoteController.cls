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
        if( quote != null ){ 
            if(recordId != null && BaseDto.OPERATION_TYPE_UPDATE == operationType){
                quote.Id = recordId;
                update quote;
            }  
            if(BaseDto.OPERATION_TYPE_INSERT == operationType){ // we do not need to check recordId condition over here as it is insert operation
                // insert DML
            }     
            if(recordId != null && BaseDto.OPERATION_TYPE_DELETE == operationType){
                // Delete DML
            }           
        }
        return quote;
    }
}
