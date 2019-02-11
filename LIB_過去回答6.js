// LIB_過去回答6
// #LIB

function kakokaitou6() {

htmlTmp.push("<div class='red'>--- kako 6 ---</div>");



/*
// テンプレ
if (
  TEXT.match(/^\w+$/i) && 
  TEXT.length%3==0 && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(テンプレ)</b>");
  var tmp=TEXT.match(/.../g);
  var result=[,,];
  for (var i in tmp) {
    result.push(tmp[i]);
  }
  htmlTmp.push("テンプレ");
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}
*/


// 数字とアルファベットでバイナリ
if (
  TEXT.match(/^\w+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.length >= 10 && 
  TEXT.match(/^[a-z0-9]+$/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字とアルファベットでバイナリ)</b>");
  var tmp=TEXT.match(/./g);
  var result=[];
  var result=tmp.map(v=>{
    v=v.replace(/[a-z]/i,"=");
    v=v.replace(/[0-9]/,"1") ;
    v=v.replace(/[=]/,"0") ;
    return v;
  });
  goBinary(result.join(""));
  htmlTmp.push("==============");
}


// 大文字と小文字でバイナリ
if (
  TEXT.match(/^\w+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.length >= 10 && 
  TEXT.match(/^[a-zA-Z]+$/) && 
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(大文字と小文字でバイナリ)</b>");
  var tmp=TEXT.match(/./g);
  var result=[];
  var result=tmp.map(v=>{
    v=v.replace(/[a-z]/,"0");
    v=v.replace(/[A-Z]/,"1") ;
    return v;
  });
  goBinary(result.join(""));
  htmlTmp.push("==============");
}


// 数字と記号でバイナリ
if (
  TEXT.match(/^\w+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.length >= 10 && 
  TEXT.match(/^[0-9!@#$%^&*()]+$/) && 
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字と記号でバイナリ)</b>");
  var tmp=TEXT.match(/./g);
  var result=[];
  var result=tmp.map(v=>{
    v=v.replace(/[0-9]/,"0");
    v=v.replace(/[!@#$%^&*()]/,"1") ;
    return v;
  });
  goBinary(result.join(""));
  htmlTmp.push("==============");
}




// bcdef. ghijk- a区切りモールス
// ciagbacabiadhahacagcgahbagbgagagdakabgbajbacha 
if (
  TEXT.match(/^[a-k]+$/i) && 
  TEXT.match(/[a]/i) && 
  !TEXT.match(/aa/i) && 
  !TEXT.match(/[b-k]{6}/i) && 
  TEXT.match(/([b-k]{1,5}a){2}[b-k]{1,5}/i) && 
  !TEXT.match(/[b-f]{2}/i) && 
  !TEXT.match(/[g-k]{2}/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(bcdef. ghijk- a区切りモールス)</b>");
  var tmp=TEXT.match(/[b-k]+/g);
  htmlTmp.push(tmp.join(" "));
  var result=tmp.map(v=>{
    v=v.replace(/[b]/ig,".");
    v=v.replace(/[c]/ig,"..") ;
    v=v.replace(/[d]/ig,"...") ;
    v=v.replace(/[e]/ig,"....") ;
    v=v.replace(/[f]/ig,".....") ;
    v=v.replace(/[g]/ig,"-") ;
    v=v.replace(/[h]/ig,"--") ;
    v=v.replace(/[i]/ig,"---") ;
    v=v.replace(/[j]/ig,"----") ;
    v=v.replace(/[k]/ig,"-----") ;
    return v;
  });
  htmlTmp.push(result.join(" "));
  goMorse(result.join(" "));
  htmlTmp.push("==============");
}

// abcde. fghij- k区切りモールス
// bhkfakbkahkcgkgkbkfbfkgakfafkfkfckjkafakiakbgk
if (
  TEXT.match(/^[a-k]+$/i) && 
  TEXT.match(/[k]/i) && 
  !TEXT.match(/kk/i) && 
  !TEXT.match(/[a-j]{6}/i) && 
  TEXT.match(/([a-j]{1,5}k){2}[a-j]{1,5}/i) && 
  !TEXT.match(/[a-e]{2}/i) && 
  !TEXT.match(/[f-j]{2}/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(abcde. fghij- k区切りモールス)</b>");
  var tmp=TEXT.match(/[a-j]+/g);
  htmlTmp.push(tmp.join(" "));
  var result=tmp.map(v=>{
    v=v.replace(/[a]/ig,".");
    v=v.replace(/[b]/ig,"..") ;
    v=v.replace(/[c]/ig,"...") ;
    v=v.replace(/[d]/ig,"....") ;
    v=v.replace(/[e]/ig,".....") ;
    v=v.replace(/[f]/ig,"-") ;
    v=v.replace(/[g]/ig,"--") ;
    v=v.replace(/[h]/ig,"---") ;
    v=v.replace(/[i]/ig,"----") ;
    v=v.replace(/[j]/ig,"-----") ;
    return v;
  });
  htmlTmp.push(result.join(" "));
  goMorse(result.join(" "));
  htmlTmp.push("==============");
}


// 数字と文字でshift区切りモールス
// @#2C3Bd!Ac!1Ba1a!a1AA2A#a2Ab#1Db!b@a1A
if (
  TEXT.match(/^[12345!@#$%abcde]+$/i) && 
  TEXT.match(/[12345]/i) && 
  TEXT.match(/[!@#$%]/i) && 
  TEXT.match(/[abcde]/i) && 
  TEXT.match(/^([12345abcde]*[!@#$%ABCDE]){10,}$/) && 
  TEXT.length>=15 && 
  kouseimoji.length>=5
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字と文字でshift区切りモールス)</b>");
  var tmp=TEXT.match(/[12345abcde]*[!@#$%ABCDE]/g);
  htmlTmp.push(tmp.join(" "));
  var result=tmp.map(v=>{
    v=v.replace(/[aA]/g,".");
    v=v.replace(/[bB]/g,"..") ;
    v=v.replace(/[cC]/g,"...") ;
    v=v.replace(/[dD]/g,"....") ;
    v=v.replace(/[eE]/g,".....") ;
    v=v.replace(/[1!]/g,"-") ;
    v=v.replace(/[2@]/g,"--") ;
    v=v.replace(/[3#]/g,"---") ;
    v=v.replace(/[4$]/g,"----") ;
    v=v.replace(/[5%]/g,"-----") ;
    return v;
  });
  htmlTmp.push(result.join(" "));
  goMorse(result.join(" "));
  htmlTmp.push("==============");
}


// 直線の数 o-=≠# > 01234
// o#oo=o-ooo=oo≠#o=#o≠oo#≠oo≠o==o≠oo=#o-oo≠=oo-o=≠o=≠
if (
  TEXT.match(/^[o\-=≠#\s]+$/i) && 
  TEXT.match(/o/i) && 
  TEXT.match(/-/i) && 
  TEXT.match(/=/i) && 
  TEXT.match(/≠/i) && 
  TEXT.match(/#/i) && 
  TEXT.length>=20 && 
  kouseimoji.length>=5
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b class='alert'>(直線の数 o-=≠# > 01234)</b>");
  var tmp=TEXT.replace(/o/ig,"0").replace(/-/ig,"1").replace(/=/ig,"2").replace(/≠/ig,"3").replace(/#/ig,"4");
  htmlTmp.push(tmp);

  if(tmp.match(/^([0-4]{3}\s*)+$/i)) {
    htmlTmp.push("(base 5)");
    let tmpL=tmp.replace(/\s+/g,"").match(/[0-4]{3}/g);
    htmlTmp.push(tmpL.join(" "));
    let tmpL2=tmpL.map(v=>("0"+parseInt(v,5).toString(10)).slice(-2));
    htmlTmp.push("(base 5 > 10)");
    htmlTmp.push(tmpL2.join(" "));

    htmlTmp.push("(012abc)");
    htmlCode(to012abcString(tmpL2.join(" ")));
    htmlTmp.push("(123abc)");
    htmlCode(to123abcString(tmpL2.join(" ")));
  }

  if(tmp.match(/^([0-4]{2}\s*)+$/i)) {
    htmlTmp.push("(polybius)");
    htmlCode(polybius(tmp.replace(/\s+/g,"")));
  }

  htmlTmp.push("==============");
}




// 8で割り切れる文字数にバイナリを仕込んである
if (
  TEXT.match(/^([\w!@#$%*&^()]{8})+$/i) && 
  TEXT.length>=64 && 
  kouseimoji.length>=6
) {
  // i(#s4f(8a!(al^9!i&#e)67eaa#%ap!Tuu#%Uw8Ao#!Kue!5i#&4nU2Vo%!Oo5q7u%(edAo%o(%8j5hUa%#Za#o2ue&%4IJ*ou%#j)EUuu%(6aP(a!(eUE&0o!#6WBQ9
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(8で割り切れる文字数にバイナリを仕込んである)</b>");
  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  htmlTmp.push("文字と数字(含むsymbol)でバイナリ [a-zA-Z] > 0, [0-9symbol] > 1");
  var tmp=symbol2Num(TEXT);
  htmlTmp.push(tmp.match(/.{8}/g).join(" "));
  var result=tmp.replace(/\d/ig, "1").replace(/\D/ig, "0");
  htmlTmp.push(result.match(/.{8}/g).join(" "));
  htmlCode(result);
  htmlCode("--------");

  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  var result=TEXT.replace(/[a-z\d]/g, "0").replace(/[A-Z!@#$*%^&()]/g, "1");
  htmlTmp.push("LowerとUper(shift)でバイナリ [a-z0-9] > 0, [A-Zsymbol] > 1");
  htmlTmp.push(result.match(/.{8}/g).join(" "));
  htmlCode(result);
  htmlCode("--------");

  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  var tmp=symbol2Num(TEXT);
  var result=tmp.replace(/[aeiou02468]/ig, "0").replace(/[^aeiou02468]/ig, "1");
  htmlTmp.push("symbolを数字にしてから母音と偶数でバイナリ aeiou02468 > 0");
  htmlTmp.push(result.match(/.{8}/g).join(" "));
  htmlCode(result);
  htmlCode("--------");

  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  var tmp=symbol2Num(TEXT);
  var result=tmp.replace(/[aeiou13579]/ig, "a").replace(/[^aeiou13579]/ig, "1").replace(/a/ig, "0");
  htmlTmp.push("symbolを数字にしてから母音と奇数でバイナリ aeiou13579 > 0");
  htmlTmp.push(result.match(/.{8}/g).join(" "));
  htmlCode(result);
  htmlCode("--------");

  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  var tmp=symbol2Num(TEXT);
  var result=tmp.split("").map(v=>abc012(v));
  htmlTmp.push("symbolを数字にしてからabc012して偶数奇数でバイナリ");
  htmlTmp.push(result.join(" "));
  result=result.map(v=>Number(v)%2==0?1:0);
  htmlTmp.push(result.join("").match(/.{8}/g).join(" "));
  htmlCode(result.join(""));
  htmlCode("--------");

  htmlTmp.push(TEXT.match(/.{8}/g).join(" "));
  var tmp=symbol2Num(TEXT);
  var result=tmp.split("").map(v=>abc123(v));
  htmlTmp.push("symbolを数字にしてからabc123して偶数奇数でバイナリ");
  htmlTmp.push(result.join(" "));
  result=result.map(v=>v%2==0?1:0);
  htmlTmp.push(result.join("").match(/.{8}/g).join(" "));
  htmlCode(result.join(""));

  htmlTmp.push("==============");
}



// 3行にわけて上へ下へ段々スライド
var tmp=TEXT.split(/\n/g);
if (
  (TEXT.match(/^\w+$/) && 
  kouseimoji.length>=4 && 
  TEXT.length%3==0 &&
  TEXT.length>=30) ||
  (TEXT.match(/^\w+\n\w+\n\w+$/) && 
  kouseimoji.length>=4 && 
  tmp.length==3 && 
  tmp[0].length==tmp[0].length &&
  tmp[1].length==tmp[2].length &&
  tmp[0].length>=10)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(3行にわけて上へ下へ段々スライド)</b>");
htmlTmp.push(`BACABCACBACABCACB
CBABCABACBABCABAC
ACBCABCBACBCABCBA
BACABCACBACABCACB
CBABCABACBABCABAC
ACBCABCBACBCABCBA
BACABCACBACABCACB`);

  if (!TEXT.match(/\n/)) {
    var tmpRE=new RegExp(".{"+TEXT.length/3+"}", "g");
    tmp=TEXT.match(tmpRE);
  }

  function slideArry(ary,n){

    //debug(ary.join(","));
    //debug(n);

    if (n===0) return ary;
    if(!ary || !n || ary.length<1 || typeof(n)!="number") {
      return false;
    } else {
      if (Math.abs(n)>=100) return false;
    }

    let slide=n%ary.length; //実スライド量
    let newary=[];
    let m=0;

    for(let i=0; i<ary.length; i++) {
      m=(i+slide)%ary.length;
      if(m<0) m=ary.length+m;
      newary[m]=ary[i];
    }
    
    //debug(newary.join(","));

    return newary;
  }

  let tmpR=rectReflect(tmp);
  var result=[];

  //debug(tmpR.join("\n"));

  let pos=0; //position
  for (var i=1; i<=tmpR.length; i++) {
    let j=i%8===0?8:i%8; //振幅8(振幅の中の位置を得る)
    if(j>=1 && j<4) pos=j-1;
    else if(j>=4 && j<8) pos=3-(j-3)-1;
    else if(j==8) pos=-1;
    //debug(`i=${i}, j=${j} , pos=${pos}`);
    result[i-1]=slideArry(tmpR[i-1], pos);
  }
  
  //debug(result.join("\n"));

  let result2=rectReflect(result);
  
  htmlTmp.push(tmp.join("\n"));
  htmlTmp.push("-------");
  htmlTmp.push(result2.map(v=>v.join("")).join("\n"));
  htmlTmp.push("-------");
  htmlCode(result2[0].join(""));
  htmlCode(result2[1].join(""));
  htmlCode(result2[2].join(""));

  htmlTmp.push("-----------------");

  //逆方向へスライド
  result=[];
  pos=0; //position
  for (var i=1; i<=tmpR.length; i++) {
    let j=i%8===0?8:i%8; //振幅8(振幅の中の位置を得る)
    if(j>=1 && j<4) pos=1-j;
    else if(j>=4 && j<8) pos=-3+(j-2);
    else if(j==8) pos=1;
    result[i-1]=slideArry(tmpR[i-1], pos);
  }
  
 let result3=rectReflect(result);
  
  htmlTmp.push(result3.map(v=>v.join("")).join("\n"));
  htmlTmp.push("-------");
  htmlCode(result3[0].join(""));
  htmlCode(result3[1].join(""));
  htmlCode(result3[2].join(""));

  htmlTmp.push("==============");
}


// 奇数偶数でvig & 逆方向vig
if (
  TEXT.match(/^\w+$/i) && 
  TEXT.length%2==0 && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(奇数偶数でvig & 逆方向vig)</b>");
  var tmp=["",""];
  TEXT.replace(/(.)(.)/g, (m,p1,p2)=>{
    tmp[0]+=p1;
    tmp[1]+=p2;
 });
  htmlTmp.push(tmp[0]);
  htmlTmp.push(tmp[1]);
  htmlCode(vigenereDec(tmp[0],tmp[1]), "", `(vig key: ${tmp[1]})`);
  htmlCode(vigenereDec(tmp[0],tmp[1],"reverse"), "", `(vig key: ${tmp[1]})`);

  htmlCode(vigenereDec(tmp[1],tmp[0]), "", `(vig key: ${tmp[0]})`);
  htmlCode(vigenereDec(tmp[1],tmp[0],"reverse"), "", `(vig key: ${tmp[0]})`);
  htmlTmp.push("==============");
}


// a〜d回 数字を二乗してガラケー打ち
// a$d%764801a%d%764801b(c*1c@56b#6c@56a@b#6a*c@56c!6c*1c@56b#6c@56b(c@56d%764801a&
if (
  TEXT.match(/^([abcd][!@#$%^&*(]?\d*)+$/i) && 
  TEXT.length>=10 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(a〜d回 数字を二乗してガラケー打ち)</b>");
  var tmp=TEXT.match(/[abcd][!@#$%^&*(]?\d*/ig);
  htmlTmp.push(tmp.join("\n"));
  if (TEXT.match(/[!@#$%^&*(]/)) {
    htmlTmp.push("-----");
    tmp=tmp.map(v=>symbol2Num(v));
    htmlTmp.push(tmp.join("\n"));
  }
  let mtrx=[
    ["2","a2","2"],
    ["22","b4","2^2"],
    ["222","c16","2^2^2"],
    ["3","a3","3"],
    ["33","b9","3^2"],
    ["333","c81","3^2^2"],
    ["4","a4","4"],
    ["44","b16","4^2"],
    ["444","c256","4^2^2"],
    ["5","a5","5"],
    ["55","b25","5^2"],
    ["555","c625","5^2^2"],
    ["6","a6","6"],
    ["66","b36","6^2"],
    ["666","c1296","6^2^2"],
    ["7","a7","7"],
    ["77","b49","7^2"],
    ["777","c2401","7^2^2"],
    ["7777","d5764801","7^2^2^2"],
    ["8","a8","8"],
    ["88","b64","8^2"],
    ["888","c4096","8^2^2"],
    ["9","a9","9"],
    ["99","b81","9^2"],
    ["999","c6561","9^2^2"],
    ["9999","d43046721","9^2^2^2"]
  ];

  var result=[];
  for (let i in tmp) {
    for (let j in mtrx) {
      let tmpRE=new RegExp(`^${mtrx[j][1]}$`, "i");
      if (tmp[i].match(tmpRE)) result.push(mtrx[j]);
    }
  }
  htmlTmp.push("-----");
  htmlTmp.push(result.map(v=>`${v[1]} > ${v[2]}`).join("\n"));
  htmlTmp.push("-----");
  htmlTmp.push(result.map(v=>v[0]).join(" "));
  let garakeRes=garake(result.map(v=>v[0]).join(" "));
  htmlCode(garakeRes);
  htmlTmp.push("==============");
}



// 二文字でBase26
if (
  TEXT.match(/^([a-z][a-z])+$/i)
  //TEXT.length>=8 && 
  //kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(二文字でBase26)</b>");
  var tmp=TEXT.match(/../g);
  htmlTmp.push(tmp.join(" "));

tmp=tmp.map(v=>[v.toUpperCase().charCodeAt(0)-65,v.toUpperCase().charCodeAt(1)-65]);
  let tmp2=[];
  tmp.forEach(v=>tmp2.push(v[0]+"-"+v[1]));
  htmlTmp.push(tmp2.join(" "));

  tmp=tmp.map(v=>v[0]*26+v[1]);
  htmlTmp.push(tmp.join(" "));
  htmlCode(tmp.join(""));

  htmlTmp.push("==============");
}



// 一つおきにatbash19
if (
  TEXT.match(/^\w+$/i) && 
  TEXT.length>=8 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(偶数文字目をatbash19)</b>");
  var result=TEXT.replace(/(.)(.)?/g, (match, p1, p2)=>p1+(p2?atbash19(p2):""));
  htmlCode(result);
  htmlTmp.push("<b>(奇数文字目をatbash19)</b>");
  var result2=TEXT.replace(/(.)(.)?/g, (match, p1, p2)=>atbash19(p1)+(p2?p2:""));
  htmlCode(result2);
  htmlTmp.push("==============");
}

// 一つおきにatbash09
if (
  TEXT.match(/^\w+$/i) && 
  TEXT.length>=8 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(偶数文字目をatbash09)</b>");
  var result=TEXT.replace(/(.)(.)?/g, (match, p1, p2)=>p1+(p2?atbash09(p2):""));
  htmlCode(result);
  htmlTmp.push("<b>(奇数文字目をatbash09)</b>");
  var result2=TEXT.replace(/(.)(.)?/g, (match, p1, p2)=>atbash09(p1)+(p2?p2:""));
  htmlCode(result2);
  htmlTmp.push("==============");
}


// 数字で分けてSymbolを数字に変換。各行を前行で割り値を得る
if (
  TEXT.match(/^(\d[!@#\$%\^&\*\(\)]*){10,}$/i) && 
  TEXT.match(/\d[!@#\$%\^&\*\(\)]+/i) && 
  kouseimoji.length>=10
) {
  var tmpL=TEXT.match(/\d[!@#\$%\^&\*\(\)]*/g);
  let flag=true;
  for (var i=1; i<tmpL.length; i++) {
    if (tmpL[i-1].length > tmpL[i].length) flag=false;
  }
  if (flag) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(数字で分けてSymbolを数字に変換。各行を前行で割り値を得る)</b>");

    var tmpL2=tmpL.map(v=>{
      htmlTmp.push(v);
      return Number(symbol2Num(v));
    });
  
    tmpL2.forEach(v=>htmlTmp.push(v));
    
    var result=[];
    for (var i=0; i<tmpL2.length; i++) {
      if (i==0) {
        result[i]=tmpL2[i];
        htmlTmp.push(tmpL2[i]);
        continue;
      }
      let ans= Math.round(tmpL2[i]/tmpL2[i-1],0);
      result[i]=ans;
      htmlTmp.push(
        `${ans} = ${tmpL2[i]} / ${tmpL2[i-1]}`
      );
    }

    htmlTmp.push(result.join(" "));
    htmlCode(result.join(""));
    htmlTmp.push("==============");
  }
}



/*
// skip2(format+phrase)
var tmpSkip2=skip(TEXT,5);
debug(tmpSkip2);
var tmpSkip2=skip(TEXT,2);
debug(tmpSkip2);
var tmpRE=new RegExp(String.raw`^([a-z]+)([^a-z]+)$`, "i");
var tmpRE2=new RegExp(String.raw`^([^a-z]+)([a-z]+)$`,"i"); 
if (
  (tmpSkip2.match(tmpRE) || tmpSkip2.match(tmpRE2)) &&
  kouseimoji.length>=4 &&
  TEXT.length>10 
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='skip2(format+phrase)'><b>(skip2(format+phrase))</b></a>");
  
  var tmpNew=[];
  if (tmpSkip2.match(tmpRE)) {
    tmpNew[0]=RegExp.$1;
    tmpNew[1]=RegExp.$2;
  } else if (tmpSkip2.match(tmpRE2)) {
    tmpNew[0]=RegExp.$1;
    tmpNew[1]=RegExp.$2;
  }

  htmlCode(tmpNew[0]);
  htmlCode(tmpNew[1]);
  
  htmlTmp.push("==============");  
}
*/

// 累乗 x^y decASCII(xy)
// 78125-512-10077696-46656-3125-279936-40353607-5764801-4096-64-40353607-117649-16777216-625-40353607-125-64-
// ["nx","n^x"]
var powerMtrx=[
["48","65536"],
["49","262144"],
["50","0"],
["51","5"],
["52","25"],
["53","125"],
["54","625"],
["55","3125"],
["56","15625"],
["57","78125"],
["65","7776"],
["66","46656"],
["67","279936"],
["68","1679616"],
["69","10077696"],
["70","0"],
["71","7"],
["72","49"],
["73","343"],
["74","2401"],
["75","16807"],
["76","117649"],
["77","823543"],
["78","5764801"],
["79","40353607"],
["80","0"],
["81","8"],
["82","64"],
["83","512"],
["84","4096"],
["85","32768"],
["86","262144"],
["87","2097152"],
["88","16777216"],
["89","134217728"],
["90","0"]
];

var tmpL=TEXT.match(/\d+/g);
if(tmpL && tmpL.length>=8) {
  var result=[];
  var maxlen=0;
  for(var i in tmpL){
    var resulttmp=[];
    for(var j in powerMtrx){
      if(tmpL[i]===powerMtrx[j][1]){
       resulttmp.push(powerMtrx[j][0]);
      }
    }
    if(resulttmp.length) {
      result.push(resulttmp);
    }
    if(resulttmp.length >maxlen) {
      maxlen= resulttmp.length;
    }
  }
  if(result.length>=8){
    htmlTmp.push(TEXT);    
    htmlTmp.push("<a name='power'><b>(累乗 x^y decASCII(xy))</b></a>");    
    if(maxlen==1){
      result.forEach(val=>{
        powerMtrx.forEach(val2=>{
          if(val2[0]==val[0]) htmlTmp.push(val2[0][0]+"^"+val2[0][1]+" = "+val2[1]);
        });
      });
      htmlTmp.push(result.join(" "));
      htmlCode(result.join(""));
    }else{
      var resultTmp=[];
      result =result.map(
        val=>val.length==1?val[0]:'['+val.join(',')+']');
      htmlTmp.push(result.join(" "));
      htmlCode(result.join(""));
    }
 }
}





// DecとHexで交互の範囲に納まる
var tmpDec='(4[89]|5[0-7]|6[5-9]|[78][0-9]|90)';
var tmpHex='(3[0-9]|4[1-9a-f]|5[0-9a]|6[1-9a-f]|7[0-9a])';

var tmpRE1=new RegExp(`^(${tmpDec}${tmpHex}){5,}${tmpDec}?$`,"i")
if (TEXT.match(tmpRE1)) {
  htmlTmp.push("<a name='altdechex'><b>(DecとHexで交互の範囲に納まる)</b></a>");
  var tmp=TEXT.match(/../g);
  htmlTmp.push(tmp.join(" "));
  tmp=tmp.map((val,i,ar)=>{
    if(i%2==0) return decASCII(val);
    else return hexASCII(val);
  });
  htmlCode(tmp.join(""));

}
var tmpRE2=new RegExp(`^(${tmpHex}${tmpDec}){5,}${tmpHex}?$`,"i")
if (TEXT.match(tmpRE2)) {
  htmlTmp.push("<a name='althexdec'><b>(HexとDecで交互の範囲に納まる)</b></a>");
  var tmp=TEXT.match(/../g);
  htmlTmp.push(tmp.join(" "));
  tmp=tmp.map((val,i,ar)=>{
    if(i%2==0) return hexASCII(val);
    else return decASCII(val);
  });
  htmlCode(tmp.join(""));
  htmlTmp.push("==============");    
}


// 使用されている文字が月の名前、10種以内でindexからDecASCII
if (
  (TEXT.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i) || atbash(TEXT).match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i) || TEXT.match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i) || atbash(TEXT).match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) && 
  kouseimoji.length>=4
) {
  var tmpL=[];
  if (TEXT.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) tmpL=TEXT.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/ig);
  else if (atbash(TEXT).match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) tmpL=atbash(TEXT).match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/ig);
  else if (TEXT.match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) tmpL=TEXT.match(/an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec/ig);
  else if (atbash(TEXT).match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) tmpL=atbash(TEXT).match(/an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec/ig);


  // 重複を除く
  var tmpL2 = tmpL.filter((x, i, self) => self.indexOf(x) === i);
  tmpL2=tmpL2.map(val=>[val,val.replace(/J?an/i,"01").replace(/F?eb/i,"02").replace(/M?ar/i,"03").replace(/A?pr/i,"04").replace(/M?ay/i,"05").replace(/J?un/i,"06").replace(/J?ul/i,"07").replace(/A?ug/i,"08").replace(/S?ep/i,"09").replace(/O?ct/i,"10").replace(/N?ov/i,"11").replace(/D?ec/i,"12"),]);  
  // ソート
  tmpL2.sort(function(a,b){
    if( Number(a[1]) < Number(b[1]) ) return -1;
    if( Number(a[1]) > Number(b[1]) ) return 1;
    return 0;
  });
  // index追加
  tmpL2=tmpL2.map((val,i)=>[val[0],val[1],i]);  
  
if (tmpL2.length<=10) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<a name='month'><b>(使用されている文字が月の名前、10種以内でindexからDecASCII)</b></a>");
    htmlTmp.push(tmpL.join(" "));
    tmpL=tmpL.map(val=>[val,val.replace(/J?an/i,"01").replace(/F?eb/i,"02").replace(/M?ar/i,"03").replace(/A?pr/i,"04").replace(/M?ay/i,"05").replace(/J?un/i,"06").replace(/J?ul/i,"07").replace(/A?ug/i,"08").replace(/S?ep/i,"09").replace(/O?ct/i,"10").replace(/N?ov/i,"11").replace(/D?ec/i,"12"),]);
    // indexを取得
    for(var i in tmpL){
      for(var j in tmpL2){
        if(tmpL2[j][1]===tmpL[i][1]) {
          tmpL[i][2]=tmpL2[j][2];
          break;
        } 
        else tmpL[i][2]="∎";
      }
    }
    var tmp=tmpL.map(val=>val[2]).join("");

    htmlCode(tmp);
    if(tmp.match(/^((?:..){5})(.*)((?:..){5})$/i)){
      htmlTmp.push("prefix,sufixをdecASCII。kw部はそのまま（kwに細工されてるかも？ s/65-90/A-Z/)");          
      tmp=tmp.replace(/^((?:..){5})(.*)((?:..){5})$/i, (all, g1, g2, g3)=>decASCII(g1)+g2+decASCII(g3));
      htmlCode(tmp);
    }
    
    htmlTmp.push("==============");    
  }
}


// 月の名前3文字
if (
  (TEXT.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i) || atbash(TEXT).match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='month'><b>(すべて3文字の月名)</b></a>");
  
  if(atbash(TEXT).match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) {
    var tmp=atbash(TEXT).match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/ig);
  } else {
    var tmp=TEXT.match(/Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec/ig);
  }
 
  var tmp123=tmp.map(val=>
    val.replace(/Jan/ig,"01").replace(/Feb/ig,"02").replace(/Mar/ig,"03").replace(/Apr/ig,"04").replace(/May/ig,"05").replace(/Jun/ig,"06").replace(/Jul/ig,"07").replace(/Aug/ig,"08").replace(/Sep/ig,"09").replace(/Oct/ig,"10").replace(/Nov/ig,"11").replace(/Dec/ig,"12"));

  htmlTmp.push("(jan>1,feb>2,,,)");    
  htmlTmp.push(tmp123.join(' '));    
  htmlCode(tmp123.join(''));

  var tmp012=tmp.map(val=>
    val.replace(/Jan/ig,"00").replace(/Feb/ig,"01").replace(/Mar/ig,"02").replace(/Apr/ig,"03").replace(/May/ig,"04").replace(/Jun/ig,"05").replace(/Jul/ig,"06").replace(/Aug/ig,"07").replace(/Sep/ig,"08").replace(/Oct/ig,"09").replace(/Nov/ig,"10").replace(/Dec/ig,"11"));

  htmlTmp.push("(jan>0,feb>1,,,)");    
  htmlTmp.push(tmp012.join(' '));    
  htmlCode(tmp012.join(''));
 
  htmlTmp.push("==============");    
}


// 月の名前2文字
if (
  (TEXT.match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i) || atbash(TEXT).match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='month'><b>(すべて2文字の月名)</b></a>");

  if(atbash(TEXT).match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) {
    var tmp=atbash(TEXT).match(/an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec/ig);
  } else {
    var tmp=TEXT.match(/an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec/ig);
  }
 
  var tmp123=tmp.map(val=>
    val.replace(/an/ig,"01").replace(/eb/ig,"02").replace(/ar/ig,"03").replace(/pr/ig,"04").replace(/ay/ig,"05").replace(/un/ig,"06").replace(/ul/ig,"07").replace(/ug/ig,"08").replace(/ep/ig,"09").replace(/ct/ig,"10").replace(/ov/ig,"11").replace(/ec/ig,"12"));

  htmlTmp.push("(jan>1,feb>2,,,)");    
  htmlTmp.push(tmp123.join(' '));    
  htmlCode(tmp123.join(''));

  var tmp012=tmp.map(val=>
    val.replace(/an/ig,"00").replace(/eb/ig,"01").replace(/ar/ig,"02").replace(/pr/ig,"03").replace(/ay/ig,"04").replace(/un/ig,"05").replace(/ul/ig,"06").replace(/ug/ig,"07").replace(/ep/ig,"08").replace(/ct/ig,"09").replace(/ov/ig,"10").replace(/ec/ig,"11"));

  htmlTmp.push("(jan>0,feb>1,,,)");    
  htmlTmp.push(tmp012.join(' '));    
  htmlCode(tmp012.join(''));
 
  htmlTmp.push("==============");    
}

// combine
// 53lfjjdk14wb81ca17wa
var tmpRE=new RegExp(String.raw`^\d{2}(?:[a-z]{2}){3}\d{2}\w*[a-z]{2}\d{2}[a-z]{2}\d{2}[a-z]{2}$`, "i");
if (
  TEXT.match(tmpRE) && 
  TEXT.match(/^\w+$/) && 
  TEXT.match(/[a-z]/i) && 
  TEXT.match(/\d/) && 
  kouseimoji.length>=4 &&
  TEXT.length>10 
) {
  var tmp=[];
  var tmpNew=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("<a name='combine'><b>(combine)</b></a>");
  
  tmp=TEXT.match(/../g);
  htmlTmp.push(tmp.join(" "));
  
  tmp.forEach(function(element) {
    if (element.match(/[a-z]{2}/i)) {
      tmpNew.push(
        to012abc(Number(abc012(element[0]))+Number(abc012(element[1])))
      );
    } else {
      tmpNew.push(Number(element[0])+Number(element[1]));
    }
  }, this);

  htmlCode(tmpNew.join(""));
  
  var tmpRE=new RegExp("^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$", "i");
  var tmpRE2=new RegExp("^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$", "i");
  if (tmpNew.join("").match(tmpRE)) {
    htmlTmp.push("分割されていたので key: separate");    
    htmlCode(RegExp.$1+"separate"+RegExp.$2);
  } else if (tmpNew.join("").match(tmpRE2)) {
    htmlTmp.push("分割されていたので key: separate");    
    htmlCode(RegExp.$1+"separate"+RegExp.$2);    
  }
  htmlTmp.push("==============");  
}


// 3列 縦に+,-,+スライド
if (
  TEXT.match(/^\w+$/) && 
  TEXT.length%3==0 &&
  kouseimoji.length>=4 &&
  TEXT.length<40
) {
  var tmp=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("--------------");
  
  var tmpRE=new RegExp(".{3}", "g");
  tmp=TEXT.match(tmpRE);
  htmlTmp.push(tmp.join("\n"));
  
  for (var i=1; i<TEXT.length/3; i++) {
    htmlTmp.push("<b>(3列 縦に+"+i+",-"+i+",+"+i+"スライド)</b>");
    var tmpNew=rectSlide(tmp.join("\n"),"y","+"+i+",-"+i+",+"+i);
    htmlTmp.push(tmpNew);
    htmlCode(tmpNew.split(/\n/g).join(""));
    htmlTmp.push("--------------");

    htmlTmp.push("<b>(3列 縦に-"+i+",+"+i+",-"+i+"スライド)</b>");
    var tmpNew=rectSlide(tmp.join("\n"),"y","-"+i+",+"+i+",-"+i);
    htmlTmp.push(tmpNew);
    htmlCode(tmpNew.split(/\n/g).join(""));
    htmlTmp.push("--------------");

  }
  htmlTmp.push("==============");  
}

// 3行 横に+,-,+スライド
if (
  TEXT.match(/^\w+$/) && 
  TEXT.length%3==0 &&
  kouseimoji.length>=4 &&
  TEXT.length<40
) {
  var tmp=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("--------------");
  
  var tmpRE=new RegExp(".{"+TEXT.length/3+"}", "g");
  tmp=TEXT.match(tmpRE);
  htmlTmp.push(tmp.join("\n"));
  
  for (var i=1; i<TEXT.length/3; i++) {
    htmlTmp.push("<b>(3行 横に+"+i+",-"+i+",+"+i+"スライド)</b>");
    var tmpNew=rectSlide(tmp.join("\n"),"x","+"+i+",-"+i+",+"+i);
    htmlTmp.push(tmpNew);
    htmlCode(tmpNew.split(/\n/g).join(""));
    htmlTmp.push("--------------");

    htmlTmp.push("<b>(3行 横に-"+i+",+"+i+",-"+i+"スライド)</b>");
    var tmpNew=rectSlide(tmp.join("\n"),"x","-"+i+",+"+i+",-"+i);
    htmlTmp.push(tmpNew);
    htmlCode(tmpNew.split(/\n/g).join(""));
    htmlTmp.push("--------------");

  }
  
  htmlTmp.push("==============");  
}



// 3行 横にnスライド
if (
  TEXT.match(/^\w+$/) && 
  TEXT.length%3==0 &&
  kouseimoji.length>=4 &&
  TEXT.length<30
) {
  var tmp=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(3行 & 横にnスライド)</b>");

  var tmpRE=new RegExp(".{"+TEXT.length/3+"}", "g");
  tmp=TEXT.match(tmpRE);

  htmlTmp.push(tmp.join("\n"));
  htmlTmp.push("-----");

  for (var i=1; i<tmp[0].length; i++) {
    htmlTmp.push("("+i+"スライド)");
    var tmpRE2=new RegExp("(.)(.*)");
    for (var j=0; j<=2; j++) {
     tmp[j]=tmp[j].replace(tmpRE2, "$2$1");
    }
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("-----");
    //rectRead(tmp.join("\n"));
    htmlCode(tmp.join(""));
    htmlTmp.push("======");
  }
  htmlTmp.push("==============");

}



// 3行 & 中央分割左右入れ替え
if (
  TEXT.match(/^\w+$/) && 
  TEXT.length%6==0 &&
  kouseimoji.length>=3
) {
    var tmp=[];
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(3行 & 中央分割左右入れ替え)</b>");
    var tmpRE=new RegExp(".{"+ TEXT.length/3+"}", "g");
    tmp=TEXT.match(tmpRE);
    var n=TEXT.length/6;
    var tmpRE2=
      new RegExp("(.{"+n+"})(.{"+n+"})");
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("-----");
    for (var i in tmp) {
      tmp[i]=tmp[i].replace(tmpRE2, "$2$1");
    }
    htmlTmp.push(tmp.join("\n"));
    htmlTmp.push("-----");
    //rectRead(tmp.join("\n"));
    htmlCode(strReverse(tmp.join("")));
    htmlTmp.push("==============");

}


// 3行にわけて奇数偶数をそれぞれ上へ下へ
if (TEXT.match(/^\w+$/) && 
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
  htmlTmp.push("----");
  htmlCode(result2.join("\n"));
  htmlTmp.push("-----------------");
  htmlCode(result.join(""));
  htmlCode(result2.join(""));
  htmlTmp.push("==============");
  
}




// 半分で前後入れ替えて連結&ペアで前後入れ替え
if (TEXT.match(/^\w+$/) && 
  TEXT.length%2==0 && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(半分で前後入れ替えて連結&ペアで前後入れ替え)</b>");
  var tmpRE=new RegExp(".{"+TEXT.length/2+"}", "g");
  var tmps=TEXT.match(tmpRE);
  var tmp=tmps[1]+tmps[0];
  htmlTmp.push(tmps[1]+" "+tmps[0]);
  var tmps=tmp.match(/../g);
  for (var i in tmps) {
    tmps[i]=tmps[i].replace(/(.)(.)/g, "$2$1");
  }
  htmlTmp.push(tmps.join(" "));
  htmlCode(tmps.join(""));
  htmlTmp.push("==============");
}


// 半分で2段に分けて上下読み出し
// 7777755555
if (TEXT.match(/^\w+$/) && 
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


// RLE☓RLE
if (
  (
    TEXT.match(/^([2-9]?[b-g]){4,}$/i) || 
    TEXT.match(/^([2-9]?[!@#$%^]){4,}$/) || 
    TEXT.match(/^(((viiii|9)|(iiii|4)|(viii|8)|(iii|3)|(vii|7)|(ii|2)|(vi|6)|(iv|4)|(v|5))?[b-g]){4,}$/i)
  ) && 
  kouseimoji.length>=3
) {
  var tmp=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(RLE ☓ RLE)</b>");

  var tmp="";
  var newText=TEXT;
  var k=1;
  if (newText.match(/^([2-9]?[!@#$%^]){4,}$/)) {
    newText=newText.replace(/!/g, "b");
    newText=newText.replace(/@/g, "c");
    newText=newText.replace(/#/g, "d");
    newText=newText.replace(/\$/g, "e");
    newText=newText.replace(/%/g, "f");
    newText=newText.replace(/\^/g, "g");
    htmlTmp.push("Symbolを012abc");
    htmlTmp.push(newText);
    
  } else if (newText.match(/^(((viiii|9)|(iiii|4)|(viii|8)|(iii|3)|(vii|7)|(ii|2)|(vi|6)|(iv|4)|(v|5))?[b-g]){4,}$/i)) {
    newText=newText.replace(/viiii/ig, "9");
    newText=newText.replace(/iiii/ig, "4");
    newText=newText.replace(/viii/ig, "8");
    newText=newText.replace(/iii/ig, "3");
    newText=newText.replace(/vii/ig, "7");
    newText=newText.replace(/ii/ig, "2");
    newText=newText.replace(/vi/ig, "6");
    newText=newText.replace(/iv/ig, "4");
    newText=newText.replace(/v/ig, "5");
    htmlTmp.push("ローマ数字をアラビア数字へ");
    htmlTmp.push(newText);
  }

  
  for (var i=0; i<newText.length; i++) {
    if (newText[i].match(/\d/)) {
      k=Number(newText[i]);
    } else {
      for (var j=1; j<=k; j++) {
        tmp+=newText[i];
      }
      if (k>1) k=1;
    }
  }

  htmlTmp.push(tmp);
  tmp=tmp.replace(/b/ig, "1").replace(/c/ig, "2").replace(/d/ig, "3").replace(/e/ig, "4").replace(/f/ig, "5").replace(/g/ig, "6");
  
  runLength(tmp);
  htmlTmp.push("==============");

}

// 数字からモールスRLE
if (
  TEXT.match(/^(0?[1-6]{1,5}\D){3,}0?[1-5]{1,6}$/) && 
  kouseimoji.length>=3
) {
  var tmp=[];
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(数字からモールスRLE)</b>");
  tmp=TEXT.split(/\D/g);
  htmlTmp.push(tmp);
  for (var i in tmp) {
    var tmp3="";
    for (var j=0; j<tmp[i].length; j++) {
      if (j%2==0) {
        for (var k=1;k<=Number(tmp[i][j]);k++){
          tmp3+=".";
        }
      } else {
        for (var k=1;k<=Number(tmp[i][j]);k++){
          tmp3+="-";
        }
      }
    }
    tmp[i]=tmp3;
  }
  htmlTmp.push(tmp.join(" "));
  goMorse(tmp.join(" "));
  htmlTmp.push("==============");

}


// prifix, suffixを反転(旧フォーマット)
if (
  TEXT.match(/^[a-z0-9]+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.match(/^[2-9][a-hjkm-z]{3}[2-9]\w+[a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z]$/i)
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(prifix, suffixを反転[旧フォーマット])</b>");
  var tmp=TEXT.match(/^([2-9][a-hjkm-z]{3}[2-9])(\w+)([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$/i);
  var result=[];
  for (var i=1;i<=3;i++) {
    if (i%2!=0) {
      result.push(strReverse(tmp[i]));
    } else {
      result.push(tmp[i]);
    }
  }
  htmlCode(result.join(""));
  htmlTmp.push("==============");
}


// 大文字／小文字／記号、でモールス
if (
  !TEXT.match(/[a-z]{6,}/) && 
  !TEXT.match(/[A-Z]{6,}/) && 
  !TEXT.match(/[!@#$%^&*()]{6,}/) && 
  TEXT.match(/[a-z]/) && 
  TEXT.match(/[A-Z]/) && 
  TEXT.match(/[!@#$%^&*()]/) && 
  kouseimoji.length>=3
) {
  var tmp="";
  if (TEXT.match(/^(([a-z]{1,6})[!@#$%^&*()])+[a-z]{1,6}$/i)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(大文字／小文字／記号区切り、でモールス)</b>");
    tmp=TEXT.replace(/[!@#$%^&*()]/g, " ");
    tmp=tmp.replace(/[a-z]/g, "-");
    tmp=tmp.replace(/[A-Z]/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  } else if (TEXT.match(/^(([A-Z!@#$%^&*()]{1,6})[a-z])+[A-Z!@#$%^&*()]{1,6}$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(大文字／記号／小文字区切り、でモールス)</b>");
    tmp=TEXT.replace(/[a-z]/g, " ");
    tmp=tmp.replace(/[!@#$%^&*()]/g, "-");
    tmp=tmp.replace(/[A-Z]/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  } else if (TEXT.match(/^(([a-z!@#$%^&*()]{1,6})[A-Z])+[a-z!@#$%^&*()]{1,6}$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(記号／小文字／大文字区切り、でモールス)</b>");
    tmp=TEXT.replace(/[A-Z]/g, " ");
    tmp=tmp.replace(/[a-z]/g, "-");
    tmp=tmp.replace(/[!@#$%^&*()]/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  }
}


// 大文字／小文字／数字、でモールス
if (
  !TEXT.match(/[a-z]{6,}/) && 
  !TEXT.match(/[A-Z]{6,}/) && 
  !TEXT.match(/\d{6,}/) && 
  TEXT.match(/[a-z]/) && 
  TEXT.match(/[A-Z]/) && 
  TEXT.match(/\d/) && 
  kouseimoji.length>=3
) {
  var tmp="";
  if (TEXT.match(/^(([a-z]{1,6})\d)+[a-z]{1,6}$/i)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(大文字／小文字／数字区切り、でモールス)</b>");
    tmp=TEXT.replace(/\d/g, " ");
    tmp=tmp.replace(/[a-z]/g, "-");
    tmp=tmp.replace(/[A-Z]/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  } else if (TEXT.match(/^(([A-Z\d]{1,6})[a-z])+[A-Z\d]{1,6}$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(大文字／数字／小文字区切り、でモールス)</b>");
    tmp=TEXT.replace(/[a-z]/g, " ");
    tmp=tmp.replace(/\d/g, "-");
    tmp=tmp.replace(/[A-Z]/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  } else if (TEXT.match(/^(([a-z\d]{1,6})[A-Z])+[a-z\d]{1,6}$/)) {
    htmlTmp.push(TEXT);
    htmlTmp.push("<b>(数字／小文字／大文字区切り、でモールス)</b>");
    tmp=TEXT.replace(/[A-Z]/g, " ");
    tmp=tmp.replace(/[a-z]/g, "-");
    tmp=tmp.replace(/\d/g, ".");
    htmlTmp.push(tmp);
    goMorse(tmp);
    htmlTmp.push("==============");
  }
}


// 短符のみモールスからpolybius
// (長符のみは----が無いので出来ない)
if (
  TEXT.match(/^[eish5]+$/i) && 
  kouseimoji.length>=3 && 
  TEXT.length%2==0 &&
  TEXT.length>8
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(短符のみモールスからpolybius)</b>");
  var tmp=morseExchange(TEXT);
  var tmpL=tmp.split(/\s/g);
  var result=[];
  for (var i in tmpL) {
    result.push(tmpL[i].length);
  }
  htmlCode(result.join(""));
  htmlTmp.push("<b>(polybius)</b>");
  htmlCode(polybius(result.join("")));
htmlTmp.push("==============");
}


// 反転×3
if (
  TEXT.match(/^([2-9]{2})([a-hjkm-z50]{3})(...)(...)([a-hjkm-z50]{2})([2-9]{3})$/i) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(反転×3)</b>");
  var tmp=RegExp.$2+RegExp.$1+RegExp.$4+RegExp.$3+RegExp.$6+RegExp.$5;
  htmlCode(tmp);
  htmlTmp.push("==============");
}

// 反転×3
if (
  TEXT.match(/^([2-9]{2})([a-hjkm-z50]{3})(...)(..)([a-hjkm-z50]{2})([2-9]{3})$/i) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(反転×3)</b>");
  var tmp=RegExp.$2+RegExp.$1+RegExp.$4+RegExp.$3+RegExp.$6+RegExp.$5;
  htmlCode(tmp);
  
  var tmp=polybius(result.join(""));
  htmlTmp.push(tmp);
  htmlCode(tmp);
  htmlTmp.push("==============");
}

// 反転×3
if (
  TEXT.match(/^([2-9]{2})([a-hjkm-z50]{3})(..)(...)([a-hjkm-z50]{2})([2-9]{3})$/i) && 
  kouseimoji.length>=4
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(反転×3)</b>");
  var tmp=RegExp.$2+RegExp.$1+RegExp.$4+RegExp.$3+RegExp.$6+RegExp.$5;
  htmlCode(tmp);
  htmlTmp.push("==============");
}

// elint→intel
// 58ruaelintxg825
if (
  TEXT.match(/^([2-9]{2})([a-hjkm-z50]{3})(el)(int)([a-hjkm-z50]{2})([2-9]{3})$/i) && 
  kouseimoji.length>=6
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(elint→intel)</b>");
  var tmp=RegExp.$2+RegExp.$1+RegExp.$4+RegExp.$3+RegExp.$6+RegExp.$5;
  htmlCode(tmp);
  htmlTmp.push("==============");
}



// 交互に足し引き 結果保持
if (
  TEXT.match(/^(([1-9][0-9][0-9]|[1-9][0-9]|[1-9])[\s.,|\/\\\-]){3,}([1-9][0-9][0-9]|[1-9][0-9]|[1-9])$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(交互に足し引き 結果保持)</b>");
  var tmp=TEXT.match(/\d+/g);
  var resultPlus=[];
  var resultPlusTmp="";
  var resultMinus=[];
  var resultMinusTmp="";
  var currentValuePlus=0;
  var currentValueMinus=0;
  for (var i in tmp) {
    if (i==0) {
      resultPlusTmp+=tmp[i];
      resultMinusTmp+=tmp[i];
      currentValuePlus=Number(tmp[i]);
      currentValueMinus=Number(tmp[i]);
      resultPlus.push(currentValuePlus);
      resultMinus.push(currentValueMinus);
      continue;
    }
    if (i%2==1) {
      currentValuePlus=currentValuePlus+Number(tmp[i]);
      resultPlus.push(currentValuePlus);
      resultPlusTmp+=" +"+tmp[i];
      currentValueMinus=currentValueMinus-Number(tmp[i]);
      resultMinus.push(currentValueMinus);
      resultMinusTmp+=" -"+tmp[i];
    } else {
      currentValuePlus=currentValuePlus-Number(tmp[i]);
      resultPlus.push(currentValuePlus);
      resultPlusTmp+=" -"+tmp[i];
      currentValueMinus=currentValueMinus+Number(tmp[i]);
      resultMinus.push(currentValueMinus);
      resultMinusTmp+=" +"+tmp[i];
    }
  }
  htmlTmp.push(resultPlusTmp);
  htmlTmp.push(resultPlus.join(" "));
  htmlCode(decASCII(resultPlus.join(" ")));
  htmlCode(resultPlus.join(""));
  htmlTmp.push("--------");
  htmlTmp.push(resultMinusTmp);
  htmlTmp.push(resultMinus.join(" "));  
  htmlCode(decASCII(resultMinus.join(" ")));
  htmlCode(resultMinus.join(""));  
  htmlTmp.push("==============");
}


// 交互に足し引き
if (
  TEXT.match(/^(([1-9][0-9][0-9]|[1-9][0-9]|[1-9])[\s.,|\/\\\-]){3,}([1-9][0-9][0-9]|[1-9][0-9]|[1-9])$/i) && 
  kouseimoji.length>=3
) {
  htmlTmp.push(TEXT);
  htmlTmp.push("<b>(交互に足し引き)</b>");
  var tmp=TEXT.match(/\d+/g);
  var resultPlus=[];
  var resultPlusTmp="";
  var resultMinus=[];
  var resultMinusTmp="";
  var minusOver=false;
  for (var i in tmp) {
    if (i==0) {
      resultPlusTmp+=tmp[i];
      resultMinusTmp+=tmp[i];
      continue;
    }
    if (i%2==1) {
      resultPlus.push(Number(tmp[i-1])+Number(tmp[i]));
      resultPlusTmp+=" +"+tmp[i];
      resultMinus.push(Number(tmp[i-1])-Number(tmp[i]));
      resultMinusTmp+=" -"+tmp[i];
    } else {
      resultPlus.push(Number(tmp[i-1])-Number(tmp[i]));
      resultPlusTmp+=" -"+tmp[i];
      resultMinus.push(Number(tmp[i-1])+Number(tmp[i]));
      resultMinusTmp+=" +"+tmp[i];
    }
  }
  htmlTmp.push(resultPlusTmp);
  htmlTmp.push(resultPlus.join(" "));
  htmlCode(resultPlus.join(""));
  htmlTmp.push("--------");
  htmlTmp.push(resultMinusTmp);
  htmlTmp.push(resultMinus.join(" "));  
  htmlCode(resultMinus.join(""));  
  htmlTmp.push("==============");
}



// pigpen (freemason)
// https://en.wikipedia.org/wiki/Pigpen_cipher
if (
  TEXT.match(/^(([JULƆOC7nΓ]|[<^>Vv])\.?){4,}$/) && 
  kouseimoji.length>=4
) {

  function pigpen(str) {
    if (!str.match(/^([JULƆOC7nΓ]|[<^>Vv])\.?$/)) return null;
    var map={
    	"J":"a",
    	"U":"b",
    	"L":"c",
    	"Ɔ":"d",
    	"O":"e",
    	"C":"f",
    	"7":"g",
    	"n":"h",
    	"Γ":"i",
    	"J.":"j",
    	"U.":"k",
    	"L.":"l",
    	"Ɔ.":"m",
    	"O.":"n",
    	"C.":"o",
    	"7.":"p",
    	"n.":"q",
    	"Γ.":"r",
    	"v":"s",
    	"V":"s",
    	">":"t",
    	"<":"u",
    	"^":"v",
    	"v.":"w",
    	"V.":"w",
    	">.":"x",
    	"<.":"y",
    	"^.":"z"
    };
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

    var tmpRE=new RegExp("^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$", "i");
    var tmpRE2=new RegExp("^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$", "i");
    if (result.join("").match(tmpRE)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);
    } else if (result.join("").match(tmpRE2)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);    
    } else if (!checkPasscode(result.join("")).match(/^fix$/i)) {
      htmlTmp.push("並べ替えたので key: ordered かも");    
    }
  
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

    var tmpRE=new RegExp("^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$", "i");
    var tmpRE2=new RegExp("^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$", "i");
    if (result.join("").match(tmpRE)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);
    } else if (result.join("").match(tmpRE2)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);    
    } else if (!checkPasscode(result.join("")).match(/^fix$/i)) {
      htmlTmp.push("並べ替えたので key: ordered かも");    
    }
  
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

    var tmpRE=new RegExp("^([2-9][a-hjkm-z]{3}[2-9])([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$", "i");
    var tmpRE2=new RegExp("^([a-hjkm-z]{3}[2-9]{2})([2-9]{3}[a-hjkm-z]{2})$", "i");
    if (result.join("").match(tmpRE)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);
    } else if (result.join("").match(tmpRE2)) {
      htmlTmp.push("並べ替えたので key: ordered");    
      htmlCode(RegExp.$1+"ordered"+RegExp.$2);    
    } else if (!checkPasscode(result.join("")).match(/^fix$/i)) {
      htmlTmp.push("並べ替えたので key: ordered かも");    
    }
  
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


} // end function
