---
layout: test-layout.njk 
title: une tondeuse à gazon
img: tondeuse.jpg
date: 2024-04-13
tags: ['test']
---

Quelle est la consommation d'une tondeuse à gazon électrique ? Combien ça coûte en électricité de tondre sa pelouse ? Est-ce que la consommation varie avec la hauteur de l'herbe ? Regardons ça !
<!-- excerpt -->

## Le materiel
<div id="Introduction">
<div>

Il s'agit ici d'une tondeuse à gazon Bosch Rotak 43 (1800 W, diamètre de coupe 43 cm, Bac de 50 L).

Ce n'est ni un modèle très haut de gamme, ni le premier prix.

### Méthode de mesure

L'aspirateur est branché sur [une prise connectée Shelly Plus PlugS]({{ '/posts/mesurer-la-consommation-avec-shelly-plus-plug-s/' | url }}) qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

</div>
{% image "./images/tondeuse.jpg" "Aspirateur Kärcher Eau et Poussières WD3" "512w" 512 %}
</div>

## Consommation

### Sur une tonte d'herbes hautes

Voyons à quoi ressemble un profil de consommation lors d'une tonte d'herbes un peu hautes. Certaines n'ont pas été coupées depuis plus d'un mois.
{% profile "tondeuse1.json.gz" '{"name": "Consommation pendant une tonte d\'herbes hautes", "range": "212286m587856"}' %}

On observe un pic de consommation au démarrage. On s'y attendait, tous les moteurs électriques font ça. Ici la consommation maximale mesurée au démarrage est de {{ 2673.3 | power }}.

Regardons maintenant en excluant le pic de démarrage :
{% profile "tondeuse1.json.gz" '{"name": "Consommation pendant une tonte d\'herbes hautes, après le démarrage", "range": "215319m584823"}' %}

La consommation maximale mesurée ({{ 1853.9 | power }}) est maintenant très proche de la puissance indiquée sur l'étiquette :

{% image "./images/tondeuse-etiquette.jpg" "Etiquette de l'aspirateur Kärcher WD3" "512w" 512 %}

On remarque sur le graphique que la consommation varie beaucoup d'un instant à un autre. Les creux à {{ 0 | power }} correspondent évidemment à des moments où la tondeuse était arrêtée car je déplaçais la rallonge. Les pics correspondent auxw moments où le moteur forçait en rencontrant des herbes plus hautes, voire à des moments où la tondeuse se bloquait presque (le moteur ralentissait) avec un bourage d'herbe, et où j'ai dû incliner la tondeuse pour que l'herbe s'évacue par les côtés.

Les consommations médiane ({{ 1118.2 | power }}) et moyenne ({{ 1074.58 | power }}) sont assez proches, et sont nettement en dessous de la puissance indiquée sur l'étiquette.

### Sur une tonte d'herbes plus régulières

Cette fois ci, j'ai tondu une plus petite surface, qui avait été tondue relativement récemment, les herbes ne dépassaient pas 20cm et il n'y a pas eu de bourrage.

{% profile "tondeuse2.json.gz" '{"name": "Tonte d\'une herbe plus régulière", "range": "49664m226760"}' %}

On observe à nouveau un pic au démarrage. Cette fois la consommation après le pic initial est beaucoup plus stable, la tondeuse forçant peu. La consommation reste la plupart du temps proche de la consommation médiane ({{ 1023.5 | power }}).

### A vide

Par curiosité, regardons ce qui se passe quand la tondeuse tourne à vide sans rien couper.

Je l'ai laissée tourner quelques secondes à vide sur le trottoir pour qu'elle évacue un peu de l'herbe coupée qui restait en dessous, et qu'elle soit un peu plus propre pour la ranger.

{% profile "tondeuse2.json.gz" '{"name": "Fonctionnement à vide de la tondeuse", "range": "591404m22219"}' %}

Ici, la consommation après le démarrage est très stable, à environ {{ 900 | power }}. C'est presque une ligne horizontale pendant 9 secondes sur le graphique.

Lors de l'arrêt, on observe une consommation plus faible pendant environ 2 secondes, similaire à ce qui avait été observé pour [l'aspirateur d'atelier]({{ " /tests/aspirateur-atelier/" | url }}).

### Sur un an

Si on suppose qu'on tond la pelouse une douzaine de fois par an (avec une fréquence qui varie selon les saisons, les coupes étant plus rapprochées au printemps et plus espacées en été en cas de sécheresse), et qu'une tonte complète dure environ une heure, la consommation annuelle sera d'environ {{ 12000 | energyCost }}.

<div id="plusloin">

## Pour aller plus loin

Pour comprendre de façon plus détaillée la consommation de cette tondeuse, on pourrait :
- comparer la consommation quand l'herbe est bien sèche, et quand elle est un peu humide (et cause des bourrages).
- mesurer plus soigneusement la hauteur de l'herbe qui va être coupée.
- mesurer la consommation en utilisant le bac de récupération d'herbe, pour voir si la consommation change significativement entre un bac vide et un bac plein.
</div>
