function tplawesome(e,t){res=e;for(var n=0;n<t.length;n++){res=res.replace(/\{\{(.*?)\}\}/g,function(e,r){return t[n][r]})}return res}

function onClientLoad() {
    gapi.client.load('youtube', 'v3', onYouTubeApiLoad);
}
// Called automatically when YouTube API interface is loaded (see line 9).

function onYouTubeApiLoad() {
    gapi.client.setApiKey('AIzaSyBFX_Ol_xdaDuhPvKz2lObpjBi-6H_HI2c');
}
 
// Called when the search button is clicked in the html code
function search() {
    reset();
    var query = document.getElementById('query').value;
    // Use the JavaScript client library to create a search.list() API call.
    var request = gapi.client.youtube.search.list({
        part: 'snippet',
        q:query
    });
    // Send the request to the API server, call the onSearchResponse function when the data is returned
    request.execute(onSearchResponse);
}

// Triggered by this line: request.execute(onSearchResponse);
function onSearchResponse(response) {
      $.each(response.items, function(index, item) {
      $.get("item.html", function(data) {
          $("#results").append(tplawesome(data, [{"title":item.snippet.title, "videoid":item.id.videoId}]));
      });
    });
  }
  
function reset(){
      $("#results").empty('');
}

   function handle(e){
        if(e.keyCode === 13){
            e.preventDefault(); // Ensure it is only this code that rusn

            e.execute(onSearchResponse);
        }
    }
