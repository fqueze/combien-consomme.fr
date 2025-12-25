---
layout: test-layout.njk 
title: un hydropulseur dentaire
img: hydropulseur.jpg
date: 2024-05-16
tags: ['test']
---

Un hydropulseur permet de nettoyer efficacement les endroits même les plus inaccessibles entre les dents. Son utilisation entraîne-t-elle un coût significatif ?
<!-- excerpt -->

{% tldr %}
L'hydropulseur consomme peu d'énergie : il faut {{ 0.149 | countPer€: 0.01 }} lavages de 40 secondes, ou {{ 0.523 | countPer€: 0.01 }} vidages complets de la cuve pour dépenser 1 centime en électricité.

Laisser l'hydropulseur branché toute l'année quand on ne s'en sert pas consommera {{ 0.621 | Wh€PerYear }} par an.

Le coût de l'électricité utilisée est négligeable par rapport au coût d'achat de l'appareil.
{% endtldr %}

## Le matériel
{% intro "hydropulseur.jpg" "Hydropulseur dentaire Oral B Braun branché sur une prise connectée Shelly Plus PlugS" %}

Il s'agit ici d'un hydropulseur dentaire Oral-B WaterJet de marque Braun, permettant de nettoyer les espaces interdentaires à l'aide d'un jet d'eau sous pression. Une alternative bien pratique au fil dentaire.

### Méthode de mesure

L'hydropulseur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Pour une utilisation

Commençons par regarder le profil d'une utilisation typique :
{% profile "hydropulseur.json.gz" '{"name": "Une utilisation normale", "range": "30738628m44128"}' %}

Utilisation à force 4 pendant une quarantaine de secondes. Juste le temps pour nettoyer rapidement tous les espaces interdentaires. On voit la puissance mesurée qui augmente au démarrage pendant quelques secondes avant de se stabiliser jusqu'à l'arrêt. Le coût total en électricité est négligeable (il faudrait {{ 0.149 | countPer€: 0.01 }} lavages de ce type pour dépenser un centime d'euro en électricité).

Voici un profil d'une utilisation plus longue :
{% profile "hydropulseur.json.gz" '{"name": "Cuve complète (600mL) force 4", "range": "421873m145428"}' %}

Ici la cuve (de 600mL) était entièrement pleine, et l'hydropulseur est resté en fonctionnement pendant plus de 2 minutes jusqu'à ce qu'elle soit vide.
La consommation mesurée pour le vidage total de la cuve est de {{ 0.523 | Wh }} ; il faudrait {{ 0.523 | countPer€: 0.01 }} vidages complets de la cuve pour dépenser un centime d'euro en électricité.

Au bout de 2min10s, lorsque la cuve s'est vidée, le moteur a changé de bruit :
{% profile "hydropulseur.json.gz" '{"name": "Lorsque la cuve devient vide", "range": "552945m14356"}' %}

On observe une baisse de la puissance consommée, passant en 2 secondes de {{ 13.8 | W }} à {{ 6.4 | W }}. La puissance reste ensuite stable jusqu'à l'arrêt de l'appareil.

### Impact des réglages

Cet hydropulseur dispose de deux boutons :
- un bouton sur le côté pouvant pivoter, gradué de 1 à 5, correspondant à la force du lavage des dents ;
- un bouton coulissant sur la poignée qui forme un robinet permettant de bloquer le jet.

{% image "./images/hydropulseur-boutons.jpg" "Boutons de l'hydropulseur BRAUN" "300w" 300 %}

Actionner ces boutons change le bruit émis par le moteur, et donc change très probablement la consommation électrique de l'appareil. Vérifions, avec un profil où j'ai d'abord démarré l'hydropulseur à la force 1, puis progressivement augmenté la force. Lorsque la force était au maximum, j'ai fermé le robinet, et diminué progressivement la force :
{% profile "hydropulseur.json.gz" '{"name": "Forces croissantes, puis décroissante avec le robinet fermé", "range": "677299m57359"}' %}

On voit nettement que la puissance consommée évolue en fonction des réglages.

#### Impact de la force de lavage

Décomposons maintenant avec des profils séparés pour chacune des forces de lavage :
{% profile "hydropulseur.json.gz" '{"name": "Force 1", "range": "971387m13091"}' %}
{% profile "hydropulseur.json.gz" '{"name": "Force 2", "range": "957913m14172"}' %}
{% profile "hydropulseur.json.gz" '{"name": "Force 3", "range": "934527m14172"}' %}
{% profile "hydropulseur.json.gz" '{"name": "Force 4", "range": "918889m15917"}' %}
{% profile "hydropulseur.json.gz" '{"name": "Force 5", "range": "894787m23979"}' %}

On peut ici lire les valeurs médianes de puissance pour avoir une idée de la consommation à chacun des réglages. Les consommations aux forces 1, 2, 3, 4 et 5 sont donc respectivement 8,4, 10,5, 12,6, 13,9 et {{ 15.2 | W }}.

#### Impact de la fermeture du robinet

{% profile "hydropulseur.json.gz" '{"name": "Impact de la fermeture du robinet - Force 1", "range": "1276859m35193"}' %}

À la force 1, la puissance passe de {{ 8.6 | W }} à {{ 10.9 | W }} lorsque le robinet est fermé.

{% profile "hydropulseur.json.gz" '{"name": "Impact de la fermeture du robinet - Force 5", "range": "1237469m34114"}' %}

À la force maximale, la puissance passe de {{ 15.5 | W }} à {{ 18 | W }} lorsque le robinet est fermé. Cette valeur maximale de {{ 18 | W }} correspond d'ailleurs exactement à la valeur indiquée sous l'appareil :

{% image "./images/hydropulseur-etiquette.jpg" "Étiquette de l'hydropulseur BRAUN" "512w" 512 %}

### Sur une journée

Voici un profil de la consommation sur une journée, avec une utilisation de 40 secondes :
{% profile "hydropulseur.json.gz" '{"name": "Une journée avec une utilisation", "range": "3632620m86430000"}' %}

On constate que la consommation totale, de {{ 0.782 | Wh }}, est très supérieure à la consommation mesurée pour les 40 secondes d'utilisation ({{ 0.149 | Wh }}). Ceci s'explique car la consommation de l'hydropulseur lorsqu'il est branché mais pas allumé n'est pas nulle.

Voici un profil de 24h sans utilisation :

{% profile "hydropulseur.json.gz" '{"name": "Une journée en veille", "range": "31341914m86430000"}' %}

Cette consommation en veille sur une journée correspond à plus de 4 lavages de 40 secondes !

Remarque : la consommation est tellement faible que la prise connectée Shelly ne peut pas la mesurer en continu, et alterne à la place entre des valeurs à 0 et des valeurs à {{ 0.1 | W }}. La puissance moyenne indiquée sur l'enregistrement ({{ 0.02586 | W }}) reste probablement pertinente, même s'il pourrait être intéressant de la vérifier avec {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un appareil de mesure plus précis pour les courants faibles %}, comme nous l'avons fait pour {% test balance-precision une balance de précision %}.

### Sur un an

Si on extrapole la consommation sur un an, {{ 0.621 | Wh€PerYear }} seront consommés si l'hydropulseur reste branché mais n'est jamais utilisé.

S'il est utilisé 40 secondes par jour à la force 4 (pour un nettoyage rapide avant d'aller se coucher) et débranché après usage, la consommation annuelle sera de {{ 0.149 | Wh€PerYear }} — {{ 0.782 | Wh€PerYear }} s'il n'est pas débranché.

S'il est utilisé 3 fois par jour avec une cuve complète à chaque fois (nettoyage approfondi après chaque repas) et débranché après usage, la consommation annuelle sera de {{ 0.523 | times: 3 | Wh€PerYear }} — {{ 0.523 | times: 3 | plus: 0.621 | Wh€PerYear }} s'il n'est pas débranché.

On peut donc conclure que même s'il sert plusieurs fois par jour pendant de nombreuses années, le coût en électricité de l'hydropulseur reste négligeable comparé à son prix d'achat.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet hydropulseur, on pourrait mesurer :
- le comportement lorsque la force de nettoyage est réglée sur des positions intermédiaires.
- si la consommation augmente pour une même force de nettoyage lorsque l'appareil est très entartré.
- la consommation en veille avec un appareil de mesure plus précis pour les faibles puissances.
{% endplusloin %}
