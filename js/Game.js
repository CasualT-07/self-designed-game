class Game {
    constructor() {
        this.keySet = [['Digit1', key1Img, 220, 175 ], ['Digit2', key2Img, 310, 175], ['Digit3', key3Img, 400, 175], ['Digit4', key4Img, 490, 175], ['Digit5', key5Img, 580, 175], 
        ['Digit6', key6Img, 680, 175], ['Digit7', key7Img, 780, 175], ['Digit8', key8Img, 865, 175], ['Digit9', key9Img, 960, 175], ['Digit0', key0Img, 1050, 175], 

        ['KeyA', keyaImg, 260, 355], ['KeyB', keybImg, 680, 445], ['KeyC', keycImg, 495, 450    ], ['KeyD', keydImg, 445, 355], ['KeyE', keyeImg, 400, 265], ['KeyF', keyfImg, 540, 355], ['KeyG', keygImg, 635, 355], 
        ['KeyH', keyhImg, 725, 355], ['KeyI', keyiImg, 865, 265], ['KeyJ', keyjImg, 825, 355], ['KeyK', keykImg, 915, 355], ['KeyL', keylImg, 1010, 355], ['KeyM', keymImg, 870, 445], ['KeyN', keynImg, 775, 445], 
        ['KeyO', keyoImg, 960, 265], ['KeyP', keypImg, 1050, 265], ['KeyQ', keyqImg, 220, 265], ['KeyR', keyrImg, 490, 265], ['KeyS', keysImg, 350, 355], ['KeyT', keytImg, 580, 265], ['KeyU', keyuImg, 770, 265], 
        ['KeyV', keyvImg, 580, 445], ['KeyW', keywImg, 310, 265], ['KeyX', keyxImg, 400, 445], ['KeyY', keyyImg, 680, 265], ['KeyZ', keyzImg, 310, 445]]
    }

    detectKey() {
        document.addEventListener('keypress', (e) => {
            var value = e.code;
            // The Keys are only detected if the game is not paused
            if(!pauseStatus) {
                // First item is the key code detected, second item is to signal that a new key has been detected
                keyDetected = [value, true];
                
            }
        });
    }

    play() {


        //randKey is given in sketch.js > generateRandKey();
        // if a key has been detected...
        activeKey = levels[i];
        if(keyDetected[1] == true) {
            keySound.cloneNode(true).play()

            //verify inputted and generated keys
            if(keyDetected[0] == activeKey[0]) {
                
                console.log('correct');
                

                if(levels[i+1] === undefined) {
                    generateRandKey();
                    i = 0;
                    levelNumber += 1;
                    levelsCompleted +=1;
                } else {
                    i += 1;
                }
                

                //display a check mark
                var check = createSprite(1150, 50);
                check.addImage(checkmarkImg);
                check.scale = 0.2
                setTimeout(() => {check.remove()},500);

                keyDetected[1] = false;
                 

            } else {

                console.log('wrong.');

                //display a cross
                var cross = createSprite(1150, 50);
                cross.addImage(crossImg);
                cross.scale = 0.2;
                setTimeout(() => {cross.remove()},500);

                keyDetected[1] = false;
                levels = [];
                levelNumber = 1;
                lives -= 1;
                i = 0;

                if(lives <= 0) {
                    gameState = 2;
                }
                generateRandKey();
            }
        }
    }

    end() {
        console.log("Final score: " + levelsCompleted);
        explosion.visible = true;
        keyboard.visible = false;
        tensDigit.visible = false;
        unitsDigit.visible = false;

        explosionSound.play();

        clearInterval(timer);
        
    }

}  