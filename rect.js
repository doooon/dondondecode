
IS_HTML=true;
#IMPORT Lib_decode
#IMPORT Lib_decode_basic
#IMPORT 新Rect 読み出しHTML

var html=htmlHeader();
var htmlTmp=[];

TEXT=TEXT.replace(/^\s+|\s+$/g, "");
htmlCode(TEXT);
htmlTmp.push("===============");

htmlTmp.push("48-57(0-9), 65-90(A-Z), 97-122(a-z)");
htmlTmp.push("===============");
htmlTmp.push("<!--fixCodeList-->");
htmlTmp.push("===============");

// テキストアナライズ
htmlTmp.push(analyzeText(TEXT));
htmlTmp.push("----------------------");

var len =TEXT.length;
if (len>10000) {
  htmlTmp.push(
    "最大は10000文字です");
} else {
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      var re=new RegExp(".{"+i+"}", "g");
      htmlTmp.push(
        TEXT.replace(re, "$&<br>\n"));
      
      // Rect読み出し
      rectReadStart(
        makeRect(
          TEXT.match(re).join("\n"))); 
      htmlTmp.push("=============");
    }
  }
}

// 以下は時間がかかるので今はoff
fixCodeList.length=1;

// 時間がかかるのでfixしてたら続けない
// ---------------
// atbash
if (fixCodeList.length==0) {
htmlTmp.push(TEXT);
htmlTmp.push("<b>(atbash)</b>");
htmlTmp.push(atbash19(TEXT));
var len =atbash19(TEXT).length;
if (len>10000) {
  htmlTmp.push(
    "最大は10000文字です");
} else {
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      var re=new RegExp(".{"+i+"}", "g");
      htmlTmp.push(
        atbash19(TEXT).replace(re, "$&<br>\n"));
      
      // Rect読み出し
      rectReadStart(
        makeRect(
          atbash19(TEXT).match(re).join("\n"))); 
      htmlTmp.push("=============");
    }
  }
}
}

// 時間がかかるのでfixしてたら続けない
// ---------------
// Rot13
if (
  fixCodeList.length==0 && 
  TEXT.match(/^[a-z]{10,}$/i) && 
  kouseimoji.length>3
) {
htmlTmp.push(TEXT);
htmlTmp.push("<b>(Rot13)</b>");
var TEXTr13=rotN(TEXT, 13);
htmlTmp.push(TEXTr13);
var len =TEXTr13.length;
if (len>10000) {
  htmlTmp.push(
    "最大は10000文字です");
} else {
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      var re=new RegExp(".{"+i+"}", "g");
      htmlTmp.push(
        TEXTr13.replace(re, "$&<br>\n"));
      
      // Rect読み出し
      rectReadStart(
        makeRect(
          TEXTr13.match(re).join("\n"))); 
      htmlTmp.push("=============");
    }
  }
}
}


// 時間がかかるのでfixしてたら続けない
// ---------------
// 数字をローマ数字へ
if (
  fixCodeList.length==0
  && TEXT.match(/\d/)
) {
htmlTmp.push(TEXT);
htmlTmp.push("数字をローマ数字へ");
TEXT=TEXT.replace(/9/,"IX").replace(/8/,"VIII").replace(/7/,"VII").replace(/6/,"VI").replace(/5/,"V").replace(/4/,"IV").replace(/3/,"III").replace(/2/,"II").replace(/1/,"I");
htmlTmp.push(TEXT);
var len =TEXT.length;
if (len>10000) {
  htmlTmp.push(
    "最大は10000文字です");
} else {
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      var re=new RegExp(".{"+i+"}", "g");
      htmlTmp.push(
        TEXT.replace(re, "$&<br>\n"));
      
      // Rect読み出し
      rectReadStart(
        makeRect(
          TEXT.match(re).join("\n"))); 
      htmlTmp.push("=============");
    }
  }
}
}

// 読み出し分をhtmlに追加
html+="<br>\n<br>\n";
html+="=================<br>\n";
html+="Rect読み出し<br>\n";
html+="=================<br>\n";
html+=htmlTmp.join("<br>\n");

// 重複を削除したリスト
fixCodeList=fixCodeList.filter(
  function (x, i, self) {
    return self.indexOf(x) === i;
  }
);
        
var fixCodeMsg="";
if (fixCodeList.length) {
fixCodeMsg+="<span class='alert'>";
fixCodeMsg+=fixCodeList.length+" Passcode Hit!!";
fixCodeMsg+="</span><br>\n";
fixCodeMsg+="<div class='alertbox'>";
for (var i in fixCodeList) {
  fixCodeMsg+=checkCodeHTML(
    fixCodeList[i], true)+"&nbsp;<a href='#";
  fixCodeMsg+=fixCodeList[i];
  fixCodeMsg+="'>[Link]</a><br>\n";
}
fixCodeMsg+="</div>\n";
}

html=html.replace(
  /<!--fixCodeList-->/, 
  fixCodeMsg
  );
  

