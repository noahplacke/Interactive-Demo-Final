var st2 = {
    preload: p2,
    create: c2,
    update: u2
}

function p2() {
    game.load.image('trees', 'assets/treesBG.png');
    game.load.image('ground', 'assets/platform.png');
    game.load.image('star', 'assets/star.png');
    game.load.spritesheet('dude', 'assets/dude.png', 32, 48);
    game.load.spritesheet('baddie', 'assets/baddie.png', 32, 32);


}

var player;
var platforms;
var cursors;

var stars;
var starCount2 = 10;
var score = 0;
var scoreText;

function c2() {
    //  We're going to be using physics, so enable the Arcade Physics system
    game.physics.startSystem(Phaser.Physics.ARCADE);

    //  A simple background for our game
    game.add.sprite(0, 0, 'trees');

    //  The platforms group contains the ground and the 2 ledges we can jump on
    platforms = game.add.group();

    //  We will enable physics for any object that is created in this group
    platforms.enableBody = true;

    // Here we create the ground.
    var ground = platforms.create(0, game.world.height - 48, 'ground');

    //  Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    //  This stops it from falling away when you jump on it
    ground.body.immovable = true;

    //  Now let's create two ledges
    var ledge = platforms.create(250, 450, 'ground');
    ledge.body.immovable = true;

    ledge = platforms.create(200, 300, 'ground');
    ledge.body.immovable = true;
    
    ledge = platforms.create(300, 200, 'ground');
    ledge.body.immovable = true;

    // The player and its settings
    player = game.add.sprite(34, game.world.height - 150, 'baddie');

    //  We need to enable physics on the player
    game.physics.arcade.enable(player);

    //  Player physics properties. Give the little guy a slight bounce.
    player.body.bounce.y = 0;
    player.body.gravity.y = 300;
    player.body.collideWorldBounds = true;

    //  Our two animations, walking left and right.
    player.animations.add('left', [0, 1], 10, true);
    player.animations.add('right', [2, 3], 10, true);

    //  Finally some stars to collect
    stars = game.add.group();

    //  We will enable physics for any star that is created in this group
    stars.enableBody = true;

    //  Here we'll create 10 of them evenly spaced apart
    for (var i = 0; i < 10; i++)
    {
        //  Create a star inside of the 'stars' group
        var star = stars.create(i * 70, 0, 'star');
        starCount2++;

        //  Let gravity do its thing
        star.body.gravity.y = 300;

        //  This just gives each star a slightly random bounce value
        star.body.bounce.y = 0.7 + Math.random() * 0.2;
    }

    //  The score
    scoreText = game.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });

    //  Our controls.
    cursors = game.input.keyboard.createCursorKeys();


}

function u2() {
    var hitPlatform = game.physics.arcade.collide(player, platforms);
    game.physics.arcade.collide(stars, platforms);

    //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    game.physics.arcade.overlap(player, stars, collectStar, null, this);
    
    if (score == starCount2 * 100)
    {
        game.state.start('state3')
    }
    
    player.body.velocity.x = 0;
    
    player.rotation = game.physics.arcade.angleToPointer(player);
    if (game.input.mousePointer.isDown) {
        game.physics.arcade.moveToPointer(player, 400);
        player.animations.play('right', 10, true);
        
        if (Phaser.Rectangle.contains(player.body, game.input.x, game.input.y))
            {
                player.animations.stop();
                player.body.velocity.setTo(0, 0);
            }   
    }
    else
        {
        player.body.velocity.setTo(0,0);
        player.animations.stop();
        player.frame = 3;
        }
}
function collectStar (player, star) {
    
    var killCount = 0;
    // Removes the star from the screen
    star.kill();

    //  Add and update the score
    score += 100;
    scoreText.text = 'Score: ' + score;
    if (score == starCount2 * 100)
    {
        game.state.start('state3')
    }
}
