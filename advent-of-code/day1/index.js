const fs = require('fs');

 fs.readFile('./data.js', (err, data) => {
    if (err ) throw err;
    else {
        const dataArr = data.toString().split('\n');
        let frequency = 0;
        const frequenciesReached = [];
        let searchFr = true;
        while (searchFr) {
            dataArr.map((val) => {
            const remainingNum = val[0] === '+' ? +val.slice(1) : +val.slice(1)*-1;
            frequency+= remainingNum;
            if (searchFr && frequenciesReached.includes(frequency)) {
                console.log("Found Reached Freq", frequency)
                searchFr = false;
            }    
            else {
                //console.log(frequenciesReached)
                searchFr && frequenciesReached.push(frequency)
            }    
        });
        }
        console.log("total frequency" , frequency);              
    }
});