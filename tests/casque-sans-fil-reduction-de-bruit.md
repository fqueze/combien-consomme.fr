---
layout: test-layout.njk
title: un casque sans fil à réduction de bruit
img: casque-sans-fil-reduction-de-bruit.jpg
date: 2025-11-16
tags: ['test']
---

Ce casque sans fil à réduction de bruit haut de gamme m'accompagne fidèlement depuis plus de 6 ans dans mes voyages et mes appels en visio. Combien d'électricité a-t-il consommé ?

<!-- excerpt -->

{% tldr %}
- Il faudrait utiliser le casque pendant {{ 4.34 | times: 52 | countPer€: 1 }} ans à raison d'une charge par semaine pour dépenser 1 € en électricité.
- Une charge complète consomme {{ 4.34 | Wh€ }}. Une recharge hebdomadaire coûte {{ 4.34 | times: 52 | Wh€ }} par an.
- La charge rapide fonctionne : 10 minutes fournissent {{ 0.836 | percent: 4.34 }} de la charge totale, soit environ 5h d'autonomie.
- Laisser le casque branché au chargeur lorsqu'il est déjà plein consomme {{ 0.00567 | W }}, soit {{ 0.00567 | W€PerYear }} par an, c'est négligeable.
{% endtldr %}

## Le matériel

{% intro "casque-sans-fil-reduction-de-bruit.jpg" "Casque sans fil à réduction de bruit Sony WH-1000XM3" %}

Le casque testé est un Sony WH-1000XM3, un modèle haut de gamme sorti en 2018. Malgré plus de 6 ans d'utilisation intensive, il fonctionne encore très bien. Je l'utilise quotidiennement pour mes appels en visioconférence et lors de mes déplacements en train ou avion où j'apprécie particulièrement la [réduction de bruit](https://fr.wikipedia.org/wiki/Contr%C3%B4le_actif_du_bruit "Page « Contrôle actif du bruit » sur Wikipédia").

### Méthode de mesure

J'ai branché le casque sur un chargeur USB-C capable de délivrer jusqu'à {{ 15 | W }} en 5V (3A).

{% image "./images/casque-sans-fil-reduction-de-bruit-chargeur-et-shelly.jpg" "Chargeur USB-C branché sur la prise Shelly Plus PlugS allumée" "250w" 250 %}
{% comment %}chargeur usb-c branché sur une prise shelly plus plug s allumée (éclairée en vert){% endcomment %}

Le chargeur est lui-même branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus Plug S %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

Le nom du modèle (WH-1000X M3) est visible sur le casque, et l'usure très marquée des coussinets révèle son utilisation intensive au cours des 6 dernières années :

{% image "./images/casque-sans-fil-reduction-de-bruit-wh-1000x-m3.jpg" "Le casque Sony WH-1000X M3 avec ses coussinets usés après 6 ans d'utilisation" "300w" 300 %}
{% comment %}photo du casque où le numéro de modèle (WH-1000X M3) est visible. L'usure très marquée des coussinets révèle l'utilisation intensive qui a été faite de ce casque au cours des 6 dernières années{% endcomment %}

L'installation de test complète comporte le casque branché via un câble USB sur le chargeur USB-C, lui-même branché sur la prise connectée Shelly :

{% image "./images/casque-sans-fil-reduction-de-bruit-installation.jpg" "Installation de test : casque branché sur chargeur USB-C connecté à la prise Shelly" "700w" 700 %}
{% comment %}installation de test complète avec le casque en charge connecté au câble usb, connecté au chargeur usb-c, branché sur une prise shelly plus plug s, branchée à une prise murale.{% endcomment %}

## Consommation

### Informations fournies par le fabricant

Les inscriptions à l'intérieur du casque indiquent « Li-ion 5V » :  
{% image "./images/casque-sans-fil-reduction-de-bruit-donnees-techniques.jpg" "Inscriptions techniques à l'intérieur du casque : Li-ion 5V" "250w" 250 %}
{% comment %}pas vraiment une étiquette, mais les inscriptions à l'intérieur du casque indiquent "Li-ion 5V"{% endcomment %}

Cela nous renseigne sur le type de batterie et sa tension de charge. En revanche, on n'a aucune indication sur la capacité de la batterie, ni sur le courant ou la puissance maximale lors de la charge.

Le fabricant annonce sur son site une autonomie de 30 heures et une charge rapide : « *obtenez 5 h de charge en seulement 10 minutes* » avec un adaptateur secteur 1,5 A ou plus.

### Charge complète

Ce matin en arrivant à mon bureau, j'entends « Batterie faible ; veuillez recharger. » Oops, le casque est resté allumé toute la nuit. C'était l'occasion de mesurer la consommation d'une charge complète de la batterie :

{% profile "casque-sans-fil-reduction-de-bruit.json.gz" '{"name": "10h d\'enregistrement", "range": "170260m35998415"}' %}
{% comment %}draft: On voit 3 phases dans l'enregistrement de 10h : d'abord la charge qui commence par un pic lors de la mise ne route, puis des variations lentes. Ensuite plusieurs heures où j'ai laissé le casque branché au chargeur alors que sa charge était terminée, on observe une très faible consommation. Et finalement quelques heures où le chargeur était encore branché à la prise connectée mais il n'y avait plus rien au bout du câble USB : aucune consommation mesurée (ce qui veut dire que la consommation réelle était inférieure au minimum que ma prise connectée peut mesurer){% endcomment %}

L'enregistrement complet permet de voir trois phases distinctes :

- **La charge complète** : un pic au démarrage suivi de variations lentes à mesure que la batterie se remplit.
- **Casque chargé resté branché** : une très faible consommation oscillant entre 0 et {{ 0.1 | W }}, probablement pour maintenir la charge.
- **Chargeur seul** (sans casque branché) : aucune consommation mesurée, ce qui signifie que la consommation du chargeur à vide est inférieure au minimum détectable par la prise connectée.

L'énergie totale consommée est de {{ 4.36 | Wh€ }}.

#### Charge complète d'une batterie vide

La charge complète dure {{ 9370138 | divided_by: 1000 | s }} et consomme {{ 4.34 | Wh€ }} :

{% profile "casque-sans-fil-reduction-de-bruit.json.gz" '{"name": "Charge complète", "range": "170260m9370138"}' %}
{% comment %}draft: décrire la forme de la courbe de charge{% endcomment %}

La courbe de charge est caractéristique d'une batterie lithium-ion. On observe un pic initial à {{ 9.50 | W }} au moment du branchement, puis la puissance se stabilise autour de {{ 5 | W }} pendant la première phase de charge. Ensuite, la puissance décroît progressivement à mesure que la batterie se remplit. En fin de charge, la puissance descend à moins de {{ 1 | W }} puis s'approche de zéro quand la batterie est complète.

La puissance moyenne sur toute la charge est de {{ 1.67 | W }}, avec une médiane à {{ 0.800 | W }}, ce qui montre bien que la majeure partie du temps de charge se fait à faible puissance.

#### Charge rapide : les 10 premières minutes

Le fabricant annonce « 5 h de charge en seulement 10 minutes ». La mesure des 10 premières minutes de charge permet de vérifier cette affirmation :

{% profile "casque-sans-fil-reduction-de-bruit.json.gz" '{"name": "10 premières minutes de charge", "range": "171547m599995"}' %}
{% comment %}draft: Comparer à l'affirmation "5 h de charge en seulement 10 minutes" du fabriquant. Quel pourcentage de l'énergie de la charge totale a-t-on au bout de 10 minutes ?{% endcomment %}

Pendant les 10 premières minutes, le casque consomme {{ 0.836 | Wh }}, soit {{ 0.836 | percent: 4.34 }} de l'énergie totale d'une charge complète. La puissance est très stable autour de {{ 5 | W }}, avec un peu plus au début.

Si le fabricant annonce 30 heures d'autonomie pour une charge complète, alors ces 10 minutes de charge rapide fournissent environ {{ 30 | times: 0.836 | divided_by: 4.34 | times: 3600 | s }} d'autonomie. C'est légèrement plus que les 5 heures annoncées. Cependant, il est possible que la capacité de la batterie ait diminué après 6 ans d'utilisation, ce qui rendrait ma charge « complète » plus petite que celle d'un casque neuf. Quoi qu'il en soit, l'affirmation du fabriquant semble vérifiée.

#### Resté branché après la charge

Une fois la charge terminée, le casque éteint est resté branché au chargeur pendant plus de 3h :

{% profile "casque-sans-fil-reduction-de-bruit.json.gz" '{"name": "Resté branché après la charge", "range": "9540397m12385581"}' %}
{% comment %}draft: consommation alors que le casque complètement chargé, resté éteint, est resté connecté au chargeur. L'alternance entre 0 et 0.1W montre que la consommation est inférieure au minimum qui peut être mesuré de façon précise à un instant donné par la prise connectée, mais la puissance moyenne reste pertinente.{% endcomment %}

La consommation alterne entre 0 et {{ 0.1 | W }}, ce qui montre que la puissance réelle est inférieure au minimum que la prise connectée peut mesurer avec précision à un instant donné. Cependant, la puissance moyenne calculée sur toute la période reste pertinente : {{ 0.00567 | W }}.

Si l'on laissait le casque branché en permanence après chaque charge, cette consommation résiduelle représenterait {{ 0.00567 | W€PerYear }} par an. C'est négligeable.

### Sur un an

Si l'on suppose que le casque est rechargé complètement une fois par semaine (ce qui correspond à environ 4 heures d'utilisation par jour avec 30 heures d'autonomie), la consommation annuelle sera de {{ 4.34 | times: 52 | Wh€ }} par an.

Pour un casque vendu environ 350 € à sa sortie en 2018, le coût total d'électricité sur 6 ans d'utilisation (environ {{ 4.34 | times: 52 | times: 6 | Wh€ }}) est complètement dérisoire.

Pour mettre cela en perspective : avec une autonomie de 30 heures par charge complète et une recharge hebdomadaire, il faudrait utiliser le casque pendant {{ 4.34 | times: 52 | countPer€: 1 }} ans pour dépenser 1 € en électricité. Autant dire que le casque aura probablement rendu l'âme bien avant !

### Conseils pour l'autoconsommation photovoltaïque

Avec une puissance de charge maximale de {{ 9.50 | W }} et une puissance moyenne de {{ 1.67 | W }}, la recharge du casque est parfaitement adaptée à l'autoconsommation photovoltaïque.

On peut brancher le casque à charger à n'importe quel moment de la journée sans se soucier de la production solaire, tant la consommation est faible. Même un système photovoltaïque de très petite taille peut couvrir largement ce besoin.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un casque sans fil à réduction de bruit, on pourrait :
- mesurer avec {% post mesurer-la-consommation-avec-un-wattmetre-usb un wattmètre USB %} pour obtenir des mesures plus précises, notamment sur les très faibles puissances en fin de charge, et pour mesurer uniquement l'énergie reçue par le casque sans inclure les pertes du chargeur ;
- mesurer la consommation lors de la recharge après 1 heure d'utilisation à différents niveaux sonores, avec ou sans réduction de bruit activée, pour comprendre l'impact de ces paramètres sur l'autonomie ;
- mesurer la décharge de la batterie lorsque le casque est éteint mais non utilisé pendant plusieurs semaines, pour quantifier l'autodécharge ;
- comparer avec d'autres modèles de casques sans fil à réduction de bruit (Sony, Bose, Sennheiser, etc.) pour évaluer les différences d'efficacité énergétique et de capacité de batterie.
{% endplusloin %}
