
function kwRegExp(RE) {

  htmlTmp.push("=================");
  htmlTmp.push(RE);
  htmlTmp.push("=================");

  var keys=getKeyws();
  keys=keys.concat(addKeywsJoJo());
  var tmpRE=new RegExp(RE, "ig")

  var result=[];
  
  if (RE) { 
    for (var i=0; i<keys.length; i++) {
      if (keys[i].match(tmpRE)) {
        result.push(keys[i]);
      }
    }
  } else {
    for (var i=0; i<keys.length; i++) {
      result.push(keys[i]);
    }
  }
  if (result.length==0) result.push("対象なし");
  
  htmlTmp.push(result.join("\n"));
  return true;
}