

var buttonArr = ["Taco Bell", "Batman", "Corgi", "My Hero Academia", "Metallica", "Space Jam", "Demolition Man", "The Office", "Rage Quit", "Bernie Sanders", "Thumbs Up", "Mr.Bean", "Adventure Time", "Anime", "Dragons", "Captain Marvel", "Mass Effect", "Snoop Dogg"]
//this array points to color classes in CSS to allow me to change color of buttons. 
//if buttonArr length is more than 7, button classes will be pushed to the array so all buttons are colored
var btnClassArr = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7"]

//function that pulls data from API and displays them dynamically on page
function displayGifs () {
    var API_KEY = "aa5D0fZ0j07riJgexlaxj60yO0nf9TnV";
    var topic = $(this).attr("data")
    //added limit to equal 18 instead of 10. 10 did not quite fill out the page very well
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + topic + "&limit=18&api_key=" + API_KEY
    console.log(queryURL)
    $("#gifResults").empty();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        //create function that pulls data from button and converts it to topic variable, then pushes data to #gifDisplayDIv
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
        //rating filter to ensure all gifs are g or PG, did not display on webpage since this is inplace
        if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
            var gifImg = $('<img>')
            gifImg.attr('src', results[i].images.fixed_height_still.url).attr('id', "gif").addClass("rounded float-left m-2").attr('data-still', results[i].images.fixed_height_still.url).attr('data-animate', results[i].images.fixed_height.url).attr('data-state', "still")
            //attempting to add download icon on image that when clicked prompts download. need to do more investigation but leaving in code for later
            //gifImg.append('<a href="#" onclick="prepHref(this)" download><i class="fas fa-download"></i></a>')
            $('#gifResults').prepend(gifImg)
            //ths calls the animate function to change the state of the img. needs to be called here since gifs are created here and wont work outside of function because of async properties
            animate()
            }
        }
    })  
}

//created buttons based on array and adds additional color classes if length is too long
function showButtons() {
    for (var i = 0; i < buttonArr.length; i++){
      console.log(buttonArr[i])
      var button = $('<button>').text(buttonArr[i]).addClass(`btn btn-sm m-1 ${btnClassArr[i]}`).attr('data', buttonArr[i]).attr('id', "button")
      if (buttonArr.length > btnClassArr.length) {
        btnClassArr.push("color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7")
      }
      $('.buttonDisplay').append(button)
      }
  }

//appends the user input to the button array then triggers buttons ro repopulate only if data has been entered
$('#search').on('click', function(event){
    event.preventDefault();
    var newBtn = $('#input').val().trim()
    $('.buttonDisplay').empty()
    $('#input').val('')
    //if else statement to keep users from creating buttons with no text and prevent accidental button creations on double click
    if (newBtn == "") {
        $('#input').val('')
        showButtons()
    //both statements show buttons but it will only push to the array if the input is !emptystring
    } else {
        buttonArr.push(newBtn)
        showButtons()
    }
})

//function that swaps sources on gif based on state allowing 'click to play/stop'
function animate() {
    $('#gif').on('click', function() {
        var state = $(this).attr('data-state');
    
        if (state === "still") {
          $(this).attr('src', $(this).attr("data-animate"));
          $(this).attr('data-state', "animate");
        } else {
          $(this).attr('src', $(this).attr("data-still"));
          $(this).attr('data-state', "still");
        }
      });
}

//event listener that kicks off functions and makes AJAX call after button is pressed
$(document).on("click", '.btn-sm', showButtons, displayGifs)

//recalls showbutton function to make sure they appear at page load
showButtons()
