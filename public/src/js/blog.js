// blog.js - simple client-side blog index loader
async function loadPosts() {
  try {
    const res = await fetch('/blog/index.json', {cache: "no-store"});
    if (!res.ok) throw new Error('Could not load posts');
    const posts = await res.json();
    const root = document.getElementById('posts-root');
    if (!root) return;
    root.innerHTML = '';
    posts.sort((a,b) => new Date(b.date) - new Date(a.date));
    posts.forEach(p => {
      const el = document.createElement('article');
      el.className = 'post-card';
      el.innerHTML = `<h3><a href="/blog/${p.file}">${p.title}</a></h3><time datetime="${p.date}">${new Date(p.date).toLocaleDateString()}</time><p class="muted">${p.excerpt}</p>`;
      root.appendChild(el);
    });
  } catch (err) {
    const root = document.getElementById('posts-root');
    if (root) root.textContent = 'Unable to load posts.';
    console.error(err);
  }
}
document.addEventListener('DOMContentLoaded', loadPosts);
