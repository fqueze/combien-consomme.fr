---
layout: test-layout.njk 
title: un destructeur d'insectes
img: destructeur-insectes.jpg
date: 2024-08-07
tags: ['test']
---

Combien consomme l'utilisation d'une lampe destructeur d'insectes ?
<!-- excerpt -->

{% tldr %}
- Sur une nuit, le destructeur d'insectes a consommé {{ 124 | Wh€ }}.
- Utiliser le destructeur d'insectes toutes les nuits consomme {{ 142 | Wh€PerMonth }} par mois.
- L'utiliser tout le temps consomme {{ 11.5| times: 24 | Wh€PerMonth }} par mois.
- L'utilisation nocturne sur un été consomme {{ 142 |times: 3 | Wh€PerMonth }}.
{% endtldr %}

## Le matériel
{% intro "destructeur-insectes.jpg" "Une lampe destructeur d'insectes ELKC212ET" %}

Le destructeur d'insectes testé est le modèle ELKC212ET 12W de la marque Electris.

Il fonctionne avec 2 tubes UV fluorescents de 6 Watts chacun qui attirent les insectes sur une grille métallique haute tension qui électrocute les moustiques lorsqu'ils la touchent.

Ce type de [destructeur d'insectes](https://fr.wikipedia.org/wiki/Lampe_anti-insectes) est efficace les nuits d'été contre les moustiques, et permet d'éviter de se faire piquer pendant son sommeil.

### Méthode de mesure

Le destructeur d'insectes est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Même si la description de l'appareil indique une puissance de 12 Watts, l'étiquette listant ses caractéristiques techniques indique une puissance de {{ 18.5 | W }} :  
{% image "./images/destructeur-insectes-etiquette.jpg" "Photo de l'étiquette montrant les catactéristiques techniques du destructeur d'insectes" "300w" 300 %}  

### Sur une nuit

Voici une mesure de la consommation du destructeur d'insectes sur une nuit :
{% profile "destructeur-insectes.json.gz" '{"name": "Consommation du destructeur d\'insectes pendant une nuit", "range": ""}' %}

On observe sur cet enregistrement :
- un bref pic de consommation à {{ 25.3 | W }} lors du démarrage (cette puissance au démarrage dépasse la valeur indiquée sur l'étiquette) ;
- après 2 secondes, la consommation se stabilise et reste ensuite stable pendant toute la durée du fonctionnement ;
- les consommations médiane et moyenne sont mesurées à {{ 11.5 | W }} (puissance nettement inférieure à l'indication sur l'étiquette, mais proche de celle du descriptif) ;
- l'électrocution d'insectes ne cause pas une surconsommation assez forte pour être visible.

Pour une nuit de 12 heures et 22 minutes, la consommation totale mesurée est de {{ 142 | Wh€ }}. Si le destructeur d'insectes avait fonctionné toute la journée, il aurait consommé {{ 11.5 |times: 24 | Wh€ }}.

### Sur un mois
Si le destructeur d'insectes est utilisé toutes les nuits pendant un mois, {{ 142 | Wh€PerMonth }} seront consommés.

S'il est utilisé 24 heures sur 24 pendant un mois, {{ 11.5| times: 24 | Wh€PerMonth }} seront consommés.

### Sur un été

Si l'on suppose que le destructeur d'insectes est utilisé pendant 3 mois, la consommation s'élèvera à {{ 142 |times: 3 | Wh€PerMonth }} pour un usage nocturne, et {{ 11.5| times: 24 | times: 3 | Wh€PerMonth }} pour un usage continu.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce destructeur d'insectes, on pourrait :
- mesurer la consommation avec un appareil de mesure ayant un taux d'échantillonnage plus élevé, afin de voir si l'électrocution d'un moustique cause un bref pic de consommation.
- mesurer la consommation en retirant un, puis deux tubes, afin de comprendre quelle consommation est causée par chaque tube, et quelle consommation est causée par la grille à haute tension et l'interrupteur éclairé.
{% endplusloin %}
