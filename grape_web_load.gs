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
    var groupID = '';
    var groupDesc = '';
    var blockCode = '';
    var idx1 = -1;
    var idx2 = -1;

    if (typeof idGroups != 'undefined') {
      for (var n = 0; n < idGroups.length; n++) {
        for (var m = 0; m < idGroups[n].length; m++) {
          if (idGroups[n][m] == blockIDs[i][0]) break
        }
        if (idGroups[n][m] == blockIDs[i][0]) break
      }
      blockCode = idGroups[n][32];
      groupID = idGroups[n][46];
      idx1 = n;
    }
    n = 0;
    m = 0;

    if (typeof mapGroups != 'undefined' && idx1 >= 0 ) {
      for (var n = 0; n < mapGroups.length; n++) {
        for (var m = 0; m < mapGroups[n].length; m++) {
          if (mapGroups[n][m] == groupID) break
        }
        if (mapGroups[n][m] == groupID) break
      }
      groupDesc = mapGroups[n][1];
      idx2 = n;
    }
    
    newRow = [];
    if ( blockIDs[i] && idx1 && idx2 ) {
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
