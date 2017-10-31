var crlf = String.fromCharCode(10);

// Use this code for Google Docs, Forms, or new Sheets.
function onOpen() {
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .createMenu('Dialog')
      .addItem('Open', 'openDialog')
      .addToUi();
}

function openDialog() {
  var html = HtmlService.createHtmlOutputFromFile('Index');
  html.setHeight(400);
  html.setWidth(600);
  SpreadsheetApp.getUi() // Or DocumentApp or FormApp.
      .showModalDialog(html, 'Load Grower Data');
}

function include(filename) {
  return HtmlService.createHtmlOutputFromFile(filename).getContent();
}

function serverUpload(form) {
  // try{
    var fileBlob = form.thefile;
    var jsonData = JSON.parse(fileBlob.getDataAsString());
    // serverUpload1(jsonData) // Growers
    // serverUpload2(jsonData) // Grapeweb
    serverUpload3(jsonData) // Vineyards and Growers
    // serverUpload4(jsonData) // Quick Contacts
    // serverUpload5(jsonData) // Blocks
    // serverUpload6(jsonData) // Grower Details
    return 'Completed';
  /*
  }catch(e){
    ss.toast(e.toString());
    return 'Error: ' + e.toString();
  }
  */
}

