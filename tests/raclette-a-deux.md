---
layout: test-layout.njk 
title: une raclette à deux
img: raclette-a-deux.jpg
date: 2024-12-08
tags: ['test']
---

Avec les fraiches soirées d'hiver revient l'envie d'une soirée raclette... combien consomme l'appareil qui trône au centre de notre table lors de ces soirées fromagées ?
<!-- excerpt -->

{% tldr %}
- Une soirée raclette de 50 minutes consomme {{ 254 | Wh€ }} avec cet appareil de {{ 300 | W }}.
- {{ 254 | divided_by: 20 | Wh€ }} consommés en moyenne par tranche de fromage.
- Utiliser les deux poêlons simultanément et cuire d'autres aliments sur la plaque du dessus améliore l'efficacité énergétique, la consommation étant proportionnelle à la durée d'utilisation de l'appareil.
- {{ 254 | countPer€: 20 }} soirées raclette ({{ 254 | divided_by: 20 | countPer€: 20 }} tranches de fromage !) seraient nécessaires pour dépenser autant en électricité que le prix d'achat de l'appareil.

{% endtldr %}

## Le matériel
{% intro "raclette-a-deux.jpg" "Une raclette à deux" %}

Le modèle « Raclette Duo Multiplug Green » de la marque « Essentiel B » a été testé.

Disposant uniquement de deux poêlons, il est destiné aux raclettes en amoureux. Pour les grandes tablées, il est possible de chaîner jusqu'à 6 appareils identiques afin de pouvoir chauffer jusqu'à 12 tranches de fromage simultanément.

### Méthode de mesure

L'appareil à raclette est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Procédons maintenant au test de l'appareil :  
{% image "./images/raclette-a-deux-cuisson-2-tranches.jpg" "Appareil à raclette chargé avec une tranche de fromage dans chacun des poêlons" "500w" 500 %}

### Consommation pour une paire de tranches

Deux tranches de fromages sont chargées dans les poêlons, l'appareil est allumé, regardons combien d'électricité il nous faudra consommer avant de passer à la première étape de notre dégustation :

{% profile "raclette-a-deux.json.gz" '{"name": "Cuisson des deux premières tranches", "range": "m494299"}' %}

{% image "./images/raclette-a-deux-une-tranche-cuite.jpg" "un poêlon contenant une tranche de fromage à raclette bien fondue qui fait des bulles" "500w" 500 %}  
Prêt à déguster ! La cuisson des deux premières tranches a pris un peu plus de 8 minutes, et consommé {{ 41.7 | Wh€ }}.

La consommation mesurée, {{ 305 | W }} en moyenne, est légèrement supérieure aux {{ 300 | W }} indiqués sur l'étiquette :  
{% image "./images/raclette-a-deux-etiquette.jpg" "Étiquette de l'appareil essentiel b Raclette Duo Multiplug Green indiquant une puissance de 300W et une puissance totale de 1800W" "500w" 500 %}

L'indication « Psum = 1800 W » correspond à la puissance maximale que l'appareil peut supporter lorsqu'il est chaîné à d'autres appareils du même modèle.

La consommation est stable au cours du temps, et est probablement causée quasi exclusivement par la résistance, qui transforme l'électricité en chaleur. Il y a également une petite ampoule dans l'interrupteur qui indique que l'appareil est allumé, mais sa consommation est probablement négligeable. La consommation est légèrement plus élevée au début (>&nbsp;{{ 310 | W }} pendant la première minute ; maximale mesurée à {{ 315 | W }}).

Continuons :
{% profile "raclette-a-deux.json.gz" '{"name": "Cuisson de la 2ième paire de tranches", "range": "494299m390616"}' %}

La cuisson des deux tranches suivantes a pris moins longtemps et donc consommé moins ({{ 33.0 | Wh€ }}). On se doute que c'est car l'appareil était déjà chaud lorsque les tranches de fromage y ont été insérées, alors qu'il lui a fallu le temps de chauffer pour les premières tranches. 

{% profile "raclette-a-deux.json.gz" '{"name": "Cuisson de la 3ième paire de tranches", "range": "884914m286935"}' %}

La troisième paire de tranches de fromage a également fondu plus vite que la deuxième, et donc consommé moins : {{ 24.3 | Wh€ }}.

Pendant que le fromage fond, on peut également cuire autre chose (ici du bacon) sur le dessus sans consommer plus :  
{% image "./images/raclette-a-deux-bacon.jpg" "Une tranche de bacon en train de cuire sur le dessus de l'appareil à raclette" "500w" 500 %}

### Consommation pour une soirée raclette

Les estomacs sont pleins, l'assiette de fromage, initialement bien garnie, est maintenant vide.  
{% image "./images/raclette-a-deux-assiette-fromage.jpg" "Assiette garnie de tranches de divers types de fromage à raclette" "500w" 500 %}

Combien d'électricité avons nous consommé pendant cette soirée ?
{% profile "raclette-a-deux.json.gz" '{"name": "Consommation pendant la totalité du repas", "range": ""}' %}

La forme de l'enregistrement de la puissance consommée est presque un rectangle, la consommation électrique est donc directement proportionnelle au temps pendant lequel l'appareil à raclette reste allumé.

Sur tout le repas, qui a duré un peu moins de 50 minutes, nous avons donc consommé {{ 254 | Wh€ }} pour faire fondre notre fromage.

Si l'on suppose un temps moyen de 5 minutes pour que le fromage soit prêt, on peut déduire qu'environ 20 tranches de fromage ont été consommées pendant ce repas, ce qui correspond approximativement au nombre de tranches visibles sur l'assiette. La consommation électrique par tranche de fromage est donc environ {{ 254 | divided_by: 20 | Wh€ }}.

En réalité, il y a eu un peu moins de 20 tranches car l'un des convive a déclaré forfait avant l'épuisement des victuailles, et les dernières tranches de fromage ont été chauffées une par une plutôt que 2 par deux, ce qui a doublé la consommation électrique pour ces dernières tranches.

### Pour amortir l'appareil

Si l'on suppose un prix d'achat neuf de 20 euros pour cet appareil, il faudra {{ 254 | countPer€: 20 }} soirées raclette pour dépenser autant en électricité. Cela correspond à {{ 254 | divided_by: 20 | countPer€: 20 }} tranches de fromage fondues. Gare à la prise de poids !

Evidemment, le budget fromage sera très supérieur au budget électricité.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette raclette à deux, on pourrait :
- comparer la durée nécessaire pour faire chauffer différents types de fromage ;
- mesurer le temps nécessaire pour préparer des tranches à température ambiante, sorties du frigo, ou sorties du congélateur ;
- mesurer la consommation d'énergie nécessaire pour la cuisson des pommes de terre qui accompagnent le fromage dans nos assiettes ;
- tester un appareil à raclette avec plus de poêlons et comparer la consommation électrique par tranche ;
- comparer avec d'autres appareils de cuisson conviviale comme {% test soiree-gaufres un gaufrier %} ou une crêpière.
{% endplusloin %}
