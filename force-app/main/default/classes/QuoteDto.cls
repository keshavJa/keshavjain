public with sharing class QuoteDto extends BaseDto {
   @AuraEnabled
  public Date endDate{ get; set; }
   @AuraEnabled
  public Date startDate{ get; set; }
   @AuraEnabled
  public Decimal totalQuotedAmount{ get; set; }
   @AuraEnabled
  public String quoteName{ get; set; }


  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.totalQuotedAmount = quote.TotalQuotedAmount__c;
    this.quoteName = quote.Name;
  }

  /*
  @AuraEnabled(cacheable=true)
    public static QuoteDto getQuoteDTORecord(Id recordId) {
      QuoteDto quoteDto = new QuoteDto(QuoteSelector.getQuoteRecord(recordId));
      return quoteDto;
    } */
    
/*
  @AuraEnabled(cacheable=true)
    public static Quote__c getQuoteRecord(Id recordId) {
        return [
            SELECT Id, Name, StartDate__c, EndDate__c, CurrencyIsoCode, TotalQuotedAmount__c
            FROM Quote__c
            WHERE Id =: recordId
        ];
    }
  
@AuraEnabled
public static Quote__c updateQuote(Quote__c quote, Id recordId) {
        System.debug(' Before in updateQuote method = ' + quote);
        quote.Id = recordId;
        
        System.debug(' After in updateQuote method = ' + quote);
        update quote;
        return quote;
    } */

  public override SObject refreshSo() {
    return null;
  }
}
