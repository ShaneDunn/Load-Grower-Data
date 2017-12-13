function getNewBlocks() {
  var ss      = SpreadsheetApp.getActiveSpreadsheet();
  var htmlDlg = HtmlService.createHtmlOutputFromFile('grapeweb_load').setSandboxMode(HtmlService.SandboxMode.IFRAME);
  ss.show(htmlDlg);
};

function functionToRunOnFormSubmit(fromInputForm) {
  Logger.log(fromInputForm);
  var ss         = SpreadsheetApp.getActive();
  var gwSheet    = ss.getSheetByName("Grapeweb");
  var glSheet    = ss.getSheetByName("Grapeweb_Load");
  var gwSheetLen = getLastRow(gwSheet, "C");
  var gwSheetIDs = gwSheet.getRange(1, 1, gwSheetLen, 48).getValues();
  var gwSheetID  = gwSheetIDs.map(function(value,index) { return value[30]; });
  var newIds     = fromInputForm.split(";");
  var newRow     = [];
  var glArray    = [];

  for (var i = 0; i < newIds.length; i++)
  {
    var idx1 = -1;
    newRow   = [];

    if (gwSheetID.indexOf(newIds[i].toString()) > -1) {
      idx1 = gwSheetID.indexOf(newIds[i].toString());
      newRow.push(gwSheetIDs[idx1]);
      glArray.push(gwSheetIDs[idx1]);
    }
  }
  Logger.log(glArray);
  Logger.log(glArray.length);
  Logger.log(glArray[0].length);
  
  glSheet.getRange(2, 1, glArray.length, glArray[0].length).setValues(glArray);
  
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
  var mappingSheet         = ss.getSheetByName("Grapeweb ID Mapping");
  var gwSheet              = ss.getSheetByName("Grapeweb");
  var blockIDsArrayLength  = getLastRow(mappingSheet, "G");
  var blockIDs             = mappingSheet.getRange(2, 7, blockIDsArrayLength,1).getValues();
  var idGroupsArrayLength  = getLastRow(gwSheet, "C");
  var idGroups             = gwSheet.getRange(1, 1, idGroupsArrayLength,48).getValues();
  var mapGroupsArrayLength = getLastRow(mappingSheet, "J");
  var mapGroups            = mappingSheet.getRange("J2:K13").getValues();
  var newRow = [];
  var selectArray = [];
  var intCol = 46;
  var ui = SpreadsheetApp.getUi();

  var idGroup =  idGroups.map(function(value,index) { return value[30]; });
  var mapGroup =  mapGroups.map(function(value,index) { return value[0]; });
  Logger.log(mapGroup);
  
  for (var i = 0; i < blockIDs.length; i++)
  {
    var groupID = '';
    var groupDesc = '';
    var blockCode = '';
    var idx1 = -1;
    var idx2 = -1;

    if (idGroup.indexOf(blockIDs[i][0].toString()) > -1) {
      idx1 = idGroup.indexOf(blockIDs[i][0].toString());
      blockCode = idGroups[idx1][32];
      groupID = idGroups[idx1][46];
    }

    if (idx1 > -1) {
      if (mapGroup.indexOf(groupID) > -1) {
        idx2 = mapGroup.indexOf(groupID);
        groupDesc = mapGroups[idx2][1];
      }
    }

    newRow = [];
    if ( idx1 > -1 && idx2 > -1 ) {
      newRow.push(blockIDs[i][0]);
      newRow.push(groupID);
      newRow.push(groupDesc);
      newRow.push(blockCode);
      selectArray.push(newRow);
    }
  }
  selectArray.sort(function(a, b) {
    var c = a[1], d = b[1];
    if(c === d) {
      var x = a[3], y = b[3];
      return x < y ? -1 : x > y ? 1 : 0;
    }
    return c < d ? -1 : c > d ? 1 : 0;
  });

  return selectArray;
};
