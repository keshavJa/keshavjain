@isTest
public with sharing class QuoteControllerTest {

    @TestSetup
    static void makeData(){
        Quote__c q = new Quote__c();
        q.StartDate__c = System.today();
        q.EndDate__c = System.today() + 30;
        q.TotalQuotedAmount__c = 300;
        insert q;
    }
    
    @isTest
    static void getQuoteDTORecord_whenIDIsNotNull_success(){
        Quote__c q = [  
                        SELECT Id, Name, StartDate__c, EndDate__c, CurrencyIsoCode, TotalQuotedAmount__c
                        FROM Quote__c
                        WHERE TotalQuotedAmount__c =300
                    ];

        Test.startTest();
            QuoteDto qd = QuoteController.getQuoteDTORecord(q.Id); 
        Test.stopTest();

        Assert.areEqual(q.StartDate__c, qd.startDate);
    }
    
    @isTest
    static void getQuoteDTORecord_whenIDIsNull_success(){

        Test.startTest();
            QuoteDto qd = QuoteController.getQuoteDTORecord(null); 
        Test.stopTest();

        Assert.areEqual(null, qd.startDate);
    }
    
    @isTest
    static void updateQuote_whenIDIAndQuoteIdNotNull_success(){
        Quote__c q = [  
                        SELECT Id, Name, StartDate__c, EndDate__c, CurrencyIsoCode, TotalQuotedAmount__c
                        FROM Quote__c
                        WHERE TotalQuotedAmount__c =300
                    ];
        q.TotalQuotedAmount__c = 600;

        Test.startTest();
            Quote__c qd = QuoteController.updateQuote(q, q.Id); 
        Test.stopTest();

        Assert.areEqual(600, qd.TotalQuotedAmount__c);
    }
}