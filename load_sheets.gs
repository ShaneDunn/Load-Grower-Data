function serverUpload3(jsonData) {
  // try{
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var gdata  = []; // Grower Data
    var vdata  = []; // Vineyard Data
    var qdata  = []; // Quick Contacts Data
    var cdata  = []; // Contractor Data
    var adata  = []; // Grapeweb Load Data
    var bdata  = []; // Block Data
    var sep    = "";
    var hvFax1 = "";
    var email1 = "";
    var qsep   = "";

    var cntr_arr = "";

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
      var cont_arr = "";
      var qrowData = new Array(4);
      for ( var n=0; n < qrowData.length; n++ ) {
        qrowData[n] = "";
      }
      var crowData = new Array(6);
      for ( var n=0; n < crowData.length; n++ ) {
        crowData[n] = "";
      }

      if ( typeof grower     !== 'undefined' && grower     !== null ) {
        growData[0]  = grower.frg_grower.toUpperCase().trim() ;   // A/c Code
        growData[7]  = grower.frg__chr01.toUpperCase().trim() ;   // Harvest Contractor Code
        growData[11] = grower.frg__chr02.toUpperCase().trim() ;   // Cartage Contractor Code
      }
      if ( typeof growerAd   !== 'undefined' && growerAd   !== null ) {
        if (growerAd.usrw_charfld_05.indexOf(",") !== -1) {
          hvFax1 = growerAd.usrw_charfld_05.split(',').slice(0,1).join(' ').trim();
          email1 = growerAd.usrw_charfld_05.split(',').slice(1).join(' ').trim();
        } else {
          hvFax1 = growerAd.usrw_charfld_05.trim() ;
          email1 = "" ; // growerAd.usrw_charfld_05.trim() ;
        }
        growData[1]  = growerAd.ad_name + crlf + loadAddress(growerAd.ad_line1, growerAd.ad_line2, growerAd.ad_line3, growerAd.ad_city, growerAd.ad_state, growerAd.ad_zip) ; // Res/Add
        growData[3]  = loadContact(growerAd.ad_attn, growerAd.usrw_charfld_01, growerAd.ad_phone, growerAd.ad_fax, growerAd.usrw_charfld_02) ; // Contact 1
        growData[4]  = loadContact(growerAd.ad_attn2, growerAd.usrw_charfld_03, growerAd.ad_phone2, growerAd.ad_fax2, growerAd.usrw_charfld_04) ; // Contact 2
        growData[5]  = "" ; // Contact 3
        growData[6]  = loadHAemail(growerAd.usrw_charfld_05)  ; // Harvest Advice Fax/Email
        growData[20] = growerAd.usrw_charfld_06  ; // Salutation
        qrowData[0]  = growerAd.ad_name;

        if (formatPhoneNumber(growerAd.ad_phone) !== null) {
          qrowData[2]  = growerAd.ad_attn;
          qrowData[1]  = formatPhoneNumber(growerAd.ad_phone);
          cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn + formatPhoneNumber(growerAd.ad_phone);
          qsep = crlf;
        }
        if (formatPhoneNumber(growerAd.usrw_charfld_01) !== null) {
          if (cont_arr.indexOf(growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.usrw_charfld_01)) == -1) {
            cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.usrw_charfld_01);
            qrowData[2]  = growerAd.ad_attn;
            qrowData[1]  = formatPhoneNumber(growerAd.usrw_charfld_01);
            cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn + formatPhoneNumber(growerAd.usrw_charfld_01);
            qsep = crlf;
          }
        }
        if (growerAd.ad_attn2) {
          if (formatPhoneNumber(growerAd.ad_phone2) !== null) {
            if (cont_arr.indexOf(growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.ad_phone2)) == -1) {
              cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.ad_phone2);
              qrowData[2]  = qrowData[2] + qsep + growerAd.ad_attn2;
              qrowData[1]  = qrowData[1] + qsep + formatPhoneNumber(growerAd.ad_phone2);
              qsep = crlf;
            }
          }
          if (formatPhoneNumber(growerAd.usrw_charfld_03) !== null) {
            if (cont_arr.indexOf(growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.usrw_charfld_03)) == -1) {
              cont_arr = cont_arr + "|" + growerAd.ad_name + growerAd.ad_attn2 + formatPhoneNumber(growerAd.usrw_charfld_03);
              qrowData[2]  = qrowData[2] + qsep + growerAd.ad_attn2;
              qrowData[1]  = qrowData[1] + qsep + formatPhoneNumber(growerAd.usrw_charfld_03);
              qsep = crlf;
            }
          }
        }
      }
      if ( typeof growerCc   !== 'undefined' && growerCc   !== null ) {
        growData[12] = growerCc.ad_name       ;   // Contractor
        growData[13] = loadContact(growerCc.ad_attn, growerCc.usrw_charfld_01, growerCc.ad_phone, growerCc.ad_fax, growerCc.usrw_charfld_02) ; // Contact 1
        growData[14] = loadContact(growerCc.ad_attn2, growerCc.usrw_charfld_03, growerCc.ad_phone2, growerCc.ad_fax2, growerCc.usrw_charfld_04) ; // Contact 2
        growData[19] = loadHAemail(growerCc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
        
        // load contractor details
        if (cntr_arr.indexOf(grower.frg__chr02.toUpperCase().trim()) == -1) {
          cntr_arr = cntr_arr + "|" + grower.frg__chr02.toUpperCase().trim();
          // Logger.log(cntr_arr);
          crowData[0] = grower.frg__chr02.toUpperCase().trim();
          crowData[1] = growerCc.ad_name       ;   // Contractor
          crowData[2] = loadContact(growerCc.ad_attn, growerCc.usrw_charfld_01, growerCc.ad_phone, growerCc.ad_fax, growerCc.usrw_charfld_02) ; // Contact 1
          crowData[3] = loadContact(growerCc.ad_attn2, growerCc.usrw_charfld_03, growerCc.ad_phone2, growerCc.ad_fax2, growerCc.usrw_charfld_04) ; // Contact 2
          crowData[4] = loadHAemail(growerCc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
          if ( typeof growerVd !== 'undefined' && growerVd !== null ) {
            crowData[5] = growerVd.vd_type.toUpperCase() ;  //  sort
          } else { crowData[5] = "" }
          cdata.push(crowData);
        }
        
      }
      if ( typeof growerHc   !== 'undefined' && growerHc   !== null ) {
        growData[8]  = growerHc.ad_name       ;   // Contractor
        growData[9]  = loadContact(growerHc.ad_attn, growerHc.usrw_charfld_01, growerHc.ad_phone, growerHc.ad_fax, growerHc.usrw_charfld_02) ; // Contact 1
        growData[10] = loadContact(growerHc.ad_attn2, growerHc.usrw_charfld_03, growerHc.ad_phone2, growerHc.ad_fax2, growerHc.usrw_charfld_04) ; // Contact 2
        growData[18] = loadHAemail(growerHc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
        
        // load contractor details
        if (cntr_arr.indexOf(grower.frg__chr01.toUpperCase().trim()) == -1) {
          cntr_arr = cntr_arr + "|" + grower.frg__chr01.toUpperCase().trim();
          // Logger.log(cntr_arr);
          crowData[0] = grower.frg__chr01.toUpperCase().trim();
          crowData[1] = growerHc.ad_name       ;   // Contractor
          crowData[2] = loadContact(growerHc.ad_attn, growerHc.usrw_charfld_01, growerHc.ad_phone, growerHc.ad_fax, growerHc.usrw_charfld_02) ; // Contact 1
          crowData[3] = loadContact(growerHc.ad_attn2, growerHc.usrw_charfld_03, growerHc.ad_phone2, growerHc.ad_fax2, growerHc.usrw_charfld_04) ; // Contact 2
          crowData[4] = loadHAemail(growerHc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
          if ( typeof growerVd !== 'undefined' && growerVd !== null ) {
            crowData[5] = growerVd.vd_type.toUpperCase() ;  //  sort
          } else { crowData[5] = "" }
          cdata.push(crowData);
        }
        
      }
      if ( typeof growerVd   !== 'undefined' && growerVd   !== null ) {
        growData[15] = growerVd.vd_type.toUpperCase() ;  //  Type
        qrowData[3]  = growerVd.vd_type.toUpperCase() + ":" + growerVd.vd_sort.toUpperCase() ;  //  sort
        growData[16] = loadContact(growerVd.vd_ap_cntct, "", "", "", growerVd.vd__chr02) ; // AP / Finance Contact
        growData[17] = loadContact(growerVd.vd_pur_cntct, "", "", "", growerVd.vd__chr01) ; // Purchasing Contact 2
      }
      if ( typeof growerVdAd !== 'undefined' && growerVdAd !== null ) {
        growData[2]  = growerVdAd.ad_name + crlf + loadAddress(growerVdAd.ad_line1, growerVdAd.ad_line2, growerVdAd.ad_line3, growerVdAd.ad_city, growerVdAd.ad_state, growerVdAd.ad_zip) ;   // P O Add
        sep = "";
        if ( growData[5] ) { sep = crlf; }
        growData[5] = growData[5].trim() + sep +
                      loadContact(growerVdAd.ad_attn, growerVdAd.ad_fax2, growerVdAd.ad_phone, growerVdAd.ad_fax, growerVdAd.ad__chr01) ; // Contact 3
        if  (growerVdAd.ad_attn) {
          if (formatPhoneNumber(growerVdAd.ad_phone) !== null) {
            if (cont_arr.indexOf(growerAd.ad_name + growerVdAd.ad_attn + formatPhoneNumber(growerVdAd.ad_phone)) == -1) {
              cont_arr = cont_arr + "|" + growerAd.ad_name + growerVdAd.ad_attn + formatPhoneNumber(growerVdAd.ad_phone);
              qrowData[2]  = qrowData[2] + qsep + growerVdAd.ad_attn;
              qrowData[1]  = qrowData[1] + qsep + formatPhoneNumber(growerVdAd.ad_phone);
              qsep = crlf;
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
          var arowData = new Array(47); // Grapeweb Data
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
            arowData[5]  = firstName.trim()       ; // contactfirstname
            arowData[6]  = lastName.trim()        ; // contactlastname
            arowData[7]  = growerAd.ad_gst_id     ; // abn
            arowData[8]  = formatGwEmail(growerAd.usrw_charfld_02, arowData[5], arowData[6])     ; // email
            arowData[9]  = growerAd.ad_name       ; // tradingname
            arowData[10] = formatPhoneNumber(growerAd.ad_phone)      ; // phone
            arowData[11] = formatPhoneNumber(growerAd.ad_fax)        ; // fax
            arowData[12] = formatPhoneNumber(growerAd.usrw_charfld_01)       ; // mobile
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

            arowData[28] = getVarietyMap(growerVyBlk.v_xvar_desc); // variety
            arowData[29] = getRegionMap(growerVyBlk.v_name_gi_region); // region
            arowData[30] = growerVyBlk.afvi_id             ; // wineryblockid
            arowData[32] = growerVyBlk.afvi_code           ; // blockname
            arowData[33] = growerVyBlk.afvi_plants         ; // numofvines                /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_plants or /ds_Grower/tt_gr_mstr/tt_vy_mstr/tt_blk_mstr/afvi_rows
            arowData[34] = growerVyBlk.afvi_rootstock      ; // rootstock
            arowData[35] = growerVyBlk.afvi_pyear          ; // yearplanted
            arowData[36] = growerVyBlk.afvi_row_spacing    ; // rowspace
            arowData[37] = growerVyBlk.afvi_vine_spacing   ; // vinespace
            arowData[38] = growerVyBlk.afvi_hectares       ; // hectares
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
            if ( typeof arowData[n]   !== 'undefined' && arowData[n]   !== null ) {
              if (arowData[n] !== "") {
                // Logger.log(arowData[n]);
                if ( !isNaN(arowData[n]) ) {
                  arowData[n] = "'" + arowData[n].toString();
                } else {
                  // arowData[n] = arowData[n].trim();
                }
              }
            }
          }
          adata.push(arowData);
          
          if ( typeof growerVyBlk   !== 'undefined' && growerVyBlk   !== null ) {
            var browData = new Array(93); // Grapeweb Data
            for ( var n=0; n < browData.length; n++ ) {
              browData[n] = "";
            }
            // browData[0]  = growerVyBlk.afvi_grower             ; // Grower Code
            if ( typeof grower     !== 'undefined' && grower     !== null ) {
              browData[0]  = grower.frg_grower.toUpperCase() ; // Grower Code
            }
            browData[1]  = growerVyBlk.afvi_vineyard_id        ; // Vineyard Id
            browData[2]  = growerVyBlk.afvi_vineyard           ; // Vineyard Code
            browData[3]  = growerVyBlk.afvi_id                 ; // Block ID
            browData[4]  = growerVyBlk.afvi_code               ; // Block Code
            browData[5]  = growerVyBlk.afvi_name               ; // Block Name
            browData[6]  = growerVyBlk.afvi_ext1_code          ; // External Block code
            browData[7]  = growerVyBlk.afvi_variety            ; // Variety
            browData[8]  = growerVyBlk.v_xvar_desc             ; // Variety Description
            browData[9]  = growerVyBlk.afvi_variety_mixed      ; // Inter-Mixed
            browData[10] = growerVyBlk.afvi_variety_family     ; // VarieterialFamily
            browData[11] = growerVyBlk.afvi_xregion            ; // Grower Area
            browData[12] = growerVyBlk.v_name_xregion          ; // Grower Area Description
            browData[13] = growerVyBlk.afvi_xarea              ; // Grower Sub Area
            browData[14] = growerVyBlk.v_name_xarea            ; // Grower Sub Area Description
            browData[15] = growerVyBlk.afvi_contract           ; // Contract
            browData[16] = growerVyBlk.afvi_pct_contracted     ; // % Contracted
            browData[17] = growerVyBlk.afvi_pmethod            ; // Default Pick Method
            browData[18] = growerVyBlk.v_pmethod               ; // Default Pick Method Description
            browData[19] = growerVyBlk.afvi_hectaresplanted    ; // Hectares Planted
            browData[20] = growerVyBlk.afvi_hectares           ; // Hectares
            browData[21] = growerVyBlk.afvi_def_grade          ; // Potential Grade
            browData[22] = growerVyBlk.v_def_grade             ; // Potential Grade Description
            browData[23] = growerVyBlk.afvi_enduse             ; // End Use
            browData[24] = growerVyBlk.v_def_enduse            ; // End Use Description
            browData[25] = growerVyBlk.afvi_rows               ; // Rows
            browData[26] = growerVyBlk.afvi_row_spacing        ; // Row Spacing
            browData[27] = growerVyBlk.afvi_vine_spacing       ; // Vine Spacing
            browData[28] = growerVyBlk.afvi_plants             ; // Plants
            browData[29] = growerVyBlk.afvi_vines_hect         ; // Vines Per Hectare
            browData[30] = growerVyBlk.afvi_cordon_lm          ; // Cordon Linear Metres
            browData[31] = growerVyBlk.afvi_cordon_hect        ; // Cordon per Hectare
            browData[32] = growerVyBlk.afvi_cordon_no          ; // No. of Cordons
            browData[33] = growerVyBlk.afvi_trellis_lm         ; // Trellis Linear Metres
            browData[34] = growerVyBlk.afvi_trellis_movable    ; // Trellis Movable Wires
            browData[35] = growerVyBlk.afvi_tmethod            ; // Trellis Method
            browData[36] = growerVyBlk.v_tmethod               ; // Trellis Method Description
            browData[37] = growerVyBlk.afvi_vine_training      ; // Training Type
            browData[38] = growerVyBlk.afvi_canopy_style       ; // Canopy Style
            browData[39] = growerVyBlk.v_canopy_style          ; // Canopy Style Description
            browData[40] = growerVyBlk.afvi_pyear              ; // Planted
            browData[41] = growerVyBlk.afvi_planted_mixed      ; // Dates Planted (mixed)
            browData[42] = growerVyBlk.afvi_clones             ; // Clones
            browData[43] = growerVyBlk.v_clones                ; // Clones Description
            browData[44] = growerVyBlk.afvi_rootstock          ; // Rootstock
            browData[45] = growerVyBlk.v_rootstock             ; // Rootstock Description
            browData[46] = growerVyBlk.afvi_rootstock_gv       ; // Rootstock Graft Variety
            browData[47] = growerVyBlk.v_rootstock_gv          ; // Rootstock Graft Variety Description
            browData[48] = growerVyBlk.afvi_rootstock_notes    ; // Rootstock Graft Notes
            browData[49] = growerVyBlk.afvi_provider           ; // Provider of vines
            browData[50] = growerVyBlk.afvi_wmethod            ; // Watering Method
            browData[51] = growerVyBlk.v_wmethod               ; // Watering Method Description
            browData[52] = growerVyBlk.afvi_swmethod           ; // Secondary Irrigation
            browData[53] = growerVyBlk.v_swmethod              ; // Secondary Irrigation Description
            browData[54] = growerVyBlk.afvi_water_security     ; // Water Security
            browData[55] = growerVyBlk.v_water_security        ; // Water Security Description
            browData[56] = growerVyBlk.afvi_irrigation_valves  ; // Irrigation Valves
            browData[57] = growerVyBlk.afvi_vine_valve         ; // Vines per Valve
            browData[58] = growerVyBlk.afvi_drainage_syst      ; // Drainage System
            browData[59] = growerVyBlk.v_drainage_syst         ; // Drainage System Description
            browData[60] = growerVyBlk.afvi_moisture_mon       ; // Moisture Monitoring Method
            browData[61] = growerVyBlk.v_moisture_mon          ; // Moisture Monitoring Method Description
            browData[62] = growerVyBlk.afvi_inter_row_mgt      ; // Inter-row Management
            browData[63] = growerVyBlk.v_inter_row_mgt         ; // Inter-row Management Description
            browData[64] = growerVyBlk.afvi_direction          ; // Vines Row Direction
            browData[65] = growerVyBlk.v_direction             ; // Vines Row Direction Description
            browData[66] = growerVyBlk.afvi_ter_aspect         ; // Terrain Aspect
            browData[67] = growerVyBlk.v_ter_aspect            ; // Terrain Aspect Description
            browData[68] = growerVyBlk.afvi_ter_elevation      ; // Terrain Elevation
            browData[69] = growerVyBlk.afvi_ter_slope          ; // Terrain Slope
            browData[70] = growerVyBlk.afvi_soil_type          ; // Soil Type
            browData[71] = growerVyBlk.v_soil_type             ; // Soil Type Description
            browData[72] = growerVyBlk.afvi_soil_depth         ; // Soil Depth
            browData[73] = growerVyBlk.afvi_soil_texture       ; // Soil Texture
            browData[74] = growerVyBlk.v_soil_texture          ; // Soil Texture Description
            browData[75] = growerVyBlk.afvi_soil_structure     ; // Soil Structure
            browData[76] = growerVyBlk.v_soil_structure        ; // Soil Structure Description
            browData[77] = growerVyBlk.afvi_soil_terrior       ; // Soil Terroir
            browData[78] = growerVyBlk.afvi_terrior            ; // Terrior Notes
            browData[79] = growerVyBlk.afvi_appellation        ; // Appellation
            browData[80] = growerVyBlk.v_name_appellation      ; // Appellation Description
            browData[81] = growerVyBlk.afvi_gi_region          ; // GI Region
            browData[82] = growerVyBlk.v_name_gi_region        ; // GI Region Description
            browData[83] = growerVyBlk.afvi_gisub_region       ; // GI Sub Region
            browData[84] = growerVyBlk.v_name_gisub_region     ; // GI Sub Region Description
            browData[85] = growerVyBlk.afvi_gistate            ; // GI State
            browData[86] = growerVyBlk.v_name_gistate          ; // GI State Description
            browData[87] = growerVyBlk.afvi_gizone             ; // GI Zone
            browData[88] = growerVyBlk.v_name_gizone           ; // GI Zone Description
            browData[89] = growerVyBlk.afvi_changes.trim()     ; // Changes
            browData[90] = growerVyBlk.afvi_cmtindx            ; // Comment Index
            browData[91] = growerVyBlk.afvi_comments           ; // Comments
            browData[92] = growerVyBlk.afvi_gps.trim()         ; // GPS Position
            browData[93] = growerVyBlk.afvi_shape.trim().replace(/[|&$%@"<>()\n]/g, "") ; // GIS Shape Data

            bdata.push(browData);
          }   
          
        }

        // Vineyard level data rows
        var rowData = new Array(29);
        for ( var n=0; n < rowData.length; n++ ) {
          rowData[n] = "";
        }

        var crowData = new Array(5);
        for ( var n=0; n < crowData.length; n++ ) {
          crowData[n] = "";
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
        
            // load contractor details
            if ( typeof growerVyHc   !== 'undefined' && growerVyHc   !== null ) {
              if (cntr_arr.indexOf(growerVy.afvc__chr01.toUpperCase().trim()) == -1) {
                cntr_arr = cntr_arr + "|" + growerVy.afvc__chr01.toUpperCase().trim();
                // Logger.log(cntr_arr);
                crowData[0] = growerVy.afvc__chr01.toUpperCase().trim();
                crowData[1] = growerVyHc.ad_name       ;   // Contractor
                crowData[2] = loadContact(growerVyHc.ad_attn, growerVyHc.usrw_charfld_01, growerVyHc.ad_phone, growerVyHc.ad_fax, growerVyHc.usrw_charfld_02) ; // Contact 1
                crowData[3] = loadContact(growerVyHc.ad_attn2, growerVyHc.usrw_charfld_03, growerVyHc.ad_phone2, growerVyHc.ad_fax2, growerVyHc.usrw_charfld_04) ; // Contact 2
                crowData[4] = loadHAemail(growerVyHc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
                if ( typeof growerVd !== 'undefined' && growerVd !== null ) {
                  crowData[5] = growerVd.vd_type.toUpperCase() ;  //  sort
                } else { crowData[5] = "" }
                cdata.push(crowData);
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
                if ( growData[12] ) { sep = crlf; }
                growData[12] = growData[12].trim() + sep +
                               growerVyCc.ad_name       ;   // Contractor
                growData[13] = growData[13].trim() + sep +
                               loadContact(growerVyCc.ad_attn, growerVyCc.ad_fax2, growerVyCc.ad_phone, growerVyCc.ad_fax, growerVyCc.ad__chr01) ; // Contact 1
                growData[14] = growData[14].trim() + sep +
                               loadContact(growerVyCc.ad_attn2, growerVyCc.ad_phone2, "", "", growerVyCc.ad__chr02) ; // Contact 2
              }
            }
        
            // load contractor details
            if ( typeof growerVyCc   !== 'undefined' && growerVyCc   !== null ) {
              if (cntr_arr.indexOf(growerVy.afvc_carrier.toUpperCase().trim()) == -1) {
                cntr_arr = cntr_arr + "|" + growerVy.afvc_carrier.toUpperCase().trim();
                // Logger.log(cntr_arr);
                crowData[0] = growerVy.afvc_carrier.toUpperCase().trim();
                crowData[1] = growerVyCc.ad_name       ;   // Contractor
                crowData[2] = loadContact(growerVyCc.ad_attn, growerVyCc.usrw_charfld_01, growerVyCc.ad_phone, growerVyCc.ad_fax, growerVyCc.usrw_charfld_02) ; // Contact 1
                crowData[3] = loadContact(growerVyCc.ad_attn2, growerVyCc.usrw_charfld_03, growerVyCc.ad_phone2, growerVyCc.ad_fax2, growerVyCc.usrw_charfld_04) ; // Contact 2
                crowData[4] = loadHAemail(growerVyCc.usrw_charfld_05)  ; // Harvest Advice Fax/Email
                if ( typeof growerVd !== 'undefined' && growerVd !== null ) {
                  crowData[5] = growerVd.vd_type.toUpperCase() ;  //  sort
                } else { crowData[5] = "" }
                cdata.push(crowData);
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
                  qrowData[2]  = qrowData[2] + qsep + growerVyAd.ad_attn;
                  qrowData[1]  = qrowData[1] + qsep + formatPhoneNumber(growerVyAd.ad_phone);
                  qsep = crlf;
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

    sheetname = "Grapeweb";
    sheet = ss.getSheetByName(sheetname);
    lastRow = sheet.getLastRow();
    lastColumn = sheet.getLastColumn();
    range = sheet.getRange(2, 1, lastRow, lastColumn);
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
    
    sheetname = "Blocks";
    sheet = ss.getSheetByName(sheetname);
    lastRow = sheet.getLastRow();
    lastColumn = sheet.getLastColumn();
    range = sheet.getRange(2, 1, lastRow, lastColumn);
    range.clearContent();
    bdata.sort(function(a, b) {
      var c = a[0].toLowerCase(), d = b[0].toLowerCase();
      if(c === d) {
        var x = a[2].toLowerCase(), y = b[2].toLowerCase();
        if (x === y) {
          var u = a[4].toLowerCase(), v = b[4].toLowerCase();
          return u < v ? -1 : u > v ? 1 : 0;
        }
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    sheet.getRange(2,1,bdata.length,bdata[0].length).setValues(bdata);
    
    // load contactor contacts
    
    sheetname = "Contractors";
    sheet = ss.getSheetByName(sheetname);
    lastRow = sheet.getLastRow();
    lastColumn = sheet.getLastColumn();
    range = sheet.getRange(2, 1, lastRow, lastColumn);
    cdata.sort(function(a, b) {
      var c = a[5].toLowerCase(), d = b[5].toLowerCase();
      if(c === d) {
        var x = a[0].toLowerCase(), y = b[0].toLowerCase();
        return x < y ? -1 : x > y ? 1 : 0;
      }
      return c < d ? -1 : c > d ? 1 : 0;
    });
    range.clearContent();
    sheet.getRange(2,1,cdata.length,cdata[0].length).setValues(cdata);

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
