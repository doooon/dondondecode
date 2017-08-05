//RectNを様々な方向から読み出し
IS_HTML=true;
#IMPORT Lib_decode
#IMPORT Lib_decode_basic

// サンプル
//TEXT="7tff8globalc5o9s";
//TEXT="ft7\nh8f\nolu\ntgn\nnar\n5cs\ns9o";
//TEXT="abcde\nfghij\nklmno\npqrst\nuvwxy";

//左から横読み
//TEXT="0123456789";

//左下から縦読み
//TEXT="9\n8\n7\n6\n5\n4\n3\n2\n1";

//左下から縦読み2行
//TEXT="89\n67\n45\n23\n01";

//左上から右渦巻き読み
//TEXT="abcde\npqrsf\noxytg\nnwvuh\nmlkji";

//右上から右渦巻き読み
//TEXT="mnopa\nlwxqb\nkvyrc\njutsd\nihgfe";

//右下から右渦巻き読み
//TEXT="ijklm\nhuvwn\ngtyxo\nfsrqp\nedcba";

//左下から右渦巻き読み
//TEXT="efghi\ndstuj\ncryvk\nbqxwl\naponm";

//左上から左渦巻き読み
//TEXT="aponm\nbqxwl\ncryvk\ndstuj\nefghi";

//左下から左渦巻き読み
//TEXT="mlkji\nnwvuh\noxytg\npqrsf\nabcde";

//右下から左渦巻き読み
//TEXT="ihgfe\njutsd\nkvyrc\nlwxqb\nmnopa";

//右上から左渦巻き読み
//TEXT="edcba\nfsrqp\ngtyxo\nhuvwn\nijklm";

//左上から右へ折り返し読み
//TEXT="abcde\njihgf\nklmno\ntsrqp\nuvwxy";

//右上から左へ折り返し読み
//TEXT="edcba\nfghij\nonmlk\npqrst\nyxwvu";

//右下から左へ折り返し読み
//TEXT="yxwvu\npqrst\nonmlk\nfghij\nedcba";

//左下から右へ折り返し読み
//TEXT="uvwxy\npqrst\nklmno\nfghij\nabcde";

//左上から下へ折り返し読み
//TEXT="ajktu\nbilsv\nchmrw\ndgnqx\nefopy";

//右上から下へ折り返し読み
//TEXT="utkja\nvslib\nwrmhc\nxqngd\nypofe";

//右下から上へ折り返し読み
//TEXT="ypofe\nxqngd\nwrmhc\nvslib\nutkja";

//左下から上へ折り返し読み
//TEXT="efopy\ndgnqx\nchmrw\nbilsv\najktu";

//上下に1スライドして左上から右
//TEXT="u3a8q\ncn9o3\n2hwvs";
//TEXT="ALHDO\nFBMIE\nKGCNJ";

// 左右に1スライドして
//TEXT="afk\nlbg\nhmc\ndin\noej";

// 左右スライド総当たり
//TEXT="i4d2\n3sho\nesvv\n8r7l";
//TEXT="i4x2\n3sho\nesvm\n8r7l";
//TEXT="shonin\ndarsana\nabadon\nada";

// 3列目,1列目,4列目,2列目の順番
// 2列目、4列目、1列目、3列目の順
// 3、1、6、4、2、5列目の順

// ==================

function rectRead(rect) {

  var yLen = rect.length;
  var xLen = rect[0].length;

  // sorce rect 表示
  for (var i=0; i<rect.length; i=(i+1)|0) {
    htmlTmp.push(rect[i].join(""));
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

  htmlTmp.push("===============");

}

// =================

function rectReadStart(rectSorce) {
  htmlTmp.push("ノーマル");
  rectRead(rectSorce);

  // -----------

  /*多次元配列の代入は参照になるため
  copyArray()を使い複製すること*/
  
  htmlTmp.push("偶数行reverse");
  var rectSorce2=copyArray(rectSorce);
  for (var i=0; i<rectSorce2.length; i=(i+1)|0) {
    if (i%2) {
      // 偶数行
      rectSorce2[i].reverse();
    }
  }
  rectRead(rectSorce2);

// -----------

  htmlTmp.push("偶数列reverse");
  var rectSorce3=rectReflect(
    copyArray(rectSorce));
  for (var i=1; i< rectSorce3.length; i=(i+1)|0) {
    if (i%2) {
      // 偶数列
      rectSorce3[i]=rectSorce3[i].reverse();
    }
  }
  rectRead(rectReflect(rectSorce3));

// -----------

// 時間がかかるので
if (fixCodeList.length) return;

// -----------

// 3列の場合、列入れ替え
if (rectSorce[0].length==3) {
  
  htmlTmp.push("列入れ替え132");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え213");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  
}

// 3行の場合、行の入れ替え
if (rectSorce.length==3) {
  
  htmlTmp.push("行の入れ替え132");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え213");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  
}

// -----------

// 4列の場合、列入れ替え
if (rectSorce[0].length==4) {
  
  function rect4readCol(myPattern) {
    myPattern+=""; //文字化
   if (!myPattern.match(/^[1-4]{4}$/)) {
     htmlTmp.push(
       "Error! rect4readCol()");
     return;
   }
    htmlTmp.push(
      "列入れ替え"+myPattern);
    var rSorceCopy=
      copyArray(rectSorce);
    var myPtn=[];
    myPtn[0]=Number(myPattern[0])-1;
    myPtn[1]=Number(myPattern[1])-1;
    myPtn[2]=Number(myPattern[2])-1;
    myPtn[3]=Number(myPattern[3])-1;
    for (var i=0; i<rSorceCopy.length; i=(i+1)|0) {
      rSorceCopy[i]=
        [
          rSorceCopy[i][myPtn[0]],
          rSorceCopy[i][myPtn[1]],
          rSorceCopy[i][myPtn[2]],
          rSorceCopy[i][myPtn[3]]
        ];
    }
    rectRead(rSorceCopy);
    htmlTmp.push("---------");
  }
  
  var allPattern=[1234,1243,1324,1342,1423,1432,2134,2143,2314,2413,3124,3214];
  
  for (var i=0; i<allPattern.length; i=(i+1)|0) {
    if (fixCodeList.length) break;
    rect4readCol(allPattern[i]);
  }
  
  /*
  htmlTmp.push("列入れ替え3142");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][1]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え1324");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え1342");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][3],
        rectSorce3[i][1]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え2143");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え4213");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え3241");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え1432");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え2134");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][3]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え1243");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  */
}

htmlTmp.push("=========");

// 4行の場合、行の入れ替え
if (rectSorce.length==4) {
  
  function rect4readRow(myPattern) {
    myPattern+=""; //文字化
   if (!myPattern.match(/^[1-4]{4}$/)) {
     htmlTmp.push(
       "Error! rect4readRow()");
     return;
   }
    htmlTmp.push(
      "行入れ替え"+myPattern);
    var rSorceCopy=
      rectReflect(copyArray(rectSorce));
    var myPtn=[];
    myPtn[0]=Number(myPattern[0])-1;
    myPtn[1]=Number(myPattern[1])-1;
    myPtn[2]=Number(myPattern[2])-1;
    myPtn[3]=Number(myPattern[3])-1;
    for (var i=0; i<rSorceCopy.length; i=(i+1)|0) {
      rSorceCopy[i]=
        [
          rSorceCopy[i][myPtn[0]],
          rSorceCopy[i][myPtn[1]],
          rSorceCopy[i][myPtn[2]],
          rSorceCopy[i][myPtn[3]]
        ];
    }
    rectRead(rectReflect(rSorceCopy));
    htmlTmp.push("---------");
  }
  
  var allPattern=[1234,1243,1324,1342,1423,1432,2134,2143,2314,2413,3124,3214];
  
  for (var i=0; i<allPattern.length; i=(i+1)|0) {
    if (fixCodeList.length) break;
    rect4readRow(allPattern[i]);
  }
  
  /*
  htmlTmp.push("行の入れ替え3142");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][1]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え1324");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え1342");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][3],
        rectSorce3[i][1]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え2143");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え4213");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え3241");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え1432");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectReflect(rectSorce3));
  
    htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え2134");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][3]];
  }
  rectRead(rectReflect(rectSorce3));

  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え1243");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  */
}

//＼(^o^)／
// -----------

// 時間がかかるので
if (fixCodeList.length) return;

// -----------

// 5列の場合、列入れ替え
if (rectSorce[0].length==5) {
  htmlTmp.push("列入れ替え24153");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0],
        rectSorce3[i][4],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え14325");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][4]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え24351");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][4],
        rectSorce3[i][0]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え53241");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][4],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え45123");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0],
        rectSorce3[i][1],
        rectSorce3[i][2]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え23541");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][2],
        rectSorce3[i][4],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え52314");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][4],
        rectSorce3[i][1],
        rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][3]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え45132");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectSorce3);
  
  htmlTmp.push("---------");
  
  htmlTmp.push("列入れ替え32451");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0]];
  }
  rectRead(rectSorce3);

}

htmlTmp.push("=========");


// 5行の場合、行の入れ替え
if (rectSorce.length==5) {
  htmlTmp.push("行の入れ替え24153");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0],
        rectSorce3[i][4],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え14325");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][0],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][4]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え24351");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][2],
        rectSorce3[i][4],
        rectSorce3[i][0]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え53241");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][4],
        rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え45123");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0],
        rectSorce3[i][1],
        rectSorce3[i][2]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え23541");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][1],
        rectSorce3[i][2],
        rectSorce3[i][4],
        rectSorce3[i][3],
        rectSorce3[i][0]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え52314");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][4],
        rectSorce3[i][1],
        rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][3]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え45132");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0],
        rectSorce3[i][2],
        rectSorce3[i][1]];
  }
  rectRead(rectReflect(rectSorce3));
  
  htmlTmp.push("---------");
  
  htmlTmp.push("行の入れ替え32451");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][1],
        rectSorce3[i][3],
        rectSorce3[i][4],
        rectSorce3[i][0]];
  }
  rectRead(rectReflect(rectSorce3));
    
}

htmlTmp.push("=========");


  // 6列の場合、列入れ替え
if (rectSorce[0].length==6) {
  htmlTmp.push("列入れ替え316425");
  var rectSorce3=copyArray(rectSorce);
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][5],
        rectSorce3[i][3],
        rectSorce3[i][1],
        rectSorce3[i][4]];
  }
  rectRead(rectSorce3);
  htmlTmp.push("=========");
}

// 6行の場合、行の入れ替え
if (rectSorce.length==6) {
  htmlTmp.push("行の入替316425");
  var rectSorce3=
    rectReflect(copyArray(rectSorce));
  for (var i=0; i<rectSorce3.length; i=(i+1)|0) {
      rectSorce3[i]=
        [rectSorce3[i][2],
        rectSorce3[i][0],
        rectSorce3[i][5],
        rectSorce3[i][3],
        rectSorce3[i][1],
        rectSorce3[i][4]];
  }
  rectRead(rectReflect(rectSorce3));
  htmlTmp.push("=========");
}

// -----------

// 時間がかかるので
if (fixCodeList.length) return;

// -----------
  if (rectSorce.length==3) {
  htmlTmp.push("上下に1スライド");
  var rectSorce4=rectReflect(
    copyArray(rectSorce));
  
  for (var i=1; i< rectSorce4.length; i=(i+1)|0) {
    if (i%3==0) { 
      continue;
   } else if (i%3==1) {
      // 2列目
      rectSorce4[i].push(rectSorce4[i][0]);
      rectSorce4[i].shift();
    } else if (i%3==2) {
      //3列目
      rectSorce4[i].unshift(
        rectSorce4[i][
          rectSorce4[i].length-1]
      );
      rectSorce4[i].pop();
    }
  }
  rectRead(rectReflect(rectSorce4));

// -----------

  htmlTmp.push("下上に1スライド");
  var rectSorce4=rectReflect(
    copyArray(rectSorce));
  
  for (var i=1; i< rectSorce4.length; i=(i+1)|0) {
    if (i%3==0) { 
      continue;
   } else if (i%3==1) {
      // 2列目
      rectSorce4[i].unshift(
        rectSorce4[i][
          rectSorce4[i].length-1]
      );
      rectSorce4[i].pop();
    } else if (i%3==2) {
      //3列目
      rectSorce4[i].push(rectSorce4[i][0]);
      rectSorce4[i].shift();
    }
  }
  rectRead(rectReflect(rectSorce4));
  }
  
  // -----------
  
  var rectSorce4=rectReflect(
    copyArray(rectSorce));
  if (rectSorce4.length==3) {
  htmlTmp.push("左右に1スライド");
  
  var rectSorce4=
    copyArray(rectSorce);
  
  for (var i=1; i< rectSorce4.length; i=(i+1)|0) {
    if (i%3==0) { 
      continue;
   } else if (i%3==1) {
      // 2列目
      rectSorce4[i].push(rectSorce4[i][0]);
      rectSorce4[i].shift();
    } else if (i%3==2) {
      //3列目
      rectSorce4[i].unshift(
        rectSorce4[i][
          rectSorce4[i].length-1]
      );
      rectSorce4[i].pop();
    }
  }
  rectRead(rectSorce4);

// -----------

  htmlTmp.push("右左に1スライド");
  var rectSorce4=
    copyArray(rectSorce);
  
  for (var i=1; i< rectSorce4.length; i=(i+1)|0) {
    if (i%3==0) { 
      continue;
   } else if (i%3==1) {
      // 2列目
      rectSorce4[i].unshift(
        rectSorce4[i][
          rectSorce4[i].length-1]
      );
      rectSorce4[i].pop();
    } else if (i%3==2) {
      //3列目
      rectSorce4[i].push(rectSorce4[i][0]);
      rectSorce4[i].shift();
    }
  }
  rectRead(rectSorce4);
}

// -----------

// 時間がかかるので
if (fixCodeList.length) return;

// -----------
// 3列の場合、右左に変則スライド
// パターン1
if (rectSorce[0].length==3) {
  htmlTmp.push("右左に変則スライド1");
  var rectSorce3=
    copyArray(rectSorce);
  
  var j=0;
  for(var i=3;i<=2+rectSorce3.length;i=(i+1)|0) {
    if (i%4>=2) { 
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
   } else if (i%4<=1) {
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
    }
    /*
    alert(
      "i="+i+"\n"+
      "j="+j+"\n"+
      "i%4="+i%4+"\n"+
      "2+rectSorce3.length="+
      (2+rectSorce3.length)+"\n"+
      rectSorce3[j]);
    */
    j=(j+1)|0;
  }
  rectRead(rectSorce3);
}

// -----------
// 3列の場合、右左に変則スライド
// パターン2
if (rectSorce[0].length==3) {
  htmlTmp.push("右左に変則スライド2");
  var rectSorce3=
    copyArray(rectSorce);
  
  var j=0;
  for(var i=2;i<=1+rectSorce3.length;i=(i+1)|0) {
    if (i%4>=2) { 
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
   } else if (i%4<=1) {
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
    }
    j=(j+1)|0;
  }
  rectRead(rectSorce3);
}

// -----------
// 3列の場合、右左に変則スライド
// パターン3
if (rectSorce[0].length==3) {
  htmlTmp.push("右左に変則スライド3");
  var rectSorce3=
    copyArray(rectSorce);
  
  var j=0;
  for(var i=4;i<=3+rectSorce3.length;i=(i+1)|0) {
    if (i%4>=2) { 
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
   } else if (i%4<=1) {
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
      rectSorce3[j].push(rectSorce3[j][0]);
      rectSorce3[j].shift();
    }
    j=(j+1)|0;
  }
  rectRead(rectSorce3);
}


  
  // -----------
  /*
  var rectSorceJoin="";
  for (var i=0; i<rectSorce.length; i=(i+1)|0) {
    rectSorceJoin+=rectSorce[i].join("");
  }
  var tmpKYL=
    keywordCheck(rectSorceJoin);
    alert(
      "tmpKYL.length="+tmpKYL.length
      +"\ntmpKYL="+tmpKYL
    );
    
  var keySyougouL=keySyougou(TEXT);
  alert(keySyougouL);
  
  if (tmpKYL) {
  htmlTmp.push("横スライド");
  var rectSorce5=
    copyArray(rectSorce);
  
  
  for (var i=1; i< rectSorce4.length; i=(i+1)|0) {
    if (i%3==0) { 
      continue;
    } else if (i%3==1) {
      // 2列目
      rectSorce4[i].unshift(
        rectSorce4[i][
          rectSorce4[i].length-1]
      );
      rectSorce4[i].pop();
    } else if (i%3==2) {
      //3列目
      rectSorce4[i].push(rectSorce4[i][0]);
      rectSorce4[i].shift();
    }
  }
  rectRead(rectSorce4);
  
  }
  */
  //-----
  
  
  
}

// ==================

var html=htmlHeader();
var htmlTmp=[];

TEXT=TEXT.replace(/^\s+|\s+$/g, "");
htmlCode(TEXT);
htmlTmp.push("===============");

var sorce=TEXT;
sorce=sorce.replace(/[ ]+/g, "");
sorce=sorce.replace(/^\n+|\n+$/g, "");

rectReadStart(makeRect(sorce));

html+=htmlTmp.join("<br>\n");



