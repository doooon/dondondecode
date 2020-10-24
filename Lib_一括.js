
// ★★ 基本一括 ★★
// #LIB


function decodeMain() {
// 以下メイン //

TEXT=TEXT.replace(/^\s+|\s+$/g, "");
htmlCode(TEXT);
htmlTmp.push("----------------------");

htmlTmp.push("<a href='#atbash'><b>atbash</b></a> <a href='#dec'><b>dec</b></a> <a href='#hex'><b>hex</b></a> <a href='#base64'><b>base64</b></a> <a href='#UpLowCase'><b>UpLowCase</b></a>");
htmlTmp.push("<a href='#oddEven'><b>oddEven</b></a> <a href='#vigenere'><b>vigenere</b></a> <a href='#symbol2num'><b>symbol2num</b></a> <a href='#keyboard flip'><b>keyboard flip</b></a>");
htmlTmp.push("<a href='#phoneKeyboard'><b>ガラケー</b></a> <a href='#polybius'><b>polybius</b></a> <a href='#morse'><b>morse</b></a> <a href='#bifid'><b>bifid</b></a> <a href='#playfair'><b>playfair</b></a>");
htmlTmp.push("<a href='#skip'><b>skip</b></a> <a href='#railfence'><b>railfence</b></a> <a href='#rect'><b>rect</b></a> <a href='#oddeven'><b>奇数偶数</b></a> <a href='#abc012'><b>abc012</b></a> <a href='#rot'><b>rot</b></a>");

htmlTmp.push("===============");
/*
htmlTmp.push("<a href='#'><b></b></a>");
*/

// テキストアナライズ
htmlTmp.push(analyzeText(TEXT));
keyPosition(TEXT);
htmlTmp.push("===============");

// 可能なkw Daily
var kwList=keySyougou(TEXT, "", "daily");
if (kwList.length) {
  htmlTmp.push("(可能なkw Daily)");
  for (var i in kwList) {
    htmlTmp.push(
      checkCodeHTML(kwList[i]));
  }
  htmlTmp.push("==============");
}

// 可能なkw JoJo
var kwList=keySyougou(TEXT, "", "jojo");
if (kwList.length) {
  htmlTmp.push("(可能なkw JoJo)");
  for (var i in kwList) {
    htmlTmp.push(
      checkCodeHTML(kwList[i]));
  }
  htmlTmp.push("==============");
}

//リバース
htmlTmp.push("<a name='reverse'>(reverse)</a>");
htmlCode(strReverse(TEXT));
htmlTmp.push("================");

//atbash
if (TEXT.match(/[a-z0-9]/i)) {
  htmlTmp.push("※意味bashの可能性も忘れずに");
    htmlTmp.push("<b>(atbash)</b>");
    htmlCode(atbash(TEXT));
    
  if (TEXT.match(/\d/)) {
    htmlTmp.push("<b>(atbash19)</b>");
    htmlCode(atbash19(TEXT));
    
    htmlTmp.push("<b>(atbash09)</b>");
    htmlCode(atbash09(TEXT));
  }
  /*
  // 可能なkw
  var kwList=
    keySyougou(atbash(TEXT));
  if (kwList.length) {
    htmlTmp.push("---------------");
    htmlTmp.push("(可能なkw)");
    for (var i in kwList) {
      htmlTmp.push(
        checkCodeHTML(kwList[i]));
    }
  }
  */
  htmlTmp.push("==============");
}

// reverse & atbash
if (TEXT.match(/[a-z0-9]/i)) {
  htmlTmp.push("※意味bashの可能性も忘れずに");
    htmlTmp.push("(reverse & atbash)");
    htmlCode(
      atbash(strReverse(TEXT)));
    
  if (TEXT.match(/\d/)) {
    htmlTmp.push(
      "(reverse & atbash19)");
    htmlCode(
      atbash19(strReverse(TEXT)));
    
    htmlTmp.push(
      "(reverse & atbash09)");
    htmlCode(
      atbash09(strReverse(TEXT)));
  }
  htmlTmp.push("===============");
}

// キャラコード
htmlTmp.push("(bin)");
htmlCode(asciiBin(TEXT));
htmlTmp.push("(oct)");
htmlCode(asciiOct(TEXT));
htmlTmp.push("(dec)");
htmlCode(asciiDec(TEXT));
htmlTmp.push("(Hex)");
htmlCode(asciiHex(TEXT));
htmlTmp.push("(Base64 encode)");
htmlCode(base64Enc(TEXT));
htmlTmp.push("(Base32 encode)");
htmlCode(base32Enc(TEXT));
htmlTmp.push("(Base32hex encode)");
htmlCode(base32hexEnc(TEXT));
htmlTmp.push("===============");

// 奇数偶数で抽出
htmlTmp.push("<a name='oddeven'><b>(奇数偶数で抽出)</b></a>");
var odd=TEXT.replace(/(.).?/g, "$1");
var even=TEXT.replace(/.(.)?/g, "$1");
htmlCode(odd);
htmlCode(even);
htmlTmp.push("(reverse)");
htmlCode(strReverse(odd));
htmlCode(strReverse(even));
htmlTmp.push("(atbash)");
htmlCode(atbash19(odd));
htmlCode(atbash19(even));
htmlTmp.push("(reverse & atbash)");
htmlCode(atbash19(strReverse(odd)));
htmlCode(atbash19(strReverse(even)));
htmlTmp.push("(join)");
htmlCode(odd+even);
htmlCode(even+odd);
htmlCode(strReverse(odd)+even);
htmlCode(even+strReverse(odd));
htmlCode(odd+strReverse(even));
htmlCode(strReverse(even)+odd);
htmlTmp.push("===============");

// 大文字、小文字、数字、記号を二種類で全組み合わせ抽出
if (
  (
  TEXT.match(/[a-z]/) && 
  TEXT.match(/[A-Z]/) &&
  TEXT.match(/[!@#$%^&*()]/) &&
  TEXT.match(/[0-9]/)
  ) && TEXT.match(/^[0-9a-zA-Z!@#$%^&*()]+$/)
) {
  htmlTmp.push("<a name=''><b>(大文字、小文字、数字、記号を二種類で全組み合わせ抽出)</b></a>");
  htmlTmp.push("(小文字と記号、大文字と数字)");
  var tmp=TEXT.match(/[a-z!@#$%^&*^()]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("----");
  var tmp=TEXT.match(/[A-Z0-9]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("--------------");
  htmlTmp.push("(大文字と記号、小文字と数字)");
  var tmp=TEXT.match(/[A-Z!@#$%^&*^()]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("----");
  var tmp=TEXT.match(/[a-z0-9]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("--------------");
  htmlTmp.push("(小文字と大文字、記号と数字)");
  var tmp=TEXT.match(/[a-zA-Z]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("----");
  var tmp=TEXT.match(/[!@#$%^&*()0-9]+/g);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("===============");
}

// 片方がprefix+sufixのみ、もう片方がkw
if (odd.match(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i)) {
  htmlCode(RegExp.$1+even+RegExp.$2);
} else if (odd.match(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i)) {
  htmlCode(RegExp.$1+even+RegExp.$2);
} else if (odd.match(/^([a-z]\d[a-z]\d)([a-z]\d[a-z]{2})$/i)) {
  htmlCode(RegExp.$1+even+RegExp.$2);
} else if (odd.match(/^([a-z]{8}\d{2})(\d{2})$/i)) {
  htmlCode(RegExp.$1+even+RegExp.$2);
} else if (odd.match(/^\d[a-z]{2}\d{2}[a-z]{2}\d$/i)) {
  htmlCode(even+RegExp.lastMatch);
}

if (even.match(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i)) {
  htmlCode(RegExp.$1+odd+RegExp.$2);
} else if (even.match(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i)) {
  htmlCode(RegExp.$1+odd+RegExp.$2);
} else if (even.match(/^([a-z]\d[a-z]\d)([a-z]\d[a-z]{2})$/i)) {
  htmlCode(RegExp.$1+odd+RegExp.$2);
} else if (even.match(/^([a-z]{8}\d{2})(\d{2})$/i)) {
  htmlCode(RegExp.$1+odd+RegExp.$2);
} else if (even.match(/^\d[a-z]{2}\d{2}[a-z]{2}\d$/i)) {
  htmlCode(odd+RegExp.lastMatch);
}


if (
  even.length==odd.length && 
  even.match(/^\d+$/)
) {
  htmlTmp.push(
    "(vigenere key: "+even+")");
  htmlCode(
    vigenereDec(odd, even));
} else if (
  even.length==odd.length && 
  odd.match(/^\d+$/)
) {
  htmlTmp.push(
    "(vigenere key: "+odd+")");
  htmlCode(
    vigenereDec(even, odd));
}

htmlTmp.push("==============");

// 分割
if (
  TEXT &&
  TEXT.match(/^(\w\w\s?)+\w\w$/)
) {
  htmlTmp.push("(ペアに分けられる)");
  var tmps=TEXT.match(/(\w\w\s?)/g);
  for (var i in tmps) {
    tmps[i]=tmps[i].replace(/\s$/, "");
  }
  htmlTmp.push(tmps.join(" "));
  if (TEXT.match(/^(\d\d\s?)+\d\d$/)) {
    var tmps100m=[];
    for (var i in tmps) {
      tmps100m[i]=
        100-Number(tmps[i]);
    }
    htmlTmp.push("100から引く");
    htmlTmp.push(tmps100m.join(" "));
    htmlCode(tmps100m.join(""));
  }
  htmlTmp.push("===============");
}
if (TEXT && TEXT.length%3==0) {
  htmlTmp.push("(3つずつに分けられる)");
  var tmps=TEXT.match(/.../g);
  htmlTmp.push(tmps.join(" "));
  if (TEXT.match(/^\d+$/)) {
    var tmps1000m=[];
    for (var i in tmps) {
      tmps1000m[i]=
        1000-Number(tmps[i]);
    }
    htmlTmp.push("1000から引く");
    htmlTmp.push(tmps1000m.join(" "));
    htmlCode(tmps1000m.join(""));
    htmlTmp.push("--------------");
    var tmps500m=[];
    for (var i in tmps) {
      tmps500m[i]=
        500-Number(tmps[i]);
    }
    htmlTmp.push("500から引く");
    htmlTmp.push(tmps500m.join(" "));
    htmlCode(tmps500m.join(""));
  }
  htmlTmp.push("===============");
}

// abc012
htmlTmp.push("<a name='abc012'><b>(abc012)</b></a>");
htmlTmp.push(letter2Num(TEXT, " "));
var tmp012=letter2Num(TEXT);
htmlCode(tmp012);
htmlTmp.push("(atbash)");
htmlCode(atbash19(tmp012));
htmlTmp.push("(reverse)");
htmlCode(strReverse(tmp012));
htmlTmp.push("(atbash & reverse)");
htmlCode(
  strReverse(atbash19(tmp012)));

htmlTmp.push("===============");

// abc123
htmlTmp.push("(abc123)");
htmlTmp.push(toAbc123(TEXT, " "));
var tmp123=toAbc123(TEXT);
htmlCode(tmp123);
htmlTmp.push("(atbash)");
htmlCode(atbash19(tmp123));
htmlTmp.push("(reverse)");
htmlCode(strReverse(tmp123));
htmlTmp.push("(atbash & reverse)");
htmlCode(
  strReverse(atbash19(tmp123)));

htmlTmp.push("===============");


// 012abc
htmlTmp.push("<a name='012abc'><b>(012abc)</b></a>");
htmlTmp.push(TEXT); 
var tmp= to012abcString(TEXT);
htmlTmp.push(tmp);
htmlCode(tmp);
htmlTmp.push("(atbash)");
htmlCode(atbash19(tmp));
htmlTmp.push("(reverse)");
htmlCode(strReverse(tmp));
htmlTmp.push("(atbash & reverse)");
htmlCode(
  strReverse(atbash19(tmp)));

htmlTmp.push("===============");

// 123abc
htmlTmp.push("<a name='123abc'><b>(123abc)</b></a>");
htmlTmp.push(TEXT); 
var tmp= to123abcString(TEXT);
htmlTmp.push(tmp);
htmlCode(tmp);
htmlTmp.push("(atbash)");
htmlCode(atbash19(tmp));
htmlTmp.push("(reverse)");
htmlCode(strReverse(tmp));
htmlTmp.push("(atbash & reverse)");
htmlCode(
  strReverse(atbash19(tmp)));

htmlTmp.push("===============");


// Rot
htmlTmp.push("<a name='rot'><b>(Rot)</b></a>");

function numNonLotate(tm) {
  if (checkPasscode(tm).match(/^fix$/i)){
    htmlCode(tm);
    htmlTmp.push("(↑num non-rotate)");
  }
}


function goRotate(n,str,rev,atb) {
  if ((!n ||typeof(n)!="number" ||n<0) || !str) return;
  var msg="";
  if (rev.match(/reverse/i) && atb.match(/atbash/i)) {
    msg="reverse & atbash ";
    str=strReverse(atbash19(str));
  } else if (rev.match(/reverse/i)) {
    msg="reverse ";
    str=strReverse(str);
  } else if (atb.match(/atbash/i)) {
    msg="atbash ";
    str=atbash19(str);
  }
  
  
  // +rot
  for (var i=0; i<=n; i++) {
    htmlCode(rotN(str, i), "", "("+msg+"Rot+"+i+")");
    numNonLotate(rotN(str, i, 0));
  }
  htmlTmp.push("--- minus rot ---");
  // -rot
  for (var i=0; i<=n; i++) {
    htmlCode(rotN(str, 0-i), "", "("+msg+"Rot-"+i+")");
    numNonLotate(rotN(str, 0-i, 0));
  }
}

goRotate(26,TEXT,"","");
goRotate(26,TEXT,"reverse","");
goRotate(26,TEXT,"","atbash");
goRotate(26,TEXT,"reverse","atbash");
htmlTmp.push("===============");

// Rot47
// 印刷可能なASCIIの94文字を半分にローテーションする
if(TEXT.match(/^[!"#$%&'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ[\\\]^_`abcdefghijklmnopqrstuvwxyz{|}~]+$/)){
    htmlTmp.push("<a name='rot47'><b>(Rot47)</b></a>");
  htmlCode(rot47(TEXT));
  htmlTmp.push("===============");
}


if (!TEXT.match(/\d\d/) && TEXT.match(/\d/) && TEXT.match(/[a-z]/i)) {
	
htmlTmp.push(TEXT);
htmlTmp.push("数字の後続をその数字で+Rot");
var tmp = TEXT.split("");
var n = 0;
for (i=0; i<tmp.length; i++){
    if (i==0) continue;
    if (tmp[i-1].match(/\d/)) n = tmp[i-1];
    if (tmp[i].match(/[a-z]/i)) tmp[i] = rotN(tmp[i], n);
}
htmlCode(tmp.join(""));
	
htmlTmp.push("---");
	
htmlTmp.push("数字の後続をその数字で-Rot");
var tmp = TEXT.split("");
var n = 0;
for (i=0; i<tmp.length; i++){
    if (i==0) continue;
    if (tmp[i-1].match(/\d/)) n = tmp[i-1];
    if (tmp[i].match(/[a-z]/i)) tmp[i] = rotN(tmp[i], 0-n);
}
htmlCode(tmp.join(""));
htmlTmp.push("===============");
}


// 01のみだった
if (TEXT.match(/^[01\s]+$/i)) {
  htmlTmp.push("01のみだった"); 
  goBinary(TEXT.replace(/\s/g,""));
  htmlTmp.push("===============");
}

// 構成文字種が2つだったのでバイナリ
if (kouseimoji.length==2) {
  htmlTmp.push("構成文字種が2つだったのでバイナリ"); 
  var tmpRE0=
    new RegExp("\\"+kouseimoji[0], "g");
  var tmpRE1=
    new RegExp("\\"+kouseimoji[1], "g");
  var tmp=TEXT.replace(tmpRE0,"0");
  tmp=tmp.replace(tmpRE1,"1")
  goBinary(tmp.replace(/\s/g,""));
  
  // 2種類の文字でRun Length 
  var tmpRE=
    new RegExp("(.)\\1*", "g");
  var tmp=TEXT.match(tmpRE);
  if (tmp.length>=8) {
    htmlTmp.push("--------------------");
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(2種類の文字でRun Length)</b>");
    var result=[];
    for (var i in tmp) {
      result.push(tmp[i].length);
    }
    htmlCode(result.join(""));
    htmlTmp.push("==============");
  }
}


// テキストのみだった
if (TEXT.match(/^[a-z]+$/i)) {
  htmlTmp.push("テキストのみだった"); 
  htmlTmp.push("(abc012)"); 
  var tmp=letter2Num(TEXT);
  htmlCode(tmp);
  htmlTmp.push(
    tmp.match(/..?/g).join(" "));
  
  if (tmp.match(/^[1-5]+$/)) {
    htmlTmp.push("<span class='alert'>構成文字が1～5のみ！！</br>polybiusや0/1の個数でbinASCIIの可能性！</span>");
  }
  
  htmlTmp.push("(DecASCII)");
  htmlCode(decASCII(tmp));
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(tmp));
  htmlTmp.push(
    strReverse(tmp).match(/..?/g).join(" "));
  htmlCode(decASCII(strReverse(tmp)));
  htmlTmp.push("===============");
}

//数字のみだった
//012abc (区切り、一桁、二桁ok)
if (TEXT.match(/^[\d\s.,:;\-\/|]+$/)) {
  htmlTmp.push("数字のみ"); 
  htmlCode(TEXT);
  var tmp=to012abcString(TEXT);
  htmlTmp.push("(012abc)");
  htmlCode(tmp);
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  if (TEXT.match(/^([01][0-9]|2[0-5])+$/)) {
    htmlTmp.push("--------");
    var tmp=
      TEXT.match(/([01][0-9]|2[0-5])/g);
    htmlCode(tmp.join(" "));
    var tmp=
      to012abcString(tmp.join(" "));
    htmlCode(tmp);
    
    htmlTmp.push("(atbash)");
    htmlCode(atbash19(tmp));
  
    htmlTmp.push("(reverse)");
    htmlCode(strReverse(tmp));
  }
  htmlTmp.push("--------------");
  
  var tmp=to123abcString(TEXT);
  htmlTmp.push("(123abc)");
  htmlCode(tmp);
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  if (TEXT.match(/^([01][0-9]|2[0-5])+$/)) {
    htmlTmp.push("--------");
    var tmp=
      TEXT.match(/([01][0-9]|2[0-5])/g);
    htmlCode(tmp.join(" "));
    var tmp=
      to123abcString(tmp.join(" "));
    htmlCode(tmp);
    
    htmlTmp.push("(atbash)");
    htmlCode(atbash19(tmp));
  
    htmlTmp.push("(reverse)");
    htmlCode(strReverse(tmp));
  }
  
  htmlTmp.push("===============");
}

//数字のみだった
//DecASCII (強制二桁、区切りなら三桁ok)
//HexASCII、OctASCII
if (TEXT.match(/^[\d\s.,:;\-\/|]+$/)) {
  htmlTmp.push("数字のみ"); 
  
  var tmp=decASCII(TEXT);
  htmlTmp.push("(decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=decASCII(strReverse(TEXT));
  htmlTmp.push("(reverse->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=decASCII(atbash19(TEXT));
  htmlTmp.push("(atbash->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
    
  htmlTmp.push("------");
  
  var tmp=decASCII(
    strReverse(atbash19(TEXT)));
  htmlTmp.push(
    "(atbash->reverse->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push(
    "(more reverse & atbash)");
  htmlCode(strReverse(atbash19(tmp)));
  htmlTmp.push("===============");
  
  var tmp=hexASCII(TEXT);
  htmlTmp.push("(hexASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=hexASCII(strReverse(TEXT));
  htmlTmp.push("(reverse->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=hexASCII(atbash19(TEXT));
  htmlTmp.push("(atbash->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
    
  htmlTmp.push("------");
  
  var tmp=hexASCII(
    strReverse(atbash19(TEXT)));
  htmlTmp.push(
    "(atbash->reverse->decASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push(
    "(more reverse & atbash)");
  htmlCode(strReverse(atbash19(tmp)));
  htmlTmp.push("===============");

  
  var tmp=octASCII(TEXT);
  htmlTmp.push("(octASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=octASCII(strReverse(TEXT));
  htmlTmp.push("(reverse->octASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push("------");
  
  var tmp=octASCII(atbash19(TEXT));
  htmlTmp.push("(atbash->octASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
    
  htmlTmp.push("------");
  
  var tmp=octASCII(
    strReverse(atbash19(TEXT)));
  htmlTmp.push(
    "(atbash->reverse->octASCII)");
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  htmlTmp.push(
    "(more reverse & atbash)");
  htmlCode(strReverse(atbash19(tmp)));
  htmlTmp.push("===============");
}

//数字が1～5のみ RLD
if (TEXT.match(/^[1-5\s]+$/)) {
  htmlTmp.push("数字が1～5のみ"); 
  htmlTmp.push("(数字の数だけ0/1を繰り返す)");
  htmlTmp.push("<a name='RLD'><b>(数字の数だけ0/1を繰り返す)</b></a>");
  var tmp=time2bin(TEXT);
  
  htmlTmp.push(
    checkCodeHTML(tmp));
  htmlTmp.push("(binASCII)");
  htmlCode(binASCII(tmp));
  
  htmlTmp.push("(binBash)");
  tmp=binbash(tmp);
  
  htmlCode(tmp);
  htmlTmp.push("(binASCII)");
  htmlCode(binASCII(tmp));
  htmlTmp.push("===============");
}

// base64 decode
if ((
    TEXT.match(
    /^[a-zA-Z0-9+\/=]+$/) 
    //&& TEXT.match(/[a-z]/)
    //&& TEXT.match(/[A-Z]/)
    //&& TEXT.match(/[0-9]/)
    && TEXT.length%4==0
    ) || 
    (
    TEXT.match(
    /^([a-zA-Z0-9+\/=]+[.,\-\+:|\\\s]*)+$/) 
    && TEXT.match(/[0-9]/)
    && TEXT.match(/[.,\-\+:|\\\s]/)
    && TEXT.replace(/[.,\-\+:|\\\s]/g,"").length%4==0
    ) || (
    TEXT.match(
    /^[a-zA-Z0-9+\/=]+$/) 
    && ((TEXT[0].match(/[QRSTUVWYZabcde]/i)
    && TEXT.length>=4
    && TEXT[4].match(/[MNO]/i)) ||TEXT[0].match(/[MNO]/i))
    )
  ) {
    
   //base64画像
  if (TEXT.match(/^iVBORw/)) {
    htmlTmp.push(
      "<b>(DATA URL scheme base64)</b>");
    htmlTmp.push(
      "<div class='alertbox'><img src='"+
      "data:image/png;base64,"+
      TEXT+
      "'></div>"
    );
  }
  
  var b64TEXT=TEXT;
  
  if (
    TEXT.match(/[.,\-\+:|\\\s]/)
  ) {
    var tmps=TEXT.split(/[.,\-\+:|\\\s]+/g);
    var tmpsNew=[];
    for (var i in tmps) {
      if (i==0) {
        tmpsNew[i]=tmps[i];
        continue;
      }
      if (tmps[i][0].match(/[a-z]/)) {
        tmpsNew[i]=
          tmps[i][0].toUpperCase();
      } else if (tmps[i][0].match(/[A-Z]/)) {
        tmpsNew[i]=
          tmps[i][0].toLowerCase();
      } else {
        tmpsNew[i]=tmps[i][0];
      }
      for (var j in tmps[i]) {
        if (j==0) continue;
        tmpsNew[i]+=tmps[i][j];
      }
    }
    b64TEXT=tmpsNew.join("");
    htmlTmp.push("(ドットが大文字小文字の目印)");
    htmlTmp.push(b64TEXT);
  }
  

  function checkMoreBase64Dec(str) {
    if (str.match(/^[a-z]{4,}$/) || str.match(/^[A-Z]{4,}$/)) {
      htmlTmp.push("<span class='alert'>(文字列が揃いすぎ。あやしい…)</span>");
    } else if (str.match(/^[a-zA-Z\d\//+=]{4,}$/) && str.length%4==0) {
      htmlTmp.push("<span class='alert'>(もう一度Base64decの可能性！)</span>");
      htmlCode(base64Dec(str));
    }
  }
  
  htmlTmp.push("<a name='base64'><b>(base64 decode)</b></a>");
  var tmp=base64Dec(b64TEXT);
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push("(reverse>>base64)");
  htmlTmp.push(strReverse(b64TEXT));
  var tmp=base64Dec(
    strReverse(b64TEXT));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push("(swap>>base64)");
  htmlTmp.push(
    exchangeUpLow(b64TEXT));
  var tmp=base64Dec(
    exchangeUpLow(b64TEXT));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("( more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push(
    "(swap>>reverse>>base64)");
  htmlTmp.push(
    strReverse(
      exchangeUpLow(b64TEXT)));
  var tmp=base64Dec(
    strReverse(
      exchangeUpLow(b64TEXT)));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push("(atbash09>>base64)");
  htmlTmp.push(
    atbash09(b64TEXT));
  var tmp=
    base64Dec(atbash09(b64TEXT));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash09(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push("(atbash19>>base64)");
  htmlTmp.push(
    atbash19(b64TEXT));
  var tmp=
    base64Dec(atbash19(b64TEXT));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push(
    "(atbash09>>reverse>>base64)");
  htmlTmp.push(
    strReverse(atbash09(b64TEXT)));
  var tmp=base64Dec(
    strReverse(atbash09(b64TEXT)));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash09(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push(
    "(atbash19>>reverse>>base64)");
  htmlTmp.push(
    strReverse(atbash19(b64TEXT)));
  var tmp=base64Dec(
    strReverse(atbash19(b64TEXT)));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");

  htmlTmp.push(
    "(atbash09>>swap>>base64)");
  htmlTmp.push(
    exchangeUpLow(
      atbash09(b64TEXT)));
  var tmp=base64Dec(
    exchangeUpLow(
      atbash09(b64TEXT)));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash09(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("-------");
  
  htmlTmp.push(
    "(atbash19>>swap>>base64)");
  htmlTmp.push(
    exchangeUpLow(
      atbash19(b64TEXT)));
  var tmp=base64Dec(
    exchangeUpLow(
      atbash19(b64TEXT)));
  htmlCode(tmp);
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  checkMoreBase64Dec(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  checkMoreBase64Dec(tmp);
  
  htmlTmp.push("-----------");
  
  htmlTmp.push("<b>(base64 to bin)</b>");
  var tmp=base64Dec(b64TEXT, "2");
  htmlCode(tmp);

  htmlTmp.push("<b>(base64 to oct)</b>");
  var tmp=base64Dec(b64TEXT, "8");
  htmlCode(tmp);

  htmlTmp.push("<b>(base64 to dec)</b>");
  var tmp=base64Dec(b64TEXT, "10");
  htmlCode(tmp);

  htmlTmp.push("<b>(base64 to hex)</b>");
  var tmp=base64Dec(b64TEXT, "16");
  htmlCode(tmp);

  htmlTmp.push("<b>(base64 to base32)</b>");
  htmlTmp.push(base64Dec(b64TEXT, "2"));
  var tmp=base32Enc(base64Dec(b64TEXT, "2"),"2");
  htmlCode(tmp);

  htmlTmp.push("<b>(base64 to base32hex)</b>");
  htmlTmp.push(base64Dec(b64TEXT, "2"));
  var tmp=base32hexEnc(base64Dec(b64TEXT, "2"),"2");
  htmlCode(tmp);

  htmlTmp.push("===============");

  htmlTmp.push("(base64 index)");
  var b64TEXT=base64Dec(b64TEXT,"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));

  htmlTmp.push("(swap base64 index)");
  var b64TEXT=base64Dec(exchangeUpLow(b64TEXT),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(reverse base64 index)");
  var b64TEXT=base64Dec(strReverse(b64TEXT),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(swap reverse base64 index)");
  var b64TEXT=base64Dec(strReverse(exchangeUpLow(b64TEXT)),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(atbash09 base64 index)");
  var b64TEXT=base64Dec(atbash09(b64TEXT),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(atbash19 base64 index)");
  var b64TEXT=base64Dec(atbash19(b64TEXT),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(swap atbash09 base64 index)");
  var b64TEXT=base64Dec(atbash09(exchangeUpLow(b64TEXT)),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(swap atbash19 base64 index)");
  var b64TEXT=base64Dec(atbash19(exchangeUpLow(b64TEXT)),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(reverse atbash09 base64 index)");
  var b64TEXT=base64Dec(atbash09(strReverse(b64TEXT)),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(reverse atbash19 base64 index)");
  var b64TEXT=base64Dec(atbash19(strReverse(b64TEXT)),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(swap reverse atbash09 base64 index)");
  var b64TEXT=base64Dec(atbash09(strReverse(exchangeUpLow(b64TEXT))),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
  
  htmlTmp.push("(swap reverse atbash19 base64 index)");
  var b64TEXT=base64Dec(atbash19(strReverse(exchangeUpLow(b64TEXT))),"index");
  htmlTmp.push(b64TEXT.match(/../g).join(" "));
  htmlCode(b64TEXT);
  if (b64TEXT.match(/^(0\d)+$/)) htmlCode(b64TEXT.replace(/0(\d)/g, "$1"));
    
  htmlTmp.push("===============");  
}

// base32
if (
  (
  (TEXT.match(
    /^=*[A-Z2-7]+=*$/)
    && TEXT.match(/[A-Z]/)
    && TEXT.match(/[2-7]/)) ||
    (TEXT.match(
    /^=*[a-z2-7]+=*$/)
    && TEXT.match(/[a-z]/)
    && TEXT.match(/[2-7]/)
  )
  ) && 
  TEXT.length>=14
) {
  var str=TEXT.toUpperCase();
  htmlTmp.push(str);
  htmlTmp.push("<a name='base32'><b>(base32 decode)</b></a>");
  var tmp=base32Dec(str);
  htmlCode(tmp);

  htmlTmp.push(
    "(more reverse)");
  htmlCode(strReverse(tmp));
  htmlTmp.push(
    "(more reverse &amp; base32)");
  htmlCode(base32Dec(strReverse(tmp)));

  htmlTmp.push(
    "(more base32)");
  htmlCode(base32Dec(tmp));
  tmp=strReverse(tmp);
  htmlTmp.push(
    "(more reverse base32)");
  htmlCode(base32Dec(tmp));
  
  htmlTmp.push("(reverse>>base32)");
  var tmp=base32Dec(
    strReverse(str));
  htmlCode(tmp);
     
  htmlTmp.push("(atbash>>base32)");
  var tmp=base32Dec(atbash19(str));
  htmlCode(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push(
    "(atbash>>reverse>>base32)");
  var tmp=base32Dec(
    strReverse(atbash19(str)));
  htmlCode(tmp);
  htmlTmp.push(
    "(more atbash reverse)");
  htmlCode(strReverse(atbash19(tmp)));


  htmlTmp.push("-----------");

  htmlTmp.push("<b>(base32 to bin)</b>");
  var tmp=base32Dec(str, "2");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32 to oct)</b>");
  var tmp=base32Dec(str, "8");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32 to dec)</b>");
  var tmp=base32Dec(str, "10");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32 to hex)</b>");
  var tmp=base32Dec(str, "16");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32 to base64)</b>");
  var tmp=base64Enc(base32Dec(str, "2"),"2");
  htmlCode(tmp);
  
  htmlTmp.push("===============");
}

// base32hex
if (
  (
  (TEXT.match(
    /^=*[A-V0-9]+=*$/)
    && TEXT.match(/[A-V]/)
    && TEXT.match(/[0-9]/)) ||
    (TEXT.match(
    /^=*[a-v0-9]+=*$/)
    && TEXT.match(/[a-v]/)
    && TEXT.match(/[0-9]/)
  )
  ) && 
  TEXT.length>=14
) {
  var str=TEXT.toUpperCase();
  htmlTmp.push(str);
  htmlTmp.push("<a name='base32hex'><b>(base32hex decode)</b></a>");
  var tmp=base32hexDec(str);
  htmlCode(tmp);
  htmlTmp.push(
    "(more base32hex)");
  htmlCode(base32hexDec(tmp));
  tmp=strReverse(tmp);
  htmlTmp.push(
    "(more reverse base32hex)");
  htmlCode(base32hexDec(tmp));
  
  htmlTmp.push("(reverse>>base32hex)");
  var tmp=base32hexDec(
    strReverse(str));
  htmlCode(tmp);
     
  htmlTmp.push("(atbash>>base32hex)");
  var tmp=base32hexDec(atbash19(str));
  htmlCode(tmp);
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push(
    "(atbash>>reverse>>base32hex)");
  var tmp=base32hexDec(
    strReverse(atbash19(str)));
  htmlCode(tmp);
  htmlTmp.push(
    "(more atbash reverse)");
  htmlCode(strReverse(atbash19(tmp)));


  htmlTmp.push("-----------");

  htmlTmp.push("<b>(base32hex to bin)</b>");
  var tmp=base32hexDec(str, "2");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32hex to oct)</b>");
  var tmp=base32hexDec(str, "8");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32hex to dec)</b>");
  var tmp=base32hexDec(str, "10");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32hex to hex)</b>");
  var tmp=base32hexDec(str, "16");
  htmlCode(tmp);

  htmlTmp.push("<b>(base32hex to base64)</b>");
  var tmp=base64Enc(base32hexDec(str, "2"),"2");
  htmlCode(tmp);
  
  htmlTmp.push("===============");
}

//数字のみだからDecASCII
if (TEXT.match(/^\d+$/) 
  && TEXT.length%2==0) {
  htmlTmp.push("数字のみだからDecASCII"); 
  htmlTmp.push("<a name='dec'><b>(DecASCII)</b></a>");
  var tmp=decASCII(TEXT);
  htmlCode(tmp);
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(TEXT));
  htmlTmp.push("(DecASCII)");
  var tmp=decASCII(strReverse(TEXT));
  htmlCode(tmp);
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  
  //======
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(TEXT));
  htmlTmp.push("(DecASCII)");
  var tmp=decASCII(atbash19(TEXT));
  htmlCode(tmp);
  
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("===============");
}

//a-jをabc012してDecASCII
if (TEXT.match(/^[a-j\s]+$/i)) {
    htmlTmp.push("構成文字がA〜Jの範囲内に収まるため");

    function tmpPrint(str) {
        htmlCode(str);
        if (str.length > 1) htmlCode(str.match(/\d\d/g).join(" "));
        htmlTmp.push("(more DecASCII)");  
        htmlCode(decASCII(str));
    }

    htmlTmp.push("(abc012)"); 
    var tmp = letter2Num(TEXT);
    tmpPrint(tmp);
    htmlTmp.push("----");
    htmlTmp.push("(abc012 reverse)"); 
    var tmp = strReverse(letter2Num(TEXT));
    tmpPrint(tmp);
    htmlTmp.push("----");
    htmlTmp.push("(abc012 atbash1<->9)");
    var tmp = atbash19(letter2Num(TEXT));
    tmpPrint(tmp);
    htmlTmp.push("----");
    htmlTmp.push("(abc012 atbash1<->9 reverse)"); 
    var tmp = strReverse(atbash19(letter2Num(TEXT)));
    tmpPrint(tmp);
          
  htmlTmp.push("===============");
}

//数字だけ抽出
var numonly=TEXT.match(/\d+/g);
if (numonly) {
  htmlTmp.push("(数字だけ抽出)");
  htmlCode(numonly.join(" "));
  htmlCode(numonly.join(""));
  htmlTmp.push("--------");
  // 連続する同じ数字を数えて二桁へ
  var tmp=renzojuNum(TEXT);
  if (tmp.match(/^(\d\d\s?)+$/)) {
    htmlTmp.push("(連続する同じ数字を数えて二桁へ)");
    htmlTmp.push(tmp);
    htmlCode(tmp.replace(/\s+/g, ""));
  }
  
  htmlTmp.push("(抽出後)");
  htmlTmp.push(
    TEXT.replace(/\d+/g, ""));
  
  htmlTmp.push("===============");
}

//文字だけ抽出
var txonly=TEXT.match(/[a-zA-Z]+/g);
if (txonly) {
  htmlTmp.push("(文字だけ抽出)");
  htmlCode(txonly.join(" "));
  htmlCode(txonly.join(""));
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(txonly.join("")));
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(txonly.join("")));
  htmlTmp.push("(atbash & reverse)");
  htmlCode(
    strReverse(atbash19(txonly.join(""))));
  if (txonly.join("").match(/^[a-j]+$/)) {
    var tx=txonly.join("");
    htmlCode(letter2Num(tx));
    htmlCode(
      decASCII(
          letter2Num(tx)));
    htmlTmp.push("(reverse)");
    htmlCode(
      decASCII(
          strReverse(
            letter2Num(tx))));
  }
  
  htmlTmp.push("(抽出後)");
  htmlTmp.push(
    TEXT.replace(/[a-zA-Z]+/g, ""));
    
  htmlTmp.push("===============");
}

//大文字小文字で抽出
if (TEXT.match(/[A-Z]/) && TEXT.match(/[a-z]/)) {
 
  htmlTmp.push("<a name='UpLowCase'><b>(大文字小文字で抽出)</b></a>");
  
  var upc=TEXT.match(/[A-Z]+/g);
  var loc=TEXT.match(/[a-z]+/g);
  var etc=TEXT.match(/[^a-zA-Z]+/g);
  var etcupc=TEXT.match(/[^a-z]+/g);
  var etcloc=TEXT.match(/[^A-Z]+/g);
  
  if (upc) { 
    htmlTmp.push("(大文字のみ)");
    htmlTmp.push(upc.join(" "));
    htmlCode(upc.join(""));
    htmlCode(strReverse(upc.join("")),"","(reverse)");
    htmlCode(atbash(upc.join("")),"","(atbash)");
    htmlCode(strReverse(atbash(upc.join(""))),"","(reverse & atbash)");
  }
  if (loc) {
    htmlTmp.push("(小文字のみ)");
    htmlTmp.push(loc.join(" "));
    htmlCode(loc.join(""));
    htmlCode(strReverse(loc.join("")),"","(reverse)");
    htmlCode(atbash(loc.join("")),"","(atbash)");
    htmlCode(strReverse(atbash(loc.join(""))),"","(reverse & atbash)");
  }
  if (etc) {
    htmlTmp.push("(その他)");
    htmlTmp.push(etc.join(" "));
    htmlCode(etc.join(""));
    htmlCode(strReverse(etc.join("")),"","(reverse)");
    htmlCode(atbash(etc.join("")),"","(atbash)");
    htmlCode(atbash19(etc.join("")),"","(atbash19)");    
    htmlCode(atbash09(etc.join("")),"","(atbash09)");
    htmlCode(strReverse(atbash(etc.join(""))),"","(reverse & atbash)");
    htmlCode(strReverse(atbash19(etc.join(""))),"","(reverse & atbash19)");    
    htmlCode(strReverse(atbash09(etc.join(""))),"","(reverse & atbash09)");

    htmlTmp.push("(大文字以外)");
    htmlTmp.push(etcloc.join(" "));
    htmlCode(etcloc.join(""));
    htmlCode(strReverse(etcloc.join("")),"","(reverse)");
    htmlCode(atbash(etcloc.join("")),"","(atbash)");
    htmlCode(atbash19(etcloc.join("")),"","(atbash19)");    
    htmlCode(atbash09(etcloc.join("")),"","(atbash09)");
    htmlCode(strReverse(atbash(etcloc.join(""))),"","(reverse & atbash)");
    htmlCode(strReverse(atbash19(etcloc.join(""))),"","(reverse & atbash19)");    
    htmlCode(strReverse(atbash09(etcloc.join(""))),"","(reverse & atbash09)");

    htmlTmp.push("(小文字以外)");
    htmlTmp.push(etcupc.join(" "));
    htmlCode(etcupc.join(""));
    htmlCode(strReverse(etcupc.join("")),"","(reverse)");
    htmlCode(atbash(etcupc.join("")),"","(atbash)");
    htmlCode(atbash19(etcupc.join("")),"","(atbash19)");    
    htmlCode(atbash09(etcupc.join("")),"","(atbash09)");
    htmlCode(strReverse(atbash(etcupc.join(""))),"","(reverse & atbash)");
    htmlCode(strReverse(atbash19(etcupc.join(""))),"","(reverse & atbash19)");    
    htmlCode(strReverse(atbash09(etcupc.join(""))),"","(reverse & atbash09)");
  }

  htmlTmp.push("(大小文字でバイナリ抽出)");
  var bin="";
  for (var i=0; i<TEXT.length; i++) {
    if (TEXT[i].match(/[A-Z]/)) {
      bin+="1";
    } else if (TEXT[i].match(/[a-z]/)) {
      bin+="0";
    } else {
      bin+="?";
    }
  }
  htmlTmp.push(bin);
  htmlTmp.push("(binASCII)");
  htmlCode(binASCII(bin));
  
  htmlTmp.push("(binbash)");
  htmlTmp.push(binbash(bin));
  htmlCode(binASCII(binbash(bin)));
  
  htmlTmp.push("===============");
}


// 区切り記号で分割
var tmp=`/\\\\\\-\\.,\\|:\\s`;
var tmpRE=
  new RegExp("[^"+tmp+"]["+tmp+"][^"+tmp+"]", "");
if (TEXT.match(tmpRE)) {
  htmlTmp.push("(区切り記号で分割)");
  tmpRE=new RegExp("(["+tmp+"])", "g");
  
  var tmps=TEXT.split(tmpRE);
  var result1="";
  var result2="";
  for (var i in tmps) {
    // htmlTmp.push(tmps[i]);
    if (i%2==0) {
      result1+=tmps[i];
    } else {
      result2+=tmps[i];
    }
  }
  htmlTmp.push("(join)");
  htmlCode(result2);
  htmlCode(result1);
  htmlTmp.push("==============");
}

// abc012→DecASCII
if (TEXT.match(/^[abcdefghij]+$/)
  && TEXT.length%2==0) {
  htmlTmp.push("match [a-j] & even");
  
  var tmp=letter2Num(TEXT);
  htmlTmp.push("→abc012");
  htmlCode(tmp);
  
  /*
  tmp=decASCII(
    tmp.match(/../g).join(" "));
  htmlTmp.push("→DecASCII");
  htmlCode(tmp);
  */
  
  htmlTmp.push("(atbash)");
  htmlCode(atbash19(tmp));
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp));
  
  
  htmlTmp.push("===============");
}


// 文字の数→DecASCII
if (TEXT.match(
  /^([\w]{0,9}[\s.,\/\-_:+=・]+)+/)) {
  var tmp=TEXT.split(/[\s.,\/\-_:+=・]/);
  var str="";
  for (var i in tmp) {
    str+=tmp[i].length+" ";
  }
  htmlTmp.push("→区切って文字の数");
  htmlCode(str);
  
  str=decASCII(
    str.replace(/\s/g, "").match(/../g).join(" "));
  
  htmlTmp.push("→DecASCII");
  htmlCode(str);
  
  htmlTmp.push("===============");
}

//vigenereデコード
var tmp=TEXT.replace(/\n/g, "");
if (tmp.match(/^(\d*[a-z]*\d*)+$/i)) {
  htmlTmp.push("<a name='vigenere'><b>(vigenere)</b></a>");
  
  function vige(key) {
    var tmpv=vigenereDec(tmp, key);
    htmlCode(tmpv, "", "(vig key: "+key+")");
  }
  
  vige("abcdefghijklmnopqrstuvwxyz");
  vige("zyxwvutsrqponmlkjihgfedcba");
  vige("1234567890");
  vige("0123456789");
  vige("9876543210");
  vige("0987654321");
  vige("bingo");
  vige("vigenere");
  vige("cipher");
  vige("abcdefghij");
  vige(strReverse(TEXT));
  vige(atbash19(TEXT));
  vige(strReverse(atbash19(TEXT)));
  
  var date = new Date();
  key=String(date.getFullYear());
  key+=String(
    date.getMonth()+1
  ).replace(/^\d$/,"0$&");
  key+=String(
    date.getDate()
  ).replace(/^\d$/,"0$&");
  vige(key);
  
  date.setDate(date.getDate() - 1);
  key=String(date.getFullYear());
  key+=String(
    date.getMonth()+1
  ).replace(/^\d$/,"0$&");
  key+=String(
    date.getDate()
  ).replace(/^\d$/,"0$&");
  vige(key);
  
  if (tmp.match(/^\d+$/)) {
    // Rot
    vige("1");
    vige("2");
    vige("3");
    vige("4");
    vige("5");
    vige("6");
    vige("7");
    vige("8");
    vige("9");
  }

  // 半分がkey
  if (tmp.length%2==0 && 
    tmp.length<=100 && 
    kouseimoji.length>=4
  ) {
    var len=tmp.length;
    var tmpAry=tmp.split("");
    var tmp1=tmpAry.slice(0, len/2);
    var tmp2=tmpAry.slice(len/2, len);
    vige(tmp1.join(""));
    vige(tmp2.join(""));
  }


  // 奇数偶数がkey
  if (tmp.length%2==0 && 
    tmp.length<=100 && 
    kouseimoji.length>=4
  ) {
    htmlTmp.push("奇数偶数がkey");
    var odd=TEXT.replace(/(.).?/g, "$1");
    var even=TEXT.replace(/.(.)?/g, "$1");
    htmlCode(odd);
    htmlCode(even);
    htmlCode(vigenereDec(odd, even), "", "(vig key: "+ even+")");
    htmlCode(vigenereDec(even, odd), "", "(vig key: "+ odd+")");
  }

  
  // 1/3ずつがkey
  if (tmp.length%3==0 && 
    tmp.length<=100 && 
    kouseimoji.length>=4
  ) {
    var len=tmp.length;
    var tmpAry=tmp.split("");
    var tmp1=tmpAry.slice(0, len/3);
    var tmp2=tmpAry.slice(len/3, len-len/3);
    var tmp3=tmpAry.slice(len-len/3, len);
    vige(tmp1.join(""));
    vige(tmp2.join(""));
    vige(tmp3.join(""));
  }

  // pri,suffix,kw部に分けてvig(数字2文字)
  if (tmp.length>=14 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefg";
    tmpkey[1]="";
    tmpkey[2]="zyxwvut";
    for (var i=0; i<tmp.length-14; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字2文字)");
    vige(tmpkey.join(""));
  }
  
  // pri,suffix,kw部に分けてvig(数字3文字)
  if (tmp.length>=18 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefghi";
    tmpkey[1]="";
    tmpkey[2]="zyxwvutsr";
    for (var i=0; i<tmp.length-18; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字3文字)");
    vige(tmpkey.join(""));
  }
  
  // pri,suffix,kw部に分けてvig(数字2文字)
  if (tmp.length>=14 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefg";
    tmpkey[1]="";
    tmpkey[2]="abcdefg";
    for (var i=0; i<tmp.length-14; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字2文字)");
    vige(tmpkey.join(""));
  }
  
  // pri,suffix,kw部に分けてvig(数字3文字)
  if (tmp.length>=18 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefghi";
    tmpkey[1]="";
    tmpkey[2]="abcdefghi";
    for (var i=0; i<tmp.length-18; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字3文字)");
    vige(tmpkey.join(""));
  }
  
  // pri,suffix,kw部に分けてvig(数字2文字)
  if (tmp.length>=14 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefg";
    tmpkey[1]="";
    tmpkey[2]="tuvwxyz";
    for (var i=0; i<tmp.length-14; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字2文字)");
    vige(tmpkey.join(""));
  }
  
  // pri,suffix,kw部に分けてvig(数字3文字)
  if (tmp.length>=18 && 
    tmp.length<=50 && 
    kouseimoji.length>=4
  ) {
    var tmpkey=[];
    tmpkey[0]="abcdefghi";
    tmpkey[1]="";
    tmpkey[2]="rstuvwxyz";
    for (var i=0; i<tmp.length-18; i++) {
      tmpkey[0]+="a";
    }
    htmlTmp.push("pri,suffix,kw部に分けてvig(数字3文字)");
    vige(tmpkey.join(""));
  }
  
  htmlTmp.push("===============");
}


//vigenere autokeyデコード
if (tmp.match(/^(\d*[a-z]*\d*)+$/i)) {
  htmlTmp.push("(vigenere autokey)");
  
  function vigeA(key) {
    var tmpa=vigenereAutoDec(
      tmp, key);
    htmlCode(tmpa, "", "(auto key: "+key+")");
    htmlTmp.push("reverse");
    var tmpa=vigenereAutoDec(
      strReverse(tmp), key);
    htmlCode(tmpa, "", "(reverse & auto key: "+key+")");
    htmlCode(strReverse(tmpa), "", "(reverse & auto key: "+key+") more reverse");
  }
  
  vigeA("a");
  vigeA("aa");
  vigeA("aaa");
  vigeA("aaaa");
  vigeA("aaaaa");
  vigeA("ab");
  vigeA("abc");
  vigeA("abcd");
  vigeA("abcde");
  vigeA("z");
  vigeA("yz");
  vigeA("xyz");
  vigeA("wxyz");
  vigeA("vwxyz");
  vigeA("zz");
  vigeA("zzz");
  vigeA("zzzz");
  vigeA("zzzzz");
  vigeA("bingo");
  vigeA("vigenere");
  vigeA("cipher");
  vigeA("abcdefghijklmnopqrstuvwxyz");
  vigeA("zyxwvutsrqponmlkjihgfedcba");
  vigeA("1234567890");
  vigeA("0123456789");
  vigeA("9876543210");
  vigeA("0987654321");
  
  var tmpVigA="";
  if (tmp.length%2==0) {
    for (var i=0; i<tmp.length/2; i++) {
      tmpVigA+="a";
    }
    vigeA(tmpVigA);
  }
  var tmpVigA="";
  if (tmp.length%3==0) {
    for (var i=0; i<tmp.length/3; i++) {
      tmpVigA+="a";
    }
    vigeA(tmpVigA);
  }
  
  var tmpVigA="";
  if (tmp.length%4==0) {
    for (var i=0; i<tmp.length/4; i++) {
      tmpVigA+="a";
    }
    vigeA(tmpVigA);
  }
  
  var tmpVigA="";
  if (tmp.length%5==0) {
    for (var i=0; i<tmp.length/5; i++) {
      tmpVigA+="a";
    }
    vigeA(tmpVigA);
  }
  
  if (tmp.length%2==0) {
    htmlTmp.push("(2分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/2+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[1]);
  }
  if (tmp.length%3==0) {
    htmlTmp.push("(3分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/3+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[2]);
  }
  if (tmp.length%4==0) {
    htmlTmp.push("(4分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/4+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[3]);
  }
  if (tmp.length%5==0) {
    htmlTmp.push("(5分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/5+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[4]);
  }
  if (tmp.length%6==0) {
    htmlTmp.push("(6分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/6+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[5]);
  }
  if (tmp.length%7==0) {
    htmlTmp.push("(7分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/7+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[6]);
  }
  if (tmp.length%8==0) {
    htmlTmp.push("(8分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/8+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[7]);
  }
  if (tmp.length%9==0) {
    htmlTmp.push("(9分割して最後がkey)");
    var tmpRE=new RegExp(
      ".{"+tmp.length/9+"}", "g");
    var tmpVigA=tmp.match(tmpRE);
    vigeA(tmpVigA[8]);
  }

  if (tmp.match(/^\d+$/)) {
    vigeA("1");
    vigeA("2");
    vigeA("3");
    vigeA("4");
    vigeA("5");
    vigeA("6");
    vigeA("7");
    vigeA("8");
    vigeA("9");
  }
  
  htmlTmp.push("===============");
}

// Symbolを数字へ
if (TEXT.match(/[!@#\$%\^&\*\(\)]/)) {
  htmlTmp.push("<a name='symbol2num'><b>(Symbolを数字へ)</b></a>");
  htmlTmp.push(TEXT);
  var tmp=symbol2Num(TEXT);
  var tmp2=symbol2Num(
    TEXT.replace(
      /[!@#\$%\^&\*\(\)]/g, " $& "));
  htmlCode(tmp2);
  htmlCode(tmp);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp));
  htmlTmp.push("(more reverse & atbash)");
  htmlCode(atbash19(strReverse(tmp)));
  htmlTmp.push("===============");
}

// Symbolをフランスカナダ版数字へ
if (TEXT.match(/[!@#\$%\?&\*\(\)]/)) {
  htmlTmp.push("<b>(Symbolをフランスカナダ版数字へ)</b>");
  htmlTmp.push(TEXT);
  var tmp=symbol2NumFrench(TEXT);
  var tmp2=symbol2NumFrench(
    TEXT.replace(
      /[!@#\$%\?&\*\(\)]/g, " $& "));
  htmlCode(tmp2);
  htmlCode(tmp);
  htmlTmp.push("===============");
}

// Symbolだけを抽出
if (TEXT.match(/[!@#\$%\^&\*\(\)]/)) {
  var tmp=TEXT.split(/[!@#\$%\^&\*\(\)]+/g);
  var tmp2=TEXT.match(/[!@#\$%\^&\*\(\)]+/g);
  htmlTmp.push("<b>(Symbolだけを抽出)</b>");
  htmlTmp.push(TEXT);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("(抽出後)");
  if (tmp2) {
    htmlTmp.push(tmp2.join(" "));
    htmlCode(tmp2.join(""));
  }
  htmlTmp.push("===============");
}

// Symbolだけを抽出(フランスカナダ版)
if (TEXT.match(/[!@#\$%\?&\*\(\)]/)) {
  var tmp=TEXT.split(/[!@#\$%\?&\*\(\)]+/g);
  var tmp2=TEXT.match(/[!@#\$%\?&\*\(\)]+/g);
  htmlTmp.push("<b>(Symbolだけを抽出 フランスカナダ版)</b>");
  htmlTmp.push(TEXT);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));
  htmlTmp.push("(抽出後)");
  if (tmp2) {
    htmlTmp.push(tmp2.join(" "));
    htmlCode(tmp2.join(""));
  }
  htmlTmp.push("===============");
}

// キーボード上で1文字左へ
var str=qwertyLeft(TEXT);
htmlTmp.push("→Qwertyキーボード上で1文字左へ");
htmlCode(str);
htmlTmp.push("----------");
var str=dvorakLeft(TEXT);
htmlTmp.push("→Dvorakキーボード上で1文字左へ");
htmlCode(str);
htmlTmp.push("===============");


// キーボード上で1文字下へ
var str=qwertyDown(TEXT);
htmlTmp.push("→Qwertyキーボード上で1文字下へ");
htmlCode(str);
htmlTmp.push("----------");
var str=dvorakDown(TEXT);
htmlTmp.push("→Dvorakキーボード上で1文字下へ");
htmlCode(str);
htmlTmp.push("===============");

// キーボード上で1文字右へ
var str=qwertyRight(TEXT);
htmlTmp.push("→Qwertyキーボード上で1文字右へ");
htmlCode(str);
htmlTmp.push("----------");
var str=dvorakRight(TEXT);
htmlTmp.push("→Dvorakキーボード上で1文字右へ");
htmlCode(str);
htmlTmp.push("===============");

// キーボード上で1文字上へ
var str=qwertyUp(TEXT);
htmlTmp.push("→Qwertyキーボード上で1文字上へ");
htmlCode(str);
htmlTmp.push("----------");
var str=dvorakUp(TEXT);
htmlTmp.push("→Dvorakキーボード上で1文字上へ");
htmlCode(str);
htmlTmp.push("===============");


// キーボード上で180度回転
var strQ180=qwerty180(TEXT);
htmlTmp.push("→Qwertyキーボード上で180度回転");
htmlCode(strQ180);
htmlTmp.push("----------");
var strQ180=dvorak180(TEXT);
htmlTmp.push("→Dvorakキーボード上で180度回転");
htmlCode(strQ180);
htmlTmp.push("===============");


// キーボードで上にスライドして数字を拾う
var strTop=qwertyTop(TEXT);
htmlTmp.push("→qwertyキーボードで上にスライドして数字");
htmlCode(strTop);
htmlTmp.push("----");
var strTop=qwertyTop(atbash19(TEXT));
htmlTmp.push("(atbash)");
htmlCode(strTop);
htmlTmp.push("----");
var strTop=
  qwertyTop(strReverse(TEXT));
htmlTmp.push("(reverse)");
htmlCode(strTop);
htmlTmp.push("--------------");
var strTop=dvorakTop(TEXT);
htmlTmp.push("→Dvorakキーボードで上にスライドして数字");
htmlCode(strTop);
htmlTmp.push("----");
var strTop=dvorakTop(atbash19(TEXT));
htmlTmp.push("(atbash)");
htmlCode(strTop);
htmlTmp.push("----");
var strTop=
  dvorakTop(strReverse(TEXT));
htmlTmp.push("(reverse)");
htmlCode(strTop);
htmlTmp.push("===============");
  

// キーボード左右反転
htmlTmp.push(TEXT);
var strSwitch=qwertyFlipH(TEXT);
htmlTmp.push("→Qwerty左右反転");
htmlCode(strSwitch);
htmlTmp.push("----------");
var strSwitch=dvorakFlipH(TEXT);
htmlTmp.push("→Dvorak左右反転");
htmlCode(strSwitch);
htmlTmp.push("===============");


// キーボード上下反転
htmlTmp.push(TEXT);
var strSwitch=qwertyFlipV(TEXT);
htmlTmp.push("→Qwerty上下反転");
htmlCode(strSwitch);
htmlTmp.push("----------");
var strSwitch=dvorakFlipV(TEXT);
htmlTmp.push("→Dvorak上下反転");
htmlCode(strSwitch);
htmlTmp.push("===============");


// キーボード変換
htmlTmp.push(TEXT);
var q2d=qwerty2dvorak(TEXT);
htmlTmp.push("キーボード変換 Qwerty → Dvorak");
htmlCode(q2d);
htmlTmp.push("----------");
var d2q=dvorak2qwerty(TEXT);
htmlTmp.push("キーボード変換 Dvorak → Qwerty");
htmlCode(d2q);
htmlTmp.push("===============");





// キーボード座標
if (TEXT.match(
  /^([0-9][0-3][\s\/\-.,:])*[0-9][0-3]$/)
) {
  htmlTmp.push(TEXT);
  var strQXY=qwertyXY_old(TEXT);
  htmlTmp.push("→Qwerty座標 old");
  htmlCode(strQXY);
  htmlTmp.push("----------");
  var strQXY=qwertyXY(TEXT);
  htmlTmp.push("→Qwerty座標");
  htmlCode(strQXY);
  htmlTmp.push("----------");
  var strQXY=dvorakXY(TEXT);
  htmlTmp.push("→Dvorak座標");
  htmlCode(strQXY);
  htmlTmp.push("===============");
}

// キーボード座標XXX
if (TEXT.match(
  /^(?:([0-9])\1*[\s\/\-.,:])*([0-9])\1*$/)
) {
  htmlTmp.push(TEXT);
  var strQXY=qwertyXXX_old(TEXT);
  htmlTmp.push("→Qwerty座標XXX old");
  htmlCode(strQXY);
  htmlTmp.push("----------");
  var strQXY=qwertyXXX(TEXT);
  htmlTmp.push("→Qwerty座標XXX");
  htmlCode(strQXY);
  htmlTmp.push("----------");
  var strQXY=dvorakXXX(TEXT);
  htmlTmp.push("→Dvorak座標XXX");
  htmlCode(strQXY);
  htmlTmp.push("===============");
}


goMorse(TEXT);
htmlTmp.push("===============");
htmlTmp.push(
  "<b>(Reverse > morse)</b>");
htmlTmp.push(strReverse(TEXT));
goMorse(strReverse(TEXT));
htmlTmp.push("===============");
if (TEXT.match(/^(?:(?:([.]+)\1|([\-]+)\2)(?:([.]+)\3|([\-]+)\4)*\s)+(?:([.]+)\1|([\-]+)\2)(?:([.]+)\3|([\-]+)\4)*$/)) {
  htmlTmp.push("<span class='alert'>モールス2重 repeat</span>");
  var tmp=TEXT.split(/\s/g);
  for (var i in tmp) {
    tmp[i]=tmp[i].replace(/(.)./g,"$1");
  }
  htmlTmp.push(tmp.join(" "));
  goMorse(tmp.join(" "));
}
htmlTmp.push("===============");

// ガラケー
if (TEXT.match(
  /^(([2-9]){1,4}[\s01\D]?)+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='phoneKeyboard'><b>(ガラケー)</b></a>");
  var garakeRes=garake(TEXT);
  htmlCode(garakeRes);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(garakeRes));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(garakeRes));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(garakeRes)));
*/  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var garakeRes=
    garake(strReverse(TEXT));
  htmlCode(garakeRes);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(garakeRes));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(garakeRes));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(garakeRes)));
*/
  htmlTmp.push("===============");
}

// Run length ガラケー
// 個数とナンバー
var tmp=TEXT;
if (tmp.match(
/^(([1-4][79]|[1-3][2-68])[\s\-.,\\\/|:]*)+$/)) {
  htmlTmp.push(tmp);
  htmlTmp.push("<b>(Run Length ガラケー)</b>");
  var result=garakeRunLength(tmp);
  htmlCode(result);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(result));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(result)));
*/
  htmlTmp.push("===============");
}
var tmp=strReverse(TEXT);  
if (tmp.match(
/^(([1-4][79]|[1-3][2-68])[\s\-.,\\\/|:]*)+$/)) {
  htmlTmp.push("(reverse)");
  htmlTmp.push(tmp);
  htmlTmp.push("<b>(Run Length ガラケー)</b>");
  var result=garakeRunLength(tmp);
  htmlCode(result);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(result));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(result)));
*/
  htmlTmp.push("===============");
}
// ナンバーと個数
var tmp=TEXT;
if (tmp.match(
/^(([79][1-4]|[2-68][1-3])[\s\-.,\\\/|:]*)+$/)) {
  htmlTmp.push(tmp);
  htmlTmp.push("<b>(Run Length ガラケー)</b>");
  tmp=tmp.replace(/(\d)(\d)/g, "$2$1");
  var result=garakeRunLength(tmp);
  htmlCode(result);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(result));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(result)));
*/
  htmlTmp.push("===============");
}
var tmp=strReverse(TEXT);  
if (tmp.match(
/^(([1-4][79]|[1-3][2-68])[\s\-.,\\\/|:]*)+$/)) {
  htmlTmp.push("(reverse)");
  htmlTmp.push(tmp);
  htmlTmp.push("<b>(Run Length ガラケー)</b>");
  tmp=tmp.replace(/(\d)(\d)/g, "$2$1");
  var result=garakeRunLength(tmp);
  htmlCode(result);
/*
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(result));
  htmlTmp.push(
    "(more atbash & reverse)");
  htmlCode(
    strReverse(atbash19(result)));
*/
  htmlTmp.push("===============");
}

// 逆ガラケー変換
if (TEXT.match(
  /^[a-zA-Z01]+$/)) {
  var tmp=regarake(TEXT);
  if (tmp%2==0) {
    htmlTmp.push(TEXT);
    htmlTmp.push("逆ガラケー変換");
    htmlTmp.push(tmp);
    var garakeRes=decASCII(tmp);
    htmlTmp.push("(DecASCII)");
    htmlCode(garakeRes);
/*
    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(garakeRes));
    htmlTmp.push("(more atbash)");
    htmlCode(atbash19(garakeRes));
    htmlTmp.push(
      "(more atbash & reverse)");
    htmlCode(
      strReverse(atbash19(garakeRes)));
*/
    htmlTmp.push(
      "===============");
  }
  
  var tmp=regarake(strReverse(TEXT));
  if (tmp%2==0) {
    htmlTmp.push("逆ガラケー変換");
    htmlTmp.push("(reverse)");
    htmlTmp.push(strReverse(TEXT));
    htmlTmp.push(tmp);
    var garakeRes=decASCII(tmp);
    htmlTmp.push("(DecASCII)");
    htmlCode(garakeRes);
/*
    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(garakeRes));
    htmlTmp.push("(more atbash)");
    htmlCode(atbash19(garakeRes));
    htmlTmp.push(
      "(more atbash & reverse)");
    htmlCode(
      strReverse(atbash19(garakeRes)));
*/
    htmlTmp.push(
      "===============");
  }
}

// polybius変換
if (TEXT.replace(/\s+/g,"").length%2==0
  &&  TEXT.match(/^([1-5\s]+|[0-4\s]+|[1-5\s]+|[2-6\s]+)$/)) {
  var myText="";
  if (TEXT.match(/^[0-4\s]+$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("(+1)");
    for (var i in TEXT) {
      myText+=Number(TEXT[i])+1;
    }
  } else if (TEXT.match(/^[2-6\s]+$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("(-1)");
    for (var i in TEXT) {
      myText+=Number(TEXT[i])-1;
    }
  } else {
    myText=TEXT;
  }
  htmlTmp.push(
    myText.match(/../g).join(" "));
  // polybius変換
  var r=polybius(myText);
  htmlTmp.push("<a name='polybius'>1～5を使ったペアになる");
  htmlTmp.push("<b>(polybius)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=polybius(strReverse(myText));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  htmlTmp.push("===============");
}

// polybius拡張版変換
if (TEXT.replace(/\s+/g,"").length%2==0
  &&  TEXT.match(/^([1-6][1-6]\s*){5,}$/)) {
  var myText="";
  if (TEXT.match(/^([1-6][1-6]\s){4,}[1-6][1-6]$/)) {
    htmlTmp.push(TEXT);
    myText+=Text.replace(/\s/g,"");
  } else {
    myText=TEXT;
  }
  htmlTmp.push(
    myText.match(/../g).join(" "));

  // polybius変換
  var r=polybiusNumAZ10(myText);
  htmlTmp.push("<a name='polybius'>1～6を使ったペアになる");
  htmlTmp.push("<b>(polybius拡張版 数字を含む A~Z1~0)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=polybiusNumAZ10(strReverse(myText));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }

  htmlTmp.push("------------");
  htmlTmp.push("------------");

  // polybius変換
  var r=polybiusNumAZ09(myText);
  htmlTmp.push("<a name='polybius'>1～6を使ったペアになる");
  htmlTmp.push("<b>(polybius拡張版 数字を含む A~Z0~9)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=polybiusNumAZ09(strReverse(myText));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }

  htmlTmp.push("------------");
  htmlTmp.push("------------");

  // polybius変換
  var r=polybiusNum10AZ(myText);
  htmlTmp.push("<a name='polybius'>1～6を使ったペアになる");
  htmlTmp.push("<b>(polybius拡張版 数字を含む 1~0A~Z)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=polybiusNum10AZ(strReverse(myText));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("------------");

  // polybius変換
  var r=polybiusNum09AZ(myText);
  htmlTmp.push("<a name='polybius'>1～6を使ったペアになる");
  htmlTmp.push("<b>(polybius拡張版 数字を含む 0~9A~Z)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=polybiusNum09AZ(strReverse(myText));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("===============");
}



// atbash polybius変換
if (TEXT.match(/^([5-9][5-9])+$/)) {
  htmlTmp.push(
    TEXT.match(/../g).join(" ")); 
  // polybius変換
  htmlTmp.push("(atbash)");
  htmlTmp.push(
    atbash19(TEXT).match(/../g).join(" ")); 
  var r=polybius(atbash19(TEXT));
  htmlTmp.push("1～5を使ったペアになる");
  htmlTmp.push("<b>(polybius)</b>");
  htmlTmp.push("invalidなら文字数字やkwのi以外をjにしてみよう！！");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("<b>i -> j</b>");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(
    strReverse(atbash19(TEXT)));
  var r=polybius(
    strReverse(atbash19(TEXT)));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("i->j");
    r=r.replace(/i/ig, "j");
    htmlCode(r);
  }
  htmlTmp.push("===============");
}

// Bifid変換
if (TEXT.match(/^[a-z]+$/i)) {
  // Bifid変換
  htmlTmp.push("アルファベットのみ");
  htmlTmp.push("<a name='bifid'><b>Bifid decode (i→j可能性あり)</b></a>");
  htmlCode(bifid(TEXT));
  htmlTmp.push("<b>Bifid encode  (i→j可能性あり)</b>");
  htmlCode(bifid(TEXT,"encode"));
   
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  var r=strReverse(TEXT);
  htmlTmp.push(r);
  htmlTmp.push("<b>Bifid decode (i→j可能性あり)</b>");
  htmlCode(bifid(r));
  htmlTmp.push("<b>Bifid encode  (i→j可能性あり)</b>");
  htmlCode(bifid(r,"encode"));
   htmlTmp.push("===============");
}


// Playfair変換
if (
  TEXT.replace(/[^a-z]/ig, "").length%2==0 && 
  TEXT.match(/[a-z]/i) && 
  TEXT.match(/^[a-zA-Z ]+$/)
) {
  var r=playfair(TEXT);
  if (
    TEXT.match(/^[a-z]+$/i) &&
    TEXT.length%2==0
  ) {
    htmlTmp.push("アルファベットのみでペアになる");
  }
  htmlTmp.push("<a name='playfair'><b>(Playfair)</b></a>");
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("( i → j )");
    htmlCode(r.replace(/i/ig, "j"));
  }
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  var r=playfair(strReverse(TEXT));
  htmlCode(r);
  if (r.match(/i/i)) {
    htmlTmp.push("( i → j )");
    htmlCode(r.replace(/i/ig, "j"));
  }
  htmlTmp.push("===============");
}


// semaphore セマフォ
if (TEXT.match(/[1235679][12]?-[1235679][12]?(?=[\s/\\|]*)/g)) {
  htmlTmp.push(
    "<b>(semaphore)</b>");
  htmlCode(semaphore(TEXT));
  htmlTmp.push("------------");
  htmlTmp.push("(reverse)");
  htmlTmp.push(strReverse(TEXT));
  htmlCode(
    semaphore(strReverse(TEXT)));
  htmlTmp.push("===============");
}

//hexと認識
if (TEXT.match(/^[0-9a-f\s]+$/ig)) {
  htmlTmp.push("<a name='hex'><b>(構成文字が[0-9a-f]。16進数かも)</b></a>");
  
  // 念のためdecASCII
  htmlTmp.push("(decASCII)");
  htmlCode(decASCII(TEXT));
  
  // hexASCII
  htmlTmp.push("(hexASCII)");
  var tmp=hexASCII(TEXT);
  
  htmlCode(tmp);
  
  // hexbash
  var tmp=hexbash(TEXT);
  htmlTmp.push("(hexbash)");
  htmlCode(tmp);

  tmp=hexASCII(tmp);
  htmlTmp.push("(hexASCII)");
  
  htmlCode(tmp);
  
  //decASCII
  if (hexbash(TEXT).match(/^\d+$/)) {
    var tmp=decASCII(hexbash(TEXT));
    htmlTmp.push("(decASCII)");
    
    if (tmp) {
      htmlCode(tmp);
    }
  }
  
  // 前後入れ替え
  var tmp=TEXT.replace(/(.)(.)/g, "$2$1");
  htmlTmp.push(
    "(前後入れ替えHexASCII)");
  htmlCode(tmp);
  htmlCode(hexASCII(tmp));
  
  htmlTmp.push("-----------");
  
  // reverse
  // hexASCII
  htmlTmp.push("(Reverse hexASCII)");
  var tmp=hexASCII(strReverse(TEXT));
  htmlCode(tmp);
  
  // hexbash
  var tmp=hexbash(strReverse(TEXT));
  htmlTmp.push("(Reverse hexbash)");
  htmlCode(tmp);
  
  tmp=hexASCII(tmp);
  htmlTmp.push("(hexASCII)");
  htmlCode(tmp);
  
  //decASCII
  if (hexbash(
      strReverse(TEXT)).match(/^\d+$/)) {
    tmp=decASCII(
      hexbash(strReverse(TEXT)));
    htmlTmp.push("(decASCII)");
    htmlCode(tmp);
  }
  
  // 前後入れ替え
  var tmp=strReverse(TEXT);
  tmp=tmp.replace(/(.)(.)/g, "$2$1");
  htmlTmp.push(
    "(前後入れ替えHexASCII)");
  htmlCode(tmp);
  htmlCode(hexASCII(tmp));
  htmlTmp.push("===============");
  htmlTmp.push(TEXT);
  htmlTmp.push("(hexBase64)");
  var tmp=base64Enc(TEXT, "16")
  htmlCode(tmp);
  
  // 構成文字をカウント
  var a=tmp.split("");
  // 重複を削除
  var b=a.filter(function (x, i, self) {
      return self.indexOf(x) === i;});
  // 3種ならモールス
  if (b.length===3) {
    htmlTmp.push("<b>構成文字が3種。モールス?</b>");
    //メタキャラクタをエスケープ
    for (var i in b) {
      if (b[i].match(/[.+*?^$(\)]/)) {
        b[i]="\\"+b[i];
      }
    }
    var tmpRE2=
      new RegExp("("+b[2]+")\\1","i");
    var tmpRE1=
      new RegExp("("+b[1]+")\\1","i");
    var tmpRE0=
      new RegExp("("+b[0]+")\\1","i");
    
    if (tmp.match(/^([-.] *)+$/)) {
      goMorse(tmp);
    } else if (!tmp.match(tmpRE2)) {
      var tmpRE=new RegExp(b[2],"ig");
      tmp=tmp.replace(tmpRE, " ");
      var tmpRE=new RegExp(b[1],"ig");
      tmp=tmp.replace(tmpRE, ".");
      var tmpRE=new RegExp(b[0],"ig");
      tmp=tmp.replace(tmpRE, "-");
      htmlTmp.push(tmp);
      goMorse(tmp);
    } else if (!tmp.match(tmpRE1)) {
      var tmpRE=new RegExp(b[1],"ig");
      tmp=tmp.replace(tmpRE, " ");
      var tmpRE=new RegExp(b[2],"ig");
      tmp=tmp.replace(tmpRE, ".");
      var tmpRE=new RegExp(b[0],"ig");
      tmp=tmp.replace(tmpRE, "-");
      htmlTmp.push(tmp);
      goMorse(tmp);
    } else if (!tmp.match(tmpRE0)) {
      var tmpRE=new RegExp(b[0],"ig");
      tmp=tmp.replace(tmpRE, " ");
      var tmpRE=new RegExp(b[2],"ig");
      tmp=tmp.replace(tmpRE, ".");
      var tmpRE=new RegExp(b[1],"ig");
      tmp=tmp.replace(tmpRE, "-");
      htmlTmp.push(tmp);
      goMorse(tmp);
    }
    
  }
  htmlTmp.push("===============");
}


// 順に送り出し
var keySyougouL=keySyougou(TEXT);
keySyougouL.sort(function(a,b){
    if( a.length > b.length ) return -1;
    if( a.length < b.length ) return 1;
    if( a > b ) return 1;
    if( a < b ) return -1;
    return 0;
});
if (keySyougouL) {
  var tmpL=TEXT.split("");
  for (var i=0; i<TEXT.length; i++) {
    tmpL.push(tmpL[0]);
    tmpL.shift();
    var result=tmpL.join("");
    if (
      checkPasscode(result).match(/fix/)
    ) {
      htmlCode(TEXT);
      htmlTmp.push(
    "<b>(順に送り出し)</b>");
      htmlCode(result);
      htmlTmp.push("=============");
    }
  }
}

// SKIP
if (
  TEXT.length>=10 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='skip'><b>(SKIP)</b></a>");
  
	var tmpL=skipAll(TEXT);
	for (var i in tmpL) {
	  htmlTmp.push(tmpL[i][0]);
    htmlCode(tmpL[i][1]);
	}
	
  htmlTmp.push("==============");
}

// RailFence
if (
  TEXT.length>=10 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='railfence'><b>(RailFence rails:3)</b></a>");
  htmlCode(railfence(TEXT,"decript",3));
  htmlTmp.push("==============");
}

// ADFGVX
if (
  (TEXT.match(/^[ADFGVX]{6,}$/i) || atbash(TEXT).match(/^[ADFGVX]{6,}$/i)) && 
  kouseimoji.length>=4 && 
  TEXT.length%2==0
) {
  htmlTmp.push("<a name='adfgvx'><b>(ADFGVX)</b></a>");
  if (TEXT.match(/^[ADFGVX]{6,}$/i)) {
    htmlCode(adfgvx(TEXT,"","decode"));
  } else {
    htmlCode(adfgvx(atbash(TEXT),"","decode"));
  }
  htmlTmp.push("==============");
}

// ADFGX
if (
  (TEXT.match(/^[ADFGX]{5,}$/i) || atbash(TEXT).match(/^[ADFGX]{5,}$/i)) && 
  kouseimoji.length>=4 && 
  TEXT.length%2==0
) {
  htmlTmp.push("<a name='adfgx'><b>(ADFGX)</b></a>");
  if (TEXT.match(/^[ADFGX]{5,}$/i)) {
    htmlCode(adfgx(TEXT,"","decode"));
  } else {
    htmlCode(adfgx(atbash(TEXT),"","decode"));
  }
  htmlTmp.push("==============");
}


// Rectangles
if (!TEXT.match(/[\s\n]/)) {
  htmlTmp.push("<a name='rect'><b>(rect)</b></a>");
  goRectangles(TEXT);
  htmlTmp.push("===============");
}


// ==============


kakokaitou();
kakokaitou2();
kakokaitou3();
kakokaitou4();
kakokaitou5();
kakokaitou6();
}



