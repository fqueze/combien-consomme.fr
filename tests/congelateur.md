---
layout: test-layout.njk 
title: un congélateur
img: congel.jpg
date: 2024-04-10
tags: ['test']
---

Un gros congélateur permet de conserver une grande quantité de nourriture pendant des mois. Quel est le coût de revient ?
<!-- excerpt -->

{% tldr %}
- La consommation mesurée donne {{ 652 | Wh€PerYear }} par an ou {{ 652 | Wh€PerMonth }} par mois.
- Le congélateur fonctionne par cycles : environ 15 minutes de fonctionnement suivies de 25 minutes à l'arrêt.
- Un pic de démarrage atteint {{ 1720 | W }} pendant environ 1 seconde (démarrage du compresseur).
- Pendant le fonctionnement, la consommation varie entre {{ 68 | W }} et {{ 80 | W }}, nettement moins que les {{ 110 | W }} indiqués sur l'étiquette.
- Le coût total de l'électricité sur la durée de vie de l'appareil pourra dépasser largement le prix d'achat initial.
{% endtldr %}

## Le matériel
{% intro "congel.jpg" "Gros congélateur coffre" %}
Il s'agit d'un congélateur coffre Beko de 284 litres (modèle C 270-HC), avec une capacité de congélation de 13 kg par 24h. Ce congélateur est assez récent, et d'après l'étiquetage, c'était le modèle le moins énergivore du magasin malgré sa grande taille, lorsque je l'ai acheté il y a environ 2 ans.

### Méthode de mesure

Un {% post mesurer-la-consommation-avec-shelly-em enregistreur Shelly EM avec une pince ampèremétrique est installé dans le tableau électrique %} sur la ligne électrique allant vers la prise sur laquelle est branché le congélateur.
La valeur de la puissance instantanée mesurée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Indications du fabricant

Commençons par regarder les indications données par l'étiquette collée derrière l'appareil :

{% image "./images/congelateur-coffre-etiquette.jpg" "Étiquette du congélateur Beko modèle C270-HC : capacité de congélation 13 kg/24h, puissance 110W, réfrigérant R600a 56g, temps de montée en température 45h" %}

Elle indique « VOLTAGE (V~) : 220-240 », « WATTAGE(W) : 110 », soit une puissance nominale de {{ 110 | W }}.

Voyons si les mesures confirment cette valeur.

### Sur une journée

{% profile "congel24h.json.gz" '{"name": "Congélateur coffre pendant une journée"}' %}
On observe un comportement cyclique. Sur une journée, le même comportement se répète ici 36 fois. A chaque fois on observe un pic de consommation durant quelques secondes, suivant d'une consommation apparemment stable pendant quelques minutes, puis d'une consommation nulle pendant quelques minutes, et le cycle se répète.

### En détails

Nous avons observé que le comportement est cyclique. Regardons de plus près ce qu'il se passe lors d'un cycle :
{% profile "congel24h.json.gz" '{"name": "Congélateur - un seul cycle", "range":"62694282m2438298"}' %}

On observe environ 15 minutes de fonctionnement, suivies d'environ 25 minutes à l'arrêt, avant le redémarrage suivant.

Il y a un pic avec une forte consommation au démarrage, atteignant ici {{ 1720 | W }} pendant à peu près une seconde. Ça correspond au démarrage du moteur électrique du compresseur.

Zoomons maintenant sur la consommation après le pic :
{% profile "congel24h.json.gz" '{"name": "Congélateur - zoom sur le fonctionnement après le pic de démarrage", "range":"62706327m885648"}' %}

La consommation est à peu près stable sur toute la période de fonctionnement. On observe une consommation d'environ {{ 80 | W }} pendant environ 1 minute 30, ensuite la consommation décroit lentement, passant de {{ 74 | W }} à {{ 68 | W }}, avant de s'arrêter complètement. Je ne sais pas ce qui explique ces légères variations.

L'étiquette indiquait une puissance nominale de {{ 110 | W }}. Nos mesures montrent que pendant le fonctionnement du compresseur, la consommation varie entre {{ 68 | W }} et {{ 80 | W }}, et le pic de démarrage atteint {{ 1720 | W }}. Je ne sais pas à quoi correspond cette valeur de {{ 110 | W }} : ce n'est ni la consommation maximale, ni la consommation moyenne pendant le fonctionnement.

### Coût d'usage

Si on suppose que la consommation mesurée sur 24h ({{ 652 | Wh }}) est représentative, en extrapolant, on obtient {{ 652 |  Wh€PerYear }} par an, ou {{ 652 |  Wh€PerMonth }} par mois.

Si on suppose un prix d'achat d'environ {{ 500 | € }} pour un congélateur coffre de cette taille, il faudrait environ {{ 652 | PerYear | countPer€: 500 }} ans pour que le coût de l'électricité égale le prix d'achat. Un congélateur pouvant facilement durer 15 à 20 ans, le coût total de l'électricité sur sa durée de vie pourra largement dépasser son prix d'achat initial. Il vaut donc la peine de faire attention à la consommation énergétique lors de l'achat, même si cela implique de payer un peu plus cher à l'achat pour un modèle plus économe.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un congélateur, on pourrait mesurer :
- l'impact de l'ouverture du congélateur sur la consommation. Par exemple, la consommation sur la journée augmente-t-elle plus si on ouvre plusieurs fois quelques secondes, ou si on ouvre une fois une minute ?
- l'impact du givre sur la consommation. Profiler la consommation avant et après dégivrage pourrait donner cette information.
- l'impact de la température extérieure. On pourrait comparer un profil en hiver (quand la maison est chauffée, mais la buanderie ne dépasse pas 18°C) avec un profil en pleine canicule (la température dans la maison dépassant alors largement 25°C).
{% endplusloin %}
