---
layout: default
title: seminar
permalink: /seminar/
description: 
---

<div class="post">
  <header class="post-header">
    <h1 class="post-title">{{ page.title }}</h1>
    <h5 class="post-description">{{ page.description }}</h5>
     <p> Descriptipn of seminar </p>
      
      <p>Continued description
      </p>
  </header>

  <h2>meeting summaries: </h2>
  {% for session in site.pastsem reversed %}

  {% if forloop.index == 6 %}
    {% break %}
  {% endif %}

  {% if forloop.index != 1 %}
    <hr>
  {% endif %}

  <h3 id="{{session.date | date: "%Y-%m-%d" }}"><a href="{{ session.url }}">{{ session.title }}</a></h3>
  <p class="author">
    <span class="author">{{session.presenters}}</span><br>
    <span class="date"><em>{{ session.date | date: "%B %e, %Y" }}</em></span>
  </p>
  {% if session.image %}
  <div class="sem-image-container">
    <img style="width: 80%;" src="{{ session.image | prepend: '/assets/img/' | 
    prepend: site.baseurl | prepend: site.url }}" alt="photo of {{session.title}}">
    {% if session.caption %}
    <div class="image-caption">{{ session.caption }}</div>
    {% endif %}
  </div>
  {% endif %}
  <div class="content">
    {{ session.content }}
  </div>
  {% endfor %}
</div>

{% if site.pastsem.size > 5 %}
  {% assign mylimit = site.pastsem.size | minus: 5 %}
  <hr>
  <h2>previous meetings: </h2>

  {% for session in site.pastsem reversed limit:mylimit %}
<em>{{ session.date | date: "%B %e, %Y" }}</em> - <a href="{{ session.url }}">{{ session.title }}</a> ({{ session.presenters }})

  {% endfor %}

{% endif %}

<em>Date 1</em> - Title fo seminar

<em>Date 2</em> - Title of seminar



