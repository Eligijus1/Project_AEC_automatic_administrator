/**
 * Add log entry to sheet "Log" first line.
 */
function addLogEntryToFirstLine(type, message) {
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = activeSpreadsheet.getSheetByName("Log");
  let typeColor = '#000000';

  activeSheet.insertRowsBefore(activeSheet.getRange('A1').getRow(), 1);

  switch (type) {
    case "WARNING":
      typeColor = '#ffa500';
      break;
    case "ERROR":
      typeColor = '#ff0000';
      break;
    default:
      typeColor = '#000000';
      break;
  }

  activeSheet.getRange('A1').offset(0, 0).setValue(Utilities.formatDate(new Date(), activeSpreadsheet.getSpreadsheetTimeZone(), "yyyy.MM.dd HH:mm:ss"));
  activeSheet.getRange('B1').offset(0, 0).setValue(type);
  activeSheet.getRange('B1').offset(0, 0).setTextStyle(SpreadsheetApp.newTextStyle().setUnderline(false).setBold(true).setForegroundColor(typeColor).build());
  activeSheet.getRange('C1').offset(0, 0).setValue(message);
}

/**
 * Add log entry to sheet "Log".
 */
function addLogEntry(type, message) {
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = activeSpreadsheet.getSheetByName("Log");
  let bRangeValues = activeSheet.getRange('A:A').getValues();
  let counter = 0;
  let typeColor = '#000000';

  while (bRangeValues[counter] && bRangeValues[counter][0] != "") {
    counter++;
  }

  counter++;

  switch (type) {
    case "WARNING":
      typeColor = '#ffa500';
      break;
    case "ERROR":
      typeColor = '#ff0000';
      break;
    default:
      typeColor = '#000000';
      break;
  }

  activeSheet.getRange('A' + counter).offset(0, 0).setValue(Utilities.formatDate(new Date(), activeSpreadsheet.getSpreadsheetTimeZone(), "yyyy.MM.dd HH:mm:ss"));
  activeSheet.getRange('B' + counter).offset(0, 0).setValue(type);
  activeSheet.getRange('B' + counter).offset(0, 0).setTextStyle(SpreadsheetApp.newTextStyle().setUnderline(false).setBold(true).setForegroundColor(typeColor).build());
  activeSheet.getRange('C' + counter).offset(0, 0).setValue(message);
}

/**
 * Time trigger method, to add report message to 'C01R7B7FPUG' "standup" channel. 
 * NOTE: This method can run only in working days.
 */
function addAecStandupSlackCommentAboutWork() {
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = activeSpreadsheet.getSheetByName("Log");
  let lastMessageDateTimeString = activeSheet.getRange('A1').getDisplayValue();
  let lastMessageDateTime = (new Date(lastMessageDateTimeString));
  let lastMessage = activeSheet.getRange('C1').getDisplayValue();
  let today = new Date();
  let todayMinus3 = new Date(today.getTime() - ((24 * 60 * 60 * 1000) * 3));

  if (today.getDay() === 1 && todayMinus3.getDay() === lastMessageDateTime.getDay()) {
    prepareMessageAndPostToAecSlackStandupChannel(lastMessage);
    Logger.log("Added 'Daily Standup' slack message, because: Today===MONDAY and we have message in FRIDAY.");
    return;
  }

  if (today.getDay() > 1 && today.getDay() < 6 && (today.getDay() - 1) === lastMessageDateTime.getDay()) {
    prepareMessageAndPostToAecSlackStandupChannel(lastMessage);
    Logger.log("Added 'Daily Standup' slack message, because: Today in (TUESDAY,WEDNESDAY,THURSDAY,FRIDAY) AND we have message yesterday.");
    return;
  }

  Logger.log("Nothing added to 'Daily Standup' slack message. today.getDay()=" + today.getDay() + "; lastMessageDateTime.getDay()=" + lastMessageDateTime.getDay() + "; todayMinus3.getDay()=" + todayMinus3.getDay());
}

/**
 * Helper method.
 */
function helperRegisterYesterdayHoursToSheet() {
  let atlanticTodayWorkLogIds = getJiraApiAtlanticYesterdayWorkLogIds();
  let issueIds = getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, 'eligijus.stugys@nfq.lt');
  let issuesKeys = getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds);

  if (issuesKeys.length > 0) {
    let csvString = issuesKeys.join(",");
    let message = "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: " + csvString;
    addLogEntryToFirstLine("INFO", message);
  }
}
