---
layout: test-layout.njk 
title: un nettoyeur à ultrasons
img: nettoyeur-ultrasons.jpg
date: 2024-06-16
tags: ['test']
---

Combien coûte l'utilisation d'un nettoyeur à ultrasons ?
<!-- excerpt -->

{% tldr %}
L'utilisation du nettoyeur à ultrasons consomme peu d'énergie car sa durée de fonctionnement est brève : il faudrait effectuer {{ 3.18 | countPer€: 0.01 }} nettoyages de 5 minutes pour consommer 1 centime d'électricité.

Il est souhaitable de débrancher le nettoyeur une fois son utilisation terminée, car sa consommation en attente peut facilement dépasser celle en utilisation. S'il reste branché tout le temps, il consommera {{ 2.4 | W€PerYear }} par an.
{% endtldr %}

## Le matériel
{% intro "nettoyeur-ultrasons.jpg" "Nettoyeur à ultrason en plastique, dont le capôt est ouvert, contenant de l'eau et une paire de lunettes." %}

L'appareil testé est un nettoyeur à ultrasons bas de gamme (modèle CD-2820), probablement acheté initialement sur un site asiatique, que j'ai acquis pour quelques euros à la braderie de Lille. Il dispose d'une petite cuve, d'une taille suffisante pour y nettoyer une paire de lunettes.

Il y a deux boutons, l'un permettant de démarrer un programme de nettoyage, l'autre permettant de sélectionner le programme « 5 », « 3 » ou « 1.5 », correspondant au temps de nettoyage en minutes. Le numéro du programme sélectionné est rétro-éclairé en rouge.

Lorsqu'on lance le nettoyage, on entend un bruit de moteur qui cause des vibrations.

### Méthode de mesure

Le nettoyeur à ultrasons est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

J'ai mesuré la consommation des différents programmes de nettoyage, d'abord le programme de 5 minutes, puis celui de 3, et finalement celui de 1 minute 30. 
{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Mesure de la consommation pendant une heure", "range": "338819m3614077"}' %}

Comme j'ai constaté sur l'enregistrement que la puissance consommée diminuait au fil du temps, j'ai relancé un programme de 5 minutes pour comparer la consommation quand le nettoyeur vient d'être lancé et quand il a déjà servi plusieurs minutes.

J'ai ensuite laissé le nettoyeur branché un peu plus d'une heure pour mesurer la consommation en attente.

Regardons en détail ces différentes parties de l'enregistrement.

### Consommation des différents programmes

Le nettoyeur dispose de 3 programmes, testons les un par un.

{% image "./images/nettoyeur-ultrasons-durées.jpg" "Photo du nettoyeur à ultrasons montrant les 3 programmes possibles" "512w" 512 %}

{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Nettoyage de 5 minutes", "range": "398515m300651"}' %}

Lors du premier nettoyage de 5 minutes, {{ 3.18 | Wh€ }} ont été consommés. La puissance maximale mesurée, {{ 40.3 | W }} est inférieure à la puissance maximale de {{ 50 | W }} indiquée sur l'étiquette :

{% image "./images/nettoyeur-ultrasons-etiquette.jpg" "Etiquette du nettoyeur à ultrasons CD-2820, indiquant une puissance maximale de 50 W" "512w" 512 %}

La puissance moyenne est proche de la puissance maximale. On observe que la puissance diminue au fil du temps.


{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Nettoyage de 3 minutes", "range": "740162m182321"}' %}

Le nettoyage de 3 minutes a consommé {{ 1.75 | Wh€ }}, les puissances maximale et moyenne mesurées sont inférieures à celles mesurées lors du nettoyage précédent.

{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Nettoyage d\'1 minute 30", "range": "993773m91732"}' %}

Le nettoyage d'une minute 30 a consommé {{ 0.871 | Wh€ }}, les puissances maximale et moyenne mesurées sont à nouveau inférieures à celles mesurées lors du nettoyage précédent.

En se basant sur ces mesures, pour consommer 1 centime d'électricité, il faudrait effectuer {{ 3.18 | countPer€: 0.01 }} nettoyages de 5 minutes, {{ 1.75 | countPer€: 0.01 }} nettoyages de 3 minutes, ou {{ 0.871 | countPer€: 0.01 }} nettoyages d'une minute 30.

### Impact de l'échauffement du moteur

Comme nous avons constaté que la puissance mesurée diminue au fur et à mesure des utilisations, il est probable que l'échauffement du moteur change sa consommation. Regardons ce que l'on mesure si on relance d'autres nettoyages de 5 minutes :
{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Deuxième nettoyage de 5 minutes", "range": "1232462m304851"}' %}

Un nettoyage de 5 minutes lancé après les 3 tests précédents consomme {{ 2.83 | Wh€ }}, soit {{ 2.83 | percentLess: 3.18 }} de moins que le premier nettoyage de 5 minutes.

Voyons maintenant ce qui se passe si on laisse refroidir un peu le nettoyeur. J'ai laissé le nettoyeur en attente pendant un peu plus de 2 heures puis ai lancé un nouveau nettoyage de 5 minutes :
{% profile "nettoyeur-ultrasons.json.gz" '{"name": "Troisième nettoyage de 5 minutes après 2 heures d\'attente", "range": "9275426m303787"}' %}

La consommation de {{ 3.02 | Wh€ }} est {{ 3.02 | percentLess: 3.18 }} inférieure à celle du premier nettoyage de 5 minutes, mais {{ 3.18 | percentMore: 2.83 }} supérieure à celle du nettoyage de 5 minutes effectué avant de laisser refroidir.

### Consommation en attente

Pour finir, regardons la consommation du nettoyeur lors qu'il est en attente :
{% profile "nettoyeur-ultrasons.json.gz" '{"name": "En attente pendant 1h", "range": "4669334m3624585"}' %}

Une mesure d'une heure nous indique une puissance moyenne et médiane de {{ 2.4 | W }}. Si l'appareil reste branché en attente, cela représente {{ 2.4 | W€PerDay }} par jour (l'équivalent de {{ 2.4 | times: 24 | divided_by: 3.18 | round }} nettoyages de 5 minutes), ou {{ 2.4 | W€PerYear }} par an. Il sera donc souhaitable de débrancher le nettoyeur lorsque son utilisation est terminée.


{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un nettoyeur à ultrasons, on pourrait :
- mesurer la consommation à différents niveaux de remplissage de la cuve pour voir si la quantité de liquide à faire vibrer a une influence sur la consommation électrique.
- comparer différents modèles de différentes marques pour voir s'il y a des modèles qui consomment moins en attente.
- comparer avec des modèles ayant une cuve plus grande pour voir s'ils consomment plus.
{% endplusloin %}
