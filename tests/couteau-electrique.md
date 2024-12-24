---
layout: test-layout.njk 
title: un couteau électrique
img: couteau-electrique-pain-de-mie.jpg
date: 2024-09-22
tags: ['test']
---

Mémé l'a eu pour la fête des mères. En vrai, c'était toujours Pépé qui s'en servait. Le bruit caractéristique du couteau électrique indiquait qu'on allait passer à table dans quelques instants. Pépé aurait-il fait une économie s'il avait demandé à la boulangerie qu'on lui serve le pain déjà tranché ?
<!-- excerpt -->

{% tldr %}
- Une famille découpant 12 tranches de pain à croute dure par jour consommerait {{ 0.952 | divided_by: 4 | times: 12 | Wh€PerYear }} par an avec un tel couteau électrique.
- Découper une tranche de pain consomme entre {{ 0.065 | Wh }} et {{ 0.952 | divided_by: 4 | Wh }}. C'est très peu — il faudrait découper {{ 0.952 | divided_by: 4 | countPer€: 0.01 }} à {{ 0.0652 | countPer€: 0.01 }} tranches de pain pour dépenser un centime en électricité.
- Trancher un pain à la croute dure peut consommer plus de 3 fois plus d'électricité que trancher un pain mou.
- La puissance consommée peut dépasser de {{ 92.9 | percentMore: 60 }} la puissance indiquée sous l'appareil lors de la découpe d'un aliment dur.
{% endtldr %}

## Le matériel
{% intro "couteau-electrique.jpg" "Un couteau électrique" %}

Le [couteau électrique](https://fr.wikipedia.org/wiki/Couteau_%C3%A9lectrique "Couteau électrique sur Wikipedia") [Moulinex](https://fr.wikipedia.org/wiki/Moulinex "Moulinex sur Wikipedia"), typique des années 70, était un incontournable de la cuisine de nos grand-parents. Le modèle testé aujourd'hui provient du marché aux puces ; un vendeur — amusé à l'idée que je puisse m'y intéresser uniquement dans le but d'en mesurer la consommation électrique pour ce site internet — me l'a généreusement prêté pour une semaine.

Le couteau m'ayant été prêté avec son carton et son mode d'emploi, j'ai pu également les photographier :  
{% image "./images/couteau-electrique-couverture-notice.jpg" "Photo de la couverture de la notice d'utilisation du couteau électrique, intitulée « au fil de la lame » et dont le sous-titre est « ou comment bien se servir du couteau électrique Moulinex »" "200w" 200 %}

{% endintro %}

La première page de la notice nous indique :  
« *La cuisine bourgeoise […] réservait la découpe des viandes cuites au maître de maison. Avec le temps la coutume s'estompa. […]
Ainsi la vie moderne donna-t-elle naissance au couteau électrique qui se révèle un précieux auxiliaire de cuisine lorsqu'il s'agit de couper en tranches plus ou moins fines et régulières des rôtis de tous calibres, de tailler avec aisance les aiguillettes d'un canard, de suivre le fil d'un gigot ou d'un jambon, de venir à bout, sans effort, d'une majestueuse volaille. A l'usage d'ailleurs, le couteau électrique fait découvrir 1.000 emplois et il devient vite aussi familier — et tout aussi irremplaçable — que l'{% test ouvre-boites-electrique ouvre-boîtes %}... ou le tire-bouchons.* »

### Méthode de mesure

Le couteau électrique est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

## Consommation

Sous l'appareil, des inscriptions gravées nous indiquent que le moteur du couteau a une puissance de {{ 60 | W }} :  
{% image "./images/couteau-electrique-etiquette.jpg" "Inscriptions sous le couteau électrique, indiquant : TYPE 246.2.00 60W 220V" "500w" 500 %}

Notre test vérifiera si cette puissance est une indication précise.

### Pain de mie

Pour notre premier test du couteau électrique, un pain de mie, offrant peu de résistance à la coupe, sera tranché :  
{% image "./images/couteau-electrique-pain-de-mie.jpg" "Le couteau électrique placé sur une planche à découper en bois, à côté d'un pain de mie pas encore découpé" "500w" 500 %}

Voici l'enregistrement de consommation électrique pour la découpe d'une première tranche :
{% profile "couteau-electrique.json.gz" '{"name":"Découpe d\'une tranche de pain de mie","range":"216863m7205"}' %}

Après un démarrage qui dure environ 2 secondes, la puissance consommée se stabilise entre 59 et {{ 56 | W }} pendant 4 secondes. La puissance mesurée est proche de la puissance indiquée sous l'appareil.

{% image "./images/couteau-electrique-2-tranches-pain-de-mie.jpg" "La lame du couteau électrique qui vient de couper 2 tranches du pain de mie" "500w" 500 %}

La consommation d'énergie pour la découpe d'une tranche — {{ 0.0652 | Wh }} — est très faible. Pour dépenser un centime d'électricité, il faudrait découper {{ 0.0652 | countPer€: 0.01 }} tranches !

Mesurons maintenant la consommation lorsque plusieurs tranches sont coupées à la suite :

{% profile "couteau-electrique.json.gz" '{"name":"Découpe de 6 tranches de pain de mie","range":"346890m32222"}' %}

On devine facilement sur la forme de l'enregistrement que 6 tranches ont été découpées. Entre chaque tranche, on arrête d'appuyer sur le bouton du couteau électrique pour prendre le temps d'attraper la tranche qui vient d'être coupée et repositionner la lame au dessus du pain restant à couper. La découpe de chaque tranche a duré 4 à 5 secondes.

La puissance maximale est ici un peu plus haute que sur l'enregistrement précédent ({{ 67.9 | W }}), la puissance médiane est très similaire, à {{ 56.6 | W }}. L'arrêt du moteur entre chaque tranche n'est pas d'une durée suffisante pour que la puissance mesurée soit à 0 pendant une seconde complète. La consommation par tranche — {{ 0.409 | divided_by: 6 | Wh }} ({{ 0.409 | Wh }} divisé par 6) — est très similaire à celle mesurée précédemment.

{% image "./images/couteau-electrique-pain-de-mie-tranche.jpg" "Pain de mie entièrement tranché (11 tranches visibles) sur la planche à découper en bois" "500w" 500 %}

Notre pain de mie étant maintenant entièrement tranché, continuons notre test avec un autre type de pain, nettement plus dur.

### Pain au maïs

Un morceau de pain au maïs sera maintenant découpé. Ce pain (très bon !) possède une croute nettement plus dure, qui demandera un peu plus d'effort au couteau électrique. Mesurons l'impact de cet effort supplémentaire sur la consommation mesurée.

{% image "./images/couteau-electrique-pain-mais.jpg" "Un demi pain au maïs, la croute est bien cuite" "500w" 500 %}

Il est à nouveau possible de compter le nombre de tranches découpées en observant la forme de l'enregistrement :
{% profile "couteau-electrique.json.gz" '{"name":"Découpe pain au maïs","range":"569873m65336"}' %}

Il y en a bien 4 !  
{% image "./images/couteau-electrique-pain-mais-4-tranches.jpg" "4 tranches de pain au maïs à côté du reste du pain au maïs non tranché, sur la planche à découper en bois" "500w" 500 %}

La forme de l'enregistrement est un peu différente : on voit qu'il y a des petits pics dans la puissance mesurée pour la découpe de chaque tranche. On peut supposer que chacun d'eux correspond à un moment où le moteur a forcé un peu pour découper un morceau de croute un peu plus dur.

Les puissances maximale ({{ 76.6 | W }}) et médiane {{ 66.7 | W }} mesurées dépassent toutes les deux la [puissance nominale](https://fr.wikipedia.org/wiki/Puissance_nominale "Puissance nominale sur Wikipedia") de {{ 60 | W }}. L'énergie consommée pour 4 tranches ({{ 0.952 | Wh }}) correspond à {{ 0.952 | divided_by: 4 | Wh }} par tranche. C'est environ {{ 0.952 | divided_by: 4 | divided_by: 0.0682 | round: 1 }} fois plus que pour découper une tranche de pain de mie ! Il ne faudrait couper "que" {{ 0.952 | divided_by: 4 | countPer€: 0.01 }} tranches de ce pain au maïs pour dépenser un centime.

La découpe de chaque tranche a duré 12 à 17 secondes, et cette augmentation de durée de coupe (+{{ 17 | percentMore: 5 }}) contribue beaucoup plus à l'augmentation de la consommation d'énergie que l'augmentation de la puissance mesurée (+{{ 66.7 | percentMore: 55.6 }}).

#### Consommation sur un an

En supposant qu'une famille mange de ce pain tous les jours et s'en coupe une douzaine de tranches quotidiennement, la consommation mensuelle serait de {{ 0.952 | divided_by: 4 | times: 12 | Wh€PerMonth }} par mois, ou {{ 0.952 | divided_by: 4 | times: 12 | Wh€PerYear }} par an.

### Pain rassis

Réalisons maintenant un dernier test de découpe, poussant le moteur à ses limites : nous allons maintenant tenter de trancher un morceau de pain rassis qui avait été conservé pour le transformer un jour en pudding.

Une seule tranche a été coupée, en insistant longtemps, et avec un résultat médiocre :  
{% image "./images/couteau-electrique-pain-rassis.jpg" "Couteau électrique à côté d'un morceau de pain et d'une tranche de pain en miettes" "500w" 500 %}  
La tranche a fini en petits morceaux !

Regardons tout de même les mesures de consommation :
{% profile "couteau-electrique.json.gz" '{"name":"Tentative de découpe de pain rassis","range":"995983m56019"}' %}

L'opération a duré plus de 50 secondes, et la consommation s'envole : {{ 1.15 | Wh }}. C'est autant que pour couper {{ 1.15 | divided_by: 0.0682 | round }} tranches de pain de mie !

Les puissances maximale ({{ 92.9 | W }}) et médiane ({{ 78.9 | W }}) sont respectivement {{ 92.9 | percentMore: 60 }} et {{ 78.9 | percentMore: 60 }} supérieures à la puissance nominale.

### À vide

Pour finir, réalisons quelques mesures de consommation à vide.

#### Premier démarrage

La toute première mesure de consommation a un pic de démarrage très supérieur à toutes les autres mesures de ce test :
{% profile "couteau-electrique.json.gz" '{"name":"Premier démarrage","range":"10801m8307"}' %}

Puissance maximale mesurée à {{ 117 | W }}, c'est presque le double de la puissance nominale ! J'imagine que ce couteau n'a pas servi pendant des années voire pendant des décennies et qu'il a fallu plus d'énergie pour remettre en mouvement certains composants qui ont pu s'encrasser avec le temps.

#### 10 secondes à vide

Une fois ce premier démarrage passé, regardons la consommation lorsque le moteur tourne mais que la lame ne fend que l'air :
{% profile "couteau-electrique.json.gz" '{"name":"Fonctionnement à vide — 1","range":"67885m11767"}' %}
{% profile "couteau-electrique.json.gz" '{"name":"Fonctionnement à vide — 2","range":"293722m11437"}' %}

Deux enregistrements d'une dizaine de secondes nous donnent une puissance médiane à {{ 59.3 | W }} et {{ 55 | W }}. Ces valeurs sont très proches des valeurs mesurées lors de la découpe du pain de mie, qui n'offrait pas une grande résistance. La deuxième mesure donne une valeur plus faible que la première, probablement en raison de l'échauffement du moteur (comme déjà observé sur un moteur d'{% test aspirateur-atelier aspirateur %}).

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet couteau électrique, on pourrait :
- mesurer la consommation lors de la découpe d'autres types d'aliments (viandes, légumes, …)
- mesurer la consommation avec un enregistreur ayant un taux d'échantillonnage plus élevé pour mieux voir ce qui se passe lors de la pause entre la découpe de plusieurs tranches.
{% endplusloin %}
