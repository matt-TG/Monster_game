var round=0;

var startbtn=document.getElementById("startG");

var gameA=document.getElementById("gameA");

var fight=document.getElementById("fightYN");

var health=document.getElementById("healthB");
var hText=document.querySelector('P');

var images="";
var holder;
var holder2;
var output=document.getElementById("output");
var output2=document.getElementById("output2");
var playerHealth=100;
var remaining1=100;

startbtn.addEventListener("click",buildB);

var player={name: "Monster hunter",health:100,power:20,shield:5};

var monsters=[{name: "Goblin",health:15,power:7,shield:0}, {name: "Org",health:30,power:15,shield:1}, {name: "Bigfoot",health:20,power:10,shield:1}];


function monstersAppear(event) {
  if(event.target.dataset.play=="true"){

  console.log(event.target);
  event.target.children[0].style.visibility="visible";
  if(round>=1){
  holder.src=null;
  fightYN.value="";
  if(holder.style.visibility=="visible"){
    holder.style.visibility="hidden";
  }
}

  var randomN1=Math.floor(Math.random()*monsters.length);
  // var randomN2=Math.floor(Math.random()*images.length);
  var drawMonster=monsters[randomN1];
  holder2=drawMonster;
  var moveP=images[event.target.id];

  holder=moveP;

  moveP.src="p1.gif";
  output.innerHTML=drawMonster.name+" appeared";
  output2.innerHTML="Fight "+drawMonster.name+"? (Y/N)";
  fightYN.style.visibility="visible";
  fightYN.addEventListener("change",function(){
    if(fightYN.value=="Y"){
      window.open("fight.html", height=200,width=200);
    }
  })

  if(round==0){
    round++;
  }
  event.target.dataset.play="false"
  event.target.style.backgroundColor="red"
}
}

function buildB() {
  startbtn.style.visibility="hidden";
  for (var i = 0; i < 8; i++) {
    var div=document.createElement("DIV");
    div.classList.add("smallA");
    div.id=i;
    div.dataset.play="true";
    div.addEventListener("click",monstersAppear);
    // div.addEventListener("pointerleave",hideP);

    gameA.appendChild(div);
    var img=document.createElement("img");
    div.appendChild(img);
  }
  images=document.querySelectorAll("img");
  health.style.visibility="visible";
  hText.style.visibility="visible";
}
