---
layout: test-layout.njk
title: une centrifugeuse SEB Nectalia
img: centrifugeuse-seb-nectalia.jpg
date: 2026-09-27
tags: ['test']
---

Une centrifugeuse est un bon moyen d'éviter de jeter des fruits abîmés, qui ne donnent plus envie d'être mangés mais sont encore bons au goût. Combien coûte en électricité un verre de jus préparé avec une petite centrifugeuse des années 90 ?

<!-- excerpt -->

{% tldr %}
- À raison d'un verre de jus par semaine, la consommation annuelle est de {{ 2.53 | plus: 1.49 | times: 52 | Wh€ }}, et de {{ 2.53 | plus: 1.49 | Wh€PerYear }} pour un verre par jour.
- Un verre complet, trois pommes et une pêche, revient à {{ 2.53 | plus: 1.49 | Wh€ }}.
- Par pomme, cette petite centrifugeuse consomme {{ 2.53 | divided_by: 3 | Wh }}, soit {{ 2.53 | divided_by: 3 | countPer€: 0.01 }} pommes pour un centime d'électricité.
- Pendant l'utilisation, la puissance mesurée ({{ 250 | W }} à {{ 424 | W }}) dépasse nettement la puissance de {{ 200 | W }} de l'étiquette.
{% endtldr %}

## Le matériel

{% intro "centrifugeuse-seb-nectalia.jpg" "Centrifugeuse SEB Nectalia" %}

La SEB Nectalia est une petite centrifugeuse domestique en plastique, fabriquée en France. Le bloc moteur, le réceptacle à pulpe, le panier râpe filtre en métal et le couvercle transparent s'empilent les uns sur les autres, pour un encombrement comparable à celui d'une petite machine à café.

Le principe est celui de toutes les centrifugeuses : une râpe tournant à grande vitesse réduit les fruits en pulpe, et la force centrifuge projette le jus vers le bec verseur pendant que les fibres s'accumulent dans le réceptacle. La particularité de ce modèle est sa taille : la cheminée est étroite, le réceptacle à pulpe minuscule, et il faut donc recharger souvent.

C'est justement ce qui la rend intéressante à comparer à {% test centrifugeuse-philips une centrifugeuse Philips HR1858 %}, un modèle nettement plus gros et plus puissant déjà testé ici. Les deux appareils ne visent pas le même usage : la Nectalia sert à faire un verre ou deux quand on a envie de les boire tout de suite, là où la Philips permet de préparer du jus pour toute la famille, ou de transformer une caisse entière de fruits pour en remplir quelques bouteilles à mettre au frigo. La petite se range aussi beaucoup plus facilement dans un placard, mais est-ce que cette compacité se paye en consommation ?

Je l'ai probablement achetée pour 5 euros dans un vide-grenier, il y a déjà bien longtemps.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

L'étiquette collée sous le bloc moteur indique une puissance nominale de {{ 200 | W }} :

{% image "./images/centrifugeuse-seb-nectalia-etiquette.jpg" "Étiquette signalétique : SEB, Type 8312-04, 230V ~ 50/60Hz, 200W, MADE IN FRANCE" "300w" 300 %}
{% comment %}SEB
Type 8312-04
230V ~ 50/60Hz
200w
MADE IN FRANCE{% endcomment %}

C'est trois fois moins que les {{ 650 | W }} de {% test centrifugeuse-philips la Philips %}, et exactement la même puissance nominale que {% test moulinex-fresh-express le découpe-légumes Moulinex Fresh Express %}.

#### Notice

La notice précise les quantités à ne pas dépasser :
- 0,5 kg maximum de pommes en une fois, pour environ 40 cl de jus ;
- pas plus de deux fois 0,5 kg en continu, pour ne pas faire chauffer le moteur ;
- les fruits doivent être introduits moteur déjà en marche, et poussés doucement avec le poussoir.

Reste à vérifier à la mesure si ces {{ 200 | W }} correspondent à ce que consomme réellement l'appareil.

### Méthode de mesure

La centrifugeuse est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### À vide

Première mesure, moteur en marche sans rien dans la cheminée :

{% profile "centrifugeuse-seb-nectalia.json.gz" '{"name": "À vide", "range": "214473m15193"}' %}
{% comment %}draft: pic de démarrage, puis conso moyenne/médiane un peu inférieure aux 200W de l'étiquette{% endcomment %}

Le démarrage atteint {{ 400 | W }}, soit le double de la puissance nominale de l'étiquette. Avec un seul échantillon par seconde, on ne peut pas dire grand-chose de la durée exacte de ce pic, mais le dépassement, lui, est net. La puissance redescend ensuite vers la médiane de {{ 182 | W }}, juste en dessous des {{ 200 | W }} annoncés.

C'est surtout ce dépassement au démarrage qui mérite d'être souligné : à vide, une fois lancé, le moteur se tient bien dans les clous de son étiquette.

### Trois pommes, en six remplissages

Les pommes utilisées ici ont été récupérées dans les poubelles à la fin du marché : trop abîmées pour être vendues, mais encore très bonnes au goût. Elles sont coupées en quartiers avant de passer à la centrifugeuse :

{% image "./images/centrifugeuse-seb-nectalia-pret.jpg" "Trois pommes coupées en quartiers dans une casserole, à côté de la centrifugeuse et d'un verre vide" "500w" 500 %}
{% comment %}pommes dans la casserole. Elles sont seulement coupées en 4, mais on verra que ça ne suffit pas et que j'ai ensuite dû les recouper.{% endcomment %}

Dès le premier remplissage, le jus se met à couler dans le verre :

{% image "./images/centrifugeuse-seb-nectalia-premier-remplissage.jpg" "Un fond de jus trouble dans le verre, sous le bec verseur de la centrifugeuse" "500w" 500 %}
{% comment %}ça coule dans le verre{% endcomment %}

Deux centimètres de jus pour une première fournée : le verre est encore loin d'être plein. L'enregistrement complet des trois pommes dure 2min35s et consomme {{ 2.53 | Wh€ }} :

{% profile "centrifugeuse-seb-nectalia.json.gz" '{"name": "3 pommes", "range": "480545m154970"}' %}
{% comment %}draft: pour une pomme qui est un fruit un peu dur, on dépasse vraiment beaucoup les 200W indiqués sur l'étiquette, et pas que pour des pics de démarrage du moteur. Il y a une grande pause entre le premier usage et les suivants, car... j'ai fait des photos !{% endcomment %}

On distingue six périodes de fonctionnement de 5 à 6 secondes chacune, séparées par des passages à 0 W pendant lesquels j'éteignais le moteur pour recouper les pommes et recharger la cheminée. Je n'ai donc pas respecté la consigne de la notice, qui demande d'introduire les fruits moteur déjà en marche : arrêter le moteur à chaque rechargement est plus confortable, et permet de prendre son temps.

La longue pause d'un peu plus d'une minute après le premier remplissage n'a rien à voir avec la centrifugeuse : c'est le temps que j'ai passé à prendre des photos, et à recouper les quartiers en morceaux plus petits.

{% image "./images/centrifugeuse-seb-nectalia-2e-remplissage.jpg" "Vue de dessus : un morceau de pomme dans la cheminée, du jus dans le verre, et le reste des pommes dans la casserole" "500w" 500 %}
{% comment %}après avoir utilisé une première fois puis re-rempli. On voit qu'il y a quelques cm de jus au fond du verre, et qu'il reste des pommes prêtes à transformer en jus dans la casserole. On voit aussi qu'on a dû les découper en petits morceaux pour qu'ils puissent entrer.{% endcomment %}

Le deuxième remplissage est en place, et il reste encore de quoi faire dans la casserole.

C'est cette pause qui explique la médiane nulle : sur l'ensemble de l'enregistrement, l'appareil est à l'arrêt plus de la moitié du temps, et la médiane tombe donc sur une valeur nulle qui ne dit rien de son fonctionnement. La moyenne de {{ 58.7 | W }} n'est guère plus parlante, puisqu'elle mélange elle aussi marche et arrêt.

Ce qu'il faut regarder ici, c'est le niveau des plateaux : pendant chaque remplissage, la puissance se tient entre {{ 250 | W }} et {{ 310 | W }}, avec une pointe à {{ 358 | W }}. On dépasse donc largement et durablement les {{ 200 | W }} de l'étiquette, et pas seulement au démarrage du moteur. Les pics correspondent aux moments où j'appuyais plus fort sur le poussoir pour pousser les pommes vers la râpe.

Chaque remplissage se termine par une marche descendante, une ou deux secondes à puissance plus faible : il n'y a alors plus de pomme au contact de la râpe, et le moteur ne tourne plus que pour la force centrifuge qui évacue le jus de la pulpe déjà râpée.

Trois pommes pour {{ 2.53 | Wh€ }}, cela revient à {{ 2.53 | divided_by: 3 | Wh€ }} par pomme, soit {{ 2.53 | divided_by: 3 | countPer€: 0.01 }} pommes transformées en jus pour un centime d'électricité.

### Une pêche, un fruit beaucoup plus mou

J'ai ensuite ajouté une pêche, nettement plus tendre que les pommes. L'opération se fait en deux remplissages et consomme {{ 1.49 | Wh€ }} sur environ 30 secondes :

{% profile "centrifugeuse-seb-nectalia.json.gz" '{"name": "une pêche", "range": "691365m36068"}' %}
{% comment %}draft: la pêche est un fruit mou, ça n'empêche pas la puissance d'être nettement supérieure à 200W. Et pour chaque remplissage il faut laisser tourner nettement plus longtemps avant que le jus n'arrête de couler. 10-12s, contre 5-6 pour les remplissages de pomme.{% endcomment %}

La mollesse du fruit ne fait pas baisser la puissance : le premier remplissage atteint {{ 424 | W }}, la valeur la plus élevée des trois profils. Le deuxième culmine un peu plus bas, puis décroît lentement pendant toute la fin du passage, en suivant le jus qui met du temps à cesser de couler.

La vraie différence est ailleurs : la durée. Chaque passage de pêche demande une dizaine de secondes avant que le jus cesse de couler, contre cinq à six secondes pour les remplissages de pomme. La chair molle se laisse écraser mais libère son jus lentement, et il faut laisser tourner. Résultat : une seule pêche coûte {{ 1.49 | Wh€ }}, soit {{ 1.49 | percentMore: 0.843 }} de plus qu'une pomme entière.

Le verre final rassemble les trois pommes et la pêche, dont la couleur plus opaque se distingue en haut, sous la mousse :

{% image "./images/centrifugeuse-seb-nectalia-verre-plein.jpg" "Le verre rempli de jus doré surmonté de mousse, devant la centrifugeuse dont le couvercle est plein de pulpe" "500w" 500 %}
{% comment %}c'est fini, le verre est plein, le jus prêt à être dégusté. On a mis 3 pommes et 1 pêche, dont la couleur un peu moins translucide se distingue en haut (sous la mousse qui vient des pommes){% endcomment %}

Un verre complet de jus frais, trois pommes et une pêche, pour {{ 2.53 | plus: 1.49 | Wh€ }} au total.

### Petite centrifugeuse, grosse centrifugeuse

L'étiquette de la Nectalia annonce {{ 200 | W }} contre {{ 650 | W }} pour {% test centrifugeuse-philips la Philips HR1858 %}, soit trois fois moins. On pourrait en conclure qu'elle consomme trois fois moins pour faire le même travail.

Il n'en est rien : par pomme, la Nectalia consomme {{ 2.53 | divided_by: 3 | Wh }}, contre {{ 3.33 | plus: 5.85 | divided_by: 11 | Wh }} pour la Philips. Aux incertitudes expérimentales près, les deux appareils arrivent au même résultat pour la même énergie, alors que l'un est trois fois plus puissant que l'autre sur le papier.

Ce qui se compense, c'est la puissance et le temps. La grosse centrifugeuse tire beaucoup plus de watts, mais elle avale les quartiers de pomme d'un seul coup et a fini en quelques secondes. La petite travaille à puissance plus modeste, mais sa cheminée étroite oblige à recouper les morceaux et à multiplier les remplissages, avec à chaque fois un démarrage du moteur et quelques secondes de rotation à vide avant et après le contact avec le fruit. Au final, l'énergie dépensée pour un verre de jus est la même.

La puissance nominale inscrite sur l'étiquette ne dit donc pas grand-chose de ce que coûte réellement une utilisation : ce qui compte, c'est l'énergie dépensée pour arriver au même verre de jus. Et sur ce critère, ce qu'on gagne avec la Nectalia, c'est un peu de place dans le placard, là où la Philips fait gagner un peu de temps.

### Branchée mais éteinte

Le moteur est commandé par un contacteur mécanique actionné en tournant le couvercle : sans électronique ni voyant, il n'y a aucune consommation de veille.

### Coût d'usage

Le verre complet, trois pommes et une pêche, revient à {{ 2.53 | plus: 1.49 | Wh€ }} : il faut en préparer {{ 2.53 | plus: 1.49 | countPer€: 0.01 }} pour dépenser un centime d'électricité.

À raison d'un verre par semaine, la consommation annuelle serait de {{ 2.53 | plus: 1.49 | times: 52 | Wh€ }}. Même en passant au jus frais tous les matins, on arriverait à {{ 2.53 | plus: 1.49 | Wh€PerYear }} sur l'année, et il faudrait {{ 2.53 | plus: 1.49 | PerYear | countPer€: 5 }} ans de jus quotidien pour dépenser en électricité l'équivalent des 5 euros qu'elle m'a probablement coûté au vide-grenier.

Autrement dit, tout le reste pèse plus lourd que l'électricité : les fruits, le temps passé à les préparer, et le nettoyage de la râpe. Avec des fruits récupérés en fin de marché, un verre de jus ne coûte pratiquement rien.

### Faut-il la remplacer par un modèle plus récent ?

Comme on l'a vu plus haut, la {% test centrifugeuse-philips Philips HR1858 %}, plus récente et plus grosse, consomme la même énergie par pomme. Il n'y a donc strictement rien à économiser en changeant d'appareil, et aucun achat, même d'occasion à 5 euros, ne se rembourserait jamais.

Une centrifugeuse des années 90 encore en état de marche n'a donc aucune raison énergétique d'être remplacée. Les seuls arguments valables sont pratiques : la cheminée étroite qui oblige à recouper les fruits, et le réceptacle à pulpe minuscule qu'il faut vider souvent.

### Conseils pour l'autoconsommation photovoltaïque

La centrifugeuse tourne entre {{ 250 | W }} et {{ 310 | W }} pendant les remplissages, jusqu'à {{ 424 | W }} sur le fruit le plus exigeant, et elle ne consomme plus rien entre deux fournées. Une installation en toiture standard de 3 kWc couvre sans difficulté ce niveau de puissance, et l'opération ne dure que quelques minutes : il n'y a donc aucune précaution particulière à prendre, sinon préparer son jus de jour plutôt que le soir.

Avec un coût électrique de {{ 2.53 | plus: 1.49 | Wh€ }} pour un verre complet, l'enjeu économique est de toute façon inexistant. Le seul véritable intérêt est le plaisir de savoir que l'énergie vient du soleil : à cette échelle, cela ne change rien de significatif pour l'environnement.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette centrifugeuse, on pourrait :
- refaire le test en respectant cette fois la consigne de la notice, morceaux préparés à l'avance et moteur laissé tournant pendant les rechargements, pour comparer ce que coûtent les six démarrages du moteur à ce que coûte le moteur tournant à vide pendant les rechargements ;
- mesurer ce que consomme le moteur quand la râpe travaille un fruit très dur (carotte, betterave) sur cette cheminée étroite, et vérifier si la notice a raison de limiter à deux fois 0,5 kg en continu en suivant la puissance sur un usage prolongé ;
- mesurer l'énergie dépensée par litre de jus obtenu plutôt que par fruit, en pesant le jus et la pulpe, pour savoir si cette petite centrifugeuse extrait moins bien que {% test centrifugeuse-philips la grosse %} et laisse plus de jus dans les fibres ;
- comparer avec une centrifugeuse beaucoup plus ancienne, des années 50 ou 60, où le gain d'efficacité des moteurs plus récents serait peut-être enfin observable ;
- comparer avec un {% test moulinex-fresh-express découpe-légumes Moulinex Fresh Express %} de même puissance nominale, qui râpe sans essorer, pour voir ce que coûte la centrifugation elle-même.
{% endplusloin %}
