---
title: Blog
layout: layouts/base.njk
description: All posts.
---

# Blog

{% for post in collections.posts | reverse %}

  <article class="card">
    <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
<p class="muted">{{ post.date | date("YYYY-MM-DD") }} • {{ post.data.excerpt }}</p>

  </article>
{% endfor %}
