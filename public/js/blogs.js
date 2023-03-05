const newFormHandler = async (event) => {
    event.preventDefault();
    const commentBody = document.querySelector("#comment-desc").value.trim();
    const blog_id = window.location.href.split('/')[4];

    if (commentBody) {
        const response = await fetch(`/api/comments`, {
            method: 'POST',
            body: JSON.stringify({ content: commentBody, blog_id: blog_id }),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        console.log(response)

        if (response.ok) {
            const res = await response.json();
            console.log(res);
            document.location.replace(`/blog/${blog_id}`);
        } else {
            alert('Failed to create blog');
        }   
    }
};

const editBlogFormHandler = async (event) => {
    event.preventDefault();
  
    const id = document.querySelector('#blog-id').value;
    const title = document.querySelector('#blog-name').value.trim();
    const blogpost = document.querySelector('#blog-desc').value.trim();
  
    if (title && blogpost) {
      const response = await fetch(`/api/blogs/${id}`, {
        method: 'PUT',
        body: JSON.stringify({ title, blogpost }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to edit blog post');
      }
    }
  };

const newBlogFormElement = document.querySelector('.new-blog-form');
const editBlogFormElement = document.querySelector('.edit-blog-form');

if (newBlogFormElement) {
  newBlogFormElement.addEventListener('submit', newFormHandler);
}

if (editBlogFormElement) {
  editBlogFormElement.addEventListener('submit', editBlogFormHandler);
}