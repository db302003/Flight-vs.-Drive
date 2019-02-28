$(document).ready(function(){
  
    $("#remaining-time").hide();
    $("#start").on('click', trivia.startGame);
    $(document).on('click' , '.option', trivia.guessChecker);
    
  })
  
  var trivia = {
  
    correct: 0,
    incorrect: 0,
    unanswered: 0,
    currentSet: 0,
    timer: 20,
    timerOn: false,
    timerId : '',
   
    questions: {
      q1: 'What was the name of Dorothy`s mother?',
      q2: 'What did the ladies love to eat in their spare time?',
      q3: 'What city and state is Rose from?',
      q4: 'Blanche`s initials spells "BED", what is her original name?',
      q5: 'Stanley Zbornak was "?`s" ex-husband?',
      q6: 'Sophia Petrillo was born in what part of Italy?',
      q7: 'In Flordia, what city did they live in?'
     
    },
    options: {
      q1: ['Blanche', 'Rose', 'Sophia', 'Becky'],
      q2: ['pie', 'brownies', 'candy', 'cheesecake'],
      q3: ['St. Louis, Missouri', 'St. Olaf, Minnesota', 'St. Augustine, Florida', 'St. Paul, Minnesota'],
      q4: ['Blanche Eliza Donoghue', 'Blanche Edith Dawson', 'Blanche Emily Davidson', 'Blanche Elizabeth Devereux'],
      q5: ['Rose`s', 'Dorothy`s', 'Blanche`s', 'Sophia`s'],
      q6: ['Sicily','Florence','Augusta','Rome'],
      q7: ['Orlando', 'Fort Lauderdale', 'Tampa','Miami']
      
    },
    answers: {
      q1: 'Sophia',
      q2: 'cheeseckae',
      q3: 'St. Olaf, Minnesota',
      q4: 'Blanche Elizabeth Devereux',
      q5: 'Dorothy`s',
      q6: 'Sicily',
      q7: 'Miami'
      
    },
   
    startGame: function(){
      
      trivia.currentSet = 0;
      trivia.correct = 0;
      trivia.incorrect = 0;
      trivia.unanswered = 0;
      clearInterval(trivia.timerId);
      
      $('#game').show();
      
      $('#results').html('');
      
      $('#timer').text(trivia.timer);
      
      $('#start').hide();
  
      $('#remaining-time').show();

      trivia.nextQuestion();
      },
    nextQuestion : function(){
      
      trivia.timer = 10;
       $('#timer').removeClass('last-seconds');
      $('#timer').text(trivia.timer);

      if(!trivia.timerOn){
        trivia.timerId = setInterval(trivia.timerRunning, 1000);
      }

      var questionContent = Object.values(trivia.questions)[trivia.currentSet];
      $('#question').text(questionContent);

      var questionOptions = Object.values(trivia.options)[trivia.currentSet];
      
      $.each(questionOptions, function(index, key){
        $('#options').append($('<button class="option btn btn-info btn-lg">'+key+'</button>'));
      })
      
    },
    timerRunning : function(){
      if(trivia.timer > -1 && trivia.currentSet < Object.keys(trivia.questions).length){
        $('#timer').text(trivia.timer);
        trivia.timer--;
          if(trivia.timer === 4){
            $('#timer').addClass('last-seconds');
          }
      }
      else if(trivia.timer === -1){
        trivia.unanswered++;
        trivia.result = false;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Out of time! The answer was '+ Object.values(trivia.answers)[trivia.currentSet] +'</h3>');
      }
      else if(trivia.currentSet === Object.keys(trivia.questions).length){
        
        $('#results')
          .html('<h3>Thank you for playing!</h3>'+
          '<p>Correct: '+ trivia.correct +'</p>'+
          '<p>Incorrect: '+ trivia.incorrect +'</p>'+
          '<p>Unaswered: '+ trivia.unanswered +'</p>'+
          '<p>Please play again!</p>');
        
        $('#game').hide();
        
        $('#start').show();
      }
      },
 
    guessChecker : function() {

      var resultId;
    
      var currentAnswer = Object.values(trivia.answers)[trivia.currentSet];
   
      if($(this).text() === currentAnswer){
      
        $(this).addClass('btn-success').removeClass('btn-info');
        
        trivia.correct++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Correct Answer!</h3>');
      }
     
      else{
       
        $(this).addClass('btn-danger').removeClass('btn-info');
        
        trivia.incorrect++;
        clearInterval(trivia.timerId);
        resultId = setTimeout(trivia.guessResult, 1000);
        $('#results').html('<h3>Better luck next time! '+ currentAnswer +'</h3>');
      }
      
    },
    guessResult : function(){

      trivia.currentSet++;
     
      $('.option').remove();
      $('#results h3').remove();
    
      trivia.nextQuestion();   
    }
  }