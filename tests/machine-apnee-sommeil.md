---
layout: test-layout.njk 
title: une machine de traitement de l'apnée du sommeil
img: machine-apnee-sommeil.jpg
date: 2024-12-19
tags: ['test']
---

Cette machine améliore la respiration nocturne et réduit les apnées. Combien consomme-t-elle pour réaliser ce petit miracle ?
<!-- excerpt -->

{% tldr %}
- La consommation annuelle totale est comprise entre {{ 2.70 | times: 16 | plus: 86.9 | Wh€PerYear }} et {{ 3.34 | times: 16 | plus: 179 | Wh€PerYear }} si l'utilisateur dort 8 heures par nuit et que la machine reste branchée tout le temps.
- La puissance moyenne est comprise entre {{ 9.37 | W }} et {{ 19.0 | W }} pendant l'utilisation, avec des pics montant jusqu'à {{ 56.5 | W }} pendant les apnées. La puissance moyenne en veille est comprise entre {{ 2.70 | W }} et {{ 3.34 | W }}.
- La consommation en veille, {{ 2.70 | times: 16 | Wh€PerYear }} à {{ 3.34 | times: 16 | Wh€PerYear }} par an — entre {{ 15.8 | percent: 81.2 }} et {{ 19.5 | percent: 51.2 }} du total encourage à débrancher l'appareil lorsqu'il est inutilisé.
{% endtldr %}

## Le matériel
{% intro "machine-apnee-sommeil.jpg" "Une machine de traitement de l'apnée sommeil prisma SMART max" %}

La machine testée est le modèle « prisma SMART max » de la marque allemande Löwenstein.
Elle est ici associée à un humidificateur d'air « prismaAQUA » qui réchauffe et humidifie
l'air avant qu'il n'entre dans la machine de traitement de l'[apnée du sommeil](https://fr.wikipedia.org/wiki/Syndrome_d%27apn%C3%A9es_du_sommeil "« Syndrome d'apnées du sommeil » sur Wikipédia").

Ce type de machine de [ventilation en pression positive continue (PPC)](https://fr.wikipedia.org/wiki/Ventilation_en_pression_positive_continue "« Ventilation en pression positive continue » sur Wikipédia") facilite la respiration nocturne en augmentant la pression
de l'air qui entre dans le système respiratoire. L'utilisateur porte un masque relié à la machine. La pression exercée par la machine est adaptée en fonction du débit d'air mesuré. Lors des expirations, la pression diminue pour laisser l'air sortir facilement.
Lorsque la respiration de l'utilisateur se met en pause pendant quelques instants, la
pression envoyée par la machine augmente dans le but de déboucher les voies respiratoires obstruées.

La machine stocke des données concernant le sommeil de l'utilisateur sur une carte mémoire. Elle dispose également d'un modem intégré permettant la télétransmission des données afin que la thérapie du sommeil puisse être supervisée à distance par du personnel médical pouvant recevoir des alertes en cas de gros changement dans la respiration de leur patient.

### Méthode de mesure

La machine de traitement de l'apnée du sommeil est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### D'après les indications du fabricant

#### L'étiquette

L'étiquette sous la machine nous apprend très peu de choses sur sa consommation :  
{% image "./images/machine-apnee-sommeil-etiquette.jpg" "TODO" "500w" 500 %}

On a une indication de tension — 24 V — mais aucune indication de puissance.

#### L'adaptateur secteur

L'étiquette sous l'adaptateur secteur révèle plus d'informations :

{% image "./images/machine-apnee-sommeil-transfo.jpg" "TODO" "300w" 300 %}

« AC INPUT 100-240V-2-1A » nous indique que l'adaptateur secteur peut en entrée recevoir un courant alternatif jusqu'à 2 ampères à 100 volts (soit {{ 200 | W }}) ou 1 ampère à 240 volts (soit {{ 240 | W }}).

Ces valeurs semblent excessivement élevées compte tenu des valeurs de sortie : « DC OUTPUT 24V 2.5A », cela correspond à un courant continu d'une puissance maximale de {{ 2.5 | times: 24 | W }}.

#### La documentation commerciale

La brochure commerciale du fabricant nous donne plus d'indications :  
{% image "./images/machine-apnee-sommeil-caracteristiques.png" "TODO" "500w" 500 %}

Une consommation de 0,16 ampères en fonctionnement et 0,035 ampères en veille pour une tension de 240 volts, cela correspond à {{ 0.16 | times: 240 | W }} en fonctionnement, et {{ 0.035 | times: 240 | W }} en veille. Les valeurs de 0,36 ampères et 0,061 ampères à 100 volts correspondent à {{ 0.36 | times: 100 | W }} en fonctionnement et {{ 0.061 | times: 100 | W }} en veille.

Une fois qu'on a lu tout ça... on est bien perplexe. 240, 60, 38 ou 36 watts ? Combien consomme réellement cette machine en fonctionnement ? Mesurons !

### Premier test

Tout d'abord, nous avons effectué un test initial pour vérifier le fonctionnement :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Test initial","range":"109500m601480"}' %}

Lors du tout premier démarrage, nous pouvons observer un gros pic de consommation, probablement car l'adaptateur secteur devait charger des condensateurs qui étaient vides ou quelque chose comme ça…

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Premier démarrage","range":"109500m146190"}' %}

Ensuite, nous observons une consommation d'approximativement 4,6 W qui varie un peu pendant que l'appareil se connecte :

{% image "./images/machine-apnee-sommeil-connect.jpg" "TODO" "500w" 500 %}

Au bout d'un peu plus de deux minutes, la puissance mesurée descend lorsque l'écran se met en veille.

Pour la suite de notre test, l'utilisateur a mis le masque sur son nez et a respiré dedans :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Test du masque pendant environ une minute","range":"258386m264867"}' %}

Nous voyons maintenant que la consommation varie beaucoup plus, avec d'abord une consommation élevée pendant quelques secondes, suivie d'une consommation qui oscille lors de chaque inspiration.

Une fois le masque retiré, la consommation était à nouveau un peu plus élevée pendant
deux minutes avant de revenir à un niveau de base :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Test du masque — arrêt","range":"338187m185066"}' %}

Nous voyons sur ce zoom que la consommation était d'environ 4,4 W avant la mise en veille et est descendue à environ 3,3 W après.

Regardons maintenant la consommation lors des nuits.

### Test en conditions réelles sur 4 nuits

Nous allons ici mesurer la consommation de cette machine pendant plusieurs jours et observer ses comportements.
Les nuits se suivent et ne se ressemblent pas toutes, en particulier en ce qui concerne
la respiration et donc le besoin d'aide à la respiration d'un patient rencontrant
un syndrome d'apnée du sommeil.
Pour ce test, nous avons mesuré la consommation de cette machine pendant quatre nuits.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"4 nuits","range":"3871947m301735375"}' %}

Les quatre nuits que nous avons enregistrées sont toutes différentes les unes des autres.

#### Nuit n°4

Commençons par regarder la quatrième nuit qui est la plus simple :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4","range":"262276355m33898497"}' %}

Cette nuit dure un peu plus de 9h20, on observe une consommation moyenne de {{ 19.0 | W }}, avec une consommation totale de {{ 179 | Wh }} pour la machine pendant cette nuit, mais cette consommation est très variable d'un instant à l'autre.

La consommation médiane est un peu plus faible à {{ 16.3 | W }} et la consommation maximale nettement plus élevée à {{ 56.5 | W }}.

On observe des variations régulières de la consommation et aussi des variations irrégulières.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur 1h30","range":"262276355m5381197"}' %}

Si nous zoomons sur une période d'1h30, nous voyons qu'il y a une alternance régulière entre une consommation médiane d'environ {{ 17 | W }} et une consommation plus élevée d'un peu plus de {{ 35 | W }}.

Je ne sais pas ce qui explique ces augmentations régulières de consommation. Peut-être une réserve de pression qui a besoin d'être reconstituée ? Ou peut-être le réchauffage de l'eau de l'humidificateur ?

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur 20 minutes","range":"270348927m1199730"}' %}

Si nous zoomons à nouveau, nous pouvons voir que l'augmentation de consommation se produit toutes les 15 minutes exactement.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur une période de forte consommation","range":"270397346m156019"}' %}

Si nous zoomons maintenant sur une période où la consommation était forte, nous pouvons
voir que pendant cette période, la consommation était d'environ {{ 34 | W }}, et qu'il y a des variations dans la puissance consommée qui correspondent aux respirations de l'utilisateur.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur une période de faible consommation","range":"270572733m156019"}' %}

Si nous zoomons sur une période de la même durée où la consommation était plus faible, nous observons une consommation d'environ {{ 15.5 | W }} avec des augmentations jusqu'à {{ 18.3 | W }} lors des inspirations.

Voici maintenant un zoom à nouveau sur la même durée mais montrant une irrégularité
de la respiration :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur une période de forte consommation avec irrégularité","range":"265896861m155750"}' %}

Au milieu du graphique, nous voyons un pic qui indique que la machine appliquait une pression nettement supérieure dans les voies respiratoires de l'utilisateur. Après ce pic, nous voyons pendant plusieurs secondes qu'il n'y a pas d'oscillation, ce qui indique probablement que l'utilisateur était en apnée et n'avait plus de mouvement respiratoire.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur une période de faible consommation avec irrégularité","range":"265316060m155788"}' %}

Nous observons ce genre de pic à la fois dans les périodes de forte consommation et
dans les périodes de faible consommation.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°4 — zoom sur d\'autres irrégularités","range":"274286923m539593"}' %}

Nous observons également un autre type d'irrégularité où la pression est augmentée pour une inspiration puis décroît progressivement sur les inspirations qui suivent.
Ces oscillations sont bien visibles sur le graphique.

#### Nuit n°1

Regardons maintenant une autre nuit, la première de l'enregistrement :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°1","range":"5975259m30884039"}' %}

La forme générale est similaire, la principale différence que nous observons est qu'il
y a une pause au milieu de l'enregistrement avec une consommation qui diminue significativement.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°1 — zoom sur 30 minutes incluant un réveil","range":"18200286m1801168"}' %}

Si nous zoomons dessus, nous pouvons deviner que cela correspond à peu près à un réveil
d'environ 15 minutes, potentiellement pour aller aux toilettes.
En dehors de cela, l'enregistrement ressemble énormément à celui que nous avions déjà
analysé.

#### Nuit n°3

Si nous regardons maintenant la troisième nuit de l'enregistrement, nous pouvons observer que les variations entre faible et forte consommation ont complètement disparu :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°3","range":"175984448m33407404"}' %}

Je ne sais pas si c'est dû à une meilleure respiration naturelle de l'utilisateur, un meilleur positionnement du masque, ou un changement dans l'environnement (température de la chambre plus élevée par exemple).

Il reste une consommation de base médiane d'un peu plus de {{ 9 | W }} et nous avons par contre des variations très marquées qui correspondent probablement aux irrégularités de la respiration de l'utilisateur, avec une consommation maximale montant jusqu'à {{ 33.4 | W }}.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°3 — zoom sur 5 minutes régulières","range":"199951652m300990"}' %}

Si nous zoomons sur 5 minutes de respiration régulière, nous voyons vraiment qu'il y
a des oscillations correspondant aux inspirations de l'utilisateur.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°3 — zoom sur 5 minutes avec une irrégularité","range":"199245822m300990"}' %}

En zoomant ailleurs, nous voyons à nouveau une période d'irrégularité avec un pic suivi d'un plateau pendant quelques secondes, correspondant à une apnée du sommeil.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°3 — zoom sur 20 minutes avec nombreuses irrégularités","range":"202427489m1199772"}' %}

Et nous voyons aussi des irrégularités avec des oscillations qui se réduisent, similaires
à ce que nous avons déjà observé sur une nuit précédente.

#### Nuit n°2

Si nous regardons maintenant la deuxième nuit de l'enregistrement, nous avons un mélange de tout ce que nous avons observé jusqu'ici :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°2","range":"93613552m29988988"}' %}

Nous avons d'abord un mouvement régulier répétitif avec des alternances entre faibles et fortes consommations toutes les 15 minutes.
Nous avons une pause probablement pour aller aux toilettes.

Et sur la fin de la nuit, sur la dernière heure, nous voyons un changement de mode
de fonctionnement :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"Nuit n°2 — zoom sur la fin de la nuit","range":"116168391m5428775"}' %}

Le fonctionnement sur les 50 dernières minutes ressemble plus à celui observé dans la nuit numéro 3.

### Consommation en veille

Regardons maintenant la consommation pendant la journée, quand l'appareil n'est pas utilisé.

Voici un premier enregistrement sur lequel nous observons une consommation moyenne de {{ 2.70 | W }} :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"12h en journée (1)","range":"128868716m43196218"}' %}

Sur un deuxième enregistrement, nous observons une consommation moyenne nettement supérieure de {{ 3.34 | W }} :

{% profile "machine-apnee-sommeil.json.gz" '{"name":"12h en journée (2)","range":"45356028m43196218"}' %}


Si nous zoomons, nous pouvons voir sur le premier enregistrement qu'il y a une variation de consommation toutes les 10 secondes, avec probablement de l'électronique qui se réveille pour vérifier quelque chose ou communiquer des informations à distance.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"zoom sur 2 minutes en journée (1)","range":"144985805m121340"}' %}

Et si nous zoomons sur le deuxième enregistrement en journée, nous voyons que les réveils sont beaucoup plus fréquents, se produisant toutes les 2 à 3 secondes, ce qui augmente la consommation moyenne.

{% profile "machine-apnee-sommeil.json.gz" '{"name":"zoom sur 2 minutes en journée (2)","range":"56136007m121212"}' %}

J'imagine que cette consommation plus élevée est due à un logiciel qui mériterait d'être un peu optimisé pour que toutes les opérations soient faites au même moment afin de permettre aux circuits électroniques les plus consommateurs d'énergie (par exemple le modem) de rester en veille plus longtemps.

### Consommation annuelle
{% 
#1 {{ 157 | Wh }} 8h30 moy {{ 18.3 | W }}
#2 {{ 139 | Wh }} 8h19 moy {{ 16.7 | W }}
#3 {{ 86.9 | Wh }} 9h16 moy {{ 9.37 | W }}
#4 {{ 179 | Wh }} 9h24 moy {{ 19.0 | W }}
%}

La consommation mesurée pour une nuit varie de {{ 86.9 | Wh€ }} à {{ 179 | Wh€ }}, avec une puissance moyenne mesurée entre {{ 9.37 | W }} et {{ 19.0 | W }}, ce qui correspond à une consommation annuelle comprise entre {{ 86.9 | Wh€PerYear }} et {{ 179 | Wh€PerYear }}.

La puissance moyenne mesurée en veille varie de {{ 2.70 | W }} à {{ 3.34 | W }}.
Si l'appareil reste en veille 16 heures par jour (ce qui suppose une nuit de 8 heures), cela correspond à une consommation journalière comprise entre {{ 2.70 | times: 16 | Wh€ }} et {{ 3.34 | times: 16 | Wh€ }}, soit {{ 2.70 | times: 16 | Wh€PerYear }} à {{ 3.34 | times: 16 | Wh€PerYear }} par an.

En supposant que la machine reste branchée tout le temps, la consommation annuelle totale sera comprise entre {{ 2.70 | times: 16 | plus: 86.9 | Wh€PerYear }} et {{ 3.34 | times: 16 | plus: 179 | Wh€PerYear }}.

{%
#nuit :   31,7 kWh (7,99 €) et 65,4 kWh
#veille : 15,8 kWh (3,97 €) à 19,5 kWh
#total :  47,5 kWh (11,96 €) et 84,9 kWh
%}

La consommation en veille représente entre {{ 15.8 | percent: 81.2 }} et {{ 19.5 | percent: 51.2 }} du total. C'est beaucoup et débrancher l'appareil lorsqu'il est inutilisé pourrait être une bonne idée si c'est facile.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette machine de ventilation en pression positive continue, on pourrait :
- utiliser les données enregistrées sur la carte mémoire de l'appareil pour comprendre quels types d'anomalies de la respiration ont été rencontrées pendant la nuit et les associer aux irrégularités observées sur la consommation mesurée ;
- mesurer la consommation avec un wattmètre ayant un taux d'échantillonnage plus élevé, pour voir plus distinctement chaque inspiration et expiration.
- mesurer la consommation pendant des nuits avec des conditions variées (basses température, canicule, rhume, …) pour observer si des variations significatives de consommation sont visibles.
{% endplusloin %}
