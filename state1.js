var st1 = {
    preload: p1,
    create: c1,
    contGame: cont,
    update: u1
}

function p1() {
    
}

function c1() {
    var story = game.add.text(30, 170, 'After collecting the stars, our protagonist changes...',
                              { fontSize: '30px', fill: '#ffffff', boundsAlignH: 'center', boundsAlignV: 'middle' })
    
    var contLabel = game.add.text(80, 240, 'Use the mouse and click to move',
                              { fontSize: '40px', fill: '#ffffff' })
    
    var contLabel = game.add.text(80, 320, 'Press Enter to continue!',
                              { fontSize: '40px', fill: '#ffffff' })
    
    var enterKey = game.input.keyboard.addKey(Phaser.Keyboard.ENTER)
    
    enterKey.onDown.addOnce(cont);
}
    
function cont() {
    game.state.start('state2');
}


function u1() {
    
}