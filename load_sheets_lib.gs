function transpose(a)
{
  return Object.keys(a[0]).map(function (c) { return a.map(function (r) { return r[c]; }); });
}

function isDefined(x) {
  var undefined;
  return x !== undefined;
}

function loadAddress(ln1, ln2, ln3, cty, st, pc) {
  var address    = "";
  var addressln4 = "";
  var sep1       = "";
  var sep2       = "";

  if ( ln1 !== 'undefined' && ln1.trim() !== "") {
    address = ln1.trim();
    sep1 = crlf;
  }
  if ( ln2 !== 'undefined' && ln2.trim() !== "") {
    address = address + sep1 + ln2.trim();
    sep1 = crlf;
  }
  if ( ln3 !== 'undefined' && ln3.trim() !== "") {
    address = address + sep1 + ln3.trim();
    sep1 = crlf;
  }
  if ( cty !== 'undefined' && cty.trim() !== "") {
    addressln4 = cty.trim();
    sep2 = " ";
  }
  if ( st  !== 'undefined' && st.trim()  !== "") {
    addressln4 = addressln4 + sep2 + st.trim();
    sep2 = " ";
  }
  if ( pc  !== 'undefined' && pc.trim()  !== "") {
    addressln4 = addressln4 + sep2 + pc.trim();
  }
  if ( addressln4 !== "") {
    address = address + sep1 + addressln4;
  }
  return address;
}

function loadContact(cnt, mob, phn, fax, eml) {
  var contact = "";
  var sep     = "";

  if ( cnt !== 'undefined' && cnt.trim() !== "") {
    contact = cnt.trim();
    sep = crlf;
  }
  if ( mob !== 'undefined' && mob.trim() !== "") {
    contact = contact + sep + phonePrefix("(P)", formatPhoneNumber(mob));
    sep = crlf;
  }
  if ( phn !== 'undefined' && phn.trim() !== "") {
    contact = contact + sep + phonePrefix("(P)", formatPhoneNumber(phn));
    sep = crlf;
  }
  if ( fax !== 'undefined' && fax.trim() !== "") {
    contact = contact + sep + phonePrefix("(F)", formatPhoneNumber(fax));
    sep = crlf;
  }
  if ( eml !== 'undefined' && eml.trim() !== "") {
    contact = contact + sep + "(E) " + eml.trim();
  }
  return contact;
}

function phonePrefix(prefix, number) {
  if (typeof(number) !== 'undefined' && number !== null && number.trim() !== "") {
    switch (number.substr(0,2)) {
      case '04':
        return "(M) " + number.trim();
      default:
        return prefix + " " + number.trim();
    }
    return prefix + " " + number.trim();
  }
  return "";
}

function loadAddress2(ln1, ln2) {
  var address = "";

  if ( ln1 !== 'undefined' && ln1.trim() !== "") {
    address = ln1.trim();
  }
  if ( ln2 !== 'undefined' && ln2.trim() !== "") {
    if (address !== "") {
      address = address + " " + ln2.trim();
    } else {
      address = ln2.trim();
    }
  }
  return address;
}

function loadHAemail(em1) {
  var contact = "";
  var sep     = "";

  if ( em1 !== 'undefined' && em1.trim() !== "") {
    contact = em1.trim();
    if (contact.indexOf(",") !== -1) {
      contact = contact.replace(/,/g , " ");
    }
    if (contact.indexOf(" ") !== -1) {
      sep = crlf;
      contact = contact.replace(/ +/g , sep);
    }
  }
  return contact;
}

function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m  = [];
  switch (s2.length) {
    case 6:
      m = s2.match(/^(\d{2})(\d{4})$/);
      return (!m) ? null : m[1] + " " + m[2];
      // s2.substr(0,4)+" "+s2.substr(4,4);
      break;
    case 8:
      m = s2.match(/^(\d{4})(\d{4})$/);
      return (!m) ? null : "(00) " + m[1] + " " + m[2];
      // s2.substr(0,4)+" "+s2.substr(4,4);
      break;
    case 10:
      switch (s2.substr(0,2)) {
        case '13':
        case '04':
          m = s2.match(/^(\d{4})(\d{3})(\d{3})$/);
          return (!m) ? null : "" + m[1] + " " + m[2] + " " + m[3];
          // s2.substr(0,4)+" "+s2.substr(4,3)+" "+s2.substr(7,3);
        default:
          m = s2.match(/^(\d{2})(\d{4})(\d{4})$/);
          return (!m) ? null : "(" + m[1] + ") " + m[2] + " " + m[3];
          // "("+s2.substr(0,2)+") "+s2.substr(2,4)+" "+s2.substr(6,4);
      }
      break;
    default:
      return (!s2) ? null : s2;
  }
  return (!s2) ? null : s2;
 }

function formatPhoneNumberM(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m  = s2.match(/^(\d{4})(\d{3})(\d{3})$/);
  return (!m) ? null : "" + m[1] + " " + m[2] + " " + m[3];
}

function formatPhoneNumberP(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m  = s2.match(/^(\d{2})(\d{4})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + " " + m[3];
}

function formatGwEmail(email, first, last) {
  var em1 = "";
  if ( first !== 'undefined' && first.trim() !== "") {
    first = "Unknown";
  }
  if ( last !== 'undefined' && last.trim() !== "") {
    last = "Person";
  }
  Logger.log("Email: %s| First: %s| Last: %s|", email, first, last);
  if ( email !== 'undefined' && email.trim() !== "") {
    // Logger.log("Index: %s| Logical: %s",email.indexOf("@"), (email.indexOf("@") !== -1));
    if (email.indexOf("@") != -1) {
      var em2 = email.split("@");
      if (email == "acc_pay@debortoli.com.au") {
        em1 = first + "_" + last + "@nomail.com";
      } else {
        em1 = email.trim();
      }
    } else { // a fax no
      em1 = first + "_" + last + "@nomail.com";
    }
  } else {
    em1 = first + "_" + last + "@nomail.com";
  }
  return em1;
}

function getVarietyMap(variety) {
  var gwVariety = "";
  switch (variety) {
    case 'Arneis'                  : gwVariety = "Arneis"             ; break;
    case 'Barbera'                 : gwVariety = "Barbera"            ; break;
    case 'Brown Frontignac'        : gwVariety = "Brown Muscat"       ; break;
    case 'Cabernet Franc'          : gwVariety = "Cabernet Franc"     ; break;
    case 'Cabernet Sauvignon'      : gwVariety = "Cabernet Sauvignon" ; break;
    case 'Cardinal'                : gwVariety = "Cardinal"           ; break;
    case 'Carmenere'               : gwVariety = "Carmenere"          ; break;
    case 'Chambourcin'             : gwVariety = "Chambourcin"        ; break;
    case 'Chardonnay'              : gwVariety = "Chardonnay"         ; break;
    case 'Chenin Blanc'            : gwVariety = "Chenin Blanc"       ; break;
    case 'Colombard'               : gwVariety = "Colombard"          ; break;
    case 'Cornichon'               : gwVariety = "Purple Cornichon"   ; break;
    case 'Crouchen'                : gwVariety = "Crouchen"           ; break;
    case 'Currant (Carina)'        : gwVariety = "Carina Currants"    ; break;
    case 'Currant (Zante)'         : gwVariety = "Zante Currant"      ; break;
    case 'Dolcetto'                : gwVariety = "Dolcetto"           ; break;
    case 'Doradillo'               : gwVariety = "Doradillo"          ; break;
    case 'Durif'                   : gwVariety = "Durif"              ; break;
    case 'Fiano'                   : gwVariety = "Fiano"              ; break;
    case 'Flame Seedless'          : gwVariety = "Flame Seedless"     ; break;
    case 'Fresh Mixed Red'         : gwVariety = "Not Mapped"         ; break;
    case 'Fresh Mixed White'       : gwVariety = "Not Mapped"         ; break;
    case 'Frontignan Red'          : gwVariety = "Red Frontignac"     ; break;
    case 'Frontignan White'        : gwVariety = "White Frontignac"   ; break;
    case 'Gamay'                   : gwVariety = "Gamay"              ; break;
    case 'Greco'                   : gwVariety = "Greco di Tufo"      ; break;
    case 'Grenache'                : gwVariety = "Grenache"           ; break;
    case 'Grenache Blanc'          : gwVariety = "Grenache gris"      ; break;
    case 'Malbec'                  : gwVariety = "Malbec"             ; break;
    case 'Marsanne'                : gwVariety = "Marsanne"           ; break;
    case 'Marzemino'               : gwVariety = "Marzemino"          ; break;
    case 'Mataro'                  : gwVariety = "Mataro"             ; break;
    case 'Menindee Seedless'       : gwVariety = "Menindee Seedless"  ; break;
    case 'Merlot'                  : gwVariety = "Merlot"             ; break;
    case 'Montepulciano'           : gwVariety = "Montepulciano"      ; break;
    case 'Moscato Giallo'          : gwVariety = "Moscato Giallo"     ; break;
    case 'Muscadelle'              : gwVariety = "Muscadelle"         ; break;
    case 'Muscat Gordo Blanco'     : gwVariety = "Muscat Gordo Blanco"; break;
    case 'Muscat Hamburg'          : gwVariety = "Muscat"             ; break;
    case 'Muscat Rouge a Petit Gr' : gwVariety = "Muscat Petit Grains"; break;
    case 'Nebbiolo'                : gwVariety = "Nebbiolo"           ; break;
    case 'Palomino'                : gwVariety = "Palomino"           ; break;
    case 'Pedro Ximenes'           : gwVariety = "Pedro Ximenes"      ; break;
    case 'Petit Verdot'            : gwVariety = "Petit Verdot"       ; break;
    case 'Pinot Blanc'             : gwVariety = "Pinot Blanc"        ; break;
    case 'Pinot Gris'              : gwVariety = "Pinot Gris"         ; break;
    case 'Pinot Meunier'           : gwVariety = "Pinot Meunier"      ; break;
    case 'Pinot Noir'              : gwVariety = "Pinot Noir"         ; break;
    case 'Prosecco'                : gwVariety = "Prosecco"           ; break;
    case 'Red Emperor'             : gwVariety = "Red Emperor"        ; break;
    case 'Ribier'                  : gwVariety = "Ribier"             ; break;
    case 'Riesling'                : gwVariety = "Riesling"           ; break;
    case 'Roussanne'               : gwVariety = "Roussanne"          ; break;
    case 'Ruby Cabernet'           : gwVariety = "Ruby Cabernet"      ; break;
    case 'Ruby Seedless'           : gwVariety = "Ruby Seedless"      ; break;
    case 'Sangiovese'              : gwVariety = "Sangiovese"         ; break;
    case 'Sauvignon Blanc'         : gwVariety = "Sauvignon Blanc"    ; break;
    case 'Savagnin'                : gwVariety = "Savagnin"           ; break;
    case 'Semillon'                : gwVariety = "Semillon"           ; break;
    case 'Shiraz'                  : gwVariety = "Shiraz"             ; break;
    case 'Sultana'                 : gwVariety = "Sultana"            ; break;
    case 'Taminga'                 : gwVariety = "Taminga"            ; break;
    case 'Tarrango'                : gwVariety = "Tarrango"           ; break;
    case 'Tempranillo'             : gwVariety = "Tempranillo"        ; break;
    case 'Tinta Cao'               : gwVariety = "Tinta Cao"          ; break;
    case 'Tokay'                   : gwVariety = "Tokay"              ; break;
    case 'Touriga Nacional'        : gwVariety = "Touriga"            ; break;
    case 'Traminer'                : gwVariety = "Traminer"           ; break;
    case 'Trebbiano'               : gwVariety = "Trebbiano"          ; break;
    case 'Troya'                   : gwVariety = "Jacquez"            ; break;
    case 'Verdelho'                : gwVariety = "Verdelho"           ; break;
    case 'Vermentino'              : gwVariety = "Vermentino"         ; break;
    case 'Viognier'                : gwVariety = "Viognier"           ; break;
    case 'Waltham Cross'           : gwVariety = "Waltham Cross"      ; break;
    case 'Zinfandel'               : gwVariety = "Zinfandel"          ; break;
    default: gwVariety = variety;
  }
  return gwVariety;
}

function getRegionMap(region) {
  var gwRegion = "";
  switch (region) {
    case 'New South Wales': gwRegion = "NSW - Unspecified"; break;
    case 'Big Rivers': gwRegion = "NSW - Big Rivers"; break;
    case 'Murray Darling-NSW': gwRegion = "NSW - Murray Darling"; break;
    case 'Perricoota': gwRegion = "NSW - Perricoota"; break;
    case 'Riverina': gwRegion = "NSW - Riverina"; break;
    case 'Swan Hill-NSW': gwRegion = "NSW - Swan Hill"; break;
    case 'Central Ranges': gwRegion = "NSW - Central Ranges"; break;
    case 'Cowra': gwRegion = "NSW - Cowra"; break;
    case 'Mudgee': gwRegion = "NSW - Mudgee"; break;
    case 'Orange': gwRegion = "NSW - Orange"; break;
    case 'Hunter Valley': gwRegion = "NSW - Hunter Valley"; break;
    case 'Hunter': gwRegion = "NSW - Hunter"; break;
    case 'Broke Fordwich': gwRegion = "NSW - Hunter (Broke Fordwich)"; break;
    case 'Pokolbin': gwRegion = "NSW - Hunter (Pokolbin)"; break;
    case 'Upper Hunter Valley': gwRegion = "NSW - Hunter (Upper Hunter Valley)"; break;
    case 'Northern Rivers': gwRegion = "NSW - Northern Slopes"; break;
    case 'Hastings River': gwRegion = "NSW - Hastings River"; break;
    case 'Northern Slopes': gwRegion = "NSW - Northern Slopes"; break;
    case 'New England Australia': gwRegion = "NSW - New England Australia"; break;
    case 'South Coast': gwRegion = "NSW - South Coast"; break;
    case 'Shoalhaven Coast': gwRegion = "NSW - Shoalhaven Coast"; break;
    case 'Southern Highlands': gwRegion = "NSW - Southern Highlands"; break;
    case 'Southern New South Wales': gwRegion = "NSW - Southern New South Wales"; break;
    case 'Canberra District': gwRegion = "NSW - Canberra District"; break;
    case 'Gundagai': gwRegion = "NSW - Gundagai"; break;
    case 'Hilltops': gwRegion = "NSW - Hilltops"; break;
    case 'Tumbarumba': gwRegion = "NSW - Tumbarumba"; break;
    case 'Western Plains': gwRegion = "NSW - Western Plains"; break;
    case 'Victoria': gwRegion = "VIC - Unspecified"; break;
    case 'Central Victoria': gwRegion = "VIC - Central Victoria"; break;
    case 'Bendigo': gwRegion = "VIC - Bendigo"; break;
    case 'Goulburn Valley': gwRegion = "VIC - Goulburn Valley"; break;
    case 'Nagambie Lakes': gwRegion = "VIC - Goulburn Valley (Nagambie Lake)"; break;
    case 'Heathcote': gwRegion = "VIC - Heathcote"; break;
    case 'Strathbogie Ranges': gwRegion = "VIC - Strathbogie Ranges"; break;
    case 'Upper Goulburn': gwRegion = "VIC - Upper Goulburn"; break;
    case 'Gippsland': gwRegion = "VIC - Gippsland"; break;
    case 'North East Victoria': gwRegion = "VIC - North East Victoria"; break;
    case 'Alpine Valleys': gwRegion = "VIC - Alpine Valleys"; break;
    case 'Beechworth': gwRegion = "VIC - Beechworth"; break;
    case 'Glenrowan': gwRegion = "VIC - Glenrowan"; break;
    case 'King Valley': gwRegion = "VIC - King Valley"; break;
    case 'Rutherglen': gwRegion = "VIC - Rutherglen"; break;
    case 'North West Victoria': gwRegion = "VIC - North West Victoria"; break;
    case 'Murray Darling-Vic': gwRegion = "VIC - Murray Darling"; break;
    case 'Swan Hill-Vic': gwRegion = "VIC - Swan Hill"; break;
    case 'Port Phillip': gwRegion = "VIC - Port Phillip"; break;
    case 'Geelong': gwRegion = "VIC - Geelong"; break;
    case 'Macedon Ranges': gwRegion = "VIC - Macedon Ranges"; break;
    case 'Mornington Peninsula': gwRegion = "VIC - Mornington Peninsula"; break;
    case 'Sunbury': gwRegion = "VIC - Sunbury"; break;
    case 'Yarra Valley': gwRegion = "VIC - Yarra Valley"; break;
    case 'Western Victoria': gwRegion = "VIC - Western Victoria"; break;
    case 'Grampians': gwRegion = "VIC - Grampians"; break;
    case 'Great Western': gwRegion = "VIC - Grampians (Great Western)"; break;
    case 'Henty': gwRegion = "VIC - Henty"; break;
    case 'Pyrenees': gwRegion = "VIC - Pyrenees"; break;
    case 'Queensland': gwRegion = "QLD - Unspecified"; break;
    case 'Granite Belt': gwRegion = "QLD - Granite Belt"; break;
    case 'South Burnett': gwRegion = "QLD - South Burnett"; break;
    case 'South Australia': gwRegion = "SA - Unspecified"; break;
    case 'Adelaide': gwRegion = "VIC - Adelaide"; break;
    case 'Barossa': gwRegion = "VIC - Barossa"; break;
    case 'Barossa Valley': gwRegion = "SA - Barossa Valley"; break;
    case 'Eden Valley': gwRegion = "SA - Eden Valley"; break;
    case 'High Eden': gwRegion = "SA - Eden Valley (High Eden)"; break;
    case 'Far North': gwRegion = "VIC - Far North"; break;
    case 'Southern Flinders Ranges': gwRegion = "SA - Southern Flinders Ranges"; break;
    case 'Fleurieu': gwRegion = "VIC - Fleurieu"; break;
    case 'Currency Creek': gwRegion = "SA - Currency Creek"; break;
    case 'Kangaroo Island': gwRegion = "SA - Kangaroo Island"; break;
    case 'Langhorne Creek': gwRegion = "SA - Langhorne Creek"; break;
    case 'McLaren Vale': gwRegion = "SA - McLaren Vale"; break;
    case 'Southern Fleurieu': gwRegion = "SA - Southern Fleurieu"; break;
    case 'Limestone Coast': gwRegion = "SA - Limestone Coast"; break;
    case 'Coonawarra': gwRegion = "SA - Coonawarra"; break;
    case 'Mount Benson': gwRegion = "SA - Mount Benson"; break;
    case 'Padthaway': gwRegion = "SA - Padthaway"; break;
    case 'Robe': gwRegion = "VIC - Robe"; break;
    case 'Wrattonbully': gwRegion = "SA - Wrattonbully"; break;
    case 'Mount Gambier': gwRegion = "SA - Mt Gambier"; break;
    case 'Lower Murray': gwRegion = "SA - Lower Murray (Other)"; break;
    case 'Riverland': gwRegion = "SA - Riverland"; break;
    case 'Mount Lofty Ranges': gwRegion = "VIC - Mount Lofty Ranges"; break;
    case 'Adelaide Hills': gwRegion = "SA - Adelaide Hills"; break;
    case 'Lenswood': gwRegion = "SA - Adelaide Hills (Lenswood)"; break;
    case 'Piccadilly Valley': gwRegion = "SA - Adelaide Hills (Piccadilly Valley)"; break;
    case 'Adelaide Plains': gwRegion = "SA - Adelaide Plains"; break;
    case 'Clare Valley': gwRegion = "SA - Clare Valley"; break;
    case 'The Peninsulas': gwRegion = "SA - The Peninsulas"; break;
    case 'Western Australia': gwRegion = "WA - Unspecified"; break;
    case 'Central Western Australia': gwRegion = "WA - Central Western Australia"; break;
    case 'Eastern Plains, Inland and North of Western Australia': gwRegion = "WA - Eastern Plains, Inland & North"; break;
    case 'Greater Perth': gwRegion = "VIC - Greater Perth"; break;
    case 'Peel': gwRegion = "WA - Peel"; break;
    case 'Perth Hills': gwRegion = "WA - Perth Hills"; break;
    case 'Swan District': gwRegion = "WA - Swan District"; break;
    case 'Swan Valley': gwRegion = "WA - Swan District (Swan Valley)"; break;
    case 'South West Australia': gwRegion = "WA - South West Australia"; break;
    case 'Blackwood Valley': gwRegion = "WA - Blackwood Valley"; break;
    case 'Geographe': gwRegion = "WA - Geographe"; break;
    case 'Great Southern': gwRegion = "VIC - Great Southern"; break;
    case 'Albany': gwRegion = "WA - Great Southern (Albany)"; break;
    case 'Denmark': gwRegion = "WA - Great Southern (Denmark)"; break;
    case 'Frankland River': gwRegion = "WA - Great Southern (Frankland River)"; break;
    case 'Mount Barker': gwRegion = "WA - Great Southern (Mt Barker)"; break;
    case 'Porongurup': gwRegion = "WA - Great Southern (Porongurup)"; break;
    case 'Manjimup': gwRegion = "VIC - Manjimup"; break;
    case 'Margaret River': gwRegion = "WA - Margaret River"; break;
    case 'Pemberton': gwRegion = "WA - Pemberton"; break;
    case 'West Australian South East Coastal': gwRegion = "WA - South East Coastal"; break;
    case 'Tasmania': gwRegion = "TAS - Tasmania"; break;
    case 'Northern Territory': gwRegion = "NT - Northern Territory"; break;
    case 'Australian Capital Territory': gwRegion = "ACT - Australian Capital Territory"; break;
    default: gwRegion = "OTH - " + region;
  }
            /*
            switch (growerVyBlk.v_name_gistate) {
              case 'Victoria':
                arowData[29] = "VIC - ";
                break;
              case 'New South Wales':
                arowData[29] = "NSW - ";
                break;
              case 'Queensland':
                arowData[29] = "QLD - ";
                break;
              case 'South Australia':
                arowData[29] = "SA - ";
                break;
              case 'Western Australia':
                arowData[29] = "WA - ";
                break;
              case 'Tasmainia':
                arowData[29] = "TAS - ";
                break;
              case 'Northern Territory':
                arowData[29] = "NT - ";
                break;
              case 'Australian Capital Territory':
                arowData[29] = "ACT - ";
                break;
              default:
                arowData[29] = "OTH - ";
            }
            */
  return gwRegion;
}

/*


// Generate a log, then email it to the person who ran the script.
var files = DriveApp.getFiles();
while (files.hasNext()) {
  Logger.log(files.next().getName());
}
var recipient = Session.getActiveUser().getEmail();
var subject = 'A list of files in your Google Drive';
var body = Logger.getLog();
MailApp.sendEmail(recipient, subject, body);


*/



function serverUpload1(jsonData) {
  // try{
    var ss   = SpreadsheetApp.getActiveSpreadsheet();
    var data = []

    for (var i = 0; i < jsonData.ds_Grower.tt_gr_mstr.length; i++) {
      var grower = jsonData.ds_Grower.tt_gr_mstr[i];
      Logger.log(grower.frg_grower);
      for (var j = 0; j < grower.tt_gr_ad_mstr.length; j++) {
        var growerAd = grower.tt_gr_ad_mstr[j];
        Logger.log(growerAd.ad_name);
      }
      for (var j = 0; j < grower.tt_gr_vd_mstr.length; j++) {
        var growerVd = grower.tt_gr_vd_mstr[j];
        // Logger.log(growerVd.vd_addr);
        if(growerVd.vd_remit.length > 0) {
          for (var k = 0; k < growerVd.tt_gr_rm_mstr.length; k++) {
            var growerVdAd = growerVd.tt_gr_rm_mstr[k];
            // Logger.log(growerVdAd.ad_name);
          }
          for (var k = 0; k < growerVd.tt_rm_ls_mstr.length; k++) {
            var growerVdLs = growerVd.tt_rm_ls_mstr[k];
            // Logger.log(growerVdLs.ls_type);
          }
        }
      }
      for (var j = 0; j < grower.tt_gr_ls_mstr.length; j++) {
        var growerLs = grower.tt_gr_ls_mstr[j];
        // Logger.log(growerLs.ls_type);
      }
      if(typeof grower.tt_gr_hc_mstr !== 'undefined' && grower.frg__chr01.length > 0) {
        for (var j = 0; j < grower.tt_gr_hc_mstr.length; j++) {
          var growerHc = grower.tt_gr_hc_mstr[j];
          // Logger.log(growerHc.ad_name);
        }
      }
      if(typeof grower.tt_gr_cc_mstr !== 'undefined' && grower.frg__chr02.length > 0) {
        for (var j = 0; j < grower.tt_gr_cc_mstr.length; j++) {
          var growerCc = grower.tt_gr_cc_mstr[j];
          // Logger.log(growerCc.ad_name);
        }
      }

      var arowData = new Array(29);
      for ( var n=0; n < arowData.length; n++ ) {
        arowData[n] = "";
      }
      // Logger.log(growerVy.afvc_grower);
      if ( typeof grower     !== 'undefined' && grower     !== null ) {
        arowData[0]  = grower.frg_grower.toUpperCase().trim() ;   // A/c Code
        arowData[7]  = grower.frg__chr01.toUpperCase().trim() ;   // Harvest Contractor Code
        arowData[11] = grower.frg__chr02.toUpperCase().trim() ;   // Cartage Contractor Code
      }
      if ( typeof growerAd   !== 'undefined' && growerAd   !== null ) {
        if (growerAd.ad__chr02.indexOf(",") !== -1) {
          var hvFax1 = growerAd.ad__chr02.split(',').slice(0,1).join(' ').trim();
          var email1 = growerAd.ad__chr02.split(',').slice(1).join(' ').trim();
        } else {
          hvFax1 = growerAd.ad__chr02.trim() ;
          email1 = growerAd.ad__chr02.trim() ;
        }

        arowData[1]  = growerAd.ad_name + crlf + loadAddress(growerAd.ad_line1, growerAd.ad_line2, growerAd.ad_line3, growerAd.ad_city, growerAd.ad_state, growerAd.ad_zip) ;   // Grower Res/Add
        arowData[3]  = loadContact(growerAd.ad_attn, growerAd.ad_fax2, growerAd.ad_phone, growerAd.ad_fax, growerAd.ad__chr01) ; // Contact 1
        arowData[4]  = loadContact(growerAd.ad_attn2, growerAd.ad_phone2, "", "", "") ; // Contact 2
        arowData[5]  = "" ; // Contact 3
        arowData[6]  = loadHAemail(hvFax1, email1)  ; // Harvest Advice Fax/Email
        // arowData[0]  = growerAd.ad_type   ;
      }
      if ( typeof growerCc   !== 'undefined' && growerCc   !== null ) {
        arowData[12] = growerCc.ad_name       ;   // Contractor
        arowData[13] = loadContact(growerCc.ad_attn, growerCc.ad_fax2, growerCc.ad_phone, growerCc.ad_fax, growerCc.ad__chr01) ; // Contact 1
        arowData[14] = loadContact(growerCc.ad_attn2, growerCc.ad_phone2, "", "", growerCc.ad__chr02) ; // Contact 2
      }
      if ( typeof growerHc   !== 'undefined' && growerHc   !== null ) {
        arowData[8]  = growerHc.ad_name       ;   // Contractor
        arowData[9]  = loadContact(growerHc.ad_attn, growerHc.ad_fax2, growerHc.ad_phone, growerHc.ad_fax, growerHc.ad__chr01) ; // Contact 1
        arowData[10] = loadContact(growerHc.ad_attn2, growerHc.ad_phone2, "", "", growerHc.ad__chr02) ; // Contact 2
      }
      if ( typeof growerVd   !== 'undefined' && growerVd   !== null ) {
        if ( growerVd.vd_type ) {
          if ( arowData[15] ) {
            if ( arowData[15] !== growerVd.vd_type.toUpperCase().trim() ) {
              arowData[15] = growerVd.vd_type.toUpperCase().trim() + " - " + arowData[15] ;  //  Type
            }
          } else {
            arowData[15]  = growerVd.vd_type.toUpperCase().trim() ;  //  Type
          }
        }
      }
      if ( typeof growerVdAd !== 'undefined' && growerVdAd !== null ) {
        arowData[2]  = growerVdAd.ad_name + crlf + loadAddress(growerVdAd.ad_line1, growerVdAd.ad_line2, growerVdAd.ad_line3, growerVdAd.ad_city, growerVdAd.ad_state, growerVdAd.ad_zip) ;   // P O Add
      }
      for ( var n=0; n < arowData.length; n++ ) {
        if (arowData[n] !== "") {
          arowData[n] = arowData[n].trim();
          if ( !isNaN(arowData[n]) ) {
            arowData[n] = "'" + arowData[n].toString();
          }
        }
      }
      data.push(arowData);
      growerAd    = null; // Grower Address
      growerVd    = null; // Supplier Details
      growerVdAd  = null; // Remit-to Details
      growerVdLs  = null; // Supplier Address list
      growerLs    = null; // Grower Address list
      growerCc    = null; // Grower Details - Carrier / Cartage Contractor Address
      growerHc    = null; // Grower Details - Harvest Contractor Address
      growerVy    = null; // Vineyard Details
      growerVyAd  = null; // Vineyard Address
      growerVyLs  = null; // Vineyard Address list
      // growerVyCc  = null; // Vineyard Details - Carrier / Cartage Contractor Address
      // growerVyHc  = null; // Vineyard Details - Harvest Contractor Address
      // growerVyPc  = null; // Vineyard Details - Processor Contractor Address
      growerVyBlk = null; // Block Details
    }
    /*
    data = transpose(data);
    */
    var sheetname = "Growers";
    var sheet = ss.getSheetByName(sheetname);
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var range = sheet.getRange(2, 1, lastRow, lastColumn);
    data.sort(function(a, b) {
      var c = a[15].toLowerCase(), d = b[15].toLowerCase();
      if(c === d) {
        var x = a[0].toLowerCase(), y = b[0].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    range.clearContent();
    sheet.getRange(2,1,data.length,data[0].length).setValues(data);
    return 'Completed';
  /*
  }catch(e){
    ss.toast(e.toString());
    return 'Error: ' + e.toString();
  }
  */
}


/* ----------------------------------------------------------------------- *\
-- Grapeweb initial details
\* ----------------------------------------------------------------------- */

function serverUpload2(jsonData) {
  // try{
    var ss    = SpreadsheetApp.getActiveSpreadsheet();
    var adata = []

    for (var i = 0; i < jsonData.ds_Grower.tt_gr_mstr.length; i++) {
      var grower = jsonData.ds_Grower.tt_gr_mstr[i];
      Logger.log(grower.frg_grower);
      for (var j = 0; j < grower.tt_gr_ad_mstr.length; j++) {
        var growerAd = grower.tt_gr_ad_mstr[j];
        Logger.log(growerAd.ad_name);
      }
      for (var j = 0; j < grower.tt_gr_vd_mstr.length; j++) {
        var growerVd = grower.tt_gr_vd_mstr[j];
        Logger.log(growerVd.vd_addr);
        if(growerVd.vd_remit.length > 0) {
          for (var k = 0; k < growerVd.tt_gr_rm_mstr.length; k++) {
            var growerVdAd = growerVd.tt_gr_rm_mstr[k];
            // Logger.log(growerVdAd.ad_name);
          }
          for (var k = 0; k < growerVd.tt_rm_ls_mstr.length; k++) {
            var growerVdLs = growerVd.tt_rm_ls_mstr[k];
            // Logger.log(growerVdLs.ls_type);
          }
        }
      }
      for (var j = 0; j < grower.tt_gr_ls_mstr.length; j++) {
        var growerLs = grower.tt_gr_ls_mstr[j];
        // Logger.log(growerLs.ls_type);
      }
      if(typeof grower.tt_gr_hc_mstr !== 'undefined' && grower.frg__chr01.length > 0) {
        for (var j = 0; j < grower.tt_gr_hc_mstr.length; j++) {
          var growerHc = grower.tt_gr_hc_mstr[j];
          // Logger.log(growerHc.ad_name);
        }
      }
      if(typeof grower.tt_gr_cc_mstr !== 'undefined' && grower.frg__chr02.length > 0) {
        for (var j = 0; j < grower.tt_gr_cc_mstr.length; j++) {
          var growerCc = grower.tt_gr_cc_mstr[j];
          // Logger.log(growerCc.ad_name);
        }
      }
      for (var j = 0; j < grower.tt_vy_mstr.length; j++) {
        var growerVy = grower.tt_vy_mstr[j];
        // Logger.log(growerVy.afvc_grower);
        for (var k = 0; k < growerVy.tt_vy_ad_mstr.length; k++) {
          var growerVyAd = growerVy.tt_vy_ad_mstr[k];
          // Logger.log(growerVyAd.ad_name);
        }
        for (var k = 0; k < growerVy.tt_vy_ls_mstr.length; k++) {
          var growerVyLs = growerVy.tt_vy_ls_mstr[k];
          // Logger.log(growerVyLs.ls_type);
        }
        for (var k = 0; k < growerVy.tt_blk_mstr.length; k++) {
          var growerVyBlk = growerVy.tt_blk_mstr[k];
          // Logger.log(growerVyBlk.afvi_vineyard);
          var arowData = new Array(47);
          for ( var n=0; n < arowData.length; n++ ) {
            arowData[n] = "";
          }

          // gc_instruction
          // gc_seq
          if ( typeof grower     !== 'undefined' && grower     !== null ) {
            arowData[2]  = grower.frg_grower.toUpperCase() ; // vineyardid
          }
          // username
          // password
          if ( typeof growerAd   !== 'undefined' && growerAd   !== null ) {
            var firstName = growerAd.ad_attn.split(' ').slice(0, 1).join(' ');
            var lastName = growerAd.ad_attn.split(' ').slice(1).join(' ');
            if (growerAd.ad__chr02.indexOf(",") !== -1) {
              var email1 = growerAd.ad__chr02.split(',').slice(1).join(' ').trim();
            } else {
              email1 = growerAd.ad__chr02.trim();
            }
            if ( growerAd.ad_fax2 !== "" ) {
              var mobile1 = growerAd.ad_fax2;
            } else {
              mobile1 = growerAd.ad_phone2
            }
            arowData[5]  = firstName.trim()       ; // contactfirstname
            arowData[6]  = lastName.trim()        ; // contactlastname
            arowData[7]  = growerAd.ad_gst_id     ; // abn
            arowData[8]  = growerAd.ad__chr01     ; // email
            arowData[9]  = growerAd.ad_name       ; // tradingname
            arowData[10] = growerAd.ad_phone      ; // phone
            arowData[11] = growerAd.ad_fax        ; // fax
            arowData[12] = growerAd.ad_fax2       ; // mobile
            arowData[13] = growerAd.ad_line1      ; // businessaddressline1
            arowData[14] = loadAddress2(growerAd.ad_line2, growerAd.ad_line3) ; // businessaddressline2
            arowData[15] = growerAd.ad_city       ; // businessaddresstown
            arowData[16] = growerAd.ad_state      ; // businessaddressstate
            arowData[17] = growerAd.ad_zip        ; // businessaddresspostcode
            arowData[18] = growerAd.ad_country    ; // businessaddresscountry
          }
          if ( typeof growerVdAd !== 'undefined' && growerVdAd !== null ) {
            arowData[19] = growerVdAd.ad_line1      ; // postaladdressline1
            arowData[20] = loadAddress2(growerVdAd.ad_line2, growerVdAd.ad_line3) ; // postaladdressline2
            arowData[21] = growerVdAd.ad_city       ; // postaladdresstown
            arowData[22] = growerVdAd.ad_state      ; // postaladdressstate
            arowData[23] = growerVdAd.ad_zip        ; // postaladdresspostcode
            arowData[24] = growerVdAd.ad_country    ; // postaladdresscountry
          }
          // blk_instruction
          // blk_seq
          // grape2webblockid
          if ( typeof growerVyBlk   !== 'undefined' && growerVyBlk   !== null ) {

            arowData[28] = growerVyBlk.v_xvar_desc       ; // variety
            switch (growerVyBlk.v_name_gistate) {
              case 'Victoria':
                arowData[29] = "VIC - ";
                break;
              case 'New South Wales':
                arowData[29] = "NSW - ";
                break;
              case 'Queensland':
                arowData[29] = "QLD - ";
                break;
              case 'South Australia':
                arowData[29] = "SA - ";
                break;
              case 'Western Australia':
                arowData[29] = "WA - ";
                break;
              case 'Tasmainia':
                arowData[29] = "TAS - ";
                break;
              case 'Northern Territory':
                arowData[29] = "NT - ";
                break;
              case 'Australian Capital Territory':
                arowData[29] = "ACT - ";
                break;
              default:
                arowData[29] = "OTH - ";
            }
            arowData[29] = arowData[29] + growerVyBlk.v_name_gi_region  ; // region
            arowData[30] = growerVyBlk.afvi_id           ; // wineryblockid
            arowData[32] = growerVyBlk.afvi_code         ; // blockname
            arowData[33] = growerVyBlk.afvi_plants       ; // numofvines                /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_plants or /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_rows
            arowData[34] = growerVyBlk.afvi_rootstock    ; // rootstock
            arowData[35] = growerVyBlk.afvi_pyear        ; // yearplanted
            arowData[36] = growerVyBlk.afvi_row_spacing  ; // rowspace
            arowData[37] = growerVyBlk.afvi_vine_spacing ; // vinespace
            arowData[38] = growerVyBlk.afvi_hectares     ; // hectares
            arowData[39] = growerVyBlk.v_name_gisub_region ; // subregion
            // contractstatus
            arowData[41] = growerVyBlk.afvi_xregion + ":" + growerVyBlk.afvi_xarea ; // wineryregion
          }
          if ( typeof growerVy   !== 'undefined' && growerVy   !== null ) {
            arowData[31]  = growerVy.afvc_vineyard.toUpperCase() ;   // vineyardname
          }
            arowData[42] = "enio_foscarini@debortoli.com.au" ; // addgloemailspray
          // deletegloemailspray
            arowData[44] = "enio_foscarini@debortoli.com.au" ; // addgloemailautoapprove
          // deletegloemailautoapprove
          // error
          if ( typeof growerVd   !== 'undefined' && growerVd   !== null ) {
            if ( growerVd.vd_type ) {
              if ( arowData[46] ) {
                arowData[46]  = growerVd.vd_type.toUpperCase() + " - " + arowData[0] ;  //  Type
              } else {
                arowData[46]  = growerVd.vd_type.toUpperCase() ;  //  Type
              }
            }
          }
          for ( var n=0; n < arowData.length; n++ ) {
            if (arowData[n] !== "") {
              // Logger.log(arowData[n]);
              if ( !isNaN(arowData[n]) ) {
                arowData[n] = "'" + arowData[n].toString();
              } else {
                // arowData[n] = arowData[n].trim();
              }
            }
          }
          adata.push(arowData);
        }
      }
      growerAd    = null; // Grower Address
      growerVd    = null; // Supplier Details
      growerVdAd  = null; // Remit-to Details
      growerVdLs  = null; // Supplier Address list
      growerLs    = null; // Grower Address list
      growerCc    = null; // Grower Details - Carrier / Cartage Contractor Address
      growerHc    = null; // Grower Details - Harvest Contractor Address
      growerVy    = null; // Vineyard Details
      growerVyAd  = null; // Vineyard Address
      growerVyLs  = null; // Vineyard Address list
      growerVyCc  = null; // Vineyard Details - Carrier / Cartage Contractor Address
      growerVyHc  = null; // Vineyard Details - Harvest Contractor Address
      growerVyPc  = null; // Vineyard Details - Processor Contractor Address
      growerVyBlk = null; // Block Details
    }
    /*
    adata = transpose(adata);
    */
    var sheetname  = "Grapeweb";
    var sheet      = ss.getSheetByName(sheetname);
    var lastRow    = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var range      = sheet.getRange(2, 1, lastRow, lastColumn);
    range.clearContent();
    adata.sort(function(a, b) {
      var c = a[46].toLowerCase(), d = b[46].toLowerCase();
      if(c === d) {
        var x = a[2].toLowerCase(), y = b[2].toLowerCase();
        if (x === y) {
          var u = a[31].toLowerCase(), v = b[31].toLowerCase();
          if (u === v) {
            var s = a[32].toLowerCase(), t = b[32].toLowerCase();
            return s < t ? -1 : s > t ? 1 : 0;
          }
          return u < v ? -1 : u > v ? 1 : 0;
        }
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    sheet.getRange(2,1,adata.length,adata[0].length).setValues(adata);
    return 'Completed';
  /*
  }catch(e){
    ss.toast(e.toString());
    return 'Error: ' + e.toString();
  }
  */
}


/*

function onOpen() {
  setCheckboxes();
};

function setCheckboxes() {
  var checklist = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("checklist");
  var checklist_data_range = checklist.getDataRange();
  var checklist_num_rows = checklist_data_range.getNumRows();
  Logger.log("checklist num rows: " + checklist_num_rows);

  var coredata = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("core_data");
  var coredata_data_range = coredata.getDataRange();

  for(var i = 0 ; i < checklist_num_rows-1; i++) {
    var split = checklist_data_range.getCell(i+2, 3).getValue().split(" || ");
    var item_id = split[split.length - 1];
    if(item_id != "") {
      item_id = parseInt(item_id);
      Logger.log("setting value at ("+(i+2)+",2) to " + coredata_data_range.getCell(item_id+1, 3).getValue());
      checklist_data_range.getCell(i+2,2).setValue(coredata_data_range.getCell(item_id+1, 3).getValue());
    }
  }
}

function onEdit() {
  Logger.log("TESTING TESTING ON EDIT");
  var active_sheet = SpreadsheetApp.getActiveSheet();
  if(active_sheet.getName() == "checklist") {
    var active_range = SpreadsheetApp.getActiveSheet().getActiveRange();
    Logger.log("active_range: " + active_range);
    Logger.log("active range col: " + active_range.getColumn() + "active range row: " + active_range.getRow());
    Logger.log("active_range.value: " + active_range.getCell(1, 1).getValue());
    Logger.log("active_range. colidx: " + active_range.getColumnIndex());
    if(active_range.getCell(1,1).getValue() == "?" || active_range.getCell(1,1).getValue() == "?") {
      Logger.log("made it!");
      var next_cell = active_sheet.getRange(active_range.getRow(), active_range.getColumn()+1, 1, 1).getCell(1,1);
      var val = next_cell.getValue();
      Logger.log("val: " + val);
      var splits = val.split(" || ");
      var item_id = splits[splits.length-1];
      Logger.log("item_id: " + item_id);

      var core_data = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("core_data");
      var sheet_data_range = core_data.getDataRange();
      var num_rows = sheet_data_range.getNumRows();
      var sheet_values = sheet_data_range.getValues();
      Logger.log("num_rows: " + num_rows);

      for(var i = 0; i < num_rows; i++) {
        Logger.log("sheet_values[" + (i) + "][" + (8) + "] = " + sheet_values[i][8]);
        if(sheet_values[i][8] == item_id) {
          Logger.log("found it! tyring to set it...");
          sheet_data_range.getCell(i+1, 2+1).setValue(active_range.getCell(1,1).getValue());
        }
      }

    }
  }

  setCheckboxes();
};

*/


/*

gc_instruction
gc_seq
vineyardid                /ds_Grower/tt_gr_mstr/frg_grower
username
password
contactfirstname          /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_attn
contactlastname           /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_attn
abn                       /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_gst_id or /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_gst_id
email                     /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad__chr02
tradingname               /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_name or /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_name
phone                     /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_phone
fax                       /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_fax
mobile                    /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_phone2
businessaddressline1      /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line1
businessaddressline2      /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line2 + /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line3
businessaddresstown       /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_city
businessaddressstate      /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_state
businessaddresspostcode   /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_zip
businessaddresscountry    /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_country
postaladdressline1        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line1
postaladdressline2        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line2 + /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line3
postaladdresstown         /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_city
postaladdressstate        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_state
postaladdresspostcode     /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_zip
postaladdresscountry      /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_country
blk_instruction
blk_seq
grapewebblockid
variety                   /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_variety
region                    /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_gi_region
wineryblockid             /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_id
vineyardname              /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_vy_ad_mstr/ad_addr
blockname                 /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_code
numofvines                /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_plants or /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_rows
rootstock                 /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_rootstock
yearplanted               /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_pyear
rowspace                  /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_row_spacing
vinespace                 /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_vine_spacing
hectares                  /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_hectares
subregion                 /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_gisub_region
contractstatus
wineryregion              /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_xregion + /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_xarea
addgloemailspray
deletegloemailspray
addgloemailautoapprove
deletegloemailautoapprove
error
*/

