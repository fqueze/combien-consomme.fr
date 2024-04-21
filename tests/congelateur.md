---
layout: test-layout.njk 
title: un congélateur
img: congel.jpg
date: 2024-04-10
tags: ['test']
---

Un gros congélateur permet de conserver une grande quantité de nourriture pendant des mois. Quel est le coût de revient ?
<!-- excerpt -->

## Le matériel
{% intro "congel.jpg" "Gros congélateur coffre" %}
Ce congélateur est assez récent, et d'après l'étiquettage, c'était le modèle le moins énergivore du magasin malgré sa grande taille, lorsque je l'ai acheté il y a environ 2ans.

### Méthode de mesure

Un enregistreur Shelly EM avec une pince ampèremétrique est installé dans le tableau électrique sur la ligne électrique allant vers la prise sur laquelle est branché le congélateur.
La valeur de la puissance instantanée mesurée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur une journée

{% profile "congel24h.json.gz" '{"name": "Congélateur coffre pendant une journée"}' %}
On observe un comportement cyclique. Sur une journée, le même comportement se répète ici 36 fois. A chaque fois on observe un pic de consommation durant quelques secondes, suivant d'une consommation apparemment stable pendant quelques minutes, puis d'une consommation nulle pendant quelques minutes, et le cycle se répète.

### Sur l'année

Si on suppose que la consommation mesurée sur 24h ({{ 652 | Wh }}) est représentative, en extrapolant, on obtient {{ 652 |  Wh€PerYear }} par an, ou {{ 652 |  Wh€PerMonth }} par mois.

### En détails

Nous avons observé que le comportement est cyclique. Regardons de plus près ce qu'il se passe lors d'un cycle :
{% profile "congel24h.json.gz" '{"name": "Congélateur - un seul cycle", "range":"62694282m2438298"}' %}

On observe environ 15 minutes de fonctionnement, suivies d'environ 25 minutes à l'arrêt, avant de le redémarrage suivant.

Il y a un pic avec une forte consommation au démarrage, atteignant ici {{ 1720 | W }} pendant à peu près une seconde. Ça correspond au démarrage du moteur électrique du compresseur.

Zoomons maintenant sur la consommation après le pic :
{% profile "congel24h.json.gz" '{"name": "Congélateur - zoom sur le fonctionnement après le pic de démarrage", "range":"62706327m885648"}' %}

La consommation est à peu près stable sur toute la période de fonctionnement. On observe une consommation d'environ {{ 80 | W }} pendant environ 1 minutes 30, ensuite la consommation décroit lentement, passant de {{ 74 | W }} à {{ 68 | W }}, avant de s'arrêter complètement. Je ne sais pas ce qui explique ces légères variations.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un congélateur, on pourrait mesurer :
- l'impact de l'ouverture du congélateur sur la consommation. Par exemple, la consommation sur la journée augmente-t-elle plus si on ouvre plusieurs fois quelques secondes, ou si on ouvre une fois une minute ?
- l'impact du givre sur la consommation. Profiler la consommation avant et après dégivrage pourrait donner cette information.
- l'impact de la température extérieure. On pourrait comparer un profil en hiver (quand la maison est chauffée, mais la buanderie ne dépasse pas 18°C) avec un profil en pleine canicule (la température dans la maison dépassant alors largement 25°C).
{% endplusloin %}
