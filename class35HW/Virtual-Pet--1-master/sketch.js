var dog,dogIMG,happydogIMG,milk,milkImg;
var database,foodS,foodStock;
var btnFeed,btnAddFeed,addFeed;
var fedTime,lastFed;

function preload()
{
  dogIMG=loadImage('images/dogImg.png');
  happydogIMG=loadImage('images/dogImg1.png');
}

function setup() {
	createCanvas(500, 500);
  dog=createSprite(250, 250, 10,10);
  dog.addImage(dogIMG);
  dog.scale=0.2;
  
  
  database=firebase.database();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  btnFeed=createButton('Feed the Dog');
  btnFeed.mousePressed(feedDog);
  btnFeed.position(600,100);

  btnAddFeed=createButton('Add feed');
  btnAddFeed.mousePressed(addFood);
  btnAddFeed.position(800,100);



}


function draw() {  

  background(46, 139, 87);
  
  foodS.display();
  database.ref('FeedTime').on('value',data=>{
    lastFed=data.val();
  })

 

  if (lastFed>=12){
    text('last Feed: '+lastFed % 12 +' PM',350,30);
  }
  else if(lastFed==0){
    text('last Feed: 12 AM ', 350,30);
  }
  else{
    text('last Feed: '+ lastFed+'AM',350,30);
  }
  //add styles here
  drawSprites();
  
  fill (138,46,98);
  stroke (4);
  text ('food left : '+foodS,100,200)
  textSize (14);
  text('Tip: press the up arrow to feed Rex',20,30)



}

function readStock(data){
  foodS=data.val();
  foodS.updateFoodStock(foodS);
  }

function writeStock(x){

  if(x<=0){
    x=0;
  }
  else{
    x=x-1
  }

  database.ref('/').set({
    Food:x
  })
  
}
function feedDog(){

  if(foodS.getFoodStock()<30){

    database.ref('/').update({
      'Food':foodS.getFoodStock()+1
    })

  }

  
}
function feedDog(){
  var foodDed=foodS.deductFood(foodS.deductFoodStock());
  foodS-1;
  dog.addImage(happydogIMG)
  database.ref('/').update({
    Food:foodDed,
    fedTime: hour()
  })
}