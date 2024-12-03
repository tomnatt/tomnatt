var games_urls = ["https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json"];
var url = "https://raw.githubusercontent.com/tomnatt/humble-choice/refs/heads/main/output/json/humble-choice-2024.json";

$(function() {

  // Remove dummy line
  $("#beforejs").remove();

  // $.when(

  //   // Get the games and populate the table
  //   $.each(games_urls, function(i, url) {
      $.getJSON(url, function(games) {
        $.each(games, function(i, game) {

          gameName = "<td>" + game.name + "</td>";
          gameBundle = "<td>" + game.month + " " + game.year + "</td>";
          gameId = "<td>" + game.steam_id + "</td>";

          $("#humble-list tbody").append("<tr>" + gameName + gameBundle + gameId + "</tr>");

        })
      })
    // })

  .done(function() {
    console.log("after");
    $("#humble-list").searchable({
      searchField : "#search",
      // searchType  : "fuzzy",
      clearOnLoad : true
    });
  })

  // ).done(function() {
  //   console.log("Then go!");
  //   $("#humble-list").searchable({
  //     searchField : "#search",
  //     searchType  : "fuzzy",
  //     clearOnLoad : true
  //   });
  // });

  // setTimeout(function() {

    // console.log("Timeout go!");
    // $("#humble-list").searchable({
    //   searchField : "#search",
    //   searchType  : "fuzzy",
    //   clearOnLoad : true
    // });

  // }, 5000);
});
