---
layout: test-layout.njk
title: un gaufrier Tefal MagicClean
img: gaufrier-tefal-magiclean.jpg
date: 2026-02-15
tags: ['test']
---

Le gaufrier Tefal MagicClean permet de préparer des gaufres maison, salées ou sucrées. Combien coûte le plaisir de déguster ces gaufres ?

<!-- excerpt -->

{% tldr %}
- Pour la cuisson de 10 gaufres une fois par mois, la consommation annuelle sera de {{ 340 | times: 12 | Wh€ }} par an.
- Pour 5 paires (10 gaufres) préchauffage compris, le coût est de {{ 340 | Wh€ }}, soit {{ 340 | divided_by: 10 | Wh€ }} par gaufre.
- Le préchauffage initial consomme {{ 63.0 | Wh€ }}, soit {{ 63.0 | percent: 340 }} de l'énergie totale d'une session complète.
- Après le préchauffage, chaque gaufre supplémentaire consomme {{ 277 | divided_by: 10 | Wh€ }}.
{% endtldr %}

{% comment %}
Notes from draft:
5 paires de gaufres au fromage, gaufrier tefal magiclean. Préchauffage complet avant de commencer les cuissons (contrairement au test précédent)
voyant rouge allumé tant qu'il est branché, voyant vert allumé en plus lorsqu'il a atteint sa température et que les résistances ne chauffent plus
{% endcomment %}

## Le matériel

{% intro "gaufrier-tefal-magiclean.jpg" "Gaufrier Tefal MagicClean" %}

Le gaufrier Tefal MagicClean est un appareil classique pour préparer des gaufres à la maison, salées ou sucrées. La particularité MagicClean : les plaques de cuisson sont démontables et peuvent aller au lave-vaisselle pour un nettoyage sans effort.

Le gaufrier dispose de deux voyants lumineux pour indiquer son état : un voyant rouge allumé en permanence quand l'appareil est branché, et un voyant vert qui s'allume en plus lorsque la température est atteinte et que les résistances ne chauffent plus.

### Méthode de mesure

Le gaufrier Tefal est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

Voici les indications techniques inscrites sur l'étiquette :

{% image "./images/gaufrier-tefal-magiclean-etiquette.jpg" "Étiquette du gaufrier Tefal indiquant 230V-50/60Hz 780W Type 6038 serie 2" "300w" 300 %}
{% comment %}draft: Tefal 230V-50/60Hz 780W Type 6038 serie 2{% endcomment %}

L'étiquette indique « 230V-50/60Hz 780W Type 6038 serie 2 », soit une puissance nominale de {{ 780 | W }}. Voyons si nos mesures correspondent à cette valeur.

### Une soirée gaufres complète

Pour ce test, nous avons préparé une pâte à gaufres au fromage, qui nous a permis de faire 5 paires de gaufres :

{% image "./images/gaufrier-tefal-magiclean-saladier-de-pate.jpg" "Saladier de pâte à gaufres au fromage" "500w" 500 %}

La session complète, débutant par le préchauffage complet lors du branchement de l'appareil jusqu'à la cuisson de la dernière gaufre, dure {{ 1956227 | divided_by: 1000 | s }} et consomme {{ 340 | Wh€ }} :

{% profile "gaufrier-tefal-magiclean.json.gz" '{"name": "soirée gaufres complète", "range": "378773m1956227"}' %}
{% comment %}draft: 5 paires de gaufres au fromage, gaufrier tefal magiclean. Préchauffage complet avant de commencer les cuissons{% endcomment %}

On observe plusieurs phases :
1. Une première phase de préchauffage qui dure un peu moins de {{ 300 | s }} avec une consommation stable et élevée ;
2. Puis cinq cycles de chauffe, chacun avec une forte consommation suivie d'une interruption lorsque le thermostat désactive le chauffage, la température étant atteinte.

La puissance médiane est de {{ 833 | W }}, soit {{ 833 | minus: 780 | W }} de plus que la puissance nominale de {{ 780 | W }} indiquée sur l'étiquette. La puissance maximale mesurée atteint {{ 861 | W }}, soit {{ 861 | percent: 780 }} de la puissance nominale. La tension du secteur lors de la mesure, environ 235 V, n'est pas suffisamment supérieure à la tension nominale pour expliquer cette différence.

### En détail

#### Le préchauffage

Le préchauffage dure {{ 274774 | divided_by: 1000 | s }} et consomme {{ 63.0 | Wh€ }} :

{% profile "gaufrier-tefal-magiclean.json.gz" '{"name": "préchauffage", "range": "381805m274774"}' %}
{% comment %}draft: préchauffage{% endcomment %}

Pendant cette phase, le gaufrier chauffe en continu avec une puissance stable. La puissance médiane est de {{ 832 | W }}, et la puissance moyenne de {{ 828 | W }}, ce qui montre une consommation constante. Seul le voyant rouge est allumé pendant cette période :

{% image "./images/gaufrier-tefal-magiclean-voyant-rouge.jpg" "Zoom sur les voyants du gaufrier, seul le voyant rouge est allumé" "250w" 250 %}
{% comment %}draft: zoom sur les voyants, seul le voyant rouge est allumé{% endcomment %}

On observe une légère baisse de puissance après environ {{ 150 | s }}, due aux variations de la tension du secteur. Le voyant vert s'allume en complément du voyant rouge lorsque la température cible est atteinte :

{% image "./images/gaufrier-tefal-magiclean-voyant-vert.jpg" "Zoom sur les voyants du gaufrier, les voyants rouge et vert sont allumés" "250w" 250 %}
{% comment %}draft: zoom sur les voyants, les voyants rouge et vert sont allumés{% endcomment %}

Le préchauffage représente {{ 63.0 | percent: 340 }} de l'énergie totale de la session.

#### La cuisson des gaufres

Une fois le gaufrier préchauffé, nous plaçons deux cuillerées de pâte sur la plaque inférieure :

{% image "./images/gaufrier-tefal-magiclean-pret-a-cuire.jpg" "Deux cuillerées de pâte à gaufres disposées sur la plaque du gaufrier" "500w" 500 %}
{% comment %}draft: Deux cuillerées de pâte à gaufres disposées sur la plaque du gaufrier, prêt à refermer pour lancer la cuisson{% endcomment %}

La cuisson des 5 paires de gaufres dure un peu moins de {{ 1800 | s }} et consomme {{ 277 | Wh€ }} :

{% profile "gaufrier-tefal-magiclean.json.gz" '{"name": "cuisson de 5 paires de gaufres", "range": "656578m1678422"}' %}
{% comment %}draft: cuisson de 5 paires de gaufres{% endcomment %}

On observe cinq cycles distincts de chauffe puis de maintien en température. Chaque cycle comporte une phase de chauffage à {{ 833 | W }} (puissance médiane) qui dure entre {{ 180 | s }} et {{ 300 | s }}, suivie d'une interruption d'une à deux minutes lorsque le thermostat désactive le chauffage, la température étant atteinte.

La puissance moyenne sur l'ensemble de cette phase est de {{ 595 | W }}, inférieure à la puissance médiane de {{ 833 | W }}. Cela s'explique par les périodes où le thermostat coupe le chauffage.

Voici le résultat après cuisson :

{% image "./images/gaufrier-tefal-magiclean-cest-cuit.jpg" "Deux gaufres cuites prêtes à être décollées du gaufrier" "500w" 500 %}
{% comment %}draft: deux gaufres cuites sont prêtes à être décollées du gaufrier{% endcomment %}

#### Répartition de la chaleur

Nous avons utilisé une caméra thermique pour visualiser la répartition de la chaleur. Lorsque le gaufrier est ouvert, on voit nettement que la chaleur est concentrée sur les deux plaques de cuisson :

{% image "./images/gaufrier-tefal-magiclean-thermal-ouvert.jpg" "Vue en caméra thermique du gaufrier ouvert montrant la concentration de chaleur sur les plaques" "500w" 500 %}
{% comment %}draft: vue en camera thermique du gaufrier ouvert, on voit nettement le chaud concentré sur les 2 plaques de cuisson des gaufres. C'est encore plus marqué au centre de la plaque du haut.{% endcomment %}

La chaleur est particulièrement marquée au centre de la plaque supérieure. En démontant une des plaques à gaufres, on peut voir la résistance chauffante à l'intérieur :

{% image "./images/gaufrier-tefal-magiclean-resistance.jpg" "Intérieur du gaufrier avec une plaque à gaufre démontée, laissant la résistance visible" "500w" 500 %}
{% comment %}draft: intérieur du gaufrier avec une plaque à gaufre démontée, laissant la résistance visible{% endcomment %}

Cette configuration explique la répartition de la chaleur visible sur l'image thermique, et pourrait expliquer des cuissons légèrement inégales.

Vue de dessous, on constate que de l'air chaud s'échappe par les côtés et par quelques ouvertures :

{% image "./images/gaufrier-tefal-magiclean-thermal-dessous.jpg" "Image thermique du dessous du gaufrier montrant l'air chaud qui s'échappe" "500w" 500 %}
{% comment %}draft: image thermique du gaufrier quand il est retourné. On voit que de l'air chaud sort par le côté et par les quelques trous d'en dessous{% endcomment %}

### Coût d'usage

Pour 5 paires de gaufres (soit 10 gaufres), préchauffage compris, le coût est de {{ 340 | Wh€ }}, soit {{ 340 | divided_by: 10 | Wh€ }} par gaufre. Il faudrait préparer {{ 34 | countPer€: 1 }} gaufres pour dépenser un euro d'électricité.

Si vous préparez plusieurs gaufres d'affilée, le préchauffage n'est nécessaire qu'une seule fois. Le coût par gaufre supplémentaire après le préchauffage n'est alors que de {{ 277 | divided_by: 10 | Wh€ }}. Il faudrait donc en réalité {{ 277 | divided_by: 10 | countPer€: 1 }} gaufres supplémentaires pour dépenser un euro.

Le coût électrique de la cuisson de 10 gaufres, {{ 340 | Wh€ }}, est dérisoire comparé au coût des ingrédients et au plaisir de déguster des gaufres maison.

Dans la réalité, ce type d'appareil est souvent acheté ou offert, sert quelques fois avec enthousiasme, puis finit oublié dans un placard. Si l'on suppose une utilisation mensuelle (une soirée gaufres par mois), la consommation annuelle sera de {{ 340 | times: 12 | Wh€ }} par an. Le coût énergétique annuel reste négligeable comparé au coût d'achat de l'appareil.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ 832 | W }} du gaufrier reste compatible avec une installation photovoltaïque domestique. Une installation en toiture de 3 kWc produira suffisamment en milieu de journée ensoleillée pour alimenter le gaufrier.

Pour maximiser l'autoconsommation, plusieurs options :
- préparer les gaufres lors d'un brunch dominical ensoleillé ;
- profiter d'un goûter en milieu d'après-midi le week-end ;
- éviter de lancer le gaufrier en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %}, {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} ou {% test four-a-micro-ondes un four à micro-ondes %}, pour ne pas dépasser la capacité de production solaire.

Cela dit, avec un coût électrique de {{ 340 | Wh€ }} par session, l'enjeu économique reste faible. L'intérêt est surtout environnemental : utiliser directement l'énergie solaire.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du gaufrier Tefal MagicClean, on pourrait :
- évaluer l'impact du temps pendant lequel le gaufrier reste ouvert entre deux gaufres (perte de chaleur dans la pièce, surconsommation pour revenir à température) ;
- comparer la consommation entre différentes recettes (salées ou sucrées) avec des pâtes plus ou moins épaisses qui peuvent avoir un comportement différent à la cuisson ;
- comparer avec {% test soiree-gaufres d'autres modèles de gaufriers %} de puissances différentes.
{% endplusloin %}
