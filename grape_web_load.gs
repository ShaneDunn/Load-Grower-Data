function getNewBlocks() {
  getBlockIDs();
  removeBlockIDs();
  loadSheet();
  exportSheet();
};

function removeBlockIDs() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var htmlDlg = HtmlService.createHtmlOutputFromFile('grapeweb_load').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ss.show(htmlDlg);
};

function functionToRunOnFormSubmit(fromInputForm) {
  var ss = SpreadsheetApp.getActive();
  Logger.log(fromInputForm);
  ss.getSheetByName("Grapeweb_Load").getRange(2, 2, 1, 1).setValue(fromInputForm);
  ss.getSheetByName("Grapeweb_Load").getRange(3, 3, 1, 1).setValue("www");
};

function getLastRow(sheet, column) {
  var range  = sheet.getRange(column + "1:" + column);
  var values = range.getValues();
  var newarr = [];
  var count  = 0;
  for (var i = 0; i < range.getLastRow(); i++) {
    if (values[i][0]) {
      newarr.push(values[i][0]);
    }
  }
  return newarr.length;
};

function getBlockIDsFromSheet() {
  var ss = SpreadsheetApp.getActive();
  var missingBlockids     = ss.getSheetByName("Grapeweb ID Mapping");
  var blockIDsArrayLength = getLastRow(missingBlockids, "G");
  var blockIDs            = missingBlockids.getRange(1, 7, blockIDsArrayLength,1).getValues();
  Logger.log(blockIDsArrayLength);
  Logger.log(missingBlockids);
  return blockIDs;
};
