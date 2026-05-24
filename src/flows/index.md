---
title: Flows
layout: layouts/base.njk
description: Gentle routines and grounding practices.
---

# Flows

Short routines and grounding practices to help you slow down.

<ul>
{% for item in collections.flows %}
  <li><a href="{{ item.url }}">{{ item.data.title }}</a></li>
{% endfor %}
</ul>
