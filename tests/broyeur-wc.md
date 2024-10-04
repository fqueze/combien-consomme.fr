---
layout: test-layout.njk 
title: un broyeur WC
img: broyeur-wc.jpg
date: 2024-07-14
tags: ['test']
---

Combien consomme l'utilisation d'un broyeur WC ? Consomme-t-il plus lorsqu'on ne s'en sert pas ?
<!-- excerpt -->

{% tldr %}
- Pour une utilisation typique par un foyer de deux personnes, la consommation annuelle d'électricité de ce broyeur sera de {{ 14.9 | Wh€PerYear }}.
- La consommation en attente représente {{ 0.435 | times: 24 | percent: 14.9 }} de la consommation totale.
- La consommation électrique lorsque la chasse est tirée ne représente pas un coût important. Il faut tirer {{ 0.505 | countPer€: 0.01 }} petites ou {{ 1.14 | countPer€: 0.01 }} grosses chasses d'eau pour dépenser un centime d'euro.
- La consommation électrique de ce broyeur est négligeable comparée à son coût d'achat.
{% endtldr %}

## Le matériel
{% intro "broyeur-wc.jpg" "Un broyeur WC compact Watermatic W30S" %}

Un [broyeur WC](https://fr.wiktionary.org/wiki/sanibroyeur) permet d'installer des sanitaires dans un espace réduit où il est impossible d'avoir un tuyau d'évacuation de gros diamètre. Il est par contre nécessaire d'avoir une alimentation électrique pour le faire fonctionner.

Le broyeur testé ici est le modèle W30S de la marque Watermatic, d'une puissance annoncée de {{ 500 | W }}.

### Méthode de mesure

Le broyeur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Voici une mesure de la consommation du broyeur sur une journée :
{% profile "broyeur-wc.json.gz" '{"name": "Consommation du broyeur pendant une journée", "range": "823602m86414944"}' %}

Sur cet enregistrement, on observe :
- plusieurs pics de consommation, correspondants à chaque utilisation.
- la consommation entre les utilisations est faible mais n'est pas nulle.

### En utilisation

Le broyeur peut être actionné par deux boutons de commande, contrôlant la quantité d'eau à utiliser pour évacuer le contenu de la cuvette. Le premier bouton avec une grosse goutte actionne une chasse d'eau de 4 litres ; le deuxième bouton avec une petite goutte actionne une chasse d'eau de 2 litres.

{% image "./images/broyeur-wc-boutons.jpg" "Photo montrant les deux boutons de commande du broyeur WC Watermatic W30S" "512w" 512 %}  

#### Programme « petite goutte »
{% profile "broyeur-wc.json.gz" '{"name": "Petite goutte", "range": "28994383m27056"}' %}

Lors d'une pression sur le bouton « petite goutte », la cuve se vide (on entend un moteur qui fonctionne pendant ce temps), puis pendant quelques secondes, la cuve se remplit d'eau, avant de se vider à nouveau pour finalement de se re-remplir partiellement.

Dans les moments où la cuve se vide, on observe une consommation dépassant {{ 200 | W }}, avec même un pic dépassant {{ 300 | W }} lors d'un démarrage de moteur. Je ne sais pas exactement à quoi correspond cette consommation, mais j'imagine qu'il y a un ou plusieurs moteurs qui rentrent en action pour pomper le contenu de la cuve, le broyer, et l'éjecter sous pression dans le tuyau d'évacuation.

Dans les moments où la cuve se remplit, la puissance mesurée est de {{ 8.5 | W }}. Peut-être y a-t-il une électrovanne qui consomme du courant pour laisser passer l'eau pendant le remplissage ?

La totalité de l'opération a consommé {{ 0.505 | Wh }}, il faudrait tirer la chasse « petite goutte » {{ 0.505 | countPer€: 0.01 }} fois pour dépenser un centime d'électricité.

#### Programme « grosse goutte »
{% profile "broyeur-wc.json.gz" '{"name": "Grosse goutte", "range": "33539485m54988"}' %}

Le fonctionnement lors du programme « grosse goutte » est très similaire à celui décrit précédemment, mais la cuve se remplit et se vide entièrement une fois de plus, ce qui porte la consommation totale de l'opération à {{ 1.14 | Wh }} (il faudrait tirer {{ 1.14 | countPer€: 0.01 }} grosses chasses d'eau pour dépenser un centime).

On observe cette fois-ci une puissance maximale de {{ 364 | W }}, ce qui reste loin de la puissance de {{ 520 | W }} indiquée sur l'étiquette :  
{% image "./images/broyeur-wc-etiquette.jpg" "Photo de l'étiquette montrant les catactéristiques techniques du broyeur Watermatic W30S" "512w" 512 %}  

### En attente

Voici un enregistrement pendant 8 heures où les WC n'ont pas été utilisés :
{% profile "broyeur-wc.json.gz" '{"name": "En attente", "range": "m28813408"}' %}

La consommation moyenne mesurée est de {{ 0.435 | W }}, ce qui correspond sur une journée complète à {{ 0.435 | W€PerDay }}. Pour que cette consommation  en attente soit inférieure à la consommation en utilisation, il faudrait tirer au moins {{ 0.435 | times: 24 | divided_by: 0.505 | round }} chasses « petite goutte » ou {{ 0.435 | times: 24 | divided_by: 1.14 | round }} chasses « grosse goutte ».

### Sur un an

Sur le profil du broyeur sur une journée complète, il avait été utilisé 6 fois (2 chasses « grosse goutte » et 4 chasses « petite goutte »), ce qui semble correspondre à un usage normal pour un logement où vivent deux personnes. La consommation totale dans la journée était de {{ 14.9 | Wh€ }}, dont {{ 0.435 | times: 24 | Wh }} ({{ 0.435 | times: 24 | percent: 14.9 }}) pour la consommation en attente.

Si on extrapole la consommation à toute une année, {{ 14.9 | Wh€PerYear }} seront consommés. C'est négligeable comparé à l'investissement pour l'installation d'un tel broyeur (dont le prix public hors pose est d'environ 1000 €).

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce broyeur, on pourrait :
- essayer de broyer des matières plus ou moins dures pour voir quel impact cela aurait sur la puissance consommée par le moteur. Est-il possible d'atteindre la puissance maximale indiquée sur l'étiquette ?
- comparer la consommation d'eau à la consommation d'eau de WC classiques, pour essayer d'estimer le bilan financier total. Une fois l'investissement initial passé, l'utilisation de ce broyeur est-elle plus économique ?
{% endplusloin %}
