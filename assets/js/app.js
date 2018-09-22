

var buttonArr = ["Taco Bell", "Batman", "Corgi", "My Hero Academia", "Metallica", "Space Jam", "Demolition Man", "The Office", "Rage Quit", "Bernie Sanders", "Thumbs Up", "Mr.Bean", "Adventure Time", "Anime", "Dragons", "Captain Marvel", "Mass Effect", "Snoop Dogg"]
var btnClassArr = ["color-1", "color-2", "color-3", "color-4", "color-5", "color-6", "color-7"]


function displayGifs () {
    var API_KEY = "aa5D0fZ0j07riJgexlaxj60yO0nf9TnV";
    var topic = $(this).attr("data")
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
        if (results[i].rating !== 'r' && results[i].rating !== 'pg-13') {
            var gifImg = $('<img>')
            gifImg.attr('src', results[i].images.fixed_height_still.url).attr('id', "gif").addClass("rounded float-left m-2").attr('data-still', results[i].images.fixed_height_still.url).attr('data-animate', results[i].images.fixed_height.url).attr('data-state', "still")
            //gifImg.append('<a href="#" onclick="prepHref(this)" download><i class="fas fa-download"></i></a>')
            $('#gifResults').prepend(gifImg)
            animate()
            }
        }
    })  
}

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

$('#search').on('click', function(event){
    event.preventDefault();
    var newBtn = $('#input').val().trim()
    $('.buttonDisplay').empty()
    $('#input').val('')
    if (newBtn == "") {
        $('#input').val('')
        showButtons()
    } else {
        buttonArr.push(newBtn)
        showButtons()
    }
})

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

$(document).on("click", '.btn-sm', showButtons, displayGifs)

showButtons()
