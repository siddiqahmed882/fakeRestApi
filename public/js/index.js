const blogTemplate = document.getElementById('blog-template');
const blogContainer = document.querySelector('.blogs');
const searchForm = document.querySelector('.search');

// render Posts
const renderPosts = async (term) => {
  let uri = 'http://localhost:3000/posts?_sort=likes&_order=desc';
  if (term) {
    uri += `&q=${term}`;
    while (blogContainer.firstChild) {
      blogContainer.removeChild(blogContainer.firstChild);
    }
  }

  const res = await fetch(uri); // fetch returns an object
  const posts = await res.json(); // take response object and convert it to js object

  // injecting posts to DOM
  posts.forEach((post) => {
    const blogElement = document.importNode(blogTemplate.content, true);
    const title = blogElement.querySelector('.title');
    const likes = blogElement.querySelector('.likes small');
    const body = blogElement.querySelector('.body');
    const link = blogElement.querySelector('.blog-link');
    title.innerText = post.title;
    likes.innerText = post.likes + ' likes';
    body.innerText = post.body.slice(0, 150);
    link.href = `./details.html?id=${post.id}`;
    console.log(blogElement);
    blogContainer.appendChild(blogElement);
  });
};

// search
searchForm.addEventListener('submit', (e) => {
  e.preventDefault();
  renderPosts(searchForm.term.value.trim());
});

window.addEventListener('DOMContentLoaded', () => renderPosts());
