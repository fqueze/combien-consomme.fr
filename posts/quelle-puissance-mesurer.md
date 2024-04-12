---
layout: post-layout.njk 
title: Quelle puissance mesurer ?
date: 2024-02-10
img: hp-wattmeter.png
tags: ['post']
---

Sur combien-consomme.fr, on parle beaucoup de puissance. Cet article vise à clarifier le lien entre puissance et consommation, indiquer quelles sont les différentes puissantes mesurables, et dans quels cas elles nous intéressent.
<!-- excerpt -->

### Consommation ou puissance

La puissance indique la force électrique utilisée à un instant donné. Elle s'exprime en Watts (W) ou kilo Watts.

La consommation électrique correspond à une quantité d'énergie utilisée. C'est ce qu'on paye sur la facture. Elle s'exprime en Watt-heures (Wh) ou plus souvent kilo Watt-heures (kWh).

Exemple : 1 Wh est la quantité d'énergie consommée par un appareil utilisant une puissance d'1 W pendant une heure, ou d'un appareil utilisant une puissance de 60 W pendant 1 minute, ou d'un appareil consommant 3,6 kW pendant une seconde.

Attention : nous sommes habitués à dire "kilomètres heure" pour l'unité "km/h" qui est en réalité "kilomètres par heures" ; l'unité Watt-heures n'est pas "Watt par heure", mais plutôt "Watts pendant une heure".

### Les différentes puissances

#### Puissance moyenne

La puissance moyenne est obtenue en mesurant la quantité d'énergie consommée et en la divisant par le temps écoulé.
Elle nous intéresse quand on cherche combien coûte l'utilisation d'un appareil (par exemple, combien ça coûte de laisser la lumière allumée).

#### Puissance maximale

La puissance maximale est la puissance mesurée à un bref instant lors de l'utilisation d'un appareil. Pour les appareils dont la consommation est essentiellement due à un moteur électrique (par exemple un frigo), elle est typiquement atteinte lors du démarrage du moteur, qui consomme beaucoup pour démarrer puis consomme moins une fois sa vitesse de rotation souhaitée atteinte.

La puissance maximale est importante pour dimensionner l'installation électrique (choix de la puissance de l'abonnement électrique, section des câbles, ...). Si l'on souhaite réaliser une installation autonome utilisant de l'énergie obtenue depuis des panneaux photovoltaïques, il faudra s'assurer de pouvoir fournir aux appareils la puissance maximale dont ils ont besoin.

#### Puissance médiane

En statistique, la médiane est obtenue en classant les valeurs d'une série de nombres par ordre croissant, et en prenant la valeur qui arrive au milieu de la série. Il y a ainsi dans la série autant de valeurs supérieures ou égales que de valeurs inférieures ou égales à la médiane.

La puissance médiane est intéressante pour un appareil dont la puissance de démarrage est très différente de la puissance en fonctionnement en régime constant. 

### Exemples

#### Congélateur

La pompe d'un congélateur consomme beaucoup pendant quelques secondes lorsqu'elle démarre, puis a une consommation assez faible pendant plusieurs minutes.

Voici ce que ça donne sur <a href="{{ "congelateur.json.gz" | profilerLink }}?hiddenLocalTracksByPid=0-1wb&markerSearch=Freezer&thread=0&v=10">un profil</a> de sa consommation :

{% profile "congelateur.json.gz" %}

#### Four à micro-onde en mode décongélation.

<!--<img src="/images/micro-ondes.jpg" alt="Photo de mon four à micro-ondes" width="512" height="384">-->

{% image "./images/micro-ondes.jpg" "Photo de mon four à micro-ondes" "512w" %}

Ce four fonctionne en tout ou rien : soit il chauffe, soit il ne chauffe pas. Pour réduire la puisance (moyenne !) de chauffe, il chauffe pendant quelques secondes, puis ne fait "rien" (juste l'éclairage et le plateau tournant fonctionnent) pendant quelques secondes, avant de reprendre un cycle de chauffe.

Voici ce que ça donne sur <a href="{{ "micro-ondes.json.gz" | profilerLink }}?hiddenLocalTracksByPid=0-1w6&markerSearch=Micro-onde&thread=0&v=10">un profil</a> de sa consommation :

{% profile "micro-ondes.json.gz" %}
