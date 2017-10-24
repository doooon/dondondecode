
// LIB_過去回答2
// #LIB

function kakokaitou2() {
  
// Xをゼロにして012abc
if (TEXT.match(/^[X1-9]+$/)
  &&TEXT.match(/X/i)
  &&TEXT.match(/[1-9]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("(Xをゼロにする)");
  var tmp=TEXT.replace(/X/ig, "0");
  htmlCode(tmp);
  htmlTmp.push("--------------");
  htmlTmp.push("(012abc)");
  var tmp012abc=to012abcString(tmp);
  htmlCode(tmp012abc);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp012abc));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp012abc));
  htmlTmp.push(
    "(more atbash&reverse)");
  htmlCode(
    strReverse(atbash19(tmp012abc)));
  htmlTmp.push("--------------");
  htmlTmp.push("(reverse->012abc)");
  var tmp012abc=to012abcString(
    strReverse(tmp));
  htmlCode(tmp012abc);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp012abc));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp012abc));
  htmlTmp.push(
    "(more atbash&reverse)");
  htmlCode(
    strReverse(atbash19(tmp012abc)));
  htmlTmp.push("--------------");
  htmlTmp.push("(atbash->012abc)");
  var tmp012abc=to012abcString(
    atbash19(tmp));
  htmlCode(tmp012abc);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp012abc));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp012abc));
  htmlTmp.push(
    "(more atbash&reverse)");
  htmlCode(
    strReverse(atbash19(tmp012abc)));
  htmlTmp.push("--------------");
  htmlTmp.push(
    "(atbash->reverse->012abc)");
  var tmp012abc=to012abcString(
    strReverse(atbash19(tmp)));
  htmlCode(tmp012abc);
  htmlTmp.push("(more reverse)");
  htmlCode(strReverse(tmp012abc));
  htmlTmp.push("(more atbash)");
  htmlCode(atbash19(tmp012abc));
  htmlTmp.push(
    "(more atbash&reverse)");
  htmlCode(
    strReverse(atbash19(tmp012abc)));
  htmlTmp.push("==============");
}



// 奇遇でバイナリ
if (TEXT.match(/^[0-9]+$/)) {
  var tmp=TEXT.replace(/[02468]/g, "0");
  tmp=tmp.replace(/[13579]/g, "1");
  if (
    tmp.length%8==0 || 
    tmp.length%7==0 || 
    tmp.length%6==0
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(奇遇でバイナリ)</b>");
    htmlTmp.push(tmp);
    goBinary(tmp);
    htmlTmp.push("==============");
  }
}


// アルファベットを0にして012abc
//数字は0が使われていない
if (TEXT.match(/^[a-zA-Z1-9]+$/)
  &&TEXT.match(/[a-z]/)
  &&TEXT.match(/[1-9]/)) {
    
  var tmp=TEXT.replace(
    /[a-zA-Z]/g, "0");
  if (tmp.length%2==0) {
  
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(アルファベットを0にして012abc)</b>");
    htmlTmp.push(
      "(数字は0が使われていない)");
    
    htmlTmp.push(tmp);
    htmlTmp.push("(012abc)");
    htmlCode(to012abcString(tmp));
  
    htmlTmp.push("(reverse > 012abc)");
    var tmpR=strReverse(tmp);
    //htmlTmp.push(tmpR);
    htmlCode(to012abcString(tmpR));
  
    htmlTmp.push("(atbash > 012abc)");
    var tmpA=atbash19(tmp);
    //htmlTmp.push(tmpA);
    htmlCode(to012abcString(tmpA));
  
    htmlTmp.push(
      "(atbash && reverse > 012abc)");
    var tmpAR=strReverse(
      atbash19(tmp));
    //htmlTmp.push(tmpAR);
    htmlCode(to012abcString(tmpAR));
  
    //-----
  
    htmlTmp.push(
    "<b>(アルファベットだけを抜き出し)</b>");
    var tmp=TEXT.match(
      /[a-zA-Z]/g).join("");
    htmlCode(tmp);
  
    htmlTmp.push("(reverse)");
    htmlCode(strReverse(tmp));
    
    htmlTmp.push("(atbash)");
    htmlCode(atbash19(tmp));
  
    htmlTmp.push("(atbash & reverse)");
    htmlCode(
      strReverse(atbash19(tmp)));
  
    htmlTmp.push("==============");
  }
}

// 奇偶でプラスマイナスRot
htmlTmp.push(TEXT);
htmlTmp.push("(奇偶でプラスマイナスRot1)");
function tmpFunc(str) {
  htmlCode(tmp);
  if (tmp.match(/^[\d\s]+$/)) {
    htmlTmp.push("(decASCII)");
    tmp=decASCII(tmp);
    htmlCode(tmp);
  } else if (
    tmp.match(/^([0-1][0-9]|[2][0-5])+$/)) {
    htmlTmp.push("(012abc)");
    htmlCode(to012abcString(tmp));
    tmp=to012abcString(tmp);
    htmlCode(tmp);
  }
  function setKey(str) {
    if (str.match(
      /^\d[a-z]{3}\d[a-z]\d[a-z]\d[a-z]$/i)) {
      htmlTmp.push(
        "(keywordが無いのでwave)");
      htmlCode(
        str.replace(
          /^(\d[a-z]{3}\d)([a-z]\d[a-z]\d[a-z])$/i, "$1wave$2"));
    }
  }
  setKey(tmp);
  setKey(one1full(tmp));
  setKey(one1four(tmp));
  setKey(one1three(tmp));
  setKey(one1two(tmp));
  setKey(one1french(tmp));
}
htmlTmp.push(
  "(奇数Rot-1/偶数Rot+1)");
var tmp="";
for (var i in TEXT) {
  if (i%2==0) {tmp+=rotN(TEXT[i], "-1")}
  else {tmp+=rotN(TEXT[i], "1")}
}
tmpFunc(tmp);
htmlTmp.push("------");
htmlTmp.push(
  "(奇数Rot+1/偶数Rot-1)");
var tmp="";
for (var i in TEXT) {
  if (i%2==0) {tmp+=rotN(TEXT[i], "1")}
  else {tmp+=rotN(TEXT[i], "-1")}
}
tmpFunc(tmp);
htmlTmp.push("==============");

// 数字二文字分を足して012abc
if (
  TEXT.match(/^([0-1][0-9]|[2][0-5])+$/)
  && TEXT.length%4==0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(二文字分を足して012abc)</b>");
  var result=[];
  var tmpList=TEXT.match(/..../g);
  for (var i in tmpList) {
    var tmpPair=tmpList[i].match(/../g);
    tmpPair[0]=parseInt(tmpPair[0], 10);
    tmpPair[1]=parseInt(tmpPair[1], 10);
    result.push(tmpPair[0]+tmpPair[1]);
  }
  htmlTmp.push(result.join(" "));
  htmlCode(
    to012abcString(result.join(" ")));
  
  htmlTmp.push("==============");
}

// symbolからbase64
if (
  TEXT.match(/([4][8-9]|[5][0-7]|[6][5-9]|[7-8][0-9]|[9][0]){2}/)
  && TEXT.match(/[!@#$%\^&*\(\)]{2}/)
  && TEXT.match(/[a-j]{2}/i)) {
    
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(symbol123(大) & 012(小) & abc012(数) > decASCII > base64)</b>");
  var result=[];
  var tmpList=TEXT.match(/([4][8-9]|[5][0-7]|[6][5-9]|[7-8][0-9]|[9][0]|[!@#$%\^&*\(\)]{2}|[a-j]{2})/gi);
  for (var i in tmpList) {
    if (tmpList[i].match(/\d/)) {
      result.push(
        decASCII(
          tmpList[i]
        ).toUpperCase());
    } else if (tmpList[i].match(
      /[!@#$%\^&*\(\)]/)) {
      result.push(
        decASCII(
          symbol2Num(tmpList[i][0])
          +symbol2Num(tmpList[i][1])
          ).toLowerCase());
    } else if (tmpList[i].match(/[a-j]/i)) {
      result.push(
        decASCII(
          letter2Num(tmpList[i][0])
          +letter2Num(tmpList[i][1])));
    }
  }
  htmlTmp.push(result.join(""));
  htmlCode(
    base64Dec(result.join("")));
  
  htmlTmp.push("==============");
}

// 真ん中から左右に読み出し
if (TEXT.length%2!=0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(真ん中から左右に読み出し)</b>");
  var result=[];
  var nCenter=Math.floor(
    TEXT.length/2)+1-1; //-1はindex
  var nMax=TEXT.length-1;
  result.push(TEXT[nCenter]);
  for (var i=1; i<=nCenter; i++) {
    result.push(TEXT[nCenter+i]);
    result.push(TEXT[nCenter-i]);
  }
  htmlCode(result.join(""));
  
  htmlTmp.push("==============");
}


// 奇偶でモールス、12, 34, 56 で大文字小文字数字、base64
if (TEXT.match(/^([0-6]+|[1-7]+|[1-6\s\-\.\,]+)$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>([1-6]奇偶でモールス > 12, 34, 56 で大文字小文字数字 > base64)</b>");
  var tmpL=TEXT.split(/[07\s\-\.\,]/g);
  htmlTmp.push(tmpL.join(" "));
  
  var result=[];
  for (var i in tmpL) {
    var result2="";
    for (var j in tmpL[i]) {
      if (tmpL[i][j].match(/[135]/)) {
        result2+=".";
      } else {
        result2+="-";
      }
    }
    result.push(result2);
  }
  
  var tmpFunc=function (result) {
    htmlTmp.push(result.join(" "));
    var demrs=morseExchange(
      result.join(" "));
    htmlCode(demrs);
  
    var demrs2="";
    
    for (var i in demrs) {
      if (!tmpL[i]) continue;
      if (tmpL[i].match(/[12]/)) {
        demrs2+=demrs[i].toLowerCase();
      } else if (tmpL[i].match(/[34]/)) {
        demrs2+=demrs[i].toUpperCase();
      } else {
        demrs2+=demrs[i];
      }
    }
    htmlCode(demrs2);
    htmlTmp.push("(base64)");
    htmlCode(base64Dec(demrs2));
    // 大文字小文字入れ替え
    demrs2=exchangeUpLow(demrs2);
    htmlCode(demrs2);
    htmlTmp.push("(base64)");
    htmlCode(base64Dec(demrs2));
  }
  
  tmpFunc(result);
  htmlTmp.push("(morse swap)");
  for (var i in result) {
    result[i]=morseSwap(result[i]);
  }
  tmpFunc(result);
 
  htmlTmp.push("==============");
}

// 奇偶を0/1の数->bin
if (TEXT.match(/^\d+$/)) {
  htmlTmp.push(
    "奇偶を0/1の数->bin");
  runLength(TEXT);
  htmlTmp.push("==============");
}

// abc012->奇偶を0/1の数->bin
if (TEXT.match(/[a-z]/i)) {
  htmlTmp.push(
    "abc012->奇偶を0/1の数->bin");
  runLength(letter2Num(TEXT));
  htmlTmp.push("==============");
}

// abc123->奇偶を0/1の数->bin
if (TEXT.match(/[a-z]/i)) {
  htmlTmp.push(
    "abc123->奇偶を0/1の数->bin");
  runLength(toAbc123(TEXT));
  htmlTmp.push("==============");
}

// Glyphの通過点数からdecASCII
function getGlyphPoint(str) {
  var map=[["Human", 5], ["Shaper", 7], ["XM", 5], ["Past", 4], ["Present", 4], ["Now", 4], ["Future", 4], ["Mind", 4], ["Body", 3], ["Soul", 4], ["Enlightenment", 8], ["Resistance", 6], ["Attack", 5], ["War", 5], ["Defend", 5], ["Retreat", 3], ["Civilization", 6], ["Nature", 6], ["Create", 5], ["Clear", 3], ["Destroy", 5], ["All", 6], ["Clear All", 8], ["Open", 3], ["Open All", 10], ["Perfection", 8], ["Balance", 8], ["Imperfect", 6], ["Harmony", 9], ["Peace", 9], ["Harm", 7], ["Again", 6], ["Repeat", 6], ["Have", 4], ["Hide", 5], ["Danger", 4], ["Together", 6], ["Courage", 4], ["Fear", 4], ["Conflict", 6], ["Impure", 5], ["Pure", 5], ["Purity", 5], ["Truth", 7], ["Lie", 6], ["Idea", 9], ["Thought", 9], ["Mind", 9], ["Creativity", 9], ["Journey", 7], ["Chaos", 8], ["Disorder", 8], ["Improve", 4], ["Deteriorate", 4], ["Message", 5], ["Data", 5], ["Breathe", 5], ["Die", 5], ["Equal", 4], ["Not", 3], ["Inside", 3], ["Simple", 2], ["Strong", 4], ["Weak", 4], ["Stability", 4], ["Safety", 4], ["Path", 4], ["Barrier", 4], ["Distance", 3], ["Destination", 3], ["Discover", 4], ["Change", 4], ["Modify", 4], ["Potential", 5], ["Nourish", 5], ["Destiny", 6], ["End", 6], ["Close", 6], ["Finality", 6], ["More", 3], ["Less", 3], ["Gain", 2], ["Lose", 2], ["Forget", 2], ["Ignore", 2], ["Old", 3], ["New", 3], ["Abandon", 6], ["Adapt", 4], ["After", 6], ["Answer", 4], ["Avoid", 5], ["Struggle", 5], ["Before", 6], ["Begin", 4], ["Calibration Grid", 0], ["Grid", 0], ["Capture", 6], ["Complex", 4], ["Consequence", 5], ["Contemplate", 8], ["Contract", 3], ["Reduce", 3], ["Creativity", 3], ["Difficult", 5], ["Easy", 4], ["Enlightened", 9], ["Enlightenment", 9], ["Escape", 5], ["Evolution", 4], ["Success", 4], ["Progress", 4], ["Progression", 4], ["Failure", 4], ["Follow", 4], ["Grow", 3], ["Help", 5], ["I", 4], ["Me", 4], ["Self", 4], ["Interrupt", 8], ["Knowledge", 5], ["Lead", 5], ["Legacy", 9], ["Liberate", 6], ["Live Again", 6], ["Reincarnate", 6], ["Mystery", 6], ["Perspective", 9], ["Presence", 8], ["Pursue", 4], ["Aspiration", 4], ["Pursue", 5], ["Chase", 5], ["Question", 4], ["React", 5], ["Rebel", 6], ["Recharge", 5], ["Resist", 6], ["Resistance", 6], ["Restraint", 6], ["Save", 4], ["Rescue", 4], ["See", 2], ["Seek", 5], ["Search", 5], ["Self", 3], ["Separate", 7], ["Share", 5], ["Unbounded", 11], ["Use", 3], ["Victory", 5], ["Want", 4], ["Desire", 4], ["We", 3], ["Us", 3], ["Worth", 5], ["You", 4], ["Other", 4]];
  map.sort(function(a,b){
    if( a[0].length > b[0].length ) return -1;
    if( a[0].length < b[0].length ) return 1;
      return 0;
  });
  for (var i in map) {
    var repRE=new RegExp(
      map[i][0],"ig");
    str=str.replace(repRE, map[i][1]);
  }
  return str;
}

var gp=getGlyphPoint(TEXT);
if (gp.match(/^[0-9]+$/)) {
    htmlTmp.push(
      checkCodeHTML(TEXT));
    htmlTmp.push(
    "<b>(全てグリフ名だからGlyphの通過点数からdecASCII)</b>");
    htmlTmp.push(gp);
    var tmp=decASCII(gp);
    htmlCode(tmp);
    if (tmp.match(
      /^\d[a-z]{3}\d[a-z]\d[a-z]\d[a-z]$/i)) {
      tmp=tmp.replace(
        /^(\d[a-z]{3}\d)(([a-z]\d){2}[a-z])$/i, 
        "$1Glyph$2");
      htmlCode(tmp);
    }
    htmlTmp.push("(reverse)");
    var tmp=decASCII(strReverse(gp));
    htmlCode(tmp);
    if (tmp.match(
      /^\d[a-z]{3}\d[a-z]\d[a-z]\d[a-z]$/i)) {
      tmp=tmp.replace(
        /^(\d[a-z]{3}\d)(([a-z]\d){2}[a-z])$/i, 
        "$1Glyph$2");
      htmlCode(tmp);
    }
    htmlTmp.push("==============");
}
var gp=getGlyphPoint(
  strReverse(TEXT));
if (gp.match(/^[0-9]+$/)) {
  htmlTmp.push(
    checkCodeHTML(TEXT));
  htmlTmp.push("(reverse)");
  htmlTmp.push(
    checkCodeHTML(
      strReverse(TEXT)));
  htmlTmp.push(
    "<b>(全てグリフ名だからGlyphの通過点数からdecASCII)</b>");
    htmlTmp.push(gp);
    var tmp=decASCII(gp);
    htmlCode(tmp);
    if (tmp.match(
      /^\d[a-z]{3}\d[a-z]\d[a-z]\d[a-z]$/i)) {
      tmp=tmp.replace(
        /^(\d[a-z]{3}\d)(([a-z]\d){2}[a-z])$/i, 
        "$1Glyph$2");
      htmlCode(tmp);
    }
    htmlTmp.push("(reverse)");
    var tmp=decASCII(strReverse(gp));
    htmlCode(tmp);
    if (tmp.match(
      /^\d[a-z]{3}\d[a-z]\d[a-z]\d[a-z]$/i)) {
      tmp=tmp.replace(
        /^(\d[a-z]{3}\d)(([a-z]\d){2}[a-z])$/i, 
        "$1Glyph$2");
      htmlCode(tmp);
    }
    htmlTmp.push("==============");
}

// 真ん中から左右に分けてそれぞれreverse
if (TEXT.length%2!=0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(真ん中から左右に分けてそれぞれreverse)</b>");
  var result=[];
  var nCenter=Math.floor(
    TEXT.length/2)+1-1; //-1はindex
  var tmp1=TEXT.slice(0, nCenter);
  var tmp2=TEXT.slice(nCenter+1);
  
  result.push(strReverse(tmp1));
  result.push(TEXT[nCenter]);
  result.push(strReverse(tmp2));
  htmlCode(result.join(""));
  
  htmlTmp.push("==============");
}

// ペアに分けて1文字目でソート
if (TEXT.length%2==0) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(ペアに分けて1文字目でソート)</b>");
  var tmp=TEXT.match(/../g);
  tmp.sort(function(a,b){
    if( a[0] > b[0] ) return 1;
    if( a[0] < b[0] ) return -1;
      return 0;
  });
  var result=[];
  for (var i in tmp) {
    htmlTmp.push(tmp[i][0]+tmp[i][1]);
    result.push(tmp[i][1]);
  }
  htmlCode(result.join(""));
  
  htmlTmp.push("==============");
}


// 前項の値を交互に足したり引いたり
if (TEXT.match(
  /^-?\d+([\/\.,:;\|])(-?\d+\1)*-?\d+$/
)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(前項の値を交互に足したり引いたり)</b>");
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

// [1-5]と[a-e]で数字モールス
if (TEXT.match(/^[1-5a-e]+$/i)
&&TEXT.match(/[1-5]/)
&&TEXT.match(/[a-e]/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
  "<b>[1-5]>.と[a-e]>-で数字モールス</b>");
  var tmp="";
  for (var i in TEXT) {
    if (TEXT[i].match(/\d/)) {
      for (var j=0; j<Number(TEXT[i]); j++) {
        tmp+=".";
      }
    } else {
      for (
        var j=0; 
        j<=Number(letter2Num(TEXT[i])); 
        j++) {
        tmp+="-";
      }
    }
  }
  tmp=tmp.match(/.{5}/g).join(" ");
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}

// 012abcとbace64の組み合わせ
var tempL=[];
for (var i=0; i<TEXT.length; i++) {
  if (TEXT[i].match(/[a-zA-Z]/)) {
    tempL.push(TEXT[i]);
  } else if (TEXT[i].match(/[3-9]/)) {
    tempL.push(TEXT[i]);
  } else if (
    TEXT[i].match(/[0-2]/)
    && TEXT[i+1]
    && TEXT[i+1].match(/[0-9]/)) {
    tempL.push(TEXT[i]+TEXT[i+1]);
    i++;
  }
}
if (TEXT==tempL.join("")
  && tempL.length%4==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(012abcとbase64の組み合わせ)</b>");
  htmlTmp.push(tempL.join(" "));
  
  var result=[];
  for (var i in tempL) {
    if (tempL[i].match(/\d\d?/)) {
      result.push(
        to012abcString(
          tempL[i]).toUpperCase());
    } else if (tempL[i].match(/[a-z]/)) {
      result.push(tempL[i].toLowerCase());
    } else if (tempL[i].match(/[A-Z]/)) {
      result.push(letter2Num(tempL[i]));
    }
  }
  htmlTmp.push("012ABC abcabc  ABC012");
  htmlCode(result.join(""));
  htmlTmp.push("(base64)");
  htmlCode(base64Dec(result.join("")));
  
  htmlTmp.push("-----------");
  
  var result=[];
  for (var i in tempL) {
    if (tempL[i].match(/\d\d?/)) {
      result.push(
        to012abcString(
          tempL[i]).toLowerCase());
    } else if (tempL[i].match(/[a-z]/)) {
      result.push(tempL[i].toUpperCase());
    } else if (tempL[i].match(/[A-Z]/)) {
      result.push(letter2Num(tempL[i]));
    }
  }
  htmlTmp.push("012abc abcABC  ABC012");
  htmlCode(result.join(""));
  htmlTmp.push("(base64)");
  htmlCode(base64Dec(result.join("")));
  
  htmlTmp.push("-----------");
  
  var result=[];
  for (var i in tempL) {
    if (tempL[i].match(/\d\d?/)) {
      result.push(
        to012abcString(
          tempL[i]).toLowerCase());
    } else if (tempL[i].match(/[a-z]/)) {
      result.push(letter2Num(tempL[i]));
    } else if (tempL[i].match(/[A-Z]/)) {
      result.push(tempL[i].toUpperCase());
    }
  }
  htmlTmp.push("012abc abc012  ABCABC");
  htmlCode(result.join(""));
  htmlTmp.push("(base64)");
  htmlCode(base64Dec(result.join("")));
    
  htmlTmp.push("-----------");
  
  var result=[];
  for (var i in tempL) {
    if (tempL[i].match(/\d\d?/)) {
      result.push(
        to012abcString(
          tempL[i]).toUpperCase());
    } else if (tempL[i].match(/[a-z]/)) {
      result.push(letter2Num(tempL[i]));
    } else if (tempL[i].match(/[A-Z]/)) {
      result.push(tempL[i].toLowerCase());
    }
  }
  htmlTmp.push("012ABC abc012  ABCabc");
  htmlCode(result.join(""));
  htmlTmp.push("(base64)");
  htmlCode(base64Dec(result.join("")));
  
  htmlTmp.push("==============");
}


// 数字、記号、英字でモールス
if (TEXT.match(/^[0-9a-z!@#$%\^&*(\)]+$/i)
&&TEXT.match(/[a-z]/i)
&&TEXT.match(/[!@#$%\^&*(\)]/)
&&TEXT.match(/\d/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
  "<b>数字、記号、英字でモールス</b>");
  htmlTmp.push("数字./記号-/英字sp");
  var tmp="";
  for (var i in TEXT) {
    if (TEXT[i].match(/\d/)) {
      tmp+=".";
    } else if (TEXT[i].match(
      /[!@#$%\^&*(\)]/)) {
      tmp+="-";
    } else if (TEXT[i].match(
      /[a-z]/i)) {
      tmp+=" ";
    }
  }
  htmlTmp.push(tmp);
  goMorse(tmp);
  
  htmlTmp.push("-----------------------");
  
  htmlTmp.push("数字sp/記号-/英字.");
  var tmp="";
  for (var i in TEXT) {
    if (TEXT[i].match(/\d/)) {
      tmp+=" ";
    } else if (TEXT[i].match(
      /[!@#$%\^&*(\)]/)) {
      tmp+="-";
    } else if (TEXT[i].match(
      /[a-z]/i)) {
      tmp+=".";
    }
  }
  htmlTmp.push(tmp);
  goMorse(tmp);
  
  htmlTmp.push("-----------------------");
  
  htmlTmp.push("数字-/記号sp/英字.");
  var tmp="";
  for (var i in TEXT) {
    if (TEXT[i].match(/\d/)) {
      tmp+="-";
    } else if (TEXT[i].match(
      /[!@#$%\^&*(\)]/)) {
      tmp+=" ";
    } else if (TEXT[i].match(
      /[a-z]/i)) {
      tmp+=".";
    }
  }
  htmlTmp.push(tmp);
  goMorse(tmp);
  
  htmlTmp.push("==============");
}


} // end function

