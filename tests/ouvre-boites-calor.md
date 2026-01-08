---
layout: test-layout.njk
title: un ouvre-boîtes électrique Calor
img: ouvre-boites-calor.jpg
date: 2026-01-09
tags: ['test']
---

Cet ouvre-boîtes électrique Calor date de 1974. Je l'ai trouvé à la fin d'un marché aux puces et l'ai pris par curiosité, pour le comparer avec {% test ouvre-boites-electrique un ouvre-boîtes électrique Moulinex %} que nous avions déjà testé. Quel est le coût électrique de l'ouverture automatique d'une boîte de conserve ?

<!-- excerpt -->

{% tldr %}
- Ouvrir une boîte par jour pendant un an représente une consommation annuelle de {{ 0.496 | Wh€PerYear }}.
- Cet ouvre-boîtes Calor consomme environ 2 fois plus que {% test ouvre-boites-electrique l'ouvre-boîtes Moulinex %}, mais c'est toujours deux fois rien : ouvrir une petite boîte de conserve consomme {{ 0.384 | Wh }}, soit {{ 0.384 | countPer€: 0.01 }} boîtes pour un centime.
- La puissance mesurée d'environ {{ 130 | W }} est {{ 130 | percentMore: 80 }} supérieure aux {{ 80 | W }} annoncés sur l'étiquette !
- L'appareil ne consomme aucune électricité lorsqu'il est éteint, inutile de le débrancher.
{% endtldr %}

{% comment %}
Notes from draft:
Un vieil ouvre-boîte récupéré à la fin du marché aux puce. Je l'ai pris par curiosité, pour le comparer avec celui que nous avions déjà testé.

C'est un modèle de 1974, sur sa boîte il était indiqué :
- ouvre toutes les formes de boîtes métalliques
- coupe nette et franche avec arrêt automatique
- possibilité de fixation murale

Je l'ai d'abord testé quelques secondes à vide, puis j'ai ouvert une petite boîte de lentilles. Ensuite l'inscription "Temps de marche 2 mn." sur l'étiquette m'a rendu curieux et j'ai voulu voir ce que ça donnait si on le faisait tourner pendant 2 minutes en continu (au bout d'1min40 il y avait une odeur typique des batteurs des années 70 quand on les a utilisés longtemps qui donnait envie d'arrêter).

Un autre jour, j'ai ouvert une boîte de 300g de maïs en mesurant à nouveau.
{% endcomment %}

## Le matériel

{% intro "ouvre-boites-calor.jpg" "Ouvre-boîtes électrique Calor modèle 26.01" %}

Cet ouvre-boîtes Calor modèle 26.01 est un appareil électroménager des années 70. Sur sa boîte d'origine, il était indiqué qu'il « *ouvre toutes les formes de boîtes métalliques* » avec une « *coupe nette et franche avec arrêt automatique* », et qu'il offrait la « *possibilité de fixation murale* ».

L'arrêt automatique est effectivement une caractéristique intéressante : une fois la boîte complètement ouverte, l'appareil s'arrête tout seul. Un bras articulé avec une demi-boule en plastique jaune aimantée permet de retenir le couvercle à la fin de l'ouverture.

### Méthode de mesure

L'ouvre-boîtes Calor est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

L'arrière de l'appareil révèle un système de rangement bien pensé pour le câble d'alimentation :

{% image "./images/ouvre-boites-calor-arriere.jpg" "Vue arrière de l'ouvre-boîtes Calor avec le rangement pour le câble d'alimentation" "500w" 500 %}
{% comment %}ouvre boîte vu de dos, avec le rangement pour le câble d'alimentation visible et le câble rentré à l'intérieur{% endcomment %}

On y voit également l'étiquette technique. Zoomons dessus :

{% image "./images/ouvre-boites-calor-etiquette.jpg" "Étiquette de l'ouvre-boîtes Calor indiquant 220V 80W 50Hz et temps de marche 2 mn" "300w" 300 %}
{% comment %}CALOR 26.01
220V  80W
50 Hz
Temps de marche 2 mn.{% endcomment %}

L'étiquette indique « *220V 80W 50 Hz* », soit une puissance nominale de {{ 80 | W }}. L'indication « *Temps de marche 2 mn.* » suggère que l'appareil ne devrait pas fonctionner plus de 2 minutes en continu.

### Premier test à vide

Pour commencer, j'ai fait tourner l'appareil à vide pendant quelques secondes pour vérifier qu'il était en état de marche :

{% profile "ouvre-boites-calor.json.gz" '{"name": "À vide", "range": "289384m9307"}' %}
{% comment %}draft: A vide pendant quelques secondes. Max sur le premier sample (peut-être qu'il y avait uqelque chose à débloquer pour cet ouvre boîte probablement resté à l'arrêt pendant des années), puis médiane intéressante.{% endcomment %}

On observe une puissance initiale de {{ 148 | W }}, probablement due à quelque chose à débloquer dans le mécanisme après des années d'inutilisation. La puissance se stabilise ensuite rapidement à {{ 131 | W }}.

### Ouverture d'une petite boîte de 200g

Passons maintenant à un usage réel avec une petite boîte de lentilles de 200g :

{% image "./images/ouvre-boites-calor-200g.jpg" "Petite boîte de 200g de lentilles en cours d'ouverture" "500w" 500 %}
{% comment %}petite boîte de 200g de lentilles en cours d'ouverture. Je n'avais pas encore compris que le bras articulé avec la demi boule en plastique jaune sert à tenir le couvercle de la boîte à la fin de l'ouverture{% endcomment %}

L'ouverture de cette petite boîte :

{% profile "ouvre-boites-calor.json.gz" '{"name": "Petite boîte 200g", "range": "334823m16247"}' %}
{% comment %}draft: ouverture d'une petite boîte de lentilles de 200g. La médiane très proche de la médiane vue précédemment à vide. Et le max est quasi identique.{% endcomment %}

La puissance médiane est de {{ 131 | W }}, très proche de ce qu'on avait observé à vide. Le maximum atteint {{ 132 | W }}, quasi identique à la médiane.

La consommation électrique est de {{ 0.384 | Wh€ }}, soit {{ 0.384 | countPer€: 0.01 }} boîtes pour dépenser un centime d'électricité.

### Ouverture d'une boîte de 300g

Un autre jour, j'ai ouvert une boîte de maïs de 300g :

{% image "./images/ouvre-boites-calor-300g.jpg" "Ouverture automatique d'une boîte de 300g de maïs" "500w" 500 %}
{% comment %}Ouverture automatique d'une boîte de 300g de maïs.{% endcomment %}

La puissance médiane reste stable à {{ 130 | W }} lors de l'ouverture de cette boîte :

{% profile "ouvre-boites-calor-300g.json.gz" '{"name": "Boîte 300g", "range": "96777m15591"}' %}
{% comment %}draft: une autre boîte un peu moins petite (300g de maïs cette fois).{% endcomment %}

La consommation s'envole à {{ 0.496 | Wh€ }}, soit {{ 0.496 | percentMore: 0.384 }} de plus que pour la boîte de 200g, ce qui s'explique logiquement : le moteur tourne plus longtemps car il y a plus de métal à découper sur le pourtour de la boîte.

Il faut maintenant ouvrir {{ 0.496 | countPer€: 0.01 }} boîtes pour dépenser un centime !

### Test de 2 minutes en continu

L'inscription « *Temps de marche 2 mn.* » sur l'étiquette m'a rendu curieux : que se passe-t-il si on fait tourner l'appareil pendant 2 minutes en continu ?

{% profile "ouvre-boites-calor.json.gz" '{"name": "2 minutes en continu", "range": "455861m124145"}' %}
{% comment %}draft: 2 min en continu. conso très stable. On est très au dessus des 80W de l'étiquette. On a 237V plutôt que 220 pendnat la mesure, mais ça ne suffit pas du tout à expliquer une telle différence.{% endcomment %}

En 2 minutes, {{ 4.31 | Wh€ }} ont été consommés. La consommation est très stable à {{ 129 | W }} de puissance médiane. Les légères variations de puissance avec des moments à 127 voire 126 W sont corrélées à des légères baisses de tension du secteur.

Au bout d'1min40, j'ai commencé à sentir une odeur typique des batteurs et appareils électriques des années 70 quand on les utilise longtemps. Cette odeur donnait envie d'arrêter le test.

On constate que la puissance mesurée de {{ 129 | W }} est {{ 129 | percentMore: 80 }} supérieure aux {{ 80 | W }} annoncés sur l'étiquette. Pendant ce test, la tension secteur était de 237 V plutôt que les 220 V nominaux, mais cela ne suffit pas à expliquer une telle différence de consommation. Les indications de puissance sur les petits appareils de cette époque manquaient souvent de précision, comme on l'a déjà observé sur {% test couteau-electrique un couteau électrique %} des années 70.

Pour visualiser où se situe cette consommation électrique dans l'appareil, j'ai utilisé une caméra thermique après le test de 2 minutes :

{% image "./images/ouvre-boites-calor-thermal-dos.jpg" "Vue thermique arrière de l'ouvre-boîtes après 2 minutes de fonctionnement continu" "500w" 500 %}
{% comment %}Photo prise en caméra thermique de l'ouvre boîte de dos après l'avoir fait fonctionner pendant 2 minutes en continu, où on voit clairement qu'il y a seulement une petite zone qui chauffe.{% endcomment %}

On voit clairement qu'il y a seulement une petite zone qui chauffe, probablement l'emplacement du moteur. Le reste de l'appareil reste relativement froid.

{% image "./images/ouvre-boites-calor-thermal-face.jpg" "Vue thermique frontale montrant la zone chaude du moteur" "500w" 500 %}
{% comment %}même image prise de face. Là aussi on voit qu'il n'y a qu'une petite zone qui est nettement plus chaude. Probablement l'emplacement du moteur.{% endcomment %}

### Comparaison avec le Moulinex

Nous avions déjà testé {% test ouvre-boites-electrique un ouvre-boîtes électrique Moulinex %} des années 70. Voici les deux appareils côte à côte :

{% image "./images/ouvre-boites-calor-calor-vs-moulinex.jpg" "Ouvre-boîtes Calor et Moulinex côte à côte" "500w" 500 %}
{% comment %}l'ouvre boîte Calor à côté de l'ouvre boîte Moulinex que nous avions déjà testé. Cette photo peut servir pour introduire une section avec une comparaison entre les deux modèles{% endcomment %}

Le Moulinex consommait {{ 0.19 | Wh }} pour ouvrir une boîte, soit environ 2 fois moins que le Calor qui consomme entre {{ 0.384 | Wh }} et {{ 0.496 | Wh }} selon la taille de la boîte. À titre de comparaison, le Moulinex permettait d'ouvrir 331 boîtes pour un centime, contre {{ 0.384 | countPer€: 0.01 }} à {{ 0.496 | countPer€: 0.01 }} boîtes pour le Calor.

Cependant, le Calor présente des avantages pratiques intéressants :
- L'arrêt automatique : pas besoin de garder la main sur la poignée pour continuer à ouvrir la boîte, il continue jusqu'à la fin de la coupe
- Le système de maintien du couvercle avec la demi-boule jaune aimantée :

{% image "./images/ouvre-boites-calor-couvercle.jpg" "Couvercle de boîte maintenu par la boule jaune aimantée" "500w" 500 %}
{% comment %}couvercle de boîte resté sur la demi boule jaune aimantée{% endcomment %}

Ce système magnétique est vraiment pratique : le couvercle reste accroché et ne tombe pas dans la boîte.

Dans les deux cas, la consommation électrique reste totalement dérisoire. Le choix entre les deux modèles se fera donc plutôt sur des préférences esthétiques que sur des considérations énergétiques.

### En veille

Cet ouvre-boîtes Calor dispose d'un interrupteur mécanique et ne consomme aucune électricité lorsqu'il est éteint. Pas de gaspillage s'il est resté branché pendant 50 ans dans la cuisine de mamie ! Mais si c'est le cas, il faudra tout de même penser à le débrancher le temps de remettre aux normes actuelles l'installation électrique de sa cuisine.

### Coût d'usage et autoconsommation photovoltaïque

Même si vous ouvriez une boîte de conserve par jour pendant un an, la consommation annuelle ne serait que de {{ 0.496 | Wh€PerYear }}. Il faudrait {{ 0.496 | PerYear | countPer€: 1 }} ans pour dépenser un euro d'électricité ! C'est négligeable par rapport au prix des boîtes.

Si vous avez des panneaux photovoltaïques, vous pouvez facilement alimenter ce gadget vintage avec de l'énergie solaire : la puissance de {{ 130 | W }} est très compatible avec une installation domestique, et l'utilisation extrêmement courte (environ 15 secondes par boîte) permet de l'utiliser pratiquement n'importe quand dans la journée, sauf lors d'une éclipse solaire.

Au prix d'un anachronisme frappant, vous pourrez ainsi faire l'économie mirobolante des {{ 0.496 | Wh€PerYear }} par an... de quoi amortir votre installation solaire en quelques millénaires seulement !

### Faut-il le remplacer par un modèle plus récent ?

Les ouvre-boîtes électriques modernes sont difficiles à trouver : ce type d'appareil n'est plus vraiment à la mode. La consommation totale de celui-ci est très faible, et cet appareil fonctionnant encore parfaitement après 50 ans, il peut probablement continuer encore quelques décénies de plus.

Le coût environnemental de fabrication d'un nouvel appareil serait bien supérieur aux économies d'électricité réalisables sur sa durée de vie, ou la vôtre.

On conseille donc de continuer à utiliser cet ouvre-boîtes tant qu'on en ressent l'utilité ou qu'on trouve du plaisir à le faire. En effet, même s'il ne sert pas à grand-chose et qu'il est franchement moche, cet objet désuet et kitsch tout orange a un certain charme rétro !

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet ouvre-boîtes, on pourrait :
- tester avec des boîtes de différentes tailles, en particulier des boîtes plus grandes (500g, 800g, 1kg), pour voir si la consommation continue d'augmenter proportionnellement ;
- démonter, nettoyer et huiler les pièces métalliques internes puis mesurer si la consommation diminue ;
- comparer avec d'autres ouvre-boîtes électriques de différentes marques (comme {% test ouvre-boites-electrique le Moulinex %}) et différentes époques pour voir l'évolution de l'efficacité énergétique de ce type d'appareil ;
- comparer avec d'autres gadgets électriques de l'époque comme {% test couteau-electrique un couteau électrique %} pour rester dans cette mode des années 70 des appareils électriques pour toutes les petites tâches à effectuer en cuisine.
{% endplusloin %}
