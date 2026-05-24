---
title: Curiosity Lab
layout: layouts/base.njk
description: Short experiments, questions, and small deep dives.
---

# Curiosity Lab

A place for short experiments, questions, and small deep dives.

{% for post in collections.posts %}
  {% if post.data.tags and "curiosity" in post.data.tags %}
    <article class="card">
      <h3><a href="{{ post.url }}">{{ post.data.title }}</a></h3>
      <p class="muted">{{ post.data.excerpt }}</p>
    </article>
  {% endif %}
{% endfor %}
