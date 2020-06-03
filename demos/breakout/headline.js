export default function HeadlineHandler(){
  var feeds = [];
  var headlineList = [];
  
  this.initialize = function(){
    if(feeds.length > 0){
      headlineList = window.fetchnews(feeds);
    }
    else{
      console.log("No feeds.");
    }
  }
  this.addFeed = function(feedURL){
    feeds.push(feedURL);
  }
  this.updateHeadline = function(element){
    let headline = document.getElementById(element);
    //if news headlines are present in array
    if(headlineList.length != 0){
      let randPost = Math.floor(Math.random() * headlineList.length);
      headline.innerHTML = headlineList[randPost].title;
      headline.href = headlineList[randPost].link;

      headlineList.splice(randPost, 1);
    }
    else{
      //otherwise don't draw
      document.getElementById('title').innerHTML = "";
      document.getElementById('title').href = "";
    }
  }
}
