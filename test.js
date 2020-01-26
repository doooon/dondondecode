alertMsg = [];
str = "test Ra Isis Nu test Renenutet Nut Hapi Sopdu test";
str = "maathapibastetnutkekmutpakhettatenengebsobekamunetanubisheqethathorisissatetkekakernukhnumnemtytatenensekhmetshuanubishorusimentet";
str = str.replace(/\s/g, "");
console.log(str);


function EgyptianMajordeities(mystr){
  // List of Egyptian Major deities エジプト神
  let mtrx=[
    ["Aker","male"],
    ["Amun","male"],
    ["Anhur","male"],
    ["Aten","male"],
    ["Atum","male"],
    ["Bennu","male"],
    ["Geb","male"],
    ["Hapi","male"],
    ["Horus","male"],
    ["Khepri","male"],
    ["Khnum","male"],
    ["Khonsu","male"],
    ["Maahes","male"],
    ["Montu","male"],
    ["Nefertum","male"],
    ["Nemty","male"],
    ["Neper","male"],
    ["Osiris","male"],
    ["Ptah","male"],
    ["Ra","male"],
    ["Set","male"],
    ["Shu","male"],
    ["Sobek","male"],
    ["Sopdu","male"],
    ["Thoth","male"],
    ["Wadj-wer","male"],
    ["Wadjwer","male"],
    ["Amunet","female"],
    ["Anuket","female"],
    ["Bastet","female"],
    ["Bat","female"],
    ["Hathor","female"],
    ["Heqet","female"],
    ["Hesat","female"],
    ["Imentet","female"],
    ["Isis","female"],
    ["Maat","female"],
    ["Menhit","female"],
    ["Mut","female"],
    ["Neith","female"],
    ["Nekhbet","female"],
    ["Nephthys","female"],
    ["Neper","female"],
    ["Nut","female"],
    ["Pakhet","female"],
    ["Renenutet","female"],
    ["Satet","female"],
    ["Sekhmet","female"],
    ["Tefnut","female"],
    ["Wadjet","female"],
    ["Wosret","female"],
    ["Heh","both"],
    ["Kek","both"],
    ["Nu","both"],
    ["Re","both"],
    ["Tatenen","both"]
  ];
  mtrx.sort(function(a,b){
        if( a[0].length > b[0].length ) return -1;
        if( a[0].length < b[0].length ) return 1;
        if( a[0] < b[0] ) return -1;
        if( a[0] > b[0] ) return 1;
        return 0;
  });

  var tmpRE=new RegExp(mtrx.map(val=>val[0]).join("|"),"ig");
  var tmp=mystr.match(tmpRE);
  var result=[];
  if (tmp && tmp.length>=1) {
    tmp.forEach(val=>{
      var tmpRE2=new RegExp("^"+val+"$","i");
      mtrx.forEach(val2=>{
        var tmp2=val2[0].match(tmpRE2);
        if(tmp2){
          result.push([val,val2[1]]);
          return true;
        }
      });
    });
  }
  return result;
}


var tmp = EgyptianMajordeities(str);
console.log("#######################################");
console.log(tmp);


if (tmp && tmp.length>=6) {
  alertMsg.push("<a href='#EgyptianMajorDeities'>「エジプト神」が複数含まれる</a><br>性別が男性・女性・両性の3種類に分かれる");
  var tmp0 = [];
  var tmp1 = [];
  tmp.forEach(val=>{
    tmp0.push(val[0]);
    tmp1.push(val[1]);
  });
  console.log(tmp0);
  console.log(tmp1);
  tmp1 = tmp1.map(x=>{
    return x[0];
  });
  let renketsu = tmp1.join("");
  console.log(renketsu);
  if(!renketsu.match(/bb/)){ //bbは連続しないハズ
    renketsu = renketsu.replace(/b/g, " ").replace(/m/g, "-").replace(/f/g, ".");
    console.log(renketsu);
  }
}
console.log(alertMsg)

