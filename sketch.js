var gameState = 0;
var pauseStatus = false;
var keyDetected = [null,false];
var activeKey;
var levelNumber = 1;
var levels = [];
var levelsCompleted = 0;
var lives = 3;
var startPrompt;
var pausedText;
var canvas;
var i = 0;
var seconds = 80;
var tensDigit, unitsDigit;
var timer;
var explosionSound, keySound;

function preload() {
  key0Img = loadImage('assets/keysBlack/key0.jpg');
  key1Img = loadImage('assets/keysBlack/key1.jpg');
  key2Img = loadImage('assets/keysBlack/key2.jpg');
  key3Img = loadImage('assets/keysBlack/key3.jpg');
  key4Img = loadImage('assets/keysBlack/key4.jpg');
  key5Img = loadImage('assets/keysBlack/key5.jpg');
  key6Img = loadImage('assets/keysBlack/key6.jpg');
  key7Img = loadImage('assets/keysBlack/key7.jpg');
  key8Img = loadImage('assets/keysBlack/key8.jpg');
  key9Img = loadImage('assets/keysBlack/key9.jpg');

  keyaImg = loadImage('assets/keysBlack/keya.jpg');
  keybImg = loadImage('assets/keysBlack/keyb.jpg');
  keycImg = loadImage('assets/keysBlack/keyc.jpg');
  keydImg = loadImage('assets/keysBlack/keyd.jpg');
  keyeImg = loadImage('assets/keysBlack/keye.jpg');
  keyfImg = loadImage('assets/keysBlack/keyf.jpg');
  keygImg = loadImage('assets/keysBlack/keyg.jpg');
  keyhImg = loadImage('assets/keysBlack/keyh.jpg');
  keyiImg = loadImage('assets/keysBlack/keyi.jpg');
  keyjImg = loadImage('assets/keysBlack/keyj.jpg');
  keykImg = loadImage('assets/keysBlack/keyk.jpg');
  keylImg = loadImage('assets/keysBlack/keyl.jpg');
  keymImg = loadImage('assets/keysBlack/keym.jpg');
  keynImg = loadImage('assets/keysBlack/keyn.jpg');
  keyoImg = loadImage('assets/keysBlack/keyo.jpg');
  keypImg = loadImage('assets/keysBlack/keyp.jpg');
  keyqImg = loadImage('assets/keysBlack/keyq.jpg');
  keyrImg = loadImage('assets/keysBlack/keyr.jpg');
  keysImg = loadImage('assets/keysBlack/keys.jpg');
  keytImg = loadImage('assets/keysBlack/keyt.jpg');
  keyuImg = loadImage('assets/keysBlack/keyu.jpg');
  keyvImg = loadImage('assets/keysBlack/keyv.jpg');
  keywImg = loadImage('assets/keysBlack/keyw.jpg');
  keyxImg = loadImage('assets/keysBlack/keyx.jpg');
  keyyImg = loadImage('assets/keysBlack/keyy.jpg');
  keyzImg = loadImage('assets/keysBlack/keyz.jpg');

  timer0Img = loadImage('assets/timer/timer0.png')
  timer1Img = loadImage('assets/timer/timer1.png')
  timer2Img = loadImage('assets/timer/timer2.png')
  timer3Img = loadImage('assets/timer/timer3.png')
  timer4Img = loadImage('assets/timer/timer4.png')
  timer5Img = loadImage('assets/timer/timer5.png')
  timer6Img = loadImage('assets/timer/timer6.png')
  timer7Img = loadImage('assets/timer/timer7.png')
  timer8Img = loadImage('assets/timer/timer8.png')
  timer9Img = loadImage('assets/timer/timer9.png')

  cautionImg = loadImage('assets/caution.png');
  crossImg = loadImage('assets/cross.png');
  checkmarkImg = loadImage('assets/checkmark.png');

  titleImg = loadImage('assets/title.png');
  explosionImg = loadImage('assets/explosion.png');
  keyboardImg = loadImage('assets/keysBlack/keyboardBlackEmpty.jpg');
  clicktoplayImg = loadImage('assets/ClickToPlay.png');
  pausedImg = loadImage('assets/paused.png');
  infoImg = loadImage('assets/infoButton.png');
  infoboxImg = loadImage('assets/infobox.png');
}

function setup() {
  canvas = createCanvas(1280,720);
  
  game = new Game();
  game.detectKey();

  explosionSound = new Audio('assets/explosion.wav');
  explosionSound.volume = 0.5;

  keySound = new Audio('assets/keypress.wav');

  document.addEventListener('click', (e) => {
      if(gameState == 0) {
        if(dist(70,70,e.clientX,e.clientY) <= 30) {
          infoBox.visible = true;
          startPrompt.y = 670;
        } else {

        gameState = 1;
        generateRandKey();

        //timer
        timer = setInterval(() => {
          seconds -= 1

          var tens = Math.floor(seconds / 10);

          switch(tens) {
            case 0:
              tensDigit.addImage(timer0Img);
              break;
            case 1:
              tensDigit.addImage(timer1Img);
              break;
            case 2:
              tensDigit.addImage(timer2Img);
              break;
            case 3: 
              tensDigit.addImage(timer3Img);
              break;
            case 4:
              tensDigit.addImage(timer4Img);
              break;
            case 5: 
              tensDigit.addImage(timer5Img);
              break;
            case 6:
              tensDigit.addImage(timer6Img);
              break;
            case 7:
              tensDigit.addImage(timer7Img);
              break;
            case 8:
              tensDigit.addImage(timer8Img);
              break;
            case 9:
              tensDigit.addImage(timer9Img);
              break;
            default: 
            tensDigit.addImage(timer8Img);
            break;

          }

          var unit = seconds - (tens*10);
          //console.log('units: ' + unit)

          switch(unit) {
            case 0:
              unitsDigit.addImage(timer0Img);
              break;
            case 1:
              unitsDigit.addImage(timer1Img);
              break;
            case 2:
              unitsDigit.addImage(timer2Img);
              break;
            case 3:
              unitsDigit.addImage(timer3Img);
              break;
            case 4: 
              unitsDigit.addImage(timer4Img);
              break;
            case 5:
              unitsDigit.addImage(timer5Img);
              break;
            case 6:
              unitsDigit.addImage(timer6Img);
              break;
            case 7: 
              unitsDigit.addImage(timer7Img);
              break;
            case 8:
              unitsDigit.addImage(timer8Img);
              break;
            case 9:
              unitsDigit.addImage(timer9Img);
              break;
            default:
              unitsDigit.addImage(timer0Img);
              break;
          }

          //console.log(tens + unit);
        }, 1000);
        
        keyboard.visible = true;
        startPrompt.visible = false;
        infoButton.visible = false;
        infoBox.visible = false;
        tensDigit.visible = true;
        unitsDigit.visible = true;
        }
        
      } else {
        console.log(e);
      }
    })

  title = createSprite(width/2, 50);
  title.addImage(titleImg);

  infoButton = createSprite(70,70);
  infoButton.addImage(infoImg);
  infoButton.scale = 0.75;
  
  infoBox = createSprite(width/2, height/2);
  infoBox.addImage(infoboxImg);
  infoBox.visible = false;

  keyboard = createSprite(width/2, height/2);
  keyboard.addImage(keyboardImg);
  keyboard.visible = false;

  explosion = createSprite(width/2, height/2 + 50);
  explosion.addImage(explosionImg);
  explosion.scale = 0.3;
  explosion.visible = false;

  startPrompt = createSprite(width/2, height/2);
  startPrompt.addImage(clicktoplayImg);
  
  pausedText = createSprite(width/2,650);
  pausedText.addImage(pausedImg);
  pausedText.visible = false;

  //timer
  tensDigit = createSprite(610, 650)
  tensDigit.addImage(timer8Img);
  tensDigit.visible = false;

  unitsDigit = createSprite(670,650)
  unitsDigit.addImage(timer0Img);
  unitsDigit.visible = false;
}

    

function draw() {
  background('black'); 

  if(gameState == 1) {

  textSize(50)
  //lives
  if(lives > 2) {
    push()
    fill('green');
    text('Lives: ' + lives,800,670);
    pop();
  } else if(lives == 2){
    push()
    fill('yellow');
    text('Lives: ' + lives,800,670);
    pop();
  } else {
    push()
    fill('red');
    text('Lives: ' + lives,800,670);
    pop();
  }
  
  //levels
  fill('yellow');
  text('Stage: ' + levelNumber, 300,670)

  if(seconds == 0) {
    gameState = 2;
  }

  game.play();
  //Press escape to pause the game
  if(keyWentDown('esc')) {
    if(!pauseStatus) {
      //console.log('pauseMode');
      pausedText.visible = true;
      pauseStatus = true;
    } else {
      //console.log('!pauseMode');
      pauseStatus = false;
      pausedText.visible = false;
    }
  } 

  }

  if(gameState == 2) {
    game.end();
    gameState = 3;
  }

  drawSprites();
}

function generateRandKey() {
  var randKey = random(game.keySet); 
  levels.push(randKey);
  console.log('Random key: '+randKey[0]);

  //display random key sprite
  var randKeySprite = createSprite(randKey[2],randKey[3]);
  randKeySprite.addImage(randKey[1]);
  setTimeout(() => {randKeySprite.remove()}, 500);
   
}