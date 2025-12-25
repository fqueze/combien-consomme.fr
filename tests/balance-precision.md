---
layout: test-layout.njk
title: une balance de précision
img: balance-precision.jpg
date: 2025-12-16
tags: ['test']
---

Une balance de précision est un outil utile en cuisine pour des mesures exactes, ou dans d'autres contextes nécessitant une pesée précise. Combien consomme-t-elle ?

<!-- excerpt -->

{% tldr %}
- Branchée en permanence sur son adaptateur secteur, même éteinte, la balance consommera environ {{ 0.850 | W€PerYear }} par an.
- L'adaptateur secteur seul consomme environ {{ 0.850 | W }}, soit quasiment la même valeur que la balance éteinte (environ {{ 0.830 | W }}), ce qui signifie que la balance proprement dite ne consomme presque rien en mode éteint.
- Allumer la balance n'augmente la consommation que d'environ {{ 0.960 | minus: 0.830 | W }}, soit {{ 0.960 | percentMore: 0.830 }} par rapport à l'état éteint.
- Le rétro-éclairage de l'écran LCD provoque des pics visibles atteignant jusqu'à {{ 1.44 | W }}.
- Pour une utilisation occasionnelle, le fonctionnement sur pile éliminerait la consommation permanente de l'adaptateur.
{% endtldr %}

## Le matériel

{% intro "balance-precision.jpg" "Balance de précision MATFER MII-3000 (3000 g × 0.5 g)" %}

La balance que je teste ici est une balance de précision de marque MATFER, modèle MII-3000. Il s'agit d'un équipement professionnel destiné aux entreprises de restauration. La capacité maximale est de 3000 g avec une précision de 0.5 g.

Une recherche sur le nom de modèle révèle que le fabricant réel est UWE (Universal Weight Electronics), et que ce modèle est aussi commercialisé dans le matériel de puériculture comme balance pour peser les couches mouillées. La balance peut fonctionner sur piles (9 V) ou sur adaptateur secteur.

### Méthode de mesure

La balance est branchée sur {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un wattmètre de laboratoire programmable ISW8001 %} qui permet de mesurer sa consommation avec une précision bien supérieure à celle des prises connectées habituelles.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations sur l'étiquette

L'étiquette au dos de la balance indique « DC 9V / 0.1A », soit {{ 0.9 | W }} :

{% image "./images/balance-precision-prise-et-etiquette.jpg" "Étiquette à l'arrière de la balance (DC 9V / 0.1A) à côté de la prise de l'adaptateur secteur" "300w" 300 %}
{% comment %}photo de l'étiquette à l'arrière à côté de la prise de l'adaptateur secteur. Il est indiqué DC 9V / 0.1A{% endcomment %}

Voici les indications techniques inscrites sur l'adaptateur secteur :

{% image "./images/balance-precision-transfo.jpg" "Adaptateur secteur de la balance (INPUT: 230V ~ 50Hz 0.1A Max, OUTPUT: 9V - 100mA 0.9VA)" "500w" 500 %}
{% comment %}AC ADAPTOR
INPUT: 230V ~ 50Hz 0.1A Max
OUTPUT: 9V - 100mA 0.9VA{% endcomment %}

L'adaptateur indique une puissance d'entrée maximale de 0.1 A sous 230 V, soit 23 W maximum en entrée. En sortie, il délivre 9 V à 100 mA, soit {{ 0.9 | W }}, ce qui correspond exactement aux spécifications indiquées sur l'étiquette de la balance.

### Première tentative avec Shelly Plus Plug S

J'ai d'abord tenté de mesurer la balance avec {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %}. J'ai branché la balance, l'ai allumée, effectué une pesée, puis l'ai éteinte. Voici le résultat sur {{ 456272 | divided_by: 1000 | s }} :

{% profile "balance-precision-shelly.json.gz" '{"name": "Balance mesurée avec Shelly Plus Plug S", "range": "104797m456272"}' %}
{% comment %}draft: J'ai d'abord branché la balance, puis l'ai allumée, l'ai utilisée pour une pesée, puis l'ai éteinte. Impossible de distinguer clairement quoi que ce soit, on croirait juste voir du bruit. On peut quand même relever la moyenne.{% endcomment %}

On ne distingue quasiment rien. Impossible de voir clairement quand la balance est allumée ou éteinte, le signal ressemble surtout à du bruit. On peut quand même relever une puissance moyenne de {{ 0.840 | W }}.

Cette première mesure illustre bien les limites des prises connectées classiques pour des appareils à très faible consommation. Il faut un équipement plus précis.

### Mesure avec ISW8001

J'ai donc reproduit exactement la même séquence avec le wattmètre ISW8001. Voici notre dispositif de mesure :

{% image "./images/balance-precision-mesure.jpg" "Balance allumée (affichant 31.5 g pour la notice du wattmètre posée dessus), wattmètre ISW8001 indiquant 0.95 W au fond de l'image" "500w" 500 %}
{% comment %}Notre setup de test : la balance est allumée et dessus est posée la notice du wattmètre ISW 8001, la balance indique indique 31,5g. Au fond de l'image on voit le wattmètre qui indique 0.95 W{% endcomment %}

Cette fois-ci, la différence est claire :

{% profile "balance-precision.json.gz" '{"name": "Balance mesurée avec ISW8001", "range": "55090m76376"}' %}
{% comment %}draft: J'ai mesuré exactement la même chose, et cette fois ci on voit clairement une différence de consommation quand la balance est allumée.{% endcomment %}

Avec l'ISW8001, on distingue nettement deux niveaux de consommation. La puissance moyenne est de {{ 0.897 | W }} sur l'ensemble de la mesure.

### En détail

#### Balance éteinte

La façade de la balance présente un écran LCD et quatre boutons :

{% image "./images/balance-precision-facade.jpg" "Façade de la balance MATFER MII-3000 avec écran LCD et 4 boutons (MODE, TARE, ON/ZERO, OFF)" "700w" 700 %}
{% comment %}Façade de la balance MATFER MII-3000 3000g x 0.5g. Un écran et 4 boutons : MODE, TARE, ON / ZERO, OFF.{% endcomment %}

Il faut appuyer sur le bouton ON/ZERO pour allumer la balance. Sinon, même alimentée, elle reste éteinte et l'écran n'affiche rien.

Regardons d'abord la balance branchée mais éteinte :

{% profile "balance-precision.json.gz" '{"name": "Balance mesurée avec ISW8001 — éteinte", "range": "56601m20851"}' %}
{% comment %}draft: zoom sur la partie initiale de l'enregistrement où la balance est branchée mais éteinte{% endcomment %}

La consommation est stable à environ {{ 0.830 | W }}.

#### Balance allumée

Maintenant, observons la balance allumée :

{% profile "balance-precision.json.gz" '{"name": "Balance mesurée avec ISW8001 — allumée", "range": "89916m20851"}' %}
{% comment %}draft: zoom sur la partie de l'enregistrement où la balance est allumée. Comparer avec un pourcentage l'augmentation de conso. Peut-être une occasion de se moquer du auto-off après 10 ou 30 minutes d'inutilisation qui n'économiserait quasiment rien.{% endcomment %}

La consommation s'établit à environ {{ 0.960 | W }}, soit {{ 0.960 | percentMore: 0.830 }} de plus que lorsqu'elle est éteinte.

L'augmentation de consommation n'est que de {{ 0.960 | minus: 0.830 | W }} environ. Le manuel de la balance propose des fonctions d'arrêt automatique après 10 ou 30 minutes d'inactivité, mais vu la différence minime entre allumée et éteinte, l'économie serait dérisoire. Ces modes ont par contre probablement un intérêt lorsqu'on alimente la balance avec des piles : cela permet plus de mobilité et évite la consommation permanente de l'adaptateur secteur. Le manuel propose aussi un mode ECO qui met la balance en veille au bout de 10 secondes d'inactivité pour optimiser la durée de vie des piles.

#### L'adaptateur secteur seul

J'ai ensuite débranché la balance de son adaptateur secteur pour mesurer la consommation de l'adaptateur seul pendant {{ 900234 | divided_by: 1000 | s }} :

{% profile "balance-precision.json.gz" '{"name": "Balance mesurée avec ISW8001 — débranchée", "range": "175288m900234"}' %}
{% comment %}draft: après avoir fini de reproduire la mesure faite précédemment avec la prise shelly, j'ai débranché la balance de son adaptateur secteur, et mesuré pendant un quart d'heure la consommation de l'adaptateur secteur. Et c'est presque la même que celle de la balance éteinte ! Calculer combien consomme la balance si on la laisse branchée toute l'année.{% endcomment %}

L'adaptateur secteur seul consomme environ {{ 0.850 | W }}, soit la même valeur que la balance éteinte (environ {{ 0.830 | W }}) à la précision de mesure près !

Cela confirme que lorsque la balance est éteinte, la totalité de la consommation provient de l'adaptateur secteur lui-même. La balance proprement dite ne consomme presque rien en mode éteint. Cette situation rappelle celle du {% test carillon-filaire carillon filaire %}, où le transformateur représentait l'essentiel de la consommation en veille.

Il est donc recommandé de débrancher complètement la balance lorsqu'elle sera inutilisée de façon prolongée (nuit, week-end, vacances) pour éviter cette consommation permanente de l'adaptateur.

#### Rétro-éclairage

En lisant le manuel, j'ai découvert que la balance dispose d'un rétro-éclairage de l'écran LCD. Lorsqu'on appuie sur le bouton MODE, il s'allume quelques secondes :

{% image "./images/balance-precision-retro-eclairage.jpg" "Écran LCD avec rétro-éclairage activé affichant 0.0 g" "300w" 300 %}
{% comment %}photo de l'afficheur avec le rétro éclairage allumé et l'affichage de 0.0g{% endcomment %}

Voici la consommation sur {{ 40096 | divided_by: 1000 | s }} avec plusieurs activations du rétro-éclairage :

{% profile "balance-precision.json.gz" '{"name": "Balance mesurée avec ISW8001 — rétro-éclairage", "range": "1082675m40096"}' %}
{% comment %}draft: En lisant le manuel, j'ai découvert que la balance dispose d'un rétro éclairage. Lorsqu'on appuie sur le bouton mode il s'allume quelques secondes :{% endcomment %}

On observe des pics bien visibles atteignant jusqu'à {{ 1.44 | W }} lorsque le rétro-éclairage est activé, contre {{ 0.979 | W }} sans rétro-éclairage.

### Sur un an

Si la balance reste branchée en permanence sur l'adaptateur secteur, même éteinte, elle consommera {{ 0.850 | W€PerYear }} par an.

Si on l'utilise quelques minutes par jour pour des pesées occasionnelles, la différence entre l'avoir allumée ou éteinte est négligeable. Avec une différence de consommation de {{ 0.960 | minus: 0.830 | W }}, il faudrait garder la balance allumée pendant {{ 0.960 | minus: 0.830 | times: 24 | countPer€: 0.01 }} jours pour dépenser un centime de plus en électricité. Le coût électrique est donc essentiellement celui de l'adaptateur secteur branché en permanence.

Pour une utilisation vraiment occasionnelle, on pourrait privilégier le fonctionnement sur pile (9 V) et débrancher complètement l'adaptateur secteur. Cela éliminerait les {{ 0.850 | W }} de consommation permanente de l'adaptateur.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette balance de précision, on pourrait :
- mesurer la consommation en courant continu avec {% post mesurer-la-consommation-avec-un-wattmetre-usb un wattmètre USB %} en alimentant directement avec une alimentation de laboratoire, pour isoler complètement l'adaptateur secteur et connaître la consommation réelle de la balance seule ;
- mesurer la consommation sur pile (9 V) pour évaluer l'autonomie réelle et quantifier l'impact du mode ECO et de l'arrêt automatique après 10 ou 30 minutes sur la durée de vie des piles ;
- comparer avec d'autres modèles de balances de précision pour voir si la conception de l'adaptateur secteur influence significativement la consommation en veille.
{% endplusloin %}
