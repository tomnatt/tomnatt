var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-all.json";
// var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json";

$(function() {

  // Remove dummy line
  $("#beforejs").remove();

  // Get the games and populate the table
  $.getJSON(url, function(games) {
    $.each(games, function(i, game) {

      gameName = '<td class="steamname">' + game.name + "</td>";
      gameBundle = '<td class="bundle">' + game.month + " " + game.year + "</td>";
      gameId = '<td class="steamid">' + game.steam_id + "</td>";

      $("#humble-list tbody").append("<tr>" + gameName + gameBundle + gameId + "</tr>");

    })
  })

  // When loaded, enable search
  .done(function() {
    // Add the search box
    $("#humble-list").before('<input type="search" id="search" placeholder="Filter..." />');

    $("#humble-list").searchable({
      searchField : "#search",
      // searchType  : "fuzzy",
      clearOnLoad : true
    });
  })

});
