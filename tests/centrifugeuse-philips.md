---
layout: test-layout.njk
title: une centrifugeuse Philips HR1858
img: centrifugeuse-philips.jpg
date: 2025-12-29
tags: ['test']
---

Préparer un jus de fruit frais à la maison permet de profiter pleinement des vitamines et du goût des fruits de saison. Quel est le coût énergétique pour transformer des pommes et des oranges en jus maison ?

<!-- excerpt -->

{% tldr %}
- Pour un usage quotidien d'un jus de 4 pommes, la consommation annuelle serait de {{ 3.33 | Wh€PerYear }}.
- Le coût par pomme est d'environ {{ 3.33 | plus: 5.85 | divided_by: 11 | Wh }} ({{ 3.33 | plus: 5.85 | divided_by: 11 | countPer€: 0.01 }} pommes pour 1 centime d'électricité), soit environ {{ 5.16 | divided_by: 1.4 | Wh }} par kg ({{ 5.16 | divided_by: 1.4 | countPer€: 0.01 }} kg pour 1 centime).
- Le coût par orange est de {{ 0.911 | divided_by: 3 | Wh }} ({{ 0.911 | divided_by: 3 | countPer€: 0.01 }} oranges pour 1 centime).
- Le coût énergétique est négligeable comparé au prix des fruits, et même comparé au prix d'achat de cette centrifugeuse d'occasion (5 euros).
- La consommation branchée mais éteinte est faible mais non nulle : {{ 0.0172 | W€PerYear }} par an.
{% endtldr %}

{% comment %}
Notes from draft:
3 profils de cette centrifugeuse puissante disposant de 2 vitesses (vitesse 2 recommandée pour les fruits durs, vitesse 1 pour les fruits mous) ont été effectués :
1. 1476g de pommes en vitesse 2 puis 3 oranges en vitesse 1.

d'abord quelques secondes à vide à vitesse 1, puis quelques secondes à vide à vitesse 2.

puis centrifugage d'environ 1,5kg de pommes. Vitesse 2. D'abord en laissant tourner le moteur lors des rechargements de la cheminée, puis en arrêtant le moteur pendant que je rechargeais. Les pics sont probablement quand il y a eu de la résistance et que j'ai dû pousser un peu plus fort

A la fin, j'ai pressé 3 oranges en vitesse 1.

On remarque que la conso au repos n'est pas nulle, alors que l'interrupteur semble mécanique.

2. 7 pommes, en 3 remplissages de cheminée, une pomme s'est bloquée 30s lors du premier remplissage

3. 4 pommes coupées en 4
{% endcomment %}

## Le matériel

{% intro "centrifugeuse-philips.jpg" "Centrifugeuse Philips HR1858" %}

La centrifugeuse Philips HR1858 est une centrifugeuse puissante qui permet d'extraire rapidement le jus des fruits et légumes. Elle dispose de deux vitesses : la vitesse 1 pour les fruits tendres (agrumes, fruits rouges) et la vitesse 2 pour les fruits durs (pommes, carottes).

Le fonctionnement est simple : on place les fruits dans la cheminée, un disque râpe tournant à grande vitesse les transforme en pulpe, et la force centrifuge sépare le jus des fibres. Le jus s'écoule par le bec verseur dans le pichet fourni, tandis que les déchets s'accumulent dans un réservoir transparent qu'il faut vider régulièrement.

### Méthode de mesure

La centrifugeuse est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

L'étiquette située sous la centrifugeuse indique « PHILIPS HR1858 220-240V~ 50-60Hz 650W », soit une puissance nominale de {{ 650 | W }} :

{% image "./images/centrifugeuse-philips-etiquette.jpg" "Étiquette de la centrifugeuse Philips HR1858" "500w" 500 %}
{% comment %}PHILIPS HR1858
220-240V~ 50-60Hz 650W{% endcomment %}

Avec {{ 650 | W }}, c'est déjà un modèle très puissant, même si les centrifugeuses actuelles proposent des moteurs encore plus performants allant jusqu'à 800 W, voire 1300 W.

#### Site du fabricant

Le site Philips met en avant plusieurs caractéristiques :
- Cheminée de remplissage extra-large (75 mm de diamètre) permettant de passer des fruits entiers sans les couper ;
- Plusieurs vitesses adaptées aux fruits à chair ferme ou tendre ;
- Réservoir à pulpe de 2 L et pichet de 1,25 L ;
- Tamis micro-perforé en acier inoxydable ;
- Toutes les pièces amovibles compatibles lave-vaisselle.

### Premier test : pommes récupérées en fin de marché

Cette centrifugeuse en très bon état a été acquise au marché aux puces pour seulement 5 euros :

{% image "./images/centrifugeuse-philips-face.jpg" "Vue de face de la centrifugeuse avec le bec verseur et la cheminée" "500w" 500 %}
{% comment %}vu de fasse, on voit bien le bec verseur de sortie du jus la cheminée{% endcomment %}

Pour ce premier test, nous l'avons utilisée avec des pommes récupérées dans les poubelles à la fin du marché : trop abîmées pour être vendues, mais encore tout à fait consommables si on se donne la peine de les éplucher un peu. C'est justement un usage idéal pour une centrifugeuse : valoriser des fruits encore bons au goût mais plus présentables.

Nous avons pesé les pommes encore sauvables, dont nous retirerons ensuite les parties vraiment abîmées :

{% image "./images/centrifugeuse-philips-pommes-1476g.jpg" "Pommes à transformer en jus, pesées à 1476,5 g" "500w" 500 %}
{% comment %}pommes à transformer en jus, dans une passoire, pesées sur une balance de précision indiquant 1476,5g{% endcomment %}

{% test balance-precision La balance %} indique que nous avons sélectionné un peu moins de 1,5 kg de pommes.

Le test complet dure un peu moins de 3 minutes et consomme {{ 5.16 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "environ 1,5kg de pommes", "range": "640525m167333"}' %}
{% comment %}draft: environ 1,5kg de pommes ont été transformées en jus. la pesée correspond aux pommes complètes, mais certaines étaient un peu abimées. Les parties abîmées ont été retirées avant la transformation en jus, qui était un bon moyen d'utiliser des pommes qui étaient encore bonnes au goût, mais plus du tout présentables. Au début j'ai laissé la centri allumée pendant que je re-remplissais la cheminée et je me suis dépêché. Ensuite j'ai arrêté le moteur lors de chaque rechargement et j'ai pris mon temps pour remplir.{% endcomment %}

On observe une succession de pics de consommation correspondant aux moments où le disque râpe est en contact avec les pommes. La puissance maximale atteint {{ 923 | W }}, bien au-delà de la puissance nominale de {{ 650 | W }}. Les périodes à puissance nulle correspondent aux moments où j'ai éteint le moteur pour recharger la cheminée tranquillement.

Au fur et à mesure de la transformation, le jus s'accumule dans le pichet avec une couche de mousse caractéristique :

{% image "./images/centrifugeuse-philips-en-cours.jpg" "Transformation en cours : jus et mousse dans le pichet, cheminée rechargée" "500w" 500 %}
{% comment %}photo au milieu de l'opération, il y a déjà pas mal de jus et de mousse dans la carafe, la cheminée de la centrifugeuse a été rechargée{% endcomment %}

À la fin du test, le pichet de 1,25 L est à moitié plein :

{% image "./images/centrifugeuse-philips-jus-et-mousse.jpg" "Pichet à moitié plein de jus de pomme avec de la mousse" "500w" 500 %}
{% comment %}carafe pleine de jus avec un peu de mousse au dessus{% endcomment %}

#### En détail : deux stratégies de rechargement

J'ai testé deux approches lors de ce test. Au début, j'ai laissé le moteur allumé pendant que je rechargeais la cheminée, me dépêchant pour limiter le temps à vide. La première partie dure {{ 43530 | divided_by: 1000 | s }} et consomme {{ 2.55 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "environ 1,5kg de pommes — moteur restant allumé pendant rechargements", "range": "641518m43530"}' %}
{% comment %}draft: zoom sur la première partie où le moteur restait allumé pendant que je re-remplissais.{% endcomment %}

La puissance médiane est de {{ 178 | W }}, avec des pics à {{ 657 | W }} quand les pommes sont en contact avec le disque râpe. On voit bien les alternances entre moments de transformation (puissance élevée) et rechargements rapides (puissance encore importante).

Ensuite, j'ai changé de stratégie en éteignant le moteur à chaque rechargement, prenant mon temps pour recharger tranquillement. Cette deuxième partie dure {{ 122811 | divided_by: 1000 | s }} et consomme {{ 2.61 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "environ 1,5kg de pommes — moteur éteint pendant rechargements", "range": "685048m122811"}' %}
{% comment %}draft: zoom sur la deuxième partie où j'ai éteint le moteur lors de chaque rechargement, et pris mon temps pour recharger tranquillement (j'ai même pris le temps de faire une photo lors de l'un des rechargements){% endcomment %}

Les deux stratégies consomment sensiblement la même énergie ({{ 2.55 | Wh }} vs {{ 2.61 | Wh }}). La deuxième approche, plus tranquille, dure deux fois plus longtemps mais permet de prendre son temps sans stress.

### Deuxième test : 3 oranges en vitesse 1

Plus tard, j'ai également testé la centrifugeuse avec 3 oranges préalablement épluchées, en utilisant la vitesse 1 recommandée pour les fruits tendres :

{% image "./images/centrifugeuse-philips-cheminee-pleine-oranges.jpg" "Cheminée pleine d'oranges épluchées, prêtes à être pressées" "500w" 500 %}
{% comment %}la cheminée pleine d'oranges épluchées, prêtes à être pressées{% endcomment %}

L'opération dure {{ 17041 | divided_by: 1000 | s }} et consomme {{ 0.911 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "3 oranges, vitesse 1", "range": "1710441m17041"}' %}
{% comment %}draft: mesure de la conso lors du pressage de 3 oranges, préalablement épluchées, en vitesse 1. Calculer le coût par orange et comparer au coût par pomme, et dire qu'on pourra dans le futur comparer à la conso de presse agrumes (j'en ai plusieurs de différentes époques en attente d'être testés){% endcomment %}

La puissance médiane en vitesse 1 est de {{ 216 | W }}, avec un pic à {{ 467 | W }}. C'est nettement moins que la vitesse 2 utilisée pour les pommes.

### Troisième test : 7 pommes en 3 remplissages

Un autre jour, nous avons transformé 7 pommes en jus, en trois remplissages successifs de la cheminée :

{% image "./images/centrifugeuse-philips-7-pommes.jpg" "7 pommes de différentes variétés, prêtes à être transformées en jus" "500w" 500 %}
{% comment %}7 pommes de différentes variétés, prêtes à être transformées en jus{% endcomment %}

L'enregistrement dure un peu plus de 3 minutes et consomme {{ 5.85 | Wh€ }} :

{% profile "centrifugeuse-philips-test2.json.gz" '{"name": "7 pommes en 3 remplissage", "range": "418521m201560"}' %}
{% comment %}draft: un autre jour, et cette fois on a mesuré la transformation en jus de 7 pommes. Lors du premier remplissage de la cheminée, les morceaux étaient un peu trop gros (j'avais essayé de mettre une pomme complète sans la couper, comme le manuel indique qu'on peut faire pour gagner du temps) et se sont bloqués. Les deux remplissages suivants (un peu moins chargés ou avec les pommes coupées en morceaux) ont été transformé en jus beaucoup plus efficacement.{% endcomment %}

On observe trois phases distinctes correspondant aux trois remplissages. Le premier remplissage présente une particularité intéressante que nous allons détailler.

Le résultat final : un pichet généreux de jus frais, avec une belle couche de mousse naturelle :

{% image "./images/centrifugeuse-philips-7-pommes-jus-et-mousse.jpg" "Le jus des 7 pommes dans le pichet, avec beaucoup de mousse" "500w" 500 %}
{% comment %}Le jus des 7 pommes dans la carafe, avec beaucoup de mousse au dessus{% endcomment %}

De quoi remplir deux verres bien pleins :

{% image "./images/centrifugeuse-philips-deux-verres-et-reste.jpg" "Deux verres de jus de pomme prêts à être dégustés" "500w" 500 %}
{% comment %}Deux verres de jus de pomme prêts à être dégustés, et en arrière plan un peu de jus restant au fond du pichet, recouvert d'un peu plus de mousse{% endcomment %}

#### En détail : ce qui se passe quand la cheminée se bloque

Lors du premier remplissage, j'avais essayé de mettre une pomme complète sans la couper (comme le manuel indique que c'est possible pour gagner du temps). Les morceaux se sont bloqués dans la cheminée. Cette phase dure {{ 42864 | divided_by: 1000 | s }} et consomme {{ 2.72 | Wh€ }} :

{% profile "centrifugeuse-philips-test2.json.gz" '{"name": "cheminée bloquée pendant 30s", "range": "419318m42864"}' %}
{% comment %}draft: zoom sur la première partie où on a un plateau de 30s dans la puissance mesurée pendant que le contenu de la cheminée était bloqué et que plus rien n'était au contact du disque qui rappe les fruits{% endcomment %}

On observe un plateau d'environ 30 secondes à {{ 216 | W }}, pendant que le contenu était bloqué et que plus rien n'était au contact du disque râpe, avec un pic à {{ 616 | W }} à la fin après le déblocage.

#### Les deux remplissages suivants, plus efficaces

Après cette expérience, les deux remplissages suivants ont été réalisés avec des pommes coupées en morceaux, ce qui a permis une transformation beaucoup plus efficace.

Le deuxième remplissage dure {{ 22197 | divided_by: 1000 | s }} et consomme {{ 1.70 | Wh€ }} :

{% profile "centrifugeuse-philips-test2.json.gz" '{"name": "deuxième remplissage de la cheminée", "range": "560349m22197"}' %}
{% comment %}draft: deuxième remplissage de la cheminée, avec une action beaucoup plus efficace{% endcomment %}

La puissance médiane est de {{ 211 | W }}, avec un pic à {{ 703 | W }} quand les pommes sont transformées.

Le troisième et dernier remplissage dure {{ 14859 | divided_by: 1000 | s }} et consomme {{ 1.43 | Wh€ }} :

{% profile "centrifugeuse-philips-test2.json.gz" '{"name": "troisième remplissage de la cheminée", "range": "603685m14859"}' %}
{% comment %}draft: troisième et dernier remplissage de la cheminée{% endcomment %}

La puissance médiane est de {{ 397 | W }}, avec une puissance maximale à {{ 948 | W }}. Ce dernier remplissage est très rapide et efficace.

### Quatrième test : 4 pommes coupées en 4

Pour ce dernier test, nous avons préparé 4 pommes coupées en quartiers, une approche qui facilite le passage dans la cheminée :

{% image "./images/centrifugeuse-philips-4-pommes.jpg" "4 pommes lavées dans une passoire" "500w" 500 %}
{% comment %}4 pommes lavées dans une passoire{% endcomment %}

{% image "./images/centrifugeuse-philips-4-pommes-coupees-en-4.jpg" "4 pommes coupées en 4, prêtes à être transformées en jus" "500w" 500 %}
{% comment %}4 pommes coupées en 4, prêtes à être transformées en jus{% endcomment %}

Le test dure un peu plus d'une minute et consomme {{ 3.33 | Wh€ }} :

{% profile "centrifugeuse-philips-test3.json.gz" '{"name": "4 pommes coupées en 4", "range": "296377m69203"}' %}
{% comment %}draft: rapide et efficace, 4 pommes transformées en jus en à peine plus d'une minute. Donner la conso par pomme. Parler des pics correspondant aux moments où on a pressé plus fort pour faire descendre les pommes dans la cheminée et qu'il y avait plus de résistance.{% endcomment %}

Rapide et efficace : 4 pommes transformées en jus en un peu plus d'une minute. La puissance médiane est de {{ 183 | W }}, avec des pics à {{ 717 | W }} correspondant aux moments où j'ai pressé plus fort pour faire descendre les pommes dans la cheminée et qu'il y avait plus de résistance.

{% image "./images/centrifugeuse-philips-4-pommes-jus.jpg" "Le jus des 4 pommes dans le pichet" "500w" 500 %}
{% comment %}le jus des 4 pommes dans la carafe{% endcomment %}

### Branchée mais éteinte

Malgré un interrupteur qui semble mécanique et l'absence de tout voyant lumineux, la centrifugeuse consomme une très faible puissance lorsqu'elle est branchée mais éteinte. Voici un enregistrement de 6 minutes :

{% profile "centrifugeuse-philips-test2.json.gz" '{"name": "6 minutes branchée mais éteinte", "range": "46204m360264"}' %}
{% comment %}draft: enregistrement de 6 minutes montrant la consommation non nulle lorsque la centrifugeuse est branchée mais éteinte. Conso surprenante car aucun voyant lumineux, et l'interrupteur qui allume la centrifugeuse semble être un bouton physique. Probablement une bonne idée de débrancher. On pourrait dire combien de temps il faut pour consommer autant d'énergie en veille que lors de la transformation en jus d'une pomme{% endcomment %}

On observe une alternance entre 0 et 100 mW : nous avons dépassé la limite de précision de la prise Shelly pour ces très faibles puissances, mais la puissance moyenne reste probablement pertinente.

La puissance moyenne mesurée est de {{ 0.0172 | W }}. Si la centrifugeuse reste branchée tout le temps, elle consommera {{ 0.0172 | W€PerYear }} par an, soit un coût négligeable.

Pour mettre cela en perspective : il faudrait laisser la centrifugeuse branchée pendant {{ 3.33 | divided_by: 4 | divided_by: 0.00172 | divided_by: 24 | round }} jours pour consommer autant d'énergie que pour transformer une seule pomme en jus.

### Fonctionnement à vide

Pour comprendre la consommation du moteur seul, sans résistance des fruits, j'ai mesuré le fonctionnement à vide dans les deux vitesses.

#### Vitesse 1

La vitesse 1 tourne pendant {{ 6965 | divided_by: 1000 | s }} et consomme {{ 0.0713 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "à vide, vitesse 1", "range": "447478m6965"}' %}
{% comment %}draft: zoom sur la conso à vide en vitesse 1. Pic de puissance au démarrage, puis stabilisation (valeur médiane){% endcomment %}

On observe un pic de puissance au démarrage à {{ 92.1 | W }}, puis la puissance se stabilise à {{ 33.2 | W }} (valeur médiane).

#### Vitesse 2

La vitesse 2 tourne pendant {{ 8040 | divided_by: 1000 | s }} et consomme {{ 0.251 | Wh€ }} :

{% profile "centrifugeuse-philips.json.gz" '{"name": "à vide, vitesse 2", "range": "458462m8040"}' %}
{% comment %}draft: zoom sur la conso à vide en vitesse 2. Pic de puissance au démarrage, puis stabilisation (valeur médiane){% endcomment %}

Pic de démarrage à {{ 302 | W }}, puis stabilisation à {{ 132 | W }} (valeur médiane). La vitesse 2 consomme environ 4 fois plus que la vitesse 1 lorsque le moteur tourne à vide.

### Coût d'usage

Voici les coûts constatés lors de nos différents tests :

- **Test 1 (1,5 kg de pommes)** : {{ 5.16 | Wh€ }}, soit environ {{ 5.16 | divided_by: 1.4 | Wh€ }} par kg de pommes après épluchage ({{ 5.16 | divided_by: 1.4 | countPer€: 0.01 }} kg pour 1 centime)
- **Test 2 (3 oranges)** : {{ 0.911 | Wh€ }}, soit {{ 0.911 | divided_by: 3 | Wh€ }} par orange
- **Test 3 (7 pommes)** : {{ 5.85 | Wh€ }}, soit {{ 5.85 | divided_by: 7 | Wh€ }} par pomme
- **Test 4 (4 pommes)** : {{ 3.33 | Wh€ }}, soit {{ 3.33 | divided_by: 4 | Wh€ }} par pomme (coût très similaire au test précédent)

Le coût moyen par pomme (tests 3 et 4) est d'environ {{ 3.33 | plus: 5.85 | divided_by: 11 | Wh€ }}. Il faudrait transformer {{ 3.33 | plus: 5.85 | divided_by: 11 | countPer€: 0.01 }} pommes en jus pour dépenser un centime d'électricité.

#### Usage hebdomadaire

Cette centrifugeuse étant un modèle domestique, elle est conçue pour un usage occasionnel plutôt qu'intensif. Si vous faites un jus de 4 pommes une fois par semaine, la consommation annuelle sera de {{ 3.33 | times: 52 | Wh€ }}.

#### Usage quotidien

Pour un usage quotidien d'un jus de 4 pommes au petit-déjeuner, la consommation annuelle serait de {{ 3.33 | Wh€PerYear }}. Il faudrait {{ 3.33 | PerYear | countPer€: 1 }} ans de jus quotidien pour dépenser un euro d'électricité.

#### Perspective économique

Le coût énergétique est négligeable comparé au prix des fruits, et même comparé au prix d'achat de cette centrifugeuse d'occasion (5 euros). Avec des fruits glanés en fin de marché ou récoltés dans son propre jardin comme dans notre premier test, le coût total d'un jus maison se limite à l'électricité consommée, qui est insignifiant.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de la centrifugeuse varie fortement selon qu'elle tourne à vide ({{ 33.2 | W }} à {{ 132 | W }}) ou qu'elle transforme des fruits (pics jusqu'à {{ 948 | W }}). Une installation photovoltaïque domestique standard de 3 kWc produira largement suffisamment en milieu de journée ensoleillée pour alimenter la centrifugeuse.

La durée d'utilisation est très courte (quelques minutes), ce qui facilite grandement l'autoconsommation. Vous pouvez préparer votre jus de fruits frais :
- en collation en milieu de journée ;
- en milieu de matinée le week-end ;
- en évitant de faire tourner en même temps un autre gros consommateur comme {% test four-a-micro-ondes un four à micro-ondes %} ou {% test machine-a-laver un lave-linge %}.

Cela dit, avec un coût électrique de moins d'un centime par utilisation, l'enjeu économique reste très faible. L'intérêt est surtout environnemental ou idéologique : utiliser directement l'énergie solaire pour préparer un jus de fruits frais.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette centrifugeuse, on pourrait :
- tester d'autres types de fruits et légumes (carottes, betteraves, céleri, fruits rouges) pour comparer les consommations selon la dureté et la texture ;
- mesurer l'impact du niveau de remplissage de la cheminée sur l'efficacité et la consommation ;
- comparer avec d'autres modèles de centrifugeuses de différentes puissances ;
- comparer avec des presse-agrumes électriques pour les oranges et autres agrumes ;
- comparer un exemplaire très usé (notamment avec une râpe désaffûtée) à un exemplaire comme neuf pour mesurer l'impact de l'usure sur la consommation.
{% endplusloin %}
