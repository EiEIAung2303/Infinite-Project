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
   const {scrollTop, clientHeight, scrollHeight} = document.documentElement;
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
      },300);
  },1000);
}

filterEl.addEventListener('input', (e) => {
   let search = e.target.value.toLowerCase();
   //To get DOM Notes
   let posts = document.querySelectorAll('.post');
   
   posts.forEach(post => {
      let title = post.querySelector('.post-title').innerText.toLowerCase();
      let body =post.querySelector('.post-body').innerText.toLowerCase();
      if (title.indexOf(search) > -1 || body.indexOf(search) > -1) {
         post.style.display = 'flex'
      } else {
         post.style.display = 'none'
      }
   }) 
})