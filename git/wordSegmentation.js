function segmentify(dictionary, inputString) {
    var currentWord;
    var complexWord;
    var ambiguous=false;

    dictionary = dictionary.sort(function(a, b){
        return b.length - a.length;
    })

    for (var j = 0;j<dictionary.length;j++) {
        currentWord = dictionary[j];

        for (var k = 0;k<dictionary.length;k++) {
            if (j !== k) {
              if(currentWord.includes(dictionary[k]) && currentWord!==dictionary[k]){
                  complexWord = dictionary[j];
                  var re = new RegExp(dictionary[k], 'g');
                  currentWord = currentWord.replace(re,' ');
              }
            }
        }
        currentWord = currentWord.trim();
        if(currentWord.length===0 && inputString.includes(complexWord)) {
            ambiguous=true;
        }
    }

    var words = [];



    var re;
    var spaces;
    for(var i=0; i<dictionary.length; i++) {
        if(inputString.includes(dictionary[i])) {
            if(inputString.split(dictionary[i]).length-1>1) {

                var pos = 0;

                while (true) {
                    var foundPos = inputString.indexOf(dictionary[i], pos);
                    if (foundPos == -1) break;

                    words[foundPos] = dictionary[i];
                    pos = foundPos + 1;
                }
                re = new RegExp(dictionary[i], 'g');
                spaces = ' '.repeat(dictionary[i].length);
                inputString = inputString.replace(re,spaces);

            }
            else {
                if(words[inputString.indexOf(dictionary[i])]===undefined) {
                    words[inputString.indexOf(dictionary[i])] = dictionary[i];
                    spaces = ' '.repeat(dictionary[i].length);
                    inputString = inputString.replace(dictionary[i],spaces);
                }
                else if(words[inputString.indexOf(dictionary[i])]!==undefined && words[inputString.indexOf(dictionary[i])]!==dictionary[i]){
                    return "AMBIGUOUS";
                }
            }
        }
    }

    inputString = inputString.trim();
    if(inputString.length>0) {
        return "IMPOSSIBLE";
    }
    else {
        if(ambiguous) {
            return "AMBIGUOUS";
        }
        else{
            words = words.filter(removeEmpties);
            for(i=0;i<words.length-1;i++) {
                words[i]=words[i]+' ';
            }
            return words.join('');
        }
    }

    function removeEmpties(item){
        return item;
    }

}
// const dictionary = ['the', 'chicken', 'crossed', 'road'];
// const inputString = "thechickencrossedtheroad";

const dictionary = ['qvr',
    'jjpno',
    'w',
    'd',
    'yjit',
    'g',
    'vtvqs',
    'adni',
    'slmoe',
    'm',
    'dwd'];
const inputString = "dwdyjitslmoedrhvcrhvcslmoewyjitrhvcslmoeadnirhvcrhvcjjpnodwdslmoe";

// const dictionary = ["weather", "the", "how", "is"];
// const inputString = "howistheweatherhow";

// const dictionary = ['examples', 'over', 'haul', 'overhaul', 'the'];
// const inputString = "overhaultheexamples";

// const dictionary = [ 'hr',
//     'a',
//     'abw',
//     'yc',
//     'x',
//     'arbie',
//     'gkan',
//     'witfe',
//     'lvvas',
//     'tc',
//     'arbieyc'];
// const inputString = "xarbieycgkanlvvaswitfehrxaarbielvvasgkanatcgkantctcwitfe";

console.log(segmentify(dictionary, inputString));