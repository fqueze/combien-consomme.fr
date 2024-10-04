---
layout: test-layout.njk 
title: une machine à pain
img: machine-a-pain.jpg
date: 2024-09-01
tags: ['test']
---

Une machine à pain permet de créer des pains délicieux et variés, avec une texture et un goût qui feront la joie de vos sens. Mais combien consomme ce petit plaisir offert à votre famille ou vos invités ?
<!-- excerpt -->

{% tldr %}
- Utilisée quotidiennement, la machine à pain consomme entre {{ 265 | Wh€PerYear }} et {{ 329 | Wh€PerYear }} par an.
- Réaliser un pain consomme entre {{ 265 | Wh€ }} et {{ 329 | Wh€ }} ; c'est peu comparé au prix des ingrédients.
- La cuisson représente la majorité de la consommation d'énergie ({{ 216 | percent: 265 }}), suivie par le pétrissage ({{ 31.2 | percent: 265 }}).
- Un pain à la farine de blé complète consomme {{ 292 | percentMore: 265 }} de plus qu'un pain à la farine blanche.
- La fonction de maintien au chaud à la fin du programme augmente également la consommation de {{ 329 | percentMore: 292 }}.
{% endtldr %}

## Le matériel
{% intro "machine-a-pain.jpg" "Une machine à pain" %}

La [machine à pain](https://fr.wikipedia.org/wiki/Machine_%C3%A0_pain) était un objet [très à la mode dans les années 2000](https://www.750g.com/15-ans-apres-qu-est-devenue-la-machine-a-pain-a29194.htm) et encore un peu dans les années 2010.
Maintenant, beaucoup ont fini dans un placard ou un grenier.

Le modèle présenté ici, BM250 de la marque Kenwood, est un modèle du début des années 2010 qui était vendu aux environ 90 euros ; ce n'était donc ni le haut de gamme ni le tout premier prix. Elle a été récupérée à Emmaüs pour environ un sixième du prix du neuf et fonctionne encore très bien.
Nous avons donc pu tester sa consommation.

### Méthode de mesure

La machine à pain est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Les inscriptions sous la machine à pain testée nous indiquent une puissance de {{ 480 | W }}, sans plus de détails : 
{% image "./images/machine-a-pain-etiquette.jpg" "Inscriptions sous la machine à pain Kenwood BM250, indiquant 480W" "500w" 500 %}

Mais si on regarde l'étiquette d'une autre machine similaire, on constate que la puissance sur celle-ci ({{ 450 | W }}) est divisée en deux composants principaux : 
{% image "./images/machine-a-pain-etiquette2.jpg" "Étiquette sous une machine à pain De'Longhi BDM755.S indiquant une puissance totale de 450W dont une résistance de 400W et un moteur de 50W" "500w" 500 %}  
Une résistance de {{ 400 | W }} et un moteur d'environ {{ 50 | W }}.

La résistance est le composant qui chauffe, et va servir à cuire le pain :  
{% image "./images/machine-a-pain-resistance.jpg" "Photo de la machine à pain ouverte avec la cuve retirée, laissant apparaître la résistance" "500w" 500 %}  
Sur cette photo de l'intérieur de la machine où la cuve à été retirée, on voit que la résistance est au fond de la machine, et entoure la base de la cuve.
Au centre de la photo, nous pouvons également voir l'axe du moteur, qui va être employé pour pétrir la pâte à pain.

{% image "./images/machine-a-pain-petrin.jpg" "Photo de la machine à pain ouverte, prête à être utilisée" "500w" 500 %}  
Cette dernière photo nous montre la machine prête à être utilisée. Au fond de la cuve une pâle est fixée sur l'axe du moteur.

La machine contient également un peu d'électronique  pour gérer les programmes. Une description un peu plus détaillée du fonctionnement est présente sur [la page Wikipedia](https://fr.wikipedia.org/wiki/Machine_%C3%A0_pain).

Regardons maintenant la consommation de cette machine à pain pour faire un pain.

### Pain normal

Nous avons ici testé le programme le plus simple, le numéro 1, permettant de faire un pain normal.

{% profile "machine-a-pain-normal.json.gz" '{"name": "Pain normal", "range": ""}' %}

Nous observons que la forme du profil est très variable, 
avec au début une consommation moyenne pendant une certaine période,
suivie une phase d'attente, puis quelques pics de consommation,
puis une consommation soutenue pendant assez longtemps.
Cela correspond à trois phases du processus de fabrication du pain :
- le pétrissage, qui nécessite une action mécanique sur les ingrédients pour faire la pâte à pain ;
- la levée, qui contient beaucoup de temps d'attente, mais aussi parfois un petit peu de chauffage pour maintenir la pâte à la température optimale pour garantir la meilleure levée possible ;
- la cuisson qui nécessite beaucoup de chaleur et donc une consommation électrique bien plus élevée.

Sur l'enregistrement, nous voyons que la durée pour réaliser le pain
était d'un peu plus de 3 heures, pour une consommation totale de {{ 265 | Wh€ }}.

La puissance médiane très faible d'{{ 1 | W }} correspond aux périodes
d'attente. Cela nous indique que lors de ces 3 heures, plus de la
moitié du temps a été passée à attendre. On peut donc deviner que la
puissance d'{{ 1 | W }} correspond à la consommation lorsque
uniquement la partie électronique est en fonctionnement.

La puissance maximale, elle correspond à un instant où la résistance
de chauffage et le moteur pour le pétrin étaient utilisés
simultanément.

Regardons maintenant étape par étape.

#### Pétrissage

Zoomons d'abord sur la phase du pétrissage :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Pétrissage","range":"272530m1799869"}' %}

Cette phase dure environ 30 minutes, et a consommé {{ 31.2 | Wh }}. C'est {{ 31.2 | percent: 265 }} de l'énergie utilisée pour réaliser ce pain.

Là encore, on peut décomposer. Zoomons plus sur les 5 premières minutes :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Pétrissage — zoom sur le début","range":"272530m312872"}' %}

On voit d'abord une activité intermittente avec de nombreux tous petits pics : le programme commence par faire tourner le moteur un bref instant de nombreuses fois, pour débuter le mélange des ingrédients.

On observe ensuite une utilisation plus régulière d'électricité correspondant au moteur qui fonctionne en continu pendant 3 minutes. Pendant cette période, la consommation du moteur tend à augmenter. On peut supposer qu'au fur et à mesure que la pâle entrainée par le moteur tourne, les ingrédients en poudre sont mélangés avec ceux déjà sous forme de pâte, et qu'on obtient une pâte plus grosse qui nécessite plus d'énergie pour continuer à la pétrir.

On a ensuite 5 minutes de pause, puis à nouveau le moteur qui fonctionne pendant environ 20 minutes en continu :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Pétrissage — zoom sur la fin","range":"876372m1196027"}' %}

La consommation maximale pendant cette période est proche de la consommation moyenne et de la consommation médiane à environ {{ 80 | W }}.
Ceci nous indique donc la puissance du moteur. Ici aussi nous voyons que la puissance consommée augmente lentement. On peut supposer que la pâte durcit petit à petit.

#### Levée

Regardons maintenant ce qui se passe pendant la partie où on attend que la pâte lève :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Levée","range":"2072399m6834600"}' %}

Il y a beaucoup de temps d'attente et il y a aussi quelques pics. Zoomons tout d'abord sur 30 minutes d'attente :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Levée — attente","range":"2461935m1800810"}' %}

Nous voyons que la consommation moyenne et maximale est d'environ {{ 1 | W }}, c'est donc la puissance consommée lorsqu'il n'y a que électronique qui est active.

Zoomons maintenant sur un moment où il y a des pics de consommation :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Levée — zoom","range":"4302927m144502"}' %}

Nous avons ici une consommation maximale de {{ 453 | W }} qui est la même que la consommation maximale du programme complet. Cette consommation maximale correspond à l'utilisation simultanée de la résistance et du moteur.
Sur le deuxième pic, on voit nettement qu'il y a d'abord le moteur qui fonctionne, puis ensuite le chauffage.
On comprend que pendant cette phase de levée, la machine à pain chauffe un peu pour maintenir une certaine température, et que la pâle fait quelques mouvements pour malaxer un peu la pâte.

Zoomons sur d'autres pics montrant mieux comment fonctionne le chauffage :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Levée — chauffage","range":"8543782m158588"}' %}

On voit ici que le chauffage se fait par une utilisation intermittente de la résistance, qui ne peut être utilisée qu'à sa puissance nominale, donc sa puissance maximale. La modulation de la puissance de chauffage est obtenue
en chauffant pendant quelques secondes toutes les 30 secondes. C'est très similaire à ce que nous avions observé lors du {% test four-a-micro-ondes test d'un four à micro-ondes %}.

Prenons un échantillon d'une minute :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Levée — 1 minute de chauffage","range":"8554940m59946"}' %}

On voit deux fois le chauffage pendant 5 secondes, pour une puissance moyenne d'environ {{ 80 | W }}.

#### Cuisson

Regardons maintenant la phase de cuisson :
{% profile "machine-a-pain-normal.json.gz" '{"name":"Cuisson","range":"8906998m2893524"}' %}

Cette cuisson dure un peu moins de 50 minutes, et a consommé {{ 216 | Wh }}. C'est {{ 216 | percent: 265 }} de l'énergie utilisée pour la totalité de la réalisation de ce pain ({{ 265 | Wh }}).

Pendant la phase de cuisson, seule la résistance est utilisée, et nous voyons à nouveau que la puissance de chauffage a été modulée en chauffant un certain nombre de secondes toutes les 30 secondes.
Ce motif se répétant toutes les 30 secondes est parfois interrompu : on peut supposer qu'un thermostat arrête le chauffage lorsque la température de cuisson désirée est atteinte et le relance lorsque la température est redescendue.

La puissance moyenne sur toute la période de cuisson est mesurée à {{ 269 | W }}, mais cette moyenne prend en compte les temps où le chauffage est arrêté. Pour mesurer la puissance du chauffage pendant la cuisson, zoomons sur 10 minutes de chauffage continu :

{% profile "machine-a-pain-normal.json.gz" '{"name":"Cuisson — zoom","range":"8906998m599695"}' %}

Le chauffage se fait à environ {{ 360 | W }} en moyenne pendant la phase de cuisson.
Et si on zoome plus encore…
{% profile "machine-a-pain-normal.json.gz" '{"name":"Cuisson — zoom 2","range":"9174675m59548"}' %}

… on voit que la résistance est alimentée pendant 25 secondes toutes les 30 secondes.

### Pain complet

Regardons maintenant l'enregistrement de la réalisation d'un pain complet :
{% profile "machine-a-pain-complet.json.gz" '{"name": "Pain à la farine de blé complète", "range": ""}' %}

La consommation totale mesurée — {{ 292 | Wh€ }}, est {{ 292 | percentMore: 265 }} plus élevée que celle mesurée pour le pain blanc.

L'enregistrement ressemble beaucoup à celui du pain normal, mais il y a une différence notable au début du cycle qui explique la consommation plus élevée : le cycle du pain complet commence par une séquence de préchauffage des ingrédients.

#### Préchauffage

Si nous zoomons sur le préchauffage, nous voyons qu'il dure environ une demi-heure :
{% profile "machine-a-pain-complet.json.gz" '{"name":"Préchauffage","range":"228593m1799384"}' %}

Là encore, le chauffage se fait en alimentant la résistance quelques
secondes toutes les 30 secondes.
Et là aussi, il doit y avoir un
thermostat puisqu'on voit que ce motif s'arrête puis reprend et
s'arrête à nouveau. C'est probablement un maintien à une température
donnée.

Si on zoome à nouveau :
{% profile "machine-a-pain-complet.json.gz" '{"name":"Préchauffage — zoom sur le début","range":"238543m329776"}' %}

on voit que la puissance moyenne de chauffe est d'environ {{ 80 | W }}, avec 5 secondes d'alimentation de la résistance toutes les 30 secondes. C'est très similaire au mode de chauffage utilisé pendant la levée.

#### Maintien au chaud

Voyons maintenant un dernier enregistrement de la réalisation d'un pain :

{% profile "machine-a-pain-complet-maintien-au-chaud.json.gz" '{"name": "Pain à la farine de blé complète — maintien au chaud en fin de cuisson", "range": ""}' %}

C'est à nouveau un pain complet, notre enregistrement est donc très similaire au précédent. La différence est que, cette fois, à la fin de la cuisson on n'a pas arrêté la machine à pain et qu'elle est donc passée dans le mode de maintien au chaud.
Le maintien au chaud est prévu pour que le pain réalisé la nuit soit chaud à l'heure du petit-déjeuner.
On voit donc l'utilisation de la résistance sur la fin de l'enregistrement.

La consommation électrique pour ce pain —{{ 329 | Wh€ }}, est {{ 329 | percentMore: 292 }} plus élevée que celle mesurée pour le pain complet sans maintien au chaud.


Si on zoome sur la fin de l'enregistrement, on voit qu'il y a d'abord un temps d'attente
puis un chauffage assez soutenu, un autre temps d'attente et enfin un chauffage plus modéré :
{% profile "machine-a-pain-complet-maintien-au-chaud.json.gz" '{"name":"Maintien au chaud","range":"14070986m1447453"}' %}


Zoomons sur ces deux temps de chauffe :
{% profile "machine-a-pain-complet-maintien-au-chaud.json.gz" '{"name":"Maintien au chaud — zoom 1","range":"14322227m269992"}' %}

{% profile "machine-a-pain-complet-maintien-au-chaud.json.gz" '{"name":"Maintien au chaud — zoom 2","range":"15277794m240332"}' %}

La première séquence de chauffage, d'une puissance moyenne d'à peu près {{ 300 | W }}, est réalisée en chauffant 20 secondes toutes les 30 secondes ; la deuxième, d'une puissance moyenne d'environ {{ 150 | W }}, en chauffant 10 secondes toutes les 30 secondes.


### Coût d'utilisation

Même si le prix d'achat des ingrédients nécessaires à la réalisation du pain sera largement supérieur au prix de l'électricité utilisée, estimons l'impact de l'utilisation de la machine à pain sur les factures d'électricité.

La consommation électrique mesurée pour produire nos pains a varié de {{ 265 | Wh€ }} à {{ 329 | Wh€ }}. En supposant un prix d'achat neuf de 90 €, cela nous donne une fourchette de {{ 329 | countPer€: 90 }} à {{ 265 | countPer€: 90 }} pains à réaliser pour que le coût de l'électricité égale celui de la machine.

Pour une maison équipée de panneaux photovoltaïques, si le pain n'est pas destiné à être consommé au petit-déjeuner, on pourra optimiser l'auto-consommation en produisant son pain en journée plutôt que la nuit. On jettera éventuellement un coup d'oeil à la météo pour s'assurer que la dernière heure du cycle (celle pendant laquelle aura lieu la cuisson) se produira à un moment où le ciel ne sera pas totalement couvert.

#### Usage quotidien

Si nous supposons que cette machine est utilisée tous les jours
pour avoir chaque matin du pain frais au petit-déjeuner,
la consommation annuelle sera comprise entre {{ 265 | Wh€PerYear }} et {{ 329 | Wh€PerYear }}. La consommation électrique peut donc dépasser le prix d'achat de la machine en seulement {{ 329 | times: 365.2425 | countPer€: 90 }} à {{ 265 | times: 365.2425 | countPer€: 90 }} ans.

#### Usage occasionnel

Si par contre la machine n'est utilisée qu'une fois par semaine (par exemple pour faire du pain le jour de la fermeture hebdomadaire de la boulangerie du quartier), la consommation sur l'année {{ 265 | times: 52 | Wh€ }} et {{ 329 | times: 52 | Wh€ }} sera très inférieure au prix d'achat de la machine.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette machine à pain, on pourrait :
- comparer la consommation des différents programmes. Nous en avons déjà testé 2 (le pain normal et le pain complet) sur les 10 que la machine propose. Nous pourrions par exemple tester de faire une brioche ou un gâteau…
- tester l'impact sur la consommation totale des options pouvant être sélectionnées indépendamment du programme : cuire un pain plus ou moins doré ou de réaliser des pains de différents poids (500 g, 750 g ou 1 kg).
- tester la machine à pain à différentes températures ambiantes
pour voir si le temps de fonctionnement de la résistance pour atteindre les températures désirées (par exemple pour la phase de levée) diminue significativement lorsqu'il fait plus chaud ou augmente lorsqu'il fait froid, par exemple en hiver.
{% endplusloin %}
