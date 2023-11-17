/**
 * Register task about daily reported issues.
 */
function registerTaskAboutDailyReportedIssues() {
  let aecErpProblemsReportTaskGenerator = new AecErpProblemsReportTaskGenerator();

  let taskDescription = aecErpProblemsReportTaskGenerator.getTaskDescription();

  console.info("Extracted task description.");

  caseUrl = jiraApiAtlanticCreateSubtask("AECP", "AECP-484", Utilities.formatDate(new Date(), SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone(), "yyyy-MM-dd") + " reported issues", taskDescription, "10003");

  console.info("Case URL:", caseUrl);
  addLogEntryToFirstLine("INFO", "Created case URL:" + caseUrl);
}
