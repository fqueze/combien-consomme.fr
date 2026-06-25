---
layout: test-layout.njk
title: une hotte de cuisine
img: hotte-de-cuisine.jpg
date: 2026-06-10
tags: ['test']
---

Au-dessus des plaques, la hotte aspire les vapeurs et les odeurs de cuisson. Comme elle fait beaucoup de bruit, on est tenté de l'arrêter au plus vite ; cette perception de consommation liée au vacarme est-elle juste ?

<!-- excerpt -->

{% tldr %}
- Utilisée une vingtaine de minutes par jour, la hotte consommera {{ 43.9 | Wh€PerYear }} sur une année.
- Malgré un moteur annoncé à {{ 250 | W }} sur l'étiquette, l'aspiration ne consomme en réalité qu'environ {{ 140 | W }}.
- Sur le modèle testé, les trois vitesses consomment quasiment la même chose ({{ 138 | W }}, {{ 137 | W }} et {{ 142 | W }}) : aucun intérêt à réduire la vitesse pour économiser l'énergie.
- La consommation décroît au fil du fonctionnement, à mesure que le moteur chauffe.
{% endtldr %}

## Le matériel

{% intro "hotte-de-cuisine.jpg" "Hotte encastrée IKEA UNDERVERK installée sous un meuble haut" %}

Il s'agit d'une [hotte aspirante](https://fr.wikipedia.org/wiki/Hotte_aspirante "Page « Hotte aspirante » sur Wikipédia") encastrée [IKEA](https://fr.wikipedia.org/wiki/IKEA "Page « IKEA » sur Wikipédia") UNDERVERK de 60 cm de large, modèle récent acheté neuf en 2025 pour {{ 369 | € }}. Elle est munie de deux réglettes d'éclairage à LED de part et d'autre du filtre, et d'un moteur d'aspiration qui rejette l'air vers l'extérieur par un conduit.

Sa commande se fait par un bouton rotatif rétractable : enfoncé, la hotte est complètement éteinte ; sorti, en position 0, seul l'éclairage fonctionne, puis trois vitesses sont disponibles pour l'aspiration.
{% endintro %}

Vue de face, la hotte présente son filtre métallique encadré d'inox et ses deux réglettes d'éclairage :

{% image "./images/hotte-de-cuisine-face.jpg" "Vue de face de la hotte, filtre et éclairage allumés" "700w" 700 %}

En ouvrant ce filtre, on découvre que l'essentiel du volume de la hotte est occupé par un gros [ventilateur centrifuge](https://fr.wikipedia.org/wiki/Ventilateur_centrifuge "Page « Ventilateur centrifuge » sur Wikipédia") qui aspire l'air de la cuisine à travers lui :

{% image "./images/hotte-de-cuisine-moteur.jpg" "Ventilateur centrifuge à l'intérieur de la hotte, filtre ouvert" "500w" 500 %}
{% comment %}lorsque le filtre est ouvert, on voit à l'intérieur de la hotte que l'espace est utilisé par un gros ventilateur aspirant l'air de la cuisine à travers le filtre. On aperçoit aussi à gauche l'étiquette{% endcomment %}

On aperçoit dans un coin de cette photo l'étiquette signalétique de la hotte.

## Consommation

### Informations fournies par le fabricant

Voici l'étiquette signalétique entrevue plus haut :

{% image "./images/hotte-de-cuisine-etiquette.jpg" "Étiquette signalétique de la hotte UNDERVERK" "500w" 500 %}
{% comment %}UNDERVERK
Model: 703.891.39
220-240 V ~ 50 Hz
TOT. 256,0 W
1x250,0 + 2x3,0W
IPXO  CLASSE I{% endcomment %}

L'étiquette indique « *TOT. 256,0 W* » et « *1x250,0 + 2x3,0W* », soit une puissance totale de {{ 256 | W }} qui se répartit entre un moteur de {{ 250 | W }} et deux réglettes d'éclairage de 3 W chacune.

C'est ce moteur de {{ 250 | W }} annoncés qui devrait dominer la consommation. Mais à quoi correspond cette valeur : la puissance moyenne, le maximum atteint au démarrage, la consommation à pleine vitesse ? C'est ce que nos mesures vont permettre de vérifier.

### Méthode de mesure

La hotte est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation. La prise est intercalée sur l'alimentation de la hotte, derrière le conduit d'évacuation :

{% image "./images/hotte-de-cuisine-shelly-et-tuyau.jpg" "Prise Shelly placée derrière le conduit d'évacuation de la hotte" "500w" 500 %}
{% comment %}pour nos mesures, une prise shelly plus plug s a été placée sur la connexion au secteur de la hotte. On aperçoit ici la prise shelly derrière le tuyau d'évacuation de la hotte.{% endcomment %}

La puissance instantanée est collectée et enregistrée une fois par seconde.

### En conditions réelles : la cuisson d'artichauts

Pour une première mesure, nous avons utilisé la hotte normalement, pendant la {% test cuisson-artichauts cuisson d'artichauts à la cocotte-minute %}. La hotte aspire le jet de vapeur que la cocotte rejette :

{% image "./images/hotte-de-cuisine-vapeur.jpg" "La hotte aspirant la vapeur rejetée par une cocotte-minute" "300w" 300 %}
{% comment %}La hotte en cours d'utilisation, ici avec une cocotte minute qui rejette un jet de vapeur du à la cuisson d'artichauts, vapeur aspirée par la hotte{% endcomment %}

La séquence complète a duré {{ 1911097 | divided_by: 1000 | s }} et consommé {{ 50.4 | Wh€ }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "cuisson artichauts", "range": "337445m1911097"}' %}
{% comment %}draft: cuisson artichauts{% endcomment %}

On distingue trois temps : d'abord l'éclairage seul, le temps que la cocotte monte en pression sans encore rejeter de vapeur, puis le moteur d'aspiration mis en marche pour le gros de la cuisson, et enfin de nouveau l'éclairage seul à la fin.

Au tout début, seul l'éclairage est allumé et la consommation reste autour de {{ 4.3 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "cuisson artichauts — éclairage initial", "range": "337445m372390"}' %}
{% comment %}draft: cuisson artichauts — éclairage initial{% endcomment %}

L'aspiration est ensuite mise en route et fonctionne pendant {{ 1304783 | divided_by: 1000 | s }}, pour une consommation de {{ 49.7 | Wh€ }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "cuisson artichauts — aspiration", "range": "709834m1304783"}' %}
{% comment %}draft: cuisson artichauts — aspiration{% endcomment %}

Ce qui saute aux yeux, c'est le pic de consommation au démarrage du moteur. En regardant de plus près, on remarque aussi que le plateau n'est pas parfaitement plat : la consommation décroît lentement au fil du temps. C'est plus visible en comparant le début et la fin de cette phase. Pendant les deux premières minutes, la puissance médiane est de {{ 145 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "cuisson artichauts — aspiration — 2 premières minutes", "range": "717578m120025"}' %}
{% comment %}draft: cuisson artichauts — aspiration — 2 premières minutes{% endcomment %}

Pendant les deux dernières minutes, elle est retombée à {{ 134 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "cuisson artichauts — aspiration — 2 dernières minutes", "range": "1889430m120025"}' %}
{% comment %}draft: cuisson artichauts — aspiration — 2 dernières minutes{% endcomment %}

Cette lente diminution de la consommation est probablement liée au moteur électrique qui s'échauffe au cours du fonctionnement. C'est justement l'évolution que nous voulions observer à l'issue de notre {% test aspirateur-atelier test d'un aspirateur d'atelier %}, sans avoir alors mesuré d'utilisation assez longue.

Surtout, on est très loin des {{ 250 | W }} annoncés pour le moteur : même à pleine aspiration, la hotte se contente d'environ {{ 140 | W }}.

### Les trois vitesses d'aspiration

Pour comparer les trois vitesses, nous avons enchaîné l'éclairage seul puis chacune des trois vitesses, quelques secondes chacune. Ce test a été réalisé juste après la cuisson des artichauts ci-dessus : le moteur avait donc déjà chauffé, ce qui est important pour interpréter les valeurs. Voici l'enchaînement complet :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Test systématique", "range": "2279767m152663"}' %}
{% comment %}draft: Test systématique{% endcomment %}

On distingue le palier bas de l'éclairage, puis trois paliers d'aspiration séparés par de petits pics de consommation à chaque changement de vitesse.

Le bouton de réglage permet de choisir la vitesse :

{% image "./images/hotte-de-cuisine-bouton.jpg" "Bouton rotatif de réglage : position 0 puis trois vitesses d'aspiration" "500w" 500 %}
{% comment %}bouton de réglage. Il est rétractable, la hotte est complètement éteinte lorsqu'il est enfoncé. Lorsqu'il est sorti, en position 0 seul l'éclairage fonctionne, puis il y a 3 vitesses pour l'aspiration.{% endcomment %}

En position 0, seul l'éclairage est alimenté, à {{ 4.3 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Test systématique — éclairage", "range": "2282220m30617"}' %}
{% comment %}draft: Test systématique — éclairage{% endcomment %}

La vitesse 1 porte la consommation à {{ 138 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Test systématique — vitesse 1", "range": "2320122m30617"}' %}
{% comment %}draft: Test systématique — vitesse 1{% endcomment %}

La vitesse 2 donne {{ 137 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Test systématique — vitesse 2", "range": "2360137m30617"}' %}
{% comment %}draft: Test systématique — vitesse 2{% endcomment %}

Et la vitesse 3 monte à peine, à {{ 142 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Test systématique — vitesse 3", "range": "2396680m30617"}' %}
{% comment %}draft: Test systématique — vitesse 3{% endcomment %}

Sur ce modèle, les trois vitesses consomment donc quasiment la même chose. Étonnamment, la vitesse 2 consomme très légèrement *moins* que la vitesse 1 : je n'ai pas d'explication à proposer. Quoi qu'il en soit, baisser la vitesse pour économiser l'énergie n'a ici aucun intérêt, et choisir la vitesse maximale ne fait pratiquement aucune différence sur la facture. Autant aspirer fort et couper plus tôt.

### Des utilisations plus longues

Les mesures précédentes étant courtes, ou faites moteur déjà chaud, nous avons relancé la hotte d'autres jours, en repartant à chaque fois d'un moteur froid, pour observer l'évolution sur la durée.

Sur une utilisation d'une vingtaine de minutes, la consommation est de {{ 43.9 | Wh€ }}, pour une puissance moyenne de {{ 130 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Utilisation pendant 20 minutes", "range": "68291418m1218105"}' %}
{% comment %}draft: Utilisation pendant 20 minutes{% endcomment %}

On observe ici aussi un pic de consommation au démarrage, à {{ 226 | W }}, comme pour tous les moteurs électriques. La puissance retombe ensuite et décroît lentement tout au long de l'utilisation, à mesure que le moteur chauffe.

Sur une utilisation de trois quarts d'heure, la même tendance se confirme : {{ 95.1 | Wh€ }} consommés, pour une puissance moyenne de {{ 128 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Utilisation pendant 45 minutes", "range": "312921411m2679142"}' %}
{% comment %}draft: Utilisation pendant 45 minutes{% endcomment %}

La décroissance est nette quand on compare le début et la fin. Pendant les deux premières minutes, la puissance moyenne est de {{ 152 | W }} et continue de baisser :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Utilisation pendant 45 minutes — 2 premières minutes", "range": "312929361m120212"}' %}
{% comment %}draft: Utilisation pendant 45 minutes — 2 premières minutes{% endcomment %}

Pendant les deux dernières minutes, le moteur a fini de chauffer et la consommation s'est stabilisée à {{ 123 | W }} :

{% profile "hotte-de-cuisine.json.gz" '{"name": "Utilisation pendant 45 minutes — 2 dernières minutes", "range": "315473353m120212"}' %}
{% comment %}draft: Utilisation pendant 45 minutes — 2 dernières minutes{% endcomment %}

La consommation a donc baissé de {{ 123 | percentLess: 152 }} entre le début et la fin.

### En veille

Il n'y a rien à mesurer en veille : le bouton rotatif est rétractable et coupe mécaniquement l'alimentation lorsqu'il est enfoncé. Une fois éteinte de cette façon, la hotte ne consomme rien.

### Coût d'usage

L'éclairage seul consomme {{ 4.3 | W }}. Si on le laissait allumé en permanence, cela représenterait {{ 4.3 | W€PerYear }} sur une année.

Pour l'aspiration, une utilisation typique d'une vingtaine de minutes lors de la préparation d'un repas coûte {{ 43.9 | Wh€ }}. Si l'on suppose une telle utilisation chaque jour, la consommation annuelle de la hotte sera de {{ 43.9 | Wh€PerYear }}.

À ce rythme, il faudrait l'utiliser pendant {{ 43.9 | PerYear | countPer€: 369 }} ans pour dépenser en électricité l'équivalent de son prix d'achat ({{ 369 | € }}). L'enjeu de la consommation électrique de la hotte est donc négligeable : le vrai coût, ici, c'est le prix d'achat.

### Conseils pour l'autoconsommation photovoltaïque

Avec une puissance d'environ {{ 140 | W }}, la hotte est très facile à alimenter par des panneaux solaires : une installation en toiture standard de 3 kWc produira largement de quoi la faire tourner en milieu de journée, même en hiver. Seuls une forte pluie ou un temps de neige empêcheraient d'atteindre ces {{ 140 | W }}.

Mais il ne faut pas perdre de vue que, lorsque la hotte fonctionne, c'est qu'on est en train de cuisiner. Or {% test cuisson-artichauts la cuisson aux plaques %} consomme bien davantage que la hotte, qui ne fait que s'y ajouter. C'est donc surtout sur la cuisson qu'il faudra veiller à profiter du soleil, la hotte n'étant qu'un petit supplément.

Pour maximiser l'autoconsommation, on pourra :

- cuisiner au déjeuner plutôt que le soir, quand la production solaire est à son maximum ;
- éviter de lancer en même temps un autre gros consommateur comme {% test machine-a-laver un lave-linge %}, {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} ou {% test four-a-micro-ondes un four à micro-ondes %}, pour ne pas dépasser la capacité de production solaire pendant la cuisson.

Cela dit, avec un coût aussi faible, l'enjeu de l'autoconsommation pour la hotte reste assez symbolique.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette hotte, on pourrait :

- mesurer une utilisation de plusieurs heures d'affilée pour voir jusqu'où la consommation décroît quand le moteur est complètement chaud ;
- évaluer l'influence de la longueur et de la forme du conduit d'évacuation sur la consommation du moteur ;
- mesurer l'effet de l'encrassement du filtre, en comparant un filtre propre et un filtre gras ;
- comparer avec une hotte à recyclage (sans évacuation extérieure), dont le moteur force davantage à travers un filtre à charbon.
{% endplusloin %}
