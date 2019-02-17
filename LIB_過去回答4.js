
// LIB_過去回答4
// #LIB

function kakokaitou4() {
  
htmlTmp.push("<div class='red'>--- kako 4 ---</div>");



// QRコード & MicroQR
// 21=441, 25=625, 29=841, 33=1089, 37=1369,,, 177=31329まで
//21モジュールから4Mずつ増える
// 1型(21),,,40型(177)まで
// MicroQRは11から2Mずつ増える
// 11...17まで
var lengSqrt=Math.sqrt(TEXT.length);
if ((lengSqrt-21)%4==0 || (lengSqrt-11)%2==0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(QRコード)</b>");
  var RE=new RegExp(".{"+lengSqrt+"}", "g");
  var result="";
  var tmpL=TEXT.match(RE);
  function setQR() {
  result+="<div class='QR'>";
  for (var i in tmpL) {
    for (var j in tmpL[i]) {
      if (tmpL[i][j].match(/1/)) {
        result+=
          "<span class='shiro'>"
          +tmpL[i][j]+"</span>";
      } else if (tmpL[i][j].match(/0/)) {
        result+=
          "<span class='kuro'>"
          +tmpL[i][j]+"</span>";
      } else {
        result+=
          "<span class='aka'>"
          +tmpL[i][j]+"</span>";
      }
    }
    result+="<br>";
  }
  result+="</div>";
  }
  setQR();
  tmpL=rectReflect(tmpL);
  setQR();
  htmlTmp.push(TEXT.length+"文字は"+lengSqrt+"×"+lengSqrt);
  htmlTmp.push(result);
  htmlTmp.push("==============");
}



  
// 先頭から順にROT0,+1,-1,+2,-2,+3...
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(先頭から順にROT0,+1,-2,+3...)</b>");
  htmlTmp.push("0,+1,-2,+3...");
  var result=[];
  for (var i in TEXT) {
    if (i==0) {
      result.push(TEXT[0]);
    } else if (i%2==0) {
      result.push(rotN(TEXT[i],-i));
    } else {
      result.push(rotN(TEXT[i],i));
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("--------------------");
  htmlTmp.push("0,-1,+2,-3...");
  var result=[];
  for (var i in TEXT) {
    if (i==0) {
      result.push(TEXT[0]);
    } else if (i%2==0) {
      result.push(rotN(TEXT[i],i));
    } else {
      result.push(rotN(TEXT[i],-i));
    }
  }
  htmlCode(result.join(""));
  
  htmlTmp.push("==============");

/*


// 先頭から順にROT0,+1,0,-1,0,+1,0,-1...
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(先頭から順にROT0,+1,0,-1,0,+1...)</b>");
  htmlTmp.push("kwは wave の可能性");
  htmlTmp.push("0,+1,0,-1,0,+1...");
  var result=[];
  for (var i in TEXT) {
    if (i%3==0) {
      result.push(TEXT[i]);
    } else if (i%3==1) {
      result.push(rotN(TEXT[i],1));
    } else if (i%3==2) {
      result.push(rotN(TEXT[i],-1));
    }
  }
  htmlCode(result.join(""));

  htmlTmp.push("--------------------");

  htmlTmp.push("0,-1,0,+1,0,-1...");
  var result=[];
  for (var i in TEXT) {
    if (i%3==0) {
      result.push(TEXT[i]);
    } else if (i%3==1) {
      result.push(rotN(TEXT[i],-1));
    } else if (i%3==2) {
      result.push(rotN(TEXT[i],1));
    }
  htmlCode(result.join(""));
  
  htmlTmp.push("==============");


// 記号123、abc012 > decASCII
//5554%e%7f%%^f5555e^9515b5%5b%5%@f$535e5&f$g(5%%d51%%%f%@55f$%457f$53
if (TEXT.match(
  /^[a-z\d!@#$%\^&*(\)]+$/i)
  //&&TEXT.match(/[!@#$%\^&*(\)]/i)
  //&&TEXT.match(/\d/)
  //&&TEXT.match(/[a-z]/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(記号123、abc012 > decASCII)</b>");
  var tmpL=TEXT.split(/[\/\.,:;\|]/g);
  htmlTmp.push("奇数-/偶数+");
  var result=[];
  for (var i in tmpL) {
    if (i==0) {result.push(tmpL[i])}
    else {
      if (i%2==0) {
        result.push(
          Number(tmpL[i])
          +Number(result[i-1]));
      } else {
        result.push(
          Number(tmpL[i])
          -Number(result[i-1]));
      }
    }
  }
  htmlTmp.push(result.join(" "));
  htmlTmp.push("(012abc)");
  htmlCode(
    to012abcString(result.join(" ")));
  htmlTmp.push("-------");
  htmlTmp.push("奇数+/偶数-");
  var result=[];
  for (var i in tmpL) {
    if (i==0) {result.push(tmpL[i])}
    else {
      if (i%2==0) {
        result.push(
          Number(tmpL[i])
          -Number(result[i-1]));
      } else {
        result.push(
          Number(tmpL[i])
          +Number(result[i-1]));
      }
    }
  }
  htmlTmp.push(result.join(" "));
  htmlTmp.push("(012abc)");
  htmlCode(
    to012abcString(result.join(" ")));
  htmlTmp.push("==============");
}

// モールスから短符/長符で区切って文字列長をASCIIへ
  var morse=morseExchange(TEXT);
  morsejoin=morse.replace(/[\s]/g, "");
  if (morsejoin.match(/^\./)) {
    tmpL=morsejoin.match(/\.+/g);
  } else {
    tmpL=morsejoin.match(/-+/g);
  }
  var tmp=[];
  var maxLength=0;
  for (var i in tmpL) {
    tmp.push(tmpL[i].length);
    if (maxLength<tmpL[i].length) {
      maxLength=tmpL[i].length;
    }
  }
  if (maxLength<=25) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(モールスから短符で区切って文字列長をASCIIへ)</b>");
    htmlTmp.push(morse);
    htmlTmp.push(tmp.join(" "));
    htmlCode(tmp.join(""));
    htmlCode(
      to012abcString(tmp.join(" ")));
    htmlTmp.push("==============");
  }
  

  // 前項の値に足したり引いたり
if (TEXT.match(/^([\/\\]\d+)+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(前項の値に足したり引いたり)</b>");
  var tmpL=TEXT.match(/[\/\\]\d+/g);
  var result=[];
  var resultDisp=[];
  for (var i in tmpL) {
    if (i==0) {
      result.push(
        tmpL[i].match(/\d+/).join(""))
      resultDisp.push(
        tmpL[i].match(/\d+/).join(""))
    } else {
      if (tmpL[i].match(/[\/]/)) {
        result.push(
          Number(result[i-1])
          -Number(
            tmpL[i].match(/\d+/).join("")));
        resultDisp.push(
          "-"+tmpL[i].match(/\d+/).join(""));
      } else if (tmpL[i].match(/[\\]/)) {
        result.push(
          Number(result[i-1])
          +Number(
            tmpL[i].match(/\d+/).join("")));
        resultDisp.push(
          "+"+tmpL[i].match(/\d+/).join(""));
      }
    }
  }
  htmlTmp.push(resultDisp.join(" "));
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("(012abc)");
  htmlCode(
    to012abcString(result.join(" ")));
  htmlTmp.push("==============");
}

// base64表示
var b64out=function (str64) {
    htmlTmp.push(str64);
    htmlCode(base64Dec(str64));
    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(base64Dec(
      str64)));
    htmlTmp.push("(reverse)");
    htmlTmp.push(strReverse(str64));
    htmlCode(
      base64Dec(strReverse(str64)));
    htmlTmp.push("(more reverse)");
    htmlCode(strReverse(base64Dec(
      strReverse(str64))));
}
  // /-\w/を小文字、それ以外を大文字化のちbase64
var tmp=TEXT;
var result="";
for (var i=0; i<tmp.length; i++) {
  if (tmp[i].match(/-|\/|\\|\^/)) {
    i++;
    if (i<tmp.length&&tmp[i].match(/\w/)) {
      result+=tmp[i].toLowerCase();
    }
  } else {
    if (tmp[i].match(/\w/)) {
      result+=tmp[i].toUpperCase();
    }
  }
}

if (
  result.length%4==0
  &&result.match(/[a-z]/)
  &&result.match(/[A-Z]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(/[-/\\\^]\w/を小文字、それ以外を大文字化のちbase64)</b>");
  b64out(result);
  
  htmlTmp.push(
    "<b>(大文字小文字swap)</b>");
  result=exchangeUpLow(result);
  b64out(result);
    
  htmlTmp.push("==============");
}
  // reverseして/[-/\\\^]\w/を小文字、それ以外を大文字化のちbase64
var tmp=strReverse(TEXT);
var result="";
for (var i=0; i<tmp.length; i++) {
  if (tmp[i].match(/-|\/|\\|\^/)) {
    i++;
    if (i<tmp.length&&tmp[i].match(/\w/)) {
      result+=tmp[i].toLowerCase();
    }
  } else {
    if (tmp[i].match(/\w/)) {
      result+=tmp[i].toUpperCase();
    }
  }
}
if (
  result.length%4==0
  &&result.match(/[a-z]/)
  &&result.match(/[A-Z]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(reverseして/-\w/を小文字、それ以外を大文字化のちbase64)</b>");
  b64out(result);
  
  htmlTmp.push(
    "<b>(大文字小文字swap)</b>");
  result=exchangeUpLow(result);
  b64out(result);
  
  htmlTmp.push("==============");
}



// ローマ数字からバイナリへ
if (
  TEXT.match(/^[ixcm0oz]+$/i)
  || TEXT.match(/^[rcxn0]+$/i)
) {
  htmlTmp.push(TEXT);
  var tmp=TEXT.replace(/[0oz]/ig, "0");
  if (TEXT.match(/^[rcxn0]+$/i)) {
    tmp=atbash(tmp);
    htmlTmp.push("(atbash)");
  }
  htmlTmp.push("<b>(ローマ数字からバイナリへ)</b>");
  tmp=tmp.replace(/[i]/ig, "1");
  tmp=tmp.replace(/[x]/ig, "10");
  tmp=tmp.replace(/[c]/ig, "100");
  tmp=tmp.replace(/[m]/ig, "1000");
  htmlTmp.push(tmp);
  goBinary(tmp);
  htmlTmp.push("==============");
}

// 7seg
if (TEXT.match(
  /^(([1-7]|[a-g]){1,7}[\s/\\,.\-|:]*)+$/i
)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(7seg)</b>");
  
  var result=[];
  var tmp=TEXT.split(/[\s/\\,.\-|:]+/ig);
  
  for (var i in tmp) {
    result.push("");
    if (tmp[i].match(/\d/)) {
      for (var j=1; j<=7; j++) {
        var tmpRE=new RegExp(j, "");
        if (tmp[i].match(tmpRE)) {
          result[i]+="1";
        } else {
          result[i]+="0";
        }
      }
    } else {
      var str="abcdefg";
      for (var j in str) {
        var tmpRE=new RegExp(str[j], "i");
        if (tmp[i].match(tmpRE)) {
          result[i]+="1";
        } else {
          result[i]+="0";
        }
      }
    }
  }
  htmlTmp.push(result.join(" "));
  htmlCode(
    func7segDec(result.join(" ")));
  htmlTmp.push("==============");
}


// 素数を掛け合わせてdecASCII
if (TEXT.match(/\d/)) {
var tmpnumL=TEXT.match(/\d+/g);
var prmF=1;
for (var j in tmpnumL) {
  if (!isPrime(Number(tmpnumL[j]))) {
    prmF=0;
  }
}
TEXT=TEXT.replace(/&amp;/ig, "&");
if (
  prmF && TEXT.match(/^[\dmp&]+$/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(素数掛け合わせdecASCII)</b>");
  var tmpL=TEXT.split(/&/g);
  var result="";
  for (var i in tmpL) {
    var tmp=[];
    tmp=tmpL[i].match(/(\d+|[pm])/g);
    var res=0;
    var debug="";
    htmlTmp.push(tmpL[i]);
    for (var j=0; j<tmp.length; j++) {
      if (j==0) {
        if (tmp[j].match(/\d/)) {
          res=Number(tmp[j]);
          debug+=Number(tmp[j]);
        }
      } else if (tmp[j].match(/m/i)) {
        j++;
        res=res*Number(tmp[j]);
        debug+="×"+Number(tmp[j]);
      } else if (tmp[j].match(/p/i)) {
        j++;
        res=Math.pow(res,Number(tmp[j]));
        debug+="^"+Number(tmp[j]);
      }
    }
    tmpL[i]=res;
    htmlTmp.push(debug+"="+res);
  }
  htmlCode(tmpL.join(""));
  htmlTmp.push("==============");
}
}

// xciでモールス
if (TEXT.match(/^([xci]{1,5}[\s|\-/\\.,]*)+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(i>-,c>.,x>--でモールス)</b>");
  var tmp=TEXT;
  tmp=tmp.replace(/(([\s|\-/\\.,])\1*)/ig, " ");
  tmp=tmp.replace(/[i]/ig, "-");
  tmp=tmp.replace(/[x]/ig, "--");
  tmp=tmp.replace(/[c]/ig, ".");
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}


// hexbash > hexASCII > base64
if (
  TEXT.match(/^[0-9a-f]+$/i) || 
  TEXT.match(/^[0-9u-z]+$/i)
) {
  var tmp="";
  if (TEXT.match(/^[0-9u-z]+$/i)) {
    tmp=hexASCII(atbash19(TEXT));
  } else {
    tmp=hexASCII(hexbash(TEXT));
  }
  var tmp64=base64Dec(tmp);
  if (
    tmp64.match(/^\w+$/) 
    && tmp.length%4==0
  ) {
    //if (checkPasscode(tmp64)=="fix") {
      htmlTmp.push(TEXT);
      htmlTmp.push("<span class='alert'><b>(hexbash > hexASCII > base64)</b></span>");
      htmlTmp.push(tmp);
      htmlCode(tmp64);
      htmlTmp.push("=============");
    //}
  }
}

// rect3に分けて1000から引く
if (TEXT.match(/^([89]\d{2})+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(rect3に分けて1000から引く)</b>");
  var tmps=TEXT.match(/([89]\d{2})/g);
  var result=[];
  for (var i in tmps) {
    result.push(1000-Number(tmps[i]));
    htmlTmp.push(
      "-"+tmps[i]+"="+result[i]);
  }
  htmlTmp.push("-------");
  var result2=result.join(" ");
  htmlTmp.push(result2);
  
  htmlTmp.push("(decASCII)");
  result2=decASCII(result2);
  htmlTmp.push(result2);
  
  htmlCode(result2);
  htmlTmp.push("==============");
}


// 数字bash > decASCII
if (
  TEXT.match(/\d/i) && 
  TEXT.match(/^(\d|[^a-z\s])+$/i) && 
  TEXT.match(/[^\w\s]/i)
) {
  var myText=TEXT;
  if (TEXT.match(/^((\d|[^\a-z\s])\d)+$/i)) {
    myText=strReverse(TEXT);
    htmlTmp.push(TEXT);
    htmlTmp.push("(reverse)");
  }
  if (
    myText.match(/^(\d(\d|[^\a-z\s]))+$/i)
  ) {
    htmlTmp.push(myText);
    htmlTmp.push(
      "<b>(数字bash > decASCII)</b>");
    var myText=myText.replace(
      /[^\s\w]/ig, "0");
    htmlTmp.push(
      "(ゼロはatbash出来ないから、\\Dをゼロへ)");
    htmlTmp.push(myText);
    var result=atbash19(myText);
    htmlTmp.push("(atbash)");
    htmlCode(result);
    htmlTmp.push("==============");
  }
}


// asciiDecして奇偶目+-1
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(asciiDecして奇偶目+-1)</b>");
  var ad=
    asciiDec(TEXT.replace(/\s/g, ""));
  var tmps=ad.split(/\s/g);
  
  htmlTmp.push(ad);
  htmlTmp.push("奇数目+1/偶数目-1");
  var result=[];
  for (var i in tmps) {
    if (i%2==0) {
      result.push(Number(tmps[i])+1);
    } else {
      result.push(Number(tmps[i])-1);
    }
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("----------------------");
  
  htmlTmp.push(ad);
  htmlTmp.push("奇数目-1/偶数目+1");
  var result=[];
  for (var i in tmps) {
    if (i%2!=0) {
      result.push(Number(tmps[i])+1);
    } else {
      result.push(Number(tmps[i])-1);
    }
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");


// asciiDecして奇偶値を+-1
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(asciiDecして奇偶値を+-1)</b>");
  var ad=
    asciiDec(TEXT.replace(/\s/g, ""));
  var tmps=ad.split(/\s/g);
  
  htmlTmp.push(ad);
  htmlTmp.push("奇数値+1/偶数値-1");
  var result=[];
  for (var i in tmps) {
    if (tmps[i]%2==0) {
      result.push(Number(tmps[i])+1);
    } else {
      result.push(Number(tmps[i])-1);
    }
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("----------------------");
  
  htmlTmp.push(ad);
  htmlTmp.push("奇数値-1/偶数値+1");
  var result=[];
  for (var i in tmps) {
    if (tmps[i]%2!=0) {
      result.push(Number(tmps[i])+1);
    } else {
      result.push(Number(tmps[i])-1);
    }
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");



// 46656312538742048916777216466568235431100000000001000000000046656387420489
// 0〜9の累乗(0は10)
var map=[
["1","1"],["4","2"],["27","3"],["256","4"],["3125","5"],["46656","6"],["823543","7"],["16777216","8"],["387420489","9"],["10000000000","0"]
];
map.sort(
  function(a,b){
    if( a[0].length > b[0].length ) return -1;
    if( a[0].length < b[0].length ) return 1;
    if( a[0] > b[0] ) return -1;
    if( a[0] < b[0] ) return 1;
    return 0; 
  }
);
var ruiREstr=[];
for (var i in map) {
  ruiREstr.push(map[i][0]);
}
var ruiRE=new RegExp(
  "^("+ruiREstr.join("|")+")+$","g");
if (TEXT.match(ruiRE)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(0〜9の累乗(0は10))</b>");
  var ruiREsep=new RegExp(
  "("+ruiREstr.join("|")+")","g");
  var tmpL=TEXT.match(ruiREsep);
  var result=[];
  for (var i in tmpL) {
    for (var j in map) {
      if (map[j][0]==tmpL[i]) {
        result.push(map[j][1]);
      }
    }
  }
  htmlTmp.push(tmpL.join(" "));
  var resultTmp=[];
  for (var i in result) {
    var q=result[i];
    if (q==0) q=10;
    resultTmp.push(
      q+"^"+q+"="+Math.pow(q,q));
  }
  htmlTmp.push(resultTmp.join("\n"));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}




// 1〜26の二乗
var map=
["1","4","9","16","25","36","49","64","81","100","121","144","169","196","225","256","289","324","361","400","441","484","529","576","625","676"];
map.sort(
  function(a,b){
    if( a.length > b.length ) return -1;
    if( a.length < b.length ) return 1;
    if( a > b ) return -1;
    if( a < b ) return 1;
    return 0; 
  }
);
var ruiRE=new RegExp(
  "("+map.join("|")+")","g");

if (TEXT.match(ruiRE)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(1〜26の二乗)</b>");
  
  var result=TEXT.replace(ruiRE, "[$1]");
  htmlTmp.push(result);
  result=result.replace(/\[(\d+)\]/g, 
    function (match, p1) {
      return "["
        +Math.sqrt(Number(p1))+"]";
    });
    
  var matchList=TEXT.match(ruiRE);
  var resultTmp=[];
  
  for (var i in matchList) {
    resultTmp.push(
      Math.sqrt(matchList[i])
      +"^2="+matchList[i]);
  }
  htmlCode(result);
  result=result.replace(/\[(\d+)\]/g, 
    function (match, p1) {
      return to012abcString(p1);
    }
  );
  htmlCode(result);
  htmlTmp.push(resultTmp.join("\n"));
    htmlTmp.push("==============");
}



// 前後で2行に別ける>後半をreverse>decASCII
if (TEXT.match(/^(..)+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(前後で2行に別ける>後半をreverse>decASCII)</b>");
  var tmpRE=new RegExp(
    ".{"+TEXT.length/2+"}", "g");
  var tmp=TEXT.match(tmpRE);
  tmp[1]=strReverse(tmp[1]);
  htmlTmp.push(tmp[0]);
  htmlTmp.push(tmp[1]);
  var result=[];
  for (var i in tmp[0]) {
    result.push(tmp[0][i]);
    result.push(tmp[1][i]);
  }
  var resultjoin=result.join("");
  if (resultjoin.match(/^[zeontwhfis]+$/)) {
    htmlTmp.push(resultjoin);
    resultjoin=one1two(resultjoin, true);
  }
  htmlCode(resultjoin);
  htmlTmp.push("--------------------");
  htmlTmp.push("<b>(前半をreverse>decASCII)</b>");
  tmp[0]=strReverse(tmp[0]);
  tmp[1]=strReverse(tmp[1]);
  htmlTmp.push(tmp[0]);
  htmlTmp.push(tmp[1]);
  var result=[];
  for (var i in tmp[0]) {
    result.push(tmp[0][i]);
    result.push(tmp[1][i]);
  }
  var resultjoin=result.join("");
  if (resultjoin.match(/^[zeontwhfis]+$/)) {
    htmlTmp.push(resultjoin);
    resultjoin=one1two(resultjoin, true);
  }
  htmlCode(resultjoin);
  htmlTmp.push("==============");
}


// ミラー
var tmpREstrL=TEXT.match(
  /^[a-z]{3}\d{2}\d{3}[a-z]{2}/i);
if (tmpREstrL) {
  var tmpREstr=tmpREstrL[0];
  var tmpRE=new RegExp("^"
      +tmpREstr
      +strReverse(tmpREstr)
      +"$","");
  if (TEXT.match(tmpRE)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(左右対称)</b>");
    var tmp=tmpREstr.replace(
      /^([a-z]{3}\d{2})(\d{3}[a-z]{2})$/i,
      "$1mirror$2"
    );
    htmlCode(tmp);
    htmlTmp.push("==============");
  }
}

// キーボード上symbolからの座標
if (TEXT.match(/^([!@#\$%\^&\*\(\)]+[\s.,\-])*?[!@#\$%\^&\*\(\)]+$/i)) {
  var result=symbol2Num(TEXT);
  if (result.match(/^(?:([0-9])\1*[\s.,\/|\-:])*([0-9])\2*$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(キーボード上symbolからの座標)</b>");
    htmlTmp.push(result);
    result=qwertyXXX(result);
    htmlCode(result);
    result=one1(result);
    if (result.match(
      /[a-z]{3}\d{5}[a-z]{2}/)) {
      result=result.replace(
        /([a-z]{3}\d{2})(\d{3}[a-z]{2})/, 
        "$1symbols$2");
      htmlCode(result);
    }
  }
  
  htmlTmp.push("==============");
}


// ハイフンとハイフンぽいユニコード
// -–—
if (
  TEXT.match(/-/) && 
  TEXT.match(/–/) && 
  TEXT.match(/—/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(ハイフンとハイフンぽいユニコードをスペースに置き換え)</b>");
  var tmp=TEXT.replace(/-/g, " ");
  tmp=tmp.replace(/–/g, "  ");
  tmp=tmp.replace(/—/g, "   ");
  htmlCode(tmp);
  htmlTmp.push("length="+tmp.length);
  
  function htmlentity(L) {
    for (var i in L) {
      L[i]=L[i].replace(/ /g, "&nbsp;");
      L[i]=L[i].replace(/</g, "&lt;");
      L[i]=L[i].replace(/>/g, "&gt;");
    }
    return L;
  }
  
  if (tmp.length%4==0) {
    var tmpRE=
      new RegExp(
        ".{"+tmp.length/4+"}", "g");
    var tmpL=tmp.match(tmpRE);
    tmpL=htmlentity(tmpL);
    htmlTmp.push("<div class='AA2'>");
    htmlTmp.push(tmpL.join("<br>"));
    htmlTmp.push("</div>");
  }
  
  if (tmp.length%5==0) {
    var tmpRE=
      new RegExp(
        ".{"+tmp.length/5+"}", "g");
    var tmpL=tmp.match(tmpRE);
    tmpL=htmlentity(tmpL);
    htmlTmp.push("<div class='AA2'>");
    htmlTmp.push(tmpL.join("<br>"));
    htmlTmp.push("</div>");
  }
  
  if (tmp.length%6==0) {
    var tmpRE=
      new RegExp(
        ".{"+tmp.length/6+"}", "g");
    var tmpL=tmp.match(tmpRE);
    tmpL=htmlentity(tmpL);
    htmlTmp.push("<div class='AA2'>");
    htmlTmp.push(tmpL.join("<br>"));
    htmlTmp.push("</div>");
  }
  
  if (tmp.length%7==0) {
    var tmpRE=
      new RegExp(
        ".{"+tmp.length/7+"}", "g");
    var tmpL=tmp.match(tmpRE);
    tmpL=htmlentity(tmpL);
    htmlTmp.push("<div class='AA2'>");
    htmlTmp.push(tmpL.join("<br>"));
    htmlTmp.push("</div>");
  }
  htmlTmp.push("==============");
}


// Symbolを使ったBase64
if (
  TEXT.match(/^[\w!@#$%^&*(\)]+$/) &&
  TEXT.match(/([!@#$%^&*(\)])(\1*)/)
) {
 if (!TEXT.match(/[A-Z]/)) {
   var tmp=TEXT.replace(
     /([!@#$%^&*(\)])(\1*)/g, 
     function (all) {
       var a=symbol2Num(all); 
       return qwertyXXX(a).toUpperCase();
     }
   );
 } else if (!TEXT.match(/[a-z]/)) {
   var tmp=TEXT.replace(
     /([!@#$%^&*(\)])(\1*)/g, 
     function (all) {
       var a=symbol2Num(all); 
       return qwertyXXX(a).toLowerCase();
     }
   );
 }
 
 if (
   tmp.length%4==0 && 
   !TEXT.match(/[!@#$%^&*(\)]/)
 ) {
   htmlTmp.push(TEXT);
   htmlTmp.push("<b>(Symbolを使ったBase64 qwertyXXX)</b>");
   var result=base64Dec(tmp);
   htmlCode(result);
   htmlTmp.push("==============");
 }
}


// 数字、アルファベット、記号でモールス
if (
  TEXT.match(/[a-z]/i) && 
  TEXT.match(/[0-9]/) && 
  TEXT.match(
    /[;:\.,\-\?\+=\|'"<>\/\\_!@#$%^&*(\){\}[\]]/)
) {
  var tmp=TEXT;
  tmp=tmp.replace(
    /[;:\.,\-\?\+=\|'"<>\/\\_!@#$%^&*(\){\}[\]]/g, " ");
  tmp=tmp.replace(/[a-z]/ig, ".");
  tmp=tmp.replace(/[0-9]/g, "-");
  
  var tmpRE=new RegExp(
    "^([.\\-]{1,5}\\s)*[.\\-]{1,5}$", "");
    
  if (tmp.match(tmpRE)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(数字、アルファベット、記号でモールス)</b>");
    htmlTmp.push(tmp);
    var result=morseExchange(tmp);
    htmlCode(result);
    
    htmlTmp.push("--------");
    tmp=morseSwap(tmp);
    htmlTmp.push(tmp);
    var result=morseExchange(tmp);
    htmlCode(result);
    htmlTmp.push("==============");
  }
}


// キーボードの1部を使ってテンキー
if (TEXT.match(/^[123QWEASDX]+$/i))  {
  var tmp=TEXT;
  tmp=tmp.replace(/1/g, "7");
  tmp=tmp.replace(/2/g, "8");
  tmp=tmp.replace(/3/g, "9");
  tmp=tmp.replace(/Q/ig, "4");
  tmp=tmp.replace(/W/ig, "5");
  tmp=tmp.replace(/E/ig, "6");
  tmp=tmp.replace(/A/ig, "1");
  tmp=tmp.replace(/S/ig, "2");
  tmp=tmp.replace(/D/ig, "3");
  tmp=tmp.replace(/X/ig, "0");
  htmlTmp.push(TEXT);
  htmlTmp.push("キーボードの1部を使ってテンキー");
  htmlCode(tmp);
  htmlTmp.push("==============");
}


// 真ん中で分割してそれぞれreverse
if (TEXT.length%2==0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(真ん中で分割してそれぞれreverse)</b>");
  var tmpRE=new RegExp(
      "(.|\\s){"+TEXT.length/2+"}", "g");
  var tmp=TEXT.match(tmpRE);
  var result=strReverse(tmp[0])+strReverse(tmp[1]);
  htmlCode(result);
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("==============");
}


// 真ん中で分割して前後入れ替え
if (TEXT.length%2==0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(真ん中で分割して前後入れ替え)</b>");
  var tmpRE=
    new RegExp(
      "(.|\\s){"+TEXT.length/2+"}", "g");
  var tmp=TEXT.match(tmpRE);
  var result=tmp[1]+tmp[0];
  htmlCode(result);
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(result));
  htmlTmp.push("==============");
}

// dec Base64enc
if (TEXT.match(/^(\d+\s)*\d+$/)) {
  var tmp64=base64Enc(
    TEXT.replace(/\s/g,""), '10');
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(dec Base64 Encode)</b>");
  htmlCode(tmp64);
  htmlTmp.push("==============");
}

// Hex Base64enc
if (TEXT.match(/^([\da-f]+\s)*[\da-f]+$/i)){
  var tmp64=base64Enc(
    TEXT.replace(/\s/g,""), '16');
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(hex Base64 Encode)</b>");
  htmlCode(tmp64);
  htmlTmp.push("----------------");
  var tmp=TEXT.replace(/\s/g,"");
  tmp=tmp.replace(/(.)(.)/g, "$2$1")
  var tmp64=base64Enc(tmp, '16');
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(hex col swap)</b>");
  htmlTmp.push(tmp);
  htmlTmp.push(
    "<b>(hex Base64 Encode)</b>");
  htmlCode(tmp64);
  htmlTmp.push("==============");
}

// Oct Base64enc
if (TEXT.match(/^([01234567]+\s)*[01234567]+$/i)){
  var tmp64=base64Enc(
    TEXT.replace(/\s/g,""), '8');
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(oct Base64 Encode)</b>");
  htmlCode(tmp64);
  htmlTmp.push("==============");
}

// Bin Base64enc
if (TEXT.match(/^([01]+\s)*[01]+$/i)){
  var tmp64=base64Enc(
    TEXT.replace(/\s/g,""), '2');
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(bin Base64 Encode)</b>");
  htmlCode(tmp64);
  htmlTmp.push("==============");
}

// reverse (atbash) > num >rect3
if (TEXT.match(/^[a-z]+$/i)) {
  
  function tmpRect(str) {
    var tmpKW=keySyougou(str);
    tmpKW.sort(function(a,b){
      if( a.length > b.length ) return -1;
      if( a.length < b.length ) return 1;
      return 0; 
    });
  
    if (
      tmpKW[0] && 
      tmpKW[0].length>=2
    ) {
      htmlTmp.push(
        "推定キーワード"+
        "<div class='alertbox'>"+
        tmpKW[0]+"</div>");
    }
    var result=
      str.replace(/(.)(.)(.)/g, "$3$2$1");
    htmlCode(result);
    htmlTmp.push("==============");
  }
  
  var tmp=strReverse(TEXT);
  tmp=one1two(tmp);
  if (
    tmp.match(/\d/g) && 
    tmp.match(/\d/g).length==5
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(reverse > num >rect3)</b>");
    htmlCode(tmp);
    tmpRect(tmp);
  }
  
  var tmp=atbash(TEXT);
  tmp=one1two(tmp);
  if (
    tmp.match(/\d/g) && 
    tmp.match(/\d/g).length==5
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(atbash > num >rect3)</b>");
    htmlCode(atbash(TEXT));
    htmlCode(tmp);
    tmpRect(tmp);
  }
  
  var tmp=atbash(strReverse(TEXT));
  tmp=one1two(tmp);
  if (
    tmp.match(/\d/g) && 
    tmp.match(/\d/g).length==5
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(reverse atbash > num >rect3)</b>");
    htmlCode(atbash(strReverse(TEXT)));
    htmlCode(tmp);
    tmpRect(tmp);
  }
}

// キーボードモールス
if (TEXT.match(
  /^([qwertyasdfg]{1,5}[\s.,\/|\\\-:+])*[qwertyasdfg]{1,5}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(キーボードモールス)</b>");
  htmlTmp.push("qwertyの段とasdfgの段");
  var tmp=TEXT.replace(
    /[\s.,\/|\\\-:+]/ig, " ");
  tmp=tmp.replace(/Q/ig, ".");
  tmp=tmp.replace(/W/ig, "..");
  tmp=tmp.replace(/E/ig, "...");
  tmp=tmp.replace(/R/ig, "....");
  tmp=tmp.replace(/T/ig, ".....");
  tmp=tmp.replace(/A/ig, "-");
  tmp=tmp.replace(/S/ig, "--");
  tmp=tmp.replace(/D/ig, "---");
  tmp=tmp.replace(/F/ig, "----");
  tmp=tmp.replace(/G/ig, "-----");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlCode(result);
  htmlTmp.push("==============");
}

// A(1) E(5) J(10) ローマ数字
if (TEXT.match(
  /^([aej]{0,4}[\s.,\/|\\\-:+])*[aej]{0,4}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(A(1) E(5) J(10) ローマ数字)</b>");
  htmlTmp.push("(abc123)");
  var tmp=TEXT.split(
    /[\s.,\/|\\\-:+]/ig);
  for (var i in tmp) {
    tmp[i]=tmp[i].replace(/a/ig, "i");
    tmp[i]=tmp[i].replace(/e/ig, "v");
    tmp[i]=tmp[i].replace(/j/ig, "x");
  }
  htmlTmp.push("<div class='alertbox'>"+tmp.join(" ")+"</div>");
  
  htmlCode(tmp.join(" "));
  htmlTmp.push("==============");
}

// iを1にしたabc012
if (TEXT.match(/^[a-j12]+$/i)) {
  var tmp=TEXT;
  tmp=tmp.replace(/1/ig,"i");
  tmp=tmp.replace(/2/ig,"ii");
  if (tmp.length%2==0) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(iを1にしたabc012)</b>");
    htmlTmp.push(tmp);
    tmp=letter2Num(tmp);
    htmlCode(tmp);
    htmlTmp.push("==============");
  }
}


// 構成文字3種でモールス
if (kouseimoji.length==3) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(構成文字3種でモールス)</b>");
  //for (var i in kouseimoji) {
  //  kouseimoji[i]=
  //    kouseimoji[i].replace(/\]/, "\\$&");
  //}
  var tmpRE0=
    new RegExp("\\"+kouseimoji[0],"ig");
  var tmpRE1=
    new RegExp("\\"+kouseimoji[1],"ig");
  var tmpRE2=
    new RegExp("\\"+kouseimoji[2],"ig");
    
  var tmp=TEXT.replace(tmpRE0, " ");
  tmp=tmp.replace(tmpRE1, ".");
  tmp=tmp.replace(tmpRE2, "-");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlTmp.push("==============");
  
  var tmp=TEXT.replace(tmpRE0, " ");
  tmp=tmp.replace(tmpRE1, "-");
  tmp=tmp.replace(tmpRE2, ".");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlTmp.push("==============");
  
  var tmp=TEXT.replace(tmpRE1, " ");
  tmp=tmp.replace(tmpRE2, ".");
  tmp=tmp.replace(tmpRE0, "-");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlTmp.push("==============");
  
  var tmp=TEXT.replace(tmpRE1, " ");
  tmp=tmp.replace(tmpRE2, "-");
  tmp=tmp.replace(tmpRE0, ".");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlTmp.push("==============");
  
  var tmp=TEXT.replace(tmpRE2, " ");
  tmp=tmp.replace(tmpRE0, ".");
  tmp=tmp.replace(tmpRE1, "-");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  htmlTmp.push("==============");
  
  var tmp=TEXT.replace(tmpRE2, " ");
  tmp=tmp.replace(tmpRE0, "-");
  tmp=tmp.replace(tmpRE1, ".");
  htmlTmp.push(tmp);
  var result=goMorse(tmp);
  
  htmlTmp.push("==============");
}

*/

} // end function
