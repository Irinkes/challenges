function segmentify(dictionary, inputString) {
    var words = [];

    dictionary = dictionary.sort(function(a, b){
        return b.length - a.length;
    })
    console.log(dictionary);
    var re;
    for(var i=0; i<dictionary.length; i++) {
        if(inputString.includes(dictionary[i])) {
            if(words[inputString.indexOf(dictionary[i])]===undefined) {
                words[inputString.indexOf(dictionary[i])] = dictionary[i];
                re = new RegExp(dictionary[i], 'g');
                inputString = inputString.replace(re,' ');
            }
            else if(words[inputString.indexOf(dictionary[i])]!==undefined && words[inputString.indexOf(dictionary[i])]!==dictionary[i]){
               return "AMBIGUOUS";
            }

        }
    }
    console.log(inputString);
    console.log(words);
    function removeEmpties(item){
        return item;
    }
    words = words.filter(removeEmpties);
    var trimmedString;

    /*Функция для проверки совпадения хотя бы одного элемента в массиве со строкой */
    function checkString(item){
        if(trimmedString.includes(item)) {
            return item;
        }
    }

    /*укорачиваем строчку на найденные в словаре слова, чтобы найти в ней слова, которых нет в словаре */
    function stringTrimming(str) {
        for(i=0;i<words.length;i++) {
            str = str.replace(words[i], '');
        }
        return str;
    }

    trimmedString = stringTrimming(inputString);
    console.log('trimmedString: '+ trimmedString);


    while(trimmedString.length>0) {
        if(words.some(checkString)) {
            stringTrimming(trimmedString);
            trimmedString = stringTrimming(trimmedString);
            // console.log('trimmedString inside function: '+trimmedString);
        }
        else {
            return "IMPOSSIBLE";
        }
    }

    if(inputString.length===0 || trimmedString.length===0) {
        for(i=0;i<words.length-1;i++) {
            words[i]=words[i]+' ';
        }

        return words.join('');
    }


}
const dictionary = ['the', 'chicken', 'crossed', 'road'];
const inputString = "thechickencrossedtheroad";

// const dictionary = ["weather", "the", "how", "is"];
// const inputString = "howistheweatherhow";
console.log(segmentify(dictionary, inputString));