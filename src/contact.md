---
title: Contact
layout: layouts/base.njk
description: Contact Marco for calm tech help, collaborations, or questions.
---

# Contact

<form name="contact" method="POST" data-netlify="true" netlify-honeypot="bot-field" enctype="multipart/form-data">
  <input type="hidden" name="form-name" value="contact" />
  <p class="hidden"><label>Don’t fill this out: <input name="bot-field" /></label></p>

  <label for="name">Name</label>
  <input id="name" name="name" type="text" required />

  <label for="email">Email</label>
  <input id="email" name="email" type="email" required />

  <label for="message">Message</label>
  <textarea id="message" name="message" rows="6" required></textarea>

  <label for="screenshot">Optional screenshot</label>
  <input id="screenshot" name="screenshot" type="file" accept="image/*" />

  <button type="submit" class="btn-primary">Send</button>
</form>

<p class="muted">Typical response time: 24–48 hours. Netlify Forms will deliver submissions to the email configured in your Netlify site settings.</p>
