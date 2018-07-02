var config = {
    type: Phaser.AUTO,
    width: 1125,
    height: 650,
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

let player;
let crystal;
let platforms;
let cursors;
let book;
let computer;
let aButton = false;
let score = 0;
let gameOver = false;
let scoreText;
const bookBag = [];


var game = new Phaser.Game(config);

function preload ()
{
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    this.load.spritesheet('crystal', 'assets/!$floatingrocks_3.png', {frameWidth: 45, frameHeight: 150})
    this.load.spritesheet('book','assets/book_sprite.png',{frameWidth: 215, frameHeight: 220})
   
    this.load.atlas('mysprite', 'assets/blacknwhite_p=1.png', 'assets/sprites.json');
}

function create ()
{
//     //  A simple background for our game
//     this.add.image(400, 300, 'sky');

//     //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = this.physics.add.staticGroup();
    book = this.physics.add.staticGroup();
  
    computer = this.physics.add.staticGroup();
    
//     //  Here we create the ground.
//     //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
   
    //  Now let's create some ledges
    platforms.create(215, 70, 'ground').setScale(.90).setTint(0xff0000).refreshBody();
    platforms.create(50, 150, 'ground').setScale(.5,1).refreshBody();
    platforms.create(215, 235, 'ground').setScale(.9).refreshBody();
    platforms.create(135, 330, 'ground').setScale(.68,1).refreshBody();
    platforms.create(215, 415, 'ground').setScale(.9).refreshBody();
    platforms.create(50, 495, 'ground').setScale(.5,1).refreshBody();
    platforms.create(215, 580, 'ground').setScale(.90).refreshBody();

    //work station
    platforms.create(650, 325, 'ground').setScale(.1,17).refreshBody();
    platforms.create(775, 70, 'ground').setScale(.6,1).refreshBody();
    platforms.create(675, 581, 'ground').setScale(.2,1).refreshBody();

    platforms.create(1000, 325, 'ground').setScale(.1,17).refreshBody();

    platforms.create(980, 70, 'ground').setScale(.2,1).refreshBody();
    platforms.create(900, 581, 'ground').setScale(.6,1).refreshBody();

    book.create(450,500,'book').setScale(.15).refreshBody();

    

    
    crystal = this.physics.add.staticGroup();
    crystal.create(500, 400, 'crystal').setScale(.4).refreshBody();
    crystal.create(30, 300, 'crystal').setScale(.5).refreshBody();
   

    computer.create(992,320,'mysprite',"sprite76").setScale(3).refreshBody();

//     // The player and its settings
    player = this.physics.add.sprite(100, 450, 'dude');
    // player.setInteractive(this.input.makePixelPerfect())
//     //  Player physics properties. Give the little guy a slight bounce.
    // player.setBounce(0.2);
    player.setCollideWorldBounds(true);

//     //  Our player animations, turning, walking left and walking right.
    this.anims.create({
        key: 'left',
        frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
        frameRate: 10,
        repeat: -1
    });

    this.anims.create({
        key: 'turn',
        frames: [ { key: 'dude', frame: 4 } ],
        frameRate: 20
    });

    this.anims.create({
        key: 'right',
        frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
        frameRate: 10,
        repeat: -1
    });

//     //  Input Events
    cursors = this.input.keyboard.createCursorKeys();
    aButton = this.input.keyboard.on('keydown_A', ()=>{
        aButton = true;
    })

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
    this.physics.add.collider(player, computer, nextToComputer);
//     this.physics.add.collider(bombs, platforms);

//     //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.add.overlap(player, crystal, collectCrystal, null, this);

    
    
//     this.physics.add.collider(player, bombs, hitBomb, null, this);
}

function update ()
{
    // if (gameOver)
    // {
    //     return;
    // }
    aButton = false;

    if (cursors.left.isDown)
    {
        player.setVelocityX(-160);

        player.anims.play('left', true);
    }
    else if (cursors.right.isDown)
    {
        player.setVelocityX(160);

        player.anims.play('right', true);
    } else if (cursors.up.isDown) {
        player.setVelocityY(-160);

    } else if (cursors.down.isDown){
        player.setVelocityY(160);
    }
    else
    {
        player.setVelocityY(0);
        player.setVelocityX(0);
        player.anims.play('turn');
    }

    if (cursors.up.isDown && player.body.touching.down)
    {
        player.setVelocityY(-330);
    }
    
    
}

function collectCrystal (player, crystal)
{
    console.log(crystal)
    if (aButton){
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

function nextToComputer (player, computer)
{
    // this.physics.pause();
    console.log('test')

    // player.setTint(0xff0000);

    // player.anims.play('turn');

    // gameOver = true;
}