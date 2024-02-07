//CHANGELOG

//14-16.3.2019:Made healtbar and xp position:fixed, player and enemy stats updating on the fly, Gamearea size increases when
//more playareas appear-elements move downwards, inventory dropdown toggle is no longer attached to showInventory() function,
//inventoryinfos clear when clicking inventory or attack, fixed bugs in dodge and levelUp(), styling to attack button,
//styling to inventory elements, added canvas with animations, added background, added enemies, added inventoryCapacity,
//added availableItems, added itemsInArea etc.

//17.3.2019: moved around elements with position:absolute, prevented moving to another area while in the middle of a fight,
//healtbar shows health onmouseover

//18-21.3.2019: added scores and credits to them, added fonts, fixed end game issue, made hydra bigger,
//added player damage animation

//23-25.3.2019: added localStorage functionality for highscores, added critical damage, added extraPoints function,
//some styling cleanup, tweaked highscores function

//4.4.2019: Made fightYN and shield buttons, added functionalities and styles to these buttons,
//moved around inputs a bit, modified player's stats hover (added level), added flee and functionalities

//5.4.2019: added difficulty, added health regen for Hydra, small text tweaks, added more credits,
//fixed bugs (when exceeding iventory size, damage animation clearing at wrong time sometimes)

//6.4.2019: Allowed use of multiple items at once, prevented using items you do not have,
//fixed: shieldUse-- no longer applies if damage (either by a monster or by a player) is not >0),
//fixed Hydra regen message not displaying, made critical hit animation line thicker,
//moved dead animation coordinates for giant, cyclops, zombie and hydra




window.onload=function(){
  startbtn.addEventListener("click",buildB);
  storybox.style.animationPlayState="paused"
  audioIntro.play();
  audio1.loop = true;
  credits.onclick=function(){
    creditsList.classList.toggle("visible");
  }
  credits.onmouseover=function(){
    credits.title="Click to open credits";
  }
  difflist.onclick=function(){
    difficulty.classList.toggle("visible");
  }

  diffList.onmouseover=function(){
    diffList.title="Double click to open and close";
  }

  easy.onclick=function(){
    easy.style.backgroundColor="#b3ffff";
    normal.style.backgroundColor="#e6e6e6";
    hard.style.backgroundColor="#e6e6e6";
  }

  easy.onmouseover=function(){
    easy.title="Some starting stats are higher";
  }

  hard.onmouseover=function(){
    hard.title="Some starting stats are lower";
  }

  normal.onclick=function(){
    easy.style.backgroundColor="#e6e6e6";
    normal.style.backgroundColor="#ccff99";
    hard.style.backgroundColor="#e6e6e6";
  }

  hard.onclick=function(){
    easy.style.backgroundColor="#e6e6e6";
    normal.style.backgroundColor="#e6e6e6";
    hard.style.backgroundColor="#cc0000";
  }
  highScoreShow();
  endScore.onclick=function(){
    if(endScore.style.display=="block"){
      endScore.style.display="none";
    }
  }
}


//ELEMENTS

var creditsList=document.querySelector(".creditsList");
var endScore=document.getElementById("endScore");
var credits=document.getElementById("credits");
var startbtn=document.getElementById("startG");
var storybox=document.getElementById("storybox");
var container=document.getElementById("container");
var expP=document.getElementById("xp");
var wrapInputs=document.getElementById("wrapInputs");
var wrapInventory=document.getElementById("wrapInventory");
var wrapOutputs=document.getElementById("wrapOutputs");
var shield=document.getElementById("shield");
var gameAREA=document.getElementById("GAME");
var audio1=document.getElementById("audio1");
var audioIntro=document.getElementById("audioIntro");
var hydraTune=document.getElementById("hydraTune");
var audioLevel1=document.getElementById("audioLevel1");
var audioLevel2=document.getElementById("audioLevel2");
var deadTune=document.getElementById("deadTune");
var endTune=document.getElementById("endTune");
var gameA=document.getElementById("gameA");
var inventoryinfo=document.getElementById("inventoryinfo");
var inventoryuse=document.getElementById("inventoryuse");
var inventoryExceeded=document.getElementById("inventoryExceeded");
var wrapper=document.getElementById("wrapper");
var titleG=document.getElementById("title");
var fight=document.getElementById("fightYN");
var Inv=document.getElementById("Inv");
var InvC=document.querySelector(".InvC");
var cross=document.getElementById("cross");
var flee=document.getElementById("flee");
var gameO=document.getElementById("gameO");

var health=document.getElementById("healthB");
var hText=document.querySelector('P');

var output=document.getElementById("output");
var output2=document.getElementById("output2");
var arena=document.getElementById("fightArena");
var arena2=document.getElementById("arena2");

var attack=document.getElementById("attack");
var continueG=document.getElementById("continue");

var difflist=document.getElementById("diffList");
var easy=document.getElementById("easy");
var normal=document.getElementById("normal");
var hard=document.getElementById("hard");
var difficulty=document.querySelector(".difficulty");

//ELEMENTS ENDS


//VARIABLES

var flash;
var holdArenaEnemy;
var hydraRegen=1;
var enemyAlive;
var inventoryCapacity=5;
var itemsInArea=8;
var removeArena;
var live=true;
var holderPower;
var powerUse=1;
var round=0;
var count=0;
var xp=0;
var dummyInventory2=[];
var InLenHolder;
var holderEnemyH=true;
var eventTargetHolder;
var images="";
var imagesEnemies="";
var holder;
var holder2;
var holderEnePic;
var enemyHealth;
var visit=false;
var playerHealth;
var remaining;
var arenaEnemy;
var inventory=[];
var firstRound=0;
var level2=false;
var level3=false;
var level4=false;
var level5=false;
var level6=false;
var availableItems=0;//increases every time you get an item, being compared to itemsInArea variable which increases in checkpoints
var levelHolder;
var holderFArea;
var eventTargetHolderID;
var builderR=0;
var canvasCreation=0;
var ctx;
var canvas;
var damageAnimation;
var holdArenaPlayer;
var pD;
var eD;
var glevel1=true;
var glevel2=false;
var glevel1MID=false;
var glevel2MID=false;
var gOver=false;
var progress=0;
var iterationCount=0;
var clicks=0;
var passed=0;
var itemUse=0;//counting how many times you have used power potion (extra points at the end if not too many)
var criticalhits=0;
var flees=0;


//VARIABLES END


//EVENT LISTENERS

continueG.onclick=continueGame;

attack.addEventListener("click",result);

flee.onclick=function(){
  if(attack.style.visibility=="visible" && ctx!=undefined && passed!=7 && passed!=15 && passed!=23 && monsters.length>1){
  continueGame();
  flee.style.visibility="hidden";
  flees++;
  holder.style.visibility="hidden";
}
}


useItem.onmouseover=function(){
  useItem.title="type item + enter=> potion=potion || potionbig=potionb || shieldrepair=shield || powerpotion=power || add 2 or 3 to use multiple items, can't use more than you have (flashes red if you do not have any).";
}

useItem.onclick=function(){
  useItem.value="";
}

useItem.onchange=Items;

Inv.addEventListener("click",iventoryToggle);

function iventoryToggle() {
  if(InvC.style.visibility=="hidden"){
  InvC.style.visibility="visible";
} else{
  InvC.style.visibility="hidden";
}
if(inventoryinfo.style.visibility=="visible" || inventoryuse.style.visibility=="visible" || inventoryExceeded.style.visibility=="visible"){
inventoryinfo.style.visibility="hidden";
inventoryuse.style.visibility="hidden";
inventoryExceeded.style.visibility="hidden";
}
}

function inventoryShow(){
  if(inventory.length==0){
    InvC.innerHTML="Empty";
  } else{
  var html="";
  var dummyInventory=[];
  for (var i = 0; i < inventory.length; i++) {
    html +=inventory[i].name+", ";
    dummyInventory.push(inventory[i].name);
  }
  InvC.innerHTML=html;
  dummyInventory2=dummyInventory.slice();
}
}

Inv.onmouseover=function(){
  if(InvC.style.visibility=="hidden"){
      Inv.title="Click to open";
  }else{
    Inv.title="Click to close";
  }
}

fight.onmouseover=function(){
  fight.title="Fight?";
}

//EVENT LISTENERS ENDS


//PLAYER AND MONSTERS
var player={name: "Monster hunter",maxHealth:100,power:20,shield:5,shieldUse:2,dodge:2,level:1};

var monsters=[
  {name: "Goblin",health:15,power:7,shield:2,shieldUse:2,xp:9,dodge:4},//15/power 7
  {name: "Orc",health:30,power:15,shield:4,shieldUse:2,xp:15,dodge:1.1},//30
  {name: "Bigfoot",health:20,power:10,shield:1,shieldUse:1,xp:12,dodge:1.2},//20
  {name: "Dragon",health:40,power:12,shield:5,shieldUse:3,xp:20,dodge:3}//40
];

var monsterImg=["goblin1.png","orc1.png","bigfoot2.png","dragon1.png"];

//PLAYER AND MONSTERS ENDS

//ITEMS

var potion={name:"potion",use:10};

var potionBig={name:"potionBig",use:20};

var shieldRepair={name:"shieldRepair",use:2};

var powerPotion={name:"Powerpotion",use:7};

//ITEMS ENDS


//FUNCTIONS START


//RESULT OF THE ATTACK
function result() {

  if(eventTargetHolder.dataset.play=="true"){

    //ADD SOUND

    audio1.play();
    audio1.loop = false;

    //CLEAR OLD
    arena.innerHTML="";
    arena2.innerHTML="";
    var dodged1="";
    var dodged2="";
    var critical="";
    if(monsters.length==1){
    var critical2="";
  }

    //CLEARING INVENTORYINFOS
    if(inventoryinfo.style.visibility=="visible" || inventoryuse.style.visibility=="visible" || inventoryExceeded.style.visibility=="visible"){
    inventoryinfo.style.visibility="hidden";
    inventoryuse.style.visibility="hidden";
    inventoryExceeded.style.visibility="hidden";
    }

    //RANDOMS

    if(monsters.length==1 && hydraRegen==1){
    var hydraRegenRan=Math.random();
    var regenMessage=false;
  }


    var divider=(Math.random()*2)+1;
    var damage1=(Number(holder2.power)*(Math.random()+0.1))/divider;//the damage enemy does//MAYBE ADD CRITICAL DAMAGE? WHAT ABOUT HIT ACCURACY STAT?
    var damage2=Number(player.power)*Math.random();//the damage player does
    var dodgeEnemy=holder2.dodge*Math.random();
    var dodgePlayer=player.dodge*Math.random();


    //SHIELD AND DODGE

    //PLAYER DODGE EFFECT
    if(dodgePlayer>3){
      damage1=0;
      dodged1="(dodged)";
    }

    //PLAYER SHIELD EFFECT

    if(shield.style.backgroundColor=="green" && player.shieldUse>0 && damage1>0){
      damage1=damage1-(Math.random()*player.shield);
      player.shieldUse--;
      if(damage1<0){
        damage1=0;
      }
    }

    if(player.shieldUse==0){
      shield.style.backgroundColor="#d9d9d9";
      shield.style.backgroundImage="url('broken1.png')";
    }

    //FOR ENEMY DODGE
    if(dodgeEnemy>2){
      damage2=0;
      dodged2="(dodged)";
    }

    //ENEMY SHIELD EFFECT
    if(holder2.shieldUse>0 && damage2>0){
      damage2=damage2-(Math.random()*holder2.shield);
      holder2.shieldUse--;
      if(damage2<0){
        damage2=0;
      }
    }

    //DEFINING CRITICAL HITS (FOR THE extraPoints function)

    if(damage2>=20){
      criticalhits++;
      critical="(critical, +5)";
      damage2=damage2+5;
    }

    if(damage1>15 && monsters.length==1){
      critical2="(critical, +3)";
      damage1=damage1+3;
    }

    //SHIELD AND DODGE ENDS


    //HOLDERS
    if(holderEnemyH==true){
    enemyHealth=Number(holder2.health);
    }

    if(holderEnemyH){
      remaining=enemyHealth-damage2;
    } else{
    remaining=remaining-damage2;
    }

    holderEnemyH=false;

    if(monsters.length==1 && hydraRegenRan>0.94 && hydraRegen==1){
      remaining=remaining+30;
      hydraRegen=0;
      holdArenaEnemy.style.backgroundColor="blue";
      holdArenaEnemy.style.opacity="0.3";
      regenMessage=true;
      eD=setTimeout(hydraExtra, 400);
    }

    //CANVAS FOR DAMAGE ANIMATION
    if(canvasCreation==0){
    canvas=document.getElementById("canvas");
    ctx=canvas.getContext("2d");
    canvas.width=300;
    canvas.height=300;

    canvas.style.position="absolute";
    canvas.style.top="47%";
    canvas.style.right="10%";
    canvas.style.zIndex="10";
    canvasCreation++;

      //IF ENEMY DO NOT DODGE
      if(dodged2!="(dodged)" && damage2>0){
      ctx.beginPath();
      ctx.moveTo(270,180);
      ctx.lineTo(180,290);
      ctx.strokeStyle="red";
      if(damage2>=20){
        ctx.lineWidth=7;
      }else{
        ctx.lineWidth=3;
      }
      ctx.lineCap="round";
      ctx.stroke();
      damageAnimation=setTimeout(clearCanvas,650);
      }
    }

    if(canvasCreation>=1 && dodged2!="(dodged)" && damage2>0){

    ctx.beginPath();
    ctx.moveTo(270,180);
    ctx.lineTo(180,290);
    ctx.strokeStyle="red";
    if(damage2>=20){
      ctx.lineWidth=7;
    }else{
      ctx.lineWidth=3;
    }
    ctx.lineCap="round";
    ctx.stroke();
    if(remaining>0){
    damageAnimation=setTimeout(clearCanvas,650);
  }
    }

    //CANVAS FOR DAMAGE ANIMATION ENDS


    //PLAYER DAMAGE ANIMATION
    if(damage1>0 && remaining>0){
      holdArenaPlayer.style.backgroundColor="red";
      holdArenaPlayer.style.opacity="0.3";
      pD=setTimeout(playerDama, 400);
    }


    //VICTORY MESSAGES

    if(remaining<=0){//1

    arena.innerHTML="You dealt "+damage2.toFixed(2)+" damage"+critical+" to the monster. You slayed the monster!!";
    attack.style.visibility="hidden";

    //ADD DEAD Animation
    clearCanvas();
    clearTimeout(damageAnimation);

    if(damage2>20){
    ctx.strokeStyle="red";
    ctx.lineWidth=6;
    ctx.lineCap="round";
  } else{
    ctx.strokeStyle="red";
    ctx.lineWidth=3;
    ctx.lineCap="round";
  }

    if(output.innerHTML=="Giant appeared" || output.innerHTML=="Cyclops appeared"){

    //From right to left
    ctx.beginPath();
    ctx.moveTo(290,160);
    ctx.lineTo(200,270);
    ctx.stroke();

    //From left to right
    ctx.beginPath();
    ctx.moveTo(200,160);
    ctx.lineTo(290,270);
    ctx.stroke();

  } else if(output.innerHTML=="Hydra appeared"){

    //From right to left
    ctx.beginPath();
    ctx.moveTo(290,150);
    ctx.lineTo(200,260);
    ctx.stroke();

    //From left to right
    ctx.beginPath();
    ctx.moveTo(200,150);
    ctx.lineTo(290,260);
    ctx.stroke();

  } else if(output.innerHTML=="Zombie appeared"){

    //From right to left
    ctx.beginPath();
    ctx.moveTo(260,155);
    ctx.lineTo(170,265);
    ctx.stroke();

    //From left to right
    ctx.beginPath();
    ctx.moveTo(170,155);
    ctx.lineTo(260,265);
    ctx.stroke();

  } else{

    //From right to left
    ctx.beginPath();
    ctx.moveTo(270,180);
    ctx.lineTo(180,290);
    ctx.stroke();

    //From left to right
    ctx.beginPath();
    ctx.moveTo(180,180);
    ctx.lineTo(270,290);
    ctx.stroke();

  }

    //REMOVE ENEMY FROM THE PLAYAREA WHEN DEAD
    holderEnePic.style.visibility="hidden";

    //DISABLING GAME AREA FROM FURTHER VISIT
    eventTargetHolder.dataset.play="false";
    eventTargetHolder.style.backgroundColor="red";
    passed++;
    enemyAlive=false;
    flee.style.visibility="hidden";

    continueG.style.visibility="visible";


  }//1
  else{
    if(monsters.length>=2){
      arena.innerHTML="You dealt "+damage2.toFixed(2)+" damage "+dodged2+critical+" to the monster. Monster has "+remaining.toFixed(2)+" health points remaining.";
    } else{
      arena.innerHTML="You dealt "+damage2.toFixed(2)+" damage "+dodged2+critical+" to the Hydra. Hydra has "+remaining.toFixed(2)+" health points remaining.";
      if(hydraRegenRan>0.94 && hydraRegen==0 && regenMessage){
        arena.innerHTML +=" Hydra did regenerate some of its health after the attack (+30hp).";
      }
    }
      playerHealth=playerHealth-damage1;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';

      //DEFEAT
      if(playerHealth<=0){
        var audios=document.querySelectorAll("audio");
        for (var i = 0; i < audios.length; i++) {
          if(audios[i].play()){
            audios[i].pause();
          }
        }
        deadTune.play();
        deadTune.loop=true;
        gameO.style.visibility="visible";
        cross.style.visibility="visible";

        if(monsters.length==1){
        arena2.innerHTML="Hydra killed you!"+" ("+damage1.toFixed(2)+" damage"+") "+critical2+" The great monster slayer has died. Who is going to save us now?!";
      } else{
        arena2.innerHTML="Monster killed you!"+" ("+damage1.toFixed(2)+" damage"+") "+ "The great monster slayer has died. Who is going to save us now?!";
      }

        holder.style.visibility="hidden";

        live=false;
        attack.style.display="none";
        clearCanvas();
        document.getElementById('fightArena2').style.visibility="hidden";
        document.getElementById('ArenaEnemy').style.visibility="hidden";
        holdArenaPlayer.style.visibility="hidden";
        highScoreShow();

      }//above if statement ends
      else {
        if(monsters.length==1){
        arena2.innerHTML="Hydra attacked you and dealt "+damage1.toFixed(2)+" damage"+dodged1+critical2+" you have "+playerHealth.toFixed(2)+" health points remaining. Attack again!!";
      } else{
        arena2.innerHTML="Monster attacked you and dealt "+damage1.toFixed(2)+" damage"+dodged1+" you have "+playerHealth.toFixed(2)+" health points remaining. Do you dare to attack again?";
      }
      }
    }

  }//first if statement ends
}//function ends




//MONSTER APPEAR WHEN MOVING
function monstersAppear(event) {
if(wrapper.style.visibility=="hidden" && storybox.style.animationPlayState=="paused"){

  //PREVENTING DOUBLE CLICK
    if(round>=1){
  var check= eventTargetHolderID==event.target.id? true:false;
}

  //CONDITIONS DECIDING WETHER OR NOT THE GAME CAN CONTINUE
  if(live && !check){

  if(event.target.dataset.play=="true"){
  event.target.children[0].style.visibility="visible";
  event.target.children[1].style.visibility="visible";
  clicks++;

  if(round>=1){
  holder.src=null;

  shield.style.backgroundColor="#d9d9d9";
  inventoryuse.innerHTML="";
  inventoryuse.style.visibility="hidden";
  enemyAlive=true;

  inventoryinfo.innerHTML="";
  inventoryinfo.style.visibility="hidden";
  inventoryExceeded.innerHTML="";
  inventoryExceeded.style.visibility="hidden";
  playerL.style.visibility="hidden";
  playerL.innerHTML="";

  if(holder.style.visibility=="visible"){
    holder.style.visibility="hidden";
    holderEnePic.style.visibility="hidden";
  } else{
    holderEnePic.style.visibility="hidden"
  }
}

  //SELECTING MONSTER AND SETTING A HOLDER
  var randomN1=Math.floor(Math.random()*monsters.length);

  //MONSTER WITH VALUES
  var drawMonster=monsters[randomN1];
  holder2=drawMonster;

  //CHOOSING WHAT IMAGE INSIDE GAME AREAS (player)
  var moveP=images[event.target.id];
  holder=moveP;

  //CHOOSING WHAT IMAGE INSIDE GAME AREAS (enemy)
  var selectEnemy=imagesEnemies[event.target.id];
  var enemySrc=monsterImg[randomN1];

  //HOLDERS FOR OTHER FUNCTIONS TO USE
  arenaEnemy=enemySrc;
  holderEnePic=selectEnemy;

  //RESETTING PLAYER POWER AFTER USING POWERPOTION
  if(holderPower<player.power){
    player.power=holderPower;
    powerUse=1;
  }

  //DISPLAYING STATS
  holder.onmouseover=displayStatsP;

  holderEnePic.onmouseover=displayStatsE;


  //DISPLAYING MONSTER AND SETTING UP A BATTLE
  moveP.src="hunter1.png";//"p1.gif" is the original draft
  selectEnemy.src=enemySrc;//SETTING A PICTURE INSIDE ENEMY PICTURE AREA
  output.innerHTML=drawMonster.name+" appeared";
  output2.innerHTML="Fight "+drawMonster.name+"?";
  fightYN.style.visibility="visible";

  fightYN.onclick=function(){
    if(eventTargetHolder.dataset.play=="true"){
    attack.style.visibility="visible";
    wrapper.style.visibility="visible";
    buildFightArea();
    fightYN.style.visibility="hidden";
    if(monsters.length>1 && passed!=7 && passed!=15 && passed!=23){
    flee.style.visibility="visible";
      }
    }
  }


  if(round==0){
    round++;
  }

  //ITEMS APPERANCE

  if(event.target.dataset.visit=="false"){
  if(inventory.length<inventoryCapacity && availableItems<itemsInArea){
  InLenHolder=inventory.length;
  var potionProb=2*(Math.floor(Math.random()*16)+1);
  var potionBigProb=2*(Math.floor(Math.random()*20)+1);
  var shieldRepProb=2*(Math.floor(Math.random()*20)+1);
  var powerPotProb=2*(Math.floor(Math.random()*20)+1);

  if(potionProb>=20){
    inventory.push(potion);
    inventoryinfo.innerHTML +="You got a potion (+ 10hp)||";
    availableItems++;//SO THAT THERE IS A LIMIT HOW MUCH STUFF YOU CAN RECEIVE; OTHERWISE YOU WOULD ALWAYS CLEAR YOUR INVENTORY IN ORDER TO GET MORE STUFF
  }
  if(potionBigProb>=30){
    inventory.push(potionBig);
    inventoryinfo.innerHTML +="You got a big potion (+ 20hp)||";
    availableItems++;
  }
  if(shieldRepProb>=30){
    inventory.push(shieldRepair);
    inventoryinfo.innerHTML +="You got a shield repair kit (+1 to shieldUse)||";
    availableItems++;
  }
  if(powerPotProb>=33){
    inventory.push(powerPotion);
    inventoryinfo.innerHTML +="You got a power potion (temporary +7 boost to power)||";
    availableItems++;
  }
  if(inventory.length==inventoryCapacity){
  inventoryinfo.innerHTML +="Inventory is full";

  }
  if(InLenHolder<inventory.length){
    inventoryinfo.style.visibility="visible";
  }
  inventoryShow();

  if(inventory.length>inventoryCapacity){
    var howMany=inventory.length-inventoryCapacity;
    inventory.splice(inventory.length-howMany,howMany);
    dummyInventory2.splice(dummyInventory2.length-howMany,howMany);//dummyInventory2.indexOf('potion'),1);
    inventoryShow();
    inventoryExceeded.innerHTML="You exceeded your inventory capacity, latest item(s) were dropped.";
    inventoryExceeded.style.visibility="visible";
    availableItems=availableItems-howMany;
  }
}
event.target.dataset.visit="true";
event.target.style.backgroundColor="#ffe0b3";
}

  //THIS IS FOR SENDING EVENT TARGET DATA OVER TO RESULTS() FUNCTION
  eventTargetHolder=event.target;
  eventTargetHolderID=event.target.id;
}
}
}
}//for the very first statement concerning if the wrapper is hidden (so that you can't move to another area in the middle of a fight)


//BUILDING THE PLAY AREA AND INPUTS
function buildB() {
  if(glevel1==true || glevel2==true){
    if(glevel2==false){
  audioIntro.pause();
  audioLevel1.play();
  audioLevel1.loop=true;
  document.querySelector("body").style.background="url('wasteland3.jpg') no-repeat";
  document.querySelector("body").style.backgroundSize="cover";
  storyBoxPlay();
  document.querySelector("h2").style.visibility="hidden";
  endScore.style.display="none";
  credits.style.display="none";
  diffList.style.display="none";
  difficulty.style.display="none";
  playerHealth=player.maxHealth;
  titleG.style.display="none";
  Inv.style.visibility="visible";
  InvC.style.visibility="hidden";
  useItem.style.visibility="visible";
  useItem.value="Item name + enter";
  shield.style.visibility="visible";

  InvC.innerHTML="Empty";
  wrapper.style.visibility="hidden";
  shield.onclick=function(){
    if(player.shieldUse>0){
    if(shield.style.backgroundColor=="green"){
    shield.style.backgroundColor="#d9d9d9";
  } else {
    shield.style.backgroundColor="green";
      }
    }
  }

  shield.onmouseover=function(){
    shield.title="Use shield by clicking on this button (green=activated). Every attack round the shield stays activate is -1 to shieldUse.";
  }

  startbtn.style.visibility="hidden";

  if(easy.style.backgroundColor=="rgb(179, 255, 255)"){
    player={name: "Monster hunter",maxHealth:100,power:25,shield:8,shieldUse:5,dodge:2,level:1};
  }

  if(hard.style.backgroundColor=="rgb(204, 0, 0)"){
    player={name: "Monster hunter",maxHealth:100,power:17,shield:3,shieldUse:1,dodge:1.5,level:1};
  }

}

  if(glevel1==true || (glevel2==true)){
  for (var i = 0; i < 8; i++) {
    var div=document.createElement("DIV");
    div.classList.add("smallA");
    div.id=i;
    div.dataset.play="true";
    div.dataset.visit="false";
    div.dataset.prevent="I";
    div.addEventListener("click",monstersAppear);
    gameA.appendChild(div);

    var img=document.createElement("img");
    img.classList.add("playerImg");
    div.appendChild(img);

    var imgEnemy=document.createElement("img");
    imgEnemy.classList.add("enemy");
    div.appendChild(imgEnemy);
  }

  images=document.querySelectorAll(".playerImg");
  imagesEnemies=document.querySelectorAll(".enemy");
}

  if(glevel2==false){
  health.style.visibility="visible";
  health.onmouseover=showHealth;
  hText.style.visibility="visible";
  expP.innerHTML="XP-points "+xp;
  expP.style.visibility="visible";
  storyC.innerText="Monsters started to appear 10 years ago out of nowhere. They are destroying and killing everything that gets into their way. A guild of monster hunters were formed to stop the monsters. You are one of the last members of the guild still standing. Welcome to the world of monsters, everyone is counting on you, good luck!";

  storybox.style.visibility="visible";
  storybox.style.padding="1em";
  storybox.addEventListener("animationiteration",function(){
    storybox.style.animationPlayState="paused";
    storybox.style.display="none";
    iterationCount++;
    if(iterationCount==7){
        highScoreShow();
        expP.innerHTML="XP-points "+xp;
    }
  })


  gameA.onmousemove=function(){
    if(count==0 && storybox.style.animationPlayState=="paused"){
        storyC.innerText="Move to areas (click) where monsters have been spotted. Visit all the areas and save the people who are terrorised by the monsters. The monsters do not know mercy, you know what to do! Tip: people might have left some useful items behind, make good use of them.";
        storyBoxPlay();
        count++;
      }
    }
  }
}
}


//ACTION WHEN LEVELING UP
function levelUp() {

  //STAT CHANGES
  var levelHolder=player.level;

  if(xp>30 && xp<90 && !level2){
    player.maxHealth +=10;
    player.level++;
    player.power++;
    level2=true;
  }
  if(xp>=90 && xp<180 && !level3){
    player.maxHealth +=10;
    player.power++;
    player.shield++;
    player.dodge++;
    player.level++;
    level3=true;
    inventoryCapacity=inventoryCapacity+3;
  }
  if(xp>=180 && xp<360 && !level4){
    player.maxHealth +=10;
    player.shieldUse=player.shieldUse+2;
    player.level++;
    level4=true;
  }
  if(xp>=360 && xp<720 && !level5){
    player.maxHealth +=10;
    player.power=player.power+2;
    player.shield++;
    player.dodge++;
    player.level++;
    level5=true;
  }
  if(xp>=720 && !level6){
    player.maxHealth +=10;
    player.power++;
    player.shieldUse=player.shieldUse+2;
    player.shield=player.shield+0.5;
    player.dodge=player.dodge+0.5;
    player.level++;
    level6=true;
  }

  var keys=Object.keys(player);
  var values=Object.values(player);

  //DISPLAY MESSAGE IF LEVEL UP
  var html="";
  if(levelHolder<player.level){
    playerL.style.visibility="visible";

    for (var i = 1; i < keys.length; i++) {
      html +=keys[i]+":"+values[i]+"|| ";
    }
      playerL.innerHTML="Level up, your stats: "+html;
  }

  //FINAL STATS
  if(gOver==true){
    var html="";
    for (var i = 1; i < keys.length; i++) {
      html +=keys[i]+":"+values[i]+"|| ";
    }
    playerL.innerHTML="Final stats: "+html;
    playerL.style.visibility="visible";
  }

}

function Items() {

  //POTION

  if(useItem.value.toLowerCase()=="potion" || useItem.value.toLowerCase()=="potion2" || useItem.value.toLowerCase()=="potion3"){

    if(dummyInventory2.indexOf("potion")!=-1){


    if(useItem.value.toLowerCase()=="potion"){

    if(player.maxHealth<=playerHealth+potion.use){
      playerHealth=player.maxHealth;
      health.style.background="red";
    } else{
      playerHealth +=potion.use;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
    }

    inventory.splice(dummyInventory2.indexOf('potion'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potion'),1);
    inventoryuse.innerHTML="You used a potion: +"+potion.use+" health";
    var used=true;

  } else if(useItem.value.toLowerCase()=="potion2"){

    var countItems=0;
    for (var i = 0; i < 2; i++) {
      if(dummyInventory2.indexOf("potion")!=-1){
    inventory.splice(dummyInventory2.indexOf('potion'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potion'),1);
    countItems++;
    }
  }

    if(player.maxHealth<=playerHealth+(countItems*potion.use)){
      playerHealth=player.maxHealth;
      health.style.background="red";
    } else{
      playerHealth +=countItems*potion.use;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
    }

} else if(useItem.value.toLowerCase()=="potion3"){

    var countItems=0;
    for (var i = 0; i < 3; i++) {
      if(dummyInventory2.indexOf("potion")!=-1){
    inventory.splice(dummyInventory2.indexOf('potion'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potion'),1);
    countItems++;
    }
  }

    if(player.maxHealth<=playerHealth+(countItems*potion.use)){
      playerHealth=player.maxHealth;
      health.style.background="red";
    } else{
      playerHealth +=countItems*potion.use;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
    }

} //potion3

} else{
    flashUse();
}

  if(countItems){
   if(countItems>1){
   inventoryuse.innerHTML="You used potions: +"+(countItems*potion.use)+" health";
 } else if(countItems==1){
   inventoryuse.innerHTML="You used a potion: +"+potion.use+" health";
 }
}


}//potion1,2,3

  //BIG POTION

  if(useItem.value.toLowerCase()=="potionb" || useItem.value.toLowerCase()=="potionb2" || useItem.value.toLowerCase()=="potionb3"){

    if(dummyInventory2.indexOf("potionBig")!=-1){

    if(useItem.value.toLowerCase()=="potionb"){

    if(player.maxHealth<=playerHealth+potionBig.use){
      playerHealth=player.maxHealth;
      health.style.background="red";
    } else{
      playerHealth +=potionBig.use;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
    }
    inventory.splice(dummyInventory2.indexOf('potionBig'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potionBig'),1);
    inventoryuse.innerHTML="You used a big potion: +"+potionBig.use+" health";
    var used=true;

} else if(useItem.value.toLowerCase()=="potionb2"){

  var countItems=0;
  for (var i = 0; i < 2; i++) {
    if(dummyInventory2.indexOf("potionBig")!=-1){
    inventory.splice(dummyInventory2.indexOf('potionBig'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potionBig'),1);
    countItems++;
    }
  }

  if(player.maxHealth<=playerHealth+(countItems*potionBig.use)){
    playerHealth=player.maxHealth;
    health.style.background="red";
  } else{
    playerHealth +=countItems*potionBig.use;
    health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
  }

} else if(useItem.value.toLowerCase()=="potionb3"){

  var countItems=0;
  for (var i = 0; i < 3; i++) {
    if(dummyInventory2.indexOf("potionBig")!=-1){
    inventory.splice(dummyInventory2.indexOf('potionBig'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('potionBig'),1);
    countItems++;
    }
  }

  if(player.maxHealth<=playerHealth+(countItems*potionBig.use)){
    playerHealth=player.maxHealth;
    health.style.background="red";
  } else{
    playerHealth +=countItems*potionBig.use;
    health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
  }

}

} else{
    flashUse();
}

  if(countItems){
  if(countItems>1){
    inventoryuse.innerHTML="You used big potions: +"+(countItems*potionBig.use)+" health";
  } else if(countItems==1){
    inventoryuse.innerHTML="You used a big potion: +"+potionBig.use+" health";
  }
}

}

  //SHIELD REPAIR

  if(useItem.value.toLowerCase()=="shield" || useItem.value.toLowerCase()=="shield2" || useItem.value.toLowerCase()=="shield3"){

    if(dummyInventory2.indexOf("shieldRepair")!=-1){

    if(useItem.value.toLowerCase()=="shield"){

    player.shieldUse +=shieldRepair.use;
    inventory.splice(dummyInventory2.indexOf('shieldRepair'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('shieldRepair'),1);
    inventoryuse.innerHTML="You used a shield repair kit: +"+shieldRepair.use+" to shieldUse";
    var used=true;

} else if(useItem.value.toLowerCase()=="shield2"){

  var countItems=0;
  for (var i = 0; i < 2; i++) {
    if(dummyInventory2.indexOf("shieldRepair")!=-1){
  inventory.splice(dummyInventory2.indexOf('shieldRepair'),1);
  dummyInventory2.splice(dummyInventory2.indexOf('shieldRepair'),1);
  countItems++;
}
}

  player.shieldUse +=countItems*shieldRepair.use;

} else if(useItem.value.toLowerCase()=="shield3"){

  var countItems=0;
  for (var i = 0; i < 3; i++) {
    if(dummyInventory2.indexOf("shieldRepair")!=-1){
  inventory.splice(dummyInventory2.indexOf('shieldRepair'),1);
  dummyInventory2.splice(dummyInventory2.indexOf('shieldRepair'),1);
  countItems++;
}
}

  player.shieldUse +=countItems*shieldRepair.use;

}//shield3

if(shield.style.backgroundImage=='url("broken1.png")'){
  shield.style.backgroundImage='url("shield1.png")';
  }

} else{
    flashUse();
}

  if(countItems){
  if(countItems>1){
    inventoryuse.innerHTML="You used shield repair kits: +"+(countItems*shieldRepair.use)+" to shieldUse";
  } else if(countItems==1){
    inventoryuse.innerHTML="You used a shield repair kit: +"+shieldRepair.use+" to shieldUse";
  }
}

}//shield 1,2,3

  //POWER POTION

  if(useItem.value.toLowerCase()=="power" || useItem.value.toLowerCase()=="power2" || useItem.value.toLowerCase()=="power3"){

    if(dummyInventory2.indexOf("Powerpotion")!=-1){

    if(holderPower==0 || powerUse==1){
    holderPower=player.power;
  }

    if(useItem.value.toLowerCase()=="power"){
    player.power +=powerPotion.use;
    inventory.splice(dummyInventory2.indexOf('Powerpotion'),1);
    dummyInventory2.splice(dummyInventory2.indexOf('Powerpotion'),1);
    itemUse++;
    inventoryuse.innerHTML="You used a power potion: +"+powerPotion.use+" to power (temporary)";
    var used=true;

  } else if(useItem.value.toLowerCase()=="power2"){

    var countItems=0;
    for (var i = 0; i < 2; i++) {
      if(dummyInventory2.indexOf("Powerpotion")!=-1){
      inventory.splice(dummyInventory2.indexOf('Powerpotion'),1);
      dummyInventory2.splice(dummyInventory2.indexOf('Powerpotion'),1);
      countItems++;
    }
  }

    player.power +=countItems*powerPotion.use;

  } else if(useItem.value.toLowerCase()=="power3"){

    var countItems=0;
    for (var i = 0; i < 3; i++) {
      if(dummyInventory2.indexOf("Powerpotion")!=-1){
      inventory.splice(dummyInventory2.indexOf('Powerpotion'),1);
      dummyInventory2.splice(dummyInventory2.indexOf('Powerpotion'),1);
      countItems++;
    }
  }

    player.power +=countItems*powerPotion.use;

  }//power3

} else{
    flashUse();
}
    if(countItems){
    itemUse=itemUse+countItems;

    if(countItems>1){
      inventoryuse.innerHTML="You used power potions: +"+(countItems*powerPotion.use)+" to power (temporary)";
    } else if(countItems==1){
      inventoryuse.innerHTML="You used a power potion: +"+powerPotion.use+" to power (temporary)";
    }

    if(countItems>0){
      powerUse++;
    }
  }

}//power 1,2,3

  if(countItems>0 || used){
  inventoryuse.style.visibility="visible";
  }

  inventoryShow();
}

//BUILDING THE AREA WHERE FIGHTS HAPPEN
function buildFightArea(){
  if(builderR<1){
  var div=document.createElement('div');
  div.style.position="absolute";
  div.style.top="47%";
  div.style.right="10%";
  div.style.width="300px";
  div.style.height="300px";
  div.style.border="1px solid black";
  div.style.background="url('forest.jpg') no-repeat";
  div.style.backgroundSize="100%";
  div.style.zIndex="10";
  div.id="fightArena2";
  gameAREA.appendChild(div);

  //CREATE ENEMY IMAGE
  var imgE=document.createElement('img');
  imgE.src=arenaEnemy;
  imgE.style.position="absolute";
  imgE.style.bottom="0";
  imgE.style.right="0";
  imgE.style.zIndex="20";
  imgE.id="ArenaEnemy";
  imgE.style.visibility="visible";
  div.appendChild(imgE);
  holdArenaEnemy=document.getElementById('ArenaEnemy');

  //CREATE PLAYER IMAGE
  var imgP=document.createElement('img');
  imgP.src="hunter1.png";
  imgP.style.position="absolute";
  imgP.style.bottom="0";
  imgP.style.left="0";
  imgP.style.zIndex="20";
  imgP.id="ArenaPlayer";
  imgP.style.visibility="visible";
  div.appendChild(imgP);
  builderR ++;
  holdArenaPlayer=document.getElementById('ArenaPlayer');

} else{

  //MAKE HOLDER FOR THESE TO SHORTEN THE CODE

  document.getElementById('ArenaEnemy').src=arenaEnemy;
  document.getElementById('fightArena2').style.visibility="visible";
  document.getElementById('ArenaEnemy').style.visibility="visible";
  holdArenaPlayer.style.visibility="visible";
}

}

function addLevels() {
  for (var i = 8; i < 16; i++) {//images.length if possible to var i value
    var div=document.createElement("DIV");
    div.classList.add("smallA");
    div.id=i;
    div.dataset.play="true";
    div.dataset.visit="false";
    div.dataset.prevent="I";
    div.addEventListener("click",monstersAppear);
    gameA.appendChild(div);

    var img=document.createElement("img");
    img.classList.add("playerImg");
    div.appendChild(img);

    var imgEnemy=document.createElement("img");
    imgEnemy.classList.add("enemy");
    div.appendChild(imgEnemy);
  }

  images=document.querySelectorAll(".playerImg");
  imagesEnemies=document.querySelectorAll(".enemy");
}

function clearCanvas() {
  ctx.clearRect(0,0,canvas.width,canvas.height);
}

function displayStatsP() {

  //DISPLAYING PLAYER STATS
  holder.title="Name: "+player.name+"||"+"maxHealth: "+player.maxHealth+"||"+"Power: "+player.power+"||"+"Shield: "+player.shield+"||"+"ShieldUse: "+player.shieldUse+"              "+"Dodge: "+player.dodge+"||"+"Level: "+player.level;
}

function displayStatsE() {

  //DISPLAYING ENEMY STATS
  holderEnePic.title="Name: "+holder2.name+"||"+"Health: "+holder2.health+"||"+"Power: "+holder2.power+"||"+"Shield: "+holder2.shield+"||"+"ShieldUse: "+holder2.shieldUse+"||"+"Dodge: "+holder2.dodge;
}

function showHealth() {
  health.title="Remaining: "+playerHealth.toFixed(2)+" hp";
}

function playerDama() {
  holdArenaPlayer.style.backgroundColor="transparent";
  holdArenaPlayer.style.opacity="1";
  clearTimeout(pD);
}

function hydraExtra() {
  holdArenaEnemy.style.backgroundColor="transparent";
  holdArenaEnemy.style.opacity="1";
  clearTimeout(eD);
}

function storyBoxPlay() {
  storybox.style.animationPlayState="running"
  storybox.style.display="inline-block";
}

function checkProgress() {

  //CHECKING IF AREA IS CLEARED AND ADVANCING

  var count2=0;
  var testing=document.querySelectorAll(".smallA");

  for (var i = 0; i < testing.length; i++) {
    if(testing[i].dataset.play=="false"){
      count2++;
    }
  }

    if(count2<testing.length){//2

      if(count2==15 && glevel2MID==true){
        var hydra={name: "Hydra",health:100,power:32,shield:10,shieldUse:12,xp:100,dodge:4};//100
        monsters=[];
        monsters.push(hydra);
        monsterImg=[];
        monsterImg.push("hydra1.png");

        //MAKING HYDRA GAME AREA ICON BIGGER
        var testing2=document.querySelectorAll(".smallA");
        for (var i = 0; i < testing2.length; i++) {
          if(testing2[i].dataset.play=="true"){
            imagesEnemies[i].style.height="100%";
          }
        }
        document.getElementById('fightArena2').children[0].style.height="100%";

        storyC.innerText="There is only one monster standing and it's a big one. Remember your training and do not show fear, fleeing is no option. The people are counting on you, good luck!";
        audioLevel2.pause();
        hydraTune.play();
        hydraTune.loop=true;
        storyBoxPlay();
      }
    }//2

    else {//3-pair to 2

     progress++;

    if(glevel1MID==false){
      glevel1MID=true;
      glevel1=false;
    }

    if(progress==2){
    if(glevel1MID==true && glevel2==false){
      glevel2=true;
      glevel1MID=false;
    }
    }
    if(progress==3){
    if(glevel2==true && glevel2MID==false){
      glevel2MID=true;
      glevel2=false;
    }
    }

    if(progress==4){
    if(glevel2MID==true && count2==testing.length){
      glevel2MID==false;
      gOver=true;
    }
    }

      if((count2<16 && glevel1MID==true && continueG.style.visibility=="hidden") || (count2<16 && glevel2MID==true)){//4

        storyC.innerText="You have defeated all the monsters in the area! The job is not over yet, new reports of the monsters in the area have arrived. There are new enemies to watch out! Resting has revived some of your health.";
        storyBoxPlay();
        addLevels();

      //ADD NEW MONSTERS
      if(glevel1MID==true){
      var giant={name: "Giant",health:45,power:13,shield:6,shieldUse:2,xp:22,dodge:2};//45
      var werewolf={name: "Werewolf",health:35,power:13,shield:2,shieldUse:5,xp:26,dodge:4};//35
      monsters.push(giant);
      monsters.push(werewolf);
      monsterImg.push("giant1.png");
      monsterImg.push("werewolf1.png");
      }

      if(glevel2MID==true){
        var golem={name: "Golem",health:52,power:25,shield:7,shieldUse:4,xp:40,dodge:2.1};//52
        var zombie={name: "Zombie",health:65,power:10,shield:2,shieldUse:1,xp:30,dodge:2.1};//65
        var cyclops={name: "Cyclops",health:48,power:16,shield:4,shieldUse:3,xp:35,dodge:2.5};//48
        monsters.push(golem);
        monsters.push(zombie);
        monsters.push(cyclops);
        monsterImg.push("golem1.png");
        monsterImg.push("zombie1.png");
        monsterImg.push("cyclops1.png");
      }

        //MORE ITEMS TO BE FOUND
        itemsInArea=itemsInArea+8;
        playerHealth=playerHealth+50;

        //EXTRA HEALTH FOR RESTING BEFORE ADVANCING
        if(playerHealth>=player.maxHealth){
          playerHealth=player.maxHealth;
          health.style.background="red";
        } else{
        health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
      }
    }//4

      //MOVE TO LEVEL 2
      if(glevel2==true){
        storyC.innerText="Monsters are advancing to the last fortress of human kind - The Green Oasis. Do whatever needs to be done to stop them! Health restored by 50hp by resting.";
        storyBoxPlay();

        //REMOVE OLD PLAY AREAS
        gameA.parentNode.removeChild(gameA);
        var createNewgameA=document.createElement("div");
        createNewgameA.id="gameA";
        gameAholder.appendChild(createNewgameA);
        gameA=document.getElementById("gameA");

        //CHANGE BACKGROUND AND FIGHTARENA BACKGROUND
        gameAREA.style.height="800px";
        document.querySelector("body").style.background="url('level2_back.jpg') no-repeat";
        document.getElementById("fightArena2").style.background="url('ruins.jpg') no-repeat";
        document.getElementById("fightArena2").style.backgroundSize="cover";

        //CREATE NEW AREAS
        buildB();
        audioLevel1.pause();
        audioLevel2.play();
        audioLevel2.loop=true;

      //MORE ITEMS TO BE FOUND
        itemsInArea=itemsInArea+8;
        playerHealth=playerHealth+50;

        //EXTRA HEALTH FOR RESTING BEFORE ADVANCING
        if(playerHealth>=player.maxHealth){
          playerHealth=player.maxHealth;
          health.style.background="red";
        } else{
        health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
      }
    }
  }//else on row 771 (pair to //2)

    //END GAME
    if(gOver==true){
      gameA.parentNode.removeChild(gameA);
      hydraTune.pause();
      endTune.play();
      endTune.loop=true;

      holderEnemyH=true;
      wrapInputs.style.visibility="hidden";
      wrapInventory.style.visibility="hidden";
      wrapOutputs.style.visibility="hidden";
      attack.style.visibility="hidden";

      Inv.style.visibility="hidden";
      InvC.style.visibility="hidden";
      shield.style.visibility="hidden";
      fight.style.visibility="hidden";
      useItem.style.visibility="hidden";
      xp +=holder2.xp;
      expP.innerHTML="XP-points "+xp;
      player.power=holderPower;

      document.querySelector("body").style.background="url('GO.jpg') no-repeat";
      document.querySelector("body").style.backgroundSize="cover";
      storyC.innerText="You are a true hero. The world has been swiped out of the horrible monsters! You will be remembered as a legend!";
      extraPoints();
      storyBoxPlay();
      levelUp();
    }


  //CHECKING IF AREA IS CLEARED AND ADVANCING ENDS
}


function highScoreShow(){

  //ADD HIGHSCORE TABLE

    if(localStorage.getItem("XP")!=null){
      var compareXP=JSON.parse(localStorage.getItem("XP"));
    if(compareXP.length>1){
      compareXP = compareXP.sort((a, b) => a - b);
    }
  } else{
    var compareXP=[];
  }
    //ADD HIGHSCORE TABLE

    if(localStorage.getItem("HS")!=null){
      var contentScore=JSON.parse(localStorage.getItem("HS"));
    } else{
      var contentScore=[];
    }


    if(iterationCount==7 || !live){
      if(contentScore.length<5){
    var name=prompt("What is your name hero? ");
    var saveToLocal={name:name,score:xp};
    contentScore.push(saveToLocal);
    compareXP.push(xp);
  } else{

      if(xp>=compareXP[0]){
        var name=prompt("What is your name hero? ");
        var saveToLocal={name:name,score:xp};
        var add=0;

        for (var i = 0; i < contentScore.length; i++) {
          if(contentScore[i].score==compareXP[0]){
            if(add==0){
            contentScore.splice(i,1);
            contentScore.push(saveToLocal);
            compareXP.splice(0,1);
            compareXP.push(xp);
            add++;
          }//if
        }
        }//for
      }//if main

    }//else

  }//if highest

    if(gOver || !live || localStorage.getItem("HS")!=null){

      var html="TOP SCORES"+'<br>'+'<ol>';
      for (var i = 0; i < contentScore.length; i++) {
        html +='<li>'+contentScore[i].name+" "+contentScore[i].score+'</li>'+'<br>';
      }
      html +='</ol>';
      endScore.innerHTML=html;

  } else{

    endScore.innerHTML='TOP SCORES'+'<br>'+'<ol><li>No scores yet</li></ol>';
    console.log(endScore.innerHTML);
  }

    if(!live){
      endScore.style.top="300px";
      endScore.style.left="530px";
    }

    endScore.style.display="block";

    //SAVING TO LOCALSTORAGE
    localStorage.setItem("HS",JSON.stringify(contentScore));

    localStorage.setItem("XP",JSON.stringify(compareXP));

  }


  function extraPoints() {

    const xpHolder=xp;

    if(clicks==passed){
      xp=xp+30;
    }

    if(playerHealth>50){
      xp=xp+20;
    }

    if(itemUse<4){
      xp=xp+30;
    }

    if(criticalhits>=5){
      xp=xp+30;
    }


    if(flees==0){
      xp=xp+80;

    } else if(flees==1){
      xp=xp+40;

    } else if(flees==2){
      xp=xp+20;
    }

    if(normal.style.backgroundColor=="rgb(204, 255, 153)"){
      xp=xp+70;
    }
    if(hard.style.backgroundColor=="rgb(204, 0, 0)"){
      xp=xp+150;
    }

    if(xpHolder<xp){
      const extra=xp-xpHolder;
      storyC.innerText +=" You got "+extra+" extra points for your efforts. Well done!";
  }

  }

  function continueGame(){
    arena.innerHTML="";
    arena2.innerHTML="";
    holderEnemyH=true;
    continueG.style.visibility="hidden";
    attack.style.visibility="hidden";
    wrapper.style.visibility="hidden";
    if(enemyAlive==false){
    xp +=holder2.xp;
    expP.innerHTML="XP-points "+xp;
    levelUp();
    checkProgress();
  }
    // removeArena.remove();
    clearCanvas();
    document.getElementById('fightArena2').style.visibility="hidden";
    document.getElementById('ArenaEnemy').style.visibility="hidden";
    holdArenaPlayer.style.visibility="hidden";
  }

  function flashUse() {
    useItem.style.backgroundColor="red";
    flash=setTimeout(flashClear, 400);
  }

  function flashClear() {
    useItem.style.backgroundColor="";
    clearTimeout(flash);
  }
