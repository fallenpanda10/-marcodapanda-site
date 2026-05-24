---
title: Blog
layout: layouts/base.njk
description: All posts.
---

# Blog

{% for post in collections.posts reversed %}
  <article class="card">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
    <p class="muted">{{ post.data.date | date: "%Y-%m-%d" }} • {{ post.data.excerpt }}</p>
  </article>
{% endfor %}
