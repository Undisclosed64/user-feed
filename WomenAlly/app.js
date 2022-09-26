
//select all the dom elements
const domElements = {
    navSearch:document.querySelector('.navigation-searchBar'),
    searchField:document.querySelector('#searchInputParent'),
    backBtn:document.querySelector('.backIcon'),
    feedBtn:document.querySelector('.navigation-feed'),
    feed:document.getElementById('feed'),
    userProfile:document.querySelector('.navigation-userProfile'),
    profile:document.getElementById('userAccountInfo'),
    feedbackNav:document.querySelector('.navigation-feedBackBtn'),
    feedBackCell:document.querySelector('#feedbackArtcle'),
    createPost:document.getElementById('createPostInput'),
    main:document.querySelector('main'),
    showCell:document.querySelector('.createPostCell'),
    closeCreatePost:document.querySelector('.closePostCell'),
    postBtn:document.querySelector('#postBtn'),
    PostInput:document.querySelector('#writePost'),
    input:document.querySelector('.addPicWrapperInput')

}

//define all the listener functions
const listenerFunctions =  {

    displaySearchInput:function(){
       domElements.searchField.classList.add('visible');
     },

     exitSearch:function(event){
        domElements.searchField.classList.remove('visible');
        event.stopPropagation();
    },

    displayCell:function(){
        domElements.feedBackCell.classList.toggle('active');
       },

       showFeed:function(){
        domElements.feed.classList.toggle('active');
    },

    showProfileMenu:function(){
        domElements.profile.classList.toggle('visible')
    },
    showBoard:function(){
        domElements.showCell.classList.add('show');
        domElements.main.classList.add('overlay');
    
    },
    hideBoard:function(){
        domElements.showCell.classList.remove('show');
        domElements.main.classList.remove('overlay');
    },

 receivePost :function(event){
  const userPostInput = domElements.PostInput.value;
  if(userPostInput !== ""){
   domElements.PostInput.value = "";
   domElements.createPost.value="";
 
   listenerFunctions.hideBoard();

  if(event.target.previousSibling.childNodes[5].files[0] !== undefined){
        const imgSrc = URL.createObjectURL(event.target.previousSibling.childNodes[5].files[0]);
        listenerFunctions.showPost(userPostInput,imgSrc,event);
       } else {
        listenerFunctions.showPost(userPostInput,event);
      }
    } else {
        alert('Post can not be empty!');
    }
    },

showPost:function(inputValue,imgSrcValue,event){
    const section = document.createElement("section");
    section.classList.add('section','postSection');

    const userInfo = document.createElement("div");
    userInfo.innerHTML =  `<img src="user.svg" alt=""class="userDpCreatePost">
    <div class="name">User name</div>`;
    userInfo.classList.add('userInfoCreatePost');
    section.appendChild(userInfo);

    const text = document.createElement("p");
    text.innerHTML = inputValue;
    text.classList.add('postContent')
    section.appendChild(text);

    const checkImage = (url) => {
        const request = new XMLHttpRequest();
        request.open("GET", url, true);
        request.send();
        request.onload = function() {
          if (request.status == 200) {
            const photo = document.createElement("img");
            photo.src = imgSrcValue;
            photo.classList.add('userAttachedPic')    
            section.appendChild(photo);
          } 

        }
      }

    checkImage(imgSrcValue);
    console.log(section)
    domElements.main.appendChild(section);
}
   }

//add event listners to necessary elements
domElements.navSearch.addEventListener("click",listenerFunctions.displaySearchInput);
domElements.backBtn.addEventListener("click",listenerFunctions.exitSearch);
domElements.feedBtn.addEventListener("click",listenerFunctions.showFeed);
domElements.userProfile.addEventListener("click",listenerFunctions.showProfileMenu);
domElements.feedbackNav.addEventListener("click",listenerFunctions.displayCell);
domElements.createPost.addEventListener("click",listenerFunctions.showBoard);
domElements.closeCreatePost.addEventListener("click",listenerFunctions.hideBoard);
domElements.postBtn.addEventListener("click",listenerFunctions.receivePost);
