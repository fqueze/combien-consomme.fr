---
layout: test-layout.njk 
title: une meuleuse d'angle pour couper du carrelage
img: meuleuse.jpg
date: 2024-04-28
tags: ['test']
---

Quelle est la consommation d'une meuleuse d'angle pour couper un morceau de carrelage ? Sauf si on fait régulièrement des travaux de carrelage, c'est une opération peu fréquente ; mais combien ça consomme ?
<!-- excerpt -->

## Le matériel
{% intro "meuleuse.jpg" "Photo de la meuleuse, à côté d'un étau contenant un morceau de carrelage" %}

Il s'agit ici d'une meuleuse d'angle Parkside PWS 125 B2, d'une puissance de 1200 W.

Un modèle pas très cher, acheté d'occasion pour presque rien, car je n'en ai que très rarement l'usage.

Elle m'a servi une fois pour faire une saignée dans un mur en briques pour y installer une gaine électrique, et elle vient de servir à nouveau pour découper deux petits morceaux de carrelage de la salle de bain.

### Méthode de mesure

La meuleuse est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur un morceau de carrelage

Étant en train de rénover l'installation électrique de la salle de bain, j'ai fait de nouveaux trous dans le mur pour y placer des boîtes d'encastrement. Je souhaite reboucher deux trous laissés par la dépose de l'ancienne installation électrique en retaillant des morceaux de carrelage récupérés lors de la création des nouveaux trous. J'utilise pour ça une meuleuse d'angle. Voyons à quoi ressemble un profil de consommation lors de la découpe d'un morceau de carrelage mural de 6 cm :
{% profile "meuleuse.json.gz" '{"name": "Consommation pendant la découpe d\'un morceau de carrelage de 6 cm", "range": "16898m381994"}' %}

On voit bien ici que je m'y suis repris à plusieurs fois (11 !) pour cette découpe. J'ai fait de nombreuses pauses pour voir le résultat de ce que j'avais fait, et aussi parfois pour remettre en place le morceau de carrelage qui avait tendance à bouger dans l'étau. Avec plus d'expérience dans le maniement de cet outil, je pourrais être plus efficace.

Pour chacune de ces brèves utilisations de la meuleuse, on observe d'abord un petit pic de démarrage (il est probablement en réalité beaucoup plus gros, et effacé la plupart du temps par la méthode de mesure qui ne prend qu'un échantillon par seconde), suivi d'un plateau, et parfois d'une augmentation de la puissance qui correspond probablement aux moments où j'étais réellement en train de mettre le disque au contact du carrelage et d'appuyer, faisant faire un effort un peu plus important au moteur pour conserver une vitesse de rotation constante.


### Sur une deuxième coupe plus courte

Cette fois ci, j'ai coupé un morceau qui ne faisait que 2 cm de large :

{% image "./images/meuleuse-carrelage.jpg" "Meuleuse d'angle à côté d'un morceau de carrelage déjà couper, et d'un deuxième plus étroit dans l'étau" "512w" 512 %}

Voici le profil :

{% profile "meuleuse.json.gz" '{"name": "Coupe plus courte", "range": "474347m139907"}' %}

La durée totale de la coupe est nettement plus courte, ce qui n'est pas une surprise puisqu'il y avait moins de matière à découper.

Le pic de démarrage est plus visible ici, et la consommation maximale mesurée ({{ 1268.7 | W }}) est très proche de la puissance indiquée sur l'étiquette :

{% image "./images/meuleuse-etiquette.jpg" "Etiquette de la meuleuse d'angle Parkside PWS 125 B2" "512w" 512 %}


### À vide

Avant de commencer mes coupes, j'ai d'abord allumé pendant un bref instant la meuleuse pour vérifier qu'elle était bien branchée, et qu'elle fonctionnait correctement. Bien sûr, ça se voit sur mon enregistrement !

Par curiosité, regardons donc ce qui se passe quand la meuleuse tourne à vide sans rien couper :

{% profile "meuleuse.json.gz" '{"name": "Fonctionnement à vide de la meuleuse", "range": "3898m8898"}' %}

Comme sur d'autres appareils à moteur électrique déjà testés ({% test tondeuse-a-gazon tondeuse %}, {% test aspirateur-atelier aspirateur %}), on observe qu'il y a un palier dans la diminution de la puissance consommée lors de l'arrêt du moteur.

### Au total

{% profile "meuleuse.json.gz" '{"name": "Coupe plus courte"}' %}

La totalité de l'opération, avant de remettre ma meuleuse dans son placard, a duré une dizaine de minutes, et consommé {{ 74.2 | Wh€ }}. Même si je l'ai achetée d'occasion pour une somme modique, cette meuleuse ne me coutera probablement jamais plus que son prix d'achat en consommation électrique.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette meuleuse, on pourrait :
- comparer la consommation lors de la découpe de différents matériaux.
- mesurer sur une durée d'utilisation plus longue pour voir si la puissance consommée évolue lorsque le moteur chauffe.
- tester différent types de disques pour voir si l'utilisation d'un disque plus adapté au matériau permet de réduire significativement la consommation.
{% endplusloin %}
