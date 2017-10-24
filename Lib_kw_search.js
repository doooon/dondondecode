function kwSearch(str) {
  var lines=str.split(/\n/);
  htmlTmp.push(TEXT);
  htmlTmp.push("================");

  for (var i in lines) {
    lines[i]=lines[i].replace(
      /^\s+|\s+$/g, "");
    if (lines[i]=="") continue;
    
    htmlTmp.push(
      checkCodeHTML(lines[i]));
    htmlTmp.push("--");
    
    // keyword照合
    var k=getKeyws();
    k=k.concat(addKeywsJoJo()); //追加
    for (var j=0; j<k.length; j++) {
      var re =new RegExp("("+k[j]+")", "ig");
      if (lines[i].match(re)) {
          htmlTmp.push(
            checkCodeHTML(k[j]));
      }
    }
    htmlTmp.push("===============");
  }
  
  return true;
}
