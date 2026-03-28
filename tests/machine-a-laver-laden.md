---
layout: test-layout.njk
title: une machine à laver Laden de 20 ans
img: machine-a-laver-laden.jpg
date: 2026-03-28
tags: ['test']
---

Cette machine à laver a été achetée neuve il y a une vingtaine d'années, lorsque les études m'ont éloigné de chez mes parents. Elle fonctionne encore ! Ses performances énergétiques sont-elles très différentes de celles des {% test machine-a-laver modèles plus récents %} ?
<!-- excerpt -->

{% tldr %}
- La consommation annuelle sera comprise entre {{ 541 | times: 50 | Wh€ }} pour 50 lessives par an et {{ 541 | Wh€PerYear }} pour une utilisation quotidienne.
- Une lessive sur le programme court à 40°C consomme {{ 541 | Wh€ }}, dont {{ 408 | percent: 541 }} pour le seul chauffage de l'eau.
- Malgré ses 20 ans, cette machine n'a pas à rougir face aux modèles récents, et sa longévité exceptionnelle ne justifie pas un remplacement anticipé.
{% endtldr %}

## Le matériel

{% intro "machine-a-laver-laden.jpg" "Machine à laver Laden EV 1089, 5 kg" %}

C'est un modèle à ouverture par le dessus, de marque [Laden](https://fr.wikipedia.org/wiki/Laden_(marque) "« Laden » sur Wikipédia"), la marque d'entrée de gamme du groupe [Whirlpool](https://fr.wikipedia.org/wiki/Whirlpool_(entreprise) "« Whirlpool » sur Wikipédia"), avec une capacité de 5 kg et un essorage à maximum 1000 tr/min. Le programmateur est encore mécanique sur ce modèle : pas d'écran, pas d'électronique complexe.

Les principaux consommateurs d'énergie sont la résistance pour chauffer l'eau et le moteur pour la rotation du tambour. On s'attend à trouver également la consommation d'une pompe de vidange, d'une électrovanne pour l'arrivée d'eau, et du petit moteur qui entraîne le programmateur mécanique.

J'ai déjà testé {% test machine-a-laver une machine à laver Samsung de 7 kg %} et {% test machine-a-laver-miele une Miele W1 de 8 kg %}. Ce test permettra de voir comment une machine beaucoup plus ancienne et plus petite se compare.

{% endintro %}

Le bandeau de commande indique « *Capacité variable automatique* » et « *class AA* » (l'échelle des classes énergétiques a probablement changé depuis 2004). On y trouve un sélecteur de programme rotatif, un sélecteur de température (de Froid à 90°C, avec 40°C en vert pour l'usage quotidien), et un sélecteur de vitesse d'essorage (jusqu'à 1000 tr/min) :

{% image "./images/machine-a-laver-laden-bandeau.jpg" "Bandeau de commande de la Laden EV 1089 : sélecteurs de programme, température et essorage" "700w" 700 %}

## Consommation

### Méthode de mesure

La machine à laver est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Informations fournies par le fabricant

L'étiquette collée à l'arrière de la machine indique ses caractéristiques techniques :

{% image "./images/machine-a-laver-laden-etiquette.jpg" "Étiquette technique de la Laden EV 1089" "500w" 500 %}
{% comment %}Etiquette collée sur l'arrière de la machine, donnant quelques infos techniques

LADEN
Model: EV1089 5kg
230V ~ 50 Hz
résistance 10A
2300W
MADE BY WHIRLPOOL
IPX4{% endcomment %}

On y lit « *230V ~ 50 Hz* », « *résistance 10A* » et « *2300W* ». La puissance nominale de {{ 2300 | W }} correspond à la résistance de chauffage de l'eau.

### Lessive cycle court

Le programme « *court* » se situe entre les programmes « *Coton / Couleur* » et « *Quotidien 40°* » sur le sélecteur rotatif, ce qui laisse penser qu'il s'agit d'un cycle comparable au programme « *Quotidien* » de la {% test machine-a-laver Samsung %}. La température est réglée à 40°C et la vitesse d'essorage à 900 tr/min.

Le cycle dure environ 1h20 (l'enregistrement inclut aussi 5 minutes d'attente de l'utilisateur en fin de cycle), ce qui est proche des 1h13 mesurées sur la Samsung pour son programme « *Quotidien* » à 40°C :

{% profile "machine-a-laver-laden.json.gz" '{"name": "lessive cycle court", "range": "175196m5227176"}' %}
{% comment %}draft: enregistrement de consommation d'un cycle court. Le programme "court" est entre "Coton / Couleur" et "Quotidien 40° 7/7k", pour le test on peut supposer que le programme court est comparable au programme quotidien de la machine à laver samsung testée précédemment.

Sur le graphique du profil, on voit très clairement qu'il y a une consommation beaucoup plus élevée pendant une petite durée proche du début du cycle, pour le chauffage de l'eau.{% endcomment %}

On reconnaît immédiatement une phase de consommation très élevée au début du cycle, correspondant au chauffage de l'eau. Le reste du cycle est dominé par les rotations du tambour alternant avec des arrêts. On distingue ensuite 3 rinçages successifs, puis un essorage final. La consommation totale est de {{ 541 | Wh€ }}. La puissance médiane de {{ 114 | W }} reflète le fait que la machine passe la majorité du temps à faire tourner le tambour, bien loin de la puissance maximale de {{ 2360 | W }} atteinte pendant le chauffage.

Regardons chaque phase en détail.

#### Démarrage

Au début du cycle, la machine se remplit d'eau tout en faisant tourner le tambour par intermittence pendant environ 4 minutes et demie :

{% profile "machine-a-laver-laden.json.gz" '{"name": "démarrage", "range": "175196m271209"}' %}
{% comment %}draft: zoom sur le démarrage. Alternance entre des périodes de consommation entre 4 et 5W pendant 3-4s et des consommations plus marquées pendant des périodes d'une 10aine de seconde, avec la conso de ces périodes qui augmente progressivement, commençant à environ 90W pour aller jusqu'à plus de 200W.
On peut supposer que c'est une alternance entre des rotations du tambour, et de bref arrêt, avec la masse du contenu du tambour qui augmente progressivement alors que le tambour se remplit d'eau et que le linge devient de plus en plus mouillé.{% endcomment %}

On observe une alternance régulière entre des périodes de consommation de {{ 4 | W }} à {{ 5 | W }} (pendant 3-4 secondes, tambour à l'arrêt) et des périodes de consommation plus soutenue (une dizaine de secondes) qui augmentent progressivement, commençant à environ {{ 90 | W }} pour atteindre plus de {{ 200 | W }}. On peut supposer que la puissance nécessaire pour faire tourner le tambour augmente au fur et à mesure que le linge s'alourdit en absorbant l'eau qui remplit le tambour.

Cette phase de démarrage ne consomme que {{ 8.56 | Wh }}, soit {{ 8.56 | percent: 541 }} du total.

#### Chauffage de l'eau

La phase de chauffage qui suit est la plus gourmande en énergie :

{% profile "machine-a-laver-laden.json.gz" '{"name": "chauffage", "range": "446405m675685"}' %}
{% comment %}draft: pendant la période de chauffe qui suit, on voit encore les alternances entre rotation du tambour ou arrêt de la rotation, mais ce qui domine est la consommation du la résistance qui chauffe l'eau pour atteindre la température de consigne (40° ici).{% endcomment %}

La résistance fonctionne quasiment en continu pendant un peu plus de 11 minutes, avec une puissance médiane de {{ 2230 | W }}. C'est légèrement inférieur à la puissance nominale de {{ 2300 | W }} indiquée sur l'étiquette, ce qui s'explique par la tension du secteur pendant la mesure, qui a varié entre 220 et 230 V, donc légèrement en dessous de la tension nominale de 230 V. On observe bien les 10 A annoncés. On distingue encore les petites alternances de rotation du tambour, mais elles sont dominées par la consommation de la résistance.

La consommation pendant cette phase est de {{ 408 | Wh }}, soit {{ 408 | percent: 541 }} de la consommation totale du cycle. C'est le même constat que sur les autres machines à laver testées : le chauffage de l'eau domine très largement la facture.

Pour la {% test machine-a-laver Samsung de 7 kg %}, le chauffage représentait {{ 618 | percent: 736 }} de la consommation à 40°C. Pour la {% test machine-a-laver-miele Miele de 8 kg %}, c'était {{ 671 | percent: 1040 }} sur le programme Coton 40°C.

#### Après le chauffage

Une fois l'eau chaude, la machine entre dans une longue phase de lavage mécanique, rinçages et essorage :

{% profile "machine-a-laver-laden.json.gz" '{"name": "reste du cycle après chauffage", "range": "1122089m4280284"}' %}
{% comment %}draft: Sur le reste du cycle après la période de chauffage, la forme du graphique nous permet d'identifier clairement ce qui se passe :
- rotations et arrêts pendant environ 16 minutes
A la fin, on voit un essorage avec une rotation en continu du tambour.
Entre ces deux périodes faciles à identifier, on voit un motif qui se répète, qui correspond très vraisemblablement à 3 rinçages successifs{% endcomment %}

Cette partie dure 1h11 et ne consomme que {{ 125 | Wh }}, soit {{ 125 | percent: 541 }} de la consommation totale. La forme du graphique permet d'identifier clairement les différentes étapes :
1. Des rotations et arrêts pendant environ 16 minutes (le lavage proprement dit) ;
2. Un motif qui se répète trois fois, correspondant très vraisemblablement à 3 rinçages successifs ;
3. Un essorage final avec rotation continue du tambour ;
4. Une brève période d'attente en fin de cycle.

On remarque un pic isolé dépassant {{ 900 | W }} au début de la phase de lavage, peut-être une brève réactivation de la résistance si le thermostat a détecté une baisse de température.

#### Rotations et arrêts pendant le lavage

Pendant la phase de lavage après le chauffage, le tambour alterne entre rotations et arrêts :

{% profile "machine-a-laver-laden.json.gz" '{"name": "rotations et arrêts", "range": "1435384m643525"}' %}
{% comment %}draft: zoom sur 10 minutes de rotations et arrêts pendant le lavage après la fin du chauffage. Le zoom ne montre pas la totalité des 16 minutes car il y avait un pic de 2s avec une consommation beaucoup plus élevée de plus de 900W qui aurait écrasé le graphique. Peut-être une brève réactivation de la résistance de chauffe si le thermostat a détecté une baisse de température ?{% endcomment %}

Ce zoom montre environ 10 minutes sur les 16 que dure cette phase (le pic à plus de {{ 900 | W }} a été exclu pour ne pas écraser le graphique). La puissance médiane est de {{ 168 | W }} pendant les rotations, avec des chutes à quelques watts lors des arrêts. Sur la dernière minute, on observe un motif différent : la puissance des rotations diminue progressivement et la consommation entre les rotations augmente, signe d'une vidange avant le premier rinçage.

#### Un rinçage

Chaque rinçage dure environ 11 minutes et consomme {{ 18.8 | Wh }} :

{% profile "machine-a-laver-laden.json.gz" '{"name": "rinçage", "range": "3720777m684799"}' %}
{% comment %}draft: Zoom sur un rinçage : on voit comme au début du cycle les rotations de tambour dont la puissance consommée augmente au fur et à mesure que le linge devient de plus en plus mouillée. Pendant quelques minutes, la consommation de la rotation du tambour est stable. Puis elle commence à diminuer lorsque l'eau s'évacue, avec une forme un peu symétrique de ce qu'on voyait au début lorsque l'eau était ajoutée. On voit plusieurs périodes de rotation continue du tambour à faible vitesse, puis à des vitesses croissantes à la fin (on voit 4 paliers). Il y a des pics de démarrage lors des accélérations sur la fin. Il y a aussi 2 pics de consommation lors des arrêts de rotation pour lesquels je n'ai pas d'explication.{% endcomment %}

La forme du profil est intéressante : on retrouve comme au début du cycle une augmentation progressive de la puissance au fur et à mesure que le tambour se remplit d'eau et que le linge s'alourdit. Pendant quelques minutes, la consommation de rotation est stable. Puis elle diminue lorsque l'eau s'évacue, avec une forme presque symétrique.

On remarque que pendant la phase d'évacuation de l'eau, la consommation entre les rotations du tambour est de 18 à {{ 30 | W }}, bien supérieure aux {{ 4 | W }} à {{ 5 | W }} observés lors des pauses de rotation le reste du temps. C'est probablement la pompe de vidange qui fonctionne en parallèle.

À la fin, on observe 4 paliers de puissance croissante, correspondant probablement à des vitesses de rotation croissantes, pour un essorage intermédiaire, avec des pics de démarrage lors des accélérations.

Avec 3 rinçages, cela représente environ {{ 18.8 | times: 3 | Wh }} au total.

#### Essorage final

L'essorage final dure un peu plus de 5 minutes, avec la vitesse réglée à 900 tr/min :

{% profile "machine-a-laver-laden.json.gz" '{"name": "essorage", "range": "4627389m323287"}' %}
{% comment %}draft: zoom sur l'essorage final : conso plus élevée au démarrage, probablement car on fait tourner vite un tambour très lourd, mais il se vide rapidement au moins un peu. Ensuite accélération progressive avec augmentation progressive de la puissance mesurée de 230 à 240W, puis un autre petit pic qui correspond à l'accélération pour atteindre la vitesse maximale demandée (ici seulement 900 tr/min). Cette vitesse maximale est maintenue pendant 3min50.{% endcomment %}

On observe un pic au démarrage ({{ 476 | W }}), probablement dû à l'inertie d'un tambour encore lourd et mouillé. La puissance se stabilise ensuite autour de {{ 230 | W }} à {{ 240 | W }} pendant l'accélération progressive, puis un second pic correspond à l'accélération finale pour atteindre 900 tr/min. La vitesse maximale est maintenue pendant environ 3 minutes 50.

L'essorage consomme {{ 22.7 | Wh }}, soit {{ 22.7 | percent: 541 }} de la consommation totale du cycle.

#### Fin du cycle

Après l'essorage, la machine effectue quelques dernières rotations du tambour, suivies d'une période d'environ une minute consommant {{ 20 | W }}. Cette consommation correspond probablement à une dernière activation de la pompe de vidange pour évacuer l'eau résiduelle — on avait observé une consommation similaire (18 à {{ 30 | W }}) pendant les phases de vidange des rinçages. Puis la machine attend que l'utilisateur vienne l'éteindre :

{% profile "machine-a-laver-laden.json.gz" '{"name": "fin du cycle", "range": "4950676m451697"}' %}
{% comment %}draft: zoom sur la fin du cycle. Il semble y avoir 4 rotations du tambour, qui est maintenant plus léger après l'essorage, suivi d'une période d'une minute consommant environ 20W. A la fin il doit y avoir une sonnerie indiquant à l'utilisateur que la lessive est terminée, mais 20W me semble beaucoup pour ça.
Pendant les 5 dernières minutes il ne se passe rien, on attend uniquement que l'utilisateur vienne arrêter la machine (par un appui sur le bouton marche arrêt) et récupérer son linge. La conso résiduelle est probablement le témoin lumineux.{% endcomment %}

Pendant les 5 dernières minutes, il ne se passe rien : la machine attend simplement qu'on appuie sur le bouton marche/arrêt. La consommation résiduelle d'environ {{ 1.7 | W }} correspond probablement au voyant lumineux qui reste allumé :

{% profile "machine-a-laver-laden.json.gz" '{"name": "attente de l\'arrêt par l\'utilisateur", "range": "5100395m298002"}' %}
{% comment %}draft: zoom sur le temps d'attente d'arrêt par l'utilisateur{% endcomment %}

### Machine éteinte

Après avoir appuyé sur le bouton marche/arrêt pour éteindre la machine, on constate que la consommation n'est pas totalement nulle :

{% profile "machine-a-laver-laden.json.gz" '{"name": "éteinte pendant 1h", "range": "5434416m3617532"}' %}
{% comment %}draft: après l'arrêt par l'utilisateur, on constate que la consommation n'est pas nulle. Elle est cependant très faible, tellement faible que la prise connectée n'est pas capable de la mesurer précisément et alterne entre 0,1W et 0W. La moyenne reste cependant pertinente.{% endcomment %}

La consommation est cependant tellement faible que la prise connectée n'est pas capable de la mesurer précisément : elle alterne entre 0 et {{ 0.1 | W }}. La moyenne sur une heure est de {{ 0.0113 | W }}, ce qui donnerait {{ 0.0113 | W€PerYear }} par an si la machine restait branchée en permanence. C'est négligeable.

On pourrait s'attendre à une consommation strictement nulle avec un interrupteur mécanique, mais il y a peut-être un composant qui reste sous tension même à l'arrêt, comme une électrovanne ou un capteur de niveau d'eau pour détecter une éventuelle fuite. En pratique, c'est tellement faible que ce n'est pas la peine de débrancher la machine.

### Coût d'usage

Le coût électrique d'une lessive sur le programme court à 40°C est de {{ 541 | Wh€ }}.

Pour une personne seule réalisant 50 lessives par an, la consommation annuelle sera de {{ 541 | times: 50 | Wh€ }}. Pour une famille utilisant la machine tous les jours, cela représente {{ 541 | Wh€PerYear }} par an.

La {% test machine-a-laver Samsung de 7 kg %} consomme {{ 736 | Wh }} sur son programme « *Quotidien* » à 40°C, et la {% test machine-a-laver-miele Miele W1 de 8 kg %} consomme {{ 1040 | Wh }} sur le programme Coton 40°C à pleine charge. Les {{ 541 | Wh }} de la Laden semblent donc favorables, mais attention : la Laden n'a qu'une capacité de 5 kg contre 7 kg pour la Samsung et 8 kg pour la Miele. Une comparaison à charge identique pourrait donner des résultats différents.

De plus, le programme testé ici est un programme « *court* », possiblement moins exigeant qu'un programme coton complet. Et la Miele à charge légère ne consommait que {{ 218 | Wh }}, bien moins que les {{ 541 | Wh }} de la Laden.

### Faut-il la remplacer avant sa fin de vie naturelle ?

La lessive la moins consommatrice que nous ayons mesurée jusqu'ici est celle de la {% test machine-a-laver-miele Miele %} à charge légère, avec {{ 218 | Wh }}. La différence par cycle est de {{ 541 | minus: 218 | Wh€ }}. Sur 100 lessives par an, l'économie serait de {{ 541 | minus: 218 | times: 100 | Wh€ }}. Mais la Miele est une machine haut de gamme à plus de {{ 1000 | € }} : on ne peut pas espérer les mêmes performances d'une machine d'entrée de gamme.

Par ailleurs, cette vieille Laden tient depuis près de 20 ans. Pas sûr que les modèles récents aient une telle longévité ! On va donc conseiller de faire durer ce vieux modèle encore quelques années.

### Conseils pour l'autoconsommation photovoltaïque

La résistance de chauffage consomme jusqu'à {{ 2360 | W }}, ce qui est proche de la limite d'une installation photovoltaïque domestique standard de 3 kWc. Mais cette forte consommation ne dure qu'une dizaine de minutes, et ne commence qu'environ 5 minutes après le démarrage de la machine.

Pour maximiser l'autoconsommation, il est souhaitable de lancer la machine en milieu de journée ensoleillée. Si le ciel est variable, essayer de choisir un moment où l'on s'attend à une éclaircie d'un quart d'heure : les 5 premières minutes de remplissage ne consomment presque rien, et les 11 minutes de chauffage qui suivent seront couvertes par la production solaire.

Pendant le reste du cycle (plus d'une heure), la consommation ne dépasse pas {{ 250 | W }} : largement à la portée des panneaux même par temps couvert.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette machine à laver Laden, on pourrait :
- tester les différents programmes disponibles (Coton, Quotidien 40°, etc.) pour comparer leur consommation ;
- mesurer l'impact des différentes températures (30°C, 60°C, 90°C) comme nous l'avions fait pour la {% test machine-a-laver Samsung %} ;
- vérifier si la « *capacité variable automatique* » annoncée sur le bandeau fonctionne réellement, et comparer son efficacité avec celle de la {% test machine-a-laver-miele Miele %} qui ajuste aussi sa consommation selon la charge ;
- comparer l'essorage à 1000 tr/min (vitesse maximale) avec des vitesses inférieures ;
- mesurer la consommation d'eau, qui est probablement plus faible que sur les modèles récents de plus grande capacité.
{% endplusloin %}
