
// Lib_decode_func
// #IMPORT Lib_decode_basic
// #LIB

//======================================



// adfgvx暗号
function adfgvx(str,key,mode) {
  if(!str||!mode) return null;
  if(!str.match(/^[a-z0-9]+$/i)) return null;
  if(key&&!key.match(/^[a-z0-9]+$/i)) return null;
  
  // keyをアルファベット重複なしに整形
  var newkey=[];  
  key.toUpperCase().split("").forEach(
    function(val,index,ar){
      if(newkey.indexOf(val)==-1) newkey.push(val);
    }
  );

  // 換字表を作成
  var sqstr=newkey.join("");
  "abcdefghijklmnopqrstuvwxyz0123456789".split("").forEach(function(val,i,ar){
    if (sqstr.indexOf(val)==-1) sqstr+=val;
  });
  var sq=sqstr.match(/.{6}/g);
  sq.forEach(function(val,i,ar){ar[i]=val.split("");});
  
  var result=[];
  var resulttmp=[];
  if (newkey.length==0) newkey="ADFGVX".split("");
  
  // エンコード
  function adfgvxEnc() {

    // ループで換字表から拾う
    for(var k in str){ 
      var nxt=0;
      for(var i in sq) {
        for(var j in sq[i]){
          var tmpRE=new RegExp(sq[i][j], "i");
          if(str[k].match(tmpRE)) {
            resulttmp.push(i);
            resulttmp.push(j);
            nxt=1;
            break;
          }
        }
        if(nxt) break;
      }
    }
    
    newkey.forEach(function(v,i,a){
      result[i]=v;
    });    
    resulttmp.forEach(function(v,i,a){
      result[i%newkey.length]+=v;
    });
    
    result.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });
    
    result.forEach(function(v,i,a){
      result[i]=v.slice(1,v.length);
    });
    
    // 数字をADFGVXに変換
    result.forEach(function(val,i,ar){
      ar[i]=val.replace(/0/g,"A").replace(/1/g,"D").replace(/2/g,"F").replace(/3/g,"G").replace(/4/g,"V").replace(/5/g,"X");
    });

    return result.join("");
  }
  
  // デコード
  function adfgvxDec() {

    // 何文字ずつ別けるかを計算
    var tmp1=str.length/newkey.length;
    var tmp2=parseInt(str.length/newkey.length);
    var tmp3=str.length%newkey.length;

    // 何文字かと元の位置をヘッダとしてkeyに埋め込む
    newkey.forEach(function(val,i,ar){if(i<tmp3){newkey[i]=[val,i,tmp2+1];}else{newkey[i]=[val,i,tmp2]}});
    
    // keyをソート
    var sortednewkey=newkey.concat();
    sortednewkey.sort(function(a,b){
      if( a[0] < b[0] ) return -1;
      if( a[0] > b[0] ) return 1;
      return 0;
    });

    // エンコード文字列をkey別に拾うってkey配列に追加
    var cnt=0;
    sortednewkey.forEach(function(val,i,ar){
      for(var j=1; j<=val[2]; j++){
        ar[i].push(str[cnt]);
        cnt++;
      }
    });

    // もとのnewkeyの並びに戻す
    var orderdnewkey=sortednewkey.concat();
    orderdnewkey.sort(function(a,b){
      if( a[1] < b[1] ) return -1;
      if( a[1] > b[1] ) return 1;
      return 0;
    });

    // 余分なヘッダ部分を削除
    orderdnewkey.forEach(function(val,i,ar){
      ar[i]=val.slice(3,val.length);
    });
  
    // 配列の縦横を入れ替えて読み出す
    for(var j=0; j<orderdnewkey[0].length; j++){
      orderdnewkey.forEach(function(val,i,ar){
        if (val[j]) resulttmp.push(val[j]);
      });
    }

    // ADFGVXを数字に変換
    resulttmp.forEach(function(val,i,ar){
      ar[i]=val.replace(/A/g,"0").replace(/D/g,"1").replace(/F/g,"2").replace(/G/g,"3").replace(/V/g,"4").replace(/X/g,"5");
    });

    var tmppair=resulttmp.join("").match(/../g);

    // 換字表から拾う
    tmppair.forEach(function(val,i,ar){
      result.push(sq[val[0]][val[1]].toLowerCase());
    });

    return result.join(""); 
  }

  // main
  if (mode.match(/^\s*decode\s*$/i)) {
    return adfgvxDec();
  } else if (mode.match(/^\s*encode\s*$/i)) {
    return adfgvxEnc();
  } else {
    return null;
  }

} // end function adfgvx


// adfgx暗号
function adfgx(str,key,mode) {
  if(!str||!mode) return null;
  if(!str.match(/^[a-z]+$/i)) return null;
  if(key&&!key.match(/^[a-z]+$/i)) return null;
  
  // jをiとする
  str=str.replace(/j/ig, "i");
  key=key.replace(/j/ig, "i");
  
  // keyをアルファベット重複なしに整形
  var newkey=[];  
  key.toUpperCase().split("").forEach(
    function(val,index,ar){
      if(newkey.indexOf(val)==-1) newkey.push(val);
    }
  );

  // 換字表を作成
  var sqstr=newkey.join("");
  "abcdefghiklmnopqrstuvwxyz".split("").forEach(function(val,i,ar){
    if (sqstr.indexOf(val)==-1) sqstr+=val;
  });
  var sq=sqstr.match(/.{5}/g);
  sq.forEach(function(val,i,ar){ar[i]=val.split("");});
  
  var result=[];
  var resulttmp=[];
  if (newkey.length==0) newkey="ADFGX".split("");
  
  // エンコード
  function adfgxEnc() {

    // ループで換字表から拾う
    for(var k in str){ 
      var nxt=0;
      for(var i in sq) {
        for(var j in sq[i]){
          var tmpRE=new RegExp(sq[i][j], "i");
          if(str[k].match(tmpRE)) {
            resulttmp.push(i);
            resulttmp.push(j);
            nxt=1;
            break;
          }
        }
        if(nxt) break;
      }
    }
    
    newkey.forEach(function(v,i,a){
      result[i]=v;
    });    
    resulttmp.forEach(function(v,i,a){
      result[i%newkey.length]+=v;
    });
    
    result.sort(function(a,b){
      if( a < b ) return -1;
      if( a > b ) return 1;
      return 0;
    });
    
    result.forEach(function(v,i,a){
      result[i]=v.slice(1,v.length);
    });
    
    // 数字をADFGXに変換
    result.forEach(function(val,i,ar){
      ar[i]=val.replace(/0/g,"A").replace(/1/g,"D").replace(/2/g,"F").replace(/3/g,"G").replace(/4/g,"X");
    });

    return result.join("");
  }
  
  // デコード
  function adfgxDec() {

    // 何文字ずつ別けるかを計算
    var tmp1=str.length/newkey.length;
    var tmp2=parseInt(str.length/newkey.length);
    var tmp3=str.length%newkey.length;

    // 何文字かと元の位置をヘッダとしてkeyに埋め込む
    newkey.forEach(function(val,i,ar){if(i<tmp3){newkey[i]=[val,i,tmp2+1];}else{newkey[i]=[val,i,tmp2]}});
    
    // keyをソート
    var sortednewkey=newkey.concat();
    sortednewkey.sort(function(a,b){
      if( a[0] < b[0] ) return -1;
      if( a[0] > b[0] ) return 1;
      return 0;
    });

    // エンコード文字列をkey別に拾うってkey配列に追加
    var cnt=0;
    sortednewkey.forEach(function(val,i,ar){
      for(var j=1; j<=val[2]; j++){
        ar[i].push(str[cnt]);
        cnt++;
      }
    });

    // もとのnewkeyの並びに戻す
    var orderdnewkey=sortednewkey.concat();
    orderdnewkey.sort(function(a,b){
      if( a[1] < b[1] ) return -1;
      if( a[1] > b[1] ) return 1;
      return 0;
    });

    // 余分なヘッダ部分を削除
    orderdnewkey.forEach(function(val,i,ar){
      ar[i]=val.slice(3,val.length);
    });
  
    // 配列の縦横を入れ替えて読み出す
    for(var j=0; j<orderdnewkey[0].length; j++){
      orderdnewkey.forEach(function(val,i,ar){
        if (val[j]) resulttmp.push(val[j]);
      });
    }

    // ADFGXを数字に変換
    resulttmp.forEach(function(val,i,ar){
      ar[i]=val.replace(/A/g,"0").replace(/D/g,"1").replace(/F/g,"2").replace(/G/g,"3").replace(/X/g,"4");
    });

    var tmppair=resulttmp.join("").match(/../g);

    // 換字表から拾う
    tmppair.forEach(function(val,i,ar){
      result.push(sq[val[0]][val[1]].toLowerCase());
    });

    return result.join(""); 
  }

  // main
  if (mode.match(/^\s*decode\s*$/i)) {
    return adfgxDec();
  } else if (mode.match(/^\s*encode\s*$/i)) {
    return adfgxEnc();
  } else {
    return null;
  }

} // end function adfgx



// RailFence
function railfence(str,mode,line) {
  if (!str || !mode || !mode.match(/decode|decript|encode|encript/i)) {
    return false;
  }
  if (!line) line=3; // デフォルトは3としておく
  if ((typeof line)!="number" || line<3 || str.length<=line){
    return false;
  }

  // 二次元配列の縦横を入れ換える
  function refr(rect) {
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
    return newRect;
  }

  if (mode.match(/decode|decript/i)) {
    var zan2colend=str.length-line; //2列目以降の数(1列目だけlineの数で、2列目以降はline-1で繰り返すため)
    var col=Math.ceil(zan2colend/(line-1))+1; //最終的な列数
    var use=(col-1)*(line-1)+1; //仕様文字数。最後の列を除いた数☓(line-1)+1(1列目の1文字目を追加)
    var zanlast=str.length-use;  // 最終列に使う文字数
    var last_row_index=zanlast;  // zanlastは1行目が空行なのでそのまま添字。
  
    var rect=new Array(line);
    var count=0;
    
    // 配置
    for (var i=0; i<line; i++) {
      rect[i]=[];
      for (var j=0; j<col; j++) {
        if (j%2==1 && i==line-1) {
          rect[i][j]="";
          continue;
        } else if (j%2==0 && i==0 && j>0) {
          rect[i][j]="";
          continue;
        } else if (i>last_row_index && j==col-1) {
          rect[i][j]="";
          continue;
        }
        // console.log("rect["+i+"]["+j+"]=str["+count+"] ("+str[count]+")");
        rect[i][j]=str[count];
        count++;
      }    
    }
  
    rect=refr(rect);
    for(var i in rect) {
      if (i%2!=0) rect[i]=rect[i].reverse();
    }
    // console.log("rect=\n"+rect.map(function (tmp){return "["+tmp.join(",")+"]";}).join("\n"));
    
    // 読み出し
    return rect.map(function (v){return v.join("");}).join("");
    
  } else if (mode.match(/encode|encript/i)) {
    var rect=[];
    var count=0;

    // 配置
    for(var i=0; count<str.length; i++) {
      rect[i]=[];
      for(var j=0; j<line; j++) {
        if (i>=1 && j==0) {
          rect[i][j]="";
          continue;
        }
        if (count<str.length) {
          rect[i][j]=str[count];
          count++;
        } else {
          rect[i][j]="";
        }
      }
    }

    for(var i in rect) {
      if (i%2!=0) rect[i]=rect[i].reverse();
    }
   
    rect=refr(rect);

    // 読み出し
    return rect.map(function (v){return v.join("");}).join("");

  }
} // end function railfence



// Rectスライド
function rectSlide(rect,xy,val) {
  // rectは\n区切りの文字列"aaaaa\nbbbbb\nccccc\n"
  // valはスライド量文字列(コンマ区切り)"+1,-2,+3,-4,+5,+1,0,-1"
  // xyはスライド方向 "x" or "y"
  if ( !rect || !rect.match(/\n/) || !xy.match(/^[xy]$/i) || !val.match(/^([+\-]?\d+,)*([+\-]?\d+)$/) ) return null;

  var tmpL=rect.split(/\n/g);
  var maxLength=0;

  //各行から最大値を取得
  for (var i in tmpL) {
    if (tmpL[i].length > maxLength) maxLength=tmpL[i].length;
  }

  //最大値に合わせてスペースを追加
  for (var i in tmpL) {
    if (tmpL[i].length < maxLength) {
      var n=maxLength-tmpL[i].length;
      for (var j=0; j<n; j++) { tmpL[i]+="∎"; }
    }
  }
  
  //スライド値を全て用意
  var valL=val.split(/,/g);
  if (valL.length<maxLength) {
    var n=maxLength-valL.length;
    for (var j=0; j<n; j++) { valL.push("0"); }
  } else if (valL.length>maxLength) {
    var n=valL.length-maxLength;
    valL.splice(maxLength-1, n,);
  }
  
  // y方向なら縦横入れ替え
  if (xy.match(/y/i)) tmpL=rectReflect(tmpL,"text");
  
  // スライド実行
  for (var i in tmpL) {

    var sign="+";    
    if (valL[i].match(/-/)) sign="-";

    // lengthを超えないように
    var valN=valL[i].match(/\d+/)[0]%tmpL[0].length;

    // 縦横を入れ替えた場合(方向がyの場合)は、シフトするプラスマイナスの方向が逆になることに注意
    if (xy.match(/x/i)) {
      if (sign=="-") {
        var tmpRE=new RegExp("(.{"+valN+"})(.*)");
        tmpL[i]=tmpL[i].replace(tmpRE, "$2$1");
      } else if (sign=="+") {
        var tmpRE=new RegExp("(.{"+valN+"})(.*)");
        tmpL[i]=strReverse(tmpL[i]);
        tmpL[i]=tmpL[i].replace(tmpRE, "$2$1");
        tmpL[i]=strReverse(tmpL[i]);
      }
    } else if (xy.match(/y/i)) {
      if (sign=="+") {
        var tmpRE=new RegExp("(.{"+valN+"})(.*)");
        tmpL[i]=tmpL[i].replace(tmpRE, "$2$1");
      } else if (sign=="-") {
        var tmpRE=new RegExp("(.{"+valN+"})(.*)");
        tmpL[i]=strReverse(tmpL[i]);
        tmpL[i]=tmpL[i].replace(tmpRE, "$2$1");
        tmpL[i]=strReverse(tmpL[i]);
      }
    }
  }

  // y方向なら縦横入れ替え
  if (xy.match(/y/i)) tmpL=rectReflect(tmpL,"text");

  return tmpL.join("\n");
}


// Rect読み出し
function rectRead(rect, spacerstr) {

  if (!spacerstr) spacerstr="";
  let spacer=new RegExp(spacerstr, "g");

  var yLen = rect.length;
  var xLen = rect[0].length;

  // rect表示
  for (var k in rect) {
    htmlTmp.push(rect[k].join(""));
  }

  htmlTmp.push("---------");
  htmlTmp.push("横/縦読み");

  //左上から横読み
  var result = "";
  for (var y=0; y<yLen; y=(y+1)|0) {
      for (var x=0; x<xLen; x=(x+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //左下から横読み
  var result = "";
  for (var y=(yLen-1)|0; 0<=y; y=(y-1)|0) {
      for (var x=0; x<xLen; x=(x+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //右下から左横読み
  var result = "";
  for (var y=(yLen-1)|0; 0<=y; y=(y-1)|0) {
      for (var x=(xLen-1)|0; 0<=x; x=(x-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //右上から左横読み
  var result = "";
  for (var y=0; y<yLen; y=(y+1)|0) {
      for (var x=xLen-1; 0<=x; x=(x-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));
  
  //左下から縦読み
  var result = "";
  for (var x=0; x<xLen; x=(x+1)|0) {
      for (var y=yLen-1; 0<=y; y=(y-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //左上から縦読み
  var result = "";
  for (var x=0; x<xLen; x=(x+1)|0) {
      for (var y=0; y<yLen; y=(y+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //右上から縦読み
  var result = "";
  for (var x=xLen-1; 0<=x; x=(x-1)|0) {
      for (var y=0; y<yLen; y=(y+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  //右下から縦読み
  var result = "";
  for (var x=xLen-1; 0<=x; x=(x-1)|0) {
      for (var y=yLen-1; 0<=y; y=(y-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result.replace(spacer,""));

  htmlTmp.push("-------");
  htmlTmp.push("渦巻き読み");

  //左上から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=0; //現在値
  var yN=0; //現在値
  for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

  //右上から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=0; //現在値
  for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

  //右下から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmax; //現在値
  for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

  //左下から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmax; //現在値
  for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

//++++++++++

  //左上から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmin; //現在値
  for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

 //左下から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmax; //現在値
  for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

  //右下から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmax; //現在値
  for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");

  //右上から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmin; //現在値
  for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result.replace(spacer,""));
  htmlCode(strReverse(result.replace(spacer,"")), "逆");
    
  htmlTmp.push("-------");
  htmlTmp.push("折り返し読み");

  //左上から右へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=0; y<=yNmax; y=(y+1)|0) {
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    y=y+1;
    if (yNmax<y) break;
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    if (yNmax<y) break;
  }
  htmlCode(r.replace(spacer,""));

  //右上から左へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=0; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    y=y+1;
    if (yNmax<y) break;
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    if (yNmax<y) break;
  }
  htmlCode(r.replace(spacer,""));

  //右下から左へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=yNmax; 0<=y; y=(y-1)|0) {
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    y=y-1;
    if (0>y) break;
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    if (0>y) break;
  }
  htmlCode(r.replace(spacer,""));
  
 //左下から右へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=yNmax; 0<=y; y=(y-1)|0) {
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    y=y-1;
    if (0>y) break;
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    if (0>y) break;
  }
  htmlCode(r.replace(spacer,""));

  //左上から下へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=0; x<=xNmax; x=(x+1)|0) {
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    x=x+1;
    if (xNmax<x) break;
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    if (xNmax<x) break;
  }
  htmlCode(r.replace(spacer,""));

  //右上から下へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=xNmax; 0<=x; x=(x-1)|0) {
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    x=x-1;
    if (0>x) break;
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    if (0>x) break;
  }
  htmlCode(r.replace(spacer,""));

  //右下から上へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=xNmax; 0<=x; x=(x-1)|0) {
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    x=x-1;
    if (0>x) break;
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    if (0>x) break;
  }
  htmlCode(r.replace(spacer,""));

  //左下から上へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=0; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    x=x+1;
    if (xNmax<x) break;
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    if (xNmax<x) break;
  }
  htmlCode(r.replace(spacer,""));

  htmlTmp.push("-------------");
  
} // end function 


/*
// Rect読み出し
function rectRead(rect) {

  var yLen = rect.length;
  var xLen = rect[0].length;

  // rect表示
  for (var k in rect) {
    htmlTmp.push(rect[k].join(""));
  }

  htmlTmp.push("---------");
  htmlTmp.push("横/縦読み");

  //左上から横読み
  var result = "";
  for (var y=0; y<yLen; y=(y+1)|0) {
      for (var x=0; x<xLen; x=(x+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //左下から横読み
  var result = "";
  for (var y=(yLen-1)|0; 0<=y; y=(y-1)|0) {
      for (var x=0; x<xLen; x=(x+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //右下から左横読み
  var result = "";
  for (var y=(yLen-1)|0; 0<=y; y=(y-1)|0) {
      for (var x=(xLen-1)|0; 0<=x; x=(x-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //右上から左横読み
  var result = "";
  for (var y=0; y<yLen; y=(y+1)|0) {
      for (var x=xLen-1; 0<=x; x=(x-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);
  
  //左下から縦読み
  var result = "";
  for (var x=0; x<xLen; x=(x+1)|0) {
      for (var y=yLen-1; 0<=y; y=(y-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //左上から縦読み
  var result = "";
  for (var x=0; x<xLen; x=(x+1)|0) {
      for (var y=0; y<yLen; y=(y+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //右上から縦読み
  var result = "";
  for (var x=xLen-1; 0<=x; x=(x-1)|0) {
      for (var y=0; y<yLen; y=(y+1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  //右下から縦読み
  var result = "";
  for (var x=xLen-1; 0<=x; x=(x-1)|0) {
      for (var y=yLen-1; 0<=y; y=(y-1)|0) {
          result=result+rect[y][x];
      }
  }
  htmlCode(result);

  htmlTmp.push("-------");
  htmlTmp.push("渦巻き読み");

  //左上から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=0; //現在値
  var yN=0; //現在値
  for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

  //右上から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=0; //現在値
  for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

  //右下から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmax; //現在値
  for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

  //左下から右渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmax; //現在値
  for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

//++++++++++

  //左上から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmin; //現在値
  for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

 //左下から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmin; //現在値
  var yN=yNmax; //現在値
  for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

  //右下から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmax; //現在値
  for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");

  //右上から左渦巻き読み
  var result = "";
  var xNmax=xLen-1; //進行中最大値
  var yNmax=yLen-1; //進行中最大値
  var xNmin=0; //進行中最小値
  var yNmin=0; //進行中最小値
  var xN=xNmax; //現在値
  var yN=yNmin; //現在値
  for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmax; xNmin<=x; x=(x-1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmin=yNmin+1;
    if (yNmax<yNmin) break;
    for (var y=yNmin; y<=yNmax; y=(y+1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmin=xNmin+1;
    if (xNmax<xNmin) break;
    for (var x=xNmin; x<=xNmax; x=(x+1)|0) {
      result=result+rect[yN][x];
      xN=x;
    }
    yNmax=yNmax-1;
    if (yNmax<yNmin) break;
    for (var y=yNmax; yNmin<=y; y=(y-1)|0) {
      result=result+rect[y][xN];
      yN=y;
    }
    xNmax=xNmax-1;
    if (xNmax<xNmin) break;
  }
  htmlCode(result);
  htmlCode(strReverse(result), "逆");
    
  htmlTmp.push("-------");
  htmlTmp.push("折り返し読み");

  //左上から右へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=0; y<=yNmax; y=(y+1)|0) {
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    y=y+1;
    if (yNmax<y) break;
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    if (yNmax<y) break;
  }
  htmlCode(r);

  //右上から左へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=0; y<=yNmax; y=(y+1)|0) {
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    y=y+1;
    if (yNmax<y) break;
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    if (yNmax<y) break;
  }
  htmlCode(r);

  //右下から左へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=yNmax; 0<=y; y=(y-1)|0) {
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    y=y-1;
    if (0>y) break;
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    if (0>y) break;
  }
  htmlCode(r);
  
 //左下から右へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var y=yNmax; 0<=y; y=(y-1)|0) {
    for (var x=0; x<=xNmax; x=(x+1)|0) {
      r=r + rect[y][x];
    }
    y=y-1;
    if (0>y) break;
    for (var x=xNmax; 0<=x; x=(x-1)|0) {
      r=r+ rect[y][x];
    }
    if (0>y) break;
  }
  htmlCode(r);

  //左上から下へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=0; x<=xNmax; x=(x+1)|0) {
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    x=x+1;
    if (xNmax<x) break;
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    if (xNmax<x) break;
  }
  htmlCode(r);

  //右上から下へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=xNmax; 0<=x; x=(x-1)|0) {
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    x=x-1;
    if (0>x) break;
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    if (0>x) break;
  }
  htmlCode(r);

  //右下から上へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=xNmax; 0<=x; x=(x-1)|0) {
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    x=x-1;
    if (0>x) break;
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    if (0>x) break;
  }
  htmlCode(r);

  //左下から上へ折り返し読み
  var r = ""; //result
  var xNmax=xLen-1; //最大値
  var yNmax=yLen-1; //最大値
  for (var x=0; x<=xNmax; x=(x+1)|0) {
    for (var y=yNmax; 0<=y; y=(y-1)|0) {
      r=r+ rect[y][x];
    }
    x=x+1;
    if (xNmax<x) break;
    for (var y=0; y<=yNmax; y=(y+1)|0) {
      r=r + rect[y][x];
    }
    if (xNmax<x) break;
  }
  htmlCode(r);

  htmlTmp.push("-------------");
  
} // end function 
*/

// Rect作成
function goRectangles(str) {
  var len =str.length;
  if (len>10000) {
    htmlTmp.push(
      "rect最大は10000文字です");
    return fales;
  }
  
  for (var i=2; i<=10000; i=(i+1)|0) {
    if (len%i==0&&len!=i) {

     var re=new RegExp(".{"+i+"}", "g");
      //htmlTmp.push(str.replace(re, "$&\n"));
      

      // ノーマルRect読み出し
      var rectSorce=
        makeRect(str.match(re).join("\n"));
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      rectRead(rectSorce); 
      htmlTmp.push("++++++++++++");
      

      // 奇数行reverse
     var rectSorce2=
        copyArray(rectSorce);
      for (var j in rectSorce2) {
        if (j%2) rectSorce2[j].reverse();
      }
      htmlTmp.push("奇数行reverse");
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      rectRead(rectSorce2);
      htmlTmp.push("++++++++++++");


      // 奇数列reverse
      var rectSorce3=
        rectReflect(
          copyArray(rectSorce));
      for (var j in rectSorce3) {
        if (j%2) rectSorce3[j].reverse();
      }
      htmlTmp.push("奇数列reverse");
      htmlTmp.push(
        "(Rect"+i+") "+i+"x"+(len/i));
      rectRead(rectReflect(rectSorce3));
      htmlTmp.push("=============");

    }
  }

  //ピラミッド型rect
  if ((TEXT.length+"").match(/^(6|10|15|21|28|36|45|55)$/)) {
    htmlTmp.push("ピラミッド型");
    
    debug("10.4.2");
    
    let result=[];
    result=pyramidRect(TEXT);
    
    let n=result[0].length;
    result=result.map(v=>{
      let m=n-v.length;
      let r="";
      for (let j=1; j<=m; j++) {
        r="_"+r;
      }
      return (r+v).split("");
    });
    rectRead(result, "_"); 
    htmlTmp.push("------------");
    
    result=[];
    result=pyramidRect(TEXT);
    
    n=result[0].length;
    result=result.map(v=>{
      let m=n-v.length;
      let r="";
      for (let j=1; j<=m; j++) {
        r="_"+r;
      }
      return (v+r).split("");
    });
    rectRead(result, "_"); 
    htmlTmp.push("------------");

    result=[];
    result=pyramidRect(strReverse(TEXT),'reverse');

    n=result[result.length-1].length;
    result=result.map(v=>{
      let m=n-v.length;
      let r="";
      for (let j=1; j<=m; j++) {
        r="_"+r;
      }
      return (r+v).split("");
    });
    rectRead(result, "_"); 
    htmlTmp.push("------------");

    result=[];
    result=pyramidRect(strReverse(TEXT),'reverse');

    n=result[result.length-1].length;
    result=result.map(v=>{
      let m=n-v.length;
      let r="";
      for (let j=1; j<=m; j++) {
        r="_"+r;
      }
      return (v+r).split("");
    });
    rectRead(result, "_"); 
   
   
  }
  

} // end function

//ピラミッド型に並び替え
function pyramidRect(tmp,isReverse){
      let result=[];

      if ((tmp.length+"").match(/^55$/)) {
        tmp=tmp.replace(/^(.{10})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^45$/)) {
        tmp=tmp.replace(/^(.{9})(.*)$/, 
          (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^36$/)) {
        tmp=tmp.replace(/^(.{8})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^28$/)) {
        tmp=tmp.replace(/^(.{7})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^21$/)) {
        tmp=tmp.replace(/^(.{6})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^15$/)) {
        tmp=tmp.replace(/^(.{5})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^10$/)) {
        tmp=tmp.replace(/^(.{4})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^6$/)) {
        tmp=tmp.replace(/^(.{3})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^3$/)) {
        tmp=tmp.replace(/^(.{2})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }
      if ((tmp.length+"").match(/^1$/)) {
        tmp=tmp.replace(/^(.{1})(.*)$/, 
            (m,p1,p2)=>{result.push(p1);return p2});
      }

      if (isReverse && isReverse.match(/^reverse$/i)) {
        result.reverse();
        result=result.map(v=>strReverse(v));
      }
      return result;
} // end func


// skip
function skip(str,i) {
  if(!i||!str) return null;
  if(Number(i)<2|| Number(i)>str.length) {
    return null;
  }
  debug(str);
  var len=str.length;
  var result=[];
  var pos=1;
  
  //1文字目
  result.push(str[pos-1]); //indexは0
  
  //2文字目以降
  for (var j=2; j<=len; j++) { //文字数分
    pos=pos+i;
    debug("pos="+pos+"(len:"+len+")");
    if (pos>len) pos=pos-len; 
    debug("new pos="+pos);
    result.push(str[pos-1]);
  }
    
  return result.join("");
} // end function


// skipAll
function skipAll(str) {
  var len=str.length;
  var resultList=[];
  
  for (var i=2; i<=26; i++) { //skip2～26
    if (len%i==0) continue;
    var result=[];
    var pos=1;
    var nextF=false;
    
    //1文字目
    result.push(str[pos-1]); //indexは0
    
    //2文字目以降
    for (var j=2; j<=len; j++) { //文字数分
      pos=pos+i;
//    debug("pos="+pos+"(len:"+len+")");
      if (pos>len) pos=pos-len; 
//    debug("new pos="+pos);
      if (pos==1) {
        nextF=true;
        break;
      }
      result.push(str[pos-1]);
    }
    if (nextF) {
      nextF=false;
      continue;
    }
    resultList.push(["skip "+i, result.join("")]);
    
  } // end loop
  return resultList;
} // end function

//======================================

// 日本語ポケベル打ち
function pokebellDec(str, opt) {
  // if (!str.match(/^(([0-9][0-9])[\s\.,\\\|\/:;\-\+]?)+$/)) return null;
  var map={
"11":"あ","12":"い","13":"う","14":"え","15":"お","16":"Ａ","17":"Ｂ","18":"Ｃ","19":"Ｄ","10":"Ｅ",
"21":"か","22":"き","23":"く","24":"け","25":"こ","26":"Ｆ","27":"Ｇ","28":"Ｈ","29":"Ｉ","20":"Ｊ",
"31":"さ","32":"し","33":"す","34":"せ","35":"そ","36":"Ｋ","37":"Ｌ","38":"Ｍ","39":"Ｎ","30":"Ｏ",
"41":"た","42":"ち","43":"つ","44":"て","45":"と","46":"Ｐ","47":"Ｑ","48":"Ｒ","49":"Ｓ","40":"Ｔ",
"51":"な","52":"に","53":"ぬ","54":"ね","55":"の","56":"Ｕ","57":"Ｖ","58":"Ｗ","59":"Ｘ","50":"Ｙ",
"61":"は","62":"ひ","63":"ふ","64":"へ","65":"ほ","66":"Ｚ","67":"？","68":"！","69":"－","60":"／",
"71":"ま","72":"み","73":"む","74":"め","75":"も","76":"￥","77":"＆","78":"","79":"","70":"",
"81":"や","82":"（","83":"ゆ","84":"）","85":"よ","86":"＊","87":"＃","88":"","89":"","80":"",
"91":"ら","92":"り","93":"る","94":"れ","95":"ろ","96":"１","97":"２","98":"３","99":"４","90":"５",
"01":"わ","02":"を","03":"ん","04":"゛","05":"゜","06":"６","07":"７","08":"８","09":"９","00":"０"
  }
  
  var tmpL=str.split(/([0-9][0-9])/g);
  
  var result=[];
  for (var i in tmpL) {
    if (!tmpL[i]) continue; // 空の配列
    if (map[tmpL[i]]) {
      result.push([map[tmpL[i]], tmpL[i]]);
    } else {
      result.push([tmpL[i], tmpL[i]]);
    }
  }
  
  if (opt && opt.match(/arrey/i)) {
    // [ 文字, 座標 ] のリスト
    return result;
  } else {
    for (var j in result) {
      result[j]=result[j][0];
    }
    return result.join("");
  }
}

//======================================

// ベーコン🥓
function baconian(str, opt) {
  if (str.match(/[^01\s]/)) return null;
  var map={
    "00000": "a",
    "00001": "b",
    "00010": "c",
    "00011": "d",
    "00100": "e",
    "00101": "f",
    "00110": "g",
    "00111": "h",
    "01000": "i",
    "01001": "j",
    "01010": "k",
    "01011": "l",
    "01100": "m",
    "01101": "n",
    "01110": "o",
    "01111": "p",
    "10000": "q",
    "10001": "r",
    "10010": "s",
    "10011": "t",
    "10100": "u",
    "10101": "v",
    "10110": "w",
    "10111": "x",
    "11000": "y",
    "11001": "z"
  }
  
  var tmpL=str.match(/[01]{1,5}/g);
  
  var result=[];
  for (var i in tmpL) {
    if (!tmpL[i]) continue; // 空の配列
    if (map[tmpL[i]]) {
      //debug(map[tmpL[i]]+" : "+tmpL[i]);
      result.push([map[tmpL[i]], tmpL[i]]);
    } else {
      //debug("∎ : "+tmpL[i]);
      result.push(["∎", tmpL[i]]);
    }
  }
  
  /* 必要ない
  if (str.length%5>=1) {
    result.push([
      "∎", 
      str.slice([str.length-str.length%5])]
    );
  }
  */

  if (opt && opt.match(/arrey/i)) {
    // [ 復号後, バイナリ ] のリスト
    return result;
  } else {
    for (var j in result) {
      result[j]=result[j][0];
    }
    return result.join("");
  }
}

//======================================

// タロットカードのナンバーを取得
function tarotNums(str) {
  // Major Arcana 
  // foolはゼロでもあり22でもある
  var map=[
    ["MAGICIAN|BATELEUR", 1], 
    ["PAPESS|(HIGH)?PRIESTESS|PAPESSE", 2], 
    ["EMPRESS|IMPERATRICE", 3], 
    ["EMPEROR|EMPEREUR", 4], 
    ["POPE|HIEROPHANT|PAPE", 5], 
    ["LOVERS|AMOUREUX", 6], 
    ["CHARIOT", 7], 
    ["STRENGTH|FORTITUDE|FORCE", 8], 
    ["HERMIT|ERMITE", 9], 
    ["WHEEL|ROUE|FORTUNE", 10], 
    ["JUSTICE", 11], 
    ["HANGED(MAN)?|PENDU", 12], 
    ["DEATH|MORT", 13], 
    ["TEMPERANCE", 14], 
    ["DEVIL|DIABLE", 15], 
    ["TOWER|MAISON(dieu)?", 16], 
    ["STAR|ETOILE", 17], 
    ["MOON|LUNE", 18], 
    ["SUN|SOLEIL", 19], 
    ["JUDGEMENT|JUGEMENT", 20], 
    ["WORLD|MONDE", 21], 
    ["FOOL|FOU", 22], 
  ];
  
  var REstr="";
  for (var i in map) {
    REstr+=map[i][0];
    if (i<map.length-1) REstr+="|";
  }
  
  var tmpRE=
    new RegExp(REstr, "ig");
  var tmp=str.match(tmpRE);
  if (!tmp) return;
  debug(tmpRE);
  
  var result=[];
  for (var i in tmp) {
    for (var k in map) {
      var tmpRE2=new RegExp(
        "^"+map[k][0]+"$","i");
      var tmp2=tmp[i].match(tmpRE2);
      if (tmp2) {
        result.push([tmp2[0],map[k][1]]);
        break;
      }
    }
  }
  // [タロット, 数字 ] のリストを返す
  return result;
}

//======================================

// ローマ数字をアラビア数字へ(単数)
function romanNum(str) {
  var RE_01_09=
    "(ix|iv|v?i{1,4}|v)?";
  var RE_10_99=
    "(xc|xl|l?x{1,4}|l)?"+RE_01_09;
  var RE_100_999=
    "(cm|cd|d?c{1,4}|d)?"+RE_10_99;
  var RE_1000_9999=
    "(m{1,9})?"+RE_100_999;
  
  var tmpRE=
    new RegExp(RE_1000_9999, "ig");
  var tmpRE2=new RegExp(
      "^"+RE_1000_9999+"$", "i");
  
  var map={
    "mmmmmmmmm": 9000, 
    "mmmmmmmm": 8000, 
    "mmmmmmm": 7000, 
    "mmmmmm": 6000, 
    "mmmmm": 5000, 
    "mmmm": 4000, 
    "mmm": 3000, 
    "mm": 2000, 
    "m": 1000, 
    "cm": 900, 
    "dcccc": 900, 
    "dccc": 800, 
    "dcc": 700, 
    "dc": 600, 
    "d": 500, 
    "cd": 400, 
    "cccc": 400, 
    "ccc": 300, 
    "cc": 200, 
    "c": 100, 
    "xc": 90, 
    "lxxxx": 90, 
    "lxxx": 80, 
    "lxx": 70, 
    "lx": 60, 
    "l": 50, 
    "xl": 40, 
    "xxxx": 40, 
    "xxx": 30, 
    "xx": 20, 
    "x": 10, 
    "ix": 9, 
    "viiii": 9, 
    "viii": 8, 
    "vii": 7, 
    "vi": 6, 
    "v": 5, 
    "iv": 4, 
    "iiii": 4, 
    "iii": 3, 
    "ii": 2, 
    "i": 1
  }
  
  var result=
    tmpRE2.exec(str);
  
  var mySum=0;
  for (var j in result) {
    if (j>=1 && j<=4 && result[j]) {
      mySum+=map[
        result[j].toLowerCase()];
    }
  }
  
  if (mySum==0) {
    return str;
  } else {
    return mySum;
  }
}

// ローマ数字をアラビア数字へ(複数)
function romanNums(str,f) {
  // f=1 iiiiとivを4とみなす (デフォルト)
  // f=2 iiiiは4とみなさない
  var n="4"; // 繰り返しの最大値数
  if (f==2) n="3";
  
  var RE_01_09=
    "(ix|iv|v?i{1,"+n+"}|v)?";
  var RE_10_99=
    "(xc|xl|l?x{1,"+n+"}|l)?"+RE_01_09;
  var RE_100_999=
   "(cm|cd|d?c{1,"+n+"}|d)?"+RE_10_99;
  var RE_1000_9999=
    "(m{1,9})?"+RE_100_999;
  
  var tmpRE=
    new RegExp(RE_1000_9999, "ig");
  var tmpRE2=new RegExp(
      "^"+RE_1000_9999+"$", "i");
  
  var map={
    "mmmmmmmmm": 9000, 
    "mmmmmmmm": 8000, 
    "mmmmmmm": 7000, 
    "mmmmmm": 6000, 
    "mmmmm": 5000, 
    "mmmm": 4000, 
    "mmm": 3000, 
    "mm": 2000, 
    "m": 1000, 
    "cm": 900, 
    "dcccc": 900, 
    "dccc": 800, 
    "dcc": 700, 
    "dc": 600, 
    "d": 500, 
    "cd": 400, 
    "cccc": 400, 
    "ccc": 300, 
    "cc": 200, 
    "c": 100, 
    "xc": 90, 
    "lxxxx": 90, 
    "lxxx": 80, 
    "lxx": 70, 
    "lx": 60, 
    "l": 50, 
    "xl": 40, 
    "xxxx": 40, 
    "xxx": 30, 
    "xx": 20, 
    "x": 10, 
    "ix": 9, 
    "viiii": 9, 
    "viii": 8, 
    "vii": 7, 
    "vi": 6, 
    "v": 5, 
    "iv": 4, 
    "iiii": 4, 
    "iii": 3, 
    "ii": 2, 
    "i": 1
  }
  
  var tmpL=
    str.match(tmpRE);
  
  var result=[];
  for (var i in tmpL) {
    if (!tmpL[i]) continue; // 空の配列
    // var myArray=
    //   tmpRE2.exec(
    //     tmpL[i].toLowerCase());
    var myArray=
      tmpRE2.exec(tmpL[i]);
    result.push(myArray);
  }
  
  for (var i in result) {
    var mySum=0;
    for (var j in result[i]) {
      if (j>=1 && j<=4 && result[i][j]) {
        mySum+=map[
          result[i][j].toLowerCase()];
        /* // 各位の値を見る
        alert(
          "["+j+"] "+result[i][j]+
          " = "+map[result[i][j]]);
        */
      }
    }
    result[i]=[result[i][0], mySum];
  }
  // [ ローマ, アラビア ] のリストを返す
  return result;
}

//======================================

// barcode code128
function bin2code128(bin) {
  //最後のストップコード (13モジュール)を除くとすべて11モジュール。
  //スタートコードも(11モジュール)。
  //キャラクタの最後は必ずスペース(白)となる
  //キャラクタは3本のバーと3本のスペースからなる
  //キャラクごとの各バーのモジュール数を足した合計は偶数になる。
  //キャラクタごとの各スペースのモジュール数を足した合計は奇数になる。
  //キャラクタのモジュール数の合計は奇数。つまり11モジュール。
  //ＣＯＤＥ－１２８は４種類の太さを持つ連続したコード（キャラクタ間ギャップが無い）で、１キャラクタは３本のバーと３本のスペースの合計１１モジュールで構成される。各バー及びスペースは１～４モジュールで構成される。
  //ストップコードの前にチェックデジットがある（計算方法はモジュラス103）
  //ストップコードは必ず、1100011101011
  //スタートコードは3種類あり、
  //スタートコードA、11010000100
  //スタートコードB、11010010000
  //スタートコードC、11010011100
  //途中でコードを変えることができる。SHIFTで一時的にコードを変えることもできる
  
  var result="";
  
  if (
    (bin.length-13)%11==0 && 
    bin.match(
      /^(11010000100|11010010000|11010011100)/) && 
    bin.match(/1100011101011$/)
  ) {
    // barcode binary: [No,128A,128B,128C]
    var map_code128={
      "11011001100": [0, " ", " ", "00"], 
      "11001101100": [1, "!", "!", "01"], 
      "11001100110": [2,"\"", "\"","02"], 
      "10010011000": [3, "#","#", "03"], 
      "10010001100": [4, "$","$", "04"], 
      "10001001100": [5,"%","%","05"], 
      "10011001000": [6, "&","&","06"], 
      "10011000100": [7, "'", "'", "07"], 
      "10001100100": [8, "(", "(", "08"], 
      "11001001000": [9, ")", ")", "09"], 
      "11001000100": [10, "*","*","10"], 
      "11000100100": [11,"+","+","11"], 
      "10110011100": [12, ",",",", "12"], 
      "10011011100": [13, "-","-","13"], 
      "10011001110": [14, ".",".", "14"], 
      "10111001100": [15, "/","/","15"], 
      "10011101100": [16, "0","0","16"], 
      "10011100110": [17, "1","1","17"], 
      "11001110010": [18, "2","2","18"], 
      "11001011100": [19, "3","3","19"], 
      "11001001110": [20, "4","4","20"], 
      "11011100100": [21, "5","5","21"], 
      "11001110100": [22, "6","6","22"], 
      "11101101110": [23, "7","7","23"], 
      "11101001100": [24, "8","8","24"], 
      "11100101100": [25, "9","9","25"], 
      "11100100110": [26, ":",":", "26"], 
      "11101100100": [27, ";", ";","27"], 
      "11100110100": [28,"<","<","28"], 
      "11100110010": [29,"=","=","29"], 
      "11011011000": [30,">",">","30"], 
      "11011000110": [31,"?","?","31"], 
      "11000110110":[32,"@","@","32"], 
      "10100011000": [33,"A","A","33"], 
      "10001011000": [34,"B","B","34"], 
      "10001000110": [35,"C","C","35"], 
      "10110001000": [36,"D","D","36"], 
      "10001101000": [37,"E","E","37"], 
      "10001100010": [38,"F","F","38"], 
      "11010001000":[39,"G","G","39"],
      "11000101000": [40,"H","H","40"],
      "11000100010": [41,"I","I","41"],
      "10110111000": [42,"J","J","42"],
      "10110001110": [43,"K","K","43"],
      "10001101110": [44,"L","L","44"],
      "10111011000":[45,"M","M","45"],
      "10111000110": [46,"N","N","46"],
      "10001110110":[47,"O","O","47"],
      "11101110110": [48,"P","P","48"],
      "11010001110":[49,"Q","Q","49"],
      "11000101110": [50,"R","R","50"],
      "11011101000": [51,"S","S","51"],
      "11011100010": [52,"T","T","52"],
      "11011101110": [53,"U","U","53"],
      "11101011000": [54,"V","V","54"],
      "11101000110":[55,"W","W","55"],
      "11100010110": [56,"X","X","56"],
      "11101101000": [57,"Y","Y","57"],
      "11101100010": [58,"Z","Z","58"],
      "11100011010": [59,"[","[","59"],
      "11101111010": [60,"\\","\\","60"],
      "11001000010": [61,"\]","\]","61"],
      "11110001010": [62,"^","^","62"],
      "10100110000": [63,"_","_","63"],
      "10100001100":[64,"NUL","`","64"],
      "10010110000": [65,"SOH","a","65"],
      "10010000110":[66,"STX","b","66"],
      "10000101100":[67,"ETX","c","67"],
      "10000100110": [68,"EOT","d","68"],
      "10110010000": [69,"ENQ","e","69"],
      "10110000100": [70,"ACK","f","70"],
      "10011010000": [71,"BEL","g","71"],
      "10011000010": [72,"BS","h","72"],
      "10000110100": [73,"HT","i","73"],
      "10000110010": [74,"LF","j","74"],
      "11000010010": [75,"VT","k","75"],
      "11001010000": [76,"FF","l","76"],
      "11110111010": [77,"CR","m","77"],
      "11000010100": [78,"SO","n","78"],
      "10001111010": [79,"SI","o","79"],
      "10100111100": [80,"DLE","p","80"],
      "10010111100": [81,"DC1","q","81"],
      "10010011110": [82,"DC2","r","82"],
      "10111100100": [83,"DC3","s","83"],
      "10011110100": [84,"DC4","t","84"],
      "10011110010": [85,"NAK","u","85"],
      "11110100100": [86,"SYN","v","86"],
      "11110010100": [87,"ETB","w","87"],
      "11110010010": [88,"CAN","x","88"],
      "11011011110": [89,"EM","y","89"],
      "11011110110": [90,"SUB","z","90"],
      "11110110110": [91,"ESC","{","91"],
      "10101111000": [92,"FS","|","92"],
      "10100011110": [93,"GS","\}","93"],
      "10001011110": [94,"RS","~","94"],
      "10111101000": [95,"US","DEL","95"],
      "10111100010": [96,"FNC 3","FNC 3","96"],
      "11110101000": [97,"FNC 2","FNC 2","97"],
      "11110100010": [98,"SHIFT","SHIFT","98"],
      "10111011110": [99,"CODE C","CODE C","99"], 
      "10111101110": [100,"CODE B","FNC 4","CODE B"], 
      "11101011110": [101,"FNC 4","CODE A","CODE A"], 
      "11110101110": [102,"FNC 1","FNC 1","FNC 1"], 
      "11010000100": [103,"START A","START A","START A"], 
      "11010010000": [104,"START B","START B","START B"], 
      "11010011100": [105,"START C","START C","START C"]
    };
      
    var sumDigit=0;
    var charCode=0;
    var charCodeShift=0;

    // ストップコードを取り除く
    bin=
      bin.replace(/1100011101011$/, "");
    
    // キャラクタを分けてリストへ    
    var chars=
      bin.match(/[01]{11}/g);
    
    // チェックデジットを取り出す
    var checkDigit=chars.pop();
    checkDigit=map_code128[checkDigit][0];
    
    // map_code128[chars[i]][0]

    // データキャラクタのリストを操作
    for (var i in chars) {
      if (i==0) {
        if (map_code128[chars[i]][0]==103) {
          // 128A
          charCode=1;
          sumDigit+=103*1;
        } else if (map_code128[chars[i]][0]==104) {
          // 128B
          charCode=2;
          sumDigit+=104*1;
        } else if (map_code128[chars[i]][0]==105) {
          // 128C
          charCode=3;
          sumDigit+=105*1;
        }

      } else if (
        map_code128[chars[i]][0]==98 && 
        (charCode==1||charCode==2)
      ) {
        charCodeShift=1;
      } else if (
        map_code128[chars[i]][0]==99 && 
        (charCode==1||charCode==2)
      ) {
        charCode=3;
      } else if (
        map_code128[chars[i]][0]==100 && 
        (charCode==1||charCode==3)
      ) {
        charCode=2;
      } else if (
        map_code128[chars[i]][0]==101 && 
        (charCode==2||charCode==3)
      ) {
        charCode=1;
      } else {
        result+=
          map_code128[chars[i]][charCode+charCodeShift];
        charCodeShift=0;
        sumDigit+=
          map_code128[chars[i]][0]*i;
      }
    }
    
    // 計算したチェックデジット
    sumDigit=sumDigit%103;
    
    if (sumDigit!=checkDigit) {
      alert("Error! code128のチェックデジットが合わない\ncheckDigit: "+checkDigit+"\nsumDigit: "+sumDigit);
    }

  }
  return result;
}

//======================================

//元素記号から原子番号 (元素記号2文字優先)
function atomicNum(source, flag) {
  if (!source) return;
  var elms=[
["元素番号","元素記号","名称"], 
["1","H","Hydrogen","水素"], 
["2","He","Helium","ヘリウム"], 
["3","Li","Lithium","リチウム"], 
["4","Be","Beryllium","ベリリウム"], 
["5","B","Boron","ホウ素"], 
["6","C","Carbon","炭素"], 
["7","N","Nitrogen","窒素"], 
["8","O","Oxygen","酸素"], 
["9","F","Fluorine","フッ素"], 
["10","Ne","Neon","ネオン"], 
["11","Na","Natrium,Sodium","ナトリウム"], 
["12","Mg","Magnesium","マグネシウム"], 
["13","Al","Aluminium","アルミニウム"], 
["14","Si","Silicon","ケイ素"], 
["15","P","Phosphorus","リン"], 
["16","S","Sulfur","硫黄"], 
["17","Cl","Chlorine","塩素"], 
["18","Ar","Argon","アルゴン"], 
["19","K","kalium,Potassium","カリウム"], 
["20","Ca","Calcium","カルシウム"], 
["21","Sc","Scandium","スカンジウム"], 
["22","Ti","Titanium","チタン"], 
["23","V","Vanadium","バナジウム"], 
["24","Cr","Chromium","クロム"], 
["25","Mn","Manganese","マンガン"], 
["26","Fe","Ferrum,Iron","鉄"], 
["27","Co","Cobalt","コバルト"], 
["28","Ni","Nickel","ニッケル"], 
["29","Cu","Cuprum,Copper","銅"], 
["30","Zn","Zinc","亜鉛"], 
["31","Ga","Gallium","ガリウム"], 
["32","Ge","Germanium","ゲルマニウム"], 
["33","As","Arsenic","ヒ素"], 
["34","Se","Selenium","セレン"], 
["35","Br","Bromine","臭素"], 
["36","Kr","Krypton","クリプトン"], 
["37","Rb","Rubidium","ルビジウム"], 
["38","Sr","Strontium","ストロンチウム"], 
["39","Y","Yttrium","イットリウム"], 
["40","Zr","Zirconium","ジルコニウム"], 
["41","Nb","Niobium","ニオブ"], 
["42","Mo","Molybdenum","モリブデン"], 
["43","Tc","Technetium","テクネチウム"], 
["44","Ru","Ruthenium","ルテニウム"], 
["45","Rh","Rhodium","ロジウム"], 
["46","Pd","Palladium","パラジウム"], 
["47","Ag","Argentum,Silver","銀"], 
["48","Cd","Cadmium","カドミウム"], 
["49","In","Indium","インジウム"], 
["50","Sn","Stannum,Tin","スズ"], 
["51","Sb","Stibium,Antimony","アンチモン"], 
["52","Te","Tellurium","テルル"], 
["53","I","Iodine","ヨウ素"], 
["54","Xe","Xenon","キセノン"], 
["55","Cs","Caesium","セシウム"], 
["56","Ba","Barium","バリウム"], 
["57","La","Lanthanum","ランタン"], 
["58","Ce","Cerium","セリウム"], 
["59","Pr","Praseodymium","プラセオジム"], 
["60","Nd","Neodymium","ネオジム"], 
["61","Pm","Promethium","プロメチウム"], 
["62","Sm","Samarium","サマリウム"], 
["63","Eu","Europium","ユウロピウム"], 
["64","Gd","Gadolinium","ガドリニウム"], 
["65","Tb","Terbium","テルビウム"], 
["66","Dy","Dysprosium","ジスプロシウム"], 
["67","Ho","Holmium","ホルミウム"], 
["68","Er","Erbium","エルビウム"], 
["69","Tm","Thulium","ツリウム"], 
["70","Yb","Ytterbium","イッテルビウム"], 
["71","Lu","Lutetium","ルテチウム"], 
["72","Hf","Hafnium","ハフニウム"], 
["73","Ta","Tantalum","タンタル"], 
["74","W","Wolfram,Tungsten","タングステン"], 
["75","Re","Rhenium","レニウム"], 
["76","Os","Osmium","オスミウム"], 
["77","Ir","Iridium","イリジウム"], 
["78","Pt","Platinum","白金"], 
["79","Au","Aurum,Gold","金"], 
["80","Hg","Hydrargyrum,Mercury","水銀"], 
["81","Tl","Thallium","タリウム"], 
["82","Pb","Plumbum,Lead","鉛"], 
["83","Bi","Bismuth","ビスマス"], 
["84","Po","Polonium","ポロニウム"], 
["85","At","Astatine","アスタチン"], 
["86","Rn","Radon","ラドン"], 
["87","Fr","Francium","フランシウム"], 
["88","Ra","Radium","ラジウム"], 
["89","Ac","Actinium","アクチニウム"], 
["90","Th","Thorium","トリウム"], 
["91","Pa","Protactinium","プロトアクチニウム"], 
["92","U","Uranium","ウラン"], 
["93","Np","Neptunium","ネプツニウム"], 
["94","Pu","Plutonium","プルトニウム"], 
["95","Am","Americium","アメリシウム"], 
["96","Cm","Curium","キュリウム"], 
["97","Bk","Berkelium","バークリウム"], 
["98","Cf","Californium","カリホルニウム"], 
["99","Es","Einsteinium","アインスタイニウム"], 
["100","Fm","Fermium","フェルミウム"], 
["101","Md","Mendelevium","メンデレビウム"], 
["102","No","Nobelium","ノーベリウム"], 
["103","Lr","Lawrencium","ローレンシウム"], 
["104","Rf","Rutherfordium","ラザホージウム"], 
["105","Db","Dubnium","ドブニウム"], 
["106","Sg","Seaborgium","シーボーギウム"], 
["107","Bh","Bohrium","ボーリウム"], 
["108","Hs","Hassium","ハッシウム"], 
["109","Mt","Meitnerium","マイトネリウム"], 
["110","Ds","Darmstadtium","ダームスタチウム"], 
["111","Rg","Roentgenium","レントゲニウム"], 
["112","Cn","Copernicium","コペルニシウム"], 
["113","Nh","Nihonium","ニホニウム"], 
["114","Fl","Flerovium","フレロビウム"], 
["115","Mc","Moscovium","モスコビウム"], 
["116","Lv","Livermorium","リバモリウム"], 
["117","Ts","Tennessine","テネシン"], 
["118","Og","Oganesson","オガネソン"],
["101","Unu","Unnilunium","ウンニルウニウム"], 
["102","Unb","Unnilbium","ウンニルビウム"], 
["103","Unt","Unniltrium","ウンニルトリウム"], 
["104","Unq","Unnilquadium","ウンニルクアジウム"], 
["105","Unp","Unnilpentium","ウンニルペンチウム"], 
["106","Unh","Unnilhexium","ウンニルヘキシウム"], 
["107","Uns","Unnilseptium","ウンニルセプチウム"], 
["108","Uno","Unniloctium","ウンニルオクチウム"], 
["109","Une","Unnilennium","ウンニルエンニウム"], 
["110","Uun","Ununnilium","ウンウンニリウム"], 
["111","Uuu","Unununium","ウンウンウニウム"], 
["112","Uub","Ununbium","ウンウンビウム"], 
["113","Uut","Ununtrium","ウンウントリウム"], 
["114","Uuq","Ununquadium","ウンウンクアジウム"], 
["115","Uup","Ununpentium","ウンウンペンチウム"], 
["116","Uuh","Ununhexium","ウンウンヘキシウム"], 
["117","Uus","Ununseptium","ウンウンセプチウム"], 
["118","Uuo","Ununoctium","ウンウンオクチウム"],
["119","Uue","Ununennium","ウンウンエンニウム"],
["120","Ubn","Unbinilium","ウンビニリウム"],
["121","Ubu","Unbiunium","ウンビウニウム"],
["122","Ubb","Unbibium","ウンビビウム"]
  ];
  
  var elmsSorted=copyArray(elms);
  elmsSorted.sort(function(a,b){
    if( a[1].length > b[1].length) return -1;
    if( a[1].length < b[1].length) return 1;
    return 0;
  });
  
  var tmp=[];
  for (var i in elmsSorted) {
    if (i==0) continue; // 1行目はラベル
    else if(elmsSorted[i][1]=="") continue;
    tmp.push(elmsSorted[i][1]);
  }
  var elmRE= new RegExp(
    "("+tmp.join("|")+")", "ig");
  var result=[];
  var tmplist=source.match(elmRE);
  if (tmplist && tmplist.length>0) {
    source=source.replace(elmRE, "@");
    result=source.match(/(@|[^@]+)/g);
    var sList=[];
    for (var i in tmplist) {
      for (var j in elms) {
        var tmpRE=new RegExp(
          "^"+elms[j][1]+"$", "i");
        if (tmplist[i].match(tmpRE)) {
          tmplist[i]=elms[j];
          break;
        }
      }
    }
    
    var j=0;
    for (var i in result) {
      if (result[i]=="@") {
        result[i]=tmplist[j]
        j++;
      } else {
        result[i]=["", result[i], ""];
      }
    }
  }
  
  if (!flag) {
    // 2次元配列で渡す 
    // [["番号","記号","名称"],…]
    return result; 
  } else if (flag==1) {
    //文字列として渡す
    var resultstr=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
      }
    }
    return resultstr.join("");
  } else if (flag==2) {
    //文字列と区切り文字列と区切り数字の3つを渡す
    var resultstr=[];
    var resultstr2=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
        resultstr2.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
        resultstr2.push(result[i][1]);
      }
    }
    return [
      resultstr.join(""), 
      resultstr2,
      resultstr];
  }
} // end function

//元素記号から原子番号 (元素記号1文字優先)
function atomicNumSmall(source, flag) {
  if (!source) return;
  var elms=[
    ["元素番号","元素記号","名称"], 
    ["1","H","Hydrogen","水素"], 
    ["2","He","Helium","ヘリウム"], 
    ["3","Li","Lithium","リチウム"], 
    ["4","Be","Beryllium","ベリリウム"], 
    ["5","B","Boron","ホウ素"], 
    ["6","C","Carbon","炭素"], 
    ["7","N","Nitrogen","窒素"], 
    ["8","O","Oxygen","酸素"], 
    ["9","F","Fluorine","フッ素"], 
    ["10","Ne","Neon","ネオン"], 
    ["11","Na","Natrium,Sodium","ナトリウム"], 
    ["12","Mg","Magnesium","マグネシウム"], 
    ["13","Al","Aluminium","アルミニウム"], 
    ["14","Si","Silicon","ケイ素"], 
    ["15","P","Phosphorus","リン"], 
    ["16","S","Sulfur","硫黄"], 
    ["17","Cl","Chlorine","塩素"], 
    ["18","Ar","Argon","アルゴン"], 
    ["19","K","kalium,Potassium","カリウム"], 
    ["20","Ca","Calcium","カルシウム"], 
    ["21","Sc","Scandium","スカンジウム"], 
    ["22","Ti","Titanium","チタン"], 
    ["23","V","Vanadium","バナジウム"], 
    ["24","Cr","Chromium","クロム"], 
    ["25","Mn","Manganese","マンガン"], 
    ["26","Fe","Ferrum,Iron","鉄"], 
    ["27","Co","Cobalt","コバルト"], 
    ["28","Ni","Nickel","ニッケル"], 
    ["29","Cu","Cuprum,Copper","銅"], 
    ["30","Zn","Zinc","亜鉛"], 
    ["31","Ga","Gallium","ガリウム"], 
    ["32","Ge","Germanium","ゲルマニウム"], 
    ["33","As","Arsenic","ヒ素"], 
    ["34","Se","Selenium","セレン"], 
    ["35","Br","Bromine","臭素"], 
    ["36","Kr","Krypton","クリプトン"], 
    ["37","Rb","Rubidium","ルビジウム"], 
    ["38","Sr","Strontium","ストロンチウム"], 
    ["39","Y","Yttrium","イットリウム"], 
    ["40","Zr","Zirconium","ジルコニウム"], 
    ["41","Nb","Niobium","ニオブ"], 
    ["42","Mo","Molybdenum","モリブデン"], 
    ["43","Tc","Technetium","テクネチウム"], 
    ["44","Ru","Ruthenium","ルテニウム"], 
    ["45","Rh","Rhodium","ロジウム"], 
    ["46","Pd","Palladium","パラジウム"], 
    ["47","Ag","Argentum,Silver","銀"], 
    ["48","Cd","Cadmium","カドミウム"], 
    ["49","In","Indium","インジウム"], 
    ["50","Sn","Stannum,Tin","スズ"], 
    ["51","Sb","Stibium,Antimony","アンチモン"], 
    ["52","Te","Tellurium","テルル"], 
    ["53","I","Iodine","ヨウ素"], 
    ["54","Xe","Xenon","キセノン"], 
    ["55","Cs","Caesium","セシウム"], 
    ["56","Ba","Barium","バリウム"], 
    ["57","La","Lanthanum","ランタン"], 
    ["58","Ce","Cerium","セリウム"], 
    ["59","Pr","Praseodymium","プラセオジム"], 
    ["60","Nd","Neodymium","ネオジム"], 
    ["61","Pm","Promethium","プロメチウム"], 
    ["62","Sm","Samarium","サマリウム"], 
    ["63","Eu","Europium","ユウロピウム"], 
    ["64","Gd","Gadolinium","ガドリニウム"], 
    ["65","Tb","Terbium","テルビウム"], 
    ["66","Dy","Dysprosium","ジスプロシウム"], 
    ["67","Ho","Holmium","ホルミウム"], 
    ["68","Er","Erbium","エルビウム"], 
    ["69","Tm","Thulium","ツリウム"], 
    ["70","Yb","Ytterbium","イッテルビウム"], 
    ["71","Lu","Lutetium","ルテチウム"], 
    ["72","Hf","Hafnium","ハフニウム"], 
    ["73","Ta","Tantalum","タンタル"], 
    ["74","W","Wolfram,Tungsten","タングステン"], 
    ["75","Re","Rhenium","レニウム"], 
    ["76","Os","Osmium","オスミウム"], 
    ["77","Ir","Iridium","イリジウム"], 
    ["78","Pt","Platinum","白金"], 
    ["79","Au","Aurum,Gold","金"], 
    ["80","Hg","Hydrargyrum,Mercury","水銀"], 
    ["81","Tl","Thallium","タリウム"], 
    ["82","Pb","Plumbum,Lead","鉛"], 
    ["83","Bi","Bismuth","ビスマス"], 
    ["84","Po","Polonium","ポロニウム"], 
    ["85","At","Astatine","アスタチン"], 
    ["86","Rn","Radon","ラドン"], 
    ["87","Fr","Francium","フランシウム"], 
    ["88","Ra","Radium","ラジウム"], 
    ["89","Ac","Actinium","アクチニウム"], 
    ["90","Th","Thorium","トリウム"], 
    ["91","Pa","Protactinium","プロトアクチニウム"], 
    ["92","U","Uranium","ウラン"], 
    ["93","Np","Neptunium","ネプツニウム"], 
    ["94","Pu","Plutonium","プルトニウム"], 
    ["95","Am","Americium","アメリシウム"], 
    ["96","Cm","Curium","キュリウム"], 
    ["97","Bk","Berkelium","バークリウム"], 
    ["98","Cf","Californium","カリホルニウム"], 
    ["99","Es","Einsteinium","アインスタイニウム"], 
    ["100","Fm","Fermium","フェルミウム"], 
    ["101","Md","Mendelevium","メンデレビウム"], 
    ["102","No","Nobelium","ノーベリウム"], 
    ["103","Lr","Lawrencium","ローレンシウム"], 
    ["104","Rf","Rutherfordium","ラザホージウム"], 
    ["105","Db","Dubnium","ドブニウム"], 
    ["106","Sg","Seaborgium","シーボーギウム"], 
    ["107","Bh","Bohrium","ボーリウム"], 
    ["108","Hs","Hassium","ハッシウム"], 
    ["109","Mt","Meitnerium","マイトネリウム"], 
    ["110","Ds","Darmstadtium","ダームスタチウム"], 
    ["111","Rg","Roentgenium","レントゲニウム"], 
    ["112","Cn","Copernicium","コペルニシウム"], 
    ["113","Nh","Nihonium","ニホニウム"], 
    ["114","Fl","Flerovium","フレロビウム"], 
    ["115","Mc","Moscovium","モスコビウム"], 
    ["116","Lv","Livermorium","リバモリウム"], 
    ["117","Ts","Tennessine","テネシン"], 
    ["118","Og","Oganesson","オガネソン"],
    ["101","Unu","Unnilunium","ウンニルウニウム"], 
    ["102","Unb","Unnilbium","ウンニルビウム"], 
    ["103","Unt","Unniltrium","ウンニルトリウム"], 
    ["104","Unq","Unnilquadium","ウンニルクアジウム"], 
    ["105","Unp","Unnilpentium","ウンニルペンチウム"], 
    ["106","Unh","Unnilhexium","ウンニルヘキシウム"], 
    ["107","Uns","Unnilseptium","ウンニルセプチウム"], 
    ["108","Uno","Unniloctium","ウンニルオクチウム"], 
    ["109","Une","Unnilennium","ウンニルエンニウム"], 
    ["110","Uun","Ununnilium","ウンウンニリウム"], 
    ["111","Uuu","Unununium","ウンウンウニウム"], 
    ["112","Uub","Ununbium","ウンウンビウム"], 
    ["113","Uut","Ununtrium","ウンウントリウム"], 
    ["114","Uuq","Ununquadium","ウンウンクアジウム"], 
    ["115","Uup","Ununpentium","ウンウンペンチウム"], 
    ["116","Uuh","Ununhexium","ウンウンヘキシウム"], 
    ["117","Uus","Ununseptium","ウンウンセプチウム"], 
    ["118","Uuo","Ununoctium","ウンウンオクチウム"],
    ["119","Uue","Ununennium","ウンウンエンニウム"],
    ["120","Ubn","Unbinilium","ウンビニリウム"],
    ["121","Ubu","Unbiunium","ウンビウニウム"],
    ["122","Ubb","Unbibium","ウンビビウム"]
  ];
  
  var elmsSorted=copyArray(elms);
  elmsSorted.sort(function(a,b){
    if( a[1].length < b[1].length) return -1;
    if( a[1].length > b[1].length) return 1;
    return 0;
  });
  
  var tmp=[];
  for (var i in elmsSorted) {
    if (i==0) continue; // 1行目はラベル
    else if(elmsSorted[i][1]=="") continue;
    tmp.push(elmsSorted[i][1]);
  }
  var elmRE= new RegExp(
    "("+tmp.join("|")+")", "ig");

  var result=[];
  var tmplist=source.match(elmRE);
  if (tmplist && tmplist.length>0) {
    source=source.replace(elmRE, "@");
    result=source.match(/(@|[^@]+)/g);
    var sList=[];
    for (var i in tmplist) {
      for (var j in elms) {
        var tmpRE=new RegExp(
          "^"+elms[j][1]+"$", "i");
        if (tmplist[i].match(tmpRE)) {
          tmplist[i]=elms[j];
          break;
        }
      }
    }
    
    var j=0;
    for (var i in result) {
      if (result[i]=="@") {
        result[i]=tmplist[j]
        j++;
      } else {
        result[i]=["", result[i], ""];
      }
    }
  }
  
  if (!flag) {
    // 2次元配列で渡す 
    // [["番号","記号","名称"],…]
    return result; 
  } else if (flag==1) {
    //文字列として渡す
    var resultstr=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
      }
    }
    return resultstr.join("");
  } else if (flag==2) {
    //文字列と区切り文字列と区切り数字の3つを渡す
    var resultstr=[];
    var resultstr2=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
        resultstr2.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
        resultstr2.push(result[i][1]);
      }
    }
    return [
      resultstr.join(""), 
      resultstr2,
      resultstr];
  }
} // end function

//元素記号から原子番号 (配列で受け取る)
function atomicNumFromArrey(sourceArrey, flag) {
  if (!sourceArrey) return;
  var elms=[
    ["元素番号","元素記号","名称"], 
    ["1","H","Hydrogen","水素"], 
    ["2","He","Helium","ヘリウム"], 
    ["3","Li","Lithium","リチウム"], 
    ["4","Be","Beryllium","ベリリウム"], 
    ["5","B","Boron","ホウ素"], 
    ["6","C","Carbon","炭素"], 
    ["7","N","Nitrogen","窒素"], 
    ["8","O","Oxygen","酸素"], 
    ["9","F","Fluorine","フッ素"], 
    ["10","Ne","Neon","ネオン"], 
    ["11","Na","Natrium,Sodium","ナトリウム"], 
    ["12","Mg","Magnesium","マグネシウム"], 
    ["13","Al","Aluminium","アルミニウム"], 
    ["14","Si","Silicon","ケイ素"], 
    ["15","P","Phosphorus","リン"], 
    ["16","S","Sulfur","硫黄"], 
    ["17","Cl","Chlorine","塩素"], 
    ["18","Ar","Argon","アルゴン"], 
    ["19","K","kalium,Potassium","カリウム"], 
    ["20","Ca","Calcium","カルシウム"], 
    ["21","Sc","Scandium","スカンジウム"], 
    ["22","Ti","Titanium","チタン"], 
    ["23","V","Vanadium","バナジウム"], 
    ["24","Cr","Chromium","クロム"], 
    ["25","Mn","Manganese","マンガン"], 
    ["26","Fe","Ferrum,Iron","鉄"], 
    ["27","Co","Cobalt","コバルト"], 
    ["28","Ni","Nickel","ニッケル"], 
    ["29","Cu","Cuprum,Copper","銅"], 
    ["30","Zn","Zinc","亜鉛"], 
    ["31","Ga","Gallium","ガリウム"], 
    ["32","Ge","Germanium","ゲルマニウム"], 
    ["33","As","Arsenic","ヒ素"], 
    ["34","Se","Selenium","セレン"], 
    ["35","Br","Bromine","臭素"], 
    ["36","Kr","Krypton","クリプトン"], 
    ["37","Rb","Rubidium","ルビジウム"], 
    ["38","Sr","Strontium","ストロンチウム"], 
    ["39","Y","Yttrium","イットリウム"], 
    ["40","Zr","Zirconium","ジルコニウム"], 
    ["41","Nb","Niobium","ニオブ"], 
    ["42","Mo","Molybdenum","モリブデン"], 
    ["43","Tc","Technetium","テクネチウム"], 
    ["44","Ru","Ruthenium","ルテニウム"], 
    ["45","Rh","Rhodium","ロジウム"], 
    ["46","Pd","Palladium","パラジウム"], 
    ["47","Ag","Argentum,Silver","銀"], 
    ["48","Cd","Cadmium","カドミウム"], 
    ["49","In","Indium","インジウム"], 
    ["50","Sn","Stannum,Tin","スズ"], 
    ["51","Sb","Stibium,Antimony","アンチモン"], 
    ["52","Te","Tellurium","テルル"], 
    ["53","I","Iodine","ヨウ素"], 
    ["54","Xe","Xenon","キセノン"], 
    ["55","Cs","Caesium","セシウム"], 
    ["56","Ba","Barium","バリウム"], 
    ["57","La","Lanthanum","ランタン"], 
    ["58","Ce","Cerium","セリウム"], 
    ["59","Pr","Praseodymium","プラセオジム"], 
    ["60","Nd","Neodymium","ネオジム"], 
    ["61","Pm","Promethium","プロメチウム"], 
    ["62","Sm","Samarium","サマリウム"], 
    ["63","Eu","Europium","ユウロピウム"], 
    ["64","Gd","Gadolinium","ガドリニウム"], 
    ["65","Tb","Terbium","テルビウム"], 
    ["66","Dy","Dysprosium","ジスプロシウム"], 
    ["67","Ho","Holmium","ホルミウム"], 
    ["68","Er","Erbium","エルビウム"], 
    ["69","Tm","Thulium","ツリウム"], 
    ["70","Yb","Ytterbium","イッテルビウム"], 
    ["71","Lu","Lutetium","ルテチウム"], 
    ["72","Hf","Hafnium","ハフニウム"], 
    ["73","Ta","Tantalum","タンタル"], 
    ["74","W","Wolfram,Tungsten","タングステン"], 
    ["75","Re","Rhenium","レニウム"], 
    ["76","Os","Osmium","オスミウム"], 
    ["77","Ir","Iridium","イリジウム"], 
    ["78","Pt","Platinum","白金"], 
    ["79","Au","Aurum,Gold","金"], 
    ["80","Hg","Hydrargyrum,Mercury","水銀"], 
    ["81","Tl","Thallium","タリウム"], 
    ["82","Pb","Plumbum,Lead","鉛"], 
    ["83","Bi","Bismuth","ビスマス"], 
    ["84","Po","Polonium","ポロニウム"], 
    ["85","At","Astatine","アスタチン"], 
    ["86","Rn","Radon","ラドン"], 
    ["87","Fr","Francium","フランシウム"], 
    ["88","Ra","Radium","ラジウム"], 
    ["89","Ac","Actinium","アクチニウム"], 
    ["90","Th","Thorium","トリウム"], 
    ["91","Pa","Protactinium","プロトアクチニウム"], 
    ["92","U","Uranium","ウラン"], 
    ["93","Np","Neptunium","ネプツニウム"], 
    ["94","Pu","Plutonium","プルトニウム"], 
    ["95","Am","Americium","アメリシウム"], 
    ["96","Cm","Curium","キュリウム"], 
    ["97","Bk","Berkelium","バークリウム"], 
    ["98","Cf","Californium","カリホルニウム"], 
    ["99","Es","Einsteinium","アインスタイニウム"], 
    ["100","Fm","Fermium","フェルミウム"], 
    ["101","Md","Mendelevium","メンデレビウム"], 
    ["102","No","Nobelium","ノーベリウム"], 
    ["103","Lr","Lawrencium","ローレンシウム"], 
    ["104","Rf","Rutherfordium","ラザホージウム"], 
    ["105","Db","Dubnium","ドブニウム"], 
    ["106","Sg","Seaborgium","シーボーギウム"], 
    ["107","Bh","Bohrium","ボーリウム"], 
    ["108","Hs","Hassium","ハッシウム"], 
    ["109","Mt","Meitnerium","マイトネリウム"], 
    ["110","Ds","Darmstadtium","ダームスタチウム"], 
    ["111","Rg","Roentgenium","レントゲニウム"], 
    ["112","Cn","Copernicium","コペルニシウム"], 
    ["113","Nh","Nihonium","ニホニウム"], 
    ["114","Fl","Flerovium","フレロビウム"], 
    ["115","Mc","Moscovium","モスコビウム"], 
    ["116","Lv","Livermorium","リバモリウム"], 
    ["117","Ts","Tennessine","テネシン"], 
    ["118","Og","Oganesson","オガネソン"],
    ["101","Unu","Unnilunium","ウンニルウニウム"], 
    ["102","Unb","Unnilbium","ウンニルビウム"], 
    ["103","Unt","Unniltrium","ウンニルトリウム"], 
    ["104","Unq","Unnilquadium","ウンニルクアジウム"], 
    ["105","Unp","Unnilpentium","ウンニルペンチウム"], 
    ["106","Unh","Unnilhexium","ウンニルヘキシウム"], 
    ["107","Uns","Unnilseptium","ウンニルセプチウム"], 
    ["108","Uno","Unniloctium","ウンニルオクチウム"], 
    ["109","Une","Unnilennium","ウンニルエンニウム"], 
    ["110","Uun","Ununnilium","ウンウンニリウム"], 
    ["111","Uuu","Unununium","ウンウンウニウム"], 
    ["112","Uub","Ununbium","ウンウンビウム"], 
    ["113","Uut","Ununtrium","ウンウントリウム"], 
    ["114","Uuq","Ununquadium","ウンウンクアジウム"], 
    ["115","Uup","Ununpentium","ウンウンペンチウム"], 
    ["116","Uuh","Ununhexium","ウンウンヘキシウム"], 
    ["117","Uus","Ununseptium","ウンウンセプチウム"], 
    ["118","Uuo","Ununoctium","ウンウンオクチウム"],
    ["119","Uue","Ununennium","ウンウンエンニウム"],
    ["120","Ubn","Unbinilium","ウンビニリウム"],
    ["121","Ubu","Unbiunium","ウンビウニウム"],
    ["122","Ubb","Unbibium","ウンビビウム"]
  ];
  
  var result=[];
  for (var i in sourceArrey) {
    var tmpRE=new RegExp("^"+sourceArrey[i]+"$", "i");
    var findFlag=0;
    for (var j in elms) {
      if (elms[j][1].match(tmpRE)) {
        result.push(elms[j]);
        findFlag=1;
        break;
      }
    }
    if (!findFlag) result.push(["", sourceArrey[i], ""]);
  }

  if (!flag) {
    // 2次元配列で渡す 
    // [["番号","記号","名称"],…]
    return result; 
  } else if (flag==1) {
    //文字列として渡す
    var resultstr=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
      }
    }
    return resultstr.join("");
  } else if (flag==2) {
    //文字列と区切り文字列と区切り数字の3つを渡す
    var resultstr=[];
    var resultstr2=[];
    for (var i in result) {
      if (!result[i]) continue;
      if (result[i][0]=="") {
        resultstr.push(result[i][1]);
        resultstr2.push(result[i][1]);
      } else {
        resultstr.push(result[i][0]);
        resultstr2.push(result[i][1]);
      }
    }
    return [
      resultstr.join(""), 
      resultstr2,
      resultstr];
  }
} // end function

//======================================

// semaphore セマフォ(手旗信号)
function semaphore(str) {
  var map=[
["6","6"," "], 
["12","2","#"], 
["12","1","#"], 
["7","6","a"], 
["8","6","a"], 
["9","6","b"], 
["11","6","c"], 
["10","6","c"], 
["12","6","d"], 
["6","2","e"], 
["6","1","e"], 
["6","3","f"], 
["6","5","g"], 
["6","4","g"], 
["9","7","h"], 
["9","8","h"], 
["7","11","i"], 
["7","10","i"], 
["8","11","i"], 
["8","10","i"], 
["12","3","j"], 
["7","12","k"], 
["8","12","k"], 
["7","2","l"], 
["7","1","l"], 
["8","2","l"], 
["8","1","l"], 
["7","3","m"], 
["8","3","m"], 
["7","5","n"], 
["7","4","n"], 
["8","5","n"], 
["8","4","n"], 
["9","11","o"], 
["9","10","o"], 
["9","12","p"], 
["9","2","q"], 
["9","1","q"], 
["9","3","r"], 
["9","5","s"], 
["9","4","s"], 
["11","12","t"], 
["10","12","t"], 
["11","2","u"], 
["11","1","u"], 
["10","2","u"], 
["10","1","u"], 
["12","5","v"], 
["12","4","v"], 
["2","3","w"], 
["1","3","w"], 
["2","5","x"], 
["2","4","x"], 
["1","5","x"], 
["1","4","x"], 
["11","3","y"], 
["10","3","y"], 
["5","3","z"], 
["4","3","z"]
];
  
  var tmp=str.match(/[123456789][012]?-[123456789][012]?(?=[\s/\\|,\.]*)/g);
  
  if (!tmp) return "";
  
  var result=[];
  for (var i in tmp) {
    var flag=0;
    tmp[i]=tmp[i].split(/-/);
    for (var j in map) {
      if (
        (map[j][0]==tmp[i][0]
        && map[j][1]==tmp[i][1])
        ||
        (map[j][0]==tmp[i][1]
        && map[j][1]==tmp[i][0])
      ) {
        result.push(map[j][2]);
        flag=1;
        break;
      }
    }
    if (flag==0) {
      result.push(
        "("+tmp[i][0]+"-"+tmp[i][1]+")");
    }
  }
  
  var numFlag=0;
  for (var i in result) {
    if (i==0 && result[i].match(/j/i)) {
      result[i]="";
      continue;
    } else if (result[i].match(/#/)) {
      numFlag=1;
      result[i]="";
      continue;
    } else if (
      numFlag && result[i].match(/j/i)
    ) {
      numFlag=0;
      result[i]="";
      continue;
    }

    if (numFlag) {
      result[i]=result[i].replace(/a/i, "1");
      result[i]=result[i].replace(/b/i, "2");
      result[i]=result[i].replace(/c/i, "3");
      result[i]=result[i].replace(/d/i, "4");
      result[i]=result[i].replace(/e/i, "5");
      result[i]=result[i].replace(/f/i, "6");
      result[i]=result[i].replace(/g/i, "7");
      result[i]=result[i].replace(/h/i, "8");
      result[i]=result[i].replace(/i/i, "9");
      result[i]=result[i].replace(/k/i, "0");
    }
  }
  return result.join("");
}

//======================================

// playfairデコード
function playfair(str) {
  if (str.length%2!=0) return str;
  
  // Polybius square
  var  map=[
    ["","","","","",""],
    ["","a","b","c","d","e"],
    ["","f","g","h","i","k"],
    ["","l","m","n","o","p"],
    ["","q","r","s","t","u"],
    ["","v","w","x","y","z"]
  ];
  
  var tmpResult=[];
  str=str.replace(/j/ig, "i");
  for (var i in str) {
    var matchFlag=0; //見つかったら1
    for (var y=1; y<=5; y++) {
      for (var x=1; x<=5; x++) {
        var tmpRE=new RegExp(
          map[y][x], "i");
        if (str[i].match(tmpRE)) {
            tmpResult.push([y,x]);
            matchFlag=1;
            break;
        }
      }
      if (matchFlag) break;
    }
  }
  
  var result=[];
  for (var i=0; i<tmpResult.length;i=i+2) {
    // 2文字づつ
    if (
    tmpResult[i][0]==tmpResult[i+1][0] &&
     tmpResult[i][1]==tmpResult[i+1][1]
    ) {
      //y軸もx軸も同じ(同じ文字)
      var y=Number(tmpResult[i][0])-1;
      var x=Number(tmpResult[i][1])-1;
      if (y<1) y=5;
      if (x<1) x=5;
      result.push(map[y][x]); //1文字目
      result.push(map[y][x]); //2文字目
    } else if (
      tmpResult[i][0]==tmpResult[i+1][0]
    ) {
      //y軸が同じ(同列)
      var y=tmpResult[i][0];
      var x=Number(tmpResult[i][1])-1;
      if (x<1) x=5;
      result.push(map[y][x]);
      
      y=tmpResult[i+1][0];
      x=Number(tmpResult[i+1][1])-1;
      if (x<1) x=5;
      result.push(map[y][x]);
    } else if (
      tmpResult[i][1]==tmpResult[i+1][1]
    ) {
      //x軸が同じ(同行)
      var y=Number(tmpResult[i][0])-1;
      var x=tmpResult[i][1];
      if (y<1) y=5;
      result.push(map[y][x]);
      
      y=Number(tmpResult[i+1][0])-1;
      x=tmpResult[i+1][1];
      if (y<1) y=5;
      result.push(map[y][x]);
    } else {
      var y=tmpResult[i][0];
      var x=tmpResult[i+1][1];
      result.push(map[y][x]);
      
      y=tmpResult[i+1][0];
      x=tmpResult[i][1];
      result.push(map[y][x]);
    }
  }
  
  // 連続する文字は間にxが挿入される
  // ペアにならない場合は最後にxが追加される
  for (var i=0; i<result.length-2; i+=2) {
    if (
      result[i]==result[i+2] && 
      result[i+1].match(/x/i)
    ) {
      result[i+1]="\0";
    }
  }
  return result.join("").replace(/\0/g, "").replace(/x$/i, "(x)");
}

// playfairデコード
function playfairOld(str) {
  if (str.length%2!=0) return str;
  
  // Polybius square
  var  map=[
    ["","","","","",""],
    ["","a","b","c","d","e"],
    ["","f","g","h","i","k"],
    ["","l","m","n","o","p"],
    ["","q","r","s","t","u"],
    ["","v","w","x","y","z"]
  ];
  
  var tmpResult=[];
  str=str.replace(/j/ig, "i");
  for (var i in str) {
    var matchFlag=0; //見つかったら1
    for (var y=1; y<=5; y++) {
      for (var x=1; x<=5; x++) {
        var tmpRE=new RegExp(
          map[y][x], "i");
        if (str[i].match(tmpRE)) {
            tmpResult.push([y,x]);
            matchFlag=1;
            break;
        }
      }
      if (matchFlag) break;
    }
  }
  
  var result=[];
  for (var i=0; i<tmpResult.length;i=i+2) {
    // 2文字づつ
    if (
      tmpResult[i][0]==tmpResult[i+1][0]
    ) {
      //y軸が同じ(同列)
      var y=tmpResult[i][0];
      var x=Number(tmpResult[i][1])-1;
      if (x<1) x=5;
      result.push(map[y][x]);
      
      y=tmpResult[i+1][0];
      x=Number(tmpResult[i+1][1])-1;
      if (x<1) x=5;
      result.push(map[y][x]);
    } else if (
      tmpResult[i][1]==tmpResult[i+1][1]
    ) {
      //x軸が同じ(同行)
      var y=Number(tmpResult[i][0])-1;
      var x=tmpResult[i][1];
      if (y<1) y=5;
      result.push(map[y][x]);
      
      y=Number(tmpResult[i+1][0])-1;
      x=tmpResult[i+1][1];
      if (y<1) y=5;
      result.push(map[y][x]);
    } else {
      var y=tmpResult[i][0];
      var x=tmpResult[i+1][1];
      result.push(map[y][x]);
      
      y=tmpResult[i+1][0];
      x=tmpResult[i][1];
      result.push(map[y][x]);
    }
  }
  
  // 連続する文字は間にxが挿入される
  // ペアにならない場合は最後にxが追加される
  return result.join("").replace(/(.)x(\1)/ig, "$1$2").replace(/x$/i, "(x)");
}

//======================================

// bifidデコード
function bifid(str,mode) {
  // Polybius square
  var  map=[
    ["","","","","",""],
    ["","a","b","c","d","e"],
    ["","f","g","h","i","k"],
    ["","l","m","n","o","p"],
    ["","q","r","s","t","u"],
    ["","v","w","x","y","z"]
  ];
  var tmpResult=[];
  str=str.replace(/j/ig, "i");
  for (var i in str) {
    var matchFlag=0; //見つかったら1
    for (var y=1; y<=5; y++) {
      for (var x=1; x<=5; x++) {
        var tmpRE=new RegExp(
          map[y][x], "i");
        if (str[i].match(tmpRE)) {
            tmpResult.push(y);
            tmpResult.push(x);
            matchFlag=1;
        }
        if (matchFlag) break;
      }
      if (matchFlag) break;
    }
  }
  var tmp2Result=[];

if (mode && mode.match(/encode/i)) {
  // encode mode
  var tmpResultX=[];
  var tmpResultY=[];
  for (var i in tmpResult) {
    if (i%2==0) {
      tmpResultX.push(tmpResult[i]);
    } else {
      tmpResultY.push(tmpResult[i]);
    }
  }
  tmp2Result=tmpResultX.concat(tmpResultY);
} else {
  // decode mode
  var tmpResult1="";
  var tmpResult2="";
  for (var i in tmpResult) {
    if (i<tmpResult.length/2) {
      tmpResult1+=tmpResult[i];
    } else {
      tmpResult2+=tmpResult[i];
    }
  }
  for (var i in tmpResult1) {
    tmp2Result.push(tmpResult1[i]);
    tmp2Result.push(tmpResult2[i]);
  }
} // end if mode

  var result=[];
  for(var i=0; i<tmp2Result.length;i=i+2){
    result.push(
     map[tmp2Result[i]][tmp2Result[i+1]]);
  } 
  return result.join("");
}


// 連続する同じ数字を数えて二桁へ
function renzojuNum(str) {
  var tmp=str.match(/[0-9]+/g);
  if (tmp) {
    for (var i in tmp) {
      tmp[i]=tmp[i][0]+tmp[i].length;
    }
    return tmp.join(" ");
  } else {
    return str;
  }
}

//======================================

// バイナリをLED7セグ変換(hex)
function func7segDec(bin) {
  if (!bin.match(/^([01]{7}\s*)+$/)) return null;
  if (bin.replace(/\s/g,"").length/7<1) {
    return null;
  }
  var map=[
  ["1111110", "0"], 
  ["0110000", "1"], 
  ["1101101", "2"], 
  ["1111001", "3"], 
  ["0110011", "4"], 
  ["1011011", "5"], 
  ["1011111", "6"], 
  ["1110000", "7"], 
  ["1111111", "8"], 
  ["1111011", "9"],
  ["1110111", "a"], 
  ["0011111", "b"], 
  ["1001110", "c"], 
  ["0111101", "d"], 
  ["1001111", "e"], 
  ["1000111", "f"]
  ];
  var binL=[];
  if (bin.match(/[01]\s+[01]/g)) {
    binL=bin.split(/\s+/g);
  } else {
    binL=bin.match(/[01]{7}/g);
  }
  var result=[];
  for (var i in binL) {
    var flag=1; //matchしたら0
    for (var j in map) {
      if (map[j][0]==binL[i]) {
        result.push(map[j][1]);
        flag=0;
        break;
      }
    }
    if (flag) result.push("?");
  }
  return result.join("");
}

//======================================

// 逆ガラケー変換
function regarake(str) {
  str=str.replace(/[abc]/ig, "2");
  str=str.replace(/[def]/ig, "3");
  str=str.replace(/[ghi]/ig, "4");
  str=str.replace(/[jkl]/ig, "5");
  str=str.replace(/[mno]/ig, "6");
  str=str.replace(/[pqrs]/ig, "7");
  str=str.replace(/[tuv]/ig, "8");
  str=str.replace(/[wxyz]/ig, "9");
  return str;
}

//======================================

//バイナリをbraille点字へ変換
function bin2brailleAscii(bin,flag) {
  // flag=="switch" で順番変更
  if (bin.length%6!=0
    || bin.match(/[^01]/)) { return null; }
  // ①④
  // ②⑤
  // ③⑥
  map={};
  map["2346"]="!";
  map["5"]="\"";
  map["3456"]="#";
  map["1246"]="$";
  map["146"]="%";
  map["12346"]="&";
  map["3"]="'";
  map["12356"]="(";
  map["23456"]=")";
  map["16"]="*";
  map["346"]="+";
  map["6"]=",";
  map["36"]="-";
  map["46"]=".";
  map["34"]="/";
  map["356"]="0";
  map["2"]="1";
  map["23"]="2";
  map["25"]="3";
  map["256"]="4";
  map["26"]="5";
  map["235"]="6";
  map["2356"]="7";
  map["236"]="8";
  map["35"]="9";
  map["156"]=":";
  map["56"]=";";
  map["126"]="<";
  map["123456"]="=";
  map["345"]=">";
  map["1456"]="?";
  map["4"]="@";
  map["1"]="A";
  map["12"]="B";
  map["14"]="C";
  map["145"]="D";
  map["15"]="E";
  map["124"]="F";
  map["1245"]="G";
  map["125"]="H";
  map["24"]="I";
  map["245"]="J";
  map["13"]="K";
  map["123"]="L";
  map["134"]="M";
  map["1345"]="N";
  map["135"]="O";
  map["1234"]="P";
  map["12345"]="Q";
  map["1235"]="R";
  map["234"]="S";
  map["2345"]="T";
  map["136"]="U";
  map["1236"]="V";
  map["2456"]="W";
  map["1346"]="X";
  map["13456"]="Y";
  map["1356"]="Z";
  map["246"]="[";
  map["1256"]="\\";
  map["12456"]="]";
  map["45"]="^";
  map["456"]="_";
  
  var tmp=bin.match(/.{6}/g);
  var result="";
  
  if (flag=="switch") {
    // ①②
    // ③④
    // ⑤⑥
    // 135246
    for (var i in tmp) {
      tmp[i]=tmp[i].replace(
        /(.)(.)(.)(.)(.)(.)/, "$1$3$5$2$4$6");
    }
  }
  
  if (flag=="orikaeshi") {
    // ①⑥
    // ②⑤
    // ③④
    // 123654
    for (var i in tmp) {
      tmp[i]=tmp[i].replace(
        /(.)(.)(.)(.)(.)(.)/, "$1$2$3$6$5$4");
    }
  }
  
  for (var j in tmp) {
    var str="";
    for (var i in tmp[j]) {
      if (tmp[j][i].match(/1/)) {
        str+=Number(i)+1;
      }
    }
    if (map[str]) {
      result+=map[str];
    } else {
      result+="▯";
    }
  }
  return result;
}

//======================================

//base64デコード
function base64Dec(str, targetbase) {
  var map = {};
  map['A'] = '000000';
  map['B'] = '000001';
  map['C'] = '000010';
  map['D'] = '000011';
  map['E'] = '000100';
  map['F'] = '000101';
  map['G'] = '000110';
  map['H'] = '000111';

  map['I'] = '001000';
  map['J'] = '001001';
  map['K'] = '001010';
  map['L'] = '001011';
  map['M'] = '001100';
  map['N'] = '001101';
  map['O'] = '001110';
  map['P'] = '001111';

  map['Q'] = '010000';
  map['R'] = '010001';
  map['S'] = '010010';
  map['T'] = '010011';
  map['U'] = '010100';
  map['V'] = '010101';
  map['W'] = '010110';
  map['X'] = '010111';

  map['Y'] = '011000';
  map['Z'] = '011001';
  map['a'] = '011010';
  map['b'] = '011011';
  map['c'] = '011100';
  map['d'] = '011101';
  map['e'] = '011110';
  map['f'] = '011111';

  map['g'] = '100000';
  map['h'] = '100001';
  map['i'] = '100010';
  map['j'] = '100011';
  map['k'] = '100100';
  map['l'] = '100101';
  map['m'] = '100110';
  map['n'] = '100111';

  map['o'] = '101000';
  map['p'] = '101001';
  map['q'] = '101010';
  map['r'] = '101011';
  map['s'] = '101100';
  map['t'] = '101101';
  map['u'] = '101110';
  map['v'] = '101111';

  map['w'] = '110000';
  map['x'] = '110001';
  map['y'] = '110010';
  map['z'] = '110011';
  map['0'] = '110100';
  map['1'] = '110101';
  map['2'] = '110110';
  map['3'] = '110111';

  map['4'] = '111000';
  map['5'] = '111001';
  map['6'] = '111010';
  map['7'] = '111011';
  map['8'] = '111100';
  map['9'] = '111101';
  map['+'] = '111110';
  map['/'] = '111111';

  if (!str.match(/^[a-zA-Z0-9\/+=]+$/)) {
    return str;
  }
  var tmp=[];
  for (var i in str) {
    if (str[i]=="=") break;
    tmp.push(map[str[i]]);
  }

  if (targetbase   
    && targetbase.match(/^\d+$/)
  ) {
    var result=[];
    var tmp2=tmp.join("").match(/.{8}/g);
    for (var i in tmp2) {
      if (targetbase=="2") {
        result.push(tmp2[i]);
      } else {
        var tmpN=parseInt(tmp2[i], 2).toString(Number(targetbase));
        if (targetbase=="8") {
          tmpN=(100+tmpN);
          result.push(String(tmpN).split("").slice(-3).join(""));
        }
        else if (targetbase=="10") {
          tmpN=(100+tmpN);
          result.push(String(tmpN).split("").slice(-3).join(""));
        }
        else if (targetbase=="16") {
          tmpN=(10+tmpN);
          result.push(String(tmpN).split("").slice(-2).join(""));
        }
      }
    }
    return result.join(" ");
  } else {
    return binASCII(tmp.join(""));
  }

}

//======================================

//base64エンコード(入力時base指定可)
function base64Enc(str, inBase) {
  if (str.match(/^\s*$/)) return str;
  
  var map = {};
  map['000000'] = 'A';
  map['000001'] = 'B';
  map['000010'] = 'C';
  map['000011'] = 'D';
  map['000100'] = 'E';
  map['000101'] = 'F';
  map['000110'] = 'G';
  map['000111'] = 'H';

  map['001000'] = 'I';
  map['001001'] = 'J';
  map['001010'] = 'K';
  map['001011'] = 'L';
  map['001100'] = 'M';
  map['001101'] = 'N';
  map['001110'] = 'O';
  map['001111'] = 'P';

  map['010000'] = 'Q';
  map['010001'] = 'R';
  map['010010'] = 'S';
  map['010011'] = 'T';
  map['010100'] = 'U';
  map['010101'] = 'V';
  map['010110'] = 'W';
  map['010111'] = 'X';

  map['011000'] = 'Y';
  map['011001'] = 'Z';
  map['011010'] = 'a';
  map['011011'] = 'b';
  map['011100'] = 'c';
  map['011101'] = 'd';
  map['011110'] = 'e';
  map['011111'] = 'f';

  map['100000'] = 'g';
  map['100001'] = 'h';
  map['100010'] = 'i';
  map['100011'] = 'j';
  map['100100'] = 'k';
  map['100101'] = 'l';
  map['100110'] = 'm';
  map['100111'] = 'n';

  map['101000'] = 'o';
  map['101001'] = 'p';
  map['101010'] = 'q';
  map['101011'] = 'r';
  map['101100'] = 's';
  map['101101'] = 't';
  map['101110'] = 'u';
  map['101111'] = 'v';

  map['110000'] = 'w';
  map['110001'] = 'x';
  map['110010'] = 'y';
  map['110011'] = 'z';
  map['110100'] = '0';
  map['110101'] = '1';
  map['110110'] = '2';
  map['110111'] = '3';

  map['111000'] = '4';
  map['111001'] = '5';
  map['111010'] = '6';
  map['111011'] = '7';
  map['111100'] = '8';
  map['111101'] = '9';
  map['111110'] = '+';
  map['111111'] = '/';

  function nBase2bin(myStr, base) {
    if (
      base && base.match(/^(8|10|16)$/)
    ) {
      var bin=
        parseInt(myStr, base).toString(2);
      bin=(100000000+Number(bin))+"";
      return bin.split("").slice(1,9).join("");
    } else {
      return String(
        100000000+Number(
          myStr.charCodeAt(0).toString(2))
      ).split("").slice(1,9).join("");
    }
  }

  var tmp=[];
  str=str.replace(/\s+/g, "");
      
  if (inBase && inBase.match(/^2$/)) { 
    tmp.push(str);
  } else if (inBase && inBase.match(/^16$/)) {
    for (var i=0; i<str.length; i++) {
      tmp.push(nBase2bin(
        str[i]+str[i+1], inBase));
      i++;
    }
  } else if (inBase && inBase.match(/^(8|10)$/)) {
    for (var i=0; i<str.length; i++) {
      tmp.push(nBase2bin(
        str[i]+str[i+1]+str[i+2], inBase));
      i++;
      i++;
    }
  } else {
      for (var i in str) {
        tmp.push(
          nBase2bin(str[i], inBase));
      }
  }
    
  var tmpL=tmp.join("").match(/.{1,6}/g);

  var tmpLastStr=tmpL[tmpL.length-1].split("").length;
  if (tmpLastStr<6) {
    for (var i=tmpLastStr; i<6; i++) {
      tmpL[tmpL.length-1]="0"+tmpL[tmpL.length-1];
    }
  }

  for (var i in tmpL) {
    tmpL[i]=map[tmpL[i]];
  }

    
  if ((tmpL.length%4)>0) {
    for (var i=(tmpL.length%4); i<4; i++) {
      tmpL.push("=");
    }
  }
  return tmpL.join("");
}

//======================================

//base64エンコード
function base64EncOLD(str) {
  var map = {};
  map['000000'] = 'A';
  map['000001'] = 'B';
  map['000010'] = 'C';
  map['000011'] = 'D';
  map['000100'] = 'E';
  map['000101'] = 'F';
  map['000110'] = 'G';
  map['000111'] = 'H';

  map['001000'] = 'I';
  map['001001'] = 'J';
  map['001010'] = 'K';
  map['001011'] = 'L';
  map['001100'] = 'M';
  map['001101'] = 'N';
  map['001110'] = 'O';
  map['001111'] = 'P';

  map['010000'] = 'Q';
  map['010001'] = 'R';
  map['010010'] = 'S';
  map['010011'] = 'T';
  map['010100'] = 'U';
  map['010101'] = 'V';
  map['010110'] = 'W';
  map['010111'] = 'X';

  map['011000'] = 'Y';
  map['011001'] = 'Z';
  map['011010'] = 'a';
  map['011011'] = 'b';
  map['011100'] = 'c';
  map['011101'] = 'd';
  map['011110'] = 'e';
  map['011111'] = 'f';

  map['100000'] = 'g';
  map['100001'] = 'h';
  map['100010'] = 'i';
  map['100011'] = 'j';
  map['100100'] = 'k';
  map['100101'] = 'l';
  map['100110'] = 'm';
  map['100111'] = 'n';

  map['101000'] = 'o';
  map['101001'] = 'p';
  map['101010'] = 'q';
  map['101011'] = 'r';
  map['101100'] = 's';
  map['101101'] = 't';
  map['101110'] = 'u';
  map['101111'] = 'v';

  map['110000'] = 'w';
  map['110001'] = 'x';
  map['110010'] = 'y';
  map['110011'] = 'z';
  map['110100'] = '0';
  map['110101'] = '1';
  map['110110'] = '2';
  map['110111'] = '3';

  map['111000'] = '4';
  map['111001'] = '5';
  map['111010'] = '6';
  map['111011'] = '7';
  map['111100'] = '8';
  map['111101'] = '9';
  map['111110'] = '+';
  map['111111'] = '/';

  if (str.match(/^[^\w\/+]+$/)) return str;
    var tmp=[];
    for (var i in str) {
      var bin8=String(
        100000000
        +Number(
          str[i].charCodeAt(0).toString(2))
        ).split("").slice(1,9).join("");
      tmp.push(bin8);
    }
    var tmp=tmp.join("").match(/.{1,6}/g);
    for (var i in tmp) {
      for (var j=tmp[i].length; j<6; j++) {
        tmp[i]+="0";
      }
      tmp[i]=map[tmp[i]];
    }
    if ((tmp.length%4)>0) {
      for (var i=(tmp.length%4); i<4; i++) {
        tmp.push("=");
      }
    }
    return tmp.join("");
}

//======================================

//base32デコード
function base32Dec(str, targetbase) {
  var map = {};
  map['A'] = '00000';
  map['B'] = '00001';
  map['C'] = '00010';
  map['D'] = '00011';
  map['E'] = '00100';
  map['F'] = '00101';
  map['G'] = '00110';
  map['H'] = '00111';

  map['I'] = '01000';
  map['J'] = '01001';
  map['K'] = '01010';
  map['L'] = '01011';
  map['M'] = '01100';
  map['N'] = '01101';
  map['O'] = '01110';
  map['P'] = '01111';

  map['Q'] = '10000';
  map['R'] = '10001';
  map['S'] = '10010';
  map['T'] = '10011';
  map['U'] = '10100';
  map['V'] = '10101';
  map['W'] = '10110';
  map['X'] = '10111';

  map['Y'] = '11000';
  map['Z'] = '11001';
  map['2'] = '11010';
  map['3'] = '11011';
  map['4'] = '11100';
  map['5'] = '11101';
  map['6'] = '11110';
  map['7'] = '11111';

  if (!str.match(/^[A-Z2-7]+=*$/i)) {
    return " - ";
  }
  var tmp=[];
  for (var i in str) {
    if (str[i]=="=") break;
    var b32RE=new RegExp(str[i],"i");
    for (var j in map) {
      if (j.match(b32RE)) {
        tmp.push(map[j]);
        break;
      }
    }
  }
  
  if (targetbase   
    && targetbase.match(/^\d+$/)
  ) {
    var result=[];
    var tmp2=tmp.join("").match(/.{8}/g);
    for (var i in tmp2) {
      if (targetbase=="2") {
        result.push(tmp2[i]);
      } else {
        var tmpN=parseInt(tmp2[i], 2).toString(Number(targetbase));
        if (targetbase=="8") {
          tmpN=(100+tmpN);
          result.push(String(tmpN).split("").slice(-3).join(""));
        }
        else if (targetbase=="10") {
          tmpN=(100+tmpN);
          result.push(String(tmpN).split("").slice(-3).join(""));
        }
        else if (targetbase=="16") {
          tmpN=(10+tmpN);
          result.push(String(tmpN).split("").slice(-2).join(""));
        }
      }
    }
    return result.join(" ");
  } else {
    return binASCII(tmp.join(""));
  }
  
}

//======================================

//base32エンコード(入力時base指定可)
function base32Enc(str, inBase) {
  if (str.match(/^\s*$/)) return str;
  
  var map = {};
  map['00000'] = 'A';
  map['00001'] = 'B';
  map['00010'] = 'C';
  map['00011'] = 'D';
  map['00100'] = 'E';
  map['00101'] = 'F';
  map['00110'] = 'G';
  map['00111'] = 'H';

  map['01000'] = 'I';
  map['01001'] = 'J';
  map['01010'] = 'K';
  map['01011'] = 'L';
  map['01100'] = 'M';
  map['01101'] = 'N';
  map['01110'] = 'O';
  map['01111'] = 'P';

  map['10000'] = 'Q';
  map['10001'] = 'R';
  map['10010'] = 'S';
  map['10011'] = 'T';
  map['10100'] = 'U';
  map['10101'] = 'V';
  map['10110'] = 'W';
  map['10111'] = 'X';

  map['11000'] = 'Y';
  map['11001'] = 'Z';
  map['11010'] = '2';
  map['11011'] = '3';
  map['11100'] = '4';
  map['11101'] = '5';
  map['11110'] = '6';
  map['11111'] = '7';

  function nBase2bin(myStr, base) {
    if (
      base && base.match(/^(8|10|16)$/)
    ) {
      var bin=
        parseInt(myStr, base).toString(2);
      bin=(100000000+Number(bin))+"";
      return bin.split("").slice(1,9).join("");
    } else {
      return String(
        100000000+Number(
          myStr.charCodeAt(0).toString(2))
      ).split("").slice(1,9).join("");
    }
  }

  var tmp=[];
  str=str.replace(/\s+/g, "");

  if (inBase && inBase.match(/^2$/)) { 
    tmp.push(str);
  } else if (inBase && inBase.match(/^16$/)) {
    for (var i=0; i<str.length; i++) {
      tmp.push(nBase2bin(
        str[i]+str[i+1], inBase));
      i++;
    }
  } else if (inBase && inBase.match(/^(8|10)$/)) {
    for (var i=0; i<str.length; i++) {
      tmp.push(nBase2bin(
        str[i]+str[i+1]+str[i+2], inBase));
      i++;
      i++;
    }
  } else {
      for (var i in str) {
        tmp.push(
          nBase2bin(str[i], inBase));
      }
  }
 
  var tmpL=tmp.join("").match(/.{1,5}/g);

  var tmpLastStr=tmpL[tmpL.length-1].split("").length;
  if (tmpLastStr<5) {
    for (var i=tmpLastStr; i<5; i++) {
      tmpL[tmpL.length-1]="0"+tmpL[tmpL.length-1];
    }
  }

  for (var i in tmpL) {
    tmpL[i]=map[tmpL[i]];
  }

  if ((tmpL.length%8)>0) {
    for (var i=(tmpL.length%8); i<8; i++) {
      tmpL.push("=");
    }
  }

  return tmpL.join("");
}


//======================================

// ヴィジュネルautokeyエンコード
function vigenereAutoEnc(phrase, key) {
  if (key=="") return phrase;
  if (!phrase) return phrase;
  //大文字小文字を保存
  var updown=phrase.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var keyLenRE=new RegExp(
    ".{0,"+key.length+"}","g");
  var phraseL=phrase.match(keyLenRE);
  //alert(phraseL.length+" : "+phraseL);
  //alert(keyLenRE);
  var result="";
  var newKey="";
  for (var j in phraseL) {
    if (phraseL[j]=="") continue;
    for (var i in key) {
      /*alert(
        "j="+j+"\n"+
        "i="+i+"\n"+
        phraseL[j][i]);*/
      if (phraseL[j][i].match(/\d/)) {
        var p=Number(phraseL[j][i]);
        var k=Number(letter2Num(key[i]));
        var c=rotN(String(p),+k);
        result+=c;
        newKey+=phraseL[j][i];
      } else {
        var p=Number(
          letter2Num(phraseL[j][i]));
        var k=Number(letter2Num(key[i]));
        var c=(p+k)%26;
        result+=to012abc(c);
        newKey+=phraseL[j][i];
      }
      if (result.length>=phrase.length) {
        break;
      }
    }
    /*alert(
        "key="+key+"\n"+
        "newKey="+newKey);*/
    key=newKey;
    newKey="";
  }
  //大文字小文字を復元
  var resulttmp=result.split("");
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(resulttmp[i].match(/[a-z]/)) resulttmp[i]=resulttmp[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(resulttmp[i].match(/[A-Z]/)) resulttmp[i]=resulttmp[i].toLowerCase();
    }
  }
  result=resulttmp.join("");
  
  return result;
}

// ヴィジュネルautokeyデコード
function vigenereAutoDec(cipher, key) {
  if (key=="") return cipher;
  if (!cipher) return cipher;
  //大文字小文字を保存
  var updown=cipher.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var keyLenRE=new RegExp(
    ".{0,"+key.length+"}","g");
  var cipherL=cipher.match(keyLenRE);
  //alert(cipherL.length+" : "+cipherL);
  //alert(keyLenRE);
  var result="";
  var newKey="";
  for (var j in cipherL) {
    if (cipherL[j]=="") continue;
    for (var i in key) {
      if (!cipherL[j][i]) {
        debug(
          "j="+j+"\n"+
          "i="+i+"\n"+
          cipherL[j][i]);
        }
      if (cipherL[j][i] && cipherL[j][i].match(/\d/)) {
        var c=Number(cipherL[j][i]);
        var k=Number(letter2Num(key[i]));
        var p=rotN(String(c),-k);
        result+=p;
        newKey+=p;
      } else {
        var c=Number(
          letter2Num(cipherL[j][i]));
        var k=Number(letter2Num(key[i]));
        var p=(c-k+26)%26;
        result+=to012abc(p);
        newKey+=to012abc(p);
      }
      if (result.length>=cipher.length) {
        break;
      }
    }
    /*alert(
        "key="+key+"\n"+
        "newKey="+newKey);*/
    key=newKey;
    newKey="";
  }
  //大文字小文字を復元
  var resulttmp=result.split("");
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(resulttmp[i].match(/[a-z]/)) resulttmp[i]=resulttmp[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(resulttmp[i].match(/[A-Z]/)) resulttmp[i]=resulttmp[i].toLowerCase();
    }
  }
  result=resulttmp.join("");
  
  return result;
}

//ビジュネルエンコード
function vigenereEnc(str,key) {
  if (!str) return str;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");

  //keyを作る
  if (key=="") key="a";
  if (key.length>str.length) {
    var keys=key.split("");
    keys.splice(
      str.length, key.length-str.length);
    key=keys.join("");
  } else if (key.length<str.length) {
    var j=0;
    for (
      var i=str.length-key.length; i>0; i--
    ) {
      key+=key[j];
      j++;
      if (j>key.length-1) j=0;
    }
  }
  
  var ciphered="";
  for (var i in str) {
    if (str[i].match(/\d/)) {
      var p=Number(str[i]);
      var k=Number(letter2Num(key[i]));
      var c=rotN(String(p),+k);
      ciphered+=c;
    } else {
      var p=Number(letter2Num(str[i]));
      var k=Number(letter2Num(key[i]));
      var c=(p+k)%26;
      ciphered+=to012abc(c);
    }
  }
  //大文字小文字を復元
  var resulttmp=ciphered.split("");
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(resulttmp[i].match(/[a-z]/)) resulttmp[i]=resulttmp[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(resulttmp[i].match(/[A-Z]/)) resulttmp[i]=resulttmp[i].toLowerCase();
    }
  }
  ciphered=resulttmp.join("");
  
  return ciphered;
}

//ヴィジュネルデコード
function vigenereDec(str,key) {
  if (!str) return str;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");

  //keyを作る
  if (key=="") key="a";
  if (key.length>str.length) {
    var keys=key.split("");
    keys.splice(
      str.length, key.length-str.length);
    key=keys.join("");
  } else if (key.length<str.length) {
    var j=0;
    for (
      var i=str.length-key.length; i>0; i--
    ) {
      key+=key[j];
      j++;
      if (j>key.length-1) j=0;
    }
  }
  
  var ciphered="";
  for (var i in str) {
    if (str[i].match(/\d/)) {
      var c=Number(str[i]);
      var k=Number(letter2Num(key[i]));
      var p=rotN(String(c),-k);
      ciphered+=p;
    } else {
      var c=Number(letter2Num(str[i]));
      var k=Number(letter2Num(key[i]));
      var p=(c-k+26)%26;
      ciphered+=to012abc(p);
    }
  }
  //大文字小文字を復元
  var resulttmp=ciphered.split("");
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(resulttmp[i].match(/[a-z]/)) resulttmp[i]=resulttmp[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(resulttmp[i].match(/[A-Z]/)) resulttmp[i]=resulttmp[i].toLowerCase();
    }
  }
  ciphered=resulttmp.join("");
  
  return ciphered;
}

/* 大文字小文字非対応版
// ヴィジュネルautokeyエンコード
function vigenereAutoEnc(phrase, key) {
  if (key=="") return phrase;
  if (!phrase) return phrase;
  var keyLenRE=new RegExp(
    ".{0,"+key.length+"}","g");
  var phraseL=phrase.match(keyLenRE);
  //alert(phraseL.length+" : "+phraseL);
  //alert(keyLenRE);
  var result="";
  var newKey="";
  for (var j in phraseL) {
    if (phraseL[j]=="") continue;
    for (var i in key) {
      //alert("j="+j+"\n"+"i="+i+"\n"+phraseL[j][i]);
      if (phraseL[j][i].match(/\d/)) {
        var p=Number(phraseL[j][i]);
        var k=Number(letter2Num(key[i]));
        var c=rotN(String(p),+k);
        result+=c;
        newKey+=phraseL[j][i];
      } else {
        var p=Number(
          letter2Num(phraseL[j][i]));
        var k=Number(letter2Num(key[i]));
        var c=(p+k)%26;
        result+=to012abc(c);
        newKey+=phraseL[j][i];
      }
      if (result.length>=phrase.length) {
        break;
      }
    }
    //alert("key="+key+"\n"+"newKey="+newKey);
    key=newKey;
    newKey="";
  }
  return result;
}

//======================================

// ヴィジュネルautokeyデコード
function vigenereAutoDec(cipher, key) {
  if (key=="") return cipher;
  if (!cipher) return cipher;
  var keyLenRE=new RegExp(
    ".{0,"+key.length+"}","g");
  var cipherL=cipher.match(keyLenRE);
  //alert(cipherL.length+" : "+cipherL);
  //alert(keyLenRE);
  var result="";
  var newKey="";
  for (var j in cipherL) {
    if (cipherL[j]=="") continue;
    for (var i in key) {
      if (!cipherL[j][i]) {
        debug(
          "j="+j+"\n"+
          "i="+i+"\n"+
          cipherL[j][i]);
        }
      if (cipherL[j][i] && cipherL[j][i].match(/\d/)) {
        var c=Number(cipherL[j][i]);
        var k=Number(letter2Num(key[i]));
        var p=rotN(String(c),-k);
        result+=p;
        newKey+=p;
      } else {
        var c=Number(
          letter2Num(cipherL[j][i]));
        var k=Number(letter2Num(key[i]));
        var p=(c-k+26)%26;
        result+=to012abc(p);
        newKey+=to012abc(p);
      }
      if (result.length>=cipher.length) {
        break;
      }
    }
    //alert("key="+key+"\n"+"newKey="+newKey);
    key=newKey;
    newKey="";
  }
  return result;
}

//======================================

//ビジュネルエンコード
function vigenereEnc(str,key) {
  if (!str) return str;
  //keyを作る
  if (key=="") key="a";
  if (key.length>str.length) {
    var keys=key.split("");
    keys.splice(
      str.length, key.length-str.length);
    key=keys.join("");
  } else if (key.length<str.length) {
    var j=0;
    for (
      var i=str.length-key.length; i>0; i--
    ) {
      key+=key[j];
      j++;
      if (j>key.length-1) j=0;
    }
  }
  
  var ciphered="";
  for (var i in str) {
    if (str[i].match(/\d/)) {
      var p=Number(str[i]);
      var k=Number(letter2Num(key[i]));
      var c=rotN(String(p),+k);
      ciphered+=c;
    } else {
      var p=Number(letter2Num(str[i]));
      var k=Number(letter2Num(key[i]));
      var c=(p+k)%26;
      ciphered+=to012abc(c);
    }
  }
  return ciphered;
}

//======================================

//ヴィジュネルデコード
function vigenereDec(str,key) {
  if (!str) return str;
  //keyを作る
  if (key=="") key="a";
  if (key.length>str.length) {
    var keys=key.split("");
    keys.splice(
      str.length, key.length-str.length);
    key=keys.join("");
  } else if (key.length<str.length) {
    var j=0;
    for (
      var i=str.length-key.length; i>0; i--
    ) {
      key+=key[j];
      j++;
      if (j>key.length-1) j=0;
    }
  }
  
  var ciphered="";
  for (var i in str) {
    if (str[i].match(/\d/)) {
      var c=Number(str[i]);
      var k=Number(letter2Num(key[i]));
      var p=rotN(String(c),-k);
      ciphered+=p;
    } else {
      var c=Number(letter2Num(str[i]));
      var k=Number(letter2Num(key[i]));
      var p=(c-k+26)%26;
      ciphered+=to012abc(p);
    }
  }
  return ciphered;
}
*/

//======================================

// Rot ± N
function rotN(str, n, flag) {
  // n=変化量(マイナス可)
  // flag=0/1 数字をrot変化するかどうか
  if (flag==undefined) flag=1;
  //大文字小文字を保存
  var updown=str.replace(/[^A-Z]/ig, "*").replace(/[a-z]/g, "0").replace(/[A-Z]/g, "1");
  var chars=str.toUpperCase().split("");
  if (n==null) n=1;
  var result=[];
  for (var i in chars) {
    if (n>=0) {
      var newN=chars[i].charCodeAt();
      if (newN>=48 && newN<=57 && flag==1) {
        newN+=Math.abs(n)%10;
        if (newN>57) newN=newN-10;
      } else if (newN>=65 && newN<=90) {
        newN+=Math.abs(n)%26;
        if (newN>90) newN=newN-26;
      }
      result[i]=String.fromCharCode(
        newN);
    } else if (n<0) {
      var newN=chars[i].charCodeAt();
      if (newN>=48 && newN<=57 && flag==1) {
        newN-=Math.abs(n)%10;
        if (newN<48) newN=newN+10;
      } else if (newN>=65 && newN<=90) {
        newN-=Math.abs(n)%26;
        if (newN<65) newN=newN+26;
      }
      result[i]=String.fromCharCode(
        newN);
    }
  }
  //大文字小文字を復元
  for (var i in updown) {
    if (updown[i].match(/1/)) {
      if(result[i].match(/[a-z]/)) result[i]=result[i].toUpperCase();
    } else if (updown[i].match(/0/)) {
      if(result[i].match(/[A-Z]/)) result[i]=result[i].toLowerCase();
    }
  }
  return result.join("");
}

//======================================

// polybius換字変換
function polybius(str) {
  var map=new Array(6);
  map[0]=[];
  map[1]=" abcde".split("");
  map[2]=" fghik".split("");
  map[3]=" lmnop".split("");
  map[4]=" qrstu".split("");
  map[5]=" vwxyz".split("");
  var result="";
  var list=str.replace(/\s+/g,"").match(/\d\d/g);
  for (var i in list) {
    result+=map[list[i][0]][list[i][1]];
  }
  return result;
}

//======================================

//ガラケー打ち変換(連続タイプ)
// 3332226779999
function garake(str) {
  if (!str) return false;
  var k=[];
  k[2]=["","a","b","c"];
  k[3]=["","d","e","f"];
  k[4]=["","g","h","i"];
  k[5]=["","j","k","l"];
  k[6]=["","m","n","o"];
  k[7]=["","p","q","r","s"];
  k[8]=["","t","u","v"];
  k[9]=["","w","x","y","z"];

    var r="";
    var b=str.match(/([2-9])\1*/g);
    for (var j in b) {
      var num=b[j][0];
      var numT=b[j].length;
      if (k[num][numT]) {
        r+=k[num][numT];
      } else {
        r+=b[j];
      }
    }
  return r;
}

//ガラケー打ち変換(run length)
// 個数とナンバーのペア
// 3332162749
function garakeRunLength(str) {
  if (!str || !str.match(/^[1-9\s,.:\\\/|\-]+$/)) return false;
  var k=[];
  k[2]=["","a","b","c"];
  k[3]=["","d","e","f"];
  k[4]=["","g","h","i"];
  k[5]=["","j","k","l"];
  k[6]=["","m","n","o"];
  k[7]=["","p","q","r","s"];
  k[8]=["","t","u","v"];
  k[9]=["","w","x","y","z"];

    var r="";
    var b=str.match(/([1-3][2-68]|[1-4][79])[\s,.:\\\/|\-]*/g);
    for (var j in b) {
      var num=b[j][1];
      var numT=b[j][0];
      if (k[num][numT]) {
        r+=k[num][numT];
      } else {
        r+=b[j];
      }
    }
  return r;
}

//======================================

// モールス相互変換
function morseExchange(str) {
  
var mrs=[["A",".-"], ["B","-..."], ["C","-.-."], ["D","-.."], ["E","."], ["F","..-."], ["G","--."], ["H","...."], ["I",".."], ["J",".---"], ["K","-.-"], ["L",".-.."], ["M","--"], ["N","-."], ["O","---"], ["P",".--."], ["Q","--.-"], ["R",".-."], ["S","..."], ["T","-"], ["U","..-"], ["V","...-"], ["W",".--"], ["X","-..-"], ["Y","-.--"], ["Z","--.."], ["0","-----"], ["1",".----"], ["2","..---"], ["3","...--"], ["4","....-"], ["5","....."], ["6","-...."], ["7","--..."], ["8","---.."], ["9","----."], [".",".-.-.-"], [",","--..--"], ["?","..--.."], ["-","-....-"], ["=","-...-"], [":","---..."], [";","-.-.-."], ["(","-.--."], [")","-.--.-"], ["/","-..-."], ["\"",".-..-."], ["$","...-..-"], ["'",".----."], ["¶",".-.-.."], ["_","..--.-"], ["@",".--.-."], ["!","-.-.--"], ["+",".-.-."], ["#","...-.-"], ["&",".-..."]];

  // ["~",".-..."]

  str=str.replace(/^\s+|\s+$/g, "");
  var tmp=[];

  if (str.match(/^[.\- ]+$/)) {
    var sorce=str.split(" ");
    for (var i in sorce) {
      for (var j in mrs) {
        if (sorce[i]==mrs[j][1]) {
          tmp.push(mrs[j][0]);
          break;
        }
      }
      if (i!=tmp.length-1) {
        tmp.push("∎");
      }
    }
    return tmp.join("");
  } else {
    // モールスにスペースはない
    str=str.replace(/\s+/g, "");
    var sorce=str.toUpperCase().split("");
    for (var i in sorce) {
      for (var j in mrs) {
        if (sorce[i]==mrs[j][0]) {
          tmp.push(mrs[j][1]);
          break;
        }
      }
      if (i!=tmp.length-1) {
        tmp.push("∎");
      }
    }
    return tmp.join(" ");
  }
}

//モールスswap
function morseSwapOld(str) {
  var tmp=str.split("");
  for (var i in tmp) {
    if (tmp[i]=="-") { tmp[i]="."; }
    else if (tmp[i]==".") { tmp[i]="-"; }
  }
  return tmp.join("");
}

// モールス相互変換
function morseExchangeNew(str) {
  
  if (str.match(/^([.\-]+ ?)+$/i)) {

    str=" "+str+" ";
    str=str.replace(/ \.-\.-\.- /ig, " . ");
    str=str.replace(/ -\.\.\.\.- /ig, " - ");
    str=str.replace(/ ----- /ig, " 0 ");
    str=str.replace(/ \.---- /ig, " 1 ");
    str=str.replace(/ \.\.--- /ig, " 2 ");
    str=str.replace(/ \.\.\.-- /ig, " 3 ");
    str=str.replace(/ \.\.\.\.- /ig, " 4 ");
    str=str.replace(/ \.\.\.\.\. /ig, " 5 ");
    str=str.replace(/ -\.\.\.\. /ig, " 6 ");
    str=str.replace(/ --\.\.\. /ig, " 7 ");
    str=str.replace(/ ---\.\. /ig, " 8 ");
    str=str.replace(/ ----\. /ig, " 9 ");
    str=str.replace(/ \.-\.\.-\. /ig, ' " ');
    str=str.replace(/ \.- /ig, " A ");
    str=str.replace(/ -\.\.\. /ig, " B ");
    str=str.replace(/ -\.-\. /ig, " C ");
    str=str.replace(/ -\.\. /ig, " D ");
    str=str.replace(/ \. /ig, " E ");
    str=str.replace(/ \.\.-\. /ig, " F ");
    str=str.replace(/ --\. /ig, " G ");
    str=str.replace(/ \.\.\.\. /ig, " H ");
    str=str.replace(/ \.\. /ig, " I ");
    str=str.replace(/ \.--- /ig, " J ");
    str=str.replace(/ -\.- /ig, " K ");
    str=str.replace(/ \.-\.\. /ig, " L ");
    str=str.replace(/ -- /ig, " M ");
    str=str.replace(/ -\. /ig, " N ");
    str=str.replace(/ --- /ig, " O ");
    str=str.replace(/ \.--\. /ig, " P ");
    str=str.replace(/ --\.- /ig, " Q ");
    str=str.replace(/ \.-\. /ig, " R ");
    str=str.replace(/ \.\.\. /ig, " S ");
    str=str.replace(/ - /ig, " T ");
    str=str.replace(/ \.\.- /ig, " U ");
    str=str.replace(/ \.\.\.- /ig, " V ");
    str=str.replace(/ \.-- /ig, " W ");
    str=str.replace(/ -\.\.- /ig, " X ");
    str=str.replace(/ -\.-- /ig, " Y ");
    str=str.replace(/ --\.\. /ig, " Z ");
    str=str.replace(/ --\.\.-- /ig, " , ");
    str=str.replace(/ \.\.--\.\. /ig, " ? ");
    str=str.replace(/ -\.\.\.- /ig, " = ");
    str=str.replace(/ ---\.\.\. /ig, " : ");
    str=str.replace(/ -\.-\.-\. /ig, " ; ");
    str=str.replace(/ -\.--\. /ig, " ( ");
    str=str.replace(/ -\.--\.- /ig, " ) ");
    str=str.replace(/ -\.\.-\. /ig, " / ");
    str=str.replace(/ \.\.\.-\.\.- /ig, " $ ");
    str=str.replace(/ \.----\. /ig, " ' ");
    str=str.replace(/ \.-\.-\.\. /ig, " ¶ ");
    str=str.replace(/ \.\.--\.- /ig, " _ ");
    str=str.replace(/ \.--\.-\. /ig, " @ ");
    str=str.replace(/ -\.-\.-- /ig, " ! ");
    str=str.replace(/ \.-\.-\. /ig, " + ");
    str=str.replace(/ \.\.\.-\.- /ig, " # ");
    str=str.replace(/ \.-\.\.\. /ig, " & ");
    str=str.replace(/ [\.\-]{2,} /ig, " ∎ ");
    str=str.replace(/ [^\.\-] /ig, " ∎ ");
    str=str.replace(/ /ig, ""); 
  
  } else {
  
    str=str.replace(/^\s+|\s+$/g, "");
    str=str.replace(/\./g, "\0");
    str=str.replace(/-/g, " -....- ");
    str=str.replace(/\0/g, " .-.-.- ");
    str=str.replace(/"/g, " .-..-. ");
    str=str.replace(/A/ig, " .- ");
    str=str.replace(/B/ig, " -... ");
    str=str.replace(/C/ig, " -.-. ");
    str=str.replace(/D/ig, " -.. ");
    str=str.replace(/E/ig, " . ");
    str=str.replace(/F/ig, " ..-. ");
    str=str.replace(/G/ig, " --. ");
    str=str.replace(/H/ig, " .... ");
    str=str.replace(/I/ig, " .. ");
    str=str.replace(/J/ig, " .--- ");
    str=str.replace(/K/ig, " -.- ");
    str=str.replace(/L/ig, " .-.. ");
    str=str.replace(/M/ig, " -- ");
    str=str.replace(/N/ig, " -. ");
    str=str.replace(/O/ig, " --- ");
    str=str.replace(/P/ig, " .--. ");
    str=str.replace(/Q/ig, " --.- ");
    str=str.replace(/R/ig, " .-. ");
    str=str.replace(/S/ig, " ... ");
    str=str.replace(/T/ig, " - ");
    str=str.replace(/U/ig, " ..- ");
    str=str.replace(/V/ig, " ...- ");
    str=str.replace(/W/ig, " .-- ");
    str=str.replace(/X/ig, " -..- ");
    str=str.replace(/Y/ig, " -.-- ");
    str=str.replace(/Z/ig, " --.. ");
    str=str.replace(/0/g, " ----- ");
    str=str.replace(/1/g, " .---- ");
    str=str.replace(/2/g, " ..--- ");
    str=str.replace(/3/g, " ...-- ");
    str=str.replace(/4/g, " ....- ");
    str=str.replace(/5/g, " ..... ");
    str=str.replace(/6/g, " -.... ");
    str=str.replace(/7/g, " --... ");
    str=str.replace(/8/g, " ---.. ");
    str=str.replace(/9/g, " ----. ");
    str=str.replace(/,/g, " --..-- ");
    str=str.replace(/\?/g, " ..--.. ");
    str=str.replace(/=/g, " -...- ");
    str=str.replace(/:/g, " ---... ");
    str=str.replace(/;/g, " -.-.-. ");
    str=str.replace(/\(/g, " -.--. ");
    str=str.replace(/\)/g, " -.--.- ");
    str=str.replace(/\//g, " -..-. ");
    str=str.replace(/\$/g, " ...-..- ");
    str=str.replace(/'/g, " .----. ");
    str=str.replace(/\¶/g, " .-.-.. ");
    str=str.replace(/_/g, " ..--.- ");
    str=str.replace(/@/g, " .--.-. ");
    str=str.replace(/!/g, " -.-.-- ");
    str=str.replace(/\+/g, " .-.-. ");
    str=str.replace(/#/g, " ...-.- ");
    str=str.replace(/&/g, " .-... ");
    str=str.replace(/[^.\- ]/g, " ∎ ");
    str=str.replace(/ +/g, " ");
 
  }
  
  return str;
  
}

//モールスswap
function morseSwap(str) {
  str=str.replace(/\./g, "\0");
  str=str.replace(/-/g, ".");
  str=str.replace(/\0/g, "-");
  return str;
}

//======================================


