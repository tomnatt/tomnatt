var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-all.json";
// var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json";

$(function() {

  // Remove dummy line
  $("#beforejs").remove();

  // Get the games and populate the table
  $.getJSON(url, function(games) {
    $.each(games, function(i, game) {

      var tags = [];
      if (game.tags) {
        if (game.tags.includes("Co-op")) {
          tags.push("Coop");
        }
        if (game.tags.includes("Local Co-Op")) {
          tags.push("Local Co-op");
        }
        if (game.tags.includes("Online Co-Op")) {
          tags.push("Online Co-op");
        }
        if (game.tags.includes("PvE")) {
          tags.push("PvE");
        }
      }

      gameName = '<td class="steamname">' + game.name + "</td>";
      gameBundle = '<td class="bundle">' + game.month + " " + game.year + "</td>";
      gameTags = '<td class="tags">' + tags.join(", ") + "</td>";
      gameId = '<td class="steamid"><a href="https://store.steampowered.com/app/' + game.steam_id + '/">' + game.steam_id + "</a></td>";

      $("#humble-list tbody").append("<tr>" + gameName + gameBundle + gameTags + gameId + "</tr>");

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
