---
layout: test-layout.njk
title: faire bouillir un litre d'eau
img: faire-bouillir-eau.jpg
date: 2026-07-09
tags: ['test']
---

On m'a demandé un jour : « *Tu crois que ça consomme plus de faire bouillir de l'eau avec une bouilloire puis de la mettre dans une casserole, ou il vaudrait mieux faire bouillir dans la casserole direct ?* » N'ayant pas la réponse, j'ai décidé de mesurer les différentes façons de porter un litre d'eau à ébullition. Alors, laquelle consomme le moins ?

<!-- excerpt -->

{% tldr %}
- En faisant bouillir un litre d'eau deux fois par jour pendant un an, la bouilloire ou l'induction reviennent à {{ 107 | times: 2 | Wh€PerYear }}, contre {{ 283 | times: 2 | Wh€PerYear }} pour la plaque en fonte.
- La bouilloire et l'induction sont à égalité et bien plus efficaces que les plaques classiques : {{ 107 | Wh€ }} le litre, contre {{ 214 | Wh€ }} pour la vitro-céramique et {{ 283 | Wh€ }} pour la plaque en fonte.
- Un couvercle sur l'induction ne fait gagner que {{ 113 | minus: 107 | Wh }}, soit {{ 113 | minus: 107 | percent: 113 }} de la consommation, sur la simple montée en ébullition.
- Si l'on cuisine à l'induction, préchauffer l'eau à la bouilloire n'apporte quasiment rien ; sur toute autre plaque, c'est en revanche une nette économie.
{% endtldr %}

## Le matériel

{% intro "faire-bouillir-eau.jpg" "Un litre d'eau porté à ébullition, chauffé de quatre façons différentes" %}

Pour comparer les méthodes à quantité égale, j'ai chauffé à chaque essai un litre d'eau, mesuré avec le même verre doseur (deux fois un demi-litre). J'ai testé quatre appareils : une bouilloire électrique, une plaque de cuisson électrique en fonte, une plaque vitro-céramique et une plaque à induction. Une grande partie des mesures a été faite le soir en extérieur, car la campagne de tests s'est déroulée en pleine canicule. Lorsqu'un même appareil ou récipient servait à plusieurs essais, j'ai attendu qu'il revienne à la température ambiante, d'environ 29 °C, avant de recommencer.

### Méthode de mesure

Les trois premiers appareils se branchent sur une prise : ils ont été mesurés avec {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée %}. La plaque à induction n'a pas de prise et est raccordée directement au réseau : sa consommation a été {% post mesurer-la-consommation-avec-shelly-em relevée au tableau électrique %}.
{% endintro %}

## Consommation

### La bouilloire électrique

La bouilloire testée est une Casino WK8282, branchée ici sur une multiprise avec la prise de mesure :

{% image "./images/faire-bouillir-eau-bouilloire-et-prise.jpg" "La bouilloire électrique branchée sur la multiprise avec la prise de mesure connectée" "500w" 500 %}

Sous la base, on aperçoit l'étiquette signalétique :

{% image "./images/faire-bouillir-eau-dessous-bouilloire.jpg" "Le dessous de la base de la bouilloire" "500w" 500 %}

Cette étiquette annonce une puissance de 1850 à 2200 W en 220-240 V :

{% image "./images/faire-bouillir-eau-etiquette-bouilloire.jpg" "L'étiquette signalétique de la bouilloire : Casino WK8282, 220-240V, 1850-2200W" "500w" 500 %}
{% comment %}Casino
REF: WK8282
220-240V~50/60Hz
1850-2200W{% endcomment %}

Pour un litre, la bouilloire consomme {{ 107 | Wh€ }} et s'arrête toute seule au bout d'un peu plus de trois minutes ({{ 190196 | divided_by: 1000 | s }}) :

{% profile "faire-bouillir-eau-bouilloire-1L.json.gz" '{"name": "Bouilloire électrique — 1L", "range": "79507m190196"}' %}
{% comment %}draft: on peut mettre un lien vers le test d'une bouilloire électrique qu'on a déjà fait.{% endcomment %}

Le profil est net : une montée quasi immédiate à pleine puissance, un plateau bien stable autour de {{ 2060 | W }} (médiane), bien dans la plage de 1850 à 2200 W annoncée sur l'étiquette, puis une coupure quand le thermostat détecte l'ébullition. Rien à voir avec les plaques que l'on verra ensuite : toute l'énergie part directement dans la résistance immergée, au contact de l'eau. C'est le même comportement que celui observé sur la {% test bouilloire-electrique bouilloire électrique déjà testée ici %}.

J'ai aussi voulu vérifier si la consommation était proportionnelle à la quantité d'eau, en ne chauffant qu'un demi-litre :

{% profile "faire-bouillir-eau-bouilloire-0.5.json.gz" '{"name": "Bouilloire électrique — 0,5L", "range": "242457m110121"}' %}
{% comment %}draft: c'est plus de la moitié de la conso d'1L !{% endcomment %}

Un demi-litre consomme {{ 61.6 | Wh€ }}, soit {{ 61.6 | percent: 107 }} de la consommation d'un litre : c'est plus que la moitié. La chauffe n'est donc pas tout à fait proportionnelle. Une partie de l'énergie sert à réchauffer la résistance et le corps de l'appareil, un coût à peu près fixe quelle que soit la quantité d'eau, qui pèse relativement plus lourd sur une petite quantité.

### La plaque de cuisson en fonte

Vient ensuite une petite plaque électrique à un feu, une PROLINE RP 100, dont la surface de chauffe est en fonte :

{% image "./images/faire-bouillir-eau-plaque-basique.jpg" "La plaque de cuisson électrique PROLINE, avec sa surface chauffante en fonte" "500w" 500 %}

Le dessous porte l'étiquette signalétique et quatre pieds qui surélèvent l'appareil pour laisser l'air circuler par les ouïes de ventilation visibles sur la photo :

{% image "./images/faire-bouillir-eau-dessous-plaque-basique.jpg" "Le dessous de la plaque en fonte" "500w" 500 %}

Celle-ci indique 1000 W (1090 W en 240 V) :

{% image "./images/faire-bouillir-eau-etiquette-plaque-basique.jpg" "L'étiquette de la plaque en fonte : PROLINE RP 100, 1000W (1090W en 240V)" "500w" 500 %}
{% comment %}PROLINE
RP 100
220-240 V (~) 1000W 50-60 Hz
240 V (~) 1090W 50-60 Hz{% endcomment %}

Un voyant rouge sur la face avant s'allume quand la plaque chauffe :

{% image "./images/faire-bouillir-eau-plaque-basique-lumiere-allumee.jpg" "Le voyant rouge allumé et le bouton de réglage de la plaque en fonte" "500w" 500 %}

En testant le bouton, j'ai constaté que c'est simplement un thermostat mécanique : on entend une lame métallique claquer à l'intérieur. J'ai posé la casserole d'un litre d'eau dessus, bouton au maximum :

{% image "./images/faire-bouillir-eau-casserole-plaque-basique.jpg" "La casserole d'eau posée sur la plaque en fonte" "500w" 500 %}

Les premières bulles apparaissent au fond de la casserole :

{% image "./images/faire-bouillir-eau-casserole-plaque-basique-bulles.jpg" "Les premières bulles se forment au fond de la casserole" "500w" 500 %}

Puis l'eau finit par bouillir franchement :

{% image "./images/faire-bouillir-eau-casserole-plaque-basique-eau-bouillante.jpg" "L'eau bout franchement dans la casserole sur la plaque en fonte" "500w" 500 %}

Il aura fallu attendre plus de seize minutes ({{ 976860 | divided_by: 1000 | s }}) pour en arriver là, et consommer {{ 283 | Wh€ }} :

{% profile "faire-bouillir-eau-basique.json.gz" '{"name": "Plaque en fonte", "range": "247729m976860"}' %}
{% comment %}draft: c'est très looooong! et c'est la plus grosse conso totale{% endcomment %}

C'est de loin la chauffe la plus longue et la plus gourmande de tout le comparatif : {{ 283 | percentMore: 107 }} de plus que la bouilloire pour le même litre d'eau. Le profil est un long plateau bien plat autour de {{ 1040 | W }}, entre les 1000 W et 1090 W annoncés sur l'étiquette : la plaque tire une puissance modeste et régulière, mais pendant si longtemps que l'énergie totale s'envole. Une bonne partie de la chaleur est perdue : la plaque en fonte chauffe l'air ambiant autant que la casserole, et le contact entre les deux n'est pas parfait.

### La plaque vitro-céramique

Troisième méthode, une table vitro-céramique à deux foyers, une IKEA FRAMTID HGC2K :

{% image "./images/faire-bouillir-eau-plaque-vitro-ceramique.jpg" "La plaque vitro-céramique IKEA à deux foyers, avec la casserole sur le foyer de gauche" "500w" 500 %}

Prévue pour être encastrée dans un plan de travail, elle n'a pas de pieds contrairement à la plaque en fonte. Le dessous laisse voir le châssis métallique nu, les deux foyers et le câble d'alimentation :

{% image "./images/faire-bouillir-eau-plaque-vitro-ceramique-dessous.jpg" "Le dessous de la plaque vitro-céramique" "500w" 500 %}

L'étiquette annonce une puissance maximale de 2,9 kW pour l'ensemble des deux foyers, en 230 V :

{% image "./images/faire-bouillir-eau-plaque-vitro-ceramique-etiquette.jpg" "L'étiquette de la plaque vitro-céramique : IKEA FRAMTID HGC2K, 2,9 kW max, 230V" "800w" 800 %}
{% comment %}IKEA 501-511-43
MOD. FRAMTID HGC2K
kW max = 2.9
230V ~ 50 Hz{% endcomment %}

Aucune indication de puissance ne figurait sur les boutons. J'ai donc d'abord cherché un peu au hasard la position qui chauffait au maximum, en observant à chaque essai si le foyer s'allumait et quelle consommation cela produisait. Sous la casserole, le foyer devient rouge vif une fois lancé :

{% image "./images/faire-bouillir-eau-casserole-plaque-vitro-ceramique.jpg" "Le foyer de la plaque vitro-céramique rouge vif sous la casserole" "500w" 500 %}

Une fois la bonne position trouvée, l'eau finit par bouillir :

{% image "./images/faire-bouillir-eau-eau-bouillante-plaque-vitro-ceramique.jpg" "L'eau bout dans la casserole sur la plaque vitro-céramique" "500w" 500 %}

La chauffe a duré un peu moins de dix minutes ({{ 585251 | divided_by: 1000 | s }}) et consommé {{ 214 | Wh€ }} : {{ 214 | percentMore: 107 }} de plus que la bouilloire, mais tout de même {{ 214 | percentLess: 283 }} de moins que la plaque en fonte. Son profil est le plus mouvementé du comparatif :

{% profile "faire-bouillir-eau-vitro.json.gz" '{"name": "Plaque vitro-céramique", "range": "250298m585251"}' %}
{% comment %}draft: le motif très bizarre des 45 premières secondes est car n'ayant aucune indication de puissance sur les boutons, j'ai cherché un peu au hasard la bonne position pour chauffer au maximum, et trouvé en fonction de ce que je voyais sur les mesures de consommation. Ensuite on a 2min40 à pleine puissance, suivi d'alternance entre pleine puissance et une puissance plus faible à environ 540W. On entendait un thermostat mécanique qui claquait lors des changements de puissance, peut-être une sécurité thermique à l'intérieur de la plaque ? Assez étonnant tout de même car ça ralentit le chauffage. Une fois l'eau bouillante, la plaque est restée chaude pendant très très longtemps.{% endcomment %}

On y lit trois phases. Les premières secondes agitées correspondent à ma recherche à tâtons de la bonne position du bouton. Vient ensuite une phase d'environ 2 min 40 à pleine puissance, autour de {{ 1820 | W }}. Puis la plaque se met à alterner entre pleine puissance et une puissance plus faible, aux alentours de {{ 540 | W }} : à chaque changement, on entendait un thermostat mécanique claquer. C'est peut-être une sécurité thermique interne à la plaque, mais c'est étonnant qu'elle se déclenche avant même l'ébullition, car ce cyclage ralentit nettement la chauffe. Une fois l'eau bouillante, la plaque est restée chaude très longtemps, un signe des pertes accumulées dans la masse de la table.

### La plaque à induction

Dernière méthode, une plaque à induction, la même que celle utilisée pour la {% test cuisson-artichauts cuisson d'artichauts à la cocotte-minute %}. Contrairement aux autres, elle ne chauffe pas une résistance mais crée un champ magnétique qui fait chauffer directement le fond de la casserole. J'ai d'abord fait bouillir un litre sans couvercle :

{% image "./images/faire-bouillir-eau-casserole-plaque-induction.jpg" "La casserole sans couvercle sur la plaque à induction, réglée au maximum" "500w" 500 %}

L'eau atteint l'ébullition en 3 min 55, pour {{ 113 | Wh€ }} :

{% profile "faire-bouillir-eau-induction.json.gz" '{"name": "Induction — sans couvercle", "range": "125681m241358"}' %}
{% comment %}draft: 3min55 de chauffe puis à la fin du profil c'est juste la ventilation de la plaque

on peut mettre un lien vers le test de cuisson des artichauts qui a été fait sur cette même plaque{% endcomment %}

Le profil est un plateau franc à pleine puissance, autour de {{ 1740 | W }} (médiane), avec quelques petites variations en dents de scie en début et en fin de chauffe. La toute fin du profil ne correspond plus à la chauffe mais à la ventilation de la plaque, qui continue de tourner un moment.

### La plaque à induction, avec un couvercle

Un couvercle limite les pertes de chaleur par évaporation. Aide-t-il vraiment ? J'ai laissé le tout refroidir, puis refait bouillir un litre, cette fois couvercle en place :

{% image "./images/faire-bouillir-eau-casserole-avec-couvercle-plaque-induction.jpg" "La casserole avec son couvercle en verre sur la plaque à induction" "500w" 500 %}

Le résultat est presque identique : {{ 107 | Wh€ }}, et l'eau bout en 3 min 40, à peine moins vite :

{% profile "faire-bouillir-eau-induction-couvercle.json.gz" '{"name": "Induction — avec couvercle", "range": "152308m243139"}' %}
{% comment %}draft: 3min40 de chauffe (c'est à peine moins !) puis ventilation.

Peut-être que le couvercle n'aide finalement pas tant que ça à réduire la conso, au moins initiale. Je suppose qu'il aide peut-être plus pour maintenir une cuisson à température pendant longtemps, car il empêche l'air chaud de sortir de la casserole.{% endcomment %}

Le couvercle ne fait gagner que {{ 113 | minus: 107 | Wh }}, soit {{ 113 | minus: 107 | percent: 113 }} de la consommation sans couvercle. Pour une simple montée en ébullition, il n'aide donc quasiment pas : le gain viendrait plutôt d'une cuisson maintenue longtemps à température, où il évite à la chaleur de s'échapper avec la vapeur.

### Quelle méthode consomme le moins ?

En rassemblant les six mesures pour un même litre d'eau, le classement est net :

1. Bouilloire électrique : {{ 107 | Wh€ }} en {{ 190196 | divided_by: 1000 | s }} ;
2. Induction, avec couvercle : {{ 107 | Wh€ }} en 3 min 40, ou sans couvercle : {{ 113 | Wh€ }} en 3 min 55 ;
3. Plaque vitro-céramique : {{ 214 | Wh€ }} en {{ 585251 | divided_by: 1000 | s }} ;
4. Plaque en fonte : {{ 283 | Wh€ }} en {{ 976860 | divided_by: 1000 | s }}.

La bouilloire et l'induction sont pratiquement à égalité, aussi bien en énergie qu'en temps : dans les deux cas, la chaleur est produite directement dans l'eau ou au fond de la casserole, avec très peu de pertes. À l'autre bout, la plaque en fonte consomme {{ 283 | percentMore: 107 }} de plus pour le même résultat, et met plus de quatre fois plus longtemps.

Cela répond à la question de départ. Si l'on cuisine sur une plaque à induction, préchauffer l'eau à la bouilloire n'apporte quasiment rien : c'est peut-être un tout petit peu plus rapide, mais la consommation est la même. En revanche, sur tout autre type de plaque (en fonte ou vitro-céramique), passer par la bouilloire est une nette économie d'énergie.

### Coût d'usage

Pris isolément, faire bouillir un seul litre d'eau coûte peu : {{ 107 | Wh€ }} à la bouilloire ou à l'induction, {{ 283 | Wh€ }} sur la plaque en fonte. Au tarif actuel de l'électricité, un euro permet de faire bouillir {{ 107 | countPer€: 1 }} litres à la bouilloire.

C'est à l'échelle d'une habitude quotidienne que l'écart entre les méthodes devient visible. Si l'on suppose que l'on fait bouillir un litre d'eau deux fois par jour — un thé le matin, des pâtes ou un bouillon le soir — la bouilloire ou l'induction reviennent à {{ 107 | times: 2 | Wh€PerYear }} sur l'année, contre {{ 283 | times: 2 | Wh€PerYear }} pour la plaque en fonte. L'écart, {{ 283 | minus: 107 | times: 2 | Wh€PerYear }} par an, correspond entièrement à l'énergie gaspillée par la mauvaise méthode : c'est le prix que l'on paie pour chauffer l'air de la cuisine et une lourde plaque en fonte plutôt que l'eau elle-même.

Choisir la bouilloire ou l'induction plutôt qu'une plaque classique divise par plus de deux le coût d'un geste que l'on répète tous les jours : sur l'année, l'écart de {{ 283 | minus: 107 | times: 2 | Wh€PerYear }} n'a rien de négligeable pour un réflexe qui ne coûte rien à adopter.

### Conseils pour l'autoconsommation photovoltaïque

Faire bouillir de l'eau est un appel de puissance bref mais élevé, déclenché à la demande : entre {{ 1040 | W }} pour la plaque en fonte et {{ 2060 | W }} pour la bouilloire, le tout sur trois à seize minutes seulement. Ces puissances restent dans les capacités d'une installation en toiture standard de 3 kWc, qui produira largement de quoi les couvrir en milieu de journée bien ensoleillée. La bouilloire, plus puissante, mange une plus grosse part de la production instantanée mais pendant trois minutes à peine ; la plaque en fonte tire moins fort, mais si longtemps qu'elle laisse plus de marge d'erreur sur l'ensoleillement.

Le vrai obstacle n'est pas la puissance, mais le moment : on met l'eau à bouillir quand on a faim ou soif, pas quand le soleil est au zénith. L'ajustement à la production solaire est donc forcément partiel. Quelques réflexes aident tout de même :
- garder pour le milieu de journée les usages que l'on peut décaler — un thé de l'après-midi, un bouillon cuisiné au déjeuner — plutôt que le matin tôt ou le soir, où les panneaux ne donnent rien ;
- profiter de la brièveté de la chauffe pour la caler dans une éclaircie, sans avoir à surveiller la météo sur une longue durée ;
- éviter de lancer la chauffe en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %} ou {% test seche-linge-a-pompe-a-chaleur un sèche-linge %}, pour ne pas dépasser d'un coup la production disponible.

Un panneau à brancher de quelques centaines de watts, lui, ne suffit pas : même la plaque en fonte à {{ 1040 | W }} dépasse largement ce qu'un tel kit fournit, et il faudrait le compléter par du réseau à chaque chauffe.

Cela dit, avec un coût de {{ 107 | Wh€ }} le litre à la bouilloire ou à l'induction, l'enjeu économique par chauffe reste faible : mieux vaut ne pas se contraindre outre mesure pour ce seul usage. L'intérêt est surtout de prendre le réflexe, quand c'est possible sans effort, de faire chauffer son eau au moment où l'électricité vient du toit plutôt que du réseau.

{% plusloin %}
Pour compléter ce comparatif de la chauffe de l'eau, on pourrait :
- mesurer l'énergie nécessaire pour maintenir le litre d'eau à frémissement pendant dix minutes une fois l'ébullition atteinte, avec puis sans couvercle, pour voir si le couvercle devient enfin utile là où il ne l'était pas à la simple montée en température ;
- refaire les mesures sur la plaque en fonte et la vitro-céramique avec un couvercle sur la casserole, pour chiffrer le gain d'un couvercle sur les méthodes lentes qui perdent beaucoup de chaleur dans l'air ambiant ;
- comparer, sur la plaque à induction et sur la plaque en fonte, une petite casserole d'un litre à une grande casserole plus large que le foyer, afin d'isoler l'effet de la surface de contact et du débordement de chaleur autour du récipient ;
- mesurer l'écart de consommation entre de l'eau du robinet en hiver (autour de 10°C) et en été, les tests ayant justement eu lieu en pleine canicule ;
- reprendre la plaque vitro-céramique en la surélevant au lieu de la poser au sol, pour améliorer la ventilation par le dessous, et en refaisant le test à une température ambiante plus basse : ces plaques sont sans doute prévues pour un environnement autour de 20°C, et à 29°C l'air ambiant ne les refroidit peut-être plus assez, si bien qu'elles surchauffent et déclenchent le cyclage du thermostat observé avant l'ébullition.
{% endplusloin %}
