class AecErpProblemsReportTaskGenerator {
  constructor() {
  }

  /**
   * Main method responsible to extract task description.
   */
  getTaskDescription() {
    let description = "";
    let userProperties = PropertiesService.getUserProperties();
    let atlanticLiveCookies = apiAecErpLogin(userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_USER1'), userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_USER1_PASS'));
    let dubaiLiveCookies = apiAecErpLogin(userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_USER1'), userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_USER1_PASS'));

    description += "{color:#ff5630}*Atlantic:*{color}";
    description += "\n\n";
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkForInvalidPaymentAmount', "13) There are some payments where 'ammount' is less than 'total amount paid.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkNoQuoteInLoading', "17) There are some loadings without quotes or missing some quotes.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkForNotSentNotificationsAboutETA', "19) There are some containers for which notifications wasn't sent yet.");
    //description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkQuoteNotIncludingAllSupportedRatesProblem', "21) There are active quotes, they are missing rates.", true);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkDeadRateHasChangedMessages', "24) There are items in 'dead-rate-has-changed.fifo'.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkCacheRecalculationRegister', "25) There are entries in 'cache_recalculation_register' table, but queue 'recalculate-company-amount-due.fifo' messages amount is 0. Try clean 'cache_recalculation_register' table.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkInvoicesOfTypePaymentWithPositiveDueAmount', "34) Found invoices of type Payment with positive due amount.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkWhiteLabelConflictsEntriesCount', "37) White label conflicts table 'whl_sync_conflict' contain entries since.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkInvoicesWithDifferentInvoiceLinesTotalPrice', "48) Found invoices with different 'invoice amount' and 'invoice lines amount'.", true);
    //description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkQueueMessagesAndShowErrorsIfNotEmpty', "50) There are some items in 'white-label-sync-from-1-to-2-erp-live-dead.fifo'.");
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkRatesTheyHaveNoQuotes', "56) Found rates they have no quotes.", true);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkInvoicesTheyMissingMandatoryFields', "57) Found rates they have no quotes.", true);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'check58', "58) Found invoices where foreign invoice paid, but related local invoice not paid and both included to combined invoice.", false);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'check59', "59) Detected invoices with negative 'Amount Due'.", false);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'check60', "60) Check invoices with paid status but 'amount due' > 0.", false);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'check61', "61) Found native invoices invoices with 0.00 amount, but related foreign invoices not 0.00.", false);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'checkOrderNoteProcessingStatusNotInNoteGroup', "62) Found Order note processing status not in note group.", false);
    description += this.apiAecErpGetReport(atlanticLiveCookies, userProperties.getProperty('SERVER_ATLANTIC_LIVE_ERP_URL'), 'check63', "63) Found combined invoice native invoices, they have payments, but foreign invoice payment not generated.", false);
    description += "\n\n";
    description += "{color:#ff5630}*Dubai:*{color}";
    description += "\n\n";
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkForInvalidPaymentAmount', "13) There are some payments where 'ammount' is less than 'total amount paid.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkNoQuoteInLoading', "17) There are some loadings without quotes or missing some quotes.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkForNotSentNotificationsAboutETA', "19) There are some containers for which notifications wasn't sent yet.");
    //description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkQuoteNotIncludingAllSupportedRatesProblem', "21) There are active quotes, they are missing rates.", true);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkDeadRateHasChangedMessages', "24) There are items in 'dead-rate-has-changed.fifo'.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkCacheRecalculationRegister', "25) There are entries in 'cache_recalculation_register' table, but queue 'recalculate-company-amount-due.fifo' messages amount is 0. Try clean 'cache_recalculation_register' table.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkInvoicesOfTypePaymentWithPositiveDueAmount', "34) Found invoices of type Payment with positive due amount.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkWhiteLabelConflictsEntriesCount', "37) White label conflicts table 'whl_sync_conflict' contain entries since.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkInvoicesWithDifferentInvoiceLinesTotalPrice', "48) Found invoices with different 'invoice amount' and 'invoice lines amount'.", true);
    //description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkQueueMessagesAndShowErrorsIfNotEmpty', "50) There are some items in 'white-label-sync-from-1-to-2-erp-live-dead.fifo'.");
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkRatesTheyHaveNoQuotes', "56) Found rates they have no quotes.", true);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'check58', "58) Found invoices where foreign invoice paid, but related local invoice not paid and both included to combined invoice.", false);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'check59', "59) Detected invoices with negative 'Amount Due'.", false);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'check60', "60) Check invoices with paid status but 'amount due' > 0.", false);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'check61', "61) Found native invoices invoices with 0.00 amount, but related foreign invoices not 0.00.", false);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'checkOrderNoteProcessingStatusNotInNoteGroup', "62) Found Order note processing status not in note group.", false);
    description += this.apiAecErpGetReport(dubaiLiveCookies, userProperties.getProperty('SERVER_DUBAI_LIVE_ERP_URL'), 'check63', "63) Found combined invoice native invoices, they have payments, but foreign invoice payment not generated.", false);

    return description;
  }

  /**
   * Main method to extract report and prepare HTML.
   */
  apiAecErpGetReport(cookies, url, methodName, caption, skipDetails = false) {
    let description = "";
    let problemsResponse = apiAecErpCallProblemsCheckerCommand(url, cookies, methodName);
    let line = "";

    if (problemsResponse.response.data && problemsResponse.response.data.length > 0 && problemsResponse.response.status === 0 && problemsResponse.response.data[0] !== 'No data.') {
      description += "\n\n";
      description += "*" + caption + "*";

      if (!skipDetails) {
        problemsResponse.response.data.forEach(function (problemItem) {
          line = "";
          Object.keys(problemItem).forEach(key => {
            line += key + ": '" + problemItem[key] + "'; ";
          });

          description += "\n\n" + line;
        });
      }
    }

    if (problemsResponse.response.status !== 0) {
      console.error(problemsResponse.response.data.error);
    }

    return description;
  }
}