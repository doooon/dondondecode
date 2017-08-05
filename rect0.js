
IS_HTML=true;
#IMPORT Lib_decode
#IMPORT Lib_decode_basic

var html=htmlHeader();
var tmp="";

TEXT=TEXT.replace(/^\s+|\s+$/g,"");

tmp+=TEXT+"\n-----------\n\n";

var len =TEXT.length;
if (len>10000) {
  tmp += "最大は10000文字です";
} else {
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {
      tmp+="(Rect"+i+")";
      tmp+=" "+i+"x"+(len/i)+"\n";
      var re=new RegExp(".{"+i+"}", "g");
      tmp+=TEXT.replace(re, "$&\n");
      tmp+="\n";
    }
  }
}

// 数字をカラーリング
var tmp2=tmp.split(/\n/);
for (var i=0; i<tmp2.length; i=(i+1)|0) {
  if (!tmp2[i].match(/\(rect\d+\)/i)) {
    tmp2[i]=tmp2[i].replace(
      /\d+/g, 
      "<span class='num'>$&</span>");
  }
}

tmp=tmp2.join("<br>\n");
html+=tmp;

