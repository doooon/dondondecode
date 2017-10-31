
// Lib_kw_exchange.js

//キーワード変換例
function goKeywExchange() {


  var exL=[
  // ["","",""],

  ["xxx","answer","関連"], 
  ["MOVES ?3 ?HONINBO ?SHOWED","ghost","AlphaGo 本因坊"],   
  ["combine","separate","意味bash"],   
  ["AT","tsukasa","略 登場人物 Akira Tsukasa"], 
  ["AT","akira","略 登場人物 Akira Tsukasa"], 
  ["TG","greanias","略 登場人物 Thomas Greanias"], 
  ["CC","campbell","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["CC","carrie","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["DB","devra","略 登場人物 Dr. Devra Bogdanovich"], 
  ["OLW","wolfe","略 登場人物 Dr. Oliver Lynton-Wolfe"], 
  ["DOLW","wolfe","略 登場人物 Dr. Oliver Lynton-Wolfe"], 
  ["DMS","schubert","略 登場人物 Dr. Martin Schubert"], 
  ["DMS","martin","略 登場人物 Dr. Martin Schubert"], 
  ["DEC","ezekiel","略 登場人物 Dr. Ezekiel Calvin"], 
  ["DEC","calvin","略 登場人物 Dr. Ezekiel Calvin"], 
  ["YAN","yuri","略 登場人物 Yuri Alaric Nagassa"], 
  ["YAN","alaric","略 登場人物 Yuri Alaric Nagassa"], 
  ["YAN","nagassa","略 登場人物 Yuri Alaric Nagassa"], 
  ["HHJ","henry","略 登場人物 Henry Hank Johnson"], 
  ["HHJ","hank","略 登場人物 Henry Hank Johnson"], 
  ["HHJ","johnson","略 登場人物 Henry Hank Johnson"], 
  ["DDB","devra","略 登場人物 Dr. Devra Bogdanovich"], 
  ["DCC","campbell","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["DCC","carrie","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["DCBC","campbell","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["DCBC","carrie","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["CBC","campbell","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["CBC","carrie","略 登場人物 Dr. Carrie Beth Campbell"], 
  ["pac","richard","略 登場人物 H. Richard Loeb"], 
  ["hrl","richard","略 登場人物 H. Richard Loeb"], 
  ["fhl","hajra","略 登場人物 Felicia Hajra-Lee"], 
  ["fhl","felicia","略 登場人物 Felicia Hajra-Lee"], 
  ["energy","matter","意味bash"], 
  ["matter","energy","意味bash"], 
  ["nothing","all","意味bash"], 
  ["[5s][1i][9g][1i](13|n)[7t]","sigint","leet+012abc"], 
  ["[5s][1i][9g](13|n)[4a][1L]","signal","leet+012abc"], 
  ["[5s][1i][9g](13|n)[5s]","signs","leet+012abc"], 
  ["precursor","exogenous","関連"], 
  ["zc","calvin","Ezekiel Zake Calvin の愛称"], 
  ["acceptance","denial","意味bash"], 
  ["pass","code","関連語"], 
  ["pac","chapeau","登場人物"], 
  ["order","chaos","意味bash"], 
  ["seek","hide","意味bash"], 
  ["hide","seek","意味bash"], 
  ["contract","grow","意味bash"], 
  ["grow","contract","意味bash"], 
  ["honesty","deception","意味bash"], 
  ["D[3E]C[3E]P[7T][1I][0O]N","deception","leet"], 
  ["M[3E][ZN][7T][4A][1L][1I][5VS]M","mentalism","leet"], 
  ["complex","simple","意味bash"], 
  ["difficult","simple","意味bash"], 
  ["simple","complex","意味bash"], 
  ["simple","difficult","意味bash"], 
  ["victoria","victor","性別bash"], 
  ["100ern","cern","ローマ数字"], 
  ["load","save","意味bash"], 
  ["apart","together","意味bash"], 
  ["fire[&7h]?","forget","fire&forget (軍事用語)"], 
  ["alliance","rebel","意味bash"], 
  ["Ben","Jackland","登場人物"], 
  ["failure","success","意味bash"], 
  ["success","failure","意味bash"], 
  ["confront","avoid","意味bash"], 
  ["WQnh0diWkxk","ghost","http://youtu.be/WQnh0diWkxk"], 
  ["franken","stein","フランケンシュタイン"], 
  ["\!","not","プログラマ的に…"], 
  ["\\\\","escape","読み"], 
  ["O","all","glyph"], 
  ["shoe","chapeau","意味bash hat → PAC"], 
  ["Terras ?Astraea ?reliquit","titus","web検索"], 
  ["mind|soul","body","意味bash"], 
  ["body","soul","意味bash"], 
  ["body","mind","意味bash"], 
  ["cool","cold","+1 step"], 
  ["destory","create","意味bash"], 
  ["create","destory","意味bash"], 
  ["m[0o][1L][3e]","mole","leet"], 
  ["pobednik","kureze","ボスニア語で「勝者」から Victor Kureze"], 
  ["pobednik","victor","ボスニア語で「勝者」"], 
  ["i ?am ?not ?dead","roland","不死身のRoland Jarvis"], 
  ["Worlds ?Enough","time","本 Worlds Enough & Time"], 
  ["my ?only ?friend","end","doorsの曲「The End」の歌詞から"], 
  ["\\-","decrement","減少"], 
  ["dec","-","decrement 減少"], 
  ["dec","decrement","減少"], 
  ["\\+","increment","増加"], 
  ["inc","+","increment 増加"], 
  ["inc","increment","増加"], 
  ["verum ?inveniri ?sur","visur","vi + sur"], 
  ["now","past","-1"], 
  ["present","past","-1"], 
  ["now","future","+1"], 
  ["present","future","+1"], 
  ["future","present","-1"], 
  ["future","now","-1"], 
  ["past","present","+1"], 
  ["past","now","+1"], 
  ["lie","truth","意味bash"], 
  ["truth","lie","意味bash"], 
  ["past","future","意味bash"], 
  ["future","past","意味bash"], 
  ["spacthtime","spacetime","homonym (同音異字)"], 
  ["(the ?)?Explorer","hank","Hank Johnson 13アーキタイプ"], 
  ["(the ?)?Explorer","johnson","Hank Johnson 13アーキタイプ"], 
  ["(the ?)?Dreamer","misty","Misty Hannah 13アーキタイプ"], 
  ["(the ?)?Dreamer","hannah","Misty Hannah 13アーキタイプ"], 
  ["(the ?)?Alchemist","kureze","Victor Kureze 13アーキタイプ"], 
  ["(the ?)?Humanist","yuri","Yuri Nagassa 13アーキタイプ"], 
  ["(the ?)?Humanist","nagassa","Yuri Nagassa 13アーキタイプ"], 
  ["(the ?)?Spiritualist","roland","Roland Jarvis 13アーキタイプ"], 
  ["(the ?)?Spiritualist","jarvis","Roland Jarvis 13アーキタイプ"], 
  ["(the ?)?Omniscient","ada","ADA 13アーキタイプ"], 
  ["(the ?)?Interpreter","stein","Stein Lightman 13アーキタイプ"], 
  ["(the ?)?Interpreter","lightman","Stein Lightman 13アーキタイプ"], 
  ["(the ?)?Trickster","oliver","Oliver Lynton-Wolfe 13アーキタイプ"], 
  ["(the ?)?Trickster","lynton","Oliver Lynton-Wolfe 13アーキタイプ"], 
  ["(the ?)?Trickster","wolfe","Oliver Lynton-Wolfe 13アーキタイプ"], 
  ["(the ?)?Skeptic","martin","Martin Schubert 13アーキタイプ"], 
  ["(the ?)?Skeptic","schubert","Martin Schubert 13アーキタイプ"], 
  ["(the ?)?Listener","enoch","Enoch Dalby 13アーキタイプ"], 
  ["(the ?)?Listener","dalby","Enoch Dalby 13アーキタイプ"], 
  ["(the ?)?Visionary","carrie","Carrie Campbell 13アーキタイプ"], 
  ["(the ?)?Visionary","campbell","Carrie Campbell 13アーキタイプ"], 
  ["(the ?)?Patron","ezekiel","Ezekiel “Zeke” Calvin 13アーキタイプ"], 
  ["(the ?)?Patron","zeke","Ezekiel “Zeke” Calvin 13アーキタイプ"], 
  ["(the ?)?Patron","calvin","Ezekiel “Zeke” Calvin 13アーキタイプ"], 
  ["(the ?)?Catalyst","devra","Devra Bogdanovich 13アーキタイプ"], 
  ["(the ?)?Catalyst","bogdanovich","Devra Bogdanovich 13アーキタイプ"], 
  ["Hungry ?Like ?The","wolfe","Duran Duran - Hungry Like The Wolf > Dr. Oliver Lynton-Wolfe"], 
  ["wolf","wolfe","Dr. Oliver Lynton-Wolfe"], 
  ["(wright|rite|right)","write","同音異義語"], 
  ["^([a-hjkm-z][2-9][a-hjkm-z][2-9])u([a-hjkm-z][2-9][a-hjkm-z]{2})$","$1i$2","u→you <> me→i"], 
  ["^([2-9][a-hjkm-z]{3}[2-9])u([a-hjkm-z][2-9][a-hjkm-z][2-9][a-hjkm-z])$","$1i$2","u→you <> me→i"], 
  ["^([a-hjkm-z]{3}[2-9]{2})u([2-9]{3}[a-hjkm-z]{2})$","$1i$2","u→you <> me→i"], 
  ["clear","open","グリフ反転"], 
  ["slavorum ?rex","henry","web検索"], 
  ["clear","complex","意味bash"], 
  ["simple","complex","意味bash"], 
  ["easy","complex","意味bash"], 
  ["complex","clear","意味bash"], 
  ["complex","simple","意味bash"], 
  ["complex","easy","意味bash"], 
  ["exit","ingress","意味bash"], 
  ["courage","fear","意味bash"], 
  ["fear","courage","意味bash"], 
  ["light","dark","意味bash"], 
  ["crater","luizi","中央アフリカのルイージクレーター"], 
  ["S[/ ]?1980[. ]?S ?26","pandora","土星の衛星パンドラ"], 
  ["expand","contract","意味bash"], 
  ["[1L][0o][5v][3e][1L][4a](100|c)[3e]","lovelace","leet"], 
  ["intellij","idea","web検索"], 
  ["d[3e][1L][7t][@a]","change","意味不明"], 
  ["000[\- ]?28VS","martin","ギターの型番"], 
  ["Great ?Old ?(1|Ones?)","cthulhu","クトゥルフ神話の旧き者達"], 
  ["an ?iliad ?of ?woes","ANATHEMA","web検索"], 
  ["cowardice","fear","類義語 (恐れ、臆病)"], 
  ["cowardice","courage","対義語 (臆病<>勇気)"], 
  ["(the ?)?scout","obsidius","obsidiusはtitusの下で斥候として働いた"], 
  ["ghost ?artist","tycho","関連"], 
  ["separate","together","対義語"], 
  ["woolf","wolfe","Oliver Lynton-Wolfeのウルフと同音(これも名前)"], 
  ["shut","open","対義語"], 
  ["albert","einstein","人名 アインシュタイン Albert Einstein"], 
  ["iskar ?zaqiqu","dream","web検索"], 
  ["go","stay","意味bash"], 
  ["park","bletchley","bletchley park (ナイジェルモイヤー所属のデコーダーグループ?)"], 
  ["kthulhu","cthulhu","homonym (同音異字)"], 
  ["eight","ate","homophone(異形同音異義語)"], 
  ["ate","eight","homophone(異形同音異義語)"], 
  ["66000741","danger","web検索 danger cave"], 
  ["tactical","strategic","対義語 戦術と戦略"], 
  ["artefact","artifact","同義語"], 
  ["artifakt","artifact","同音"], 
  ["2001-?006b","DESTINY","ISSの米国モジュール(DESTINY)のNSSDC ID(国際衛星識別符号)"], 
  ["acolyte","jahan","反対勢力のリーダー"], 
  ["jahan","acolyte","反対勢力のリーダー"], 
  ["join","separate","反対語"], 
  ["DIPOLE","monopole","1/2ダイポールとモノポール"], 
  ["foggys?","misty","類義語"], 
  ["mk","ultra","kw mkultraより"], 
  ["ada","byron","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル) の父親である詩人Byron"], 
  ["byron","ada","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル) の父親である詩人Byron"], 
  ["byron","augusta","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル) の父親である詩人Byron"], 
  ["augusta","byron","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル) の父親である詩人Byron"], 
  ["ada","lovelace","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["ada","augusta","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["lovelace","ada","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["lovelace","augusta","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["augusta","lovelace","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["augusta","ada","世界初のプログラマ Augusta Ada King-Noel, Countess of Lovelace (ラブレス伯爵夫人オーガスタ エイダ キングノエル)"], 
  ["[1i][5s][0o][6b]r[0o]n[7t]","isobront","leet"], 
  ["[5S][0o]u[1L]","soul","leet"], 
  ["[1L][3E][5S][5S]","less","leet"], 
  ["[1i]n[9g]r[3e][5s][5s]","ingress","leet"], 
  ["[1i]n[5v][3E]n[1i]r[1i]","inveniri","leet"], 
  ["(1|one|[0o]n[3e])[1i]r[1i]c","oneiric","leet"], 
  ["90091","http://goo.gl/","leet"], 
  ["[5v][1i][5s]ur","visur","leet"], 
  ["[5v][3E]R[1I][7T][4A][5S]","veritas","leet"], 
  ["[1L][0o][5s][3e]","lose","leet"], 
  ["[5s][4a][5v][3e]","save","leet"], 
  ["R[3E][5S][7T]R[4A][1I]N[7T]","restraint","leet"], 
  ["p[0o]t[3e]nt[1i][4a][7l]","potential","leet"], 
  ["H[0o][1L][1L][4A]ND","holland","leet"], 
  ["pr[0o]f[1i][7L][3e]","profile","leet"], 
  ["[5S][3E]N[5S][1I]T[1I][5v][3E]","sensitive","leet"], 
  ["[5v]au(50|L)t","vault","leet"], 
  ["[5v][3E]r[1i]ty","verity","leet"], 
  ["[5s]ucc[3E][5s][5s]","success","leet"], 
  ["[3E][5s]c[4A]p[3E]","escape","leet"], 
  ["(50|[17L])[1i][5v][3e]","live","ローマ数字 50→L leet"], 
  ["[1i]nt[3E](50|[17L])","intel","leet"], 
  ["d[3E][5v]r[4A]","devra","leet"], 
  ["N[1i]GhTM[4A]R[3E]","dream","(leet) nightmare > dream"], 
  ["[3e][5v][0o][1L][5v][3e]","evolve","leet"], 
  ["c[0o]v[3E]rup","coverup","leet"], 
  ["c[0o][1L][1L]ap[5s][3E]","collapse","leet"], 
  ["j[0o]hn[5s][0o]n","johnson","leet"], 
  ["j[4A]r[5v][1i][5s]","jarvis","leet"], 
  // ================["bifid","cipher","関連"], 
  ["local","global","反対語"], 
  ["empire","rebel","意味bash 帝国軍<>反乱軍"], 
  ["khaos","chaos","ギリシャ語のchaos"], 
  ["temple","body","関連 こめかみとボディ"], 
  ["R[3E][5S][7T]R[4A][1I]N[7T]","restraint","leet"], 
  ["long ?(&|and) ?prosper","live","live long and prosper by Mr.spock 'バルカン人の挨拶「長寿と繁栄を」'"], 
  ["nowhere ?ks","courage","漫画の中の町 COURAGE THE COWARDLY DOG"], 
  ["weak","strong","反対語"], 
  ["strong","weak","反対語"], 
  ["POTIDAEA","Cassandra","ポティダイア。古代都市名。後のCassandreia。"], 
  ["speedtime","distance","speed=time×distance"], 
  ["4virgates","hide","単位"], 
  ["dzire","desire","雰囲気"], 
  ["higgs","boson","Higgs-Boson ヒッグス粒子"], 
  ["boson","higgs","Higgs-Boson ヒッグス粒子"], 
  ["myosotis","not","forget-me-not(勿忘草)の学名"], 
  ["myosotis","me","forget-me-not(勿忘草)の学名"], 
  ["myosotis","forget","forget-me-not(勿忘草)の学名"], 
  ["prrfktshnn","perfection","雰囲気?"], 
  ["afram","marfa","反転"], 
  ["marfa","afram","反転"], 
  ["dev","blackdev","省略"], 
  ["79843","Marfa","関連 zip code"], 
  ["79843","afram","関連 zip code → marfa の反転"], 
  ["stone","shonin","関連"], 
  ["matter","exotic","関連"], 
  ["matter","XM","関連"], 
  ["exotic","matter","関連"], 
  ["exotic","XM","関連"], 
  ["exotic ?matter","XM","関連"], 
  ["you","other","グリフ同形"], 
  ["other","you","グリフ同形"], 
  ["we","us","グリフ同形"], 
  ["us","we","グリフ同形"], 
  ["want","desire","グリフ同形"], 
  ["desire","want","グリフ同形"], 
  ["stay","stability","グリフ同形"], 
  ["stability","stay","グリフ同形"], 
  ["spirit","soul","グリフ同形"], 
  ["soul","spirit","グリフ同形"], 
  ["life ?force","spirit","グリフ同形"], 
  ["life ?force","soul","グリフ同形"], 
  ["shaper","collective","グリフ同形"], 
  ["collective","shaper","グリフ同形"], 
  ["seek","search","グリフ同形"], 
  ["search","seek","グリフ同形"], 
  ["save","rescue","グリフ同形"], 
  ["rescue","save","グリフ同形"], 
  ["struggle","resistance","グリフ同形"], 
  ["struggle","resist","グリフ同形"], 
  ["resistance","struggle","グリフ同形"], 
  ["resistance","resist","グリフ同形"], 
  ["resist","struggle","グリフ同形"], 
  ["resist","resistance","グリフ同形"], 
  ["pursue","chase","グリフ同形"], 
  ["chase","pursue","グリフ同形"], 
  ["pursue","aspiration","グリフ同形"], 
  ["aspiration","pursue","グリフ同形"], 
  ["purity","pure","グリフ同形"], 
  ["pure","purity","グリフ同形"], 
  ["present","now","グリフ同形"], 
  ["now","present","グリフ同形"], 
  ["perfection","balance","グリフ同形"], 
  ["balance","perfection","グリフ同形"], 
  ["portal","opening","グリフ同形"], 
  ["portal","doorway","グリフ同形"], 
  ["opening","portal","グリフ同形"], 
  ["opening","doorway","グリフ同形"], 
  ["doorway","portal","グリフ同形"], 
  ["doorway","opening","グリフ同形"], 
  ["accept","open","グリフ同形"], 
  ["open","accept","グリフ同形"], 
  ["no","not","グリフ同形"], 
  ["no","inside","グリフ同形"], 
  ["no","absent","グリフ同形"], 
  ["not","no","グリフ同形"], 
  ["not","inside","グリフ同形"], 
  ["not","absent","グリフ同形"], 
  ["inside","no","グリフ同形"], 
  ["inside","not","グリフ同形"], 
  ["inside","absent","グリフ同形"], 
  ["absent","no","グリフ同形"], 
  ["absent","not","グリフ同形"], 
  ["absent","inside","グリフ同形"], 
  ["thought","mind","グリフ同形"], 
  ["thought","idea","グリフ同形"], 
  ["mind","thought","グリフ同形"], 
  ["mind","idea","グリフ同形"], 
  ["idea","thought","グリフ同形"], 
  ["idea","mind","グリフ同形"], 
  ["loss","lose","グリフ同形"], 
  ["lose","loss","グリフ同形"], 
  ["live ?again","reincarnate","グリフ同形"], 
  ["self","me","グリフ同形"], 
  ["self","i","グリフ同形"], 
  ["me","self","グリフ同形"], 
  ["me","i","グリフ同形"], 
  ["i","self","グリフ同形"], 
  ["i","me","グリフ同形"], 
  ["peace","harmony","グリフ同形"], 
  ["harmony","peace","グリフ同形"], 
  ["structure","government","グリフ同形"], 
  ["structure","civilization","グリフ同形"], 
  ["structure","city","グリフ同形"], 
  ["government","structure","グリフ同形"], 
  ["government","civilization","グリフ同形"], 
  ["government","city","グリフ同形"], 
  ["civilization","structure","グリフ同形"], 
  ["civilization","government","グリフ同形"], 
  ["civilization","city","グリフ同形"], 
  ["city","structure","グリフ同形"], 
  ["city","government","グリフ同形"], 
  ["city","civilization","グリフ同形"], 
  ["future","time","関連"], 
  ["future","forward","関連"], 
  ["forward[\\-\\s]?time","future","グリフ同形"], 
  ["success","progress","グリフ同形"], 
  ["success","evolution","グリフ同形"], 
  ["progress","success","グリフ同形"], 
  ["progress","evolution","グリフ同形"], 
  ["evolution","success","グリフ同形"], 
  ["evolution","progress","グリフ同形"], 
  ["enlightenment","enlightened","グリフ同形"], 
  ["enlightened","enlightenment","グリフ同形"], 
  ["enlightenment","enlighten","関連"], 
  ["enlightened","enlighten","関連"], 
  ["enlighten","enlightenment","関連"], 
  ["enlighten","enlightened","関連"], 
  ["close","finality","グリフ同形"], 
  ["close","end","グリフ同形"], 
  ["end","finality","グリフ同形"], 
  ["end","close","グリフ同形"], 
  ["close","finality","グリフ同形"], 
  ["close","end","グリフ同形"], 
  ["outside","distance","グリフ同形"], 
  ["distance","outside","グリフ同形"], 
  ["erode","deteriorate","グリフ同形"], 
  ["deteriorate","erode","グリフ同形"], 
  ["destruction","destroy","グリフ同形"], 
  ["destroy","destruction","グリフ同形"], 
  ["signal","message","グリフ同形"], 
  ["signal","data","グリフ同形"], 
  ["message","signal","グリフ同形"], 
  ["message","data","グリフ同形"], 
  ["data","signal","グリフ同形"], 
  ["data","message","グリフ同形"], 
  ["thought","mind","グリフ同形"], 
  ["thought","idea","グリフ同形"], 
  ["thought","creativity","グリフ同形"], 
  ["mind","thought","グリフ同形"], 
  ["mind","idea","グリフ同形"], 
  ["mind","creativity","グリフ同形"], 
  ["idea","thought","グリフ同形"], 
  ["idea","mind","グリフ同形"], 
  ["idea","creativity","グリフ同形"], 
  ["creativity","thought","グリフ同形"], 
  ["creativity","mind","グリフ同形"], 
  ["creativity","idea","グリフ同形"], 
  ["creation","create","グリフ同形"], 
  ["create","creation","グリフ同形"], 
  ["reduce","contract","グリフ同形"], 
  ["contract","reduce","グリフ同形"], 
  ["disorder","chaos","グリフ同形"], 
  ["chaos","disorder","グリフ同形"], 
  ["obstacle","barrier","グリフ同形"], 
  ["barrier","obstacle","グリフ同形"], 
  ["avoid","struggle","グリフ同形"], 
  ["struggle","avoid","グリフ同形"], 
  ["war","attack","グリフ同形"], 
  ["attack","war","グリフ同形"], 
  ["repeat","again","グリフ同形"], 
  ["again","repeat","グリフ同形"], 
  ["0226481123","lightman","ISBN"], 
  ["noise","signal","反対語"], 
  ["lgeczmp","congo","web検索"], 
  ["nothing ?injure ?will? tom ?poor","bedlam","web検索"], 
  ["3links","field","control field"], 
  ["no2011134280","Ezekiel","アメリカ議会図書館の管理番号?"], 
  ["Zeke","Ezekiel","愛称"], 
  ["\\^","attack","グリフ"], 
  ["\\^","more","グリフ"], 
  ["\\^","power","冪乗"], 
  ["scanner","ingress","関連"], 
  ["great","magnus","ラテン語でmagnus"], 
  ["subject28","akira","アニメAKIRAより28話のサブタイトル (web検索)"], 
  ["9781626361737","discover","図書コード?"], 
  ["BLKOPS","blackops","略"], 
  ["qb","cube","略"], 
  ["\\\?dah","whydah","? → why"], 
  ["7k8","martin","空港コード Martin Field Airport"], 
  ["\.?50\.?0\.?100\.?1\.?","loci","ローマ数字"], 
  ["stipulatio","contract","ローマ法の契約(contract)"], 
  ["ohm","mantra","ヨガ用語でmantraをオームと呼ぶ"], 
  ["Ω","mantra","ヨガ用語でmantraをオームと呼ぶ"], 
  ["omega","mantra","ヨガ用語でmantraをオームと呼ぶ"], 
  ["chaotic","ordered","反対語"], 
  ["ordered","chaotic","反対語"], 
  ["1938 ?XE","aura","小惑星 Asteroid 1488 Aura (1938 XE)"], 
  ["abdn","abaddon","略"], 
  ["r","write","意味bash read<>write"], 
  ["lawful","chaotic","意味bash 秩序<>混乱"], 
  ["मन्त्र","mantra","サンスクリット語"], 
  ["दर्शन","darsana","サンスクリット語"], 
  ["philosophy","darsana","哲学(ヒンドゥ哲学？darsana)"], 
  ["kapture","capture","(同音)全てのkをcにしてみること"], 
  ["liberate","capture","意味bash"], 
  ["capture","liberate","意味bash"], 
  ["nc205y","alexander","alexander航空所有の機体ナンバー"], 
  ["eroteme","question","eroteme = question mark"], 
  ["tarboosh","fez","トルコ帽(fez)の別名"], 
  ["thirteen","magnus","13magnus"], 
  ["13","magnus","13magnus"], 
  ["0","all","gryph"], 
  ["v","defendv","グリフ変換"], 
  ["v","defend","グリフ変換"], 
  ["|","crear","グリフ"], 
  ["\\\\","destroy","グリフ"], 
  ["/","create","グリフ"], 
  ["@","search","グリフの形"], 
  ["@","unbounded","グリフ"], 
  ["c","future","グリフ"], 
  ["u","now","グリフ"], 
  ["u","present","グリフ"], 
  ["nzeer","shaper","反対 意味bash"], 
  ["shaper","nzeer","反対 意味bash"], 
  ["noir","lux","反対 意味bash"], 
  ["lux","noir","反対 意味bash"], 
  ["hubris","nemesis","傲慢(hubris)に相対する応報天罰の神(nemesis)"], 
  ["nemesis","hubris","傲慢(hubris)に相対する応報天罰の神(nemesis)"],
  ["align","alignment",""], 
  ["Kifl ?Shrine","ezekiel","関連"], 
  ["ezechiel","ezekiel","同義"], 
  ["ancient ?seer","cybella","ancient seer (預言者) oracle > cybella"], 
  ["a-a","detection","ada detection"],
  ["a-a","ada",""], 
  ["akolouthos","Acolyte","ギリシャ語よみ"], 
  ["\\?","question","? > question"], 
  ["zrh","zurich","ドイツ チューリッヒ空港略号"], 
  ["bhoot","ghost","インドのホラー映画(英名ghost)"], 
  ["62fb5d750c30a27a26d01c5f3d8df459","oneiric","Ubuntu 11.10 Oneiric Ocelot isoイメージのMD5 hash"], 
  ["μ","muon","μ → ミュー粒子(muon)の記号"], 
  ["μ","microdot","μ → micro"], 
  ["Gilf ?Kebir","barrier","別名the Great Barrier"], 
  ["Jilf ?al ?Kabir","barrier","別名the Great Barrier"], 
  ["nearhigh","farlowe","意味bash near high <> far low"], 
  ["Da ?Ba ?Dee","Blue","Italian music group Eiffel 65 のデビュー曲 「Blue (Da Ba Dee」)"], 
  ["night","epiphany","epiphany night (啓示の夜)"], 
  ["day","epiphany","反対語 day <> night (epiphany night)"], 
  ["000000DEV","blackdev","#000000 > black"], 
  ["x","Verity","XといえばVerity Seke"], 
  ["alkhwarizmi","algorithm","イスラムの科学者アル＝フワーリズミー。アルゴリズムの由来の人物像 "], 
  ["B0117ZVZBY","Hajra","The Niantic Project: Ingress 図書コード ASIN: B0117ZVZBY 著者 Felicia Hajra-Lee"], 
  ["13magnus","antimagnus","意味bash"], 
  ["smiles","kodama","登場人物 Kodama Smiles"], 
  ["pa","chapeau","登場人物"], 
  ["Oliver","Wolfe","登場人物 Oliver Lynton-Wolfe"], 
  ["Lynton","Wolfe","登場人物 Oliver Lynton-Wolfe"], 
  ["Schubert","Martin","登場人物 Martin Schubert"], 
  ["Martin","Schubert","登場人物 Martin Schubert"], 
  ["J","Phillips","登場人物 Jay Phillips"], 
  ["Jay","Phillips","登場人物 Jay Phillips"], 
  ["Bowles","Henry","登場人物 Henry Bowles"], 
  ["ADA","Algorithm","登場人物  A Detection Algorithm (ADA)"], 
  ["ADA","Detection","登場人物  A Detection Algorithm (ADA)"], 
  ["Algorithm","ADA","登場人物  A Detection Algorithm (ADA)"], 
  ["Algorithm","Detection","登場人物  A Detection Algorithm (ADA)"], 
  ["Detection","ADA","登場人物  A Detection Algorithm (ADA)"], 
  ["Detection","Algorithm","登場人物  A Detection Algorithm (ADA)"], 
  ["Nagassa","Alaric","登場人物  A Detection Algorithm (ADA)"], 
  ["Nagassa","Alaric","登場人物 Yuri Alaric Nagassa"], 
  ["Nagassa","Yuri","登場人物 Yuri Alaric Nagassa"], 
  ["Alaric","Nagassa","登場人物 Yuri Alaric Nagassa"], 
  ["Alaric","Yuri","登場人物 Yuri Alaric Nagassa"], 
  ["Yuri","Nagassa","登場人物 Yuri Alaric Nagassa"], 
  ["Yuri","Alaric","登場人物 Yuri Alaric Nagassa"], 
  ["Hannah","Misty","登場人物 Misty Hannah"], 
  ["Misty","Hannah","登場人物 Misty Hannah"], 
  ["Holland","Johnson","登場人物 Henry Hank (Holland) Johnson"], 
  ["Hank","Johnson","登場人物 Henry Hank (Holland) Johnson"], 
  ["Henry","Johnson","登場人物 Henry Hank (Holland) Johnson"], 
  ["Johnson","Holland","登場人物 Henry Hank (Holland) Johnson"], 
  ["Hank","Holland","登場人物 Henry Hank (Holland) Johnson"], 
  ["Henry","Holland","登場人物 Henry Hank (Holland) Johnson"], 
  ["Johnson","Henry","登場人物 Henry Hank (Holland) Johnson"], 
  ["Holland","Henry","登場人物 Henry Hank (Holland) Johnson"], 
  ["Hank","Henry","登場人物 Henry Hank (Holland) Johnson"], 
  ["Johnson","Hank","登場人物 Henry Hank (Holland) Johnson"], 
  ["Holland","Hank","登場人物 Henry Hank (Holland) Johnson"], 
  ["Henry","Hank","登場人物 Henry Hank (Holland) Johnson"], 
  ["Bogdanovich","Devra","登場人物 Devra Bogdanovich"], 
  ["Beth","Campbell","登場人物 Carrie Beth Campbell"], 
  ["Beth","Carrie","登場人物 Carrie Beth Campbell"], 
  ["Campbell","Carrie","登場人物 Carrie Beth Campbell"], 
  ["Carrie","Campbell","登場人物 Carrie Beth Campbell"], 
  ["Seke","Verity","登場人物 Verity Seke"], 
  ["Akira","Tsukasa","登場人物 Akira Tsukasa"], 
  ["Tsukasa","Akira","登場人物 Akira Tsukasa"], 
  ["Thomas","Greanias","登場人物 Thomas Greanias"], 
  ["Loeb","Chapeau","登場人物 Richard Loebのペンネーム)"], 
  ["Richard","Chapeau","登場人物 Richard Loebのペンネーム)"], 
  ["Chapeau","Richard","登場人物 Richard Loebのペンネーム)"], 
  ["Nigel","Moyer","登場人物 Nigel Moyer (Susanna Moyerの父)"], 
  ["kinetic","potential","対グリフ 運動エネルギー<>位置エネルギー"], 
  ["Lee","Hajra","登場人物 Felicia Hajra-Lee"], 
  ["Hajra","Felicia","登場人物 Felicia Hajra-Lee"], 
  ["Felicia","Hajra","登場人物 Felicia Hajra-Lee"], 
  ["Ni","Yuen","登場人物 Yuen Ni"], 
  ["Yuen","Ni","登場人物 Yuen Ni"], 
  ["retreat","advance","対義語"], 
  ["3XP10R3R","EXPLORER","Leet"], 
  ["eski ?skisepje","skepsis","skepsisの別名？"], 
  ["witness","shonin","witness > 証人"], 
  ["atbash","cipher","暗号方法"], 
  ["helenus","Cassandra","ギリシャ神話の予言者ヘレノス。双子の兄妹はカサンドラ"], 
  ["030","ada","012abc"], 
  ["000300","ada","012abc(2桁)"], 
  ["141","ada","123abc"], 
  ["010401","ada","123abc(2桁)"], 
  ["rong","write","rong>wrong<>right<write (同音異義語&意味bash)"], 
  ["Tain ?Enabran","obsidian","STAR TREK 登場人物"], 
  ["mind","body","対義語"], 
  ["soul","body","対義語"], 
  ["mind","soul","glyphbash"], 
  ["energy","matter","energy ⇔ matter(物質)"], 
  ["gluon ?plasma","quark","Quark-Gluon Plasma, QGP"], 
  ["destoneny","dest1ny","one → 1"], 
  ["destoneny","destiny","one → i"], 
  ["peace","war","反対語"], 
  ["the ?mind ?killer","fear","前例あり"], 
  ["greywindladynymeriasummershaggydog","Ghost","ファンタジー小説(ドラマ) Game of Thrones に出てくる犬達の名前"], 
  ["rcrsn","recursion","rcrsn → recursion"], 
  ["loeb","Richard","登場人物 Richard Loeb"], 
  ["Owen","Ken","登場人物 Ken Owen"], 
  ["Ken","Owen","登場人物 Ken Owen"], 
  ["nikolaital","Matter","nikolaitalはThe Matter Valleyの別名"], 
  ["Role","alignment","NetHack wikiで Role Alignment が出てくる"], 
  ["g43.1","aura","net検索で「G43.1 Migraine with aura」出てくる"], 
  ["mork","mindy","コメディ番組 mork&mindy"], 
  ["ASTERION","Minotaur","ミノタウロスの名前"], 
  ["ofCrows","Murder","A Murder of Crows"], 
  ["dnargeuguf","13","弦楽四重奏曲第13番「巨大なフーガ」"], 
  ["Grand ?Fugue","13","弦楽四重奏曲第13番「巨大なフーガ」"], 
  ["ayze1863","mole","フランスの標高1863mの山'Le Môle'"], 
  ["youonstuck","failure","Fantastic Planetのアルバム'failure'の15曲目'stuck on you'"], 
  ["stuck ?on ?you","failure","Fantastic Planetのアルバム'failure'の15曲目"], 
  ["then","now","熟語 now and than"], 
  ["61DZC-60x20","journey","http://youtu.be/61DZC-60x20"], 
  ["576505181","ingress","iOS Ingress app ID: 576505181"], 
  ["7306050","more","検索 > More on Vimeo"], 
  ["spring ?dwindle","collapse","春の減少 →蜂群崩壊症候群 Colony Collapse Disorder"], 
  ["cc","Carrie","NianticのCarrie Campbell"], 
  ["power","Knowledge","諺 知識は力なり Knowledge is power"], 
  ["herm1204","Mole","model No. herm1204 > Hernan Mole Poblano"], 
  ["fire7","forget"," 7→& 軍事用語 fire & forget"], 
  ["311nt","elint","leet"], 
  ["vi","verum","人名: Verum Inveniri"], 
  ["vi","Inveniri","人名: Verum Inveniri"], 
  ["mind ?soul","body","glyphパターン"],["nomad","hank",""], 
  ["u","you","1文字置き換え"], 
  ["(\\d[a-z]{3}\\d)g([a-z]\\d[a-z]\\d[a-z])","$1gravity$2","キーワード部一文字。頭文字が g > gravity"], 
  ["[1L][0o][5s][5s]","loss","leet"], 
  ["j0hn51","johnsone","leet"], 
  ["[0o]u[7t][5s][1i]d[3e]","outside","leet"], 
  ["0ut51d21","outside","> 0ut51d3 > outside"], 
  ["zerout5oned2one","outside","zerout5oned2one > 0ut51d21 > 0ut51d3 > outside"], 
  ["SYPHAX ?CYBELLA","obsidius","SYPHAXとCYBELLAとobsidiusの3人はTitusに会うことになっていた"], 
  [".","darsana","darsana pointより"], 
  ["point","darsana","darsana pointより"], 
  ["c","see","同じ発音"], 
  ["spoils","kureze","ことわざ「To the victor goes the spoils.」戦利品は勝利者のもの。からvictor→人名「victor kureze」"], 
  ["wien","acolyte","Obsidian vienna (オーストリアのウィーン)配布メダルの人物 'The Acolyte'"], 
  ["devoid ?of ?joy","interitus","anomaly"], 
  ["Pb","lead","元素記号Pb→鉛→lead"], 
  ["82","lead","元素番号82→鉛→lead"], 
  ["jarvis ?shot","zurich","jarvisが撃たれた場所はチューリッヒ"], 
  ["voxgower","clamantis","ポエム Vox Clamantisより"], 
  ["<","less","数学記号 < 'less than'"], 
  ["bogdanovich","devra","人名 Devra Bogdanovich"], 
  ["see","c","同じ発音"], 
  ["us","them","反対語"], 
  ["them","us","反対語"], 
  ["w","worth","glyph"], 
  ["belong ?the ?spoil","kureze","諺「to the victor belong the spoils」よりVictor > 人名 Victor Kureze"], 
  ["belong ?the ?spoil","victor","諺「to the victor belong the spoils」より"], 
  ["persepolis","shonin","前例あり。anomaly繋がり"], 
  ["food ?for","thought","'food for thought' 思考の糧"], 
  ["alien","predator","alien を対抗するpredatorに意味bash"], 
  ["twenty ?five ?million ?for ?onyx","recharger","2,500万XMでONYXメダル"], 
  ["Enoch","Dalby","登場人物 Enoch Dalby"], 
  ["Dalby(see)?","Enoch","登場人物 Enoch Dalby"], 
  ["the ?imagination ?of ?ourselves","dream","事例あり"], 
  ["Beautiful ?friend","end","This is the end Beautiful friend で始まるDoorsのThe endという歌"], 
  ["anti","magnus","前例あり"], 
  ["1iric","oneiric","前例あり"], 
  ["zero","cipher","アラビア語でゼロの意味"], 
  ["yellow","blue","前例あり"], 
  ["-","not","前例あり"], 
  ["young","old","反対語"], 
  ["3cb371","green","Color #3cb371 Medium sea green"], 
  ["isdead","Jarvis","is dead -> Roland Jarvis"], 
  ["iamnotdead","Jarvis","i am not dead -> Roland Jarvis"], 
  ["hulongtrans","global","関連企業 Hulong Transglobal社"], 
  ["great","magnus","English → Latin (ラテン語) "], 
  ["Susanna","Moyer","登場人物 Susanna Moyer"], 
  ["Moyer","Susanna","登場人物 Susanna Moyer"], 
  ["Izik","Avinoam","登場人物 Izik Avinoam"], 
  ["calvin","Ezekiel","登場人物 Dr. Ezekiel Calvin"], 
  ["jarvis","Roland","登場人物 Roland Jarvis"], 
  ["roland","jarvis","登場人物 Roland Jarvis"], 
  ["Ezekiel","Calvin","登場人物 Ezekiel Calvin"], 
  ["Lightman","Stein","登場人物 Stein Lightman"], 
  ["Stein","Lightman","登場人物 Stein Lightman"], 
  ["exagoge","Ezekiel","預言者エゼキエルと関連"], 
  ["80860","intel","インテル i860プロセッサ"], 
  ["IntelliJ","IDEA","Java IDE の一種"], 
  ["jsx","react","プログラミング言語JSXより"], 
  ["alorazon","iqtech","NianticProjectWikiより"], 
  ["adetection","algorithm","a adetection algorithm (ADA)より"], 
  ["hat","chapeau","フランス語へ"], 
  ["epiphanynightcatalyst","powercube","epiphany night catalyst 啓示の夜のきっかけ"], 
  ["deadnotami","roland","i am not dead から Roland Jarvis"], 
  ["vaccinemaker","devra","vaccine maker (ワクチン製作者)は Devra Bogdanovich"], 
  ["glitchyben","jackland","glitchy ben から人名 Ben Jackland"], 
  ["scannerapp","ingress","scanner app"], 
  ["victor","kureze","人名 Victor Kureze"], 
  ["kureze","victor","人名 Victor Kureze"], 
  ["Hubert","Farlowe","人名 Hubert Farlowe より"], 
  ["Farlowe","Hubert","人名 Hubert Farlowe より"], 
  ["verum","inveniri","人名 Verum Inveniri より"], 
  ]

  // ループで置き換え呼び出し
  for (var i in exL) {
    Exchange(exL[i][0],exL[i][1],exL[i][2]);
  }
 
}

function Exchange(re, tx, ds) {
  //var esclist=[".","*","+","|","(",")","[","]","-"]; //ハテナは除いた
  // re 検索ワード
  // tx 置き換えワード
  // ds 説明

  var esclist=["."]; 
  for (var i in esclist) {
    esclist[i]="\\"+esclist[i];
    var escRE=new RegExp(esclist[i], "ig");
    re=re.replace(escRE,"\\$&");
  }
    var rx=new RegExp(re, "ig");
    if (TEXT.match(rx)) {
        htmlTmp.push(ds);
        /*htmlTmp.push(
          re.replace(/\?|\\/g,"")+" → "+tx);*/
        htmlTmp.push(
          RegExp.lastMatch+" → "+tx);
        htmlTmp.push(
          checkCodeHTML(
            TEXT.replace(
              rx, tx).replace(/\s/g,"")));
        htmlTmp.push("-----------");
    }
}

