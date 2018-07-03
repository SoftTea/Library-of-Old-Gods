var config = {
    type: Phaser.AUTO,
    width: 1125,
    height: 700,
    physics: {
        default: 'arcade',
        arcade: {
            gravity: {},
            debug: true
        }
    },
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

class Book {
    constructor(type, x, y, color) {
        this.type = type;
        this.x = x;
        this.y = y;
        this.color = color;

    }
}
let player;
let playerContainer;
let crystal;
let platforms;
let cursors;
let book;
let computer;
let aButton;
let sButton;
let score;
let gameOver = false;
let scoreText;
const bookBag = [];
let bookBagFull;
let bookCheck;
const exorcise = {

};
const bookReturn = {

};
const photoCopy = {


};
const monsterClear = {

};
const colorCodes = {
    yellow: 0xF3F727,
    green: 0x3BC62B,
    blue: 0x2B3FC6,
    purple: 0xB936ED
}



var game = new Phaser.Game(config);

function preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', {
        frameWidth: 32,
        frameHeight: 48
    });
    this.load.spritesheet('crystal', 'assets/!$floatingrocks_3.png', {
        frameWidth: 45,
        frameHeight: 150
    })
    this.load.spritesheet('book', 'assets/book_sprite.png', {
        frameWidth: 215,
        frameHeight: 220
    })

    this.load.atlas('mysprite', 'assets/blacknwhite_p=1.png', 'assets/sprites.json');
    this.load.atlas('consumable', 'assets/tiny_consumables.png', 'assets/sprites2.json');
}

function create() {
    //     //  A simple background for our game
    //     this.add.image(400, 300, 'sky');

    //     //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    book = this.physics.add.staticGroup();
    
    console.log(book)
    bookCheck = this.physics.add.staticGroup();

    computer = this.physics.add.staticGroup();

    //     //  Here we create the ground.
    //     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)

    platforms.create(0,680, 'ground').setScale(6,1.5).setTint(colorCodes.blue).refreshBody();
    //  Shelfs / Walls
    platforms.create(215, 70, 'ground').setScale(.90).setTint(0xff0000).refreshBody();
    this.add.text(200, 65, "History")
    platforms.create(50, 150, 'ground').setScale(.5, 1).refreshBody();
    this.add.text(50, 145, "Local Lore")
    platforms.create(215, 235, 'ground').setScale(.9).refreshBody();
    platforms.create(135, 330, 'ground').setScale(.68, 1).refreshBody();
    this.add.text(135, 325, "Occult")

    platforms.create(215, 415, 'ground').setScale(.9).refreshBody();
    platforms.create(50, 495, 'ground').setScale(.5, 1).refreshBody();
    this.add.text(50, 490, "Local Lore")
    const science = platforms.create(215, 580, 'ground').setScale(.90).refreshBody();
    this.add.text(200, 575, "Science");
    console.log(science);




    //work station
    platforms.create(650, 325, 'ground').setScale(.1, 17).refreshBody();
    platforms.create(775, 70, 'ground').setScale(.6, 1).refreshBody();
    platforms.create(675, 581, 'ground').setScale(.2, 1).refreshBody();

    platforms.create(1000, 325, 'ground').setScale(.1, 17).refreshBody();

    platforms.create(980, 70, 'ground').setScale(.2, 1).refreshBody();
    platforms.create(900, 581, 'ground').setScale(.6, 1).refreshBody();

    // Book Check images 

    bookCheck.create(650, 200, 'consumable', 'sprite19').setScale(3).refreshBody();

    this.add.text(600, 160, "Book Check");

    bookCheck.create(650, 500, 'consumable', 'sprite19').setScale(3).refreshBody();

    this.add.text(600, 450, "Book Check");

    // Photocopy

    this.add.text(895, 100, "Photocopy")
    photoCopy.image = this.physics.add.sprite(992, 150, 'consumable', 'sprite29').setScale(2.5);


    book.create(450, 500, 'book').setScale(.15).refreshBody();

    // Exorcize station 
    this.add.text(830, 500, 'Exorcise').setAngle(45);
    exorcise.image = this.physics.add.sprite(850, 581, 'consumable', 'sprite27').setScale(2.5);

    // MonsterClear

    this.add.text(720, 400, "monster clear")
    monsterClear.image = this.physics.add.sprite(775, 430, 'bomb').setScale(1.5).setImmovable();






    // crystal = this.physics.add.staticGroup();
    // crystal.create(500, 400, 'crystal').setScale(.4).refreshBody();
    // crystal.create(30, 300, 'crystal').setScale(.5).refreshBody();

    // crystal.children.entries[0].name = "test"


    // Computer - Chec In
    this.add.text(895, 295, "Check In")
    computer.create(992, 320, 'mysprite', "sprite76").setScale(3).refreshBody();

    computer.children.entries[0].name = 'computer'

    //     // The player and its settings
    
    player = this.physics.add.sprite(300, 450, 'dude');
    // text to display when the player has 4 books
    bookBagFull = this.add.text(250,400,'Your hands are full!');
    bookBagFull.visible = false;

    
    
    
    // bookBagFull = this.add.text(0,0,'Your hands are full');
    
    
    // player.setInteractive(this.input.makePixelPerfect())
    //     //  Player physics properties. Give the little guy a slight bounce.
    // player.setBounce(0.2);
    player.setCollideWorldBounds(true);

    //     //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 0,
            end: 3
        }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [{
            key: 'dude',
            frame: 4
        }],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', {
            start: 5,
            end: 8
        }),
        frameRate: 10,
        repeat: -1
    });

    //     //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    aButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
    // sButton = this.input.keyboard.on('keydown_S', ()=>{

    // })
    sButton = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);

    //     //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
    //     stars = this.physics.add.group({
    //         key: 'star',
    //         repeat: 11,
    //         setXY: { x: 12, y: 0, stepX: 70 }
    //     });

    //     stars.children.iterate(function (child) {

    //         //  Give each star a slightly different bounce
    //         child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));

    //     });

    //     bombs = this.physics.add.group();

    //     //  The score
    //     scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //     //  Collide the player and the stars with the platforms
    this.physics.add.collider(player, platforms);
    this.physics.add.collider(player, crystal, collectCrystal);
    this.physics.add.collider(player, monsterClear.image);
    this.physics.add.collider(player, book);
    // this.physics.add.collider(player, computer, nextToComputer);
    //     this.physics.add.collider(bombs, platforms);


    // Timed Events ****

    timedEvent = this.time.addEvent({
        delay: 1000,
        callback: randomHistory,
        callbackScope: this,
        loop: true
    });
    this.time.addEvent({
        delay: 1000,
        callback: randomLocalLore,
        callbackScope: this,
        loop: true
    });
    this.time.addEvent({
        delay: 1000,
        callback: randomOccult,
        callbackScope: this,
        loop: true
    });
    this.time.addEvent({
        delay: 1000,
        callback: randomScience,
        callbackScope: this,
        loop: true
    });
    //     //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    // this.physics.add.overlap(player, crystal, collectCrystal, null, this);



    //     this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update() {
    // if (gameOver)
    // {
    //     return;
    // }
    bookBagFull.x = player.x- player.width;
    bookBagFull.y = player.y -player.height;

    score = this.add.group({ key: 'book', frame: 0, repeat: bookBag.length, setXY: { x: -20, y: 680, stepX: 40 },setScale: {x:.2, y:.2} });


    
    if(bookBag.length<4) {
    nextTo(player, book);
     
    } else{
        bookBagFull.visible = true;
    }

    
    // console.log(aButton)

    

    if (cursors.left.isDown && sButton.isDown) {
        player.setVelocityX(-320);
        // bookBagFull.x = player.x- player.width;
        player.anims.play('left', true);
    } else if (cursors.left.isDown) {
        player.setVelocityX(-160);
        // bookBagFull.x = player.x- player.width;

        player.anims.play('left', true);
    } else if (cursors.right.isDown && sButton.isDown) {
        player.setVelocityX(320);
        // bookBagFull.x = player.x- player.width;

        player.anims.play('right', true);
    } else if (cursors.right.isDown) {
        player.setVelocityX(160);
        // bookBagFull.x = player.x - player.width;

        player.anims.play('right', true);
    } else if (cursors.up.isDown && sButton.isDown) {
        player.setVelocityY(-320);
        // bookBagFull.y = player.y -player.height;

    } else if (cursors.up.isDown) {
        player.setVelocityY(-160);
        // bookBagFull.y = player.y- player.height;

    } else if (cursors.down.isDown && sButton.isDown) {
        player.setVelocityY(320);
        // bookBagFull.y = player.y - player.height;
    } else if (cursors.down.isDown) {
        player.setVelocityY(160);
        // bookBagFull.y = player.y - player.height;
    } else {
        player.setVelocityY(0);
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down) {
        player.setVelocityY(-330);
    }


}

function collectCrystal(player, crystal) {
    // console.log('player',player)
    // console.log('crystal', crystal)
    if (aButton) {
        crystal.disableBody(true, true);
        bookBag.push('blue crystal')
    }

    // //  Add and update the score
    // score += 10;
    // scoreText.setText('Score: ' + score);

    // if (stars.countActive(true) === 0)
    // {
    //     //  A new batch of stars to collect
    //     stars.children.iterate(function (child) {

    //         child.enableBody(true, child.x, 0, true, true);

    //     });

    //     var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    //     var bomb = bombs.create(x, 16, 'bomb');
    //     bomb.setBounce(1);
    //     bomb.setCollideWorldBounds(true);
    //     bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    //     bomb.allowGravity = false;

    // }
}

function nextTo(player, group) {
    // this.physics.pause();

    for (let i = 0; i < group.children.entries.length; i++) {
        const diffOfY = player.y - group.children.entries[i].y;
        const diffOfX = player.x - group.children.entries[i].x;
        const widthOfPlayer = player.width;
        const heightOfPlayer = player.height + 7;


        // console.log('diffOfX', diffOfX, "diffOfY", diffOfY, 'diffOfWidth', widthOfPlayer, "height", heightOfPlayer );
        
         if (diffOfX < widthOfPlayer && diffOfX > (-widthOfPlayer) && diffOfY > (-heightOfPlayer) && diffOfY < (heightOfPlayer) && aButton.isDown) {
             
            bookBag.push(group.children.entries[i].name);

        
            
            group.children.entries[i].destroy();
            return;
        }
    }


    // player.setTint(0xff0000);

    // player.anims.play('turn');

    // gameOver = true;
}

function randomHistory() {


    const historyBook = book.create(getRandomIntInclusive(45, 380), 70, 'book').setScale(.12).refreshBody().setTint(colorCodes.yellow);
    historyBook.name = 'history';
    // console.log(historyBook);

}

function randomOccult() {


    const occultBook = book.create(getRandomIntInclusive(0, 265), 330, 'book').setScale(.12).refreshBody().setTint(colorCodes.green);
    occultBook.name = 'occult'

}

function randomScience() {


    const scienceBook = book.create(getRandomIntInclusive(45, 380), 580, 'book').setScale(.12).refreshBody().setTint(colorCodes.purple);
    scienceBook.name = 'science'

}

function randomLocalLore() {

    const randomNumber = getRandomIntInclusive(0, 1);
    if (randomNumber === 0) {
        const localLore = book.create(getRandomIntInclusive(0, 150), 150, 'book').setScale(.12).refreshBody().setTint(colorCodes.blue);
        localLore.name = 'local'
    } else {
        const localLore = book.create(getRandomIntInclusive(0, 150), 495, 'book').setScale(.12).refreshBody().setTint(colorCodes.blue);
        localLore.name = 'local'
    }
}



function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //The maximum is inclusive and the minimum is inclusive 
}