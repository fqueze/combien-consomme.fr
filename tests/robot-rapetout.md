---
layout: test-layout.njk 
title: un robot Rapetout
img: robot-rapetout.jpg
date: 2024-09-17
tags: ['test']
---

Le robot « Rapetout », tout droit sorti des années 90, permet de râper des aliments directement au dessus de l'assiette. Combien consomme ce râpage au plus près de l'assiette ?

<!-- excerpt -->

{% tldr %}
- Râper 5 carottes consomme {{ 1.62 | Wh }} d'électricité.
- Il faudrait râper {{ 1.62 | divided_by: 5 | countPer€: 0.01 }} carottes pour dépenser un centime d'électricité.
- La puissance mesurée en fonctionnement est 2 à 3 fois supérieure à la puissance de {{ 25 | W }} indiquée sous l'appareil.
- Pas d'électronique, pas de consommation au repos.
{% endtldr %}

## Le matériel
{% intro "robot-rapetout.jpg" "Un robot râpetout" %}

Contrairement aux robots de cuisine qui encombrent le plan de travail lorsqu'on ne s'en sert pas, le robot Rapetout est très compact. On peut le tenir à la main au dessus d'une assiette ou d'un saladier dans lequel on râpe les aliments.

C'est la version électrique des râpes à manivelle qu'on trouvait fréquemment dans les cuisines de nos grand-mères.

Le carton indiquait « RAPETOUT Pour tout râper, tout émincer directement dans l’assiette. » et précisait que ce robot était fourni avec deux disques différents :
- un « disque râpeur : pour râper carottes, gruyère »
- un « disque éminceur : pour émincer concombre, pommes de terre »

### Méthode de mesure

Le robot Rapetout est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Les inscriptions sous le manche du robot indiquent une puissance de {{ 25 | W }} :  
{% image "./images/robot-rapetout-etiquette.jpg" "Inscriptions sous le robot Rapetout, indiquant 25W" "800w" 800 %}  
Notre test permettra de vérifier si c'est bien la puissance que nous mesurons.

#### Carottes râpées

Pour notre test, nous allons aujourd'hui utiliser ce robot pour râper quelques carottes :  
{% image "./images/robot-rapetout-carottes.jpg" "Le robot Rapetout à côté d'un saladier vide et de 5 carottes épluchées prêtes à râper" "500w" 500 %}

Voici l'enregistrement :
{% profile "robot-rapetout.json.gz" '{"name":"Râper 5 carottes","range":"3568m208096"}' %}

On observe sur le graphique que de l'électricité est consommée plusieurs fois pendant une vingtaine de secondes, avec des pauses de 10 à 15 secondes correspondant aux moments où il a fallu recharger en morceaux de carottes l'entrée de l'appareil.

L'opération a duré au total un peu plus de 3 minutes ; ce n'est pas très rapide, comparé à d'autres robots plus imposants, mais le résultat est là :  
{% image "./images/robot-rapetout-carottes-rapees.jpg" "Le même saladier rempli de carottes râpées" "500w" 500 %}

Pour râper les 5 carottes, le robot a consommé {{ 1.62 | Wh }}. Comme c'est une quantité d'énergie assez faible, pour se faire une idée du coût en électricité, regardons plutôt les choses à l'envers : il faudrait râper {{ 1.62 | divided_by: 5 | countPer€: 0.01 }} carottes pour dépenser un centime d'électricité. Le coût de l'électricité est donc négligeable comparé au coût des ingrédient dans la préparation de ce plat de crudités.

#### Puissances mesurées

Une surprise sur l'enregistrement est la différence entre les puissances mesurées et la puissance indiquée sous l'appareil : la puissance maximum relevée est de {{ 88.4 | W }}, soit plus de  {{ 88.4 | divided_by: 25 | floor }} fois la puissance indiquée sous l'appareil !

La puissance n'est pas constante au cours du temps, on devine que la puissance consommée varie en fonction de la résistance rencontrée pour faire tourner le disque face aux carottes, et donc que lorsque plus de morceaux de carottes sont présentés simultanément, la puissance mesurée augmente.

La puissance moyenne en fonctionnement ({{ 46.8 | W }}) est presque {{ 46.8 | divided_by: 25 | round }} fois supérieure à la puissance indiquée.

Même la puissance moyenne sur l'ensemble de la mesure ({{ 28.1 | W }}), qui est nettement plus basse puisqu'elle prend en compte les nombreuses pauses dans le fonctionnement du moteur, est supérieure à la puissance nominale.

La puissance au repos est nulle, le robot ne contenant pas d'électronique, il n'y a aucune consommation lorsqu'on ne l'utilise pas, même si on oublie de le débrancher.

#### Consommation à vide

Voici un enregistrement du robot fonctionnant quelque secondes à vide :
{% profile "robot-rapetout.json.gz" '{"name":"Fonctionnement à vide","range":"225715m41932"}' %}

Pendant que le moteur tournait, la puissance ici mesurée était d'environ {{ 20 | W }}. Enfin une puissance qui ne dépasse pas la puissance indiquée sous l'appareil !   

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet robot Rapetout, on pourrait :
- mesurer la consommation pour râper différents types d'aliments (fromage, céleri, ...) ;
- mesurer la consommation avec le disque servant à émincer des concombres ;
- comparer la consommation lorsqu'on insère un seul morceau de carotte ou plusieurs simultanément. Le gain de temps lorsqu'on en râpe plusieurs simultanément est-il aussi une économie d'énergie ?
- comparer avec {% test moulinex-fresh-express un découpe-légumes plus récent %}.
{% endplusloin %}
