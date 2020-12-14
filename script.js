let limit = 5;
let page = 1;
let postContainerEl = document.getElementById('post-container');
let filterEl = document.getElementById('filter');
let loaderEl = document.querySelector('.loader');

//To Get Posts 
async function getPosts() {
   let data = await fetch(`http://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`)
   return data.json();
}

//To Show Posts
async function showPosts() {
   let posts = await getPosts();

   posts.forEach(post => {
      let element = document.createElement('div');
      element.classList.add('post');
      element.innerHTML = `
      <div class="post-number">${post.id}</div>
         <div class="post-info">
         <div class="post-title">${post.title}</div>
         <div class="post-body">${post.body}</div>
      </div>
      `;
      postContainerEl.appendChild(element);
   });
};

showPosts();

//Scroll event
window.addEventListener('scroll', (e) => {
   //deconstruct
   const {
      scrollTop,
      clientHeight,
      scrollHeight
   } = document.documentElement;
   //to get scroll height
   let scrollTotal = scrollTop + clientHeight;
   if (scrollTotal >= scrollHeight) {
      //call method
      showLoading();
   }
})

//To Show loading with next page within time limit
function showLoading() {
   loaderEl.classList.add('show');
   //to disapper after 1000s
   setTimeout(() => {
      loaderEl.classList.remove('show');
      //to add page
      setTimeout(() => {
         page++;
         showPosts();
      }, 300);
   }, 1000);
}

filterEl.addEventListener('input', (e) => {
   let search = e.target.value.toLowerCase();

   console.log(search)

   //To get DOM Notes
   let posts = document.querySelectorAll('.post');

   posts.forEach(post => {
      //for title
      let title = post.querySelector('.post-title').innerText.toLowerCase();
      let TitleEL = post.querySelector('.post-title').innerHTML;
      //for body
      let body = post.querySelector('.post-body').innerText.toLowerCase();
      let BodyEL = post.querySelector('.post-body').innerHTML;
      //replace tag
      let titleString = TitleEL.toString().replace(/(<([^>]+)>)/gi, "");
      TitleEL = titleString;
      //replace tag
      let bodyString = BodyEL.toString().replace(/(<([^>]+)>)/gi, "");
      BodyEL = bodyString;

      if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
         post.style.display = 'flex'
         //create pattern
         //var query = new RegExp("(\\b" + text + "\\b)", "gim");
         //replace(searchValue, replaceValue)
         //replace value => function is also OK
         //match is parameter
         let newTitle = TitleEL.replace(new RegExp(search, "gi"), (match) => `<mark>${match}</mark>`);
         post.querySelector('.post-title').innerHTML = newTitle;

         let newBody = BodyEL.replace(new RegExp(search, "gi"), (match) => `<mark>${match}</mark>`);
         post.querySelector('.post-body').innerHTML = newBody;
      } else {
         post.style.display = 'none'
      }
   })
})