---
layout: test-layout.njk 
title: un aspirateur d'atelier
img: aspirateur-karsher.jpg
date: 2024-04-11
tags: ['test']
---

Un aspirateur puissant pour nettoyer lors d'un chantier, ou pour le bricolage. À quoi ressemble sa consommation ?
<!-- excerpt -->

## Le matériel
<div id="Introduction">
<div>

Il s'agit ici d'un aspirateur Kärcher Eau et Poussières WD3 qui sert dans le garage, ou lors de travaux dans la maison.

Occasionnellement, il peut aussi aspirer de l'eau, par exemple pour dégivrer [un congélateur coffre](../congelateur/).

Pour le nettoyage du quotidien, [un robot](../roomba-i3-plus/) est plus efficace et moins bruyant.

### Méthode de mesure

L'aspirateur est branché sur [une prise connectée Shelly Plus PlugS]({{ '/posts/mesurer-la-consommation-avec-shelly-plus-plug-s/' | url }}) qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

</div>
{% image "./images/aspirateur-karsher.jpg" "Aspirateur Kärcher Eau et Poussières WD3" "512w" 512 %}
</div>

## Consommation

### Sur une minute

Voyons à quoi ressemble un profil de consommation. Ici l'aspirateur a été mis en marche, et a fonctionné à vide (il n'a aspiré que de l'air) pendant une minute.
{% profile "aspirateur-karsher.json.gz" '{"name": "Aspiration pendant une minute", "range": "m65286"}' %}

On observe un pic de consommation au démarrage. On s'y attendait, tous les moteurs électriques font ça. Ici la consommation mesurée au démarrage est de {{ 1789 | power }}. C'est la consommation maximale.

Ensuite, la consommation se stabilise à {{ 1180 | power }} (c'est la consommation médiane). Cette valeur est étonnamment élevée, pour un aspirateur dont la puissance indiquée sur l'étiquette est de "1000 W" :

{% image "./images/aspirateur-karsher-etiquette.jpg" "Etiquette de l'aspirateur Kärcher WD3" "512w" 512 %}

Lors de l'arrêt, la puissance diminue d'abord à {{ 866 | power }} pendant 2 secondes avant de devenir nulle :
{% profile "aspirateur-karsher.json.gz" '{"name": "Arrêt de l\'aspirateur", "range": "44648m20476"}' %}

Je ne connais pas l'explication de ce phénomène.

### Lorsque le tuyau est bouché

Cette fois ci, au cours du test j'ai bouché le tuyau une première fois pendant quelques secondes, puis 3 autres fois pendant des durées plus brèves, pour simuler ce qui se passe lorsqu'on aspire en conditions réelles et que l'aspirateur est parfois bloqué.
{% profile "aspirateur-karsher.json.gz" '{"name": "Aspiration avec le tuyau bouché", "range": "513798m21758"}' %}

Je m'attendais à ce que le moteur force et que la consommation augmente pendant ces périodes, mais en réalité il se passe le contraire : la consommation diminue quand il n'y a pas d'air qui passe dans le tuyau, avec une consommation minimale mesurée à {{ 981 | power }}.


<div id="plusloin">

## Pour aller plus loin

Pour comprendre de façon plus détaillée la consommation de cet aspirateur, on pourrait mesurer :
- la consommation lorsque le filtre est propre, ou très encrassé.
- l'évolution de la consommation pendant une longue période, quand le moteur chauffe.
- si l'aspiration de liquide ou de poussière a une influence sur la consommation (pour aspirer du liquide, il faut retirer le filtre en papier).
</div>
