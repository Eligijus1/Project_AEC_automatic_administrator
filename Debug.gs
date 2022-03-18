function debug() {
  /*
  let description = "";
  description += "{color:#ff5630}*Atlantic:*{color}";
  description += "\n\n";
  description += "\n\n";
  description += "\n\n";
  description += "{color:#ff5630}*Dubai:*{color}";
  description += "\n\n";
  description += "\n\n";
  jiraApiCreateSubtask("AECP", "AECP-484", Utilities.formatDate(new Date(), SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy-MM-dd") + " reported issues", description, "10003");
  */

  //
  // "epic test\n*dssdf*\n{color:#ff5630}dfa{color}"
  /*
  let atlanticTodayWorkLogIds = getJiraApiAtlanticTodayWorkLogIds();
  let timeSpentSeconds = getJiraApiAtlanticTotalWorkHoursByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, 'eligijus.stugys@nfq.lt');
  console.info(timeSpentSeconds);
  */

  /*
  let userProperties = PropertiesService.getUserProperties();
  let MILLIS_PER_DAY = 1000 * 60 * 60 * 24;
  let now = new Date();
  let yesterday = new Date(now.getTime() - MILLIS_PER_DAY);
  let dayStartDateTime = new Date(yesterday.setHours(0, 0, 0, 0));
  let dayStartUnixFormat = dayStartDateTime.getTime().toString();
  let encCred = Utilities.base64Encode(userProperties.getProperty('JIRA_ATLANTIC_USER') + ':' + userProperties.getProperty('JIRA_ATLANTIC_PASSWORD'));
  let url = userProperties.getProperty('JIRA_ATLANTIC_HOST') + "/rest/api/3/worklog/updated?since=" + dayStartUnixFormat;
  let headers = { "Authorization": "Basic " + encCred };

  let options = {
    "method": "GET",
    "contentType": "application/json",
    "headers": headers
  };

  let response = UrlFetchApp.fetch(url, options);
  let parsedResponse = JSON.parse(response);
  
  let worklogIds = [];

  if (parsedResponse.values.length > 0) {
    parsedResponse.values.forEach(function (value) {
      //worklogIds.push(value.worklogId.toString());
        Logger.log(value);
    });
  }
  */

  /*
  let atlanticTodayWorkLogIds = getJiraApiAtlanticTodayWorkLogIds();
  let issueIds = getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, 'eligijus.stugys@nfq.lt');
  let issuesKeys = getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds);

  Logger.log(issuesKeys);
  */

  // https://stackoverflow.com/questions/19223823/google-script-trigger-weekdays-only/19230690

  /*
    Logger.log(ScriptApp.WeekDay.MONDAY);
    Logger.log(ScriptApp.WeekDay.TUESDAY);
    Logger.log(ScriptApp.WeekDay.WEDNESDAY);
    Logger.log(ScriptApp.WeekDay.THURSDAY);
    Logger.log(ScriptApp.WeekDay.FRIDAY);
    Logger.log(ScriptApp.WeekDay.SATURDAY);
    Logger.log(ScriptApp.WeekDay.SUNDAY);
  */

  // https://spreadsheet.dev/user-input-in-google-sheets-using-prompts

  /*
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = activeSpreadsheet.getSheetByName("Log");
  let lastMessageDateTime = activeSheet.getRange('A1').getDisplayValue();
  let today = new Date();
  let currentDayOfWeek = today.getDay();

  Logger.log('2021.10.11 17:08:53: ' + (new Date('2021.10.11 17:08:53')).getDay());
  Logger.log('2021.10.12 17:08:53: ' + (new Date('2021.10.12 17:08:53')).getDay());
  Logger.log('2021.10.13 17:08:53: ' + (new Date('2021.10.13 17:08:53')).getDay());
  Logger.log('2021.10.14 17:08:53: ' + (new Date('2021.10.14 17:08:53')).getDay());
  Logger.log('2021.10.15 17:08:53: ' + (new Date('2021.10.15 17:08:53')).getDay());
  Logger.log('2021.10.16 17:08:53: ' + (new Date('2021.10.16 17:08:53')).getDay());
  Logger.log('2021.10.17 17:08:53: ' + (new Date('2021.10.17 17:08:53')).getDay());
  Logger.log('2021.10.18 17:08:53: ' + (new Date('2021.10.18 17:08:53')).getDay());
  */

  /*
  Logger.log(Utilities.formatDate(today, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy.MM.dd HH:mm:ss"));
  Logger.log(currentDayOfWeek);
  Logger.log(lastMessageDateTime);
  Logger.log((new Date(lastMessageDateTime)).getDay());
  */

  /*
  5:08:53 PM	Info	2021.10.11 17:08:53
  5:08:53 PM	Info	1.0
  5:08:53 PM	Info	2021.10.10 18:14:26
  5:08:53 PM	Info	0.0
  */

  /*
  let activeSpreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  let activeSheet = activeSpreadsheet.getSheetByName("Log");
  let lastMessage = activeSheet.getRange('C1').getDisplayValue();
  Logger.log(lastMessage);
  */

  /*
  var widget = HtmlService.createHtmlOutput("<h1>Sidebar</h1>");
  SpreadsheetApp.getUi().showSidebar(widget);
  */

  /*
  var ui = SpreadsheetApp.getUi();
  var result = ui.prompt("Please enter your name");
  Logger.log(result.getResponseText());
  */

  /*
  // Display a dialog box with a title, message, input field, and "Yes" and "No" buttons. The
  // user can also close the dialog by clicking the close button in its title bar.
  var ui = DocumentApp.getUi();
  var response = ui.prompt('Getting to know you', 'May I know your name?', ui.ButtonSet.YES_NO);

  // Process the user's response.
  if (response.getSelectedButton() == ui.Button.YES) {
    Logger.log('The user\'s name is %s.', response.getResponseText());
  } else if (response.getSelectedButton() == ui.Button.NO) {
    Logger.log('The user didn\'t want to provide a name.');
  } else {
    Logger.log('The user clicked the close button in the dialog\'s title bar.');
  }
  */

  // Logger.log(Utilities.formatDate(dayStartDateTime, SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy.MM.dd HH:mm:ss"));
  // Logger.log(dayStartUnixFormat);
  // let userProperties = PropertiesService.getUserProperties();
  // let data = userProperties.getProperties();
  // Logger.log(userProperties.getProperty('JIRA_NFQ_HOST'));
  // addLogEntry("INFO", "Test");
  // addLogEntry("WARNING", "Test");
  // addLogEntry("ERROR", "Test");

  /*
    // Create a new form, then add a checkbox question, a multiple choice question,
    // a page break, then a date question and a grid of questions.
    var form = FormApp.create('New Form');
    var item = form.addCheckboxItem();
    item.setTitle('What condiments would you like on your hot dog?');
    item.setChoices([
      item.createChoice('Ketchup'),
      item.createChoice('Mustard'),
      item.createChoice('Relish')
    ]);
    form.addMultipleChoiceItem()
      .setTitle('Do you prefer cats or dogs?')
      .setChoiceValues(['Cats', 'Dogs'])
      .showOtherOption(true);
    form.addPageBreakItem()
      .setTitle('Getting to know you');
    form.addDateItem()
      .setTitle('When were you born?');
    form.addGridItem()
      .setTitle('Rate your interests')
      .setRows(['Cars', 'Computers', 'Celebrities'])
      .setColumns(['Boring', 'So-so', 'Interesting']);
    Logger.log('Published URL: ' + form.getPublishedUrl());
    Logger.log('Editor URL: ' + form.getEditUrl());
  */
}