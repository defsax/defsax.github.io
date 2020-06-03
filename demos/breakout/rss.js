(function(){
  const api = 'https://api.rss2json.com/v1/api.json?rss_url=';
  
  var postArray = [];  
  
  function getNews(siteURL){
    const DOMPARSER = new DOMParser();
    var encodedURL; 
    
    //check if the link is nytimes or not. if it is, it doesn't need to be encoded
    if(siteURL.indexOf('nytimes') === -1){
      encodedURL = api + encodeURIComponent(siteURL);
    }
    else{
      encodedURL = siteURL;
    }
    
    fetch(encodedURL)
    .then((response) => {
      //fetch doesn't reject on http errors, so check that it's okay
      if(response.ok){
        try{
          //json if not the nytimes
          if(siteURL.indexOf('nytimes') === -1){
            response.json().then((data) => {
              //parse json
              let t = data.items.length;
              for(let i = 0; i < t; i++){
                var title = data.items[i].title;
                var link = data.items[i].link;
                postArray.push({"title": data.items[i].title, "link": data.items[i].link});
              }
            })
          }
          else{
          //dom object if it pulls the nytimes
            response.text().then((data) => {
              //parse text
              const DOMPARSER = new DOMParser();
              let doc = DOMPARSER.parseFromString(data, "text/xml");
              doc.querySelectorAll('item').forEach((item) => {
                //for each item returned by the parser query for title and link
                var title = item.querySelector('title').textContent;
                var link = item.querySelector('link').textContent;
                
                //filter out nytimes non-headlines
                if(title === 'Try Tiles' ||
                  title === 'The Crossword, Vertex and More' ||
                  title === 'Try Spelling Bee' ||
                  title === '' ||
                  title === "null")
                  return;
                else
                  postArray.push({"title": title, "link": link});
              })
            })
          }
        }catch(e){ console.error("Error in parsing feed."); }
      }else{ console.error("HTTP error. Unable to fetch resource."); }
    })
  }
  
  window.fetchnews = function(urls){
    urls.forEach(getNews);
    return postArray;
  };
})();
