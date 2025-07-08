---
layout: test-layout.njk
title: un ventilateur de table Rowenta Essential
img: ventilateur-de-table-rowenta.jpg
date: 2025-06-03
tags: ['test']
---

Quand il fait chaud, un ventilateur apporte un vrai soulagement. Combien cette brise rafraichissante coûte-t-elle en électricité ?
<!-- excerpt -->

{% tldr %}
- Utilisé 4h par jour pendant 3 mois d’été à pleine puissance, il consommera {{ 116 | times: 3 | Wh€PerMonth }}.
- Le ventilateur consomme environ {{ 19 | W }} à la vitesse 1 et {{ 30 | W }} à la vitesse 2.
- Inutile de le débrancher lorsqu'il ne sert pas, il ne consomme rien à l'arrêt, grâce à son interrupteur mécanique.
- L’oscillation ne change pas significativement la consommation.
{% endtldr %}

## Le matériel
{% intro "ventilateur-de-table-rowenta.jpg" "Un ventilateur de table rowenta" %}
Nous testons aujourd'hui un petit ventilateur de table ou de bureau, modèle Rowenta Essential VU2110. Doté d'une hélice de 25 cm, il propose 2 vitesses, avec une commande mécanique simple.

C’est un ventilateur oscillant, compact, souvent utilisé en appoint dans une pièce ou à côté d’un poste de travail.

### Méthode de mesure

Le ventilateur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

L'étiquette sous le pied du ventilateur nous indique une puissance de {{ 28 | W }} :  
{% image "./images/ventilateur-de-table-rowenta-etiquette.jpg" "Photo de l'étiquette collée sous le pied du ventilateur, indiquant : « Rowenta Groupe SEB - 27200 Vernon - France Mod. VU2110 220-240V 50Hz 28W T 220V 60Hz 28W T »" "300w" 300 %}

Mesurons pour vérifier.

### Consommation selon la vitesse

Voici deux enregistrements de 5 minutes à la vitesse 1 puis à la vitesse 2 :  
{% profile "ventilateur-de-table-rowenta.json.gz" '{"name":"Vitesse 1","range":"11332m300758"}' %}
{% profile "ventilateur-de-table-rowenta.json.gz" '{"name":"Vitesse 2","range":"387061m300758"}' %}

La puissance augmente avec la vitesse. Le bruit émis augmente aussi, ce qui est à prendre en compte si le ventilateur est utilisé dans une chambre ou un bureau.

Sur nos deux enregistrements, après un bref pic de consommation correspondant au démarrage du moteur électrique, la puissance mesurée se stabilise.
- À la vitesse 1, ce ventilateur consomme environ {{ 19 | W }}.
- À la vitesse 2, la puissance mesurée monte à environ {{ 30 | W }} ({{ 30 | percentMore: 19 }} de plus).

C'est proche, mais légèrement supérieur à la valeur de {{ 28 | W }} indiquée sur l'étiquette.
La tension du secteur était d'environ {{ 244 | V }} pendant les mesures, et les petites variations de tension semblent avoir entraîné de petites variations dans la puissance mesurée. Il est possible que la puissance de {{ 28 | W }} indiquée sur l'étiquette soit mesurée lorsque que la tension est de {{ 220 | V }}.

### Impact de l'oscillation sur la consommation

J'ai réalisé des enregistrements avec l'oscillation activée puis désactivée, mais n'ai pas constaté de différence visible sur les graphiques.

### Consommation sur une année

Un usage courant consiste à faire tourner le ventilateur environ 4 heures par jour en été, par exemple aux heures les plus chaudes de la journée entre 13h et 17h. Regardons donc un enregistrement de 4 heures de fonctionnement continu à la vitesse maximum :  
{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"4 heures à vitesse 2","range":"m14401846"}' %}

Si le ventilateur est utilisé 4 heures par jour, cela représente donc :

- {{ 116 | Wh€ }} par jour ;
- {{ 116 | Wh€PerMonth }} pour un mois ;
- {{ 116 | times: 3 | Wh€PerMonth }} pour les 3 mois d’été.

Même utilisé quotidiennement chaque été, ce ventilateur reste un appareil à faible consommation électrique. En supposant un prix d'achat de {{ 30 | € }}, il faudra {{ 116 | times: 3 | PerMonth | countPer€: 30 }} étés chauds avant que la consommation électrique ne dépasse le prix d'achat.

### Impact de l'échauffement du moteur sur la consommation

Sur l'enregistrement de 5 minutes, la consommation moyenne a été mesurée à {{ 30.4 | W }}, alors que sur l'enregistrement de 4 heures, la moyenne est descendue à {{ 29.0 | W }}.

Pour observer mieux ce phénomène, prenons un échantillon de 5 minutes toutes les heures (après le pic de consommation initial du démarrage du moteur) :  
{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"5 premières minutes","range":"7667m300529"}' %}

Sur les 5 premières minutes, la consommation moyenne est à nouveau mesurée à {{ 30.4 | W }}.

{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"5 minutes au bout d\'une heure","range":"3579980m300529"}' %}

Une heure plus tard, elle est descendue à {{ 29.2 | W }}.

{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"5 minutes au bout de 2 heures","range":"7183001m300529"}' %}

Au bout de 2 heures, elle est mesurée à {{ 29.0 | W }}.

{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"5 minutes au bout de 3 heures","range":"10796257m300529"}' %}

Au bout de 3 heures, elle est à {{ 28.8 | W }}.

{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"5 minutes au bout de 4 heures","range":"14399988m300652"}' %}

Après trois heures, la puissance semble se stabiliser : les puissances relevées pour l'échantillon pris au bout de 4 heures sont identiques à celles relevées au bout de 3 heures.

Pendant les 3 premières heures, on a observé une légère décroissance d'heure en heure de la puissance moyenne consommée. Cette variation est probablement due à l'échauffement du moteur, qui consomme un peu moins lorsqu'il est chaud. Une fois que le moteur a atteint une température stable, la puissance n'évolue plus.

### Pas de consommation en veille

Regardons maintenant la consommation sur le reste de la journée une fois que le ventilateur a été éteint :  
{% profile "ventilateur-de-table-rowenta-26h.json.gz" '{"name":"Enregistrement sur une journée","range":"m86447077"}' %}

On constate que le ventilateur ne consomme **strictement rien** une fois éteint.

Cela s'explique car il est doté d’un interrupteur mécanique :  
{% image "./images/ventilateur-de-table-rowenta-boutons.jpg" "Photos des boutons mécaniques commandant la vitesse du ventilateur" "250w" 250 %}

Il est donc inutile de le débrancher : il ne consomme rien tant qu’il n'est pas utilisé.

### Autoconsommation photovoltaïque

Avec une consommation moyenne d'environ {{ 29 | W }} à la vitesse maximum, ce ventilateur est bien adapté à une utilisation en journée via une installation solaire. Il pourra même facilement être alimenté par un petit kit photovoltaïque à installer soi-même sur un balcon.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un ventilateur, on pourrait comparer avec des ventilateurs :
- d'{% test ventilateur-carrefour-home autres marques %} ;
- de différents diamètres ;
- plus ou moins anciens ;
- ayant de l'électronique et une télécommande.
{% endplusloin %}
