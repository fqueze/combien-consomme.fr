---
layout: test-layout.njk 
title: une yaourtière SEB Multi delices
img: yaourtiere-seb-multi-delices.jpg
date: 2025-04-19
tags: ['test']
---

Fini les yaourtières de grand-mère qui ne contenaient qu'une simple résistance, place au modèle électronique du 21ième siècle ! Cela change-t-il la quantité d'énergie consommée pour faire des yaourts ?
<!-- excerpt -->

{% tldr %}
- La cuisson de 6 yaourts pendant 12 heures consomme {{ 268 | Wh€ }}.

- {{ 268 | Wh€PerYear }} seront consommés par an pour produire des yaourts tous les jours ; {{ 268 | times: 52 | Wh€ }} pour en produire une fois par semaine.

- La yaourtière consomme {{ 0.211 | W }} lorsqu'elle reste branchée sans être utilisée, ce qui représente {{ 0.211 | W€PerYear }} par an si elle n'est jamais utilisée, {{ 0.211 | times: 12 | percent: 268 }} de la consommation totale si elle sert tous les jours, et {{ 0.211 | times: 12 | times: 13 | percent: 268 }} si elle sert une fois par semaine. La débrancher est utile si elle sert rarement.

- La puissance mesurée alterne entre plus de {{ 450 | W }} et une très faible puissance, rendant cette yaourtière peu adaptée à la maximisation de l'autoconsommation photovoltaïque, qui sera plus facile avec {% test yaourtiere une yaourtière plus classique %}.
{% endtldr %}

## Le matériel
{% intro "yaourtiere-seb-multi-delices.jpg" "Une yaourtière SEB Multi delices" %}

Il s’agit ici d’une yaourtière SEB Multi delices YG654 de 6 pots, proposant 5 programmes permettant la confection de différents types de desserts.

C'est un modèle de conception plus récente que la {% test yaourtiere yaourtière SEB Classic %} précédemment testée. Le haut de gamme de la yaourtière !

### Méthode de mesure

La yaourtière est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Commençons par regarder les indications sous la yaourtière :  
{% image "./images/yaourtiere-seb-multi-delices-etiquette.jpg" "Type YG654 220-240V 50-60Hz 450W" "500w" 500 %}

L'inscription « 450W » nous indique la puissance de cette yaourtière. On peut supposer qu'il s'agit de la puissance maximale, car si la yaourtière chauffait de façon prolongée avec une telle puissance, le lait des yaourts arriverait rapidement à ébullition et sortirait des pots.

Pour se rendre compte de la consommation réelle, nous allons donc mesurer. Cette yaourtière dispose de 5 programmes :  
{% image "./images/yaourtiere-seb-multi-delices-programmes.jpg" "Photo de la façade de la yaourtière montrant le nom du modèle, les 5 programmes possibles, le bouton de mise ne marche et selection du programme et l'afficheur" "600w" 600 %}
- P1 — yaourts express
- P2 — yaourts
- P3 — faisselles
- P4 — desserts lactés
- P5 — desserts moelleux

Pour les programmes P1, P4 et P5, il faut ajouter de l'eau au fond de la cuve. Celle-ci sera probablement portée à ébullition pour faire de la vapeur autour des pots. Pour les programmes P2 et P3, il n'est pas nécessaire d'ajouter d'eau, la yaourtière chauffera uniquement les pots.

### Consommation pour faire 6 yaourts

Notre test sera réalisé avec le programme « P2 yaourts », probablement le plus courant. Pour chacun des programmes, la durée est réglable. Une cuisson plus courte permet d'obtenir des yaourts plus doux mais plus liquides. Une cuisson plus longue permet d'obtenir des yaourts plus solides, mais aussi plus acides. La durée par défaut pour des yaourts est de 8h. Pour ce test, nous la porterons à 12h.

Voici l'enregistrement de la consommation de la yaourtière pendant ces 12 heures :
{% profile "yaourtiere-seb-multi-delices.json.gz" '{"name":"Programme yaourts — 12h","range":"m43207704"}' %}

La puissance moyenne, mesurée à {{ 22.3 | W }}, est supérieure de {{ 22.3 | percentMore: 14.8 }} à la consommation moyenne mesurée à {{ 14.8 | W }} pour faire des yaourts en 12 heures avec {% test yaourtiere la yaourtière SEB Classic %}.

#### Rentabilité

La consommation totale, {{ 268 | Wh€ }}, représente un faible coût en électricité comparé au coût du lait qui aura été mis dans les yaourts. En effet, la consommation électrique par yaourt est de {{ 268 | divided_by: 6 | Wh€ }} pour une durée de cuisson de 12 heures.

À notre enseigne de courses habituelles, le litre de lait entier est actuellement affiché à {{ 1.13 | € }}, ce qui coûte donc {{ 1.13 | divided_by: 6 | € }} par yaourt produit. C'est beaucoup plus !

Note : ces calculs été faits en divisant les coûts par 6 car 6 yaourts sont produits, mais comme on a utilisé un yaourt existant pour servir de base, il pourrait aussi être pertinent de diviser par 5 plutôt que par 6, car à la fin de l'opération il n'y a que 5 yaourts de plus qu'au début.

#### Chauffage intermittent

On remarque une alternance entre des moments où la consommation est très faible et des moments où la consommation est nettement plus élevée. La puissance maximale mesurée, {{ 480 | W }}, est nettement supérieure aux {{ 450 | W }} indiqués sous l'appareil.

La consommation élevée étant très vraisemblablement causée par une résistance utilisée pour chauffer, on peut supposer que la puissance exacte consommée par cette résistance dépend de la tension du courant du secteur, qui n'est pas parfaitement stable (pendant la durée du test, la tension mesurée a varié entre {{ 232 | V }} et {{ 239 | V }}).

L'alternance entre consommation élevée ou faible est probablement causée par la présence d'un thermostat qui arrête la résistance lorsque la température désirée est atteinte, et la rallume lorsque la température diminue. On entend d'ailleurs des claquements de relai pendant le fonctionnement de la yaourtière, qui confirment cette hypothèse.

#### Début du cycle

Zoomons maintenant sur le début du cycle pour regarder de façon plus détaillée le fonctionnement.
{% profile "yaourtiere-seb-multi-delices.json.gz" '{"name":"Zoom sur les 30 premières minutes","range":"m1800285"}' %}

La puissance moyenne sur la première demi-heure du cycle, {{ 56.6 | W }}, est très supérieure à la puissance moyenne sur la totalité du cycle. Cela s'explique car la yaourtière commence par chauffer en continu pendant 1 minute 40. Elle alterne ensuite entre des périodes de chauffe d'environ 30 secondes et des pauses d'un peu plus de 5 minutes. Ces durées ne sont pas parfaitement régulières, confirmant que l'allumage de la résistance est contrôlé par un thermostat plutôt que par une minuterie.

#### Changement après 1 heure 30

Avec un zoom arrière pour regarder les 3 premières heures, on constate que le rythme de chauffe change au bout d'environ 1 heure 30 :
{% profile "yaourtiere-seb-multi-delices.json.gz" '{"name":"Zoom sur les 3 premières heures","range":"m10801926"}' %}

On peut supposer qu'il y a un changement de la température de consigne du thermostat après 1 heure 30. En effet, la résistance ne chauffe plus qu'environ 30 secondes toutes les 12 minutes, avec une consommation moyenne d'environ {{ 20 | W }}. Pour comparaison, la puissance moyenne avant ce changement était comprise entre 35 et {{ 40 | W }} après la première période de chauffe initiale. 

### Consommation de l'électronique entre les périodes de chauffe

Lorsque la consommation est faible pendant la confection des yaourts, il ne reste que la consommation de l'électronique, utilisée entre autre pour alimenter l'afficheur indiquant le temps restant :  
{% image "./images/yaourtiere-seb-multi-delices-afficheur.jpg" "Photo en gros plan sur l'afficheur qui indique un temps restant de 44 min" "500w" 500 %}

Zoomons sur une de ces périodes dans l'enregistrement :  
{% profile "yaourtiere-seb-multi-delices.json.gz" '{"name":"Entre les périodes de chauffe","range":"40447022m671623"}' %}

Les alternances entre des mesures de consommation à {{ 0 | W }} et des mesures à une valeur non nulle inférieure à {{ 0.5 | W }} sont probablement dues à la limite de précision de l'appareil de mesure utilisé, et donc non significative. On peut cependant relever la puissance moyenne : {{ 0.214 | W }}.

### Consommation en veille

Regardons maintenant la consommation de la yaourtière après la fin de la cuisson des yaourts :
{% profile "yaourtiere-seb-multi-delices.json.gz" '{"name":"Yaourtière en veille pendant 2 heures","range":"43140610m7178920"}' %}

La puissance moyenne en veille relevée à {{ 0.211 | W }} est très proche de la moyenne relevée précédemment entre les périodes de chauffe. On peut supposer que cette consommation en veille est due aux pertes dans la conversion du courant alternatif du secteur en courant continu de faible tension utilisé pour alimenter l'électronique, qui reste sous tension tout le temps. L'électronique elle-même et l'afficheur ont probablement des consommations très faibles.

Si cette yaourtière reste branchée en permanence sans jamais être utilisée, sa consommation en veille représentera 1 centime tous les {{ 0.211 | times: 12 | countPer€: 0.01 }} jours, ou {{ 0.211 | W€PerMonth }} par mois — {{ 0.211 | W€PerYear }} par an.

### Consommation annuelle

Pour une famille consommant beaucoup de yaourts, qui utiliserait la yaourtière tous les jours, {{ 268 | Wh€PerYear }} seront consommés par an pour la cuisson des yaourts ; plus {{ 0.211 | divided_by: 2 | W€PerYear }} pour la consommation en veille de la yaourtière si elle reste branchée tout le temps. La consommation en veille représente alors seulement {{ 0.211 | times: 12 | percent: 268 }} de la consommation totale. C'est négligeable.

Pour une famille qui utiliserait la yaourtière une fois par semaine, {{ 268 | times: 52 | Wh€ }} seront consommés par an pour la cuisson des yaourts, et {{ 0.211 | times: 12 | times: 13 | times: 52 | Wh€ }} seront consommés en veille. La consommation en veille représente alors {{ 0.211 | times: 12 | times: 13 | percent: 268 }} de la consommation totale. Penser à débrancher la yaourtière après utilisation serait une bonne idée quand elle est si peu utilisée !

### Autoconsommation photovoltaïque

La consommation de cette yaourtière s'étalant sur 12 heures avec des pointes de consommation à plus de {{ 450 | W }}, il sera très difficile de l'alimenter uniquement avec l'énergie fournie directement par des panneaux photovoltaïques, sauf peut-être lors des jours les plus longs de l'année au début de l'été.

On pourra maximiser l'autoconsommation en démarrant la cuisson des yaourts en milieu de matinée, dès que le surplus de production photovoltaïque dépassera {{ 450 | W }}.

Une {% test yaourtiere yaourtière de conception plus simple %} qui chauffe à une puissance constante mais beaucoup plus faible pendant toute la durée de la cuisson des yaourts sera plus facile à alimenter avec la production photovoltaïque d'une maison.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette yaourtière SEB Multi delices, on pourrait :
- tester les différents programmes, avec différentes durées ;
- tester cette yaourtière à différentes saisons pour voir si la consommation est plus faible en été lorsque la température ambiante est plus élevée ;
- comparer la consommation lors de l'utilisation de lait à température ambiante ou de lait sorti du frigo, qui a donc besoin d'être réchauffé par la yaourtière ;
- comparer la consommation énergétique par yaourt de cette yaourtière avec celle du même modèle en version à 12 pots ;
- comparer avec le {% test yaourtiere modèle classique %}.
{% endplusloin %}
