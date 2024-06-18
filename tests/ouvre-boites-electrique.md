---
layout: test-layout.njk 
title: un ouvre-boîtes électrique
img: ouvre-boites.jpg
date: 2024-05-18
tags: ['test']
---

Mamie en avait un et ça avait l'air trop bien ! Maman n'en voulait pas ; il paraît que c'était inutile et consommait de l'électricité pour rien. Combien maman a-t-elle économisé en ouvrant ses boîtes de conserve à la main ?
<!-- excerpt -->

{% tldr %}
Ouvrir une boîte de conserve consomme {{ 0.19 | Wh }}, pour un coût négligeable : pour dépenser un centime en électricité, il faudrait ouvrir {{ 0.19 | countPer€: 0.01 }} boîtes.

Même s'il reste branché tout le temps, l'ouvre-boîtes ne consomme rien lorsqu'on ne s'en sert pas. Il ne contient pas d'électronique.
{% endtldr %}

## Le matériel
{% intro "ouvre-boites.jpg" "Ouvre-boîtes électrique Moulinex datant des années 70, branché sur une prise Shelly Plus Plug S" %}
Nous avons ici un ouvre-boîtes Moulinex Type 343.2.00 de 85W déniché pour un euro symbolique dans un marché aux puces. Un objet un peu désuet tout droit sorti de la cuisine idéale des années 70.

Maintenant que presque toutes les boîtes de conserve vendues disposent d'un anneau permettant une ouverture facile sans outil, l'ouvre-boîtes (qu'il soit manuel ou électrique) reste au fond du tiroir ou du placard.

Exceptionnellement, lorsqu'on a cassé l'anneau d'ouverture d'une boîte, on ressort l'ouvre boîte. L'occasion idéale de tester cet objet vintage.

### Méthode de mesure

L'ouvre-boîtes est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### À vide

Pour vérifier que cette antiquité était en bon état de fonctionnement, je l'ai d'abord fait fonctionner quelques secondes sans boîte de conserve. Voici l'enregistrement :
{% profile "ouvre-boites.json.gz" '{"name": "Fonctionnement à vide pendant quelques secondes", "range": "853m15371"}' %}

Un pic au démarrage, comme pour tous les moteurs électriques, ici d'un peu plus de {{ 100 | W }}. Ensuite une consommation à peu près stable, commençant à {{ 81.7 | W }} et décroissant lentement jusqu'à {{ 69.1 | W }} lorsque j'ai relâché le bouton au bout de 12 secondes.

### Pour ouvrir une boîte

Jour de fête pour les chats aujourd'hui, j'ai sorti du placard une boîte de pâtée :

{% image "./images/boite-conserve-ouverture-facile-cassee.jpg" "Boîte de pâtée pour chat dont l'ouverture facile est cassée" "512w" 512 %}

Comme l'anneau d'ouverture était cassé, c'était l'occasion idéale pour tester l'ouvre-boîtes électrique. Voyons maintenant combien cette ouverture a consommé :

{% profile "ouvre-boites.json.gz" '{"name": "Ouverture d\'une boîte de pâtée pour chat", "range": "178572m8466"}' %}

La puissance mesurée est ici nettement supérieure à celle mesurée à vide, ce qui s'explique par la résistance que le moteur rencontre en découpant le couvercle de la boîte. La consommation décroît de {{ 110 | W }} au démarrage à {{ 87.6 | W }} pendant les deux dernières secondes. La boîte offrait probablement moins de résistance à la coupe quand il ne restait plus que quelques millimètres de métal retenant le couvercle.

Ces puissances mesurées en fonctionnement sont toutes supérieures à la puissance de {{ 85 | W }} indiquée au dos de l'appareil :

{% image "./images/ouvre-boites-etiquette.jpg" "Etiquette de l'ouvre-boîtes Moulinex Type 343.2.00" "512w" 512 %}

Cette consommation supérieure à la valeur indiquée par le fabricant s'explique peut-être par un manque de l'entretien de l'appareil qui a plusieurs dizaines d'années. Affûter la lame et lubrifier les pièces qui frottent ferait peut-être baisser la consommation.

### Sur une minute

La puissance qui décroît continuellement au cours du fonctionnement sur les deux enregistrements précédents a attiré ma curiosité, et j'ai fait un test plus long pour mieux observer ce phénomène :
{% profile "ouvre-boites.json.gz" '{"name": "Fonctionnement à vide pendant une minute", "range": "569620m63436"}' %}

L'ouvre-boîtes a ici fonctionné à vide pendant une minute complète. La puissance mesurée initialement était de {{ 79.8 | W }}, et une minute plus tard elle n'était plus que de {{ 60.1 | W }}. Je n'ai pas l'explication de cette évolution, mais je suppose que le moteur qui chauffe au cours de son fonctionnement pourrait être la raison.

### Prix de revient
L'opération d'ouverture d'une boîte de pâtée a duré 6 secondes, pour une consommation électrique totale de {{ 0.19 | Wh }}. Le coût pour une boîte est négligeable : pour avoir dépensé un centime en électricité, il aurait fallu ouvrir {{ 0.19 | countPer€: 0.01 }} boîtes de pâtée ! C'est probablement à peu près le nombre de boîtes de conserve ouvertes en un an, et on peut donc estimer à un centime l'économie réalisée par an en utilisant un ouvre-boîtes manuel.

Sauf pour un cuisinier faisant un usage quasi industriel de son ouvre-boîtes, ou si le coût de l'électricité augmentait énormément, il est peu probable d'ouvrir assez de boîtes de conserve en une vie pour que le coût en électricité de l'utilisation de cet appareil dépassé l'euro symbolique que j'ai investi pour l'acquérir. Et si l'appareil a été acheté neuf, le coût de fonctionnement est une erreur d'arrondi comparé au prix d'achat.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet ouvre-boîtes, on pourrait :
- mesurer la consommation lors de l'ouverture de boîtes de conserve de différents diamètres.
- ré-affûter la lame de l'ouvre-boîte et lubrifier les pièces métalliques pour regarder si cela réduit sensiblement la consommation du moteur.
{% endplusloin %}
