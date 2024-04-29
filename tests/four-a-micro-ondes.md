---
layout: test-layout.njk 
title: un four à micro-ondes
img: micro-ondes.jpg
date: 2024-03-26
tags: ['test']
---

Les fours à micro-ondes sont très présents dans nos cuisines. A quoi ressemblent leurs consommations ?
<!-- excerpt -->

## Le matériel
{% intro "micro-ondes.jpg" "Four à micro-ondes Thompson M2201G datant des années 90" %}

Le four à micro-ondes testé est un four Thompson M2201G datant des années 90. Il a bien vécu et bien voyagé : initialement acheté neuf pour ma grand-mère, j'en ai hérité et il m'a suivi dans 3 régions de France.

### Méthode de mesure

Le four à micro-onde est branché sur une prise de courant de la cuisine. Le seul autre appareil alimenté par cette ligne électrique est le réfrigérateur.

{% post mesurer-la-consommation-avec-shelly-em Le tableau électrique contient un module Shelly Pro 3EM %} qui mesure (entre autre) la consommation sur la ligne dédiée à ces deux prises. Lorsque le moteur du frigo ne tourne pas, les mesures de consommations obtenues indiquent donc la consommation du four à micro-ondes.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation à la puissance maximale

{% profile "petit-dej.json.gz" '{"name": "Réglage « III » (max)", "range": "621162m186267"}' %}

## Consommation en mode décongélation

{% profile "micro-ondes.json.gz" '{"name": "Décongelation", "range": "114562m291240"}' %}

## Consommation des autres modes

{% image "./images/micro-ondes-boutons.jpg" "Boutons de commandes du four à micro-ondes" "256w" 256 %}

### Force « I »
{% profile "micro-ondes.json.gz" '{"name": "Force « I »", "range": "5302864m123135"}' %}

### Force « II »
{% profile "micro-ondes.json.gz" '{"name": "Force « II »", "range": "5889300m248363"}' %}

### Puissance minimum

{% profile "micro-ondes.json.gz" '{"name": "Minimum", "range": "990044m59807"}' %}

### Sans faire tourner le plateau
{% profile "micro-ondes.json.gz" '{"name": "Minimum (plateau tournant désactivé)", "range": "1051975m123711"}' %}
