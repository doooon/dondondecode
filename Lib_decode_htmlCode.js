

// tmp=表示する文字列, label=前ラベル, blabel=後ラベル
function htmlCode(tmp, label, blabel) {
  if (tmp==null) return "";
  if (label && label!="") { htmlCodeLabel=label; }
  else { htmlCodeLabel=""; }
  if (blabel && blabel!="") { htmlCodeBLabel= blabel; }
  else { htmlCodeBLabel=""; }

  // チェック
  printCheck(tmp);  // 内部でprintMain()を呼び出していく
    
  // タイムスタンプ
  var d=new Date();
  var strTS="<div class='elapsedtime'>"+((d.getTime() -startTime.getTime()) /1000)+"s</div>";
  htmlTmp[htmlTmp.length-1]=htmlTmp[htmlTmp.length-1]+" "+strTS;
  //debug(htmlTmp[htmlTmp.length-1]);
}

function printCheck(tmp2) {
  if ( !tmp2 ) return "";
  
  if (printMain(tmp2)=="fix") return; // そのままでfix
  
  // 以下様々な一括変換を試していく
  if ( printMain( strReverse( tmp2 ),             "more", "(more reverse)" )              == "fix") return;
  if ( printMain( atbash19( tmp2 ),               "more", "(more atbash19)" )             == "fix") return;
  if ( printMain( atbash09( tmp2 ),               "more", "(more atbash09)" )             == "fix") return;
  if ( printMain( atbash19( strReverse( tmp2 )),  "more", "(more reverse & atbash19)" )   == "fix") return;
  if ( printMain( atbash09( strReverse( tmp2 )),  "more", "(more reverse & atbash09)" )   == "fix") return;
  
  
  
  
  // バイナリ
  if ( tmp2.match(/^([01]{8}\s?)+$/) ) {
    var tmpbin = binASCII( tmp2 );
    if ( printMain( tmpbin ,"more", "(more binASCII)" ) == "fix" ) return;
    if ( printMain( base64Enc( tmp2, "2" ), "more", "(more binASCII & Base64 encode)" )  == "fix" ) return;
    decodeBase64print( tmpbin );
  }
  
  // 10進数 48-57, 65-90 , 97-122
  if ( tmp2.match(decRE) ) {
    htmlTmp.push( "(more decASCII)" );
    var tmpdec = decASCII( tmp2 );
    if ( printMain( tmpdec ) == "fix") return; 
    if ( printMain( base64Enc( tmp2, "10"), "more", "(more Base64 encode)" ) == "fix" ) return;
    decodeBase64print( tmpdec );
  }
  
  // 8進数 60-71, 101-132, 141-172
  if (tmp2.match(octRE)) {
    htmlTmp.push("(more octASCII)");
    var tmpoct = octASCII( tmp2 );
    if ( printMain( tmpoct ) == "fix" ) return;
    if ( printMain( base64Enc(tmp2, "8"), "more", "(more Base64 encode)" ) == "fix" ) return;
    decodeBase64print( tmpoct );
  }
  
  // 16進数 30-39, 41-5a, 61-7a
  if ( tmp2.match( hexRE ) ) {
    htmlTmp.push( "(more hexASCII)" )
    var tmphex = hexASCII( tmp2 );
    if ( printMain( tmphex ) == "fix" ) return; 
    if ( printMain( base64Enc( tmp2, "12"), "more", "(more Base64 encode)" ) == "fix" ) return;
    decodeBase64print( tmphex );
  }
  
  // qwertyXYRE
  if (tmp2.match(qwertyXYRE)) {
    var tmpXY = qwertyXY( tmp2 );
    if (tmpXY) {
      if ( printMain( tmpXY, "more", "(more qwertyXY)" ) == "fix") return;
      if ( printMain( base64Enc( tmpXY ), "more", "(more Base64 encode)" ) == "fix" ) return;
      decodeBase64print( tmpXY );
    }
  }
  
  // 文字のみ
  if (tmp2.match(/^[a-z]+$/i)) {
          
    //abc012
    if ( printMain( decASCII( letter2Num( tmp2 )), "more", "(more abc012 > decASCII)" ) == "fix") return;

    //atbash > abc012
    if ( printMain( decASCII( letter2Num(atbash19( tmp2 ))), "more", "(more atbash > abc012 > decASCII)" ) == "fix") return;

    //reverse > abc012
    if ( printMain( decASCII( letter2Num(strReverse( tmp2 ))), "more", "(more reverse > abc012 > decASCII)" ) == "fix") return;

    //reverse atbash > abc012
    if ( printMain( decASCII( letter2Num(atbash19(strReverse( tmp2 )))), "more", "(more reverse atbash > abc012 > decASCII)" ) == "fix") return;
    
  }
  
  //00-25 012abc		
  if (tmp2.match(to012abcRE)) {
    if ( printMain( to012abcString( tmp2 ), "more", "(more 012abc)" ) == "fix") return;
    
  } 
  
  //01-26 123abc
  if (tmp2.match(to123abcRE)) {
    if ( printMain( to123abcString( tmp2 ), "more", "(more 123abc)" ) == "fix") return;

  }
  
  //Symbolを数字へ
  if (tmp2.match(symbolRE)) {
    htmlTmp.push( "(more symbol2Num)" );
    htmlCode( symbol2Num( tmp2 ));
  }
  
  // ローマ数字変換
  if ( printMain( romanExcTrigger( tmp2 ), "more", "(more Roman&Arabic num)" ) == "fix") return;
  
  // 6→vi
  var tmpVI = replaceVI(tmp2);
  if (tmpVI) {
    if ( printMain( tmpVI, "more", "(more 6 > vi )" ) == "fix") {
      htmlTmp.push(checkCodeHTML(tmpVI.replace(/vi/ig, "verum")));
      htmlTmp.push(checkCodeHTML(tmpVI.replace(/vi/ig, "inveniri")));
      return;
    }
  }

  // 82→lead
  var tmp82 = replace82(tmp2);
  if (tmp82) {
    if ( printMain( tmp82, "more", "(more 82 > lead )" ) == "fix") {
      return;
    }
  }			
  
  // go→stay 意味bash
  var tmpGo= replaceGo(tmp2);
  if (tmpGo) {
    if ( printMain( tmpGo, "more", "(more go <> stay )" ) == "fix") {
      return;
    }
  }			
              
              
  // kw有り数字部abc012
  var kwL= keywordCheck(tmp2);
  if (kwL[0]) {
    var tmpKw012= replaceKw012(tmp2, kwL[0]);
    if (tmpKw012) {
      if ( printMain( tmpKw012, "more", "(more kw有り数字部abc012)" ) == "fix") {
      return;
      }
    }
  }	
              
              
} // END function printCheck()

function printMain(tmp3, moreF, msg) {
  if (!tmp3) return "";
  
  var tmp3a=tmp3; //バックアップ
  
  // leet変換
  var leetL=leetKeyws();
  for (var i in leetL) {
    var leetRE=new RegExp(leetL[i][0], "ig");
    tmp3=tmp3.replace( leetRE, leetL[i][1]);
    //debug("tmp3=tmp3.replace("+leetRE+", "+leetL[i][1]+");");
  }
  
  // 1文字目抜きkw変換
  for (var i in nukikeyList) {
    //4文字以上を対象に
    if (nukikeyList[i].length<4) {
      continue;
    }
    var nukiRE=new RegExp(nukikeyList[i][0], "ig");
    var compRE=new RegExp(nukikeyList[i][1], "ig");
    if (!tmp3.match(compRE)) {
      tmp3=tmp3.replace(nukiRE, nukikeyList[i][1]);
    }
  }
  
  if (htmlCodeLabel) { htmlCodeLabel+=" "; }
  else { htmlCodeLabel=""; }
  if (htmlCodeBLabel) {htmlCodeBLabel=" "+ htmlCodeBLabel; }
  else { htmlCodeBLabel =""; }
  
  var tmp3RE=new RegExp("^"+tmp3a.replace(/[\]\[{}.\\?+*()|\-]/ig, "\\$&")+"$", "i");
  if (!tmp3.match(tmp3RE)) {
  //if (tmp3!=tmp3a) {
    if (checkPasscode(tmp3a)=="fix") { 
      htmlTmp.push( htmlCodeLabel+checkCodeHTML(tmp3a)+" <span class='leet'>置換&gt;&gt;</span> "+ htmlCodeBLabel);
      return "fix"; 
    }
  }
  
  if (moreF && moreF.match(/more/)) {
    // printCheck()からの呼び出し （すでにfixCodeList配列にあれば何もしない）
    // if (fixCodeList.indexOf(tmp3) >= 0 ) return "fix";
    if (checkPasscode(tmp3)=="fix") {
      htmlTmp.push( msg );
      htmlTmp.push( htmlCodeLabel+checkCodeHTML(tmp3)+ htmlCodeBLabel );
      return "fix";
    }

    // ローマ数字や文字数字変換
    if (formatExchange(tmp3, msg) == "fix") return "fix";
    
  } else {
    // デフォルト （初めてなので表示させる）
    htmlTmp.push( htmlCodeLabel+checkCodeHTML(tmp3a)+ htmlCodeBLabel);

    if (checkPasscode(tmp3)=="fix") {
      htmlTmp.push( htmlCodeLabel+checkCodeHTML(tmp3) + htmlCodeBLabel);
      return "fix";
    }

    // ローマ数字や文字数字変換
    if (formatExchange(tmp3) == "fix") return "fix";
    
  }		

} // END function printMain()

//base64 decode
function decodeBase64print(str) {
  if ( str.length%4 == 0 && str.match( /^[a-zA-Z0-9+\/]+=*$/ )) {
    if ( printMain( base64Dec(str), "more", "(more Base64 decode)" ) == "fix") return;
  }
}

// フォーマットになっているローマ数字を変換
function formatExchangeRoman(ferstr, orignal, msg) {
  var tmproman = romanExcTrigger( ferstr );
  if (tmproman == ferstr) return null;
  // if (fixCodeList.indexOf(tmproman) >= 0 ) return "fix";
  if (checkPasscode( tmproman ) == "fix") {
    htmlTmp.push( msg );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( orignal ) + htmlCodeBLabel );
    htmlTmp.push( "(and more Roman&Arabic num)" );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( tmproman ) + htmlCodeBLabel);
    return "fix";
  } else {
    return null;
  }
}

// フォーマットになっている文字数字を変換
function formatExchangeLetter(felstr, msg, orignal, msg2 ) {
  // if (fixCodeList.indexOf(felstr) >= 0 ) return "fix";
//debug("formatExchangeLetter()");
//debug("felstr: "+felstr);
//debug("checkPasscode: "+checkPasscode(felstr));
  if (checkPasscode( felstr ) == "fix") {
    htmlTmp.push( msg2 );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( orignal ) + htmlCodeBLabel );
    htmlTmp.push( `(and more ${msg} num)` );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( felstr ) + htmlCodeBLabel);
    return "fix";
  } else {
    return null;
  }
}

// 文字数字やローマ数字を置き換え
function formatExchange(str, msg) {
  
  // ローマ数字
  var tmproman = romanExcTrigger( str );
  if (fixCodeList.indexOf(tmproman) >= 0 ) return "fix";
  if (checkPasscode( tmproman ) == "fix") {
    htmlTmp.push( msg );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( str ) + htmlCodeBLabel );
    htmlTmp.push( "(and more Roman&Arabic num)" );
    htmlTmp.push( htmlCodeLabel+checkCodeHTML( tmproman ) + htmlCodeBLabel);
    return "fix";
  }
  
  // 完全文字数字
  if (str.match(numRE_full)) { 
    var tmpnum_full = one1full(str, 1);
    if (formatExchangeLetter( tmpnum_full, "full", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_full, str, msg ) == "fix") return "fix";
  }
  
  // 完全文字数字rvs
  if (str.match(numRE_full_rvs)) { 
    var tmpnum_full_rvs = one1full_rvs(str, 1);
    if (formatExchangeLetter( tmpnum_full_rvs, "full_rvs", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_full_rvs, str, msg ) == "fix") return "fix";
  }
  
  // フランス文字数字
  if (str.match(numRE_french)) { 
    var tmpnum_french = one1french(str, 1);
    if (formatExchangeLetter( tmpnum_french, "french", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_french, str, msg ) == "fix") return "fix";
  }
  
  // ドイツ文字数字
  if (str.match(numRE_german)) { 
    var tmpnum_german = one1german(str, 1);
    if (formatExchangeLetter( tmpnum_german, "german", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_german, str, msg ) == "fix") return "fix";
  }
  
  // 4文字数字
  if (str.match(numRE_four)) { 
    var tmpnum_four = one1four(str, 1);
    if (formatExchangeLetter( tmpnum_four, "four", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_four, str, msg ) == "fix") return "fix";
  }
  
  // 3文字数字
  if (str.match(numRE_three)) { 
    var tmpnum_three = one1three(str, 1);
    if (formatExchangeLetter( tmpnum_three, "three", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_three, str, msg ) == "fix") return "fix";
  }
  
  // 2文字数字
  if (str.match(numRE_two)) { 
    var tmpnum_two = one1two(str, 1);
    if (formatExchangeLetter( tmpnum_two, "two", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_two, str, msg ) == "fix") return "fix";
  }
  
  // ラスト2文字数字
  if (str.match(numRE_last)) { 
    var tmpnum_last = one1last(str, 1);
    if (formatExchangeLetter( tmpnum_last, "last", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_last, str, msg ) == "fix") return "fix";
  }
  
  // ラスト3文字数字
  if (str.match(numRE_last3)) { 
    var tmpnum_last3 = one1last3(str, 1);
    if (formatExchangeLetter( tmpnum_last3, "last3", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_last3, str, msg ) == "fix") return "fix";
  }
  
  // 先頭と末尾で2文字数字
  if (str.match(numRE_firstEnd)) { 
      var tmpnum_firstEnd = one1twoFirstEnd(str, 1);
    if (formatExchangeLetter( tmpnum_firstEnd, "firstEnd", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_firstEnd, str, msg ) == "fix") return "fix";
    }
  
  // 途中3文字数字
  if (str.match(numRE_mid3)) { 
    var tmpnum_mid3 = one1mid3(str, 1);
    if (formatExchangeLetter( tmpnum_mid3, "mid3", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_mid3, str, msg ) == "fix") return "fix";
  }
  
  // 途中2文字数字
  if (str.match(numRE_mid2)) { 
    var tmpnum_mid2 = one1mid2(str, 1);
    if (formatExchangeLetter( tmpnum_mid2, "mid2", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_mid2, str, msg ) == "fix") return "fix";
  }
  
  // ラテン完全文字数字
  if (str.match(numRE_latin)) { 
    var tmpnum_latin = one1latin(str, 1);
    if (formatExchangeLetter( tmpnum_latin, "latin", str ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_latin, str ) == "fix") return "fix";
  }
  
  // ラテン4文字数字
  if (str.match(numRE_latin4less)) { 
    var tmpnum_latin4less = one1latin4less(str, 1);
    if (formatExchangeLetter( tmpnum_latin4less, "latin4less", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_latin4less, str, msg ) == "fix") return "fix";
  }
  
  // 同音異義語数字
  if (str.match(numRE_homophone)) { 
    var tmpnum_homophone = one1homophone(str, 1);
  debug(tmpnum_homophone);
    if (formatExchangeLetter( tmpnum_homophone, "homophone", str, msg ) == "fix") return "fix";
    if (formatExchangeRoman( tmpnum_homophone, str, msg ) == "fix") return "fix";
  }
  
}	

  
// Numberの配列を返す
function addNum() {
  return "one|two|three|four|five|six|seven|eight|nine|zero|une|due|trois|quatre|cinq|sept|huit|neuf|thre|seve|eigh|thr|fou|fiv|sev|eig|nin|zer|on|tw|th|fo|fi|si|se|ei|ni|wo|ee|ur|ve|ix|en|ht|ne|ro|hre|our|ive|eve|igh|ine|ero|eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|orez|eins|zwei|drei|vier|funf|sechs|sieben|acht|neun|null|fore|nein".split("|");
}
function addNumFull() {
  return "one|two|three|four|five|six|seven|eight|nine|zero".split("|");
}
function addNumFull_rvs() {
  return "eno|owt|eerht|ruof|evif|xis|neves|thgie|enin|orez".split("|");
}
function addNumFrench() {
  return "une|due|trois|quatre|cinq|six|sept|huit|neuf|zero".split("|");
}
function addNumGerman() {
  return "eins|zwei|drei|vier|funf|sechs|sieben|acht|neun|null".split("|");
}
function addNumFour() {
  return "one|two|thre|four|five|seve|eigh|nine|zero".split("|");
}
function addNumThree() {
  return "one|two|thr|fou|fiv|six|sev|eig|nin|zer".split("|");
}
function addNumTwo() {
  return "on|tw|th|fo|fi|si|se|ei|ni|ze".split("|");
}
function addNumLast() {
  return "ne|wo|ee|ur|ve|ix|en|ht|ne|ro".split("|");
}
function addNumLast3() {
  return "one|two|ree|our|ive|six|ven|ght|ine|ero".split("|");
}
function addNumFirstEnd() {
  return "oe|to|te|fr|fe|sx|sn|et|ne|zo".split("|");
}
function addNumMid3() {
  return "one|two|hre|our|ive|six|eve|igh|ine|ero".split("|");
}
function addNumMid2() {
  return "ne|wo|hr|ou|iv|ix|ev|ig|in|er".split("|");
}
function addNumLatin() {
  return "singul|bin|tern|trin|quatern|quin|sen|septen|octon|noven".split("|");
}
function addNumLatin4less() {
  return "sing|bin|tern|trin|quat|quin|sen|sept|octo|nove".split("|");
}
function addNumHomophone() {
  return "fore|nein".split("|");
}

var numRE                = new RegExp( addNum().join("|"),                      "ig");
var numRE_fix            = new RegExp( "^" + addNum().join("|") + "$",          "ig");

var numRE_full           = new RegExp( addNumFull().join("|"),                  "ig");
var numRE_full_fix       = new RegExp( "^" + addNumFull().join("|") + "$",      "ig");

var numRE_full_rvs       = new RegExp( addNumFull_rvs().join("|"),              "ig");
var numRE_full_rvs_fix   = new RegExp( "^" + addNumFull_rvs().join("|") + "$",  "ig");

var numRE_french         = new RegExp( addNumFrench().join("|"),                "ig");
var numRE_french_fix     = new RegExp( "^" + addNumFrench().join("|") + "$",    "ig");

var numRE_german         = new RegExp( addNumGerman().join("|"),                "ig");
var numRE_german_fix     = new RegExp( "^" + addNumGerman().join("|") + "$",    "ig");

var numRE_four           = new RegExp( addNumFour().join("|"),                  "ig");
var numRE_four_fix       = new RegExp( "^" + addNumFour().join("|") + "$",      "ig");

var numRE_three          = new RegExp( addNumThree().join("|"),                 "ig");
var numRE_three_fix      = new RegExp( "^" + addNumThree().join("|") + "$",     "ig");

var numRE_two            = new RegExp( addNumTwo().join("|"),                   "ig");
var numRE_two_fix        = new RegExp( "^" + addNumTwo().join("|") + "$",       "ig");

var numRE_last           = new RegExp( addNumLast().join("|"),                  "ig");
var numRE_last_fix       = new RegExp( "^" + addNumLast().join("|") + "$",      "ig");

var numRE_last3           = new RegExp( addNumLast3().join("|"),                  "ig");
var numRE_last3_fix       = new RegExp( "^" + addNumLast3().join("|") + "$",      "ig");

var numRE_firstEnd           = new RegExp( addNumFirstEnd().join("|"),                  "ig");
var numRE_firstEnd_fix       = new RegExp( "^" + addNumFirstEnd().join("|") + "$",      "ig");

var numRE_mid3           = new RegExp( addNumMid3().join("|"),                  "ig");
var numRE_mid3_fix       = new RegExp( "^" + addNumMid3().join("|") + "$",      "ig");

var numRE_mid2           = new RegExp( addNumMid2().join("|"),                  "ig");
var numRE_mid2_fix       = new RegExp( "^" + addNumMid2().join("|") + "$",      "ig");

var numRE_latin          = new RegExp( addNumLatin().join("|"),                 "ig");
var numRE_latin_fix      = new RegExp( "^" + addNumLatin().join("|") + "$",     "ig");

var numRE_latin4less     = new RegExp( addNumLatin4less().join("|"),            "ig");
var numRE_latin4less_fix = new RegExp( "^" + addNumLatin4less().join("|") + "$","ig");

var numRE_homophone      = new RegExp( addNumHomophone().join("|"),            "ig");
var numRE_homophone_fix  = new RegExp( "^" + addNumHomophone().join("|") + "$","ig");


// ローマ数字入りパスコを正規化
function romanExchange(str, str2) {
    var tmpRE2=
      new RegExp("a|#|kw", "ig");
    var tmp2=str2.match(tmpRE2);
    var tmp3=[];
    
    var a="([a-z51])";
    var n="(i[vx]|v?i{1,4}|v|\\d)";
    var kw="(\\w+?)";
  
    for (var j in tmp2) {
      if (tmp2[j].match(/a/i)) {
        tmp3[j]=
          tmp2[j].replace(/a/i, a);
      } else if (tmp2[j].match(/#/i)) {
        tmp3[j]=
          tmp2[j].replace(/#/i, n);
      } else if (tmp2[j].match(/kw/i)) {
        tmp3[j]=
          tmp2[j].replace(/kw/i, kw);
      }
    }
    
    var tmpRE=
      new RegExp(
        "^"+tmp3.join("")+"$", "i");
    
    var tmp=str.match(tmpRE);
    var result=[];
    if (tmp) {
      var tmp2len=tmp2.length;
      for (var j=1; j<=tmp2len; j++) {
        if (tmp2[j-1].match(/a/i)) {
          tmp[j]=tmp[j].replace(/5/, "v");
          tmp[j]=tmp[j].replace(/1/, "i");
        } else if (tmp2[j-1].match(/#/i)) {
          tmp[j]=romanNum(tmp[j]);
        }
        result.push(tmp[j]);
      }
    }
    
    if (result) { return result.join(""); }
    else { return null; }
    
  } // end function
  
  // ローマ数字入パスコ正規化トリガー
  function romanExcTrigger(str) {
    var tmp=romanExchange(
                    str, "aaa##kw###aa");
    if (tmp) return tmp;
  
    var tmp=romanExchange(
                     str, "a#a#kwa#aa");
    if (tmp) return tmp;
  
    var tmp=romanExchange(
                     str, "#aaa#kwa#a#a");
    if (tmp) return tmp;
  
    var tmp=romanExchange(
                     str, "aaaaaaaa#kw#");
    if (tmp) return tmp;
    
    var tmp=romanExchange(
                     str, "kw#aa##aa#");
    if (tmp) return tmp;
    
    return str;
  } // end function



// =============  ここまで出力関係  ==============

    
// kw有り数字部abc012
function replaceKw012(str, kw) {	
   //alert("kw: "+kw+"\nkw.length: "+kw.length);
   var len = str.length - kw.length;
	var tmp1 = "([c-j])([a-hjkm-z]{3})([c-j])("+kw+")([a-hjkm-z])([c-j])([a-hjkm-z])([c-j])([a-hjkm-z])";
	var tmp2 = "([a-hjkm-z]{3})([c-j]{2})("+kw+")([c-j]{3})([a-hjkm-z]{2})";
	var tmp3 = "([a-hjkm-z])([a-j])([a-hjkm-z])([a-j])("+kw+")([a-hjkm-z])([a-j])([a-hjkm-z][a-hjkm-z])";
	var tmp4 = "("+kw+")([c-j])([a-hjkm-z][a-hjkm-z])([c-j][c-j])([a-hjkm-z][a-hjkm-z])([c-j])";
	var tmp5 = "([a-hjkm-z]{8})([c-j][c-j])("+kw+")([c-j][c-j])";
	var tmpRE = new RegExp( `^(${tmp1}|${tmp2}|${tmp3}|${tmp4}|${tmp5})$`, "i");
	
	if ( str.match(tmpRE) && len>=8 && len<=12) {
		var tmpRE1 = new RegExp("^"+tmp1+"$", "i");
		var tmpRE2 = new RegExp("^"+tmp2+"$", "i");
		var tmpRE3 = new RegExp("^"+tmp3+"$", "i");
		var tmpRE4 = new RegExp("^"+tmp4+"$", "i");
		var tmpRE5 = new RegExp("^"+tmp5+"$", "i");
		
		var str2 = "";
		if (str.match(tmpRE1) && len==10) { 
      str2 = str.replace(
        tmpRE1, 
        function (p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) { 
          return abc012(p1)+p2+abc012(p3)+p4+p5+abc012(p6)+p7+abc012(p8)+p9;
        }
      ); 
    } else if (str.match(tmpRE2) && len==10) { 
      str2 = str.replace(
        tmpRE2, 
        function (p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) { 
          return p1+abc012(p2)+p3+abc012(p4)+p5;
        }
      ); 
    } else if (str.match(tmpRE3) && len==8) { 
      str2 = str.replace(
        tmpRE3, 
        function (p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) { 	
          return p1+abc123(p2)+p3+abc123(p4)+p5+p6+abc123(p7)+p8;
        }
      ); 
    }	else if (str.match(tmpRE4) && len==8) { 
      str2 = str.replace(
        tmpRE4, 
        function (p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) { 	
          return p1+abc012(p2)+p3+abc012(p4)+p5+abc012(p6);
        }
      ); 
    } else if (str.match(tmpRE5) && len==12) { 
      str2 = str.replace(
        tmpRE5, 
        function (p0,p1,p2,p3,p4,p5,p6,p7,p8,p9) { 	
          return p1+abc012(p2)+p3+abc012(p4);
        }
      ); 
      debug(str2); 
    }	
 	
		return(str2);
	} else {
		return null;
	}
}

// go→stay
function replaceGo(str) {
	
	var tmp1 = "([2-9][a-hjkm-z]{3}[2-9])(go)([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])";
	var tmp2 = "([a-hjkm-z]{3}[2-9]{2})(go)([2-9]{3}[a-hjkm-z]{2})";
	var tmp3 = "([a-hjkm-z][0-9][a-hjkm-z][0-9])(go)([a-hjkm-z][0-9][a-hjkm-z][a-hjkm-z])";
	var tmp4 = "(go)([2-9][a-hjkm-z][a-hjkm-z][2-9][2-9][a-hjkm-z][a-hjkm-z][2-9])";
	var tmp5 = "([a-hjkm-z]{8}[2-9][2-9])(go)([2-9][2-9])";
	var tmpRE = new RegExp( `^(${tmp1}|${tmp2}|${tmp3}|${tmp4}|${tmp5})$`, "i");
	
	if ( str.match(tmpRE) ) {
	
		var tmpRE1 = new RegExp("^"+tmp1+"$", "i");
		var tmpRE2 = new RegExp("^"+tmp2+"$", "i");
		var tmpRE3 = new RegExp("^"+tmp3+"$", "i");
		var tmpRE4 = new RegExp("^"+tmp4+"$", "i");
		var tmpRE5 = new RegExp("^"+tmp5+"$", "i");
		
		var str2 = "";
		     if (str.match(tmpRE1)) { str2 = str.replace(tmpRE1, "$1stay$3"); } 
		else if (str.match(tmpRE2)) { str2 = str.replace(tmpRE2, "$1stay$3"); } 
		else if (str.match(tmpRE3)) { str2 = str.replace(tmpRE3, "$1stay$3"); } 
		else if (str.match(tmpRE4)) { str2 = str.replace(tmpRE4, "stay$2"  ); } 
		else if (str.match(tmpRE5)) { str2 = str.replace(tmpRE5, "$1stay$3"); }
	
		return(str2);
	} else {
		return null;
	}
}


// 82→lead
function replace82(str) {
	
	var tmp1 = "([2-9][a-hjkm-z]{3}[2-9])(Pb|82|R)([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])";
	var tmp2 = "([a-hjkm-z]{3}[2-9]{2})(Pb|82|R)([2-9]{3}[a-hjkm-z]{2})";
	var tmp3 = "([a-hjkm-z][0-9][a-hjkm-z][0-9])(Pb|82|R)([a-hjkm-z][0-9][a-hjkm-z][a-hjkm-z])";
	var tmp4 = "(Pb|82|R)([2-9][a-hjkm-z][a-hjkm-z][2-9][2-9][a-hjkm-z][a-hjkm-z][2-9])";
	var tmp5 = "([a-hjkm-z]{8}[2-9][2-9])(Pb|82|R)([2-9][2-9])";
	var tmpRE = new RegExp( `^(${tmp1}|${tmp2}|${tmp3}|${tmp4}|${tmp5})$`, "i");
	
	if ( str.match(tmpRE) ) {
	
		var tmpRE1 = new RegExp("^"+tmp1+"$", "i");
		var tmpRE2 = new RegExp("^"+tmp2+"$", "i");
		var tmpRE3 = new RegExp("^"+tmp3+"$", "i");
		var tmpRE4 = new RegExp("^"+tmp4+"$", "i");
		var tmpRE5 = new RegExp("^"+tmp5+"$", "i");
		
		var str2 = "";
		     if (str.match(tmpRE1)) { str2 = str.replace(tmpRE1, "$1lead$3"); } 
		else if (str.match(tmpRE2)) { str2 = str.replace(tmpRE2, "$1lead$3"); } 
		else if (str.match(tmpRE3)) { str2 = str.replace(tmpRE3, "$1lead$3"); } 
		else if (str.match(tmpRE4)) { str2 = str.replace(tmpRE4, "lead$2"  ); } 
		else if (str.match(tmpRE5)) { str2 = str.replace(tmpRE5, "$1lead$3"); }
	
		return(str2);
	} else {
		return null;
	}
}

// 6→vi
function replaceVI(str) {
	
	var tmp1 = "([2-9][a-hjkm-z]{3}[2-9])(6)([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])";
	var tmp2 = "([a-hjkm-z]{3}[2-9]{2})(6)([2-9]{3}[a-hjkm-z]{2})";
	var tmp3 = "([a-hjkm-z][0-9][a-hjkm-z][0-9])(6)([a-hjkm-z][0-9][a-hjkm-z][a-hjkm-z])";
	var tmp4 = "(6)([2-9][a-hjkm-z][a-hjkm-z][2-9][2-9][a-hjkm-z][a-hjkm-z][2-9])";
	var tmp5 = "([a-hjkm-z]{8}[2-9][2-9])(6)([2-9][2-9])";
	var tmpRE = new RegExp( `^(${tmp1}|${tmp2}|${tmp3}|${tmp4}|${tmp5})$`, "i");
	
	if ( str.match(tmpRE) ) {
	
		var tmpRE1 = new RegExp("^"+tmp1+"$", "i");
		var tmpRE2 = new RegExp("^"+tmp2+"$", "i");
		var tmpRE3 = new RegExp("^"+tmp3+"$", "i");
		var tmpRE4 = new RegExp("^"+tmp4+"$", "i");
		var tmpRE5 = new RegExp("^"+tmp5+"$", "i");
		
		var str2 = "";
		     if (str.match(tmpRE1)) { str2 = str.replace(tmpRE1, "$1vi$3"); } 
		else if (str.match(tmpRE2)) { str2 = str.replace(tmpRE2, "$1vi$3"); } 
		else if (str.match(tmpRE3)) { str2 = str.replace(tmpRE3, "$1vi$3"); } 
		else if (str.match(tmpRE4)) { str2 = str.replace(tmpRE4, "vi$2"  ); } 
		else if (str.match(tmpRE5)) { str2 = str.replace(tmpRE5, "$1vi$3"); }
	
		return(str2);
	} else {
		return null;
	}
}



//英数字変換
function one1(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE)) break;
    }
  }
    a=a.replace(/two/ig, "2");
    a=a.replace(/three/ig, "3");
    a=a.replace(/four/ig, "4");
    a=a.replace(/five/ig, "5");
    a=a.replace(/six/ig, "6");
    a=a.replace(/seven/ig, "7");
    a=a.replace(/eight/ig, "8");
    a=a.replace(/nine/ig, "9");
    a=a.replace(/owt/ig, "2");
    a=a.replace(/eerht/ig, "3");
    a=a.replace(/ruof/ig, "4");
    a=a.replace(/evif/ig, "5");
    a=a.replace(/xis/ig, "6");
    a=a.replace(/neves/ig, "7");
    a=a.replace(/thgie/ig, "8");
    a=a.replace(/enin/ig, "9");
    a=a.replace(/due/ig, "2");
    a=a.replace(/trois/ig, "3");
    a=a.replace(/quatre/ig, "4");
    a=a.replace(/cinq/ig, "5");
    a=a.replace(/sept/ig, "7");
    a=a.replace(/huit/ig, "8");
    a=a.replace(/neuf/ig, "9");
    a=a.replace(/thre/ig, "3");
    a=a.replace(/seve/ig, "7");
    a=a.replace(/eigh/ig, "8");
    a=a.replace(/thr/ig, "3");
    a=a.replace(/fou/ig, "4");
    a=a.replace(/fiv/ig, "5");
    a=a.replace(/sev/ig, "7");
    a=a.replace(/eig/ig, "8");
    a=a.replace(/nin/ig, "9");
    a=a.replace(/tw/ig, "2");
    a=a.replace(/th/ig, "3");
    a=a.replace(/fo/ig, "4");
    a=a.replace(/fi/ig, "5");
    a=a.replace(/si/ig, "6");
    a=a.replace(/se/ig, "7");
    a=a.replace(/ei/ig, "8");
    a=a.replace(/ni/ig, "9");
    a=a.replace(/bin/ig, "2");
    a=a.replace(/tern/ig, "3");
    a=a.replace(/trin/ig, "3");
    a=a.replace(/quatern/ig, "4");
    a=a.replace(/quin/ig, "5");
    a=a.replace(/sen/ig, "6");
    a=a.replace(/septen/ig, "7");
    a=a.replace(/octon/ig, "8");
    a=a.replace(/noven/ig, "9");
    a=a.replace(/bin/ig, "2");
    a=a.replace(/tern/ig, "3");
    a=a.replace(/trin/ig, "3");
    a=a.replace(/quat/ig, "4");
    a=a.replace(/quin/ig, "5");
    a=a.replace(/sen/ig, "6");
    a=a.replace(/sept/ig, "7");
    a=a.replace(/octo/ig, "8");
    a=a.replace(/nove/ig, "9");
    a=a.replace(/fore/ig, "4");
    a=a.replace(/nein/ig, "9");
    a=a.replace(/zwei/ig, "2");
    a=a.replace(/drei/ig, "3");
    a=a.replace(/vier/ig, "4");
    a=a.replace(/funf/ig, "5");
    a=a.replace(/sechs/ig, "6");
    a=a.replace(/sieben/ig, "7");
    a=a.replace(/acht/ig, "8");
    a=a.replace(/neun/ig, "9");
    if (flg) {
      a=a.replace(/one/ig, "1");
      a=a.replace(/zero/ig, "0");
      a=a.replace(/eno/ig, "1");
      a=a.replace(/orez/ig, "0");
      a=a.replace(/une/ig, "1");
      a=a.replace(/zer/ig, "0");
      a=a.replace(/on/ig, "1");
      a=a.replace(/ze/ig, "0");
      a=a.replace(/singul/ig, "1");
      a=a.replace(/sing/ig, "1");
      a=a.replace(/eins/ig, "1");
      a=a.replace(/null/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//英数字変換
function one1full(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_full_fix)) {
        break;
      }
    }
  }
    a=a.replace(/two/ig, "2");
    a=a.replace(/three/ig, "3");
    a=a.replace(/four/ig, "4");
    a=a.replace(/five/ig, "5");
    a=a.replace(/six/ig, "6");
    a=a.replace(/seven/ig, "7");
    a=a.replace(/eight/ig, "8");
    a=a.replace(/nine/ig, "9");
    if (flg) {
      a=a.replace(/one/ig, "1");
      a=a.replace(/zero/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//英数字変換reverse
function one1full_rvs(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_full_rvs_fix)) {
        break;
      }
    }
  }
    a=a.replace(/owt/ig, "2");
    a=a.replace(/eerht/ig, "3");
    a=a.replace(/ruof/ig, "4");
    a=a.replace(/evif/ig, "5");
    a=a.replace(/xis/ig, "6");
    a=a.replace(/neves/ig, "7");
    a=a.replace(/thgie/ig, "8");
    a=a.replace(/enin/ig, "9");
    if (flg) {
      a=a.replace(/eno/ig, "1");
      a=a.replace(/orez/ig, "0");
    }    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//フランス数字変換🇫🇷
function one1french(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_french_fix)) {
        break;
      }
    }
  }
    a=a.replace(/due/ig, "2");
    a=a.replace(/trois/ig, "3");
    a=a.replace(/quatre/ig, "4");
    a=a.replace(/cinq/ig, "5");
    a=a.replace(/six/ig, "6");
    a=a.replace(/sept/ig, "7");
    a=a.replace(/huit/ig, "8");
    a=a.replace(/neuf/ig, "9");
    if (flg) {
      a=a.replace(/one/ig, "1");
      a=a.replace(/zero/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//ドイツ数字変換🇩🇪
function one1german(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_german_fix)) {
        break;
      }
    }
  }
    a=a.replace(/zwei/ig, "2");
    a=a.replace(/drei/ig, "3");
    a=a.replace(/vier/ig, "4");
    a=a.replace(/funf/ig, "5");
    a=a.replace(/sechs/ig, "6");
    a=a.replace(/sieben/ig, "7");
    a=a.replace(/acht/ig, "8");
    a=a.replace(/neun/ig, "9");
    if (flg) {
      a=a.replace(/eins/ig, "1");
      a=a.replace(/null/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//4文字英数字変換
function one1four(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_four_fix)) {
        break;
      }
    }
  }
    a=a.replace(/thre/ig, "3");
    a=a.replace(/seve/ig, "7");
    a=a.replace(/eigh/ig, "8");
    if (flg) {
      //
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//3文字英数字変換
function one1three(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_three_fix)) {
        break;
      }
    }
  }
    a=a.replace(/thr/ig, "3");
    a=a.replace(/fou/ig, "4");
    a=a.replace(/fiv/ig, "5");
    a=a.replace(/sev/ig, "7");
    a=a.replace(/eig/ig, "8");
    a=a.replace(/nin/ig, "9");
    if (flg) {
      a=a.replace(/zer/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//2文字英数字変換
function one1two(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_two_fix)) {
        break;
      }
    }
  }
    a=a.replace(/tw/ig, "2");
    a=a.replace(/th/ig, "3");
    a=a.replace(/fo/ig, "4");
    a=a.replace(/fi/ig, "5");
    a=a.replace(/si/ig, "6");
    a=a.replace(/se/ig, "7");
    a=a.replace(/ei/ig, "8");
    a=a.replace(/ni/ig, "9");
    if (flg) {
      a=a.replace(/on/ig, "1");
      a=a.replace(/ze/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//末尾2文字英数字変換
function one1last(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_last_fix)) {
        break;
      }
    }
  }
    a=a.replace(/wo/ig, "2");
    a=a.replace(/ee/ig, "3");
    a=a.replace(/ur/ig, "4");
    a=a.replace(/ve/ig, "5");
    a=a.replace(/ix/ig, "6");
    a=a.replace(/en/ig, "7");
    a=a.replace(/ht/ig, "8");
    a=a.replace(/ne/ig, "9");
    if (flg) {
      a=a.replace(/ne/ig, "1");
      a=a.replace(/ro/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}


//末尾3文字英数字変換
function one1last3(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_last3_fix)) {
        break;
      }
    }
  }
    a=a.replace(/two/ig, "2");
    a=a.replace(/ree/ig, "3");
    a=a.replace(/our/ig, "4");
    a=a.replace(/ive/ig, "5");
    a=a.replace(/six/ig, "6");
    a=a.replace(/ven/ig, "7");
    a=a.replace(/ght/ig, "8");
    a=a.replace(/ine/ig, "9");
    if (flg) {
      a=a.replace(/one/ig, "1");
      a=a.replace(/ero/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}


//先頭と最末尾の2文字英数字変換
function one1twoFirstEnd(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_firstEnd_fix)) {
        break;
      }
    }
  }
    a=a.replace(/to/ig, "2");
    a=a.replace(/te/ig, "3");
    a=a.replace(/fr/ig, "4");
    a=a.replace(/fe/ig, "5");
    a=a.replace(/sx/ig, "6");
    a=a.replace(/sn/ig, "7");
    a=a.replace(/et/ig, "8");
    a=a.replace(/ne/ig, "9");
    if (flg) {
      a=a.replace(/oe/ig, "1");
      a=a.replace(/zo/ig, "0");
    }
    
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//途中3文字英数字変換
function one1mid3(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_mid3_fix)) {
        break;
      }
    }
  }
    a=a.replace(/two/ig, "2");
    a=a.replace(/hre/ig, "3");
    a=a.replace(/our/ig, "4");
    a=a.replace(/ive/ig, "5");
    a=a.replace(/six/ig, "6");
    a=a.replace(/eve/ig, "7");
    a=a.replace(/igh/ig, "8");
    a=a.replace(/ine/ig, "9");
    if (flg) {
      a=a.replace(/one/ig, "1");
      a=a.replace(/ero/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}


//途中2文字英数字変換
function one1mid2(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(numRE_mid2_fix)) {
        break;
      }
    }
  }
    a=a.replace(/wo/ig, "2");
    a=a.replace(/hr/ig, "3");
    a=a.replace(/ou/ig, "4");
    a=a.replace(/iv/ig, "5");
    a=a.replace(/ix/ig, "6");
    a=a.replace(/ev/ig, "7");
    a=a.replace(/ig/ig, "8");
    a=a.replace(/in/ig, "9");
    if (flg) {
      a=a.replace(/ne/ig, "1");
      a=a.replace(/er/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}


//ラテン語数字
function one1latin(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(
        numRE_latin_fix)) {
        break;
      }
    }
  }
    a=a.replace(/bin/ig, "2");
    a=a.replace(/tern/ig, "3");
    a=a.replace(/trin/ig, "3");
    a=a.replace(/quatern/ig, "4");
    a=a.replace(/quin/ig, "5");
    a=a.replace(/sen/ig, "6");
    a=a.replace(/septen/ig, "7");
    a=a.replace(/octon/ig, "8");
    a=a.replace(/noven/ig, "9");
    if (flg) {
      a=a.replace(/singul/ig, "1");
      a=a.replace(/null/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//ラテン語4文字以内数字
function one1latin4less(a, flg) {
  if (!a) return false;
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(
        numRE_latin4less_fix)) {
        break;
      }
    }
  }
    a=a.replace(/bin/ig, "2");
    a=a.replace(/tern/ig, "3");
    a=a.replace(/trin/ig, "3");
    a=a.replace(/quat/ig, "4");
    a=a.replace(/quin/ig, "5");
    a=a.replace(/sen/ig, "6");
    a=a.replace(/sept/ig, "7");
    a=a.replace(/octo/ig, "8");
    a=a.replace(/nove/ig, "9");
    if (flg) {
      a=a.replace(/sing/ig, "1");
      a=a.replace(/null/ig, "0");
    }
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    return a;
}

//======================================

//同音異義語数字 homophone
function one1homophone(a, flg) {
  if (!a) return false;
  //debug(["1", a]);
  var list=keywordCheck(a);
  if (list.length) {
    for (var i in list) {
      if (list[i].match(/^i$/i) || list[i].match(/^ni$/i)) continue;
      a=a.replace(
        list[i]
        , "-"+list[i].split("").join("-")+"-");
      if (list[i].match(
        numRE_homophone_fix)) {
        //debug(["2", list[i]]);
        break;
      }
    }
  }
  //debug(["3", a]);
    a=a.replace(/fore/ig, "4");
    a=a.replace(/nein/ig, "9");
    // if (flg) {
    //   a=a.replace(//ig, "1");
    //   a=a.replace(//ig, "0");
    // }
    //debug(["4", a]);
    var kwl=a.match(/-(\w-)+/g);
    for (var i in kwl) {
      a=a.replace(
        kwl[i], kwl[i].replace(/-/g, ""));
    }
    //debug(["5", a]);
    return a;
}


//パスコード判定 
// fix/keyword/format/number/none/url
function checkPasscode(str) {
  if (!str) return false;
  var result=str;
  if (
    str.match(
    /https?:\/\/([\w+].)*\w+\.\w+\/[\w/.&?$=]*/i) || 
    str.match(/^(goo\.?gl|bit\.?ly|tinyurl\.?com)/i)
    // str.match(/^(goo\.?gl|bit\.?ly|j\.?mp|tinyurl\.?com)/i)
    ) {
    return "url";
  }
  var kList=keywordCheck(str);
  var fmCheck=formatCheck(
    str,kList[0]);
  //debug("kList: "+kList);
  //debug("formatCheck: "+formatCheck(str,kList[0]));
  // keyw一致、フォーマット一致
  if (
    kList.length 
    && fmCheck.match(/fix/i)) {
      return "fix";
  } else if (
    str.match(numRE)) {
      return "number";
  } else if (kList[0]&&kList[0].length>=2) {
    return "keyword";
  } else if (fmCheck.match(/\w/)) {
    return "format";
  } else {
    return "none";
  }
}

// パスコードを色付け
function checkCodeHTML(str, noA) {
  if (!str) return false;
  var result="";
  
  // URLだった
  if (checkPasscode(str)=="url") {
    fixCodeList.push(str);
    result="<span class='url'>";
    result+="<a name='"+str+"' ";
    result+="href='";
    var tmpUrl=str;
    if (tmpUrl.match(/(goo)\.?(gl)\/?/i)) {
      tmpUrl=tmpUrl.replace(
        /(goo)\.?(gl)\/?/i, "http://$1.$2/")
    } 
    else if (tmpUrl.match(/(bit)\.?(ly)\/?/i)){
      tmpUrl=tmpUrl.replace(
        /(bit)\.?(ly)\/?/i, "http://$1.$2/")
    } 
    else if (tmpUrl.match(/(j)\.?(mp)\/?/i)){
      tmpUrl=tmpUrl.replace(
        /(j)\.?(mp)\/?/i, "http://$1.$2/")
    } 
    else if (tmpUrl.match(/(tinyurl)\.?(com)\/?/i)){
      tmpUrl=tmpUrl.replace(
        /(tinyurl)\.?(com)\/?/i, "http://$1.$2/")
    }
    result+=tmpUrl.replace(
      /^https?:/i,"googlechrome:");
    result+="'>"+str;
    result+="</a></span>";
    return result;
  }
  result=
    str.replace(/</g, "&lt;").replace(/>/g, "&gt;");
  var kList=keywordCheck(str);
  
  if (kList.length) {
    if (formatCheck(
         str, kList[0]).match(/fix/i)) {
      // keyw一致、フォーマット一致
      
      // 署名加工
      /*str=doooonSig(str);*/
      
      // 一致リストに追加
      var icchiFlag = 0;
      for (var i in fixCodeList) {
        if (str.toUpperCase() == fixCodeList[i].toUpperCase()) { icchiFlag = 1; break; }
      }
      if (!icchiFlag) fixCodeList.push(str);
      
      var re=
        new RegExp("("+kList[0]+")", "i");
      var re2=new RegExp("^"+kList[0]+"$", "i");
      var sstr=str.split(re);
      for (var i=0; i<sstr.length; i=i+1) {
        if (!sstr[i]) {
          sstr.splice(i,1); //空の配列を削除
          i=i-1;
          continue;
        }
        if (sstr[i].match(re2)) continue;
        sstr[i]=sstr[i].replace(/\d+/g, "<span class='num'>$&</span>");
      }
      result="";
      if (!noA==true) {
        // noA 正解パスコにnameを付ける
        result="<a name='"+str+"'></a>";
      }
      result+="<span class='fix'>";
      result+=sstr[0];
      if(leetLessKw.indexOf(kList[0])>=0) {
        result+=
          "<span class='fix-leetkw'>";
      } else {
        result+="<span class='fix-keyw'>";
      }
      result+=sstr[1];
    //result+=kList[0].replace(/\?|\\/g, "");
      result+="</span>";
      result+=sstr[2];
      result+="</span>";
      
      // leet変換
      var str2=str;
      var leetL=leetKeyws();
      for (var i in leetL) {
        var leetRE=new RegExp(
          leetL[i][0], "ig");
        if (str.match(leetRE)) {
          str=str.replace(
            leetRE, leetL[i][1]);
          kList[0]=leetL[i][1];
          break;
        }
      }
      
      // 1文字目抜きkw変換
      for (var i in nukikeyList) {
        //4文字以上を対象に
        if (nukikeyList[i].length<4) {
          continue;
        }
        var nukiRE=new RegExp(
          nukikeyList[i][0], "ig");
        var compRE=new RegExp(
          nukikeyList[i][1], "ig");
        if (!str.match(compRE)) {
          str=str.replace(
            nukiRE, nukikeyList[i][1]);
        }
      }
    
      var strRE=new RegExp("^"+str2.replace(/[\]\[{}.\\?+*()|\-]/ig, "\\$&")+"$", "i");
      if (!str.match(strRE)) {
      //if (str!=str2) {
        var re=new RegExp(kList[0], "i");
        var sstr=str.split(re);
        for (var i in sstr) {
          sstr[i]=sstr[i].replace(
            /\d+/g, 
            "<span class='num'>$&</span>");
        }
        result+=" <span class='leet'>(置換)</span> ";
        result+="<span class='fix'>";
        result+=sstr[0];
        result+="<span class='fix-keyw'>";
        result+=kList[0];
        result+="</span>";
        result+=sstr[1];
        result+="</span>";
      }
      return result;
      
    } else { 
      
      // keyw一致のみ
      
      // 1文字の"i"は除く
      for (var j in kList) {
        if (kList[j]=="i") kList.splice(j, 1);
      }
      /*alert(
        "kList.length="+kList.length
        +"\nkList="+kList.join(","));*/
      //keywordをマーク
      if (kList.length) {
        var re=new RegExp(
          kList.join("|"), "ig");
        var rpText="";
        if (leetLessKw.indexOf(kList[j])>=0) {
          rpText="<span class='leetkw'>";
        } else {
          rpText="<span class='keyw'>";
        }
        rpText+="$&";
        rpText+="</span>";
        result=result.replace(re, rpText);
      }
    }
  }
    
  var fmCheck=formatCheck(str);
  var isFormat=false;
  var isFormatSuspicion=false;
    
  if (fmCheck.match(/\?\?/)) {
    // フォーマットぽい 数字[0-9]
    isFormatSuspicion=true;
  } else if (fmCheck) {
    // フォーマット一致 数字[2-9]
    isFormat=true;
  }
    
  if (isFormat) {
    var result2=result;
    result="<span class='format'>";
    result+=result2;
    result+="</span>";
  } else if (isFormatSuspicion) {
    var result2=result;
    result="<span class='formatSusp'>";
    result+=result2;
    result+="</span>";
    /*
  } else if (
    fmCheck.match(/^nokeyword$/)) {
    result=result.replace(
      /[2-9][a-z]{3}[2-9][a-z][2-9][a-z][2-9][a-z]/ig, "<span class='nokeyword'>$&</span>");
    
  } else if (result.match(
      /[a-z]{3}[2-9]{2}[2-9]{3}[a-z]{2}/i)) {
    result=result.replace(
      /[a-z]{3}[2-9]{2}[2-9]{3}[a-z]{2}/ig, "<span class='nokeyword'>$&</span>");
    var result2=result;
    result="<span>";
    result+=result2;
    result+="</span>";
  } else {
    result=result.replace(
      /[2-9][a-z]{3}[2-9][a-z][2-9][a-z][2-9][a-z]/ig, "<span class='nokeyword'>$&</span>");
    var result2=result;
    result="<span>";
    result+=result2;
    result+="</span>";
    */
  }
  
  var reNum=new RegExp("(<span class=')keyw('>("+addNum().join("|")+")</span>)", "ig");
  result=result.replace(
    reNum, "$1num$2");
  
  var keyRE=new RegExp(
    "<span class='keyw'>.+?</span>",
    "ig");
  var tmpA=result.split(keyRE);
  var tmpKeyw=result.match(keyRE);
  for (var i in tmpA) {
    tmpA[i]=tmpA[i].replace(
      /\d+/g, 
      "<span class='num'>$&</span>");
  }
  result=tmpA[0];
  if (tmpKeyw) {
    for (var i in tmpKeyw) {
      result+=tmpKeyw[i]+tmpA[
        Number(i)+1];
    }
  }
  
  return "<div class='result'>"+result+"</div>";
}


// フォーマットチェック
function formatCheck(str, keyw) {
  if (!str) return false;
  var result="";
  var strKouseimoji = str.split("").filter((x, i, self) => self.indexOf(x) === i);


  var kwStr="";
  if (keyw) kwStr=keyw;
  else kwStr=".*";

  var re01s="^[2-9][a-hjkm-z0505]{3}[2-9]"+kwStr+"[a-hjkm-z05][2-9][a-hjkm-z05][2-9][a-hjkm-z05]$";
  var re01=new RegExp(re01s, "i");      // #aaa#[kw]a#a#a 旧 Daily
  var re01result="standard old";
  var re01resultFix="standard old fix";

  //var re02s="^[c-j][a-hjkm-z05]{3}[c-j]"+kwStr+"[a-hjkm-z05][c-j][a-hjkm-z05][c-j][a-hjkm-z05]$";
  //var re02=new RegExp(re02s, "i");      // #aaa#[kw]a#a#a 旧 Daily abc012
  //var re02result="standard old abc012";
  //var re02resultFix="standard old abc012 fix";

  var re03s="^"+kwStr+"[0-9][a-hjkm-z05]{2}[0-9][0-9][a-hjkm-z05]{2}[0-9]$";
  var re03=new RegExp(re03s, "i");      // [kw]#aa##aa# 長持ちパスコ
  var re03result="infinite";
  var re03resultFix="infinite fix";

  //var re04s="^"+kwStr+"[a-j][a-hjkm-z05]{2}[a-j][a-j][a-hjkm-z05]{2}[a-j]$";
  //var re04=new RegExp(re04s, "i");      // [kw]#aa##aa# 長持ちパスコ abc012
  //var re04result="infinite abc012";
  //var re04resultFix="infinite abc012 fix";

  var re05s="^[a-hjkm-z05]{3}[2-9]{2}"+kwStr+"[2-9]{3}[a-hjkm-z05]{2}$";
  var re05=new RegExp(re05s, "i");      // aaa##[kw]###aa new Daily 2016/06/16
  var re05result="standard new";
  var re05resultFix="standard new fix";

  //var re06s="^[a-hjkm-z05]{3}[c-j]{2}"+kwStr+"[c-j]{3}[a-hjkm-z05]{2}$";
  //var re06=new RegExp(re06s, "i");      // aaa##[kw]###aa new Daily 2016/06/16 abc012
  //var re06result="standard abc012 new";
  //var re06resultFix="standard abc012 new fix";

  var re07s="^[a-hjkm-z05][0-9][a-hjkm-z05][0-9]"+kwStr+"[a-hjkm-z05][0-9][a-hjkm-z05]{2}$";
  var re07=new RegExp(re07s, "i");      // a#a#[kw]a#aa new JoJo 2016/07/00
  var re07result="new JoJo";
  var re07resultFix="new JoJo fix";

  //var re08s="^[a-hjkm-z05][a-j][a-hjkm-z05][a-j]"+kwStr+"[a-hjkm-z05][a-j][a-hjkm-z05]{2}$";
  //var re08=new RegExp(re08s, "i");      // a#a#[kw]a#aa new JoJo 2016/07/00 abc012
  //var re08result="new JoJo abc012";
  //var re08resultFix="new JoJo abc012 fix";

  var re09s="^[a-hjkm-z05]{8}[2-9]"+kwStr+"[2-9]$";
  var re09=new RegExp(re09s, "i");      // aaaaaaaa#[kw]# anomaly
  var re09result="anomaly";
  var re09resultFix="anomaly fix";

  //var re10s="^[a-hjkm-z05]{8}[c-j]"+kwStr+"[c-j]$";
  //var re10=new RegExp(re10s, "i");      // aaaaaaaa#[kw]# anomaly abc012
  //var re10result="anomaly abc012";
  //var re10resultFix="anomaly abc012 fix";

  // 大体パスコは文字種5以上で30字以内だろうと思う
       if (str.match(re01) && keyw)                                     result = re01resultFix;
  else if (str.match(re01) && str.length<30 && strKouseimoji.length>=5) result = re01result;
//else if (str.match(re02) && keyw)                                     result = re02resultFix;
//else if (str.match(re02) && str.length<30 && strKouseimoji.length>=5) result = re02result;
  else if (str.match(re03) && keyw)                                     result = re03resultFix;
  else if (str.match(re03) && str.length<30 && strKouseimoji.length>=5) result = re03result;
//else if (str.match(re04) && keyw)                                     result = re04resultFix;
//else if (str.match(re04) && str.length<30 && strKouseimoji.length>=5) result = re04result;
  else if (str.match(re05) && keyw)                                     result = re05resultFix;
  else if (str.match(re05) && str.length<30 && strKouseimoji.length>=5) result = re05result;
//else if (str.match(re06) && keyw)                                     result = re06resultFix;
//else if (str.match(re06) && str.length<30 && strKouseimoji.length>=5) result = re06result;
  else if (str.match(re07) && keyw)                                     result = re07resultFix;
  else if (str.match(re07) && str.length<30 && strKouseimoji.length>=5) result = re07result;
//else if (str.match(re08) && keyw)                                     result = re08resultFix;
//else if (str.match(re08) && str.length<30 && strKouseimoji.length>=5) result = re08result;
  else if (str.match(re09) && keyw)                                     result = re09resultFix;
  else if (str.match(re09) && str.length<30 && strKouseimoji.length>=5) result = re09result;
//else if (str.match(re10) && keyw)                                     result = re10resultFix;
//else if (str.match(re10) && str.length<30 && strKouseimoji.length>=5) result = re10result;

  return result;
}

// 1文字目抜きキーワード追加
var nukikeyList=[];
(function () {
  var keyList=getKeyws();
  for (var i in keyList) {
    var tmp=keyList[i].split("");
    tmp.shift();
    var keyw=tmp.join("");
    var n=0;
    for (var j in keyList) {
      var nukiRE=new RegExp(keyw, "i");
      if (keyList[j].match(nukiRE)) n++;
    }
    if (n==1) nukikeyList.push(
      [ keyw, keyList[i] ] );
  }
})();

// キーワードチェック
function keywordCheck(str) {
  if (!str) return false;
    // マッチしたキーワードのリストを返す
    var result=[];
    var keyList=getKeyws();
    // 1文字目抜きキーワード追加
    var nukiKL=[];
    for (var i in nukikeyList) {
      //4文字以上を対象に
      if (nukikeyList[i].length<4) {
        continue;
      }
      nukiKL.push(nukikeyList[i][0]);
    }
    keyList=keyList.concat(nukiKL);
    

	/* 
	//ナンバー追加
    keyList=keyList.concat(addNum());
    */

	//キーワード追加JoJo
    keyList=
      keyList.concat(addKeywsJoJo());
    //leetキーワード追加
    var leetKLL=leetKeyws();
    var leetKL=[];
    for (var i in leetKLL) {
      leetKL.push(leetKLL[i][0]);
    }
    keyList=keyList.concat(leetKL);
    
    for (var i in keyList) {
        var re = new RegExp(keyList[i], "i");
        if (str.match(re)) {
            result.push(keyList[i]);
        }
    }
    var tmp=result.sort(
      arraySortLength).reverse();
      /*
      alert(
      "str="+str+"\nkeyw="+tmp.join(","));
      */
    return tmp;
}

// leetリストからkwを除く
function funcLeetLessKw() {
  if (leetLessKw.length>0) return;
    var result=[];
    
    var keyList=getKeyws();
    //キーワード追加
    keyList=keyList.concat(addNum());
    keyList=keyList.concat(addKeywsJoJo());
    
    //leetキーワード
    var leetKLL=leetKeyws();
    var leetKL=[];
    for (var i in leetKLL) {
      leetKL.push(leetKLL[i][0]);
    }
    
    var re = new RegExp(
      "^("+keyList.join("|")+")$", "ig");
    
    for (var i in leetKL) {
      if (!leetKL[i].match(re)) {
        result.push(leetKL[i]);
      }
    }
    
    leetLessKw=result.sort(
      arraySortLength).reverse();
    return;
}

