
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

//===========
var leetLessKw=[]; //kwを除くleetリスト
var fixCodeList=[];
var kouseimoji=[]; //構成文字リスト
var startTime=new Date(); //スクリプト開始時刻
var htmlCodeLabel="";

// 一括変換用
var decRE      = new RegExp( "^(0??[4][8-9]|0??[5][0-7]|0??[6][5-9]|0??[7-8][0-9]|0??[9][0]|0??[9][7-9]|[1][0-1][0-9]|[1][2][0-2])+$", "");
var octRE      = new RegExp( "^(0??[6][0-7]|0??[7][1]|[1][0][1-7]|[1][1-2][0-7]|[1][3][0-2]|[1][4][1-7]|[1][5-6][0-7]|[1][7][0-2])+$", "");
var hexRE      = new RegExp( "^([3][0-9]|[4][1-9a-f]|[5][0-9a]|[6][1-9a-f]|[7][0-9a])+$", "i");
var to012abcRE = new RegExp( "^([0-1][0-9]|2[0-5])+$", "i");
var to123abcRE = new RegExp( "^(0[1-9]|1[0-9]|2[0-6])+$", "i");
var qwertyXYRE = new RegExp( "^([0-9][0-3]\s*)+$", "i");
var kwabc012RE = new RegExp( "^[a-z]+$", "i");
var symbolRE   = new RegExp( "[!@#$%^&*()]", "g");
var abc012RE_aj   = new RegExp( "^[a-j]+$", "i");



// UNIXタイムを日付へ(ミリ秒必須)
// 10桁なら×1000してミリ秒付けよう
function formatTime(time) {
  var date = new Date(time);
  var weekDayList = [ "日", "月", "火", "水", "木", "金", "土" ] ;
  var timeStr = [
    date.getFullYear(),
    date.getMonth() + 1,
    date.getDate()
  ].join( '/' )
  + '(' + weekDayList[date.getDay()] + ')'
  + ' ' + [
    ( '0' + date.getHours() ).slice( -2 ),
    ( '0' + date.getMinutes() ).slice( -2 )
  ].join( ':' );
    return timeStr;
}



// 累乗数のリストを割り出す
function getRMPattern(sorce) {
  // スタックオーバーでエラーすることがある
  return null;
  //sorce="2764258729240164395";
  //sorce+="2512643433664289216";
  var map=[
    ["2","2"], 
    ["22", "4"], 
    ["222", "8"], 
    ["3", "3"], 
    ["33", "9"], 
    ["333", "27"], 
    ["4", "4"], 
    ["44", "16"], 
    ["444", "64"], 
    ["5", "5"], 
    ["55", "25"], 
    ["555", "125"], 
    ["6", "6"], 
    ["66", "36"], 
    ["666", "216"], 
    ["7", "7"], 
    ["77", "49"], 
    ["777", "343"], 
    ["7777", "2401"], 
    ["8", "8"], 
    ["88", "64"], 
    ["888", "512"], 
    ["9", "9"], 
    ["99", "81"], 
    ["999", "729"], 
    ["9999", "6561"]
  ];

  map.sort(function (next, prev) {
    return (
      Number(prev[1]) - Number(next[1]));
  });

  var targetlist=[]; //[[index],[累乗数]]
  for (var i in map) {
    var str=map[i][1];
    var rstr=map[i][1].replace(/./g,"=");
    var pos = sorce.indexOf(str);
    while ( pos != -1 ) {
      targetlist.push([pos,str]);
      sorce=sorce.replace(str,rstr);
      pos = sorce.indexOf(str, pos + 1);
    }
  }
  if (sorce.match(/[^=]/)) return null;

  targetlist.sort(function (next, prev) {
    return next[0] - prev[0];
  });

  var separatestr=[];
  for (var i in targetlist) {
    separatestr.push(targetlist[i][1]);
  }
  
  var targetlist=[];
  for (var i in separatestr) {
    targetlist[i]=[separatestr[i],[]];
    var tmpRE=new RegExp(
                       "^"+targetlist[i][0]+"$","")
    for (var j in map) {
      if (map[j][1].match(tmpRE)) {
        targetlist[i][1].push(map[j][0]);
      }
    }
  }
  //targetlist[0]=[ 積, [累乗パターン, ...] ]
  var result=[];
  for (var i in targetlist) {
    var resulttmp=[];
    for (var j in targetlist[i][1]) {
      if (i==0) {
        result[j]=targetlist[i][1][j];
      } else {
        var addarray=copyArray(result);
        for (var k in addarray) {
          addarray[k]+=" "+targetlist[i][1][j];
        }
        Array.prototype.push.apply(
          resulttmp, addarray);
      }
    }
    if (i>0) var result=resulttmp;
  }
  result.sort(arraySortNumber);
  return { 
    "list":result,
    "sorce":separatestr
  }
}





//数字[1-5]の回数0/1を繰り返す
function time2bin(str) {
  var result="";
  for (var i in str) {
    if (str[i].match(/\D/)) continue;
    if (i%2==1) {
      for (var j=1; j<=str[i]; j++) {
        result+="1";
      }
    } else if (i%2==0) {
      for (var j=1; j<=str[i]; j++) {
        result+="0";
      }
    }
  }
  return result;
}

//======================================

// Symbolを数フランスカナダ版)
function symbol2NumFrench(str) {
  str=str.replace(/!/g, "1");
  str=str.replace(/@/g, "2");
  str=str.replace(/#/g, "3");
  str=str.replace(/\$/g, "4");
  str=str.replace(/%/g, "5");
  str=str.replace(/\?/g, "6");
  str=str.replace(/&/g, "7");
  str=str.replace(/\*/g, "8");
  str=str.replace(/\(/g, "9");
  str=str.replace(/\)/g, "0");
  return str;
}

//======================================

// Symbolを数字へ
function symbol2Num(str) {
  str=str.replace(/!/g, "1");
  str=str.replace(/@/g, "2");
  str=str.replace(/#/g, "3");
  str=str.replace(/\$/g, "4");
  str=str.replace(/%/g, "5");
  str=str.replace(/\^/g, "6");
  str=str.replace(/&/g, "7");
  str=str.replace(/\*/g, "8");
  str=str.replace(/\(/g, "9");
  str=str.replace(/\)/g, "0");
  return str;
}

//======================================

// 数字をSymbolへ
function num2Symbol(str) {
  str=str.replace(/1/g, "!");
  str=str.replace(/2/g, "@");
  str=str.replace(/3/g, "#");
  str=str.replace(/4/g, "$");
  str=str.replace(/5/g, "%");
  str=str.replace(/6/g, "^");
  str=str.replace(/7/g, "&");
  str=str.replace(/8/g, "*");
  str=str.replace(/9/g, "(");
  str=str.replace(/0/g, ")");
  return str;
}

//======================================



//======================================

//構成文字種数
function defCharCount(str) {
  if (!str) return false;
  var chrs=str.split("");
  var tmp={};
  for (var i in chrs) {
    if (tmp[chrs[i]]) {
      tmp[chrs[i]]++;
    } else {
      tmp[chrs[i]]=1;
    }
  }
  return Object.keys(tmp).length;
}

//======================================


// Qwerty to Dvorak
function qwerty2dvorak(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  let result=[];
  let qwertymap=[];
  qwertymap[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  qwertymap[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  qwertymap[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  qwertymap[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];

  let dvorakmap=[];
  dvorakmap[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  dvorakmap[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  dvorakmap[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  dvorakmap[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];

  for (var i in str) {
    var flag=0;
    for (var j in qwertymap) {
      for (var k=0; k<=9; k++) {
        var tmp=qwertymap[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
        var re=new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            dvorakmap[j][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}




// Dvorak to Qwerty
function dvorak2qwerty(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  let result=[];
  let qwertymap=[];
  qwertymap[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  qwertymap[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  qwertymap[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  qwertymap[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];

  let dvorakmap=[];
  dvorakmap[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  dvorakmap[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  dvorakmap[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  dvorakmap[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];

  for (var i in str) {
    var flag=0;
    for (var j in dvorakmap) {
      for (var k=0; k<=9; k++) {
        var tmp=dvorakmap[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
        var re=new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            qwertymap[j][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}



// Qwerty180度回転
function qwerty180(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
/*alert(
"str["+i+"]="+str[i]+"\n"+
"updown["+i+"]="+updown[i]+"\n"+
"re="+re+"\n"+
"map["+(3-j)+"]["+(9-k)+"]["+updown[i]+"]="+map[3-j][9-k][updown[i]]+"\n"+
"map["+(j)+"]["+(k)+"]["+updown[i]+"]="+map[j][k][updown[i]]+"\n"
);*/
          result.push(
            map[3-j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak180度回転
function dvorak180(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d',.;]/g, "0").replace(/[A-Z!@#$%^&*()<>":]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
/*alert(
"str["+i+"]="+str[i]+"\n"+
"updown["+i+"]="+updown[i]+"\n"+
"re="+re+"\n"+
"map["+(3-j)+"]["+(9-k)+"]["+updown[i]+"]="+map[3-j][9-k][updown[i]]+"\n"+
"map["+(j)+"]["+(k)+"]["+updown[i]+"]="+map[j][k][updown[i]]+"\n"
);*/
          result.push(
            map[3-j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty上下反転
function qwertyFlipV(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[3-j][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak上下反転
function dvorakFlipV(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[3-j][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty左右反転
function qwertyFlipH(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak左右反転
function dvorakFlipH(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[j][9-k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty上スライド
function qwertyTop(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[0][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak上スライド
function dvorakTop(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          result.push(
            map[0][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty上シフト
function qwertyUp(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=new RegExp(tmp,"");
        if (str[i].match(re)) {
          //if (k===0) k=10;
          if (j===0) j=4;
          result.push(
            map[j-1][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak上シフト
function dvorakUp(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          //if (k===0) k=10;
          if (j===0) j=4;
          result.push(
            map[j-1][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty下シフト
function qwertyDown(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=new RegExp(tmp,"");
        if (str[i].match(re)) {
          //if (k===0) k=10;
          if (j===3) j=-1;
          result.push(
            map[Number(j)+1][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak下シフト
function dvorakDown(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          //if (k===0) k=10;
          if (j===3) j=-1;
          result.push(
            map[Number(j)+1][k][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty左シフト
function qwertyLeft(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          if (k===0) k=10;
          result.push(
            map[j][k-1][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak左シフト
function dvorakLeft(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          if (k===0) k=10;
          result.push(
            map[j][k-1][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty右シフト
function qwertyRight(str) {
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          if (k===9) k=-1;
          result.push(
            map[j][Number(k)+1][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Dvorak右シフト
function dvorakRight(str) {
  return str; //debug
  if (!str) return false;
  //大文字小文字を保存
  var updown=str.replace(/[a-z\d,.\/]/g, "0").replace(/[A-Z!@#$%^&*()<>?]/g, "1").replace(/[^01]/g, "0");

  var result=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  for (var i in str) {
    var flag=0;
    for (var j in map) {
      for (var k=0; k<=9; k++) {
        var tmp=map[j][k][updown[i]];
        if (tmp.match(/[\^$?*()\/.]/)) {
          tmp="\\"+tmp;
        }
       var re=
        new RegExp(tmp,"");
        if (str[i].match(re)) {
          if (k===9) k=-1;
          result.push(
            map[j][Number(k)+1][updown[i]]);
          flag=1;
          break;
        }
      }
      if (flag) break;
    }
    if (flag==0) result.push("∎");
  }
  return result.join("");
}


// Qwerty座標
function qwertyXY(str) {
  // qを[1,1] yx
  
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];

  if (str.match(/^([0-9][0-3][\s\/\-.,:])*[0-9][0-3]$/)) {
    var pair=str.match(/[0-9][0-3]/g);
    var result=[];
    for (var i in pair) {
      var xy=pair[i].split("");
      if (xy[0].match(/0/)) xy[0]=10;
      // mapはyx、入力はxy
      result.push(map[xy[1]][xy[0]-1][0]); //y軸は0スタート, x軸は1スタート
    }
    return result.join("");
  }
}


// Dvorak座標
function dvorakXY(str) {
  // qを[1,1] yx
  
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];

  if (str.match(/^([0-9][0-3][\s\/\-.,:])*[0-9][0-3]$/)) {
    var pair=str.match(/[0-9][0-3]/g);
    var result=[];
    for (var i in pair) {
      var xy=pair[i].split("");
      if (xy[0].match(/0/)) xy[0]=10;
      // mapはyx、入力はxy
      result.push(map[xy[1]][xy[0]-1][0]); //y軸は0スタート, x軸は1スタート
    }
    return result.join("");
  }
}

// Qwerty座標
function qwertyXY_old(str) {
  // qを[1,1] yx
  var map=[
    ",1,2,3,4,5,6,7,8,9,0".split(","),
    ",q,w,e,r,t,y,u,i,o,p".split(","),
    ",a,s,d,f,g,h,j,k,l,".split(","),
    ",z,x,c,v,b,n,m,,,".split(",")
  ];
  
  if (str.match(/^([0-9][0-3][\s\/\-.,:])*[0-9][0-3]$/)) {
    var pair=str.match(/[0-9][0-3]/g);
    var result=[];
    for (var i in pair) {
      var xy=pair[i].split("");
      if (xy[0].match(/0/)) xy[0]=10;
      // mapはyx、入力はxy
      result.push(map[xy[1]][xy[0]]);
    }
    return result.join("");
  }
}


// Qwerty座標XXX
function qwertyXXX(str) {
  // qを[1,1] yx
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["q","Q"], ["w","W"], ["e","E"], 
    ["r","R"], ["t","T"], ["y","Y"], 
    ["u","U"], ["i","I"], ["o","O"], 
    ["p","P"]
  ];
  map[2]=[
    ["a","A"], ["s","S"], ["d","D"], 
    ["f","F"], ["g","G"], ["h","H"], 
    ["j","J"], ["k","K"], ["l","L"], 
    [";",":"]
  ];
  map[3]=[
    ["z","Z"], ["x","X"], ["c","C"], 
    ["v","V"], ["b","B"], ["n","N"], 
    ["m","M"], [",","<"], [".",">"], 
    ["/","?"]
  ];
  
  if (!str.match(
    /^(?:([0-9])\1*[\s\/\-.,:])*([0-9])\2*$/)
  ) {
    return false;
  }
    var target=str.match(/([0-9])\1*/g);
    var result=[];
    for (var i in target) {
      var xy=[Number(target[i][0]),target[i].length];
      if (xy[0]==0) xy[0]=10;
      // mapはyx、入力はxy
      if (xy[1]<4) {
        result.push(map[xy[1]][xy[0]-1][0]); //y軸は0スタート, x軸は1スタート
      } else {
        result.push(" ");
      }
    }
    return result.join("");
}


// Dvorak座標XXX
function dvorakXXX(str) {
  // qを[1,1] yx
  var map=[];
  var map=[];
  map[0]=[
    ["1","!"], ["2","@"], ["3","#"], 
    ["4","$"], ["5","%"], ["6","^"], 
    ["7","&"], ["8","*"], ["9","("], 
    ["0",")"]
  ];
  map[1]=[
    ["'","\""], [",","<"], [".",">"], 
    ["p","P"], ["y","Y"], ["f","F"], 
    ["g","G"], ["c","C"], ["r","R"], 
    ["l","L"]
  ];
  map[2]=[
    ["a","A"], ["o","O"], ["e","E"], 
    ["u","U"], ["i","I"], ["d","D"], 
    ["h","H"], ["t","T"], ["n","N"], 
    ["s","S"]
  ];
  map[3]=[
    [";",":"], ["q","Q"], ["j","J"], 
    ["k","K"], ["x","X"], ["b","B"], 
    ["m","M"], ["w","W"], ["v","V"], 
    ["z","Z"]
  ];
  
  if (!str.match(
    /^(?:([0-9])\1*[\s\/\-.,:])*([0-9])\2*$/)
  ) {
    return false;
  }
    var target=str.match(/([0-9])\1*/g);
    var result=[];
    for (var i in target) {
      var xy=[Number(target[i][0]),target[i].length];
      if (xy[0]==0) xy[0]=10;
      // mapはyx、入力はxy
      if (xy[1]<4) {
        result.push(map[xy[1]][xy[0]-1][0]); //y軸は0スタート, x軸は1スタート
      } else {
        result.push(" ");
      }
    }
    return result.join("");
}


// Qwerty座標XXX
function qwertyXXX_old(str) {
  // qを[1,1] yx
  var map=[
    ",1,2,3,4,5,6,7,8,9,0".split(","),
    ",q,w,e,r,t,y,u,i,o,p".split(","),
    ",a,s,d,f,g,h,j,k,l,".split(","),
    ",z,x,c,v,b,n,m,,,".split(",")
  ];
  
  if (!str.match(
    /^(?:([0-9])\1*[\s\/\-.,:])*([0-9])\2*$/)
  ) {
    return false;
  }
    var target=str.match(/([0-9])\1*/g);
    var result=[];
    for (var i in target) {
      var xy=[Number(target[i][0]),target[i].length];
      if (xy[0]==0) xy[0]=10;
      // mapはyx、入力はxy
      if (xy[1]<4) {
        result.push(map[xy[1]][xy[0]]);
      } else {
        result.push(" ");
      }
    }
    return result.join("");
}

//======================================


// どんなKeywordが抽出可能か調べる
// Keywordの長さ指定可能
function keySyougou(source, len, terget) {
  var result=[];
  var keys=[];

  //キーワード追加
  if (terget && terget.match(/^daily$/i)) {
     keys=getKeyws();
  } else if (terget && terget.match(/^jojo$/i)) {
     keys=keys.concat(addKeywsJoJo());
  } else {
     keys=getKeyws();
     keys=keys.concat(addKeywsJoJo());
  }  

  for (var i=0; i<keys.length; i++) {
    keys[i]=keys[i].replace(/\(\?<?[!=].+?\)/g, "");
    if (len>0 && keys[i].length!=len) {
      continue;
    }
    var flag=true;
    var source2=source;
    for (var j=0; j<keys[i].length; j++) {
      var re = new RegExp(keys[i][j], "i");
      if (source2.match(re) && flag) {
        source2=source2.replace(re, "*");
      } else {
        flag = false;
        break;
      }
    }
    if (flag) result.push(keys[i]);
  } // for keys.length
  result.sort(function(a,b){
    if( a.length > b.length) return -1;
    if( a.length < b.length) return 1;
    return 0;
  });

  return result;
} // end function


//配列ソート(文字の長さ)
function arraySortLength(prev, next) {
    return prev.length - next.length;
}

//配列ソート(数字の大きさ昇順)
function arraySortNumber(a, b) {
  if( a < b ) return -1;
  if( a > b ) return 1;
  return 0;
}
  


// 二次元配列の縦横を入れ換える
function rectReflect(rect,flag) {
  // flagに"text"があれば二次元配列ではなくテキスト1次元配列で返す

  var y=rect.length;
  var x=rect[0].length;
  var newRect=[];
  for (var j=0; j<x; j++) {
    var tmp=[];
    for(var i=0; i<y; i++) {
      tmp.push(rect[i][j]);
    }
    newRect[j]=tmp;
  }
  if (flag && flag.match(/text/i)) {
    for (var i in newRect) {
      newRect[i]=newRect[i].join("");
    }
  }
  return newRect;
}

// 多次元配列を複製する
function copyArray(arr){
  var newarr = [];
  for(var i = 0;i<arr.length;i++){
    if(Array.isArray(arr[i])){
      newarr[i] = copyArray(arr[i]);
    }else{
      newarr[i] = arr[i];
    }
  }
  return newarr;
}


// リバース
function strReverse(str) {
  if (!str) return false;
  str=str.split("").reverse().join("");
  return str;
}


// atbash with Number 1<->9
function atbash19(sorce) {
  if (!sorce) return;
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  var a=sorce.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m1-4]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
      a[i]=a[i].replace(/1/, "9");
      a[i]=a[i].replace(/2/, "8");
      a[i]=a[i].replace(/3/, "7");
      a[i]=a[i].replace(/4/, "6");
    } else if (a[i].match(/[n-z6-9]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
      a[i]=a[i].replace(/6/, "4");
      a[i]=a[i].replace(/7/, "3");
      a[i]=a[i].replace(/8/, "2");
      a[i]=a[i].replace(/9/, "1");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// atbash with Number 0<->9
function atbash09(sorce) {
  if (!sorce) return;
  var a=sorce.split("");
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m0-4]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
      a[i]=a[i].replace(/0/, "9");
      a[i]=a[i].replace(/1/, "8");
      a[i]=a[i].replace(/2/, "7");
      a[i]=a[i].replace(/3/, "6");
      a[i]=a[i].replace(/4/, "5");
    } else if (a[i].match(/[n-z5-9]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
      a[i]=a[i].replace(/5/, "4");
      a[i]=a[i].replace(/6/, "3");
      a[i]=a[i].replace(/7/, "2");
      a[i]=a[i].replace(/8/, "1");
      a[i]=a[i].replace(/9/, "0");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// atbash no Number
function atbash(sorce) {
  if (!sorce) return;
  var a=sorce.split("");
  var flagL=[];
  for (var i in sorce) {
    if (sorce[i].match(/[a-z]/)) {
      flagL.push(-1);
    } else if (sorce[i].match(/[A-Z]/)) {
      flagL.push(1);
    } else {
      flagL.push(0);
    }
  }
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[a-m]/i)) {
      a[i]=a[i].replace(/[A]/i, "z");
      a[i]=a[i].replace(/[B]/i, "y");
      a[i]=a[i].replace(/[C]/i, "x");
      a[i]=a[i].replace(/[D]/i, "w");
      a[i]=a[i].replace(/[E]/i, "v");
      a[i]=a[i].replace(/[F]/i, "u");
      a[i]=a[i].replace(/[G]/i, "t");
      a[i]=a[i].replace(/[H]/i, "s");
      a[i]=a[i].replace(/[I]/i, "r");
      a[i]=a[i].replace(/[J]/i, "q");
      a[i]=a[i].replace(/[K]/i, "p");
      a[i]=a[i].replace(/[L]/i, "o");
      a[i]=a[i].replace(/[M]/i, "n");
    } else if (a[i].match(/[n-z]/i)) {
      a[i]=a[i].replace(/[N]/i, "m");
      a[i]=a[i].replace(/[O]/i, "l");
      a[i]=a[i].replace(/[P]/i, "k");
      a[i]=a[i].replace(/[Q]/i, "j");
      a[i]=a[i].replace(/[R]/i, "i");
      a[i]=a[i].replace(/[S]/i, "h");
      a[i]=a[i].replace(/[T]/i, "g");
      a[i]=a[i].replace(/[U]/i, "f");
      a[i]=a[i].replace(/[V]/i, "e");
      a[i]=a[i].replace(/[W]/i, "d");
      a[i]=a[i].replace(/[X]/i, "c");
      a[i]=a[i].replace(/[Y]/i, "b");
      a[i]=a[i].replace(/[Z]/i, "a");
    }
  }
  for (var i in a) {
    if (flagL[i]>0) { 
      a[i]=a[i].toUpperCase();
    } else if (flagL[i]<0) { 
      a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

//012abc変換(数字列 スペース区切り可)
//区切りなしなら強制2桁
function to012abcString(souce) {
  if (souce.match(/\d[\s.,:;\-\/|]\d/)) {
    var r=souce.split(/[\s.,:;\-\/|]/g);
  } else if (
    souce.match(/^([012][0-9])+$/)
    ) {
    var r=souce.match(/\d\d/g);
  } else {
    var r=souce.match(/\d/g);
  }
  //debug("to012abcString()");
  //debug(souce);
  //debug(r);
  var result="";
  for (var i in r) {
    if (r[i]=="00"||r[i]=="0") { r[i]="a" }
    else if (r[i]=="01"||r[i]=="1") { r[i]="b" }
    else if (r[i]=="02"||r[i]=="2") { r[i]="c" }
    else if (r[i]=="03"||r[i]=="3") { r[i]="d" }
    else if (r[i]=="04"||r[i]=="4") { r[i]="e" }
    else if (r[i]=="05"||r[i]=="5") { r[i]="f" }
    else if (r[i]=="06"||r[i]=="6") { r[i]="g" }
    else if (r[i]=="07"||r[i]=="7") { r[i]="h" }
    else if (r[i]=="08"||r[i]=="8") { r[i]="i" }
    else if (r[i]=="09"||r[i]=="9") { r[i]="j" }
    else if (r[i]=="10") { r[i]="k"; }
    else if (r[i]=="11") { r[i]="l"; }
    else if (r[i]=="12") { r[i]="m"; }
    else if (r[i]=="13") { r[i]="n"; }
    else if (r[i]=="14") { r[i]="o"; }
    else if (r[i]=="15") { r[i]="p"; }
    else if (r[i]=="16") { r[i]="q"; }
    else if (r[i]=="17") { r[i]="r"; }
    else if (r[i]=="18") { r[i]="s"; }
    else if (r[i]=="19") { r[i]="t"; }
    else if (r[i]=="20") { r[i]="u"; }
    else if (r[i]=="21") { r[i]="v"; }
    else if (r[i]=="22") { r[i]="w"; }
    else if (r[i]=="23") { r[i]="x"; }
    else if (r[i]=="24") { r[i]="y"; }
    else if (r[i]=="25") { r[i]="z"; }
    result+=r[i];
  }
  return result;
}

//123abc変換(数字列 スペース区切り可)
//区切りなしなら強制2桁
function to123abcString(souce) {
  if (souce.match(/\d[\s.,:;\-\/|]\d/)) {
    var r=souce.split(/[\s.,:;\-\/|]/g);
  } else if (
    souce.match(/^([012][0-9])+$/)
    ) {
    var r=souce.match(/\d\d/g);
  } else {
    var r=souce.match(/\d/g);
  }
  var result="";
  for (var i in r) {
    if (r[i]=="01"||r[i]=="1") { r[i]="a" }
    else if (r[i]=="02"||r[i]=="2") { r[i]="b" }
    else if (r[i]=="03"||r[i]=="3") { r[i]="c" }
    else if (r[i]=="04"||r[i]=="4") { r[i]="d" }
    else if (r[i]=="05"||r[i]=="5") { r[i]="e" }
    else if (r[i]=="06"||r[i]=="6") { r[i]="f" }
    else if (r[i]=="07"||r[i]=="7") { r[i]="g" }
    else if (r[i]=="08"||r[i]=="8") { r[i]="h" }
    else if (r[i]=="09"||r[i]=="9") { r[i]="i" }
    else if (r[i]=="10") { r[i]="j"; }
    else if (r[i]=="11") { r[i]="k"; }
    else if (r[i]=="12") { r[i]="l"; }
    else if (r[i]=="13") { r[i]="m"; }
    else if (r[i]=="14") { r[i]="n"; }
    else if (r[i]=="15") { r[i]="o"; }
    else if (r[i]=="16") { r[i]="p"; }
    else if (r[i]=="17") { r[i]="q"; }
    else if (r[i]=="18") { r[i]="r"; }
    else if (r[i]=="19") { r[i]="s"; }
    else if (r[i]=="20") { r[i]="t"; }
    else if (r[i]=="21") { r[i]="u"; }
    else if (r[i]=="22") { r[i]="v"; }
    else if (r[i]=="23") { r[i]="w"; }
    else if (r[i]=="24") { r[i]="x"; }
    else if (r[i]=="25") { r[i]="y"; }
    else if (r[i]=="26") { r[i]="z"; }
    result+=r[i];
  }
  return result;
}


//一文字ずつ012abc変換(一～二桁)
function to012abc(str) {
  if (str=="00"||str=="0") { str="a" }
  else if (str=="01"||str=="1") { str="b" }
  else if (str=="02"||str=="2") { str="c" }
  else if (str=="03"||str=="3") { str="d" }
  else if (str=="04"||str=="4") { str="e" }
  else if (str=="05"||str=="5") { str="f" }
  else if (str=="06"||str=="6") { str="g" }
  else if (str=="07"||str=="7") { str="h" }
  else if (str=="08"||str=="8") { str="i" }
  else if (str=="09"||str=="9") { str="j" }
  else if (str=="10") { str="k"; }
  else if (str=="11") { str="l"; }
  else if (str=="12") { str="m"; }
  else if (str=="13") { str="n"; }
  else if (str=="14") { str="o"; }
  else if (str=="15") { str="p"; }
  else if (str=="16") { str="q"; }
  else if (str=="17") { str="r"; }
  else if (str=="18") { str="s"; }
  else if (str=="19") { str="t"; }
  else if (str=="20") { str="u"; }
  else if (str=="21") { str="v"; }
  else if (str=="22") { str="w"; }
  else if (str=="23") { str="x"; }
  else if (str=="24") { str="y"; }
  else if (str=="25") { str="z"; }
  return str;
}

//一文字ずつ123abc変換(一～二桁)
function to123abc(str) {
  if (str=="01"||str=="1") { str="a" }
  else if (str=="02"||str=="2") { str="b" }
  else if (str=="03"||str=="3") { str="c" }
  else if (str=="04"||str=="4") { str="d" }
  else if (str=="05"||str=="5") { str="e" }
  else if (str=="06"||str=="6") { str="f" }
  else if (str=="07"||str=="7") { str="g" }
  else if (str=="08"||str=="8") { str="h" }
  else if (str=="09"||str=="9") { str="i" }
  else if (str=="10") { str="j"; }
  else if (str=="11") { str="k"; }
  else if (str=="12") { str="l"; }
  else if (str=="13") { str="m"; }
  else if (str=="14") { str="n"; }
  else if (str=="15") { str="o"; }
  else if (str=="16") { str="p"; }
  else if (str=="17") { str="q"; }
  else if (str=="18") { str="r"; }
  else if (str=="19") { str="s"; }
  else if (str=="20") { str="t"; }
  else if (str=="21") { str="u"; }
  else if (str=="22") { str="v"; }
  else if (str=="23") { str="w"; }
  else if (str=="24") { str="x"; }
  else if (str=="25") { str="y"; }
  else if (str=="26") { str="z"; }
  return str;
}

function abc012(str, shikiri) {
  return letter2Num(str, shikiri);
}

function letter2Num(str, shikiri) {
  if (!str) return;
  var b = str.split("");
  for (var i=0; i < b.length; i=i+1) {
    if (b[i].match(/a/i)) { b[i]="0"; }
    else if (b[i].match(/b/i)) { b[i]="1"; }
    else if (b[i].match(/c/i)) { b[i]="2"; }
    else if (b[i].match(/d/i)) { b[i]="3"; }
    else if (b[i].match(/e/i)) { b[i]="4"; }
    else if (b[i].match(/f/i)) { b[i]="5"; }
    else if (b[i].match(/g/i)) { b[i]="6"; }
    else if (b[i].match(/h/i)) { b[i]="7"; }
    else if (b[i].match(/i/i)) { b[i]="8"; }
    else if (b[i].match(/j/i)) { b[i]="9"; }
    else if (b[i].match(/k/i)) { b[i]="10"; }
    else if (b[i].match(/l/i)) { b[i]="11"; }
    else if (b[i].match(/m/i)) { b[i]="12"; }
    else if (b[i].match(/n/i)) { b[i]="13"; }
    else if (b[i].match(/o/i)) { b[i]="14"; }
    else if (b[i].match(/p/i)) { b[i]="15"; }
    else if (b[i].match(/q/i)) { b[i]="16"; }
    else if (b[i].match(/r/i)) { b[i]="17"; }
    else if (b[i].match(/s/i)) { b[i]="18"; }
    else if (b[i].match(/t/i)) { b[i]="19"; }
    else if (b[i].match(/u/i)) { b[i]="20"; }
    else if (b[i].match(/v/i)) { b[i]="21"; }
    else if (b[i].match(/w/i)) { b[i]="22"; }
    else if (b[i].match(/x/i)) { b[i]="23"; }
    else if (b[i].match(/y/i)) { b[i]="24"; }
    else if (b[i].match(/z/i)) { b[i]="25"; }
  }
  if (shikiri) {
    return b.join(shikiri);
  } else {
    return b.join("");
  }
}

function abc123(str, shikiri) {
  return toAbc123(str, shikiri);
}

function toAbc123(str, shikiri) {
  var b=str.split("");
  for (var i in b) {
    if (b[i].match(/a/i)) {b[i]="1"}
    else if (b[i].match(/b/i)) {b[i]="2"}
    else if (b[i].match(/c/i)) {b[i]="3"}
    else if (b[i].match(/d/i)) {b[i]="4"}
    else if (b[i].match(/e/i)) {b[i]="5"}
    else if (b[i].match(/f/i)) {b[i]="6"}
    else if (b[i].match(/g/i)) {b[i]="7"}
    else if (b[i].match(/h/i)) {b[i]="8"}
    else if (b[i].match(/i/i)) {b[i]="9"}
    else if (b[i].match(/j/i)) {b[i]="10"}
    else if (b[i].match(/k/i)){b[i]="11"}
    else if (b[i].match(/l/i)) {b[i]="12"}
    else if(b[i].match(/m/i)){b[i]="13"}
    else if (b[i].match(/n/i)){b[i]="14"}
    else if (b[i].match(/o/i)){b[i]="15"}
    else if (b[i].match(/p/i)){b[i]="16"}
    else if (b[i].match(/q/i)){b[i]="17"}
    else if (b[i].match(/r/i)) {b[i]="18"}
    else if (b[i].match(/s/i)){b[i]="19"}
    else if (b[i].match(/t/i)) {b[i]="20"}
    else if (b[i].match(/u/i)){b[i]="21"}
    else if (b[i].match(/v/i)){b[i]="22"}
    else if(b[i].match(/w/i)){b[i]="23"}
    else if (b[i].match(/x/i)){b[i]="24"}
    else if (b[i].match(/y/i)){b[i]="25"}
    else if (b[i].match(/z/i)){b[i]="26"}
  }
  if (shikiri) {
    return b.join(shikiri);
  } else {
    return b.join("");
  }
}

//段組文字列から二次元配列を得る
function makeRect(str) {
  var result = [];
  var temp=str.split(/\n/);
  for (var i in temp) {
    result.push(temp[i].split(""));
  }
  return result;
}

// 文字列から10進へ
function asciiDec(str) {
  var tmp=[];
  var tmpK=2; //桁
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(10);
    tmp.push(tmp2);
    if (tmpK==2 && tmp2>=100) tmpK=3;
  }
  if (tmpK==3) {
    for (var i in tmp) {
      ("000"+tmp[i]).slice(-3);
    }
  } else {
    for (var i in tmp) {
      ("00"+tmp[i]).slice(-2);
    }
  }
  return tmp.join(" ");
}

// 文字列から16進へ
function asciiHex(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(16);
    tmp.push(
      ("00"+tmp2).slice(-2));
  }
  return tmp.join(" ");
}

// 文字列から8進へ
function asciiOct(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(8);
    tmp.push(
      ("000"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// 文字列からバイナリへ
function asciiBin(str) {
  var tmp=[];
  for (var i in str) {
    var tmp2=
      str[i].charCodeAt().toString(2);
    tmp.push(
      ("00000000"+tmp2).slice(-8));
  }
  return tmp.join(" ");
}

//DecASCII
//スペース区切りの10進コードから変換
//区切りなしならASCIIコードの範囲内だけを変換、あとはそのまま
// 第二引数が無ければ変換できない部分を括弧付きで出力して。引数が1なら括弧なし
function decASCII(str, kakko) {
  if (!str) return false;
    
  var asciiREplus=new RegExp(
    "(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6]|.+?)", "g");
    
  var asciiRE=new RegExp(
    "^(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])$", "g");

  var nums=[];
  if (str.match(/^(\d{2,3}\s+)*(\d{2,3})$/)) {
    nums=str.split(/\s+/g);
  } else {
    nums=str.match(asciiREplus);
  }
  var tmp="";
  var f=0; // かっこフラグ
  if (!kakko) kakko=0;
  
  for (var i in nums) {
    if (nums[i].match(/^\s+$/)) {
      continue;
    } else if (nums[i].match(asciiRE)) {
      if (f==1) { tmp+=")"; f=0; }
      tmp+=
        String.fromCharCode(nums[i]);
    } else {
      if (f==1) { tmp+=nums[i] } 
      else if (f==0) { 
        if (kakko==0) {
          tmp+="(";
          f=1;
        }
        tmp+=nums[i];
      }
    }
  }
  if (f==1) tmp+=")";
  
  return tmp;
}


//DecASCII
//スペース区切りの10進コードから変換
//区切りなしならASCIIコードの範囲内だけを変換、あとはそのまま
function decASCII_old(str) {
  
  var asciiNumRE=new RegExp(
    "(0?[4][8-9]|0?[5][0-7]|0?[6][5-9]|0?[7-8][0-9]|0?[9][0]|0?[9][7-9]|[1][0-1][0-9]|[1][2][0-2])", "g");
    
  var asciiRE=new RegExp(
    "(0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])", "g");
  
  var asciiREfix=new RegExp(
    "^((0?[3][2-9]|0?[4-9][0-9]|1[0-2][0-9]|12[0-6])\s*)+$", "");
    
  if (str.match(asciiREfix)) {
    var nums=str.match(asciiRE);
  } else {
    var nums=str.match(asciiNumRE);
  }
  
  var tmp="";
  for (var i in nums) {
    if (nums[i].match(asciiRE)) {
      tmp+=String.fromCharCode(
        nums[i])
    } else {
      tmp+="("+nums[i]+")";
    }
  }
  return tmp;
}


// HexASCII
//スペース区切りの16進コードから変換
//区切りなしなら強制二桁で変換
function hexASCII(line) {
  if (line.match(/\w\s+\w/)) {
    var strlist=line.split(/\s+/g);
  } else {
    var strlist=line.match(/\w\w/g);
  }
  
  var tmp="";
  for (var j in strlist) {
   tmp+=String.fromCharCode(
     parseInt(strlist[j], 16));
  }
  return tmp;
}

// hexbash
function hexbash(str) {
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[0-7]/i)) {
      a[i]=a[i].replace(/[0]/i, "f");
      a[i]=a[i].replace(/[1]/i, "e");
      a[i]=a[i].replace(/[2]/i, "d");
      a[i]=a[i].replace(/[3]/i, "c");
      a[i]=a[i].replace(/[4]/i, "b");
      a[i]=a[i].replace(/[5]/i, "a");
      a[i]=a[i].replace(/[6]/i, "9");
      a[i]=a[i].replace(/[7]/i, "8");
    } else if (a[i].match(/[89a-f]/i)) {
      a[i]=a[i].replace(/[8]/i, "7");
      a[i]=a[i].replace(/[9]/i, "6");
      a[i]=a[i].replace(/[a]/i, "5");
      a[i]=a[i].replace(/[b]/i, "4");
      a[i]=a[i].replace(/[c]/i, "3");
      a[i]=a[i].replace(/[d]/i, "2");
      a[i]=a[i].replace(/[e]/i, "1");
      a[i]=a[i].replace(/[f]/i, "0");
    }
  }
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(a[i].match(/[a-z]/)) a[i]=a[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(a[i].match(/[A-Z]/)) a[i]=a[i].toLowerCase();
    }
  }
  return a.join("");
}

// binASCII
//8ビットで変換
function binASCII(line) {
  line=line.replace(/\s+/g, "");
  var binlist=line.match(/[01]{8}/g);
 
  var tmp="";
  for (var j in binlist) {
    tmp+=String.fromCharCode(
      parseInt(binlist[j], 2));
  }
  return tmp;
}

// binOct
//8ビットで変換
function binOct(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(8);
    tmp.push(("00"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// binDec
//8ビットで変換
function binDec(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(10);
    tmp.push(("00"+tmp2).slice(-3));
  }
  return tmp.join(" ");
}

// binHex
//8ビットで変換
function binHex(line) {
  line=line.replace(/\s+/g, "");
  var binL=line.match(/[01]{8}/g);
 
  var tmp=[];
  for (var j in binL) {
    var tmp2=
      parseInt(binL[j],2).toString(16);
    tmp.push(("00"+tmp2).slice(-2));
  }
  return tmp.join(" ");
}

// binbash
function binbash(str) {
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/1/)) {  
      a[i]="0";
    } else if (a[i].match(/0/)) {
      a[i]="1";
    }
  }
  return a.join("");
}

// OctASCII
//スペース区切りの8進コードから変換
//区切りなしなら強制3桁で変換
function octASCII(line) {
  if (line.match(/\d\s+\d/)) {
    var strlist=line.split(/\s+/g);
  } else {
    var strlist=line.match(/\d\d\d/g);
  }
  var tmp="";
  for (var j in strlist) {
   tmp+=String.fromCharCode(
     parseInt(strlist[j], 8));
  }
  return tmp;
}

// octbash
function octbash(str) {
  var a=str.split("");
  for (var i=0; i<a.length; i++) {
    if (a[i].match(/[0-3]/)) {
      a[i]=a[i].replace(/[0]/i, "7");
      a[i]=a[i].replace(/[1]/i, "6");
      a[i]=a[i].replace(/[2]/i, "5");
      a[i]=a[i].replace(/[3]/i, "4");
    } else if (a[i].match(/[4-7]/)) {
      a[i]=a[i].replace(/[4]/i, "3");
      a[i]=a[i].replace(/[5]/i, "2");
      a[i]=a[i].replace(/[6]/i, "1");
      a[i]=a[i].replace(/[7]/i, "0");
    }
  }
  return a.join("");
}

// hexBin
function hexBin(line) {
  line=line.replace(/\s+/g, "");
  if (line.match(/[^0-9a-f]/i)) return;
  var hexlist=line.match(/.{1,2}/g);
  var tmp="";
  for (var j in hexlist) {
    var tmp2=
      parseInt(hexlist[j], 16).toString(2);
    tmp+=("00000000"+tmp2).slice(-8);
  }
  return tmp;
}
  
//大文字と小文字を入れ替える
function exchangeUpLow(str) {
var tmp="";
for (var i in str) {
  if (str[i].match(/[A-Z]/)) {
    tmp+=str[i].toLowerCase();
  } else if (str[i].match(/[a-z]/)) {
    tmp+=str[i].toUpperCase();
  } else {
    tmp+=str[i];
  }
}
return tmp;
}


//ひらがなカタカナ相互変換
function swapHiraKata(str) {
  var map="あアいイうウえエおオ";
  map+="かカきキくクけケこコ";
  map+="さサしシすスせセそソ";
  map+="たタちチつツてテとト";
  map+="なナにニぬヌねネのノ";
  map+="はハひヒふフへヘほホ";
  map+="まマみミむムめメもモ";
  map+="やヤゆユよヨ";
  map+="らラりリるルれレろロ";
  map+="わワをヲんン";

  var result="";
  for (var i=0; i<str.length; i++) {
    if (str[i].match(/[あ-ん]/)) {
      var j=map.indexOf(str[i])+1;
      result+=map[j];
    } else if (str[i].match(/[ア-ン]/)) {
      var j=map.indexOf(str[i])-1;
      result+=map[j];
    } else {
      result+=str[i];
    }
  }
  return result;
}

//カタカナをひらがなへ変換
function kata2hira(str) {
  var map="あアいイうウえエおオ";
  map+="かカきキくクけケこコ";
  map+="さサしシすスせセそソ";
  map+="たタちチつツてテとト";
  map+="なナにニぬヌねネのノ";
  map+="はハひヒふフへヘほホ";
  map+="まマみミむムめメもモ";
  map+="やヤゆユよヨ";
  map+="らラりリるルれレろロ";
  map+="わワをヲんン";

  var result="";
  for (var i=0; i<str.length; i++) {
    if (str[i].match(/[ア-ン]/)) {
      var j=map.indexOf(str[i])-1;
      result+=map[j];
    } else {
      result+=str[i];
    }
  }
  return result;
}

//パスコにdoooonの署名を加工
function doooonSig(str) {
  str=str.toLowerCase();

  function setSign1(match, p1,p2) {
    return p1+p2.toUpperCase();
  }
  function setSign2(match, p1,p2) {
    return p1.toUpperCase()+p2; 
  }
  str = str.replace(
    /^(\d*)([a-z])/i, setSign1);
  str = str.replace(
    /([a-z])(\d*[a-z]\d*)$/i, setSign2);
  return str;
}

