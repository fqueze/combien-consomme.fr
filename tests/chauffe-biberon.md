---
layout: test-layout.njk 
title: un chauffe biberon
img: chauffe-biberon.jpg
date: 2024-04-11
tags: ['test']
---

Pour réchauffer le lait maternel, l'indispensable chauffe biberon. Combien consomme-t-il ?
<!-- excerpt -->

## Le matériel
{% intro "chauffe-biberon.jpg" "Un chauffe biberon BEABA Bib'secondes" %}
Le modèle testé est un chauffe biberon BEABA Bib'secondes. Une petite quantité d'eau est chauffée jusqu'à ébullition par une résistance électrique, de façon à ce que de la vapeur d'eau passe le long du biberon. Le biberon est ainsi chauffé rapidement par le contact avec de la vapeur d'eau à 100°C.

Le chauffage s'arrête avec une minuterie, dont la durée est réglable pour tenir compte de la quantité de lait à réchauffer et de sa température initiale.

### Méthode de mesure

Une prise connectée Shelly Plug S est branchée entre le chauffe biberon et la prise murale. La valeur de la puissance instantanée mesurée est collectée et enregistrée une fois par seconde, par un ordinateur qui relève les données. La transmission des données se faisant par wifi, la cadence d'enregistrement peut avoir quelques irrégularités.
{% endintro %}

## Consommation

### Sur une journée

Voici un profil de consommation enregistré sur une journée complète :

{% profile "chauffe-biberon.json.gz" '{"name": "Chauffe biberon pendant une journée"}' %}

On voit ici que dans cette journée, nous avons réchauffé du lait 6 fois.

Regardons les consommations mesurées :
- La consommation moyenne d'indique pas grand chose.
- La consommation maximale correspond à la consommation quand le chauffe biberon est activement en fonctionnement.
- La consommation médiane, de {{ 0.46 | W }}, correspond à la consommation au repos, quand le chauffe biberon ne fait rien. On pourrait s'attendre à ce qu'elle soit nulle, mais il doit y avoir un peu d'électronique qui reste sous tension.

### Un réchauffage

Regardons maintenant de plus près ce qu'il se passe lors d'une utilisation :
{% profile "chauffe-biberon.json.gz" '{"name": "Une utilisation du chauffe biberon", "range": "29253226m120173"}' %}

Le réchauffage dure ici 1 minute et 55 secondes. La consommation est maximale à environ {{ 420 | W }} pendant 1 minute et 50 secondes, puis descend entre 70 et {{ 90 | W }} pendant environ 5 secondes, avant de revenir à l'état de repos.
   
### Pour un bébé

Si on suppose que la consommation mesurée sur 24h ({{ 88.3 | Wh }}) est représentative, en extrapolant et en supposant que le tire-allaitement dure environ 1 an (d'abord en allaitement exclusif, puis en allaitement mixte mais avec de plus gros biberons), on obtient {{ 88.3 |  Wh€PerYear }} au total.

C'est bien moins que le prix d'achat neuf du chauffe biberon. Mais un tout petit peu plus que ce que j'ai payé le chauffe biberon d'occasion.

La consommation n'étant pas nulle au repos, il ne faudra pas oublier de débrancher le chauffe biberon quand il aura perdu son utilité, ou lorsqu'on part en vacances.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce chauffe biberon, on pourrait :
- mesurer la consommation avec un taux d'échantillonnage plus élevé (50Hz au lieu de 1Hz), de façon à voir des détails, comme par exemple l'impact de la sonnerie qui retentit lorsque la chauffe s'arrête.
- mesurer avec différents réglages de la minuterie.
{% endplusloin %}
