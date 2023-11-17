/**
 * Time trigger method, to copy registered hours from Atlantic JIRA to NFQ JIRA.
 */
function registerHoursToNfqJira() {
  /*
  //let issueIdOrKey = 'AECP-7989';// Eligijus worklog 2021
  //let issueIdOrKey = 'AECP-8036';// Eligijus worklog 2022
  let issueIdOrKey = 'AECP-8097';  // Eligijus worklog 2023
  let email = 'eligijus.stugys@nfq.com';

  let atlanticTodayWorkLogIds = getJiraApiAtlanticTodayWorkLogIds();
  let issueIds = getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let timeSpentSeconds = getJiraApiAtlanticTotalWorkHoursByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let issuesKeys = getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds);

  //DEBUG:
  //Logger.log(atlanticTodayWorkLogIds);
  //Logger.log(issueIds);
  //Logger.log(issuesKeys);

  if (issuesKeys.length > 0) {
    let csvString = issuesKeys.join(",");
    let message = "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: " + csvString;
    addLogEntryToFirstLine("INFO", message);
    addJiraApiNfqWorklogEntry(issueIdOrKey, timeSpentSeconds, message);
  }
  */
}

function registerHoursManual() {
  let issueIdOrKey = 'AECP-8097';  // Eligijus worklog 2023
  let email = 'eligijus.stugys@nfq.com';
  let dayToday = new Date(new Date().setHours(0, 0, 0, 0));// Today
  let dayYesterday = new Date(new Date(new Date().setDate(new Date().getDate() - 1)).setHours(0, 0, 0, 0));

  let atlanticTodayWorkLogIds = getJiraApiAtlanticWorkLogIds(dayYesterday);
  let issueIds = getJiraApiAtlanticIssuesByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let timeSpentSeconds = getJiraApiAtlanticTotalWorkHoursByWorkLogIdsAndAuthorEmail(atlanticTodayWorkLogIds, email);
  let issuesKeys = getJiraApiAtlanticWorkedIssuesKeysByIssuesIds(issueIds);

  //DEBUG:
  Logger.log(dayToday);
  Logger.log(dayYesterday);
  Logger.log(atlanticTodayWorkLogIds);
  Logger.log(issueIds);
  Logger.log(issuesKeys);

  if (issuesKeys.length > 0) {
    let csvString = issuesKeys.join(",");
    let message = "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: " + csvString;
    addLogEntryToFirstLine("INFO", message);
    addJiraApiNfqWorklogEntry(issueIdOrKey, timeSpentSeconds, message);
  }
}