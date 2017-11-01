function serverUpload3(jsonData) {
  // try{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var gdata  = [];
    var vdata  = [];
    var qdata  = [];
    var cdata  = [];
    var adata  = [];
    var sep    = "";
    var hvFax1 = "";
    var email1 = "";

    for (var i = 0; i < jsonData.ds_Grower.tt_gr_mstr.length; i++) {
      var grower = jsonData.ds_Grower.tt_gr_mstr[i];
      Logger.log(grower.frg_grower);
      for (var j = 0; j < grower.tt_gr_ad_mstr.length; j++) {
        var growerAd = grower.tt_gr_ad_mstr[j];
        // Logger.log(growerAd.ad_name);
      }
      for (var j = 0; j < grower.tt_gr_vd_mstr.length; j++) {
        var growerVd = grower.tt_gr_vd_mstr[j];
        // Logger.log(growerVd.vd_addr);
        // Logger.log(growerVd.vd_remit);
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

      // Grower level data row
      var growData = new Array(29);
      for ( var n=0; n < growData.length; n++ ) {
        growData[n] = "";
      }
      var qrowData = new Array(4);
      var cont_arr = "";
      for ( var n=0; n < growData.length; n++ ) {
        qrowData[n] = "";
      }
      var crowData = new Array(4);
      var cntr_arr = "";
      for ( var n=0; n < crowData.length; n++ ) {
        crowData[n] = "";
      }

      if ( typeof grower     !== 'undefined' && grower     !== null ) {
        growData[0]  = grower.frg_grower.toUpperCase().trim() ;   // A/c Code
        growData[7]  = grower.frg__chr01.toUpperCase().trim() ;   // Harvest Contractor Code
        growData[11] = grower.frg__chr02.toUpperCase().trim() ;   // Cartage Contractor Code
      }
      if ( typeof growerAd   !== 'undefined' && growerAd   !== null ) {
        if (growerAd.ad__chr02.indexOf(",") !== -1) {
          hvFax1 = growerAd.ad__chr02.split(',').slice(0,1).join(' ').trim();
          email1 = growerAd.ad__chr02.split(',').slice(1).join(' ').trim();
        } else {
          hvFax1 = growerAd.ad__chr02.trim() ;
          email1 = "" ; // growerAd.ad__chr02.trim() ;
        }
        growData[1]  = growerAd.ad_name + crlf + loadAddress(growerAd.ad_line1, growerAd.ad_line2, growerAd.ad_line3, growerAd.ad_city, growerAd.ad_state, growerAd.ad_zip) ; // Res/Add
        growData[3]  = loadContact(growerAd.ad_attn, growerAd.ad_fax2, growerAd.ad_phone, growerAd.ad_fax, growerAd.ad__chr01) ; // Contact 1
        growData[4]  = loadContact(growerAd.ad_attn2, growerAd.ad_phone2, "", "", "") ; // Contact 2
        growData[5]  = "" ; // Contact 3
        growData[6]  = loadHAemail(hvFax1, email1)  ; // Harvest Advice Fax/Email
        qrowData[0]  = growerAd.ad_name;
        qrowData[2]  = growerAd.ad_attn;
        qrowData[1]  = formatPhoneNumber(growerAd.ad_fax2);
        if (formatPhoneNumber(growerAd.ad_fax2) !== null) {
          cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn + formatPhoneNumber(growerAd.ad_fax2);
        }
        if (growerAd.ad_attn2) {
          if (formatPhoneNumber(growerAd.ad_phone2) !== null) {
            if (cont_arr.indexOf(growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.ad_phone2)) == -1) {
              cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.ad_phone2);
              qrowData[2]  = qrowData[2] + crlf + growerAd.ad_attn2;
              qrowData[1]  = qrowData[1] + crlf + formatPhoneNumber(growerAd.ad_phone2);    
            }
          }
        }
      }
      if ( typeof growerCc   !== 'undefined' && growerCc   !== null ) {
        growData[12] = growerCc.ad_name       ;   // Contractor
        growData[13] = loadContact(growerCc.ad_attn, growerCc.ad_fax2, growerCc.ad_phone, growerCc.ad_fax, growerCc.ad__chr01) ; // Contact 1
        growData[14] = loadContact(growerCc.ad_attn2, growerCc.ad_phone2, "", "", growerCc.ad__chr02) ; // Contact 2
      }
      if ( typeof growerHc   !== 'undefined' && growerHc   !== null ) {
        growData[8]  = growerHc.ad_name       ;   // Contractor
        growData[9]  = loadContact(growerHc.ad_attn, growerHc.ad_fax2, growerHc.ad_phone, growerHc.ad_fax, growerHc.ad__chr01) ; // Contact 1
        growData[10] = loadContact(growerHc.ad_attn2, growerHc.ad_phone2, "", "", growerHc.ad__chr02) ; // Contact 2
      }
      if ( typeof growerVd   !== 'undefined' && growerVd   !== null ) {
        growData[15]  = growerVd.vd_type.toUpperCase() ;  //  Type
        qrowData[3]   = growerVd.vd_type.toUpperCase() + ":" + growerVd.vd_sort.toUpperCase() ;  //  sort
      }
      if ( typeof growerVdAd !== 'undefined' && growerVdAd !== null ) {
        growData[2]  = growerVdAd.ad_name + crlf + loadAddress(growerVdAd.ad_line1, growerVdAd.ad_line2, growerVdAd.ad_line3, growerVdAd.ad_city, growerVdAd.ad_state, growerVdAd.ad_zip) ;   // P O Add
        sep = "";
        if ( growData[5] ) { sep = crlf; }
        growData[5] = growData[5].trim() + sep +
                      loadContact(growerVdAd.ad_attn, growerVdAd.ad_fax2, growerVdAd.ad_phone, growerVdAd.ad_fax, growerVdAd.ad__chr01) ; // Contact 3
        if  (growerVdAd.ad_attn) {
          if (formatPhoneNumber(growerAd.ad_phone) !== null) {
            if (cont_arr.indexOf(growerAd.ad_name + growerVdAd.ad_attn + formatPhoneNumber(growerVdAd.ad_phone)) == -1) {
              cont_arr = cont_arr + "|" + growerAd.ad_name + growerVdAd.ad_attn + formatPhoneNumber(growerVdAd.ad_phone);
              qrowData[2]  = qrowData[2] + crlf + growerVdAd.ad_attn;
              qrowData[1]  = qrowData[1] + crlf + formatPhoneNumber(growerVdAd.ad_phone);
            }
          }
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
        if (growerVy.tt_vy_hc_mstr) {
          for (var k = 0; k < growerVy.tt_vy_hc_mstr.length; k++) {
            var growerVyHc = growerVy.tt_vy_hc_mstr[k];
            // Logger.log(growerVyHc.ad_name);
          }
        }
        if (growerVy.tt_vy_cc_mstr) {
          for (var k = 0; k < growerVy.tt_vy_cc_mstr.length; k++) {
            var growerVyCc = growerVy.tt_vy_cc_mstr[k];
            // Logger.log(growerVyCc.ad_name);
          }
        }
        if (growerVy.tt_vy_pr_mstr) {
          for (var k = 0; k < growerVy.tt_vy_pr_mstr.length; k++) {
            var growerVyPc = growerVy.tt_vy_pr_mstr[k];
            // Logger.log(growerVyPr.ad_name);
          }
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

        // Vineyard level data rows
        var rowData = new Array(29);
        for ( var n=0; n < rowData.length; n++ ) {
          rowData[n] = "";
        }

        if ( typeof grower     !== 'undefined' && grower     !== null ) {
          rowData[0]  = grower.frg_grower.toUpperCase().trim() ;   // A/c Code
          rowData[9]  = grower.frg__chr01.toUpperCase().trim() ;   // Harvest Contractor Code
          rowData[13] = grower.frg__chr02.toUpperCase().trim() ;   // Cartage Contractor Code
        }
        if ( typeof growerAd   !== 'undefined' && growerAd   !== null ) {
          rowData[3]  = growerAd.ad_name + crlf + loadAddress(growerAd.ad_line1, growerAd.ad_line2, growerAd.ad_line3, growerAd.ad_city, growerAd.ad_state, growerAd.ad_zip) ;   // Res/Add
          rowData[5]  = loadContact(growerAd.ad_attn, growerAd.ad_fax2, growerAd.ad_phone, growerAd.ad_fax, growerAd.ad__chr01) ; // Contact 1
          rowData[6]  = loadContact(growerAd.ad_attn2, growerAd.ad_phone2, "", "", "") ; // Contact 2
          rowData[7]  = "" ; // Contact 3
          rowData[8]  = loadHAemail(hvFax1, email1)  ; // Harvest Advice Fax/Email
        }
        if ( typeof growerCc   !== 'undefined' && growerCc   !== null ) {
          rowData[14] = growerCc.ad_name       ;   // Contractor
          rowData[15] = loadContact(growerCc.ad_attn, growerCc.ad_fax2, growerCc.ad_phone, growerCc.ad_fax, growerCc.ad__chr01) ; // Contact 1
          rowData[16] = loadContact(growerCc.ad_attn2, growerCc.ad_phone2, "", "", growerCc.ad__chr02) ; // Contact 2
        }
        if ( typeof growerHc   !== 'undefined' && growerHc   !== null ) {
          rowData[10] = growerHc.ad_name       ;   // Contractor
          rowData[11] = loadContact(growerHc.ad_attn, growerHc.ad_fax2, growerHc.ad_phone, growerHc.ad_fax, growerHc.ad__chr01) ; // Contact 1
          rowData[12] = loadContact(growerHc.ad_attn2, growerHc.ad_phone2, "", "", growerHc.ad__chr02) ; // Contact 2
        }
        if ( typeof growerVd   !== 'undefined' && growerVd   !== null ) {
          if ( growerVd.vd_type ) {
            if ( rowData[17] ) {
              rowData[17]  = growerVd.vd_type.toUpperCase() + " - " + rowData[17] ;  //  Type
            } else {
              rowData[17]  = growerVd.vd_type.toUpperCase() ;  //  Type
            }
          }
        }
        if ( typeof growerVdAd !== 'undefined' && growerVdAd !== null ) {
          rowData[4]  = growerVdAd.ad_name + crlf + loadAddress(growerVdAd.ad_line1, growerVdAd.ad_line2, growerVdAd.ad_line3, growerVdAd.ad_city, growerVdAd.ad_state, growerVdAd.ad_zip) ;   // P O Add
          sep = "";
          if ( rowData[7] ) { sep = crlf; }
          rowData[7] = rowData[7].trim() + sep +
                       loadContact(growerVdAd.ad_attn, growerVdAd.ad_fax2, growerVdAd.ad_phone, growerVdAd.ad_fax, growerVdAd.ad__chr01) ; // Contact 3
        }
        if ( typeof growerVy   !== 'undefined' && growerVy   !== null ) {
          rowData[1]  = growerVy.afvc_vineyard.toUpperCase() ;   // V/Code
          if ( growerVy.afvc__chr01 ) {
            if (growerVy.afvc__chr01.toUpperCase().trim() !== rowData[9].trim() ) {
              rowData[9] = rowData[9].trim() + crlf +
                           growerVy.afvc__chr01.toUpperCase().trim()   ;   // Harvest Contractor Code
              if ( typeof growerVyHc   !== 'undefined' && growerVyHc   !== null ) {
                sep = "";
                if ( rowData[10] ) { sep = crlf; }
                rowData[10] = rowData[10].trim() + sep +
                              growerVyHc.ad_name       ;   // Contractor
                rowData[11] = rowData[11].trim() + sep +
                              loadContact(growerVyHc.ad_attn, growerVyHc.ad_fax2, growerVyHc.ad_phone, growerVyHc.ad_fax, growerVyHc.ad__chr01) ; // Contact 1
                rowData[12] = rowData[12].trim() + sep +
                              loadContact(growerVyHc.ad_attn2, growerVyHc.ad_phone2, "", "", growerVyHc.ad__chr02) ; // Contact 2
              }
            }
            if (growerVy.afvc__chr01.toUpperCase().trim() !== growData[7].trim() ) {
              growData[7] = growData[7].trim() + crlf +
                            growerVy.afvc__chr01.toUpperCase().trim()   ;   // Harvest Contractor Code
              if ( typeof growerVyHc   !== 'undefined' && growerVyHc   !== null ) {
                sep = "";
                if ( growData[8] ) { sep = crlf; }
                growData[8]  = growData[8].trim() + sep +
                               growerVyHc.ad_name       ;   // Contractor
                growData[9]  = growData[9].trim() + sep +
                               loadContact(growerVyHc.ad_attn, growerVyHc.ad_fax2, growerVyHc.ad_phone, growerVyHc.ad_fax, growerVyHc.ad__chr01) ; // Contact 1
                growData[10] = growData[10].trim() + sep +
                               loadContact(growerVyHc.ad_attn2, growerVyHc.ad_phone2, "", "", growerVyHc.ad__chr02) ; // Contact 2
              }
            }
          }
          if ( growerVy.afvc_carrier) {
            if (growerVy.afvc_carrier.toUpperCase().trim() !== rowData[13].trim() ) {
              rowData[13] = rowData[13].trim() + crlf +
                            growerVy.afvc_carrier.toUpperCase().trim()  ;   // Cartage Contractor Code
              if ( typeof growerVyCc   !== 'undefined' && growerVyCc   !== null ) {
                sep = "";
                if ( rowData[14] ) { sep = crlf; }
                rowData[14] = rowData[14].trim() + sep +
                              growerVyCc.ad_name       ;   // Contractor
                rowData[15] = rowData[15].trim() + sep +
                              loadContact(growerVyCc.ad_attn, growerVyCc.ad_fax2, growerVyCc.ad_phone, growerVyCc.ad_fax, growerVyCc.ad__chr01) ; // Contact 1
                rowData[16] = rowData[16].trim() + sep +
                              loadContact(growerVyCc.ad_attn2, growerVyCc.ad_phone2, "", "", growerVyCc.ad__chr02) ; // Contact 2
              }
            }
            if (growerVy.afvc_carrier.toUpperCase().trim() !== growData[11].trim() ) {
              growData[11] = growData[11].trim() + crlf +
                            growerVy.afvc_carrier.toUpperCase().trim()  ;   // Cartage Contractor Code
              if ( typeof growerVyCc   !== 'undefined' && growerVyCc   !== null ) {
                sep = "";
                sep = "";
                if ( growData[12] ) { sep = crlf; }
                growData[12] = growData[12].trim() + sep +
                               growerVyCc.ad_name       ;   // Contractor
                growData[13] = growData[13].trim() + sep +
                               loadContact(growerVyCc.ad_attn, growerVyCc.ad_fax2, growerVyCc.ad_phone, growerVyCc.ad_fax, growerVyCc.ad__chr01) ; // Contact 1
                growData[14] = growData[14].trim() + sep +
                               loadContact(growerVyCc.ad_attn2, growerVyCc.ad_phone2, "", "", growerVyCc.ad__chr02) ; // Contact 2
              }
            }
          }
          if ( typeof growerVyAd !== 'undefined' && growerVyAd !== null ) {
            sep = "";
            if ( rowData[7] ) { sep = crlf; }
            rowData[7] = rowData[7].trim() + sep +
                         loadContact(growerVyAd.ad_attn, growerVyAd.ad_fax2, growerVyAd.ad_phone, growerVyAd.ad_fax, growerVyAd.ad__chr01) ; // Contact 3
            sep = "";
            if ( growData[5] ) { sep = crlf; }
            growData[5] = growData[5].trim() + sep +
                          loadContact(growerVyAd.ad_attn, growerVyAd.ad_fax2, growerVyAd.ad_phone, growerVyAd.ad_fax, growerVyAd.ad__chr01) ; // Contact 3
            rowData[2]  = growerVyAd.ad_name + crlf + loadAddress(growerVyAd.ad_line1, growerVyAd.ad_line2, growerVyAd.ad_line3, growerVyAd.ad_city, growerVyAd.ad_state, growerVyAd.ad_zip) ;   // Vineyard Address
            if  (growerVyAd.ad_attn) {
              if (formatPhoneNumber(growerAd.ad_phone) !== null) {
                if (cont_arr.indexOf(growerAd.ad_name + growerVyAd.ad_attn + formatPhoneNumber(growerVyAd.ad_phone)) == -1) {
                  cont_arr = cont_arr + "|" + growerAd.ad_name + growerVyAd.ad_attn + formatPhoneNumber(growerVyAd.ad_phone);
                  qrowData[2]  = qrowData[2] + crlf + growerVyAd.ad_attn;
                  qrowData[1]  = qrowData[1] + crlf + formatPhoneNumber(growerVyAd.ad_phone);
                }
              }
            }
          }
        }
        for ( var n=0; n < rowData.length; n++ ) {
          if (rowData[n] !== "") {
            rowData[n] = rowData[n].trim();
            if ( !isNaN(rowData[n]) ) {
              rowData[n] = "'" + rowData[n].toString();
            }
          }
        }
        vdata.push(rowData);
        growerVy    = null; // Vineyard Details
        growerVyAd  = null; // Vineyard Address
        growerVyLs  = null; // Vineyard Address list
        growerVyCc  = null; // Vineyard Details - Carrier / Cartage Contractor Address
        growerVyHc  = null; // Vineyard Details - Harvest Contractor Address
        growerVyPc  = null; // Vineyard Details - Processor Contractor Address
        growerVyBlk = null; // Block Details
      }
      for ( var n=0; n < growData.length; n++ ) {
        if (growData[n] !== "") {
          growData[n] = growData[n].trim();
          if ( !isNaN(growData[n]) ) {
            growData[n] = "'" + growData[n].toString();
          }
        }
      }
      gdata.push(growData);

      for ( var n=0; n < qrowData.length; n++ ) {
        if (qrowData[n] !== "") {
          qrowData[n] = (""+qrowData[n]).trim();
          if ( !isNaN(qrowData[n]) ) {
            qrowData[n] = "'" + qrowData[n].toString();
          }
        }
      }
      qdata.push(qrowData);
      growerAd    = null; // Grower Address
      growerVd    = null; // Supplier Details
      growerVdAd  = null; // Remit-to Details
      growerVdLs  = null; // Supplier Address list
      growerLs    = null; // Grower Address list
      growerCc    = null; // Grower Details - Carrier / Cartage Contractor Address
      growerHc    = null; // Grower Details - Harvest Contractor Address
    }
    /*
    data = transpose(data);
    */
    var sheetname = "Vineyards";
    var sheet = ss.getSheetByName(sheetname);
    var lastRow = sheet.getLastRow();
    var lastColumn = sheet.getLastColumn();
    var range = sheet.getRange(2, 1, lastRow, lastColumn);
    vdata.sort(function(a, b) {
      var c = a[17].toLowerCase(), d = b[17].toLowerCase();
      if(c === d) {
        var x = a[0].toLowerCase(), y = b[0].toLowerCase();
        if (x === y) {
          var u = a[1].toLowerCase(), v = b[1].toLowerCase();
          return u < v ? -1 : u > v ? 1 : 0;
        }
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    range.clearContent();
    sheet.getRange(2,1,vdata.length,vdata[0].length).setValues(vdata);

    sheetname = "Growers";
    sheet = ss.getSheetByName(sheetname);
    lastRow = sheet.getLastRow();
    lastColumn = sheet.getLastColumn();
    range = sheet.getRange(2, 1, lastRow, lastColumn);
    gdata.sort(function(a, b) {
      var c = a[15].toLowerCase(), d = b[15].toLowerCase();
      if(c === d) {
        var x = a[0].toLowerCase(), y = b[0].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    range.clearContent();
    sheet.getRange(2,1,gdata.length,gdata[0].length).setValues(gdata);

    sheetname = "Quick Contacts";
    sheet = ss.getSheetByName(sheetname);
    lastRow = sheet.getLastRow();
    lastColumn = sheet.getLastColumn();
    range = sheet.getRange(2, 1, lastRow, lastColumn);
    qdata.sort(function(a, b) {
      var c = a[3].toLowerCase(), d = b[3].toLowerCase();
      if(c === d) {
        var x = a[0].toLowerCase(), y = b[0].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    range.clearContent();
    sheet.getRange(2,1,qdata.length,qdata[0].length).setValues(qdata);

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
                        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/vd_type - /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_type
A/c Code                /ds_Grower/tt_gr_mstr/frg_grower
V/Code	                /ds_Grower/tt_gr_mstr/tt_vy_mstr/afvc_vineyard
Grower	                /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_name
Res/Add	               "/ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line1
                        /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line2
                        /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_line3"
City	                /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_city
State	                /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_state
P/code	                /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_zip
P O Add	               "/ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line1
                        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line2
                        /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_line3"
City	                /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_city
State	                /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_state
P/code	                /ds_Grower/tt_gr_mstr/tt_gr_vd_mstr/tt_gr_rm_mstr/ad_zip
Phone	               "/ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_phone
                        /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_attn"
mobile /grower	       "/ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_phone2
                        /ds_Grower/tt_gr_mstr/frg__chr01
                        /ds_Grower/tt_gr_mstr/frg__chr01"
Contact	               "/ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_attn2
                        /ds_Grower/tt_gr_mstr/frg__chr01
                        /ds_Grower/tt_gr_mstr/frg__chr01"
Fax Grower	            /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad_fax
email Grower	        /ds_Grower/tt_gr_mstr/tt_gr_ad_mstr/ad__chr02
Harvest Contractor Code	/ds_Grower/tt_gr_mstr/frg__chr01	/ds_Grower/tt_gr_mstr/tt_vy_mstr/afvc__chr01
Contractor	            /ds_Grower/tt_gr_mstr/tt_gr_hc_mstr/ad_name
Mobile Contractor	    /ds_Grower/tt_gr_mstr/tt_gr_hc_mstr/ad_phone2
Home phone	            /ds_Grower/tt_gr_mstr/tt_gr_hc_mstr/ad_phone
Fax Contr	            /ds_Grower/tt_gr_mstr/tt_gr_hc_mstr/ad_fax
email Contractor	    /ds_Grower/tt_gr_mstr/tt_gr_hc_mstr/ad__chr02
Cartage Contractor Code	/ds_Grower/tt_gr_mstr/frg__chr02	/ds_Grower/tt_gr_mstr/tt_vy_mstr/afvc_carrier
Contractor	            /ds_Grower/tt_gr_mstr/tt_gr_cc_mstr/ad_name
Mobile Contractor	    /ds_Grower/tt_gr_mstr/tt_gr_cc_mstr/ad_phone2
Home phone	            /ds_Grower/tt_gr_mstr/tt_gr_cc_mstr/ad_phone
Fax Contr	            /ds_Grower/tt_gr_mstr/tt_gr_cc_mstr/ad_fax
email Contractor	    /ds_Grower/tt_gr_mstr/tt_gr_cc_mstr/ad__chr02
*/
