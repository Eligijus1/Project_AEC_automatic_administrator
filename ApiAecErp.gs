/**
 * Login to specified "AEC ERP" system.
 */
function apiAecErpLogin(serverUrl, user, password) {
  let options = {
    "method": "POST",
    "payload": {
      "command": 'System\\Command\\Auth\\LoginCommand',
      "arguments": '{"username":"' + user + '","password":"' + password + '"}',
      "isc_tnum": 1
    }
  };

  let responseLogin = UrlFetchApp.fetch(serverUrl + '/backend/smartclient/rpc?isc_rpc=1&isc_v=v10.0p_2020-08-29&isc_xhr=1', options);

  //console.info("responseLogin.getAllHeaders():",responseLogin.getAllHeaders());

  return responseLogin.getAllHeaders()['Set-Cookie'].join(';');
}

/**
 * Call command, that will send test mail.
 */
function apiAecErpSendTestMail(serverUrl, cookies) {
  let options = {
    "method": "POST",
    "headers": {
      "Cookie": cookies
    },
    "payload": {
      "command": 'system.command.utils.test_email_command',
      "arguments": '{}',
      "isc_tnum": 1
    }
  };

  let url = serverUrl + '/backend/smartclient/rpc?isc_rpc=1&isc_v=v10.0p_2020-08-29&isc_xhr=1';

  let response = UrlFetchApp.fetch(url, options);

  return JSON.parse(response);
}

/**
 * Testing login and some extra operation.
 */
function apiAecErpTestLogin() {
  /*
  // Atlantic stage:
  let serverUrl = SERVER_ATLANTIC_STAGE_ERP_URL;
  let user = SERVER_ATLANTIC_STAGE_ERP_USER1;
  let password = SERVER_ATLANTIC_STAGE_ERP_USER1_PASS;
  */
  /*
  // Atlantic live:
  let serverUrl = SERVER_ATLANTIC_LIVE_ERP_URL;
  let user = SERVER_ATLANTIC_LIVE_ERP_USER1;
  let password = SERVER_ATLANTIC_LIVE_ERP_USER1_PASS;
  */
  // Dubai live:
  let serverUrl = SERVER_DUBAI_LIVE_ERP_URL;
  let user = SERVER_DUBAI_LIVE_ERP_USER1;
  let password = SERVER_DUBAI_LIVE_ERP_USER1_PASS;

  let url = serverUrl + '/backend/smartclient/rpc?isc_rpc=1&isc_v=v10.0p_2020-08-29&isc_xhr=1';

  let responseLogin = UrlFetchApp.fetch(url, {
    "method": "POST",
    "payload": {
      "command": 'System\\Command\\Auth\\LoginCommand',
      "arguments": '{"username":"' + user + '","password":"' + password + '"}',
      "isc_tnum": 1
    }
  });

  let cookies = responseLogin.getAllHeaders()['Set-Cookie'];

  Logger.log(cookies.join(';'));

  let responseTestMail = UrlFetchApp.fetch(url, {
    "method": "POST",
    "headers": {
      "Cookie": cookies.join(';')
    },
    "payload": {
      "command": 'System\\Command\\Utils\\TestEmailCommand',
      "arguments": '{}',
      "isc_tnum": 1
    }
  });

  Logger.log(responseTestMail);
}

/**
 * Call command, that will extract problems from specified KnownProblemsWatcher method.
 */
function apiAecErpCallProblemsCheckerCommand(serverUrl, cookies, method) {
  let options = {
    "method": "POST",
    "headers": {
      "Cookie": cookies
    },
    "payload": {
      "command": 'System\\Command\\Utils\\ProblemsCheckerCallingCommand',
      "arguments": '{"method": "' + method + '"}',
      "isc_tnum": 1
    }
  };

  let url = serverUrl + '/backend/smartclient/rpc?isc_rpc=1&isc_v=v10.0p_2020-08-29&isc_xhr=1';

  let response = UrlFetchApp.fetch(url, options);

  return JSON.parse(response);
}

/**
 * Call fetch from DataSource.
 */
function apiAecErpDataSourceFetch(serverUrl, cookies, dataSource, criteria, textMatchStyle = 'exact', operationId = []) {
  let response = UrlFetchApp.fetch(serverUrl + '/backend/smartclient/api', {
    "method": "POST",
    "headers": {
      "Cookie": cookies
    },
    "payload": {
      "data": criteria,
      "_operationType": 'fetch',
      "_operationId": operationId,
      '_useStrictJSON': false,
      '_textMatchStyle': textMatchStyle,
      '_dataSource': dataSource,
      'isc_metaDataPrefix': '_',
      'isc_dataFormat': 'json'
    }
  });

  return JSON.parse(response);
}

/**
 * Call DataSource add.
 */
function apiAecErpDataSourceAddData(serverUrl, cookies, dataSource, data) {
  let response = UrlFetchApp.fetch(serverUrl + '/backend/smartclient/api', {
    "method": "POST",
    "headers": {
      "Cookie": cookies
    },
    "payload": {
      "data": data,
      "_operationType": 'add',
      "_operationId": [],
      '_useStrictJSON': false,
      '_textMatchStyle': 'exact',
      '_dataSource': dataSource,
      'isc_metaDataPrefix': '_',
      'isc_dataFormat': 'json'
    }
  });

  return JSON.parse(response);
}

/**
 * Extract Reference data by specified referenceNo.
 */
function apiAecErpGetReferenceDataByReferenceNo(serverUrl, cookies, referenceNo) {
  let fetchResult = apiAecErpDataSourceFetch(serverUrl, cookies, 'DataSource\\Warehouse\\VinInventoryList\\ReferenceDataSource', '{"referenceNo":"' + referenceNo + '"}');

  if (parseInt(fetchResult.response.status) === 0) {
    return fetchResult.response.data[0]
  }
  else {
    console.error(fetchResult.response.data.error.message);
  }

  return null;
}

/**
 * Extract ocean freight customer quotes by customer and destination port.
 */
function apiAecErpGetActiveOceanFreightCustomerQuotesByCustomerAndDestinationPort(serverUrl, cookies, customerId, portId)
{
/*
data: [{"id":"s16","url":"/backend/smartclient/api","data":{"data":"{\"#filterCustomers\":14831,\"port\":2229}","_operationType":"fetch"
,"_operationId":"\"mixin: [{\\\"id\\\":\\\"DataSource\\\\\\\\Pricing\\\\\\\\OceanFreight\\\\\\\\Mixin\\\\\\\\OceanFreightCustomerQuoteListMixin\\\"
,\\\"args\\\":{}},{\\\"id\\\":\\\"DataSource\\\\\\\\Pricing\\\\\\\\Quote\\\\\\\\Mixin\\\\\\\\CustomerQuoteListMixin\\\",\\\"args\\\":{}}]\"","_startRow":0,"_endRow":75,"_sortBy":"[\"-id\"]","_useStrictJSON":false,"_textMatchStyle":"substring","_componentId":"isc_ListGrid_3"

,"_dataSource":"DataSource\\Pricing\\Quote\\CustomerQuoteDataSource","isc_metaDataPrefix":"_","isc_dataFormat":"json"}}]


All:
====
data":{"data":"{\"#filterCustomers\":14831,\"port\":2229,\"#filterByState\":\"3\"}
*/
}

