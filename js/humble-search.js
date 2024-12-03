var games_urls = ["https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json"];

$(function() {

  // Remove dummy line
  $("#beforejs").remove();

  // Get the games and populate the table
  $.each(games_urls, function(i, url) {
    $.getJSON(url, function(games) {
      $.each(games, function(i, game) {
        console.log(game);

        gameName = "<td>" + game.name + "</td>";
        gameBundle = "<td>" + game.month + " " + game.year + "</td>";
        gameId = "<td>" + game.steam_id + "</td>";

        $("#games tbody").append("<tr>" + gameName + gameBundle + gameId + "</tr>");

      });
    });
  });
});
