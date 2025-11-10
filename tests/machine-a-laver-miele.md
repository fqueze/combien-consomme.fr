---
layout: test-layout.njk
title: une machine à laver Miele récente
img: machine-a-laver-miele-mini.jpg
date: 2025-11-10
tags: ['test']
---

Mamie possède une machine à laver haut de gamme de la marque Miele, avec une capacité de 8kg mais disposant d'un système de « capacité variable automatique ». À quoi ressemble sa consommation ?

<!-- excerpt -->

{% tldr %}
- Une lessive de 8kg avec le programme Coton 40°C consomme {{ 1040 | Wh€ }}.
- Le chauffage de l'eau représente plus de deux tiers de la consommation totale.
- Avec une charge légère (quelques vêtements), la consommation descend à {{ 218 | Wh€ }}, soit {{ 218 | percentLess: 1040 }} de moins.
- Utilisée 2 fois par semaine, cette machine consommera {{ 1040 | times: 2 | times: 52 | Wh€ }} par an.
- La consommation en veille ({{ 0.111 | W }}) représente {{ 972.36 | percent: 108160 }} de la consommation annuelle totale.
{% endtldr %}

{% comment %}
Notes from draft:
Une machine à laver haut de gamme pouvant laver jusqu'à 8kg de linge, mais disposant d'un système de "capacité variable automatique"

La page "Lavage écologique" du manuel indique :
"Consommation d'énergie et d'eau

- Utilisez la charge maximale de chaque programme.
La consommation d'énergie et d'eau est plus avantageuse en charge pleine.

- Si vous avez peu de linge à laver, la capacité variable automatique du lave-linge réduit la consommation en eau et la consommation électrique."

"Pour économiser de l'énergie lors du séchage, sélectionnez la vitesse d'es- sorage la plus élevée lors du lavage."

La page caractéristiques techniques du manuel indique :
Classe d'efficacité énergétique
A+++ (la plus grande efficacité) à D (la plus faible efficacité)
A+++
Consommation énergétique annuelle (AEc)2
177 kWh par an
consommation d'énergie du programme «coton» standard à 60 °C (pleine charge)
0,90 kWh
consommation d'énergie du programme «coton» standard à 60 °C (demi-charge)
0,88 kWh
consommation d'énergie du programme «coton» standard à 40 °C (demi-charge)
0,53 kWh
Consommation énergétique pondérée à l'arrêt (Po)
0,30 W
Consommation d'énergie pondérée en mode laissé sur marche (Pl)
0,30 W
{% endcomment %}

## Le matériel

{% intro "machine-a-laver-miele.jpg" "Machine à laver Miele W1 Series 120" %}

Il s'agit d'une machine à laver [Miele](https://fr.wikipedia.org/wiki/Miele "Page « Miele » sur Wikipédia") W1 Series 120, d'une capacité de 8kg.

{% image "./images/machine-a-laver-miele-marque-et-modele.jpg" "Marque et modèle : Miele W1 8kg Series 120" "250w" 250 %}
{% comment %}Miele
W1
8kg
Series 120{% endcomment %}

C'est une machine haut de gamme classée A+++ pour l'efficacité énergétique, avec un système de « capacité variable automatique » qui adapte la consommation d'eau et d'énergie à la quantité de linge réellement chargée.

### Méthode de mesure

La machine à laver Miele est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

{% image "./images/machine-a-laver-miele-etiquette.jpg" "Étiquette technique de la machine" "500w" 500 %}
{% comment %}Miele Made in Germany
Mod. WVDD 025
Type: HW20
 2,1-2,4 kW
10A{% endcomment %}

L'étiquette technique indique une puissance maximale de {{ 2100 | W }} à {{ 2400 | W }}, et un courant de 10 A.

#### Manuel

Le manuel indique pour la machine les caractéristiques suivantes :

- **Classe d'efficacité énergétique :** A+++ (la plus grande efficacité)
- **Consommation énergétique annuelle :** 177 kWh par an
- **Programme Coton 60°C pleine charge :** 900 Wh
- **Programme Coton 60°C demi-charge :** 880 Wh
- **Programme Coton 40°C demi-charge :** 530 Wh
- **Consommation en veille :** 0,30 W

Le manuel fournit également plusieurs conseils pour économiser l'énergie :

> *Utilisez la charge maximale de chaque programme. La consommation d'énergie et d'eau est plus avantageuse en charge pleine.*
>
> *Si vous avez peu de linge à laver, la capacité variable automatique du lave-linge réduit la consommation en eau et la consommation électrique.*
>
> *Pour économiser de l'énergie lors du séchage, sélectionnez la vitesse d'essorage la plus élevée lors du lavage.*

En effet, un essorage plus efficace réduit considérablement la consommation d'{% test seche-linge-a-pompe-a-chaleur un sèche-linge %}, en particulier d'{% test seche-linge-a-evacuation un modèle ancien à évacuation %}.

Le programme « Coton » est présenté comme le plus efficace : « *Ces réglages sont les plus efficaces quant à la consommation d'énergie et d'eau pour le lavage du linge en coton.* »

{% image "./images/machine-a-laver-miele-programme.jpg" "Programme Coton 40° avec essorage à 1400 tr/min" "800w" 800 %}
{% comment %}programme "Coton" à 40° avec essorage à 1400 tr/min (le maximum), démarrage différé de 2h{% endcomment %}

La machine dispose d'un afficheur digital qui indique la température, la vitesse d'essorage, et le temps restant. Elle permet aussi un départ différé, ce qui est pratique pour faire tourner la machine pendant les heures creuses du tarif de nuit.

Nous allons donc tester cette machine avec le programme « Coton » à 40°C.

### Lessive Coton 40°C, pleine charge

Pour cette première lessive, la machine était pleine du linge de toute la famille. Un départ différé de 2h a été programmé pour que la machine fonctionne pendant les heures creuses du tarif de nuit, sans avoir à attendre pour aller se coucher.

{% profile "machine-a-laver-miele.json.gz" '{"name": "Lessive 40° Coton avec départ différé de 2h", "range": "1418377m19606244"}' %}
{% comment %}draft: la machine était pleine du linge de toute la famille. Départ différé de 2h pour fonctionner pendant les heures du courant de nuit, mais sans devoir attendre pour aller se coucher.{% endcomment %}

On observe sur le profil de consommation une période d'attente de 2 heures avec une consommation très faible, puis le cycle de lavage proprement dit qui dure environ 3h30 (dont 30 minutes d'« Infroissable », une fonction qui fait tourner le tambour de temps en temps pour éviter que le linge ne se froisse). La consommation totale sur {{ 19606 | s }} est de {{ 1050 | Wh€ }}.

Le pic de puissance atteint {{ 2206 | W }}, ce qui correspond au chauffage de l'eau par résistance électrique. Cette puissance est cohérente avec la plage annoncée sur l'étiquette technique ({{ 2100 | W }} à {{ 2400 | W }}).

#### Le départ différé

Pendant les 2 heures d'attente avant le démarrage du cycle, la consommation est stable autour de {{ 3.7 | W }} :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Deux premières heures avant le départ du cycle", "range": "1418377m7225393"}' %}
{% comment %}draft: conso stable pendant les 2h d'attente mais 2 pics, le 2e au bout de 10 minutes. Le manuel dit "Mise en veille bandeau de commande
Pour des raisons d'économie d'énergie, l'affichage de l'heure et les touches sensitives s'assombrissent au bout de 10 minutes et la touche sensitive Départ/Arrêt clignote." Puissance moyenne avant le pic: 3,7W, après, 3,49W. Belle économie d'énergie ! (ironique)

Le manuel indique aussi "La luminosité des touches sensitives atténuées dans le bandeau de commande peut être réglée selon sept niveaux." 1 étant le plus sombre, 7 le plus lumineux, et le réglage en usine est 3. L'économie serait donc probablement plus notable si la luminosité de l'afficheur était au maximum.{% endcomment %}

On observe un petit pic au bout de 10 minutes : c'est le moment où le manuel indique que « l'affichage de l'heure et les touches sensitives s'assombrissent au bout de 10 minutes » pour économiser l'énergie :

{% image "./images/machine-a-laver-miele-afficheur.jpg" "Afficheur pendant l'attente du départ différé" "800w" 800 %}
{% comment %}L'afficheur montre la température, la vitesse d'essorage, et le temps dans lequel le programme démarrera (ici 1h59){% endcomment %}

Après cet assombrissement, la puissance moyenne passe de {{ 3.7 | W }} à {{ 3.49 | W }}. Sur les 1h50 restantes de la période d'attente, cette « économie d'énergie » représente... {{ 0.21 | times: 1.83 | Wh }} économisés. Il faudrait {{ 0.21 | times: 1.83 | countPer€: 0.01 }} lessives différées de 2h pour économiser un centime !

Mais le manuel indique que la luminosité de l'afficheur peut être réglée sur 7 niveaux, et que le réglage d'usine est 3. L'économie serait probablement plus notable si la luminosité était réglée au maximum.

#### Le cycle de lavage complet

Le cycle de lavage seul (sans la période d'attente) dure {{ 12381 | s }} pour une consommation de {{ 1040 | Wh€ }} :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Lessive 40° Coton", "range": "8643770m12380852"}' %}
{% comment %}draft: lessive qui mérite d'être décomposée en plusieurs phases (démarrage, chauffage de l'eau permanent puis intermittent, rotation du tambour, rinçage, essorage, vidange.

Le manuel indique pour ce programme : "Coton  60 °C – 40 °C 8,0 kg maximum
Textiles
Linge en coton normalement sale
Conseil
– Ces réglages sont les plus efficaces quant à la consommation d'énergie et d'eau pour le lavage du linge en coton."{% endcomment %}

On peut identifier plusieurs phases distinctes :
- Le **démarrage** avec le remplissage de la cuve
- Le **lavage avec chauffage** de l'eau, qui représente la plus grosse partie de la consommation
- Le **rinçage** avec plusieurs cycles
- L'**essorage** progressif
- La fonction **Infroissable** qui fait tourner le tambour pendant 30 minutes après la fin du cycle

La puissance maximale de {{ 2206 | W }} est atteinte pendant le chauffage de l'eau.

### En détail

#### Le début du cycle

Au démarrage du cycle, on observe une consommation modérée avec des variations régulières :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Début du cycle", "range": "8643770m539145"}' %}
{% comment %}draft: probablement remplissage de la cuve avec rotation intermittentes du tambour{% endcomment %}

Ces variations régulières toutes les 30 secondes environ correspondent probablement aux changements de sens de rotation du tambour pendant le remplissage de la cuve et l'humidification du linge. On observe aussi une augmentation progressive de la consommation au fil de cette phase : l'effort du moteur augmente probablement à mesure que le linge devient plus lourd en s'humidifiant.

Cette phase de démarrage dure environ 9 minutes et consomme {{ 6.46 | Wh }}, avec une puissance moyenne de {{ 43.2 | W }}. Les pics ponctuels atteignent {{ 178 | W }}, correspondant aux redémarrages du moteur du tambour.

#### Le lavage avec chauffage de l'eau

La phase de lavage avec chauffage dure {{ 6128 | s }} et consomme {{ 916 | Wh€ }}, soit {{ 916 | percent: 1040 }} de la consommation totale du cycle :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Lavage avec chauffage", "range": "9182914m6127583"}' %}
{% comment %}draft: chauffage ininterrompu d'abord pendant une longue période puis chauffage à nouveau pendant de brèves périodes, probablement l'effet d'un thermostat{% endcomment %}

C'est de loin la phase la plus consommatrice !

On observe d'abord une longue période de chauffage ininterrompu, puis le chauffage se réactive de manière intermittente pendant de brèves périodes, probablement sous l'effet d'un thermostat qui maintient la température de l'eau à 40°C.

La puissance médiane pendant cette phase est de {{ 91.5 | W }} (correspondant aux périodes où seul le tambour tourne), mais la puissance moyenne est de {{ 538 | W }} à cause des périodes de chauffage à {{ 2206 | W }}.

##### Le chauffage initial

Un zoom sur les premières minutes de chauffage montre une puissance très stable autour de {{ 2110 | W }} :

{% profile "machine-a-laver-miele.json.gz" '{"name": "chauffage initial", "range": "9188987m1147784"}' %}
{% comment %}draft: commenter la puissance stable avec des petites variations régulières toutes les 30s : changement de sens de rotation du tambour ? indiquer que ces quelques minutes consomment une très grosse proportion de la conso totale de la lessive{% endcomment %}

On observe de petites variations régulières toutes les 30 secondes. Ces variations correspondent probablement aux changements de sens de rotation du tambour pendant le lavage.

Cette phase de chauffage initial dure seulement {{ 1148 | s }}, mais elle consomme à elle seule {{ 671 | Wh }}, soit {{ 671 | percent: 1040 }} de l'énergie totale du cycle. On comprend bien pourquoi le fabricant recommande de laver à des températures plus basses pour économiser l'énergie.

##### Une période sans chauffage

Sur une période où le chauffage est arrêté, on voit mieux les variations de puissance liées au fonctionnement du moteur du tambour :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Zoom sur une période sans chauffage du lavage", "range": "13476473m1803660"}' %}
{% comment %}draft: on voit mieux les mêmes variations toutes les 30s, avec des petits pics qui indiquent un redémarrage de moteur électrique.{% endcomment %}

On observe les mêmes variations régulières toutes les 30 secondes, avec des petits pics qui indiquent un redémarrage du moteur électrique pour changer le sens de rotation.

#### Le rinçage

La phase de rinçage dure environ 35 minutes :

{% profile "machine-a-laver-miele.json.gz" '{"name": "rinçage", "range": "15434042m2100267"}' %}
{% comment %}draft: une forme qui se répète 2 fois (double rinçage ?), une période avec une conso assez élevée qui est peut-être un mini essorage, puis une croissance processive de la conso avec des pauses toutes les 30s, probablement rotation de plus en plus vite.{% endcomment %}

On observe une forme qui se répète 2 fois, correspondant probablement à un double rinçage. Au début de chacun des deux rinçages, il y a une période avec une consommation plus élevée qui correspond à un mini-essorage pour évacuer l'eau savonneuse.

Pendant chaque rinçage, on observe une croissance progressive de la consommation avec des pauses toutes les 30 secondes : comme au début du cycle, l'effort du moteur augmente à mesure que le linge s'alourdit en s'humidifiant.

#### L'essorage

L'essorage dure environ 9 minutes :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Essorage", "range": "17727043m539676"}' %}
{% comment %}draft: augmentation progressive de la conso et donc de la vitesse de rotation pour l'essorage, avec des paliers{% endcomment %} On observe une augmentation progressive de la consommation, et donc de la vitesse de rotation du tambour, avec des paliers bien marqués. Le tambour accélère progressivement jusqu'à atteindre la vitesse maximale de 1400 tours par minute pour extraire le maximum d'eau du linge.

#### La fin du cycle et le mode Infroissable

Après l'essorage, le cycle n'est pas encore terminé :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Fin du cycle", "range": "18266718m2757903"}' %}
{% comment %}draft: Les 30 premières minutes correspondent au mode Infroissable. Le manuel dit : "Infroissable
La fonction Infroissable permet de réduire la formation de faux plis une fois le programme terminé.
Le tambour tourne encore pendant
30 minutes après la fin du programme. La porte du lave-linge peut être ouverte à tout moment."

Les 15 dernières minutes ont une consommation stable similaire à celle du départ différé, probablement juste l'électronique et l'afficheur qui restent allumés avec un message indiquant que le programme est terminé. Le manuel dit "à la fin du programme ou de la phase Infroissable, l'affichage de temps et les touches sensitives s'allument pendant 10 minutes."{% endcomment %}

Pendant 30 minutes, le tambour continue de tourner de manière intermittente : c'est la fonction « Infroissable » qui permet de réduire la formation de faux plis. Le manuel indique que « le tambour tourne encore pendant 30 minutes après la fin du programme » et que « la porte du lave-linge peut être ouverte à tout moment ».

On observe pendant cette phase une très faible consommation, avec de petits pics réguliers correspondant aux rotations du tambour.

Après ces 30 minutes, la consommation reste stable autour de {{ 3.5 | W }} pendant quelques minutes. Le manuel précise que « *l'affichage de temps et les touches sensitives s'allument pendant 10 minutes* » à la fin du cycle (mais la mesure montre que c'est plutôt 15 minutes).

#### L'ouverture de la porte

Bien plus tard, lorsque le bouton d'ouverture de porte a été actionné pour récupérer le linge, on observe un petit pic de consommation :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Ouverture de la porte", "range": "30372548m15930"}' %}
{% comment %}draft: bien plus tard lorsque le bouton d'ouverture de porte a été actionné, on observe une petite consommation visible pendant 5 secondes{% endcomment %}

Ce pic dure 5 secondes : c'est l'électronique qui se réactive brièvement lors du déverrouillage de la porte.

### En veille

Alors que la machine semble complètement éteinte (aucun voyant allumé, aucun affichage), la consommation n'est pas nulle :

{% profile "machine-a-laver-miele.json.gz" '{"name": "24h éteinte", "range": "116319310m88089026"}' %}
{% comment %}draft: conso au repos : alors que la machine semble complètement éteinte, la conso n'est pas nulle.{% endcomment %} Sur 24 heures, la machine a consommé {{ 2.73 | Wh }}, soit une puissance moyenne de {{ 0.111 | W }}.

Si la machine reste branchée en permanence, elle consommera {{ 0.111 | W€PerYear }} par an en veille.

Le fabricant annonce dans le manuel une « consommation énergétique pondérée à l'arrêt » de {{ 0.30 | W }}, ce qui est cohérent avec notre mesure de {{ 0.111 | W }}.

La consommation en veille pendant une année complète ({{ 0.111 | times: 24 | times: 365 | Wh }}) représente {{ 0.111 | times: 24 | times: 365 | percent: 1040 }} de la consommation d'une seule lessive pleine charge à 40°C. Pour une utilisation de 2 fois par semaine ({{ 1040 | times: 2 | times: 52 | Wh }} par an), la veille représente {{ 972.36 | percent: 108160 }} de la consommation annuelle totale.

### Comparaison avec une charge légère

Alors qu'habituellement les lessives sont espacées de plusieurs jours, l'apprentissage de la propreté de la petite dernière a entraîné un besoin de relaver une petite quantité de linge plus vite que prévu :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Deuxième lessive 40° Coton différée d\'1h30, moins remplie", "range": "89631952m13562111"}' %}
{% comment %}draft: alors qu'habituellement les lessives sont espacées de plusieurs jours, l'apprentissage de la propreté de la petite dernière a entrainé un besoin de relaver une petite quantité de linge plus vite que prévu. La machine a tourné à nouveau dès le lendemain, avec le même programme (mais différé d'1h30 au lieu de 2h), mais une quantité de linge très légère (juste quelques vêtements de bébé). Cela a probablement nécessité beaucoup moins d'eau, et donc on observe une durée et une consommation électrique réduite.{% endcomment %} La machine a tourné à nouveau dès le lendemain, avec le même programme Coton 40°C, mais avec une charge très légère : juste quelques vêtements de bébé.

#### Le cycle avec charge légère

Avec une charge légère, la durée du cycle est réduite à {{ 8138 | s }} (au lieu de {{ 12381 | s }}), et la consommation tombe à {{ 218 | Wh€ }} :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Deuxième lessive 40° Coton, moins remplie", "range": "95055990m8138326"}' %}
{% comment %}draft: la partie du profil où la lessive se produit vraiment, on pourra comparer la consommation avec la lessive précédente{% endcomment %}

C'est {{ 218 | percentLess: 1040 }} de moins que pour une charge complète !

En voyant l'enregistrement de cette deuxième lessive, les valeurs étaient tellement différentes que je me suis d'abord demandé s'il avait pu y avoir un problème lors de la mesure. Ce n'est qu'en consultant le manuel que j'ai compris : cette machine dispose d'un système de « capacité variable automatique ».

C'est ici que ce système prend tout son sens : la machine détecte la faible quantité de linge et adapte automatiquement la quantité d'eau et l'énergie nécessaire. Le manuel avait raison de vanter cette fonctionnalité : « si vous avez peu de linge à laver, la capacité variable automatique du lave-linge réduit la consommation en eau et la consommation électrique. »

#### Le chauffage avec charge légère

La machine utilise une puissance de chauffage similaire (médiane de {{ 2100 | W }}), mais pendant une durée beaucoup plus courte :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Deuxième lessive, chauffage", "range": "95594851m172922"}' %}

Avec moins d'eau à chauffer, le temps de chauffage est réduit et donc la consommation totale aussi.

#### L'essorage avec charge légère

L'essorage montre aussi une montée en puissance progressive, mais avec une amplitude plus faible qu'avec une charge complète :

{% profile "machine-a-laver-miele.json.gz" '{"name": "Deuxième lessive, essorage", "range": "100171688m284156"}' %}

Le tambour a moins de poids à faire tourner.

### Sur un an

Si l'on suppose que la machine est utilisée 2 fois par semaine avec une charge complète, la consommation annuelle sera de {{ 1040 | times: 2 | times: 52 | Wh€ }} par an.

Pour une famille qui fait 3 lessives par semaine (2 charges complètes et 1 charge légère), cela représente {{ 1040 | times: 2 | plus: 218 | Wh€ }} par semaine, soit {{ 1040 | times: 2 | plus: 218 | times: 52 | Wh€ }} par an.

Pour une famille nombreuse qui ferait 5 lessives par semaine (toutes en charge complète), cela représente {{ 1040 | times: 5 | Wh€ }} par semaine, soit {{ 1040 | times: 5 | times: 52 | Wh€ }} par an.

À cela s'ajoute la consommation en veille de {{ 0.111 | W€PerYear }}, qui est négligeable.

Le fabricant annonce une « consommation énergétique annuelle » de 177 kWh par an, ce qui correspond à environ 3,4 lessives par semaine avec notre mesure. C'est cohérent avec un usage familial normal.

### Comparaison avec le lave-linge Samsung

Lors de notre test d'un {% test machine-a-laver lave-linge Samsung 7kg %}, la consommation du programme Quotidien 40°C avait été mesurée à {{ 736 | Wh }}. La Miele consomme {{ 1040 | Wh }}, soit {{ 1040 | percentMore: 736 }} de plus par cycle.

Mais attention : la Miele a une capacité de 8kg contre 7kg pour la Samsung, et surtout elle dispose du système de capacité variable qui permet de réduire drastiquement la consommation avec une charge légère. La Samsung consommait {{ 736 | Wh }} quelle que soit la charge.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de chauffage peut atteindre {{ 2206 | W }}, ce qui est élevé pour une installation photovoltaïque résidentielle standard (généralement 3 kW de puissance crête). Heureusement, ces pics ne durent qu'environ 19 minutes par cycle. Le reste du temps, la consommation est faible (environ {{ 80 | W }} en médiane).

Pour maximiser l'autoconsommation, il faut anticiper que le chauffage démarre environ 9 minutes après le lancement du cycle. Il faudra donc s'assurer que cette phase de chauffage coïncide avec un moment ensoleillé, et qu'aucun autre gros consommateur d'énergie ne tourne en même temps (en particulier, pas d'appareil de cuisson).

Le manuel indique que « *les lessives modernes permettent de laver à basse température (par ex. : 20°C)* » et que « *ces réglages de température vous permettent de faire des économies d'énergie* ». Un programme à 20°C serait encore plus adapté pour l'autoconsommation photovoltaïque, en nécessitant beaucoup moins de chauffage.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette machine à laver, on pourrait :
- tester les autres programmes disponibles : Synthétique, Fin, Laine, Chemises, Express 20 (recommandé par le manuel pour « *les petites quantités de linge peu sale* »), Foncé/Jeans, Textiles modernes) ;
- mesurer l'impact de la température sur le programme Coton (20°, 30°, 40°, 60°, 90°) ;
- comparer la consommation avec différents niveaux de remplissage du tambour (en pesant le linge pour avoir une estimation précise en kg) pour mieux comprendre le système de capacité variable ;
- mesurer l'influence de la vitesse d'essorage sur la consommation (800, 1000, 1200, 1400 tr/min) ;
- évaluer la consommation d'eau en parallèle pour avoir une vision complète de l'efficacité.
{% endplusloin %}
