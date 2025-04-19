---
layout: test-layout.njk 
title: une fontaine pour animaux de compagnie
img: fontaine-chat-avec-chat.jpg
date: 2024-08-08
tags: ['test']
---

Une fontaine permet à votre fidèle compagnon d'avoir une eau filtrée et toujours en mouvement, pour s'hydrater avec plaisir. Combien consomme ce petit bonheur offert à votre chat ou chien ?
<!-- excerpt -->

{% tldr %}
- La consommation annuelle de la fontaine testée s'élève à {{ 6.65 | times: 8 | Wh€PerYear }}.
- La puissance moyenne mesurée est de {{ 2.21 | W }}.
- Il faudrait plus de {{ 6.65 | times: 8 | times: 365.2425 | countPer€: 35.99 }} ans d'utilisation continue pour dépenser plus en électricité que le prix d'achat.
{% endtldr %}

## Le matériel
{% intro "fontaine-chat.jpg" "Une fontaine à eau pour animaux de compagnie Drinkwell de la marque PetSafe" %}

La fontaine à eau testée est la [fontaine à papillon Drinkwell](https://fr.petsafe.net/collections/fontaines-pour-animaux/products/fontaine-a-eau-papillon-drinkwell-de-petsafe-pour-animaux-de-compagnie) de la marque PetSafe.

Une pompe immergée fait circuler l'eau en continu, évitant ainsi à l'animal d'avoir une eau stagnante. Un jet d'eau sort vers le haut ; ce jet est divisé en 4 par un papillon amovible. L'eau est filtrée par un filtre en mousse qui retient les poils et poussières, et par un filtre à charbon qui évite à l'eau d'avoir mauvais goût.

### Méthode de mesure

La fontaine est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Le [guide de démarrage rapide](https://intl.petsafe.net/media/downloads/R4_400-2433-19_MW_compressed.pdf) fourni avec la fontaine indique : « La consommation électrique de cet appareil est de 2,5 watts. »

Les inscriptions (peu lisibles) sur le plastique sous la fontaine indiquent une puissance de {{ 3 | W }} :  
{% image "./images/fontaine-chat-etiquette.jpg" "Photo des caractéristiques techniques inscrites sous la fontaine" "500w" 500 %}  

Le transformateur indique une puissance de sortie de {{ 2.4 | W }} :  
{% image "./images/fontaine-chat-transfo.jpg" "Photo de l'étiquette montrant les catactéristiques techniques du destructeur d'insectes" "300w" 300 %}  

Trois valeurs différentes ! Mesurons pour vérifier :
{% profile "fontaine-chat.json.gz" '{"name": "Consommation de la fontaine à eau pour animaux pendant 3 heures", "range": ""}' %}

Sur cet enregistrement d'une durée de 3 heures, la puissance moyenne mesurée est de {{ 2.21 | W }}.

On peut aussi observer que la puissance maximale ({{ 2.7 | W }}) est légèrement supérieure à la puissance de sortie indiquée sur le transformateur ; cela peut s'expliquer par les pertes du transformateur, qui chauffe un peu.

Pour 3 heures, la consommation totale a été de {{ 6.65 | Wh€ }}.

Si on extrapole :
- sur une journée la consommation serait de {{ 6.65 | times: 8 | Wh€ }}.
- sur un mois, la consommation serait de {{ 6.65 | times: 8 | Wh€PerMonth }}.
- sur un an, la consommation serait de {{ 6.65 | times: 8 | Wh€PerYear }}.

Le prix indiqué sur le site du fabriquant pour cette fontaine étant de 35,99 euros, pour dépenser autant d'électricité que le prix d'achat, il faudrait utiliser la fontaine en continu pendant plus de {{ 6.65 | times: 8 | times: 365.2425 | countPer€: 35.99 }} ans. Si la fontaine dure aussi longtemps, il est probable que les consommables (filtres à remplacer toutes les 2 à 6 semaines) coûteront beaucoup plus cher que l'électricité.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette fontaine pour animaux, on pourrait :
- vérifier si la consommation augmente lorsque le filtre est encrassé ;
- vérifier si la consommation varie en fonction de la quantité d'eau présente dans le bac de la fontaine ;
- vérifier si la consommation varie en fonction du niveau de viscosité du liquide présent dans le bac (par exemple en mettant un peu d'huile) ;
- vérifier si retirer le papillon pour avoir un seul jet au lieu de 4 réduit la consommation ;
- s'intéresser à la consommation du transfo, en comparant l'électricité utilisée en courant continu par la fontaine à l'énergie prélevée sur le réseau électrique en courant alternatif.
{% endplusloin %}
