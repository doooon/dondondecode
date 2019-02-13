
// LIB_過去回答3
// #LIB

function kakokaitou3() {
  
htmlTmp.push("<div class='red'>--- kako 3 ---</div>");


// 3組の16進数([0-9a-f]{6})で割り切れる
// colorコード
if (TEXT.match(/^([0-9a-f]{6})+$/i)) {
  htmlTmp.push(TEXT);
  htmlTmp.push(
    "<b>(hex color code)</b>");
  var tmpList=TEXT.match(
    /[0-9a-f]{6}/ig);
  htmlTmp.push(tmpList.join(" "));
  htmlTmp.push("-------");
  var map=[
["0048BA", "Absolute Zero"], 
["4C2F27", "Acajou"], 
["B0BF1A", "Acid green"], 
["7CB9E8", "Aero"], 
["C9FFE5", "Aero blue"], 
["B284BE", "African violet"], 
["5D8AA8", "Air Force blue (RAF)"], 
["00308F", "Air Force blue (USAF)"], 
["72A0C1", "Air superiority blue"], 
["AF002A", "Alabama crimson"], 
["F0F8FF", "Alice blue"], 
["84DE02", "Alien Armpit"], 
["E32636", "Alizarin crimson"], 
["C46210", "Alloy orange"], 
["EFDECD", "Almond"], 
["E52B50", "Amaranth"], 
["9F2B68", "Amaranth deep purple"], 
["F19CBB", "Amaranth pink"], 
["AB274F", "Amaranth purple"], 
["D3212D", "Amaranth red"], 
["3B7A57", "Amazon"], 
["FFBF00", "Amber"], 
["FF7E00", "Amber (SAE/ECE)"], 
["FF033E", "American rose"], 
["9966CC", "Amethyst"], 
["A4C639", "Android green"], 
["F2F3F4", "Anti-flash white"], 
["CD9575", "Antique brass"], 
["665D1E", "Antique bronze"], 
["915C83", "Antique fuchsia"], 
["841B2D", "Antique ruby"], 
["FAEBD7", "Antique white"], 
["008000", "Ao (English)"], 
["8DB600", "Apple green"], 
["FBCEB1", "Apricot"], 
["00FFFF", "Aqua"], 
["7FFFD4", "Aquamarine"], 
["D0FF14", "Arctic lime"], 
["4B5320", "Army green"], 
["3B444B", "Arsenic"], 
["8F9779", "Artichoke"], 
["E9D66B", "Arylide yellow"], 
["B2BEB5", "Ash grey"], 
["87A96B", "Asparagus"], 
["FF9966", "Atomic tangerine"], 
["A52A2A", "Auburn"], 
["FDEE00", "Aureolin"], 
["6E7F80", "AuroMetalSaurus"], 
["568203", "Avocado"], 
["C39953", "Aztec Gold"], 
["007FFF", "Azure"], 
["F0FFFF", "Azure (web color)"], 
["F0FFFF", "Azure mist"], 
["DBE9F4", "Azureish white"], 
["89CFF0", "Baby blue"], 
["A1CAF1", "Baby blue eyes"], 
["F4C2C2", "Baby pink"], 
["FEFEFA", "Baby powder"], 
["FF91AF", "Baker-Miller pink"], 
["21ABCD", "Ball blue"], 
["FAE7B5", "Banana Mania"], 
["FFE135", "Banana yellow"], 
["006A4E", "Bangladesh green"], 
["E0218A", "Barbie pink"], 
["7C0A02", "Barn red"], 
["1DACD6", "Battery Charged Blue"], 
["848482", "Battleship grey"], 
["98777B", "Bazaar"], 
["BCD4E6", "Beau blue"], 
["9F8170", "Beaver"], 
["FA6E79", "Begonia"], 
["F5F5DC", "Beige"], 
["2E5894", "B'dazzled blue"], 
["9C2542", "Big dip o’ruby"], 
["E88E5A", "Big Foot Feet"], 
["FFE4C4", "Bisque"], 
["3D2B1F", "Bistre"], 
["967117", "Bistre brown"], 
["CAE00D", "Bitter lemon"], 
["BFFF00", "Bitter lime"], 
["FE6F5E", "Bittersweet"], 
["BF4F51", "Bittersweet shimmer"], 
["000000", "Black"], 
["3D0C02", "Black bean"], 
["54626F", "Black Coral"], 
["253529", "Black leather jacket"], 
["3B3C36", "Black olive"], 
["BFAFB2", "Black Shadows"], 
["FFEBCD", "Blanched almond"], 
["A57164", "Blast-off bronze"], 
["318CE7", "Bleu de France"], 
["ACE5EE", "Blizzard Blue"], 
["FAF0BE", "Blond"], 
["0000FF", "Blue"], 
["1F75FE", "Blue (Crayola)"], 
["0093AF", "Blue (Munsell)"], 
["0087BD", "Blue (NCS)"], 
["0018A8", "Blue (Pantone)"], 
["333399", "Blue (pigment)"], 
["0247FE", "Blue (RYB)"], 
["A2A2D0", "Blue Bell"], 
["00B9FB", "Blue Bolt"], 
["6699CC", "Blue-gray"], 
["0D98BA", "Blue-green"], 
["5DADEC", "Blue Jeans"], 
["ACE5EE", "Blue Lagoon"], 
["553592", "Blue-magenta violet"], 
["126180", "Blue sapphire"], 
["8A2BE2", "Blue-violet"], 
["5072A7", "Blue yonder"], 
["4F86F7", "Blueberry"], 
["1C1CF0", "Bluebonnet"], 
["DE5D83", "Blush"], 
["79443B", "Bole"], 
["0095B6", "Bondi blue"], 
["E3DAC9", "Bone"], 
["DDE26A", "Booger Buster"], 
["CC0000", "Boston University Red"], 
["006A4E", "Bottle green"], 
["873260", "Boysenberry"], 
["0070FF", "Brandeis blue"], 
["B5A642", "Brass"], 
["CB4154", "Brick red"], 
["1DACD6", "Bright cerulean"], 
["66FF00", "Bright green"], 
["BF94E4", "Bright lavender"], 
["D891EF", "Bright lilac"], 
["C32148", "Bright maroon"], 
["1974D2", "Bright navy blue"], 
["FF007F", "Bright pink"], 
["08E8DE", "Bright turquoise"], 
["D19FE8", "Bright ube"], 
["FFAA1D", "Bright Yellow (Crayola)"], 
["3399FF", "Brilliant azure"], 
["F4BBFF", "Brilliant lavender"], 
["FF55A3", "Brilliant rose"], 
["FB607F", "Brink pink"], 
["004225", "British racing green"], 
["CD7F32", "Bronze"], 
["737000", "Bronze Yellow"], 
["964B00", "Brown (traditional)"], 
["A52A2A", "Brown (web)"], 
["6B4423", "Brown-nose"], 
["AF6E4D", "Brown Sugar"], 
["cc9966", "Brown Yellow"], 
["1B4D3E", "Brunswick green"], 
["FFC1CC", "Bubble gum"], 
["E7FEFF", "Bubbles"], 
["7BB661", "Bud green"], 
["F0DC82", "Buff"], 
["480607", "Bulgarian rose"], 
["800020", "Burgundy"], 
["DEB887", "Burlywood"], 
["A17A74", "Burnished Brown"], 
["CC5500", "Burnt orange"], 
["E97451", "Burnt sienna"], 
["8A3324", "Burnt umber"], 
["BD33A4", "Byzantine"], 
["702963", "Byzantium"], 
["536872", "Cadet"], 
["5F9EA0", "Cadet blue"], 
["91A3B0", "Cadet grey"], 
["006B3C", "Cadmium green"], 
["ED872D", "Cadmium orange"], 
["E30022", "Cadmium red"], 
["FFF600", "Cadmium yellow"], 
["A67B5B", "Café au lait"], 
["4B3621", "Café noir"], 
["1E4D2B", "Cal Poly green"], 
["A3C1AD", "Cambridge Blue"], 
["C19A6B", "Camel"], 
["EFBBCC", "Cameo pink"], 
["78866B", "Camouflage green"], 
["FFFF99", "Canary"], 
["FFEF00", "Canary yellow"], 
["FF0800", "Candy apple red"], 
["E4717A", "Candy pink"], 
["00BFFF", "Capri"], 
["592720", "Caput mortuum"], 
["C41E3A", "Cardinal"], 
["00CC99", "Caribbean green"], 
["960018", "Carmine"], 
["D70040", "Carmine (M&P)"], 
["EB4C42", "Carmine pink"], 
["FF0038", "Carmine red"], 
["FFA6C9", "Carnation pink"], 
["B31B1B", "Carnelian"], 
["56A0D3", "Carolina blue"], 
["ED9121", "Carrot orange"], 
["00563F", "Castleton green"], 
["062A78", "Catalina blue"], 
["703642", "Catawba"], 
["C95A49", "Cedar Chest"], 
["92A1CF", "Ceil"], 
["ACE1AF", "Celadon"], 
["007BA7", "Celadon blue"], 
["2F847C", "Celadon green"], 
["B2FFFF", "Celeste"], 
["4997D0", "Celestial blue"], 
["DE3163", "Cerise"], 
["EC3B83", "Cerise pink"], 
["007BA7", "Cerulean"], 
["2A52BE", "Cerulean blue"], 
["6D9BC3", "Cerulean frost"], 
["007AA5", "CG Blue"], 
["E03C31", "CG Red"], 
["A0785A", "Chamoisee"], 
["F7E7CE", "Champagne"], 
["F1DDCF", "Champagne pink"], 
["36454F", "Charcoal"], 
["232B2B", "Charleston green"], 
["E68FAC", "Charm pink"], 
["DFFF00", "Chartreuse (traditional)"], 
["7FFF00", "Chartreuse (web)"], 
["DE3163", "Cherry"], 
["FFB7C5", "Cherry blossom pink"], 
["954535", "Chestnut"], 
["DE6FA1", "China pink"], 
["A8516E", "China rose"], 
["AA381E", "Chinese red"], 
["856088", "Chinese violet"], 
["4AFF00", "Chlorophyll green"], 
["7B3F00", "Chocolate (traditional)"], 
["D2691E", "Chocolate (web)"], 
["FFA700", "Chrome yellow"], 
["98817B", "Cinereous"], 
["E34234", "Cinnabar"], 
["D2691E", "Cinnamon"], 
["CD607E", "Cinnamon Satin"], 
["E4D00A", "Citrine"], 
["9FA91F", "Citron"], 
["7F1734", "Claret"], 
["FBCCE7", "Classic rose"], 
["0047AB", "Cobalt Blue"], 
["D2691E", "Cocoa brown"], 
["965A3E", "Coconut"], 
["6F4E37", "Coffee"], 
["C4D8E2", "Columbia Blue"], 
["F88379", "Congo pink"], 
["002E63", "Cool Black"], 
["8C92AC", "Cool grey"], 
["B87333", "Copper"], 
["DA8A67", "Copper (Crayola)"], 
["AD6F69", "Copper penny"], 
["CB6D51", "Copper red"], 
["996666", "Copper rose"], 
["FF3800", "Coquelicot"], 
["FF7F50", "Coral"], 
["F88379", "Coral pink"], 
["FF4040", "Coral red"], 
["FD7C6E", "Coral Reef"], 
["893F45", "Cordovan"], 
["FBEC5D", "Corn"], 
["B31B1B", "Cornell Red"], 
["6495ED", "Cornflower blue"], 
["FFF8DC", "Cornsilk"], 
["2E2D88", "Cosmic Cobalt"], 
["FFF8E7", "Cosmic latte"], 
["81613C", "Coyote brown"], 
["FFBCD9", "Cotton candy"], 
["FFFDD0", "Cream"], 
["DC143C", "Crimson"], 
["BE0032", "Crimson glory"], 
["990000", "Crimson red"], 
["F5F5F5", "Cultured"], 
["00FFFF", "Cyan"], 
["4E82B4", "Cyan azure"], 
["4682BF", "Cyan-blue azure"], 
["28589C", "Cyan cobalt blue"], 
["188BC2", "Cyan cornflower blue"], 
["00B7EB", "Cyan (process)"], 
["58427C", "Cyber grape"], 
["FFD300", "Cyber yellow"], 
["F56FA1", "Cyclamen"], 
["FFFF31", "Daffodil"], 
["F0E130", "Dandelion"], 
["00008B", "Dark blue"], 
["666699", "Dark blue-gray"], 
["654321", "Dark brown"], 
["88654E", "Dark brown-tangelo"], 
["5D3954", "Dark byzantium"], 
["A40000", "Dark candy apple red"], 
["08457E", "Dark cerulean"], 
["986960", "Dark chestnut"], 
["CD5B45", "Dark coral"], 
["008B8B", "Dark cyan"], 
["536878", "Dark electric blue"], 
["B8860B", "Dark goldenrod"], 
["A9A9A9", "Dark gray (X11)"], 
["013220", "Dark green"], 
["006400", "Dark green (X11)"], 
["1F262A", "Dark gunmetal"], 
["00416A", "Dark imperial blue"], 
["6E6EF9", "Dark imperial blue"], 
["1A2421", "Dark jungle green"], 
["BDB76B", "Dark khaki"], 
["483C32", "Dark lava"], 
["734F96", "Dark lavender"], 
["534B4F", "Dark liver"], 
["543D37", "Dark liver (horses)"], 
["8B008B", "Dark magenta"], 
["A9A9A9", "Dark medium gray"], 
["003366", "Dark midnight blue"], 
["4A5D23", "Dark moss green"], 
["556B2F", "Dark olive green"], 
["FF8C00", "Dark orange"], 
["9932CC", "Dark orchid"], 
["779ECB", "Dark pastel blue"], 
["03C03C", "Dark pastel green"], 
["966FD6", "Dark pastel purple"], 
["C23B22", "Dark pastel red"], 
["E75480", "Dark pink"], 
["003399", "Dark powder blue"], 
["4F3A3C", "Dark puce"], 
["301934", "Dark purple"], 
["872657", "Dark raspberry"], 
["8B0000", "Dark red"], 
["E9967A", "Dark salmon"], 
["560319", "Dark scarlet"], 
["8FBC8F", "Dark sea green"], 
["3C1414", "Dark sienna"], 
["8CBED6", "Dark sky blue"], 
["483D8B", "Dark slate blue"], 
["2F4F4F", "Dark slate gray"], 
["177245", "Dark spring green"], 
["918151", "Dark tan"], 
["FFA812", "Dark tangerine"], 
["483C32", "Dark taupe"], 
["CC4E5C", "Dark terra cotta"], 
["00CED1", "Dark turquoise"], 
["D1BEA8", "Dark vanilla"], 
["9400D3", "Dark violet"], 
["9B870C", "Dark yellow"], 
["00703C", "Dartmouth green"], 
["555555", "Davy's grey"], 
["D70A53", "Debian red"], 
["40826D", "Deep aquamarine"], 
["A9203E", "Deep carmine"], 
["EF3038", "Deep carmine pink"], 
["E9692C", "Deep carrot orange"], 
["DA3287", "Deep cerise"], 
["FAD6A5", "Deep champagne"], 
["B94E48", "Deep chestnut"], 
["704241", "Deep coffee"], 
["C154C1", "Deep fuchsia"], 
["056608", "Deep Green"], 
["0E7C61", "Deep green-cyan turquoise"], 
["004B49", "Deep jungle green"], 
["333366", "Deep koamaru"], 
["F5C71A", "Deep lemon"], 
["9955BB", "Deep lilac"], 
["CC00CC", "Deep magenta"], 
["820000", "Deep maroon"], 
["D473D4", "Deep mauve"], 
["355E3B", "Deep moss green"], 
["FFCBA4", "Deep peach"], 
["FF1493", "Deep pink"], 
["A95C68", "Deep puce"], 
["850101", "Deep Red"], 
["843F5B", "Deep ruby"], 
["FF9933", "Deep saffron"], 
["00BFFF", "Deep sky blue"], 
["4A646C", "Deep Space Sparkle"], 
["556B2F", "Deep spring bud"], 
["7E5E60", "Deep Taupe"], 
["66424D", "Deep Tuscan red"], 
["330066", "Deep violet"], 
["BA8759", "Deer"], 
["1560BD", "Denim"], 
["2243B6", "Denim Blue"], 
["669999", "Desaturated cyan"], 
["C19A6B", "Desert"], 
["EDC9AF", "Desert sand"], 
["EA3C53", "Desire"], 
["B9F2FF", "Diamond"], 
["696969", "Dim gray"], 
["C53151", "Dingy Dungeon"], 
["9B7653", "Dirt"], 
["1E90FF", "Dodger blue"], 
["D71868", "Dogwood rose"], 
["85BB65", "Dollar bill"], 
["828E84", "Dolphin Gray"], 
["664C28", "Donkey brown"], 
["967117", "Drab"], 
["00009C", "Duke blue"], 
["E5CCC9", "Dust storm"], 
["EFDFBB", "Dutch white"], 
["E1A95F", "Earth yellow"], 
["555D50", "Ebony"], 
["C2B280", "Ecru"], 
["1B1B1B", "Eerie black"], 
["614051", "Eggplant"], 
["F0EAD6", "Eggshell"], 
["1034A6", "Egyptian blue"], 
["7DF9FF", "Electric blue"], 
["FF003F", "Electric crimson"], 
["00FFFF", "Electric cyan"], 
["00FF00", "Electric green"], 
["6F00FF", "Electric indigo"], 
["F4BBFF", "Electric lavender"], 
["CCFF00", "Electric lime"], 
["BF00FF", "Electric purple"], 
["3F00FF", "Electric ultramarine"], 
["8F00FF", "Electric violet"], 
["FFFF33", "Electric yellow"], 
["50C878", "Emerald"], 
["6C3082", "Eminence"], 
["1B4D3E", "English green"], 
["B48395", "English lavender"], 
["AB4B52", "English red"], 
["CC474B", "English vermillion"], 
["563C5C", "English violet"], 
["96C8A2", "Eton blue"], 
["44D7A8", "Eucalyptus"], 
["C19A6B", "Fallow"], 
["801818", "Falu red"], 
["B53389", "Fandango"], 
["DE5285", "Fandango pink"], 
["F400A1", "Fashion fuchsia"], 
["E5AA70", "Fawn"], 
["4D5D53", "Feldgrau"], 
["FDD5B1", "Feldspar"], 
["4F7942", "Fern green"], 
["FF2800", "Ferrari Red"], 
["6C541E", "Field drab"], 
["FF5470", "Fiery Rose"], 
["B22222", "Firebrick"], 
["CE2029", "Fire engine red"], 
["E25822", "Flame"], 
["FC8EAC", "Flamingo pink"], 
["6B4423", "Flattery"], 
["F7E98E", "Flavescent"], 
["EEDC82", "Flax"], 
["A2006D", "Flirt"], 
["FFFAF0", "Floral white"], 
["FFBF00", "Fluorescent orange"], 
["FF1493", "Fluorescent pink"], 
["CCFF00", "Fluorescent yellow"], 
["FF004F", "Folly"], 
["014421", "Forest green (traditional)"], 
["228B22", "Forest green (web)"], 
["A67B5B", "French beige"], 
["856D4D", "French bistre"], 
["0072BB", "French blue"], 
["FD3F92", "French fuchsia"], 
["86608E", "French lilac"], 
["9EFD38", "French lime"], 
["D473D4", "French mauve"], 
["FD6C9E", "French pink"], 
["811453", "French plum"], 
["4E1609", "French puce"], 
["C72C48", "French raspberry"], 
["F64A8A", "French rose"], 
["77B5FE", "French sky blue"], 
["8806CE", "French violet"], 
["AC1E44", "French wine"], 
["A6E7FF", "Fresh Air"], 
["E936A7", "Frostbite"], 
["FF00FF", "Fuchsia"], 
["C154C1", "Fuchsia (Crayola)"], 
["FF77FF", "Fuchsia pink"], 
["CC397B", "Fuchsia purple"], 
["C74375", "Fuchsia rose"], 
["E48400", "Fulvous"], 
["CC6666", "Fuzzy Wuzzy"], 
["DCDCDC", "Gainsboro"], 
["E49B0F", "Gamboge"], 
["996600", "Gamboge orange (brown)"], 
["FFDF46", "Gargoyle Gas"], 
["007F66", "Generic viridian"], 
["F8F8FF", "Ghost white"], 
["B05C52", "Giant's Club"], 
["FE5A1D", "Giants orange"], 
["B06500", "Ginger"], 
["6082B6", "Glaucous"], 
["E6E8FA", "Glitter"], 
["AB92B3", "Glossy Grape"], 
["00AB66", "GO green"], 
["D4AF37", "Gold (metallic)"], 
["FFD700", "Gold (web) (Golden)"], 
["85754E", "Gold Fusion"], 
["996515", "Golden brown"], 
["FCC200", "Golden poppy"], 
["FFDF00", "Golden yellow"], 
["DAA520", "Goldenrod"], 
["676767", "Granite Gray"], 
["A8E4A0", "Granny Smith Apple"], 
["6F2DA8", "Grape"], 
["808080", "Gray"], 
["808080", "Gray (HTML/CSS gray)"], 
["BEBEBE", "Gray (X11 gray)"], 
["465945", "Gray-asparagus"], 
["8C92AC", "Gray-blue"], 
["00FF00", "Green (Color Wheel) (X11 green)"], 
["1CAC78", "Green (Crayola)"], 
["008000", "Green (HTML/CSS color)"], 
["00A877", "Green (Munsell)"], 
["009F6B", "Green (NCS)"], 
["00AD43", "Green (Pantone)"], 
["00A550", "Green (pigment)"], 
["66B032", "Green (RYB)"], 
["1164B4", "Green-blue"], 
["009966", "Green-cyan"], 
["A7F432", "Green Lizard"], 
["6EAEA1", "Green Sheen"], 
["ADFF2F", "Green-yellow"], 
["885818", "Grizzly"], 
["A99A86", "Grullo"], 
["00FF7F", "Guppie green"], 
["2a3439", "Gunmetal"], 
["663854", "Halayà úbe"], 
["446CCF", "Han blue"], 
["5218FA", "Han purple"], 
["E9D66B", "Hansa yellow"], 
["3FFF00", "Harlequin"], 
["46CB18", "Harlequin green"], 
["C90016", "Harvard crimson"], 
["DA9100", "Harvest gold"], 
["808000", "Heart Gold"], 
["FF7A00", "Heat Wave"], 
["960018", "Heidelberg Red"], 
["DF73FF", "Heliotrope"], 
["AA98A9", "Heliotrope gray"], 
["AA00BB", "Heliotrope magenta"], 
["F400A1", "Hollywood cerise"], 
["F0FFF0", "Honeydew"], 
["006DB0", "Honolulu blue"], 
["49796B", "Hooker's green"], 
["FF1DCE", "Hot magenta"], 
["FF69B4", "Hot pink"], 
["355E3B", "Hunter green"], 
["71A6D2", "Iceberg"], 
["FCF75E", "Icterine"], 
["71BC78", "Iguana Green"], 
["319177", "Illuminating Emerald"], 
["602F6B", "Imperial"], 
["002395", "Imperial blue"], 
["66023C", "Imperial purple"], 
["ED2939", "Imperial red"], 
["B2EC5D", "Inchworm"], 
["4C516D", "Independence"], 
["138808", "India green"], 
["CD5C5C", "Indian red"], 
["E3A857", "Indian yellow"], 
["4B0082", "Indigo"], 
["091F92", "Indigo dye"], 
["4B0082", "Indigo (web)"], 
["FF496C", "Infra Red"], 
["002FA7", "International Klein Blue"], 
["FF4F00", "International orange (aerospace)"], 
["BA160C", "International orange (engineering)"], 
["C0362C", "International orange (Golden Gate Bridge)"], 
["5A4FCF", "Iris"], 
["B3446C", "Irresistible"], 
["F4F0EC", "Isabelline"], 
["009000", "Islamic green"], 
["B2FFFF", "Italian sky blue"], 
["FFFFF0", "Ivory"], 
["00A86B", "Jade"], 
["9D2933", "Japanese carmine"], 
["264348", "Japanese indigo"], 
["5B3256", "Japanese violet"], 
["F8DE7E", "Jasmine"], 
["D73B3E", "Jasper"], 
["A50B5E", "Jazzberry jam"], 
["DA614E", "Jelly Bean"], 
["343434", "Jet"], 
["F4CA16", "Jonquil"], 
["FADA5E", "Jonquil"], 
["8AB9F1", "Jordy blue"], 
["BDDA57", "June bud"], 
["29AB87", "Jungle green"], 
["4CBB17", "Kelly green"], 
["7C1C05", "Kenyan copper"], 
["3AB09E", "Keppel"], 
["E8F48C", "Key Lime"], 
["C3B091", "Khaki (HTML/CSS) (Khaki)"], 
["F0E68C", "Khaki (X11) (Light khaki)"], 
["8EE53F", "Kiwi"], 
["882D17", "Kobe"], 
["E79FC4", "Kobi"], 
["6B4423", "Kobicha"], 
["354230", "Kombu green"], 
["512888", "KSU Purple"], 
["E8000D", "KU Crimson"], 
["087830", "La Salle Green"], 
["D6CADD", "Languid lavender"], 
["26619C", "Lapis lazuli"], 
["FFFF66", "Laser Lemon"], 
["A9BA9D", "Laurel green"], 
["CF1020", "Lava"], 
["B57EDC", "Lavender (floral)"], 
["E6E6FA", "Lavender (web)"], 
["CCCCFF", "Lavender blue"], 
["FFF0F5", "Lavender blush"], 
["C4C3D0", "Lavender gray"], 
["9457EB", "Lavender indigo"], 
["EE82EE", "Lavender magenta"], 
["E6E6FA", "Lavender mist"], 
["FBAED2", "Lavender pink"], 
["967BB6", "Lavender purple"], 
["FBA0E3", "Lavender rose"], 
["7CFC00", "Lawn green"], 
["FFF700", "Lemon"], 
["FFFACD", "Lemon chiffon"], 
["CCA01D", "Lemon curry"], 
["FDFF00", "Lemon glacier"], 
["E3FF00", "Lemon lime"], 
["F6EABE", "Lemon meringue"], 
["FFF44F", "Lemon yellow"], 
["1A1110", "Licorice"], 
["545AA7", "Liberty"], 
["FDD5B1", "Light apricot"], 
["ADD8E6", "Light blue"], 
["B5651D", "Light brown"], 
["E66771", "Light carmine pink"], 
["88ACE0", "Light cobalt blue"], 
["F08080", "Light coral"], 
["93CCEA", "Light cornflower blue"], 
["F56991", "Light crimson"], 
["E0FFFF", "Light cyan"], 
["FF5CCD", "Light deep pink"], 
["C8AD7F", "Light French beige"], 
["F984EF", "Light fuchsia pink"], 
["FAFAD2", "Light goldenrod yellow"], 
["D3D3D3", "Light gray"], 
["CC99CC", "Light grayish magenta"], 
["90EE90", "Light green"], 
["FFB3DE", "Light hot pink"], 
["F0E68C", "Light khaki"], 
["D39BCB", "Light medium orchid"], 
["ADDFAD", "Light moss green"], 
["E6A8D7", "Light orchid"], 
["B19CD9", "Light pastel purple"], 
["FFB6C1", "Light pink"], 
["E97451", "Light red ochre"], 
["FFA07A", "Light salmon"], 
["FF9999", "Light salmon pink"], 
["20B2AA", "Light sea green"], 
["87CEFA", "Light sky blue"], 
["778899", "Light slate gray"], 
["B0C4DE", "Light steel blue"], 
["B38B6D", "Light taupe"], 
["E68FAC", "Light Thulian pink"], 
["FFFFE0", "Light yellow"], 
["C8A2C8", "Lilac"], 
["AE98AA", "Lilac Luster"], 
["BFFF00", "Lime (color wheel)"], 
["00FF00", "Lime (web) (X11 green)"], 
["32CD32", "Lime green"], 
["9DC209", "Limerick"], 
["195905", "Lincoln green"], 
["FAF0E6", "Linen"], 
["C19A6B", "Lion"], 
["DE6FA1", "Liseran Purple"], 
["6CA0DC", "Little boy blue"], 
["674C47", "Liver"], 
["B86D29", "Liver (dogs)"], 
["6C2E1F", "Liver (organ)"], 
["987456", "Liver chestnut"], 
["6699CC", "Livid"], 
["FFE4CD", "Lumber"], 
["E62020", "Lust"], 
["001C3D", "Maastricht Blue"], 
["FFBD88", "Macaroni and Cheese"], 
["CC3336", "Madder Lake"], 
["FF00FF", "Magenta"], 
["FF55A3", "Magenta (Crayola)"], 
["CA1F7B", "Magenta (dye)"], 
["D0417E", "Magenta (Pantone)"], 
["FF0090", "Magenta (process)"], 
["9F4576", "Magenta haze"], 
["CC338B", "Magenta-pink"], 
["AAF0D1", "Magic mint"], 
["FF4466", "Magic Potion"], 
["F8F4FF", "Magnolia"], 
["C04000", "Mahogany"], 
["FBEC5D", "Maize"], 
["6050DC", "Majorelle Blue"], 
["0BDA51", "Malachite"], 
["979AAA", "Manatee"], 
["F37A48", "Mandarin"], 
["FF8243", "Mango Tango"], 
["74C365", "Mantis"], 
["880085", "Mardi Gras"], 
["EAA221", "Marigold"], 
["C32148", "Maroon (Crayola)"], 
["800000", "Maroon (HTML/CSS)"], 
["B03060", "Maroon (X11)"], 
["E0B0FF", "Mauve"], 
["915F6D", "Mauve taupe"], 
["EF98AA", "Mauvelous"], 
["47ABCC", "Maximum Blue"], 
["30BFBF", "Maximum Blue Green"], 
["ACACE6", "Maximum Blue Purple"], 
["5E8C31", "Maximum Green"], 
["D9E650", "Maximum Green Yellow"], 
["733380", "Maximum Purple"], 
["D92121", "Maximum Red"], 
["A63A79", "Maximum Red Purple"], 
["FAFA37", "Maximum Yellow"], 
["F2BA49", "Maximum Yellow Red"], 
["4C9141", "May green"], 
["73C2FB", "Maya blue"], 
["E5B73B", "Meat brown"], 
["66DDAA", "Medium aquamarine"], 
["0000CD", "Medium blue"], 
["E2062C", "Medium candy apple red"], 
["AF4035", "Medium carmine"], 
["F3E5AB", "Medium champagne"], 
["035096", "Medium electric blue"], 
["1C352D", "Medium jungle green"], 
["DDA0DD", "Medium lavender magenta"], 
["BA55D3", "Medium orchid"], 
["0067A5", "Medium Persian blue"], 
["9370DB", "Medium purple"], 
["BB3385", "Medium red-violet"], 
["AA4069", "Medium ruby"], 
["3CB371", "Medium sea green"], 
["80DAEB", "Medium sky blue"], 
["7B68EE", "Medium slate blue"], 
["C9DC87", "Medium spring bud"], 
["00FA9A", "Medium spring green"], 
["674C47", "Medium taupe"], 
["48D1CC", "Medium turquoise"], 
["79443B", "Medium Tuscan red"], 
["D9603B", "Medium vermilion"], 
["C71585", "Medium violet-red"], 
["F8B878", "Mellow apricot"], 
["F8DE7E", "Mellow yellow"], 
["FDBCB4", "Melon"], 
["0A7E8C", "Metallic Seaweed"], 
["9C7C38", "Metallic Sunburst"], 
["FF00FD", "Metal Pink"], 
["E4007C", "Mexican pink"], 
["7ED4E6", "Middle Blue"], 
["8DD9CC", "Middle Blue Green"], 
["8B72BE", "Middle Blue Purple"], 
["8B8680", "Middle Red Purple"], 
["4D8C57", "Middle Green"], 
["ACBF60", "Middle Green Yellow"], 
["D982B5", "Middle Purple"], 
["E58E73", "Middle Red"], 
["A55353", "Middle Red Purple"], 
["FFEB00", "Middle Yellow"], 
["ECB176", "Middle Yellow Red"], 
["702670", "Midnight"], 
["191970", "Midnight blue"], 
["004953", "Midnight green (eagle green)"], 
["FFC40C", "Mikado yellow"], 
["FFDAE9", "Mimi Pink"], 
["E3F988", "Mindaro"], 
["36747D", "Ming"], 
["F5E050", "Minion Yellow"], 
["3EB489", "Mint"], 
["F5FFFA", "Mint cream"], 
["98FF98", "Mint green"], 
["BBB477", "Misty Moss"], 
["FFE4E1", "Misty rose"], 
["FAEBD7", "Moccasin"], 
["967117", "Mode beige"], 
["73A9C2", "Moonstone blue"], 
["AE0C00", "Mordant red 19"], 
["8A9A5B", "Moss green"], 
["30BA8F", "Mountain Meadow"], 
["997A8D", "Mountbatten pink"], 
["18453B", "MSU Green"], 
["306030", "Mughal green"], 
["C54B8C", "Mulberry"], 
["828E84", "Mummy's Tomb"], 
["FFDB58", "Mustard"], 
["317873", "Myrtle green"], 
["D65282", "Mystic"], 
["AD4379", "Mystic Maroon"], 
["F6ADC6", "Nadeshiko pink"], 
["2A8000", "Napier green"], 
["FADA5E", "Naples yellow"], 
["FFDEAD", "Navajo white"], 
["000080", "Navy"], 
["9457EB", "Navy purple"], 
["FFA343", "Neon Carrot"], 
["FE4164", "Neon fuchsia"], 
["39FF14", "Neon green"], 
["214FC6", "New Car"], 
["D7837F", "New York pink"], 
["727472", "Nickel"], 
["A4DDED", "Non-photo blue"], 
["059033", "North Texas Green"], 
["E9FFDB", "Nyanza"], 
["4F42B5", "Ocean Blue"], 
["0077BE", "Ocean Boat Blue"], 
["48BF91", "Ocean Green"], 
["CC7722", "Ochre"], 
["008000", "Office green"], 
["FD5240", "Ogre Odor"], 
["43302E", "Old burgundy"], 
["CFB53B", "Old gold"], 
["563C5C", "Old heliotrope"], 
["FDF5E6", "Old lace"], 
["796878", "Old lavender"], 
["673147", "Old mauve"], 
["867E36", "Old moss green"], 
["C08081", "Old rose"], 
["848482", "Old silver"], 
["808000", "Olive"], 
["6B8E23", "Olive Drab (#3)"], 
["3C341F", "Olive Drab #7"], 
["9AB973", "Olivine"], 
["353839", "Onyx"], 
["B784A7", "Opera mauve"], 
["FF7F00", "Orange (color wheel)"], 
["FF7538", "Orange (Crayola)"], 
["FF5800", "Orange (Pantone)"], 
["FB9902", "Orange (RYB)"], 
["FFA500", "Orange (web)"], 
["FF9F00", "Orange peel"], 
["FF4500", "Orange-red"], 
["FA5B3D", "Orange Soda"], 
["F8D568", "Orange-yellow"], 
["DA70D6", "Orchid"], 
["F2BDCD", "Orchid pink"], 
["FB4F14", "Orioles orange"], 
["654321", "Otter brown"], 
["414A4C", "Outer Space"], 
["FF6E4A", "Outrageous Orange"], 
["002147", "Oxford Blue"], 
["990000", "OU Crimson Red"], 
["1CA9C9", "Pacific Blue"], 
["006600", "Pakistan green"], 
["273BE2", "Palatinate blue"], 
["682860", "Palatinate purple"], 
["BCD4E6", "Pale aqua"], 
["AFEEEE", "Pale blue"], 
["987654", "Pale brown"], 
["AF4035", "Pale carmine"], 
["9BC4E2", "Pale cerulean"], 
["DDADAF", "Pale chestnut"], 
["DA8A67", "Pale copper"], 
["ABCDEF", "Pale cornflower blue"], 
["87D3F8", "Pale cyan"], 
["E6BE8A", "Pale gold"], 
["EEE8AA", "Pale goldenrod"], 
["98FB98", "Pale green"], 
["DCD0FF", "Pale lavender"], 
["F984E5", "Pale magenta"], 
["FF99CC", "Pale magenta-pink"], 
["FADADD", "Pale pink"], 
["DDA0DD", "Pale plum"], 
["DB7093", "Pale red-violet"], 
["96DED1", "Pale robin egg blue"], 
["C9C0BB", "Pale silver"], 
["ECEBBD", "Pale spring bud"], 
["BC987E", "Pale taupe"], 
["AFEEEE", "Pale turquoise"], 
["CC99FF", "Pale violet"], 
["DB7093", "Pale violet-red"], 
["6F9940", "Palm Leaf"], 
["78184A", "Pansy purple"], 
["009B7D", "Paolo Veronese green"], 
["FFEFD5", "Papaya whip"], 
["E63E62", "Paradise pink"], 
["50C878", "Paris Green"], 
["D998A0", "Parrot Pink"], 
["AEC6CF", "Pastel blue"], 
["836953", "Pastel brown"], 
["CFCFC4", "Pastel gray"], 
["77DD77", "Pastel green"], 
["F49AC2", "Pastel magenta"], 
["FFB347", "Pastel orange"], 
["DEA5A4", "Pastel pink"], 
["B39EB5", "Pastel purple"], 
["FF6961", "Pastel red"], 
["CB99C9", "Pastel violet"], 
["FDFD96", "Pastel yellow"], 
["800080", "Patriarch"], 
["536878", "Payne's grey"], 
["FFE5B4", "Peach"], 
["FFCBA4", "Peach"], 
["FFCC99", "Peach-orange"], 
["FFDAB9", "Peach puff"], 
["FADFAD", "Peach-yellow"], 
["D1E231", "Pear"], 
["EAE0C8", "Pearl"], 
["88D8C0", "Pearl Aqua"], 
["B768A2", "Pearly purple"], 
["E6E200", "Peridot"], 
["CCCCFF", "Periwinkle"], 
["E12C2C", "Permanent Geranium Lake"], 
["1C39BB", "Persian blue"], 
["00A693", "Persian green"], 
["32127A", "Persian indigo"], 
["D99058", "Persian orange"], 
["F77FBE", "Persian pink"], 
["701C1C", "Persian plum"], 
["CC3333", "Persian red"], 
["FE28A2", "Persian rose"], 
["EC5800", "Persimmon"], 
["CD853F", "Peru"], 
["8BA8B7", "Pewter Blue"], 
["DF00FF", "Phlox"], 
["000F89", "Phthalo blue"], 
["123524", "Phthalo green"], 
["45B1E8", "Picton blue"], 
["C30B4E", "Pictorial carmine"], 
["FDDDE6", "Piggy pink"], 
["01796F", "Pine green"], 
["563C5C", "Pineapple"], 
["FFC0CB", "Pink"], 
["D74894", "Pink (Pantone)"], 
["FC74FD", "Pink Flamingo"], 
["FFDDF4", "Pink lace"], 
["D8B2D1", "Pink lavender"], 
["FF9966", "Pink-orange"], 
["E7ACCF", "Pink pearl"], 
["980036", "Pink raspberry"], 
["F78FA7", "Pink Sherbet"], 
["93C572", "Pistachio"], 
["391285", "Pixie Powder"], 
["E5E4E2", "Platinum"], 
["8E4585", "Plum"], 
["DDA0DD", "Plum (web)"], 
["5946B2", "Plump Purple"], 
["5DA493", "Polished Pine"], 
["86608E", "Pomp and Power"], 
["BE4F62", "Popstar"], 
["FF5A36", "Portland Orange"], 
["B0E0E6", "Powder blue"], 
["FF85CF", "Princess Perfume"], 
["F58025", "Princeton orange"], 
["701C1C", "Prune"], 
["003153", "Prussian blue"], 
["DF00FF", "Psychedelic purple"], 
["CC8899", "Puce"], 
["722F37", "Puce red"], 
["644117", "Pullman Brown (UPS Brown)"], 
["3B331C", "Pullman Green"], 
["FF7518", "Pumpkin"], 
["800080", "Purple (HTML)"], 
["9F00C5", "Purple (Munsell)"], 
["A020F0", "Purple (X11)"], 
["69359C", "Purple Heart"], 
["9678B6", "Purple mountain majesty"], 
["4E5180", "Purple navy"], 
["FE4EDA", "Purple pizzazz"], 
["9C51B6", "Purple Plum"], 
["50404D", "Purple taupe"], 
["9A4EAE", "Purpureus"], 
["51484F", "Quartz"], 
["436B95", "Queen blue"], 
["E8CCD7", "Queen pink"], 
["A6A6A6", "Quick Silver"], 
["8E3A59", "Quinacridone magenta"], 
["5D8AA8", "Rackley"], 
["FF355E", "Radical Red"], 
["242124", "Raisin black"], 
["FBAB60", "Rajah"], 
["E30B5D", "Raspberry"], 
["915F6D", "Raspberry glace"], 
["E25098", "Raspberry pink"], 
["B3446C", "Raspberry rose"], 
["D68A59", "Raw Sienna"], 
["826644", "Raw umber"], 
["FF33CC", "Razzle dazzle rose"], 
["E3256B", "Razzmatazz"], 
["8D4E85", "Razzmic Berry"], 
["663399", "Rebecca Purple"], 
["FF0000", "Red"], 
["EE204D", "Red (Crayola)"], 
["F2003C", "Red (Munsell)"], 
["C40233", "Red (NCS)"], 
["ED2939", "Red (Pantone)"], 
["ED1C24", "Red (pigment)"], 
["FE2712", "Red (RYB)"], 
["A52A2A", "Red-brown"], 
["860111", "Red devil"], 
["FF5349", "Red-orange"], 
["E40078", "Red-purple"], 
["FD3A4A", "Red Salsa"], 
["C71585", "Red-violet"], 
["A45A52", "Redwood"], 
["522D80", "Regalia"], 
["000000", "Registration black"], 
["002387", "Resolution blue"], 
["777696", "Rhythm"], 
["004040", "Rich black"], 
["010B13", "Rich black (FOGRA29)"], 
["010203", "Rich black (FOGRA39)"], 
["F1A7FE", "Rich brilliant lavender"], 
["D70040", "Rich carmine"], 
["0892D0", "Rich electric blue"], 
["A76BCF", "Rich lavender"], 
["B666D2", "Rich lilac"], 
["B03060", "Rich maroon"], 
["444C38", "Rifle green"], 
["704241", "Roast coffee"], 
["00CCCC", "Robin egg blue"], 
["8A7F80", "Rocket metallic"], 
["838996", "Roman silver"], 
["FF007F", "Rose"], 
["F9429E", "Rose bonbon"], 
["9E5E6F", "Rose Dust"], 
["674846", "Rose ebony"], 
["B76E79", "Rose gold"], 
["E32636", "Rose madder"], 
["FF66CC", "Rose pink"], 
["AA98A9", "Rose quartz"], 
["C21E56", "Rose red"], 
["905D5D", "Rose taupe"], 
["AB4E52", "Rose vale"], 
["65000B", "Rosewood"], 
["D40000", "Rosso corsa"], 
["BC8F8F", "Rosy brown"], 
["0038A8", "Royal azure"], 
["002366", "Royal blue"], 
["4169E1", "Royal blue"], 
["CA2C92", "Royal fuchsia"], 
["7851A9", "Royal purple"], 
["FADA5E", "Royal yellow"], 
["CE4676", "Ruber"], 
["D10056", "Rubine red"], 
["E0115F", "Ruby"], 
["9B111E", "Ruby red"], 
["FF0028", "Ruddy"], 
["BB6528", "Ruddy brown"], 
["E18E96", "Ruddy pink"], 
["A81C07", "Rufous"], 
["80461B", "Russet"], 
["679267", "Russian green"], 
["32174D", "Russian violet"], 
["B7410E", "Rust"], 
["DA2C43", "Rusty red"], 
["00563F", "Sacramento State green"], 
["8B4513", "Saddle brown"], 
["FF7800", "Safety orange"], 
["FF6700", "Safety orange (blaze orange)"], 
["EED202", "Safety yellow"], 
["F4C430", "Saffron"], 
["BCB88A", "Sage"], 
["23297A", "St. Patrick's blue"], 
["FA8072", "Salmon"], 
["FF91A4", "Salmon pink"], 
["C2B280", "Sand"], 
["967117", "Sand dune"], 
["ECD540", "Sandstorm"], 
["F4A460", "Sandy brown"], 
["FDD9B5", "Sandy Tan"], 
["967117", "Sandy taupe"], 
["92000A", "Sangria"], 
["507D2A", "Sap green"], 
["0F52BA", "Sapphire"], 
["0067A5", "Sapphire blue"], 
["FF4681", "Sasquatch Socks"], 
["CBA135", "Satin sheen gold"], 
["FF2400", "Scarlet"], 
["FD0E35", "Scarlet"], 
["FF91AF", "Schauss pink"], 
["FFD800", "School bus yellow"], 
["66FF66", "Screamin' Green"], 
//["76FF7a", "Screamin' Green"], 
["006994", "Sea blue"], 
["9FE2BF", "Sea Foam Green"], 
["2E8B57", "Sea green"], 
["4BC7CF", "Sea Serpent"], 
["59260B", "Seal brown"], 
["FFF5EE", "Seashell"], 
["FFBA00", "Selective yellow"], 
["704214", "Sepia"], 
["8A795D", "Shadow"], 
["778BA5", "Shadow blue"], 
["FFCFF1", "Shampoo"], 
["009E60", "Shamrock green"], 
["8FD400", "Sheen Green"], 
["D98695", "Shimmering Blush"], 
["5FA778", "Shiny Shamrock"], 
["FC0FC0", "Shocking pink"], 
["FF6FFF", "Shocking pink (Crayola)"], 
["882D17", "Sienna"], 
["C0C0C0", "Silver"], 
["ACACAC", "Silver chalice"], 
["5D89BA", "Silver Lake blue"], 
["C4AEAD", "Silver pink"], 
["BFC1C2", "Silver sand"], 
["CB410B", "Sinopia"], 
["FF3855", "Sizzling Red"], 
["FFDB00", "Sizzling Sunrise"], 
["007474", "Skobeloff"], 
["87CEEB", "Sky blue"], 
["CF71AF", "Sky magenta"], 
["6A5ACD", "Slate blue"], 
["708090", "Slate gray"], 
["003399", "Smalt (Dark powder blue)"], 
["299617", "Slimy Green"], 
["FF6D3A", "Smashed Pumpkin"], 
["C84186", "Smitten"], 
["738276", "Smoke"], 
["832A0D", "Smokey Topaz"], 
["100C08", "Smoky black"], 
["933D41", "Smoky Topaz"], 
["FFFAFA", "Snow"], 
["CEC8EF", "Soap"], 
["893843", "Solid pink"], 
["757575", "Sonic silver"], 
["9E1316", "Spartan Crimson"], 
["1D2951", "Space cadet"], 
["807532", "Spanish bistre"], 
["0070B8", "Spanish blue"], 
["D10047", "Spanish carmine"], 
["E51A4C", "Spanish crimson"], 
["989898", "Spanish gray"], 
["009150", "Spanish green"], 
["E86100", "Spanish orange"], 
["F7BFBE", "Spanish pink"], 
["E60026", "Spanish red"], 
["00FFFF", "Spanish sky blue"], 
["4C2882", "Spanish violet"], 
["007F5C", "Spanish viridian"], 
["8B5f4D", "Spicy mix"], 
["0FC0FC", "Spiro Disco Ball"], 
["A7FC00", "Spring bud"], 
["87FF2A", "Spring Frost"], 
["00FF7F", "Spring green"], 
["007BB8", "Star command blue"], 
["4682B4", "Steel blue"], 
["CC33CC", "Steel pink"], 
["5F8A8B", "Steel Teal"], 
["FADA5E", "Stil de grain yellow"], 
["990000", "Stizza"], 
["4F666A", "Stormcloud"], 
["E4D96F", "Straw"], 
["FC5A8D", "Strawberry"], 
["914E75", "Sugar Plum"], 
["FF404C", "Sunburnt Cyclops"], 
["FFCC33", "Sunglow"], 
["F2F27A", "Sunny"], 
["E3AB57", "Sunray"], 
["FAD6A5", "Sunset"], 
["FD5E53", "Sunset orange"], 
["CF6BA9", "Super pink"], 
["A83731", "Sweet Brown"], 
["D2B48C", "Tan"], 
["F94D00", "Tangelo"], 
["F28500", "Tangerine"], 
["FFCC00", "Tangerine yellow"], 
["E4717A", "Tango pink"], 
["FB4D46", "Tart Orange"], 
["483C32", "Taupe"], 
["8B8589", "Taupe gray"], 
["D0F0C0", "Tea green"], 
["F88379", "Tea rose"], 
["F4C2C2", "Tea rose"], 
["008080", "Teal"], 
["367588", "Teal blue"], 
["99E6B3", "Teal deer"], 
["00827F", "Teal green"], 
["CF3476", "Telemagenta"], 
["CD5700", "Tenné"], 
["E2725B", "Terra cotta"], 
["D8BFD8", "Thistle"], 
["DE6FA1", "Thulian pink"], 
["FC89AC", "Tickle Me Pink"], 
["0ABAB5", "Tiffany Blue"], 
["E08D3C", "Tiger's eye"], 
["DBD7D2", "Timberwolf"], 
["EEE600", "Titanium yellow"], 
["FF6347", "Tomato"], 
["746CC0", "Toolbox"], 
["FFC87C", "Topaz"], 
["FD0E35", "Tractor red"], 
["808080", "Trolley Grey"], 
["00755E", "Tropical rain forest"], 
["CDA4DE", "Tropical violet"], 
["0073CF", "True Blue"], 
["417DC1", "Tufts Blue"], 
["FF878D", "Tulip"], 
["DEAA88", "Tumbleweed"], 
["B57281", "Turkish rose"], 
["40E0D0", "Turquoise"], 
["00FFEF", "Turquoise blue"], 
["A0D6B4", "Turquoise green"], 
["00C5CD", "Turquoise Surf"], 
["8A9A5B", "Turtle green"], 
["FAD6A5", "Tuscan"], 
["6F4E37", "Tuscan brown"], 
["7C4848", "Tuscan red"], 
["A67B5B", "Tuscan tan"], 
["C09999", "Tuscany"], 
["8A496B", "Twilight lavender"], 
["66023C", "Tyrian purple"], 
["0033AA", "UA blue"], 
["D9004C", "UA red"], 
["8878C3", "Ube"], 
["536895", "UCLA Blue"], 
["FFB300", "UCLA Gold"], 
["3CD070", "UFO Green"], 
["3F00FF", "Ultramarine"], 
["4166F5", "Ultramarine blue"], 
["FF6FFF", "Ultra pink"], 
["FC6C85", "Ultra red"], 
["635147", "Umber"], 
["FFDDCA", "Unbleached silk"], 
["5B92E5", "United Nations blue"], 
["B78727", "University of California Gold"], 
["FFFF66", "Unmellow yellow"], 
["014421", "UP Forest green"], 
["7B1113", "UP Maroon"], 
["AE2029", "Upsdell red"], 
["E1AD21", "Urobilin"], 
["004F98", "USAFA blue"], 
["990000", "USC Cardinal"], 
["FFCC00", "USC Gold"], 
["F77F00", "University of Tennessee Orange"], 
["D3003F", "Utah Crimson"], 
["664228", "Van Dyke Brown"], 
["F3E5AB", "Vanilla"], 
["F38FA9", "Vanilla ice"], 
["C5B358", "Vegas gold"], 
["C80815", "Venetian red"], 
["43B3AE", "Verdigris"], 
["E34234", "Vermilion"], 
["D9381E", "Vermilion"], 
["A020F0", "Veronica"], 
["74BBFB", "Very light azure"], 
["6666FF", "Very light blue"], 
["64E986", "Very light malachite green"], 
["FFB077", "Very light tangelo"], 
["FFDFBF", "Very pale orange"], 
["FFFFBF", "Very pale yellow"], 
["8F00FF", "Violet"], 
["7F00FF", "Violet (color wheel)"], 
["8601AF", "Violet (RYB)"], 
["EE82EE", "Violet (web)"], 
["324AB2", "Violet-blue"], 
["F75394", "Violet-red"], 
["40826D", "Viridian"], 
["009698", "Viridian green"], 
["7C9ED9", "Vista blue"], 
["CC9900", "Vivid amber"], 
["922724", "Vivid auburn"], 
["9F1D35", "Vivid burgundy"], 
["DA1D81", "Vivid cerise"], 
["00AAEE", "Vivid cerulean"], 
["CC0033", "Vivid crimson"], 
["FF9900", "Vivid gamboge"], 
["A6D608", "Vivid lime green"], 
["00CC33", "Vivid malachite"], 
["B80CE3", "Vivid mulberry"], 
["FF5F00", "Vivid orange"], 
["FFA000", "Vivid orange peel"], 
["CC00FF", "Vivid orchid"], 
["FF006C", "Vivid raspberry"], 
["F70D1A", "Vivid red"], 
["DF6124", "Vivid red-tangelo"], 
["00CCFF", "Vivid sky blue"], 
["F07427", "Vivid tangelo"], 
["FFA089", "Vivid tangerine"], 
["E56024", "Vivid vermilion"], 
["9F00FF", "Vivid violet"], 
["FFE302", "Vivid yellow"], 
["CEFF00", "Volt"], 
["34B233", "Wageningen Green"], 
["004242", "Warm black"], 
["A4F4F9", "Waterspout"], 
["7C98AB", "Weldon Blue"], 
["645452", "Wenge"], 
["F5DEB3", "Wheat"], 
["FFFFFF", "White"], 
["F5F5F5", "White smoke"], 
["A2ADD0", "Wild blue yonder"], 
["D470A2", "Wild orchid"], 
["FF43A4", "Wild Strawberry"], 
["FC6C85", "Wild watermelon"], 
["FD5800", "Willpower orange"], 
["A75502", "Windsor tan"], 
["722F37", "Wine"], 
["673147", "Wine dregs"], 
["FF007C", "Winter Sky"], 
["A0E6FF", "Winter Wizard"], 
["56887D", "Wintergreen Dream"], 
["C9A0DC", "Wisteria"], 
["C19A6B", "Wood brown"], 
["738678", "Xanadu"], 
["0F4D92", "Yale Blue"], 
["1C2841", "Yankees blue"], 
["FFFF00", "Yellow"], 
["FCE883", "Yellow (Crayola)"], 
["EFCC00", "Yellow (Munsell)"], 
["FFD300", "Yellow (NCS)"], 
["FEDF00", "Yellow (Pantone)"], 
["FFEF00", "Yellow (process)"], 
["FEFE33", "Yellow (RYB)"], 
["9ACD32", "Yellow-green"], 
["FFAE42", "Yellow Orange"], 
["FFF000", "Yellow rose"], 
["FFF700", "Yellow Sunshine"], 
["0014A8", "Zaffre"], 
["2C1608", "Zinnwaldite brown"], 
["39A78E", "Zomp"]];
  
  // hexコードからカラー名を取得
  var nameL=[];
  for (var i in tmpList) {
    var tmp=tmpList[i].toUpperCase();
    nameL[i]=[[ tmp, "?" ]];
    for (var j in map) {
      if (map[j][0].match(tmp)) {
        nameL[i].push(
          [ tmp, map[j][1] ]
        );
        htmlTmp.push(
          tmp+":"+map[j][1]); //表示
      }
    }
  }
  
  /*
  htmlTmp.push("+++++debug+++++");
  for (var i in nameL) {
    for (var j in nameL[i]) {
      htmlTmp.push(
        "nameL["+i+"]["+j+"]= ["
        +nameL[i][j][0]+","
        +nameL[i][j][1]+"]");
    }
    htmlTmp.push("+++");
  }
  htmlTmp.push("+++++debug+++++");
  */
  
  /*
  // 全ての組み合わせを作成
  // 同名のkeyが複数ある場合がある
  var result=[];
  var matchList=[];
  for (var i in nameL) {
    var resulttmp=[];
    for (var j in nameL[i]) {
      matchList.push(nameL[i][j]);
      if (i==0) {
        result[j]=[
          [nameL[i][j][0], nameL[i][j][1]]
        ];
      } else {
        var addarray=copyArray(result);
        for (var k in addarray) {
          addarray[k].push(
            [nameL[i][j][0], nameL[i][j][1]]);
        }
        Array.prototype.push.apply(
          resulttmp, addarray);
      }
    }
    if (i>0) var result=resulttmp;
  }
  */
  
  /*
  htmlTmp.push("++++debug2++++");
  for (var i in result) {
    htmlTmp.push(
      "result.length="+result.length);
    for (var j in result[i]) {
      htmlTmp.push(
        "result["+i+"].length="
        +result[i].length);
      htmlTmp.push(
        "result["+i+"]["+j+"]= ["
        +result[i][j][0]+","
        +result[i][j][1]+"]");
    }
    htmlTmp.push("+++");
  }
  htmlTmp.push("++++debug2++++");
  */
  
  /*
  // マッチしたカラー名を表示
  for (var i in matchList) {
    htmlTmp.push(
      "<b>"+matchList[i][0]+"</b>: "
      +matchList[i][1]);
  }
  htmlTmp.push("-----------------");
  */
  
  /* うまくいかない
  // 全ての組み合わせパターンを表示
  for (var i in result) {
    var tmp="";
    var tmp2=[];
    for (var j in result[i]) {
      tmp+=result[i][j][1][0];
      tmp2.push(
      result[i][j][0]+":"+result[i][j][1]);
    }
    htmlCode(tmp);
    for (var i in tmp2) {
      htmlTmp.push(tmp2[i]);
    }
    htmlTmp.push("------");
  }
  */
  
  htmlTmp.push("==============");
}


} // end function

