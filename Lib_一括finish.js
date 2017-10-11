
// Lib_一括finish
// #LIB

// #IMPORT Lib_decode_basic
// #IMPORT Lib_decode

// function ikkatsuFinish() {

html+=htmlTmp.join("<br>\n"); 


for (var x in fixCodeList) {
  debug(fixCodeList[x]);
}

// 重複を削除(大文字小文字を区別せず)
{
  fixCodeList=fixCodeList.filter(
    function (x, i, self) {
      return self.indexOf(x) === i;
    }
  );
  fixCodeList.sort(
    function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    }
  );
  for (var i=0; i<fixCodeList.length; i++) {
    if (i==0) continue;
    if (
      fixCodeList[i].toLowerCase() ==
      fixCodeList[i-1].toLowerCase()
    ) {
      fixCodeList.splice(i,1);
      i--;
    }
  }
}
        
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
  
// 文字参照と同じになるのでエスケープ
html=html.replace(/&(?=#\d+)/g, "&amp;");

// }


document.getElementById('clipboardTextarea').style.visibility="hidden"; 
var myDiv = document.getElementById('output');  
myDiv.innerHTML = html; 



