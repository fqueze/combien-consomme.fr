---
layout: post-layout.njk
title: Mesurer la consommation avec la Télé-Information Client d'un compteur Linky en mode « historique »
img: linky-teleinfo-historique.jpg
date: 2026-01-17
tags: ['post']
---

Tous les logements disposent d'un compteur électrique pour mesurer la consommation et établir les factures. Le compteur Linky offre une sortie « Télé-Information Client » qui transmet en continu les données de consommation. Peut-on obtenir des informations détaillées directement depuis ce compteur ?
<!-- excerpt -->

{% tldr %}
- La sortie Télé-Information Client du Linky transmet en continu la puissance apparente (VA) et l'index de consommation facturé, avec des trames toutes les 1,5 secondes environ.
- C'est peu adapté pour mesurer la consommation :
  - la puissance apparente en VA ne correspond pas à la consommation facturée ;
  - l'index de consommation n'a qu'une faible précision ;
  - impossible d'isoler un appareil spécifique ;
  - inadapté pour l'autoconsommation photovoltaïque (affiche 0 dès que production > consommation).
- Cas d'usage pertinent : suivi global de consommation du logement, détection d'anomalies, validation de la puissance souscrite.
{% endtldr %}

## Le compteur Linky et sa sortie TIC

{% intro "linky-teleinfo-historique.jpg" "Compteur Linky avec ses bornes de télé-information" %}

Le [compteur Linky](https://fr.wikipedia.org/wiki/Linky "Page « Linky » sur Wikipédia") dispose de bornes « Télé-Information Client » (TIC) qui transmettent en temps réel les données de consommation : puissance apparente, courant, index d'énergie. Cette sortie permet d'accéder aux mêmes données que celles utilisées pour établir la facture d'électricité, mais avec un détail temporel beaucoup plus fin.

### Les deux modes de fonctionnement

Le Linky peut fonctionner en deux modes TIC différents :

**Mode « historique »** : C'est le mode de compatibilité avec les précédentes générations de compteurs électroniques. Il est activé par défaut sur la plupart des installations. C'est ce mode que nous allons tester dans cet article.

**Mode « standard »** : Ce mode plus récent offre davantage de données, notamment la puissance injectée dans le réseau par une installation photovoltaïque. Pour l'activer, il faut en faire la demande auprès de son fournisseur d'énergie.

Pour savoir dans quel mode fonctionne son compteur, il suffit d'appuyer sur le bouton « + » jusqu'à ce que l'écran « MODE TIC » apparaisse.

{% endintro %}

Voici ce qu'affiche le compteur utilisé pour ce test :

{% image "./images/linky-teleinfo-historique-mode-historique.jpg" "Compteur Linky Sagemcom affichant HISTORIQUE et MODE TIC" "500w" 500 %}

C'est un compteur de marque Sagemcom. L'écran indique clairement « HISTORIQUE », confirmant qu'il fonctionne en mode historique.

## Le matériel de mesure

### Choix de la méthode de connexion

Pour récupérer les données de la sortie TIC, plusieurs solutions existent : modules USB filaires, modules Zigbee sans fil pour systèmes domotiques, modules WiFi, etc. J'ai choisi pour ce test un adaptateur USB filaire pour deux raisons :

- La liaison filaire assure qu'on ne perdra aucune donnée (pas de paquets perdus sur le WiFi).
- Ça ne nécessite pas de système domotique existant, on prend les données directement à la source.

### L'installation complète

Voici l'installation que j'ai mise en place :

{% image "./images/linky-teleinfo-historique-avec-mac-mini.jpg" "Montage complet : compteur Linky, disjoncteur général avec sticker photovoltaïque, Mac mini raccordé au module téléinfo, et prises murales pour l'alimentation" "500w" 500 %}

On voit le compteur, le disjoncteur général (avec un sticker indiquant la présence de panneaux photovoltaïques sur cette installation), et un Mac mini que j'ai utilisé pour collecter les données. Je n'avais pas sous la main de Raspberry Pi avec support wifi intégré, alors j'ai utilisé un vieux Mac mini de 2012 qui traînait dans un tiroir.

### Le module USB

J'utilise le module TELEINFO USB de GCE Electronics, vendu autour de 25 € :

{% image "./images/linky-teleinfo-historique-adaptateur.jpg" "Module TELEINFO USB de GCE Electronics" "300w" 300 %}

Ce module convertit le signal série du Linky en USB. D'un côté on trouve un bornier avec 2 vis permettant de raccorder deux fils aux bornes I1 et I2 de télé-information du compteur Linky :

{% image "./images/linky-teleinfo-historique-adaptateur-prise-tic.jpg" "Bornier avec 2 vis pour le raccordement, LED verte PWR et LED jaune DATA" "300w" 300 %}

On a aussi deux LED : une verte (PWR) allumée quand le module est alimenté, et une jaune (DATA) qui clignote lors de la réception des données.

De l'autre côté on a une prise USB-B qui permet de connecter le module à l'ordinateur :

{% image "./images/linky-teleinfo-historique-adaptateur-prise-usb.jpg" "Prise USB-B du module" "300w" 300 %}

Le module est alimenté par le port USB de l'ordinateur. Le compteur Linky dispose d'une troisième borne qui peut alimenter certains modules, mais elle ne sera pas utilisée ici.

## Le protocole TIC en mode historique

### Paramètres de communication

Le mode historique utilise les paramètres série suivants :
- **Vitesse** : 1200 [bauds](https://fr.wikipedia.org/wiki/Baud_(mesure) "Page « Baud » sur Wikipédia")
- **Bits de données** : 7
- **Parité** : paire
- **Bits d'arrêt** : 1

Le mode standard du Linky utilise 9600 bauds.

### Structure des trames

Les trames TIC sont émises en continu, environ toutes les 1,5 secondes (cette durée serait un peu plus longue sur une installation avec plus de données comme HP/HC, option Tempo, ou triphasé). Chaque trame commence par un caractère STX (0x02), contient plusieurs lignes de données, et se termine par un caractère ETX (0x03).

Chaque ligne a le format suivant :
```
\nLABEL DATA CHECKSUM\r
```

La [somme de contrôle](https://fr.wikipedia.org/wiki/Somme_de_contr%C3%B4le "Page « Somme de contrôle » sur Wikipédia") (checksum) est calculée sur le label et les données, ce qui permet de détecter les erreurs de transmission.

### Exemple de trame complète

Voici une trame typique reçue du compteur :

```
ADCO 012345678901 E
OPTARIF BASE 0
ISOUSC 25 =
BASE 006083405 %
PTEC TH.. $
IINST 002 Y
IMAX 090 H
PAPP 00550 +
HHPHC A ,
MOTDETAT 000000 B
```

Voici les informations contenues dans chaque ligne :
- **ADCO** : Numéro de série du compteur (identifiant unique) ;
- **OPTARIF** : Type de tarif (BASE pour tarif de base, HC.. pour heures creuses/pleines) ;
- **ISOUSC** : Intensité souscrite en ampères (ici 25 A, correspondant à un abonnement de 5 kVA selon la formule PREF/200 V) ;
- **BASE** : Index de consommation en Wh ;
  - Si on était en tarif HC.., on aurait deux lignes à la place : HCHC et HCHP avec les valeurs en Wh pour chacune ;
  - En Tempo on aurait 6 valeurs : BBRHCJB, BBRHPJB, BBRHCJW, BBRHPJW, BBRHCJR, BBRHPJR ;
  - En Tempo on aurait également une valeur « DEMAIN » de 4 caractères indiquant la couleur du lendemain.
- **PTEC** : Période tarifaire en cours ;
- **IINST** : Courant instantané en ampères (ici 2 A) ;
- **ADPS** (optionnel) : Avertissement de dépassement de puissance souscrite lorsque IINST > ISOUSC (3 caractères) ;
- **IMAX** : Intensité maximale (toujours 90 A pour les compteurs monophasés, 60 A par phase en triphasé) ;
- **PAPP** : Puissance apparente en VA (ici 550 VA) ;
- **HHPHC** et **MOTDETAT** : Valeurs constantes dans le protocole.

### Les trois valeurs qui nous intéressent

Parmi toutes ces données, trois valeurs varient à chaque trame et permettent de suivre la consommation :

**PAPP** (puissance apparente) : valeur en VA, arrondie à la dizaine. C'est la valeur qui varie le plus rapidement et qui permet de voir les variations de consommation en temps réel.

**BASE** (index de consommation) : valeur en Wh qui s'incrémente par pas de 1 Wh. C'est ce qui est facturé, mais en 1000 fois plus précis ! En calculant les deltas de BASE, on peut reconstituer la puissance active réelle.

**IINST** (courant instantané) : valeur entière en ampères. Cette valeur a une résolution très faible (environ 230 W par ampère à 230V), mais elle a tout de même un intérêt pour les installations avec panneaux photovoltaïques : elle continue de varier même quand la production dépasse la consommation (alors que PAPP tombe à 0 et BASE ne bouge plus), ce qui permet d'inférer la production solaire.

## Le logiciel et son interface

Le [logiciel que j'ai développé](https://github.com/fqueze/linky-power-profiling) pour ce test est écrit en Node.js et s'inspire fortement de l'architecture d'un [projet que j'avais développé](https://github.com/fqueze/serial-power-profiling/) pour le {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 wattmètre ISW8001 %}.
Il se connecte au port série USB, décode les trames TIC en temps réel, et propose une interface web pour visualiser les données :

{% image "./images/linky-teleinfo-historique-power-profiling.png" "Interface web montrant l'enregistrement de 22h" "800w" 800 %}

L'interface affiche en temps réel un graphique de la puissance apparente, ainsi que les statistiques (médiane, moyenne, maximum). Les données peuvent ensuite être exportées au format [Firefox Profiler](https://profiler.firefox.com), qui affichera trois graphiques distincts :
{% image "./images/linky-teleinfo-historique-profiler-view.png" "Vue Firefox Profiler avec les trois graphiques" "800w" 800 %}

- **Active Power** : puissance active basée sur l'index BASE, échantillonnée uniquement lors des changements (ce qui explique les pics artificiels que nous verrons plus loin) ;
- **Apparent Power** : puissance apparente basée sur PAPP, échantillonnée à chaque trame ;
- **Current** : courant instantané basé sur IINST.

Il existe bien sûr de nombreuses autres solutions logicielles pour exploiter les données TIC : intégrations avec Home Assistant, Jeedom, Domoticz, ou encore des scripts personnalisés en Python. Le principe reste le même : décoder les trames série et traiter les données reçues.

## Mise en pratique : enregistrement sur 22 heures

Voici un enregistrement complet de la consommation du logement sur environ une journée :

{% profile "linky-teleinfo-historique.json.gz" '{"name": "Environ une journée", "range": ""}' %}
{% comment %}draft: enregistrement sur environ une journée (22h). On a deux enregistrement de puissance : la puissance apparente et la puissance active{% endcomment %}

La vue affiche deux graphiques : d'abord la puissance apparente (Apparent Power), puis la puissance active (Active Power). L'enregistrement dure {{ 80100 | divided_by: 3600 | round }} heures.

On observe :
- La nuit :
  - Une puissance apparente stable (à quelques pics près) autour de {{ 400 | VA }} ;
  - la puissance active descend à des valeurs plus faibles : on observe un minimum à environ 150 W, avec des périodes régulières d'environ 15 minutes toutes les 50 minutes où la consommation monte à un peu plus de 200 W. C'est probablement la consommation du réfrigérateur et du {% test congelateur congélateur %} ;
- Des pics pendant la journée, correspondant à l'utilisation de différents appareils de forte puissance (en particulier, appareils de cuisson), avec quelques pics atteignant jusqu'à {{ 3130 | VA }} ;
- Une période au milieu de la journée où la consommation affichée tombe à 0 : la production photovoltaïque dépasse la consommation.

## Zoom sur deux appareils

Peut-on utiliser le Linky pour mesurer un appareil spécifique ? Voici deux exemples.

### Le four à micro-ondes

Le {% test four-a-micro-ondes four micro-ondes %} est un cas intéressant car on connaît sa consommation et on sait qu'il alterne entre presque rien et beaucoup, donc il est facile à repérer sur un graphique même s'il y a d'autres appareils en fonctionnement en même temps.

Voici un zoom sur l'utilisation du four pour le petit déjeuner :

{% profile "linky-teleinfo-historique.json.gz" '{"name": "Four micro-ondes — décongélation puis chauffage", "range": "32993059m758527"}' %}
{% comment %}draft: zoom sur l'utilisation du four à micro-onde pour le petit déjeuner : d'abord décongélation d'une baguette, puis chauffage d'un bol. La puissance apparente a une forme raisonnable mais des valeurs excessives ; la puissance active a plein de pics.{% endcomment %}

On observe immédiatement un problème : les deux courbes ont des formes différentes. La courbe de puissance active présente de nombreux pics erratiques et irréguliers qui ne correspondent pas à la réalité. La courbe de puissance apparente a une forme plus cohérente, mais la puissance apparente ne correspond pas à la consommation réelle !

Cela vient des limitations du mode historique :
- La puissance apparente (en VA) ne reflète pas la consommation réelle (en W) pour un appareil comme un four micro-ondes.
- Les incréments de 1 Wh de BASE génèrent des pics artificiels très visibles sur la courbe de puissance active.
- La fréquence d'échantillonnage (~0,67 Hz) est insuffisante pour capturer finement les variations.

### L'aspirateur d'atelier

Pour confirmer les limitations observées, voici un autre test avec un {% test aspirateur-atelier aspirateur d'atelier %} fonctionnant pendant un peu plus d'une minute :

Voici l'interface pendant cet enregistrement :

{% image "./images/linky-teleinfo-historique-power-profiling-aspirateur.png" "Interface web pour l'enregistrement de l'aspirateur" "800w" 800 %}

Et voici le profil sauvegardé, qui contient à nouveau les courbes de puissance apparente et puissance active :

{% profile "linky-teleinfo-historique-aspirateur.json.gz" '{"name": "Aspirateur d\'atelier", "range": "63979m97345"}' %}
{% comment %}draft: un autre test : utilisation pendant un peu plus d'une minute de l'aspirateur d'atelier. La puissance apparente a une forme raisonnable mais des valeurs excessives ; la puissance active a plein de pics.{% endcomment %}

On retrouve les mêmes problèmes : la courbe de puissance active présente des pics artificiels, et la puissance apparente ne correspond pas à la consommation réelle.

**Conclusion** : Le mode historique du Linky ne convient pas pour mesurer précisément des appareils individuels.

## Limitation majeure : l'autoconsommation photovoltaïque

L'installation sur laquelle j'ai fait ces tests dispose de panneaux solaires en toiture. Voici un zoom sur la période de la journée où il fait jour :

{% profile "linky-teleinfo-historique.json.gz" '{"name": "Production photovoltaïque", "range": "37261371m22515382"}' %}
{% comment %}draft: zoom sur la partie de la journée où il fait jour. On voit que les courbes d'énergie sont très décevantes : dès que la production dépasse la conso, tout est à 0...{% endcomment %}

Sur ce zoom de {{ 22515382 | divided_by: 1000 | s }}, la puissance médiane est de {{ 0 | W }}. Cela correspond à la puissance soutirée du réseau (quand on consomme plus qu'on ne produit), mais ne correspond pas du tout à la consommation réelle. La consommation est masquée par la production photovoltaïque. De plus, le surplus de production qui est injecté dans le réseau (quand on produit plus qu'on ne consomme) n'est pas du tout visible.

En mode TIC historique, le Linky ne communique que le soutirage net sur le réseau. Dès que la production photovoltaïque dépasse la consommation :
- **PAPP** (puissance apparente) tombe à 0 VA
- **BASE** (index) n'augmente plus ou très lentement
- Les graphiques de puissance affichent 0 W

On ne voit donc ni la production solaire, ni l'injection sur le réseau. Une grande partie de la journée apparaît simplement comme une ligne à 0 W.

### Une astuce partielle : utiliser le courant

Il est cependant possible d'inférer partiellement ce qui se passe en affichant le courant instantané (IINST) en plus des compteurs d'énergie :

{% image "./images/linky-teleinfo-historique-profiler-current.png" "Profiler montrant les compteurs d'énergie et l'affichage du courant" "800w" 800 %}

Même quand la consommation affichée est nulle car la production dépasse la consommation, le courant n'est pas nul. On peut donc se faire une idée de l'évolution de la production photovoltaïque au cours de la journée grâce au courant.

Mais cela reste très limité : on ne peut quantifier précisément ni la production, ni l'autoconsommation.

**Conclusion** : Le mode historique du Linky est totalement inadapté pour analyser l'autoconsommation photovoltaïque. Le mode historique n'indique même pas l'injection : il affiche simplement 0 dès que la production dépasse la consommation. Le mode standard fournirait l'information sur l'injection, mais le compteur Linky ne mesurant que ce qui est échangé avec le réseau, il ne permettrait toujours pas de mesurer l'autoconsommation (il faudrait pour cela comparer avec une mesure prise sur le système de production).

## Limitations du mode historique

Après ces tests, on peut dresser un bilan des limitations du mode historique :

### 1. Puissance apparente vs puissance active

Le Linky en mode historique ne fournit que la **puissance apparente** (PAPP en VA), pas la puissance active (en W).

- Pour les charges résistives (radiateurs, ampoules incandescentes) : VA ≈ W
- Pour les charges réactives (moteurs, transformateurs, LED) : VA > W

Pour la plupart des logements, le facteur de puissance moyen est autour de 0,9-0,95, donc VA et W sont relativement proches pour une vue d'ensemble. Mais pour des mesures précises, il faudrait la puissance active.

**Solution partielle** : L'index BASE représente l'énergie vraiment consommée en Wh. En calculant les deltas de BASE, on obtient la puissance active réelle moyenne, mais pas instantanée.

### 2. Résolution de BASE, fréquence d'échantillonnage et pics artificiels

L'index BASE s'incrémente par pas de **1 Wh seulement**. Cela signifie :
- À 1000 W : un incrément toutes les 3,6 secondes
- À 500 W : un incrément toutes les 7,2 secondes
- À 100 W : un incrément toutes les 36 secondes

Si une trame était envoyée à chaque incrément, on n'aurait pas de problème. Mais les trames TIC arrivent à fréquence fixe, environ **toutes les 1,5 secondes** (~0,67 Hz). La combinaison de ces deux facteurs (incréments de 1 Wh et fréquence fixe) crée des artefacts d'échantillonnage.

Lorsqu'on convertit ces incréments de 1 Wh en puissance pour afficher un graphique, on obtient des **pics artificiels** très visibles. Ces pics apparaissent car le nombre d'incréments par échantillon varie de manière irrégulière alors que la puissance réelle reste stable : une période peut contenir un incrément de plus que la précédente, créant un pic artificiel.

**Conséquence importante** : Pour la puissance active dérivée de BASE, le maximum et la médiane sont complètement faux. Seule la **moyenne reste exploitable** (car c'est simplement l'énergie totale divisée par le temps). La fréquence d'échantillonnage est suffisante pour voir des cycles longs (machine à laver, chauffage), mais trop lente pour capturer finement les variations rapides.

### 3. Granularité insuffisante

La valeur **PAPP** est arrondie à **la dizaine de VA la plus proche** : on observe 550 VA, 560 VA, 570 VA, mais impossible de détecter des variations inférieures à 10 VA.

La valeur **IINST** est un **entier en ampères**, ce qui est très gênant :
- Une variation de 1 A représente environ 230 W (à 230V)
- Impossible de détecter des variations de courant < 1 A
- Par exemple, impossible de distinguer 400 W de 500 W (tous deux arrondis à 2 A)

### 4. Pas d'information sur la tension

Le mode historique ne fournit pas la valeur de tension, contrairement au mode standard. Avoir accès à la tension permettrait de détecter des variations ou des anomalies du réseau, et faciliterait certains calculs et analyses.

### 5. Limitation avec autoconsommation photovoltaïque

**Problème majeur** pour les installations avec panneaux solaires : lorsque la production photovoltaïque dépasse la consommation, PAPP tombe à 0 VA et BASE n'augmente plus. On ne voit pas la production solaire dans les graphiques de puissance. Le mode historique est donc **totalement inadapté** pour analyser l'autoconsommation photovoltaïque.

## Ce que le mode historique permet de faire

Malgré ces limitations, le mode historique du Linky reste utile pour certains cas d'usage.

Le mode historique permet d'obtenir facilement et à moindre coût (un simple adaptateur à une vingtaine d'euros) un profil de consommation global du logement sur une journée ou plus. On peut ainsi identifier les heures de pointe, repérer une consommation nocturne anormale qui pourrait révéler un appareil défectueux ou resté allumé par erreur, ou encore vérifier si la puissance souscrite est bien adaptée aux besoins réels.

Pour suivre les gros consommateurs comme le chauffage, le chauffe-eau ou le four, le mode historique peut donner une idée générale de leur fonctionnement, à condition de les utiliser seuls ou de pouvoir les isoler dans les moments où le reste de la maison consomme peu.

Pour mesurer des appareils spécifiques ou l'autoconsommation photovoltaïque, d'autres solutions sont nécessaires. Une {% post mesurer-la-consommation-avec-shelly-plus-plug-s prise connectée %} permet de mesurer précisément un appareil individuel avec une résolution de 0,1 W. Un {% post mesurer-la-consommation-avec-shelly-em module dans le tableau électrique %} permet d'isoler plusieurs circuits (bureau, chauffage, étage...).

Pour les installations photovoltaïques, une amélioration serait de demander à son fournisseur d'énergie de passer le compteur en mode « standard », qui donne accès notamment à la puissance injectée dans le réseau.

{% plusloin %}
Pour aller au-delà de ce test du mode historique, on pourrait :
- tester le mode « standard » du Linky (plus de données dont la tension et la puissance injectée pour les installations photovoltaïques), qui nécessite cependant une demande au fournisseur d'énergie pour l'activer sur le compteur ;
- essayer d'autres modules télé-info disponibles sur le marché (modules Zigbee, WiFi...) ;
- tester sur des installations en triphasé ou avec tarif HP/HC pour voir comment les données évoluent ;
- essayer d'étaler les pics artificiels de la courbe de puissance active pour la rendre plus utilisable ;
- implémenter des algorithmes de désagrégation ([NILM - Non-Intrusive Load Monitoring](https://en.wikipedia.org/wiki/Nonintrusive_load_monitoring "Page « Nonintrusive load monitoring » sur Wikipédia (en anglais)")) pour tenter d'identifier automatiquement les appareils actifs à partir des variations de consommation globale.
{% endplusloin %}
