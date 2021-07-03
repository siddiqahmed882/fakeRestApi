const blogDetailsTemplate = document.getElementById('blog-details');
const detailsContainer = document.querySelector('.details');

const id = new URLSearchParams(window.location.search).get('id');

window.addEventListener('DOMContentLoaded', () => renderDetails());

// render details
const renderDetails = async () => {
  const res = await fetch(`http://localhost:3000/posts/${id}`);
  const post = await res.json();
  console.log(post);
  const blog = document.importNode(blogDetailsTemplate.content, true);
  const blogTitle = blog.querySelector('.blog-title');
  const blogBody = blog.querySelector('.blog-body');
  const delteBtn = blog.querySelector('.blog-delete');
  blogTitle.innerText = post.title;
  blogBody.innerText = post.body;
  delteBtn.addEventListener('click', async (e) => {
    const res = await fetch(`http://localhost:3000/posts/${id}`, {
      method: 'DELETE',
    });
    window.location.replace('/index.html');
  });

  detailsContainer.appendChild(blog);
};
