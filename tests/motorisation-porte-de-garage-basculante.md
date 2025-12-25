---
layout: test-layout.njk 
title: une porte de garage basculante
img: motorisation-porte-garage-basculante.jpg
date: 2024-06-13
tags: ['test']
---

Combien consomme l'ouverture d'une porte de garage motorisée ? Et le récepteur de la télécommande ?
<!-- excerpt -->

{% tldr %}
La consommation en veille, {{ 101 | Wh€PerYear }} par an, est très supérieure à la consommation liée à l'utilisation de la porte — {{ 0.900 | minus: 0.3323 | times: 2 | Wh€PerYear }} par an pour un véhicule servant quotidiennement.

Débrancher sa porte de garage lorsqu'on part en vacances pourrait être une bonne idée !
{% endtldr %}


## Le matériel
{% intro "motorisation-porte-garage-basculante.jpg" "Porte de garage métallique en train de basculer, avec un moteur dont l'éclairage est allumé, branché sur une prise connectée Shelly Plus Plug S" %}

Il s'agit ici d'un [automatisme de porte de garage CAME V6000](https://www.came.com/fr/installateurs/solutions/automatisme-de-portails-garages-et-barrieres/portes-de-garage/v6000) relié à une porte de garage métallique basculante d'un peu moins de 6m2.

Le kit de motorisation complet se trouve pour environ 200€, ce qui en fait un modèle assez bas de gamme. Il était déjà là quand nous avons eu la maison, et comme ça fonctionne, on n'a pas cherché plus loin.

### Méthode de mesure

Le moteur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

La porte étant télécommandée, une partie électronique du mécanisme reste allumée en permanence pour recevoir les signaux de la télécommande. Lorsque la commande est actionnée, le moteur fonctionne pour ouvrir ou fermer la porte. La lumière sous le moteur (8 LED) reste allumée pendant quelques minutes de plus pour permettre de voir ce qu'on fait lorsqu'on sort de la voiture la nuit après avoir fermé le garage :

{% image "./images/motorisation-porte-garage-came-eclairage.jpg" "Éclairage lorsque la porte de garage vient d'être manoeuvrée" "512w" 512 %}

Voici un profil de consommation montrant ces différents types de fonctionnement :

{% profile "porte-garage-basculante.json.gz" '{"name": "Mesure de la consommation pendant une heure", "range": "m3602000"}' %}

La porte a été ouverte pour sortir, puis fermée 1 minutes 20s plus tard. De retour à la maison une demi heure plus tard, j'ai à nouveau ouvert la porte, mais cette fois elle est restée ouverte un peu plus de 7 minutes, laissant le temps à l'éclairage sous le moteur de s'éteindre avant la fermeture.

Détaillons la consommation lors de ces différents événements.

### Ouverture et fermeture

{% profile "porte-garage-basculante.json.gz" '{"name": "Ouverture puis fermeture de la porte", "range": "5750m288474"}' %}

Lors de l'ouverture, on observe un pic de consommation lors du démarrage du moteur, suivi d'une consommation qui diminue puis ré-augmente, avec un maximum à {{ 80.8 | W }} avant de redescendre. Ce maximum est inférieur à la puissance de {{ 100 | W }} indiquée sur l'étiquette, qui serait peut-être atteint avec une porte plus lourde.

{% image "./images/motorisation-porte-garage-came-etiquette.jpg" "Étiquette de la motorisation CAM V6000" "512w" 512 %}

Cette variation de consommation correspond à la variation de l'intensité de l'effort à fournir pour manoeuvrer la porte à différents points de sa course (on sent très bien ça lorsqu'on manipule une porte basculante manuellement).

Lorsque la porte a fini de s'ouvrir, la puissance mesurée se stabilise à environ {{ 7 | W }} jusqu'au moment où la porte est refermée. On observe que si la durée pour la fermeture de la porte est la même que pour l'ouverture, la puissance consommée est en revanche nettement inférieure pour refermer la porte. Là encore, cela correspond à ce qu'on remarque lorsqu'on manipule la porte manuellement.

L'énergie totale consommée pour l'ouverture et fermeture de la porte est seulement de {{ 0.9 | Wh€ }}. Comme nous allons le voir, c'est peu comparé à la consommation lorsque le mécanisme est en attente de commandes.

### En attente

Voici un profil de la consommation de la motorisation lorsqu'elle reste en attente pendant une journée complète :
{% profile "porte-garage-basculante.json.gz" '{"name": "En attente pendant une journée", "range": "3647361m86430000"}' %}

Cette consommation en attente, {{ 101 | Wh€ }} par jour, représente {{ 101 | Wh€PerMonth }} par mois, ou {{ 101 | Wh€PerYear }} par an.

Sur la durée du profil précédent où la porte était manipulée, la consommation en attente représente {{ 0.332 | Wh }}, la surconsommation réellement causée par la manipulation de la porte n'était donc que de {{ 0.900 | minus: 0.3323 | Wh }}. Il suffit de laisser la porte en attente pendant 8 minutes pour consommer autant d'énergie que lorsque la porte est ouverte puis fermée !

Si l'on suppose que le garage contient un véhicule qui sort une fois par jour, chaque jour de l'année, (la porte est donc ouverte et fermée 2 fois par jour), la consommation totale annuelle liée à la manipulation de la porte serait de {{ 0.900 | minus: 0.3323 | times: 2 | Wh€PerYear }}. C'est 89 fois moins que la consommation en attente !

### Ouverture

Regardons maintenant la consommation lorsque la porte est ouverte, et n'est pas refermée rapidement :
{% profile "porte-garage-basculante.json.gz" '{"name": "Ouverture de la porte", "range": "1969525m184054"}' %}

Si l'on décompose, on a d'abord la phase de fonctionnement du moteur :
{% profile "porte-garage-basculante.json.gz" '{"name": "Ouverture de la porte, phase de fonctionnement du moteur", "range": "1970159m22874"}' %}

Ce fonctionnement dure 23 secondes.

On a ensuite une phase pendant laquelle on observe une surconsommation liée à l'éclairage :

{% profile "porte-garage-basculante.json.gz" '{"name": "Ouverture de la porte, phase d\'éclairage", "range": "1993128m158946"}' %}

Cette phase dure 2 minutes 40 secondes. La consommation moyenne pendant cette phase est d'abord de {{ 7.1 | W }} pendant 1 minutes 36s (2 minutes après l'appui sur la commande ?) puis de {{ 6.5 | W }} pendant une minute de plus. je ne sais pas ce qui cause ce changement.

On peut observer que l'énergie consommée pendant que le moteur fonctionne {{ 0.273 | Wh }} est inférieure à l'énergie consommée ensuite pendant que la lumière reste allumée ({{ 0.301 | Wh }}) !

La surconsommation pour l'ouverture de la porte, {{ 0.273 | minus: 0.027 | Wh }}, correspond à l'énergie consommée par la porte en attente en 3 minutes 30.

### Fermeture

{% profile "porte-garage-basculante.json.gz" '{"name": "Fermeture de la porte", "range": "2457123m183354"}' %}

Comme pour l'ouverture, on a 2 phases.
{% profile "porte-garage-basculante.json.gz" '{"name": "Fermeture de la porte, phase de fonctionnement du moteur", "range": "2458255m24790"}' %}

La consommation pendant le fonctionnement du moteur n'est ici que de {{ 0.153 | Wh }}, soit une surconsommation de {{ 0.153 | minus: 0.027 | Wh }} par rapport à la porte en attente sur la même durée, ce qui correspond à 1 minute 50 de fonctionnement en attente.

La consommation après la fin du fonctionnement du moteur est très similaire à ce qu'elle était lors de l'ouverture.

### Démarrage

La consommation en attente étant très supérieure à la consommation liée aux manipulations de la porte, il est tentant de débrancher complètement la motorisation lorsqu'on sait qu'elle ne va pas être utilisée pendant un certain temps (par exemple lorsque l'on part en vacances).

Certains appareils consomment plus lorsqu'on vient juste de les allumer, regardons si c'est le cas ici :
{% profile "porte-garage-basculante.json.gz" '{"name": "Initialisation de la motorisation", "range": "94787880m225890"}' %}

Lorsque la motorisation vient d'être rebranchée, on observe un petit pic de puissance à {{ 6.1 | W }} pendant 2 secondes. La consommation moyenne est ensuite de {{ 4.9 | W }} pendant 2 minutes, avant de revenir à la puissance consommée au repos ({{ 4.2 | W }}).

La surconsommation lorsque la porte est rebranchée est de {{ 0.166 | minus: 0.142 | Wh }} ; c'est ce que la porte consomme en attente en 20 secondes. En théorie, on économiserait donc de l'énergie en débranchant la porte dès qu'on est certain qu'elle ne servira pas pendant au moins 20 secondes. En pratique, cela perdrait évidemment tout l'avantage d'avoir une porte télécommandée.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une motorisation de porte de garage, on pourrait :
- tester différents types de portes. Par exemple, l'effort à fournir pour manoeuvrer une porte sectionnelle est peut-être plus linéaire que celui fourni pour manoeuvrer une porte basculante.
- comparer des portes de surfaces différentes (et donc de poids différents) pour voir si une porte plus grande et lourde augmente significativement la puissance demandée par le moteur.
- voir s'il est possible de modifier la temporisation de l'éclairage (voire supprimer entièrement l'éclairage) pour regarder quelle économie cela engendrerait.
{% endplusloin %}
