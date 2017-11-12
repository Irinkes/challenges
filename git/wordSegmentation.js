function segmentify(dictionary, inputString) {
    var currentWord;

    for (var j = 0;j<dictionary.length;j++) {
        currentWord = dictionary[j];

        for (var k = 0;k<dictionary.length;k++) {
            if (j !== k) {
              if(currentWord.includes(dictionary[k]) && currentWord!==dictionary[k]){
                  currentWord = currentWord.replace(dictionary[k],' ');
              }
            }
        }
        currentWord = currentWord.trim();
        if(currentWord.length===0) {
            return "AMBIGUOUS";
        }
    }

    var words = [];

    dictionary = dictionary.sort(function(a, b){
        return b.length - a.length;
    })

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
                    pos = foundPos + 1; // продолжить поиск со следующей
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
        words = words.filter(removeEmpties);
        for(i=0;i<words.length-1;i++) {
            words[i]=words[i]+' ';
        }
        return words.join('');
    }

    function removeEmpties(item){
        return item;
    }

}
const dictionary = ['the', 'chicken', 'crossed', 'road'];
const inputString = "thechickencrossedtheroad";

// const dictionary = ["weather", "the", "how", "is"];
// const inputString = "howistheweatherhow";

// const dictionary = ['examples', 'over', 'haul', 'overhaul', 'the'];
// const inputString = "overhaultheexamples";
console.log(segmentify(dictionary, inputString));