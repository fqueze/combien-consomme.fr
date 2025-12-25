---
layout: test-layout.njk
title: un ventilateur de table Carrefour Home 3 vitesses
img: ventilateur-carrefour-home.jpg
date: 2025-07-08
tags: ['test']
---

Un ventilateur peut rendre la chaleur estivale plus supportable. Ce modèle Carrefour Home promet 3 vitesses et une puissance de 40 W. Quelle est sa consommation réelle ?
<!-- excerpt -->

{% tldr %}
- À pleine puissance (vitesse 3), ce ventilateur consomme environ {{ 36 | W }}.
- Utilisé 4h par jour pendant 3 mois, il consommerait environ {{ 36 | times: 4 | times: 3 | Wh€PerMonth }}.
- Il ne consomme rien à l’arrêt, grâce à ses boutons mécaniques.
- L’oscillation n’a pas d'impact notable sur la consommation.
{% endtldr %}

## Le matériel
{% intro "ventilateur-carrefour-home.jpg" "Ventilateur de table Carrefour Home" %}
Il s'agit d’un ventilateur de table bon marché de marque Carrefour Home, avec une hélice de diamètre moyen et une tête orientable.

Il propose 3 vitesses sélectionnées par des boutons mécaniques, et une fonction d’oscillation latérale activable par une tirette.

### Méthode de mesure

Le ventilateur est branché sur une {% post mesurer-la-consommation-avec-shelly-plus-plug-s prise connectée Shelly Plus PlugS %}, qui mesure la puissance toutes les secondes.
{% endintro %}

## Consommation

### Étiquette constructeur

L’étiquette collée sous le pied du ventilateur indique une puissance de {{ 40 | W }} :  
{% image "./images/ventilateur-carrefour-home-etiquette.jpg" "Étiquette constructeur avec l'inscription : « Carrefour Home CDF730-11 (FT30-10S) 220–240V ~ 50Hz 40W »" "250w" 250 %}

Vérifions si cela correspond à la réalité.

### Consommation selon la vitesse

Quatre boutons sont disposés sur le pied du ventilateur, permettant de sélectionner la vitesse de fonctionnement :  
{% image "./images/ventilateur-carrefour-home-boutons.jpg" "Photo montrant les 4 boutons permettant de selectionner la vitesse 0, 1, 2 ou 3" "250w" 250 %}

Voici un enregistrement d'un peu plus de 2 minutes pour chacune des vitesses :  
{% profile "ventilateur-carrefour-home.json.gz" '{"name":"2 minutes à chaque vitesse","range":"8807m459071"}' %}

On observe un bref pic de consommation au démarrage du moteur électrique, puis une consommation stable à chacune des vitesses. La puissance maximale, {{ 37 | W }}, est légèrement inférieure à la puissance indiquée sur l'étiquette.

Zoomons maintenant sur chacune des vitesses :  
{% profile "ventilateur-carrefour-home.json.gz" '{"name":"Vitesse 1","range":"38090m120219"}' %}
{% profile "ventilateur-carrefour-home.json.gz" '{"name":"Vitesse 2","range":"180563m120219"}' %}
{% profile "ventilateur-carrefour-home.json.gz" '{"name":"Vitesse 3","range":"314386m119507"}' %}

Les puissances moyennes relevées sont :
- Vitesse 1 : environ {{ 28.2 | W }}
- Vitesse 2 : environ {{ 30.3 | W }} ({{ 30.3 | percentMore: 28.2 }} de plus)
- Vitesse 3 : environ {{ 36.7 | W }} ({{ 36.7 | percentMore: 30.3 }} de plus)

La différence de puissance entre chacune des vitesses est étonnamment faible. Elle correspond cependant au ressenti lorsqu'on se place en face du ventilateur : on ne sent pas beaucoup plus d'air en passant de la vitesse 1 à la vitesse 2 ; on entend seulement une légère différence dans le niveau sonore.

On se demande ce qui a poussé les concepteurs à mettre 3 vitesses si proches, 2 (voire une seule) auraient suffi.

Par comparaison, la puissance du {% test ventilateur-de-table-rowenta ventilateur de table Rowenta testé précédemment %} augmentait de {{ 30 | percentMore: 19 }} en passant de la vitesse 1 à la vitesse 2.

### Oscillation

Une tirette à l'arrière du ventilateur permet d'activer ou désactiver l'oscillation horizontale de la tête du ventilateur :  
{% image "./images/ventilateur-carrefour-home-tirette-oscillation.jpg" "Photo de l'arrière du ventilateur montrant la tirette permettant d'activer ou désactiver l'oscillation horizontale de la tête du ventilateur" "500w" 500 %}

Voici un enregistrement de consommation pendant lequel la tirette a été manipulée plusieurs fois :  
{% profile "ventilateur-carrefour-home.json.gz" '{"name":"Vitesse 3 avec ou sans oscillation horizontale","range":"517353m104656"}' %}

L'activation de l'oscillation a très peu d’effet sur la consommation : la variation est inférieure à {{ 1 | W }}, et n'est pas visible sur le graphique.

On peut observer sur cet enregistrement que démarrer le ventilateur directement à la vitesse 3 fait que la puissance mesurée pendant le pic de démarrage dépasse brièvement la puissance normale de {{ 40 | W }}.

### Avec une serviette devant le ventilateur

Lorsque les températures deviennent trop élevées, le conseil de mettre un linge humide devant le ventilateur pour obtenir de la fraicheur par évaporation de l'eau est fréquemment donné. La présence d'une serviette devant le ventilateur augmente telle sa consommation ?

Pendant 30 secondes au milieu l'enregistrement suivant, j'ai placé une serviette directement contre la grille du ventilateur, empêchant l'air de sortir :  

{% profile "ventilateur-carrefour-home.json.gz" '{"name":"Vitesse 3 avec une serviette empêchant la sortie d\'air","range":"712732m56873"}' %}

Là encore, très peu de variation de consommation.

### Consommation pendant plusieurs heures

{% profile "ventilateur-carrefour-home.json.gz" '{"name":"3h à vitesse 3","range":"1288310m10882559"}' %}

Comme pour le {% test ventilateur-de-table-rowenta modèle Rowenta %}, on observe une légère décroissance de la consommation pendant le début de la période d'utilisation. Lors des premières minutes, la puissance mesurée est d'environ {{ 36.6 | W }}. Après environ 40 minutes, elle descend à {{ 36.2 | W }}. Cette légère décroissance est probablement due à l'échauffement du moteur.

On observe d'autres variations de puissance un peu plus importantes sur la suite de l'enregistrement, mais elles sont dues au fluctuations de la tension, qui a varié entre 240 et {{ 245 | V }}.

### Utilisation typique

Prenons un cas typique : utilisation à vitesse maximale pendant 4 heures aux heures chaudes.

À {{ 36 | W }} en moyenne, cela donne :
- {{ 36 | times: 4 | Wh€ }} par jour ;
- {{ 36 | times: 4 | Wh€PerMonth }} par mois ;
- {{ 36 | times: 4 | times: 3 | Wh€PerMonth }} pour les 3 mois d'été.

Même utilisé quotidiennement, ce ventilateur reste très économe.

### Utilisation intensive

Si le ventilateur tourne 24h sur 24 à la vitesse maximum, cela donne :
- {{ 36 | W€PerDay }} par jour ;
- {{ 36 | W€PerMonth }} par mois ;
- {{ 36 | times: 3 | W€PerMonth }} par été.

Si le ventilateur tourne en continu tout l'été, la dépense en électricité sera proche du prix d'achat du ventilateur.

### Pas de consommation résiduelle

Une fois éteint via l’interrupteur mécanique, aucune consommation n’est mesurable.  
Pas besoin de le débrancher : il ne consomme rien en veille.

### Bien adapté à l'autoconsommation

Avec une puissance inférieure à {{ 40 | W }}, ce ventilateur peut facilement fonctionner en journée sur une installation solaire, même petite.

{% plusloin %}
Pour mieux comprendre la consommation des ventilateurs, on pourrait :
- comparer des modèles de tailles différentes (20 cm, 30 cm, 40 cm) ;
- mesurer d’anciens modèles, ou ceux à variateur électronique ;
- tester d'autres formes de ventilateurs : sur pied, en colonne, au plafond.
{% endplusloin %}
