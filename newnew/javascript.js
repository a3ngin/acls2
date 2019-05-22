// everything
var questions = [
    "During her treatment, Sarah’s heart rate when to 150 bpm. What is the next course of action?",
    "Upon assessment Sarah is not symptomatic. She has no shortness of breath, chest pain or signs of shock. She is alert and oriented and her blood pressure is stable at 115/68. A call was placed to the doctor and an EKG ordered. It showed narrow QRS tachycardia, SVT. What is your next course of action?",
    "The doctor called back and ordered Adenosine, which you know is injected really really fast and can stop her heart. Unfortunately her HR is still high now it is in the 160s and she has labored breathing. You call a rapid response and take her vital sings and her BP is 75/32, HR 165, O2 Sat is 87%, you put her on a nonrebreather and the doctors show up and say it is time to cardiovert. She still has a narrow regular QRS complex so you use what setting?",
    "Oh No! the nurse doing the cardioversion (not you) forgot to make sure it was synchronized with the R-waves and Sarah is now unresponsive. You check for a pulse and upon not feeling on immediately start compressions. When you assess the patient again you find that she does have a rhythm on the monitor but not pulse. What do you think the doctor will order now?",
    "Sarah as woken up and is somewhat responsive you optimize ventilation and oxygenation and decrease O2 administered until Sarah’s O2 sat is at least 94% and you treat the hypotension with IV/IO bolus, vasopressor infusion and her BP increases to 92/50. What is the next course of action."
];
// var images = [];
var options1 = ["a) Discharge her she was just getting the treatment before discharge there is no reason to keep her, albuterol can make your heart rate go up.", "b) Assess the patient for symptoms, notify the doctor prior to discharge.", "c)	Complete an EKG."];
var options2 = ["a)	Notify the doctor of the results and have the patient bear down or blow through a straw.", "b)	Give some Adenosine.", "c) Give some Atropine."];
var options3 = ["a)	200 J", "b)	Defibrillation Dose", "c) 50 J"];
var options4 = ["a) Defibrillate the patient", "b)Continue with compressions and monitor the patient", "c) Give epinephrine"];
var options5 = ["a)Continuous EKG while the patient is transported to ICU.", "b) Start Targeted Temperature Management."];

var options = [options1, options2, options3, options4, options5];
var answers = [options1[1], options2[0], options3[2], options4[2], options5[0]];
var answer = "";
var alive = 0;
var deaths = 0;
var intervalId;
var time = 0;
var questionCount = 0;

$(document).ready(function() {

    // giving classes
    $("#clock").addClass("h6");
    $("#alive").addClass("h6");
    $("#deaths").addClass("h6");
    $(".simulation").addClass("h6");
    $("#options").addClass("h6");

    // question setup
    function questionSetup () {
        time = 20;
        var question = $("<div>");
        question.addClass("h3");
        question.text(questions[questionCount]);
        $(".simulation").append(question);
        questionsAnswers(options[questionCount]);
        $("#alive").text("");
        $("#deaths").text("");
        $("#clock").text("Time Remaining: " + time);

    
    function questionsAnswers (arr) {
        for (i = 0; i < arr.length; i++) {
            var button = $("<button>");;
            button.text(arr[i]);
            button.addClass("button");
            button.attr({"selection": arr[i]});
            $("#options").append(button);
            
    }
}

// seconds
intervalId = setInterval(count, 1000);

// onclick function
$(".button").on("click", function () {
    stop();
    answer = ($(this).attr("selection"));
    check(answer);
    // console.log(answer);
})
}

// correct answer
function correct () {
    $(".simulation").html("Still Alive!");
    $("#options").html("");
  
    setTimeout(reset, 5000);
    $("#clock").text("");
    questionCount++;
}

// incorrect answer
function incorrect () {
    $(".simulation").html("Your patient didn't make it! The correct answer was:");
    $("#options").html(answers[questionCount]);
    // var image = $("<img>");
    // image.attr("src", images[questionCount]);
    // image.addClass("row");
    // $("#options").append(image);
    setTimeout(reset, 5000);
    $("#clock").text("");
    questionCount++;
}

// no answer
function noAnswer () {
    $(".simulation").html("You hesitated! The correct answer was:");
    $("#options").html(answers[questionCount]);
    // var image = $("<img>");
    // image.attr("src", images[questionCount]);
    // image.addClass("row");
    // $("#options").append(image);
    setTimeout(reset, 5000);
    questionCount++;
}

// start simulation
function start () {
    var button = $("<button>");
        button.text("Start");
        button.addClass("button");
        $("#options").append(button);
        $(".button").on("click", function () {
            reset();
        })
}

// reset 
function restart () {
    
    var button = $("<button>");;
        button.text("Restart");
        button.addClass("button");
        $("#options").append(button);
        alive = 0;
        deaths = 0;

        $(".button").on("click", function () {
            questionCount = 0;
            reset();
        })
}

//calls back start function
start();
    function check (x) {
        if (x === answers[questionCount]) {
            alive++;
            correct();
        }
        else {
            deaths++;
            incorrect();
        }
    }

    // end page
    function finish () {
        $(".simulation").html("");
        $("#options").html("");
        $("#alive").text("Right: " + alive );
        $("#deaths").text("Incorrect: " + deaths);

        restart();
    }

    // move on func
    function reset () {
        answer = "";
        if (questionCount < questions.length) {
        $(".simulation").html("");
        $("#options").html("");
        questionSetup();
        clock = 20;
        }
        else {
            finish();
        }
    }

// timer
function count () {
    time--;
    $("#clock").text("Time Remaining: " + time);

    if (time === 0) {
        noAnswer();
        deaths++;
        stop();
        $("#clock").text("");
    }
}

// Stops the counter when it reaches 0 after being called
function stop () {
    clearInterval(intervalId);
}
});