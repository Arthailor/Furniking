const language = localStorage.getItem('language');
let reviewsDataPath;
if (language == "ru"){reviewsDataPath = '../json/reviewsDataRU.json';}
else if (language == "en"){reviewsDataPath = '../json/reviewsDataEN.json';}
function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}
let numbers = [];

async function getSliderData() {
    try {
        const response = await fetch(reviewsDataPath);
        if (!response.ok) {
            throw new Error('Error on loading JSON file');
        }
        const data = await response.json();
        let j = getRandomInt(5);
        let numbersCheck = true;
        let numberExists = false;
        for (let i = 1;i<4;i++){
            while(numbersCheck){
                numbers.forEach(element => {
                    if(element == j)
                        {
                            numberExists=true;
                        }
                });
                if (numberExists){
                    j = getRandomInt(5);
                    numberExists=false;
                }else{
                    numbersCheck = false;
                    numbers.push(j);
                    console.log(numbers);
                }
            }
            document.getElementById('customer-avatar'+i).setAttribute("src", data[j].imgPath);
            document.getElementById('customer-review'+i).innerHTML = data[j].review;
            document.getElementById('customer-name'+i).innerHTML = data[j].name;
            document.getElementById('customer-job'+i).innerHTML = data[j].job;
            numbersCheck = true;
        }
    } catch (error) {
        console.error('Error:', error);
    }
}
getSliderData();