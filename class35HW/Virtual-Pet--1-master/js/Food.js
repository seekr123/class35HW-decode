class Food{
    constructor(){
       var foodStock;
       var lastFed;
    }

    dogImg = loadImage('images/dogImg.png');
    milkImg=loadImage('images/milkImg.png')


    getFoodStock(){
        database.ref('playerCount').on('value',function(data){
            playerCount=data.val();
        });
     }
     updateFoodStock(count){
        database.ref('/').update({
            FoodStock:count
        })
     }
     update(name){
         var Food='player'+playerCount;
         database.ref(playerIndex).set({
             name:name
         })
     }

     draw(){
        if(foodCount === 0) {
            foodCount = 0;
            milk.visible = false;
            dog.addImage(dogImg);
          } else {
            food1.updateFoodStock(foodCount - 1);
            milk.visible = true;
            dog.addImage(happyDogImg);
          }
     }
}