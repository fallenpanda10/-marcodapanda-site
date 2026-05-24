---
title: Sample Post
date: 2026-05-24
tags: [curiosity, matcha]
layout: layouts/post.njk
excerpt: A short sample post to test templates and tags.
---

This is a sample post to verify the post template, tags, and related pages.

{% set related = collections.posts | filter(post => post.data.tags && post.data.tags.some(t => tags.includes(t)) ) | slice(0,3) %}
{% if related.length %}
  <aside class="related">
    <h3>Related</h3>
    <ul>
      {% for r in related %}
        {% if r.url != page.url %}
          <li><a href="{{ r.url }}">{{ r.data.title }}</a></li>
        {% endif %}
      {% endfor %}
    </ul>
  </aside>
{% endif %}
