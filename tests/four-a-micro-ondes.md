---
layout: test-layout.njk 
title: un four à micro-ondes
img: micro-ondes.jpg
date: 2024-03-26
tags: ['test']
---

Les fours à micro-ondes sont très présents dans nos cuisines. À quoi ressemblent leurs consommations ?
<!-- excerpt -->

## Le matériel
{% intro "micro-ondes.jpg" "Four à micro-ondes Thompson M2201G datant des années 90" %}

Le four à micro-ondes testé est un four Thompson M2201G datant des années 90. Il a bien vécu et bien voyagé : initialement acheté neuf pour ma grand-mère, j'en ai hérité et il m'a suivi dans 3 régions de France.

### Méthode de mesure

Le four à micro-ondes est branché sur une prise de courant de la cuisine. Le seul autre appareil alimenté par cette ligne électrique est le réfrigérateur.

{% post mesurer-la-consommation-avec-shelly-em Le tableau électrique contient un module Shelly Pro 3EM %} qui mesure (entre autre) la consommation sur la ligne dédiée à ces deux prises. Lorsque le moteur du frigo ne tourne pas, les mesures de consommations obtenues indiquent donc la consommation du four à micro-ondes.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation à la puissance maximale

Lorsqu'on est pressé de réchauffer un repas, on utilise presque toujours le four à micro-ondes à sa puissance maximale. Regardons un profil de ce cas d'usage :
{% profile "petit-dej.json.gz" '{"name": "Réglage « III » (max)", "range": "621162m186267"}' %}

Après 3 secondes pour démarrer, la puissance mesurée est stable (entre {{ 1410 | W }} et {{ 1450 | W }}) jusqu'à la fin du fonctionnement.

## Consommation en mode décongélation

Un autre mode fréquemment utilisé est la fonction décongélation, par exemple lorsqu'on vient de sortir une baguette du congélateur et qu'on n'a pas le temps d'attendre quelques heures qu'elle décongèle à température ambiante. Regardons comment le micro-ondes réduit sa puissance dans ce cas :
{% profile "micro-ondes.json.gz" '{"name": "Décongélation", "range": "114562m291240"}' %}

On voit sur le graphique que le four alterne maintenant de façon cyclique entre deux modes de fonctionnement. Soit il chauffe à puissance maximum pendant quelques secondes ; soit il ne chauffe pas du tout.

Chaque cycle dure 30 secondes. Lorsque le four ne chauffe pas, la puissance consommée n'est pas nulle : on voit ici la puissance médiane mesurée à {{ 52.2 | W }}. Cela s'explique car pendant ce temps, le plateau tournant continue sa rotation, l'intérieur du four reste éclairé, et un ventilateur continue de fonctionner.

Lorsque le four chauffe, on observe la même chose que lorsqu'il était réglé à sa puissance maximale, mais pendant seulement 5 secondes. On observe également le démarrage du chauffage qui prend environ 3 secondes à une puissance intermédiaire d'environ {{ 150 | W }}.

Le four chauffant 5 secondes toutes les 30 secondes, on s'attendrait à une puissance moyenne 6 fois inférieure à la puissance moyenne mesurée lorsque le four était réglé au maximum, soit environ {{ 230 | W }}, mais la puissance moyenne mesurée est de {{ 358 | W }}. Le programme décongélation a donc une efficacité énergétique inférieure à l'utilisation du four au maximum. Ce n'est pas étonnant puisqu'on a vu que la consommation n'était pas nulle pendant les périodes de non-chauffe, et augmentait pour chaque redémarrage du chauffage.

## Consommation des autres modes

Testons maintenant le comportement pour toutes les autres positions du bouton de réglage :

{% image "./images/micro-ondes-boutons.jpg" "Boutons de commandes du four à micro-ondes" "256w" 256 %}

### Force « I »
{% profile "micro-ondes.json.gz" '{"name": "Force « I »", "range": "5302864m123135"}' %}

À la force « I », le four chauffe 13 secondes toutes les 30 secondes. La puissance moyenne passe à {{ 716 | W }} (alors qu'on s'attendrait à {{ 1400 | divided_by: 30 | times: 13 | W }} — `1400 / 30 * 13`).

La puissance médiane ici mesurée à {{ 175 | W }} correspond à la puissance lorsque le four démarre la chauffe.

### Force « II »
{% profile "micro-ondes.json.gz" '{"name": "Force « II »", "range": "5889300m248363"}' %}

Ici, le four chauffe 20 secondes toutes les 30 secondes. On a donc une puissance de chauffe de {{ 1400 | divided_by: 30 | times: 20 | W }} (`1400 / 30 * 20`) pour une puissance moyenne mesurée à {{ 1002.5 | W }}.

### Puissance minimum

{% profile "micro-ondes.json.gz" '{"name": "Minimum", "range": "990044m59807"}' %}

À la puissance minimum, notre four ne chauffe plus que 3 secondes toutes les 30 secondes. On est donc à 10 % de la puissance de chauffe. La puissance médiane mesurée ({{ 51.7 | W }}) correspond maintenant à la puissance lorsque le four ne chauffe pas.

### Sans faire tourner le plateau

Voyons maintenant ce qu'il se passe si nous appuyons sur le bouton permettant de désactiver le plateau tournant :
{% profile "micro-ondes.json.gz" '{"name": "Minimum (plateau tournant désactivé)", "range": "1051975m123711"}' %}
La consommation médiane est descendue à {{ 49.6 | W }}. La baisse de consommation en désactivant la rotation du plateau n'est donc que de {{ 51.7 | minus: 49.6 | W }}. Le gros de la consommation lorsque le four ne chauffe pas ne vient donc pas du plateau tournant !

## Consommation sur l'année

Si l'on suppose que le four est utilisé quotidiennement pour un chauffage de 3 minutes et une décongélation de 5 minutes (soit les deux premiers profils de ce test), nous obtenons une consommation journalière de {{ 72.2 | plus: 28.8 | Wh€ }}, soit extrapolé sur un an, {{ 72.2 | plus: 28.8 | Wh€PerYear }}.

Ce four ayant 30 ans, il est possible que son coût de fonctionnement en consommation électrique approche maintenant de son prix d'achat neuf, même s'il était assez cher à l'époque.

## Conseils pour l’autoconsommation photovoltaïque

De par sa façon de baisser sa puissance en alternant entre chauffe maximum et non-chauffe, cet appareil est peu adapté à l'utilisation d'électricité photovoltaïque produite en début ou fin de journée quand la puissance de la production est limitée.

Pour réchauffer son repas de midi, aucun problème (s'il y a peu de nuages) mais pour préparer le petit-déjeuner ou le dîner, une grande partie de l'électricité utilisée par le four à micro-ondes risque de provenir du réseau électrique, même lorsque le four est utilisé à basse puissance.

{% plusloin %}
Pour mieux comprendre la consommation des fours à micro-ondes, il serait intéressant de :
- tester la fonction grill (elle n'a pas servi depuis tellement longtemps que je n'ai pas osé l'essayer, ça risquerait de sentir le brûlé !)
- tester un modèle plus récent pour voir s'il a un comportement similaire lorsque la puissance sélectionnée n'est pas le maximum.
- mesurer la consommation en veille d'un four plus moderne ayant de l'électronique avec notamment un affichage de l'heure.
- mesurer de combien la consommation diminue si on retire l'ampoule qui éclaire l'intérieur du four. Ce n'était pas un éclairage à LED à l'époque !
{% endplusloin %}
