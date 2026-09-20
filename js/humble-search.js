var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-all.json";
// var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json";

$(function() {

  // Remove dummy line
  $("#beforejs").remove();

  // Get the games and populate the table
  $.getJSON(url, function(games) {
    $.each(games, function(i, game) {

      // Only show specific game tags
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

      var month_link = "";
      // link is to Choice page, unless before December 2019 in which case was the older Monthly page
      if (game.year < 2020) {
        month_link = '<a href="https://www.humblebundle.com/monthly/p/' + game.month.toLowerCase() + "_" + game.year + '_monthly">'
                      + game.month + " " + game.year
                      + "</a>";
      } else {
        month_link = '<a href="https://www.humblebundle.com/membership/' + game.month.toLowerCase() + "-" + game.year + '">'
                      + game.month + " " + game.year
                      + "</a>";
      }

      // If we have a Steam Id link to the store page
      var steam_link = "";
      if (game.steam_id) {
        steam_link = '<a href="https://store.steampowered.com/app/' + game.steam_id + '/">' + game.steam_id + "</a>";
      }

      gameName = '<td class="steamname">' + game.name + "</td>";
      gameBundle = '<td class="bundle">' + month_link + "</td>";
      gameTags = '<td class="tags">' + tags.join(", ") + "</td>";
      gameId = '<td class="steamid">' + steam_link + "</td>";

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
