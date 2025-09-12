---
layout: test-layout.njk 
title: une pompe de relevage de condensats Sanicondens Eco
img: pompe-de-relevage-de-condensats-sanicondens-eco.jpg
date: 2024-12-27
tags: ['test']
---

Le plombier a installé le cumulus dans un endroit où l'évacuation naturelle de l'eau sortant du groupe sécurité est impossible. Quelle erreur ! Grâce à l'installation d'une pompe de relevage, il ne sera plus nécessaire de vider un seau d'eau une fois par semaine. Ce changement impactera-t-il la facture d'électricité ?
<!-- excerpt -->

{% tldr %}
- La consommation annuelle sera de {{ 0.163 | Wh€PerYear }} si la pompe se déclenche une fois par jour. C'est négligeable comparé à la consommation de l'appareil dont la pompe évacue l'eau.
- Aucune consommation lorsque le moteur de la pompe ne fonctionne pas. Pas de transformateur ou d'électronique qui reste sous tension tout le temps.
- La puissance mesurée entre 70 et {{ 75 | W }} est un peu supérieure à la puissance de {{ 60 | W }} indiquée sur l'étiquette.
{% endtldr %}

## Le matériel
{% intro "pompe-de-relevage-de-condensats-sanicondens-eco.jpg" "Une pompe de relevage de condensats Sanicondens Eco" %}

La pompe à eau Sanicondens Eco sert à relever les eaux de condensation produites par une [chaudière à condensation](https://fr.wikipedia.org/wiki/Chaudi%C3%A8re_%C3%A0_condensation "« Chaudière à condensation » sur Wikipédia") (gaz), un système de climatisation ou un déshumidificateur. Elle peut refouler les condensats jusqu'à 4,5 m de haut et par un tuyau pouvant mesurer jusqu'à 50 m de long. Le débit d'eau peut atteindre ‎6,2 litres par minute.

Dans notre cas, la pompe de relevage est utilisée pour rejeter l'eau qui s'écoule du [groupe de sécurité](https://fr.wikipedia.org/wiki/Groupe_de_s%C3%A9curit%C3%A9 "« Groupe de sécurité » sur Wikipédia") d'un ballon d'eau chaude ayant été malencontreusement installé dans une pièce ne disposant pas de tuyau d'évacuation des eaux usées.

### Méthode de mesure

La pompe de relevage de condensats Sanicondens Eco est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Indications du fabricant

Une étiquette sur le dessus de l'appareil nous renseigne sur sa puissance :  
{% image "./images/pompe-de-relevage-de-condensats-sanicondens-eco-etiquette.jpg" "Étiquette indiquant « Sanicondens ECO SFA TYPE : CD10 220-240 V 50-60 Hz 60 W IP24" "500w" 500 %}

On s'attend donc à une puissance en fonctionnement ou maximale de {{ 60 | W }}.

### Un test rapide
Avant d'installer réellement la pompe sous le chauffe-eau, il a semblé préférable de vérifier le bon fonctionnement de l'appareil. Pour cela, la pompe a été placée sur la terrasse, un court tuyau d'environ 50cm a été raccordé à la sortie d'eau, pour évacuer l'eau de façon bien visible dans une plate-bande de fleurs.

{% image "./images/pompe-de-relevage-de-condensats-sanicondens-eco-dessus.jpg" "TODO" "500w" 500 %}

De l'eau a été versée lentement dans l'arrivée d'eau à l'aide d'un arrosoir, jusqu'à ce que la pompe se déclenche. Voici l'enregistrement de la consommation lorsqu'elle s'est déclanchée :

{% profile "pompe-de-relevage-de-condensats-sanicondens-eco.json.gz" '{"name": "Consommation lors du test avec un arrosoir", "range": "528533m10991"}' %}

On constate que la pompe a fonctionné pendant 9 secondes une fois qu'elle a démarré.

La puissance médiane de {{ 72.6 | W }} et la puissance maximale mesurée à {{ 74.2 | W }} sont nettement supérieures à la valeur de {{ 60 | W }} indiquée sur l'étiquette.

Aucune consommation n'a été relevée lorsque le moteur de la pompe ne tournait pas :  
{% profile "pompe-de-relevage-de-condensats-sanicondens-eco.json.gz" '{"name": "Consommation lors du test avec un arrosoir", "range": "513852m419554"}' %}

Si on ouvre le bac et retourne l'appareil, le mécanisme de la pompe est visible avec une hélice sur l'axe d'un moteur électrique :  
{% image "./images/pompe-de-relevage-de-condensats-sanicondens-eco-flotteur-et-pompe-dessous.jpg" "Pompe vue de dessous, on devine une hélice sur l'axe d'un moteur" "500w" 500 %}

Sur une vue de devant, un flotteur servant probablement d'interrupteur est bien visible :  
{% image "./images/pompe-de-relevage-de-condensats-sanicondens-eco-flotteur-et-pompe.jpg" "TODO" "500w" 500 %}

On peut en conclure que la pompe est simplement composée d'un moteur électrique et d'un interrupteur, sans aucune électronique qui fonctionne lorsqu'il n'y a pas d'eau à évacuer. C'est une bonne nouvelle car une consommation en veille, même très faible, aurait probablement largement dépassé la consommation en fonctionnement.

### Sur un an

Cette pompe étant actuellement vendue 69,99€, il faudra {{ 0.163 | countPer€: 69.99 }} déclenchements de la pompe pour que le coût en électricité rattrape l'investissement effectué pour de l'achat initial du matériel.

Si l'on suppose que la pompe démarre une fois par jour lorsque le ballon d'eau chaude chauffe la nuit et que le groupe sécurité relâche un peu d'eau lorsque l'eau chauffée monte en pression, la consommation mesurée de {{ 0.163 | Wh }} pour un déclenchement de la pompe peut être extrapolée à {{ 0.163 | Wh€PerYear }} sur un an. C'est négligeable comparé au coût de fonctionnement du ballon d'eau chaude.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette pompe de relevage de condensats Sanicondens Eco, on pourrait :
- vérifier si la longueur du tuyau d'évacuation raccordé à la pompe a une influence sur la consommation électrique de la pompe.
- vérifier si la hauteur de relevage de l'eau a un impact sur la consommation.
- mesurer la consommation de la pompe si de l'eau est versée en continu dans le bac de la pompe et que le moteur démarre donc souvent.
{% endplusloin %}
