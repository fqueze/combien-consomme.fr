---
layout: test-layout.njk 
title: un aspirateur robot Roomba i3 plus
img: roomba-i3plus.jpg
date: 2024-03-26
tags: ['test']
---

Un aspirateur connecté est très pratique, mais quelle consommation supplémentaire cause-t-il ?
<!-- excerpt -->

### Le matériel

{% image "./images/roomba-i3plus.jpg" "Aspirateur robot Roomba i3 plus, avec sa tour de vidage, branché sur une prise connectée Shelly Plus Plug S" "512w" 512 %}

TODO

### Le logiciel

https://github.com/fqueze/shelly-plus-power-profiling/

#### Profiler en continu

TODO

#### Enregistrer le résultat

TODO

### Exemple
{% profile "roomba-i3plus.json.gz" %}
TODO
{% profile "roomba-i3plus.json.gz" '{"name": "hello", "range": "21377113m5164642"}' %}
