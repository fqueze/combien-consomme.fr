---
layout: test-layout.njk
title: une bouilloire électrique
img: bouilloire-electrique.jpg
date: 2026-01-05
tags: ['test']
---

La bouilloire électrique est sans doute l'un des appareils les plus utilisés au quotidien pour préparer thés, cafés ou autres boissons chaudes. Combien coûte réellement ce geste simple de faire bouillir un litre d'eau ?

<!-- excerpt -->

{% tldr %}
- Si vous faites bouillir 1 litre d'eau 2 fois par jour, la consommation annuelle sera de {{ 110 | times: 2 | Wh€PerYear }}, soit {{ 110 | times: 2 | Wh€PerMonth }} par mois.
- Faire bouillir 1 litre d'eau consomme {{ 110 | Wh€ }}.
- Ne faire bouillir que la quantité nécessaire permet d'économiser significativement.
- L'arrêt se fait par un interrupteur mécanique, pas besoin de débrancher la bouilloire.
{% endtldr %}

{% comment %}
Notes from draft:
En fin de repas, on a fait bouillir un litre d'eau pour servir un café instantané (nescafé, mais ne pas citer la marque) à 3 ou 4 personnes.
{% endcomment %}

## Le matériel

{% intro "bouilloire-electrique.jpg" "Bouilloire électrique Philips HD 4646" %}

La bouilloire testée est une Philips HD 4646, un modèle classique d'une capacité de 1,5 L. C'est le type de bouilloire qu'on trouve dans de nombreuses cuisines, simple et efficace.

Pour ce test, en fin de repas, nous avons fait bouillir 1 litre d'eau pour servir un café instantané à 3 ou 4 personnes.

### Méthode de mesure

La bouilloire est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

Les indications techniques sont sous la bouilloire :

{% image "./images/bouilloire-electrique-etiquette-bouilloire.jpg" "Étiquette sous la bouilloire" "500w" 500 %}
{% comment %}étiquette sous la bouilloire en elle même. On lit :

TYPE HD 4646
220—240V ~ 50—60Hz
2000 — 2400W{% endcomment %}

L'étiquette indique « TYPE HD 4646 220-240V ~ 50-60Hz 2000-2400W », soit une plage de puissance nominale de {{ 2000 | W }} à {{ 2400 | W }}.

On retrouve les mêmes indications sous la base raccordée au secteur :

{% image "./images/bouilloire-electrique-etiquette-base.jpg" "Étiquette sous la base" "500w" 500 %}
{% comment %}étiquette sous la base raccordée au secteur. L'étiquette dit en fait exactement la même chose que celle se trouvant sous la bouilloire.{% endcomment %}

### Faire bouillir 1 litre d'eau

Pour notre test, nous avons rempli la bouilloire avec exactement 1 litre d'eau :

{% image "./images/bouilloire-electrique-niveau-remplissage.jpg" "Niveau de remplissage à 1 litre" "250w" 250 %}
{% comment %}zoom sur la graduation de la bouilloire au début de notre test : on a 1 litre d'eau dedans{% endcomment %}

Le bouton sur le dessus de la bouilloire permet de lancer la chauffe :

{% image "./images/bouilloire-electrique-bouton.jpg" "Bouton de commande en position marche" "250w" 250 %}
{% comment %}bouton sur le dessus de la bouilloire, ici sur "1", elle est en train de chauffer. Lorsque l'eau est bouillante, on entend un claquement et le bouton repasse en position 0.{% endcomment %}

Lorsque l'eau est bouillante, on entend un claquement et le bouton repasse automatiquement en position 0.

Le test complet a duré un peu plus de 3 minutes et consommé {{ 110 | Wh€ }} :

{% profile "bouilloire-electrique.json.gz" '{"name": "faire bouillir 1 litre d\'eau", "range": "267433m192552"}' %}
{% comment %}draft: la puissance consommée pendant le chauffage est très stable, avec quelques toutes petites variations bien corrélées aux variations de tension du secteur (qui a varié de 232 à 224 V pendant notre mesure).
Lors de l'arrêt, on a deux échantillons (donc 2s) avec une puissance sensiblement inférieure, avant de tomber à 0W.

L'arrêt se fait par un interrupteur mécanique, pas de conso au repos, inutile donc de débrancher cet appareil lorsqu'il n'est pas utilisé.{% endcomment %}

La puissance consommée pendant le chauffage est très stable, avec une médiane de {{ 2100 | W }} et un maximum de {{ 2150 | W }}, ce qui correspond bien à la plage de puissance nominale indiquée sur l'étiquette ({{ 2000 | W }} à {{ 2400 | W }}).

On observe quelques toutes petites variations de puissance pendant la chauffe, qui sont bien corrélées aux variations de tension du secteur (qui a varié de 232 à 224 V pendant notre mesure). Lors de l'arrêt, on a deux échantillons (donc 2 secondes) avec une puissance sensiblement inférieure, avant de tomber à 0 W.

L'arrêt se fait par un interrupteur mécanique : pas de consommation au repos, inutile donc de débrancher cet appareil lorsqu'il n'est pas utilisé.

### Coût d'usage

Le coût électrique pour faire bouillir 1 litre d'eau est de {{ 110 | Wh€ }}. Il faudrait faire bouillir {{ 110 | countPer€: 1 }} litres d'eau pour dépenser un euro d'électricité.

Si l'on suppose que la bouilloire est utilisée 2 fois par jour pour faire bouillir 1 litre d'eau à chaque fois (par exemple un thé le matin et un autre l'après-midi), la consommation sera de {{ 110 | times: 2 | Wh€PerMonth }} par mois, soit {{ 110 | times: 2 | Wh€PerYear }} par an.

Le coût en énergie approche du coût d'achat (environ 20 euros) dès la première année d'utilisation régulière. Si certains modèles sont plus efficaces que d'autres (meilleure isolation, par exemple), quelques euros de plus à l'achat pourraient être amortis avant la fin de la durée de vie de la bouilloire.

**Conseil d'économie :** N'oubliez pas de ne faire bouillir que la quantité d'eau dont vous avez réellement besoin. Pour notre test, nous n'avions besoin que d'environ 600 mL pour servir 3 tasses de café, pas d'un litre complet. Faire bouillir seulement la quantité nécessaire devrait permettre de diviser par presque deux la consommation électrique.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ 2100 | W }} de la bouilloire est relativement élevée pour une installation photovoltaïque domestique standard. Une installation en toiture standard de 3 kWc produira suffisamment en milieu de journée ensoleillée pour alimenter la bouilloire, mais il faudra éviter de l'utiliser en même temps qu'un autre gros consommateur.

Pour maximiser l'autoconsommation, plusieurs options :
- utiliser la bouilloire pour la pause café ou le thé de l'après-midi, quand la production solaire est bonne ;
- si vous êtes à la maison en journée (télétravail, retraite, …), privilégier l'utilisation en milieu de journée plutôt que le matin tôt ou le soir ;
- ne faire bouillir que la quantité d'eau dont vous avez réellement besoin (plutôt qu'un litre complet à chaque fois) ;
- éviter de faire bouillir de l'eau en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %}, {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} ou {% test four-a-micro-ondes un four à micro-ondes %}, pour ne pas dépasser la capacité de production solaire.

Une {% test machine-a-cafe-expresso machine à café expresso %} sera plus facile à alimenter avec la production photovoltaïque car elle fait couler l'eau chauffée en continu plutôt que de faire bouillir une grande quantité d'eau d'un coup.

Cela dit, avec un coût électrique de {{ 110 | Wh€ }}, l'enjeu économique reste faible. L'intérêt est surtout environnemental : utiliser directement l'énergie solaire.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une bouilloire électrique, on pourrait :
- tester avec différentes quantités d'eau (0,5 L, 1 L, 1,5 L) pour quantifier précisément l'économie réalisée en adaptant la quantité à ses besoins ;
- mesurer l'impact de la température initiale de l'eau (eau du robinet en hiver vs en été, eau laissée au soleil) ;
- comparer avec d'autres modèles de bouilloires de différentes puissances ;
- comparer avec d'autres méthodes pour chauffer de l'eau ({% test four-a-micro-ondes four à micro-ondes %}, casserole sur plaque électrique ou à induction) ;
- mesurer le rendement énergétique (énergie électrique consommée vs chaleur transmise à l'eau).
{% endplusloin %}
