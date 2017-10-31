function transpose(a)
{
  return Object.keys(a[0]).map(function (c) { return a.map(function (r) { return r[c]; }); });
}

function isDefined(x) {
  var undefined;
  return x !== undefined;
}

function loadAddress(ln1, ln2, ln3, cty, st, pc) {
  var address = "";
  var addressln4 = "";

  if ( ln1 !== 'undefined' && ln1.trim() !== "") {
    address = ln1.trim();
  }
  if ( ln2 !== 'undefined' && ln2.trim() !== "") {
    if (address !== "") {
      address = address + crlf + ln2.trim();
    } else {
      address = ln2.trim();
    }
  }
  if ( ln3 !== 'undefined' && ln3.trim() !== "") {
    if (address !== "") {
      address = address +  crlf + ln3.trim();
    } else {
      address = ln3.trim();
    }
  }
  if ( cty !== 'undefined' && cty.trim() !== "") {
    addressln4 = cty.trim();
  }
  if ( st  !== 'undefined' && st.trim()  !== "") {
    if (addressln4 !== "") {
      addressln4 = addressln4 + "  " + st.trim();
    } else {
      addressln4 = st.trim();
    }
  }
  if ( pc  !== 'undefined' && pc.trim()  !== "") {
    if (addressln4 !== "") {
      addressln4 = addressln4 + "  " + pc.trim();
    } else {
      addressln4 = pc.trim();
    }
  }
  if ( addressln4 !== "") {
    if (address !== "") {
      address = address +  crlf + addressln4;
    } else {
      address = addressln4;
    }
  }
  return address;
}

function loadContact(cnt, mob, phn, fax, eml) {
  var contact = "";
  var sep     = "";

  if ( cnt !== 'undefined' && cnt.trim() !== "") {
    contact = cnt.trim();
  }
  if ( mob !== 'undefined' && mob.trim() !== "") {
    if (contact !== "") { sep = crlf; } else { sep = ""; }
    contact = contact + sep + phonePrefix("(P)", formatPhoneNumber(mob));
  }
  if ( phn !== 'undefined' && phn.trim() !== "") {
    if (contact !== "") { sep = crlf; } else { sep = ""; }
    contact = contact + sep + phonePrefix("(P)", formatPhoneNumber(phn));
  }
  if ( fax !== 'undefined' && fax.trim() !== "") {
    if (contact !== "") { sep = crlf; } else { sep = ""; }
    contact = contact + sep + phonePrefix("(F)", formatPhoneNumber(fax));
  }
  if ( eml !== 'undefined' && eml.trim() !== "") {
    if (contact !== "") { sep = crlf; } else { sep = ""; }
    contact = contact +  sep + "(E) " + eml.trim();
  }
  return contact;
}

function phonePrefix(prefix, number) {
  switch (number.substr(0,2)) {
    case '04':
      return "(M) " + number.trim();
    default:
      return prefix + " " + number.trim();
  }
  return prefix + " " + number.trim();
}

function loadAddress2(ln1, ln2) {
  var address = "";

  if ( ln1 !== 'undefined' && ln1.trim() !== "") {
    address = ln1.trim();
  }
  if ( ln2 !== 'undefined' && ln2.trim() !== "") {
    if (address !== "") {
      address = address + ", " + ln2.trim();
    } else {
      address = ln2.trim();
    }
  }
  return address;
}

function loadHAemail(em1, em2) {
  var contact = "";
  var sep     = "";

  if ( em1 !== 'undefined' && em1.trim() !== "") {
    contact = em1.trim();
  }
  if ( em2 !== 'undefined' && em2.trim() !== "") {
    if (contact !== "") { sep = crlf; } else { sep = ""; }
    contact = contact + sep + em2.trim();
  }
  return contact;
}

function formatPhoneNumber(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = [];
  switch (s2.length) {
    case 8:
      m = s2.match(/^(\d{4})(\d{4})$/);
      return (!m) ? null : "(00) " + m[1] + " " + m[2];
      // s2.substr(0,4)+" "+s2.substr(4,4);
      break;
    case 10:
      switch (s2.substr(0,2)) {
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
  var m = s2.match(/^(\d{4})(\d{3})(\d{3})$/);
  return (!m) ? null : "" + m[1] + " " + m[2] + " " + m[3];
}

function formatPhoneNumberP(s) {
  var s2 = (""+s).replace(/\D/g, '');
  var m = s2.match(/^(\d{2})(\d{4})(\d{4})$/);
  return (!m) ? null : "(" + m[1] + ") " + m[2] + " " + m[3];
}


function serverUpload1(jsonData) {
  // try{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
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
    var ss = SpreadsheetApp.getActiveSpreadsheet();
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
    var sheetname = "Grapeweb";
    var sheet = ss.getSheetByName(sheetname);
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var range = sheet.getRange(2, 1, lastRow, lastColumn);
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

