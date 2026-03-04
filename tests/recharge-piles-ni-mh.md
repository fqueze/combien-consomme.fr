---
layout: test-layout.njk
title: la recharge de piles Ni-MH
img: recharge-piles-ni-mh.jpg
date: 2026-03-04
tags: ['test']
---

Les piles rechargeables Ni-MH sont une alternative économique et écologique aux piles jetables. Mais combien d'électricité faut-il pour recharger ces piles ?

<!-- excerpt -->

{% tldr %}
- Recharger 4 piles AA consomme {{ 21.7 | Wh€ }}, soit {{ 21.7 | divided_by: 4 | Wh€ }} par pile.
- Il faudrait recharger {{ 21.7 | divided_by: 4 | countPer€: 1 }} piles AA pour dépenser un euro d'électricité.
- Le chargeur consomme encore {{ 0.0603 | W }} après la charge : la notice recommande de le débrancher.
- Le coût électrique de la recharge est dérisoire comparé au prix des piles jetables qu'elle remplace.
{% endtldr %}

{% comment %}
Notes from draft:
une première charge a été démarrée sur 4 piles AAA à 1,25V. Mais : le chargeur a rejeté 2 des piles et s'est mis à clignoter. J'ai relancé la charge sur uniquement les 2 piles qu'il ne rejettait pas. Hélas la prise shelly plus plug s utilisée avait beaucoup de bruit. J'ai arrêté la mesure après environ 1h50, puis relancé sur une smart plug en meilleur état (2e profil).

sur le 2e profil
- les 3 premières minutes --> branché mais pas de piles dedans.
- pendant 50s, les 2 piles HS, avec une brève tentative de charge avant que ça se mette à clignoter
- puis charge des 2 pilles AAA OK pendant 3h12. Voyant que la puissance a baissé je les ai sorties en croyant que c'était fini.
- ensuite environ 1h sans piles dedans, (environ 50mW)
- ensuite un peu moins de 2h avec les 2 piles HS (pic de démarrage, puis environ 100mW et led clignotante)
- ensuite charge AA pendant 6h. 0,88V -> 1,4V
- ensuite éteint pendant 6h, avec les piles restées dedans (~60mW)
- ensuite recharge complète des 2 piles AAA OK, 2h20.
{% endcomment %}

## Le matériel

{% intro "recharge-piles-ni-mh.jpg" "Chargeur Sony Cycle Energy BCG-34HLD Ni-MH" %}

Le chargeur Sony Cycle Energy BCG-34HLD est un chargeur de piles [Ni-MH](https://fr.wikipedia.org/wiki/Accumulateur_nickel-hydrure_m%C3%A9tallique "Page « Accumulateur nickel-hydrure métallique » sur Wikipédia") capable de recharger 4 piles AA ou 4 piles AAA simultanément. C'est un modèle simple, avec une seule LED témoin qui s'allume pendant la charge et s'éteint quand elle est terminée. La LED clignote en cas d'erreur (pile défectueuse ou non compatible).

Pour ce test, nous avons utilisé deux types de piles :
- 4 piles AA Domedia Re:Charge de 1900 mAh, retrouvées au fond d'un tiroir (les piles neuves actuelles ont souvent une capacité de 2500 mAh ou plus) ;
- 4 piles AAA Energizer Recharge de 700 mAh (dont 2 se sont avérées défectueuses).
{% endintro %}

## Consommation

### Méthode de mesure

Le chargeur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Informations fournies par le fabricant

L'étiquette au dos du chargeur indique les caractéristiques techniques :

{% image "./images/recharge-piles-ni-mh-etiquette.jpg" "Étiquette du chargeur Sony BCG-34HLD : INPUT ~100-240V 50/60Hz 7W, OUTPUT 1,2V 360mA(AA)×4 140mA(AAA)×4" "500w" 500 %}
{% comment %}SONY® BCG-34HLD
BATTERY CHARGER
INPUT: ~100-240V 50/60Hz 7W
OUTPUT: 1,2V 360mA(AA)X4 140mA(AAA)X4
Ni-MH{% endcomment %}

L'étiquette indique « *INPUT: ~100-240V 50/60Hz 7W* », soit une puissance nominale de {{ 7 | W }}. En sortie, le chargeur délivre 360 mA par pile AA et 140 mA par pile AAA, à une tension de 1,2 V. On peut d'ailleurs voir les deux rangées de contacts correspondantes sur le chargeur vide :

{% image "./images/recharge-piles-ni-mh-vide.jpg" "Le chargeur Sony Cycle Energy vide, avec ses deux rangées de contacts pour piles AA et AAA" "500w" 500 %}
{% comment %}chargeur vide vu de face. On voit qu'il y a deux rangées de contacts : une pour les piles AA et une pour les piles AAA.{% endcomment %}

C'est un chargeur lent : la notice indique « *environ 7 heures* » pour des piles AA de 2100 mAh.

### Charge de 4 piles AA

Nous commençons par un test qui utilisera notre chargeur à sa pleine puissance : la charge complète de 4 piles AA Domedia Re:Charge de 1900 mAh.

Avant la charge, les piles sont mesurées au multimètre :

{% image "./images/recharge-piles-ni-mh-aa-088.jpg" "Multimètre affichant 0,88 V pour les piles AA avant la charge" "500w" 500 %}
{% comment %}multimètre mesurant les piles AA avant la charge, 0,88V, elles sont bien vides !{% endcomment %}

0,88 V ! Elles sont bien vides.

Les 4 piles sont insérées dans le chargeur et la LED témoin s'allume :

{% image "./images/recharge-piles-ni-mh-4aa.jpg" "4 piles AA Domedia Re:Charge en cours de charge, LED témoin allumée" "500w" 500 %}
{% comment %}chargeur avec 4 piles AA en charge (témoin allumé). L'indication sur les piles "1.2V HR6 Ni-MH AA 1900 mAh Charge 16h 190mA"{% endcomment %}

On peut lire sur les piles « *1,2V HR6 Ni-MH AA 1900 mAh — Charge 16h 190mA* ». L'indication de charge à 190 mA correspond au chargeur lent suggéré pour aller avec ces piles. Notre chargeur Sony délivre 360 mA, soit presque le double : on peut donc s'attendre à une charge sensiblement plus rapide.

La charge complète dure un peu plus de 6 heures :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "charge - 4 AA", "range": "23285701m21950121"}' %}
{% comment %}draft: charge complète de 4 piles AA bien vides. On peut diviser par 4 pour le coût de chargement d'une pile. Durée totale d'un peu plus de 6h pour des piles de 1900 mAh. La notice indiquait "environ 7h" pour des piles AA de 2100 mAh. C'est cohérent.
On voit sur la forme du profil qu'il y a des variations de comportement au début et à la fin, et une longue période régulière au milieu. On va zoomer sur ces 3 périodes.{% endcomment %}

Cette durée est cohérente avec les « *environ 7 heures* » annoncées par la notice pour des piles de 2100 mAh (les nôtres ne font que 1900 mAh).

La charge consomme {{ 21.7 | Wh€ }} au total. On observe que le chargeur utilise une charge pulsée : la puissance oscille rapidement avec des pics mesurés allant jusqu'à environ {{ 5 | W }}, soit moins que les {{ 7 | W }} indiqués sur l'étiquette. L'échantillonnage à 1 Hz de notre prise connectée lisse probablement les pics réels : la puissance instantanée pourrait être plus proche des {{ 7 | W }} nominaux pendant les impulsions. La puissance moyenne est de {{ 3.57 | W }} sur l'ensemble de la charge.

On distingue trois phases sur le profil : un démarrage à pleine puissance, une longue phase régulière, et une décroissance progressive en fin de charge. Observons chacune de plus près.

#### Le début de la charge

Les 22 premières minutes de la charge montrent la puissance la plus élevée :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "charge - 4 AA — début", "range": "23285701m1331798"}' %}

Le chargeur démarre immédiatement à sa puissance maximale. On observe des oscillations régulières allant jusqu'à {{ 5.1 | W }}, caractéristiques de la charge pulsée Ni-MH. La puissance moyenne est de {{ 4.4 | W }}. Comme évoqué plus haut, l'échantillonnage à 1 Hz masque probablement à la fois les creux entre les impulsions et les pics réels, qui pourraient être plus proches des {{ 7 | W }} de l'étiquette.

#### La phase principale

La phase principale de la charge dure {{ 19344845 | divided_by: 1000 | s }} :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "charge - 4 AA — milieu", "range": "24588573m19344845"}' %}

Le motif de charge pulsée est remarquablement stable pendant plus de 5 heures, avec une puissance moyenne de {{ 3.56 | W }}. Cette phase représente {{ 19.1 | percent: 21.7 }} de la consommation totale avec {{ 19.1 | Wh€ }}.

#### La fin de la charge

Les 22 dernières minutes montrent une décroissance progressive de la puissance :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "charge - 4 AA — fin", "range": "43946884m1300678"}' %}
{% comment %}draft: zoom sur la fin de la charge des 4 piles AA.{% endcomment %}

La puissance moyenne chute à {{ 2.83 | W }}, soit environ la moitié de la phase de démarrage. Le chargeur réduit progressivement le courant injecté dans les piles : les impulsions deviennent moins fréquentes ou moins intenses, jusqu'à l'arrêt complet. Ce n'est pas une coupure brutale, mais une transition douce.

Une fois la charge terminée, la LED témoin s'éteint :

{% image "./images/recharge-piles-ni-mh-4aa-fini.jpg" "4 piles AA dans le chargeur, LED éteinte : la charge est terminée" "500w" 500 %}
{% comment %}chargeur avec les 4 mêmes piles, led éteinte, la charge est finie{% endcomment %}

Après la charge, les piles sont mesurées au multimètre à 1,397 V. Elles sont passées de 0,88 V à presque 1,4 V :

{% image "./images/recharge-piles-ni-mh-aa-139.jpg" "Multimètre affichant 1,397 V pour les piles AA après la charge" "500w" 500 %}
{% comment %}multimètre mesurant après la charge les mêmes piles AA sont à 1,397V, c'est beaucoup mieux !{% endcomment %}

En résumé, la charge complète de 4 piles AA de 1900 mAh consomme {{ 21.7 | Wh€ }}, soit {{ 21.7 | divided_by: 4 | Wh€ }} par pile.

### Charge de 2 piles AAA

Nous testons maintenant la charge de piles AAA Energizer Recharge de 700 mAh. Avant la charge, les 4 piles sont mesurées au multimètre à 1,25 V :

{% image "./images/recharge-piles-ni-mh-aaa-125.jpg" "Multimètre affichant 1,255 V pour les piles AAA avant la charge" "500w" 500 %}
{% comment %}multimètre mesurant avant la charge les piles AAA qui sont à 1,25V. Les 2 piles que le chargeur refusera resteront à 1,25V. Les deux autres monteront à presque 1,5V. Indication sur les piles : NiMH HR03 700mAh 1.2V{% endcomment %}

Sur les 4 piles, le chargeur en a rejeté 2 immédiatement en passant en mode erreur (LED clignotante). Nous avons donc lancé la charge uniquement sur les 2 piles acceptées :

{% image "./images/recharge-piles-ni-mh-2aaa.jpg" "2 piles AAA en charge dans le chargeur Sony, LED témoin allumée" "500w" 500 %}
{% comment %}chargeur avec 2 piles AAA insérées et le témoin de charge allumé{% endcomment %}

#### Première charge (interrompue)

Pour cette première charge, la prise connectée utilisée avait beaucoup de bruit dans ses mesures. La charge a duré un peu moins de 2 heures :

{% profile "recharge-piles-ni-mh-shelly-hs.json.gz" '{"name": "première charge partielle 2 piles AAA sur prise Shelly avec du bruit", "range": "278111m6485889"}' %}
{% comment %}draft: ma première tentative de charge des 2 piles AAA. Hélas la shelly plus plug s sur laquelle j'avais branché le chargeur a beaucoup de bruit dans les mesures. Les piles ont été utilisée quelques minutes sur un train électrique avant d'être remises en charge sur la prise connectée en meilleur état.{% endcomment %}

Le bruit de mesure rend les détails du profil inexploitables (le maximum indiqué de {{ 6.1 | W }} est clairement un artefact de mesure), mais la consommation totale de {{ 2.47 | Wh }} reste une bonne indication.

Les piles ont ensuite été utilisées quelques minutes dans un train électrique, puis remises en charge sur une prise connectée en meilleur état.

#### Suite de la charge (sur prise fiable)

Sur la prise connectée sans bruit, la charge a repris et a duré environ 3 heures :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "suite de la charge de 2 piles AAA", "range": "241173m11512040"}' %}
{% comment %}draft: J'ai lancé la recharge des 2 piles AAA pas refusées par le chargeur. Après plusieurs heures quand je suis revenu, j'ai vu que la conso avait beaucoup changé et j'ai cru que la charge était la première moitié du profil, et que l'autre moitié était juste un maintient de charge (alors que finalement c'est probablement une fin de charge plus lente). Du coup j'ai débranché alors que je n'aurais peut-être pas dû. La led était encore allumée, mais je pensais qu'elle restait allumée tout le temps sauf pour signaler une erreur (elle clignote dans ce cas){% endcomment %}

La charge a consommé {{ 3.16 | Wh }}. On observe deux phases bien distinctes : une première moitié avec une puissance plus élevée, puis une seconde moitié à puissance réduite. J'avais d'abord cru que la seconde moitié était un simple maintien de charge, et j'ai interrompu le processus prématurément. En réalité, c'était probablement une fin de charge plus lente, et la LED témoin était encore allumée.

#### Fin de la charge des AAA

Après avoir compris — grâce au test des piles AA — qu'il faut attendre que la LED s'éteigne pour que la charge soit terminée, j'ai remis les 2 piles AAA en charge pour finir le processus. Cette dernière phase a duré {{ 8512236 | divided_by: 1000 | s }} :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "recharge finale de 2 piles AAA", "range": "67139200m8512236"}' %}
{% comment %}draft: Après avoir chargé les piles AA, j'ai compris qu'il faut attendre que la LED s'éteigne pour que la charge soit finie, j'ai donc remis les 2 piles AAA en charge jusqu'à la fin du processus.{% endcomment %}

Cette phase a consommé {{ 2.25 | Wh€ }}. On retrouve le même motif de décroissance progressive en fin de charge que pour les piles AA. La puissance moyenne de {{ 0.952 | W }} est nettement inférieure à celle des piles AA ({{ 3.57 | W }}), ce qui est logique : le chargeur délivre 140 mA par pile AAA contre 360 mA par pile AA (moins de la moitié du courant), et il n'y a que 2 piles au lieu de 4.

Au total, la charge des 2 piles AAA a été répartie sur trois sessions : {{ 2.47 | Wh }} (première charge bruitée) + {{ 3.16 | Wh }} (charge interrompue) + {{ 2.25 | Wh }} (fin de charge). Mais les piles ont été utilisées brièvement entre la première et la deuxième session, ce qui rend l'addition des trois sessions peu fiable. Si l'on se fie aux deux sessions mesurées proprement, on obtient {{ 3.16 | plus: 2.25 | Wh€ }} pour 2 piles AAA, soit environ {{ 3.16 | plus: 2.25 | divided_by: 2 | Wh€ }} par pile. En une seule charge sans interruption, la consommation aurait probablement été un peu inférieure.

### Après la charge

Une fois la charge des 4 piles AA terminée, la LED s'éteint. Mais on entend encore un tout petit sifflement provenant du chargeur. La notice d'utilisation indique « *Le chargeur doit être débranché du secteur lorsque le processus de charge est terminé* ».

Nous avons laissé le chargeur branché pendant 6 heures après la fin de la charge pour mesurer cette consommation résiduelle :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "6h après la charge", "range": "45451346m21574031"}' %}
{% comment %}draft: une fois la charge finie, la led de charge s'éteint. Mais on entend encore un tout petit sifflement. La notice d'utilisation indique "Le chargeur doit être débranché du secteur lorsque le processus de charge est terminé". Voila pourquoi !{% endcomment %}

La puissance moyenne n'est que de {{ 0.0603 | W }}, avec des pics ponctuels à {{ 0.4 | W }}. C'est très faible, mais ce n'est pas zéro. Si le chargeur restait branché en permanence (même sans piles), cette consommation résiduelle représenterait {{ 0.0603 | W€PerYear }} par an. Autant dire pas grand-chose, mais la notice a raison : il vaut mieux débrancher.

### Quand le chargeur refuse les piles

Sur les 4 piles AAA, 2 ont été rejetées par le chargeur. Que se passe-t-il quand on insère des piles défectueuses ?

Le chargeur tente d'abord brièvement de les charger pendant environ 10 secondes, puis passe en mode erreur avec la LED clignotante :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "tentative recharge de 2 piles AAA HS — zooom sur le début", "range": "15747175m300479"}' %}
{% comment %}draft: Zoom sur le début où on voit qu'il y a une brève tentative de charge pendant environ 10s avant que le chargeur ne passe ne mode erreur.{% endcomment %}

On voit clairement un pic initial allant jusqu'à {{ 2.1 | W }} pendant quelques secondes, suivi d'une chute à des impulsions régulières très faibles. Le chargeur a détecté un problème et a arrêté la charge.

Sur une durée d'environ 2 heures avec les piles HS insérées, la consommation reste très faible, mais non nulle :

{% profile "recharge-piles-ni-mh.json.gz" '{"name": "tentative recharge de 2 piles AAA HS", "range": "15747175m6959247"}' %}
{% comment %}draft: Voici ce qui s'est passé lorsque j'ai mis les 2 piles AAA HS dans le chargeur pendant environ 2h. La LED du témoin clignotait. On observe que la conso moyenne est nettement supérieure à la conso lorqu'une charge est finie, mais très nettement inférieure à la conso lorsqu'une charge est vraiment en cours.{% endcomment %}

La puissance moyenne de {{ 0.1 | W }} en mode erreur est supérieure à la consommation du chargeur après une charge réussie ({{ 0.0603 | W }}), probablement à cause du clignotement de la LED et de l'électronique qui reste active.

### Coût d'usage

Le coût électrique pour recharger une pile AA est de {{ 21.7 | divided_by: 4 | Wh€ }}. Il faudrait recharger {{ 21.7 | divided_by: 4 | countPer€: 1 }} piles AA pour dépenser un euro d'électricité.

Pour une pile AAA, le coût est d'environ {{ 3.16 | plus: 2.25 | divided_by: 2 | Wh€ }}. Il faudrait en recharger {{ 3.16 | plus: 2.25 | divided_by: 2 | countPer€: 1 }} pour dépenser un euro.

À titre de comparaison, un lot de 4 piles AA jetables coûte entre 1 et 3 euros selon la marque. Le coût de l'électricité pour recharger des piles rechargeables est donc totalement négligeable par rapport au prix des piles jetables qu'elles remplacent. Le vrai coût des piles rechargeables est celui des piles elles-mêmes et du chargeur, pas l'électricité pour les recharger.

### Conseils pour l'autoconsommation photovoltaïque

La puissance moyenne du chargeur pendant une charge est d'environ {{ 3.57 | W }} pour 4 piles AA, et moins de {{ 1 | W }} pour 2 piles AAA. Ces puissances sont extrêmement faibles comparées à la production d'une installation photovoltaïque.

Il n'y a donc aucune difficulté à alimenter ce chargeur avec des panneaux solaires. La contrainte est surtout pratique : avec une charge de plus de 6 heures pour les piles AA, il faut lancer la charge suffisamment tôt dans la journée (ce que la notice recommande de toute façon, puisqu'il vaut mieux débrancher le chargeur quand il a fini).

Cela dit, avec un coût électrique de {{ 21.7 | divided_by: 4 | Wh€ }} par pile, l'enjeu économique est totalement inexistant. L'intérêt est surtout de stocker de l'énergie solaire dans les piles plutôt que de consommer celle du réseau. Mais avec le rendement modeste de la charge Ni-MH (une bonne partie de l'énergie est perdue en chaleur), le bénéfice environnemental reste symbolique.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce chargeur, on pourrait :
- mesurer la charge de piles AA de capacité supérieure (2500 mAh ou plus) pour vérifier si la consommation augmente proportionnellement à la capacité ;
- mesurer la charge avec 1 ou 2 piles AA au lieu de 4 pour voir si la consommation par pile est identique ;
- comparer avec un chargeur rapide moderne (comme ceux qui chargent en 1 à 2 heures) pour évaluer les différences de rendement ;
- mesurer avec un wattmètre ayant un taux d'échantillonnage plus élevé (idéalement 50 Hz, la fréquence du courant alternatif du secteur) pour observer en détail le comportement de charge pulsée ;
- mesurer le rendement réel du chargeur en comparant l'énergie prélevée sur le secteur avec l'énergie effectivement stockée dans les piles (capacité × tension).
{% endplusloin %}
