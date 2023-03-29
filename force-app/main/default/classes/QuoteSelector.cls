/*
* Class for SOQL of object Quote__c
*/


public with sharing class QuoteSelector {

    public static Quote__c getQuoteRecord(Id recordId) {
        return [
            SELECT Id, Name, StartDate__c, EndDate__c, CurrencyIsoCode, TotalQuotedAmount__c
            FROM Quote__c
            WHERE Id =: recordId
        ];
    }
    
}