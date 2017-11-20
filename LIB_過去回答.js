
// LIB_過去回答

function kakokaitou() {
  
  // Color Codeの0-7(oct)に対応
  if (TEXT.match(/^[BRGYIMCW]+$/i)) {
    htmlTmp.push("/^[BRGYIMCW]+$/i");
    htmlTmp.push("BRGYIMCWをANSI Color Codeの順に0-7(oct)に対応");
    
    // B = Black =  0
    // R = Red =  1
    // G = Green =  2
    // Y = Yellow =  3
    // I = Blue =  4
    // M = Magenta =  5
    // C = Cyan =  6
    // W = White =  7
    
    var str=TEXT;
    str=str.replace(/B/ig, "0");
    str=str.replace(/R/ig, "1");
    str=str.replace(/G/ig, "2");
    str=str.replace(/Y/ig, "3");
    str=str.replace(/I/ig, "4");
    str=str.replace(/M/ig, "5");
    str=str.replace(/C/ig, "6");
    str=str.replace(/W/ig, "7");
    
    // 8進数だと60〜172
    if (str.match(/^[^01]/)) {
      str=strReverse(str);
    }
    
    str=octASCII(str);
    
    htmlCode(str);
    htmlCode(strReverse(str));
    htmlCode(atbash19(str));
    htmlCode(atbash19(strReverse(str)));
    
    htmlTmp.push("=============");
  }
  
  
// 数字を足してDecASCII
if (TEXT.match(/\d[\s.\-,=+|]\d/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("区切り間の数を全て足す"); 
  var list=TEXT.split(/[\s.\-,=+|]/g);
  for (var i in list) {
    var tmp2=0;
    for (var j in list[i]) {
      tmp2=tmp2+Number(list[i][j]);
    }
    list[i]=tmp2;
  }
  var tmp=list.join(" ");
  htmlTmp.push(tmp);
  
  htmlTmp.push("(DecASCII)");
  htmlCode(decASCII(tmp));
  
  htmlTmp.push("(012abc)");
  htmlCode(to012abcString(tmp));
  htmlTmp.push("===============");
}

// 数字>>decASCII>>morse
if (TEXT.match(/^\d+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "reverse>DecASCII>"
    +"morse>reverse>demorse"); 

  var tmp=morseExchange(
    strReverse(
      morseExchange(
        decASCII(
          strReverse(TEXT)))));
  
  htmlCode(tmp);
  htmlTmp.push("===============");
}


// =================
//ASCIIの一桁目を+1、二桁目を-1
if (TEXT.match(/^\d+$/)
  && TEXT.length%2==0) {
  htmlTmp.push(TEXT); 
  htmlTmp.push("(odd+, even-) >DecASCII"); 
  var tmp="";
  for (var i in TEXT) {
    if (i%2==0) { 
      tmp+=rotN(TEXT[i],-1);
    } else if (i%2==1) { 
      tmp+=rotN(TEXT[i], 1);
    }
  }
  htmlTmp.push(tmp);
  htmlCode(decASCII(tmp));
  
  htmlTmp.push("(odd-, even+) >DecASCII"); 
  var tmp="";
  for (var i in TEXT) {
    if (i%2==0) { 
      tmp+=rotN(TEXT[i],1);
    } else if (i%2==1) { 
      tmp+=rotN(TEXT[i], -1);
    }
  }
  htmlTmp.push(tmp);
  htmlCode(decASCII(tmp));
  htmlTmp.push("===============");
}


// =================

//記号でモールス
if (TEXT.match(
  /^([!@#$%\^&*()]{1,5}[\s|/\\\-.,:~]*)+$/i)
) {
  var tmp=TEXT.match(
    /[!@#$%\^&*()]+/g);
  var map={"!":".","@":"..","#":"...","$":"....","%":".....","^":"-","&":"--","*":"---","(":"----",")":"-----"};
  var res="";
  for (var i in tmp) {
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  if (!res.match(/(.)\1{5}/)) {
    htmlTmp.push("<b>(記号でモールス)</b>"); 
    htmlTmp.push(TEXT); 
    htmlTmp.push("(!>. @>.. #>... $>.... %>..... ^>- &>-- *>--- (>---- )>-----) >de-morse"); 
    htmlCode(res);
    goMorse(res);
    htmlTmp.push("==============");
  }
}

//記号でモールス1〜4, 5〜8
if (TEXT.match(/^([!@#$%^&*()]{1,4}[\s|/\\\-.,:~]*)+$/i)) {
  var tmp=TEXT.match(/[!@#$%^&*()]+/g);
  var map={"!":".","@":"..","#":"...","$":"....","%":"-","^":"--","&":"---","*":"----"};
  var res="";
  for (var i in tmp) {
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  if (!res.match(/(.)\1{4}/)) {
    htmlTmp.push("<b>(記号でモールス)</b> 1〜4, 5〜8"); 
    htmlTmp.push(TEXT); 
    htmlTmp.push("(!>. @>.. #>... $>.... %>- ^>-- &>--- *>----) >de-morse"); 
    htmlCode(res);
    goMorse(res);
    htmlTmp.push("==============");
  }
}


//数字でモールス
if (TEXT.match(/^([1234567890]{1,5}[\s|/\\\-.,:~]*)+$/i)) {
  
  var tmp=TEXT.match(/\d+/g);
  var map={"1":".","2":"..","3":"...","4":"....","5":".....","6":"-","7":"--","8":"---","9":"----","0":"-----"};
  var res="";
  for (var i in tmp) {
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  if (!res.match(/(.)\1{5}/)) {
    htmlTmp.push("<b>(数字でモールス)</b>"); 
    htmlTmp.push(TEXT); 
    htmlTmp.push("(1->. 2->.. 3->... 4->.... 5->..... 6->- 7->-- 8->--- 9->---- 0->-----) >de-morse"); 
    htmlCode(res);
    goMorse(res);
    htmlTmp.push("==============");
  }
}

//数字でモールス1〜4, 5〜8
if (TEXT.match(/^([12345678]{1,4}[\s|/\\\-.,:~]*)+$/i)) {
  
  var tmp=TEXT.match(/\d+/g);
  var map={"1":".","2":"..","3":"...","4":"....","5":"-","6":"--","7":"---","8":"----"};
  var res="";
  for (var i in tmp) {
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  if (!res.match(/(.)\1{4}/)) {
    htmlTmp.push("<b>(数字でモールス)</b> 1〜4, 5〜8"); 
    htmlTmp.push(TEXT); 
    htmlTmp.push("(1->. 2->.. 3->... 4->.... 5->- 6->-- 7->--- 8->----) >de-morse"); 
    htmlCode(res);
    goMorse(res);
    htmlTmp.push("==============");
  }
}


//qwerty上段文字列でモールス
if (TEXT.match(/^[qwertyuiop]+$/i)) {
  htmlTmp.push("qwerty上段のみ"); 
  htmlTmp.push(TEXT); 
  htmlTmp.push("(q->. w->.. e->... r->.... t->..... y->- u->-- i->--- o->---- p->-----) >de-morse"); 
  var tmp=TEXT.match(/[A-Z][a-z]*/g);
  var map={"q":".","w":"..","e":"...","r":"....","t":".....","y":"-","u":"--","i":"---","o":"----","p":"-----"};
  var res="";
  for (var i in tmp) {
    tmp[i]=tmp[i].toLowerCase();
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  htmlCode(res);
  goMorse(res);

  htmlTmp.push("===============");
}

// =================
//abcdとefghとiでモールス
if (TEXT.match(/^[abcdefghi]+$/i)) {
  htmlTmp.push("i区切りabcdとefghモールス"); 
  htmlTmp.push(TEXT); 
  htmlTmp.push("(a->. b->.. c->... d->.... e->- f->-- g->--- h->----) >de-morse"); 
  var tmp=TEXT.split(/i/ig);
  var map={"a":".","b":"..","c":"...","d":"....","e":"-","f":"--","g":"---","h":"----"};
  var res="";
  for (var i in tmp) {
    tmp[i]=tmp[i].toLowerCase();
    for (var j in tmp[i]) {
      res+=map[tmp[i][j]];
      //htmlTmp.push(
        //tmp[i][j]+"="+map[tmp[i][j]]);
    }
    res+=" ";
  }
  
  htmlCode(res);
  goMorse(res);
  
  htmlTmp.push("===============");
}

// 12-34-56でモールス
if (TEXT.match(/^[1-6]+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(12 34 56 >> morse)</b>");
  htmlTmp.push("12./34-/56sp");
  var tmp=TEXT.replace(/[12]/g, ".");
  tmp=tmp.replace(/[34]/g, "-");
  tmp=tmp.replace(/[56]/g, " ");
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("-----------------------");
  
  htmlTmp.push("12sp/34-/56.");
  var tmp=TEXT.replace(/[12]/g, " ");
  tmp=tmp.replace(/[34]/g, "-");
  tmp=tmp.replace(/[56]/g, ".");
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("-----------------------");
  
  htmlTmp.push("12./34sp/56-");
  var tmp=TEXT.replace(/[12]/g, ".");
  tmp=tmp.replace(/[34]/g, " ");
  tmp=tmp.replace(/[56]/g, "-");
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}


// 123, 456, 789 (テンキー横)でモールス
if (TEXT.match(/^[789]*([123456]{1,5}[789]){5,}[123456]{1,5}[789]*$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(123, 456, 789 (テンキー横)でモールス)</b>");
  
  var result=TEXT;
  result=result.replace(/[123]/g, ".");
  result=result.replace(/[456]/g, "-");
  result=result.replace(/[789]/g, " ");

  htmlTmp.push(result);
  var tmp=morseExchange(result);
  htmlCode(tmp);
  
  // base64Dec 出来るかも
  if (
    tmp.match(/^([a-z0-9+\/]{4,}(={1,3})?)+$/i) && 
    tmp.match(/[a-z]/i) && 
    tmp.match(/[0-9]/) && 
    tmp.length%4==0
  ) {
  var uplow=TEXT.match(/[123456]+/g);
  for (var i in uplow) {
    if (uplow[i].match(/^[147]+$/)) {
      uplow[i]="A";
    } else if (uplow[i].match(/^[258]+$/)) {
      uplow[i]="B";
    } else if (uplow[i].match(/^[369]+$/)) {
      uplow[i]="C";
    } else {
      uplow[i]="";
    }
  }
  
    // debug(uplow+"\n"+tmp);
    
    var tmpL=tmp.split("");
    var result64d=["","","","","",""];
    for (var i in tmpL) {
      if (uplow[i]==="A") {
        result64d[0]+=
          tmpL[i].toUpperCase();
        result64d[1]+=
          tmpL[i].toLowerCase();
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i].toUpperCase();
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i].toLowerCase();
      } else if (uplow[i]==="B") {
        result64d[0]+=
          tmpL[i].toLowerCase();
        result64d[1]+=
          tmpL[i].toUpperCase();
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i].toLowerCase();
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i].toUpperCase();
      } else if (uplow[i]==="C") {
        result64d[0]+=
          tmpL[i];
        result64d[1]+=
          tmpL[i].toUpperCase();
        result64d[2]+=
          tmpL[i].toLowerCase();
        result64d[3]+=
          tmpL[i];
        result64d[4]+=
          tmpL[i].toLowerCase();
        result64d[5]+=
          tmpL[i].toUpperCase();
      } else {
        result64d[0]+=
          tmpL[i];
        result64d[1]+=
          tmpL[i];
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i];
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i];
      }
    }
    htmlTmp.push("(base64 decode)");
    htmlTmp.push(result64d[0]);
    htmlCode(base64Dec(result64d[0]));
    htmlTmp.push(result64d[1]);
    htmlCode(base64Dec(result64d[1]));
    htmlTmp.push(result64d[2]);
    htmlCode(base64Dec(result64d[2]));
    htmlTmp.push(result64d[3]);
    htmlCode(base64Dec(result64d[3]));
    htmlTmp.push(result64d[4]);
    htmlCode(base64Dec(result64d[4]));
    htmlTmp.push(result64d[5]);
    htmlCode(base64Dec(result64d[5]));
  }
  htmlTmp.push("==============");
}


// 147, 258, 369 (テンキー縦)でモールス
if (TEXT.match(/^[369]*([147258]{1,5}[369]){5,}[147258]{1,5}[369]*$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(147, 258, 369 (テンキー縦)でモールス)</b>");
  
  var result=TEXT;
  result=result.replace(/[147]/g, ".");
  result=result.replace(/[258]/g, "-");
  result=result.replace(/[369]/g, " ");

  htmlTmp.push(result);
  var tmp=morseExchange(result);
  htmlCode(tmp);
  
  // base64Dec 出来るかも
  if (
    tmp.match(/^([a-z0-9+\/]{4,}(={1,3})?)+$/i) && 
    tmp.match(/[a-z]/i) && 
    tmp.match(/[0-9]/) && 
    tmp.length%4==0
  ) {
  var uplow=TEXT.match(/[147258]+/g);
  for (var i in uplow) {
    if (uplow[i].match(/^[123]+$/)) {
      uplow[i]="A";
    } else if (uplow[i].match(/^[456]+$/)) {
      uplow[i]="B";
    } else if (uplow[i].match(/^[789]+$/)) {
      uplow[i]="C";
    } else {
      uplow[i]="";
    }
  }
  
    // debug(uplow+"\n"+tmp);
    
    var tmpL=tmp.split("");
    var result64d=["","","","","",""];
    for (var i in tmpL) {
      if (uplow[i]==="A") {
        result64d[0]+=
          tmpL[i].toUpperCase();
        result64d[1]+=
          tmpL[i].toLowerCase();
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i].toUpperCase();
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i].toLowerCase();
      } else if (uplow[i]==="B") {
        result64d[0]+=
          tmpL[i].toLowerCase();
        result64d[1]+=
          tmpL[i].toUpperCase();
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i].toLowerCase();
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i].toUpperCase();
      } else if (uplow[i]==="C") {
        result64d[0]+=
          tmpL[i];
        result64d[1]+=
          tmpL[i].toUpperCase();
        result64d[2]+=
          tmpL[i].toLowerCase();
        result64d[3]+=
          tmpL[i];
        result64d[4]+=
          tmpL[i].toLowerCase();
        result64d[5]+=
          tmpL[i].toUpperCase();
      } else {
        result64d[0]+=
          tmpL[i];
        result64d[1]+=
          tmpL[i];
        result64d[2]+=
          tmpL[i];
        result64d[3]+=
          tmpL[i];
        result64d[4]+=
          tmpL[i];
        result64d[5]+=
          tmpL[i];
      }
    }
    htmlTmp.push("(base64 decode)");
    htmlTmp.push(result64d[0]);
    htmlCode(base64Dec(result64d[0]));
    htmlTmp.push(result64d[1]);
    htmlCode(base64Dec(result64d[1]));
    htmlTmp.push(result64d[2]);
    htmlCode(base64Dec(result64d[2]));
    htmlTmp.push(result64d[3]);
    htmlCode(base64Dec(result64d[3]));
    htmlTmp.push(result64d[4]);
    htmlCode(base64Dec(result64d[4]));
    htmlTmp.push(result64d[5]);
    htmlCode(base64Dec(result64d[5]));
  }
  htmlTmp.push("==============");
}

// ガラケータイプ
if (TEXT.match(/^([2-9][abcd]|[abcd][2-9])+$/i)) {
  htmlTmp.push(TEXT);
  if (TEXT.match(/^([abcd][2-9])+$/i)) {
    var str= strReverse(TEXT);
    htmlTmp.push("→反転");
    htmlTmp.push(str);
  } else {
    var str= TEXT;
  }
  var tmp=str.match(/[2-9][abcd]/gi);
  
  for (var i in tmp) {
    //alert("tmp["+i+"]="+tmp[i]);
    
    if (tmp[i].match(/a$/i)) {
      tmp[i]=tmp[i].replace(
        /^(\d)\w$/i, "$1");
    } else if (tmp[i].match(/b$/i)) {
      tmp[i]=tmp[i].replace(
        /^(\d)\w$/i, "$1$1");
    } else if (tmp[i].match(/c$/i)) {
      tmp[i]=tmp[i].replace(
        /^(\d)\w$/i, "$1$1$1");
    } else if (tmp[i].match(/d$/i)) {
      tmp[i]=tmp[i].replace(
        /^(\d)\w$/i, "$1$1$1$1");
    }
  }
  htmlTmp.push("abc123 & 1文字めをn回");
  htmlTmp.push(tmp.join(" "));
  
  htmlTmp.push("ガラケー打ち変換");
  var tmpgrk=garake(tmp.join(" "));
  htmlCode(tmpgrk);
  htmlCode(strReverse(tmpgrk));
  htmlCode(atbash19(tmpgrk));
  htmlCode(
    strReverse(atbash19(tmpgrk)));
  htmlTmp.push("===============");
  
}


//大文字で改行してabc012->sum->decASCII
if (TEXT.match(/^([A-Z][a-z]+)+$/)) {
  var lines=TEXT.match(/[A-Z][a-z]+/g);
  htmlTmp.push(TEXT);
  htmlTmp.push(
  "大文字で改行->abc012->sum->decASCII");
  var result="";
  for (var i in lines) {
    lines[i]=lines[i].replace(
      /^\s+|\s+$/g, "");
    if (lines[i]=="") continue;
  
    var tmp=0;
    var tmp2="";
    htmlTmp.push(lines[i]);
  
    for (var j in lines[i]) {
      tmp+=Number(
        letter2Num(lines[i][j]));
      tmp2+=letter2Num(lines[i][j])+" ";
    }
    htmlTmp.push(tmp2+" = "+tmp);
    result+=tmp;
  }
  htmlTmp.push("---");
  htmlTmp.push(result);

  if (result.match(/^\d+$/)) {
    htmlTmp.push("(decASCII)");
    var tmpdeca=decASCII(result);
    htmlCode(tmpdeca);
    htmlCode(strReverse(tmpdeca));
    htmlCode(atbash19(tmpdeca));
    htmlCode(
      strReverse(atbash19(tmpdeca)));
  }
  htmlTmp.push("===============");
}


//abc123>ガラケー
if (TEXT.match(/^[A-J]+$/i)
  && TEXT.length%2==0) {
  htmlTmp.push("abc123>n±1番目をn番目の数だけ繰り返す>ガラケー");
  htmlTmp.push(TEXT);
  var result=toAbc123(TEXT);
  htmlTmp.push("abc123");
  htmlTmp.push(result);
  
  htmlTmp.push(
    "n+1番目をn番目の数だけ繰り返す");
  var numsorce=[];
  for (var i=0; i<result.length; i=i+2) {
    var numtmp="";
    for (var j=0; j<result[i]; j++) {
      numtmp+=result[i+1];
    }
    numsorce.push(numtmp);
  }
  htmlTmp.push(numsorce.join(" "));
  
  var result2=garake(numsorce.join(" "));
  htmlTmp.push("(ガラケー打ち)");
  htmlCode(result2);
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(result2));
  
  htmlTmp.push("-----------");
  
  htmlTmp.push(
    "n番目をn+1番目の数だけ繰り返す");
  var numsorce=[];
  for (var i=0; i<result.length; i=i+2) {
    var numtmp="";
    for (var j=0; j<result[i+1]; j++) {
      numtmp+=result[i];
    }
    numsorce.push(numtmp);
  }
  htmlTmp.push(numsorce.join(" "));
  
  var result2=garake(numsorce.join(" "));
  htmlTmp.push("(ガラケー打ち)");
  htmlCode(result2);
  
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(result2));
        
  htmlTmp.push("===============");
}


// morse>>braille
if (TEXT.match(/^[\.\-\s]+$/)) {
  var tmp=morseExchange(TEXT);
  var tmp2=TEXT.replace(/\s/g, "");
  tmp2=tmp2.replace(/\./g, "0");
  tmp2=tmp2.replace(/-/g, "1");
    
  //ブルイユ点字なら6で割れる
  if (tmp2.length%6==0) {
    htmlTmp.push(TEXT);
    htmlTmp.push("morse>>braille"); 
    htmlTmp.push(tmp);
    htmlTmp.push("①④"); 
    htmlTmp.push("②⑤"); 
    htmlTmp.push("③⑥"); 
    var rect=tmp2.match(/.../g);
    for (var i in rect) {
      rect[i]=rect[i].match(/./g);
    }
    rect=rectReflect(rect);
    var result="";
    for (var i in rect) {
      result+=rect[i].join("").match(
        /../g).join(" ")+"\n";
    }
    htmlTmp.push("空白を取り6文字ずつbraille点字に並び替える");
    htmlTmp.push(
      result.replace(
        /1/g,"◉").replace(/0/g,"◎"));
    
    tmp3=bin2brailleAscii(tmp2);
    
    htmlCode(tmp3);
    
    result=binbash(result);
    tmp3=bin2brailleAscii(
      binbash(tmp2));
    
    htmlTmp.push("(bash)");
    htmlTmp.push(
      result.replace(
        /1/g,"◉").replace(/0/g,"◎"));
    
    htmlCode(tmp3);
    
    htmlTmp.push("--------------");
    
    htmlTmp.push("morse>>braille"); 
    htmlTmp.push("①②"); 
    htmlTmp.push("③④"); 
    htmlTmp.push("⑤⑥"); 
    
    var recttmp=tmp2.match(/.{6}/g);
    var rect=["","",""];
    for (var i in recttmp) {
      rect[0]+=recttmp[i][0]+recttmp[i][1];
      rect[1]+=recttmp[i][2]+recttmp[i][3];
      rect[2]+=recttmp[i][4]+recttmp[i][5];
    }
    var result="";
    for (var i in rect) {
      result+=rect[i].match(
        /../g).join(" ")+"\n";
    }
    htmlTmp.push("空白を取り6文字ずつbraille点字に並び替える");
    htmlTmp.push(
      result.replace(
        /1/g,"◉").replace(/0/g,"◎"));
    
    tmp3=bin2brailleAscii(tmp2,"switch");
    
    htmlCode(tmp3);
    
    result=binbash(result);
    tmp3=bin2brailleAscii(
      binbash(tmp2), "switch");
    
    htmlTmp.push("(bash)");
    htmlTmp.push(
      result.replace(
        /1/g,"◉").replace(/0/g,"◎"));
    
    htmlCode(tmp3);
    
  }
  htmlTmp.push("===============");
}


//元素記号からdecASCII 元素記号２文字優先
htmlTmp.push(TEXT);
htmlTmp.push("(原子番号 元素記号２文字優先)");
function atomOut(L) {
  var tmp2="<table id='atom'><tr>";
  for (var i in L[1]) {
    tmp2+="<td>"+L[1][i]+"</td>";
  }
  tmp2+="</tr><tr>";
  for (var i in L[2]) {
    var tmp3=L[2][i];
    if (tmp3.match(/^\d+$/)) {
      tmp3="<span class='num'>"+
        tmp3+"</span>";
    }
    tmp2+="<td>"+tmp3+"</td>";
  }
  tmp2+="</tr></table>";
  htmlTmp.push(tmp2);
  if (L[0].match(/^\d+$/g) && L[0].length>15) {
      htmlTmp.push("<span class='alert'>全てが置き換わった！</span>");
    }
  htmlCode(L[0]);
  var tmp3=decASCII(L[0]);
  if (tmp3.match(/^[a-z0-9]+$/i)) {
    htmlTmp.push("decASCII reverse");
    htmlCode(strReverse(tmp3));
    htmlTmp.push("decASCII atbash");
    htmlCode(atbash(tmp3));
    if (tmp3.match(/\d/)) {
      htmlCode(atbash19(tmp3));
      htmlCode(atbash09(tmp3));
    }
  }
}

var tmp=atomicNum(TEXT,2);
atomOut(tmp);
htmlTmp.push("(reverse)");
var tmp=atomicNum(
  strReverse(TEXT),2);
atomOut(tmp);

htmlTmp.push("(atbash)");
var tmp=atomicNum(
  atbash19(TEXT),2);
atomOut(tmp);

htmlTmp.push("(reverse & atbash)");
var tmp=atomicNum(
  atbash19(strReverse(TEXT)),2);
atomOut(tmp);

htmlTmp.push("===============");


//元素記号からdecASCII 元素記号1文字優先
htmlTmp.push(TEXT);
htmlTmp.push("(原子番号 元素記号1文字優先)");
function atomOut(L) {
  var tmp2="<table id='atom'><tr>";
  for (var i in L[1]) {
    tmp2+="<td>"+L[1][i]+"</td>";
  }
  tmp2+="</tr><tr>";
  for (var i in L[2]) {
    var tmp3=L[2][i];
    if (tmp3.match(/^\d+$/)) {
      tmp3="<span class='num'>"+
        tmp3+"</span>";
    }
    tmp2+="<td>"+tmp3+"</td>";
  }
  tmp2+="</tr></table>";
  htmlTmp.push(tmp2);
  if (L[0].match(/^\d+$/g) && L[0].length>15) {
      htmlTmp.push("<span class='alert'>全てが置き換わった！</span>");
    }
  htmlCode(L[0]);
}
var tmp=atomicNumSmall(TEXT,2);
atomOut(tmp);
htmlTmp.push("(reverse)");
var tmp=atomicNumSmall(
  strReverse(TEXT),2);
atomOut(tmp);

htmlTmp.push("(atbash)");
var tmp=atomicNumSmall(
  atbash19(TEXT),2);
atomOut(tmp);

htmlTmp.push("(reverse & atbash)");
var tmp=atomicNumSmall(
  atbash19(strReverse(TEXT)),2);
atomOut(tmp);

htmlTmp.push("===============");


// 元素記号(1~9)からdecASCII
if (
  TEXT.match(/^(He|Li|Be|H|B|C|N|O|F)+$/i) 
) {

  function atomOut(L) {
    var tmp2="<table id='atom'><tr>";
    for (var i in L[1]) {
      tmp2+="<td>"+L[1][i]+"</td>";
    }
    tmp2+="</tr><tr>";
    for (var i in L[2]) {
      var tmp3=L[2][i];
      if (tmp3.match(/^\d+$/)) {
        tmp3="<span class='num'>"+
          tmp3+"</span>";
      }
      tmp2+="<td>"+tmp3+"</td>";
    }
    tmp2+="</tr></table>";
    htmlTmp.push(tmp2);
    if (L[0].match(/^\d+$/g) && L[0].length>15) {
        htmlTmp.push("<span class='alert'>全てが置き換わった！</span>");
      }
    htmlCode(L[0]);
  }

  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(元素記号(1~9))</b>");
  var tmp2=TEXT.match(/(He|Li|Be|H|B|C|N|O|F)/ig);
  var tmp=atomicNumFromArrey(tmp2,2);
  atomOut(tmp);

  htmlTmp.push("(reverse)");
  var tmp2=strReverse(TEXT).match(/(He|Li|Be|H|B|C|N|O|F)/ig);
  var tmp=atomicNumFromArrey(tmp2,2);
  atomOut(tmp);

  htmlTmp.push("(atbash)");
  var tmp2=atbash19(TEXT).match(/(He|Li|Be|H|B|C|N|O|F)/ig);
  var tmp=atomicNumFromArrey(tmp2,2);
  atomOut(tmp);

  htmlTmp.push("(reverse & atbash)");
  var tmp2=atbash19(strReverse(TEXT)).match(/(He|Li|Be|H|B|C|N|O|F)/ig);
  var tmp=atomicNumFromArrey(tmp2,2);
  atomOut(tmp);
  
 htmlTmp.push("==============");
}


//base64toHex>4line>refrect>hexASCII
if (
  TEXT.match(/[A-Z]/)&&
  TEXT.match(/[a-z]/)&&
  TEXT.match(/[0-9]/)&&
  TEXT.length%4==0
) {
  htmlTmp.push(
  "base64toHex > 4line > reflect > hexASCII");
  htmlTmp.push(TEXT);
  var hexstr=base64Dec(TEXT, "16");
  htmlTmp.push("(base64toHex)");
  htmlTmp.push(hexstr);
  
  if (hexstr.length%4!=0) {
    htmlTmp.push("4行にならない");
  } else {

    var myRE=".{"+hexstr.length/4+"}";
    var line4RE=new RegExp(myRE, "g");
    var rect=hexstr.match(line4RE);
    
    htmlTmp.push("(line4)");
    for (var i in rect) htmlTmp.push(rect[i]);
    rect=rectReflect(rect);
    htmlTmp.push("(reflect)");
    for (var i in rect) htmlTmp.push(rect[i]);
    
    var result="";
    for (var i in rect) {
      result+=rect[i].join("");
    }
    htmlTmp.push("(1lene)");
    htmlTmp.push(result);
    
    htmlTmp.push("(hexASCII)");
    htmlCode(hexASCII(result));
  }
  htmlTmp.push("===============");
}


/*
//ASCIIインクリメントモールス
//-./12%3'5778,;;=0?@@AB6DFF:I<JL?NOPPDRSUVWJYZ[\O^_`abUdef
var firstChar=TEXT[0].charCodeAt(0);
var lastChar=TEXT[TEXT.length-1].charCodeAt(0)-(TEXT.length-1);
if (abs(firstChar-lastChar)==1
    ||abs(firstChar-lastChar)==0) {
  var tmp=[];
  for (var i in TEXT) {
    tmp.push(TEXT[i].charCodeAt(0)-i);
  
    var tmp=0;
    var tmp2="";
    htmlTmp.push(lines[i]);
  
    for (var j in lines[i]) {
      tmp+=Number(
        letter2Num(lines[i][j]));
      tmp2+=letter2Num(lines[i][j])+" ";
    }
    htmlTmp.push(tmp2+" = "+tmp);
    result+=tmp;
  }
  htmlTmp.push("---");
  htmlTmp.push(result);

  if (result.match(/^\d+$/)) {
    htmlTmp.push("(decASCII)");
    htmlCode(decASCII(result));
  }
  htmlTmp.push("===============");
}
*/

//1、22、333をキーボード並び
if (TEXT.match(
  /^(\d)\1{0,2}(?:[\s\-_|.,:;/\\](\d)\2{0,2})+$/
  )) {
  var lines=TEXT.split(/[\s\-_|.,:;/\\]/g);
  htmlTmp.push(TEXT);
  htmlTmp.push(
  "数字と繰り返し回数がqwertyキーボードの位置を表す");
  
  var result="";
  var map=[];
  map[0]=["p","",""];
  map[1]=["q","a","z"];
  map[2]=["w","s","x"];
  map[3]=["e","d","c"];
  map[4]=["r","f","v"];
  map[5]=["t","g","b"];
  map[6]=["y","h","n"];
  map[7]=["u","j","m"];
  map[8]=["i","k",""];
  map[9]=["o","l",""];
  
  for (var i in lines) {
    var x=lines[i][0];
    var y=lines[i].length-1;
    result+=map[x][y];
  }
  
  htmlCode(result);
  htmlCode(strReverse(result));
  htmlCode(atbash19(result));
  htmlCode(
    strReverse(atbash19(result)));
  
  htmlTmp.push("===============");
}


//数字を012abc、アルファベットをabc012。
if (
  TEXT.match(/^([a-j0-9]+|[q-z0-9]+)$/)
  && TEXT.match(/\d/)
  && TEXT.match(/[a-z]/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
  "(数字を012abc、文字をabc012)");
  if (TEXT.match(/[a-j]/)) {
    var lines=TEXT.match(
      /[a-j]+|[0-9]+/ig);
  } else {
    htmlTmp.push("atbash");
    htmlTmp.push(atbash19(TEXT));
    var lines=atbash19(TEXT).match(
      /[a-j]+|[0-9]+/ig);
  }
  var result="";
  for (var i in lines) {
    if (lines[i].match(/\d/)) {
      result+=to012abcString(lines[i]);
    } else {
      result+=letter2Num(lines[i]);
    }
  }
  
  htmlCode(result);
  htmlCode(strReverse(result));
  htmlCode(atbash19(result));
  htmlCode(
    strReverse(atbash19(result)));
  
  htmlTmp.push("===============");
}


// 累乗の組み合わせでガラケー変換
if (TEXT.match(/^[\d\s]+$/)) {
  var result=getRMPattern(TEXT);
  if (result!=null) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>累乗の組み合わせ</b>");
    htmlTmp.push(result.sorce.join(" "));
    htmlTmp.push("--------------");
    htmlTmp.push(
      result.list.length+"パターン");

      for (var i in result.list) {
        
        htmlTmp.push(result.list[i]);
        result.list[i]=garake(result.list[i]);
        htmlCode(result.list[i]);
        
        if (i>10) {
          htmlTmp.push(
            "10パターンを超えるので中止");
          break;
        }
      }
      
    htmlTmp.push("==============");
  }
}

  
}
