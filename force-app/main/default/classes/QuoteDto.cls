public with sharing class QuoteDto extends BaseDto {
   @AuraEnabled
  public Date endDate{ get; set; }
   @AuraEnabled
  public Date startDate{ get; set; }
   @AuraEnabled
  public Decimal totalQuotedAmount{ get; set; }


  public QuoteDto() {
  }

  public QuoteDto(Quote__c quote) {
    super(quote);
    this.endDate = quote.EndDate__c;
    this.startDate = quote.StartDate__c;
    this.totalQuotedAmount = quote.TotalQuotedAmount__c;
    this.name = quote.Name;
    this.id = quote.Id;
  }

  public override SObject refreshSo() {
    return null;
  }
}
