$(document).ready(function() {
  let wins = 0;
  let losses = 0;
  let full_results = {
    correct: '',
    guess1: '',
    guess2: '',
    result: ''
  }

  // Random Number Generator
  function RandomNum(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }

  // Clear variables
  function clearResults() {
    full_results = {
      correct: '',
      guess_1: '',
      guess_2: '',
      result: ''
    }
  }

  // Assign Random Number to Letter
  function randomLetter() {
    let randVar = "";
    switch (RandomNum(0, 3)) {
      case 0:
        randVar = "A";
        break;
      case 1:
        randVar = "B";
        break;
      case 2:
        randVar = "C";
        break;
    }
    return randVar;
  }

  function firstScenario(guess, correct) {
    clearResults();
    full_results.correct = correct;
    full_results.guess1 = guess;
    if (guess == correct) {
      full_results.result = true;
      return full_results;
    } else {
      full_results.result = false;
      return full_results;
    }
  }

  function thirdScenario(guess, correct) {
    let choices = ["A", "B", "C"];
    let secondChoices = [];
    clearResults();
    full_results.guess1 = guess;
    full_results.correct = correct;

    switch (correct) {
      case "A":
        incorrect = ["B", "C"];
        break;
      case "B":
        incorrect = ["A", "C"];
        break;
      case "C":
        incorrect = ["A", "B"];
        break;
    }

    choices.forEach(element => {
      if (element == guess || element == correct) {
        secondChoices.push(element);
      }
    });

    if (secondChoices.length != 2) {
      secondChoices.push(incorrect[RandomNum(0, 2)]);
    }

    switch (guess) {
      case secondChoices[0]:
        guess = secondChoices[1];
        full_results.guess2 = guess;
        break;
      case secondChoices[1]:
        guess = secondChoices[0];
        full_results.guess2 = guess;
        break;
    }

    if (guess == correct) {
      full_results.result = true;
      return full_results;
    } else {
      full_results.result = false;
      return full_results;
    }
  }

  function simulate(scenario, runs) {
    wins = 0;
    losses = 0;
    let display = '';
    let details = '';
    let j = 0;
    for (i = 0; i < runs; i++) {
      let randGuess = randomLetter();
      let randCorrect = randomLetter();
      let results = {};
      j = i+1;
      // let result = scenario(randGuess, randCorrect);  -works with js only, cannot process fn when scenario comes from html.

      switch(scenario) {
        case 'firstScenario':
          results = firstScenario(randGuess, randCorrect);
          details += '<p>' + j + '. Chosen door: ' + randGuess + '. Correct door: ' + randCorrect + '.</p>';
          break;
        case 'thirdScenario':
          results = thirdScenario(randGuess, randCorrect);
          details += '<p>' + j + '. 1st chosen door: ' + results.guess1 + '. 2nd chosen door: ' + results.guess2 + '. Correct door: ' + randCorrect + '.<p>';
          break;
      }

      if (results.result) {
        wins++;
      } else {
        losses++;
      }
    }

    let run_text = " times";
    if (runs == 1) {
      run_text = " time";
    }

    display = '<p>Simulation ran ' + runs + run_text + '</p>';
    display += '<p>Wins: ' + wins + '&nbsp;&nbsp;&nbsp; Win%: ' + (wins / runs)*100 + '%</p>';
    display += '<p>Losses ' + losses + '&nbsp;&nbsp;&nbsp; Loss%: ' + (losses / runs)*100 + '%</p>';

    if(scenario == 'firstScenario') {
      $('#sim1-results').html(display);
      $('#sim1-all-results').html(details);
      $('#sim1-all-btn').removeClass('hide');
    } else {
      $('#sim2-results').html(display);
      $('#sim2-all-results').html(details);
      $('#sim2-all-btn').removeClass('hide');
    }

    console.log("simulation ran " + runs + run_text);
    console.log("wins: " + wins + "  " + (wins / runs) * 100 + "%");
    console.log("losses: " + losses + "  " + (losses / runs) * 100 + "%");
  }


  $('.btn-runs').click(function() {
    let sim = $(this).attr('data-sim');
    let sim_label = $(this).attr('data-val');
    let sim_runs = $('#' + sim_label).val();
    simulate(sim, sim_runs);
  });
});
