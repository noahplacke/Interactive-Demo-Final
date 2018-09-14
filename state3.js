var st3 = {
    preload: p3,
    create: c3,
    update: u3
}

function p3() {
    game.stage.backgroundColor = '#fff787';
    
}

function c3() {
    var win = game.add.text(30, 170, 'YOU WON!!!!!',
                              { fontSize: '70px', fill: '#787fff', boundsAlignH: 'center', boundsAlignV: 'middle' })
}


function u3() {
    
}