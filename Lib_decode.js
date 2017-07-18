
// Lib_decode
// #IMPORT Lib_decode_basic
// #LIB

function debug(myInput) {
  if (!Array.isArray(myInput)) {
    myInput=[myInput];
  }
  var tmp="<div class='debug'>";
  for (var i in myInput) {
    tmp+=myInput[i]+"\n";
  }
  tmp+="</div>";
  htmlTmp.push(tmp);
}

//===========
var fixCodeList=[];
var kouseimoji=[]; //構成文字リスト
var leetLessKw=[]; //kwを除くleetリスト
var startTime=new Date(); //スクリプト開始時刻
  
function htmlCode(tmp, addstr) {
	if (tmp==null) return "";
    
	function printCheck(tmp2) {
		if ( !tmp2 ) return "";
		
		if (printMain(tmp2)=="fix") return;
		
		if ( printMain( strReverse( tmp2 ), "more", "(more reverse)" )                       == "fix") return;
		if ( printMain( atbash19( tmp2 ), "more", "(more atbash19)" )                          == "fix") return;
		if ( printMain( atbash09( tmp2 ), "more", "(more atbash09)" )                        == "fix") return;
		if ( printMain( atbash19( strReverse( tmp2 )), "more", "(more reverse & atbash19)" )   == "fix") return;
		if ( printMain( atbash09( strReverse( tmp2 )), "more", "(more reverse & atbash09)" ) == "fix") return;
		
		var decRE      = new RegExp( "^(0??[4][8-9]|0??[5][0-7]|0??[6][5-9]|0??[7-8][0-9]|0??[9][0]|0??[9][7-9]|[1][0-1][0-9]|[1][2][0-2])+$", "");
		var octRE      = new RegExp( "^(0??[6][0-7]|0??[7][1]|[1][0][1-7]|[1][1-2][0-7]|[1][3][0-2]|[1][4][1-7]|[1][5-6][0-7]|[1][7][0-2])+$", "");
		var hexRE      = new RegExp( "^([3][0-9]|[4][1-9a-f]|[5][0-9a]|[6][1-9a-f]|[7][0-9a])+$", "i");
		var to012abcRE = new RegExp( "^([0-1][0-9]|2[0-5])+$", "i");
		var to123abcRE = new RegExp( "^(0[1-9]|1[0-9]|2[0-6])+$", "i");
		var qwertyXYRE = new RegExp( "^([0-9][0-3]\s*)+$", "i");
		var kwabc012RE = new RegExp( "^[a-z]+$", "i");
		var symbolRE   = new RegExp( "[!@#$%^&*()]", "g");
		
		//var abc012RE=new RegExp(
		//  "^[a-j]+$", "i");
		
		//base64 decode
		function decodeBase64print(str) {
			if ( str.length%4 == 0 && str.match( /^[a-zA-Z0-9+\/]+=*$/ )) {
				if ( printMain( base64Dec(str), "more", "(more Base64 decode)" ) == "fix") return;
			}
		}
		
		
		
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
	
	
	// フォーマットになっているローマ数字を変換
	function formatExchangeRoman(ferstr, orignal, msg) {
		var tmproman = romanExcTrigger( ferstr );
		if (tmproman == ferstr) return null;
		// if (fixCodeList.indexOf(tmproman) >= 0 ) return "fix";
		if (checkPasscode( tmproman ) == "fix") {
			htmlTmp.push( msg );
			htmlTmp.push( addstr+checkCodeHTML( orignal ) );
			htmlTmp.push( "(and more Roman&Arabic num)" );
			htmlTmp.push( addstr+checkCodeHTML( tmproman ));
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
			htmlTmp.push( addstr+checkCodeHTML( orignal ) );
			htmlTmp.push( `(and more ${msg} num)` );
			htmlTmp.push( addstr+checkCodeHTML( felstr ));
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
			htmlTmp.push( addstr+checkCodeHTML( str ) );
			htmlTmp.push( "(and more Roman&Arabic num)" );
			htmlTmp.push( addstr+checkCodeHTML( tmproman ));
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
		
		if (addstr) { addstr+=" "; }
		else { addstr=""; }
		
    var tmp3RE=new RegExp("^"+tmp3a.replace(/[\]\[{}.\\?+*()|\-]/ig, "\\$&")+"$", "i");
    if (!tmp3.match(tmp3RE)) {
    //if (tmp3!=tmp3a) {
			if (checkPasscode(tmp3a)=="fix") { 
				htmlTmp.push( addstr+checkCodeHTML(tmp3a)+" <span class='leet'>置換&gt;&gt;</span> ");
				return "fix"; 
			}
		}
		
		if (moreF && moreF.match(/more/)) {
			// printCheck()からの呼び出し （すでにfixCodeList配列にあれば何もしない）
			// if (fixCodeList.indexOf(tmp3) >= 0 ) return "fix";
			if (checkPasscode(tmp3)=="fix") {
				htmlTmp.push( msg );
				htmlTmp.push( addstr+checkCodeHTML(tmp3) );
				return "fix";
			}

			// ローマ数字や文字数字変換
			if (formatExchange(tmp3, msg) == "fix") return "fix";
			
		} else {
			// デフォルト （初めてなので表示させる）
			htmlTmp.push( addstr+checkCodeHTML(tmp3a));

			if (checkPasscode(tmp3)=="fix") {
 			  htmlTmp.push( addstr+checkCodeHTML(tmp3));
        return "fix";
      }

			// ローマ数字や文字数字変換
			if (formatExchange(tmp3) == "fix") return "fix";
			
		}		
		
	} // END function printMain()
	
	
	// チェック
	printCheck(tmp);  // 内部でprintMain()を呼び出していく
	
  // タイムスタンプ
  var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime'>"+ 
    (  
(d.getTime() -startTime.getTime()) /1000  
     ) + "s</div>"  
  );
	
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
	var tmp1 = "([c-j])([a-z]{3})([c-j])("+kw+")([a-z])([c-j])([a-z])([c-j])([a-z])";
	var tmp2 = "([a-z]{3})([c-j]{2})("+kw+")([c-j]{3})([a-z]{2})";
	var tmp3 = "([a-z])([a-j])([a-z])([a-j])("+kw+")([a-z])([a-j])([a-z][a-z])";
	var tmp4 = "("+kw+")([c-j])([a-z][a-z])([c-j][c-j])([a-z][a-z])([c-j])";
	var tmp5 = "([a-z]{8})([c-j][c-j])("+kw+")([c-j][c-j])";
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
	
	var tmp1 = "([2-9][a-z]{3}[2-9])(go)([a-z][2-9][a-z][2-9][a-z])";
	var tmp2 = "([a-z]{3}[2-9]{2})(go)([2-9]{3}[a-z]{2})";
	var tmp3 = "([a-z][0-9][a-z][0-9])(go)([a-z][0-9][a-z][a-z])";
	var tmp4 = "(go)([2-9][a-z][a-z][2-9][2-9][a-z][a-z][2-9])";
	var tmp5 = "([a-z]{8}[2-9][2-9])(go)([2-9][2-9])";
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
	
	var tmp1 = "([2-9][a-z]{3}[2-9])(82)([a-z][2-9][a-z][2-9][a-z])";
	var tmp2 = "([a-z]{3}[2-9]{2})(82)([2-9]{3}[a-z]{2})";
	var tmp3 = "([a-z][0-9][a-z][0-9])(82)([a-z][0-9][a-z][a-z])";
	var tmp4 = "(82)([2-9][a-z][a-z][2-9][2-9][a-z][a-z][2-9])";
	var tmp5 = "([a-z]{8}[2-9][2-9])(82)([2-9][2-9])";
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
	
	var tmp1 = "([2-9][a-z]{3}[2-9])(6)([a-z][2-9][a-z][2-9][a-z])";
	var tmp2 = "([a-z]{3}[2-9]{2})(6)([2-9]{3}[a-z]{2})";
	var tmp3 = "([a-z][0-9][a-z][0-9])(6)([a-z][0-9][a-z][a-z])";
	var tmp4 = "(6)([2-9][a-z][a-z][2-9][2-9][a-z][a-z][2-9])";
	var tmp5 = "([a-z]{8}[2-9][2-9])(6)([2-9][2-9])";
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


// UNIXタイムを日付へ(ミリ秒必須)
// 10桁なら×1000してミリ秒付けよう
function formatTime(time) {
  var date = new Date(time);
  var weekDayList = [ "日", "月", "火", "水", "木", "金", "土" ] ;
  var timeStr = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].join( '/' )
  + '(' + weekDayList[date.getDay()] + ')'
  + ' ' + [
    ( '0' + date.getHours() ).slice( -2 ),
    ( '0' + date.getMinutes() ).slice( -2 )
  ].join( ':' );
    return timeStr;
}



// 累乗数のリストを割り出す
function getRMPattern(sorce) {
  // スタックオーバーでエラーすることがある
  return null;
  //sorce="2764258729240164395";
  //sorce+="2512643433664289216";
  var map=[
    ["2","2"], 
    ["22", "4"], 
    ["222", "8"], 
    ["3", "3"], 
    ["33", "9"], 
    ["333", "27"], 
    ["4", "4"], 
    ["44", "16"], 
    ["444", "64"], 
    ["5", "5"], 
    ["55", "25"], 
    ["555", "125"], 
    ["6", "6"], 
    ["66", "36"], 
    ["666", "216"], 
    ["7", "7"], 
    ["77", "49"], 
    ["777", "343"], 
    ["7777", "2401"], 
    ["8", "8"], 
    ["88", "64"], 
    ["888", "512"], 
    ["9", "9"], 
    ["99", "81"], 
    ["999", "729"], 
    ["9999", "6561"]
  ];

  map.sort(function (next, prev) {
    return (
      Number(prev[1]) - Number(next[1]));
  });

  var targetlist=[]; //[[index],[累乗数]]
  for (var i in map) {
    var str=map[i][1];
    var rstr=map[i][1].replace(/./g,"=");
    var pos = sorce.indexOf(str);
    while ( pos != -1 ) {
      targetlist.push([pos,str]);
      sorce=sorce.replace(str,rstr);
      pos = sorce.indexOf(str, pos + 1);
    }
  }
  if (sorce.match(/[^=]/)) return null;

  targetlist.sort(function (next, prev) {
    return next[0] - prev[0];
  });

  var separatestr=[];
  for (var i in targetlist) {
    separatestr.push(targetlist[i][1]);
  }
  
  var targetlist=[];
  for (var i in separatestr) {
    targetlist[i]=[separatestr[i],[]];
    var tmpRE=new RegExp(
                       "^"+targetlist[i][0]+"$","")
    for (var j in map) {
      if (map[j][1].match(tmpRE)) {
        targetlist[i][1].push(map[j][0]);
      }
    }
  }
  //targetlist[0]=[ 積, [累乗パターン, ...] ]
  var result=[];
  for (var i in targetlist) {
    var resulttmp=[];
    for (var j in targetlist[i][1]) {
      if (i==0) {
        result[j]=targetlist[i][1][j];
      } else {
        var addarray=copyArray(result);
        for (var k in addarray) {
          addarray[k]+=" "+targetlist[i][1][j];
        }
        Array.prototype.push.apply(
          resulttmp, addarray);
      }
    }
    if (i>0) var result=resulttmp;
  }
  result.sort(arraySortNumber);
  return { 
    "list":result,
    "sorce":separatestr
  }
}





//数字[1-5]の回数0/1を繰り返す
function time2bin(str) {
  var result="";
  for (var i in str) {
    if (str[i].match(/\D/)) continue;
    if (i%2==1) {
      for (var j=1; j<=str[i]; j++) {
        result+="1";
      }
    } else if (i%2==0) {
      for (var j=1; j<=str[i]; j++) {
        result+="0";
      }
    }
  }
  return result;
}

//======================================

// Symbolを数フランスカナダ版)
function symbol2NumFrench(str) {
  str=str.replace(/!/g, "1");
  str=str.replace(/@/g, "2");
  str=str.replace(/#/g, "3");
  str=str.replace(/\$/g, "4");
  str=str.replace(/%/g, "5");
  str=str.replace(/\?/g, "6");
  str=str.replace(/&/g, "7");
  str=str.replace(/\*/g, "8");
  str=str.replace(/\(/g, "9");
  str=str.replace(/\)/g, "0");
  return str;
}

//======================================

// Symbolを数字へ
function symbol2Num(str) {
  str=str.replace(/!/g, "1");
  str=str.replace(/@/g, "2");
  str=str.replace(/#/g, "3");
  str=str.replace(/\$/g, "4");
  str=str.replace(/%/g, "5");
  str=str.replace(/\^/g, "6");
  str=str.replace(/&/g, "7");
  str=str.replace(/\*/g, "8");
  str=str.replace(/\(/g, "9");
  str=str.replace(/\)/g, "0");
  return str;
}

//======================================

// 数字をSymbolへ
function num2Symbol(str) {
  str=str.replace(/1/g, "!");
  str=str.replace(/2/g, "@");
  str=str.replace(/3/g, "#");
  str=str.replace(/4/g, "$");
  str=str.replace(/5/g, "%");
  str=str.replace(/6/g, "^");
  str=str.replace(/7/g, "&");
  str=str.replace(/8/g, "*");
  str=str.replace(/9/g, "(");
  str=str.replace(/0/g, ")");
  return str;
}

//======================================

// 素因数分解
// {num:素因数, r:指数}のリストを返す
function getPrime(num) { 
  var s=Math.floor(Math.sqrt(num)); 
  var repeatN=0; 
  var result=[];
  for (var i=2; i<=s; i++) { 
    if (num%i==0) { 
      repeatN=0;
      do { 
        repeatN++;
        num=num/i; 
      } while ((num%i) == 0); 
      result.push({num:i, r:repeatN}); 
    } 
  }
  if (num>s) result.push({num:num, r:1});
  return result; 
}

// 素因数分解の表示
function printPrimeStr(num) {
  var result="";
  var myObj=getPrime(num);
  for (var i in myObj) {
    for (var j=1; j<=myObj[i].r; j++) {
      if (result.length) result+="×";
      result+=myObj[i].num;
    }
  }
  return result;
}

// 素数かどうか確認 true/false
function isPrime(num) {
  //if (!num.match(/^\d+$/)) return false;

  if (num < 2) {
    return false;
  } else if (num == 2) {
    return true;
  }

  if (num % 2 == 0) return false;

  for (var i = 3; i <= num / i; i += 2) {
    if (num % i == 0) return false;
  }
  return true;
}

//======================================

// 100,000までの素数一覧から検索してindexを渡す
function getPrimeIndex(num) {
  var primeL=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997,1009,1013,1019,1021,1031,1033,1039,1049,1051,1061,1063,1069,1087,1091,1093,1097,1103,1109,1117,1123,1129,1151,1153,1163,1171,1181,1187,1193,1201,1213,1217,1223,1229,1231,1237,1249,1259,1277,1279,1283,1289,1291,1297,1301,1303,1307,1319,1321,1327,1361,1367,1373,1381,1399,1409,1423,1427,1429,1433,1439,1447,1451,1453,1459,1471,1481,1483,1487,1489,1493,1499,1511,1523,1531,1543,1549,1553,1559,1567,1571,1579,1583,1597,1601,1607,1609,1613,1619,1621,1627,1637,1657,1663,1667,1669,1693,1697,1699,1709,1721,1723,1733,1741,1747,1753,1759,1777,1783,1787,1789,1801,1811,1823,1831,1847,1861,1867,1871,1873,1877,1879,1889,1901,1907,1913,1931,1933,1949,1951,1973,1979,1987,1993,1997,1999,2003,2011,2017,2027,2029,2039,2053,2063,2069,2081,2083,2087,2089,2099,2111,2113,2129,2131,2137,2141,2143,2153,2161,2179,2203,2207,2213,2221,2237,2239,2243,2251,2267,2269,2273,2281,2287,2293,2297,2309,2311,2333,2339,2341,2347,2351,2357,2371,2377,2381,2383,2389,2393,2399,2411,2417,2423,2437,2441,2447,2459,2467,2473,2477,2503,2521,2531,2539,2543,2549,2551,2557,2579,2591,2593,2609,2617,2621,2633,2647,2657,2659,2663,2671,2677,2683,2687,2689,2693,2699,2707,2711,2713,2719,2729,2731,2741,2749,2753,2767,2777,2789,2791,2797,2801,2803,2819,2833,2837,2843,2851,2857,2861,2879,2887,2897,2903,2909,2917,2927,2939,2953,2957,2963,2969,2971,2999,3001,3011,3019,3023,3037,3041,3049,3061,3067,3079,3083,3089,3109,3119,3121,3137,3163,3167,3169,3181,3187,3191,3203,3209,3217,3221,3229,3251,3253,3257,3259,3271,3299,3301,3307,3313,3319,3323,3329,3331,3343,3347,3359,3361,3371,3373,3389,3391,3407,3413,3433,3449,3457,3461,3463,3467,3469,3491,3499,3511,3517,3527,3529,3533,3539,3541,3547,3557,3559,3571,3581,3583,3593,3607,3613,3617,3623,3631,3637,3643,3659,3671,3673,3677,3691,3697,3701,3709,3719,3727,3733,3739,3761,3767,3769,3779,3793,3797,3803,3821,3823,3833,3847,3851,3853,3863,3877,3881,3889,3907,3911,3917,3919,3923,3929,3931,3943,3947,3967,3989,4001,4003,4007,4013,4019,4021,4027,4049,4051,4057,4073,4079,4091,4093,4099,4111,4127,4129,4133,4139,4153,4157,4159,4177,4201,4211,4217,4219,4229,4231,4241,4243,4253,4259,4261,4271,4273,4283,4289,4297,4327,4337,4339,4349,4357,4363,4373,4391,4397,4409,4421,4423,4441,4447,4451,4457,4463,4481,4483,4493,4507,4513,4517,4519,4523,4547,4549,4561,4567,4583,4591,4597,4603,4621,4637,4639,4643,4649,4651,4657,4663,4673,4679,4691,4703,4721,4723,4729,4733,4751,4759,4783,4787,4789,4793,4799,4801,4813,4817,4831,4861,4871,4877,4889,4903,4909,4919,4931,4933,4937,4943,4951,4957,4967,4969,4973,4987,4993,4999,5003,5009,5011,5021,5023,5039,5051,5059,5077,5081,5087,5099,5101,5107,5113,5119,5147,5153,5167,5171,5179,5189,5197,5209,5227,5231,5233,5237,5261,5273,5279,5281,5297,5303,5309,5323,5333,5347,5351,5381,5387,5393,5399,5407,5413,5417,5419,5431,5437,5441,5443,5449,5471,5477,5479,5483,5501,5503,5507,5519,5521,5527,5531,5557,5563,5569,5573,5581,5591,5623,5639,5641,5647,5651,5653,5657,5659,5669,5683,5689,5693,5701,5711,5717,5737,5741,5743,5749,5779,5783,5791,5801,5807,5813,5821,5827,5839,5843,5849,5851,5857,5861,5867,5869,5879,5881,5897,5903,5923,5927,5939,5953,5981,5987,6007,6011,6029,6037,6043,6047,6053,6067,6073,6079,6089,6091,6101,6113,6121,6131,6133,6143,6151,6163,6173,6197,6199,6203,6211,6217,6221,6229,6247,6257,6263,6269,6271,6277,6287,6299,6301,6311,6317,6323,6329,6337,6343,6353,6359,6361,6367,6373,6379,6389,6397,6421,6427,6449,6451,6469,6473,6481,6491,6521,6529,6547,6551,6553,6563,6569,6571,6577,6581,6599,6607,6619,6637,6653,6659,6661,6673,6679,6689,6691,6701,6703,6709,6719,6733,6737,6761,6763,6779,6781,6791,6793,6803,6823,6827,6829,6833,6841,6857,6863,6869,6871,6883,6899,6907,6911,6917,6947,6949,6959,6961,6967,6971,6977,6983,6991,6997,7001,7013,7019,7027,7039,7043,7057,7069,7079,7103,7109,7121,7127,7129,7151,7159,7177,7187,7193,7207,7211,7213,7219,7229,7237,7243,7247,7253,7283,7297,7307,7309,7321,7331,7333,7349,7351,7369,7393,7411,7417,7433,7451,7457,7459,7477,7481,7487,7489,7499,7507,7517,7523,7529,7537,7541,7547,7549,7559,7561,7573,7577,7583,7589,7591,7603,7607,7621,7639,7643,7649,7669,7673,7681,7687,7691,7699,7703,7717,7723,7727,7741,7753,7757,7759,7789,7793,7817,7823,7829,7841,7853,7867,7873,7877,7879,7883,7901,7907,7919,7927,7933,7937,7949,7951,7963,7993,8009,8011,8017,8039,8053,8059,8069,8081,8087,8089,8093,8101,8111,8117,8123,8147,8161,8167,8171,8179,8191,8209,8219,8221,8231,8233,8237,8243,8263,8269,8273,8287,8291,8293,8297,8311,8317,8329,8353,8363,8369,8377,8387,8389,8419,8423,8429,8431,8443,8447,8461,8467,8501,8513,8521,8527,8537,8539,8543,8563,8573,8581,8597,8599,8609,8623,8627,8629,8641,8647,8663,8669,8677,8681,8689,8693,8699,8707,8713,8719,8731,8737,8741,8747,8753,8761,8779,8783,8803,8807,8819,8821,8831,8837,8839,8849,8861,8863,8867,8887,8893,8923,8929,8933,8941,8951,8963,8969,8971,8999,9001,9007,9011,9013,9029,9041,9043,9049,9059,9067,9091,9103,9109,9127,9133,9137,9151,9157,9161,9173,9181,9187,9199,9203,9209,9221,9227,9239,9241,9257,9277,9281,9283,9293,9311,9319,9323,9337,9341,9343,9349,9371,9377,9391,9397,9403,9413,9419,9421,9431,9433,9437,9439,9461,9463,9467,9473,9479,9491,9497,9511,9521,9533,9539,9547,9551,9587,9601,9613,9619,9623,9629,9631,9643,9649,9661,9677,9679,9689,9697,9719,9721,9733,9739,9743,9749,9767,9769,9781,9787,9791,9803,9811,9817,9829,9833,9839,9851,9857,9859,9871,9883,9887,9901,9907,9923,9929,9931,9941,9949,9967,9973,10007,10009,10037,10039,10061,10067,10069,10079,10091,10093,10099,10103,10111,10133,10139,10141,10151,10159,10163,10169,10177,10181,10193,10211,10223,10243,10247,10253,10259,10267,10271,10273,10289,10301,10303,10313,10321,10331,10333,10337,10343,10357,10369,10391,10399,10427,10429,10433,10453,10457,10459,10463,10477,10487,10499,10501,10513,10529,10531,10559,10567,10589,10597,10601,10607,10613,10627,10631,10639,10651,10657,10663,10667,10687,10691,10709,10711,10723,10729,10733,10739,10753,10771,10781,10789,10799,10831,10837,10847,10853,10859,10861,10867,10883,10889,10891,10903,10909,10937,10939,10949,10957,10973,10979,10987,10993,11003,11027,11047,11057,11059,11069,11071,11083,11087,11093,11113,11117,11119,11131,11149,11159,11161,11171,11173,11177,11197,11213,11239,11243,11251,11257,11261,11273,11279,11287,11299,11311,11317,11321,11329,11351,11353,11369,11383,11393,11399,11411,11423,11437,11443,11447,11467,11471,11483,11489,11491,11497,11503,11519,11527,11549,11551,11579,11587,11593,11597,11617,11621,11633,11657,11677,11681,11689,11699,11701,11717,11719,11731,11743,11777,11779,11783,11789,11801,11807,11813,11821,11827,11831,11833,11839,11863,11867,11887,11897,11903,11909,11923,11927,11933,11939,11941,11953,11959,11969,11971,11981,11987,12007,12011,12037,12041,12043,12049,12071,12073,12097,12101,12107,12109,12113,12119,12143,12149,12157,12161,12163,12197,12203,12211,12227,12239,12241,12251,12253,12263,12269,12277,12281,12289,12301,12323,12329,12343,12347,12373,12377,12379,12391,12401,12409,12413,12421,12433,12437,12451,12457,12473,12479,12487,12491,12497,12503,12511,12517,12527,12539,12541,12547,12553,12569,12577,12583,12589,12601,12611,12613,12619,12637,12641,12647,12653,12659,12671,12689,12697,12703,12713,12721,12739,12743,12757,12763,12781,12791,12799,12809,12821,12823,12829,12841,12853,12889,12893,12899,12907,12911,12917,12919,12923,12941,12953,12959,12967,12973,12979,12983,13001,13003,13007,13009,13033,13037,13043,13049,13063,13093,13099,13103,13109,13121,13127,13147,13151,13159,13163,13171,13177,13183,13187,13217,13219,13229,13241,13249,13259,13267,13291,13297,13309,13313,13327,13331,13337,13339,13367,13381,13397,13399,13411,13417,13421,13441,13451,13457,13463,13469,13477,13487,13499,13513,13523,13537,13553,13567,13577,13591,13597,13613,13619,13627,13633,13649,13669,13679,13681,13687,13691,13693,13697,13709,13711,13721,13723,13729,13751,13757,13759,13763,13781,13789,13799,13807,13829,13831,13841,13859,13873,13877,13879,13883,13901,13903,13907,13913,13921,13931,13933,13963,13967,13997,13999,14009,14011,14029,14033,14051,14057,14071,14081,14083,14087,14107,14143,14149,14153,14159,14173,14177,14197,14207,14221,14243,14249,14251,14281,14293,14303,14321,14323,14327,14341,14347,14369,14387,14389,14401,14407,14411,14419,14423,14431,14437,14447,14449,14461,14479,14489,14503,14519,14533,14537,14543,14549,14551,14557,14561,14563,14591,14593,14621,14627,14629,14633,14639,14653,14657,14669,14683,14699,14713,14717,14723,14731,14737,14741,14747,14753,14759,14767,14771,14779,14783,14797,14813,14821,14827,14831,14843,14851,14867,14869,14879,14887,14891,14897,14923,14929,14939,14947,14951,14957,14969,14983,15013,15017,15031,15053,15061,15073,15077,15083,15091,15101,15107,15121,15131,15137,15139,15149,15161,15173,15187,15193,15199,15217,15227,15233,15241,15259,15263,15269,15271,15277,15287,15289,15299,15307,15313,15319,15329,15331,15349,15359,15361,15373,15377,15383,15391,15401,15413,15427,15439,15443,15451,15461,15467,15473,15493,15497,15511,15527,15541,15551,15559,15569,15581,15583,15601,15607,15619,15629,15641,15643,15647,15649,15661,15667,15671,15679,15683,15727,15731,15733,15737,15739,15749,15761,15767,15773,15787,15791,15797,15803,15809,15817,15823,15859,15877,15881,15887,15889,15901,15907,15913,15919,15923,15937,15959,15971,15973,15991,16001,16007,16033,16057,16061,16063,16067,16069,16073,16087,16091,16097,16103,16111,16127,16139,16141,16183,16187,16189,16193,16217,16223,16229,16231,16249,16253,16267,16273,16301,16319,16333,16339,16349,16361,16363,16369,16381,16411,16417,16421,16427,16433,16447,16451,16453,16477,16481,16487,16493,16519,16529,16547,16553,16561,16567,16573,16603,16607,16619,16631,16633,16649,16651,16657,16661,16673,16691,16693,16699,16703,16729,16741,16747,16759,16763,16787,16811,16823,16829,16831,16843,16871,16879,16883,16889,16901,16903,16921,16927,16931,16937,16943,16963,16979,16981,16987,16993,17011,17021,17027,17029,17033,17041,17047,17053,17077,17093,17099,17107,17117,17123,17137,17159,17167,17183,17189,17191,17203,17207,17209,17231,17239,17257,17291,17293,17299,17317,17321,17327,17333,17341,17351,17359,17377,17383,17387,17389,17393,17401,17417,17419,17431,17443,17449,17467,17471,17477,17483,17489,17491,17497,17509,17519,17539,17551,17569,17573,17579,17581,17597,17599,17609,17623,17627,17657,17659,17669,17681,17683,17707,17713,17729,17737,17747,17749,17761,17783,17789,17791,17807,17827,17837,17839,17851,17863,17881,17891,17903,17909,17911,17921,17923,17929,17939,17957,17959,17971,17977,17981,17987,17989,18013,18041,18043,18047,18049,18059,18061,18077,18089,18097,18119,18121,18127,18131,18133,18143,18149,18169,18181,18191,18199,18211,18217,18223,18229,18233,18251,18253,18257,18269,18287,18289,18301,18307,18311,18313,18329,18341,18353,18367,18371,18379,18397,18401,18413,18427,18433,18439,18443,18451,18457,18461,18481,18493,18503,18517,18521,18523,18539,18541,18553,18583,18587,18593,18617,18637,18661,18671,18679,18691,18701,18713,18719,18731,18743,18749,18757,18773,18787,18793,18797,18803,18839,18859,18869,18899,18911,18913,18917,18919,18947,18959,18973,18979,19001,19009,19013,19031,19037,19051,19069,19073,19079,19081,19087,19121,19139,19141,19157,19163,19181,19183,19207,19211,19213,19219,19231,19237,19249,19259,19267,19273,19289,19301,19309,19319,19333,19373,19379,19381,19387,19391,19403,19417,19421,19423,19427,19429,19433,19441,19447,19457,19463,19469,19471,19477,19483,19489,19501,19507,19531,19541,19543,19553,19559,19571,19577,19583,19597,19603,19609,19661,19681,19687,19697,19699,19709,19717,19727,19739,19751,19753,19759,19763,19777,19793,19801,19813,19819,19841,19843,19853,19861,19867,19889,19891,19913,19919,19927,19937,19949,19961,19963,19973,19979,19991,19993,19997,20011,20021,20023,20029,20047,20051,20063,20071,20089,20101,20107,20113,20117,20123,20129,20143,20147,20149,20161,20173,20177,20183,20201,20219,20231,20233,20249,20261,20269,20287,20297,20323,20327,20333,20341,20347,20353,20357,20359,20369,20389,20393,20399,20407,20411,20431,20441,20443,20477,20479,20483,20507,20509,20521,20533,20543,20549,20551,20563,20593,20599,20611,20627,20639,20641,20663,20681,20693,20707,20717,20719,20731,20743,20747,20749,20753,20759,20771,20773,20789,20807,20809,20849,20857,20873,20879,20887,20897,20899,20903,20921,20929,20939,20947,20959,20963,20981,20983,21001,21011,21013,21017,21019,21023,21031,21059,21061,21067,21089,21101,21107,21121,21139,21143,21149,21157,21163,21169,21179,21187,21191,21193,21211,21221,21227,21247,21269,21277,21283,21313,21317,21319,21323,21341,21347,21377,21379,21383,21391,21397,21401,21407,21419,21433,21467,21481,21487,21491,21493,21499,21503,21517,21521,21523,21529,21557,21559,21563,21569,21577,21587,21589,21599,21601,21611,21613,21617,21647,21649,21661,21673,21683,21701,21713,21727,21737,21739,21751,21757,21767,21773,21787,21799,21803,21817,21821,21839,21841,21851,21859,21863,21871,21881,21893,21911,21929,21937,21943,21961,21977,21991,21997,22003,22013,22027,22031,22037,22039,22051,22063,22067,22073,22079,22091,22093,22109,22111,22123,22129,22133,22147,22153,22157,22159,22171,22189,22193,22229,22247,22259,22271,22273,22277,22279,22283,22291,22303,22307,22343,22349,22367,22369,22381,22391,22397,22409,22433,22441,22447,22453,22469,22481,22483,22501,22511,22531,22541,22543,22549,22567,22571,22573,22613,22619,22621,22637,22639,22643,22651,22669,22679,22691,22697,22699,22709,22717,22721,22727,22739,22741,22751,22769,22777,22783,22787,22807,22811,22817,22853,22859,22861,22871,22877,22901,22907,22921,22937,22943,22961,22963,22973,22993,23003,23011,23017,23021,23027,23029,23039,23041,23053,23057,23059,23063,23071,23081,23087,23099,23117,23131,23143,23159,23167,23173,23189,23197,23201,23203,23209,23227,23251,23269,23279,23291,23293,23297,23311,23321,23327,23333,23339,23357,23369,23371,23399,23417,23431,23447,23459,23473,23497,23509,23531,23537,23539,23549,23557,23561,23563,23567,23581,23593,23599,23603,23609,23623,23627,23629,23633,23663,23669,23671,23677,23687,23689,23719,23741,23743,23747,23753,23761,23767,23773,23789,23801,23813,23819,23827,23831,23833,23857,23869,23873,23879,23887,23893,23899,23909,23911,23917,23929,23957,23971,23977,23981,23993,24001,24007,24019,24023,24029,24043,24049,24061,24071,24077,24083,24091,24097,24103,24107,24109,24113,24121,24133,24137,24151,24169,24179,24181,24197,24203,24223,24229,24239,24247,24251,24281,24317,24329,24337,24359,24371,24373,24379,24391,24407,24413,24419,24421,24439,24443,24469,24473,24481,24499,24509,24517,24527,24533,24547,24551,24571,24593,24611,24623,24631,24659,24671,24677,24683,24691,24697,24709,24733,24749,24763,24767,24781,24793,24799,24809,24821,24841,24847,24851,24859,24877,24889,24907,24917,24919,24923,24943,24953,24967,24971,24977,24979,24989,25013,25031,25033,25037,25057,25073,25087,25097,25111,25117,25121,25127,25147,25153,25163,25169,25171,25183,25189,25219,25229,25237,25243,25247,25253,25261,25301,25303,25307,25309,25321,25339,25343,25349,25357,25367,25373,25391,25409,25411,25423,25439,25447,25453,25457,25463,25469,25471,25523,25537,25541,25561,25577,25579,25583,25589,25601,25603,25609,25621,25633,25639,25643,25657,25667,25673,25679,25693,25703,25717,25733,25741,25747,25759,25763,25771,25793,25799,25801,25819,25841,25847,25849,25867,25873,25889,25903,25913,25919,25931,25933,25939,25943,25951,25969,25981,25997,25999,26003,26017,26021,26029,26041,26053,26083,26099,26107,26111,26113,26119,26141,26153,26161,26171,26177,26183,26189,26203,26209,26227,26237,26249,26251,26261,26263,26267,26293,26297,26309,26317,26321,26339,26347,26357,26371,26387,26393,26399,26407,26417,26423,26431,26437,26449,26459,26479,26489,26497,26501,26513,26539,26557,26561,26573,26591,26597,26627,26633,26641,26647,26669,26681,26683,26687,26693,26699,26701,26711,26713,26717,26723,26729,26731,26737,26759,26777,26783,26801,26813,26821,26833,26839,26849,26861,26863,26879,26881,26891,26893,26903,26921,26927,26947,26951,26953,26959,26981,26987,26993,27011,27017,27031,27043,27059,27061,27067,27073,27077,27091,27103,27107,27109,27127,27143,27179,27191,27197,27211,27239,27241,27253,27259,27271,27277,27281,27283,27299,27329,27337,27361,27367,27397,27407,27409,27427,27431,27437,27449,27457,27479,27481,27487,27509,27527,27529,27539,27541,27551,27581,27583,27611,27617,27631,27647,27653,27673,27689,27691,27697,27701,27733,27737,27739,27743,27749,27751,27763,27767,27773,27779,27791,27793,27799,27803,27809,27817,27823,27827,27847,27851,27883,27893,27901,27917,27919,27941,27943,27947,27953,27961,27967,27983,27997,28001,28019,28027,28031,28051,28057,28069,28081,28087,28097,28099,28109,28111,28123,28151,28163,28181,28183,28201,28211,28219,28229,28277,28279,28283,28289,28297,28307,28309,28319,28349,28351,28387,28393,28403,28409,28411,28429,28433,28439,28447,28463,28477,28493,28499,28513,28517,28537,28541,28547,28549,28559,28571,28573,28579,28591,28597,28603,28607,28619,28621,28627,28631,28643,28649,28657,28661,28663,28669,28687,28697,28703,28711,28723,28729,28751,28753,28759,28771,28789,28793,28807,28813,28817,28837,28843,28859,28867,28871,28879,28901,28909,28921,28927,28933,28949,28961,28979,29009,29017,29021,29023,29027,29033,29059,29063,29077,29101,29123,29129,29131,29137,29147,29153,29167,29173,29179,29191,29201,29207,29209,29221,29231,29243,29251,29269,29287,29297,29303,29311,29327,29333,29339,29347,29363,29383,29387,29389,29399,29401,29411,29423,29429,29437,29443,29453,29473,29483,29501,29527,29531,29537,29567,29569,29573,29581,29587,29599,29611,29629,29633,29641,29663,29669,29671,29683,29717,29723,29741,29753,29759,29761,29789,29803,29819,29833,29837,29851,29863,29867,29873,29879,29881,29917,29921,29927,29947,29959,29983,29989,30011,30013,30029,30047,30059,30071,30089,30091,30097,30103,30109,30113,30119,30133,30137,30139,30161,30169,30181,30187,30197,30203,30211,30223,30241,30253,30259,30269,30271,30293,30307,30313,30319,30323,30341,30347,30367,30389,30391,30403,30427,30431,30449,30467,30469,30491,30493,30497,30509,30517,30529,30539,30553,30557,30559,30577,30593,30631,30637,30643,30649,30661,30671,30677,30689,30697,30703,30707,30713,30727,30757,30763,30773,30781,30803,30809,30817,30829,30839,30841,30851,30853,30859,30869,30871,30881,30893,30911,30931,30937,30941,30949,30971,30977,30983,31013,31019,31033,31039,31051,31063,31069,31079,31081,31091,31121,31123,31139,31147,31151,31153,31159,31177,31181,31183,31189,31193,31219,31223,31231,31237,31247,31249,31253,31259,31267,31271,31277,31307,31319,31321,31327,31333,31337,31357,31379,31387,31391,31393,31397,31469,31477,31481,31489,31511,31513,31517,31531,31541,31543,31547,31567,31573,31583,31601,31607,31627,31643,31649,31657,31663,31667,31687,31699,31721,31723,31727,31729,31741,31751,31769,31771,31793,31799,31817,31847,31849,31859,31873,31883,31891,31907,31957,31963,31973,31981,31991,32003,32009,32027,32029,32051,32057,32059,32063,32069,32077,32083,32089,32099,32117,32119,32141,32143,32159,32173,32183,32189,32191,32203,32213,32233,32237,32251,32257,32261,32297,32299,32303,32309,32321,32323,32327,32341,32353,32359,32363,32369,32371,32377,32381,32401,32411,32413,32423,32429,32441,32443,32467,32479,32491,32497,32503,32507,32531,32533,32537,32561,32563,32569,32573,32579,32587,32603,32609,32611,32621,32633,32647,32653,32687,32693,32707,32713,32717,32719,32749,32771,32779,32783,32789,32797,32801,32803,32831,32833,32839,32843,32869,32887,32909,32911,32917,32933,32939,32941,32957,32969,32971,32983,32987,32993,32999,33013,33023,33029,33037,33049,33053,33071,33073,33083,33091,33107,33113,33119,33149,33151,33161,33179,33181,33191,33199,33203,33211,33223,33247,33287,33289,33301,33311,33317,33329,33331,33343,33347,33349,33353,33359,33377,33391,33403,33409,33413,33427,33457,33461,33469,33479,33487,33493,33503,33521,33529,33533,33547,33563,33569,33577,33581,33587,33589,33599,33601,33613,33617,33619,33623,33629,33637,33641,33647,33679,33703,33713,33721,33739,33749,33751,33757,33767,33769,33773,33791,33797,33809,33811,33827,33829,33851,33857,33863,33871,33889,33893,33911,33923,33931,33937,33941,33961,33967,33997,34019,34031,34033,34039,34057,34061,34123,34127,34129,34141,34147,34157,34159,34171,34183,34211,34213,34217,34231,34253,34259,34261,34267,34273,34283,34297,34301,34303,34313,34319,34327,34337,34351,34361,34367,34369,34381,34403,34421,34429,34439,34457,34469,34471,34483,34487,34499,34501,34511,34513,34519,34537,34543,34549,34583,34589,34591,34603,34607,34613,34631,34649,34651,34667,34673,34679,34687,34693,34703,34721,34729,34739,34747,34757,34759,34763,34781,34807,34819,34841,34843,34847,34849,34871,34877,34883,34897,34913,34919,34939,34949,34961,34963,34981,35023,35027,35051,35053,35059,35069,35081,35083,35089,35099,35107,35111,35117,35129,35141,35149,35153,35159,35171,35201,35221,35227,35251,35257,35267,35279,35281,35291,35311,35317,35323,35327,35339,35353,35363,35381,35393,35401,35407,35419,35423,35437,35447,35449,35461,35491,35507,35509,35521,35527,35531,35533,35537,35543,35569,35573,35591,35593,35597,35603,35617,35671,35677,35729,35731,35747,35753,35759,35771,35797,35801,35803,35809,35831,35837,35839,35851,35863,35869,35879,35897,35899,35911,35923,35933,35951,35963,35969,35977,35983,35993,35999,36007,36011,36013,36017,36037,36061,36067,36073,36083,36097,36107,36109,36131,36137,36151,36161,36187,36191,36209,36217,36229,36241,36251,36263,36269,36277,36293,36299,36307,36313,36319,36341,36343,36353,36373,36383,36389,36433,36451,36457,36467,36469,36473,36479,36493,36497,36523,36527,36529,36541,36551,36559,36563,36571,36583,36587,36599,36607,36629,36637,36643,36653,36671,36677,36683,36691,36697,36709,36713,36721,36739,36749,36761,36767,36779,36781,36787,36791,36793,36809,36821,36833,36847,36857,36871,36877,36887,36899,36901,36913,36919,36923,36929,36931,36943,36947,36973,36979,36997,37003,37013,37019,37021,37039,37049,37057,37061,37087,37097,37117,37123,37139,37159,37171,37181,37189,37199,37201,37217,37223,37243,37253,37273,37277,37307,37309,37313,37321,37337,37339,37357,37361,37363,37369,37379,37397,37409,37423,37441,37447,37463,37483,37489,37493,37501,37507,37511,37517,37529,37537,37547,37549,37561,37567,37571,37573,37579,37589,37591,37607,37619,37633,37643,37649,37657,37663,37691,37693,37699,37717,37747,37781,37783,37799,37811,37813,37831,37847,37853,37861,37871,37879,37889,37897,37907,37951,37957,37963,37967,37987,37991,37993,37997,38011,38039,38047,38053,38069,38083,38113,38119,38149,38153,38167,38177,38183,38189,38197,38201,38219,38231,38237,38239,38261,38273,38281,38287,38299,38303,38317,38321,38327,38329,38333,38351,38371,38377,38393,38431,38447,38449,38453,38459,38461,38501,38543,38557,38561,38567,38569,38593,38603,38609,38611,38629,38639,38651,38653,38669,38671,38677,38693,38699,38707,38711,38713,38723,38729,38737,38747,38749,38767,38783,38791,38803,38821,38833,38839,38851,38861,38867,38873,38891,38903,38917,38921,38923,38933,38953,38959,38971,38977,38993,39019,39023,39041,39043,39047,39079,39089,39097,39103,39107,39113,39119,39133,39139,39157,39161,39163,39181,39191,39199,39209,39217,39227,39229,39233,39239,39241,39251,39293,39301,39313,39317,39323,39341,39343,39359,39367,39371,39373,39383,39397,39409,39419,39439,39443,39451,39461,39499,39503,39509,39511,39521,39541,39551,39563,39569,39581,39607,39619,39623,39631,39659,39667,39671,39679,39703,39709,39719,39727,39733,39749,39761,39769,39779,39791,39799,39821,39827,39829,39839,39841,39847,39857,39863,39869,39877,39883,39887,39901,39929,39937,39953,39971,39979,39983,39989,40009,40013,40031,40037,40039,40063,40087,40093,40099,40111,40123,40127,40129,40151,40153,40163,40169,40177,40189,40193,40213,40231,40237,40241,40253,40277,40283,40289,40343,40351,40357,40361,40387,40423,40427,40429,40433,40459,40471,40483,40487,40493,40499,40507,40519,40529,40531,40543,40559,40577,40583,40591,40597,40609,40627,40637,40639,40693,40697,40699,40709,40739,40751,40759,40763,40771,40787,40801,40813,40819,40823,40829,40841,40847,40849,40853,40867,40879,40883,40897,40903,40927,40933,40939,40949,40961,40973,40993,41011,41017,41023,41039,41047,41051,41057,41077,41081,41113,41117,41131,41141,41143,41149,41161,41177,41179,41183,41189,41201,41203,41213,41221,41227,41231,41233,41243,41257,41263,41269,41281,41299,41333,41341,41351,41357,41381,41387,41389,41399,41411,41413,41443,41453,41467,41479,41491,41507,41513,41519,41521,41539,41543,41549,41579,41593,41597,41603,41609,41611,41617,41621,41627,41641,41647,41651,41659,41669,41681,41687,41719,41729,41737,41759,41761,41771,41777,41801,41809,41813,41843,41849,41851,41863,41879,41887,41893,41897,41903,41911,41927,41941,41947,41953,41957,41959,41969,41981,41983,41999,42013,42017,42019,42023,42043,42061,42071,42073,42083,42089,42101,42131,42139,42157,42169,42179,42181,42187,42193,42197,42209,42221,42223,42227,42239,42257,42281,42283,42293,42299,42307,42323,42331,42337,42349,42359,42373,42379,42391,42397,42403,42407,42409,42433,42437,42443,42451,42457,42461,42463,42467,42473,42487,42491,42499,42509,42533,42557,42569,42571,42577,42589,42611,42641,42643,42649,42667,42677,42683,42689,42697,42701,42703,42709,42719,42727,42737,42743,42751,42767,42773,42787,42793,42797,42821,42829,42839,42841,42853,42859,42863,42899,42901,42923,42929,42937,42943,42953,42961,42967,42979,42989,43003,43013,43019,43037,43049,43051,43063,43067,43093,43103,43117,43133,43151,43159,43177,43189,43201,43207,43223,43237,43261,43271,43283,43291,43313,43319,43321,43331,43391,43397,43399,43403,43411,43427,43441,43451,43457,43481,43487,43499,43517,43541,43543,43573,43577,43579,43591,43597,43607,43609,43613,43627,43633,43649,43651,43661,43669,43691,43711,43717,43721,43753,43759,43777,43781,43783,43787,43789,43793,43801,43853,43867,43889,43891,43913,43933,43943,43951,43961,43963,43969,43973,43987,43991,43997,44017,44021,44027,44029,44041,44053,44059,44071,44087,44089,44101,44111,44119,44123,44129,44131,44159,44171,44179,44189,44201,44203,44207,44221,44249,44257,44263,44267,44269,44273,44279,44281,44293,44351,44357,44371,44381,44383,44389,44417,44449,44453,44483,44491,44497,44501,44507,44519,44531,44533,44537,44543,44549,44563,44579,44587,44617,44621,44623,44633,44641,44647,44651,44657,44683,44687,44699,44701,44711,44729,44741,44753,44771,44773,44777,44789,44797,44809,44819,44839,44843,44851,44867,44879,44887,44893,44909,44917,44927,44939,44953,44959,44963,44971,44983,44987,45007,45013,45053,45061,45077,45083,45119,45121,45127,45131,45137,45139,45161,45179,45181,45191,45197,45233,45247,45259,45263,45281,45289,45293,45307,45317,45319,45329,45337,45341,45343,45361,45377,45389,45403,45413,45427,45433,45439,45481,45491,45497,45503,45523,45533,45541,45553,45557,45569,45587,45589,45599,45613,45631,45641,45659,45667,45673,45677,45691,45697,45707,45737,45751,45757,45763,45767,45779,45817,45821,45823,45827,45833,45841,45853,45863,45869,45887,45893,45943,45949,45953,45959,45971,45979,45989,46021,46027,46049,46051,46061,46073,46091,46093,46099,46103,46133,46141,46147,46153,46171,46181,46183,46187,46199,46219,46229,46237,46261,46271,46273,46279,46301,46307,46309,46327,46337,46349,46351,46381,46399,46411,46439,46441,46447,46451,46457,46471,46477,46489,46499,46507,46511,46523,46549,46559,46567,46573,46589,46591,46601,46619,46633,46639,46643,46649,46663,46679,46681,46687,46691,46703,46723,46727,46747,46751,46757,46769,46771,46807,46811,46817,46819,46829,46831,46853,46861,46867,46877,46889,46901,46919,46933,46957,46993,46997,47017,47041,47051,47057,47059,47087,47093,47111,47119,47123,47129,47137,47143,47147,47149,47161,47189,47207,47221,47237,47251,47269,47279,47287,47293,47297,47303,47309,47317,47339,47351,47353,47363,47381,47387,47389,47407,47417,47419,47431,47441,47459,47491,47497,47501,47507,47513,47521,47527,47533,47543,47563,47569,47581,47591,47599,47609,47623,47629,47639,47653,47657,47659,47681,47699,47701,47711,47713,47717,47737,47741,47743,47777,47779,47791,47797,47807,47809,47819,47837,47843,47857,47869,47881,47903,47911,47917,47933,47939,47947,47951,47963,47969,47977,47981,48017,48023,48029,48049,48073,48079,48091,48109,48119,48121,48131,48157,48163,48179,48187,48193,48197,48221,48239,48247,48259,48271,48281,48299,48311,48313,48337,48341,48353,48371,48383,48397,48407,48409,48413,48437,48449,48463,48473,48479,48481,48487,48491,48497,48523,48527,48533,48539,48541,48563,48571,48589,48593,48611,48619,48623,48647,48649,48661,48673,48677,48679,48731,48733,48751,48757,48761,48767,48779,48781,48787,48799,48809,48817,48821,48823,48847,48857,48859,48869,48871,48883,48889,48907,48947,48953,48973,48989,48991,49003,49009,49019,49031,49033,49037,49043,49057,49069,49081,49103,49109,49117,49121,49123,49139,49157,49169,49171,49177,49193,49199,49201,49207,49211,49223,49253,49261,49277,49279,49297,49307,49331,49333,49339,49363,49367,49369,49391,49393,49409,49411,49417,49429,49433,49451,49459,49463,49477,49481,49499,49523,49529,49531,49537,49547,49549,49559,49597,49603,49613,49627,49633,49639,49663,49667,49669,49681,49697,49711,49727,49739,49741,49747,49757,49783,49787,49789,49801,49807,49811,49823,49831,49843,49853,49871,49877,49891,49919,49921,49927,49937,49939,49943,49957,49991,49993,49999,50021,50023,50033,50047,50051,50053,50069,50077,50087,50093,50101,50111,50119,50123,50129,50131,50147,50153,50159,50177,50207,50221,50227,50231,50261,50263,50273,50287,50291,50311,50321,50329,50333,50341,50359,50363,50377,50383,50387,50411,50417,50423,50441,50459,50461,50497,50503,50513,50527,50539,50543,50549,50551,50581,50587,50591,50593,50599,50627,50647,50651,50671,50683,50707,50723,50741,50753,50767,50773,50777,50789,50821,50833,50839,50849,50857,50867,50873,50891,50893,50909,50923,50929,50951,50957,50969,50971,50989,50993,51001,51031,51043,51047,51059,51061,51071,51109,51131,51133,51137,51151,51157,51169,51193,51197,51199,51203,51217,51229,51239,51241,51257,51263,51283,51287,51307,51329,51341,51343,51347,51349,51361,51383,51407,51413,51419,51421,51427,51431,51437,51439,51449,51461,51473,51479,51481,51487,51503,51511,51517,51521,51539,51551,51563,51577,51581,51593,51599,51607,51613,51631,51637,51647,51659,51673,51679,51683,51691,51713,51719,51721,51749,51767,51769,51787,51797,51803,51817,51827,51829,51839,51853,51859,51869,51871,51893,51899,51907,51913,51929,51941,51949,51971,51973,51977,51991,52009,52021,52027,52051,52057,52067,52069,52081,52103,52121,52127,52147,52153,52163,52177,52181,52183,52189,52201,52223,52237,52249,52253,52259,52267,52289,52291,52301,52313,52321,52361,52363,52369,52379,52387,52391,52433,52453,52457,52489,52501,52511,52517,52529,52541,52543,52553,52561,52567,52571,52579,52583,52609,52627,52631,52639,52667,52673,52691,52697,52709,52711,52721,52727,52733,52747,52757,52769,52783,52807,52813,52817,52837,52859,52861,52879,52883,52889,52901,52903,52919,52937,52951,52957,52963,52967,52973,52981,52999,53003,53017,53047,53051,53069,53077,53087,53089,53093,53101,53113,53117,53129,53147,53149,53161,53171,53173,53189,53197,53201,53231,53233,53239,53267,53269,53279,53281,53299,53309,53323,53327,53353,53359,53377,53381,53401,53407,53411,53419,53437,53441,53453,53479,53503,53507,53527,53549,53551,53569,53591,53593,53597,53609,53611,53617,53623,53629,53633,53639,53653,53657,53681,53693,53699,53717,53719,53731,53759,53773,53777,53783,53791,53813,53819,53831,53849,53857,53861,53881,53887,53891,53897,53899,53917,53923,53927,53939,53951,53959,53987,53993,54001,54011,54013,54037,54049,54059,54083,54091,54101,54121,54133,54139,54151,54163,54167,54181,54193,54217,54251,54269,54277,54287,54293,54311,54319,54323,54331,54347,54361,54367,54371,54377,54401,54403,54409,54413,54419,54421,54437,54443,54449,54469,54493,54497,54499,54503,54517,54521,54539,54541,54547,54559,54563,54577,54581,54583,54601,54617,54623,54629,54631,54647,54667,54673,54679,54709,54713,54721,54727,54751,54767,54773,54779,54787,54799,54829,54833,54851,54869,54877,54881,54907,54917,54919,54941,54949,54959,54973,54979,54983,55001,55009,55021,55049,55051,55057,55061,55073,55079,55103,55109,55117,55127,55147,55163,55171,55201,55207,55213,55217,55219,55229,55243,55249,55259,55291,55313,55331,55333,55337,55339,55343,55351,55373,55381,55399,55411,55439,55441,55457,55469,55487,55501,55511,55529,55541,55547,55579,55589,55603,55609,55619,55621,55631,55633,55639,55661,55663,55667,55673,55681,55691,55697,55711,55717,55721,55733,55763,55787,55793,55799,55807,55813,55817,55819,55823,55829,55837,55843,55849,55871,55889,55897,55901,55903,55921,55927,55931,55933,55949,55967,55987,55997,56003,56009,56039,56041,56053,56081,56087,56093,56099,56101,56113,56123,56131,56149,56167,56171,56179,56197,56207,56209,56237,56239,56249,56263,56267,56269,56299,56311,56333,56359,56369,56377,56383,56393,56401,56417,56431,56437,56443,56453,56467,56473,56477,56479,56489,56501,56503,56509,56519,56527,56531,56533,56543,56569,56591,56597,56599,56611,56629,56633,56659,56663,56671,56681,56687,56701,56711,56713,56731,56737,56747,56767,56773,56779,56783,56807,56809,56813,56821,56827,56843,56857,56873,56891,56893,56897,56909,56911,56921,56923,56929,56941,56951,56957,56963,56983,56989,56993,56999,57037,57041,57047,57059,57073,57077,57089,57097,57107,57119,57131,57139,57143,57149,57163,57173,57179,57191,57193,57203,57221,57223,57241,57251,57259,57269,57271,57283,57287,57301,57329,57331,57347,57349,57367,57373,57383,57389,57397,57413,57427,57457,57467,57487,57493,57503,57527,57529,57557,57559,57571,57587,57593,57601,57637,57641,57649,57653,57667,57679,57689,57697,57709,57713,57719,57727,57731,57737,57751,57773,57781,57787,57791,57793,57803,57809,57829,57839,57847,57853,57859,57881,57899,57901,57917,57923,57943,57947,57973,57977,57991,58013,58027,58031,58043,58049,58057,58061,58067,58073,58099,58109,58111,58129,58147,58151,58153,58169,58171,58189,58193,58199,58207,58211,58217,58229,58231,58237,58243,58271,58309,58313,58321,58337,58363,58367,58369,58379,58391,58393,58403,58411,58417,58427,58439,58441,58451,58453,58477,58481,58511,58537,58543,58549,58567,58573,58579,58601,58603,58613,58631,58657,58661,58679,58687,58693,58699,58711,58727,58733,58741,58757,58763,58771,58787,58789,58831,58889,58897,58901,58907,58909,58913,58921,58937,58943,58963,58967,58979,58991,58997,59009,59011,59021,59023,59029,59051,59053,59063,59069,59077,59083,59093,59107,59113,59119,59123,59141,59149,59159,59167,59183,59197,59207,59209,59219,59221,59233,59239,59243,59263,59273,59281,59333,59341,59351,59357,59359,59369,59377,59387,59393,59399,59407,59417,59419,59441,59443,59447,59453,59467,59471,59473,59497,59509,59513,59539,59557,59561,59567,59581,59611,59617,59621,59627,59629,59651,59659,59663,59669,59671,59693,59699,59707,59723,59729,59743,59747,59753,59771,59779,59791,59797,59809,59833,59863,59879,59887,59921,59929,59951,59957,59971,59981,59999,60013,60017,60029,60037,60041,60077,60083,60089,60091,60101,60103,60107,60127,60133,60139,60149,60161,60167,60169,60209,60217,60223,60251,60257,60259,60271,60289,60293,60317,60331,60337,60343,60353,60373,60383,60397,60413,60427,60443,60449,60457,60493,60497,60509,60521,60527,60539,60589,60601,60607,60611,60617,60623,60631,60637,60647,60649,60659,60661,60679,60689,60703,60719,60727,60733,60737,60757,60761,60763,60773,60779,60793,60811,60821,60859,60869,60887,60889,60899,60901,60913,60917,60919,60923,60937,60943,60953,60961,61001,61007,61027,61031,61043,61051,61057,61091,61099,61121,61129,61141,61151,61153,61169,61211,61223,61231,61253,61261,61283,61291,61297,61331,61333,61339,61343,61357,61363,61379,61381,61403,61409,61417,61441,61463,61469,61471,61483,61487,61493,61507,61511,61519,61543,61547,61553,61559,61561,61583,61603,61609,61613,61627,61631,61637,61643,61651,61657,61667,61673,61681,61687,61703,61717,61723,61729,61751,61757,61781,61813,61819,61837,61843,61861,61871,61879,61909,61927,61933,61949,61961,61967,61979,61981,61987,61991,62003,62011,62017,62039,62047,62053,62057,62071,62081,62099,62119,62129,62131,62137,62141,62143,62171,62189,62191,62201,62207,62213,62219,62233,62273,62297,62299,62303,62311,62323,62327,62347,62351,62383,62401,62417,62423,62459,62467,62473,62477,62483,62497,62501,62507,62533,62539,62549,62563,62581,62591,62597,62603,62617,62627,62633,62639,62653,62659,62683,62687,62701,62723,62731,62743,62753,62761,62773,62791,62801,62819,62827,62851,62861,62869,62873,62897,62903,62921,62927,62929,62939,62969,62971,62981,62983,62987,62989,63029,63031,63059,63067,63073,63079,63097,63103,63113,63127,63131,63149,63179,63197,63199,63211,63241,63247,63277,63281,63299,63311,63313,63317,63331,63337,63347,63353,63361,63367,63377,63389,63391,63397,63409,63419,63421,63439,63443,63463,63467,63473,63487,63493,63499,63521,63527,63533,63541,63559,63577,63587,63589,63599,63601,63607,63611,63617,63629,63647,63649,63659,63667,63671,63689,63691,63697,63703,63709,63719,63727,63737,63743,63761,63773,63781,63793,63799,63803,63809,63823,63839,63841,63853,63857,63863,63901,63907,63913,63929,63949,63977,63997,64007,64013,64019,64033,64037,64063,64067,64081,64091,64109,64123,64151,64153,64157,64171,64187,64189,64217,64223,64231,64237,64271,64279,64283,64301,64303,64319,64327,64333,64373,64381,64399,64403,64433,64439,64451,64453,64483,64489,64499,64513,64553,64567,64577,64579,64591,64601,64609,64613,64621,64627,64633,64661,64663,64667,64679,64693,64709,64717,64747,64763,64781,64783,64793,64811,64817,64849,64853,64871,64877,64879,64891,64901,64919,64921,64927,64937,64951,64969,64997,65003,65011,65027,65029,65033,65053,65063,65071,65089,65099,65101,65111,65119,65123,65129,65141,65147,65167,65171,65173,65179,65183,65203,65213,65239,65257,65267,65269,65287,65293,65309,65323,65327,65353,65357,65371,65381,65393,65407,65413,65419,65423,65437,65447,65449,65479,65497,65519,65521,65537,65539,65543,65551,65557,65563,65579,65581,65587,65599,65609,65617,65629,65633,65647,65651,65657,65677,65687,65699,65701,65707,65713,65717,65719,65729,65731,65761,65777,65789,65809,65827,65831,65837,65839,65843,65851,65867,65881,65899,65921,65927,65929,65951,65957,65963,65981,65983,65993,66029,66037,66041,66047,66067,66071,66083,66089,66103,66107,66109,66137,66161,66169,66173,66179,66191,66221,66239,66271,66293,66301,66337,66343,66347,66359,66361,66373,66377,66383,66403,66413,66431,66449,66457,66463,66467,66491,66499,66509,66523,66529,66533,66541,66553,66569,66571,66587,66593,66601,66617,66629,66643,66653,66683,66697,66701,66713,66721,66733,66739,66749,66751,66763,66791,66797,66809,66821,66841,66851,66853,66863,66877,66883,66889,66919,66923,66931,66943,66947,66949,66959,66973,66977,67003,67021,67033,67043,67049,67057,67061,67073,67079,67103,67121,67129,67139,67141,67153,67157,67169,67181,67187,67189,67211,67213,67217,67219,67231,67247,67261,67271,67273,67289,67307,67339,67343,67349,67369,67391,67399,67409,67411,67421,67427,67429,67433,67447,67453,67477,67481,67489,67493,67499,67511,67523,67531,67537,67547,67559,67567,67577,67579,67589,67601,67607,67619,67631,67651,67679,67699,67709,67723,67733,67741,67751,67757,67759,67763,67777,67783,67789,67801,67807,67819,67829,67843,67853,67867,67883,67891,67901,67927,67931,67933,67939,67943,67957,67961,67967,67979,67987,67993,68023,68041,68053,68059,68071,68087,68099,68111,68113,68141,68147,68161,68171,68207,68209,68213,68219,68227,68239,68261,68279,68281,68311,68329,68351,68371,68389,68399,68437,68443,68447,68449,68473,68477,68483,68489,68491,68501,68507,68521,68531,68539,68543,68567,68581,68597,68611,68633,68639,68659,68669,68683,68687,68699,68711,68713,68729,68737,68743,68749,68767,68771,68777,68791,68813,68819,68821,68863,68879,68881,68891,68897,68899,68903,68909,68917,68927,68947,68963,68993,69001,69011,69019,69029,69031,69061,69067,69073,69109,69119,69127,69143,69149,69151,69163,69191,69193,69197,69203,69221,69233,69239,69247,69257,69259,69263,69313,69317,69337,69341,69371,69379,69383,69389,69401,69403,69427,69431,69439,69457,69463,69467,69473,69481,69491,69493,69497,69499,69539,69557,69593,69623,69653,69661,69677,69691,69697,69709,69737,69739,69761,69763,69767,69779,69809,69821,69827,69829,69833,69847,69857,69859,69877,69899,69911,69929,69931,69941,69959,69991,69997,70001,70003,70009,70019,70039,70051,70061,70067,70079,70099,70111,70117,70121,70123,70139,70141,70157,70163,70177,70181,70183,70199,70201,70207,70223,70229,70237,70241,70249,70271,70289,70297,70309,70313,70321,70327,70351,70373,70379,70381,70393,70423,70429,70439,70451,70457,70459,70481,70487,70489,70501,70507,70529,70537,70549,70571,70573,70583,70589,70607,70619,70621,70627,70639,70657,70663,70667,70687,70709,70717,70729,70753,70769,70783,70793,70823,70841,70843,70849,70853,70867,70877,70879,70891,70901,70913,70919,70921,70937,70949,70951,70957,70969,70979,70981,70991,70997,70999,71011,71023,71039,71059,71069,71081,71089,71119,71129,71143,71147,71153,71161,71167,71171,71191,71209,71233,71237,71249,71257,71261,71263,71287,71293,71317,71327,71329,71333,71339,71341,71347,71353,71359,71363,71387,71389,71399,71411,71413,71419,71429,71437,71443,71453,71471,71473,71479,71483,71503,71527,71537,71549,71551,71563,71569,71593,71597,71633,71647,71663,71671,71693,71699,71707,71711,71713,71719,71741,71761,71777,71789,71807,71809,71821,71837,71843,71849,71861,71867,71879,71881,71887,71899,71909,71917,71933,71941,71947,71963,71971,71983,71987,71993,71999,72019,72031,72043,72047,72053,72073,72077,72089,72091,72101,72103,72109,72139,72161,72167,72169,72173,72211,72221,72223,72227,72229,72251,72253,72269,72271,72277,72287,72307,72313,72337,72341,72353,72367,72379,72383,72421,72431,72461,72467,72469,72481,72493,72497,72503,72533,72547,72551,72559,72577,72613,72617,72623,72643,72647,72649,72661,72671,72673,72679,72689,72701,72707,72719,72727,72733,72739,72763,72767,72797,72817,72823,72859,72869,72871,72883,72889,72893,72901,72907,72911,72923,72931,72937,72949,72953,72959,72973,72977,72997,73009,73013,73019,73037,73039,73043,73061,73063,73079,73091,73121,73127,73133,73141,73181,73189,73237,73243,73259,73277,73291,73303,73309,73327,73331,73351,73361,73363,73369,73379,73387,73417,73421,73433,73453,73459,73471,73477,73483,73517,73523,73529,73547,73553,73561,73571,73583,73589,73597,73607,73609,73613,73637,73643,73651,73673,73679,73681,73693,73699,73709,73721,73727,73751,73757,73771,73783,73819,73823,73847,73849,73859,73867,73877,73883,73897,73907,73939,73943,73951,73961,73973,73999,74017,74021,74027,74047,74051,74071,74077,74093,74099,74101,74131,74143,74149,74159,74161,74167,74177,74189,74197,74201,74203,74209,74219,74231,74257,74279,74287,74293,74297,74311,74317,74323,74353,74357,74363,74377,74381,74383,74411,74413,74419,74441,74449,74453,74471,74489,74507,74509,74521,74527,74531,74551,74561,74567,74573,74587,74597,74609,74611,74623,74653,74687,74699,74707,74713,74717,74719,74729,74731,74747,74759,74761,74771,74779,74797,74821,74827,74831,74843,74857,74861,74869,74873,74887,74891,74897,74903,74923,74929,74933,74941,74959,75011,75013,75017,75029,75037,75041,75079,75083,75109,75133,75149,75161,75167,75169,75181,75193,75209,75211,75217,75223,75227,75239,75253,75269,75277,75289,75307,75323,75329,75337,75347,75353,75367,75377,75389,75391,75401,75403,75407,75431,75437,75479,75503,75511,75521,75527,75533,75539,75541,75553,75557,75571,75577,75583,75611,75617,75619,75629,75641,75653,75659,75679,75683,75689,75703,75707,75709,75721,75731,75743,75767,75773,75781,75787,75793,75797,75821,75833,75853,75869,75883,75913,75931,75937,75941,75967,75979,75983,75989,75991,75997,76001,76003,76031,76039,76079,76081,76091,76099,76103,76123,76129,76147,76157,76159,76163,76207,76213,76231,76243,76249,76253,76259,76261,76283,76289,76303,76333,76343,76367,76369,76379,76387,76403,76421,76423,76441,76463,76471,76481,76487,76493,76507,76511,76519,76537,76541,76543,76561,76579,76597,76603,76607,76631,76649,76651,76667,76673,76679,76697,76717,76733,76753,76757,76771,76777,76781,76801,76819,76829,76831,76837,76847,76871,76873,76883,76907,76913,76919,76943,76949,76961,76963,76991,77003,77017,77023,77029,77041,77047,77069,77081,77093,77101,77137,77141,77153,77167,77171,77191,77201,77213,77237,77239,77243,77249,77261,77263,77267,77269,77279,77291,77317,77323,77339,77347,77351,77359,77369,77377,77383,77417,77419,77431,77447,77471,77477,77479,77489,77491,77509,77513,77521,77527,77543,77549,77551,77557,77563,77569,77573,77587,77591,77611,77617,77621,77641,77647,77659,77681,77687,77689,77699,77711,77713,77719,77723,77731,77743,77747,77761,77773,77783,77797,77801,77813,77839,77849,77863,77867,77893,77899,77929,77933,77951,77969,77977,77983,77999,78007,78017,78031,78041,78049,78059,78079,78101,78121,78137,78139,78157,78163,78167,78173,78179,78191,78193,78203,78229,78233,78241,78259,78277,78283,78301,78307,78311,78317,78341,78347,78367,78401,78427,78437,78439,78467,78479,78487,78497,78509,78511,78517,78539,78541,78553,78569,78571,78577,78583,78593,78607,78623,78643,78649,78653,78691,78697,78707,78713,78721,78737,78779,78781,78787,78791,78797,78803,78809,78823,78839,78853,78857,78877,78887,78889,78893,78901,78919,78929,78941,78977,78979,78989,79031,79039,79043,79063,79087,79103,79111,79133,79139,79147,79151,79153,79159,79181,79187,79193,79201,79229,79231,79241,79259,79273,79279,79283,79301,79309,79319,79333,79337,79349,79357,79367,79379,79393,79397,79399,79411,79423,79427,79433,79451,79481,79493,79531,79537,79549,79559,79561,79579,79589,79601,79609,79613,79621,79627,79631,79633,79657,79669,79687,79691,79693,79697,79699,79757,79769,79777,79801,79811,79813,79817,79823,79829,79841,79843,79847,79861,79867,79873,79889,79901,79903,79907,79939,79943,79967,79973,79979,79987,79997,79999,80021,80039,80051,80071,80077,80107,80111,80141,80147,80149,80153,80167,80173,80177,80191,80207,80209,80221,80231,80233,80239,80251,80263,80273,80279,80287,80309,80317,80329,80341,80347,80363,80369,80387,80407,80429,80447,80449,80471,80473,80489,80491,80513,80527,80537,80557,80567,80599,80603,80611,80621,80627,80629,80651,80657,80669,80671,80677,80681,80683,80687,80701,80713,80737,80747,80749,80761,80777,80779,80783,80789,80803,80809,80819,80831,80833,80849,80863,80897,80909,80911,80917,80923,80929,80933,80953,80963,80989,81001,81013,81017,81019,81023,81031,81041,81043,81047,81049,81071,81077,81083,81097,81101,81119,81131,81157,81163,81173,81181,81197,81199,81203,81223,81233,81239,81281,81283,81293,81299,81307,81331,81343,81349,81353,81359,81371,81373,81401,81409,81421,81439,81457,81463,81509,81517,81527,81533,81547,81551,81553,81559,81563,81569,81611,81619,81629,81637,81647,81649,81667,81671,81677,81689,81701,81703,81707,81727,81737,81749,81761,81769,81773,81799,81817,81839,81847,81853,81869,81883,81899,81901,81919,81929,81931,81937,81943,81953,81967,81971,81973,82003,82007,82009,82013,82021,82031,82037,82039,82051,82067,82073,82129,82139,82141,82153,82163,82171,82183,82189,82193,82207,82217,82219,82223,82231,82237,82241,82261,82267,82279,82301,82307,82339,82349,82351,82361,82373,82387,82393,82421,82457,82463,82469,82471,82483,82487,82493,82499,82507,82529,82531,82549,82559,82561,82567,82571,82591,82601,82609,82613,82619,82633,82651,82657,82699,82721,82723,82727,82729,82757,82759,82763,82781,82787,82793,82799,82811,82813,82837,82847,82883,82889,82891,82903,82913,82939,82963,82981,82997,83003,83009,83023,83047,83059,83063,83071,83077,83089,83093,83101,83117,83137,83177,83203,83207,83219,83221,83227,83231,83233,83243,83257,83267,83269,83273,83299,83311,83339,83341,83357,83383,83389,83399,83401,83407,83417,83423,83431,83437,83443,83449,83459,83471,83477,83497,83537,83557,83561,83563,83579,83591,83597,83609,83617,83621,83639,83641,83653,83663,83689,83701,83717,83719,83737,83761,83773,83777,83791,83813,83833,83843,83857,83869,83873,83891,83903,83911,83921,83933,83939,83969,83983,83987,84011,84017,84047,84053,84059,84061,84067,84089,84121,84127,84131,84137,84143,84163,84179,84181,84191,84199,84211,84221,84223,84229,84239,84247,84263,84299,84307,84313,84317,84319,84347,84349,84377,84389,84391,84401,84407,84421,84431,84437,84443,84449,84457,84463,84467,84481,84499,84503,84509,84521,84523,84533,84551,84559,84589,84629,84631,84649,84653,84659,84673,84691,84697,84701,84713,84719,84731,84737,84751,84761,84787,84793,84809,84811,84827,84857,84859,84869,84871,84913,84919,84947,84961,84967,84977,84979,84991,85009,85021,85027,85037,85049,85061,85081,85087,85091,85093,85103,85109,85121,85133,85147,85159,85193,85199,85201,85213,85223,85229,85237,85243,85247,85259,85297,85303,85313,85331,85333,85361,85363,85369,85381,85411,85427,85429,85439,85447,85451,85453,85469,85487,85513,85517,85523,85531,85549,85571,85577,85597,85601,85607,85619,85621,85627,85639,85643,85661,85667,85669,85691,85703,85711,85717,85733,85751,85781,85793,85817,85819,85829,85831,85837,85843,85847,85853,85889,85903,85909,85931,85933,85991,85999,86011,86017,86027,86029,86069,86077,86083,86111,86113,86117,86131,86137,86143,86161,86171,86179,86183,86197,86201,86209,86239,86243,86249,86257,86263,86269,86287,86291,86293,86297,86311,86323,86341,86351,86353,86357,86369,86371,86381,86389,86399,86413,86423,86441,86453,86461,86467,86477,86491,86501,86509,86531,86533,86539,86561,86573,86579,86587,86599,86627,86629,86677,86689,86693,86711,86719,86729,86743,86753,86767,86771,86783,86813,86837,86843,86851,86857,86861,86869,86923,86927,86929,86939,86951,86959,86969,86981,86993,87011,87013,87037,87041,87049,87071,87083,87103,87107,87119,87121,87133,87149,87151,87179,87181,87187,87211,87221,87223,87251,87253,87257,87277,87281,87293,87299,87313,87317,87323,87337,87359,87383,87403,87407,87421,87427,87433,87443,87473,87481,87491,87509,87511,87517,87523,87539,87541,87547,87553,87557,87559,87583,87587,87589,87613,87623,87629,87631,87641,87643,87649,87671,87679,87683,87691,87697,87701,87719,87721,87739,87743,87751,87767,87793,87797,87803,87811,87833,87853,87869,87877,87881,87887,87911,87917,87931,87943,87959,87961,87973,87977,87991,88001,88003,88007,88019,88037,88069,88079,88093,88117,88129,88169,88177,88211,88223,88237,88241,88259,88261,88289,88301,88321,88327,88337,88339,88379,88397,88411,88423,88427,88463,88469,88471,88493,88499,88513,88523,88547,88589,88591,88607,88609,88643,88651,88657,88661,88663,88667,88681,88721,88729,88741,88747,88771,88789,88793,88799,88801,88807,88811,88813,88817,88819,88843,88853,88861,88867,88873,88883,88897,88903,88919,88937,88951,88969,88993,88997,89003,89009,89017,89021,89041,89051,89057,89069,89071,89083,89087,89101,89107,89113,89119,89123,89137,89153,89189,89203,89209,89213,89227,89231,89237,89261,89269,89273,89293,89303,89317,89329,89363,89371,89381,89387,89393,89399,89413,89417,89431,89443,89449,89459,89477,89491,89501,89513,89519,89521,89527,89533,89561,89563,89567,89591,89597,89599,89603,89611,89627,89633,89653,89657,89659,89669,89671,89681,89689,89753,89759,89767,89779,89783,89797,89809,89819,89821,89833,89839,89849,89867,89891,89897,89899,89909,89917,89923,89939,89959,89963,89977,89983,89989,90001,90007,90011,90017,90019,90023,90031,90053,90059,90067,90071,90073,90089,90107,90121,90127,90149,90163,90173,90187,90191,90197,90199,90203,90217,90227,90239,90247,90263,90271,90281,90289,90313,90353,90359,90371,90373,90379,90397,90401,90403,90407,90437,90439,90469,90473,90481,90499,90511,90523,90527,90529,90533,90547,90583,90599,90617,90619,90631,90641,90647,90659,90677,90679,90697,90703,90709,90731,90749,90787,90793,90803,90821,90823,90833,90841,90847,90863,90887,90901,90907,90911,90917,90931,90947,90971,90977,90989,90997,91009,91019,91033,91079,91081,91097,91099,91121,91127,91129,91139,91141,91151,91153,91159,91163,91183,91193,91199,91229,91237,91243,91249,91253,91283,91291,91297,91303,91309,91331,91367,91369,91373,91381,91387,91393,91397,91411,91423,91433,91453,91457,91459,91463,91493,91499,91513,91529,91541,91571,91573,91577,91583,91591,91621,91631,91639,91673,91691,91703,91711,91733,91753,91757,91771,91781,91801,91807,91811,91813,91823,91837,91841,91867,91873,91909,91921,91939,91943,91951,91957,91961,91967,91969,91997,92003,92009,92033,92041,92051,92077,92083,92107,92111,92119,92143,92153,92173,92177,92179,92189,92203,92219,92221,92227,92233,92237,92243,92251,92269,92297,92311,92317,92333,92347,92353,92357,92363,92369,92377,92381,92383,92387,92399,92401,92413,92419,92431,92459,92461,92467,92479,92489,92503,92507,92551,92557,92567,92569,92581,92593,92623,92627,92639,92641,92647,92657,92669,92671,92681,92683,92693,92699,92707,92717,92723,92737,92753,92761,92767,92779,92789,92791,92801,92809,92821,92831,92849,92857,92861,92863,92867,92893,92899,92921,92927,92941,92951,92957,92959,92987,92993,93001,93047,93053,93059,93077,93083,93089,93097,93103,93113,93131,93133,93139,93151,93169,93179,93187,93199,93229,93239,93241,93251,93253,93257,93263,93281,93283,93287,93307,93319,93323,93329,93337,93371,93377,93383,93407,93419,93427,93463,93479,93481,93487,93491,93493,93497,93503,93523,93529,93553,93557,93559,93563,93581,93601,93607,93629,93637,93683,93701,93703,93719,93739,93761,93763,93787,93809,93811,93827,93851,93871,93887,93889,93893,93901,93911,93913,93923,93937,93941,93949,93967,93971,93979,93983,93997,94007,94009,94033,94049,94057,94063,94079,94099,94109,94111,94117,94121,94151,94153,94169,94201,94207,94219,94229,94253,94261,94273,94291,94307,94309,94321,94327,94331,94343,94349,94351,94379,94397,94399,94421,94427,94433,94439,94441,94447,94463,94477,94483,94513,94529,94531,94541,94543,94547,94559,94561,94573,94583,94597,94603,94613,94621,94649,94651,94687,94693,94709,94723,94727,94747,94771,94777,94781,94789,94793,94811,94819,94823,94837,94841,94847,94849,94873,94889,94903,94907,94933,94949,94951,94961,94993,94999,95003,95009,95021,95027,95063,95071,95083,95087,95089,95093,95101,95107,95111,95131,95143,95153,95177,95189,95191,95203,95213,95219,95231,95233,95239,95257,95261,95267,95273,95279,95287,95311,95317,95327,95339,95369,95383,95393,95401,95413,95419,95429,95441,95443,95461,95467,95471,95479,95483,95507,95527,95531,95539,95549,95561,95569,95581,95597,95603,95617,95621,95629,95633,95651,95701,95707,95713,95717,95723,95731,95737,95747,95773,95783,95789,95791,95801,95803,95813,95819,95857,95869,95873,95881,95891,95911,95917,95923,95929,95947,95957,95959,95971,95987,95989,96001,96013,96017,96043,96053,96059,96079,96097,96137,96149,96157,96167,96179,96181,96199,96211,96221,96223,96233,96259,96263,96269,96281,96289,96293,96323,96329,96331,96337,96353,96377,96401,96419,96431,96443,96451,96457,96461,96469,96479,96487,96493,96497,96517,96527,96553,96557,96581,96587,96589,96601,96643,96661,96667,96671,96697,96703,96731,96737,96739,96749,96757,96763,96769,96779,96787,96797,96799,96821,96823,96827,96847,96851,96857,96893,96907,96911,96931,96953,96959,96973,96979,96989,96997,97001,97003,97007,97021,97039,97073,97081,97103,97117,97127,97151,97157,97159,97169,97171,97177,97187,97213,97231,97241,97259,97283,97301,97303,97327,97367,97369,97373,97379,97381,97387,97397,97423,97429,97441,97453,97459,97463,97499,97501,97511,97523,97547,97549,97553,97561,97571,97577,97579,97583,97607,97609,97613,97649,97651,97673,97687,97711,97729,97771,97777,97787,97789,97813,97829,97841,97843,97847,97849,97859,97861,97871,97879,97883,97919,97927,97931,97943,97961,97967,97973,97987,98009,98011,98017,98041,98047,98057,98081,98101,98123,98129,98143,98179,98207,98213,98221,98227,98251,98257,98269,98297,98299,98317,98321,98323,98327,98347,98369,98377,98387,98389,98407,98411,98419,98429,98443,98453,98459,98467,98473,98479,98491,98507,98519,98533,98543,98561,98563,98573,98597,98621,98627,98639,98641,98663,98669,98689,98711,98713,98717,98729,98731,98737,98773,98779,98801,98807,98809,98837,98849,98867,98869,98873,98887,98893,98897,98899,98909,98911,98927,98929,98939,98947,98953,98963,98981,98993,98999,99013,99017,99023,99041,99053,99079,99083,99089,99103,99109,99119,99131,99133,99137,99139,99149,99173,99181,99191,99223,99233,99241,99251,99257,99259,99277,99289,99317,99347,99349,99367,99371,99377,99391,99397,99401,99409,99431,99439,99469,99487,99497,99523,99527,99529,99551,99559,99563,99571,99577,99581,99607,99611,99623,99643,99661,99667,99679,99689,99707,99709,99713,99719,99721,99733,99761,99767,99787,99793,99809,99817,99823,99829,99833,99839,99859,99871,99877,99881,99901,99907,99923,99929,99961,99971,99989,99991];
  return primeL.indexOf(num);
}

//======================================

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

//======================================

//構成文字種数
function defCharCount(str) {
  if (!str) return false;
  var chrs=str.split("");
  var tmp={};
  for (var i in chrs) {
    if (tmp[chrs[i]]) {
      tmp[chrs[i]]++;
    } else {
      tmp[chrs[i]]=1;
    }
  }
  return Object.keys(tmp).length;
}

//======================================

// Qwerty180度回転
function qwerty180(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
/*alert(
"str["+i+"]="+str[i]+"\n"+
"updown["+i+"]="+updown[i]+"\n"+
"re="+re+"\n"+
"map["+(3-j)+"]["+(9-k)+"]["+updown[i]+"]="+map[3-j][9-k][updown[i]]+"\n"+
"map["+(j)+"]["+(k)+"]["+updown[i]+"]="+map[j][k][updown[i]]+"\n"
);*/
          result.push(
            map[3-j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}

// Qwerty180度回転 OLD
function qwerty180_old(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");

  var result=[];
  var map=[
["1","2","3","4","5","6","7","8","9","0"],
["q","w","e","r","t","y","u","i","o","p"],
["a","s","d","f","g","h","j","k","l",";"],
["z","x","c","v","b","n","m",",",".","/"],
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var re=new RegExp(map[j][k], "i");
        if (str[i].match(re)) {
          result.push(map[3-j][9-k]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push(str[i]);
  }
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(result[i].match(/[a-z]/)) result[i]=result[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(result[i].match(/[A-Z]/)) result[i]=result[i].toLowerCase();
    }
  }
  return result.join("");
}

// Qwerty上下反転
function qwertyFlipV(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[3-j][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}

// Qwerty上下反転
function qwertyFlipV_old(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var str2="";
  for (var i in str) {
    if (str[i].match(/1/i)) {str2+="Z"}
    else if (str[i].match(/Q/i)) {str2+="A"}
    else if (str[i].match(/A/i)) {str2+="Q"}
    else if (str[i].match(/Z/i)) {str2+="1"}
    else if (str[i].match(/2/i)) {str2+="X"}
    else if (str[i].match(/W/i)) {str2+="S"}
    else if (str[i].match(/S/i)) {str2+="W"}
    else if (str[i].match(/X/i)) {str2+="2"}
    else if (str[i].match(/3/i)) {str2+="C"}
    else if (str[i].match(/E/i)) {str2+="D"}
    else if (str[i].match(/D/i)) {str2+="E"}
    else if (str[i].match(/C/i)) {str2+="3"}
    else if (str[i].match(/4/i)) {str2+="V"}
    else if (str[i].match(/R/i)) {str2+="F"}
    else if (str[i].match(/F/i)) {str2+="R"}
    else if (str[i].match(/V/i)) {str2+="4"}
    else if (str[i].match(/5/i)) {str2+="B"}
    else if (str[i].match(/T/i)) {str2+="G"}
    else if (str[i].match(/G/i)) {str2+="T"}
    else if (str[i].match(/B/i)) {str2+="5"}
    else if (str[i].match(/6/i)) {str2+="N"}
    else if (str[i].match(/Y/i)) {str2+="H"}
    else if (str[i].match(/H/i)) {str2+="Y"}
    else if (str[i].match(/N/i)) {str2+="6"}
    else if (str[i].match(/7/i)) {str2+="M"}
    else if (str[i].match(/U/i)) {str2+="J"}
    else if (str[i].match(/J/i)) {str2+="U"}
    else if (str[i].match(/M/i)) {str2+="7"}
    else if (str[i].match(/8/i)) {str2+=","}
    else if (str[i].match(/I/i)) {str2+="K"}
    else if (str[i].match(/K/i)) {str2+="I"}
    else if (str[i].match(/,/i)) {str2+="8"}
    else if (str[i].match(/9/i)) {str2+="."}
    else if (str[i].match(/O/i)) {str2+="L"}
    else if (str[i].match(/L/i)) {str2+="O"}
    else if (str[i].match(/\./i)) {str2+="9"}
    else if (str[i].match(/0/i)) {str2+="/"}
    else if (str[i].match(/P/i)) {str2+=";"}
    else if (str[i].match(/;/i)) {str2+="P"}
    else if (str[i].match(/\//i)) {str2+="0"}
    else { str2+=str[i]; }
  }
  var str3=str2.split("");
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(str3[i].match(/[a-z]/)) str3[i]=str3[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(str3[i].match(/[a-z]/)) str3[i]=str3[i].toLowerCase();
    }
  }
  return str3.join("");
}

// Qwerty左右反転
function qwertyFlipH(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}

// Qwerty左右反転
function qwertyFlipH_old(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var str2="";
  for (var i in str) {
    if (str[i].match(/1/i)) {str2+="0"}
    else if (str[i].match(/Q/i)) {str2+="P"}
    else if (str[i].match(/A/i)) {str2+=";"}
    else if (str[i].match(/Z/i)) {str2+="/"}
    else if (str[i].match(/2/i)) {str2+="9"}
    else if (str[i].match(/W/i)) {str2+="O"}
    else if (str[i].match(/S/i)) {str2+="L"}
    else if (str[i].match(/X/i)) {str2+="."}
    else if (str[i].match(/3/i)) {str2+="8"}
    else if (str[i].match(/E/i)) {str2+="I"}
    else if (str[i].match(/D/i)) {str2+="K"}
    else if (str[i].match(/C/i)) {str2+=","}
    else if (str[i].match(/4/i)) {str2+="7"}
    else if (str[i].match(/R/i)) {str2+="U"}
    else if (str[i].match(/F/i)) {str2+="J"}
    else if (str[i].match(/V/i)) {str2+="M"}
    else if (str[i].match(/5/i)) {str2+="6"}
    else if (str[i].match(/T/i)) {str2+="Y"}
    else if (str[i].match(/G/i)) {str2+="H"}
    else if (str[i].match(/B/i)) {str2+="N"}
    
    else if (str[i].match(/0/i)) {str2+="1"}
    else if (str[i].match(/P/i)) {str2+="Q"}
    else if (str[i].match(/;/i)) {str2+="A"}
    else if (str[i].match(/\//i)) {str2+="Z"}
    else if (str[i].match(/9/i)) {str2+="2"}
    else if (str[i].match(/O/i)) {str2+="W"}
    else if (str[i].match(/L/i)) {str2+="S"}
    else if (str[i].match(/\./i)) {str2+="X"}
    else if (str[i].match(/8/i)) {str2+="3"}
    else if (str[i].match(/I/i)) {str2+="E"}
    else if (str[i].match(/K/i)) {str2+="D"}
    else if (str[i].match(/,/i)) {str2+="C"}
    else if (str[i].match(/7/i)) {str2+="4"}
    else if (str[i].match(/U/i)) {str2+="R"}
    else if (str[i].match(/J/i)) {str2+="F"}
    else if (str[i].match(/M/i)) {str2+="V"}
    else if (str[i].match(/6/i)) {str2+="5"}
    else if (str[i].match(/Y/i)) {str2+="T"}
    else if (str[i].match(/H/i)) {str2+="G"}
    else if (str[i].match(/N/i)) {str2+="B"}
    else { str2+=str[i]; }
  }
  var str3=str2.split("");
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(str3[i].match(/[a-z]/)) str3[i]=str3[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(str3[i].match(/[A-Z]/)) str3[i]=str3[i].toLowerCase();
    }
  }
  return str3.join("");
}

// Qwerty上スライド
function qwertyTop(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[0][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}

// Qwerty上スライド
function qwertyTop_old(str) {
  if (!str) return false;
  str=str.replace(/[qaz]/gi, "1");
  str=str.replace(/[wsx]/gi, "2");
  str=str.replace(/[edc]/gi, "3");
  str=str.replace(/[rfv]/gi, "4");
  str=str.replace(/[tgb]/gi, "5");
  str=str.replace(/[yhn]/gi, "6");
  str=str.replace(/[ujm]/gi, "7");
  str=str.replace(/[ik,]/gi, "8");
  str=str.replace(/[ol.]/gi, "9");
  str=str.replace(/[p;\/]/gi, "0");
  return str;
}

// Qwerty左シフト
function qwertyLeft(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          if (k===0) k=10;
          result.push(
            map[j][k-1][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}

// Qwerty左シフト
function qwertyLeft_old(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    switch( true ){
        case /\[/i.test(a[i]):
            a[i] = "p";
            break;
        case /;/i.test(a[i]):
            a[i] = "l";
            break;
        case /-/i.test(a[i]):
            a[i] = "0";
            break;
        case /p/i.test(a[i]):
            a[i] = "o";
            break;
        case /l/i.test(a[i]):
            a[i] = "k";
            break;           
        case /,/i.test(a[i]):
            a[i] = "m";
            break;
        case /0/i.test(a[i]):
            a[i] = "9";
            break;
        case /o/i.test(a[i]):
            a[i] = "i";
            break;
        case /k/i.test(a[i]):
            a[i] = "j";
            break;
        case /m/i.test(a[i]):
            a[i] = "n";
            break;
        case /9/i.test(a[i]):
            a[i] = "8";
            break;
        case /i/i.test(a[i]):
            a[i] = "u";
            break;
        case /j/i.test(a[i]):
            a[i] = "h";
            break;
        case /n/i.test(a[i]):
            a[i] = "b";
            break;
        case /8/i.test(a[i]):
            a[i] = "7";
            break;
        case /u/i.test(a[i]):
            a[i] = "y";
            break;
        case /h/i.test(a[i]):
            a[i] = "g";
            break;
        case /b/i.test(a[i]):
            a[i] = "v";
            break;
        case /7/i.test(a[i]):
            a[i] = "6";
            break;
        case /y/i.test(a[i]):
            a[i] = "t";
            break;
        case /g/i.test(a[i]):
            a[i] = "f";
            break;
        case /v/i.test(a[i]):
            a[i] = "c";
            break;
        case /6/i.test(a[i]):
            a[i] = "5";
            break;
        case /t/i.test(a[i]):
            a[i] = "r";
            break;
        case /f/i.test(a[i]):
            a[i] = "d";
            break;
        case /c/i.test(a[i]):
            a[i] = "x";
            break;
        case /5/i.test(a[i]):
            a[i] = "4";
            break;
        case /r/i.test(a[i]):
            a[i] = "e";
            break;
        case /d/i.test(a[i]):
            a[i] = "s";
            break;
        case /x/i.test(a[i]):
            a[i] = "z";
            break;
        case /4/i.test(a[i]):
            a[i] = "3";
            break;
        case /e/i.test(a[i]):
            a[i] = "w";
            break;
        case /s/i.test(a[i]):
            a[i] = "a";
            break;
        case /3/i.test(a[i]):
            a[i] = "2";
            break;
        case /w/i.test(a[i]):
            a[i] = "q";
            break;
        case /2/i.test(a[i]):
            a[i] = "1";
            break;
        case /1/i.test(a[i]):
            a[i] = "*";
            break;
        case /q/i.test(a[i]):
            a[i] = "*";
            break;
        case /a/i.test(a[i]):
            a[i] = "*";
            break;
        case /z/i.test(a[i]):
            a[i] = "*";
            break;
    }
  }
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(a[i].match(/[a-z]/)) a[i]=a[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(a[i].match(/[A-Z]/)) a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// Qwerty座標
function qwertyXY(str) {
  // qを[1,1] yx
  var map=[
    ",1,2,3,4,5,6,7,8,9,0".split(","),
    ",q,w,e,r,t,y,u,i,o,p".split(","),
    ",a,s,d,f,g,h,j,k,l,".split(","),
    ",z,x,c,v,b,n,m,,,".split(",")
  ];
  
  if (str.match(/^([0-9][0-3][\s\/\-.,:])*[0-9][0-3]$/)) {
    var pair=str.match(/[0-9][0-3]/g);
    var result=[];
    for (var i in pair) {
      var xy=pair[i].split("");
      if (xy[0].match(/0/)) xy[0]=10;
      // mapはyx、入力はxy
      result.push(map[xy[1]][xy[0]]);
    }
    return result.join("");
  }
}

// Qwerty座標XXX
function qwertyXXX(str) {
  // qを[1,1] yx
  var map=[
    ",1,2,3,4,5,6,7,8,9,0".split(","),
    ",q,w,e,r,t,y,u,i,o,p".split(","),
    ",a,s,d,f,g,h,j,k,l,".split(","),
    ",z,x,c,v,b,n,m,,,".split(",")
  ];
  
  if (!str.match(
    /^(?:([0-9])\1*[\s\/\-.,:])*([0-9])\2*$/)
  ) {
    return false;
  }
    var target=str.match(/([0-9])\1*/g);
    var result=[];
    for (var i in target) {
      var xy=[target[i][0],target[i].length];
      if (xy[0].match(/0/)) xy[0]=10;
      // mapはyx、入力はxy
      result.push(map[xy[1]][xy[0]]);
    }
    return result.join("");
}

//======================================

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

// どんなKeywordが抽出可能か調べる
// Keywordの長さ指定可能
function keySyougou(source, len, terget) {
  var result=[];
  var keys=[];

  //キーワード追加
  if (terget && terget.match(/^daily$/i)) {
     keys=getKeyws();
  } else if (terget && terget.match(/^jojo$/i)) {
     keys=keys.concat(addKeywsJoJo());
  } else {
     keys=getKeyws();
     keys=keys.concat(addKeywsJoJo());
  }  

  for (var i=0; i<keys.length; i++) {
    keys[i]=keys[i].replace(/\(\?<?[!=].+?\)/g, "");
    if (len>0 && keys[i].length!=len) {
      continue;
    }
    var flag=true;
    var source2=source;
    for (var j=0; j<keys[i].length; j++) {
      var re = new RegExp(keys[i][j], "i");
      if (source2.match(re) && flag) {
        source2=source2.replace(re, "*");
      } else {
        flag = false;
        break;
      }
    }
    if (flag) result.push(keys[i]);
  } // for keys.length
  result.sort(function(a,b){
    if( a.length > b.length) return -1;
    if( a.length < b.length) return 1;
    return 0;
  });

  return result;
} // end function

// リバース
function strReverse(str) {
  if (!str) return false;
    str=str.split("").reverse().join("");
    return str;
}

//配列ソート(文字の長さ)
function arraySortLength(prev, next) {
    return prev.length - next.length;
}

//配列ソート(数字の大きさ昇順)
function arraySortNumber(a, b) {
  if( a < b ) return -1;
  if( a > b ) return 1;
  return 0;
}
  


// 二次元配列の縦横を入れ換える
function rectReflect(rect) {
  var y=rect.length;
  var x=rect[0].length;
  var newRect=[];
  for (var j=0; j<x; j++) {
    var tmp=[];
    for(var i=0; i<y; i++) {
      tmp.push(rect[i][j]);
    }
    newRect[j]=tmp;
  }
  return newRect;
}

// 多次元配列を複製する
function copyArray(arr){
  var newarr = [];
  for(var i = 0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      newarr[i] = copyArray(arr[i]);
    }else{
      newarr[i] = arr[i];
    }
  }
  return newarr;
}


// atbash with Number 1<->9
function atbash19(sorce) {
  if (!sorce) return;
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  var a=sorce.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m1-4]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
      a[i]=a[i].replace(/1/, "9");
      a[i]=a[i].replace(/2/, "8");
      a[i]=a[i].replace(/3/, "7");
      a[i]=a[i].replace(/4/, "6");
    } else if (a[i].match(/[n-z6-9]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
      a[i]=a[i].replace(/6/, "4");
      a[i]=a[i].replace(/7/, "3");
      a[i]=a[i].replace(/8/, "2");
      a[i]=a[i].replace(/9/, "1");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// atbash with Number 0<->9
function atbash09(sorce) {
  if (!sorce) return;
  var a=sorce.split("");
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m0-4]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
      a[i]=a[i].replace(/0/, "9");
      a[i]=a[i].replace(/1/, "8");
      a[i]=a[i].replace(/2/, "7");
      a[i]=a[i].replace(/3/, "6");
      a[i]=a[i].replace(/4/, "5");
    } else if (a[i].match(/[n-z5-9]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
      a[i]=a[i].replace(/5/, "4");
      a[i]=a[i].replace(/6/, "3");
      a[i]=a[i].replace(/7/, "2");
      a[i]=a[i].replace(/8/, "1");
      a[i]=a[i].replace(/9/, "0");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// atbash no Number
function atbash(sorce) {
  if (!sorce) return;
  var a=sorce.split("");
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
    } else if (a[i].match(/[n-z]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

//012abc変換(数字列 スペース区切り可)
//区切りなしなら強制2桁
function to012abcString(souce) {
  if (souce.match(/\d[\s.,:;\-\/|]\d/)) {
    var r=souce.split(/[\s.,:;\-\/|]/g);
  } else if (
    souce.match(/^([012][0-9])+$/)
    ) {
    var r=souce.match(/\d\d/g);
  } else {
    var r=souce.match(/\d/g);
  }
  //debug("to012abcString()");
  //debug(souce);
  //debug(r);
  var result="";
  for (var i in r) {
    if (r[i]=="00"||r[i]=="0") { r[i]="a" }
    else if (r[i]=="01"||r[i]=="1") { r[i]="b" }
    else if (r[i]=="02"||r[i]=="2") { r[i]="c" }
    else if (r[i]=="03"||r[i]=="3") { r[i]="d" }
    else if (r[i]=="04"||r[i]=="4") { r[i]="e" }
    else if (r[i]=="05"||r[i]=="5") { r[i]="f" }
    else if (r[i]=="06"||r[i]=="6") { r[i]="g" }
    else if (r[i]=="07"||r[i]=="7") { r[i]="h" }
    else if (r[i]=="08"||r[i]=="8") { r[i]="i" }
    else if (r[i]=="09"||r[i]=="9") { r[i]="j" }
    else if (r[i]=="10") { r[i]="k"; }
    else if (r[i]=="11") { r[i]="l"; }
    else if (r[i]=="12") { r[i]="m"; }
    else if (r[i]=="13") { r[i]="n"; }
    else if (r[i]=="14") { r[i]="o"; }
    else if (r[i]=="15") { r[i]="p"; }
    else if (r[i]=="16") { r[i]="q"; }
    else if (r[i]=="17") { r[i]="r"; }
    else if (r[i]=="18") { r[i]="s"; }
    else if (r[i]=="19") { r[i]="t"; }
    else if (r[i]=="20") { r[i]="u"; }
    else if (r[i]=="21") { r[i]="v"; }
    else if (r[i]=="22") { r[i]="w"; }
    else if (r[i]=="23") { r[i]="x"; }
    else if (r[i]=="24") { r[i]="y"; }
    else if (r[i]=="25") { r[i]="z"; }
    result+=r[i];
  }
  return result;
}

//123abc変換(数字列 スペース区切り可)
//区切りなしなら強制2桁
function to123abcString(souce) {
  if (souce.match(/\d[\s.,:;\-\/|]\d/)) {
    var r=souce.split(/[\s.,:;\-\/|]/g);
  } else if (
    souce.match(/^([012][0-9])+$/)
    ) {
    var r=souce.match(/\d\d/g);
  } else {
    var r=souce.match(/\d/g);
  }
  var result="";
  for (var i in r) {
    if (r[i]=="01"||r[i]=="1") { r[i]="a" }
    else if (r[i]=="02"||r[i]=="2") { r[i]="b" }
    else if (r[i]=="03"||r[i]=="3") { r[i]="c" }
    else if (r[i]=="04"||r[i]=="4") { r[i]="d" }
    else if (r[i]=="05"||r[i]=="5") { r[i]="e" }
    else if (r[i]=="06"||r[i]=="6") { r[i]="f" }
    else if (r[i]=="07"||r[i]=="7") { r[i]="g" }
    else if (r[i]=="08"||r[i]=="8") { r[i]="h" }
    else if (r[i]=="09"||r[i]=="9") { r[i]="i" }
    else if (r[i]=="10") { r[i]="j"; }
    else if (r[i]=="11") { r[i]="k"; }
    else if (r[i]=="12") { r[i]="l"; }
    else if (r[i]=="13") { r[i]="m"; }
    else if (r[i]=="14") { r[i]="n"; }
    else if (r[i]=="15") { r[i]="o"; }
    else if (r[i]=="16") { r[i]="p"; }
    else if (r[i]=="17") { r[i]="q"; }
    else if (r[i]=="18") { r[i]="r"; }
    else if (r[i]=="19") { r[i]="s"; }
    else if (r[i]=="20") { r[i]="t"; }
    else if (r[i]=="21") { r[i]="u"; }
    else if (r[i]=="22") { r[i]="v"; }
    else if (r[i]=="23") { r[i]="w"; }
    else if (r[i]=="24") { r[i]="x"; }
    else if (r[i]=="25") { r[i]="y"; }
    else if (r[i]=="26") { r[i]="z"; }
    result+=r[i];
  }
  return result;
}


//一文字ずつ012abc変換(一～二桁)
function to012abc(str) {
  if (str=="00"||str=="0") { str="a" }
  else if (str=="01"||str=="1") { str="b" }
  else if (str=="02"||str=="2") { str="c" }
  else if (str=="03"||str=="3") { str="d" }
  else if (str=="04"||str=="4") { str="e" }
  else if (str=="05"||str=="5") { str="f" }
  else if (str=="06"||str=="6") { str="g" }
  else if (str=="07"||str=="7") { str="h" }
  else if (str=="08"||str=="8") { str="i" }
  else if (str=="09"||str=="9") { str="j" }
  else if (str=="10") { str="k"; }
  else if (str=="11") { str="l"; }
  else if (str=="12") { str="m"; }
  else if (str=="13") { str="n"; }
  else if (str=="14") { str="o"; }
  else if (str=="15") { str="p"; }
  else if (str=="16") { str="q"; }
  else if (str=="17") { str="r"; }
  else if (str=="18") { str="s"; }
  else if (str=="19") { str="t"; }
  else if (str=="20") { str="u"; }
  else if (str=="21") { str="v"; }
  else if (str=="22") { str="w"; }
  else if (str=="23") { str="x"; }
  else if (str=="24") { str="y"; }
  else if (str=="25") { str="z"; }
  return str;
}

//一文字ずつ123abc変換(一～二桁)
function to123abc(str) {
  if (str=="01"||str=="1") { str="a" }
  else if (str=="02"||str=="2") { str="b" }
  else if (str=="03"||str=="3") { str="c" }
  else if (str=="04"||str=="4") { str="d" }
  else if (str=="05"||str=="5") { str="e" }
  else if (str=="06"||str=="6") { str="f" }
  else if (str=="07"||str=="7") { str="g" }
  else if (str=="08"||str=="8") { str="h" }
  else if (str=="09"||str=="9") { str="i" }
  else if (str=="10") { str="j"; }
  else if (str=="11") { str="k"; }
  else if (str=="12") { str="l"; }
  else if (str=="13") { str="m"; }
  else if (str=="14") { str="n"; }
  else if (str=="15") { str="o"; }
  else if (str=="16") { str="p"; }
  else if (str=="17") { str="q"; }
  else if (str=="18") { str="r"; }
  else if (str=="19") { str="s"; }
  else if (str=="20") { str="t"; }
  else if (str=="21") { str="u"; }
  else if (str=="22") { str="v"; }
  else if (str=="23") { str="w"; }
  else if (str=="24") { str="x"; }
  else if (str=="25") { str="y"; }
  else if (str=="26") { str="z"; }
  return str;
}

function abc012(str, shikiri) {
  return letter2Num(str, shikiri);
}

function letter2Num(str, shikiri) {
  if (!str) return;
  var b = str.split("");
  for (var i=0; i < b.length; i=i+1) {
    if (b[i].match(/a/i)) { b[i]="0"; }
    else if (b[i].match(/b/i)) { b[i]="1"; }
    else if (b[i].match(/c/i)) { b[i]="2"; }
    else if (b[i].match(/d/i)) { b[i]="3"; }
    else if (b[i].match(/e/i)) { b[i]="4"; }
    else if (b[i].match(/f/i)) { b[i]="5"; }
    else if (b[i].match(/g/i)) { b[i]="6"; }
    else if (b[i].match(/h/i)) { b[i]="7"; }
    else if (b[i].match(/i/i)) { b[i]="8"; }
    else if (b[i].match(/j/i)) { b[i]="9"; }
    else if (b[i].match(/k/i)) { b[i]="10"; }
    else if (b[i].match(/l/i)) { b[i]="11"; }
    else if (b[i].match(/m/i)) { b[i]="12"; }
    else if (b[i].match(/n/i)) { b[i]="13"; }
    else if (b[i].match(/o/i)) { b[i]="14"; }
    else if (b[i].match(/p/i)) { b[i]="15"; }
    else if (b[i].match(/q/i)) { b[i]="16"; }
    else if (b[i].match(/r/i)) { b[i]="17"; }
    else if (b[i].match(/s/i)) { b[i]="18"; }
    else if (b[i].match(/t/i)) { b[i]="19"; }
    else if (b[i].match(/u/i)) { b[i]="20"; }
    else if (b[i].match(/v/i)) { b[i]="21"; }
    else if (b[i].match(/w/i)) { b[i]="22"; }
    else if (b[i].match(/x/i)) { b[i]="23"; }
    else if (b[i].match(/y/i)) { b[i]="24"; }
    else if (b[i].match(/z/i)) { b[i]="25"; }
  }
  if (shikiri) {
    return b.join(shikiri);
  } else {
    return b.join("");
  }
}

function abc123(str, shikiri) {
  return toAbc123(str, shikiri);
}

function toAbc123(str, shikiri) {
  var b=str.split("");
  for (var i in b) {
    if (b[i].match(/a/i)) {b[i]="1"}
    else if (b[i].match(/b/i)) {b[i]="2"}
    else if (b[i].match(/c/i)) {b[i]="3"}
    else if (b[i].match(/d/i)) {b[i]="4"}
    else if (b[i].match(/e/i)) {b[i]="5"}
    else if (b[i].match(/f/i)) {b[i]="6"}
    else if (b[i].match(/g/i)) {b[i]="7"}
    else if (b[i].match(/h/i)) {b[i]="8"}
    else if (b[i].match(/i/i)) {b[i]="9"}
    else if (b[i].match(/j/i)) {b[i]="10"}
    else if (b[i].match(/k/i)){b[i]="11"}
    else if (b[i].match(/l/i)) {b[i]="12"}
    else if(b[i].match(/m/i)){b[i]="13"}
    else if (b[i].match(/n/i)){b[i]="14"}
    else if (b[i].match(/o/i)){b[i]="15"}
    else if (b[i].match(/p/i)){b[i]="16"}
    else if (b[i].match(/q/i)){b[i]="17"}
    else if (b[i].match(/r/i)) {b[i]="18"}
    else if (b[i].match(/s/i)){b[i]="19"}
    else if (b[i].match(/t/i)) {b[i]="20"}
    else if (b[i].match(/u/i)){b[i]="21"}
    else if (b[i].match(/v/i)){b[i]="22"}
    else if(b[i].match(/w/i)){b[i]="23"}
    else if (b[i].match(/x/i)){b[i]="24"}
    else if (b[i].match(/y/i)){b[i]="25"}
    else if (b[i].match(/z/i)){b[i]="26"}
  }
  if (shikiri) {
    return b.join(shikiri);
  } else {
    return b.join("");
  }
}

//段組文字列から二次元配列を得る
function makeRect(str) {
  var result = [];
  var temp=str.split(/\n/);
  for (var i in temp) {
    result.push(temp[i].split(""));
  }
  return result;
}

// 文字列から10進へ
function asciiDec(str) {
  var tmp=[];
  var tmpK=2; //桁
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(10);
    tmp.push(tmp2);
    if (tmpK==2 && tmp2>=100) tmpK=3;
  }
  if (tmpK==3) {
    for (var i in tmp) {
      ("000"+tmp[i]).slice(-3);
    }
  } else {
    for (var i in tmp) {
      ("00"+tmp[i]).slice(-2);
    }
  }
  return tmp.join(" ");
}

// 文字列から16進へ
function asciiHex(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(16);
    tmp.push(
      ("00"+tmp2).slice(-2));
  }
  return tmp.join(" ");
}

// 文字列から8進へ
function asciiOct(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(8);
    tmp.push(
      ("000"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// 文字列からバイナリへ
function asciiBin(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(2);
    tmp.push(
      ("00000000"+tmp2).slice(-8));
  }
  return tmp.join(" ");
}

//DecASCII
//スペース区切りの10進コードから変換
//区切りなしならASCIIコードの範囲内だけを変換、あとはそのまま
// 第二引数が無ければ変換できない部分を括弧付きで出力して。引数が1なら括弧なし
function decASCII(str, kakko) {
  if (!str) return false;
    
  var asciiREplus=new RegExp(
    "(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6]|.+?)", "g");
    
  var asciiRE=new RegExp(
    "^(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])$", "g");

  var nums=[];
  if (str.match(/^(\d{2,3}\s+)*(\d{2,3})$/)) {
    nums=str.split(/\s+/g);
  } else {
    nums=str.match(asciiREplus);
  }
  var tmp="";
  var f=0; // かっこフラグ
  if (!kakko) kakko=0;
  
  for (var i in nums) {
    if (nums[i].match(/^\s+$/)) {
      continue;
    } else if (nums[i].match(asciiRE)) {
      if (f==1) { tmp+=")"; f=0; }
      tmp+=
        String.fromCharCode(nums[i]);
    } else {
      if (f==1) { tmp+=nums[i] } 
      else if (f==0) { 
        if (kakko==0) {
          tmp+="(";
          f=1;
        }
        tmp+=nums[i];
      }
    }
  }
  if (f==1) tmp+=")";
  
  return tmp;
}


//DecASCII
//スペース区切りの10進コードから変換
//区切りなしならASCIIコードの範囲内だけを変換、あとはそのまま
function decASCII_old(str) {
  
  var asciiNumRE=new RegExp(
    "(0?[4][8-9]|0?[5][0-7]|0?[6][5-9]|0?[7-8][0-9]|0?[9][0]|0?[9][7-9]|[1][0-1][0-9]|[1][2][0-2])", "g");
    
  var asciiRE=new RegExp(
    "(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])", "g");
  
  var asciiREfix=new RegExp(
    "^((0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])\s*)+$", "");
    
  if (str.match(asciiREfix)) {
    var nums=str.match(asciiRE);
  } else {
    var nums=str.match(asciiNumRE);
  }
  
  var tmp="";
  for (var i in nums) {
    if (nums[i].match(asciiRE)) {
      tmp+=String.fromCharCode(
        nums[i])
    } else {
      tmp+="("+nums[i]+")";
    }
  }
  return tmp;
}


// HexASCII
//スペース区切りの16進コードから変換
//区切りなしなら強制二桁で変換
function hexASCII(line) {
  if (line.match(/\w\s+\w/)) {
    var strlist=line.split(/\s+/g);
  } else {
    var strlist=line.match(/\w\w/g);
  }
  
  var tmp="";
  for (var j in strlist) {
   tmp+=String.fromCharCode(
     parseInt(strlist[j], 16));
  }
  return tmp;
}

// hexbash
function hexbash(str) {
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[0-7]/i)) {
      a[i]=a[i].replace(/[0]/i, "f");
      a[i]=a[i].replace(/[1]/i, "e");
      a[i]=a[i].replace(/[2]/i, "d");
      a[i]=a[i].replace(/[3]/i, "c");
      a[i]=a[i].replace(/[4]/i, "b");
      a[i]=a[i].replace(/[5]/i, "a");
      a[i]=a[i].replace(/[6]/i, "9");
      a[i]=a[i].replace(/[7]/i, "8");
    } else if (a[i].match(/[89a-f]/i)) {
      a[i]=a[i].replace(/[8]/i, "7");
      a[i]=a[i].replace(/[9]/i, "6");
      a[i]=a[i].replace(/[a]/i, "5");
      a[i]=a[i].replace(/[b]/i, "4");
      a[i]=a[i].replace(/[c]/i, "3");
      a[i]=a[i].replace(/[d]/i, "2");
      a[i]=a[i].replace(/[e]/i, "1");
      a[i]=a[i].replace(/[f]/i, "0");
    }
  }
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(a[i].match(/[a-z]/)) a[i]=a[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(a[i].match(/[A-Z]/)) a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// binASCII
//8ビットで変換
function binASCII(line) {
  line=line.replace(/\s+/g, "");
  var binlist=line.match(/[01]{8}/g);
 
  var tmp="";
  for (var j in binlist) {
   tmp+=String.fromCharCode(
     parseInt(binlist[j], 2));
  }
  return tmp;
}

// binOct
//8ビットで変換
function binOct(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(8);
    tmp.push(("00"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// binDec
//8ビットで変換
function binDec(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(10);
    tmp.push(("00"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// binHex
//8ビットで変換
function binHex(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(16);
    tmp.push(("00"+tmp2).slice(-2));
  }
  return tmp.join(" ");
}

// binbash
function binbash(str) {
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/1/)) {  
      a[i]="0";
    } else if (a[i].match(/0/)) {
      a[i]="1";
    }
  }
  return a.join("");
}

// OctASCII
//スペース区切りの8進コードから変換
//区切りなしなら強制3桁で変換
function octASCII(line) {
  if (line.match(/\d\s+\d/)) {
    var strlist=line.split(/\s+/g);
  } else {
    var strlist=line.match(/\d\d\d/g);
  }
  var tmp="";
  for (var j in strlist) {
   tmp+=String.fromCharCode(
     parseInt(strlist[j], 8));
  }
  return tmp;
}

// octbash
function octbash(str) {
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[0-3]/)) {
      a[i]=a[i].replace(/[0]/i, "7");
      a[i]=a[i].replace(/[1]/i, "6");
      a[i]=a[i].replace(/[2]/i, "5");
      a[i]=a[i].replace(/[3]/i, "4");
    } else if (a[i].match(/[4-7]/)) {
      a[i]=a[i].replace(/[4]/i, "3");
      a[i]=a[i].replace(/[5]/i, "2");
      a[i]=a[i].replace(/[6]/i, "1");
      a[i]=a[i].replace(/[7]/i, "0");
    }
  }
  return a.join("");
}

// hexBin
function hexBin(line) {
  line=line.replace(/\s+/g, "");
  if (line.match(/[^0-9a-f]/i)) return;
  var hexlist=line.match(/.{1,2}/g);
  var tmp="";
  for (var j in hexlist) {
    var tmp2=
      parseInt(hexlist[j], 16).toString(2);
    tmp+=("00000000"+tmp2).slice(-8);
  }
  return tmp;
}
  
//大文字と小文字を入れ替える
function exchangeUpLow(str) {
var tmp="";
for (var i in str) {
  if (str[i].match(/[A-Z]/)) {
    tmp+=str[i].toLowerCase();
  } else if (str[i].match(/[a-z]/)) {
    tmp+=str[i].toUpperCase();
  } else {
    tmp+=str[i];
  }
}
return tmp;
}


//ひらがなカタカナ相互変換
function swapHiraKata(str) {
  var map="あアいイうウえエおオ";
  map+="かカきキくクけケこコ";
  map+="さサしシすスせセそソ";
  map+="たタちチつツてテとト";
  map+="なナにニぬヌねネのノ";
  map+="はハひヒふフへヘほホ";
  map+="まマみミむムめメもモ";
  map+="やヤゆユよヨ";
  map+="らラりリるルれレろロ";
  map+="わワをヲんン";

  var result="";
  for (var i=0; i<str.length; i++) {
    if (str[i].match(/[あ-ん]/)) {
      var j=map.indexOf(str[i])+1;
      result+=map[j];
    } else if (str[i].match(/[ア-ン]/)) {
      var j=map.indexOf(str[i])-1;
      result+=map[j];
    } else {
      result+=str[i];
    }
  }
  return result;
}

//カタカナをひらがなへ変換
function kata2hira(str) {
  var map="あアいイうウえエおオ";
  map+="かカきキくクけケこコ";
  map+="さサしシすスせセそソ";
  map+="たタちチつツてテとト";
  map+="なナにニぬヌねネのノ";
  map+="はハひヒふフへヘほホ";
  map+="まマみミむムめメもモ";
  map+="やヤゆユよヨ";
  map+="らラりリるルれレろロ";
  map+="わワをヲんン";

  var result="";
  for (var i=0; i<str.length; i++) {
    if (str[i].match(/[ア-ン]/)) {
      var j=map.indexOf(str[i])-1;
      result+=map[j];
    } else {
      result+=str[i];
    }
  }
  return result;
}

//パスコにdoooonの署名を加工
function doooonSig(str) {
  str=str.toLowerCase();

  function setSign1(match, p1,p2) {
    return p1+p2.toUpperCase();
  }
  function setSign2(match, p1,p2) {
    return p1.toUpperCase()+p2; 
  }
  str = str.replace(
    /^(\d*)([a-z])/i, setSign1);
  str = str.replace(
    /([a-z])(\d*[a-z]\d*)$/i, setSign2);
  return str;
}

