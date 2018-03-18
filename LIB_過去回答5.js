
// LIB_過去回答5
// #LIB

function kakokaitou5() {

htmlTmp.push("<div class='red'>--- kako 5 ---</div>");


// ze=0, on=1, te=10, el=11, hu=100, th=1000, でバイナリ
if (
    TEXT.match(/^((ze|on|te|el|hu|th)[\s\|\-\.,\/]?){8,}$/i) && 
    kouseimoji.length>=5
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(ze=0, on=1, te=10, el=11, hu=100, th=1000, でバイナリ)</b>");
  var tmp=
    TEXT.match(/(ze|on|te|el|hu|th)/ig);
  htmlTmp.push(tmp.join(" "));
  var result=tmp.join(" ");
  result=result.replace(/ze/ig, "0");
  result=result.replace(/on/ig, "1");
  result=result.replace(/te/ig, "10");
  result=result.replace(/el/ig, "11");
  result=result.replace(/hu/ig, "100");
  result=result.replace(/th/ig, "1000");
  result=result.replace(/\s/ig, "");
  htmlTmp.push(result);
  goBinary(result);
  htmlTmp.push("==============");
}

// カナダ先住民文字を使ったセマフォ
// ᐱᐳᒪᐯᒪᒣᒪᒥᐯᒧᒪᒧᒪᐳᐯᒣᒪᒧᒥᐱᐱᒣᒥᒪᐱᐳᒪᒧᐸᐯᐱᒣᐯᒧᐯᒣᐱᐳᒥᐳᐸᒥᐱᒣᐯᒣ
if (
  TEXT.match(/^([ᐱᒣᐳᒧᐯᒪᐸᒥ]){2,}$/i) && 
  kouseimoji.length>=4 && 
  TEXT.length%2==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(カナダ先住民文字を使ったセマフォ)</b>");
 htmlTmp.push("<a href='https://en.m.wikipedia.org/wiki/Canadian_Aboriginal_syllabics'>wiki</a>");
  var tmp=TEXT.split("");
  var result=[];
  var result2=[];
  
  var map={
    "ᒪ": "7", 
    "ᒣ": "2", 
    "ᒥ": "10", 
    "ᒧ": "5", 
    "ᐸ": "9", 
    "ᐯ": "6",  
    "ᐱ": "12", 
    "ᐳ": "3"
  }
  
  for (var i in tmp) {
    result.push(map[tmp[i]]);
  }
  htmlCode(result.join(""));
  htmlTmp.push("セマフォとして読む");
  for (var i=0; i<result.length; i+=2) {
    if (i%2==1) continue;
    //debug(result[i]+"-"+result[i+1]);
    result2.push(
      result[i]+"-"+result[i+1]);
  }
  htmlCode(result2.join(","));
  htmlCode(semaphore(result2.join(",")));
  htmlTmp.push("==============");
}

// カナダ先住民文字を使ったセマフォ2
// pipomapemamemamipemomamomapopememamomipipimemimapipomamopapepimepemopemepipomipopamipimepeme
if (
  TEXT.match(/^([mp][aeio]){4,}$/i) && 
  kouseimoji.length>=4 && 
  TEXT.length%4==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(カナダ先住民文字を使ったセマフォ)</b>");
 htmlTmp.push("<a href='https://en.m.wikipedia.org/wiki/Canadian_Aboriginal_syllabics'>wiki</a>");
  var tmp=TEXT.match(/([mp][aeio])/ig);
  var result=[];
  var result2=[];
  var result3=[];
  htmlTmp.push(tmp.join(" "));
  
  var map={
    "ma": ["ᒪ","7"], 
    "me": ["ᒣ","2"], 
    "mi": ["ᒥ","10"], 
    "mo": ["ᒧ","5"], 
    "pa": ["ᐸ","9"], 
    "pe": ["ᐯ","6"],  
    "pi": ["ᐱ","12"], 
    "po": ["ᐳ","3"]
  }
  
  for (var i in tmp) {
    result.push(map[tmp[i]][0]);
    result2.push(map[tmp[i]][1]);
  }
  htmlCode(result.join(""));
  htmlTmp.push("セマフォとして読む");
  for (var i=0; i<result2.length; i+=2) {
    if (i%2==1) continue;
    //debug(result2[i]+"-"+result2[i+1]);
    result3.push(
      result2[i]+"-"+result2[i+1]);
  }
  htmlCode(result3.join(","));
  htmlCode(semaphore(result3.join(",")));
  htmlTmp.push("==============");
}

// 数字だけのkwをabc012から導く
// uejjdiffihfgz
// 802, 855, 42
// 82→lead
// 6→vi
if (
  TEXT.match(/^[a-z]+$/) && (TEXT.match(/^([a-hjkm-z]{3})([c-j]{2})(iac|iff|ec|ic|g)([c-j]{3})([a-hjkm-z]{2})$/i) || atbash(TEXT).match(/^([a-hjkm-z]{3})([c-j]{2})(iac|iff|ec|ic|g)([c-j]{3})([a-hjkm-z]{2})$/i))
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字だけのkwをabc012から導く)</b>");
  var tmp=TEXT.match(/^([a-hjkm-z]{3})([c-j]{2}(?:iac|iff|ec|ic|g)[c-j]{3})([a-hjkm-z]{2})$/i);
  if (!tmp) var tmp=atbash(TEXT).match(/^([a-hjkm-z]{3})([c-j]{2}(?:iac|iff|ec|ic|g)[c-j]{3})([a-hjkm-z]{2})$/i);
  tmp[2]=abc012(tmp[2]);
  htmlCode(tmp[1]+tmp[2]+tmp[3]);
  htmlTmp.push("==============");
}



// フォーマット部の入れ替え
if (
  TEXT.match(/^[0-9][a-z]{3}[0-9][a-z]{6}[2-9]{4}[a-z][0-9][a-z][0-9][a-z]$/i) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(フォーマット部の入れ替え)</b>");
  var t=TEXT.split("");
  //0 123 4 567890 1234 5 678 9
  var resultPrefix=
    t[11]+t[5]+t[6]+t[7]+t[12];
  var resultKW1=
    t[1]+t[2]+t[3]+t[15]+t[17]+t[19];
  var resultKW2=
    t[0]+t[4]+t[16]+t[18];
  var resultSuffix=
    t[8]+t[13]+t[9]+t[14]+t[10];
  htmlCode(resultPrefix+resultKW1+resultKW2+resultSuffix);
  htmlTmp.push("(keyword検索用)");
  htmlTmp.push(resultKW1+" "+resultKW2);
  htmlTmp.push("==============");
}


// 3分割して1で2をvig、2で3をvig
var tmp=TEXT.replace(/\n/g, "");
if (
  tmp.match(/^[\w]+$/) && 
  kouseimoji.length>=4 && 
  tmp.length%3==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(3分割して1で2をvig、2で3をvig)</b>");
  var len=tmp.length;
  var tmpAry=tmp.split("");
  var tmp1=
    tmpAry.slice(0, len/3).join("");
  var tmp2=
    tmpAry.slice(len/3, len-len/3).join("");
  var tmp3=
    tmpAry.slice(len-len/3, len).join("");
  htmlTmp.push(`${tmp1} ${tmp2} ${tmp3}`);
  var tmp1v=tmp1;
  var tmp2v=vigenereDec(tmp2,tmp1);
  var tmp3v=vigenereDec(tmp3,tmp2);
  htmlTmp.push(`${tmp1v} ${tmp2v} ${tmp3v}`);
  htmlCode(tmp1v+tmp2v+tmp3v);
  htmlTmp.push("-------");
  htmlTmp.push("(並べ替え)");
  htmlCode(tmp1v+tmp3v+tmp2v);
  htmlCode(tmp2v+tmp1v+tmp3v);
  htmlCode(tmp2v+tmp3v+tmp1v);
  htmlCode(tmp3v+tmp1v+tmp2v);
  htmlCode(tmp3v+tmp2v+tmp1v);
  htmlTmp.push("==============");
}


// abcdeを.....、12345を-----でモールス
if (
  TEXT.match(/^[a-e1-5]{1,5}([\s0f69\-.,:;|\\&+])([a-e1-5]{1,5}\1)+[a-e1-5]{1,5}\1?$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(abcdeを.....、12345を-----でモールス)</b>");
  var tmpRE=
    new RegExp(RegExp.$1, "g");
  var tmp=TEXT.replace(tmpRE, " ");
  tmp=tmp.replace(/a/ig, ".");
  tmp=tmp.replace(/b/ig, "..");  
  tmp=tmp.replace(/c/ig, "...");  
  tmp=tmp.replace(/d/ig, "....");  
  tmp=tmp.replace(/e/ig, ".....");  
  tmp=tmp.replace(/1/ig, "-");
  tmp=tmp.replace(/2/ig, "--");  
  tmp=tmp.replace(/3/ig, "---");  
  tmp=tmp.replace(/4/ig, "----");  
  tmp=tmp.replace(/5/ig, "-----");  
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}


// NEW abcdeを.....、12345を-----でモールス
// 2a1 c1 1c d1 3b 1a b a1 1a 1 b 1a1a c2 d1 d1 a3 a
if (
  (
    TEXT.match(/^(([a-e1-5]{1,5})([\s0f69\-.,:;|\\&+]))+\3$/i) || 
    TEXT.match(/^(([a-e!@#$%]{1,5})([\s0f69\-.,:;|\\&+]))+\3$/i)
  ) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(NEW abcdeを.....、12345を-----でモールス)</b>");
  var tmpRE=
    new RegExp(RegExp.$1, "g");
  var tmp=TEXT.replace(tmpRE, " ");
  tmp=tmp.replace(/a/ig, ".");
  tmp=tmp.replace(/b/ig, "..");  
  tmp=tmp.replace(/c/ig, "...");  
  tmp=tmp.replace(/d/ig, "....");  
  tmp=tmp.replace(/e/ig, ".....");  
  tmp=tmp.replace(/[1!]/ig, "-");
  tmp=tmp.replace(/[2@]/ig, "--");  
  tmp=tmp.replace(/[3#]/ig, "---");  
  tmp=tmp.replace(/[4$]/ig, "----");  
  tmp=tmp.replace(/[5%]/ig, "-----");  
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}



// バイナリ操作 上位4ビットで下位4ビットをXOR
if (
  TEXT.match(/^([10]{8}\s?)+$/) && 
  kouseimoji.length<=3 && 
  kouseimoji.length>1
) {
  
  function binXOR(str0, str1) {
    if ( !(
      str0.length==str1.length && 
      str0.match(/^[01]+$/) && 
      str1.match(/^[01]+$/) )
    ) {
      return null;
    }
    
    var myXOR="";
    for (var i in str0) {
      if (str0[i]==str1[i]) { myXOR+="0"; }
      else { myXOR+="1"; }
    }
    return myXOR;
  }
  
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(バイナリ操作 上位4ビットで下位4ビットをXOR)</b>");
  var tmps=[];
  if (TEXT.match(/\s/)) {
    tmps=TEXT.split(/\s/g);
  } else {
    tmps=TEXT.match(/[10]{8}/g);
  }
  var result=[];
  for (var i in tmps) {
    var tmp0=tmps[i].slice(0,4);
    var tmp1=tmps[i].slice(4,8);
    tmpXOR=binXOR(tmp0,tmp1);
    result.push(tmp0+tmpXOR);
    htmlTmp.push(tmps[i]+" → "+tmp0+"^"+tmp1+"="+tmpXOR+" → "+tmp0+tmpXOR);
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}

// バイナリ操作 binbash
if (
  TEXT.match(/^([10]{8}\s?)+$/) && 
  kouseimoji.length<=3 && 
  kouseimoji.length>1
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(バイナリ操作 binbash)</b>");
  var tmps=[];
  if (TEXT.match(/\s/)) {
    tmps=TEXT.split(/\s/g);
  } else {
    tmps=TEXT.match(/[10]{8}/g);
  }
  var result=[];
  for (var i in tmps) {
    result.push(binbash(tmps[i]));
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  
  htmlTmp.push(
    base64Dec(result.join(" ")));
  htmlCode(
    base64Dec(result.join("")));
  htmlTmp.push(
    base64Enc(result.join(" ")));
  htmlCode(
    base64Enc(result.join("")));
  htmlTmp.push("==============");
}


// n×26+abc012-1
// 3n2x3a2f2e3c3d2s3f2o3h2w3j2s2e2d2g3d2p
if (
  TEXT.match(/^([1-4][a-z]){9,}$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(n×26+abc012-1)</b>");
  var tmps=TEXT.match(/[1-4][a-z]/ig);
  debug(tmps);
  var result=[];
  for (var i in tmps) {
    result.push(
      Number(tmps[i][0])*26 + 
      Number(abc012(tmps[i][1])) - 1);
  }
  htmlTmp.push(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// 3分割してvigenere autokey
// sgedizwfnztqlpyymuqjrklemoecfpxpkqfqaxwbxlagpnzfimdkqgegj
if (
  TEXT.match(/^[a-zA-Z]+$/) && 
  kouseimoji.length>=4 && 
  TEXT.length%3==0
) {
  var tmpRE=
    new RegExp(".{"+TEXT.length/3+"}", "g");
  var tmp=TEXT.match(tmpRE);
  var result=vigenereAutoDec(TEXT, tmp[2]).match(tmpRE);
  if (
    keywordCheck(result[0]) && 
    keywordCheck(result[1]) && 
    keywordCheck(result[2])
  ) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(3分割してvigenere autokey)</b>");
    htmlCode(tmp.join(" "));
    htmlTmp.push("<b>autokey: "+tmp[2]+"</b>");
    htmlCode(result.join(""));
    htmlCode(result[0]);
    htmlCode(result[1]);
    htmlCode(result[2]);
  }
  htmlTmp.push("==============");
}



// leet
if (
  TEXT.match(/^([a-z]{2}[2345679][2-9]{2}\w+[2-9]{3}[a-z]{2}|[a-z]{2}[2-9]{3}\w+[2-9]{2}[2345679][a-z]{2})$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(leet)</b>");
  
  var tmpRE=new RegExp( "^([a-z]{2})([2345679])([2-9]{2}\\w+[2-9]{3}[a-z]{2})$", "i" );
  if (TEXT.match(tmpRE)) {
    var tmp1=RegExp.$1;
    var tmp2=RegExp.$2;
    var tmp3=RegExp.$3;
    if (tmp2=="5") var tmp2a="s";
    tmp2=tmp2.replace(/2/ig, "z");
    tmp2=tmp2.replace(/3/ig, "e");
    tmp2=tmp2.replace(/4/ig, "a");
    tmp2=tmp2.replace(/5/ig, "v");
    tmp2=tmp2.replace(/6/ig, "b");
    tmp2=tmp2.replace(/7/ig, "t");
    tmp2=tmp2.replace(/9/ig, "g");
    htmlCode( tmp1+tmp2+tmp3 );
    if (tmp2a) {
      htmlCode(tmp1+tmp2a+tmp3);
    }
    htmlTmp.push("-------");
  }

  var tmpRE=new RegExp( "^([a-z]{2}[2-9]{3}\\w+[2-9]{2})([2345679])([a-z]{2})$", "i" );
  if (TEXT.match(tmpRE)) {
    var tmp1=RegExp.$1;
    var tmp2=RegExp.$2;
    var tmp3=RegExp.$3;
    if (tmp2=="5") var tmp2a="s";
    tmp2=tmp2.replace(/2/ig, "z");
    tmp2=tmp2.replace(/3/ig, "e");
    tmp2=tmp2.replace(/4/ig, "a");
    tmp2=tmp2.replace(/5/ig, "v");
    tmp2=tmp2.replace(/6/ig, "b");
    tmp2=tmp2.replace(/7/ig, "t");
    tmp2=tmp2.replace(/9/ig, "g");
    htmlTmp.push("(reverse)");
    htmlCode(
      strReverse( tmp1+tmp2+tmp3 ));
    if (tmp2a) {
      htmlCode(
        strReverse( tmp1+tmp2a+tmp3 ));
    }
  }
 
  htmlTmp.push("==============");
}


// 数字をローマ数字へ、シンボルを数字へ
// %1(5*sr10ute1010%s#
if (
  TEXT.match(
    /^[!@#$%^&*()a-z150]+$/i) && 
  TEXT.match(
    /[!@#$%^&*()]/) && 
  TEXT.match(
    /[a-z]/i) && 
  TEXT.match(
    /[150]/) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字をローマ数字へ、シンボルを数字へ)</b>");
  var tmp=TEXT;
  tmp=tmp.replace(/10/g, "x");
  tmp=tmp.replace(/5/g, "v");
  tmp=tmp.replace(/1/g, "i");
  tmp=symbol2Num(tmp);
  htmlCode(tmp);
  var tmp2=tmp.match(/\d/g);

  if (
    tmp2 && 
    tmp2.length>=4 && 
    tmp2.length<=5
  ) {
    htmlTmp.push("<span class='alertbox'>Rect N</span>");
    /*推定kwも表示したい*/
  }
  htmlTmp.push("==============");
}


// イタリア語3文字数字
{
var tmpRE=new RegExp(
"^(zero?|uno|due|tre|qua(?:t(?:t(?:ro?)?)?)?|cin(?:q(?:ue?)?)?|sei|set(?:te?)?|otto?|nove?){5,}$",
  "i");
var tmpRE2=new RegExp(
  "(zero?|uno|due|tre|qua(?:t(?:t(?:ro?)?)?)?|cin(?:q(?:ue?)?)?|sei|set(?:te?)?|otto?|nove?)",
  "ig");
if (
  TEXT.match(tmpRE) || 
  strReverse(TEXT).match(tmpRE) || 
  atbash19(TEXT).match(tmpRE) || 
  strReverse(
    atbash19(TEXT)).match(tmpRE)
) {
  var str=[];
  htmlTmp.push(TEXT);
  if (TEXT.match(tmpRE)) {
    str=TEXT.match(tmpRE2);
  } else if (
    strReverse(TEXT).match(tmpRE)) {
    str=
      strReverse(TEXT).match(tmpRE2);
    htmlTmp.push("(reverse)");
    htmlTmp.push(str);
  } else if (
    atbash19(TEXT).match(tmpRE)) {
    str=atbash19(TEXT).match(tmpRE2);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  } else if (
    atbash19(
      strReverse(TEXT)).match(tmpRE)) {
    str=
      atbash19(
        strReverse(TEXT)).match(tmpRE2);
    htmlTmp.push("(reverse & reverse)");
    htmlTmp.push(str);
  }
  htmlTmp.push("<b>(Italy num)</b>");
  htmlTmp.push("0 zero<br>1  uno<br>2 due<br>3 tre<br>4  quattro<br>5 cinque<br>6 sei<br>7  sette<br>8 otto<br>9 nove");
  
  htmlTmp.push(str.join(" "));

  for (var i in str) {
    str[i]=str[i].replace(/uno/ig, "1");
    str[i]=str[i].replace(/due/ig, "2");
    str[i]=str[i].replace(/tre/ig, "3");
    str[i]=str[i].replace(/qua(?:t(?:t(?:ro?)?)?)?/ig, "4");
    str[i]=str[i].replace(/cin(?:q(?:ue?)?)?/ig, "5");
    str[i]=str[i].replace(/sei/ig, "6");
    str[i]=str[i].replace(/set(?:te?)?/ig, "7");
    str[i]=str[i].replace(/otto?/ig, "8");
    str[i]=str[i].replace(/nove?/ig, "9");
    str[i]=str[i].replace(/zero?/ig, "0");
  }
  htmlTmp.push(str.join(""));
  htmlCode(str.join(""));
  htmlTmp.push("==============");
}
}


// 数字のみatbash>012abc
if (
  TEXT.match(/^[\d]+$/i) && 
  kouseimoji.length>=4
) {
  var tmp=atbash19(TEXT);
  if (tmp.match(/^([01][0-9]|[2][0-5])+$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(数字のみatbash>012abc)</b>");
    htmlCode(tmp);
    tmp=to012abcString(tmp);
    htmlCode(tmp);
    htmlTmp.push("(more atbash)");
    tmp=atbash19(tmp);
    htmlCode(tmp);
    htmlTmp.push("(more reverse)");
    tmp=strReverse(tmp);
    htmlCode(tmp);
    htmlTmp.push("(more atbash & reverse)");
    tmp=atbash19(strReverse(tmp));
    htmlCode(tmp);
    htmlTmp.push("==============");
  }
}



// 数字から強制フォーマット
function forceFormat(nums) {
if (nums.match(/^[0-9]{10,}$/)) {
  htmlTmp.push(nums);
  var tmp=nums;
  var result="";
    
  // aaa##kw###aa
  var tmpRE1=new RegExp("^((?:[01][0-9]|2[0-5]){3})((?:[2-9]){2})([0-9]*)((?:[2-9]){3})((?:[01][0-9]|2[0-5]){2})$");
  
  // #aaa#kwa#a#a
  var tmpRE2=new RegExp("^([2-9])((?:[01][0-9]|2[0-5]){3})([2-9])([0-9]*)([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])$");
  
  // kw#aa##aa#
  var tmpRE3=
    new RegExp("^([0-9]*)([0-9])((?:[01][0-9]|2[0-5]){2})([0-9]{2})((?:[01][0-9]|2[0-5]){2})([0-9])$");
  
  // aaaaaaaa#kw#
  var tmpRE4=
    new RegExp("^((?:[01][0-9]|2[0-5]){8})([0-9])([0-9]*)([0-9])$");
  
  // a#a#kwa#aa
  var tmpRE5=
    new RegExp("^([01][0-9]|2[0-5])([0-9])([01][0-9]|2[0-5])([0-9])([0-9]*)([01][0-9]|2[0-5])([0-9])((?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5]))$");
  
  if (tmp.match(tmpRE1)) {
    // aaa##kw###aa
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5
    ];
    result=to012abcString(tmp2[0]);
    result+=tmp2[1];
    if (tmp2[2].match(/^([01][0-9]|2[0-5])+$/)) {
      result+=to012abcString(tmp2[2]);
    } else {
      result+=tmp2[2];
    }
    result+=tmp2[3];
    result+=to012abcString(tmp2[4]);
    htmlTmp.push(
      tmp2[0]+" "+
      tmp2[1]+" "+
      tmp2[2]+" "+
      tmp2[3]+" "+
      tmp2[4]
    );
  } else if (tmp.match(tmpRE2)) {
    // #aaa#kwa#a#a
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8,
      RegExp.$9
    ];
    result=tmp2[0];
    result+=to012abcString(tmp2[1]);
    result+=tmp2[2];
    if (tmp2[3].match(/^([01][0-9]|2[0-5])+$/)) {
      result+=to012abcString(tmp2[3]);
    } else {
      result+=tmp2[3];
    }
    result+=to012abcString(tmp2[4]);
    result+=tmp2[5];
    result+=to012abcString(tmp2[6]);
    result+=tmp2[7];
    result+=to012abcString(tmp2[8]);
    htmlTmp.push(
      tmp2[0]+" "+
      tmp2[1]+" "+
      tmp2[2]+" "+
      tmp2[3]+" "+
      tmp2[4]+" "+
      tmp2[5]+" "+
      tmp2[6]+" "+
      tmp2[7]+" "+
      tmp2[8]
    );
  } else if (tmp.match(tmpRE3)) {
    // kw#aa##aa#
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6
    ];
    if (tmp2[0].match(/^([01][0-9]|2[0-5])+$/)) {
      result=to012abcString(tmp2[0]);
    } else {
      result=tmp2[0];
    }
    result+=tmp2[1];
    result+=to012abcString(tmp2[2]);
    result+=tmp2[3];
    result+=to012abcString(tmp2[4]);
    result+=tmp2[5];
    htmlTmp.push(
      tmp2[0]+" "+
      tmp2[1]+" "+
      tmp2[2]+" "+
      tmp2[3]+" "+
      tmp2[4]+" "+
      tmp2[5]
    );
  } else if (tmp.match(tmpRE4)) {
    // aaaaaaaa#kw#
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4
    ];
    result=to012abcString(tmp2[0]);
    result+=tmp2[1];
    if (tmp2[2].match(/^([01][0-9]|2[0-5])+$/)) {
      result+=to012abcString(tmp2[2]);
    } else {
      result+=tmp2[2];
    }
    result+=tmp2[3];
    htmlTmp.push(
      tmp2[0]+" "+
      tmp2[1]+" "+
      tmp2[2]+" "+
      tmp2[3]
    );
  } else if (tmp.match(tmpRE5)) {
    // a#a#kwa#aa
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=to012abcString(tmp2[0]);
    result+=tmp2[1];
    result+=to012abcString(tmp2[2]);
    result+=tmp2[3];
    if (tmp2[4].match(/^([01][0-9]|2[0-5])+$/)) {
      result+=to012abcString(tmp2[4]);
    } else {
      result+=tmp2[4];
    }
    result+=to012abcString(tmp2[5]);
    result+=tmp2[6];
    result+=to012abcString(tmp2[7]);
    htmlTmp.push(
      tmp2[0]+" "+
      tmp2[1]+" "+
      tmp2[2]+" "+
      tmp2[3]+" "+
      tmp2[4]+" "+
      tmp2[5]+" "+
      tmp2[6]+" "+
      tmp2[7]
    );
  }
  htmlCode(result);
}
}
if (TEXT.match(/^[0-9]{10,}$/)) {
  htmlTmp.push("<b>(数字から強制フォーマット)</b>");
  forceFormat(TEXT);
  htmlTmp.push("--------------");
  htmlTmp.push("(reverse)");
  forceFormat(strReverse(TEXT));
  htmlTmp.push("--------------");
  htmlTmp.push("(atbash)");
  forceFormat(atbash19(TEXT));
  htmlTmp.push("--------------");
  htmlTmp.push("(reverse & atbash)");
  forceFormat(
    atbash19(strReverse(TEXT)));
  htmlTmp.push("==============");
}

// symbolから強制フォーマット
if (TEXT.match(/^[!@#$%^&*()]{10,}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(symbolから強制フォーマット)</b>");
  var tmp=symbol2Num(TEXT);
  htmlTmp.push(tmp);
  var result="";
  
  // aaa##kw###aa
  var tmpRE1=
    new RegExp("^([01][0-9]|2[0-5])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([2-9][2-9])([0-9])([2-9][2-9][2-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])$");
    
  // #aaa#kwa#a#a
  var tmpRE2=
    new RegExp("^([2-9])((?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5]))([2-9])([0-9])([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])$");
  
  // kw#aa##aa#
  var tmpRE3=
    new RegExp("^([0-9])([0-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([0-9][0-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([0-9])$");
  
  // aaaaaaaa#kw#
  var tmpRE4=
    new RegExp("^((?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5]))([0-9])([0-9])([0-9])$");

  if (tmp.match(tmpRE1)) {
    // aaa##kw###aa
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      to012abcString(tmp2[0])+
      to012abcString(tmp2[1])+
      to012abcString(tmp2[2])+
      tmp2[3]+
      num2Symbol(tmp2[4])+
      tmp2[5]+
      to012abcString(tmp2[6])+
      to012abcString(tmp2[7]);
  } else if (tmp.match(tmpRE2)) {
    // #aaa#kwa#a#a
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      tmp2[0]+
      to012abcString(tmp2[1])+
      tmp2[2]+
      num2Symbol(tmp2[3])+
      to012abcString(tmp2[4])+
      tmp2[5]+
      to012abcString(tmp2[6])+
      tmp2[7]+
      to012abcString(tmp2[8]);
  } else if (tmp.match(tmpRE3)) {
    // kw#aa##aa#
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      num2Symbol(tmp2[0])+
      tmp2[1]+
      to012abcString(tmp2[2])+
      to012abcString(tmp2[3])+
      tmp2[4]+
      to012abcString(tmp2[5])+
      to012abcString(tmp2[6])+
      tmp2[7];
  } else if (tmp.match(tmpRE4)) {
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      to012abcString(tmp2[0])+
      mp2[1]+
      num2Symbol(tmp2[2])+
      tmp2[3];
  }
  
  htmlTmp.push(result);
  if (result.match(/@/)) {
    htmlCode(
      result.replace(/@/,"search"));
    htmlCode(
      result.replace(/@/,"unbounded"));
  } else if (result.match(/\^/)) {
    htmlCode(
      result.replace(/\^/,"attack"));
    htmlCode(
      result.replace(/\^/,"more"));
    htmlCode(
      result.replace(/\^/,"war"));
    htmlCode(
      result.replace(/\^/,"grow"));
    htmlCode(
      result.replace(/\^/,"die"));
  }

  htmlTmp.push("==============");
}


// 2～5/6～9でバイナリ
if (
  TEXT.match(/^[2-9]{5,}$/) && 
  TEXT.match(/[2-5]/) && 
  TEXT.match(/[6-9]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(2～5/6～9でバイナリ)</b>");
  var tmp=TEXT.replace(/[2-5]/g, "0");
  tmp=tmp.replace(/[6-9]/g, "1");
  htmlTmp.push(tmp);
  goBinary(tmp);
  htmlTmp.push("==============");
}

// 大文字と小文字でモールス
if (
  TEXT.match(/^([a-zA-Z]{1,5}[\s.,\/\\|\-:]){5,}[a-zA-Z]+$/) && 
  TEXT.match(/[a-z]/) && 
  TEXT.match(/[A-Z]/) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<span style='color: red'><b>(大文字と小文字でモールス)</b></span>");
  var tmp=TEXT.replace(/[.,\/\\|\-:]/g, " ");
  tmp=tmp.replace(/[a-z]/g, ".");
  tmp=tmp.replace(/[A-Z]/g, "-");
  var tmp2=TEXT.replace(/[\s.,\/\\|\-:]/g,"");
  tmp2=tmp2.toLowerCase();
  htmlTmp.push(tmp2);
  htmlTmp.push(tmp);
  goMorse(tmp);
  htmlTmp.push("==============");
}



// binASCII>hexASCII>Base64dec>reverse
if (
  TEXT.match(/^([01]{8}\s*){4,}$/) && 
  TEXT.match(/0/) && 
  TEXT.match(/1/)
) {
  var tmp=
    binASCII(TEXT.replace(/\s/g, ""));
  //alert(tmp);
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(binASCII>hexASCII>Base64dec>reverse)</b>");
  htmlTmp.push("(binASCII)");
  htmlCode(tmp);
  tmp=hexASCII(tmp);
  htmlTmp.push("(more hexASCII)");
  htmlCode(tmp);
  tmp=base64Dec(tmp);
  htmlTmp.push("(more Base64 decode)");
  
  function isPasscode(str) {
    if (
      str &&
      str.match(/^\w{10,}$/) && 
      str.match(/\d/) && 
      str.match(/\d/g).length>=4 && 
      str.match(/[a-z]/i) && 
      str.match(/[a-z]/ig).length>=4
    ) {
      fixCodeList.push(str);
      htmlTmp.push(
        "<a name='"+str+"'></a>");
    }
  }
  
  isPasscode(tmp);
  htmlCode(tmp);
  tmp=strReverse(tmp);
  htmlTmp.push("(more reverse)");
  isPasscode(tmp);
  htmlCode(tmp);
  htmlTmp.push("==============");
}

//atbash > abc123 > atbash > decASCII
if (
  TEXT.match(/^[a-z]{10,}$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(atbash > abc123 > atbash > decASCII)</b>");
  var tmp=atbash19(TEXT);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  tmp=abc123(tmp);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  tmp=atbash19(tmp);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  // tmp=decASCII(tmp);
  // htmlCode(tmp);
  // htmlCode(strReverse(tmp));
  htmlTmp.push("==============");
}


//atbash > abc012 > atbash > decASCII
if (
  TEXT.match(/^[a-z]{10,}$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(atbash > abc012 > atbash > decASCII)</b>");
  var tmp=atbash19(TEXT);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  tmp=abc012(tmp);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  tmp=atbash19(tmp);
  htmlCode(tmp);
  htmlCode(strReverse(tmp));
  // tmp=decASCII(tmp);
  // htmlCode(tmp);
  // htmlCode(strReverse(tmp));
  htmlTmp.push("==============");
}


// タロットカード番号
var tmpRE=new RegExp("^(MAGICIAN|BATELEUR|PAPESS|(HIGH)?PRIESTESS|PAPESSE|EMPRESS|IMPERATRICE|EMPEROR|EMPEREUR|POPE|HIEROPHANT|PAPE|LOVERS|AMOUREUX|CHARIOT|STRENGTH|FORTITUDE|FORCE|HERMIT|ERMITE|WHEEL|ROUE|FORTUNE|JUSTICE|HANGED(MAN)?|PENDU|DEATH|MORT|TEMPERANCE|DEVIL|DIABLE|TOWER|MAISON(dieu)?|STAR|ETOILE|MOON|LUNE|SUN|SOLEIL|JUDGEMENT|JUGEMENT|WORLD|MONDE|FOOL|FOU)+$", "i");
if (
  TEXT.match(tmpRE) || 
  atbash19(TEXT).match(tmpRE)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(タロットカード番号)</b>");
  var tmp=tarotNums(TEXT);
  if (!tmp) {
    var atbText=atbash19(TEXT);
    htmlTmp.push("(atbash)");
    htmlTmp.push(atbText);
    tmp=tarotNums(atbText);
  }
  var tmp2=[];
  var futaketa=false;
  for (var j in tmp) {
    if (tmp[j][1]>9) {
      futaketa=true;
      break;
    }
  }
  
  for (var j in tmp) {
    if (futaketa && tmp[j][1]<=9) {
      tmp[j][1]="0"+tmp[j][1];
    }
    if (tmp[j][0]) {
      htmlTmp.push(
        tmp[j][0]+": "+tmp[j][1]);
      if (tmp[j][1]>0) {
        tmp2.push(tmp[j][1]);
      } else {
        tmp2.push(tmp[j][0]);
      }
    }
  }
  htmlTmp.push("---");
  htmlCode(tmp2.join(" "));
  htmlCode(tmp2.join(""));
  htmlTmp.push("==============");
}



// 10進を16進に変換してBase64化
// 12 4 13 2 1 14 13 1 14 6 10 0 10 13 14 11 15 5 9 2
if (TEXT.match(/^((0?[0-9]|1[0-5])[\s|.,/\\\-]*){2,}(0?[0-9]|1[0-5])$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(10進を16進に変換してBase64化)</b>");
  var tmp=TEXT.split(/[\s|.,/\\\-]/ig);
  var result1=[];
  var result2=[];
  for (var i in tmp) {
    result1.push(parseInt(tmp[i],10));
    result2.push(
      parseInt(tmp[i],10).toString(16));
  }
  htmlTmp.push(result1.join(", "));
  htmlTmp.push(result2.join(""));
  //htmlTmp.push(base64Enc(result2, "16"));
  htmlTmp.push("==============");
}

// 10進を16進に変換
// 12 4 13 2 1 14 13 1 14 6 10 0 10 13 14 11 15 5 9 2
if (TEXT.match(/^((0?[0-9]|1[0-5])[\s|.,/\\\-]*){2,}(0?[0-9]|1[0-5])$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(10進を16進に変換)</b>");
  var tmp=TEXT.split(/[\s|.,/\\\-]/ig);
  var result1=[];
  var result2=[];
  for (var i in tmp) {
    result1.push(parseInt(tmp[i],10));
    result2.push(
      parseInt(tmp[i],10).toString(16));
  }
  htmlTmp.push(result1.join(", "));
  htmlCode(result2.join(""));
  htmlTmp.push("==============");
}


// 前後がそれぞれdecASCIIかhexASCIIかoctASCII
// DEC: 48-57(0-9), 65-90(A-Z), 97-122(a-z)
// OCT: 60-71(0-9), 101-132(A-Z), 141-172(a-z)
// HEX: 30-39(0-9), 41-5a(A-Z), 61-7a(a-z)

var tmpDec=
  "(0?4[89]|0?5[0-7]|0?6[5-9]|[78][0-9]|0?9[07-9]|1[01][0-9]|12[0-2]){5}";
  
var tmpOct=
  "(0?6[0-7]|0?7[01]|10[1-7]|1[1-2][0-7]|13[0-2]|14[1-7]|1[56][0-7]|17[0-2]){5}";

var tmpHex=
  "(3[0-9]|4[1-9a-f]|5[0-9a]|6[1-9a-f]|7[0-9a]){5}";

var tmpREf=new RegExp(
  "^("+tmpDec+"|"+
  tmpOct+"|"+
  tmpHex+")",
  "i"
);
var tmpREe=new RegExp(
  "("+tmpDec+"|"+
  tmpOct+"|"+
  tmpHex+")$",
  "i"
);
if (
  TEXT.match(tmpREf) || 
  TEXT.match(tmpREe)
) {
  var tmpF=TEXT.match(tmpREf);
  var tmpE=TEXT.match(tmpREe);
  var tmpM=TEXT.replace(tmpREf, "");
  tmpM=tmpM.replace(tmpREe, "");
  
  if (tmpF && tmpM && tmpE) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(前後がそれぞれdecASCIIかhexASCIIかoctASCII)</b>");
    var result=[];
    var tmpREd=
      new RegExp(tmpDec,"i");
    var tmpREo=
      new RegExp(tmpOct,"i");
    var tmpREh=
      new RegExp(tmpHex,"i");
  
  if (tmpF[0].match(tmpREd)) {
    htmlTmp.push("---前半decASCII---");
    result.push(decASCII(tmpF[0]));
  } else if (tmpF[0].match(tmpREo)) {
    htmlTmp.push("---前半octASCII---");
    result.push(octASCII(tmpF[0]));
  } else if (tmpF[0].match(tmpREh)) {
    htmlTmp.push("---前半hexASCII---");
    result.push(hexASCII(tmpF[0]));
  }
  htmlTmp.push(tmpF[0]);
  htmlTmp.push(result[0]);
  
  htmlTmp.push("---中間(kw部分)---");
  result.push(tmpM);
  htmlTmp.push(result[1]);
  
  if (tmpE[0].match(tmpREd)) {
    htmlTmp.push("---後半decASCII---");
    result.push(decASCII(tmpE[0]));
  } else if (tmpE[0].match(tmpREo)) {
    htmlTmp.push("---後半octASCII---");
    result.push(octASCII(tmpE[0]));
  } else if (tmpE[0].match(tmpREh)) {
    htmlTmp.push("---後半hexASCII---");
    result.push(hexASCII(tmpE[0]));
  }
  htmlTmp.push(tmpE[0]);
  htmlTmp.push(result[2]);
  
  htmlCode(result.join(""));
  
  }
  htmlTmp.push("==============");
}

/*
// 同じ文字列長の3行をジグザク読み
var tmp=TEXT.split(/\n/g);
if (
  tmp && tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行をジグザク読み)</b>");
  
  function threeLineZigzag(arry) {
    if (arry.length==3 && 
      arry[0].length==arry[1].length && 
      arry[1].length==arry[2].length
    ) {
      
      //debug(arry);
      arry=rectReflect(arry);
      //debug(arry);

      htmlTmp.push(arry.join("\n"));
      
      debug(arry[0]);
      
      var result=[];
      var x0=2; // 0<2>4
      var x1=3; // 1<3>5
      var x2=4; // 2<4>6
      for (var i in arry) {
        result[0].push(arry[i][x0]);
        result[1].push(arry[i][x1]);
        result[2].push(arry[i][x2]);
        if (x0) {

        } else if () {

        } else {

        }
      }
      htmlCode(result[0].join(""));      
      htmlCode(result[1].join(""));      
      htmlCode(result[2].join(""));      
    }
    htmlTmp.push("-----------------");
  }
  
  var tmpjoin=[tmp[0], tmp[1], tmp[2]];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineZigzag(tmpjoin);
  
  var tmpjoin=[tmp[0], tmp[2], tmp[1]];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineZigzag(tmpjoin);
  
  var tmpjoin=[tmp[1], tmp[0], tmp[2]];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineZigzag(tmpjoin);
  
  var tmpjoin=[tmp[1], tmp[2], tmp[0]];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineZigzag(tmpjoin);
  
  var tmpjoin=[tmp[2], tmp[0], tmp[1]];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineZigzag(tmpjoin);
  
  var tmpjoin=[tmp[2], tmp[1], tmp[0]];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineZigzag(tmpjoin);
 
  htmlTmp.push("==============");
}
*/


// 同じ文字列長の3行を縦読み
var tmp=TEXT.split(/\n/g);
if (
  tmp && tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を縦読み)</b>");
  
  function threeLineTateyomi(arry) {
    if (arry.length==3 && 
      arry[0].length==arry[1].length && 
      arry[1].length==arry[2].length
    ) {
      
      //debug(rect);
      htmlTmp.push(arry.join("\n"));
      
      htmlTmp.push("(縦読み)");
      var result=[];
      for (var i in arry[0]) {
        result.push(arry[0][i]);
        result.push(arry[1][i]);
        result.push(arry[2][i]);
      }
      htmlCode(result.join(""));
      
      htmlTmp.push("-------");
      
      htmlTmp.push("(2行目reverse縦読み)");
      var result=[];
      arry[1]=strReverse(arry[1]);
      for (var i in arry[0]) {
        result.push(arry[0][i]);
        result.push(arry[1][i]);
        result.push(arry[2][i]);
      }
      htmlCode(result.join(""));
      
      htmlTmp.push("-------");
      
    }
    htmlTmp.push("-----------------");
  }
  
  var tmpjoin=[tmp[0], tmp[1], tmp[2]];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineTateyomi(tmpjoin);
  
  var tmpjoin=[tmp[0], tmp[2], tmp[1]];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineTateyomi(tmpjoin);
  
  var tmpjoin=[tmp[1], tmp[0], tmp[2]];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineTateyomi(tmpjoin);
  
  var tmpjoin=[tmp[1], tmp[2], tmp[0]];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineTateyomi(tmpjoin);
  
  var tmpjoin=[tmp[2], tmp[0], tmp[1]];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineTateyomi(tmpjoin);
  
  var tmpjoin=[tmp[2], tmp[1], tmp[0]];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineTateyomi(tmpjoin);
 
  htmlTmp.push("==============");
}



// 同じ文字列長の3行を3列へrect
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を3列へrect)</b>");
  
  function threeLineRectRead(str) {
    if (str.length%3==0) {
      var rect=[];
      var tmps=str.match(/.{3}/g);
      for (var i in tmps) {
        rect[i]=[];
        for (var j=0; j<3; j++) {
          rect[i].push(tmps[i][j]);
        }
      }
      //debug(rect);
      htmlTmp.push(rect.join("\n"));
      
      htmlTmp.push("(Rect3縦読み)");
      var result0=[];
      var result1=[];
      var result2=[];
      for (var i in rect) {
        result0.push(rect[i][0]);
        result1.push(rect[i][1]);
        result2.push(rect[i][2]);
      }
      htmlCode(result0.join(""));
      htmlCode(result1.join(""));
      htmlCode(result2.join(""));
      
      htmlTmp.push("-------");
      
      htmlTmp.push("(2列目縦読み、1と3列目ジグザグ縦読み)");
      var result0=[];
      var result1=[];
      var result2=[];
      for (var i in rect) {
        if (i%2==0) { 
          result0.push(rect[i][0]);
        } else {
          result0.push(rect[i][2]);
        }
        result1.push(rect[i][1]);
        if (i%2==0) { 
          result2.push(rect[i][2]);
        } else {
          result2.push(rect[i][0]);
        }
      }
      htmlCode(result0.join(""));
      htmlCode(result1.join(""));
      htmlCode(result2.join(""));
      
    }
    htmlTmp.push("-----------------");
  }
  
  var tmpjoin=tmp[0]+tmp[1]+tmp[2];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=tmp[0]+tmp[2]+tmp[1];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[0]+tmp[2];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[2]+tmp[0];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[0]+tmp[1];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[1]+tmp[0];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  // ===========
  // reverse
  
  var tmpjoin=
    tmp[0]+strReverse(tmp[1])+tmp[2];
  htmlTmp.push("([1] reverse[2] [3]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=
    tmp[0]+strReverse(tmp[2])+tmp[1];
  htmlTmp.push("([1] reverse[3] [2]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=
    tmp[1]+strReverse(tmp[0])+tmp[2];
  htmlTmp.push("([2] reverse[1] [3]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=
    tmp[1]+strReverse(tmp[2])+tmp[0];
  htmlTmp.push("([2] reverse[3] [1]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=
    tmp[2]+strReverse(tmp[0])+tmp[1];
  htmlTmp.push("([3] reverse[1] [2]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  var tmpjoin=
    tmp[2]+strReverse(tmp[1])+tmp[0];
  htmlTmp.push("([3] reverse[2] [1]の順に連結)");
  threeLineRectRead(tmpjoin);
  
  
  /*
  var tmp=TEXT.replace(/[]/ig, "0");
  var result=[];
  for (var i in tmp) {
    result.push(tmp[i]);
  }
  htmlTmp.push("");
  htmlCode(result.join(""));
  */
  htmlTmp.push("==============");
}

// 同じ文字列長の3行をvig autokey
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行をvig autokey)</b>");
  
  function threeLineAutokey(str, str2) {
    if (str.length%3==0) {
      htmlTmp.push("(autokey: "+str2+")");
      var tmp3line=
        vigenereAutoDec(str, str2);
        
      var tmp3lineRE=
        new RegExp(".{"+str.length/3+"}", "g");
      var tmps=
        tmp3line.match(tmp3lineRE);
      htmlCode(tmps.join(""));
      htmlCode(tmps[0]);
      htmlCode(tmps[1]);
      htmlCode(tmps[2]);
    }
  }
  
  var tmpjoin=tmp[0]+tmp[1]+tmp[2];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[2]);
  
  var tmpjoin=tmp[0]+tmp[2]+tmp[1];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[1]);
  
  var tmpjoin=tmp[1]+tmp[0]+tmp[2];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[2]);
  
  var tmpjoin=tmp[1]+tmp[2]+tmp[0];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[0]);
  
  var tmpjoin=tmp[2]+tmp[0]+tmp[1];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[1]);
  
  var tmpjoin=tmp[2]+tmp[1]+tmp[0];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineAutokey(tmpjoin, tmp[0]);
  
 htmlTmp.push("==============");
}


// 同じ文字列長の3行を次々にvig
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行を次々にvig)</b>");
  
  function threeLineVig(str) {
    if (str.length%3==0) {
      var strAryRE=new RegExp(
        ".{"+str.length/3+"}", "g");
      var strAry=str.match(strAryRE);
      var tmp3line=[];
      tmp3line[0]=strAry[0];
      tmp3line[1]=
        vigenereDec(strAry[1], strAry[0]);
      tmp3line[2]=
        vigenereDec(strAry[2], strAry[1]);
      htmlCode(tmp3line.join(""));
      tmp3line.forEach(v=>htmlCode(v));

    }
  }
  
  var tmpjoin=tmp[0]+tmp[1]+tmp[2];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineVig(tmpjoin);
  
  var tmpjoin=tmp[0]+tmp[2]+tmp[1];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineVig(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[0]+tmp[2];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineVig(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[2]+tmp[0];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineVig(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[0]+tmp[1];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineVig(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[1]+tmp[0];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineVig(tmpjoin);
  
  htmlTmp.push("==============");
}


// 同じ文字列長の3行から1つを他で2回vig
var tmp=TEXT.split(/\n/g);
if (
  tmp.length==3 &&
  tmp[0].length==tmp[1].length &&
  tmp[1].length==tmp[2].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(同じ文字列長の3行から1つを他で2回vig)</b>");
  
  function threeLineVig2(str) {
    if (str.length%3==0) {
      var strAryRE=new RegExp(
        ".{"+str.length/3+"}", "g");
      var strAry=str.match(strAryRE);
      var tmp3line=[];
      tmp3line[0]=vigenereDec(strAry[0], strAry[1]);
      tmp3line[0]=vigenereDec(tmp3line[0], strAry[2]);
      tmp3line[1]=vigenereDec(strAry[1], strAry[2]);
      tmp3line[1]=vigenereDec(tmp3line[1], strAry[0]);
      tmp3line[2]=vigenereDec(strAry[2], strAry[0]);
      tmp3line[2]=vigenereDec(tmp3line[2], strAry[1]);
      htmlCode(tmp3line.join(""));
      tmp3line.forEach(v=>htmlCode(v));
    }
  }
  
  var tmpjoin=tmp[0]+tmp[1]+tmp[2];
  htmlTmp.push("([1] [2] [3]の順に連結)");
  threeLineVig2(tmpjoin);
  
  var tmpjoin=tmp[0]+tmp[2]+tmp[1];
  htmlTmp.push("([1] [3] [2]の順に連結)");
  threeLineVig2(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[0]+tmp[2];
  htmlTmp.push("([2] [1] [3]の順に連結)");
  threeLineVig2(tmpjoin);
  
  var tmpjoin=tmp[1]+tmp[2]+tmp[0];
  htmlTmp.push("([2] [3] [1]の順に連結)");
  threeLineVig2(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[0]+tmp[1];
  htmlTmp.push("([3] [1] [2]の順に連結)");
  threeLineVig2(tmpjoin);
  
  var tmpjoin=tmp[2]+tmp[1]+tmp[0];
  htmlTmp.push("([3] [2] [1]の順に連結)");
  threeLineVig2(tmpjoin);
  
  htmlTmp.push("==============");
}


// 階段反転読み出し
// yqjb34nosonj375
var max=TEXT.length;
var TEXTrev=strReverse(TEXT);
var result=[];
var resultRev=[];
var n=0;
for (var i=1; i<=max-n; i++) {
  var m=n+i;
  result.push(
    strReverse(TEXT.slice(n, m)));
  resultRev.push(
    TEXTrev.slice(n, m));
  n=m;
}

if (m==max) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(階段反転読み出し)</b>");
  htmlTmp.push(result.join("\n"));
  htmlCode(result.join(""));
  htmlTmp.push("--------------");
  resultRev.reverse();
  htmlTmp.push(resultRev.join("\n"));
  htmlCode(resultRev.join(""));
  htmlTmp.push("==============");
}


// symbolから強制フォーマット
if (TEXT.match(/^[!@#$%^&*()]{10,}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(symbolから強制フォーマット)</b>");
  var tmp=symbol2Num(TEXT);
  htmlTmp.push(tmp);
  var result="";
  
  // aaa##kw###aa
  var tmpRE1=
    new RegExp("^([01][0-9]|2[0-5])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([2-9][2-9])([0-9])([2-9][2-9][2-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])$");
    
  // #aaa#kwa#a#a
  var tmpRE2=
    new RegExp("^([2-9])((?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5]))([2-9])([0-9])([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])([2-9])([01][0-9]|2[0-5])$");
  
  // kw#aa##aa#
  var tmpRE3=
    new RegExp("^([0-9])([0-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([0-9][0-9])([01][0-9]|2[0-5])([01][0-9]|2[0-5])([0-9])$");
  
  // aaaaaaaa#kw#
  var tmpRE4=
    new RegExp("^((?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5])(?:[01][0-9]|2[0-5]))([0-9])([0-9])([0-9])$");

  if (tmp.match(tmpRE1)) {
    // aaa##kw###aa
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      to012abcString(tmp2[0])+
      to012abcString(tmp2[1])+
      to012abcString(tmp2[2])+
      tmp2[3]+
      num2Symbol(tmp2[4])+
      tmp2[5]+
      to012abcString(tmp2[6])+
      to012abcString(tmp2[7]);
  } else if (tmp.match(tmpRE2)) {
    // #aaa#kwa#a#a
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      tmp2[0]+
      to012abcString(tmp2[1])+
      tmp2[2]+
      num2Symbol(tmp2[3])+
      to012abcString(tmp2[4])+
      tmp2[5]+
      to012abcString(tmp2[6])+
      tmp2[7]+
      to012abcString(tmp2[8]);
  } else if (tmp.match(tmpRE3)) {
    // kw#aa##aa#
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      num2Symbol(tmp2[0])+
      tmp2[1]+
      to012abcString(tmp2[2])+
      to012abcString(tmp2[3])+
      tmp2[4]+
      to012abcString(tmp2[5])+
      to012abcString(tmp2[6])+
      tmp2[7];
  } else if (tmp.match(tmpRE4)) {
    var tmp2=[
      RegExp.$1,
      RegExp.$2,
      RegExp.$3,
      RegExp.$4,
      RegExp.$5,
      RegExp.$6,
      RegExp.$7,
      RegExp.$8
    ];
    result=
      to012abcString(tmp2[0])+
      mp2[1]+
      num2Symbol(tmp2[2])+
      tmp2[3];
  }
  
  htmlTmp.push(result);
  if (result.match(/@/)) {
    htmlCode(
      result.replace(/@/,"search"));
    htmlCode(
      result.replace(/@/,"unbounded"));
  } else if (result.match(/\^/)) {
    htmlCode(
      result.replace(/\^/,"attack"));
    htmlCode(
      result.replace(/\^/,"more"));
    htmlCode(
      result.replace(/\^/,"war"));
    htmlCode(
      result.replace(/\^/,"grow"));
    htmlCode(
      result.replace(/\^/,"die"));
  }

  htmlTmp.push("==============");
}



// asciiDec > force HexASCII
// KO?&!FHBE%A!"$F=
var tmp=asciiDec(TEXT);
if (tmp.match(/^((3[0-9]|4[1-9]|5[0-9]|6[1-9]|7[0-9])\s?)+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(asciiDec > force hexASCII)</b>");
  htmlTmp.push(tmp);
  htmlCode(hexASCII(tmp));
  htmlTmp.push("==============");
}


// 100から引く
if (
  TEXT.match(/^(c\d{1,3})+$/i) || 
  TEXT.match(/^c?[./\\|\-:]?(\d{3})+$/i)
) {
  var tmp=TEXT.match(/\d{1,3}/ig);
  var result=[];
  for (var i in tmp) {
    result[i]=100-Number(tmp[i]);
    if (String(result[i]).length==2) {
        result[i]="0"+result[i];
    } else if (String(result[i]).length==1) {
        result[i]="00"+result[i];
    }
  }
  htmlTmp.push(TEXT);
  htmlCode(tmp.join(" "));
  htmlTmp.push(
    "<b>(C'100'から引く)</b>");
  htmlCode(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}

// 500から引く
// d398d384d390d443d449d385d401d383d392d388d384d383d386d399d443d444d450d394d397
// d398384390443449385401383392388384383386399443444450394397
if (
  TEXT.match(/^(d\d{1,3})+$/i) || 
  TEXT.match(/^d?[./\\|\-:]?(\d{3})+$/i)
) {
  var tmp=TEXT.match(/\d{1,3}/ig);
  var result=[];
  for (var i in tmp) {
    result[i]=500-Number(tmp[i]);
    if (String(result[i]).length==2) {
        result[i]="0"+result[i];
    } else if (String(result[i]).length==1) {
        result[i]="00"+result[i];
    }
  }
  htmlTmp.push(TEXT);
  htmlCode(tmp.join(" "));
  htmlTmp.push(
    "<b>(D'500'から引く)</b>");
  htmlCode(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}

// 1000から引く
// m92m22m475m933m174m35m153m614m305m243m463m920
// m092022475933174035153614305243463920
if (
  TEXT.match(/^(m\d{1,3})+$/i) || 
  TEXT.match(/^m?[./\\|\-:]?(\d{3})+$/i)
) {
  var tmp=TEXT.match(/\d{1,3}/ig);
  var result=[];
  for (var i in tmp) {
    result[i]=1000-Number(tmp[i]);
    if (String(result[i]).length==2) {
        result[i]="0"+result[i];
    } else if (String(result[i]).length==1) {
        result[i]="00"+result[i];
    }
  }
  htmlTmp.push(TEXT);
  htmlCode(tmp.join(" "));
  htmlTmp.push(
    "<b>(M'1000'から引く)</b>");
  htmlCode(result.join(" "));
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}

// Run Length
if (
  TEXT.match(/^([1-9]+\s*){2,}$/i) && 
  kouseimoji.length>=2
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(1～9の数字のみ)</b>");
  runLength(TEXT.replace(/\s+/g, ""));
  htmlTmp.push("==============");
}

// 数字部で文字をvig
if (
  TEXT.match(/^\d{5}[a-z]+$/i) || 
  TEXT.match(/^[a-z]+\d{5}$/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字部で文字をvigenere)</b>");
  var tmp=TEXT.match(/(\d+|[a-z]+)/ig);
  var result=[];
  if (tmp[0].match(/\d/)) {
    tmp[2]=vigenereDec(tmp[1], tmp[0]);
    tmp[3]=
      vigenereAutoDec(tmp[1], tmp[0]);
    htmlCode(tmp[0]);
    htmlCode(tmp[2]);
    htmlTmp.push("-------");
    htmlTmp.push("(vigenere auto key)");
    htmlCode(tmp[0]);
    htmlCode(tmp[3]);
  } else {
    tmp[2]=vigenereDec(tmp[0], tmp[1]);
    tmp[3]=
      vigenereAutoDec(tmp[0], tmp[1]);
    htmlCode(tmp[2]);
    htmlCode(tmp[1]);
    htmlTmp.push("-------");
    htmlTmp.push("(vigenere auto key)");
    htmlCode(tmp[3]);
    htmlCode(tmp[1]);
  }
  htmlTmp.push("==============");
}


/*
// 全てがローマ数字
if (TEXT.match(/^[mdclxvi\s]+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(全てがローマ数字)</b>");
  var tmp=romanNums(TEXT);
  var result=[];
  for (var i in tmp) {
    htmlTmp.push(
      tmp[i][0]+": "+tmp[i][1]);
    result.push(tmp[i][1]);
  }
  htmlTmp.push("連結");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/

// 全てがローマ数字　
if ((TEXT.match(/^([mdclxvi]+[\s\.,\/\\\|\-]?)+$/i) || TEXT.match(/^([nwxocer]+[\s\.,\/\\\|\-]?)+$/i) || TEXT.match(/^([zqpykiv]+[\s\.,\/\\\|\-]?)+$/i)) && kouseimoji.length>=3 && TEXT.length>=5) {
  htmlTmp.push(
    "<a name='romannum'><b>(全てがローマ数字)</b></a>");
  htmlTmp.push(TEXT);
  var str=TEXT;
  if (TEXT.match(/^[nwxocer\s]+$/i)) {
    str=atbash(TEXT);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  } else if (TEXT.match(/^[zqpykiv\s]+$/i)) {
    str=rotN(TEXT,"+13");
    htmlTmp.push("(Rot 13)");
    htmlTmp.push(str);
  }

  var tmp=romanNums(str);
  var result=[];
  for (var i in tmp) {
    htmlTmp.push(
      tmp[i][0]+": "+tmp[i][1]);
    result.push(tmp[i][1]);
  }
  htmlTmp.push("連結");
  var result=result.join("");
  htmlCode(result);
  var result=decASCII(result);
  if(result.match(/^[a-z0-9]+$/i)){
    htmlTmp.push("more atbash");  
    htmlCode(atbash(result));  
    htmlTmp.push("more reverse");  
    htmlCode(strReverse(result));    
  }
  htmlTmp.push("--------------");
  htmlTmp.push("<b>(reverseして全てがローマ数字)</b>");
  var tmp=romanNums(strReverse(str));
  var result=[];
  for (var i in tmp) {
    htmlTmp.push(
      tmp[i][0]+": "+tmp[i][1]);
    result.push(tmp[i][1]);
  }
  htmlTmp.push("連結");
  var result=result.join("");
  htmlCode(result);
  var result=decASCII(result);
  if(result.match(/^[a-z0-9]+$/i)){
    htmlTmp.push("more atbash");  
    htmlCode(atbash(result));  
    htmlTmp.push("more reverse");  
    htmlCode(strReverse(result));    
  }
  htmlTmp.push("==============");
}

// 全てがN×ローマ数字
//if ((TEXT.match(/^((\d*[mdclxvi])+[\s\.,\/\\\|\-]?)+$/i) || TEXT.match(/^((\d*[nwxocer])+[\s\.,\/\\\|\-]?)+$/i)) && TEXT.match(/\d/) && kouseimoji.length>=4 && TEXT.length>=5) {
if (
  (
    (
      TEXT.match(/^(([2-9]|[1-9][0-9])?[MDCLXVI][\s\.,\/\|\\\-]?)+$/i) && 
      !TEXT.match(/([MDCLXVI])\1/i)
    ) || (
      TEXT.match(/^((\d*)?[nwxocer][\s\.,\/\|\\\-]?)+$/i) && 
      !TEXT.match(/([nwxocer])\1/i)
    )
  ) && TEXT.match(/\d/) && kouseimoji.length>=4 && TEXT.length>=5
) {
  htmlTmp.push(TEXT);
  var str=TEXT;
  if (TEXT.match(/^((\d*[nwxocer])+[\s\.,\/\\\|\-]?)+$/i)) {
    str=atbash19(TEXT);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  }
  htmlTmp.push(
    "<b>(全てがN×ローマ数字)</b>");
  str=str.replace(/(\d+)([mdclxvi])/ig,
    function (match, p1, p2, p3, offset, string) {
      var myNum=Number(p1);
      var myLetter=p2;
      var newLetter=p2;
      //debug(myNum+" × "+myLetter);
      for (var i=2; myNum>=i; i++) {
        newLetter+=myLetter;
      }
      //debug(newLetter);
      return newLetter;
    });
  
  //debug(str);
  var tmp=romanNums(str);
  var result=[];
  for (var i in tmp) {
    htmlTmp.push(
      tmp[i][0]+": "+tmp[i][1]);
    result.push(tmp[i][1]);
  }
  htmlTmp.push("連結");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// 0区切り、シンボルと数字でモールス
if (TEXT.match(
  /^([1-9!@#$%^&*()]{1,5}0){9,}[1-9!@#$%^&*()]{1,5}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(0区切り、シンボルと数字でモールス)</b>");
  var tmp=TEXT.split(/0/g);
  htmlTmp.push(tmp.join(" "));
  var result=[];
  var result1=[];
  var result2=[];
  for (var i in tmp) {
    result[i]="";
    result1[i]="";
    result2[i]=symbol2Num(tmp[i]);
    for (var j in tmp[i]) {
      if (tmp[i][j].match(/\d/)) {
        result[i]+=".";
        result1[i]+="-";
      } else {
        result[i]+="-";
        result1[i]+=".";
      }
    }
  }
  htmlTmp.push(result.join(" "));
  for (var i in result) {
    result[i]=morseExchange(result[i]);
  }
  htmlCode(result.join(""));
  
  htmlTmp.push("(morse swap)");
  htmlTmp.push(result1.join(" "));
  for (var i in result1) {
    result1[i]=morseExchange(result1[i]);
  }
  htmlCode(result1.join(""));
  
  if (result2.join(" ").match(
    /^(([123]+|[456]+|[789]+)\s)+([123]+|[456]+|[789]+)$/
  )) {
    htmlTmp.push("<b>([123],[456],[789]で分けて大文字小文字数字でBase64デコード)</b>");
    htmlTmp.push(result.join(" "));
    htmlTmp.push(result2.join(" "));
    var tmp1="";
    var tmp2="";
    var tmp3="";
    var tmp4="";
    var tmp5="";
    var tmp6="";
    for (var i in result2) {
      if (result2[i].match(/[123]/)) {
        tmp1+=abc012(result[i]);
        tmp2+=result[i].toLowerCase();
        tmp3+=result[i].toUpperCase();
        tmp4+=abc012(result[i]);
        tmp5+=result[i].toUpperCase();
        tmp6+=result[i].toLowerCase();
      } else if (result2[i].match(/[456]/)) {
        tmp1+=result[i].toLowerCase();
        tmp2+=abc012(result[i]);
        tmp3+=result[i].toLowerCase();
        tmp4+=result[i].toUpperCase();
        tmp5+=abc012(result[i]);
        tmp6+=result[i].toUpperCase();
      } else if (result2[i].match(/[789]/)) {
        tmp1+=result[i].toUpperCase();
        tmp2+=result[i].toUpperCase();
        tmp3+=abc012(result[i]);
        tmp4+=result[i].toLowerCase();
        tmp5+=result[i].toLowerCase();
        tmp6+=abc012(result[i]);
      }
    }
    htmlTmp.push("数字/小文字/大文字");
    htmlTmp.push(tmp1);
    htmlCode(base64Dec(tmp1));
    htmlTmp.push("小文字/数字/大文字");
    htmlTmp.push(tmp2);
    htmlCode(base64Dec(tmp2));
    htmlTmp.push("大文字/小文字/数字");
    htmlTmp.push(tmp3);
    htmlCode(base64Dec(tmp3));
    htmlTmp.push("数字/大文字/小文字");
    htmlTmp.push(tmp4);
    htmlCode(base64Dec(tmp4));
    htmlTmp.push("大文字/数字/小文字");
    htmlTmp.push(tmp5);
    htmlCode(base64Dec(tmp5));
    htmlTmp.push("小文字/大文字/数字");
    htmlTmp.push(tmp6);
    htmlCode(base64Dec(tmp6));
    
    htmlTmp.push("(morse swap)");
    htmlTmp.push(result1.join(" "));
    htmlTmp.push(result2.join(" "));
    var tmp1="";
    var tmp2="";
    var tmp3="";
    var tmp4="";
    var tmp5="";
    var tmp6="";
    for (var i in result2) {
      if (result2[i].match(/[123]/)) {
        tmp1+=abc012(result1[i]);
        tmp2+=result1[i].toLowerCase();
        tmp3+=result1[i].toUpperCase();
        tmp4+=abc012(result1[i]);
        tmp5+=result1[i].toUpperCase();
        tmp6+=result1[i].toLowerCase();
      } else if (result2[i].match(/[456]/)) {
        tmp1+=result1[i].toLowerCase();
        tmp2+=abc012(result1[i]);
        tmp3+=result1[i].toLowerCase();
        tmp4+=result1[i].toUpperCase();
        tmp5+=abc012(result1[i]);
        tmp6+=result1[i].toUpperCase();
      } else if (result2[i].match(/[789]/)) {
        tmp1+=result1[i].toUpperCase();
        tmp2+=result1[i].toUpperCase();
        tmp3+=abc012(result1[i]);
        tmp4+=result1[i].toLowerCase();
        tmp5+=result1[i].toLowerCase();
        tmp6+=abc012(result1[i]);
      }
    }
    htmlTmp.push("数字/小文字/大文字");
    htmlTmp.push(tmp1);
    htmlCode(base64Dec(tmp1));
    htmlTmp.push("小文字/数字/大文字");
    htmlTmp.push(tmp2);
    htmlCode(base64Dec(tmp2));
    htmlTmp.push("大文字/小文字/数字");
    htmlTmp.push(tmp3);
    htmlCode(base64Dec(tmp3));
    htmlTmp.push("数字/大文字/小文字");
    htmlTmp.push(tmp4);
    htmlCode(base64Dec(tmp4));
    htmlTmp.push("大文字/数字/小文字");
    htmlTmp.push(tmp5);
    htmlCode(base64Dec(tmp5));
    htmlTmp.push("小文字/大文字/数字");
    htmlTmp.push(tmp6);
    htmlCode(base64Dec(tmp6));
  }
  htmlTmp.push("==============");
}


// シンボルから素数のindexを得る
if (TEXT.match(/^([!@#$%^&*()]\d*)+$/)) {
  htmlTmp.push(TEXT);
  var tmpL=
    TEXT.match(/[!@#$%^&*()]\d*/g);
  htmlTmp.push(
      "<b>(シンボルで区切って数値へ)</b>");
  htmlTmp.push(tmpL.join(" "));
  for (var i in tmpL) {
    tmpL[i]=symbol2Num(tmpL[i]);
  }
  htmlCode(tmpL.join(" "));
  
  var prmF=1;
  var primeL=[];
  for (var j in tmpL) {
    if (!isPrime(Number(tmpL[j]))) {
      prmF=0;
    } else {
      primeL.push(Number(tmpL[j]));
    }
  }
  if (prmF) {
    htmlTmp.push(
      "<b>(全て素数！ 素数のindexを得る)</b>");
    var result=[];
    var tmp="";
    for (var i in primeL) {
      result.push(
        getPrimeIndex(primeL[i]));
      tmp+=primeL[i]+"["+result[i]+"] ";
    }
    htmlTmp.push(tmp);
    htmlCode(result.join(""));
  }
  htmlTmp.push("==============");
}


// 素数のindexを得る
if (TEXT.match(/\d/)) {
var tmpnumL=TEXT.match(/\d+/g);
var prmF=1;
var primeL=[];
for (var j in tmpnumL) {
  if (!isPrime(Number(tmpnumL[j]))) {
    prmF=0;
  } else {
    primeL.push(Number(tmpnumL[j]));
  }
}
if (prmF && tmpnumL) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(素数のindexを得る)</b>");
  var result=[];
  var tmp="";
  for (var i in primeL) {
    result.push(getPrimeIndex(primeL[i]));
    tmp+=primeL[i]+"["+result[i]+"] ";
  }
  htmlTmp.push(tmp);
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
}


// 01区切り/2468/3579でモールス
if (TEXT.match(
  /^([2-9]{1,5}[01\s]){9,}[2-9]{1,5}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(01\\s区切り/2468/3579でモールス)</b>");
  var tmp=TEXT.split(/[01\s]/g,);
  htmlTmp.push(tmp.join(" "));
  var result=[];
  for (var i in tmp) {
    var result2="";
    for (var j in tmp[i]) {
      if (tmp[i][j].match(/[2468]/)) {
        result2+=".";
      } else {
        result2+="-";
      }
    }
    result.push(result2);
  }
  htmlTmp.push(result.join(" "));
  goMorse(result.join(" "));
  htmlTmp.push("==============");
}

// 複数行の文字数で123abc
var tmp=TEXT.split(/\n/g);
if (tmp.length>10) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(複数行の文字数で123abc)</b>");
  var result=[];
  for (var i in tmp) {
    result.push(tmp[i].length);
  }
  htmlTmp.push("123abc");
  htmlCode(
    to123abcString(result.join(" ")));
  htmlTmp.push("012abc");
  htmlCode(
    to012abcString(result.join(" ")));
  htmlTmp.push("==============");
}

// 2行をジグザグに読み出し
var tmps=TEXT.split(/\n/g);
if (
  tmps &&  
  tmps.length==2 && 
  tmps[0].length == tmps[1].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(2行をジグザグに読み出し)</b>");
  var result0="";
  var result1="";
  for (var i in tmps[0]) {
    if (i%2==0) {
      result0+=tmps[0][i];
      result1+=tmps[1][i];
    } else {
      result0+=tmps[1][i];
      result1+=tmps[0][i];
    }
  }
  htmlCode(result0);
  htmlCode(result1);
  htmlTmp.push("==============");
}

// 2行をジグザグに読み出しwith Rot+1/-1
var tmps=TEXT.split(/\n/g);
if (
  tmps &&  
  tmps.length==2 && 
  tmps[0].length == tmps[1].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(2行を各々Rot+1/-1し、ジグザグに読み出し)</b>");
  var tmpP=rotN(tmps[0], 1);
  var tmpM=rotN(tmps[1], -1);
  htmlTmp.push("+1: "+tmpP);
  htmlTmp.push("-1: "+tmpM);
  var result0="";
  var result1="";
  for (var i in tmpP) {
    if (i%2==0) {
      result0+=tmpP[i];
      result1+=tmpM[i];
    } else {
      result0+=tmpM[i];
      result1+=tmpP[i];
    }
  }
  htmlCode(result0);
  htmlCode(result1);
  htmlTmp.push("--------------");
  var tmpM=rotN(tmps[0], -1);
  var tmpP=rotN(tmps[1], 1);
  htmlTmp.push("-1: "+tmpM);
  htmlTmp.push("+1: "+tmpP);
  var result0="";
  var result1="";
  for (var i in tmpP) {
    if (i%2==0) {
      result1+=tmpP[i];
      result0+=tmpM[i];
    } else {
      result1+=tmpM[i];
      result0+=tmpP[i];
    }
  }
  htmlCode(result0);
  htmlCode(result1);
  htmlTmp.push("==============");
}

// 2行を縦に読み出し2分割
var tmps=TEXT.split(/\n/g);
if (
  tmps &&  
  tmps.length==2 && 
  tmps[0].length == tmps[1].length
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(2行を縦に読み出し2分割)</b>");
  var result1="";
  var result2="";
  for (var i in tmps[0]) {
      result1+=tmps[0][i];
      result1+=tmps[1][i];
      result2+=tmps[1][i];
      result2+=tmps[0][i];
  }
  htmlCode(
    result1.slice(0,tmps[0].length));
  htmlCode(
    result1.slice(
      tmps[0].length, result1.length));
  htmlTmp.push("--------------");
  htmlCode(
    result2.slice(0,tmps[0].length));
  htmlCode(
    result2.slice(
      tmps[0].length, result2.length));
  htmlTmp.push("==============");
}


// [a-z]>ABC, [A-Z]>abc, !@#>123 Base64dec
// [a-z]>abc, [A-Z]>ABC, !@#>123 Base64dec
// C#H^odvPBNzLBMLYAtu)nM(V
// c#h^ODVpbnZlbmlyaTU)Nm(v
if (
  TEXT.match(/^[a-zA-Z0-9!@#\$%\^&\*\(\)]+$/i) && 
  (
    TEXT.match(/[!@#\$%\^&\*\(\)]/) || 
    TEXT.match(/\d/)
  ) && 
  TEXT.match(/[A-Z]/) && 
  TEXT.match(/[a-z]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>( [a-z]>ABC, [A-Z]>abc, !@#>123 )</b>");
  var result=[];
  var result2=[];
  for (var i in TEXT) {
    if (TEXT[i].match(/[!@#$%\^&\*\(\)]/)) {
      result.push(symbol2Num(TEXT[i]));
      result2.push(symbol2Num(TEXT[i]));
    } else if (TEXT[i].match(/\d/)) {
      result.push(TEXT[i]);
      result2.push(TEXT[i]);
    } else if (TEXT[i].match(/[A-Z]/)) {
      result.push(TEXT[i].toLowerCase());
      result2.push(TEXT[i]);
    } else if (TEXT[i].match(/[a-z]/)) {
      result.push(TEXT[i].toUpperCase());
      result2.push(TEXT[i]);
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result.join("")));
  htmlTmp.push("------");
  htmlTmp.push(
    "<b>( [a-z]>abc, [A-Z]>ABC, !@#>123 )</b>");
  htmlCode(result2.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result2.join("")));
  htmlTmp.push("==============");
}


// [a-j]>012, [A-Z]>abc, !@#>ABC Base64dec
// [a-j]>012, [A-Z]>ABC, !@#>abc Base64dec
// CdHg!$)#@!PBN@%LBMLYA!(@)a!#MjV
// 02d07gODV150113Z110112112400TUN12j21
// )@d)&gODV!%)!!#Z!!)!!@!!@$))TUaN!@j@!
if (
  TEXT.match(/^([a-jA-Z]|[0-9]{2}|[!@#\$%\^&\*\(\)]{2})+$/i) && 
  (
    TEXT.match(/[!@#\$%\^&\*\(\)]{2}/) || 
    TEXT.match(/\d{2}/)
  ) && 
  TEXT.match(/[A-Z]/) && 
  TEXT.match(/[a-j]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>( [a-j]>012, [A-Z]>abc, !@#>ABC )</b>");
  var result=[];
  var result2=[];
  var tmps=TEXT.match(/([!@#\$%\^&\*\(\)]{2}|\d{2}|[a-jA-Z])/g);
  for (var i in tmps) {
    if (tmps[i].match(/[!@#$%\^&\*\(\)]/)) {
      result.push(to012abc(symbol2Num(tmps[i])).toUpperCase());
      result2.push(to012abc(symbol2Num(tmps[i])).toLowerCase());
    } else if (tmps[i].match(/\d/)) {
      result.push(to012abc(tmps[i]).toUpperCase());
      result2.push(to012abc(tmps[i]).toLowerCase());
    } else if (tmps[i].match(/[A-Z]/)) {
      result.push(tmps[i].toLowerCase());
      result2.push(tmps[i]);
    } else if (tmps[i].match(/[a-j]/)) {
      result.push(abc012(tmps[i]));
      result2.push(abc012(tmps[i]));
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result.join("")));
  htmlTmp.push("------");
  htmlTmp.push(
    "<b>( [a-j]>012, [A-Z]>ABC, !@#>abc )</b>");
  htmlCode(result2.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result2.join("")));
  htmlTmp.push("==============");
}


// [a-z]>ABC, [A-J]>012, !@#>abc Base64dec
// [a-z]>abc, [A-J]>012, !@#>ABC Base64dec
// )@D)&Godv!%)!!#z!!)!!@!!@$))tuAn!@J@!
// cDhG!$)#@!pbn@%lbmlya!(@)A!#mJv
if (
  TEXT.match(/^([a-zA-J]|[0-9]{2}|[!@#\$%\^&\*\(\)]{2})+$/i) && 
  (
    TEXT.match(/[!@#\$%\^&\*\(\)]{2}/) || 
    TEXT.match(/\d{2}/)
  ) && 
  TEXT.match(/[A-J]/) && 
  TEXT.match(/[a-z]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>( [a-z]>ABC, [A-J]>012, !@#>abc )</b>");
  var result=[];
  var result2=[];
  var tmps=TEXT.match(/([!@#\$%\^&\*\(\)]{2}|\d{2}|[a-zA-J])/g);

  for (var i in tmps) {
    
    if (tmps[i].match(/[!@#$%^&*()]{2}/)) {
      result.push(
        to012abc(symbol2Num(tmps[i])).toLowerCase());
      result2.push(
        to012abc(symbol2Num(tmps[i])).toUpperCase());
    } else if (tmps[i].match(/\d{2}/)) {
      result.push(to012abc(tmps[i]).toLowerCase());
      result2.push(to012abc(tmps[i]).toUpperCase());
    } else if (tmps[i].match(/[A-J]/)) {
      result.push(abc012(tmps[i]));
      result2.push(abc012(tmps[i]));
    } else if (tmps[i].match(/[a-z]/)) {
      result.push(tmps[i].toUpperCase());
      result2.push(tmps[i]);
    }

  }

  htmlCode(result.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result.join("")));
  htmlTmp.push("------");
  htmlTmp.push(
    "<b>( [a-z]>abc, [A-J]>012, !@#>ABC )</b>");
  htmlCode(result2.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result2.join("")));
  htmlTmp.push("==============");
}



// [a-zA-Z]>ABC, [0-9]>012, !@#>abc Base64dec
// [a-zA-Z]>abc, [0-9]>012, !@#>ABC Base64dec
// c3h6!$)#@!pbn@%lbmlya!(@)0!#m9v
// )@3)&6ODV!%)!!#Z!!)!!@!!@$))TU0N!@9@!
if (
  TEXT.match(/^([a-zA-Z0-9]|[!@#$%^&*()]{2})+$/i) && 
  TEXT.match(/[!@#$%^&*()]{2}/) && 
  TEXT.match(/[0-9]/) && 
  TEXT.match(/[a-zA-Z]/)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>( [a-zA-Z]>ABC, [0-9]>012, !@#>abc )</b>");
  var result=[];
  var result2=[];
  var tmps=TEXT.match(/([!@#$%^&*()]{2}|\d|[a-zA-Z])/g);

  for (var i in tmps) {
    
    if (tmps[i].match(/[!@#$%^&*()]{2}/)) {
      result.push(
        to012abc(symbol2Num(tmps[i])).toLowerCase());
      result2.push(
        to012abc(symbol2Num(tmps[i])).toUpperCase());
    } else if (tmps[i].match(/\d/)) {
      result.push(tmps[i]);
      result2.push(tmps[i]);
    } else if (tmps[i].match(/[a-zA-Z]/)) {
      result.push(tmps[i].toUpperCase());
      result2.push(tmps[i].toLowerCase());
    }

  }

  htmlCode(result.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result.join("")));
  htmlTmp.push("------");
  htmlTmp.push(
    "<b>( [a-zA-Z]>abc, [0-9]>012, !@#>ABC )</b>");
  htmlCode(result2.join(""));
  htmlTmp.push("(Base64 decode)");
  htmlCode(base64Dec(result2.join("")));
  htmlTmp.push("==============");
}



// 1# 1 1!1! 4! 4! ! 1@1 1 !1! ! 2 @ # % #2 1$ 1! !2!
// 数字とシンボルでモールス
function numSymbol2morse(str) {
if (
  str.match(/^[1-5!@#\$%\s]+$/) && 
  str.match(/[1-5]/) && 
  str.match(/[!@#\$%]/) && 
  str.match(/\s/)
) {
  htmlTmp.push(str);
  htmlTmp.push(
    "<b>(数字とシンボルでモールス)</b>");
  var tmp=str.split(/\s/g);
  var result1=[];
  for (var i in tmp) {
    var x1="";
    for (var j in tmp[i]) {
      if (tmp[i][j].match(/[!@#\$%]/)) {
        for (
          var k=1; 
          k<=symbol2Num(tmp[i][j]); 
          k++
        ) {
          x1+="-";
        }
      } else if (tmp[i][j].match(/\d/)) {
        for (var k=1; k<=tmp[i][j]; k++) {
          x1+=".";
        }
      }
    }
    result1.push(x1);
  }
  htmlTmp.push("数字を.  シンボルを-");
  htmlTmp.push(result1.join(" "));
  goMorse(result1.join(" "));
  htmlTmp.push("==============");
}
}
// 数字とシンボルでモールス
numSymbol2morse(TEXT);


// 1#Z1T1!1!D4!S4!B!F1@1R1A!1!B!J2G@U#F%V#2F1$R1!K!2!J
// アルファベットを分離
// 残りを数字とシンボルでモールス
if (TEXT.match(/.[a-z]./i)) {
  var tmp1=TEXT.split(/[^a-z]+/gi);
  var tmp2=TEXT.split(/[a-z]+/gi);
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(アルファベットを分離)</b>");
  var tmp1=tmp1.join("");
  htmlCode(tmp1);
  htmlTmp.push("(reverse)");
  htmlCode(strReverse(tmp1));
  htmlTmp.push("(atbash)");
  htmlCode(atbash(tmp1));
  htmlTmp.push("(atbash & reverse)");
  htmlCode(atbash(strReverse(tmp1)));
  htmlTmp.push("(rot+13)");
  htmlCode(rotN(tmp1, 13));
  htmlTmp.push("(rot+1)");
  htmlCode(rotN(tmp1, 1));
  htmlTmp.push("(rot-1)");
  htmlCode(rotN(tmp1, -1));
  
  htmlTmp.push(
    "<b>(数字とシンボルでモールス)</b>");
  //htmlCode(tmp2.join(" "));
  //htmlTmp.push(tmp2.join(" "));
  numSymbol2morse(tmp2.join(" "));
  htmlTmp.push("==============");
}


// bazaabcbaazyzyyzabazzazyxwwxyyzabbabazzyyzazyxxyzazyyxwxyzzazyzzazyy
// [wxyzabc]で前の文字との差分でmorse
if (
  TEXT.match(/^[wxyzabc]+$/i) && 
  TEXT.match(/([wxyzabc])\1/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>([wxyzabc]で前の文字との差分でmorse)</b>");
  var tmp=TEXT;
  tmp=tmp.replace(/w/ig, "0");
  tmp=tmp.replace(/x/ig, "1");
  tmp=tmp.replace(/y/ig, "2");
  tmp=tmp.replace(/z/ig, "3");
  tmp=tmp.replace(/a/ig, "4");
  tmp=tmp.replace(/b/ig, "5");
  tmp=tmp.replace(/c/ig, "6");
  var result=[];
  for (var i in tmp) {
    if (i==0) { 
      result.push("+"); 
    } else { 
      var num1=Number(tmp[i]) ;
      var num0=Number(tmp[i-1]);
      if ((num1 - num0) == 0) {
        result.push("0"); 
      } else if ((num1 - num0) > 0) {
        result.push("+"); 
      } else if ((num1 - num0) < 0) {
        result.push("-"); 
      }
    }
  }
  
  var resultjoin=result.join("");
  htmlTmp.push("差分");
  htmlTmp.push(resultjoin);
  resultjoin=resultjoin.replace(/0/ig," ");
  resultjoin=resultjoin.replace(/\+/ig,".");
  resultjoin=resultjoin.replace(/\-/ig,"-");
  htmlTmp.push("morse");
  htmlTmp.push(resultjoin);
  htmlCode(goMorse(resultjoin));
  
  htmlTmp.push("==============");
}


// [0][+1][0][-1]…rot
// 02191210021002190219010001100119011001100110011901100119011002090210021002100100
if (TEXT.match(/^[0129]+$/i)) {
  var result=vigenereDec(TEXT, "0109");
  if (result.match(/^[01]+$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>([0][+1][0][-1]…rot)</b>");
    htmlTmp.push(result);
    result=binASCII(result);
    htmlTmp.push("(binASCII)");
    htmlCode(result);
    var tmpRE=new RegExp(
      "^([a-z]{3}\\d{2})(\\d{3}[a-z]{2})$",
      "i");
    if (result.match(tmpRE)) {
      htmlTmp.push("kwがない");
      result=result.replace(
        tmpRE, "$1wave$2");
      htmlTmp.push("波型rotだからwaveかも");
      htmlCode(result);
    }
    htmlTmp.push("==============");
  }
}


// abc012 > polibius
var tmp=abc012(TEXT);
if (
  tmp.match(/^[1-5]+$/i)
  && tmp.length%2==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(abc012 > polibius)</b>");
  var result=polybius(tmp);
  htmlCode(result);
  htmlTmp.push("==============");
}


// kwで分割してそれぞれreverse
// 9smo5wina7f5o
var tmp=TEXT;
var kList=keywordCheck(tmp);
if (kList[0] && kList[0].match(/./)) {
  var tmpRE=new RegExp(kList[0], "i");
  var tmp2=tmp.split(tmpRE);
  var result=
    strReverse(tmp2[0])+kList[0]+strReverse(tmp2[1]);
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(kwで分割してそれぞれreverse)</b>");
  htmlCode(result);
  htmlTmp.push("==============");
}

// reverse > kwで分割して前後入れ替え
var tmp=strReverse(TEXT);
var kList=keywordCheck(tmp);
if (kList[0] && kList[0].match(/./)) {
  var tmpRE=new RegExp(kList[0], "i");
  var tmp2=tmp.split(tmpRE);
  var result=tmp2[1]+kList[0]+tmp2[0];
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(reverse > kwで分割して前後入れ替え)</b>");
  htmlTmp.push(tmp);
  htmlCode(result);
  htmlTmp.push("==============");
}


// 左右からkw, 真ん中がprefix&postfix
if (TEXT.match(/\w+([.,:|\/\\\-\s])\w+\1\w+/)) {
  var tmp=TEXT.split(/[.,:|\/\\\-\s]/ig,);
  if (tmp[1].match(
    /^[a-z]{3}\d{2}\d{3}[a-z]{2}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(左右からkw, 真ん中がprefix&postfix)</b>");
  var result=tmp[1].replace(
    /^([a-z]{3}\d{2})(\d{3}[a-z]{2})$/i,
    "$1"+tmp[0]+tmp[2]+"$2"
  );
  htmlCode(result);
  htmlTmp.push("==============");
  }
}

// !$!&)!!*)*!*)*)%)*)%!$!*)$!@!&
// Symbol > 012abc +kw
if (TEXT.match(/^[!@#$%^&*(\)]+$/)) {
  var tmp=
    to012abcString(symbol2Num(TEXT));
  if (tmp.match(
    /^[a-z]{3}\d{2}\d{3}[a-z]{2}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(Symbol > 012abc +kw)</b>");
  var result=tmp[1].replace(
    /^([a-z]{3}\d{2})(\d{3}[a-z]{2})$/i,
    "$1symbol$2"
  );
  htmlCode(result);
  result=
    result.replace(/symbol/i,"symbols");
  htmlCode(result);
  htmlTmp.push("==============");
  }
}

// )()))&)%!$!()&^)%)*)%)*!#)*)!!)
// Symbol > 012abc +kw+ 012abc
if (TEXT.match(/^[!@#$%^&*(\)]+$/)) {
  var tmp=symbol2Num(TEXT);
  var tmpRE=new RegExp(
    "^((?:[01][0-9]|2[0-5])+)(\\d)((?:[01][0-9]|2[0-5])+)$", "");
  if (tmp.match(tmpRE)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(Symbol > 012abc +kw+ 012abc)</b>");
  var result=[];
  result.push(RegExp.$1);
  result.push(TEXT[RegExp.$1.length]);
  result.push(RegExp.$3);
  htmlTmp.push(result.join(" "));
  result[0]=to012abcString(result[0]);
  result[2]=to012abcString(result[2]);
  htmlCode(result.join(""));
  if (result[1].match(/\^/)) {
    htmlCode(
      result[0]+"power"+result[2]);
    htmlCode(
      result[0]+"attack"+result[2]);
    htmlCode(
      result[0]+"more"+result[2]);
    htmlCode(
      result[0]+"war"+result[2]);
    htmlCode(
      result[0]+"die"+result[2]);
  }
  htmlTmp.push("==============");
  }
}
 

// gist
if (TEXT.match(/^[a-zA-Z0-9]{36}$/)) {
  var tmp=TEXT.match(/[A-Z]/g);
  if (tmp && tmp.join("").match(/GIST/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(gist.github.com)</b>");
    var tmp=TEXT.replace(/[A-Z]/g, "");
    var tmp2="https://gist.github.com/";
    tmp2+="anonymous/";
    tmp2+=tmp;
    htmlTmp.push("<a href='"+tmp2+"'>"+tmp2+"</a>");
    fixCodeList.push(tmp2);
    htmlTmp.push("==============");
  }
}


// 区切り間の合計
if (TEXT.match(/^(\d+[.,\/\\\-|+:;])+\d+$/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(区切り間の合計＼(^o^)／)</b>");
  var tmp=TEXT.split(/[.,\/\\\-|+:;]/g);
  var result=[];
  for (var i in tmp) {
    var tmp2=tmp[i].split("");
    var sum=0;
    for (var j in tmp2) {
      sum+=Number(tmp2[j]);
    }
    result.push(sum);
  }
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// abc012&012abc
// 161709iifailurecdh0712
if (TEXT.match(/^([0-1][0-9]|2[0-5]){3}[a-j]{2}\w+[a-j]{3}([0-1][0-9]|2[0-5]){2}$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(abc012&012abc)</b>");
  var tmp=TEXT.replace(/^((?:[0-1][0-9]|2[0-5]){3})([a-j]{2})(\w+)([a-j]{3})((?:[0-1][0-9]|2[0-5]){2})$/i, "$1,$2,$3,$4,$5");
  var tmp=tmp.split(",");
  tmp[0]=to012abcString(tmp[0]);
  tmp[1]=letter2Num(tmp[1]);
  tmp[3]=letter2Num(tmp[3]);
  tmp[4]=to012abcString(tmp[4]);
  htmlCode(tmp.join(""));
  htmlTmp.push("==============");
}


// カッコ記号を8進数へ
if (
  TEXT.match(/^[()<>[\]{}]+$/i) && 
  TEXT.length%3==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(カッコ記号を8進数へ)</b>");
  htmlTmp.push("()<>[]{} → 01234567");
  var tmp=TEXT.replace(/[(]/ig, "0");
  tmp=tmp.replace(/[)]/ig, "1");
  tmp=tmp.replace(/[<]/ig, "2");
  tmp=tmp.replace(/[>]/ig, "3");
  tmp=tmp.replace(/[[]/ig, "4");
  tmp=tmp.replace(/[\]]/ig, "5");
  tmp=tmp.replace(/[{]/ig, "6");
  tmp=tmp.replace(/[}]/ig, "7");
  htmlCode(tmp);
  htmlTmp.push("==============");
}

// symbolを8進数へ
if (
  TEXT.match(/^[!@#$%^&\)]+$/i) && 
  TEXT.length%3==0
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(symbolを8進数へ)</b>");
  htmlTmp.push("!@#$%^&) → 12345670");
  var tmp=TEXT.replace(/!/ig, "1");
  tmp=tmp.replace(/@/ig, "2");
  tmp=tmp.replace(/#/ig, "3");
  tmp=tmp.replace(/\$/ig, "4");
  tmp=tmp.replace(/%/ig, "5");
  tmp=tmp.replace(/\^/ig, "6");
  tmp=tmp.replace(/&/ig, "7");
  tmp=tmp.replace(/\)/ig, "0");
  htmlCode(tmp);
  htmlTmp.push("==============");
}


// 後ろから3文字の数字
{
var tmpRE=new RegExp(
"^(one|two|ree|our|ive|six|ven|ght|ine|ero){5,}$",
  "i");
var tmpRE2=new RegExp(
  "(one|two|ree|our|ive|six|ven|ght|ine|ero)",
  "ig");
if (
  TEXT.match(tmpRE) || 
  strReverse(TEXT).match(tmpRE) || 
  atbash19(TEXT).match(tmpRE) || 
  strReverse(
    atbash19(TEXT)).match(tmpRE)
) {
  var str=[];
  htmlTmp.push(TEXT);
  if (TEXT.match(tmpRE)) {
    str=TEXT.match(tmpRE2);
  } else if (
    strReverse(TEXT).match(tmpRE)) {
    str=
      strReverse(TEXT).match(tmpRE2);
    htmlTmp.push("(reverse)");
    htmlTmp.push(str);
  } else if (
    atbash19(TEXT).match(tmpRE)) {
    str=atbash19(TEXT).match(tmpRE2);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  } else if (
    atbash19(
      strReverse(TEXT)).match(tmpRE)) {
    str=
      atbash19(
        strReverse(TEXT)).match(tmpRE2);
    htmlTmp.push("(reverse & reverse)");
    htmlTmp.push(str);
  }
  htmlTmp.push(
    "後ろから3文字の数字のみ");
  for (var i in str) {
    str[i]=str[i].replace(/one/ig, "1");
    str[i]=str[i].replace(/two/ig, "2");
    str[i]=str[i].replace(/ree/ig, "3");
    str[i]=str[i].replace(/our/ig, "4");
    str[i]=str[i].replace(/ive/ig, "5");
    str[i]=str[i].replace(/six/ig, "6");
    str[i]=str[i].replace(/ven/ig, "7");
    str[i]=str[i].replace(/ght/ig, "8");
    str[i]=str[i].replace(/ine/ig, "9");
    str[i]=str[i].replace(/ero/ig, "0");
  }
  htmlTmp.push(str.join(""));
  htmlCode(str.join(""));
}
}

// 途中3文字の数字
{
var tmpRE=new RegExp(
"^(one|two|hre|our|ive|six|eve|igh|ine|ero){5,}$",
  "i");
var tmpRE2=new RegExp(
  "(one|two|hre|our|ive|six|eve|igh|ine|ero)",
  "ig");
if (
  TEXT.match(tmpRE) || 
  strReverse(TEXT).match(tmpRE) || 
  atbash19(TEXT).match(tmpRE) || 
  strReverse(
    atbash19(TEXT)).match(tmpRE)
) {
  var str=[];
  htmlTmp.push(TEXT);
  if (TEXT.match(tmpRE)) {
    str=TEXT.match(tmpRE2);
  } else if (
    strReverse(TEXT).match(tmpRE)) {
    str=
      strReverse(TEXT).match(tmpRE2);
    htmlTmp.push("(reverse)");
    htmlTmp.push(str);
  } else if (
    atbash19(TEXT).match(tmpRE)) {
    str=atbash19(TEXT).match(tmpRE2);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  } else if (
    atbash19(
      strReverse(TEXT)).match(tmpRE)) {
    str=
      atbash19(
        strReverse(TEXT)).match(tmpRE2);
    htmlTmp.push("(reverse & reverse)");
    htmlTmp.push(str);
  }
  htmlTmp.push(
    "途中3文字の数字のみ");
  for (var i in str) {
    str[i]=str[i].replace(/one/ig, "1");
    str[i]=str[i].replace(/two/ig, "2");
    str[i]=str[i].replace(/hre/ig, "3");
    str[i]=str[i].replace(/our/ig, "4");
    str[i]=str[i].replace(/ive/ig, "5");
    str[i]=str[i].replace(/six/ig, "6");
    str[i]=str[i].replace(/eve/ig, "7");
    str[i]=str[i].replace(/igh/ig, "8");
    str[i]=str[i].replace(/ine/ig, "9");
    str[i]=str[i].replace(/ero/ig, "0");
  }
  htmlTmp.push(str.join(""));
  htmlCode(str.join(""));
}
}

// 途中2文字の数字
{
var tmpRE=new RegExp(
"^(ne|wo|hr|re|ou|ur|iv|ve|ix|ev|ig|gh|in|er){5,}$",
  "i");
var tmpRE2=new RegExp(
  "(ne|wo|hr|re|ou|ur|iv|ve|ix|ev|ig|gh|in|er)",
  "ig");
if (
  TEXT.match(tmpRE) || 
  strReverse(TEXT).match(tmpRE) || 
  atbash19(TEXT).match(tmpRE) || 
  strReverse(
    atbash19(TEXT)).match(tmpRE)
) {
  var str=[];
  htmlTmp.push(TEXT);
  if (TEXT.match(tmpRE)) {
    str=TEXT.match(tmpRE2);
  } else if (
    strReverse(TEXT).match(tmpRE)) {
    str=
      strReverse(TEXT).match(tmpRE2);
    htmlTmp.push("(reverse)");
    htmlTmp.push(str);
  } else if (
    atbash19(TEXT).match(tmpRE)) {
    str=atbash19(TEXT).match(tmpRE2);
    htmlTmp.push("(atbash)");
    htmlTmp.push(str);
  } else if (
    atbash19(
      strReverse(TEXT)).match(tmpRE)) {
    str=
      atbash19(
        strReverse(TEXT)).match(tmpRE2);
    htmlTmp.push("(reverse & reverse)");
    htmlTmp.push(str);
  }
  htmlTmp.push(
    "途中2文字の数字のみ");
  for (var i in str) {
    str[i]=str[i].replace(/ne/ig, "1");
    str[i]=str[i].replace(/wo/ig, "2");
    str[i]=str[i].replace(/hr|re/ig, "3");
    str[i]=str[i].replace(/ou|ur/ig, "4");
    str[i]=str[i].replace(/iv|ve/ig, "5");
    str[i]=str[i].replace(/ix/ig, "6");
    str[i]=str[i].replace(/ev/ig, "7");
    str[i]=str[i].replace(/ig|gh/ig, "8");
    str[i]=str[i].replace(/in/ig, "9");
    str[i]=str[i].replace(/er/ig, "0");
  }
  htmlTmp.push(str.join(""));
  htmlCode(str.join(""));
}
}

{
  var tmpRE=new RegExp(
    "(?:"+
    "([12][0-9]|3[01]|0[1-9])\\W"+
    "(1[0-2]|0[1-9])\\W"+
    "[0-9]{1,5}\\W"+
    "([01][0-9]|2[0-3])\\W"+
    "([0-5][0-9])\\W"+
    "([0-5][0-9])\\W"+
    "([0-9][0-9][0-9])"+
    "|"+
    "[0-9]{1,5}\\W"+
    "(1[0-2]|0[1-9])\\W"+
    "([12][0-9]|3[01]|0[1-9])\\W"+
    "([01][0-9]|2[0-3])\\W"+
    "([0-5][0-9])\\W"+
    "([0-5][0-9])\\W"+
    "([0-9][0-9][0-9])"+
    ")"
  ,"g");
 
  var tmp=[];
  tmp=TEXT.match(tmpRE);
  if (tmp) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(タイムスタンプ)</b>");
    for (var i in tmp) {
      htmlTmp.push("["+i+"] "+tmp[i]);
    }
    
    var tmpRE1=new RegExp(
    "([12][0-9]|3[01]|0[1-9])\\W"+
    "(1[0-2]|0[1-9])\\W"+
    "([0-9]{1,5})\\W"+
    "([01][0-9]|2[0-3])\\W"+
    "([0-5][0-9])\\W"+
    "([0-5][0-9])\\W"+
    "([0-9][0-9][0-9])"
    ,"");
    var tmpRE2=new RegExp(
    "([0-9]{1,5})\\W"+
    "(1[0-2]|0[1-9])\\W"+
    "([12][0-9]|3[01]|0[1-9])\\W"+
    "([01][0-9]|2[0-3])\\W"+
    "([0-5][0-9])\\W"+
    "([0-5][0-9])\\W"+
    "([0-9][0-9][0-9])"
    ,"");
    for (var j in tmp) {
      var result="";
      if (tmp[j].match(tmpRE1)) {
        result=tmp[j].replace(
          tmpRE1, 
          "$3,$2,$1,$4,$5,$6,$7"
        )
      } else if (tmp[j].match(tmpRE2)) {
        result=tmp[j].replace(
          tmpRE1, 
          "$1,$2,$3,$4,$5,$6,$7"
        )
      }
      result=result.split(",");
      for (var i in result) {
        result[i]=Number(result[i]);
      }
      // 年, 月(0-11), 日, 時, 分, 秒, ミリ秒
      var utcdt =Date.UTC(
        result[0], result[1]-1, result[2], 
        result[3], result[4], result[5], 
        result[6]);
      htmlTmp.push(utcdt);
      htmlCode(String(utcdt));
    }
  }
}
     
// hexBin
if (TEXT.match(/^[0-9a-f]+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(hexBin)</b>");
  var tmp=hexBin(TEXT);
  htmlTmp.push(tmp);
  goBinary(tmp);
  htmlTmp.push("==============");
}


// ギリシャ文字をアルフベットへ
if (TEXT.match(
  /[ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω]/)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(GREEK αβγ012Abc)</b>");
  var tmp=TEXT;
  tmp=tmp.replace(/Α/g, "A");
  tmp=tmp.replace(/α/g, "a");
  tmp=tmp.replace(/Β/g, "B");
  tmp=tmp.replace(/β/g, "b");
  tmp=tmp.replace(/Γ/g, "C");
  tmp=tmp.replace(/γ/g, "c");
  tmp=tmp.replace(/Δ/g, "D");
  tmp=tmp.replace(/δ/g, "d");
  tmp=tmp.replace(/Ε/g, "E");
  tmp=tmp.replace(/ε/g, "e");
  tmp=tmp.replace(/Ζ/g, "F");
  tmp=tmp.replace(/ζ/g, "f");
  tmp=tmp.replace(/Η/g, "G");
  tmp=tmp.replace(/η/g, "g");
  tmp=tmp.replace(/Θ/g, "H");
  tmp=tmp.replace(/θ/g, "h");
  tmp=tmp.replace(/Ι/g, "I");
  tmp=tmp.replace(/ι/g, "i");
  tmp=tmp.replace(/Κ/g, "J");
  tmp=tmp.replace(/κ/g, "j");
  tmp=tmp.replace(/Λ/g, "K");
  tmp=tmp.replace(/λ/g, "k");
  tmp=tmp.replace(/Μ/g, "L");
  tmp=tmp.replace(/μ/g, "l");
  tmp=tmp.replace(/Ν/g, "M");
  tmp=tmp.replace(/ν/g, "m");
  tmp=tmp.replace(/Ξ/g, "N");
  tmp=tmp.replace(/ξ/g, "n");
  tmp=tmp.replace(/Ο/g, "O");
  tmp=tmp.replace(/ο/g, "o");
  tmp=tmp.replace(/Π/g, "P");
  tmp=tmp.replace(/π/g, "p");
  tmp=tmp.replace(/Ρ/g, "Q");
  tmp=tmp.replace(/ρ/g, "q");
  tmp=tmp.replace(/Σ/g, "R");
  tmp=tmp.replace(/σ/g, "r");
  tmp=tmp.replace(/ς/g, "r");
  tmp=tmp.replace(/Τ/g, "S");
  tmp=tmp.replace(/τ/g, "s");
  tmp=tmp.replace(/Υ/g, "T");
  tmp=tmp.replace(/υ/g, "t");
  tmp=tmp.replace(/Φ/g, "U");
  tmp=tmp.replace(/φ/g, "u");
  tmp=tmp.replace(/Χ/g, "V");
  tmp=tmp.replace(/χ/g, "v");
  tmp=tmp.replace(/Ψ/g, "W");
  tmp=tmp.replace(/ψ/g, "w");
  tmp=tmp.replace(/Ω/g, "X");
  tmp=tmp.replace(/ω/g, "x");
  htmlCode(tmp);
  htmlTmp.push("==============");
}

// サンスクリット語数字
if (TEXT.match(
  /[शून्यएकद्वित्रिचतुर्पञ्चषष्सप्तअष्टनव]/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(サンスクリット数字)</b>");
  var tmp=TEXT.replace(/शून्य/ig, "0");
  tmp=tmp.replace(/एक/ig, "1");
  tmp=tmp.replace(/द्वि/ig, "2");
  tmp=tmp.replace(/त्रि/ig, "3");
  tmp=tmp.replace(/चतुर्/ig, "4");
  tmp=tmp.replace(/पञ्च/ig, "5");
  tmp=tmp.replace(/षष्/ig, "6");
  tmp=tmp.replace(/सप्त/ig, "7");
  tmp=tmp.replace(/अष्ट/ig, "8");
  tmp=tmp.replace(/नव/ig, "9");
  htmlCode(tmp);
  htmlTmp.push("force decASCII");
  htmlCode(decASCII(tmp, 1));
  htmlTmp.push("==============");
}

// Devanagariデーヴァナーガリー数字
if (TEXT.match(
  /[०१२३४५६७८९]/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(デーヴァナーガリー数字)</b>");
  var tmp=TEXT.replace(/०/ig, "0");
  tmp=tmp.replace(/१/ig, "1");
  tmp=tmp.replace(/२/ig, "2");
  tmp=tmp.replace(/३/ig, "3");
  tmp=tmp.replace(/४/ig, "4");
  tmp=tmp.replace(/५/ig, "5");
  tmp=tmp.replace(/६/ig, "6");
  tmp=tmp.replace(/७/ig, "7");
  tmp=tmp.replace(/८/ig, "8");
  tmp=tmp.replace(/९/ig, "9");
  htmlCode(tmp);
  htmlTmp.push("force decASCII");
  htmlCode(decASCII(tmp, 1));
  htmlTmp.push("==============");
}


// 部分的に012abc総当たり
if (
  TEXT.match(/\d/) &&
  TEXT.match(/\d/g).length>4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(部分的に012abc総当たり)</b>");
    
  function spot012abcDaily(str) {
    var tmpRE=new RegExp(str, "");
    if (TEXT.match(tmpRE)) {
      var tmp=TEXT;
      tmp=tmp.replace(
        tmpRE, 
        "$1\0$2\0$3\0$4\0$5\0$6");
      var tmp2=tmp.split("\0");
      htmlTmp.push(tmp2.join(" "));
      for (var i in tmp2) {
        if (i==3) continue;
        tmp2[i]=to012abcString(tmp2[i]);
      }
      htmlCode(tmp2.join(""));
      if (TEXT.match(/^\d+$/)) {
        htmlCode(
          tmp2.join("").replace("6","vi"));
      }
      htmlTmp.push("----------------");
    }
  }
  
  function spot012abcJojo(str) {
    var tmpRE=new RegExp(str, "");
    if (TEXT.match(tmpRE)) {
      var tmp=TEXT;
      tmp=tmp.replace(
        tmpRE, 
        "$1\0$2\0$3\0$4\0$5\0$6\0$7\0$8");
      // (a)(#)(a)(#kw)(a)(#)(a)(a)
      var tmp2=tmp.split("\0");
      htmlTmp.push(tmp2.join(" "));
      for (var i in tmp2) {
        if (i==1||i==3||i==5) continue;
        tmp2[i]=to012abcString(tmp2[i]);
      }
      htmlCode(tmp2.join(""));
      if (TEXT.match(/^\d+$/)) {
        htmlCode(
          tmp2.join("").replace("6","vi"));
      }
      htmlTmp.push("----------------");
    }
  }
  
  var v1="([0-9])";
  var v2="([0-1][0-9]|2[0-5])";
  var vv="([2-9]{2}.+[2-9]{3})";
  var vv2="([0-9].+)";
  var vRE="11111,21111,12111,11211,11121,11112,22111,21211,21121,21112,22211,22121,22112,22221,22212,22222,12222,21222,22122,22212,22221,11222,12122,12212,12221,11122,11212,11221,11112,11121".split(",");
  
  for (var i in vRE) {
    var tmp=vRE[i].split("");
    for (var j in tmp) {
      if (tmp[j]=="1") tmp[j]=v1;
      else if (tmp[j]=="2") tmp[j]=v2;
    }
    // daily
    tmp.splice(3,0,vv);
    spot012abcDaily(
      "^"+tmp.join("")+"$");
  }
  
  // ----------------
  // JoJo a#a#kwa#aa
  // (a)(#)(a)(#kw)(a)(#)(a)(a)
  
  for (var i in vRE) {
    var tmp=String(vRE[i]).split("");
    for (var j in tmp) {
      if (tmp[j]=="1") tmp[j]=v1;
      else if (tmp[j]=="2") tmp[j]=v2;
    }
    // JoJo
    tmp.splice(1,0,v1);
    tmp.splice(3,0,vv2);
    tmp.splice(5,0,v1);
    spot012abcJojo(
      "^"+tmp.join("")+"$");
  }
 
  htmlTmp.push("==============");
}


var phoneticRE=RegExp("Alfa|Alpha|Bravo|Charlie|Delta|Echo|Foxtrot|Golf|Hotel|India|Juliett|Juliet|Kilo|Lima|Mike|November|Oscar|Papa|Quebec|Romeo|Sierra|Tango|Uniform|Victor|Whiskey|X-ray|Yankee|Zulu","ig");

function phonetic(str) {
  var phoneticRE=RegExp("Alfa|Alpha|Bravo|Charlie|Delta|Echo|Foxtrot|Golf|Hotel|India|Juliett|Juliet|Kilo|Lima|Mike|November|Oscar|Papa|Quebec|Romeo|Sierra|Tango|Uniform|Victor|Whiskey|X-ray|Yankee|Zulu","ig");
  
  phoneticL=[["Alfa","A"],["Alpha","A"],["Bravo","B"],["Charlie","C"],["Delta","D"],["Echo","E"],["Foxtrot","F"],["Golf","G"],["Hotel","H"],["India","I"],["Juliett","J"],["Juliet","J"],["Kilo","K"],["Lima","L"],["Mike","M"],["November","N"],["Oscar","O"],["Papa","P"],["Quebec","Q"],["Romeo","R"],["Sierra","S"],["Tango","T"],["Uniform","U"],["Victor","V"],["Whiskey","W"],["X-ray","X"],["Yankee","Y"],["Zulu","Z"]];
  
  var tmp=str;
  var tmp2=str;
  
  if (str.match(phoneticRE)) {
    for (var i in phoneticL) {
      var tmpRE=
        RegExp(phoneticL[i][0], "ig");
      tmp=
        tmp.replace(
          tmpRE, "\0"+phoneticL[i][1]+"\0");
      tmp2=
       tmp2.replace(
          tmpRE, " $& ");
    }
    tmp2=tmp2.replace(/  /, " ");
    tmp=tmp.replace(/\0/g, "");
    return [tmp, tmp2];
  } else {
    return [str, "non phonetic code"];
  }
}
  
  if (TEXT.match(phoneticRE)) {
    htmlTmp.push(TEXT);
    htmlTmp.push(
      "<b>(phonetic code)</b>");
    var result=phonetic(TEXT);
    htmlTmp.push(result[1]);
    htmlCode(result[0]);
    htmlTmp.push("==============");
  }


// 奇数文字目をRot+1/-1
if (TEXT.match(/^\w+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(奇数文字目を+1/-1)</b>");
  var tmp=TEXT.split("");
  var result1=[];
  var result2=[];
  for (var i in tmp) {
    var x1=tmp[i];
    var x2=tmp[i];
    if (i%2==1) {
      x1=rotN(x1, 1);
      x2=rotN(x2, -1);
    }
    result1.push(x1);
    result2.push(x2);
  }
  htmlTmp.push("+1");
  htmlCode(result1.join(""));
  htmlTmp.push("-1");
  htmlCode(result2.join(""));
  htmlTmp.push("-------------------");
  htmlTmp.push(
    "<b>(偶数文字目を+1/-1)</b>");
  var tmp=TEXT.split("");
  var result1=[];
  var result2=[];
  for (var i in tmp) {
    var x1=tmp[i];
    var x2=tmp[i];
    if (i%2==0) {
      x1=rotN(x1, 1);
      x2=rotN(x2, -1);
    }
    result1.push(x1);
    result2.push(x2);
  }
  htmlTmp.push("+1");
  htmlCode(result1.join(""));
  htmlTmp.push("-1");
  htmlCode(result2.join(""));
  htmlTmp.push("==============");
}




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


} // end function
