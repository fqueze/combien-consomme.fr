---
layout: test-layout.njk
title: une soirée gaufres
img: soiree-gaufres.jpg
date: 2025-12-02
tags: ['test']
---

Un gaufrier pour préparer des gaufres salées et sucrées lors d'une soirée entre amis. Combien d'électricité consomme-t-on pour faire des gaufres maison ?

<!-- excerpt -->

{% tldr %}
- Une soirée gaufres complète avec préchauffage et cuisson de 14 paires de gaufres (salées puis sucrées) consomme {{ 831 | Wh€ }}.
- Cuire une paire de gaufres consomme entre {{ 355 | divided_by: 8 | Wh€ }} et {{ 347 | divided_by: 5 | Wh€ }} selon la recette.
- Le préchauffage de {{ 129 | Wh€ }} représente {{ 129 | percent: 831 }} de la consommation totale de la soirée.
- Le coût électrique est dérisoire comparé au coût des ingrédients et au prix d'achat de l'appareil.
- Attention : pas d'interrupteur, il faut impérativement débrancher l'appareil après utilisation pour éviter qu'il ne maintienne sa température indéfiniment.
{% endtldr %}

{% comment %}
Notes from draft:
tension a varié entre 240 et 232 V pendant l'enregistrement, ce qui explique beaucoup des légères variations observées dans la forme des enregistrement lors du chauffage.
{% endcomment %}

## Le matériel

{% intro "soiree-gaufres-dessus.jpg" "Gaufrier TEFAL Croque Gaufre Grill Type 690 Serie 1" %}

Ce gaufrier TEFAL a déjà quelques années de bons et loyaux services. C'est un modèle simple avec un thermostat mécanique et un témoin lumineux qui indique quand l'appareil chauffe. Sur le dessus, on trouve une petite minuterie à pile qui n'a plus de pile depuis des années. De toute façon, un téléphone fait tout aussi bien l'affaire pour minuter la cuisson.

Le modèle est conçu pour se retourner à mi-cuisson, ce qui permet de cuire les deux faces de la gaufre de façon uniforme. Chaque moitié du gaufrier contient une résistance électrique qui chauffe la plaque. Mis à part le petit témoin lumineux, ces deux résistances sont les seuls éléments qui consomment de l'énergie.

### Méthode de mesure

Le gaufrier est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

{% image "./images/soiree-gaufres-etiquette.jpg" "Étiquette collée sous le gaufrier TEFAL" "250w" 250 %}
{% comment %}TEFAL Ry 230V~
50-60Hz 700 W
Type 690 Serie 1{% endcomment %}

L'étiquette collée sous l'appareil indique une puissance de {{ 700 | W }} à 230 V. Nous allons vérifier cette valeur lors de nos mesures.

### Une soirée gaufres complète

Lors de cette soirée, nous avons préparé d'abord des gaufres salées à la patate douce pour le plat principal, puis des gaufres sucrées pour le dessert. L'enregistrement couvre toute la durée du repas, avec un début de préchauffage puis cuisson en continu :

{% profile "soiree-gaufres.json.gz" '{"name": "Soirée gaufres", "range": "120890m5526410"}' %}
{% comment %}draft: enregistrement de la consommation du gaufrier pendant tout le repas, avec d'abord un peu de préchauffage puis la cuisson de gaufres à la patate douce pour le plat principal, et enfin des gaufres sucrées pour le dessert.{% endcomment %}

L'enregistrement complet dure {{ 5526410 | minus: 120890 | divided_by: 1000 | s }} et consomme {{ 831 | Wh€ }}.

On observe trois phases distinctes :
- Un début de préchauffage (quelques minutes seulement)
- La cuisson des gaufres à la patate douce, pendant lesquelles nous mangions
- La cuisson des gaufres sucrées en fin de repas, toujours en continu

Le gaufrier fonctionne par cycles de chauffe contrôlés par le thermostat mécanique. Quand la température monte trop, le thermostat coupe l'alimentation (on entend un petit claquement), puis la rétablit quelques secondes plus tard quand la température redescend. C'est pour cela qu'on observe ces alternances entre environ {{ 756 | W }} (la puissance médiane) et 0 W. Au tout premier démarrage, on observe un pic à {{ 814 | W }}.

La puissance médiane mesurée de {{ 756 | W }} est nettement supérieure aux {{ 700 | W }} annoncés ({{ 756 | percentMore: 700 }} de plus). La tension secteur a varié entre 232 et 240 V pendant l'enregistrement. Une tension à 240 V ({{ 240 | percentMore: 230 }} supérieure aux 230 V nominaux) justifie une puissance un peu plus élevée. Mais même lors de la tension minimale mesurée à 232 V, la puissance atteignait encore 742 W, soit {{ 742 | percentMore: 700 }} de plus que ce qui est indiqué sur l'étiquette. La puissance réelle de l'appareil semble donc un peu sous-estimée par le fabricant.

### Le préchauffage

Si on laisse le gaufrier chauffer à vide pendant {{ 603195 | divided_by: 1000 | s }}, on observe une chauffe presque continue :

{% profile "soiree-gaufres.json.gz" '{"name": "Chauffage en continu pendant 10 minutes incluant le préchauffage", "range": "131357m603195"}' %}

Pendant cette phase, l'appareil chauffe avec une puissance moyenne de {{ 772 | W }} et consomme {{ 129 | Wh€ }}.

Dans la pratique, nous n'avons pas attendu tout ce temps. Après seulement quelques minutes de préchauffage, impatients de commencer, nous avons lancé la première paire de gaufres. Résultat : elle a collé aux plaques et la cuisson était inégale.

{% image "./images/soiree-gaufres-temoin.jpg" "Témoin lumineux orange indiquant que l'appareil chauffe" "250w" 250 %}
{% comment %}un témoin lumineux sur le dessus de l'appareil indique que l'appareil est en train de chauffer. De temps en temps on entend un petit claquement caractéristique des thermostats mécaniques{% endcomment %}

Il est préférable d'attendre que le témoin lumineux orange s'éteigne (indiquant que la température est atteinte) avant de verser la première portion de pâte. Dès la deuxième paire, avec le gaufrier bien chaud, tout s'est bien passé.

### Protocole de cuisson

{% image "./images/soiree-gaufres-patate-douce.jpg" "Première cuillerée de pâte versée sur la plaque, téléphone prêt à minuter 2 minutes" "500w" 500 %}
{% comment %}Début de la soirée gaufre, gaufrier ouvert, première cuillerée de pâte à gaufre à la patate douce en train d'être versée sur la plaque, téléphone prêt à minuter 2 minutes.{% endcomment %}

Le protocole est simple : on verse la pâte, on ferme le gaufrier, on lance le minuteur pour 2 minutes.

Quand le téléphone sonne, on attrape le gaufrier par la poignée pour le retourner :  
{% image "./images/soiree-gaufres-retourne.jpg" "Gaufrier retourné après les 2 premières minutes" "500w" 500 %}
{% comment %}Lorsque le téléphone sonne, on retourne le gaufrier et on remet le même temps de cuisson sur l'autre face{% endcomment %}

On retourne le gaufrier et on remet 2 minutes de cuisson sur l'autre face :  
{% image "./images/soiree-gaufres-dessous.jpg" "Gaufrier retourné pour la deuxième partie de la cuisson" "500w" 500 %}
{% comment %}gaufrier vu de dessous, lorsqu'on le retourne pour la deuxième partie de la cuisson{% endcomment %}

Deux minutes plus tard, c'est cuit !

{% image "./images/soiree-gaufres-gaufres-cuites.jpg" "Deux gaufres cuites prêtes à être retirées et dégustées" "500w" 500 %}
{% comment %}gaufrier ouvert avec 2 gaufres cuites, prêtes à être retirées et dégustées{% endcomment %}

Il n'y a plus qu'à attraper les gaufres toutes chaudes pour les déguster.

### Les gaufres à la patate douce

Pour le plat principal, nous avons préparé des gaufres salées à base de patate douce, avec une pâte assez épaisse. La cuisson complète de 6 paires de gaufres, incluant le début de préchauffage, s'étend sur {{ 3000988 | minus: 120890 | divided_by: 1000 | s }} :

{% profile "soiree-gaufres.json.gz" '{"name": "Gaufres à la patate douce", "range": "120890m3000988"}' %}
{% comment %}draft: 6 paires de gaufres, la pâtes à gaufres à la patate douce était épaisse.{% endcomment %}

Cette phase consomme {{ 476 | Wh€ }} au total. La puissance moyenne est de {{ 573 | W }}. Nous mangions les gaufres au fur et à mesure, pendant que la paire suivante cuisait dans le gaufrier. Le rythme était soutenu, avec peu d'interruption entre les cuissons.

{% image "./images/soiree-gaufres-boules-patate-douce.jpg" "Deux portions de pâte à la patate douce déposées sur le gaufrier" "500w" 500 %}
{% comment %}2 portions de pâte à la patate douce déposées sur le gaufrier. Cette pâte est épaisse et ne coule pas du tout à l'intérieur des rainures du gaufrier.{% endcomment %}

La pâte à la patate douce est très épaisse et ne coule pas dans les rainures du gaufrier. On dépose deux grosses cuillerées qui vont s'étaler sous le poids du couvercle, mais sans remplir complètement les creux. Cela donne des gaufres moins croustillantes que les gaufres classiques, mais avec un bon goût de légume.

Une fois le gaufrier en température (la première paire ayant été cuite pendant la fin du préchauffage), les 5 paires suivantes ont nécessité {{ 2330144 | minus: 791734 | divided_by: 1000 | s }} de cuisson :

{% profile "soiree-gaufres.json.gz" '{"name": "Gaufres à la patate douce après le préchauffage", "range": "791734m2330144"}' %}

Cette phase consomme {{ 347 | Wh€ }}, soit environ {{ 347 | divided_by: 5 | Wh€ }} par paire de gaufres. Le profil montre bien les cycles de chauffe du thermostat, avec quelques périodes plus longues à zéro. L'imprécision du thermostat mécanique peut expliquer ces variations dans la durée des cycles.

### Les gaufres sucrées

Pour le dessert, place aux gaufres sucrées avec une pâte beaucoup plus liquide, presque comme une pâte à crêpe.

{% image "./images/soiree-gaufres-liquide.jpg" "Louche de pâte à gaufre sucrée qui coule dans les rainures" "500w" 500 %}
{% comment %}gaufrier ayant reçu une louche de pâte à gaufre sucrée, qui a coulé dans les rainures de la plaque à gaufres{% endcomment %}

La différence de texture est frappante : la pâte sucrée coule immédiatement dans toutes les rainures du gaufrier et remplit bien les formes. On obtient des gaufres plus fines, plus croustillantes et mieux formées.

La cuisson de 8 paires de gaufres dure {{ 2525422 | divided_by: 1000 | s }} :

{% profile "soiree-gaufres.json.gz" '{"name": "Gaufres sucrées", "range": "3121878m2525422"}' %}
{% comment %}draft: 8 paires de gaufres. La pâtes pour les gaufres sucrées était beaucoup plus liquide, presque comme une pâte à crêpe.{% endcomment %}

Cette phase consomme {{ 355 | Wh€ }}, soit environ {{ 355 | divided_by: 8 | Wh€ }} par paire de gaufres. C'est légèrement moins que les gaufres à la patate douce, probablement parce que la pâte liquide transmet mieux la chaleur et cuit un peu plus rapidement.

La puissance moyenne de {{ 527 | W }} est un peu plus faible que pour les gaufres salées. Le rythme de cuisson était pourtant toujours continu, mais les périodes de non-chauffe semblent légèrement plus longues. Peut-être le gaufrier refroidit-il moins vite pendant la cuisson des gaufres sucrées ?

### Après utilisation

Ce gaufrier n'a pas d'interrupteur : tant qu'il est branché, il maintient la température de cuisson. Il faut donc impérativement le débrancher après utilisation.

C'est un point d'attention important avec ce type d'appareil à thermostat mécanique simple. Contrairement à un {% test raclette-a-deux appareil à raclette %} ou un {% test four-a-micro-ondes four à micro-ondes %} qui ont un interrupteur, ici on doit penser à retirer la prise du secteur. Sinon, le gaufrier continuera à maintenir sa température indéfiniment avec ses cycles de thermostat, consommant plus de {{ 500 | W }} en moyenne.

L'avantage, c'est qu'une fois débranché, la consommation est zéro : pas d'électronique, pas de LED témoin, pas de circuit en attente. Mais il faut vraiment penser à débrancher.

### Coût d'usage

Le coût électrique d'une soirée gaufres de {{ 831 | Wh€ }} est dérisoire, surtout comparé au coût des ingrédients. Pour 14 paires de gaufres, il faut compter environ 500g de farine, 8 œufs, 50cL de lait, 100g de beurre, sans parler de la patate douce ou du sucre vanillé. Le coût des ingrédients dépasse facilement 5 à 10€, alors que l'électricité ne coûte que {{ 831 | Wh€ }}.

Dans la réalité, ce type d'appareil est souvent acheté ou offert, sert quelques fois avec enthousiasme, puis finit oublié dans un placard. Ce gaufrier acheté 5€ au marché aux puces nécessiterait {{ 831 | countPer€: 5 }} utilisations pour que son coût électrique égale son prix d'achat. Un modèle neuf équivalent (700 W) coûtant environ 55€ chez les distributeurs en ligne nécessiterait {{ 831 | countPer€: 55 }} utilisations. Sauf pour une utilisation professionnelle intensive (où l'on choisira probablement un modèle plus robuste), le coût électrique reste vraiment négligeable face au prix d'achat et au coût des ingrédients.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ 700 | W }} du gaufrier est relativement élevée, mais reste compatible avec une installation photovoltaïque domestique standard. Une installation en toiture standard de 3 kWc produira suffisamment en milieu de journée ensoleillée, même en hiver, pour alimenter le gaufrier.

Le profil de consommation par cycles (alternance chauffe/pause du thermostat) n'est pas idéal pour l'autoconsommation, car la production solaire doit pouvoir absorber les pics de puissance et se retrouve inutilisée pendant les pauses. Mais comme une séance dure rarement plus d'une heure, l'impact reste modéré.

Pour maximiser l'autoconsommation, plusieurs options :
- Organiser un goûter gaufres l'après-midi plutôt qu'une soirée ;
- Faire un brunch gaufres le midi si on veut à la fois des gaufres salées et sucrées ;
- En été, profiter du début de soirée (19h-20h) quand il y a encore du soleil.

Cela dit, avec un coût électrique de {{ 831 | Wh€ }} pour toute la soirée, l'enjeu économique reste très faible.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du gaufrier, on pourrait :
- tester différentes recettes de pâte (épaisse, liquide, avec plus ou moins de matière grasse) pour voir si cela influence le temps de cuisson et donc la consommation ;
- comparer avec un gaufrier moderne à régulation électronique et voir s'il est plus économe ;
- mesurer la consommation avec différents temps de cuisson (gaufres blondes vs bien dorées) ;
- évaluer l'impact du temps pendant lequel le gaufrier reste ouvert entre deux gaufres (perte de chaleur dans la pièce, surconsommation pour revenir à température) ;
- comparer avec d'autres appareils de cuisson conviviale comme une {% test raclette-a-deux raclette %}, une crêpière ou un appareil à croque-monsieur.
{% endplusloin %}
