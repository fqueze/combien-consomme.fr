---
layout: test-layout.njk 
title: la préparation d'un houmous
img: mixer-houmous-apres.jpg
date: 2024-04-13
tags: ['test']
---

Avec le retour des beaux jours, on ressort le houmous et ses bâtonnets de carottes pour l'apéritif. Mais combien consomme la préparation du houmous ?
<!-- excerpt -->

## Le matériel
<div id="Introduction">
<div>

Nous utilisons ici un mixeur plongeant Moulinex quickchef, 10 vitesses, 1000 W.

C'est un modèle plutôt haut de gamme, qui peut mixer bien plus qu'une simple soupe. Mixer des noix de cajou ne lui fait pas peur.

Dans notre saladier se trouvent des pois chiches préalablement cuits, du tahin, de l'huile d'olive, quelques épices et beaucoup d'eau.

### Méthode de mesure

Le mixeur est branché sur [une prise connectée Shelly Plus PlugS]({{ '/posts/mesurer-la-consommation-avec-shelly-plus-plug-s/' | url }}) qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

</div>
{% image "./images/mixer-houmous.jpg" "Un saladier contenant un houmous prêt à mixer, et un mixeur 1000W branché sur une prise connectée Shelly" "512w" 512 %}
</div>

## Consommation

{% profile "mixer-houmous.json.gz" '{"name": "Mixage du houmous", "range": "194488m94817"}' %}

Pour mixer, on procède par à coups. Ici, j'ai mis en marche le mixeur sur des plages de 3 à 5 secondes environ en déplaçant le mixeur à chaque fois pour mixer une autre zone.

Les 20 premières secondes étaient moins régulières car j'essayais différents réglages de vitesse, qui finalement n'ont pas eu d'impact visible sur le profil.

A chaque fois, nous observons un petit pic de consommation au redémarrage du mixeur, qui correspond au mixage de pois chiches encore entiers, puis on observe une décroissance de la consommation au cours des secondes suivantes, qui correspondent au mixage plus fin de pois chiches déjà broyés.

De manière plus générale, à mesure que le mixage avance, la résistance du houmous est plus faible, et la consommation diminue.

{% image "./images/mixer-houmous-apres.jpg" "Le même saladier, avec les pois chiches transformés en houmous" "512w" 512 %}

On constate d'ailleurs sur les 15 dernières secondes que la consommation est fortement réduite comparée à la consommation au début du mixage. C'est une indication que... c'est prêt ! Bon appétit.

Comme les pois chiches sont fermes mais relativement mous au regard de ce que le mixeur peut mixer (rappelez vous, les noix de cajou !), et que la préparation contient beaucoup d'eau, la consommation maximale ({{ 348 | W }}) est loin de la puissance de 1000 W indiquée sur l'appareil :

{% image "./images/mixer-etiquette.jpg" "Etiquette du mixeur" "512w" 512 %}

### Consommation en veille

En capturant le profil du mixage de houmous, nous avons remarqué que la consommation alors que nous n'avions même pas commencé à mixer n'était pas nulle. Cela s'explique facilement par la présence d'un voyant lumineux qui s'allume dès qu'on branche le mixeur.

{% profile "mixer-houmous.json.gz" '{"name": "Consommation en veille du mixeur", "range": "27183m164717"}' %}

La consommation ici mesurée pendant un peu moins de 3 minutes est très faible, et d'ailleurs la forme du profil est ici à prendre avec des pincettes, car nous atteignons les limites de la précision de la prise connectée utilisée pour les mesures. La consommation est probablement assez constante, et les pics sont liés à la méthode de mesure.

En supposant que la mesure réalisée ici est correcte (ou du moins que l'ordre de grandeur est bon), on peut extrapoler la consommation sur un an :
{% # (0.00856 * 24 * 3600 / 163) = 4.537 %}{{ 4.537 |  Wh€PerYear }}. C'est à la fois peu, et énorme vu le peu d'utilité de garder cette lumière allumée tout le temps dans sa cuisine pour juste avoir à ne pas brancher et débrancher son mixeur.

<div id="plusloin">

## Pour aller plus loin

On pourrait mesurer :
- la consommation de la cuisson des pois chiches ; elle est probablement bien plus élevée que celle du mixage, il serait pertinent de la mesurer.
- la consommation en veille avec un enregistreur plus précis.
- la consommation du même mixeur avec d'autres aliments plus durs (noix de cajou) ou plus mou (une soupe bien cuite).
</div>
