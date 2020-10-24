
// Lib_decode_basic
// #LIB


// テキストアナライズ
function analyzeText(str) {
  if (!str) return false;
  var result=[];
  var chrs=str.split("");
  var tmp={};
  for (var i in chrs) {
    if (tmp[chrs[i]]) {
      tmp[chrs[i]]++;
    } else {
      tmp[chrs[i]]=1;
      kouseimoji.push(chrs[i]);
    }
  }

  var n=str.length;
  var m=Object.keys(tmp).length;
  var prime="";
  if (isPrime(n)) {
    prime+=" <span class='alert'>";
    prime+="[素数]</span>";
  } else {
    if (n%2==0) {
    prime+=" <span>";
    prime+="[偶数]</span> ";
    } else if (n%2==1) {
    prime+=" <span>";
    prime+="[奇数]</span> ";
    }
    prime+=printPrimeStr(n);
  }
  result.push("Length: "+n+prime);
  result.push("different chars: "+m);
  result.push("-----------------");

  result.push("<!--fixCodeList-->");

  result.push("-----------------");
  var wL="";
  for (var i=1; i<=n-10; i++) { wL+="." }
  if (wL.length>0) {
    var strw="#xxx#"+wL+"x#x#x";
    strw+=" "+wL.length+"char";
    result.push(strw);
  }
  var wL2="";
  for (var i=1; i<=n-8; i++) { wL2+="." }
  if (wL2.length>0) {
    var strw=wL2+"#xx##xx#";
    strw+=" "+wL2.length+"char";
    result.push(strw);
  }
  var wL3="";
  for (var i=1; i<=n-10; i++) { wL3+="." }
  if (wL3.length>0) {
    var strw="xxxxxxxx#"+wL3+"#";
    strw+=" "+wL3.length+"char";
    result.push(strw);
  }
  var wL4="";
  for (var i=1; i<=n-10; i++) { wL4+="." }
  if (wL4.length>0) {
    var strw="xxx##"+wL4+"###xx";
    strw+=" "+wL4.length+"char";
    result.push(strw);
  }
  var wL5="";
  for (var i=1; i<=n-8; i++) { wL5+="." }
  if (wL5.length>0) {
    var strw="a#a#"+wL5+"a#aa";
    strw+=" "+wL5.length+"char";
    result.push(strw);
  }
  result.push("-----------------");
  var charlist=Object.keys(tmp);
  charlist.sort(arraySortNumber);

  var resulttmp="<table border=1 cellspacing=0 cellpadding=0>";
  resulttmp+="<tr><td>chr</td>";
  resulttmp+="<td>cnt</td>";
  resulttmp+="<td>idx</td>";
  resulttmp+="<td>dec</td>";
  resulttmp+="<td>hex</td>";
  resulttmp+="<td>oct</td>";
  resulttmp+="<td>bin</td>";
  resulttmp+="<td>morse</td></tr>";

  var attentionMarkStr="";
  var attentionMarkFlag=0;

  for (var i in charlist) {
    resulttmp+="<tr class='";
    if (
      charlist[i].charCodeAt().toString(10) >126 || charlist[i].charCodeAt().toString(10) <32
    ) {
      attentionMarkFlag=1;
      resulttmp+="attention";
    }
    resulttmp+="'>";
    resulttmp+="<td>";
    resulttmp+=charlist[i];
    resulttmp+="</td><td>";
    resulttmp+=tmp[charlist[i]];
    resulttmp+="</td><td>";
    if (charlist[i].match(/[a-z]/i)) {
      resulttmp+=letter2Num(charlist[i]);
    } else {
      resulttmp+="&nbsp;";
    }
    resulttmp+="</td><td>";
    resulttmp+=("000"+charlist[i].charCodeAt(
      ).toString(10)).slice(-3);
    resulttmp+="</td><td>";
    resulttmp+=("00"+charlist[i].charCodeAt(
      ).toString(16)).slice(-2);
    resulttmp+="</td><td>";
    resulttmp+=("000"+charlist[i].charCodeAt(
      ).toString(8)).slice(-3);
    resulttmp+="</td><td>";
    resulttmp+=("00000000"+charlist[i].charCodeAt(
      ).toString(2)).slice(-8);
    resulttmp+="</td><td>";
    resulttmp+=morseExchange(
      charlist[i]);
    resulttmp+="</td></tr>";
  }
  resulttmp+="</table>";

  if (attentionMarkFlag) {
    for (var i in str) {
      if (
       str[i].charCodeAt().toString(10)<32
        ||
       str[i].charCodeAt().toString(10)>126
       ) {
         attentionMarkStr+=
           "<span class='attention' style='padding: 0px 2px 0px 2px; border: 1px solid red'>";
         attentionMarkStr+=str[i];
         attentionMarkStr+="</span>";
       } else {
         attentionMarkStr+=str[i];
       }
    }
    result.push(attentionMarkStr);
  }
  result.push(resulttmp);

  // ヒストグラム
  function histogram(start, count) {
    for (var i=0; i<count; i++) {
      var tmpchar=
        String.fromCharCode(start+i);
      var tmpstr=tmpchar+": ";
      for (
        var j=0;
        j<Number(tmp[tmpchar]);
        j++
      ) {
        tmpstr+="+";
      }
      result.push(tmpstr);
    }
  }
  histogram(48, 10);
  histogram(65, 26);
  histogram(97, 26);
  result.push("===========");

  function histogram2() {
    for (var i=0; i<26; i++) {
      var tmpchar=
        String.fromCharCode(65+i);
      var tmpstr=tmpchar+": ";
      for (
        var j=0;
        j<=Number(tmp[tmpchar]);
        j++
      ) {
        tmpstr+="+";
      }
      var tmpchar=
        String.fromCharCode(65+32+i);
      for (
        var j=0;
        j<=Number(tmp[tmpchar]);
        j++
      ) {
        tmpstr+="+";
      }
      result.push(tmpstr);
    }
  }
  histogram2();

  result.push("DEC: 48-57(0-9), 65-90(A-Z), 97-122(a-z)");
  result.push("OCT: 60-71(0-9), 101-132(A-Z), 141-172(a-z)");
  result.push("HEX: 30-39(0-9), 41-5a(A-Z), 61-7a(a-z)");
  result.push("ローマ数字: 50→L, 100→C, 500→D, 1000→M");
  result.push("ローマ数字はゼロを表せない。(代わりの何かがあるかも)");
  result.push("ローマ数字はゼロを表せない。(123toAZ)");
  result.push("3 →octが3桁");
  result.push("3 →morse");
  result.push("visiblity:none →morse");
  result.push("5 →morse数字");
  result.push("5 →5bitで数字　(0〜31 → 00000~11111)");
  result.push("[a-z2-7=] %8 base32");
  result.push("[0-9a-v=] %8 base32hex");
  result.push("大文字小文字数字の6文字 →goo.gl/短縮url");
  result.push("数字10文字 →国際標準図書番号 ISBN-10 amazon検索");
  result.push("978か979で始まる数字13文字 →国際標準図書番号 ISBN-13 amazon検索");
  result.push("数字8文字 → <a href='https://portal.issn.org'> ISSN 国際標準逐次刊行物番号</a>");
  result.push("大文字小文字数字-_の11文字 →youtu.be/videoid (12文字以上は無視される)");
  result.push("大文字小文字数字-_の22文字 →youtu.be/channelid (23文字以上は無視される)");
  result.push("数字なし大文字小文字どちらかでRotやRectでフォーマットが出てこないならvigenereの可能性");
  result.push("ドットが区切る位置のヒント(rect)");
  result.push("ドットでrectの文字数を調整してあることもある");
  result.push("フォーマット通りならキーワード置換やモールスswap、atbash、rotをチェックを試す(atbashとrot±13ならkwの意味bash、rot+1ならkwの1つ先の意味を探す");
  result.push("ほぼほぼフォーマットならモールス+leetを試す");
  result.push("Base64 daily 5文字目MNO、1文字目 A-Z QRSTUVW、a-z YZabcde");
  result.push("Base64 旧daily 1文字目MNO");
  result.push("Base64 3文字を4文字で表現 [A-Za-z0-9+/]");
  result.push("Base32 5文字を8文字で表現 [A-Z2-7]");
  result.push("Base32hex 5文字を8文字で表現 [0-9A-V]");
  result.push("kw無し > destroy, separateなど、altタグならimageの内容やfile名、gryphは見当たらないか？");
  result.push("kw無し > aタグなら Link");
  result.push("kw空白 > space");
  result.push("kw 空白(nothing) atbash > all");
  result.push("kw無し > \\ならescape");
  result.push("kw xxx > answer");
  result.push("繰り返し > repeat, again, recursion, iteration, self, togetherなど");
  result.push("引き算 less、引き算 lose、足し算 gain、足し引き signs");
  result.push("置換え transpose transposition");
  result.push("反転 mirror ");
  result.push("kwが単一文字 > グリフ");
  result.push("kwが単一文字 > 読み換え c→seeとか");
  result.push("kw検索 and, saying, (ことわざ quotes|phrase)(慣用句 idiom) (歌詞 lyrics) (反対語 Antonyms|opposite) (類義語 synonyms|thesaurus) (数字は適当なところで別けた方がいい「2001 006b」のように)");
  result.push("kw部分の6はvi, verum, inveniri");
  result.push("0=o=q, 1=i, 5=s");
  result.push("フォーマットにiとLは使われない(daily, JoJo, vi, 長持ち, で確認済み");
  result.push("0,1はdailyでは使われない。jojo, viは使う");
  result.push("並び替え→ordered");
  result.push("0がない数字のみ。123が多い。→ガラケー");
  result.push("<a href='googlechrome://niantic.schlarp.com/investigation:apps:ingress:events'>[EVENTS]</a>2013 Freemisty, 2013 IngressDays, 2013 TimeZero, 2013 SaveKlue, 2013 Voynich, 2013 Minotaur, 2013 Cassandra, 2013 13magnus, 2014 Recursion, 2014 Interitus, 2014 IngressIO, 2014 Helios, 2014 Darsana, 2015 Shōnin, 2015 Persepolis, 2015 Abaddon, 2016 Obsidian, 2016 Aegis Nova, 2016 Via Lux, 2016 Via Noir, 2017 exogenous");
  result.push("(よくあるLeet) 0o, 1iL, 2Z, 3E, 4A, 5vS, 6Gb, 7TL, 8B, 9gq, 10x, 100c, 500d, 1000m");
  result.push("(数字のみペアになる) 0, 8, 9が多い→ atbashで012が多い→ 012abc");
  result.push("使われている文字が8種類で文字数が偶数→semaphore");
  result.push("5bit→baconian, baudot code, 5行AA, 000を足して0~31→123toAZ");
  result.push("6bit→braille");
  result.push("7bit→7セグ");
  result.push("8bit→ASCII");
  result.push("reverseで意味を成すkw evil<>live");
  result.push("構成文字が同じkw elint<>intel");
  result.push("<a href='https://www.geocachingtoolbox.com/index.php?lang=en&page=baseConversion' target='_blank'>基底(base)変換</a>");
  result.push("kw ^ more war die grow atack");
  result.push("Rot+1 単数→複数形> portals, shapers, symbols, glyphs (単数なし sirens");
  result.push("30〜166.15までの数字なら、正多角形の内角。正n角形の内角は180×(n-2)÷nで求められる。172〜177の範囲なら正n角形でASCIIかも。");

  var alertMsg=[];
  if (str.match(
    /&amp;/i)) {
    alertMsg.push(
      "&ａｍｐ; が含まれている → & に直そう");
  }
  if (str.match(
    /^((\w){1,5}([^\1]){,5}\s?)+$/i)) {
    alertMsg.push(
      "構成文字が2種類連続5のみ。モールス！");
  }
  var strNoSpace=str.replace(/\s/g,"");
  if (strNoSpace.match(
    /^[qwertyuiop]+$/i)) {
    alertMsg.push(
      "構成文字がqwerty上段のみ");
  } else if(strNoSpace.match(
    /^[asdfghjkl;]+$/i)){
    alertMsg.push(
      "構成文字がqwerty中段のみ");
  }else if(strNoSpace.match(
    /^[zxcvbnm,\.\/]+$/i)){
    alertMsg.push(
      "構成文字がqwerty下段のみ");
  }
  if (strNoSpace.match(
    /^[01]+$/i)) {
    alertMsg.push(
      "構成文字が0-1のみ。Bin！");
  } else if (strNoSpace.match(
    /^[0-7]+$/i)) {
    alertMsg.push(
      "構成文字が0-7のみ。Oct！");
  } else if (strNoSpace.match(
    /^[2-9]+$/i)) {
    alertMsg.push(
      "構成文字が2-9のみ。ガラケー？");
  } else if (strNoSpace.match(
    /^[0-9]+$/i)) {
    alertMsg.push(
      "構成文字が0-9のみ。Dec！");
  } else if (strNoSpace.match(
    /^[0-9a-f]+$/i)) {
    alertMsg.push(
      "構成文字が0-fのみ。Hex！");
  }
  if (strNoSpace.match(
    /^[1-5]+$/i)
    && strNoSpace.length%2==0) {
    alertMsg.push(
      "<a href='#polybius'>構成文字が1-5のみでペアになる。polybiusかも</a>");
  }
  if (strNoSpace.match(
    /^[1-6]+$/i)
    && strNoSpace.length%2==0) {
    alertMsg.push(
      "<a href='#polybius'>構成文字が1-6のみでペアになる。polybius拡張版(数字を含む36文字)かも</a>");
  }
  if (
    strNoSpace[4]&&
    strNoSpace[4].match(/[NMO]/i)
  ) {
    alertMsg.push(
      "5文字目がNMO。Base64?");
  }
  if (
    strNoSpace[0].match(/[Q-WYZa-e]/i)&&
    strNoSpace[4]&&
    strNoSpace[4].match(/[NMO]/i)
  ) {
    alertMsg.push(
      "1文字目がQRSTUVW、YZabcde。5文字目がNMO。Base64かも?");
  }
  if (strNoSpace[0].match(/[NMO]/i)) {
    alertMsg.push(
      "1文字目がNMO。Base64?");
  }
  if (
    strNoSpace[4]&&
    strReverse(strNoSpace)[4].match(
      /[NMO]/i)
  ) {
    alertMsg.push(
      "reverse5文字目がNMO。Base64?");
  }
  if (
    strReverse(strNoSpace)[0].match(
      /[NMO]/i)
  ) {
    alertMsg.push(
      "reverse1文字目がNMO。Base64?");
  }
  if (strNoSpace.match(
    /^[a-zA-Z0-9+\/=]+$/)
    && str.match(/[a-z]/)
    && str.match(/[A-Z]/)
    && str.match(/[0-9]/)
    && str.length%4==0) {
    alertMsg.push(
      "文字数4の倍数、大文字小文字数字なのでbase64の可能性あり");
  }
  var wordL=strNoSpace.match(/\w+/g);
  var word="";
  if (wordL) word=wordL.join("");
  if (word.match(
    /^(\w{4}[NMO]\w+|\w+[NMO]\w{4}|[NMO]\w+|\w+[NMO])$/i)
    && word.length%4==0) {
    alertMsg.push(
      "文字数4の倍数、特定の位置にNMOがあるのでbase64の可能性あり");
  }
  if (strNoSpace.match(/iVBORw/)) {
    alertMsg.push(
      "'iVBORw'の文字列発見。Base64化されたDATA URL schemeの可能性あり。data:image/png;base64, をつけてwebブラウザへ");
  }
  if (strNoSpace.match(/^89504e470d0a1a0a/i)) {
    alertMsg.push(
      "PNG画像のマジックナンバー'89504e470d0a1a0a'発見");
  }
  if (
    (
    (
      strNoSpace.match(/^[A-Z2-7=]+$/)
      && strNoSpace.match(/[A-Z]/)
      && strNoSpace.match(/[2-7]/)
    ) || (
      strNoSpace.match(/^[a-z2-7=]+$/)
      && strNoSpace.match(/[a-z]/)
      && strNoSpace.match(/[2-7]/)
    )
    ) && strNoSpace.length>=14
  ) {
    if (strNoSpace.length%8!=0) {
      alertMsg.push(
        "(ホントは文字数が8の倍数)、数字が2-7で大文字だけ若しくは小文字だけなのでbase32の可能性あり");
    } else {
      alertMsg.push(
        "<a href='#base32'>文字数が8の倍数、数字が2-7で大文字だけ若しくは小文字だけなのでbase32の可能性あり</a>");
    }
  }
  if (
    (
    (
      strNoSpace.match(/^[A-V0-9=]+$/)
      && strNoSpace.match(/[A-V]/)
      && strNoSpace.match(/[0-9]/)
    ) || (
      strNoSpace.match(/^[a-v0-9=]+$/)
      && strNoSpace.match(/[a-v]/)
      && strNoSpace.match(/[0-9]/)
    )
    ) && strNoSpace.length>=14
  ) {
    if (strNoSpace.length%8!=0) {
      alertMsg.push(
        "(ホントは文字数が8の倍数)、数字が0-9で大文字A-Vだけ若しくは小文字a-vだけなのでbase32hexの可能性あり");
    } else {
      alertMsg.push(
        "<a href='#base32hex'>文字数が8の倍数、数字が0-9で大文字A-Vだけ若しくは小文字A-Vだけなのでbase32hexの可能性あり</a>");
    }
  }
  // var tmpRE0=new RegExp(charlist[0]+charlist[0]);
  // var tmpRE1=new RegExp(charlist[1]+charlist[1]);
  // var tmpRE2=new RegExp(charlist[2]+charlist[2]);
  if (m==3) {
	  var cl0=charlist[0].replace(/([\\\|\.\+\*\?\(\)\[\]\{\}\:\!\=])/g, '\\$1');
	  var cl1=charlist[1].replace(/([\\\|\.\+\*\?\(\)\[\]\{\}\:\!\=])/g, '\\$1');
	  var cl2=charlist[2].replace(/([\\\|\.\+\*\?\(\)\[\]\{\}\:\!\=])/g, '\\$1');
	  var tmpRE0=new RegExp(cl0+cl0);
	  var tmpRE1=new RegExp(cl1+cl1);
	  var tmpRE2=new RegExp(cl2+cl2);
	  if (!(str.match(tmpRE0) && str.match(tmpRE1) && str.match(tmpRE2))) {
	    var tmp="";
	    if (!str.match(tmpRE0)) {
	      tmp+="["+charlist[0]+"] ";
	    }
	    if (!str.match(tmpRE1)) {
	      tmp+="["+charlist[1]+"] ";
	    }
	    if (!str.match(tmpRE2)) {
	      tmp+="["+charlist[2]+"] ";
	    }
	    alertMsg.push(
	      "構成文字が3種類。モールスの可能性。連続しない文字は "+tmp);
	  }
  }
  if (
    str.match(/^[eish5]+$/i) &&
    str.length%2==0
  ) {
    alertMsg.push(
      "短符のみモールスからPolybiusの可能性");
  }
  if (str.match(
    /^(([2-9]){1,4}[\s01\D]?)+$/
  ) && str.match(
    /([2-9])\1+/)
  ) {
  alertMsg.push(
    "<a href='#phoneKeyboard'>ガラケー変換の可能性あり</a>");
  }
  if (str.match(
      /^(([2-68][1-3]|[79][1-4])[\s01\D]?)+$/
    ) || str.match(
      /^(([1-3][2-68]|[1-4][79])[\s01\D]?)+$/
    )
  ) {
    alertMsg.push(
      "<a href='#phoneKeyboard'>ガラケー変換の可能性あり</a>");
    }
  if (str.match(/^[0mcxi\s]+$/i)) {
    alertMsg.push(
      "<a href='romannum'>構成文字がMCXI+0でローマ数字バイナリ</a>");
  }
  if (str.match(/^[0nxcr\s]+$/i)) {
    alertMsg.push(
      "<a href='#romannum'>atbashで構成文字がMCXI+0。ローマ数字バイナリ</a>");
  }
  if (str.match(/^([MDCLXVI]+[\s\.,\/\|\\\-]?)+$/i)) {
    alertMsg.push("<a href='romannum'>ローマ数字</a>");
  } else if (
    str.match(/^(([2-9]|[1-9][0-9])?[MDCLXVI][\s\.,\/\|\\\-]?)+$/i) &&
    !str.match(/([MDCLXVI])\1/i)
  ) {
    alertMsg.push("<a href='#romannum'>N×ローマ数字(3x=xxx)</a>");
  } else if (
    atbash19(str).match(
      /^([MDCLXVI]+[\s\.,\/\|\\\-]?)+$/i)) {
    alertMsg.push(
      "<a href='#romannum'>atbash (reverse?) > ローマ数字</a>");
  } else if (m<=8) {
    var charlist=Object.keys(tmp).join("");
    for (var i=1; i<=26; i++) {
      if (rotN(charlist, i).match(
        /^([MDCLXVI]+[\s\.,\/\|\\\-]?)+$/i)
      ) {
        alertMsg.push(
          "<a href='#romannum'>ローマ数字(Rot+"+i+")</a>");
        alertMsg.push(
          rotN(str, i));
        break;
      }
    }
  }
  if (
    str.match(
      /^([a-g]{1,7}[\s|\-.,/\\]*)+$/ig)) {
    alertMsg.push(
      "LED7セグの可能性");
  }
  var morseExchangeBinLen=morseExchange(str).replace(/\s/g,"").length;
  if (morseExchangeBinLen%7==0 && morseExchangeBinLen>=70) {
    alertMsg.push("morseからバイナリでLED7セグの可能性");
    if(morseExchangeBinLen>279){
      alertMsg.push("文字数が多い! morseからバイナリAAの可能性を強く示唆");
    }
  }
  if (morseExchangeBinLen%6==0 && morseExchangeBinLen>=30) {
    alertMsg.push(
      "morseからbraille点字の可能性");
  }
  if (morseExchangeBinLen%5==0) {
    if(morseExchangeBinLen>249){
      alertMsg.push("文字数が多い! morseからバイナリAAの可能性を強く示唆");
    }
  }
  if (m==3
    && str.replace(/\s/g,"").match(
      /^((.)+[^\2]+)+$/)
  && str.replace(/\s/g,"").length%6==0) {
    alertMsg.push(
      "braille点字の可能性");
  }
  if (str.match(/^[0129]+$/i)) {
    alertMsg.push(
      "[0129]のみ。+-1でバイナリかも");
  }
  if (str.match(/^[w-za-c]+$/i)) {
    alertMsg.push(
      "[w-za-c]のみ。文字の差分+/-/0でmorseかも");
  }
  if (str.match(/^[m\d]+$/i)) {
    alertMsg.push(
      "Mと数字のみ。Mを1000として数字を足し引きしてみては？");
  }
  if (str.match(/^[a-j\s]+$/i)) {
    alertMsg.push(
      "[a-j]までの10文字内のみ abc012 ?");
  }
  if (str.match(/^[q-z\s]+$/i)) {
    alertMsg.push(
      "[q-z]までの10文字内のみ atbash >abc012 ?");
  }
  if (str.match(/^[a-zA-Z01]+$/)
    &&str.match(/[01]/)
    &&str.match(/[a-zA-Z]/)
  ) {
    alertMsg.push(
      "アルファベットと0/1のみ。逆ガラケー変換の可能性あり");
  }
  if (str.length==625) {
    alertMsg.push(
      "625文字は25×25のAA(QRコード?)の可能性");
  }
  if (str.match(/^\d{10}$/)) {
    alertMsg.push(
      "10桁数字はISBN-10(国際標準図書番号)の可能性\n<a href='com.amazon.mobile.shopping.web://www.amazon.co.jp/gp/product/"+str+"'>www.amazon.co.jp/gp/product/"+str+"</a>");
  }
  if (str.match(/^(978|979)\d{10}$/)) {
    alertMsg.push(
      "978・979で始まる13桁数字はISBN-13(国際標準図書番号)の可能性\n<a href='com.amazon.mobile.shopping.web://www.amazon.co.jp/gp/product/"+str+"'>www.amazon.co.jp/gp/product/"+str+"</a>");
  }
  if (str.match(/^(11010000100|11010010000|11010011100|00101111011|00101101111|00101100011)/)) {
    alertMsg.push(
      "code128のスタートキャラクタで始まっている");
  }
  if (str.match(/^([0-9a-f]{6})+$/i)) {
    alertMsg.push(
      "3組の16進数で割り切れるからHexのカラーコードかも");
  }
  if (str.match(/(3\.6342|3\.6593|3\.6840|3\.7084|3\.7325|3\.7562|3\.7797|3\.8029|3\.8258|3\.8485|4\.0207|4\.0412|4\.0615|4\.0816|4\.1015|4\.1212|4\.1408|4\.1601|4\.1793|4\.1983|4\.2171|4\.2358|4\.2543|4\.2726|4\.2908|4\.3088|4\.3267|4\.3444|4\.3620|4\.3795|4\.3968|4\.4140|4\.4310|4\.4479|4\.4647|4\.4814|4\.5947|4\.6104|4\.6260|4\.6415|4\.6570|4\.6723|4\.6875|4\.7026|4\.7176|4\.7326|4\.7474|4\.7622|4\.7768|4\.7914|4\.8058|4\.8202|4\.8345|4\.8488|4\.8629|4\.8769|4\.8909|4\.9048|4\.9186|4\.9324|4\.9460|4\.9596)/)) {
    alertMsg.push(
      "<b>decASCIIの三乗根 3.6342〜4.9596</b>");
  }
  if (
    str.match(/^(\d[a-z]|[a-z]\d)+$/i)
  ) {
    alertMsg.push(
      "数字と文字に別けて、数字を解読してkeywordげっと。それで文字列をvigenere。(文字列側をkeywordリストで総当たりするのもアリ！)");
  }
  if (
    str.match(/^[1-6]{10,}$/) &&
    str.match(/[12]/) &&
    str.match(/[34]/) &&
    str.match(/[56]/) &&
    !(str.match(/[12][12]/) &&
     str.match(/[34][34]/) &&
     str.match(/[56][56]/))
  ) {
    var tmp="";
    if (!str.match(/[12][12]/)) {
     tmp+="[12] ";
    }
    if (!str.match(/[34][34]/)) {
     tmp+="[34] ";
    }
    if (!str.match(/[56][56]/)) {
     tmp+="[56] ";
    }
    alertMsg.push(
      "1〜6の数字のみ。12 34 56 でモールスかも？"+" 連続しない文字は "+tmp);
  }
  if (
    str.match(
    /^([1-8]{1,4}[\s\-/\\|.,:]){9,}[1-8]{1,4}$/)
    && str.match(/[1-4]/)
    && str.match(/[5-8]/)
  ) {
    alertMsg.push(
      "1〜8の数字のみ。1234, 5678 でモールスかも？");
  }
  if (
    str.match(
    /^([0-9]{1,5}[\s\-/\\|.,:]){9,}[0-9]{1,5}$/)
    && str.match(/[1-5]/)
    && str.match(/[6-90]/)
  ) {
    alertMsg.push(
      "0〜9の数字のみ。12345, 67890 でモールスかも？");
  }
  if (
    str.match(
    /^([2-9]{1,5}[01]){9,}[2-9]{1,5}$/)
    && str.match(/[2-5]/)
    && str.match(/[6-9]/)
  ) {
    alertMsg.push(
      "0〜9の数字のみ。01区切り、2345/ 6789 でモールスかも？");
  }
  if (
    str.match(/^([a-zA-Z]{1,5}[.,\/\\|\-:]){5,}[a-zA-Z]+$/) &&
    str.match(/[a-z]/) &&
    str.match(/[A-Z]/) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("大文字と小文字でモールスかも");
  }
  var tmpnumL=str.match(/\d+/g);
  var prmF=1;
  for (var j in tmpnumL) {
    if (!isPrime(Number(tmpnumL[j]))) {
      prmF=0;
    }
  }
  if (prmF && tmpnumL) {
    alertMsg.push(
      "抜き出した数字は全て素数");
  }
  if (str.match(/`/)) {
    alertMsg.push(
      "含まれる「`」はASCIIコードで96。小文字aの１つ前。rot関連かも。");
  }
  if (str.match(
    /^[zerontwhrfuivsxg]+$/i)) {
    alertMsg.push(
      "全てが3文字数字の構成");
  }
  if (str.match(
    /^[avilmgdsiufrehct]+$/i)) {
    alertMsg.push(
      "atbashして全てが3文字数字の構成");
  }
  if (str.match(/^[zeontwhfis]+$/i)) {
    alertMsg.push(
      "全てが2文字数字の構成");
  }
  if (str.match(/^[avlmgdsurh]+$/i)) {
    alertMsg.push(
      "atbashして全てが2文字数字の構成");
  }
  if (
    str.match(/\d/) &&
    str.match(/[pm]/i) &&
    str.match(/^[\dpm=]+$/i)
  ) {
    alertMsg.push(
      "数字をプラスマイナスの可能性");
  }
  if (
    str.match(/-/) &&
    str.match(/–/) &&
    str.match(/—/)
  ) {
    alertMsg.push(
      "3種類のハイフンがある。AAかも⁉︎");
  }
  if (str.match(
    /^(ne|wo|ee|ur|ve|ix|en|ht|ne|ro){5,}$/i) ||
    strReverse(str).match(
    /^(ne|wo|ee|ur|ve|ix|en|ht|ne|ro){5,}$/i) ||
    atbash19(str).match(
    /^(ne|wo|ee|ur|ve|ix|en|ht|ne|ro){5,}$/i) ||
    strReverse(atbash19(str)).match(
    /^(ne|wo|ee|ur|ve|ix|en|ht|ne|ro){5,}$/i)
  ) {
    alertMsg.push(
      "構成文字が、後ろから2文字の数字のみの");
  }
  if (str.match(
    /^(one|two|ree|our|ive|six|ven|ght|ine|ero){5,}$/i) ||
    strReverse(str).match(
    /^(one|two|ree|our|ive|six|ven|ght|ine|ero){5,}$/i) ||
    atbash19(str).match(
    /^(one|two|ree|our|ive|six|ven|ght|ine|ero){5,}$/i) ||
    strReverse(atbash19(str)).match(
    /^(one|two|ree|our|ive|six|ven|ght|ine|ero){5,}$/i)
  ) {
    alertMsg.push(
      "構成文字が、後ろから3文字の数字のみの");
  }
  if (str.match(
    /^(one|two|hre|our|ive|six|eve|igh|ine|ero){5,}$/i) ||
    strReverse(str).match(
    /^(one|two|hre|our|ive|six|eve|igh|ine|ero){5,}$/i) ||
    atbash19(str).match(
    /^(one|two|hre|our|ive|six|eve|igh|ine|ero){5,}$/i) ||
    strReverse(atbash19(str)).match(
    /^(one|two|hre|our|ive|six|eve|igh|ine|ero){5,}$/i)
  ) {
    alertMsg.push(
      "構成文字が、途中3文字の数字のみの");
  }
  if (str.match(
    /^(ne|wo|hr|ur|ve|ix|ev|ig|in|er){5,}$/i) ||
    strReverse(str).match(
    /^(ne|wo|hr|ur|ve|ix|ev|ig|in|er){5,}$/i) ||
    atbash19(str).match(
    /^(ne|wo|hr|ur|ve|ix|ev|ig|in|er){5,}$/i) ||
    strReverse(atbash19(str)).match(
    /^(ne|wo|hr|ur|ve|ix|ev|ig|in|er){5,}$/i)
  ) {
    alertMsg.push(
      "構成文字が、途中2文字の数字のみの");
  }
  {
  var unixTime=Math.floor(
    (new Date()).getTime()/1000);
  var unixTime1Y=1*365*24*60*60;
  var nums=str.match(/\d+/g);
  var unixTimeF=0;
  for (var i in nums) {
    if (
      Number(nums[i]) > (unixTime-unixTime1Y)
      && Number(nums[i]) < (unixTime+unixTime1Y)) {
      unixTimeF=1;
      //alertMsg.push(nums[i]);
      if (nums[i].match(/^\d{1,10}$/)) {
        nums[i]=nums[i]*1000;
      }
      var myDate=
        new Date(Number(nums[i]));
      alertMsg.push(myDate);
      alertMsg.push(
        myDate.toUTCString());
    }
  }
  if (unixTimeF) {
    alertMsg.push(
      "↑UNIXタイムっぽい");
  }
  }
  {
  var unixTime=
    (new Date()).getTime();
  var unixTime1Y=1*365*24*60*60*1000;
  var nums=str.match(/\d+/g);
  var unixTimeF=0;
  for (var i in nums) {
    if (
      Number(nums[i]) > (unixTime-unixTime1Y)
      && Number(nums[i]) < (unixTime+unixTime1Y)) {
      unixTimeF=1;
      //alertMsg.push(nums[i]);
      if (nums[i].match(/^\d{1,10}$/)) {
        nums[i]=nums[i]*1000;
      }
      var myDate=
        new Date(Number(nums[i]));
      alertMsg.push(myDate);
      alertMsg.push(
        myDate.toUTCString());
    }
  }
  if (unixTimeF) {
    alertMsg.push(
      "↑UNIXタイムっぽい");
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
  ,"");
  if (str.match(tmpRE)) {
     alertMsg.push(
     "タイムスタンプフォーマット発見");
  }
  }
  if (
   str.match(/\d/g)&&
   str.match(/\d/g).length>=4) {
     alertMsg.push(
      "数字がすでに4つ");
     var keySyougouL=keySyougou(
       str, wL.length);
     if (keySyougouL.length) {
       //alert(keySyougouL);
       alertMsg.push(
         "以下のKeywordが可能");
       for (var i in keySyougouL) {
         alertMsg.push(
           "<div class='alertbox'>"+
           keySyougouL[i]+"</div>");
       }
     }
  }
  if (str.match(/^[0-6]+$/)) {
    alertMsg.push("0区切りの1〜6の数字の可能性。奇偶モールス後、12,34,56で大文字小文字分けてbase64かも");
  } else if (str.match(/^[1-7]+$/)) {
    alertMsg.push("7区切りの1〜6の数字の可能性。奇偶モールス後、12,34,56で大文字小文字分けてbase64かも");
  }

  var tmpRE=new RegExp("^(MAGICIAN|BATELEUR|PAPESS|(HIGH)?PRIESTESS|PAPESSE|EMPRESS|IMPERATRICE|EMPEROR|EMPEREUR|POPE|HIEROPHANT|PAPE|LOVERS|AMOUREUX|CHARIOT|STRENGTH|FORTITUDE|FORCE|HERMIT|ERMITE|WHEEL|ROUE|FORTUNE|JUSTICE|HANGED(MAN)?|PENDU|DEATH|MORT|TEMPERANCE|DEVIL|DIABLE|TOWER|MAISON(dieu)?|STAR|ETOILE|MOON|LUNE|SUN|SOLEIL|JUDGEMENT|JUGEMENT|WORLD|MONDE|FOOL|FOU)+$", "i");
  if (
    str.match(tmpRE) ||
    atbash19(str).match(tmpRE)
  ) {
    alertMsg.push(
      "タロットカードの名前");
  }
  //--------------
  if (str.match(/(11[-_A-Za-z0-9]{10}[AEIMQUYcgkosw048]|[-_A-Za-z0-9]{10}[AEIMQUYcgkosw048]11)/) &&
  kouseimoji.length>=4) {
    alertMsg.push(
      "11のヒントはyoutubeのIDの可能性あり");
    var ytlink=str.match(/11[-_A-Za-z0-9]{10}[AEIMQUYcgkosw048]|[-_A-Za-z0-9]{10}[AEIMQUYcgkosw048]11/);
    if (ytlink[0]) {
      ytlink[0]=
        ytlink[0].replace(/(^11|11$)/, "");
    }
    alertMsg.push("<a href='vnd.youtube://"+ytlink[0]+"'>googlechrome://youtu.be/"+ytlink[0]+"</a>");
  }
    if (str.match(/(22[-_A-Za-z0-9]{21}[AQgw]|[-_A-Za-z0-9]{21}[AQgw]22)/) &&
  kouseimoji.length>=4) {
    alertMsg.push(
      "22のヒントはyoutubeのChannel IDの可能性あり");
    var ytlink=str.match(/22[-_A-Za-z0-9]{21}[AQgw]|[-_A-Za-z0-9]{21}[AQgw]22/);
    if (ytlink[0]) {
      ytlink[0]=
        ytlink[0].replace(/(^22|22$)/, "");
    }
    alertMsg.push("<a href='vnd.youtube://"+ytlink[0]+"'>googlechrome://youtu.be/"+ytlink[0]+"</a>");
  }

  if (str.match(/\b(v=)?([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])(11|v)?\b/) &&
  kouseimoji.length>=4) {
    alertMsg.push(
      "youtubeのIDの可能性あり");
    var ytlink=str.match(/\b(v=)?([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])(11|v)?\b/);
    ytlink[0]=ytlink[0].replace(/(v=)?([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])(11|v)?/, "$2");
    alertMsg.push("<a href='vnd.youtube://"+ytlink[0]+"'>googlechrome://youtu.be/"+ytlink[0]+"</a>");
  }

  if (str.match(/\b(11|v)?([AEIMQUYcgkosw048][-_A-Za-z0-9]{10})(=v)?\b/) &&
  kouseimoji.length>=4) {
    alertMsg.push(
      "reverseでyoutubeのIDの可能性あり");
    var ytlink=strReverse(str).match(/\b(v=)?([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])(11|v)?\b/);
    ytlink[0]=ytlink[0].replace(/(v=)?([-_A-Za-z0-9]{10}[AEIMQUYcgkosw048])(11|v)?/, "$2");
    alertMsg.push("<a href='vnd.youtube://"+ytlink[0]+"'>googlechrome://youtu.be/"+ytlink[0]+"</a>");
  }

  //--------------

if (str.match(/\d+[.\/\\\-|,%]\d+/g)) {
    var tmp=str.match(/\d+[.\/\\\-|,%]\d+/g);
    var res=[];
    for (var i in tmp) {
      tmp[i]=tmp[i].split(/[.\/\\\-|,%]/);
      tmp[i][0]=Number(tmp[i][0]);
      tmp[i][1]=Number(tmp[i][1]);
      if (tmp[i][1]<2 || tmp[i][0]<2) {
        continue;
      } else if (tmp[i][1]%tmp[i][0]==0) {
        res.push(
          tmp[i][1]+"/"+tmp[i][0]+"="+
          tmp[i][1]/tmp[i][0]
        );
      } else if (tmp[i][0]%tmp[i][1]==0) {
        res.push(
          tmp[i][0]+"/"+tmp[i][1]+"="+
          tmp[i][0]/tmp[i][1]
        );
      }
    }
    if (res.length)
    alertMsg.push(
      "除数がある > "+res.join("\n"));
  }

  // 累乗
  var powerMtrx=[
    ["48","65536"],
    ["49","262144"],
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
    ["72","49"],
    ["73","343"],
    ["74","2401"],
    ["75","16807"],
    ["76","117649"],
    ["77","823543"],
    ["78","5764801"],
    ["79","40353607"],
    ["82","64"],
    ["83","512"],
    ["84","4096"],
    ["85","32768"],
    ["86","262144"],
    ["87","2097152"],
    ["88","16777216"],
    ["89","134217728"]
    ];
  powerMtrx.sort(function(a,b){
        if( a[1] > b[1] ) return -1;
        if( a[1] < b[1] ) return 1;
        return 0;
  });

  var tmpRE=new RegExp(powerMtrx.map(val=>val[1]).join("|"),"g");
  var tmp=str.match(tmpRE);
  if (tmp && tmp.length>4) {
    alertMsg.push("<a href='#power'>累乗 x^y decASCII(xy) が見つかった</a>");
    tmp.forEach(val=>{
      powerMtrx.forEach(val2=>{
        if(val2[1]==val) alertMsg.push(val2[0][0]+"^"+val2[0][1]+" = "+val2[1]);
      });
    });
  }


  // n回二乗する
  let mtrx=[
    ["2^2","4"],
    ["2^2^2","16"],
    ["3^2","9"],
    ["3^2^2","81"],
    ["4^2","16"],
    ["4^2^2","256"],
    ["5^2","25"],
    ["5^2^2","625"],
    ["6^2","36"],
    ["6^2^2","1296"],
    ["7^2","49"],
    ["7^2^2","2401"],
    ["7^2^2^2","5764801"],
    ["8^2","64"],
    ["8^2^2","4096"],
    ["9^2","81"],
    ["9^2^2","6561"],
    ["9^2^2^2","43046721"]
    ];
  mtrx.sort(function(a,b){
        if( a[1] > b[1] ) return -1;
        if( a[1] < b[1] ) return 1;
        return 0;
  });

  var tmpRE=new RegExp(mtrx.map(val=>val[1]).join("|"),"g");
  var tmp=str.match(tmpRE);
  if (tmp && tmp.length>6) {
    alertMsg.push("<a href='#power'> n回二乗する値 ((x^2)^2)^2 ガラケー入力か？</a>");
    tmp.forEach(val=>{
      mtrx.forEach(val2=>{
        if(val2[1]==val) alertMsg.push(val2[0]+" = "+val2[1]);
      });
    });
  }


  var tmp=str.match(
    /(1[0-8]\d\.\d|[1-9]\d\.\d|[1-9]\.\d)[NEWS]/ig);
  if (tmp) {
    alertMsg.push("座標 "+tmp.join(" "));
    alertMsg.push("<a href='googlechrome://www.fourmilab.ch/earthview/lunarform/cratall.html'>Lunar Craters</a>");
  }
  if (str.match(
  /[शून्यएकद्वित्रिचतुर्पञ्चषष्सप्तअष्टनव]/i)) {
  alertMsg.push(
    "サンスクリット数字");
  }
  if (str.match(/[०१२३४५६७८९]/i)) {
  alertMsg.push(
    "デーヴァナーガリー数字");
  }
  if (str.match(
  /^[ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω]+$/)) {
    alertMsg.push(
    "全てがギリシャ文字");
  }
  else if (str.match(
  /[ΑαΒβΓγΔδΕεΖζΗηΘθΙιΚκΛλΜμΝνΞξΟοΠπΡρΣσςΤτΥυΦφΧχΨψΩω]/)) {
    alertMsg.push(
    "一部がギリシャ文字");
  }

  var phoneticRE=RegExp("Alfa|Alpha?|Bravo?|Char(lie)?|Delta?|Echo|Foxt(rot)?|Golf|Hotel?|India?|Juli(ett?)?|Kilo|Lima|Mike|Nove(mber)?|Oscar?|Papa|Queb(ec)?|Romeo?|Sier(ra)?|Tango?|Unif(orm)?|Vict(or)?|Whis(key)?|(X-ray|Xray)|Yank(ee)?|Zulu","ig");
  var tmp=str.match(phoneticRE);
  if (tmp) {
  alertMsg.push(
    "<b>phonetic code</b>\n"+
    tmp.join("\n"));
  }
  if (str.match(/\d([pm]\d|=){2,}/i)) {
    alertMsg.push(
      "p >plus+, m>minus-, =は同じ\n最初の数字に対してのこともあるし、直前の数に対してのこともある。");
  }
  if (str.match(/”/)) {
    alertMsg.push("「 ” 」の文字は「 \" 」に置き換えてみてもいいかも\n"+str.replace(/”/g,"\""));
  }
  if (str.match(/^([1-5][1-5]){6,}$/i)) {
    alertMsg.push("1〜5のペア。polybius");
  }
  if (str.match(/^([5-9][5-9]){6,}$/i)) {
    alertMsg.push("atbashすると、1〜5のペア。polybius");
  }
  if (str.match(/^([1-6][1-6]){6,}$/i)) {
    alertMsg.push("1〜6のペア。polybiusの拡張版(数字を含む36文字)");
  }
  if (
    str.match(/^[(\\\/_)\s]{15,}$/) &&
    str.match(/[(]/) &&
    str.match(/[)]/) &&
    str.match(/[\\]/) &&
    str.match(/[\/]/) &&
    str.match(/[_]/)
  ) {
    alertMsg.push("3行AAの可能性");
  }
  if (str.match(/\bm3\b/i)) {
    alertMsg.push("m3がエニグマの可能性");
  }
  if (str.match(/\bm4\b/i)) {
    alertMsg.push("m4がエニグマの可能性");
  }
  if (str.match(/^([mp][aeio])+$/i) && str.length%4==0) {
    alertMsg.push("使用文字が([mp][aeio])+のみ。カナダ先住民文字を使ったセマフォの可能性\n<a href='googlechrome://en.m.wikipedia.org/wiki/Canadian_Aboriginal_syllabics'>Semapgore wikipedia</a>");
  }
  if (
    str.length%2==0 &&
    kouseimoji.length==8
  ) {
    alertMsg.push("8種類の文字(8方向)でペアになるからsemaphoreの可能性");
  }
  if (
    str.match(/^((ze|on|te|el|hu|th)[\s\|\-\.,\/]?){8,}$/i) &&
    kouseimoji.length>=5
  ) {
    alertMsg.push("ze=0, on=1, te=10, el=11, hu=100, th=1000, でバイナリの可能性");
  }
  if (
    str.match(/^[a-r]{2}[0-9]{2}[a-x]{2}$/i) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("<a href='googlechrome://www.qrz.com/gridmapper'>GL(Grid Locator)</a>での座標の可能性");
  }
  if (str.match(/^[ABKL]{5,}$/i) && kouseimoji.length>=3) {
    alertMsg.push("abc012でバイナリの可能性。A>0, B>1, K>10, L>11");
  }
  var tmp=str.match(/2304|2401|2500|2601|2704|2809|2916|3025|3136|3249|4225|4356|4489|4624|4761|4900|5041|5184|5329|5476|5625|5776|5929|6084|6241|6400|6561|6724|6889|7056|7225|7396|7569|7744|7921|8100/g);
  if (tmp && tmp.length>=3) {
    alertMsg.push("decASCIIの二乗を3つ以上発見 [ "+tmp.join(", ")+" ]");
  }
  var tmp=str.match(/110592|117649|125000|132651|140608|148877|157464|166375|175616|185193|274625|287496|300763|314432|328509|343000|357911|373248|389017|405224|421875|438976|456533|474552|493039|512000|531441|551368|571787|592704|614125|636056|658503|681472|704969|729000/g);
  if (tmp && tmp.length>=3) {
    alertMsg.push("decASCIIの三乗を3つ以上発見 [ "+tmp.join(", ")+" ]");
  }
  if (
    str.match(/^(([a-f][1-6]){3,}[a-f]?|([1-6][a-f]){3,}[1-6]?)$/i) &&
    kouseimoji.length>=5
  ) {
    alertMsg.push("123とabcが交互でRLEバイナリの可能性");
  }
  if (
    str.match(/^([2-9]?[b-g]){4,}$/i) &&
    !str.match(/(.)\1/) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("n × abc012でRLE×RLEバイナリの可能性");
  }
  if (
    str.match(/^([2-9]?[!@#$%^]){4,}$/i) &&
    !str.match(/(.)\1/) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("n × symbol012でRLE×RLEバイナリの可能性");
  }
  if (
    str.match(/^(((viiii|9)|(iiii|4)|(viii|8)|(iii|3)|(vii|7)|(ii|2)|(vi|6)|(iv|4)|(v|5))?[b-g]){4,}$/i) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("ローマ数字 × abc012でRLE×RLEバイナリの可能性");
  }

  if (
    str.match(/^[1-9]{4,}$/i) &&
    kouseimoji.length>=3
  ) {
    var tmps=str.split("");
    var mysum=0;
    for (var i in tmps) {
      mysum+=Number(tmps[i]);
    }
    if (mysum%8==0) {
      var n=mysum/8;
      alertMsg.push("RLEバイナリの可能性 sum:"+mysum+" (8×"+n+")");
    } else if (mysum%7==0) {
      var n=mysum/7;
      alertMsg.push("RLEバイナリの可能性 sum:"+mysum+" (7×"+n+") 7seg");
    } else if (mysum%6==0) {
      var n=mysum/6;
      alertMsg.push("RLEバイナリの可能性 sum:"+mysum+" (6×"+n+") braille");
    } else if (mysum%5==0) {
      var n=mysum/5;
      alertMsg.push("RLEバイナリの可能性 sum:"+mysum+" (5×"+n+") baicon");
    } else {
      alertMsg.push("0を除く数字のみ RLE? sum:"+mysum);
    }
  }

  var tmpL=["",""];
  str.replace(/(?:(.)(.?))/g, function(match, p1, p2){tmpL[0]+=p1;tmpL[1]+=p2;});
  if (
    (tmpL[0].match(/^[a-z]{6,}$/i) && tmpL[1].match(/^[^a-z]{6,}$/i)) ||
    (tmpL[0].match(/^[^a-z]{6,}$/i) && tmpL[1].match(/^[a-z]{6,}$/i)) &&
    kouseimoji.length>=3
  ) {
    alertMsg.push("<a href='#oddeven'>奇数偶数に特徴あり</a>");
  }

  if (
    str.length>50 &&
    kouseimoji.length==2
  ) {
    if (str.length%8==0) {
      var n=str.length/8;
      alertMsg.push("<a href='#binASCII'>バイナリからASCIIの可能性 "+str.length+"文字 (8×"+n+")</a>");
    } else if (str.length%7==0) {
      var n=str.length/7;
      alertMsg.push("<a href='#7seg'>バイナリから7segの可能性 "+str.length+"文字 (7×"+n+"))</a>");
    } else if (str.length%6==0) {
      var n=str.length/6;
      alertMsg.push("<a href='#braille'>バイナリからbrailleの可能性 "+str.length+"文字 (6×"+n+"))</a>");
    } else if (str.length%5==0) {
      var n=str.length/5;
      alertMsg.push("<a href='#baconian'>バイナリからbaiconianの可能性 "+str.length+"文字 (5×"+n+"))</a>");
      alertMsg.push("<a href='#bin5toAZ'>バイナリ数字(0~31 → 00000~11111)の可能性 "+str.length+"文字 (5×"+n+"))</a>");
    }
  }

  if (
    (str.match(/^[ADFGVX]{6,}$/i) || atbash(str).match(/^[ADFGVX]{6,}$/i)) &&
    kouseimoji.length>=4 &&
    str.length%2==0
  ) {
    if (str.match(/^[ADFGVX]{6,}$/i)) {
      alertMsg.push("<a href='#adfgvx'>ADFGVX暗号の可能性あり</a>");
    } else {
      alertMsg.push("<a href='#adfgvx'>atbashでADFGVX暗号の可能性あり</a> <code>"+atbash(str)+"</code>");
    }
  }

  if (
    (str.match(/^[ADFGX]{5,}$/i) || atbash(str).match(/^[ADFGX]{5,}$/i)) &&
    kouseimoji.length>=4 &&
    str.length%2==0
  ) {
    if (str.match(/^[ADFGX]{5,}$/i)) {
      alertMsg.push("<a href='#adfgx'>ADFGX暗号の可能性あり</a>");
    } else {
      alertMsg.push("<a href='#adfgx'>atbashでADFGX暗号の可能性あり</a> <code>"+atbash(str)+"</code>");
    }
  }

  // 月名
  if (
    (str.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i) || atbash(str).match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) &&
    kouseimoji.length>=4
  ) {
    if(str.match(/^(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec){10,}$/i)) {
      alertMsg.push("<a href='#month'>すべて3文字の月名</a>");
    } else {
      alertMsg.push("<a href='#month'>atbashするとすべて3文字の月名</a>");
      alertMsg.push(atbash(str));
    }
  }

  if (
    (str.match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i) || atbash(str).match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) &&
    kouseimoji.length>=4
  ) {
    if(str.match(/^(an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec){10,}$/i)) {
      alertMsg.push("<a href='#month'>すべて2文字の月名</a>");
    } else {
      alertMsg.push("<a href='#month'>atbashするとすべて2文字の月名</a>");
      alertMsg.push(atbash(str));
    }
    alertMsg.push("an|eb|ar|pr|ay|un|ul|ug|ep|ct|ov|ec");
  }

// 曜日
  if (
(str.match(/^(sun|mon|tue|wed|thu|fri|sat){5,}$/i)|| atbash(str).match(/^(sun|mon|tue|wed|thu|fri|sat){5,}$/i)|| str.match(/^(un|on|ue|ed|hu|ri|at){10,}$/i)|| str.match(/^(su|mo|tu|we|th|fr|sa){10,}$/i))&&
    kouseimoji.length>=4
  ) {
    if(str.match(/^(sun|mon|tue|wed|thu|fri|sat){5,}$/i)) {
      alertMsg.push("<a href='#dayoftheweek'>すべて曜日名</a>");
    } else if(atbash(str).match(/^(sun|mon|tue|wed|thu|fri|sat){5,}$/i)) {
      alertMsg.push("<a href='#dayoftheweek'>atbashするとすべて曜日名</a>");
      alertMsg.push(atbash(str));
    } else if(str.match(/^(un|on|ue|ed|hu|ri|at){10,}$/i)) {
      alertMsg.push("<a href='#dayoftheweek'>すべて2文字の曜日名</a>");
  var tmp=str.match(/un|on|ue|ed|hu|ri|at/ig);
  alertMsg.push(tmp.join(" "));
  tmp=tmp.map(val=>val.replace(/un/i,"Sun").replace(/on/i,"Mon").replace(/ue/i,"Tue").replace(/ed/i,"Wed").replace(/hu/i,"Thur").replace(/ri/i,"Fri").replace(/at/i,"Sat"));
  alertMsg.push(tmp.join(" "));

    } else if(str.match(/^(su|mo|tu|we|th|fr|sa){10,}$/i)) {
      alertMsg.push("<a href='#dayoftheweek'>すべて2文字の曜日名</a>");
  var tmp=str.match(/su|mo|tu|we|th|fr|sa/ig);
  alertMsg.push(tmp.join(" "));
  tmp=tmp.map(val=>val.replace(/su/i,"Sun").replace(/mo/i,"Mon").replace(/th/i,"Tue").replace(/we/i,"Wed").replace(/hu/i,"Thur").replace(/fr/i,"Fri").replace(/sa/i,"Sat"));
  alertMsg.push(tmp.join(" "));
    }

  }

  // abc012 6以下
  var tmp=abc012(str);
  if (tmp.match(/^[123456]{25,}$/i) &&
    kouseimoji.length>=4
  ) {
    if(tmp.match(/^[12345]{25,}$/i) &&
      tmp.length%2==0) {
      alertMsg.push("<a href='#polybius'>abc012で1〜5のみでペアになる > polybiusか？</a>");
    } else if(tmp.match(/^[123456]{25,}$/i) && tmp.split("").reduce((val,e)=>Number(e)+Number(val))%8==0) {
      alertMsg.push("<a href='#RLD'>abc012で1〜6のみ。合計が8で割れるから、RLDからbinASCIIかも。</a>");
    }
  }

// DecとHexで交互の範囲に納まる
var tmpDec='(4[89]|5[0-7]|6[5-9]|[78][0-9]|90)';
var tmpHex='(3[0-9]|4[1-9a-f]|5[0-9a]|6[1-9a-f]|7[0-9a])';
var tmpRE1=new RegExp(`^(${tmpDec}${tmpHex}){5,}${tmpDec}?$`,"i")
if (str.match(tmpRE1)) {
  alertMsg.push("<a href='#altdechex'>DecとHexで交互の範囲に納まる</a>");
  alertMsg.push(str.match(/../g).join(" "));
}
var tmpRE2=new RegExp(`^(${tmpHex}${tmpDec}){5,}${tmpHex}?$`,"i")
if (str.match(tmpRE2)) {
   alertMsg.push("<a href='#althexdec'>HexとDecで交互の範囲に納まる</a>");
  alertMsg.push(str.match(/../g).join(" "));
}

if (str.match(/WGS84/i)) {
  alertMsg.push("世界測地系1984（WGS84）？");
}

if (str.match(/MGRS/i)) {
  alertMsg.push("Military Grid Reference System？");
}

// MGRS座標
if (str.match(/\b(([1-9]|[1-5][0-9]|60)[C-HJ-NP-W]|([1-9]|[1-2][0-9]|3[0135789]|[4-5][0-9]|60)X)[\s./]?[A-HJ-RS-Z]{2}[\s./]?(\d{1,5}[\s./]?){2}\b/ig)) {
  var tmp=str.match(/\b(([1-9]|[1-5][0-9]|60)[C-HJ-NP-W]|([1-9]|[1-2][0-9]|3[0135789]|[4-5][0-9]|60)X)[\s./]?[A-HJ-RS-Z]{2}[\s./]?(\d{1,5}[\s./]?){2}\b/ig)
  alertMsg.push("MGRS座標(Military Grid Reference System)");
  tmp.forEach(val=>alertMsg.push("<a href='https://mappingsupport.com/p/gmap4.php?mgrs="+val+"&z=15' target='_blank'>"+val+"</a>"));
  alertMsg.push("<a href='https://www.wingfield.gr.jp/blog/2017/11/13/p6833/' target='_blank'>詳しくは https://www.wingfield.gr.jp/blog/2017/11/13/p6833/</a>");
}


// 緯度経度
var tmpRE=new RegExp(String.raw`([\-+mp]?)([0-9]|[1-8][0-9]|90)[.d](\d{6,})[,c\d]([\-+mp]?)([0-9]|[1-9][0-9]|1(?:[0-7][0-9]|80))[.d](\d{6,})`,"ig");
if(str.match(tmpRE)){
  alertMsg.push("緯度経度");
  var tmp= str.match(tmpRE);
  var tmp2=tmp.map(val=>val.replace(tmpRE,"$1$2.$3,$4$5.$6"));
  tmp2=tmp2.map(val=>val.replace(/m/ig,"-").replace(/p/ig,""));
  tmp2.forEach((val,i)=>alertMsg.push(tmp[i]+" > <a href='https://maps.google.com/?q="+val+"&z=15' target='_blank'>"+val+"</a>"));
}


// 直線の数
if (str.match(/^[o\-=≠#\s]+$/i) &&
    str.match(/o/i) &&
    str.match(/-/i) &&
    str.match(/=/i) &&
    str.match(/≠/i) &&
    str.match(/#/i)
) {
  alertMsg.push("直線の数 o-=≠# > 01234 からのbase5 や polybius");
}

// bcdef. ghijk- a区切りモールス
if (
  TEXT.match(/^[a-k]+$/i) && 
  TEXT.match(/[a]/i) && 
  !TEXT.match(/aa/i) && 
  !TEXT.match(/[b-k]{6}/i) && 
  TEXT.match(/([b-k]{1,5}a){2}[b-k]{1,5}/i) && 
  !TEXT.match(/[b-f]{2}/i) && 
  !TEXT.match(/[g-k]{2}/i)
) {
  alertMsg.push("bcdef. ghijk- a区切りモールス");
}

// abcde. fghij- k区切りモールス
if (
  TEXT.match(/^[a-k]+$/i) && 
  TEXT.match(/[k]/i) && 
  !TEXT.match(/kk/i) && 
  !TEXT.match(/[a-j]{6}/i) && 
  TEXT.match(/([a-j]{1,5}k){2}[a-j]{1,5}/i) && 
  !TEXT.match(/[a-e]{2}/i) && 
  !TEXT.match(/[f-j]{2}/i)
) {
  alertMsg.push("abcde. fghij- k区切りモールス");
}

// navajo ナバホ族の言語を利用したコード置換
if (
  TEXT.match(/[a-z]/i) && 
  TEXT.length >=10 && 
  navajo(TEXT, 'check')
) {
  alertMsg.push("navajo ナバホ族の言語を利用したコード置換。(単語を3つ以上含んでいる)");
}


// List of Egyptian Major deities エジプト神
var tmp = EgyptianMajordeities(str);
if (tmp && tmp.length>=6) {
  alertMsg.push("<a href='#EgyptianMajorDeities'>「エジプト神」が複数含まれる</a><br>性別が男性・女性・両性の3種類に分かれる");
}



  // ===========
  if (alertMsg.length>0) {
    result.push("-----------------");
    result.push(str);
    for (var j in alertMsg) {
      alertMsg[j]="<span class='alert'>"
        +alertMsg[j]+"</span>";
    }
    result.push(alertMsg.join("\n"));
  }
  return result.join("\n");
}

// leet Keywordを返す
function leetKeyws() {
    var kwlist=[
  /*
  ["fire7", "forget", " 7→& 軍事用語 fire & forget"],
  ["311nt", "elint", "leet"],
  ["vi", "verum", "人名: Verum Inveniri"],
  ["vi", "Inveniri", "人名: Verum Inveniri"],
  ["mindsoul", "body", "glyphパターン"],
  ["u", "you", "1文字置き換え"],
  ["g", "gravity", "キーワード部一文字。頭文字が g > gravity"],
  ["0ut51d21", "outside", "leet> 0ut51d3 > outside"],
  ["zerout5oned2one", "outside", "leet> zerout5oned2one > 0ut51d21 > 0ut51d3 > outside"],
  ["\\.", "darsana", "darsana pointより"],
  ["point", "darsana", "darsana pointより"],
  ["c", "see", "同じ発音"],
  ["spoils", "kureze", "ことわざ「To the victor goes the spoils.」戦利品は勝利者のもの。からvictor→人名「victor kureze」"],
  ["wien", "acolyte", "Obsidian vienna (オーストリアのウィーン)配布メダルの人物 'The Acolyte'"],
  ["devoidofjoy", "interitus", "anomaly"],
  ["Pb", "lead", "元素記号Pb→鉛→lead"],
  ["voxgower", "clamantis", "ポエム Vox Clamantisより"],
  ["<", "less", "数学記号 < 'less than'"],
  ["bogdanovich", "devra", "人名 Devra Bogdanovich"],
  ["see", "c", "同じ発音"],
  ["us", "them", "反対語"],
  ["w", "worth", "glyph"],
  ["persepolis", "shonin", "前例あり。anomaly繋がり"],
  ["foodfor", "thought", "'food for thought' 思考の糧"],
  ["alien", "predator", "alien を対抗するpredatorに意味bash"],
  ["j0hn51", "johnsone", "leet"],
  ["v", "defendv", "グリフ変換"],
  ["Dalbysee", "Enoch", "musician Enoch Dalbyより"],
  ["Dalby", "Enoch", "musician Enoch Dalbyより"],
  ["anti", "magnus", "前例あり"],
  ["1iric", "oneiric", "前例あり"],
  ["zero", "cipher", "アラビア語でゼロの意味"],
  ["yellow", "blue", "前例あり"],
  ["-", "not", "前例あり"],
  ["young", "old", "反対語"],
  ["3cb371", "green", "Color #3cb371 Medium sea green"],
  ["isdead", "Jarvis", "is dead -> Roland Jarvis"],
  ["hulongtrans", "global", "関連企業 Hulong Transglobal社"],
  ["great", "magnus", "English → Latin (ラテン語) "],
  ["Oliver", "Wolfe", "人名 Oliver Lynton-Wolfe"],
  ["@", "search", "グリフの形"],
  ["Susanna", "Moyer", "登場人物 Susanna Moyer"],
  ["Izik", "Avinoam", "登場人物 Izik Avinoam"],
  ["calvin", "Ezekiel", "登場人物 Dr. Ezekiel Calvin"],
  ["roland", "jarvis", "登場人物 Roland Jarvis"],
  ["Ezekiel", "Calvin", "登場人物 Ezekiel Calvin"],
  ["stein", "lightman", "登場人物 Stein Lightman"],
  ["exagoge", "Ezekiel", "預言者エゼキエルと関連"],
  ["80860", "intel", "インテル i860プロセッサ"],
  ["IntelliJ", "IDEA", "Java IDE の一種"],
  ["jsx", "react", "プログラミング言語JSXより"],
  ["alorazon", "iqtech", "NianticProjectWikiより"],
  ["adetection", "algorithm", "a adetection algorithm (ADA)より"],
  ["hat", "chapeau", "フランス語へ"],
  ["glitchyben", "jackland", "glitchy ben から人名 Ben Jackland"],
  ["scannerapp", "ingress", "scanner app"],
  ["victor", "kureze", "人名 Victor Kureze"],
  ["farlowe", "hubert", "人名 Hubert Farlowe より"],
  ["verum", "inveniri", "人名 Verum Inveniri より"]
  ["pa","chapeau","登場人物"],
    ["Akira","Tsukasa","登場人物 Akira Tsukasa"],
  */



 ["k(50|L)[4A][6G][3E]?(50|L)[1i][3E]d","martin","Schäfers Klagelied > シューベルト作曲 >シューベルト繋がりで martin schubert"], 
 ["d[3E]c[3E]p[7T][1i][0o][Zn]","deception","leet"],
 ["Boca ?de ?Flon","deception","スペイン語で'Boca de Flon'と呼ばれる場所 → 'Deception Pass' https://en.wikipedia.org/wiki/Deception_Pass"],
 ["Visur ?(Technology)?","Visur Technology","ロシア人インターネット起業家イリヤ・ペヴソヴによって設立されたロシア系企業"],
 ["IQ ?Tech ?(Research)?","IQ Tech Research","防衛産業畑の米国企業でNIAと密接な関係を持つ"],
 ["hulong ?(Transglobal)?","Hulong Transglobal","正式名称：ヒューロン・トランスグローバル・インダストリーズ・コーポレーション 米国で教育を受けたキャサリン・ファン率いる中国系企業体"],
 ["acting ?hulong ?ceo","ni","Acting Hulong CEO → HULONG社のCEOはYuen Ni"],
 ["acting ?hulong ?ceo","yuen","Acting Hulong CEO → HULONG社のCEOはYuen Ni"],
 ["narrative ?manager","owen","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["narrative ?manager","ken","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["narrative ?management","owen","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["narrative ?management","ken","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["spin ?doctor","owen","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["spin ?doctor","ken","情報工作の専門家 → Kendra Owens → Ken Owen"], 
 ["(niantic ?)?calamity","Epiphany","Niantic Calamity(厄災) → Epiphany Night(啓示の夜)の事"], 
 ["c[4A][5s][5s][4A]ndr[4A]","cassandra","leet"],
 ["never ?believed","cassandra","預言者カサンドラはアポロンによって、誰からも信じられないという呪いを受けた"],
 ["bagrat ?regueni","simple","Bagrat Regueni → simple https://en.wikipedia.org/wiki/Bagrat_II_of_Iberia"],
 ["[7T][3E]chn[0o][1l][0o][6G]y","technology","leet"],
 ["r[3E][5S][1i]du[4A][1l]","residual","leet"],
 ["(diff(erence ?)?)?engine","ada","階差機関(差分機関)を発明したチャールズ・バベッジに学んだ世界初のプログラマーとされるAda Lovelaceから"],
 ["(diff(erence ?)?)?engine","augusta","階差機関(差分機関)を発明したチャールズ・バベッジに学んだ世界初のプログラマーとされるAda Lovelaceのフルネーム「Augusta Ada King, Countess of Lovelace ラブレース伯爵夫人オーガスタ・エイダ・キング」から"],
 ["576505181","ingress","iOSでのIngressアプリのID"],
 ["rush16.9","resist","Rushというバンドの16thアルバムの9曲目 = resist"],
 ["356 ?312","alexander","BC356 - BC312 → Alexander"],
 ["secret ?niantic ?agenda","ezekiel","Niantic計画に隠された意図 → エゼキエルカルビン博士が仕組んでいた"], 
 ["CHAMPAGNE ?BOTTLE ?POTENTIAL","higgs","higgs粒子の別名。ヒッグス粒子の場のポテンシャルがシャンパンボトルの底の形をしていることから。"],
 ["CHAMPAGNE ?BOTTLE ?POTENTIAL","boson","higgs粒子(higgs boson)の別名。ヒッグス粒子の場のポテンシャルがシャンパンボトルの底の形をしていることから。"],
 ["b00j2pjt8i","felicia","amazon b00j2pjt8i → Felicia Hajra-Lee"],
 ["b00j2pjt8i","hajra","amazon b00j2pjt8i → Felicia Hajra-Lee"],
 ["aprohias","spy","aprohias > Antonio Prohías > 漫画Spy vs. Spy for Madの作者"], 
 ["cagniard","siren","フランスの物理学者カニヤール・ド・ラ・トゥール（Cagniard de la Tour）によってサイレンが発明された。 cagniard >> siren"],  
 ["everywhere","visur","同義語 ubiqitous >> everywhere >> visur"],  
 ["ubiqitous","visur","同義語 ubiqitous >> everywhere >> visur"],  

 ["iamnotdead", "Jarvis", "i am not dead -> Roland Jarvis"],
 ["twentyfivemillionforonyx", "recharge", "2,500万XMでONYXメダル recharger"],
 ["jarvisshot", "zurich", "jarvisが撃たれた場所はチューリッヒ"],
 ["SYPHAXCYBELLA", "obsidius", "SYPHAXとCYBELLAとobsidiusの3人はTitusに会うことになっていた"],
 ["belongthespoil", "kureze", "諺「to the victor belong the spoils」よりVictor > 人名 Victor Kureze"],
 ["belongthespoil", "victor", "諺「to the victor belong the spoils」より"],
 ["epiphanynightcatalyst", "powercube", "epiphany night catalyst 啓示の夜のきっかけ"],
 ["deadnotami", "roland", "i am not dead から Roland Jarvis"],
 ["vaccinemaker", "devra", "vaccine maker (ワクチン製作者)は Devra Bogdanovich"],
 ["theimaginationofourselves", "dream", "事例あり"],
 ["Beautifulfriend", "end", "This is the end Beautiful friend で始まるDoorsのThe endという歌"],

["[1i]nq[4A]mu{1i}r[3E]","inqamuire","leet"],
["rtist","artist","同音"], 
["[1i][3m]pur[3E]","impure","leet"], 
["[zn][3E][3w]","new","leet"], 
["h[3E][7L1l][1i][0o][5s]","helios","leet"], 
["k[1i]r[7L1l][1i][4A]n","kirlian","leet"], 
["f[1i][nz][4A][7L1l][1i][7T]y","finality","leet"], ["wr[1i][7T][3E]","write","leet"], 
["r[3E][4A]d","read","leet"], 
["d[1i][3E]","die","leet"], 
["[8B6b]r[3E][4A][7T]h","breath","leet"], 
["[7Ll1][1i][5v][3E]","live","leet"], 
["d[4A]r[5s][4A]n[4A]","darsana","leet"], 
["[5s]cu[1l7L]p[7T]","sculpt","leet"], 
["h[0o][0o][1l7L][1l7L][4A]nd","holland","leet"], 
["[5s]h[4A]p[3E]r[5s]","shapers","leet"], 
["[5s]h[4A]p[3E]r","shaper","leet"], 
["c[4A][3m]p[8B6b][3E][7L1l][7L1l]","campbell","leet"], 
["[8B6b][4A][7T1l][4A]nc[3E]","balance","leet"], 
["p[3E]rf[3E]c[7T][1i][0o]n","perfection","leet"], 
["c[4A]rr[1i][3E]","carrie","leet"], 
["c[0o][7L1l][7L1l][3E]c[7T][1i][5v][3E]","collective","leet"], 
["n[2z][3E][3E]r","nzeer","leet"], 
["[3E][5v][0o][1l7L][5v][3E]","evolve","leet"], 
["c[4A]p[7T]ur[3E]","capture","leet"], 
["[5s][1i][6G9g][1i]n[7T]","sigint","leet"], 
["[1i][3m][1i]n[7T]","imint","leet"], 
["[1l7L][1i][8B][3E]r[4A][7T][3E]","liberate","leet"], 
["c[1l7L][4A][3m][4A]n[7T][1i][5s]","clamantis","leet"], 
["[7T][1i][3m][3E][2z][3E]r[0o]","timezero","leet"], 
["d[3E]c[3E]p[7T][1i][0o]n","deception","leet"], 
["00:00","timezero","関連"], 
["r[3E][7T]r[3E][4A][7T]","retreat","leet"], 
["[4A]d[5v][4A]nc[3E]","advance","leet"], 
["[9g6G]h[0o][5s][7T]","ghost","leet"], 
["[6b8B][0o]dy","body","leet"], 
["d[4A]r[2z][4A][1l7T][4A][5s]","darzalas","leet"], 
["[5s][1i][6G9g][1i]nt","sigint","leet"], 
["[1l7L][0o][5v][3E][1l7L][4A]c[3E]","lovelace","leet"], 
["[5s]h[0o]n[1i]n","shonin","leet"], 
["nu[3m][1i]n[0o]u[5s]","numinous","leet"], 
["ru[6b8B][1i]c[0o]n","rubicon","leet"], 
["[4A][6b8B][4A]dd[0o]n","abaddon","leet"], 
["ph[0o][7T][1i]n[7T]","photint","leet"], 
["[3E][9q]u[4A][1l7L]","equal","leet"], 
["[5v][4A]u[1l7T][7T]","vault","leet"], 
["f[3E][1l7L][1i]c[1i][4A]","felicia","leet"], 
["h[4A]r[3M]","harm","leet"], 
["pur[3E]","pure","leet"], 
["r[3E][5S][1i][5S][7T]","resist","leet"], 
["[5s][3E]n[5s][1i][7T][1i][5v][3E]","sensitive","leet"], 
["[5s][7T]ru[6G9g][6G9g][1l7L][3E]","struggle","leet"], 
["[8B][1l7L][4A]c[0o]p[5s]","blackops","leet"], 
["[3E](?:10|x)[0o][7T][1i]c","exotic","leet"], 
["domestic","exotic","意味bash"], 
["cr[3E][4A][7T][1i][5v][3E]","creative","leet"], 
["dull","creative","意味bash"], 
//["[B8][5S][5S]","855","leet"], 
["great ?old ?o?nes?","cthulhu","クトゥルフ神話の旧支配者"], 
["c[7L1l][4A]m[4A]n[7T][1i][5s]","clamantis","leet"], 
["cryp[7T][0o]","crypto","leet"], 
["c[7T]hu[7L1l]hu","cthulhu","leet"], 
["(?:John ?)?Gower","clamantis","'Vox Clamantis'の作者 John Gower"], 
["[4A][5s]p[1i]r[4A][7T][1i][0o]n","aspiration","leet"], 
["[9q]u[3E][5s][7T][1i][0o]n","question","leet"], 
["[6G9g]r[3E][3E]n","green","leet"], 
["[6b][7L1l]u[3E]","blue","leet"], 
["r[3E][4A]c[7T]","react","leet"], 
["pr[0o]n[0o][1i][4A]","pronoia","leet"], 
["j[4A]r[5v][1i][5s]","jarvis","leet"], 
["[4A]d[4A]","ada","leet"], 
["r[0o][7L][4A]nd","roland","leet"], 
["[5s][7T][4A]y","stay","leet"], 
["[4A]d[5v][4A]nc[3E]","advance","leet"], 
["j[0o]urn[3E]y","journey","leet"], 
["c[0o][5v][3E]rup","coverup","leet"], 
["h[0o]n[3E][5s][7T]y","honesty","leet"], 
["d[3E]f[3E]nd","defend","leet"], 
["[4A][7T][7T][4A]ck","attack","leet"], 
["d[4A]n[6G9g][3E]r","danger","leet"], 
["[6b][4A]rr[1i][E3]","barrie","leet"], 
["[3E]nd","end","leet"], 
["[1i]n[5v][3E]n[1i]r[1i]","inveniri","leet"], 
["[4A]d[5v][4A]n(?:100|c)[3E]","advance","leet"], 
["[7T][0o][9g][3E][7T]h[3E]r","together","leet"], 
["dr[3E][4A]m","dream","leet"], 
["n[0o][1i]r","noir","leet"], 
["[7L]u(?:10|x)","lux","leet"], 
["n[1i]","ni","leet"], 
["h[1i][6G][6G][5s]","higgs","leet"], 
["[6b][0o][5s][0o]n","boson","leet"], 
["[5v][1i][4A][17L]u(?:10|x)","vialux","leet"], 
["(?:100|c)[1i][5v][1i][17L][1i][5z][4A][7t][1i][0o]n","civilization","leet"], 
["n[4A][7T]ur[3E]","nature","leet"], 
["(?:100|c)[0o]n[7T]r[4A](?:100|c)[7T]","contract","leet"], 
["n[3E][5s][7T]","nest","leet"], 
["[4A][5s]p[1i]r[4A][7T][1i][0o]n","aspiration","leet"], 
["[9q]u[4A]n[7T]u(?:1000|m)","quantum","leet"], 
["[5s][7T][3E][1i]n","stein","leet"], 
["[5s][1i][6G]n[4A][1L]","signal","leet"], 
["[0o][6b][5s][1i]d[1i]u[5s]","obsidius","leet"], 
["noise","signal","意味bash"], 
["p[4A]r[7T][1i](?:100|c)[71l][3E]","particle","leet"], 
["w[4A][5v][3E]","wave","leet"], 
["[0o]p[3E]n","open","leet"], 
["[5s][7T][4A][7T][3E]","state","leet"], 
["h[3e]nry","henry","leet"], 
["m[4A][6G]nu[5s]","magnus","leet"], 
["[1l][3e][4a]d","lead","leet"], 
["f[0o][1l][1l][0o]w","follow","leet"], 
["[5s]h[4A]p[3E]d","shaped","leet"], 
["[1l]u[11][2z][1i]","luizi","leet"], 
["[1i]mpr[0o][5v][3e]","improve","leet"], 
["degrade","improve","意味bash"], 
["n[0o][5v][4A]","nova","leet"], 
["ry[6b][4A][7T]","rybat","leet"], 
["h[1i]d[3E]","hide","leet"], 
["533k","seek","leet"], 
["tt0074285","carrie","IMDb 映画キャリーより"],
["[7T][5S]uk[4A][5S][4A]","tsukasa","leet"],
["[4A]k[1i]R[4A]","akira","leet"],
["darkxm","xm","意味bash"],
["xm","darkxm","意味bash"],
["[4A][3M][0o]n[6G]u[5s]","amongus","leet"],
["[3E][1i]n[5s][7t][3E][1i]n","einstein","leet"],
["radium\s?1898","discovery","Pierre and Marie Curie (1898)"],
["[0o][86b][5s]cur[3e]d","obscured","leet"],
 ["[1i]mp[3E]rf[3e]c[7T]","imperfect","leet"],
  ["[3E]xp[1L][0o]r[3E]","explore","leet"],
  ["c[1l][0o][5s][3e]","open","意味bash"],
  ["jormung[7&]","jormungand ","and変換"],
  ["alex[7&]er","alexander ","and変換"],
  ["cass[7&]ra","cassandra ","and変換"],
  ["jackl[7&]","jackland ","and変換"],
  ["ab[7&]on","abandon ","and変換"],
  ["holl[7&]","holland ","and変換"],
  ["p[7&]ora","pandora ","and変換"],
  ["rol[7&]|1714117","roland ","and変換"],
  ["[3E]nl[1i][6G]h[7T][3E]n","enlighten","leet"],
  ["[3E]nl[1i][6G]h[7T][3E]n[3E]d","enlightened","leet"],
  ["r[3E][5S][1i][5S][7T]","resist","leet"],
  ["r[3E][5S][1i][5S][7T][4A]nc[3E]","resistance","leet"],

  ["combine","separate","意味bash"],
  ["MOVES ?3 ?HONINBO ?SHOWED","ghost","AlphaGo 本因坊"],
  ["nothing","all","意味bash"],
  ["[5s][1i][9g][1i](?:13|n)[7t]","sigint","leet+012abc"],
  ["[5s][1i][9g](?:13|n)[4a][1L]","signal","leet+012abc"],
  ["[5s][1i][9g](?:13|n)[5s]","signs","leet+012abc"],
  ["acceptance","denial","意味bash"],
  ["precursor","exogenous","関連"],
  ["pass","code","関連"],
  ["honesty","deception","意味bash"],
  ["D[3E]C[3E]P[7T][1I][0O]N","deception","leet"],
  ["M[3E][ZN][7T][4A][1L][1I][5VS]M","mentalism","leet"],
  ["100ern","cern","ローマ数字"],
  ["apart","together","意味bash"],
  ["[0O]P[3E]R[4A][7T][1I][5V][3E]","operative","leet"],
  ["confront","avoid","意味bash"],
  ["WQnh0diWkxk","ghost","youtube"],
  ["franken","stein","フランケンシュタイン"],
  ["terras ?astraea ?reliquit","titus","web検索"],
  ["pobednik","victor","ボスニア語「勝者」"],
  ["m[0o][1L][3e]","mole","leet"],
  ["i ?am ?not ?dead","roland","不死身のRoland Jarvis"],
  ["Worlds ?Enough","time","本 Worlds Enough & Time"],
  ["my ?only ?friend","end","doorsの曲「The End」の歌詞から"],
  ["veruminvenirisur","visur","vi+sur"],
  ["subject ?28","akira","大友克洋のAKIRAより"],
  ["[1L][0o][5s][5s]","loss","leet"],
  ["smiles","kodama","登場人物 Kodama Smiles"],
  ["[1i][5s][0o][6b]r[0o]n[7t]","isobront","leet"],
  ["spacthtime","spacetime","homonym"],
  ["(?:the ?)?Explorer",'Hank Johnson',"13アーキタイプ"],
  ["(?:the ?)?Dreamer",'Misty Hannah',"13アーキタイプ"],
  ["(?:the ?)?Alchemist",'Victor Kureze',"13アーキタイプ"],
  ["(?:the ?)?Humanist",'Yuri Nagassa',"13アーキタイプ"],
  ["(?:the ?)?Spiritualist",'Roland Jarvis',"13アーキタイプ"],
  ["(?:the ?)?Omniscient",'ADA',"13アーキタイプ"],
  ["(?:the ?)?Interpreter",'Stein Lightman',"13アーキタイプ"],
  ["(?:the ?)?Trickster",'Oliver Lynton-Wolfe',"13アーキタイプ"],
  ["(?:the ?)?Skeptic",'Martin Schubert',"13アーキタイプ"],
  ["(?:the ?)?Listener",'Enoch Dalby',"13アーキタイプ"],
  ["(?:the ?)?Visionary",'Carrie Campbell',"13アーキタイプ"],
  ["(?:the ?)?Patron",'Ezekiel “Zeke” Calvin',"13アーキタイプ"],
  ["(?:the ?)?Catalyst",'Devra Bogdanovich',"13アーキタイプ"],
  ["hungry ?like ?the","wolfe","曲 Hungry Like The Wolf"],
  ["wolf","wolfe","同音"],
  ["[1L][3E][5S][5S]", "less", "leet"],
  ["[5S][0o]u[1L]", "soul", "leet"],
  ["wright","write","同音異義語"],
  ["rite","write","同音異義語"],
  ["right","write","同音異義語"],
  ["slavorum ?rex","henry","web検索"],
  ["[1i]n[9g]r[3e][5s][5s]","ingress","leet"],
  ["exit","ingress","意味bash"],
  ["[1i]n[5v][3E]n[1i]r[1i]","inveniri","leet"],
  ["light","dark","意味bash"],
  ["crater","luizi","Luizi crater"],
  ["S[/ ]?1980[. ]?S ?26","pandora","土星の衛星パンドラ"],
  ["expand","contract","意味bash"],
  ["[1L][0o][5v][3e][1L][4a](?:100|c)[3e]","lovelace","leet"],
  ["intellij","idea","web検索"],
  ["000[\- ]?28VS","martin","ギターの型番"],
  ["Great ?Old ?(?:1|Ones?)","cthulhu","旧き者達"],
  ["an ?iliad ?of ?woes","ANATHEMA","web検索"],
  ["cowardice","fear","類義語"],
  ["(?:the ?)?scout","obsidius","obsidiusはtitusの斥候"],
  ["ghost ?artist","tycho","関連"],
  ["woolf","wolfe","同音"],
  ["shut","open","対義語"],
  ["albert","einstein","人名 アインシュタイン Albert Einstein"],
  ["iskar ?zaqiqu","dream","web検索"],
  ["park","bletchley","bletchley park"],
  ["kthulhu","cthulhu","homonym 同音異字"],
  ["(?:1|one|[0o]n[3e])[1i]r[1i]c", "oneiric", "leet"],
  ["66000741","danger","web検索 danger cave"],
  ["tactical","strategic","対義語 戦術と戦略"],
  ["artefact","artifact","同義語"],
  ["artifakt","artifact","同音"],
  ["2001-?006b","DESTINY","人工衛星の名前"],
  ["join","separate","反対語"],
  ["foggys?","misty","類義語"],
  ["\b90091","googlechrome://goo.gl/","leet"],
  ["bifid","cipher","関連"],
  ["local","global","反対語"],
  ["[5v][1i][5s]ur","visur","leet"],
  ["empire","rebel","帝国軍<>反乱軍"],
  ["[5v][3E]R[1I][7T][4A][5S]","veritas","leet"],
  ["[0o]u[7t][5s][1i]d[3e]","outside","leet"],
  ["[1L][0o][5s][3e]","lose","leet"],
  ["[5s][4a][5v][3e]","save","leet"],
  ["khaos","chaos","ギリシャ語"],
  ["temple","body","関連"],
  ["R[3E][5S][7T]R[4A][1I]N[7T]","restraint","leet"],
  ["long ?(?:&|and) ?prosper","live","Mr.spock"],
  ["nowhere ?ks","courage","漫画の中の町"],
  ["p[0o]t[3e]nt[1i][4a][7l]","potential","leet"],
  ["POTIDAEA","Cassandra","古代都市名"],["speedtime","distance","speed=time×distance"],
  ["4virgates","hide","単位"],
  ["dzire","desire","雰囲気"],
  ["myosotis","forget","forget-me-not(勿忘草)の学名"],
  ["prrfktshnn","perfection","雰囲気?"],
  ["79843","Marfa","web検索"],
  ["stone","shonin","関連"],
  ["liveagain","reincarnate","グリフ同形"],
  ["H[0o][1L][1L][4A]ND","holland","leet"],
  ["pr[0o]f[1i][7L][3e]","profile","leet"],
  ["0226481123","lightman","ISBN"],
  ["lgeczmp","congo","web検索"],
  ["nothing ?injure ?will ?tom ?poor","bedlam","web検索"],
  ["3links","field","control field"],
  ["[5S][3E]N[5S][1I]T[1I][5v][3E]","sensitive","leet"],
  ["no2011134280","Ezekiel","アメリカ議会図書館の管理番号?"],
  ["Zeke","Ezekiel","愛称"],
  ["5au50t","vault","leet"],
  ["5er1ty","verity","leet"],
  ["scanner","ingress","関連"],
  ["great", "magnus", "ラテン語"],
  ["subject[2][8]","akira","web検索"],
  ["5ucc355","success","leet"],
  ["9781626361737","discover","図書コード?"],
  ["BLKOPS","blackops","略"],
  ["\\\?dah","whydah","? → why"],
  ["7k8","martin","空港コード"],
  ["35c4p3","escape","leet"],
  ["\\.?50\\.?0\\.?100\\.?1\\.?","loci","ローマ数字"],
  ["stipulatio","contract","ローマ法の契約"],
  ["5015e","live","ローマ数字 50→L"],
  ["ohm","mantra","ヨガ用語でmantra"],
  ["omega","mantra","ヨガ用語でmantra"],
  ["मन्त्र","mantra","サンスクリット語"],
  ["1938XE","aura","小惑星 Asteroid 1488 Aura (1938 XE)"],
  ["abdn","abaddon","略"],
  ["दर्शन","darsana","サンスクリット語"],
  ["philosophy","darsana","哲学"],
  ["nc205y","alexander","alexander航空所有の機体ナンバー"],
  ["eroteme","question","eroteme = question mark"],
  ["tarboosh","fez","トルコ帽(fez)の別名"],
  ["spoils","kureze","登場人物"],
  ["thirteen","magnus","13magnus"],
  ["GIST","googlechrome://gist.github.com/anonymous/",""],
  ["KiflShrine","ezekiel","関連"],
  ["ezechiel","ezekiel","同義"],
  ["ancientseer","cybella","ancient seer (預言者) oracle > cybella"],
  ["a-a","ada",""],
  ["int3l","intel","leet"],
  ["d3vra","devra","leet"],
  ["N1GhTM4R3","dream","leet & 関連語"],
  ["akolouthos","Acolyte","ギリシャ語よみ"],
  ["bhoot","ghost","インドのホラー映画(英名ghost)"],
  ["62fb5d750c30a27a26d01c5f3d8df459","oneiric","Ubuntu 11.10 Oneiric Ocelot isoイメージのMD5 hash"],
  ["[3e][5v][0o][1L][5v][3e]","evolve","leet"],
  ["GilfKebir","barrier","別名the Great Barrier"],
  ["JilfalKabir","barrier","別名the Great Barrier"],
  ["c0v3rup","coverup","leet"],
  ["nearhigh","farlowe","意味bash near high <> far low"],
  ["DaBaDee","Blue","Eiffel 65 のデビュー曲"],
  ["night","epiphany","epiphany night (啓示の夜)"],
  ["000000DEV","blackdev","#000000 > black"],
  ["c011ap53","collapse","leet"],
  ["j0hn50n","johnson","leet"],
  ["B0117ZVZBY","Hajra","The Niantic Project: Ingress 図書コード ASIN: B0117ZVZBY 著者 Felicia Hajra-Lee"],
  ["Oliver","Wolfe","登場人物 Oliver Lynton-Wolfe"],
  ["Lynton","Wolfe","登場人物 Oliver Lynton-Wolfe"],
  ["Jay","Phillips","登場人物 Jay Phillips"],
  ["Bowles","Henry","登場人物 Henry Bowles"],
  ["Bogdanovich","Devra","登場人物 Devra Bogdanovich"],
  ["Seke","Verity","登場人物 Verity Seke"],
  ["Thomas","Greanias","登場人物 Thomas Greanias"],
  ["Nigel","Moyer","登場人物 Nigel Moyer (Susanna Moyerの父)"],
  ["kinetic","potential","対グリフ 運動エネルギー<>位置エネルギー"],
  ["Lee","Hajra","登場人物 Felicia Hajra-Lee"],
  ["3XP10R3R","EXPLORER","Leet"],
  ["eskiskisepje","skepsis","skepsisの別名？"],
  ["witness","shonin","witness > 証人"],
  ["atbash","cipher","暗号方法"],
  ["helenus","Cassandra","ギリシャ神話の予言者ヘレノスと双子の兄妹カサンドラ"], ["rong","write","rong>wrong<>right<write (同音異義語&意味bash)"],
  ["TainEnabran","obsidian","STAR TREK 登場人物"],
  ["j4r51s","jarvis","leet"],
  ["energy","matter","energy ⇔ matter(物質)"],
  ["gluonplasma","quark","Quark-Gluon Plasma, QGP"],
  ["destoneny","destiny","one → i"],
  ["rcrsn","recursion","rcrsn → recursion"],
  ["loeb","richard","登場人物 Richard Loeb"],
  ["nikolaital","matter","nikolaitalはThe Matter Valleyの別名"],
  ["Role","alignment","net検索で出てくる"],
  ["g43.1","aura","net検索で「G43.1 Migraine with aura」出てくる"],
  ["mork","mindy","コメディ番組 mork&mindy"],
  ["ASTERION","minotaur","ミノタウロスの名前"],
  ["ofCrows","murder","A Murder of Crows"],
  ["dnargeuguf","13","弦楽四重奏曲第13番「巨大なフーガ」"],
  ["ayze1863","mole","フランスの標高1863mの山'Le Môle'"],
  ["youonstuck","failure","Fantastic Planetのアルバム'failure'の15曲目'stuck on you'"],
  ["stuckonyou","failure","Fantastic Planetのアルバム'failure'の15曲目"],
  ["then","now","熟語 now and than"],
  ["61DZC-60x20","journey","googlechrome://youtu.be/61DZC-60x20"],
  ["576505181","ingress","iOS Ingress app ID: 576505181"],
  ["7306050","more","検索>more on Vimeo"],
  ["springdwindle", "collapse", "Colony Collapse Disorder"],
  ["herm1204","mole","model No. herm1204 > Hernan Mole Poblano"],
  ["fire7", "forget", "fire & forget"],
  ["j0hn51", "johnsone", "leet"],
  ["311nt", "elint", "leet"]
  ];
  kwlist.sort(function(a,b){
    if( a[0].length > b[0].length) return -1;
    if( a[0].length < b[0].length) return 1;
    return 0;
  });
  return kwlist;
}

// Keyword配列を返す
function getKeyws() {
//  var kwlist ="13magnus|3rdlaw|802|855|abaddon|abandon|absent|accept|acolyte|ada|adapt|advance|afram|after|again|agent|alaric|alexander|algorithm|alignment|all|amongus|answer|antimagnus|artifact|artist|aspiration|attack|augusta|aura|auras|avoid|balance|barrier|bedlam|before|begin|being|ben|blackdev|blackops|bletchley|blue|body|boson|bowstring|brainwave|breathe|byron|calibration|calvin|campbell|capture|carrie|carroll|cassandra|cathexis|cern|change|chaos|chaotic|chapeau|chase|cipher|city|civilization|clamantis|clamatis|clarke|clear|close|code|cold|collapse|collective|comint|complex|condensate|conflict|congo|consequence|conspiracy|conspire|construct|contemplate|contract|control|cooper|cortex|courage|covcom|coverup|create|creation|creative|creativity|crypto|cube|cybella|dalby|danger|dark|darkmatter|darkxm|darsana|data|deaddrop|deceit|deception|defend|dejavu|denial|desire|destination|destiny|destroy|destruction|detection|deteriorate|devra|die|difficult|discover|discovery|disorder|distance|doorway|draw|dream|drone|easy|einstein|elint|end|enigma|enlighten|enlightened|enlightenment|enoch|epiphany|equal|erode|escape|evolution|evolve|exotic|explore|explorer|extremis|ezekiel|failure|farlowe|fear|felicia|field|finality|follow|force|forget|forward|function|future|gain|geneva|ghost|global|gluon|glyph|glyphs|government|gravity|greanias|green|grid|grow|hajra|hank|hannah|harm|harmony|have|helios|help|henry|hidden|hide|higgs|holland|hozho|hubert|hubris|hulong|human|hunch|hyper|i|idea|ignore|imint|imperfect|improve|impure|individual|ingress|ingression|initio|inside|inspiration|inspire|intel|intelligence|intelligent|interitus|interrupt|inveniri|iqtech|isobront|ispirare|jabberwocky|jackland|jahan|jarvis|johnson|journey|kalpa|ken|kirlian|klue|knowledge|kureze|lead|legacy|less|liberate|lie|life|lightman|link|live|loci|lose|loss|lovelace|luizi|magic|magnus|mantra|marfa|martin|matter|me|meisner|meissner|mentalism|message|meta|microdot|mind|minotaur|mirror|misty|mkoften|mkultra|modify|mole|monopole|more|moyer|muon|murder|myriad|mystery|mystic|nagassa|nature|nemesis|nest|neural|new|ni|niantic|no|not|nourish|now|numinous|nzeer|obscured|obsidius|obstacle|old|oneiric|open|opening|operative|ordered|osiris|other|outside|owen|paint|pandora|parasite|particle|past|path|pattern|peace|perfection|persepolis|perspective|phillips|photint|plasma|pmc|portal|portals|potential|power|powercube|predator|presence|present|presquevu|profile|progress|progression|pronoia|pure|purity|pursue|puzzle|quanta|quantum|quark|quasi|question|react|rebel|recharge|recursion|reduce|reincarnate|relative|relativity|repair|repeat|report|rescue|residual|resist|resistance|resonance|resonate|restraint|retreat|richard|roland|rubicon|rybat|safety|samsara|save|schubert|sculpt|sculpture|se|search|secrets|see|seek|self|sensitive|sensitives|separate|shape|shaped|shaper|shapers|shard|share|shell|shonin|sigint|signal|signs|simple|sirens|sitrep|skepsis|soul|space|spacetime|spirit|spooky|spy|squid|stability|statue|stay|stein|strategic|strong|structure|struggle|substitute|substitution|substrate|success|susanna|symbol|symbols|syphax|technology|tenniel|them|thought|time|timezero|together|transpose|transposition|truth|turing|tycho|tyro|ultra|umbra|unbounded|urban|urbdrone|us|use|verum|vi|victor|victory|visur|voynich|want|war|wave|we|weak|whydah|win|wolfe|worth|write|xm|yantra|yeats|you|your|yuen|yuri|zurich".split("|");
  var kwlist=`13magnus|3rdlaw|802|855|abaddon|abandon|absent|accept|acolyte|ada
  adapt|advance|afram|after|again|agent|alaric|alexander|algorithm|alignment
  all|amongus|answer|antimagnus|artifact|artist|aspiration|attack|augusta|aura
  auras|avoid|balance|barrier|bedlam|before|begin|being|ben|blackdev
  blackops|bletchley|blue|body|boson|bowstring|brainwave|breathe|byron|calibration
  calvin|campbell|capture|carrie|carroll|cassandra|cathexis|cern|change|chaos
  chaotic|chapeau|chase|cipher|city|civilization|clamantis|clamatis|clarke|clear
  close|code|cold|collapse|collective|comint|complex|condensate|conflict|congo
  consequence|conspiracy|conspire|construct|contemplate|contract|control|cooper|cortex|courage
  covcom|coverup|create|creation|creative|creativity|crypto|cube|cybella|dalby
  danger|dark|darkmatter|darkxm|darsana|data|deaddrop|deceit|deception|defend
  dejavu|denial|desire|destination|destiny|destroy|destruction|detection|deteriorate|devra
  die|difficult|discover|discovery|disorder|distance|doorway|draw|dream|drone
  easy|einstein|elint|end|enigma|enlighten|enlightened|enlightenment|enoch|epiphany
  equal|erode|escape|evolution|evolve|exotic|explore|explorer|extremis|ezekiel
  failure|farlowe|fear|felicia|field|finality|follow|force|forget|forward
  function|future|gain|geneva|ghost|global|gluon|glyph|glyphs|government
  gravity|greanias|green|grid|grow|hajra|hank|hannah|harm|harmony
  have|helios|help|henry|hidden|hide|higgs|holland|hozho|hubert
  hubris|hulong|human|hunch|hyper|i|idea|ignore|imint|imperfect
  improve|impure|individual|ingress|ingression|initio|inside|inspiration|inspire|intel
  intelligence|intelligent|interitus|interrupt|inveniri|iqtech|isobront|ispirare|jabberwocky|jackland
  jahan|jarvis|johnson|journey|kalpa|ken|kirlian|klue|knowledge|kureze
  lead|legacy|less|liberate|lie|life|lightman|link|live|loci
  lose|loss|lovelace|luizi|magic|magnus|mantra|marfa|martin|matter
  me|meisner|meissner|mentalism|message|meta|microdot|mind|minotaur|mirror
  misty|mkoften|mkultra|modify|mole|monopole|more|moyer|muon|murder
  mystery|mystic|nagassa|nature|nemesis|nest|neural|new|ni|niantic
  no|not|nourish|now|numinous|nzeer|obscured|obsidius|obstacle|old
  oneiric|open|opening|operative|ordered|other|outside|owen|paint|pandora
  parasite|particle|past|path|pattern|peace|perfection|persepolis|perspective|phillips
  photint|plasma|pmc|portal|portals|potential|power|powercube|predator|presence
  present|presquevu|profile|progress|progression|pronoia|pure|purity|pursue|puzzle
  quanta|quantum|quark|quasi|question|react|rebel|recharge|recursion|reduce
  reincarnate|relative|relativity|repair|repeat|report|rescue|residual|resist|resistance
  resonance|resonate|restraint|retreat|richard|roland|rubicon|rybat|safety|samsara
  save|schubert|sculpt|sculpture|se|search|secrets|see|seek|self
  sensitive|sensitives|separate|shape|shaped|shaper|shapers|shard|share|shell
  shonin|sigint|signal|signs|simple|sirens|sitrep|skepsis|soul|space
  spacetime|spirit|spooky|spy|squid|stability|statue|stay|stein|strategic
  strong|structure|struggle|substitute|substitution|substrate|success|susanna|symbol|symbols
  syphax|technology|tenniel|them|thought|time|timezero|together|transpose|transposition
  truth|turing|tycho|tyro|ultra|unbounded|urban|urbdrone|us|use|vault|verum|vi(?!f)|victor|victory|visur|voynich|want|war|wave|we
  weak|whydah|win|wolfe|worth|write|xm|yantra|yeats|you
  your|yuen|yuri|zurich`.replace(/\s*\n\s*/g, "|").split("|");
  var addkw=[];
  addkw.push("veritas"); //2016-04-09
  addkw.push("obsidian"); //2016-04-18
  addkw.push("katelena"); //2016-04-19
  addkw.push("titus"); //2016-05-16
  addkw.push("ai"); //2016/06/01
  addkw.push("verity"); //2016/06/06
  addkw.push("mille"); //2016/06/
  addkw.push("vadosity"); //2016/06/
  addkw.push("unknown"); //2016/06/
  addkw.push("tsukasa"); //2016/07/25
  addkw.push("aegis"); //2016/11/06
  addkw.push("akira"); //2016/11/14
  addkw.push("noir"); //2016/11/27
  addkw.push("aegisnova"); //2016/12/08
  addkw.push("vialux"); //勝手に追加
  addkw.push("vianoir"); //勝手に追加
  addkw.push("lux"); //勝手に追加
  addkw.push("jormungand"); //2017/01/14
  addkw.push("kodama"); //2017/01/20
  addkw.push("nova"); //2017/02/01
  addkw.push("cthulhu"); //2017/03/11
  addkw.push("tecthulhu"); //勝手追加
  addkw.push("oxilium"); //勝手に追加
  addkw.push("tectulu"); //勝手追加
  addkw.push("exogenous"); //勝手追加
  addkw.push("endogenous"); //勝手追加
  addkw.push("reawaken"); //勝手追加
  addkw.push("darzalas"); //勝手追加 2018/03/31
  addkw.push("chimera"); //勝手追加 2018/03/31
  addkw.push("prime"); //追加 2018/07/28 cassandra prime
  addkw.push("osiris"); //勝手追加 2019/05/28
  addkw.push("myriad"); //勝手追加 2019/05/28
  addkw.push("umbra"); //勝手追加 2019/05/28
  addkw.push("nemesis"); //勝手追加 2019/06/20
  addkw.push("sculpture"); //使用された 2020/01/29
  addkw.push("forge"); //使用された 2020/10
  addkw.push("tabularasa"); //勝手追加 2020/10/24
  addkw.push("(eos)?protocol"); //勝手追加 2020/10/24

  addkw.push("cologne"); //一回きりかも2016/07/25
  addkw.push("singapore"); //一回きりかも2016/07/25
  addkw.push("denver"); //一回きりかも2016/07/25
  addkw.push("NicolasFlame"); //一回きりかも2020/02/10
  addkw.push("inqamuire"); //一回きりかも2020/02/17

  addkw.push("sustain"); //候補
  Array.prototype.push.apply(
    kwlist, addkw);
  kwlist.sort(function(a,b){
    if( a.length > b.length) return -1;
    if( a.length < b.length) return 1;
    return 0;
  });

  return kwlist;
}

//JoJo's WotD キーワード 1000回分
function addKeywsJoJo() {
  // var kwlist="NONPARTISAN|PERVICACIOUS|PURBLIND|PERMILLE|CONVIVIAL|TRANSMOGRIFY|CRACKERJACK|MICHE|CRESCENDO|REMONTER|VERDURE|HUGGERMUGGER|APPROBATION|IDIOSYNCRASY|toutafait|APAURUSHEYA|HYPOTHECATION|BASTION|ESCUTCHEON|SOCKDOLAGER|GEGENSCHEIN|CAMORRA|AMANUENSIS|FURPHY|TRANCHE|STOLID|DARKPATTERN|ZELOPHOBIA|YODACONDITION|XEROSIS|WANTAWAY|VENERATE|URTEXT|TROMOS|SOMATICIZE|REMORA|QUINCUNX|PSITTACISM|OPUSCULE|NONPAREIL|MEPHITIC|LARRUPING|KVELL|JOUROUVERT|INIMICAL|HAAT|GEDANKENVERSUCH|FLIVVER|DACKER|EUDEMONIC|CLYPEATE|BLAZON|APPURTENANCE|INTUMESCE|ORGULOUS|LEITMOTIV|STHENIC|ERISTICAL|BOUSTROPHEDON|PROJECTDIANA|GAPESEED|SUBREPTION|IRENIC|ELAN|INVETERATE|ANTANAGOGE|DEASIL|PRIVATION|VORAGINOUS|FRABJOUS|NOEGENESIS|UBIQUE|HOIPOLLOI|BOOTSTORM|HIE|FOSSICK|MENDASCIOUSNESS|SOLUS|PETRICHOR|ENSORCELL|PALLIATE|PRISONERSCINEMA|SCHEERERSPHENOMENON|PHOSPHENE|HAIDINGERSBRUSH|ENTOPTICPHENOMENON|DECLENSION|WELTSCHMERZ|CONSTATIVE|MOIL|TALLTALE|RODOMONTADE|CHIPSANDSALSA|ENNEAGRAM|SOPHROSYNE|CENA|OBNUBILATE|PROPENSITY|KENSPECKLE|joiedevivre|QUALE|RENASCENT|CALLIGRAM|EPISTEMIC|AMARANTHINE|AMBIGRAM|CONFLATE|LIMINA|LUDIC|DUENDE|THERIAC|SPREZZATURA|APOCOPE|SKOOKUM|CONTRETEMPS|COMMODIOUS|ESPRITDECORPS|BOULWARISM|EGGOFCOLUMBUS|MORTONSFORK|HOBSONSCHOICE|TRUCHMAN|BISSEXTUS|COCKAIGNE|DEMOTIC|UNNOTICED|HALE|DEUTEROGENESIS|PARAPRAXIS|GLOBBING|PASSEL|TANTIVY|COGNOSCENTI|AUTODIDACT|ADROIT|ETESIAN|HESTERNAL|OBVERSE|MARMOREAL|ADDISONIAN|AEONIAN|RESCRIPT|INSOUCIANT|REIFY|DESIDERATUM|PROVENANCE|INTERPELLATE|DIEL|CUPERTINOEFFECT|UNCO|SPRACHGEFUHL|ERRORCORRECTING|OBSTREPEROUS|INDUCEMENT|ZEUGMA|BLOVIATE|SEDULOUS|AUTOLYCAN|GRAVITATE|THEW|SANSCULOTTE|DEKKO|BACKRONYM|LIMN|CATFISH|SPECULATORES|ALPHANUMERISH|RETICENCE|GARRISONFINISH|TOKENIZATION|DROPPERVIRUS|EXPLORATORES|DROSS|ASCESIS|NOMOPHOBIA|COADUNATE|BOGART|CHRESTOMATHY|DIRIMENT|INTROMIT|HOTADD|ANNUSMIRABILIS|INTERWREATHE|MITTIMUS|ULTIMATHULE|KARNAUGHMAPPING|FAVONIAN|IMMANENT|MUNIFICENT|QUOZ|PINCHBECK|CONDIGN|INVIDIOUS|GORDIANKNOT|PERPETUITY|FARRAGO|SUSPIRATION|MACROBIAN|POLLENT|DARKDATA|GRATULATE|NEPHELOID|THRESHOLDEFFECT|FIVENINES|objettrouve|PALMARY|JACKLEG|LATERAD|EQUANIMITY|EGRESSFILTERING|GRAMARYE|PARAGON|PICAYUNE|CHIRAL|SINEDIE|LENITY|MINATORY|VIVIFIC|ESPERANCE|SOLIPSISM|NIDIFICE|FULSOME|ESEMPLASTIC|PERIPETEIA|RULY|VILIPEND|INVIOLABLE|SINECURE|DECESSION|QUODLIBETAL|IMBROGLIO|ADVENTIOUS|NARRISCHKEIT|KLUDGE|DITHYRAMB|RAMIFORM|ANODYNE|BUBBLEMEMORY|DELECTATION|SHADOWASPECT|BLINDDROP|PROBITY|ORTHOGONALITYTHESIS|ZOMBIECOMPUTER|SNEAKERNET|PORTING|KILLERAPPLICATION|TACENT|DEREZZED|LOREMIPSUM|CACHEDOUT|MANQUE|FIZMER|EPRPARADOX|PROLEGOMENON|HOGENMOGEN|RAVEL|CHARY|AMBIT|RESUMPTIVE|TURINGEQUIVALENCE|ANALYTICALENGINE|FUGACIOUS|CONSTELLATE|OMNEITY|EMBED|DEBOUCH|EQUIPOLLENT|UMBRIFEROUS|TAKEOFFLINE|EDITORWAR|LETHEAN|UNCEASING|HESTERNOPOTHIA|XENOGENOUS|EAGRE|CUTOUT|HOSTILETAKEOVER|METANOIA|INCALESCENT|SANKOFA|SCISSION|MOTJUSTE|MENSREA|LICIT|ACCISMUS|ALLOCHTHONOUS|FURCATE|UBIETY|MANDELAEFFECT|DORYPHORE|YCLEPT|SCRIPTKIDDIE|ALEATORY|RECONDITE|QUINTESSENCE|INTERLOCUTOR|HEBETUDINOUS|SOFTWAREROT|PSYCHONAUTICS|BELIE|SIGNIFICANTWHITESPACE|PERDITION|QUANTUMINFORMATION|ONUS|CODESMELL|CHURLISH|HAPTICS|ATHWART|FLORID|TURNAROUND|WANZE|EFFICACIOUS|EQUIVOCATION|PRORATA|POIESIS|ALIA|CAJOLERY|PUGNACIOUS|KISMET|MOIRAI|SHIKATAGANAI|ACCLUMSID|NEQUIENT|SCIOLISM|42|VERIDICALPARADOX|PIGEONHOLEPRINCIPLE|DYSPHEMISM|UNKNOWN|BOOMLET|MONITION|IMPEDIMENTA|IANTHINE|SALUBRIOUS|VAUNTAGE|GEHANNA|BAEDEKER|RETICULOSE|MALISON|Casusbelli|SNOWCLONE|SUPERANNUATED|ASSUAGE|MASONICCIPHER|PANEGOISM|DUPLICITOUS|FAINEANT|FAITACCOMPLI|RADIUSOFACTION|PREDORMITUM|EIGENGRAU|BAILIWICK|CULMEN|ATTENUATION|MARPAT|PHONEMES|CRYPSIS|VOLITIENT|DAGGLE|DAPOCAGINOUS|SWEVEN|SOMATIC|FORSWUNKE|FARDEL|CONNATE|CALVINBALL|UMBRELLATERM|ZEROSUMGAME|LUDOLOGY|LUDIBRIUM|WARGAMES|BOARDGAME|OPPUGN|ANFRACTUOUS|HENT|WHATABOUTS|KAIROS|NOVIKOVPRINCIPLE|REPETITIONPRIMING|TENEBROUS|PSYCHONOMICS|METAMEMORY|IPSATIVE|PECKHAMIANMIMICRY|TRANSACTIVEMEMORY|MNEMOTECHNICS|MALAFIDE|BACKSTOP|JABBLE|PURLIEUS|REDE|EXPISCATE|HAINT|OBSEQUIOUS|ASPERITY|SOIDISANT|METIER|BETENOIRE|BELLWETHER|DERIGUEUR|LYGOPHOBIA|GEMATRIA|WANCHANCY|MIRD|OPSIMATH|ESPOUSE|MELIORISM|EDIFY|JEREMIAD|PERCEPTRON|ADDITIONALITY|HEIMISCH|PRISCAN|ECLAIRCISSEMENT|BROOKSLAW|OBRUMPENT|PERCEPTIONALISM|FUTILITARIAN|Bekanntheitsgefuhl|IGNESCENT|NOCICEPTION|EXTRACORPOREAL|CHIRANJIVI|SAPROGENIC|ANOGENIC|MULTIFRACTALS|VERNEINUNG|ETHERIC|KAINOTOPHOBIA|ACROPHASE|BATHYPHASE|CHRONOBIOLOGY|BINKABI|FAWOHODIE|UNIVERSALQUANTIFICATION|MMEREDANE|HAMSA|THANATOPHOBIA|WYRD|LONGANIMITY|FLATHATTING|ANSIBLE|ANOMIE|HABCAT|ECDEMIC|FRANGIBLE|BRONTIDE|OSTENIFEROUS|WELTER|INFANDOUS|HAMARTIA|ENANTIODROMIA|POPQUIZ|OPENINGACTS|DERRICKRAVENS|NONSEQUITUR|LINGUAFRANCA|TYRIANPURPLE|SERVERRACK|MESMERIZING|NONSUMQUALISERAM|NULLATENACIINVIAESTVIA|NONPROGREDIESTREGREDI|BRUTUMFULMEN|IGNOTUMPERIGNOTIUS|AURIBUSTENEOLUPUM|CALLOW|FLANEUR|TUTELARY|EPANORTHOSIS|RECENSE|PARAMNESIA|HIRF|DETENTE|AJFADEAWAY|MAIEUTIC|PERAGRATE|GALERE|FACTOTUM|EXTRAMUNDANE|INTERTESSELATION|DEJAVECU|OBELIZE|DYBBUK|BURNBAG|PARASTATAL|COUPdeTHEATRE|NATUSNEMO|PERCONTRA|ADJUDICATE|SCELESTIC|CRYPTONYM|FRANGERE|CHEVISANCE|VATIC|NASCENT|PALTER|SYNALLAGMATIC|MISQUEME|ABY|INCOMMUNICADO|COMPORTMENT|SOLICITUDE|PLENARY|LOKA|RECRUDESCENCE|EXORDIUM|DECURTATE|PUSILLANIMOUS|AUTOSCHEDIASTIC|KYRIE|HOSPITIUM|DOLOROSA|GADFLY|OSCULANT|VADOSITY|SCABROUS|CACHEXIC|FALLACILOQUENCE|DUAC|SARCINARIOUS|NOVATURIENT|PANGRAM|QUOTIDIAN|TENEBRIFIC|ENTERMETE|MYTHOMANE|PERICULOUS|WROX|OBEDIBLE|LYSIGENIC|EBULLITION|MUNDATION|HIEMAL|COPENHAGENINTERPRETATION|MODULATION|IGNIPAROUS|OPPUGNANT|ABROGATE|SEMPITERNAL|MASKIROVKA|STONETHECROWS|CLISHMACLAVER|KALACHAKRA|CREPUSCULAR|PRETERMISSION|HOROLOGY|APOSIOPESIS|PEISE|SUPERVENIENT|HYPOCORISM|ANANYM|VOCIFERATE|SUSURRATION|EPICENTER|PUNCTILIOUS|ILLECEBROUS|BOUBAKIKIEFFECT|ENTRISM|DRAWCANSIR|CATSCRADLE|INFICETE|VAGARIOUS|INTERNECINE|DELITESCENT|MANSUETUDE|APOPHANTIC|JUGGERNAUT|KLATCH|EXPERGEFACTION|AGLIFF|PYRRHONISM|OBLIGATE|APOSYMBIOTIC|SYMBIOGENESIS|SYNNECROSIS|DISJUNCTIVESYMBIOSIS|AMENSALISM|WHILOM|CANOROUS|HALCYON|PURANAS|CELERITY|PERIGRAPH|LEITMOTIF|BARNARD|GNOMIC|SITZKRIEG|PERPILOCUTIONIST|QUIDDITY|GEMEINSCHAFT|NONAMESPACKDRILL|PUPPETMASTER|AMBAGIOUS|FEY|eseneila|INCULCATE|FRAGPLAN|VIRALLATENCY|DAUNCY|KITHKIN|classical|ABNEGATE|DECREMENT|KEIRETSU|pianissimo|NOCEBO|wotd_melody|AGITATOR|ERRANTRY|WHEADYMILE|SUBSUMED|ABOMINARI|SCIF|DEINDIVIDUATION|NERVINE|KYRIOLEXY|FOISON|ELOCATION|SAYRESLAW|HUMPHREYSLAW|GALLSLAW|METCALFESLAW|AMARASLAW|SLAKEN|ARETE|GROUPTHINK|SOPHISTRY|UHTCEARE|PURPLECROCODILE|HYPNAGOGIA|HYPNOPOMPIC|ONEIROMANCY|BLENCH|CONDIDDLE|ENDGAME|Dialectic|ULAMSPIRAL|TORTILE|HELIX|GO-GAP|CONGERIES|BINARYOPTION|ANECDOTALEVIDENCE|CACOETHES|FATIDICAL|JIVANMUKTA|OBDURACY|RETRONYM|INELUCTABLE|ETIOLOGY|PERDURABLE|RUCTION|VASTATION|PROPITIOUS|CONSILIENCE|SEQUELA|INCHOATE|DARKFLOW|CONFUSIONAGENT|EXTEMPORIZE|NUGACIOUS|calumniate|APPROBARE|PURUSHA|KINETOGENIC|JUVENESCENT|QUIDNUNC|INTHEGAP|ABSQUATULATE|YLEM|ACCIDENT|ZOETIC|AXIOLOGY|ABOULIA|ABIOGENESIS|ANAGNORISIS|ACTIVATIONSYNTHESIS|SKEUMORPH|PAUCITY|ARGUTE|OBAMULATE|LUCIDDREAM|PROPRATIA|SENESCENCE|DWAAL|Apercu|LABILITY|EPIPHENOMENALISM|BIOT|MISEENABYME|SPINNETWORK|LOOPQUANTUMGRAVITY|TURTLESDOWN|NESTEDUNIVERSE|CHAYA|COOPETITION|MISTIGRIS|ZETETIC|VELLEITY|ONEIRONAUTICS|PIACULAR|TANIWHA|AEVITERNITY|DETERGE|HWYL|CYNOSURE|COTERMINOUS|MACGUFFIN|ELEGY|VRITRA|MOONLIGHTREQUISITION|BIOMECHATRONICS|BIOMECHATRONICS|FRITH|ABJURE|WANTAGE|ATARAXIA|SBOX|ENCHIRIDION|SCIOTHEISM|EXISTENTIALRISK|VITIATE|bci|SOL|ECOPHAGY|labefactation|PARTICIPANTEVOLUTION|NOOTROPIC|EPIGRAPH|SOLINVICTUS|PERVASIVENETWORKING|COLOSSUSRHODES|HYPERION|SHIBBOLETHx|SHIBBOLETH|SHIBBOLETH|QUADRIGA|DECUSSATE|OCCULTATION|APEP|ABDITORY|PALAVER|SALLY|DAYMARK|LITOTES|HETERARCHY|MONISM|MONISM|ENERVATE|PEREGRINATION|DESULTORY|SOJOURN|QUONDAM|ARISTEIA|PIEZOELECTRICITY|GILGUL|PAUCILOQUENT|DIBS|WORLDRIDDLE|CAPGRASDELUSION|ALTRUISM|BOOTSTRAPPING|ADYNATON|IMPROVIDENT|VIRTUOSO|HAECCEITY|SKIRR|RHAPSODOMANCY|STARSYSTEM|GLOAMING|ITERATION|PANURGIC|MYRMIDON|TET|ENTRENOUS|OUTRE|VACUOUSTRUTH|NLP|COMMODIFICATION|JUSSIVE|HOMEOSTAT|RENITENT|APOCRYPHAL|INEFFABLE|PROXY|BELBIC|SARIRA|AGELASTIC|BOUNDEN|INGEMINATE|MORPHOGEN|VERACIOUS|STEMCOMPRESSION|CACOLOGY|EXIMIOUS|PETROSOMATOGLYPH|ENGRAM|MEDIUMMESSAGE|CONTRONYM|EKAM|MANIFESTO|CHTHONIC|BOMBE|KRIEGSMARINETABLES|RADOME|KERCKHOFFsPRINCIPLE|TEMPEST|CLIPPERCHIP|KEYESCROW|ATHAZAGORAPHOBIA|ATHANASIA|ZENZIZENZIZENZIC|EVOLUTIONARYTRAP|ADARRHIANNON|INCIPIENT|HATUP|VOLTEFACE|SATISFICE|BELLEEXPERIMENT|GJENGANGER|AITION|ACRONYCHAL|QUANTUMFOAM|KARUNA|KUNDALINI|MERAKI|VICEGERENT|QUINE|CAPSTONE|CHAOSTHEORY|BACKDOOR0|BACKDOOR|DEFCON|TWOMANRULE|NUCLEARTRIAD|CHEKHOVSGUN|FIRSTSTRIKE|MORALLUCK|CADUCEUS|EPRIME|SACCADE|FOUDROYER|DECODERRING|VERNAMCIPHER|HOLOMETABOLISM|PIONIUM|ABECEDARIAN|SADISTICCHOICE|SUBPROJECT54|AGNOSIA|ANATHEMA|CHECKDIGIT|ETHNOCENTRISM|DULCARNON|EIGHTCIRCUITMODEL|ASCHPARADIGM|AXIOM|EIDOLON|AESOPIAN|TECHNOETICS|TRADUCIANISM|NOSTALGIA|ADMONITIO|QUBIT|PANSYCHISM|NATIVISM|HOUSENAME|PROJECTBLUEBOOK|METONYMY|PHENOMENOLOGY|POCKETLITTER|CODA|ROTAFORTUNAE|IDEEFIXE|NIKHEDONIA|TELEONOMY|EGREGORE|MONOMYTH|68zbvxvx79oqqsnpeghjkmdfsu35oq79qs|LONGRANGEACOUSTICDEVICE|LOGICALDISJUNCTION|PALINGENESIS|POINCARERECURRENCE|BASECASE|MULTILATERATION|MUTAGEN|APOTROPAIC|REENTRY|LIBERABACI|RUMINATION|DROSTEEFFECT|AUTOPOIESIS|ZEITGEBER|MATRYOSHKAVERSE|PROSKYNESIS|SYNECDOCHE|DATAMINING|PHANERON|MONDEGREEN|ZEMBLANITY|LACUNA|NANAWATAI|SWAYAMBHU|LOSSAVERSION|Bhavacakra|ABSTERGO|IMBIBE|STARCHAMBER|SANCTUSSANCTORUM|ANTELUCAN|MILGRAMEXPERIMENT|PARMENIDEAN|SCIALYTIC|MUNDANEUM|EPICARICACY|Theophany|GANZFELDEFFECT|MATRIOSHKABRAIN|SOCIALCYCLETHEORY|INTRINSIC|BTHEORYTIME|UTILE|MESHNETWORKING|EXFORMATION|CHRISTMASTRUCE|PERFIDY|MYTHOPOEICTHOUGHT|WHITENOISE|SOLSTICE|DEMIURGE|BRACHYOLOGY|ANATTA|KARDASHEVSCALE|OMEGAPOINT|KINSUKUROI|Negentropy|CHAKRAS|FABIANSTRATEGY|ODICFORCE|KISS|DOVETAIL|JADOUBE|THINSLICING|METEMPSYCHOSIS|AUGURY|DYNASTICCYCLE|MEMETHEORY|iuet4jsv8z294ylcuf|HYPERBOLE|VIRTUALPARTICLE|WALKIN|EPIGRAM|QUANTUMCRYPTO|ECHELON|MU|SIMULACRUM|QI|SEANCE|DENDRITICSPINE|ENUMERATIO|ELANVITAL|DANGLE|STICTION|LETHOLOGICA|zeropointenergy|TIMER|PODSNAPPERY|KHAT|SKILAMALINK|TINFOILHAT|GAMBIT|APOTHEOSIS|SIBYLLING|TRUEBELIEVER|INTHEWILD|EPANALEPSIS|PARETOEFFICIENCY|BLACKSITE|KA|DIESNATALIS|DEMOGORGON|HYPERTHYMESIA|ANTIMETABOLE|OUTOFRANGE|SAMHAIN|COOKEDINTEL|FATAMORGANA|PARACUSIA|ETERNALRETURN|COLLECTIVEUNCONSCIOUS|SOLITON|TIANDIHUI|AKASHICRECORDS|temporalprojection|CARGOCULT|INVERSEPROBLEM|HOLWG|infooverload|metanoia|timeeventchart".split("|");
  var kwlist=`NONPARTISAN|PERVICACIOUS|PURBLIND|PERMILLE|CONVIVIAL|TRANSMOGRIFY|CRACKERJACK|MICHE|CRESCENDO|REMONTER
  VERDURE|HUGGERMUGGER|APPROBATION|IDIOSYNCRASY|toutafait|APAURUSHEYA|HYPOTHECATION|BASTION|ESCUTCHEON|SOCKDOLAGER
  GEGENSCHEIN|CAMORRA|AMANUENSIS|FURPHY|TRANCHE|STOLID|DARKPATTERN|ZELOPHOBIA|YODACONDITION|XEROSIS
  WANTAWAY|VENERATE|URTEXT|TROMOS|SOMATICIZE|REMORA|QUINCUNX|PSITTACISM|OPUSCULE|NONPAREIL
  MEPHITIC|LARRUPING|KVELL|JOUROUVERT|INIMICAL|HAAT|GEDANKENVERSUCH|FLIVVER|DACKER|EUDEMONIC
  CLYPEATE|BLAZON|APPURTENANCE|INTUMESCE|ORGULOUS|LEITMOTIV|STHENIC|ERISTICAL|BOUSTROPHEDON|PROJECTDIANA
  GAPESEED|SUBREPTION|IRENIC|ELAN|INVETERATE|ANTANAGOGE|DEASIL|PRIVATION|VORAGINOUS|FRABJOUS
  NOEGENESIS|UBIQUE|HOIPOLLOI|BOOTSTORM|HIE|FOSSICK|MENDASCIOUSNESS|SOLUS|PETRICHOR|ENSORCELL
  PALLIATE|PRISONERSCINEMA|SCHEERERSPHENOMENON|PHOSPHENE|HAIDINGERSBRUSH|ENTOPTICPHENOMENON|DECLENSION|WELTSCHMERZ|CONSTATIVE|MOIL
  TALLTALE|RODOMONTADE|CHIPSANDSALSA|ENNEAGRAM|SOPHROSYNE|CENA|OBNUBILATE|PROPENSITY|KENSPECKLE|joiedevivre
  QUALE|RENASCENT|CALLIGRAM|EPISTEMIC|AMARANTHINE|AMBIGRAM|CONFLATE|LIMINA|LUDIC|DUENDE
  THERIAC|SPREZZATURA|APOCOPE|SKOOKUM|CONTRETEMPS|COMMODIOUS|ESPRITDECORPS|BOULWARISM|EGGOFCOLUMBUS|MORTONSFORK
  HOBSONSCHOICE|TRUCHMAN|BISSEXTUS|COCKAIGNE|DEMOTIC|UNNOTICED|HALE|DEUTEROGENESIS|PARAPRAXIS|GLOBBING
  PASSEL|TANTIVY|COGNOSCENTI|AUTODIDACT|ADROIT|ETESIAN|HESTERNAL|OBVERSE|MARMOREAL|ADDISONIAN
  AEONIAN|RESCRIPT|INSOUCIANT|REIFY|DESIDERATUM|PROVENANCE|INTERPELLATE|DIEL|CUPERTINOEFFECT|UNCO
  SPRACHGEFUHL|ERRORCORRECTING|OBSTREPEROUS|INDUCEMENT|ZEUGMA|BLOVIATE|SEDULOUS|AUTOLYCAN|GRAVITATE|THEW
  SANSCULOTTE|DEKKO|BACKRONYM|LIMN|CATFISH|SPECULATORES|ALPHANUMERISH|RETICENCE|GARRISONFINISH|TOKENIZATION
  DROPPERVIRUS|EXPLORATORES|DROSS|ASCESIS|NOMOPHOBIA|COADUNATE|BOGART|CHRESTOMATHY|DIRIMENT|INTROMIT
  HOTADD|ANNUSMIRABILIS|INTERWREATHE|MITTIMUS|ULTIMATHULE|KARNAUGHMAPPING|FAVONIAN|IMMANENT|MUNIFICENT|QUOZ
  PINCHBECK|CONDIGN|INVIDIOUS|GORDIANKNOT|PERPETUITY|FARRAGO|SUSPIRATION|MACROBIAN|POLLENT|DARKDATA
  GRATULATE|NEPHELOID|THRESHOLDEFFECT|FIVENINES|objettrouve|PALMARY|JACKLEG|LATERAD|EQUANIMITY|EGRESSFILTERING
  GRAMARYE|PARAGON|PICAYUNE|CHIRAL|SINEDIE|LENITY|MINATORY|VIVIFIC|ESPERANCE|SOLIPSISM
  NIDIFICE|FULSOME|ESEMPLASTIC|PERIPETEIA|RULY|VILIPEND|INVIOLABLE|SINECURE|DECESSION|QUODLIBETAL
  IMBROGLIO|ADVENTIOUS|NARRISCHKEIT|KLUDGE|DITHYRAMB|RAMIFORM|ANODYNE|BUBBLEMEMORY|DELECTATION|SHADOWASPECT
  BLINDDROP|PROBITY|ORTHOGONALITYTHESIS|ZOMBIECOMPUTER|SNEAKERNET|PORTING|KILLERAPPLICATION|TACENT|DEREZZED|LOREMIPSUM
  CACHEDOUT|MANQUE|FIZMER|EPRPARADOX|PROLEGOMENON|HOGENMOGEN|RAVEL|CHARY|AMBIT|RESUMPTIVE
  TURINGEQUIVALENCE|ANALYTICALENGINE|FUGACIOUS|CONSTELLATE|OMNEITY|EMBED|DEBOUCH|EQUIPOLLENT|UMBRIFEROUS|TAKEOFFLINE
  EDITORWAR|LETHEAN|UNCEASING|HESTERNOPOTHIA|XENOGENOUS|EAGRE|CUTOUT|HOSTILETAKEOVER|METANOIA|INCALESCENT
  SANKOFA|SCISSION|MOTJUSTE|MENSREA|LICIT|ACCISMUS|ALLOCHTHONOUS|FURCATE|UBIETY|MANDELAEFFECT
  DORYPHORE|YCLEPT|SCRIPTKIDDIE|ALEATORY|RECONDITE|QUINTESSENCE|INTERLOCUTOR|HEBETUDINOUS|SOFTWAREROT|PSYCHONAUTICS
  BELIE|SIGNIFICANTWHITESPACE|PERDITION|QUANTUMINFORMATION|ONUS|CODESMELL|CHURLISH|HAPTICS|ATHWART|FLORID
  TURNAROUND|WANZE|EFFICACIOUS|EQUIVOCATION|PRORATA|POIESIS|ALIA|CAJOLERY|PUGNACIOUS|KISMET
  MOIRAI|SHIKATAGANAI|ACCLUMSID|NEQUIENT|SCIOLISM|42|VERIDICALPARADOX|PIGEONHOLEPRINCIPLE|DYSPHEMISM|UNKNOWN
  BOOMLET|MONITION|IMPEDIMENTA|IANTHINE|SALUBRIOUS|VAUNTAGE|GEHANNA|BAEDEKER|RETICULOSE|MALISON
  Casusbelli|SNOWCLONE|SUPERANNUATED|ASSUAGE|MASONICCIPHER|PANEGOISM|DUPLICITOUS|FAINEANT|FAITACCOMPLI|RADIUSOFACTION
  PREDORMITUM|EIGENGRAU|BAILIWICK|CULMEN|ATTENUATION|MARPAT|PHONEMES|CRYPSIS|VOLITIENT|DAGGLE
  DAPOCAGINOUS|SWEVEN|SOMATIC|FORSWUNKE|FARDEL|CONNATE|CALVINBALL|UMBRELLATERM|ZEROSUMGAME|LUDOLOGY
  LUDIBRIUM|WARGAMES|BOARDGAME|OPPUGN|ANFRACTUOUS|HENT|WHATABOUTS|KAIROS|NOVIKOVPRINCIPLE|REPETITIONPRIMING
  TENEBROUS|PSYCHONOMICS|METAMEMORY|IPSATIVE|PECKHAMIANMIMICRY|TRANSACTIVEMEMORY|MNEMOTECHNICS|MALAFIDE|BACKSTOP|JABBLE
  PURLIEUS|REDE|EXPISCATE|HAINT|OBSEQUIOUS|ASPERITY|SOIDISANT|METIER|BETENOIRE|BELLWETHER
  DERIGUEUR|LYGOPHOBIA|GEMATRIA|WANCHANCY|MIRD|OPSIMATH|ESPOUSE|MELIORISM|EDIFY|JEREMIAD
  PERCEPTRON|ADDITIONALITY|HEIMISCH|PRISCAN|ECLAIRCISSEMENT|BROOKSLAW|OBRUMPENT|PERCEPTIONALISM|FUTILITARIAN|Bekanntheitsgefuhl
  IGNESCENT|NOCICEPTION|EXTRACORPOREAL|CHIRANJIVI|SAPROGENIC|ANOGENIC|MULTIFRACTALS|VERNEINUNG|ETHERIC|KAINOTOPHOBIA
  ACROPHASE|BATHYPHASE|CHRONOBIOLOGY|BINKABI|FAWOHODIE|UNIVERSALQUANTIFICATION|MMEREDANE|HAMSA|THANATOPHOBIA|WYRD
  LONGANIMITY|FLATHATTING|ANSIBLE|ANOMIE|HABCAT|ECDEMIC|FRANGIBLE|BRONTIDE|OSTENIFEROUS|WELTER
  INFANDOUS|HAMARTIA|ENANTIODROMIA|POPQUIZ|OPENINGACTS|DERRICKRAVENS|NONSEQUITUR|LINGUAFRANCA|TYRIANPURPLE|SERVERRACK
  MESMERIZING|NONSUMQUALISERAM|NULLATENACIINVIAESTVIA|NONPROGREDIESTREGREDI|BRUTUMFULMEN|IGNOTUMPERIGNOTIUS|AURIBUSTENEOLUPUM|CALLOW|FLANEUR|TUTELARY
  EPANORTHOSIS|RECENSE|PARAMNESIA|HIRF|DETENTE|AJFADEAWAY|MAIEUTIC|PERAGRATE|GALERE|FACTOTUM
  EXTRAMUNDANE|INTERTESSELATION|DEJAVECU|OBELIZE|DYBBUK|BURNBAG|PARASTATAL|COUPdeTHEATRE|NATUSNEMO|PERCONTRA
  ADJUDICATE|SCELESTIC|CRYPTONYM|FRANGERE|CHEVISANCE|VATIC|NASCENT|PALTER|SYNALLAGMATIC|MISQUEME
  ABY|INCOMMUNICADO|COMPORTMENT|SOLICITUDE|PLENARY|LOKA|RECRUDESCENCE|EXORDIUM|DECURTATE|PUSILLANIMOUS
  AUTOSCHEDIASTIC|KYRIE|HOSPITIUM|DOLOROSA|GADFLY|OSCULANT|VADOSITY|SCABROUS|CACHEXIC|FALLACILOQUENCE
  DUAC|SARCINARIOUS|NOVATURIENT|PANGRAM|QUOTIDIAN|TENEBRIFIC|ENTERMETE|MYTHOMANE|PERICULOUS|WROX
  OBEDIBLE|LYSIGENIC|EBULLITION|MUNDATION|HIEMAL|COPENHAGENINTERPRETATION|MODULATION|IGNIPAROUS|OPPUGNANT|ABROGATE
  SEMPITERNAL|MASKIROVKA|STONETHECROWS|CLISHMACLAVER|KALACHAKRA|CREPUSCULAR|PRETERMISSION|HOROLOGY|APOSIOPESIS|PEISE
  SUPERVENIENT|HYPOCORISM|ANANYM|VOCIFERATE|SUSURRATION|EPICENTER|PUNCTILIOUS|ILLECEBROUS|BOUBAKIKIEFFECT|ENTRISM
  DRAWCANSIR|CATSCRADLE|INFICETE|VAGARIOUS|INTERNECINE|DELITESCENT|MANSUETUDE|APOPHANTIC|JUGGERNAUT|KLATCH
  EXPERGEFACTION|AGLIFF|PYRRHONISM|OBLIGATE|APOSYMBIOTIC|SYMBIOGENESIS|SYNNECROSIS|DISJUNCTIVESYMBIOSIS|AMENSALISM|WHILOM
  CANOROUS|HALCYON|PURANAS|CELERITY|PERIGRAPH|LEITMOTIF|BARNARD|GNOMIC|SITZKRIEG|PERPILOCUTIONIST
  QUIDDITY|GEMEINSCHAFT|NONAMESPACKDRILL|PUPPETMASTER|AMBAGIOUS|FEY|eseneila|INCULCATE|FRAGPLAN|VIRALLATENCY
  DAUNCY|KITHKIN|classical|ABNEGATE|DECREMENT|KEIRETSU|pianissimo|NOCEBO|wotd_melody|AGITATOR
  ERRANTRY|WHEADYMILE|SUBSUMED|ABOMINARI|SCIF|DEINDIVIDUATION|NERVINE|KYRIOLEXY|FOISON|ELOCATION
  SAYRESLAW|HUMPHREYSLAW|GALLSLAW|METCALFESLAW|AMARASLAW|SLAKEN|ARETE|GROUPTHINK|SOPHISTRY|UHTCEARE
  PURPLECROCODILE|HYPNAGOGIA|HYPNOPOMPIC|ONEIROMANCY|BLENCH|CONDIDDLE|ENDGAME|Dialectic|ULAMSPIRAL|TORTILE
  HELIX|GO-GAP|CONGERIES|BINARYOPTION|ANECDOTALEVIDENCE|CACOETHES|FATIDICAL|JIVANMUKTA|OBDURACY|RETRONYM
  INELUCTABLE|ETIOLOGY|PERDURABLE|RUCTION|VASTATION|PROPITIOUS|CONSILIENCE|SEQUELA|INCHOATE|DARKFLOW
  CONFUSIONAGENT|EXTEMPORIZE|NUGACIOUS|calumniate|APPROBARE|PURUSHA|KINETOGENIC|JUVENESCENT|QUIDNUNC|INTHEGAP
  ABSQUATULATE|YLEM|ACCIDENT|ZOETIC|AXIOLOGY|ABOULIA|ABIOGENESIS|ANAGNORISIS|ACTIVATIONSYNTHESIS|SKEUMORPH
  PAUCITY|ARGUTE|OBAMULATE|LUCIDDREAM|PROPRATIA|SENESCENCE|DWAAL|Apercu|LABILITY|EPIPHENOMENALISM
  BIOT|MISEENABYME|SPINNETWORK|LOOPQUANTUMGRAVITY|TURTLESDOWN|NESTEDUNIVERSE|CHAYA|COOPETITION|MISTIGRIS|ZETETIC
  VELLEITY|ONEIRONAUTICS|PIACULAR|TANIWHA|AEVITERNITY|DETERGE|HWYL|CYNOSURE|COTERMINOUS|MACGUFFIN
  ELEGY|VRITRA|MOONLIGHTREQUISITION|BIOMECHATRONICS|BIOMECHATRONICS|FRITH|ABJURE|WANTAGE|ATARAXIA|SBOX
  ENCHIRIDION|SCIOTHEISM|EXISTENTIALRISK|VITIATE|bci|SOL|ECOPHAGY|labefactation|PARTICIPANTEVOLUTION|NOOTROPIC
  EPIGRAPH|SOLINVICTUS|PERVASIVENETWORKING|COLOSSUSRHODES|HYPERION|SHIBBOLETHx|SHIBBOLETH|SHIBBOLETH|QUADRIGA|DECUSSATE
  OCCULTATION|APEP|ABDITORY|PALAVER|SALLY|DAYMARK|LITOTES|HETERARCHY|MONISM|MONISM
  ENERVATE|PEREGRINATION|DESULTORY|SOJOURN|QUONDAM|ARISTEIA|PIEZOELECTRICITY|GILGUL|PAUCILOQUENT|DIBS
  WORLDRIDDLE|CAPGRASDELUSION|ALTRUISM|BOOTSTRAPPING|ADYNATON|IMPROVIDENT|VIRTUOSO|HAECCEITY|SKIRR|RHAPSODOMANCY
  STARSYSTEM|GLOAMING|ITERATION|PANURGIC|MYRMIDON|TET|ENTRENOUS|OUTRE|VACUOUSTRUTH|NLP
  COMMODIFICATION|JUSSIVE|HOMEOSTAT|RENITENT|APOCRYPHAL|INEFFABLE|PROXY|BELBIC|SARIRA|AGELASTIC
  BOUNDEN|INGEMINATE|MORPHOGEN|VERACIOUS|STEMCOMPRESSION|CACOLOGY|EXIMIOUS|PETROSOMATOGLYPH|ENGRAM|MEDIUMMESSAGE
  CONTRONYM|EKAM|MANIFESTO|CHTHONIC|BOMBE|KRIEGSMARINETABLES|RADOME|KERCKHOFFsPRINCIPLE|TEMPEST|CLIPPERCHIP
  KEYESCROW|ATHAZAGORAPHOBIA|ATHANASIA|ZENZIZENZIZENZIC|EVOLUTIONARYTRAP|ADARRHIANNON|INCIPIENT|HATUP|VOLTEFACE|SATISFICE
  BELLEEXPERIMENT|GJENGANGER|AITION|ACRONYCHAL|QUANTUMFOAM|KARUNA|KUNDALINI|MERAKI|VICEGERENT|QUINE
  CAPSTONE|CHAOSTHEORY|BACKDOOR0|BACKDOOR|DEFCON|TWOMANRULE|NUCLEARTRIAD|CHEKHOVSGUN|FIRSTSTRIKE|MORALLUCK
  CADUCEUS|EPRIME|SACCADE|FOUDROYER|DECODERRING|VERNAMCIPHER|HOLOMETABOLISM|PIONIUM|ABECEDARIAN|SADISTICCHOICE
  SUBPROJECT54|AGNOSIA|ANATHEMA|CHECKDIGIT|ETHNOCENTRISM|DULCARNON|EIGHTCIRCUITMODEL|ASCHPARADIGM|AXIOM|EIDOLON
  AESOPIAN|TECHNOETICS|TRADUCIANISM|NOSTALGIA|ADMONITIO|QUBIT|PANSYCHISM|NATIVISM|HOUSENAME|PROJECTBLUEBOOK
  METONYMY|PHENOMENOLOGY|POCKETLITTER|CODA|ROTAFORTUNAE|IDEEFIXE|NIKHEDONIA|TELEONOMY|EGREGORE|MONOMYTH
  68zbvxvx79oqqsnpeghjkmdfsu35oq79qs|LONGRANGEACOUSTICDEVICE|LOGICALDISJUNCTION|PALINGENESIS|POINCARERECURRENCE|BASECASE|MULTILATERATION|MUTAGEN|APOTROPAIC|REENTRY
  LIBERABACI|RUMINATION|DROSTEEFFECT|AUTOPOIESIS|ZEITGEBER|MATRYOSHKAVERSE|PROSKYNESIS|SYNECDOCHE|DATAMINING|PHANERON
  MONDEGREEN|ZEMBLANITY|LACUNA|NANAWATAI|SWAYAMBHU|LOSSAVERSION|Bhavacakra|ABSTERGO|IMBIBE|STARCHAMBER
  SANCTUSSANCTORUM|ANTELUCAN|MILGRAMEXPERIMENT|PARMENIDEAN|SCIALYTIC|MUNDANEUM|EPICARICACY|Theophany|GANZFELDEFFECT|MATRIOSHKABRAIN
  SOCIALCYCLETHEORY|INTRINSIC|BTHEORYTIME|UTILE|MESHNETWORKING|EXFORMATION|CHRISTMASTRUCE|PERFIDY|MYTHOPOEICTHOUGHT|WHITENOISE
  SOLSTICE|DEMIURGE|BRACHYOLOGY|ANATTA|KARDASHEVSCALE|OMEGAPOINT|KINSUKUROI|Negentropy|CHAKRAS|FABIANSTRATEGY
  ODICFORCE|KISS|DOVETAIL|JADOUBE|THINSLICING|METEMPSYCHOSIS|AUGURY|DYNASTICCYCLE|MEMETHEORY|iuet4jsv8z294ylcuf
  HYPERBOLE|VIRTUALPARTICLE|WALKIN|EPIGRAM|QUANTUMCRYPTO|ECHELON|MU|SIMULACRUM|QI|SEANCE
  DENDRITICSPINE|ENUMERATIO|ELANVITAL|DANGLE|STICTION|LETHOLOGICA|zeropointenergy|TIMER|PODSNAPPERY|KHAT
  SKILAMALINK|TINFOILHAT|GAMBIT|APOTHEOSIS|SIBYLLING|TRUEBELIEVER|INTHEWILD|EPANALEPSIS|PARETOEFFICIENCY|BLACKSITE
  KA|DIESNATALIS|DEMOGORGON|HYPERTHYMESIA|ANTIMETABOLE|OUTOFRANGE|SAMHAIN|COOKEDINTEL|FATAMORGANA|PARACUSIA
  ETERNALRETURN|COLLECTIVEUNCONSCIOUS|SOLITON|TIANDIHUI|AKASHICRECORDS|temporalprojection|CARGOCULT|INVERSEPROBLEM|HOLWG|infooverload
  metanoia|timeeventchart`.replace(/\s*\n\s*/g, "|").split("|");
  kwlist.sort(function(a,b){
    if( a.length > b.length) return -1;
    if( a.length < b.length) return 1;
    return 0;
  });
  return kwlist;
}


/*
//OBSIDIAN追加キーワード
function addKeyws() {
  return "africa|african|assyrian|atticus|barbarians|berenice|caligula|carthage|cicero|cybella|dragon|earth|egypt|egyptian|emperor|empire|explorations|exploratore|exploratores|german|germania|germanic|germans|guard|hellenic|jewish|judea|jupiter|latin|limina|magnus|marcus|numidian|obsidius|oracle|persia|persian|pompeii|praetorian|roman|rome|scout|sensitiva|sesterti|siel|speculatores|syphax|titus|tribes|tullius|valadian|PrimeExploratore|IrregularScout|MarcusAtticusTullius|MarcusTulliusCicero|JewishWars|theJewishWars|IceandForestPeople|NorthAfrica|theruinsofCarthage|GaiusPliniusSecundus|PraetorianGuard".split("|");
}
*/


//kw以外の注目ワードリスト(5文字以上を推奨)
function noticeWords() {
  return "January|February|March|April|May|June|July|August|September|October|November|December|COMBINE|siren|borrowed|good|evil|toasty?".split("|");
}




// htmlのヘッダを出力
function htmlHeader() {
  var h="";
  /*
  h+="<meta name='format-detection' ";
  h+="content='telephone=no'>\n";
  h+="<style type='text/css'>\n";
  h+="* {white-space: nowrap}\n";
  h+=".fix {background-color: pink}\n";
  h+=".fix-keyw {color: red;\n";
  h+="   font-weight: bold;}\n";
  h+=".fix-leetkw {color: green;\n";
  h+="   font-weight: bold;}\n";
  h+=".keyw {color: red;\n";
  h+="   font-weight: bold;}\n";
  h+=".leetkw {color: green;\n";
  h+="   font-weight: bold;}\n";
  h+=".keywR {color: #ff66ff;\n";
  h+="   font-weight: bold;}\n";
  h+=".format {background-color: yellow}\n";
  h+=".formatSusp {background-color: #ffffdd}\n";
  h+=".num {font-weight: bold;\n";
  h+="   color: #4444ff; }\n";
  h+=".url {background-color: pink}\n";
  h+="* {font-family: monospace}\n";
  h+="body {padding: 1em}\n";
  h+=".alert {color: red}\n";
  h+="td {padding:2px}\n";
  h+=".alertbox {border:1px red solid}\n";
  h+=".leet {background-color: #99ff99}\n";
  h+=".nokeyword {background-color: #bbeeff}\n";
  //h+=".braille {line-height: 65%;}\n";
  h+=".braille {line-height: 75%; letter-spacing: 3px;}\n";
  h+=".AA {font-size: xx-small; line-height: 83%; letter-spacing: -2.5px;}\n";
  h+=".AA2 {font-size: xx-small; line-height: 100%; letter-spacing: 0px;}\n";
  h+=".AA3 {font-size: xx-small; line-height: 70%; letter-spacing: 0px;}\n";
  h+=".QR {font-size=6pt; line-height: 83%; letter-spacing: 2.5px;}\n";
  h+=".kuro{background-color:#000; color:#444; width:6pt;}\n";
  h+=".shiro{background-color:#fff; color:#ddd;width:6pt;}\n";
  h+=".aka{background-color:#f00; color:#fff;width:6pt;}\n";
  h+=".keyOn {background-color: pink;}\n";
  h+=".keyOff {background-color: #fff;}\n";
  h+="#keylayout {width: 70%; text-align: center;}\n";
  h+="#atom td {width: 70%; text-align: center; border: 1px solid gray; margin: 0px;}\n";
  h+="#atom {border-collapse: collapse;}\n";
  h+=".debug { font-weight: bold; border:1px red solid; color: red; }\n";
  h+=".attention {background-color: yellow}\n";
  h+=".elapsedtime {color: blue; font-size: xx-small; display: inline; }\n";
  h+=".elapsedtime2 {color: red;  font-size: xx-small; display: inline; }\n";
  h+="</style>\n";
  */
  return h;
}
