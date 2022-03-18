/**
 * Time trigger method, to copy registered hours from Atlantic JIRA to NFQ JIRA.
 */
function registerHoursToNfqJira() {
  //let issueIdOrKey = 'AECP-7989';// Eligijus worklog 2021
  let issueIdOrKey = 'AECP-8036';  // Eligijus worklog 2022
  let email = 'eligijus.stugys@nfq.lt';

  let atlanticTodayWorkLogIds = getJiraApiAtlanticTodayWorkLogIds();
  let issueIds = getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let timeSpentSeconds = getJiraApiAtlanticTotalWorkHoursByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let issuesKeys = getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds);

  if (issuesKeys.length > 0) {
    let csvString = issuesKeys.join(",");
    let message = "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: " + csvString;
    addLogEntryToFirstLine("INFO", message);
    addJiraApiNfqWorklogEntry(issueIdOrKey, timeSpentSeconds, message);
  }
}

/**
 * Register task about daily reported issues.
 */
function registerTaskAboutDailyReportedIssues() {
  let description = "";
  
  description += "{color:#ff5630}*Atlantic:*{color}";
  description += "\n\n";
  description += "\n\n";
  description += "\n\n";
  description += "{color:#ff5630}*Dubai:*{color}";
  description += "\n\n";
  description += "\n\n";

  jiraApiCreateSubtask("AECP", "AECP-484", Utilities.formatDate(new Date(), SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy-MM-dd") + " reported issues", description, "10003");
}
