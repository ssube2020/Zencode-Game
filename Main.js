//create fake database for image urls using array
var imageUrls = new Array()
imageUrls[0] = './Images/BaeSuzy-Korean.jpg'
imageUrls[1] = './Images/Chulalongkorn-Thai.jpg'
imageUrls[2] = './Images/Confucius-Chinese.jpg'
imageUrls[3] = './Images/HayaoMiyazaki-Japanese.jpg'
imageUrls[4] = './Images/JayChou-Chinese.jpg'
imageUrls[5] = './Images/JeckieChan-Japanese.jpg'
imageUrls[6] = './Images/KenWatanabe-Japanese.jpg'
imageUrls[7] = './Images/KimSooHyun-Korean.jpg'
imageUrls[8] = './Images/MaoZedong-Chinese.jpg'
imageUrls[9] = './Images/MarieKondo-Japanese.jpg'
imageUrls[10] = './Images/NaomiOsaka-Japanese.jpg'
imageUrls[11] = './Images/ShinjiKagawa-Japanese.jpg'
imageUrls[12] = './Images/SongJoongKi-Korean.jpg'
imageUrls[13] = './Images/SonHeungMin-Korean.jpg'
imageUrls[14] = './Images/ThaksinShinawatra-Thai.jpg'
imageUrls[15] = './Images/TonyJaa-Thai.jpg'
imageUrls[16] = './Images/UrassaySperbund-Thai.jpg'
imageUrls[17] = './Images/XiJinping-Chinese.jpg'
imageUrls[18] = './Images/YooJaeSuk-Korean.jpg'
imageUrls[19] = './Images/ZhouDongyu-Chinese.jpg'

//persons already passed by random
var passedImages = new Array();

//create corresponding persons array
var persons = [];

function fillPersonsArray() {
    imageUrls.forEach(element => {
        let indexOfMinus = element.indexOf('-');
        let secondtHalf = element.substring(indexOfMinus + 1);

        let indexOfDot = secondtHalf.indexOf('.');
        let personNationality = secondtHalf.substring(0, indexOfDot);
        persons.push({
            nationality: personNationality,
            imageUrl: element
        });
    });
}
fillPersonsArray();

var startingX = 0;
var startingY = 0;
var pos = 0;
var isPaused = false;
var maxAttempt = 10;
var maxHeight = 514;
var currentNationality = "";
var totalscore = 0;

function getRandomImage() {
    let imagesLength = imageUrls.length;
    let preBuffer = new Array()
    for (i = 0; i < imagesLength; i++) {
        preBuffer[i] = new Image()
        preBuffer[i].src = imageUrls[i]
    }
    console.log('randomit amogebamde: ');
    console.log(imageUrls);
    let randomIndex = Math.round(Math.random() * (imagesLength - 1));
    document.write(`<img id="${imageUrls[randomIndex]}" class="myimage" src="${imageUrls[randomIndex]}" draggable="true" ondragstart="dragStart(event)" ondragend="dragEndEvent(event)">`);
    passedImages.push(imageUrls[randomIndex]);
    console.log('amogebis mere');
    console.log(passedImages);
}
getRandomImage();

function playGame() {
    myMove();
}

function myMove() {

    let moveAnimation = null;
    const elem = document.getElementsByClassName("myimage")[0];

    clearInterval(moveAnimation);
    moveAnimation = setInterval(frame, 2);
    function frame() {
        if (pos == maxHeight) {
            let currentImage = document.getElementsByClassName('myimage')[0];
            let isLooping = true;
            while (isLooping) {
                let randomIndex = Math.round(Math.random() * (imageUrls.length - 1));
                passedImages.forEach(passedImageUrl => {
                    if (imageUrls[randomIndex].localeCompare(passedImageUrl)) {
                        console.log('arari toli');
                        currentImage.src = imageUrls[randomIndex];
                        currentImage.id = imageUrls[randomIndex];
                        isLooping = false;
                        //isPaused = false;
                    } else { console.log('toliiiiiiiiiiiiiiiiiiiiaa') }
                })
            }

            pos = 0;
            maxAttempt--;
            if (maxAttempt == 0) {
                clearInterval(moveAnimation);
                elem.style.display = "none";
                let again = document.getElementById("playAgain");
                again.style.display = "";
            }
        } else {
            if (!isPaused) {
                pos++;
                elem.style.top = pos + "px";
            }
        }
    }
}

function dragStart(event) {
    pos = maxHeight;
    isPaused = true;
}

function dragEndEvent(event) {
    var distanceOnX = event.clientX - startingX;
    var distanceOnY = event.clientY - startingY;
    var distanceCovered = Math.sqrt(distanceOnX * distanceOnX + distanceOnY * distanceOnY);

    if (distanceOnX > 0 && distanceOnY < 0 && distanceCovered >= 20) {
        currentNationality = "Chinese";
    }
    if (distanceOnX > 0 && distanceOnY > 0 && distanceCovered >= 20) {
        currentNationality = "Thai";
    }
    if (distanceOnX < 0 && distanceOnY > 0 && distanceCovered >= 20) {
        currentNationality = "Korean";
    }
    if (distanceOnX < 0 && distanceOnY < 0 && distanceCovered >= 20) {
        currentNationality = "Japanese";
    }

    imageUrls.forEach(element => {
        if (element == elem.attributes.id.value) {
            persons.forEach(el => {
                if (el.imageUrl == element) {
                    if (el.nationality == currentNationality) {
                        totalscore += 20;
                        document.getElementById("totalScore").textContent = 'Total Score: ' + totalscore;
                        console.log('win, +20 points');
                    } else {
                        totalscore -= 5;
                        document.getElementById("totalScore").textContent = 'Total Score: ' + totalscore;
                    }
                }
            });
        }
    });
    isPaused = false;
}

//დისტანცია დაფარული px-ებში.
function returnDistance(evt) {
    const startX = evt.clientX;
    startingX = startX;
    const startY = evt.clientY;
    startingY = startY;
}

var elem = document.getElementsByClassName("myimage")[0];
elem.addEventListener('dragstart', returnDistance);
elem.addEventListener('dragend', removeDragListener);


