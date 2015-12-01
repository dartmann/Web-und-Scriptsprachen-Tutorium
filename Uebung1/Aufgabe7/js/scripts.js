/**
 * Created by david on 01.12.15.
 */
var dice = {
    numbers: [1,2,3,4,5,6],
    count: 0,
    thrownNumber: [],
    clear: function() {
        this.count = 0;
        this.thrownNumber.length = 0;
    }
};

throwTheDice = function() {
    if(dice.count < 3) {
        dice.count++;
        var thrownNumber = dice.numbers[Math.floor(Math.random()*6)];
        document.getElementById('result').innerHTML = thrownNumber;
        dice.thrownNumber.push(thrownNumber);
        document.getElementById('thrownNumbers').innerHTML += thrownNumber+' ';
    } else {
        window.alert('Sie haben das Spiel verloren');
        dice.clear();
    }

};