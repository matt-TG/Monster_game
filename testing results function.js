//RESULT OF THE ATTACK
function result() {

  if(eventTargetHolder.dataset.play=="true"){

  //ADD SOUND

  audio.play();
  audio.loop = false;

  //CLEAR OLD
  arena.innerHTML="";
  arena2.innerHTML="";
  var dodged1="";
  var dodged2="";

  //CLEARING INVENTORYINFOS
  if(inventoryinfo.style.visibility=="visible" || inventoryuse.style.visibility=="visible" || inventoryExceeded.style.visibility=="visible"){
  inventoryinfo.style.visibility="hidden";
  inventoryuse.style.visibility="hidden";
  inventoryExceeded.style.visibility="hidden";
  }

  //RANDOMS
  var damage1=Number(holder2.power)*(Math.random()+0.1);//the damage enemy does
  var damage2=Number(player.power)*Math.random();//the damage player does
  var dodgeEnemy=holder2.dodge*Math.random();
  var dodgePlayer=player.dodge*Math.random();

  //SHIELD AND DODGE

  //PLAYER SHIELD EFFECT
  if(shield.value.toUpperCase()=="Y" && player.shieldUse>0){
    damage1=damage1-(Math.random()*player.shield);
    player.shieldUse--;
    if(damage1<0){
      damage1=0;
    }
  }

  //PLAYER DODGE EFFECT
  if(dodgePlayer>3){
    damage1=0;
    dodged1="(dodged)";
  }

  if(damage1>0){
    holdArenaPlayer.style.backgroundColor="red";
    holdArenaPlayer.style.opacity="0.3";
    pD=setTimeout(playerDama, 400);
  }

  //ENEMY SHIELD EFFECT
  if(holder2.shieldUse>0){
    damage2=damage2-(Math.random()*holder2.shield);
    holder2.shieldUse--;
    if(damage2<0){
      damage2=0;
    }
  }

  //FOR ENEMY DODGE
  if(dodgeEnemy>2){
    damage2=0;
    dodged2="(dodged)";
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
  ctx.lineWidth=3;
  ctx.lineCap="round";
  ctx.stroke();
  damageAnimation=setTimeout(clearCanvas,600);
}

}

  if(canvasCreation>=1 && dodged2!="(dodged)" && damage2>0){
  ctx.clearRect(0,0,canvas.width,canvas.height);//for clearing canvas
  ctx.beginPath();
  ctx.moveTo(270,180);
  ctx.lineTo(180,290);
  ctx.strokeStyle="red";
  ctx.lineWidth=3;
  ctx.lineCap="round";
  ctx.stroke();
  damageAnimation=setTimeout(clearCanvas,650);
  }


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

//VICTORY MESSAGE

  if(remaining<=0){//1

    arena.innerHTML="You slayed the monster!!";
    attack.style.visibility="hidden";

    //ADD DEAD Animation
    clearTimeout(damageAnimation);
    ctx.beginPath();
    ctx.moveTo(270,180);
    ctx.lineTo(180,290);
    ctx.strokeStyle="red";
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(180,180);
    ctx.lineTo(270,290);
    ctx.strokeStyle="red";
    ctx.lineWidth=3;
    ctx.lineCap="round";
    ctx.stroke();

    // removeArena.parentNode.removeChild(removeArena);//THIS

    //REMOVE ENEMY FROM THE PLAYAREA WHEN DEAD
    holderEnePic.style.visibility="hidden";//THIS

    //DISABLING GAME AREA FROM FURTHER VISIT
    eventTargetHolder.dataset.play="false";//THIS
    eventTargetHolder.style.backgroundColor="red";//THIS

    //CHECKING IF AREA IS CLEARED
    var count2=0;
    var testing=document.querySelectorAll(".smallA");

    for (var i = 0; i < testing.length; i++) {
      if(testing[i].dataset.play=="false"){
        count2++;
      }
    }//1

    if(count2<testing.length){//2
    continueG.style.visibility="visible";
    continueG.onclick=function(){
      arena.innerHTML="";
      arena2.innerHTML="";
      holderEnemyH=true;
      continueG.style.visibility="hidden";
      attack.style.visibility="hidden";
      wrapper.style.visibility="hidden";
      xp +=holder2.xp;
      expP.innerHTML="XP-points "+xp;
      levelUp();
      // removeArena.remove();
      clearCanvas();
      document.getElementById('fightArena2').style.visibility="hidden";
      document.getElementById('ArenaEnemy').style.visibility="hidden";
      holdArenaPlayer.style.visibility="hidden";
    }
  }//2

   else{//3-pair to 2

    if(glevel1MID==false){
      glevel1MID=true;
      glevel1=false;
    }

    if(glevel1MID==true && glevel2==false){
      glevel2=true;
      glevel1MID=false;
    }

    if(glevel2==true && glevel2MID==false){
      glevel2MID=true;
      glevel2=false;
    }

    if(glevel2MID==true && count2==testing.length){
      glevel2MID==false;
      gOver=true;
    }

    if((count2<16 && glevel1MID==true) || (count2<16 && glevel2MID==true)){//4

      alert("You have defeated all the monsters in the area! The job is not over yet, new reports of the monsters in the area have arrived. There are new enemies to watch out! Resting has revived some of your health.");

      addLevels();

      //ADDING FUNCTIONALITY OF CONTINUEG BECAUSE CONTINUE BUTTON DOESN'T APPEAR WHEN THE WHOLE AREA IS CLEARED
      arena.innerHTML="";
      arena2.innerHTML="";
      holderEnemyH=true;
      continueG.style.visibility="hidden";
      attack.style.visibility="hidden";
      wrapper.style.visibility="hidden";
      xp +=holder2.xp;
      expP.innerHTML="XP-points "+xp;
      levelUp();
      // removeArena.remove();

      //MAKE HOLDERS FOR THESE TO MAKE THE CODE SHORTER
      document.getElementById('fightArena2').style.visibility="hidden";
      document.getElementById('ArenaEnemy').style.visibility="hidden";
      holdArenaPlayer.style.visibility="hidden";
      clearCanvas();

    //ADD NEW MONSTERS
    if(glevel1MID==true){
    var giant={name: "Giant",health:1,power:13,shield:2,shieldUse:2,xp:22,dodge:2};//45
    var werewolf={name: "Werewolf",health:1,power:13,shield:2,shieldUse:5,xp:26,dodge:4};//35
    monsters.push(giant);
    monsters.push(werewolf);
    monsterImg.push("giant1.png");
    monsterImg.push("werewolf1.png");
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

    //MOVE TO LEVEL 2
    if(glevel2==true){
      alert("Monsters are advancing to the last fortress of human kind. Do whatever needs to be done to stop them! Health restored by 50hp by resting.");

      //REMOVE OLD PLAY AREAS
      gameA.parentNode.removeChild(gameA);
      var createNewgameA=document.createElement("div");
      createNewgameA.id="gameA";
      gameAholder.appendChild(createNewgameA);
      gameA=document.getElementById("gameA");

      //CHANGE BACKGROUND AND FIGHTARENA BACKGROUND
      document.querySelector("body").style.background="url('level2_back.jpg') no-repeat";
      document.getElementById("fightArena2").style.background="url('ruins.jpg') no-repeat";
      document.getElementById("fightArena2").style.backgroundSize="cover";

      //CREATE NEW AREAS
      buildB();

      //ADDING FUNCTIONALITY OF CONTINUEG BECAUSE CONTINUE BUTTON DOESN'T APPEAR WHEN THE WHOLE AREA IS CLEARED
      arena.innerHTML="";
      arena2.innerHTML="";
      holderEnemyH=true;
      continueG.style.visibility="hidden";
      attack.style.visibility="hidden";
      wrapper.style.visibility="hidden";
      xp +=holder2.xp;
      expP.innerHTML="XP-points "+xp;
      levelUp();
      // removeArena.remove();

      //MAKE HOLDERS FOR THESE TO MAKE THE CODE SHORTER
      document.getElementById('fightArena2').style.visibility="hidden";
      document.getElementById('ArenaEnemy').style.visibility="hidden";
      holdArenaPlayer.style.visibility="hidden";
      clearCanvas();
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
}

  //END GAME
  if(gOver==true){
    alert("You are a true hero. The world has been swiped out of the horrible monsters! You will be remembered as a legend!");
  }


  }//4


  //BATTLE CONTINUES
    if(playerHealth>0 && remaining>0){
      arena.innerHTML="You dealt "+damage2.toFixed(2)+" damage "+dodged2+" to the monster. Monster has "+remaining.toFixed(2)+" health points remaining.";
      playerHealth=playerHealth-damage1;
      health.style.background='linear-gradient(to right, red, white '+playerHealth+'%)';
      arena2.innerHTML="Monster attacked you and dealt "+damage1.toFixed(2)+" damage"+dodged1+" you have "+playerHealth.toFixed(2)+" health points remaining. Do you dare to attack again?";
  }

  //DEFEAT
  if(playerHealth<=0 && arena.innerHTML!="You slayed the monster"){
    gameO.style.visibility="visible";
    cross.style.visibility="visible";

    // removeArena.parentNode.removeChild(removeArena);//THIS
    arena2.innerHTML="Monster killed you! The great monster slayer has died. Who is going to save us now?!";
    holder.style.visibility="hidden";//THIS

    live=false;
    attack.style.display="none";
    clearCanvas();
    document.getElementById('fightArena2').style.visibility="hidden";
    document.getElementById('ArenaEnemy').style.visibility="hidden";
    holdArenaPlayer.style.visibility="hidden";

  }//above if statement ends
}//first if statement ends
}//function ends
