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
  ss.getSheetByName("Grapeweb_Load").getRange(3, 3, 1, 1).setValue("hhf");
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

if (!Array.prototype.indexOf) {
  Array.prototype.indexOf = function (obj, fromIndex) {
    if (fromIndex == null) {
        fromIndex = 0;
    } else if (fromIndex < 0) {
        fromIndex = Math.max(0, this.length + fromIndex);
    }
    for (var i = fromIndex, j = this.length; i < j; i++) {
        if (this[i] === obj)
            return i;
    }
    return -1;
  };
}

function getBlockIDsFromSheet() {
  var ss = SpreadsheetApp.getActive();
  var logSheet             = ss.getSheetByName("sheet15");
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
 // logSheet.getRange(1, 1, idGroupsArrayLength, 48).setValues(idGroups);
 // logSheet.getRange(1, 50, 12, 2).setValues(mapGroups);


  Logger.log(mapGroups);
  
  for (var i = 0; i < blockIDs.length - 1; i++)
  {
    // get Group ID and name
    var thisRow = idGroups[i];
    // ui.alert(thisRow[46]);
    // logSheet.getRange(2, 46, 1, 1).setValues(thisRow[46]);
    var idx1 = idGroups.indexOf(blockIDs[i][0],30);
    if ( idx1 && idGroups ) {
      thisRow = idGroups[idx1];
      if (typeof myVar != 'undefined') {var groupID = thisRow[intCol];};
    }
    var idx2 = mapGroups.indexOf(groupID,0);
    if ( idx2 ) { var groupDesc = mapGroups[idx2][1]; }

    Logger.log(idx1);
    Logger.log(idx2);
    ui.alert(':' + idx1 + ':' + idx2 + ':' );

    newRow = [];
    if ( blockIDs[i] && idx1 && idx2 ) {
      newRow.push(blockIDs[i]);
      newRow.push(groupID);
      newRow.push(groupDesc);
      selectArray.push(newRow);
    }    
  }

  return selectArray;
};
