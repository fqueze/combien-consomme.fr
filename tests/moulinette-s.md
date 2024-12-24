---
layout: test-layout.njk 
title: une « moulinette S » de Moulinex
img: moulinette-s.jpg
date: 2024-12-24
tags: ['test']
---

Maman l'a achetée pour hacher la viande quand j'étais petit. Mamie l'a également utilisée quand elle n'avait plus beaucoup de dents. Quelle est la consommation de ce vénérable mixeur qui reprend encore parfois du service ?
<!-- excerpt -->

{% tldr %}
- hacher un bac de poisson cru consomme environ {{ 1.00 | Wh€ }}, avec une puissance maximale de {{ 625 | W }} ;
- il faut hacher environ {{ 1 | countPer€: 0.01 }} bacs de poisson pour dépenser un centime ;
- si le mixeur reste branché sans être utilisé, il consommera inutilement {{ 0.277 | W€PerYear }} par an (1 centime tous les {{ 0.277 | times: 24 | countPer€: 0.01 }} jours).
{% endtldr %}

## Le matériel
{% intro "moulinette-s.jpg" "Une moulinette S" %}

Ce mixeur « moulinette S » type 643 de [Moulinex](https://fr.wikipedia.org/wiki/Moulinex "« Moulinex » sur Wikipédia"), tout droit sorti des années 70 ou 80, a contribué à nous nourrir sur plusieurs générations.

Le manuel d'utilisation indique :
> Tournant à 10.000 tr/min, le couperet hache les produits en particules plus ou-moins fines selon votre goût. A cette vitesse, les aliments ne peuvent être écrasés et leurs cellules ne peuvent pas éclater. Les produits conservent à la fois leur jus, leur valeur nutritive et leur saveur initiale. Vous pourrez hacher dans la moulinette
>
> - DES PRODUITS DURS :
>   - Fromages : Gruyère, Hollande, Cantal...
>   - Fruits : amandes, noix, noisettes, pommes...
>   - Légumes durs : carottes, céleris...
>   - Pain — Biscottes...
> - DES PRODUITS MOUS :
>   - Légumes : choux, salades, radis, oignons, champignons, oseille, persil, cerfeuil, ail, échalotes...
>   - Viandes : toutes viandes crues ou cuites.
>   - Poissons : tous poissons crus ou cuits.
>
> Nota: Évitez l'emploi de produits trop dur (muscade, sucre) ; les aliments juteux (tomates, pêches, poires...) ; les denrées qui nécessitent une mouture très fine (café, blé...).
>
> NE JAMAIS INTRODUIRE D'ALIMENTS LIQUIDES OU JUTEUX DANS LE BOL DE L'APPAREIL

### Méthode de mesure

La moulinette est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Les inscriptions sous l'appareil indiquent une puissance de {{ 750 | W }} :  
{% image "./images/moulinette-s-etiquette.jpg" "Inscriptions sous le mixeur, indiquant « Moulinex TYPE 643 | 220 V ~ 50 Hz 750 W »" "300w" 300 %}

Vérifions lors d'un cas d'utilisation concret : pour faire un pain de poisson, nous avons haché du cabillaud puis du saumon.

Nous avons d'abord placé du poisson cru découpé en morceaux dans le bac du mixeur :  
{% image "./images/moulinette-s-poisson-en-morceaux.jpg" "Saumon coupé en morceau placé dans le bac du mixeur Moulinette S" "500w" 500 %}

Après avoir fermé le couvercle et appuyé quelques secondes sur le bouton poussoir qui se trouve sur le dessus de l'appareil, voici le résultat obtenu :  
{% image "./images/moulinette-s-poisson-hache.jpg" "Saumon haché dans le bac du mixeur Moulinette S" "500w" 500 %}

Voici maintenant l'enregistrement de la consommation :

{% profile "moulinette-s.json.gz" '{"name": "Hachage de deux bacs de poisson", "range": ""}' %}

Si nous décomposons, nous voyons deux périodes de forte consommation correspondant au hachage de nos deux poissons, et des périodes de faible consommation lorsque le hachoir était branché mais non utilisé.

### Hachage des poissons

{% profile "moulinette-s.json.gz" '{"name":"Hachage d\'un bac de cabillaud","range":"122185m9890"}' %}

{% profile "moulinette-s.json.gz" '{"name":"Hachage d\'un bac de saumon","range":"251390m9890"}' %}

Les deux bacs de poisson ont été hachés en environ 7 secondes, avec une consommation électrique d'environ {{ 1.00 | Wh€ }} pour chacun d'eux. La puissance maximale mesurée, {{ 625 | W }}, correspond probablement à des moments où le moteur démarrait. La puissance médiane d'environ {{ 520 | W }} correspond probablement à des moments où le moteur était en fonctionnement à une vitesse constante.

Pour dépenser un centime d'électricité, il faudrait hacher environ {{ 1 | countPer€: 0.01 }} bacs de poisson. Le poisson coutera beaucoup plus cher que l'électricité !

### En attente de fonctionnement

Lorsque le hachoir est branché mais n'est pas utilisé, une petite lampe rouge indique qu'il est resté branché :  
{% image "./images/moulinette-s-en-attente.jpg" "Moulinette sans le bac, mais avec un voyant rouge allumé" "500w" 500 %}

{% profile "moulinette-s.json.gz" '{"name":"Consommation en attente","range":"261279m149941"}' %}

La forme du graphique indiquant une alternance de puissances mesurées à {{ 0 | W }} et à des valeurs non nulles mais inférieures à {{ 1 | W }} est ici trompeuse, elle reflète probablement une dépassement de la limite de précision de l'appareil de mesure utilisé. Il est probable que la puissance consommée lorsque le moteur ne tourne pas soit à peu près stable.
Sur l'enregistrement de la consommation, cela correspond à une puissance moyenne de {{ 0.277 | W }}.

Pour dépenser un centime d'électricité, il faudrait laisser l'appareil branché sans l'utiliser pendant {{ 0.277 | times: 24 | countPer€: 0.01 }} jours. S'il reste branché tout le temps, cela consommera {{ 0.277 | W€PerYear }} par an.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette moulinette, on pourrait :
- mesurer la consommation lors du hachage d'aliments plus ou moins durs.
- mesurer la consommation à vide pour distinguer la consommation du moteur pour faire tourner la lame de la consommation du moteur pour hacher les aliments.
- mesurer la consommation en attente avec un appareil plus précis sur les faibles puissances.
{% endplusloin %}
