
// LIB_一括func
// #LIB

// #IMPORT Lib_decode_basic
// #IMPORT Lib_decode

// ======================
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


// ======================
// Acquired items
function acquiredItems(str) {
  if (str.match(/^Passcode confirmed/)) {
    str=str.replace(/Passcode confirmed\. /, "").replace(/ ?(((L[1-8]|Rare|Very Rare) )?(\d+ XM|\d+ AP|Ultra Strike|(Lawson )?Power Cube|Xmp Burster|Resonator|Multi-hack|Link Amp|Heat Sink|(Portal|AXA) Shield|Force Amp|Turret|SoftBank UltraLink|(MUFG )?Capsule|ITO EN Transmuter ?\([-+]\)|Portal Key)( ?\(\d+\))?)/g, "<br>\n$1");
  }
  return str;
}

// ======================
// モールス
function goMorse(sorce) {
  var startTimeFunc=new Date(); //function開始時刻
  
    if (!sorce) return;
//if (defCharCount(sorce)==3) {
  htmlTmp.push("(モールス)");
  var morse;
  if (!sorce.match(/^[.\-\s]+$/)) {
    var sorce2=
      sorce.replace(/^[.-](.+)[.-]$/, "$1");
    morse=morseExchange(sorce2);
    htmlTmp.push("(morse)");
    htmlTmp.push(morse);
  } else {
    morse=sorce;
    htmlCode(morseExchange(morse));
  }
  var douon=function (str, rep, sorce) {
    var strRE=new RegExp(str, "ig");
    if (sorce.match(strRE)) {
      htmlCode(
        sorce.replace(strRE, rep));}
  }
  
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  var demrs=morseExchange(morse);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(demrs));
  douon("sea", "c", strReverse(demrs));
  douon("see", "c", strReverse(demrs));
  
  htmlTmp.push("(more atbash19)");
  htmlCode(atbash19(demrs));
  douon("sea", "c", atbash19(demrs));
  douon("see", "c", atbash19(demrs));
    
  htmlTmp.push(
    "(more atbash19 & reverse)");
  htmlCode(
    atbash19(strReverse(demrs)));
  douon("sea", "c", atbash19(
    strReverse(demrs)));
  douon("see", "c", atbash19(
    strReverse(demrs)));
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  htmlTmp.push("-----------");
  
  htmlTmp.push("(reverse)");
  var rev=morse.split(
    "").reverse().join("");
  htmlTmp.push(rev);
  htmlTmp.push("(de-morse)");
  var demrs=morseExchange(rev);
  htmlCode(demrs);
  // c, j, zはreverse文字がないので同音で隠されてるかも
  htmlTmp.push(
    "reverse出来ない3文字→ C J Z");
  douon("sea", "c", demrs);
  douon("see", "c", demrs);
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(demrs));
  douon("sea", "c", strReverse(demrs));
  douon("see", "c", strReverse(demrs));
  
  htmlTmp.push("(more atbash19)");
  htmlCode(atbash19(demrs));
  douon("sea", "c", atbash19(demrs));
  douon("see", "c", atbash19(demrs));
    
  htmlTmp.push(
    "(more atbash19 & reverse)");
  htmlCode(
    atbash19(strReverse(demrs)));
  douon("sea", "c", atbash19(
    strReverse(demrs)));
  douon("see", "c", atbash19(
    strReverse(demrs)));
    
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  htmlTmp.push("-----------");

  htmlTmp.push("(swap)");
  var tmp=morse.split("");
  for (var i in tmp) {
    if (tmp[i]=="-") { tmp[i]="."; }
    else if (tmp[i]==".") { tmp[i]="-"; }
  }
  var swap=tmp.join("");
  htmlTmp.push(swap);
  htmlTmp.push("(de-morse)");
  var demrs=morseExchange(swap);
  htmlCode(demrs);
  // c, h, v, zは反転文字がないので同音で隠されてるかも
  htmlTmp.push(
    "swap出来ない4文字→ C H V Z");
  douon("sea", "c", demrs);
  douon("see", "c", demrs);
  
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(demrs));
  douon("sea", "c", strReverse(demrs));
  douon("see", "c", strReverse(demrs));
  
  htmlTmp.push("(more atbash 1<->9)");
  htmlCode(atbash19(demrs));
  douon("sea", "c", atbash19(demrs));
  douon("see", "c", atbash19(demrs));
  
  htmlTmp.push(
    "(more reverse & atbash19)");
  htmlCode(
    strReverse(atbash19(demrs)));
  douon("sea", "c", strReverse(
    atbash19(demrs)));
  douon("see", "c", strReverse(
    atbash19(demrs)));

    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  htmlTmp.push("-----------");
  
  htmlTmp.push("(swap & reverse)");
  var swpRev;
  swpRev=swap.split(
    "").reverse().join("");
  htmlTmp.push(swpRev);
  htmlTmp.push("(de-morse)");
  var demrs=morseExchange(swpRev);
  htmlCode(demrs);
  // b, h, は反転文字がないので同音で隠されてるかも
  htmlTmp.push(
    "swap&reverse出来ない2文字→ B H");
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(demrs));
  htmlTmp.push(
    "(more atbash19)");
  htmlCode(atbash19(demrs));
  htmlTmp.push(
    "(more atbash 1<->9 & reverse)");
  htmlCode(
    strReverse(atbash19(demrs)));
  
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  htmlTmp.push("-----------");
  
  // モールスから短符長符数でdecASCII RLE
  if (morse.match(/\./) 
    && morse.match(/-/)
  ) {
    var morsejoin=
      morse.replace(/[\s]/g, "");
    var tmpL=[];
    if (morsejoin.match(/^\./)) {
      tmpL=morsejoin.match(/\.+-+/g);
    } else if (morsejoin.match(/^-/)) {
      tmpL=morsejoin.match(/-+\.+/g);
    }
    var tmp="";
    var tmp0pad="";
    var counter = function(str,seq){
      return str.split(seq).length - 1;
    }
    if (tmpL[0] && tmpL[0].match(/^-/)) {
      for (var i in tmpL) {
        tmp+=counter(tmpL[i],"-");
        tmp+=counter(tmpL[i],"\.");
        tmp0pad+=("0"+counter(tmpL[i],"-")).slice(-2);
        tmp0pad+=("0"+counter(tmpL[i],"\.")).slice(-2);
     }
    } else if (
      tmpL[0] && tmpL[0].match(/^\./)
    ) {
      for (var i in tmpL) {
        tmp+=counter(tmpL[i],"\.");
        tmp+=counter(tmpL[i],"-");
        tmp0pad+=("0"+counter(tmpL[i],"\.")).slice(-2);
        tmp0pad+=("0"+counter(tmpL[i],"-")).slice(-2);
     }
    }
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(モールスから短符長符数でdecASCII RLE)</b>");
    htmlTmp.push(morse);
    htmlTmp.push(tmp);
    htmlCode(tmp);
    if (tmp!=tmp0pad) {
      htmlTmp.push("---------");
      htmlTmp.push(tmp0pad);
      if (tmp0pad.match(/^([01][0-9]|2[0-5])+$/) {
        htmlTmp.push("<div class='alert'>012abcではないか？</div>");
        htmlTmp.push(tmp0pad.match(/../).join(" "));
      }
      if (tmp0pad.match(/^(0[1-9]|1[0-9]|2[0-6])+$/) {
        htmlTmp.push("<div class='alert'>123abcではないか？</div>");
        htmlTmp.push(tmp0pad.match(/../).join(" "));
      }
      htmlCode(tmp0pad);
    }
    htmlTmp.push("----------------------");
  }
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  
  // モールスから短符数でdecASCII
  var morsejoin=
      morse.replace(/[\s]/g, "");
  if (morsejoin.match(/\./) 
    && morsejoin.match(/-/)
    && morsejoin.match(/\.{4}/)
  ) {
    var tmpL=morsejoin.split(/-/g);
    if (morsejoin.match(/-$/)) tmpL.pop();
    var tmp="";
    for (var i in tmpL) {
      tmp+=tmpL[i].length;
    }
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(モールスから短符数でdecASCII)</b>");
    htmlTmp.push(morse);
    htmlTmp.push(tmp);
    htmlCode(tmp);
    htmlTmp.push("----------------------");
  }
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  
  // モールスから長符数でdecASCII
  var morsejoin=
      morse.replace(/[\s]/g, "");
  if (morsejoin.match(/\./) 
    && morsejoin.match(/-/)
    && morsejoin.match(/-{4}/)
  ) {
    var tmpL=morsejoin.split(/\./g);
    if (morsejoin.match(/\.$/)) tmpL.pop();
    var tmp="";
    for (var i in tmpL) {
      tmp+=tmpL[i].length;
    }
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(モールスから長符数でdecASCII)</b>");
    htmlTmp.push(morse);
    htmlTmp.push(tmp);
    htmlCode(tmp);
    htmlTmp.push("----------------------");
  }
  
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  // バイナリにしてみる
  htmlTmp.push("(バイナリにしてみる)"); 
  var binstr=morse.replace(/\s/g, "");
  binstr=binstr.replace(/\./g, "0");
  binstr=binstr.replace(/-/g, "1");
  htmlTmp.push(binstr);
  goBinary(binstr);
  htmlTmp.push("----------------------");
  
    
// ////////////////////////  
    var d=new Date();
  htmlTmp.push(  
    "<div class='elapsedtime2'>"+ (  
(d.getTime() -startTimeFunc.getTime()) /1000  
     ) + "s</div>"  
  );
// ////////////////////////    
  
  // AAにしてみる
  htmlTmp.push("(AAにしてみる)"); 
  htmlTmp.push(
      "spreadsheetに貼り付けて要確認"); 
  var aa=morse.replace(/\s/g, "");
  aa=aa.replace(/\./g, "＿");
  aa=aa.replace(/-/g, "＠");
  if (aa.length%5==0||aa.length%7==0) {
    if (aa.length%5==0) {
      var wRE=new RegExp(
        "\.{"+aa.length/5+"}", "g");
    } else if (aa.length%7==0) {
      var wRE=new RegExp(
        "\.{"+aa.length/7+"}", "g");
    }
    htmlTmp.push(
      aa.match(wRE).join("\n"));
    htmlTmp.push("(反転)"); 
    aa=aa.replace(/＿/g, "#");
    aa=aa.replace(/＠/g, "＿");
    aa=aa.replace(/#/g, "＠");
    htmlTmp.push(
      aa.match(wRE).join("\n"));
  }
//}
}

// ======================
function goBinary(binstr) {
  if (binstr.match(/[^01]/)) {
    htmlTmp.push(
      "(バイナリにならなかった)"); 
    return;
  }
  var myByte=binstr.length/8;
  var myByteAmari=binstr.length%8;
  htmlTmp.push("<div class='alert'>"+myByte+"byte + "+myByteAmari+"bit</div>"); 

  
  htmlTmp.push(
    "<b>(binBase64)</b>"); 
  htmlCode(base64Enc(binstr, "2"));
  htmlTmp.push(
    "<b>(swap binBase64)</b>"); 
  htmlCode(
    base64Enc(binbash(binstr), "2"));
  htmlTmp.push(
    "<b>(reverse binBase64)</b>"); 
  htmlCode(
    base64Enc(strReverse(binstr), "2"));
  htmlTmp.push(
    "<b>(reverse & swap binBase64)</b>"); 
  htmlCode(base64Enc(
    strReverse(binbash(binstr)), "2"));
    
  htmlTmp.push("-----------------");

  if (binstr.length%8==0) {
    //8ビットで割り切れる
    htmlTmp.push("<a name='binASCII'><b>(binASCII)</b></a>"); 
    var tmp=binASCII(binstr);
    htmlCode(tmp);

    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(tmp));

    htmlTmp.push("(more atbash)");
    htmlCode(atbash19(tmp));

    htmlTmp.push("(reverse binASCII)");
    var tmp=binASCII(
      strReverse(binstr));
    htmlCode(tmp);

    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(tmp));

    htmlTmp.push("(more atbash)");
    htmlCode(atbash19(tmp));

    htmlTmp.push("(binbash binASCII)"); 
    var tmp=binASCII(binbash(binstr));
    htmlCode(tmp);

    htmlTmp.push("(more atbash)");
    htmlCode(atbash19(tmp));

    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(tmp));

    // バイナリをhex->decASCII
    htmlTmp.push("------"); 
    htmlTmp.push(
      "<b>(バイナリをhex->decASCII)</b>"); 
    htmlTmp.push(binstr); 
    htmlTmp.push("(binHex)"); 
    var tmp=binHex(binstr);
    htmlTmp.push(tmp);

    if (tmp.match(/^[\d\s]+$/) && tmp.length>=8) htmlTmp.push(
        "<span class='alertbox'>hexなのに全て数字</span>");       
    tmp=tmp.replace(/\s/g,"");
    if (
      tmp.match(/^\d+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(force decASCII)"); 
      tmp=decASCII(tmp);
      htmlCode(tmp);
    } else {
      htmlTmp.push(
        "(decASCIIできない)"); 
    }
    htmlTmp.push("---"); 
    htmlTmp.push("(0/1を入れ換え)"); 
    htmlTmp.push(binbash(binstr)); 
    htmlTmp.push("(binHex)"); 
    var tmp=binHex(binbash(binstr));
    htmlTmp.push(tmp); 

    if (tmp.match(/^[\d\s]+$/) && tmp.length>=8) htmlTmp.push(
        "<span class='alertbox'>hexなのに全て数字</span>");       
    tmp=tmp.replace(/\s/g,"");
    if (
      tmp.match(/^\d+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(force decASCII)"); 
      var tmp2=decASCII(tmp);
      htmlCode(tmp2);
    } else {
      htmlTmp.push(
        "(decASCIIできない)"); 
    }  
    
    
    // バイナリをhex->012abc
    htmlTmp.push("-----------"); 
    htmlTmp.push(
      "<b>(バイナリをhex->012abc)</b>"); 
    htmlTmp.push(binstr); 
    htmlTmp.push("(binHex)"); 
    var tmp=binHex(binstr);
    htmlTmp.push(tmp);

    if (tmp.match(/^[\d\s]+$/) && tmp.length>=8) htmlTmp.push(
        "<span class='alertbox'>hexなのに全て数字</span>");       
    tmp=tmp.replace(/\s/g,"");
    if (
      tmp.match(/^(([0-1][0-9]|2[0-5])\s?)+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(012abc)"); 
      var tmp2=to012abcString(tmp);
      htmlCode(tmp2);
    } else {
      htmlTmp.push(
        "(012abcできない)"); 
    }
    htmlTmp.push("---"); 
    if (
      tmp.match(/^((0[1-9]|1[0-9]|2[0-5])\s?)+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(123abc)"); 
      var tmp2=to123abcString(tmp);
      htmlCode(tmp2);
    } else {
      htmlTmp.push(
        "(123abcできない)"); 
    }
    
    htmlTmp.push("---"); 
    
    htmlTmp.push("(0/1を入れ換え)"); 
    htmlTmp.push(binbash(binstr)); 
    htmlTmp.push("(binHex)"); 
    var tmp=binHex(binbash(binstr));
    htmlTmp.push(tmp);

    if (tmp.match(/^[\d\s]+$/) && tmp.length>=8) htmlTmp.push(
        "<span class='alertbox'>hexなのに全て数字</span>");       
    tmp=tmp.replace(/\s/g,"");
    if (
      tmp.match(/^(([0-1][0-9]|2[0-5])\s?)+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(012abc)"); 
      var tmp2=to012abcString(tmp);
      htmlCode(tmp2);
    } else {
      htmlTmp.push(
        "(012abcできない)"); 
    }
    htmlTmp.push("---"); 
    if (
      tmp.match(/^((0[1-9]|1[0-9]|2[0-5])\s?)+$/)
      && tmp.length%2==0
    ) {
      htmlTmp.push("(123abc)"); 
      var tmp2=to123abcString(tmp);
      htmlCode(tmp2);
    } else {
      htmlTmp.push(
        "(123abcできない)"); 
    }
   
  }
  
  // 5行からの縦読みmorse
  if (binstr.length%5==0) {
    htmlTmp.push("-----------------");
    htmlTmp.push(
      "<b>(5行からの縦読みmorse)</b>");
    var aaTmp=binstr.replace(/0/g, ".");
    aaTmp=aaTmp.replace(/1/g, "-");
    var aaRE=new RegExp(
      ".{"+aaTmp.length/5+"}", "g");
      
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
      
    var line5morse=aaTmp.match(aaRE);
    line5morse=rectReflect(line5morse);
    for (var i in line5morse) {
      line5morse[i]=
        morseExchange(
          line5morse[i].join(""));
    }
    htmlCode(line5morse.join(""));
    
    htmlTmp.push("(反転)");
    var aaTmp=binstr.replace(/0/g, "-");
    aaTmp=aaTmp.replace(/1/g, ".");
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
    htmlTmp.push("");
    
    var line5morse=aaTmp.match(aaRE);
    line5morse=rectReflect(line5morse);
    for (var i in line5morse) {
      line5morse[i]=
        morseExchange(
          line5morse[i].join(""));
    }
    htmlCode(line5morse.join(""));
  }
  
  // LED7セグ
  if (binstr.length%7==0) {
    htmlTmp.push("-----------------");
    htmlTmp.push(
      "<a name='binASCII'><b>(LED 7seg)</b></a>"); 
    htmlCode(func7segDec(binstr));
    htmlTmp.push("----");
    htmlTmp.push("(swap)"); 
    htmlCode(func7segDec(
      binbash(binstr)));
    htmlTmp.push("(reverse)"); 
    htmlCode(func7segDec(
      strReverse(binstr)));
    htmlTmp.push("(swap & reverse)"); 
    htmlCode(func7segDec(
      binbash(strReverse(binstr))));
  }
  
  // ベーコン
  if (binstr.length%5==0) {
    htmlTmp.push("-----------------");
    htmlTmp.push(
      "<a name='baconian'><b>(baconian)</b></a>"); 
      htmlTmp.push(
      binstr.match(/.{5}/g).join(" "));
    htmlCode(baconian(binstr));
    htmlTmp.push("----");
    htmlTmp.push("(swap)"); 
    htmlCode(baconian(
      binbash(binstr)));
    htmlTmp.push("(reverse)"); 
    htmlCode(baconian(
      strReverse(binstr)));
    htmlTmp.push("(swap & reverse)"); 
    htmlCode(baconian(
      binbash(strReverse(binstr))));
  }
  
  // braille
  if (binstr.length%6==0) {
    htmlTmp.push("<a name='braille'><b>(braille)</b></a>");
    
    // 縦移動型
    htmlTmp.push(
      "<b>(Braille点字3文字ずつ[縦])</b>"); 
    htmlTmp.push(binstr);
    makeRectBrailleTate(binstr);
    var braille=bin2brailleAscii(
      binstr);
    htmlCode(braille);
    
    //reverse
    htmlTmp.push("---");
    htmlTmp.push("(reverse)");
    htmlTmp.push(
      strReverse(binstr));
    makeRectBrailleTate(
      strReverse(binstr));
    var braille=bin2brailleAscii(
      strReverse(binstr));
    htmlCode(braille);
    
    //swap
    htmlTmp.push("---");
    htmlTmp.push("(swap)");
    makeRectBrailleTate(binbash(binstr));
    var braille=bin2brailleAscii(
      binbash(binstr));
    htmlCode(braille);
    
    //swap & reverse
    htmlTmp.push("---");
    htmlTmp.push("(swap & reverse)");
    makeRectBrailleTate(
      binbash(strReverse(binstr)));
    var braille=bin2brailleAscii(
      binbash(strReverse(binstr)));
    htmlCode(braille);
    
    htmlTmp.push("---");
    
    // 縦移動型 折り返しver
    htmlTmp.push(
      "<b>(Braille点字3文字ずつ[縦折り返し])</b>");
    htmlTmp.push(binstr);
    makeRectBrailleTateOri(binstr);
    var braille=bin2brailleAscii(
      binstr, "orikaeshi");
    htmlCode(braille);
    
    //reverse
    htmlTmp.push("---");
    htmlTmp.push("(reverse)");
    htmlTmp.push(
      strReverse(binstr));
    makeRectBrailleTateOri(
      strReverse(binstr));
    var braille=bin2brailleAscii(
      strReverse(binstr), "orikaeshi");
    htmlCode(braille);
    
    //swap
    htmlTmp.push("---");
    htmlTmp.push("(swap)");
    makeRectBrailleTateOri(
      binbash(binstr));
    var braille=bin2brailleAscii(
      binbash(binstr), "orikaeshi");
    htmlCode(braille);
    
    //swap & reverse
    htmlTmp.push("---");
    htmlTmp.push("(swap & reverse)");
    makeRectBrailleTateOri(
      binbash(strReverse(binstr)));
    var braille=bin2brailleAscii(
      binbash(
        strReverse(binstr)), "orikaeshi");
    htmlCode(braille);
    
    htmlTmp.push("---");
    
    // 横移動型
    htmlTmp.push(
      "<b>(Braille点字2文字ずつ[横])</b>");
    htmlTmp.push(binstr);
    makeRectBrailleYoko(binstr);
    var braille=bin2brailleAscii(
      binstr, "switch");
    htmlCode(braille);
    
    htmlTmp.push("---");
    htmlTmp.push("(reverse)");
    makeRectBrailleYoko(
      strReverse(binstr));
    var braille=bin2brailleAscii(
      strReverse(binstr), "switch");
    htmlCode(braille);
    
    htmlTmp.push("---");
    htmlTmp.push("(swap)");
    makeRectBrailleYoko(
      binbash(binstr));
    var braille=bin2brailleAscii(
      binbash(binstr), "switch");
    htmlCode(braille);
    
    htmlTmp.push("---");
    htmlTmp.push("(swap & reverse)");
    makeRectBrailleYoko(
      binbash(strReverse(binstr)));
    var braille=bin2brailleAscii(
      binbash(
        strReverse(binstr)), "switch");
    htmlCode(braille);
    
    // 3行型
    htmlTmp.push("------");
    htmlTmp.push(
      "<b>(3行にしてBraille点字)</b>");
    htmlTmp.push(binstr);
    makeRectBraille3line(binstr);
    var nMod3=binstr.length/3;
    var re=new RegExp(
      "[01]{"+nMod3+"}","g");
    var tmps=binstr.match(re);
    var newText="";
    for (var x=0; x<nMod3; x++) {
      for (var y=0; y<3; y++) {
        newText+=tmps[y][x];
      }
    }
    var braille=bin2brailleAscii(
      newText);
    htmlCode(braille);
    
    //reverse
    htmlTmp.push("---");
    htmlTmp.push("(reverse)");
    htmlTmp.push(
      strReverse(newText));
    makeRectBrailleTate(
      strReverse(newText));
    var braille=bin2brailleAscii(
      strReverse(newText));
    htmlCode(braille);
    
    //swap
    htmlTmp.push("---");
    htmlTmp.push("(swap)");
    makeRectBrailleTate(
      binbash(newText));
    var braille=bin2brailleAscii(
      binbash(newText));
    htmlCode(braille);
    
    //swap & reverse
    htmlTmp.push("---");
    htmlTmp.push("(swap & reverse)");
    makeRectBrailleTate(
      binbash(strReverse(newText)));
    var braille=bin2brailleAscii(
      binbash(strReverse(newText)));
    htmlCode(braille);
    htmlTmp.push("---");
  }
  
  // 5行AA
  if (binstr.length%5==0) {
    htmlTmp.push(
      "<b>(5行になるからAA)</b>"
      +"<div class='AA'>");
    var aaTmp=binstr.replace(/0/g, "ˍ");
    aaTmp=aaTmp.replace(/1/g, "∎");
    var aaRE=new RegExp(
      ".{"+binstr.length/5+"}", "g");
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
    htmlTmp.push("</div>");
    htmlTmp.push(
      "(AA 反転)<div class='AA'>");
    var aaTmp=binstr.replace(/0/g, "∎");
    aaTmp=aaTmp.replace(/1/g, "ˍ");
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
    htmlTmp.push("</div>");
  }
  
  // 7行AA
  if (binstr.length%7==0) {
    htmlTmp.push(
      "<b>(7行になるからAA)</b>"
      +"<div class='AA'>");
    var aaTmp=binstr.replace(/0/g, "ˍ");
    aaTmp=aaTmp.replace(/1/g, "∎");
    var aaRE=new RegExp(
      ".{"+binstr.length/7+"}", "g");
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
    htmlTmp.push("</div>");
    htmlTmp.push(
      "(AA 反転)<div class='AA'>");
    var aaTmp=binstr.replace(/0/g, "∎");
    aaTmp=aaTmp.replace(/1/g, "ˍ");
    htmlTmp.push(
      aaTmp.match(aaRE).join("\n"));
    htmlTmp.push("</div>");
  }
  
  htmlTmp.push("----------------"); 
  htmlTmp.push(binstr); 
  // QRコード & MicroQR
  // 21=441, 25=625, 29=841, 33=1089, 37=1369,,, 177=31329まで
  //21モジュールから4Mずつ増える
  // 1型(21),,,40型(177)まで
  // MicroQRは11から2Mずつ増える
  // 11...17まで
  
  var lengSqrt=Math.sqrt(binstr.length);
  if (
    (lengSqrt-21)%4==0 || 
    (lengSqrt-11)%2==0
  ) {
    htmlTmp.push(binstr);
    htmlTmp.push(
      "<b>(QRコード)</b>");
    var RE=
      new RegExp(".{"+lengSqrt+"}", "g");
    var result="";
    var tmpL=binstr.match(RE);
    function setQR(flag) {
      result+="<div class='QR'>";
      for (var i in tmpL) {
        for (var j in tmpL[i]) {
          if (tmpL[i][j].match(/1/)) {
            if (flag&&flag.match(/^swap$/i)) {
              result+=
                "<span class='shiro'>"
                +tmpL[i][j]+"</span>";
            } else {
              result+=
                "<span class='kuro'>"
                +tmpL[i][j]+"</span>";
            }
          } else if (tmpL[i][j].match(/0/)) {
            if (flag&&flag.match(/^swap$/i)) {
              result+=
                "<span class='kuro'>"
                +tmpL[i][j]+"</span>";
            } else {
              result+=
                "<span class='shiro'>"
                +tmpL[i][j]+"</span>";
            }
          } else {
            result+=
              "<span class='aka'>"
              +tmpL[i][j]+"</span>";
          }
        }
        result+="<br>";
      }
      result+="</div><br>";
    }
    setQR();
    setQR("swap");
    tmpL=rectReflect(tmpL);
    setQR();
    setQR("swap");
    htmlTmp.push(
      binstr.length+"文字は"+
      lengSqrt+"×"+lengSqrt
    );
    htmlTmp.push(result);
    htmlTmp.push("----------------"); 
  }
  
  if (
    (binstr.length-13)%11==0 && 
    binstr.match(
    /^(11010000100|11010010000|11010011100)/) && 
    binstr.match(/1100011101011$/)
  ) {
    htmlTmp.push("<b>(code128)</b>");
    htmlCode(bin2code128(binstr));
    htmlTmp.push("----------------"); 
  }
  
  htmlTmp.push("----------------"); 
  
  if (
    binstr.match(/^(?:([01])\1){10,}$/)&&
    binstr.match(/0/) &&
    binstr.match(/1/) 
  ) {
    //二重になっている
    htmlTmp.push("----------------"); 
    htmlTmp.push("<span class='alertbox'>(二重になっている)</span>"); 
    fixCodeList.push("binが二重");
    htmlCode(binstr);
    var tmp=
      binstr.replace(/([01])\1/g, "$1")
    htmlCode(tmp);
    goBinary(tmp);
  }
  
}

// ======================
function makeRectBrailleTate(binstr) {
  //if (binstr%6!=0) return null;
  htmlTmp.push("<div class='braillebox'>");
  htmlTmp.push("①④⑦"); 
  htmlTmp.push("②⑤⑧"); 
  htmlTmp.push("③⑥⑨"); 
  var rect=binstr.match(/.../g);
  for (var i in rect) {
    rect[i]=rect[i].match(/./g);
  }
  rect=rectReflect(rect);
  htmlTmp.push("6文字ずつbraille点字");
  htmlTmp.push("<div class='braille'>");
  for (var i in rect) {
    htmlTmp.push(
      rect[i].join("").match(
        /../g).join(" ").replace(
          /1/g,"◌").replace(/0/g,"●"));
  }
  htmlTmp.push("</div>");
  htmlTmp.push("</div>");
}

// ======================
function makeRectBrailleTateOri(binstr) {
  //if (binstr%6!=0) return null;
  htmlTmp.push("<div class='braillebox'>");
  htmlTmp.push("①⑥⑦"); 
  htmlTmp.push("②⑤⑧"); 
  htmlTmp.push("③④⑨"); 
  var rect=binstr.match(/.../g);
  for (var i in rect) {
    if (i%2) rect[i]=strReverse(rect[i]);
    rect[i]=rect[i].match(/./g);
  }
  rect=rectReflect(rect);
  htmlTmp.push("6文字ずつbraille点字");
  htmlTmp.push("<div class='braille'>");
  for (var i in rect) {
    htmlTmp.push(
      rect[i].join("").match(
        /../g).join(" ").replace(
          /1/g,"◌").replace(/0/g,"●"));
  }
  htmlTmp.push("</div>");
  htmlTmp.push("</div>");
}

// ======================
function makeRectBrailleYoko(binstr) {
  //if (binstr%6!=0) return null;
  htmlTmp.push("<div class='braillebox'>");
  htmlTmp.push("①②⑦⑧"); 
  htmlTmp.push("③④⑨⓪"); 
  htmlTmp.push("⑤⑥"); 
  var recttmp=binstr.match(/.{6}/g);
  var rect=["","",""];
  for (var i in recttmp) {
    rect[0]+=recttmp[i][0]+recttmp[i][1];
    rect[1]+=recttmp[i][2]+recttmp[i][3];
    rect[2]+=recttmp[i][4]+recttmp[i][5];
  }
  htmlTmp.push("6文字ずつbraille点字");
  htmlTmp.push("<div class='braille'>");
  for (var i in rect) {
    htmlTmp.push(
      rect[i].match(
        /../g).join(" ").replace(
          /1/g,"●").replace(/0/g,"◌"));
  }
  htmlTmp.push("</div>");
  htmlTmp.push("</div>");
}

// ======================
function makeRectBraille3line(binstr) {
  //if (binstr%6!=0) return null;
  htmlTmp.push("<div class='braillebox'>");
  htmlTmp.push("①②③"); 
  htmlTmp.push("④⑤⑥"); 
  htmlTmp.push("⑦⑧⑨"); 
  var n=binstr.length/3;
  var re=new RegExp("[01]{"+n+"}","g");
  var rect=binstr.match(re);
  htmlTmp.push("6文字ずつbraille点字");
  htmlTmp.push("<div class='braille'>");
  for (var i in rect) {
    htmlTmp.push(
      rect[i].match(
        /../g).join(" ").replace(
          /1/g,"●").replace(/0/g,"◌"));
  }
  htmlTmp.push("</div>");
  htmlTmp.push("</div>");
}

// ======================
function keyPosition(str) {
  var tmp="<table id='keylayout' border='1' cellspacing='0' cellpadding='2'><tr><td id='key_!' class='keyOff'>!</td><td id='key_@' class='keyOff'>@</td><td id='key_#' class='keyOff'>#</td><td id='key_$' class='keyOff'>$</td><td id='key_%' class='keyOff'>%</td><td id='key_^' class='keyOff'>^</td><td id='key_&' class='keyOff'>&</td><td id='key_*' class='keyOff'>*</td><td id='key_(' class='keyOff'>(</td><td id='key_)' class='keyOff'>)</td></tr><tr><td id='key_1' class='keyOff'>1</td><td id='key_2' class='keyOff'>2</td><td id='key_3' class='keyOff'>3</td><td id='key_4' class='keyOff'>4</td><td id='key_5' class='keyOff'>5</td><td id='key_6' class='keyOff'>6</td><td id='key_7' class='keyOff'>7</td><td id='key_8' class='keyOff'>8</td><td id='key_9' class='keyOff'>9</td><td id='key_0' class='keyOff'>0</td></tr><tr><td id='key_Q' class='keyOff'>Q</td><td id='key_W' class='keyOff'>W</td><td id='key_E' class='keyOff'>E</td><td id='key_R' class='keyOff'>R</td><td id='key_T' class='keyOff'>T</td><td id='key_Y' class='keyOff'>Y</td><td id='key_U' class='keyOff'>U</td><td id='key_I' class='keyOff'>I</td><td id='key_O' class='keyOff'>O</td><td id='key_P' class='keyOff'>P</td></tr><tr><td id='key_A' class='keyOff'>A</td><td id='key_S' class='keyOff'>S</td><td id='key_D' class='keyOff'>D</td><td id='key_F' class='keyOff'>F</td><td id='key_G' class='keyOff'>G</td><td id='key_H' class='keyOff'>H</td><td id='key_J' class='keyOff'>J</td><td id='key_K' class='keyOff'>K</td><td id='key_L' class='keyOff'>L</td><td id='key_;' class='keyOff'>;</td></tr><tr><td id='key_Z' class='keyOff'>Z</td><td id='key_X' class='keyOff'>X</td><td id='key_C' class='keyOff'>C</td><td id='key_V' class='keyOff'>V</td><td id='key_B' class='keyOff'>B</td><td id='key_N' class='keyOff'>N</td><td id='key_M' class='keyOff'>M</td><td id='key_,' class='keyOff'>,</td><td id='key_.' class='keyOff'>.</td><td id='key_/' class='keyOff'>/</td></tr></table>";
  for (var i in str) {
    var tmpFor=
      str[i].replace(/([.^*$()[\]{}])/g, "\\$1");
    var tmpRE=new RegExp(
      "(<td id='key_"+tmpFor+
      "' class=')keyOff('>"+tmpFor+
      "</td>)", "ig");
    tmp=
      tmp.replace(tmpRE, "$1keyOn$2");
  }
  htmlTmp.push(tmp);
}

// ======================
//奇偶を0/1の数 (Run Length Decoding)
function runLength(str) {
  if (str.match(/^\d+$/)) {
    var tmp=""
    for (var i in str) {
      if (str[i]==0) {
        tmp+=" ";
        continue;
      }
      if (i%2==0) {
        for (var j=1; j<=str[i]; j++) {
          tmp+="0";
        }
      } else {
        for (var j=1; j<=str[i]; j++) {
          tmp+="1";
        }
      }
    }
    htmlTmp.push(str);
    htmlTmp.push("<b>(奇偶を0/1の数 Run Length Decoding)</b>");
    htmlTmp.push(tmp);
    if(tmp.match(/^[01]+$/)) goBinary(tmp);
  }
}

// end Lib_一括func

