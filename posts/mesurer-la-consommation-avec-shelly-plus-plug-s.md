---
layout: post-layout.njk 
title: Mesurer la consommation avec une prise connectée Shelly Plus Plug S
img: shellyplusplugs.jpg
date: 2024-05-14
tags: ['post']
---

Une prise connectée est un moyen très simple d'enregistrer un profil de la consommation d'un appareil. Voyons comment faire avec une prise Shelly Plus Plug S.
<!-- excerpt -->

## Le matériel
{% intro "shellyplusplugs.jpg" "Shelly Plus Plug S allumée, avec un chargeur d'ordinateur branché dessus" %}

Comme la plupart des prises connectées, cette prise permet d'automatiser l'allumage et l'extinction d'un appareil qui y est branché. Elle dispose en plus d'une fonction de mesure d'énergie.

Cette prise communique en Wifi. Elle peut soit créer son propre point d'accès auquel on peut se connecter (ce qui est pratique pour s'y connecter initialement dans le but de la configurer), soit se connecter à un réseau Wifi existant. Elle peut être utilisée avec l'application pour smartphone de son constructeur, et communiquer des données avec le cloud, mais elle peut aussi fonctionner de façon uniquement locale, ce qui a ma préférence pour des raisons de confidentialité des données.
{% endintro %}

## Le logiciel

### Collecte des données
Cette [prise connectée](https://shelly-api-docs.shelly.cloud/gen2/Devices/Gen2/ShellyPlusPlugS) est capable d'exécuter des scripts, écrits dans [un langage proche du JavaScript](https://shelly-api-docs.shelly.cloud/gen2/Scripts/ShellyScriptLanguageFeatures/).
Pour mes enregistrements, j'utilise [un script](https://github.com/fqueze/shelly-plus-power-profiling/blob/main/shelly-script.js) qui effectue une mesure de puissance toutes les secondes et stocke le résultat. Un serveur HTTP permet de récupérer les données.

La prise dispose de suffisamment de mémoire pour stocker 10 minutes d'historique. Cela me permet de commencer l'utilisation de l'appareil dont je souhaite mesurer la consommation sans me soucier d'avoir mon ordinateur à portée de main pour récupérer les données. L'enregistrement directement sur la prise de 10 minutes d'historique m'évite aussi de perdre des données lorsque le Wifi est perturbé.

### Affichage des données au fur et à mesure

Pour récupérer les données stockées dans la prise, j'utilise un script fonctionnant sur une simple page web. Le code se trouve sur un dépôt github : [github.com/fqueze/shelly-plus-power-profiling](https://github.com/fqueze/shelly-plus-power-profiling/), qu'il faut télécharger, avant d'ouvrir le fichier `index.html` dans un navigateur.


Dans la page qui s'ouvre, il faut indiquer l'adresse IP de la prise Shelly Plus Plug S dans le réseau local (ici `192.168.1.89`) et l'adresse à laquelle le script fonctionnant sur la prise répond aux requêtes HTTP (ici `script/1/power`).

Si tout est bien configuré, le script va automatiquement récupérer les données de la prise toutes les 5 secondes. Lors de la première requête, il récupérera 10 minutes d'historique (ou si la prise est branchée depuis moins de 10 minutes, il récupérera l'historique depuis que la prise est branchée). Les données récupérées seront utilisées pour mettre à jour l'affichage :

{% image "./images/shelly plusPlugS live profiling.png" "Shelly PlusPlugS live profiling" "1024w" 1024 %}

Cette copie d'écran montre un exemple de ce qu'on peut voir pendant la récupération des données : un graphique et des statistiques similaires à ceux affichés sur ce site, qui se mettent à jour toutes les 5 secondes.

### Enregistrer le résultat

Lorsque des données intéressantes sont affichées sur cette interface web, il est facile de sauvegarder les données. Les données peuvent être téléchargées au format CSV pour les afficher dans un tableur, ou sous la forme d'un fichier JSON qui sera lisible par le [Firefox Profiler](https://profiler.firefox.com). Il est aussi possible d'ouvrir directement un nouvel onglet avec les données dans le Firefox Profiler, qui permettra lui aussi de télécharger le profil, sous forme d'un fichier compressé.

Le profil visible sur la copie d'écran est celui que j'ai enregistré pour mon {% test meuleuse-d'angle-carrelage test de découpe de carrelage avec une meuleuse d'angle %} :

{% profile "meuleuse.json.gz" %}

### Profiler en continu

Cette méthode permet de profiler la consommation d'un appareil pendant une longue durée : plusieurs heures, voire plusieurs jours.

Voici par exemple un profil de presque 10 heures enregistré grâce à cette méthode :
{% profile "shellyplug.json.gz" %}

Il s'agit ici d'une mesure de la consommation du chargeur de mon ordinateur portable. On voit distinctement 3 modes de fonctionnement :
- l'ordinateur vient d'être branché, la consommation est assez élevée, mais décroît au fil du temps.
- l'ordinateur est branché depuis quelques heures et la batterie est pleine. La consommation est stable mais on observe des pics lorsque les resources de l'ordinateur sont fortement sollicitées.
- l'ordinateur n'est pas branché, on observe une consommation inférieure à {{ 1 | W }} correspondant à des pertes du chargeur.

Ce type d'enregistrement permet de voir après coup ce qui s'est passé, ce qui peut être très utile si l'on souhaite obtenir un profil de consommation d'un comportement imprévisible et donc difficile à reproduire.

{% plusloin "Conclusion" %}
- Pour un prix d'environ 25 €, cette prise connectée est le moyen le plus simple d'obtenir des profils de consommation électrique similaires à ceux présentés sur ce site.
- Elle permet d'enregistrer chaque seconde la puissance consommée par un appareil consommant jusqu'à {{ 2500 | W }}, avec une précision de {{ 0.1 | W }}.
- Pour des mesures plus précises sur des {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 consommations inférieures à 1 W %}, un wattmètre de laboratoire offre une résolution jusqu'à 1 mW.
- La possibilité d'exécuter des scripts directement sur la prise permet d'éviter de perdre des données en cas de perturbation du réseau Wifi pendant jusqu'à 10 minutes.
{% endplusloin %}
