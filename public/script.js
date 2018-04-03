$(document).ready(function(){

  function renderResults(data){
    var results ="";
    for(i=0; i<data[1].length; i++){
      results += " <a href="+data[3][i]+" target='blank' class='link'><div class='searchResults searchResultsInactive'><p><b>"+data[1][i]+"</b></p><p>"+data[2][i]+"</p></div></a> " 
    }

    $('#searchResultsWrapper').replaceWith(
    "<div id='searchResultsWrapper'>"+results+"</div>"
    );
 }
  
  function shiftSearchBox(){
    $(".searchContainer").removeClass('searchContainerInactive');
    $(".searchContainer").addClass('searchContainerActive');   
  }

  function fadeInResults(){
    $(".searchResults").removeClass('searchResultsInactive');
    $(".searchResults").addClass('searchResultsActive');   
  }
    
  
    function wikiSearch(search) {
   var queryData = search;
  
  $.ajax( {
    url: 'https://en.wikipedia.org/w/api.php?action=opensearch&format=json&origin=*&search='+queryData+'&srlimit=25',
    data: queryData,
    dataType: 'json',
    type: 'GET',
    headers: { 'Api-User-Agent': 'WikiViewerProject/1.1 (https://codepen.io/Astaton/pen/MOomoV/; orson108@hotmail.com) BasedOnSuperLib/1.4' },

    success: function(data) {
      console.log(data)
      var margin = parseInt($(".searchContainer").css("margin-top"));
      if(margin >= 129){
      shiftSearchBox();
      }
      renderResults(data);
      var delay = 10;
      //transition would not work with out fadeIn being delayed
      fadeDelay = setInterval(function(){
        if(delay <= 0){
          fadeInResults();
          clearInterval(fadeDelay);
        }
        delay--;
      }, 20);
    }

   });
  };

  $('#searchButton').on('click', function(){
    var search =$('#searchBar').val();
    $("#searchResultsWrapper").removeClass('searchResultsActive');
    $("#searchResultsWrapper").addClass('searchResultsInactive');
    wikiSearch(search);
  });

  $("input").on("keydown",function(e) {
    var search =$('#searchBar').val();
    if(e.keyCode == 13) {
      e.preventDefault();
      $("#searchResultsWrapper").removeClass('searchResultsActive');
      $("#searchResultsWrapper").addClass('searchResultsInactive'); 
      wikiSearch(search);
    }
  });

 $('#randomSearch').on('click', function(){
    window.open('https://en.wikipedia.org/wiki/Special:Random', '_blank' );
  });
  
});