// Select Elements 
let countSpan = document.querySelector(".quiz-info .count span");
let bullets = document.querySelector(".bullets");
let bulletsSpanContainer = document.querySelector(".bullets .spans");
let quizeArea = document.querySelector(".quiz-area");
let answersArea = document.querySelector(".answer-area");
let submitButton = document.querySelector(".submit-button");
let resultsContainer = document.querySelector(".results");
let countdownElement = document.querySelector(".countdown");
let wrongAnswers = [];
let questionsObject = [];
let mainDiv;
let odata = [];

let countQ;
// setting options
let currentIndex = 0;
let rightAnswer = 0;
let countdownT;


// function that calls information from json
function getQuestions() {
    // ajax call
    let myRequest = new XMLHttpRequest();

    myRequest.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 200) {
            odata = JSON.parse(this.responseText);
            questionsObject = odata.slice().sort(function () {
                return 0.5 - Math.random();
            });
            let questionsCount = odata.length;
            // console.log(questionsCount); 

            //  creat BUllets + set Questions count 
            creatBullets(questionsCount);
            // Add Question data 
            addQuestionData(questionsObject[currentIndex], questionsCount);

            // count DOwn 
            countdown(5, questionsCount);


            // click on Submit
            submitButton.onclick = () => {

                // get the right answer 
                let theRightAnswer = questionsObject[currentIndex].right_answer;
                //     increase the Index
                currentIndex++;


                // check the answer
                checkAnswer(theRightAnswer, questionsCount);

                // remove Previous Question
                quizeArea.innerHTML = "";
                answersArea.innerHTML = "";

                // Add Question data 
                addQuestionData(questionsObject[currentIndex], questionsCount);

                // handele bullets class full 
                handelBullets();

                // count DOwn 
                clearInterval(countdownT);
                countdown(5, questionsCount);

                // show results
                showResults(questionsCount);

            };





        }
    };

    myRequest.open("GET", "html_questions.json", true);
    myRequest.send();

}
getQuestions();
// function that creat bullets

function creatBullets(num) {
    countSpan.innerHTML = num;
    // Creat Spans 

    for (let i = 0; i < num; i++) {
        // Creat Bullet 
        let theBullet = document.createElement("span");

        if (i == 0) {
            theBullet.className = "on";
        }
        // Add Bullets To Main Bullet container
        bulletsSpanContainer.appendChild(theBullet);
    }

}
function addQuestionData(obj, count) {

    if (currentIndex < count) {

        // Creat H2 Question titl
        let questionTitle = document.createElement("h2");

        // Creat Question text
        let questionText = document.createTextNode(obj['title']);

        // add text to H2
        questionTitle.appendChild(questionText);

        // add the H2 to the quizeArea

        quizeArea.appendChild(questionTitle);


        // creat the answer 
        for (let i = 1; i <= 4; i++) {

            // creat Main answer div 
            mainDiv = document.createElement("div");

            // add class to the main div
            mainDiv.className = 'answer'

            //creat radio input
            let radioInput = document.createElement("input");

            // addtype + name + id + data attribute
            radioInput.name = 'question';
            radioInput.type = 'radio';
            radioInput.id = `answer_${i}`;
            radioInput.dataset.answer = obj[`answer_${i}`];

            // first option checked
            if (i == 1) {
                radioInput.checked = true;
            }

            // creat label
            let theLabel = document.createElement("label");

            // add for attribute
            theLabel.htmlFor = `answer_${i}`;

            // creat label text 

            let theLabelText = document.createTextNode(obj[`answer_${i}`]);

            // add the text to the label 
            theLabel.appendChild(theLabelText);

            // add input + label to the main div 
            mainDiv.appendChild(radioInput);
            mainDiv.appendChild(theLabel);

            // add all the div to the answer-area
            answersArea.appendChild(mainDiv);

        }
    }




}
function checkAnswer(rAnswer, count) {

    // select all the answers
    let answers = document.getElementsByName("question");
    let wquestion = document.querySelector(".quiz-area h2");
    let theChoosenAnswer;

    // console.log(answers.length);
    for (let i = 0; i < answers.length; i++) {
        // alert('jkhdskjf')
        if (answers[i].checked) {

            // console.log(answers[i]);
            theChoosenAnswer = answers[i].dataset.answer;
        }
    }
    // console.log(`right answer is: ${rAnswer}`);
    // console.log(`choosen answer is: ${theChoosenAnswer}`);
    if (rAnswer[0] === theChoosenAnswer[0]) {
        rightAnswer++;
        // console.log("good Answer");
    } else {
        wrongAnswers.push(wquestion.innerText);
        // console.log(wrongAnswers);
    }

}

function handelBullets() {

    let bulletsSpans = document.querySelectorAll(".bullets .spans span");
    let arrayOfSpans = Array.from(bulletsSpans);
    arrayOfSpans.forEach((span, index) => {

        if (currentIndex === index) {
            span.className = "on";
        }


    });


}

function showResults(count) {

    let theResults;

    if (currentIndex === count) {

        countQ = count;
        // console.log("fin question");


        //hahiya ---------------------------------------------------------------------
        const three = document.querySelector(".three");
        three.classList.add("active");
        //hahiya ---------------------------------------------------------------------

        quizeArea.remove();
        // answersArea.remove();
        answersArea.innerHTML = "";
        mainDiv = document.createElement("div");
        // let po = [];
        questionsObject.forEach(element => {
            wrongAnswers.forEach(welement => {
                // console.log(welement + " - " + element.title);
                if (welement == element.title) {
                    // po.push(element);
                    // Creat H2 Question title
                    let questionTitle = document.createElement("h2");
                    let correctAnswer = document.createElement("p");
                    let Right_answer = document.createElement("p");
                    let br = document.createElement("br");

                    // Creat Question text
                    let questionText = document.createTextNode(element.title);
                    let rightText = document.createTextNode(element.right_answer);
                    let correctText = document.createTextNode(element.correct);
                    questionTitle.appendChild(questionText);
                    correctAnswer.appendChild(correctText);
                    Right_answer.appendChild(rightText);
                    // console.log(element);
                    // add text to H2


                    // add the H2 to the quizeArea

                    mainDiv.appendChild(questionTitle);
                    mainDiv.appendChild(correctAnswer);
                    mainDiv.appendChild(Right_answer);
                    mainDiv.appendChild(br);

                } else {
                    // console.log("b");
                }

            });
        });
        // console.log(po)


        answersArea.appendChild(mainDiv);
        submitButton.remove();
        bullets.remove();



        if (rightAnswer > (count / 2) && rightAnswer < count) {

            theResults = `<span class="good">Good</span>, ${rightAnswer} from ${count},`;

        } else if (rightAnswer === count) {

            theResults = `<span class="perfect">Perfect</span>, All answer is correct,`;


        } else {

            theResults = `<span class="bad">Bad</span>, ${rightAnswer} from ${count},`;


        }

        resultsContainer.innerHTML = theResults;
        resultsContainer.style.padding = "20px";
        resultsContainer.style.marginTop = "20px";
        resultsContainer.style.backgroundColor = "white ";

    }


}

function countdown(duration, count) {

    if (currentIndex < count) {
        let minutes, seconds;

        countdownT = setInterval(function () {

            minutes = parseInt(duration / 60);
            seconds = parseInt(duration % 60);

            minutes = minutes < 10 ? `0${minutes}` : minutes;
            seconds = seconds < 10 ? `0${seconds}` : seconds;



            countdownElement.innerHTML = `${minutes}:${seconds}`;

            if (--duration < 0) {
                clearInterval(countdownT);
                // console.log("finished");
                submitButton.click();
            }

        }, 1000)

    }

}


// function getname() {
//     sessionStorage.setItem("user", document.getElementById("full_name").value);
//   }
//   let name = sessionStorage.getItem("user");
//   document.getElementById("full_name1").innerText = `Hello`  + name;




document.getElementById("full_name").innerText = sessionStorage.getItem("full_name");