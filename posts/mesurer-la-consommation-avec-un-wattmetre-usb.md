---
layout: post-layout.njk
title: Mesurer la consommation avec un wattmètre USB-C AVHzY C3
img: avhzyc3.jpg
date: 2025-06-19
tags: ['post']
---

Un wattmètre USB est un petit outil extrêmement pratique pour enregistrer le profil de consommation d'un appareil alimenté en USB. Voyons comment faire avec le modèle AVHzY C3.
<!-- excerpt -->

## Le matériel
{% intro "avhzyc3.jpg" "Wattmètre AVHzY C3 branché entre un chargeur et un répéteur Wifi" %}

Le **AVHzY C3** est un wattmètre USB-C capable de mesurer en temps réel la tension, le courant, la puissance, ainsi que d'autres paramètres comme l'énergie cumulée ou la résistance de câble. 

Il s'agit d'un appareil compact, équipé d'un écran couleur, qui s'intercale entre une source d'alimentation USB-C (comme un chargeur) et un appareil (comme un ordinateur portable ou un smartphone).

Outre ses capacités d'affichage en temps réel, il dispose d'une fonction d'export de données en continu vers un ordinateur via USB, permettant d'étudier la consommation d'un appareil dans le temps.

Sa grande précision le distingue d'autres modèles de wattmètre USB, en effet, il est capable de fournir un enregistrement à un taux d'échantillonnage d'un kilo hertz (soit mille valeurs enregistrées par seconde).

La puissance maximale supportée, {{ 240 | W }}, ne le limite pas aux téléphones, et lui permet également de mesurer la puissance soutirée par des ordinateurs portables, même puissants. 

{% endintro %}

## Le logiciel

### Collecte des données

Le AVHzY C3 peut être connecté à un ordinateur comme un périphérique USB standard. Grâce à cela, il est possible de récupérer automatiquement les mesures.

Pour mes enregistrements, j'utilise [un script node.js](https://github.com/fqueze/usb-power-profiling/blob/main/) qui demande au wattmètre d'envoyer ses données à la fréquence maximale dont il est capable, et stocke la mesure de puissance et l'horodatage de chaque mesure.

Le protocole de communication entre le wattmètre et l'ordinateur n'étant pas documenté, pour écrire mon script, j'ai dû observer les paquets de données échangés entre le wattmètre et un ordinateur sous Windows exécutant le logiciel (peu ergonomique) fourni par le fabricant.

La précision de mesure est excellente : de l'ordre de 0,0001V et 0,0001A, ce qui permet d'analyser même de très faibles consommations.

### Affichage des données au fur et à mesure

Un serveur HTTP créé par le script permet de visualiser les données en temps réel. Pour afficher ces données, après avoir démarré le script (`yarn start`), il suffit d'ouvrir [`http://localhost:2121/`](http://localhost:2121) dans un navigateur web, par exemple Firefox.

Cela permet de voir immédiatement comment évolue la puissance consommée :  
{% image "./images/avhzyc3-live-profiling.png" "AVHzY C3 live profiling" "1024w" 1024 %}

L'appareil mesuré ici était une lampe USB en forme d'anneau disposant de 3 intensités lumineuses :  
{% image "./images/lampe-usb-bily.jpg" "Lampe USB en forme d'anneau Bily XP91014 connectée au wattmètre AVHzY C3" "500w" 500 %}

### Enregistrer le résultat

Lorsque des données intéressantes sont affichées sur cette interface web, il est facile de sauvegarder les données. Les données peuvent être téléchargées au format CSV pour les afficher dans un tableur, ou sous la forme d'un fichier JSON qui sera lisible par le [Firefox Profiler](https://profiler.firefox.com). Il est aussi possible d'ouvrir directement un nouvel onglet avec les données dans le Firefox Profiler, qui permettra lui aussi de télécharger le profil, sous forme d'un fichier compressé.

Voici le profil obtenu lors de la mesure précédente :  
{% profile "avhzyc3-led.json.gz" %}

Comme le taux d'échantillonnage est élevé, il est possible de zoomer sur une fraction de seconde et de voir des détails dans le comportement de l'appareil :  
{% profile "avhzyc3-led.json.gz" '{"name":"Zoom sur une fraction de seconde","range":"11133m653"}' %}

Ici on remarque par exemple que la puissance consommée oscille un peu lorsque la lampe est au niveau d'intensité intermédiaire. Ces variations ont lieu sur une période de moins de {{ 0.040 | s }}.

### Profiler en continu

Les données étant stockées sur l'ordinateur, il est possible de profiler la consommation d'un appareil USB pendant plusieurs heures, mais attention au volume de données produit. Pour profiler sur une longue période, le taux d'échantillonnage d'1 kilohertz est peut-être excessif.

## Cas d'usage

Ce type de wattmètre permet de mesurer précisément la consommation de nombreux petits appareils. cela peut-être soit des appareils alimentés de façon permanente en USB (ordinateur portable, répéteur wifi, ...), soit des appareils fonctionnant sur batterie et se rechargent en USB (par exemple un casque sans fil).

Il est même possible d'utiliser un tel wattmètre pour mesurer la consommation d'un logiciel fonctionnant sur un téléphone. Pour cela, il faudra d'abord s'assurer que la batterie du téléphone est chargée à 100%, puis exécuter l'action logicielle à mesurer. L'énergie que le téléphone consommera depuis la connexion USB correspondra alors à l'utilisation d'énergie du téléphone en temps réel. Cette méthode est par exemple utilisée pour mesurer la consommation énergétique de Firefox pour Android.

## Noms alternatifs

Le wattmètre visible sur les photos de cet article est vendu sous la marque « AVHzY » et le nom de modèle « C3 ».

Le nom affiché par l'ordinateur lorsque le câble USB est connecté est « YK-Lab — Korona YK003C » qui correspond probablement au nom original donné par le concepteur de ce wattmètre.

Un wattmètre très similaire mais disposant également de prises USB de type A est vendu sous les noms « Shizuku YK-Lab YK001 », « Power-Z KT002 », « AVHzY CT-3 », « ATORCH UT18 » ou « HELPERS LAB XB001A ».

{% image "./images/shizuku-alternative-names.jpg" " Quatre multimètres USB : deux AVHzY (C3 et CT-3), un POWER-Z KT002 de ChargerLAB, et un module bleu Shizuku de YK-LAB." "700w" 700 %}

{% plusloin "Conclusion" %}
- Pour un prix d'environ 60 €, le wattmètre AVHzY C3 est un outil extrêmement complet pour mesurer et enregistrer la consommation électrique sur un port USB-C.
- Il offre une grande précision (jusqu'à 0,01V et 0,001A) et peut enregistrer en continu via une simple connexion USB série.
- Son interface simple et ses possibilités d'intégration dans des scripts personnalisés en font un choix parfait pour du profilage énergétique détaillé.
{% endplusloin %}
