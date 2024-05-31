---
layout: test-layout.njk 
title: un scanner de documents
img: scansnapS1500M.jpg
date: 2024-05-31
tags: ['test']
---

Combien consomme la numérisation d'un document ? Et le scanner quand il attend, ou reste branché en permanence ? Mesurons !
<!-- excerpt -->

## Le matériel
{% intro "scansnapS1500M.jpg" "Scanner de documents recto-verso Fujitsu ScanSnap S1500M" %}

Il s'agit ici d'un [scanner de documents](https://fr.wikipedia.org/wiki/Scanner_(informatique)#Scanners_%C3%A0_d%C3%A9filement) recto-verso [Fujitsu ScanSnap](https://en.wikipedia.org/wiki/List_of_Fujitsu_image_scanners) S1500M.

C'est un modèle professionnel qui permet de numériser automatiquement une pile de documents (jusqu'à 50 feuilles), des deux côtés, et permet aussi de numériser des tous petits documents, par exemple des tickets de caisse. Pratique pour dématérialiser des archives, ou pour préparer une note de frais. On voit fréquemment ce genre de scanners (en plus moderne) dans les pharmacies pour numériser les ordonnances.

Ce scanner était assez cher lorsqu'il était neuf. Il a maintenant plus de 10 ans (date de fabrication : mars 2010), et je l'ai adopté pour {{10 | € }} dans un marché aux puces. Le plastique est un peu jauni, j'ai dû lui faire un gros nettoyage pour le remettre en état de marche, et il a besoin d'être connecté par un câble USB (alors que les modèles plus récents fonctionnent sans fil), mais il peut encore rendre bien des services !

### Méthode de mesure

Le scanner est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

J'ai manipulé de différentes façons le scanner pour regarder si cela causait des variations visibles de la consommation, voici un enregistrement d'une heure :
{% profile "scansnap.json.gz" '{"name": "Mesure de la consommation pendant une heure", "range": "m3602000"}' %}

On voit en effet que la puissance consommée varie beaucoup d'un moment à un autre, regardons plus en détails.

### Numérisation d'un document

#### Allumage

Lorsqu'on ouvre le couvercle du scanner, on entend un petit bruit de moteur pendant un bref instant, puis le scanner est prêt à fonctionner.
{% profile "scansnap.json.gz" '{"name": "Consommation lorsqu\'on allume le scanner", "range": "m12726"}' %}

Sur le profil, on voit une puissance d'environ {{ 25 | W }} pendant environ 2 secondes, puis la puissance consommée devient stable à environ {{ 20 | W }}.

#### Numérisation de documents A4

Procédons maintenant à quelques numérisations :

{% image "./images/scansnap-A4.jpg" "Numérisation d'un document A4" "512w" 512 %}

Voici l'enregistrement de la consommation lors de la numérisation de 3 documents A4 :
{% profile "scansnap.json.gz" '{"name": "Numérisation de 3 documents A4", "range": "66560m150379"}' %}

La puissance maximale mesurée ici, {{ 30 | W }}, est légèrement inférieure à ce que l'étiquette derrière le scanner suggère :

{% image "./images/scansnap-etiquette.jpg" "Etiquette du scanner ScanSnap S1500M" "512w" 512 %}

L'indication « 24V 1.5A » donne une puissance maximale en fonctionnement de {{ 24 | times: 1.5 | W }}. Peut-être serait-elle atteinte si les feuilles à faire passer dans le scanner étaient cartonnées et demandaient plus d'effort au moteur ?

Pour chacune des numérisations la puissance consommée augmente à environ {{ 30 | W }} pendant une durée variable, reflétant la difficulté qu'a eu le scanner à faire entrer le document (une feuille bien plate passe plus facilement qu'une feuille froissée par exemple) :
- Pour la première numérisation, pour laquelle le moteur a tourné plusieurs secondes avant que la feuille ne commence à rentrer, la consommation a été de {{ 0.108 | minus: 0.086 | Wh }}.
- Pour la deuxième numérisation, pour laquelle le moteur a démarré, puis s'est presque arrêté (j'ai cru que le document n'allait pas être scanné et que j'aurai un message d'erreur indiquant qu'aucun document n'était présent dans le chargeur) avant de réussir à attraper la feuille, la consommation a été de {{ 0.098 | minus: 0.086 | Wh }}.
- Pour la troisième numérisation qui s'est passée de façon parfaitement fluide, la consommation n'a été que de {{ 0.094 | minus: 0.086 | Wh }}.

Les consommations indiquées ici sont la différence avec la consommation sur une même période lorsque le scanner est prêt à fonctionner mais ne fait rien. L'augmentation de la puissance consommée pendant la numérisation semble principalement due au fonctionnement du moteur qui déplace la feuille à l'intérieur du scanner.

#### Numérisation d'un petit document

Regardons maintenant la consommation lors de la numérisation d'un tout petit document, ici un ticket de carte bancaire :

{% image "./images/scansnap-ticket-cb.jpg" "Numérisation d'un ticket de carte bancaire" "512w" 512 %}

{% profile "scansnap.json.gz" '{"name": "Numérisation d\'un ticket de carte bancaire", "range": "726113m17169"}' %}

La surconsommation mesurée ici pendant la numérisation, {{ 0.090 | minus: 0.086 | Wh }}, représente 50% de celle mesurée pour la numérisation fluide d'un document A4, alors que la feuille était beaucoup plus petite. Il y a probablement une durée minimum de fonctionnement avant que le moteur ne s'arrête.

#### Numérisation automatique de plusieurs documents A4

Cette fois-ci, au lieu de charger les feuilles A4 une par une, j'ai mis 3 feuilles dans le chargeur, et elles ont été toutes les trois numérisées recto-verso, produisant un document PDF de 6 pages sur l'ordinateur.

{% profile "scansnap.json.gz" '{"name": "Numérisation automatique de 3 documents A4", "range": "1508579m46182"}' %}

La surconsommation mesurée ici pendant la numérisation, {{ 0.106 | minus: 0.082 | Wh }}, correspond à 3 fois la surconsommation mesurée pour la numérisation fluide d'une seule feuille A4. L'enregistrement n'est pas assez précis pour voir où commence et où s'arrête chaque page, mais on peut supposer qu'elles ont toutes pris le même temps et consommé la même quantité d'énergie.

### Après la numérisation

#### Arrêt des lampes

Après avoir fait mes différents tests, j'ai laissé le scanner tel qu'il était pour voir au bout de combien de temps les lampes allaient s'éteindre.

{% profile "scansnap.json.gz" '{"name": "Mise en veille au bout de 14 minutes", "range": "1536832m1200328"}' %}

J'ai trouvé ça un peu long, mais finalement, 14 minutes après la fin de la dernière numérisation, les lampes se sont éteintes et la consommation a baissé significativement. Pendant les 14 minutes avant la mise en veille, la puissance moyenne était de {{ 19.4 | W }}, et {{ 4.55 | Wh€ }} ont été consommés. C'est beaucoup plus d'énergie que ce qui a été consommé lorsque je numérisais activement des documents !

#### Consommation en veille

J'ai ensuite laissé le scanner tel qu'il était pendant plusieurs heures de plus en espérant qu'il finisse par passer dans un mode de veille plus profonde.
{% profile "scansnap.json.gz" '{"name": "Consommation en veille pendant 4 heures", "range": "2480443m14409122"}' %}

Sur cet enregistrement de 4 heures, on observe que la puissance fluctue assez régulièrement entre des valeurs proches de {{ 2 | W }} et des valeurs proches de {{ 10 | W }}, pour une puissance moyenne et médiane de {{ 4.3 | W }}.

Pendant cette veille, le témoin lumineux bleu sur le devant du scanner reste allumé, et la communication USB avec l'ordinateur reste active, la consommation est donc probablement due à l'électronique du scanner.

Si on suppose que cette veille se prolonge indéfiniment (je n'ai pas essayé de laisser le scanner allumé toute une journée pour vérifier), cette veille consommera {{ 17.2 | times: 6 | Wh€ }} par jour, soit {{ 17.2 | times: 6 | Wh€PerMonth }} par mois ou {{ 17.2 | times: 6 | Wh€PerYear }} par an !

#### Eteint

Heureusement, lorsqu'on ferme le couvercle du scanner, ou lorsqu'on débranche le câble USB, il s'éteint complètement :

{% image "./images/scansnap-fermé.jpg" "Scanner fermé" "512w" 512 %}

Au moment de l'extinction, une notification sur l'ordinateur indique que la liaison USB est déconnectée et on entend un petit bruit de moteur. Je ne sais pas ce qu'il fait, mais l'enregistrement montre une surconsommation pendant 2 secondes :

{% profile "scansnap.json.gz" '{"name": "Consommation lors de l\'extinction", "range": "18424416m60479"}' %}

On voit nettement que la consommation après avoir fermé le couvercle diminue, mais elle n'est pas nulle. Regardons à nouveau ce que ça donne sur un enregistrement de 4 heures :

{% profile "scansnap.json.gz" '{"name": "Consommation éteint", "range": "18986667m14409122"}' %}

La consommation semble toujours fluctuer, même si on atteint les limites de précision de ce que la prise connectée peut correctement mesurer. La consommation moyenne est descendue à {{ 0.302 | W }}, ce qui est probablement dû aux pertes du bloc d'alimentation.

{% image "./images/scansnap-etiquette-transfo.jpg" "Etiquette du transfo du scanner ScanSnap S1500M" "512w" 512 %}

L'étiquette sur le bloc d'alimentation indique « INPUT 100-240V 1.5-0.9A » et « OUTPUT 24V 2.65A » ce qui indique une puissance maximale pouvant être délivrée au scanner de {{ 24 | times: 2.65 | W }}, mais aucune indication sur la consommation à vide, ce qui est bien dommage.

Si on laisse le scanner branché au secteur et éteint indéfiniment, cette consommation inutile sera de {{ 1.21 | times: 6 | Wh€ }} par jour, soit {{ 1.21 | times: 6 | Wh€PerMonth }} par mois ou {{ 1.21 | times: 6 | Wh€PerYear }} par an. C'est plus acceptable, mais je vais probablement continuer à débrancher la prise. Pour ne pas avoir à manipuler le fil à chaque fois qu'on veut se servir du scanner, on pourrait brancher le scanner sur une multiprise avec interrupteur, qui serait allumée lorsqu'on utilise l'ordinateur et éteinte le reste du temps.

### Ouverture pour retirer un bourrage

Il est possible d'ouvrir le scanner, par exemple pour extraire une feuille qui aurait été mal insérée et se serait chiffonnée à l'intérieur de l'appareil :

{% image "./images/scansnap-ouvert.jpg" "Scanner ouvert pour retirer un bourrage de papier" "512w" 512 %}

{% profile "scansnap.json.gz" '{"name": "Baisse de consommation lors de l\'ouverture", "range": "12264m32135"}' %}

Pendant que le scanner est ouvert, les lampes sont éteintes, ce qui réduit sensiblement la consommation, mais la consommation mesurée, {{ 9.3 | W }}, reste nettement supérieure à la consommation en veille. Je n'ai pas d'idée pour expliquer cette différence.

## Conclusions

- La consommation d'énergie pour une numérisation est insignifiante comparée à la consommation quand le scanner reste en attente de fonctionnement (pendant 14 minutes avant de passer en veille).
- La consommation en veille est élevée ; éteindre (en refermant le couvercle) ou débrancher le scanner après usage est une bonne idée.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce scanner, on pourrait :
- numériser des documents imprimés sur du papier de différents grammages pour observer si l'épaisseur des feuilles a une incidence sur la consommation mesurée.
- numériser des documents plus longs (long ticket de caisse, papier listing, …) pour évaluer la consommation par centimètre de document scanné.
- mesurer si la consommation augmente lors d'un bourrage.
- laisser le scanner en veille plus longtemps pour voir s'il finit par s'éteindre complètement au bout d'un (trop) long moment.
- utiliser un enregistreur avec un taux d'échantillonnage plus élevé pour être capable de séparer la consommation liée à la numérisation de chacune des feuilles lors de la numérisation automatique de plusieurs documents.
- utiliser un enregistreur plus précis sur les courants faibles pour mieux observer les fluctuation de consommation en veille et lorsque le scanner est éteint.
{% endplusloin %}
