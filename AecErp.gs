/**
 * Fix Atlantic problem "17) There are some loadings without quotes or missing some quotes.".
 */
function AecErpHealersFixAtlanticProblem17() {
  // Check if in Atlantic we have "17) There are some loadings without quotes or missing some quotes.":
  let atlanticLiveCookies = apiAecErpLogin(SERVER_ATLANTIC_LIVE_ERP_URL, SERVER_ATLANTIC_LIVE_ERP_USER1, SERVER_ATLANTIC_LIVE_ERP_USER1_PASS);
  let problems = apiAecErpCallProblemsCheckerCommand(SERVER_ATLANTIC_LIVE_ERP_URL, atlanticLiveCookies, 'checkNoQuoteInLoading');
  let errorMessage = '';
  let details = null;
  let referenceNo = "";
  let fromPortId = "";
  let toPortId = "";
  let customerId = "";
  let referenceData = null;
  let bookingNumberAssignedString = null;

  if (problems.response.data[0] != "No data.") {
    problems.response.data.forEach(function (problem) {
      details = problem.Details.split(/(\d+)/);
      referenceNo = (details[0] === 'Loading with Reference no. ' ? details[1] : '');
      fromPortId = details[3];
      toPortId = details[5];
      customerId = details[7];

      if (!referenceNo) {
        errorMessage = "Extracted from string '" + problem.Details + "' referenceNo is empty. Skip reference handling.";
        console.error("ERROR", errorMessage);
        helpersAddLogEntryToFirstLine('ERROR', errorMessage);
        return;// For practical purposes, return in a forEach() callback is equivalent to continue in a conventional for loop. When you return, you skip the rest of the forEach() callback and JavaScript goes on to the next iteration of the loop.
      }

      referenceData = apiAecErpGetReferenceDataByReferenceNo(SERVER_ATLANTIC_LIVE_ERP_URL, atlanticLiveCookies, referenceNo);

      if (!referenceData) {
        errorMessage = "Not found reference data by reference no '" + referenceNo + "'. Skip reference handling.";
        console.error("ERROR", errorMessage);
        helpersAddLogEntryToFirstLine('ERROR', errorMessage);
        return;
      }

      bookingNumberAssignedString = referenceData['bookingNumberAssigned'];

      if (!bookingNumberAssignedString) {
        errorMessage = "Reference no '" + referenceNo + "' don't have booking number assigned date. Skip reference handling.";
        console.error("ERROR", errorMessage);
        helpersAddLogEntryToFirstLine('ERROR', errorMessage);
        return;
      }

      // Debug:
      console.info("referenceNo=", referenceNo, "; fromPortId=", fromPortId, '; toPortId=', toPortId, '; customerId=', customerId, 'bookingNumberAssignedString=', bookingNumberAssignedString);
    });
  }


  /*
  // 3. Handling problem:
  foreach ($problems as $problem) {
      $activeQuoteId = getActiveQuoteId($customerId, $toPortId, $bookingNumberAssignDateTime);
  
      $futureQuoteId = getFutureQuoteId($customerId, $toPortId, $bookingNumberAssignDateTime);
  
      if (empty($activeQuoteId) && empty($futureQuoteId)) {
          $helper->logToConsole("INFO", "Customer '$customerId - $customerName' at '$bookingNumberAssignDateTime' have no active quote and no future quote to destination port '$toPortId - $toPortName'.");
  
          $command = SERVER_ATLANTIC_LIVE_ERP_COMMAND_SCRIPT . ' "atlantic:helpers:quote_generator generate_quotes_by_customer_id_csv ' . $customerId . ' --to_port_id=' . $toPortId . ' --env=prod"';
          $helper->executeAnExternalProgram($command, [], false, true);
          $helper->logToFile("INFO", "Executed command: $command", $logFile, true);
          $quoteId = getActiveQuoteId($customerId, $toPortId, $bookingNumberAssignDateTime);
          $quoteId = empty($quoteId) ? getFutureQuoteId($customerId, $toPortId, $bookingNumberAssignDateTime) : $quoteId;
          if (empty($quoteId)) {
              $helper->logToConsole("WARNING", "Active quote after generation not found. Skip healing.");
              continue;
          }
  
          fixExistingQuoteValidFromDate($quoteId, $bookingNumberAssignDateTime);
      }
  
      if (empty($activeQuoteId) && !empty($futureQuoteId)) {
          $helper->logToConsole("INFO", "Customer '$customerId - $customerName' have no active quote, but exist future quote ID# $futureQuoteId to destination port '$toPortId - $toPortName'.");
          fixExistingQuoteValidFromDate($futureQuoteId, $bookingNumberAssignDateTime);
      }
  
      if (!empty($activeQuoteId) && empty($futureQuoteId)) {
          $helper->logToConsole("INFO", "Customer '$customerId - $customerName' have active quote ID# $activeQuoteId, but no future quote to destination port '$toPortId - $toPortName'.");
          fixExistingQuoteValidFromDate($activeQuoteId, $bookingNumberAssignDateTime);
      }
  
      // Check if after changes loading works ok:
      if (!checkLoadingQuotesByReferenceNo($curlAtlantic, $referenceNo)) {
          $helper->logToFile("ERROR", "Loading with Reference no. '$referenceNo' check failed.", $logFile, true);
          exit(1);
      }
      $helper->logToConsole("INFO", "Loading with Reference no. '$referenceNo' checked and no problems detected.");
  }
  
  $helper->logToConsole("INFO", "Finished quotes healer.");
  */
}

/**
 * Fix Dubai problem "53) Found open native invoices with paid related original invoice.".
 */
function AecErpHealersFixDubayProblem53() {
  // Check if in Dubai we have "53) Found open native invoices with paid related original invoice.":
  dubaiLiveCookies = apiAecErpLogin(SERVER_DUBAI_LIVE_ERP_URL, SERVER_DUBAI_LIVE_ERP_USER1, SERVER_DUBAI_LIVE_ERP_USER1_PASS);
  let checkOpenNativeInvoicesWithPaidRelatedOriginalInvoiceResult = apiAecErpCallProblemsCheckerCommand(SERVER_DUBAI_LIVE_ERP_URL, dubaiLiveCookies, 'checkOpenNativeInvoicesWithPaidRelatedOriginalInvoice');

  if (checkOpenNativeInvoicesWithPaidRelatedOriginalInvoiceResult.response.data[0] != "No data.") {
    checkOpenNativeInvoicesWithPaidRelatedOriginalInvoiceResult.response.data.forEach(function (problemsDataItem) {
      var invoiceFetchResult = apiAecErpDataSourceFetch(SERVER_DUBAI_LIVE_ERP_URL, dubaiLiveCookies, 'DataSource\\Accountant\\Invoicing\\InvoiceDataSource', '{"id":' + problemsDataItem.dubai_invoice_id + '}');

      if (parseInt(invoiceFetchResult.response.status) === 0) {
        invoiceFetchResult.response.data.forEach(function (invoiceDataItem) {
          var invoiceId = invoiceDataItem.id;
          var amount = invoiceDataItem['#priceToPay'].amount;
          var currency = invoiceDataItem['#priceToPay'].currency;
          var internalNote = "Invoice Nr.: " + invoiceDataItem.invoiceNr + " advanced payment created in ERP system, because external invoices was paid outside " + amount + " " + currency + " (Original invoice id: " + invoiceDataItem.nativeCurrencyInvoiceCreatedFrom + ").";
          var paymentCreateData = '{"isShortPayment":false,"#showAllCustomers":false,"#showAllInvoices":true,"pendingPayment":false,"paymentBranch":10,"paidAt":"' + (new Date()).toISOString() + '","amount":{"amount":"' + amount + '","currency":"AED"},"createInvoices":false,"sendInvoices":false,"customer":' + invoiceDataItem.buyer + ',"paymentDocumentType":1,"receivedBy":' + invoiceDataItem.seller + ',"paymentMethodType":"cash","internalNote":"' + internalNote + '","#enteredApplications":{"' + invoiceId + '":{"invoiceId":' + invoiceId + ',"amountPaid":{"amount":"' + amount + '","currency":"AED"}}}}';

          var paymentAddResult = apiAecErpDataSourceAddData(SERVER_DUBAI_LIVE_ERP_URL, dubaiLiveCookies, 'DataSource\\Accountant\\Payments\\PaymentListDataSource', paymentCreateData);

          if (parseInt(paymentAddResult.response.status) === 0) {
            helpersAddLogEntryToFirstLine('INFO', 'Dubai: Added new payment id ' + paymentAddResult.response.data.id + ' (amount: ' + amount + ' ' + currency + ') to Dubai invoice id ' + invoiceId + '.');
          }
          else {
            console.error("ERROR: " + paymentAddResult.response.data.error.message);
            helpersAddLogEntryToFirstLine('ERROR', 'New payment to Dubai invoice id ' + invoiceDataItem.id + ' adding failed with error: ' + paymentAddResult.response.data.error.message);
          }
        });
      }
      else {
        console.error("ERROR: " + invoiceFetchResult.response.data.error.message);
        helpersAddLogEntryToFirstLine('ERROR', 'Invoice id ' + invoiceDataItem.id + ' fetch from Dubai failed with error: ' + invoiceFetchResult.response.data.error.message);
      }
    });
  }
}
