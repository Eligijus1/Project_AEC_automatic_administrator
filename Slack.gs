// https://api.slack.com/apps/A02GZ5K7CBC?created=1
// https://api.slack.com/authentication/basics#scopes
// https://atlanticexpress.slack.com/apps/A02GXCMNWBG-eligijus-stugys?next_id=0
// https://api.slack.com/web#basics
// https://api.slack.com/reference/surfaces/formatting
// 'U011CDA19RV' - "Eligijus Stugys" personal message
// 'C01R7B7FPUG' - "standup" channel

/**
 * Test mesage posting.
 */
function testPostInformationToAecChannel() {
  let text = "*Eligijus Stugys* posted an update for *Daily Standup*";
  text += "\n>";
  text += "*What did you do since yesterday?*";
  text += "\n>";
  text += "Worked on Atlantic JIRA (https://atlanticexp.atlassian.net) cases: AECP-67,AEWL2-181";
  text += "\n";
  text += "\n>";
  text += "*What will you do today?*";
  text += "\n>";
  text += "Current Atlantic JIRA in progress cases.";

  // #439FE0

  postInformationToAecChannel('U011CDA19RV', text);
}

/**
 * Post message to specified AEC channel.
 */
function postInformationToAecChannel(channel, text) {
  let userProperties = PropertiesService.getUserProperties();
  let url = 'https://slack.com/api/chat.postMessage';

  let requestData = {
    "channel": channel,
    "text": text
  };

  let options = {
    "method": "POST",
    "headers": { 'Authorization': 'Bearer ' + userProperties.getProperty('SLACK_ATLANTIC_BEARER'), 'Content-Type': 'application/json' },
    "payload": JSON.stringify(requestData)
  };

  let response = UrlFetchApp.fetch(url, options);
  let parsedResponse = JSON.parse(response);

  //Logger.log(response);
  //Logger.log(parsedResponse);
}

/**
 * Post message to AEC slack channel "standup" (C01R7B7FPUG).
 */
function prepareMessageAndPostToAecSlackStandupChannel(lastMessage) {
  let standupChannelId = 'C01R7B7FPUG';
  let text = "*Eligijus Stugys* posted an update for *Daily Standup*";
  text += "\n>";
  text += "*What did you do since yesterday?*";
  text += "\n>";
  text += lastMessage;
  text += "\n";
  text += "\n>";
  text += "*What will you do today?*";
  text += "\n>";
  text += "Current Atlantic JIRA in progress cases.";

  postInformationToAecChannel(standupChannelId, text);
}
