/* 武器防具屋 */
function goStore(){
    cls();
    document.getElementById("start-city").style.display = "none";
    document.getElementById("store").style.display = "block";
    stockLog([0, "色々な武器・防具が所狭しと並んでいる"]);
    printLog();
}
function buyDagger(){
    cls();
    buyAnyThing([0, "ダガー", 5], 20);
    printLog();
}
function buyLongsword(){
    cls();
    buyAnyThing([0, "ロングソード", 17], 80);
    printLog();
}
function buyCloth(){
    cls();
    buyAnyThing([1, "布の服", 3], 15)
    printLog();
}
function buyPlateArmor(){
    cls();
    buyAnyThing([1, "鉄の鎧", 8], 120)
    printLog();
}

/* 酒場 */
function goBar(){
    cls();
    document.getElementById("start-city").style.display = "none";
    document.getElementById("bar").style.display = "block";
    stockLog([0, "酒場だ"]);
    stockLog([0, "金を払えば宿屋としても利用できるみたいだ"]);
    printLog();
}
// 休憩
function breakTime(){
    cls();
    if(player.gold >= 30){
        player.gold -= 30;
        player.hp = player.maxHp;
        player.mp = player.maxMp;
        potionCount = 3;
        stockLog([0, "あなたは30ゴールドを支払って休憩することにした"]);
        stockLog([0, "HP・MPが最大になった"]);
        stockLog([0, "ポーション数が3個になった"]);
        updateMenuStatus();
        printLog();
    }else{
        stockLog([0, "ゴールドが足りないみたいだ…"]);
        printLog();
    }
}

/* 街の門 */
function goGate(){
    cls();
    document.getElementById("start-city").style.display = "none";
    document.getElementById("gate").style.display = "block";
    stockLog([0, "ここを一歩出ればもう安全は保障されない"]);
    printLog();
}

/* スタート画面 */
function cityBack(){
    cls();
    document.getElementById("store").style.display = "none";
    document.getElementById("bar").style.display = "none";
    document.getElementById("gate").style.display = "none";
    document.getElementById("start-city").style.display = "block";
    stockLog([0, "何処へ行こう？"])
    printLog();
}

/* その他の処理 */
// 購入処理
function buyAnyThing(array, price){
    if(player.gold >= price){
        player.gold -= price
        stockLog([0, `あなたは${price}ゴールド支払って${array[1]}を購入した`]);
        equipment(array);
        return true;
    }else{
        stockLog([0, "ゴールドが足りないみたいだ…"]);
        return false;
    }
}
// 装備処理
function equipment(array){
    let message;
    if(array[0] === 1){
        weapon = array;
        message = `武器攻撃力が${weapon[2]}になった`;
    }else if(array[0] === 2){
        armor = array;
        message = `防具防御力が${armor[2]}になった`;
    }
    player.attack = weapon[2] + Math.floor(baseAttack * (1 + level / 3));
    player.defence = armor[2] + Math.floor(baseDefence * (1 + level / 5));
    stockLog([0, message]);
    updateMenuStatus();
}