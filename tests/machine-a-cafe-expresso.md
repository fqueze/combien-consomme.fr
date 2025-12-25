---
layout: test-layout.njk
title: une machine à café expresso
img: machine-a-cafe-expresso.jpg
date: 2025-12-23
tags: ['test']
---

Les machines à café expresso permettent de préparer un café sous pression à la maison, avec une qualité proche de celle d'un bar. Quel est l'impact de ce plaisir caféiné sur la facture d'électricité ?

<!-- excerpt -->

{% tldr %}
- Si vous prenez 2 cafés par jour, la consommation annuelle sera de {{ 24.6 | times: 2 | Wh€PerYear }}.
- Préparer un double expresso (préchauffage compris) consomme {{ 24.6 | Wh€ }}.
- Faire plusieurs cafés d'affilée est plus économe en énergie : le préchauffage représente {{ 16.8 | percent: 24.6 }} de la consommation.
- Il faudrait {{ 24.6 | times: 2 | PerYear | countPer€: 130 }} ans de cafés quotidiens pour dépenser l'équivalent du prix d'achat en électricité.
{% endtldr %}

{% comment %}
Notes from draft:
Machine à expresso DELONGHI ECP33.21.BK Noir (prix neuf environ 130euros)
Pression : 15 bars
Capacité en eau : 1,1 L
Café moulu ou dosettes papier 

Pour le test on a laissé préchauffer la machine puis on a préparé un double espresso à partir de café moulu.


Le manuel indique :
Consommation d'énergie lorsque le produit est éteint : 0 W
Temps avant l'extinction automatique : 9 min
{% endcomment %}

## Le matériel

{% intro "machine-a-cafe-expresso.jpg" "Machine à expresso De'Longhi ECP33.21.BK" %}

La machine testée est une De'Longhi ECP33.21.BK, une machine à [expresso](https://fr.wikipedia.org/wiki/Expresso "Page « Expresso » sur Wikipédia") manuelle qui fonctionne avec du café moulu ou des dosettes papier. Elle dispose d'une pression de 15 bars et d'un réservoir d'eau de 1,1 L. Le modèle neuf coûte environ 130 euros.

Ce type de machine nécessite un préchauffage avant la première utilisation, puis maintient sa température grâce à un thermostat. Un voyant rouge indique qu'elle est allumée, et un voyant « ok » s'allume lorsque la température de chauffe est atteinte.

Merci à Yazid pour sa participation active à ce test : c'est sa machine, et c'est lui qui a préparé les cafés que nous avons mesurés.

### Méthode de mesure

La machine à café est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

Les indications techniques sont inscrites sur le dessous de la machine :

{% image "./images/machine-a-cafe-expresso-etiquette.jpg" "Étiquette de la machine" "500w" 500 %}
{% comment %}De'Longhi
TYPE: ECP33.21.BK
220-240V ~ 50-60Hz
1100W
P=1.5MPa (15 bar){% endcomment %}

L'étiquette indique « 220-240V ~ 50-60Hz 1100W », soit une puissance nominale de {{ 1100 | W }}.

#### Manuel

Le manuel d'utilisation précise deux points importants pour la consommation électrique :

- « *Consommation d'énergie lorsque le produit est éteint : 0 W* » : la machine dispose d'un interrupteur mécanique qui coupe totalement l'alimentation.
- L'extinction automatique se déclenche après 9 minutes d'inactivité pour éviter une consommation inutile.

### Un double expresso

Pour ce test, nous avons laissé préchauffer la machine puis préparé un double expresso à partir de café moulu.

Voici la machine au départ, tous les voyants sont éteints :

{% image "./images/machine-a-cafe-expresso-gauche.jpg" "Machine à expresso De'Longhi ECP33.21.BK éteinte" "500w" 500 %}
{% comment %}1ière photo de 3/4 gauche de la machine, les 2 leds de la façade sont éteintes.{% endcomment %}

L'interrupteur marche/arrêt se trouve sur le côté droit :

{% image "./images/machine-a-cafe-expresso-droite.jpg" "Profil droit montrant l'interrupteur marche/arrêt" "500w" 500 %}
{% comment %}2e photo montrant le profil droit : on voit l'interrupteur marche arrêt en bas à droite{% endcomment %}

Le test complet a duré un peu plus de 2 minutes et consommé {{ 24.6 | Wh€ }} :

{% profile "machine-a-cafe-expresso.json.gz" '{"name": "préchauffage puis double expresso", "range": "38551m125811"}' %}
{% comment %}draft: premier profil à montrer : le test complet. Préchauffage, puis quelques secondes d'attente, puis préparation d'un double espresso.{% endcomment %}

On observe trois phases distinctes :
1. Le préchauffage initial avec une consommation élevée ;
2. Une courte phase d'attente de quelques secondes avec une consommation très faible ;
3. La préparation du café avec deux niveaux de puissance : d'abord une consommation modérée, puis une forte montée en puissance.

### En détail

#### Le préchauffage

Le préchauffage dure un peu plus d'une minute et consomme {{ 16.8 | Wh€ }} :

{% profile "machine-a-cafe-expresso.json.gz" '{"name": "préchauffage", "range": "37863m67811"}' %}
{% comment %}draft: zoom sur le préchauffage{% endcomment %}

La puissance médiane est de {{ 973 | W }}. On observe un creux de consommation pendant quelques secondes, dont je n'ai pas l'explication. Pendant cette phase, le voyant rouge est allumé mais le voyant « ok » reste éteint :

{% image "./images/machine-a-cafe-expresso-prechauffage.jpg" "Machine en préchauffage avec voyant rouge allumé" "500w" 500 %}
{% comment %}photo de face pendant le préchauffage : voyant rouge allumé qui montre qu'elle est allumée, mais le voyant "ok" est éteint : elle n'a pas encore atteint sa température.{% endcomment %}

Le préchauffage représente {{ 16.8 | percent: 24.6 }} de la consommation totale d'un cycle complet.

#### En attente

Une fois le préchauffage terminé, le voyant « ok » s'allume pour indiquer que la machine est prête :

{% image "./images/machine-a-cafe-expresso-attente.jpg" "Machine prête avec voyant ok allumé" "500w" 500 %}

Il nous a fallu quelques secondes pour remarquer le voyant vert et être prêts à lancer la préparation :

{% profile "machine-a-cafe-expresso.json.gz" '{"name": "en attente", "range": "105594m17066"}' %}
{% comment %}draft: en attente : c'est le temps qu'il nous a fallu pour lancer la préparation du café une fois que la machine avait atteint sa température (voyant "ok" allumé). Dure probablement 9 minutes avant l'extinction automatique d'après le manuel.{% endcomment %}

La consommation en attente est faible : {{ 1.65 | W }} en moyenne. D'après le manuel, la machine s'éteindrait automatiquement après 9 minutes dans cet état.

Si la machine restait en attente pendant 9 minutes, elle consommerait {{ 1.65 | times: 540 | divided_by: 3600 | Wh }} supplémentaires.

#### La préparation du double expresso

La préparation du double expresso dure environ 40 secondes et consomme {{ 7.84 | Wh€ }} :

{% profile "machine-a-cafe-expresso.json.gz" '{"name": "double expresso", "range": "122660m41702"}' %}
{% comment %}draft: préparation de la boisson. 2 phases : d'abord une phase de faible conso (probablement uniquement la pompe ?) puis une phase de forte conso (encore plus forte que lors du préchauffage) : chauffage + pompe ?{% endcomment %}

On observe deux phases distinctes :
1. Une première phase d'environ 12 secondes avec une consommation modérée ;
2. Une seconde phase avec une forte consommation allant jusqu'à {{ 1060 | W }}.

La première phase correspond probablement au fonctionnement de la pompe seule, qui fait passer l'eau à travers le café moulu. Voici un zoom sur cette phase :

{% profile "machine-a-cafe-expresso.json.gz" '{"name": "double expresso — démarrage", "range": "122660m13041"}' %}
{% comment %}draft: zoom sur la première partie{% endcomment %}

La puissance reste stable autour de {{ 43.6 | W }}, ce qui correspond à l'alimentation de la pompe à 15 bars. Cette phase consomme {{ 0.145 | Wh }}, soit seulement {{ 0.145 | percent: 7.84 }} de la consommation totale de la préparation.

La seconde phase, plus gourmande, correspond au fonctionnement simultané de la résistance chauffante et de la pompe. La machine chauffe l'eau en continu pendant son passage, d'où cette forte consommation qui atteint {{ 1060 | W }}, proche de la puissance nominale de {{ 1100 | W }} indiquée sur l'étiquette.

### Coût d'usage

Le coût électrique de la préparation d'un double expresso, préchauffage compris, est de {{ 24.6 | Wh€ }}. Il faudrait préparer {{ 24.6 | countPer€: 1 }} cafés pour dépenser un euro d'électricité.

Dans la réalité, si vous préparez plusieurs cafés d'affilée, le préchauffage n'est nécessaire qu'une seule fois. Le coût par café supplémentaire n'est alors que de {{ 7.84 | Wh€ }}. Il faudrait préparer {{ 7.84 | countPer€: 0.01 }} cafés supplémentaires pour dépenser un centime.

Si l'on suppose que vous préparez 2 cafés par jour (un le matin et un après le déjeuner), la consommation annuelle sera de {{ 24.6 | times: 2 | Wh€PerYear }} par an. C'est dérisoire comparé au coût du café lui-même : à 20 euros le kilo de café moulu en supermarché, et environ 7 g par café selon le manuel, chaque café coûte 0,14 euros en matière première, soit plus de 10 fois plus que l'électricité.

À ce rythme, il faudrait {{ 24.6 | times: 2 | PerYear | countPer€: 130 }} ans de cafés quotidiens pour dépenser l'équivalent du prix d'achat de la machine (130 euros) en électricité. Pas sûr que la machine tienne aussi longtemps !

### En veille

Lorsque la machine est éteinte via son interrupteur mécanique, la consommation est de 0 W, comme indiqué dans le manuel. Il n'y a donc aucune consommation parasite lorsque la machine est inutilisée, à condition de bien l'éteindre avec l'interrupteur. L'extinction automatique après 9 minutes d'inattention permet d'éviter de la laisser allumée par oubli.

### Conseils pour l'autoconsommation photovoltaïque

La puissance d'un peu plus de {{ 1000 | W }} pendant la préparation reste compatible avec une installation photovoltaïque domestique standard. Une installation en toiture standard de 3 kWc produira suffisamment en milieu de journée ensoleillée pour alimenter la machine à café.

La courte durée d'utilisation (environ 2 minutes pour un cycle complet) facilite l'autoconsommation : pas besoin de synchroniser finement avec les pics de production solaire. Vous pouvez préparer votre café dès que le soleil brille un peu.

Pour maximiser l'autoconsommation, plusieurs options :
- préparer vos cafés au déjeuner plutôt qu'au réveil ;
- si vous êtes en télétravail, profiter des pauses café en journée pour utiliser la production solaire ;
- préparer plusieurs cafés d'affilée si vous recevez des invités (le préchauffage n'est nécessaire qu'une fois) ;
- éviter de lancer la machine à café en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %}, {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} ou {% test four-a-micro-ondes un four à micro-ondes %}, pour ne pas dépasser la capacité de production solaire.

Cela dit, avec un coût électrique de {{ 24.6 | Wh€ }} par café, l'enjeu économique reste très faible. L'intérêt est surtout environnemental : utiliser directement l'énergie solaire pour votre pause café.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une machine à café expresso, on pourrait :
- tester les différentes boissons que la machine peut préparer (simple expresso, double expresso, cappuccino, avec café moulu ou dosettes papier) ;
- observer le comportement de la machine sur les 9 minutes d'attente avant l'extinction automatique (cycles de maintien en température) ;
- comparer avec une machine à café automatique avec broyeur intégré, qui nécessite plus d'électronique et de mécanismes ;
- tester la préparation de plusieurs cafés d'affilée pour quantifier précisément l'économie réalisée en évitant les préchauffages multiples.
{% endplusloin %}
