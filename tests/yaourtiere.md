---
layout: test-layout.njk 
title: une yaourtière
img: yaourtiere.jpg
date: 2024-05-19
tags: ['test']
---

Faire ses yaourts soi-même c'est sympa, mais on se demande souvent si c'est rentable financièrement. On peut facilement comparer les prix des yaourts et du lait, mais qu'en est-il de la consommation électrique de la yaourtière ?
<!-- excerpt -->

{% tldr %}
La consommation électrique de la cuisson d'une fournée de yaourts ne coûte que quelques centimes, et est proportionnelle à la durée de cuisson : {{ 119 | Wh€ }} pour 8h, {{ 147 | Wh€ }} pour 10h, {{ 178 | Wh€ }} pour 12h.

La yaourtière continue de consommer de l'électricité quand elle a fini la cuisson, mais cette consommation est très faible. Il faudrait laisser la yaourtière branchée {{ 0.0902 | divided_by: 3 | countPer€: 0.01 | divided_by: 24 | round }} jours pour dépenser 1 centime d'électricité.

Le facteur principal pour décider s'il est rentable de faire ses yaourts soi-même est le prix d'achat du lait comparé au prix d'achat des yaourts déjà faits.
{% endtldr %}

## Le matériel
{% intro "yaourtiere.jpg" "Yaourtière Seb Classic" %}

Il s'agit ici d'une yaourtière SEB Classic YG100100.

Elle permet de faire 7 délicieux yaourts de 125g en une fournée, ce qui correspond à un litre de lait dans lequel est dilué un yaourt de 125g servant de ferment.

Pour cela, elle dispose de trois programmes automatiques dont la sélection est indiquée par un voyant lumineux.

### Méthode de mesure

La yaourtière est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur une nuit

La yaourtière démarre dès qu'on la branche, et lorsqu'on revient le lendemain matin, les yaourts sont prêts :

{% image "./images/yaourtiere-fini.jpg" "Yaourts finis" "512w" 512 %}

On observe un peu de condensation sur le couvercle de la yaourtière, et il n'y a plus de témoin allumé.

Regardons un profil de la consommation sur la nuit :
{% profile "yaourts-10h.json.gz" '{"name": "Yaourtière mesurée pendant une nuit, programme 10h"}' %}

On voit que la yaourtière a chauffé pendant 10 heures, ce qui est le programme que l'on obtient si on ne règle rien. Ensuite, il reste une petite consommation jusqu'à ce qu'on débranche la prise.

Zoom sur la cuisson :

{% profile "yaourts-10h.json.gz" '{"name": "Yaourts cuits pendant 10h", "range": "355182m36080597"}' %}

On observe une consommation assez uniforme, d'une puissance proche de {{ 15 | W }}. C'est un peu plus que les {{ 13 | W }} indiqués sur l'étiquette :

{% image "./images/yaourtiere-etiquette.jpg" "Etiquette de la yaourtière SEB Classic YG100100" "512w" 512 %}

### Programme de 8 heures

Cette yaourtière permet de sélectionner la durée de cuisson des yaourts, avec 3 programmes d'une durée variant de 8 à 12 heures. Une cuisson plus courte permet d'obtenir des yaourts plus doux mais plus liquides. Une cuisson plus longue permet d'obtenir des yaourts plus solides, mais aussi plus acides.

L'unique bouton présent sur le devant de l'appareil permet de sélectionner le programme :

{% image "./images/yaourtiere-reglages.jpg" "Boutons de la yaourtière" "512w" 512 %}

Par défaut, le programme sélectionné est le programme intermédiaire de 10 heures. Regardons un profil d'une cuisson de 8 heures :

{% profile "yaourts-8h.json.gz" '{"name": "Yaourts cuits pendant 8h", "range": "82455m28859289"}' %}

### Programme de 12 heures

{% profile "yaourts-12h.json.gz" '{"name": "Yaourts cuits pendant 12h", "range": "89817m43208672"}' %}

Une cuisson de 12 heures consomme {{ 178 | Wh }}, ce qui est très proche de ce qu'on aurait obtenu en multipliant la consommation d'une cuisson de 8h ({{ 119 | Wh }}) par 1,5 ({{ 119 | times: 1.5 | Wh }}). Cela confirme que la consommation est proportionnelle au temps de cuisson.

### Lorsque la cuisson est finie

Comme déjà mentionné, lorsque la cuisson est terminée, la consommation de la yaourtière ne tombe pas à zéro. Même si c'est contre intuitif car les voyants sont tous éteints, il reste probablement un peu d'électronique sous tension pour mémoriser que le programme est terminé. Zoomons sur cette partie de l'enregistrement :

{% profile "yaourts-8h.json.gz" '{"name": "3 heures qui suivent la cuisson", "range": "28996713m10801620"}' %}

{% comment %}
{% profile "yaourts-10h.json.gz" '{"name": "2 heures qui suivent la cuisson", "range": "36465377m7222040"}' %}
{% endcomment %}

La puissance consommée est trop faible pour être mesurée de façon fiable parla prise connectée Shelly, et l'enregistrement indique donc une alternance entre des valeurs à 0 et des valeurs à {{ 0.1 | W }}. La consommation moyenne sur cette période est de {{ 0.0301 | W }}. C'est trop faible pour convertir le coût de cette consommation en euros ou même en centimes d'euros.

Pour se donner une idée, pour dépenser 1 centime d'euro en électricité en laissant branchée la yaourtière à la fin de la cuisson, il faudrait la laisser branchée {{ 0.0902 | divided_by: 3 | countPer€: 0.01 | divided_by: 24 | round }} jours ! Dit autrement, si elle ne sert qu'une fois et reste branchée ensuite toute l'année, la consommation annuelle sera de {{ 0.0902 | times: 8 | Wh€PerYear }}.

## Rentabilité

La consommation électrique par yaourt est respectivement de {{ 119 | divided_by: 7 | Wh€ }}, {{ 147 | divided_by: 7 | Wh€ }} ou {{ 179 | divided_by: 7 | Wh€ }} pour une durée de cuisson de 8, 10 ou 12 heures.

À notre enseigne de courses habituelles, le litre de lait entier est actuellement affiché à {{ 1.13 | € }}, ce qui coûte donc {{ 1.13 | divided_by: 7 | € }} par yaourt produit. C'est beaucoup plus que le coût de l'électricité !

Note : les calculs de cette section ont été faits en divisant les coûts par 7 car 7 yaourts sont produits, mais comme on a utilisé un yaourt existant pour servir de base, il pourrait aussi être pertinent de diviser par 6 plutôt que par 7, car à la fin de l'opération il n'y a que 6 yaourts de plus qu'au début.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une yaourtière, on pourrait :
- utiliser un appareil de mesure plus précis pour enregistrer la consommation à la fin de la cuisson.
- tester d'autres modèles de yaourtière plus modernes pour voir si certains disposent d'un thermostat qui causerait une variation de la consommation en fonction de la température ambiante de la pièce.
{% endplusloin %}
