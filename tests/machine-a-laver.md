---
layout: test-layout.njk 
title: une machine à laver
img: lave-linge.jpg
date: 2024-04-15
tags: ['test']
---

Le lave-linge fait partie des gros consommateurs d'eau et d'énergie d'une maison. Comment se répartit sa consommation au fil du temps ? Le lave-linge consomme-t-il plus pendant le chauffage ou l'essorage ? Combien coûte une lessive en électricité ?
<!-- excerpt -->

{% tldr %}
La consommation annuelle du lave-linge sera comprise entre {{ 736 | times: 50 | Wh€ }} pour une personne seule réalisant 50 lessives par an et {{ 736 | Wh€PerYear }} pour une famille utilisant la machine à laver tous les jours.

La consommation électrique de la machine à laver est dominée par le chauffage de l'eau ({{ 618 | percent: 736 }} de la consommation pour un chauffage à 40°C ; {{ 738 | percent: 835 }} à 60°C).
Faire passer la température de lavage de 40 à 30°C réduit la consommation électrique de {{ 348 | percentLess: 736 }}.

L'essorage, deuxième plus gros consommateur, ne représente que {{ 49.8 | percent: 736 }} de l'énergie consommée pour toute la lessive. On peut réduire la consommation de l'essorage en essorant moins vite, mais si le linge sera séché dans un {% test seche-linge-a-pompe-a-chaleur sèche-linge %}, réduire l'efficacité de l'essorage risque d'augmenter beaucoup la consommation d'énergie lors du séchage.

Pour les familles auto-consommant leur électricité photovoltaïque, il est souhaitable de lancer la machine lorsqu'il y a du soleil.
{% endtldr %}

## Le matériel
{% intro "lave-linge.jpg" "lave-linge Samsung" %}
La machine à laver utilisée pour ce test est un modèle Samsung de 7kg. Ni très récente (on l'a achetée d'occasion !), ni très ancienne.

Il y a de nombreux programmes, mais sans bien connaître les différences entre les différents programmes, on a tendance à l'utiliser le plus souvent sur le programme "quotidien" à 40°C. C'est ce que nous testerons aujourd'hui.

### Méthode de mesure

Le lave-linge est branché sur une prise de courant qui a une ligne dédiée allant jusqu'au tableau électrique.

{% post mesurer-la-consommation-avec-shelly-em Le tableau électrique contient un module Shelly EM %} qui mesure la consommation sur les lignes dédiées au lave-linge et au sèche-linge.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur une lessive complète

#### Programme

{% image "./images/lave-linge-programme-quotidien-40-1400.jpg" "Programme sélectionné : quotidien, 40°C, 1400 tr/min" "512w" 512 %}

Les options sélectionnées sont les suivantes :
- programme « Quotidien »
- température de l'eau : 40°C
- 2 rinçages
- essorage à 1400 tours par minute.

La durée prévue du cycle est d'une heure et trois minutes.

#### Vue d'ensemble

Voyons à quoi ressemble un profil de consommation pour une lessive sur le programme quotidien à 40°C, avec essorage à 1400 tr/min (la vitesse maximum).
{% profile "lave-linge-40-quotidien.json.gz" '{"name": "Une lessive au programme « quotidien » à 40°C"}' %}

Plusieurs observations à la vue de ce profil :
- la consommation est très différente à différents moments du cycle de lavage.
- les valeurs de consommation médiane, moyenne et maximales sont très éloignées.
- une phase de quelques minutes a une consommation beaucoup plus élevée que les autres. On peut deviner que c'est la partie de la lessive pendant laquelle la machine chauffe de l'eau.
- la durée totale du cycle avant que la consommation ne devienne nulle a été d'1h15. Si on retire les 2 dernières minutes où la consommation était inférieure à {{ 3 | W }}, il reste 1h13, soit 10 minutes de plus que le temps qui était prévu au démarrage.

#### En détail

Regardons cette phase de chauffage de plus près :

{% profile "lave-linge-40-quotidien.json.gz" '{"name": "Phase de chauffage à 40°C", "range": "492618m967669"}' %}

La courbe est presque plate pendant 50s (pendant lesquelles la machine ne fait probablement que remplir le tambour d'eau chaude), puis on observe un comportement cyclique. On peut supposer que la machine continue à chauffer de l'eau tout en faisant tourner le tambour.

Pendant les 16 minutes de chauffage, la machine a consommé {{ 618 | Wh }}, soit environ {{ 618 | percent: 736 }} de l'énergie totale consommée pour toute la lessive ({{ 736 | Wh }}).

Regardons maintenant ce qu'il se passe avant la phase de chauffage :

{% profile "lave-linge-40-quotidien.json.gz" '{"name": "Début du cycle de lavage", "range": "m492618"}' %}

La consommation est la plupart du temps inférieure à {{ 30 | W }}. On observe des périodes de 5 à 6 secondes où la consommation est plus élevée, avec des pics bien marqués au début, correspondant probablement au démarrage d'un moteur électrique. Rotations du tambour ?

Regardons la forme du profil une fois le chauffage terminé :

{% profile "lave-linge-40-quotidien.json.gz" '{"name": "Lavage une fois le chauffage terminé", "range": "1461597m3167390"}' %}

De nombreuses formes semblent assez caractéristiques. Si je connaissais mieux le cycle de lavage (ou si j'avais un enregistrement vidéo de cette lessive), je pourrais probablement les identifier sur le graphique.

Une partie ayant une consommation plus élevée près de la fin attire mon attention, zoomons :

{% profile "lave-linge-40-quotidien.json.gz" '{"name": "Essorage", "range": "3955207m414900"}' %}

Je pense reconnaître ici la phase d'essorage, avec le tambour qui entre en rotation, accélère, puis maintient sa rotation à une vitesse constante pendant un certain temps, avant d'accélérer par paliers, pour finalement atteindre la vitesse maximum pendant un peu plus d'une minute.

La consommation maximale ({{ 847 | W }}) de cette phase est assez élevée. Cette phase d'essorage consomme {{ 49.8 | percent: 736 }} de l'énergie consommée pour toute la lessive.

### Sur une lessive avec prélavage

Voici un profil d'une autre lessive :
{% profile "lave-linge-prelavage.json.gz" '{"name": "Lessive avec prélavage"}' %}

Je ne me souviens plus exactement du programme utilisé, mais on peut observer qu'il y a 2 phases de chauffe, indiquant qu'il y a eu un prélavage.
La première phase de chauffe dure 8 minutes, la deuxième 10. C'est moins que les 16 minutes observées précédemment, donc je suppose que la température était moins élevée.

{% profile "lave-linge-prelavage.json.gz" '{"name": "Essorage", "range": "5240522m413150"}' %}

La consommation totale et la puissance maximale pendant l'essorage sont moins élevées. Peut-être un essorage à 1200 tr/min au lieu de 1400 ?

### Chauffage à 30°C au lieu de 40°C

Puisque le chauffage de l'eau domine la consommation électrique d'une lessive, regardons l'impact sur la consommation lorsqu'on réduit la température. Voici un profil d'une lessive au programme « Quotidien » mais réglé cette fois à 30°C :

{% profile "lave-linge-30-quotidien.json.gz" '{"name": "Une lessive au programme « quotidien » à 30°C"}' %}

Le profil est très similaire à celui de la lessive au programme « quotidien » à 40°C, mais la durée totale est un peu plus courte, et le temps de chauffage de l'eau est très réduit :

{% profile "lave-linge-30-quotidien.json.gz" '{"name": "Chauffage lors d\'un lavage à 30°C", "range": "396822m362759"}' %}

Le chauffage dure 6 minutes au lieu de 16, avec une consommation de {{ 230 | Wh }} au lieu de {{ 618 | Wh }} (réduction de {{ 230 | percentLess: 618 }}). La consommation pour la totalité de la lessive passe de {{ 736 | Wh€ }} à {{ 348 | Wh€ }}, soit une réduction de {{ 348 | percentLess: 736 }}.

À 30°C, le chauffage représente {{ 230 | percent: 348 }} de la consommation électrique de la lessive.

### Chauffage à 60°C au lieu de 40°C

Regardons maintenant ce qu'il se passe lorsque la température est réglée à 60°C :
{% profile "lave-linge-60-quotidien.json.gz" '{"name": "Une lessive au programme « quotidien » à 60°C"}' %}

La consommation totale passe à {{ 835 | Wh }}, soit {{ 835 | percentMore: 736 }} de plus que pour le même programme à 40°C.

La période de chauffage dure maintenant 19 minutes :
{% profile "lave-linge-60-quotidien.json.gz" '{"name": "Une lessive au programme « quotidien » à 60°C", "range": "434157m1141439"}' %}

La consommation du chauffage passe de {{ 618 | Wh }} à {{ 738 | Wh }}, soit une augmentation de {{ 738 | percentMore: 618 }} par rapport au chauffage à 40°C.

À 60°C, le chauffage représente {{ 738 | percent: 835 }} de la consommation électrique de la lessive.

### Programme « 15' Express »

{% profile "lave-linge-15min-express-et-rincage.json.gz" '{"name": "Une lessive au programme « 15\' Express »", "range": "100839m814471"}' %}

Ce programme dure encore moins que les 15 minutes annoncées. La consommation d'électricité, {{ 16.5 | Wh }}, est réduite de {{ 16.5 | percentLess: 736 }} par rapport au programme « Quotidien » à 40°C, mais le linge est-il propre ? Ce programme est probablement réservé au lavage immédiat d'un vêtement sur lequel quelque chose vient d'être renversé et n'a pas eu le temps de sécher dessus.

### Rinçage et essorage

Le linge étant sorti encore plein de lessive à l'issue de la lessive 15 minutes  express, nous avons relancé dans la foulée un programme « Rinçage et essorage » dont voici l'enregistrement :
{% profile "lave-linge-15min-express-et-rincage.json.gz" '{"name": "Rinçage et essorage", "range": "1068507m1140259"}' %}

On reconnaît bien la forme du profil de l'essorage :
{% profile "lave-linge-15min-express-et-rincage.json.gz" '{"name": "Essorage", "range": "1691186m407530"}' %}

Ce qui permet par élimination de reconnaître la forme du rinçage :
{% profile "lave-linge-15min-express-et-rincage.json.gz" '{"name": "Rinçage", "range": "1068812m624123"}' %}
On peut retrouver cette forme dans les profils des lavages analysés précédemment.

### Consommation sur un an

Si l'on suppose que la lessive au programme « Quotidien » 40°C analysée initialement est la plus courante et qu'on extrapole, le coût annuel en électricité sera de {{ 736 | times: 50 | Wh€ }} pour une personne seule réalisant 50 lessives par an. Pour une famille nombreuse utilisant la machine à laver une fois par jour, la consommation annuelle sera de {{ 736 | Wh€PerYear }}.

### Conseils pour l'autoconsommation photovoltaïque

La consommation élevée de la phase de chauffe ne dure pas très longtemps, et peut-être couverte par la production d'une installation photovoltaïque typique de 3kWc.

Pour optimiser l'autoconsommation photovoltaïque, il faudra essayer de lancer la machine quand il y a du soleil, et qu'on espère que le ciel restera dégagé pendant une vingtaine de minutes. Il faudra également s'abstenir de lancer un autre appareil énergivore (plaques de cuisson, four, ...) pendant le début du cycle de lessive. Un bon moment pour lancer sa lessive sera donc le début d'après-midi, juste après le repas, quand on n'a plus de plat à réchauffer ou cuire.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une machine à laver, on pourrait :
- mesurer la consommation pour les différents programmes de la machine (ce sera le sujet d'autres tests !)
- observer l'impact de différentes vitesses d'essorage.
- réaliser un enregistrement vidéo du cycle de lessive, et l'utiliser pour identifier finement toutes les phases du cycle de lavage sur un profil.
- comparer avec d'autres modèles de lave-linge ({% test machine-a-laver-miele autres marques %}, modèles plus ou moins anciens) pour voir ce qui est universel et ce qui est spécifique au modèle testé ici.
- enregistrer également la consommation d'eau.
- {% test seche-linge-a-pompe-a-chaleur s'intéresser au séchage %} !
{% endplusloin %}
