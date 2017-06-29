// LIB_過去回答6
// #LIB

// function kakokaitou6() {



// pigpen (freemason)
// https://en.wikipedia.org/wiki/Pigpen_cipher
if (
  TEXT.match(/^(([JULƆOC7nΓ]|[<^>Vv])\.?){4,}$/) && 
  kouseimoji.length>=4
) {

  function pigpen(str) {
    if (!str.match(/^([JULƆOC7nΓ]|[<^>Vv])\.?$/) return null;
    var map={"J":"a","U":"b","L":"c","Ɔ":"d","O":"e","C":"f","7":"g","n":"h","Γ":"i","J.":"j","U.":"k","L.":"l","Ɔ.":"m","O.":"n","C.":"o","7.":"p","n.":"q","Γ.":"r","v":"s","V":"s",">":"t","<":"u","^":"v","v.":"w","V.":"w",">.":"x","<.":"y","^.":"z"};
    if (map[str]) return map[str];
    return null;
  }
  
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(pigpen cipher)</b>");
  var tmps=TEXT.match(/([JULƆOC7nΓ]|[<^>Vv])\.?/g);
  var result=[];
  for (var i in tmps) {
    result.push(pigpen(tmps[i]));
  }
  
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// 3行にわけて奇数偶数をそれぞれ上へ下へ
if (
  kouseimoji.length>=4 && 
  TEXT.length%3==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(3行にわけて奇数偶数をそれぞれ上へ下へ)</b>");
  var tmpRE=new RegExp(".{"+TEXT.length/3+"}", "g");
  var tmp=TEXT.match(tmpRE);
  var result=[];
  var result2=[];
  for (var i in tmp) {
    var tmpL1=[];
    var tmpL2=[];

    for (var j in tmp[i]) {
      var k=i;
      var k2=i;
      if (j%2==0) {
        k=Number(k)+1;
        k2=Number(k2)-1;
      } else {
        k=Number(k)-1;
        k2=Number(k2)+1;
      }
      if (k<0) {
        k=2; 
      } else if (k>2) {
        k=0; 
      }
      if (k2>2) {
        k2=0; 
      } else if (k2<0) {
        k2=2; 
      }
      tmpL1.push(tmp[k][j]);
      tmpL2.push(tmp[k2][j]);
    }
    result[i]=tmpL1.join("");
    result2[i]=tmpL2.join("");
 }
  
  htmlCode(result.join("\n"));
  htmlCode(result2.join("\n"));
  htmlTmp.push("-----------------");
  htmlCode(result.join(""));
  htmlCode(result2.join(""));
  htmlTmp.push("==============");
  
}

// ポケベル打ち
if (
  TEXT.match(/^(([0-9][0-9])[\s\.,\\\|\/:;\-\+]?)+$/) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(ポケベル打ち)</b>");
  htmlCode(pokebellDec(TEXT));
  htmlTmp.push("==============");
}


/*
// 使用文字5種で単独使用文字が1つ。モールスからBase64
// aeueeueuaaeuiiiuiuaeaauaeeeuioiiuiooiuiooouiiiiiueaauiooiuoiiiuaeaaueaaueeueaeuoiiiiuiiiuiooiuiouaeee
if (
  kouseimoji.length==5
) {
  var tmpRE0=new RegExp("("+kouseimoji[0]+")\\1");
  var tmpRE1=new RegExp("("+kouseimoji[1]+")\\1");
  var tmpRE2=new RegExp("("+kouseimoji[2]+")\\1");
  var tmpRE3=new RegExp("("+kouseimoji[3]+")\\1");
  var tmpRE4=new RegExp("("+kouseimoji[4]+")\\1");
  
  var tmpSeparater=[];
  if (!TEXT.match(tmpRE0)) {
    tmpSeparater.push([0,kouseimoji[0]]);
  }
  if (!TEXT.match(tmpRE1)) {
    tmpSeparater.push([1,kouseimoji[1]]);
  }
  if (!TEXT.match(tmpRE2)) {
    tmpSeparater.push([2,kouseimoji[2]]);
  }
  if (!TEXT.match(tmpRE3)) {
    tmpSeparater.push([3,kouseimoji[3]]);
  }
  if (!TEXT.match(tmpRE4)) {
    tmpSeparater.push([4,kouseimoji[4]]);
  }
  
  if (tmpSeparater.length==1) {
    var kouseimojiCopy=
      copyArray(kouseimoji);
    kouseimojiCopy.splice(
      tmpSeparater[0][0],1);
    
    var kC=kouseimojiCopy;
    var tmpRE=new RegExp(
      "^(("+
      "["+kC[0]+"kC[1]"+"]{1,5}"+"|"+
      "["+kC[0]+"kC[2]"+"]{1,5}"+"|"+
      "["+kC[0]+"kC[3]"+"]{1,5}"+"|"+
      "["+kC[1]+"kC[2]"+"]{1,5}"+"|"+
      "["+kC[1]+"kC[3]"+"]{1,5}"+"|"+
      "["+kC[2]+"kC[3]"+"]{1,5}"+
      ") ?){4,}$"
    );
    
    var tmp=
      TEXT.replace(tmpSeparater[0][1],"");
    if (tmp.match(tmpRE)) {
      
      
    }
  }

  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(テンプレ)</b>");
  var tmp=TEXT.replace(/[]/ig, "0");
  var result=[];
  for (var i in tmp) {
    result.push(tmp[i]);
  }
  htmlTmp.push("テンプレ");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/

// 半分で2段に分けて上下読み出し
// 7777755555
if (
  TEXT.length%2==0 
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(半分で2段に分けて上下読み出し)</b>");
  var tmpRE=new RegExp(".{"+TEXT.length/2+"}", "g");
  var tmp=TEXT.match(tmpRE);
  htmlTmp.push(tmp.join("\n"));
  var resultUpLow=[];
  var resultLowUp=[];
  for (var i in tmp[0]) {
    resultUpLow.push(tmp[0][i]);
    resultUpLow.push(tmp[1][i]);
    resultLowUp.push(tmp[1][i]);
    resultLowUp.push(tmp[0][i]);
  }
  htmlCode(resultUpLow.join(""));
  htmlCode(resultLowUp.join(""));
  htmlTmp.push("==============");
}


// キーボードの段でモールス
// ww1qr1%w!q!a#sr1#sq1sw2
if (
  TEXT.match(/^([qwert!@#$%]([asdf1-4]([asd123]([as12][a1]?)?)?)?)+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.length>=8
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(キーボードの段でモールス)</b>");
  htmlTmp.push("[qwert] [!@#$%]が区切り");
  var tmp=TEXT.match(/([qwert!@#$%]([asdf1-4]([asd123]([as12][a1]?)?)?)?)/ig);
  var result=[];
  var tmpA=[];
  for (var i in tmp) {
    result.push([tmp[i]]);
    tmpA.push(
      tmp[i].replace(/[qa]/i, "-").replace(/[ws]/i, "--").replace(/[ed]/i, "---").replace(/[rf]/i, "----").replace(/[tg]/i, "-----").replace(/[!1]/, ".").replace(/[@2]/, "..").replace(/[#3]/, "...").replace(/[$4]/, "....").replace(/[%5]/, "....."));
  }
  htmlTmp.push(result.join(" "));
  htmlTmp.push(tmpA.join(" "));
  goMorse(tmpA.join(" "));
  //htmlCode(result.join("\n"));
  htmlTmp.push("==============");
}

// [aA][1!]でモールス
// BB1AD1%B!A!a#bD1#bA1bB2
if (
  TEXT.match(/^([A-E!@#$%]([a-d1-4]([abc123]([ab12][a1]?)?)?)?)+$/) && 
  kouseimoji.length>=3 && 
  TEXT.length>=8
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>([aA][1!]でモールス)</b>");
  htmlTmp.push("[A-E!@#$%]が区切り(shift)");
  var tmp=TEXT.match(/([A-E!@#$%]([a-d1-4]([abc123]([ab12][a1]?)?)?)?)/g);
  var result=[];
  var tmpA=[];
  for (var i in tmp) {
    result.push([tmp[i]]);
    tmpA.push(
      tmp[i].replace(/[Aa]/, "-").replace(/[Bb]/, "--").replace(/[Cc]/, "---").replace(/[Dd]/, "----").replace(/[Ee]/, "-----").replace(/[!1]/, ".").replace(/[@2]/, "..").replace(/[#3]/, "...").replace(/[$4]/, "....").replace(/[%5]/, "....."));
  }
  htmlTmp.push(result.join(" "));
  htmlTmp.push(tmpA.join(" "));
  goMorse(tmpA.join(" "));
  //htmlCode(result.join("\n"));
  htmlTmp.push("==============");
}


// 3行のうち1行がkw
// ij5riyyxvivvangemi
var kwList=
  keySyougou(TEXT, "", "daily");
if (
  !TEXT.match(/\s/) && 
  TEXT.length>=15 && 
  TEXT.length%3==0 && 
  kouseimoji.length>=3 && 
  kwList[0] && 
  TEXT.length/3==kwList[0].length
) {
  var tmpRE=new RegExp(
    ".{"+TEXT.length/3+"}", "g");
  var tmpL=TEXT.match(tmpRE);
  var tmpF=0;
  var tmpRE=
   new RegExp("^["+kwList[0]+"]+$","i");
  var j=0;
  for (var i in tmpL) {
    j=j+1;
    if (tmpL[i].match(tmpRE)) {
      tmpF=j;
    }
  }
  if (tmpF) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(3行に分けて"+tmpF+"行目がkw'<span style='color: red'>"+kwList[0]+"</span>')</b>");
    htmlTmp.push(tmpL.join("\n"));
    
    // 並び替えてみる
    var tmpRE=
      new RegExp("^"+kwList[0]+"$", "i");
    if (!tmpL[tmpF-1].match(tmpRE)) {
      var tmpKwL=tmpL[tmpF-1].split("");
      var indexL=[];
      var indexL_col="";
      for (var i in kwList[0]) {
        indexL.push(
          tmpKwL.indexOf(kwList[0][i]));
        indexL_col+=
          tmpKwL.indexOf(kwList[0][i])+1;
      }
      
      //並べ替え実行
      function reOrderRect(source, str) {
        if (!str || source.length<2 || source[0].length!=str.length || str.match(/\D/)) {
          return source;
        }
        rsource=rectReflect(source);
        var newRect=[];
        for (var i=0; i<str.length; i=i+1) {
          newRect.push(
            rsource[Number(str[i])]);
        }
        var nsource=rectReflect(newRect);
        for (var i in nsource) {
          nsource[i]=nsource[i].join("");
        }
        return nsource;
      } // end function
      
      var tmpL_new=
      reOrderRect(tmpL, indexL.join(""));
      htmlTmp.push("(kwになるように並び替え)");
      htmlTmp.push("並び順: "+indexL_col);
      htmlCode(tmpL_new.join("\n"));
      htmlTmp.push("連結");
      if (tmpF==1) {
        htmlCode(
          tmpL_new[1]+
          tmpL_new[0]+
          tmpL_new[2]);
        htmlCode(
          tmpL_new[2]+
          tmpL_new[0]+
          tmpL_new[1]);
      } else if (tmpF==2) {
        htmlCode(
          tmpL_new[0]+
          tmpL_new[1]+
          tmpL_new[2]);
        htmlCode(
          tmpL_new[2]+
          tmpL_new[1]+
          tmpL_new[0]);
      } else if (tmpF==3) {
        htmlCode(
          tmpL_new[0]+
          tmpL_new[2]+
          tmpL_new[1]);
        htmlCode(
          tmpL_new[1]+
          tmpL_new[2]+
          tmpL_new[0]);
      }
    }
    htmlTmp.push("==============");
  }
}

// decASCIIの三乗
if (
  TEXT.match(/^((110592|117649|125000|132651|140608|148877|157464|166375|175616|185193|274625|287496|300763|314432|328509|343000|357911|373248|389017|405224|421875|438976|456533|474552|493039|512000|531441|551368|571787|592704|614125|636056|658503|681472|704969|729000)[\s\.,\-\\\//+\|]?)+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(decASCIIの三乗)</b>");
  var tmp=TEXT.match(/110592|117649|125000|132651|140608|148877|157464|166375|175616|185193|274625|287496|300763|314432|328509|343000|357911|373248|389017|405224|421875|438976|456533|474552|493039|512000|531441|551368|571787|592704|614125|636056|658503|681472|704969|729000/g);
  var result=[];
  for (var i in tmp) {
    result.push(Math.cbrt(tmp[i]));
  }
  
  var tmp=result.join("");    
  htmlTmp.push(tmp);
  tmp=decASCII(tmp);
  htmlCode(tmp);
  
  // "aaa##kw###aa"
  // "#aaa#kwa#a#a"
  // "a#a#kwa#aa"
  // "aaaaaaaa#kw#"
  // "kw#aa##aa#"

  if (tmp.match(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i, "$1cube$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i)) {
    
    tmp=tmp.replace(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i, "$1cube$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([a-hjkm-z][0-9][a-hjkm-z][0-9])([a-hjkm-z][0-9][a-hjkm-z]{2})$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z][0-9][a-hjkm-z][0-9])([a-hjkm-z][0-9][a-hjkm-z]{2})$/i, "$1cube$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([a-hjkm-z]{8}[2-9])([2-9])$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z]{8}[2-9])([2-9])$/i, "$1cube$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([2-9][a-hjkm-z][2-9]{2}[a-hjkm-z][2-9])$/i)) {
    
    tmp=tmp.replace(/^([2-9][a-hjkm-z][2-9]{2}[a-hjkm-z][2-9])$/i, "cube$1");
    htmlCode(tmp);

  }
  
  htmlTmp.push("==============");
}

// decASCIIの二乗
if (
  TEXT.match(/^((2304|2401|2500|2601|2704|2809|2916|3025|3136|3249|4225|4356|4489|4624|4761|4900|5041|5184|5329|5476|5625|5776|5929|6084|6241|6400|6561|6724|6889|7056|7225|7396|7569|7744|7921|8100)[\s\.,\-\\\//+\|]?)+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(decASCIIの二乗)</b>");
  var tmp=TEXT.match(/2304|2401|2500|2601|2704|2809|2916|3025|3136|3249|4225|4356|4489|4624|4761|4900|5041|5184|5329|5476|5625|5776|5929|6084|6241|6400|6561|6724|6889|7056|7225|7396|7569|7744|7921|8100/g);
  var result=[];
  for (var i in tmp) {
    result.push(Math.sqrt(tmp[i]));
  }
  
  var tmp=result.join("");    
  htmlTmp.push(tmp);
  tmp=decASCII(tmp);
  htmlCode(tmp);
  
  // "aaa##kw###aa"
  // "#aaa#kwa#a#a"
  // "a#a#kwa#aa"
  // "aaaaaaaa#kw#"
  // "kw#aa##aa#"

  if (tmp.match(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$/i, "$1power$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i)) {
    
    tmp=tmp.replace(/^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i, "$1power$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([a-hjkm-z][0-9][a-hjkm-z][0-9])([a-hjkm-z][0-9][a-hjkm-z]{2})$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z][0-9][a-hjkm-z][0-9])([a-hjkm-z][0-9][a-hjkm-z]{2})$/i, "$1power$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([a-hjkm-z]{8}[2-9])([2-9])$/i)) {
    
    tmp=tmp.replace(/^([a-hjkm-z]{8}[2-9])([2-9])$/i, "$1power$2");
    htmlCode(tmp);
    
  } else if (tmp.match(/^([2-9][a-hjkm-z][2-9]{2}[a-hjkm-z][2-9])$/i)) {
    
    tmp=tmp.replace(/^([2-9][a-hjkm-z][2-9]{2}[a-hjkm-z][2-9])$/i, "power$1");
    htmlCode(tmp);

  }
  
  htmlTmp.push("==============");
}


// 4文字ずつに分けて最初の2文字でソート
if (
  TEXT.match(/^([\d]{2}[0-9a-f]{2}[\s|\\\/\.,\-:]?){3,}$/i) && 
  kouseimoji.length>=4
) {
  
  var tmp=
    TEXT.match(/[\d]{2}[0-9a-f]{2}[\s|\\\/\.,\-:]?/ig);
  var result=[];
  var tmpN=[];
  
  for (var i in tmp) {
    if (tmp[i].length>4) {
      tmp[i]=tmp[i].slice(0,4);
    }
    result.push(
      [
        Number(tmp[i][0]+tmp[i][1]),
        tmp[i][2]+tmp[i][3]
      ]
    );
    tmpN.push(tmp[i][0]+tmp[i][1]);
  }

  result.sort(function(a,b){
    if( a[0] > b[0] ) return 1;
    if( a[0] < b[0] ) return -1;
    return 0;
  });

  var tmpCyofuku=tmpN.filter(
    function (x, i, self) { 
      return self.indexOf(x) === i  && i !== self.lastIndexOf(x);
    }
  );
  
  if (
    (result[result.length-1][0]-
    result[0][0]+1)==result.length && 
    tmpCyofuku
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(4文字ずつに分けて最初の2文字でソート)</b>");
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("ソート");
    for (var i in result) {
      htmlTmp.push(
        result[i][0]+":"+result[i][1]);
    }
    for (var i in result) {
      result[i]=result[i][1];
    }
    htmlCode(result.join(""));
    htmlTmp.push("==============");
  }
}

// 3文字ずつに分けて最初の1文字でソート
if (
  TEXT.match(/^([\d]{1}[0-9a-f]{2}[\s|\\\/\.,\-:]?){3,}$/i) && 
  kouseimoji.length>=4
) {
  
  var tmp=
    TEXT.match(/[\d]{1}[0-9a-f]{2}[\s|\\\/\.,\-:]?/ig);
  var result=[];
  var tmpN=[];
  
  for (var i in tmp) {
    if (tmp[i].length>3) {
      tmp[i]=tmp[i].slice(0,3);
    }
    result.push(
      [
        Number(tmp[i][0]),
        tmp[i][1]+tmp[i][2]
      ]
    );
    tmpN.push(tmp[i][0]);
  }

  result.sort(function(a,b){
    if( a[0] > b[0] ) return 1;
    if( a[0] < b[0] ) return -1;
    return 0;
  });

  var tmpCyofuku=tmpN.filter(
    function (x, i, self) { 
      return self.indexOf(x) === i  && i !== self.lastIndexOf(x);
    }
  );
  
  if (
    (result[result.length-1][0]-
    result[0][0]+1)==result.length && 
    tmpCyofuku
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(3文字ずつに分けて最初の1文字でソート)</b>");
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("ソート");
    for (var i in result) {
      htmlTmp.push(
        result[i][0]+":"+result[i][1]);
    }
    for (var i in result) {
      result[i]=result[i][1];
    }
    htmlCode(result.join(""));
    htmlTmp.push("==============");
  }
}

// 3文字ずつに分けて最初の2文字でソート
if (
  TEXT.match(/^([\d]{2}[\w][\s|\\\/\.,\-:]?){3,}$/i) && 
  kouseimoji.length>=4
) {
  
  var tmp=
    TEXT.match(/[\d]{2}[\w][\s|\\\/\.,\-:]?/ig);
  var result=[];
  var tmpN=[];
  
  for (var i in tmp) {
    if (tmp[i].length>3) {
      tmp[i]=tmp[i].slice(0,3);
    }
    result.push(
      [
        Number(tmp[i][0]+tmp[i][1]),
        tmp[i][2]
      ]
    );
    tmpN.push(tmp[i][0]+tmp[i][1]);
  }

  result.sort(function(a,b){
    if( a[0] > b[0] ) return 1;
    if( a[0] < b[0] ) return -1;
    return 0;
  });

  var tmpCyofuku=tmpN.filter(
    function (x, i, self) { 
      return self.indexOf(x) === i  && i !== self.lastIndexOf(x);
    }
  );
  
  if (
    (result[result.length-1][0]-
    result[0][0]+1)==result.length && 
    tmpCyofuku
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(3文字ずつに分けて最初の2文字でソート)</b>");
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("ソート");
    for (var i in result) {
      htmlTmp.push(
        result[i][0]+":"+result[i][1]);
    }
    for (var i in result) {
      result[i]=result[i][1];
    }
    htmlCode(result.join(""));
    htmlTmp.push("==============");
  }
}


// ペアに分けて前後入れ替え
if (
  TEXT.length%2==0 
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(ペアに分けて前後入れ替え)</b>");
  var tmp=TEXT.replace(/(.)(.)/g, "$2$1");
  htmlCode(tmp);
  htmlTmp.push("==============");
}


// "-区切り/ \"でモールス
if (
  TEXT.match(/\//) && 
  TEXT.match(/\\/) && 
  TEXT.match(/-/) && 
  TEXT.length>=20 //たぶんこのくらい
) {
  var tmp=TEXT.replace(/[^\\\/\-]/g, "");
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>('-区切り/ \\'でモールス)</b>");
  htmlTmp.push(tmp);
  tmp=tmp.replace(/-/g, " ");
  tmp=tmp.replace(/ +/g, " ");
  tmp=tmp.replace(/\//g, ".");
  tmp=tmp.replace(/\\/g, "-");
  var result=morseExchange(tmp);
  htmlCode(result);
  htmlTmp.push("==============");
}


// "_|"で5～7行AA
// おかしい
if (
  TEXT.match(/_\|/) && 
  TEXT.match(/_\|/g).length>20 && 
  !TEXT.match(/_[^|]/) &&
  !TEXT.match(/_$/) &&
  !TEXT.match(/[^_]\|/) && 
  !TEXT.match(/^\|/) && 
  ( TEXT.length%5==0 || TEXT.length%6==0 || TEXT.length%7==0 )
) {
  var len=0;
  htmlTmp.push(TEXT);
  
  if (TEXT.length%5==0) {
    htmlTmp.push("<b>('_|'で5行AA)</b>");
    len=TEXT.length/5;
  } else if (TEXT.length%6==0) {
    htmlTmp.push("<b>('_|'で6行AA)</b>");
    len=TEXT.length/6;
  } else if (TEXT.length%7==0) {
    htmlTmp.push("<b>('_|'で7行AA)</b>");
    len=TEXT.length/7;
}
  var tmpRE=
    new RegExp("(.{"+len+"})", "g");
  var tmp=TEXT.replace(tmpRE, "$1\n");
  tmp=tmp.replace(/[^_\|\n]/g, "&nbsp;");
  tmp=tmp.replace(/\n/g, "<br>\n");
  htmlTmp.push("<div class='AA3'>"+tmp+"</div>");
  htmlTmp.push("==============");
}


// abc012bash
if (
  TEXT.match(/^[a-z0-9]+$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(abc012bash)</b>");
  var tmp=TEXT.match(/([a-z]+|\d+)/ig, "0");
  var result=[];
  for (var i in tmp) {
    if (tmp[i].match(/\d/)) {
      result.push(to012abcString(tmp[i]));
    } else {
      result.push(abc012(tmp[i]));
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// abc123bash
//CBGDGFFDCEF2FIGZ3FIFP5GHCICDCCGA
if (
  TEXT.match(/^[a-z1-9]+$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(abc123bash)</b>");
  var tmp=TEXT.match(/([a-z]+|\d+)/ig, "0");
  var result=[];
  for (var i in tmp) {
    if (tmp[i].match(/\d/)) {
      result.push(to123abcString(tmp[i]));
    } else {
      result.push(toAbc123(tmp[i]));
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// 同じ文字列長の3行を3文字ずつ入れ替え
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length && 
  tmp[0].length%3==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を3文字ずつ入れ替え)</b>");
  
  function threeLine2letterRead(ary) {
    if (ary.length==3 && 
    ary[0].length%3==0) {
      var tmps=[];
      for (var i in ary) {
        tmps[i]=ary[i].match(/.{3}/g);
      }
      var result=["","",""];
      var n0=0;
      var n1=1;
      var n2=2;
      for (var i in tmps[0]) {
        //debug(n0+"\n"+n1+"\n"+n2);
        result[n0]+=tmps[0][i];
        result[n1]+=tmps[1][i];
        result[n2]+=tmps[2][i];
        if (n0>=2) { n0=0; } else { n0++; }
        if (n1>=2) { n1=0; } else { n1++; }
        if (n2>=2) { n2=0; } else { n2++; }
      }
      htmlCode(result[0]);
      htmlCode(result[1]);
      htmlCode(result[2]);
      htmlTmp.push("------------");
    }
  }
  
  var tmpjoin=[tmp[0],tmp[1],tmp[2]];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[0],tmp[2],tmp[1]];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[0],tmp[2]];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[2],tmp[0]];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[0],tmp[1]];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[1],tmp[0]];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
 
  htmlTmp.push("==============");
}


// 同じ文字列長の3行を2文字ずつ入れ替え
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length && 
  tmp[0].length%2==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を2文字ずつ入れ替え)</b>");
  
  function threeLine2letterRead(ary) {
    if (ary.length==3 && 
    ary[0].length%2==0) {
      var tmps=[];
      for (var i in ary) {
        tmps[i]=ary[i].match(/.{2}/g);
      }
      var result=["","",""];
      var n0=0;
      var n1=1;
      var n2=2;
      for (var i in tmps[0]) {
        //debug(n0+"\n"+n1+"\n"+n2);
        result[n0]+=tmps[0][i];
        result[n1]+=tmps[1][i];
        result[n2]+=tmps[2][i];
        if (n0>=2) { n0=0; } else { n0++; }
        if (n1>=2) { n1=0; } else { n1++; }
        if (n2>=2) { n2=0; } else { n2++; }
      }
      htmlCode(result[0]);
      htmlCode(result[1]);
      htmlCode(result[2]);
      htmlTmp.push("------------");
    }
  }
  
  var tmpjoin=[tmp[0],tmp[1],tmp[2]];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[0],tmp[2],tmp[1]];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[0],tmp[2]];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[2],tmp[0]];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[0],tmp[1]];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[1],tmp[0]];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
 
  htmlTmp.push("==============");
}

// 同じ文字列長の3行を1文字ずつ入れ替え
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を1文字ずつ入れ替え)</b>");
  
  function threeLine2letterRead(ary) {
    if (ary.length==3) {
      var tmps=[];
      for (var i in ary) {
        tmps[i]=ary[i].match(/./g);
      }
      var result=["","",""];
      var n0=0;
      var n1=1;
      var n2=2;
      for (var i in tmps[0]) {
        //debug(n0+"\n"+n1+"\n"+n2);
        result[n0]+=tmps[0][i];
        result[n1]+=tmps[1][i];
        result[n2]+=tmps[2][i];
        if (n0>=2) { n0=0; } else { n0++; }
        if (n1>=2) { n1=0; } else { n1++; }
        if (n2>=2) { n2=0; } else { n2++; }
      }
      htmlCode(result[0]);
      htmlCode(result[1]);
      htmlCode(result[2]);
      htmlTmp.push("------------");
    }
  }
  
  var tmpjoin=[tmp[0],tmp[1],tmp[2]];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[0],tmp[2],tmp[1]];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[0],tmp[2]];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[1],tmp[2],tmp[0]];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[0],tmp[1]];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLine2letterRead(tmpjoin);
  
  var tmpjoin=[tmp[2],tmp[1],tmp[0]];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLine2letterRead(tmpjoin);
 
  htmlTmp.push("==============");
}


// テンキーで2種類モールス
if (
  TEXT.match(/^[789]*([1-6]{1,5}[789]){5,}[1-6]{1,5}[789]*$/) && 
  TEXT.match(/^[369]*([147258]{1,5}[369]){5,}[147258]{1,5}[369]*$/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(テンキーで2種類モールス)</b>");
  
  var result=TEXT;
  result=result.replace(/[123]/g, ".");
  result=result.replace(/[456]/g, "-");
  result=result.replace(/[789]/g, " ");
  htmlTmp.push("(123, 456, 789 でモールス)");
  htmlTmp.push(result);
  htmlCode(morseExchange(result));
  
  var result2=TEXT;
  result2=result2.replace(/[147]/g, ".");
  result2=result2.replace(/[258]/g, "-");
  result2=result2.replace(/[369]/g, " ");
  htmlTmp.push("(147, 258, 369 でモールス)");
  htmlTmp.push(result2);
  htmlCode(morseExchange(result2));
  
  htmlTmp.push("==============");
}

/*
// n×ローマ数字+
// 57md2cv2i77mclvi72md2cxcix7m2cl2xix90mdvi75mcl3x3i
// 53nw8xe8r33nxoer38nw8xcxrc3n8xo8crc10nwer35nxo7c7r
if (
  // /([1-9][2-9]md?([2-4]?c)?/
  TEXT.match(/^[4-[mdclxvi]+$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(n×ローマ数字+)</b>");
  var tmp=TEXT.replace(/[]/ig, "0");
  var result=[];
  for (var i in tmp) {
    result.push(tmp[i]);
  }
  htmlTmp.push("テンプレ");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/


/*
// ^プラスvマイナス>イコール
// ^^^^^^^^~vvvvv~^^^^~vvvvvv~^^^^^^~^^~vvvv~vvv~^^^~^~v~>~>~vvv~^^^~^~>~^~>~^^
if (
  TEXT.match(/^{1,9}/i) && 
  TEXT.match(/v{1,9}/i) && 
  (
    (
      TEXT.match(/>/i) && 
      !TEXT.match(/>{2,}/i) && 
      kouseimoji.length=4
    ) || (
      !TEXT.match(/>/i) && 
      kouseimoji.length=3
    )
  )
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(^プラスvマイナス>イコール)</b>");
  var tmp=TEXT.split(/[^\^v>]/ig);
  var result=[];
  var n=0;
  for (var i in tmp) {
    if (tmp[i]) {
      
    result.push(tmp[i]);
  }
  htmlTmp.push("テンプレ");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/


/*
// テンプレ
if (
  TEXT.match(/^[]+$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(テンプレ)</b>");
  var tmp=TEXT.replace(/[]/ig, "0");
  var result=[];
  for (var i in tmp) {
    result.push(tmp[i]);
  }
  htmlTmp.push("テンプレ");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/


// } // end function


var script = document.createElement("script");
script.src = "Lib_一括finish.js";
document.getElementsByTagName("head")[0].appendChild(script);


