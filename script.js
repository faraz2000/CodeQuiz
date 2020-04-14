var questions = [
    {
      question: "What does CSS stand for?",
      answers: [
        "Cascading Style Sheet",
        "Calendar Sort Section",
        "Code Starting Solution",
        "Cancel Script Service"
      ],
      id: "question-1",
      correctAnswer: "Cascading Style Sheet"
    },
    {
      question: "What is the fomula for a for loop?",
      answers: [
        "42",
        "e=mc2",
        "var i; for (i = 0; i < 1; i++)",
        "(0°C × 9/5) + 32"
      ],
      id: "question-2",
      correctAnswer: "var i; for (i = 0; i < 1; i++)"
    },
    {
      question: "What do you use to enclose an array?",
      answers: [
        "Lesser and greater than signs",
        "Parentheses",
        "Curly braces",
        "Square brackets"
      ],
      id: "question-3",
      correctAnswer: "Square brackets"
    }
  ];
  var card = $("#questions")
  var timeRemaining = 120;
  var timer
  
  var game = {
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    timeRemaining: timeRemaining,
    currentQuestion: 0,
    
    countdown: function () {
      this.timeRemaining--;
      $("#timeRemain").text(this.timeRemaining + " Seconds Left");
      if (this.timeRemaining === 0) {
        this.stop()
        alert("Time is up!")
        this.checkAnswers()
      }
    }, 
    questionForm: function () {
      timer = setInterval(this.countdown.bind(this), 1000)
      card.html("<h2>" + questions[this.currentQuestion].question + "</h2>")
      for (var i = 0; i < questions[this.currentQuestion].answers.length; i++) {
        card.append("<button class = 'answer-button' id = 'button' data-name='" + questions[this.currentQuestion].answers[i] + "'>" + questions[this.currentQuestion].answers[i] + "</button>")
      }
    },
    nextQuestion: function () {
      this.currentQuestion ++
      this.questionForm.bind(this)()
    },
    
    stop: function () {
      clearInterval(window.timer)
      if (this.currentQuestion === questions.length - 1) {
        setTimeout(this.results, 1000) 
      }
      else {
        setTimeout(this.nextQuestion, 1000)
      }
    },
    results: function () {
      clearInterval (window.timer)
      $("#timeRemain").text(this.timeRemaining)
      card.append("<h3>Correct Answers:  " + this.correct + "</h3>")
      card.append("<h3>Incorrect Answers:  " + this.incorrect + "</h3>")
      card.append("<h3>Unanswered:  " + (questions.length - (this.incorrect + this.correct)) + "</h3>")
      card.append("<br><button id ='start-over'>Start Over?</button>")
    },
    clicked: function (e) {
      clearInterval(window.timer)
      if ($(e.target).attr("data-name") === questions[this.currentQuestion].correctAnswer) {
        this.answeredCorrectly()
      }
      else {this.answeredIncorrectly()
      }
      console.log(questions[this.currentQuestion].correctAnswer)
    },
    answeredCorrectly: function () {
      this.correct++
      clearInterval(window.timer)
      card.html("<h2>Correct</h2>")
      if (this.currentQuestion === questions.length - 1) {
        setTimeout(this.results.bind(this), 1000) 
      }
      else {
        setTimeout(this.nextQuestion.bind(this), 1000)
      }
    },

    answeredIncorrectly: function () {
      this.incorrect++
      clearInterval(window.timer)
      timer - 10;
      card.html("<h2>Incorrect</h2>")
      if (this.currentQuestion === questions.length - 1) {
        setTimeout(this.results.bind(this), 1000)
      }
      else {
        setTimeout(this.nextQuestion.bind(this), 1000)
      }
    },

    reset: function () {
      this.currentQuestion = 0;
      this.correct = 0;
      this.incorrect = 0;
      this.timeRemaining = timeRemaining;
      this.questionForm();
    }
  }
  $(document).on("click","#start-over",game.reset.bind(game))
  $(document).on("click",".answer-button",function (e) {
    game.clicked.bind(game,e)()
  })
  $(document).on("click","#start",function (){
    game.questionForm.bind (game)()
  })