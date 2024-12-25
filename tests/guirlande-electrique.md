---
layout: test-layout.njk 
title: une guirlande électrique
img: guirlande-electrique.jpg
date: 2024-12-25
tags: ['test']
---

C'est Noël, le sapin trône dans le salon. Il brille de mille feux. De combien ces illuminations augmentent-elles le coût des fêtes ?
<!-- excerpt -->

{% tldr %}
- allumée tous les soirs de décembre, une guirlande à incandescence consommera {{ 15.3 | times: 6 | times: 31 | Wh€ }}.
- une guirlande à LED consommera {{ 1.94 | times: 6 | times: 31 | Wh€ }}, c'est {{ 4.43 | percentLess: 31.1 }} de moins !
- le remplacement d'une guirlande à incandescence par une plus moderne à LED coûtant 10 euros sera remboursé par l'économie d'électricité en {{ 15.3 | minus: 1.94 | times: 6 | times: 31 | countPer€: 10 }} ans.
{% endtldr %}

## Le matériel
{% intro "guirlande-electrique-ancienne-et-led.jpg" "Une guirlande électrique" %}

Deux guirlandes électriques de conception très différentes cohabitent sur notre sapin. L'une d'elles a égaillé nos fêtes de Noël depuis plus de 30 ans et fonctionne toujours. L'autre est beaucoup plus récente. Comparons ces deux types de décoration.

#### Guirlande ancienne à incandescence

La guirlande la plus ancienne est composée de 35 ampoules à incandescence placées en série. Le clignotement de la guirlande est obtenu par un dispositif mécanique : une ampoule spéciale contenant un [bilame](https://fr.wikipedia.org/wiki/Bilame "« Bilame » sur Wikipédia"). Lorsque cette ampoule chauffe avec le passage du courant, une lame métallique s'écarte et coupe le courant. La guirlande s'éteint alors et l'ampoule bilame refroidit, jusqu'à ce que la lame métallique ait repris sa place initiale et refasse contact. Le cycle reprend, et la guirlande clignote.

#### Guirlande moderne à LED

Sur la guirlande moderne, les ampoules à incandescence ont été remplacées par des LED. L'ampoule à bilame a été remplacée par un dispositif électronique. Les LED étant alimentées en courant continu, un adaptateur secteur est nécessaire.

### Méthode de mesure

Les guirlandes électriques ont été successivement branchées sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer leurs consommations.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Ancienne guirlande à incandescence

Une plaque en plastique jaune est attachée au fil de l'ancienne guirlande près de la prise de courant. Des inscriptions sont (difficilement) lisibles sur chaque face de cette plaque :  
{% image "./images/guirlande-electrique-ancienne-etiquette-1.jpg" "Face de la plaque jaune indiquant « 220/240V~ NF TENSION 1 LAMPE: 7V »" "500w" 500 %}
{% image "./images/guirlande-electrique-ancienne-etiquette-2.jpg" "Face de la plaque jaune indiquant « 35x0.8W MAXI »" "500w" 500 %}

« 220/240V~ NF TENSION 1 LAMPE: 7V » au recto, « 35x0.8W MAXI » au verso.

Ceci nous indique que cette guirlande est prévue pour fonctionner en courant alternatif d'une tension de 220 à 240 Volts, qu'elle est composée de 35 lampes dont la tension unitaire est de 7 Volts et la puissance maximale {{ 0.8 | W }}, soit une puissance totale de {{ 0.8 | times: 35 | W }}.

{% image "./images/guirlande-electrique-ancienne-allumee.jpg" "Deux ampoules allumées, une rouge, une verte, couvertes de capuchons en plastique" "500w" 500 %}
{% image "./images/guirlande-electrique-ancienne-eteinte.jpg" "Les deux mêmes ampoules éteintes, couvertes de capuchons en plastique" "500w" 500 %}

Les ampoules sont câblées en série, il suffit qu'une seule ampoule soit grillée pour que plus rien ne s'allume. Comme les ampoules chauffent beaucoup, chacune est couverte d'un capuchon en plastique pour éviter un contact direct avec le sapin, très inflammable.

Mesurons maintenant la consommation en utilisation :

{% profile "guirlande-electrique-ancienne-2h.json.gz" '{"name": "Guirlande à incandescence pendant 2 heures", "range": ""}' %}

Sur une période de 2 heures d'utilisation, la guirlande à incandescence a consommé {{ 31.1 | Wh€ }}.

Les puissances maximale ({{ 26.4 | W }}), moyenne ({{ 15.3 | W }}) et médiane ({{ 11.4 | W }}) mesurées sont très éloignées. Pour comprendre ces variations, zoomons sur une période plus courte :

{% profile "guirlande-electrique-ancienne-2h.json.gz" '{"name":"Guirlande à incandescence — zoom sur 1min30","range":"4870713m90167"}' %}

Sur cet échantillon d'une minute trente, nous pouvons observer :
- la puissance alterne entre une puissance élevée d'environ {{ 25 | W }}, et une puissance faible proche de {{ 0 | W }}.
- les alternances sont assez irrégulières, avec parfois des puissances intermédiaires mesurées pendant plusieurs secondes.

Les alternances sont attendues, elles correspondent au clignotement de la guirlande. Les irrégularités peuvent probablement s'expliquer par le principe utilisé pour faire clignoter la guirlande : le bilame ne se refroidit peut-être pas toujours à la même vitesse, laissant parfois les ampoules éteintes un peu plus longtemps avant de les rallumer.

Regardons maintenant le cas particulier du démarrage initial de la guirlande :

{% profile "guirlande-electrique-ancienne-demarrage-15min.json.gz" '{"name": "Guirlande à incandescence — 15 minutes incluant le démarrage", "range": ""}' %}

Cet enregistrement est très similaire au précédent, sauf lors des premières secondes pendant lesquelles la puissance mesurée est continuellement élevée.

{% profile "guirlande-electrique-ancienne-demarrage-15min.json.gz" '{"name":"Guirlande à incandescence — zoom sur le démarrage","range":"m32534"}' %}

Sur ce zoom sur la partie initiale de l'enregistrement, nous observons que pendant les 30 premières secondes après l'allumage initial de la guirlande, il n'y a aucun clignotement pendant que le bilame chauffe jusqu'à atteindre sa température normale de fonctionnement. Un pic de puissance mesuré lors de la première seconde à {{ 27.7 | W }} est très proche de la puissance nominale de {{ 28 | W }} qui était indiquée sur la plaque jaune.

La puissance médiane de {{ 25.2 | W }} correspond à la consommation lorsque les ampoules restent allumées en continu.

### Guirlande récente à LED

Observons maintenant la guirlande récente :  
{% image "./images/guirlande-electrique-led-allumee.jpg" "Guirlande récente à LED, une lampe rouge et une lampe verte allumées" "500w" 500 %}
{% image "./images/guirlande-electrique-led-eteinte.jpg" "Guirlande récente à LED, les mêmes lampes éteintes" "500w" 500 %}

 Les ampoules ont été remplacées par des [diode électroluminescente (LED)](https://fr.wikipedia.org/wiki/Diode_%C3%A9lectroluminescente "« Diode électroluminescente » sur Wikipédia") qui chauffent peu et ne nécessitent pas de capuchon.

Les lampes à LED étant alimentées en courant continu, un transformateur est nécessaire :  
{% image "./images/guirlande-electrique-led-etiquette.jpg" "ELECTRONIC TRANSFORMER MODEL:LR-IP-04.5001.8 PRI: 220-240V~50/60Hz SEC: 4.5Vdc 1.8VA tc=65°C IP44" "500w" 500 %}

Sur celui-ci, on peut lire « 4.5Vdc 1.8VA », ce qui indique que le courant continu sort du transformateur à une tension de 4,5 Volts, pour une puissance de {{ 1.8 | W }}.

Regardons maintenant un enregistrement de la consommation de cette guirlande moderne :
{% profile "guirlande-electrique-led-2h.json.gz" '{"name": "Guirlande à LED pendant 2 heures", "range": ""}' %}

Sur une période de 2 heures, la guirlande a consommé {{ 4.43 | Wh€ }}. C'est {{ 4.43 | percentLess: 31.1 }} de moins que la guirlande à incandescence !

Les puissances médiane, moyenne et maximum sont toutes nettement supérieures à la puissance indiquée sur le transformateur pour le courant continu ({{ 1.8 | W }}), on peut supposer que la différence correspond aux pertes du transformateur.

La puissance maximale de {{ 3.30 | W }} correspond probablement à la consommation lorsque les lampes sont allumées. Les puissances médiane ({{ 2 | W }}) et moyenne ({{ 1.94 | W }}) sont très proches, ce qui laisse supposer un fonctionnement régulier.

{% profile "guirlande-electrique-led-2h.json.gz" '{"name":"Guirlande à LED — zoom sur 1min30","range":"828220m89810"}' %}

Un zoom sur une minute trente confirme cette régularité, qui n'est pas une surprise, puisque le contrôle du clignotement se fait par de l'électronique.

### Consommation sur un an

Si l'on suppose que les illuminations de Noël sont allumées tous les soirs de décembre, de 18h à minuit, elles seront allumées pendant {{ 6 | times: 31 }} heures par an (6 heures par jour, 31 jours en décembre).

Si l'on extrapole les consommation moyennes mesurées sur nos enregistrement de 2 heures, la guirlande à incandescence consommera {{ 15.3 | times: 6 | times: 31 | Wh€ }}, et la guirlande à LED {{ 1.94 | times: 6 | times: 31 | Wh€ }}.

Remplacer une guirlande ancienne par une guirlande moderne économisera donc {{ 15.3 | minus: 1.94 | times: 6 | times: 31 | Wh€ }} par an. Si l'on suppose qu'une guirlande neuve coûte environ 10 euros, il faudra environ {{ 15.3 | minus: 1.94 | times: 6 | times: 31 | countPer€: 10 }} ans pour que l'électricité économisée rembourse le remplacement de la guirlande ancienne par une plus économe en énergie.

Si l'on prend en compte l'[énergie consommée pour la fabrication](https://fr.wikipedia.org/wiki/%C3%89nergie_grise "« Énergie grise » sur Wikipédia") de la nouvelle guirlande, l'économie d'énergie est plus que douteuse. Si par contre vous trouvez une guirlande à LED d'occasion pour presque rien dans un vide grenier, ou pour vraiment rien lorsque beaucoup de citadins habitant des logements exigus se débarrassent dans les poubelles et sur les trottoirs de leurs décoration de Noël début janvier, remplacer une ancienne guirlande pourra être intéressant.

Dans tous les cas, le coût de l'électricité pour les illuminations du sapin sera négligeable comparé au coût du repas qui sera partagé lors des fêtes.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ces guirlandes électriques, on pourrait :
- utiliser un appareil de mesure ayant un taux d'échantillonnage plus élevé pour voir plus clairement les irrégularités du clignotement de la guirlande ancienne.
- comparer différents programmes de clignotement de la guirlande moderne.
- comparer les consommations de différentes guirlandes modernes ayant plus ou moins de lampes pour vérifier s'il y a une relation linéaire entre le nombre de lampes et la consommation.
- mesurer la puissance à la sortie du transformateur de la guirlande moderne pour distinguer la consommation du transformateur de la consommation des lampes.
{% endplusloin %}
