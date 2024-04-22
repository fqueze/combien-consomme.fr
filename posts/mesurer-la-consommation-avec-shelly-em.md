---
layout: post-layout.njk 
title: Mesurer la consommation avec un module Shelly EM
img: shelly-em-tableau.jpg
date: 2024-04-10
tags: ['post']
---

Le tableau électrique est un point central de l'installation électrique d'une maison, où il est pratique de faire des mesures.
<!-- excerpt -->

## Pourquoi mesurer dans le tableau

Pour les appareils branchés sur une simple prise de courant, et qui consomment peu (moins de 10A), il est facile de {% post mesurer-la-consommation-avec-shelly-plus-plug-s mesurer la consommation à l'aide d'une prise connectée %}. Dans d'autres cas, c'est inadapté :
- pour un appareil ayant une forte consommation (cuisinière, ...), il faut des fils électriques de grosse section, et une simple prise connectée surchaufferait ;
- pour certains appareils dont le fonctionnement est critique, on n'a pas forcément envie de dépendre du bon fonctionnement d'un petit gadget électronique dont la fiabilité n'égale pas celle d'un simple morceau de fil. C'est le cas pour moi par exemple pour le congélateur.
- pour mesurer la consommation d'une zone complète de la maison, ou même la consommation totale de la maison.

## Un exemple concrêt

Voici une photo d'un tableau électrique de ma maison :

{% image "./images/shelly-em-tableau.jpg" "Tableau électrique ouvert, où on voit un module Shelly 3EM, un module noir contenant 2 Shelly EM, et 7 pinces ampèremétriques" "512w" 512 %}

Cette photo du tableau ouvert permet de voir que j'y ai ajouté un module Shelly 3EM, permettant de mesurer la consommation en 3 points (ou permettant de mesurer une consommation triphasée). Le bloc noir à côté est un support contenant deux modules Shelly EM, permettant chacun de mesurer la consommation en 2 points. Au total il y a donc 7 mesures prises chaque seconde dans ce tableau électrique.

J'ai mesuré :
- la connexion avec le réseau électrique, permettant de savoir si la maison consomme ou produit de l'énergie
- mon bureau : étant en télétravail, j'étais curieux de savoir quelle partie de la consommation de la maison est due à mon activité professionnelle
- les panneaux solaires que j'ai installé sur le mur de la maison orienté au sud.
- {% test machine-a-laver la machine à laver %} et {% test seche-linge-a-pompe-a-chaleur le sèche-linge %} (c'est la pince dans laquelle passent 2 fils rouges). Avoir ces deux appareils mesurés en même temps ne gêne pas mes mesures car les deux appareils fonctionnent rarement en même temps : on utilise typiquement le sèche-linge quand la machine a fini et est éteinte.
- la chaudière : c'est intéressant de voir quand elle se déclenche, la consommation du circulateur d'eau des radiateurs, la consommation au repos, ...
- le congélateur
- le fil de grosse section partant vers le tableau électrique secondaire du premier étage de la maison.

### Récupération des données

Ces modules communiquent en wifi. Une application pour smartphone est disponible pour visualiser simplement les données, mais cela implique d'envoyer toutes les données dans le cloud sur des serveurs gérés par le fabriquant. Pour des raisons de vie privée, je préfère que les données détaillées de consommation ne quittent pas la maison, et j'utilise plutôt les API locales. Il est possible d'accéder aux données avec une API HTTP, ou d'utiliser le protocole MQTT.

Dans mon cas, les données sont collectées par un ordinateur où tourne un serveur MQTT, et quelque scripts pour loguer les données. D'autres scripts me permettent ensuite de visualiser les données au format du [Firefox Profiler](https://profiler.firefox.com).

### Exemple

Voici un profil tiré du tableau électrique de la photo :
{% profile "shelly-em-tableau.json.gz" %}

Note : sur le graphique, chaque ligne utilise sa propre échelle.

Les enregistrements sont les suivants :
- énergie consommée
- énergie importée (électricité achetée sur le réseau)
- énergie exportée (électricité produite et non utilisée, renvoyée au réseau)
- électricité produite par des panneaux solaires sur le mur
- électricité consommée (la nuit) par l'électronique des panneaux solaires
- électricité consommée par mon bureau (l'enregistrement correspond à un jour où je ne travaillais pas, et la consommation est donc uniquement celle de la {% test freebox-delta Freebox %}
- électricité consommée par le premier étage (qui comprend la cuisine). On voit des consommations très marquées au moment du petit déjeuné, au moment du repas de midi, et lors de la préparation du repas du soir.
- électricité consommée par le {% test congelateur congélateur %}.
- électricité consommée par {% test machine-a-laver la machine à laver %} et/ou {% test seche-linge-a-pompe-a-chaleur le sèche-linge %}. Ici c'était nettement une machine à laver, on reconnait à la forme du cycle, avec une forte consommation au début pour chauffer l'eau.
- électricité consommée par la chaudière à gaz. C'est principalement le circulateur (la pompe faisant circuler l'eau dans les tuyaux de chauffage et les radiateurs) qui a une consommation électrique significative. Cela permet de voir à quel moment le chauffage fonctionnait. On voit que dans l'après-midi il n'y a pas eu besoin de chauffer. La chaudière a tout de même démarré à un moment, qui correspond à la période de cuisson du repas du soir ; c'était probablement pour de la production d'eau chaude sanitaire.
