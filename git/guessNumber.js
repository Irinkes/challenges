function guessNumber(right,wrong){

    /*регулярки для парсинга утверждений */
    var re_even = /even/;
    var re_odd = /odd/;
    var re_divisible = /divisible by/;
    var re_more = /more/;
    var re_less = /less/;
    var re_start = /starting/;
    var re_end = /ending/;


    var allNums=[];
    var divisibleNumRight=[];
    var divisibleNumWrong=[];
    var startingWithRight, endingWithRight, moreNumRight,lessNumRight;
    var startingWithWrong =[];
    var endingWithWrong=[];

/*Сначала определим диапазон чисел */

    /*утверждения right*/
    if(right.length>0) {
        for(var i=0;i<right.length;i++) {
            if(right[i].match(re_more)) {
                moreNumRight=parseInt(right[i].split('more than ')[1]);
            }
            else if(right[i].match(re_less)) {
                lessNumRight=parseInt(right[i].split('less than ')[1]);
            }
            if (right[i].match(re_even)) {
                var even = true;
            }
            else if (right[i].match(re_odd)) {
                var odd = true;
            }
            if (right[i].match(re_divisible)) {
                divisibleNumRight[i] = parseInt(right[i].split('by ')[1]);
            }
            if (right[i].match(re_start)) {
                startingWithRight = parseInt(right[i].split('starting with ')[1]);
            }
            if (right[i].match(re_end)) {
                endingWithRight = parseInt(right[i].split('ending with ')[1]);
            }
        }
    }


    /*утверждения wrong*/
    if(wrong.length>0) {
        for(var i=0;i<wrong.length;i++) {

            if(wrong[i].match(re_more)) {
                var moreNumFalse=parseInt(wrong[i].split('more than ')[1]);
            }
            else if(wrong[i].match(re_less)) {
                var lessNumFalse=parseInt(wrong[i].split('less than ')[1]);
            }

            if (wrong[i].match(re_even)) {
                var odd = true;
                even = false;
            }
            else if (wrong[i].match(re_odd)) {
                var even = true;
                odd = false;
            }
            if (wrong[i].match(re_divisible)) {
                divisibleNumWrong[i] = parseInt(wrong[i].split('by ')[1]);
            }
            if (wrong[i].match(re_start)) {
                startingWithWrong[i] = parseInt(wrong[i].split('starting with ')[1]);
            }
            if (wrong[i].match(re_end)) {
                endingWithWrong[i] = parseInt(wrong[i].split('ending with ')[1]);
            }
        }
    }



    var startCount, endCount;
    if(moreNumRight!==undefined) {
        startCount=moreNumRight+1;
    }

    else if(lessNumFalse!==undefined) {
        startCount=lessNumFalse+1;
    }
    if(moreNumFalse!==undefined) {
        endCount = moreNumFalse;
    }

    else if(lessNumRight!==undefined) {
        endCount = lessNumRight;
    }

    /*Заполняем массив в диапазоне от  startCount до endCount*/

    for(var i=0;startCount<endCount;i++, startCount++) {
        allNums[i] = startCount;
    }

/*Обработаем полученные массивы  divisibleNumRight и divisibleNumWrong, startingWithWrong и endingWithWrong . Удалим из них пустоты*/
    function removeEmpties(item){
            return item===0 || item;
    }

    console.log(endingWithWrong);
    divisibleNumRight = divisibleNumRight.filter(removeEmpties);
    divisibleNumWrong = divisibleNumWrong.filter(removeEmpties);
    startingWithWrong = startingWithWrong.filter(removeEmpties);
    endingWithWrong = endingWithWrong.filter(removeEmpties);

    console.log(endingWithWrong);
/*Тут идут функции для фильтрации массива чисел */
/*Для фильтрации четных или нечетных чисел */
    function filterEven(item){
        if(item%2===0) {
            return item;
        }
    }
    function filterOdd(item){
        if(item%2!==0) {
            return item;
        }
    }

/*Функции для фильтрации чисел делимых на X и наоборот неделимых */
    function filterRightDivisible(i,item) {
        if(item%divisibleNumRight[i]===0) {
            return item;
        }
    }

    function filterWrongDivisible(i,item) {
        if(item%divisibleNumWrong[i]!==0) {
            return item;
        }
    }

/*Функции для фильтрации по признаку число начинается с, заканчивается на */

    function filterStartRight(item) {
        item=item.toString();
        if(item.startsWith(startingWithRight)) {
            return parseInt(item);
        }
    }
    function filterEndRight(item) {
        item=item.toString();
        if(item.endsWith(endingWithRight)) {
            return parseInt(item);
        }
    }

    function filterStartWrong(i,item) {
        item=item.toString();
        if(!(item.startsWith(startingWithWrong[i]))) {
            return parseInt(item);
        }
    }
    function filterEndWrong(i,item) {
        item=item.toString();
        if(!(item.endsWith(endingWithWrong[i]))) {
            return parseInt(item);
        }
    }

    /*Фильтрация массива чисел*/

    /*Отфильтровываем по признаку четный-нечетный */

    if(even) {
        allNums = allNums.filter(filterEven);
    }
    else if(odd) {
        allNums = allNums.filter(filterOdd);
    }
    /*По признаку делится без остатка на X */

    if(divisibleNumRight.length>0) {
        for(i=0;i<divisibleNumRight.length;i++) {
            allNums = allNums.filter(filterRightDivisible.bind(this, i));
        }
    }
    if(divisibleNumWrong.length>0) {
        for(i=0;i<divisibleNumWrong.length;i++) {
            allNums = allNums.filter(filterWrongDivisible.bind(this, i));
        }
    }
    /*По признаку число начинается с, заканчивается на */

    if(startingWithRight!==undefined) {
        allNums = allNums.filter(filterStartRight);
    }

    if(endingWithRight!==undefined) {
        allNums = allNums.filter(filterEndRight);
    }

    if(startingWithWrong.length>0) {
        for(i=0;i<startingWithWrong.length;i++) {
            allNums = allNums.filter(filterStartWrong.bind(this, i));
        }
    }

    if(endingWithWrong.length>0) {
        for(i=0;i<endingWithWrong.length;i++) {
            allNums = allNums.filter(filterEndWrong.bind(this, i));
        }
    }

    /*Возвращаем итог */
    if(allNums.length!==1 ) {
        return null;
    }
    else{
        return allNums[0];
    }
}
right=[
    "The number is more than 738",
    "The number is less than 807",
    "The number is divisible by 8"
]
wrong=[
    "The number is divisible by 7",
    "The number is divisible by 12",
    "The number is ending with 9",
    "The number is divisible by 16",
    "The number is ending with 0"
]

console.log(guessNumber(right,wrong));