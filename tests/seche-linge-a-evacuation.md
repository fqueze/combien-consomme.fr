---
layout: test-layout.njk 
title: un sèche-linge à évacuation
img: seche-linge-a-evacuation-mini.jpg
date: 2025-09-08
tags: ['test']
---

Le sèche-linge à évacuation, une technologie ancienne, évacue l'air chaud et humide vers l'extérieur. Cette technologie simple est-elle énergivore ?
<!-- excerpt -->

{% tldr %}
- Utilisé environ 2 fois par semaines, ce sèche-linge consommera {{ 1732.56 | times: 100 | Wh€ }} par an.
- Un cycle de séchage intensif pour du linge bien essoré consomme {{ 1732.56 | Wh€ }}.
- Un {% test seche-linge-a-pompe-a-chaleur sèche-linge avec pompe à chaleur %} consomme {{ 789 | percentLess: 1732.56 }} moins.
- La puissance est d'environ {{ 3300 | W }} pendant la phase de chauffage. C'est beaucoup plus qu'un modèle avec pompe à chaleur, et ça complique l'autoconsommation photovoltaïque.
- L'air chaud évacué à l'extérieur représente une perte d'énergie importante, surtout en hiver.
- Si ce vieux modèle fonctionne encore, son remplacement est financièrement peu pertinent, il faudrait plus de 10ans pour faire une économie.
{% endtldr %}

## Le matériel
{% intro "seche-linge-a-evacuation.jpg" "Sèche-linge à évacuation" %}
Le sèche-linge « Miele De Luxe-Electronic T 366 » utilisé pour ce test est un modèle à évacuation traditionnel, permettant de sécher jusqu'à 4,5 kg de linge.

{% image "./images/seche-linge-a-evacuation-marque.jpg" "Gros plan sur la marque et le modèle du sèche-linge testé : Miele DE LUXE-ELECTRONIC T 366" "150w" 150 %}

Une résistance électrique est utilisée pour chauffer l'air, qui est ensuite expulsé vers l'extérieur du logement, chargé d'humidité. En sortant, l'air emporte la chaleur avec lui.

Arrivé dans la famille pour accélérer le séchage des vêtements de bébé lorsque mamie est devenue maman, ce vénérable sèche linge des années 80 est toujours là.

{% endintro %}

### Méthode de mesure

La consommation de ce vieux sèche-linge entraînant un courant supérieur aux 12 A supportés par {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %}, et le tableau électrique de mamie n'étant pas équipé d'{% post mesurer-la-consommation-avec-shelly-em un enregisteur sur la ligne dédiée au sèche-linge %}, une solution alternative a été trouvée en plaçant un petit tableau électrique temporaire entre la prise murale dédiée au sèche linge et la prise du cordon d'alimentation du sèche-linge.

{% image "./images/tableau-shelly-pro-en-50.jpg" "Module Shelly Pro EM-50 dans un petit tableau électrique de 6 modules" "300w" 300 %}

Ce tableau contient :
- un module Shelly Pro EM-50,
- un disjoncteur 2 A de protection,
- une prise électrique se clipsant sur le rail DIN,
- une [pince ampèremétrique](https://fr.wikipedia.org/wiki/Pince_ampèremétrique "Page « Pince ampèremétrique » sur Wikipédia") reliée au module Shelly, au centre de laquelle passe un fil dans lequel transite le courant consommé par le sèche-linge.

La puissance instantanée est collectée et enregistrée une fois par seconde.

## Consommation

### Informations fournies par le fabriquant

#### Etiquette

Commençons par regarder les informations sur l'étiquette se trouvant en bas à droite du tambour lorsque la porte est ouverte :  
{% image "./images/seche-linge-a-evacuation-etiquette.jpg" "Étiquette énergétique du sèche-linge indiquant : « Miele Fabriqué en Allemagne Typ T366  Nr.10/8497964 220V~ 50Hz Chauffage  3000W Puiss.tot. 3300W Fusibles   16A Lampe max  15W Capacite jusqu a 4,5kg linge sec »" "300w" 300 %}

{% comment %}
> 220V~ 50Hz  
> Chauffage  3000W  
> Puiss.tot. 3300W  
> Fusibles   16A  
> Lampe  max 15W  
{% endcomment %}

Ces inscriptions nous indiquent que pour un courant alternatif de {{ 220 | V }} à 50&nbsp;Hz, la puissance totale peut atteindre {{ 3300 | W }}, dont {{ 3000 | W }} pour le chauffage et {{ 15 | W }} pour l'ampoule assurant l'éclairage du tambour. L'appareil est protégé par un fusible de 16 Ampères.

#### Manuel
Le fabriquant fournit également une page entière de « *Conseils en matière d'économie d'énergie* » dans le manuel d'utilisation de l'appareil :
> Vous économiserez l'énergie et pourrez même sécher une charge complète de machine de 5 kg en
> - essorant bien le linge avant de le passer au sèche linge dans une machine à laver dotée d'une vitesse d'essorage d'au moins 850 tours/minute ou dans une essoreuse.  
Les consommations (valeurs approximatives) portées à toutes les pages de description des programmes vous indiqueront l'incidence d'un linge bien essoré sur la consommation d'électricité.
> - posant la conduite d'évacuation, de façon que le sèche-linge ne puisse pas réaspirer l'air humide dégagé.
> - évitant les charges beaucoup trop faibles par rapport aux capacités indiquées dans ce mode d'emploi.  
> La consommation d'énergie diminue certes en fonction de la quantité de linge chargé — plus la quantité de linge est faible, plus l'humidité évaporée l'est aussi — de sorte que la consommation d'électricité par kilogramme de linge n'est pas beaucoup plus élevée pour sécher une demi-charge de machine à laver que pour sécher une charge très faible.
Néanmoins vous réaliserez un séchage dans les meilleures conditions en exploitant la capacité maximale indiquée aux pages de description des programmes.
> - nettoyant le filtre placé dans la contreporte avant chaque séchage.

### Test sur un cycle complet

Pour ce test, nous utilisons le programme « Blanc et Couleurs : séchage intensif » avec une charge de linge normale, essorée à 1400 tr/min.

{% image "./images/seche-linge-a-evacuation-boutons.jpg" "Panneau de commande avec programme coton sélectionné" "512w" 512 %}

Pour ce programme, le manuel indique que pour 4,5kg de linge essoré à environ 1200 tr/min, le temps de séchage sera d'environ 57 minutes, pour une consommation d'électricité d'environ 2,7 kWh.

Voici le profil enregistré lors du test :
{% profile "seche-linge-a-evacuation.json.gz" '{"name": "Un cycle complet « Blanc et Couleurs : séchage intensif »","range":"m6607814"}' %}

La différence de consommation avec {% test seche-linge-a-pompe-a-chaleur un modèle à pompe à chaleur %} est immédiatement visible : la puissance pendant la phase de chauffage est nettement plus élevée.
Contrairement au modèle à pompe à chaleur, il n'y a pas de variation progressive de la puissance. La résistance fonctionne à pleine puissance ou pas du tout.

Notre enregistrement dure 1h50 pour une consommation totale de {{ 1732.56 | Wh }}, mais une fois le programme terminé, le sèche-linge est resté pendant 1h en mode « Rotation infroissable ».

Si on ignore cette dernière partie de l'enregistrement, le programme de séchage a duré 47 minutes, pour une consommation totale de {{ 1703.99 | Wh€ }} :

{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Séchage","range":"m2821918"}' %}

C'est 10 minutes et {{ 1000 | Wh }} de moins que ce qui était indiqué dans le manuel pour ce programme, mais les indications de consommation étaient données pour le cas du sélecteur de température placé en position « normale », alors qu'il était réglé sur « faible » pendant notre test.

### En détail

#### Déroulement du programme

Le manuel indique : « *Le sélecteur de programme reste dans la position sélectionnée, jusqu'à ce que le degré de séchage souhaité soit atteint et ne tourne qu'alors sur "Air froid" en quelques secondes.* » et précise : « *Lorsque le programme "Séchage intensif" est sélectionné, le sélecteur de programme s'immobilise env. 5 minutes au programme "Séchage normal + " avant de tourner rapidement sur "Air froid".* »

Si nous décomposons l'enregistrement, nous avons donc :
- Séchage intensif : le sèche-linge est équipé de sondes de température et d'humidité lui permettant de décider lorsqu'il faut chauffer ou non, et lorsque le linge est suffisamment sec pour passer à la suite du programme ;
- Séchage normal + : pendant environ 5 minutes d'après le manuel, ce programme semble chauffer moins fort que le programme intensif ;
- Air froid : d'une durée d'également 5 minutes, cette partie du cycle ne fait que souffler de l'air froid, pour permettre au linge de refroidir ;
- Rotation infroissable : pendant environ 1 heure, le tambour entre en rotation brièvement à intervalles réguliers.

Regardons plus en détail la forme du profil, et décomposons les différentes phases.

#### Séchage intensif

C'est pendant cette partie du cycle qu'a lieu le gros de la consommation électrique, avec la résistance de {{ 3000 | W }} qui est en fonction la plupart du temps.

{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Séchage intensif","range":"m2060406"}' %}

Les périodes pendant lesquelles la consommation est plus faible sont probablement dues à un thermostat qui désactiverait la résistance lorsque la température souhaitée est atteinte.

On peut remarquer qu'environ toutes les minutes, il y a une petite variation de la puissance mesurée : 
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Variation de consommation toutes les minutes — 1","range":"307887m300388"}' %}

Cette variation est encore plus visible lorsqu'elle intervient pendant une période où la résistance n'est pas en fonction :  
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Variation de consommation toutes les minutes — 2","range":"1863685m209947"}' %}

Ces variations semblent correspondre à l'arrêt (baisse de consommation) et au redémarrage (pic de consommation) d'un moteur électrique. Peut-être pour changer le sens de rotation du tambour ?

#### Séchage normal +

Pendant le séchage normal, le fonctionnement est assez similaire, mais la résistance est activée et désactivée beaucoup plus souvent :
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Séchage normal +","range":"2078365m517671"}' %}

On peut supposer que la température de consigne est plus faible.

#### Air froid

À la fin du programme, le sèche-linge souffle de l'air froid pendant environ 5 minutes, c'est ce qui est visible au début de ce zoom :
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Fin du programme","range":"2575096m420052"}' %}

Les variations de puissance toutes les minutes continuent. Pendant que de l'air froid est soufflé, la puissance mesurée est proche de la puissance médiane de {{ 215 | W }}.

#### Rotation infroissable

Une fois le linge suffisamment refroidi pour que l'utilisateur puisse y toucher, le sèche-linge passe en mode « Rotation infroissable » pendant environ 1 heure :
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Rotation infroissable","range":"2821917m3599653"}' %}

Pendant ce mode le tambour tourne 5 secondes, 2 fois toutes les 2 minutes. Curieusement ce n'est pas toutes les 60 secondes, mais plutôt au bout de 45s, puis 1min15, puis 45s, etc...

Lorsque le tambour ne tourne pas, la consommation relevée est d'environ {{ 5.30 | W }}. Cela correspond probablement au fonctionnement continu du programmateur [électromécanique](https://fr.wikipedia.org/wiki/%C3%89lectrom%C3%A9canique "Page « Électromécanique » sur Wikpédia").

#### Arrêt du programme 

Lorsque la rotation infroissable s'arrête, on observe une baisse de la consommation, qui passe à environ {{ 2.40 | W }} pendant 3 minutes, puis devient nulle :
{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Fin du programme","range":"6401754m204299"}' %}

Je ne sais pas à quoi correspond cette consommation de {{ 2.40 | W }}, mais peut-être la sonnerie finale ?

### Un autre cycle avec moins de linge

Un deuxième cycle de séchage a été enregistré. Réglages identiques, mais beaucoup moins de de linge dans le tambour.

Ce sèche-linge de grand-mère a retrouvé sa fonction initiale : sécher le linge de bébé, et bébé s'étant bien sali en jouant dans le jardin, mamie a fait une deuxième lessive peu après la précédente, ne contenant presque que du linge de bébé, beaucoup moins volumineux que le linge des adultes.

{% profile "seche-linge-a-evacuation2.json.gz" '{"name":"Séchage","range":""}' %}

La partie « Rotation infroissable » du cycle a été interrompue avant la fin. Zoomons sur le reste du programme :

{% profile "seche-linge-a-evacuation2.json.gz" '{"name":"Programme complet — linge de bébé","range":"m2647537"}' %}

On observe qu'il a cette fois duré 44 minutes (3 de moins que lors du premier test), et consommé {{ 1469.25 | Wh }} ({{ 1703.99 | minus: 1469.25 | Wh€ }} de moins).
Cela confirme l'information du manuel selon laquelle la consommation dépend de la charge de linge.

On remarque aussi que pendant la partie de séchage intensif, la résistance a chauffé 4 fois, contre 2 pour notre premier test.

{% profile "seche-linge-a-evacuation2.json.gz" '{"name":"Séchage intensif — linge de bébé","range":"m2102154"}' %}

On peut supposer que la température souhaitée est plus vite atteinte quand le tambour contient plus d'air et moins de linge, mais redescend aussi plus vite.

### Eclairage

Si l'utilisateur le souhaite, il est possible en appuyant sur le bouton « Eclairage » d'avoir de la lumière à l'intérieur du tambour pour bien voir le linge que l'on sort :  
{% image "./images/seche-linge-a-evacuation-tambour-eclaire.jpg" "Intérieur du tambour éclairé pendant le fonctionnement" "512w" 512 %}

{% profile "seche-linge-a-evacuation.json.gz" '{"name":"Allumage de la lampe","range":"14783881m17603"}' %}

L'enregistrement de consommation nous indique que l'éclairage consomme environ {{ 14 | W }}, ce qui est cohérent avec l'indication de l'étiquette qui disait « *Lampe  max 15W* ». Probablement une bonne vieille ampoule à incandescence, on est loin des éclairages à LED !

Quoi qu'il en soit, la consommation électrique de l'éclairage est négligeable comparée à celle du séchage.

### Consommation annuelle

Si l'on suppose que ce sèche linge est utilisé 100 fois par an, soit environ 2 fois par semaine, ce qui est réaliste pour une famille peu nombreuse, la consommation annuelle sera {{ 1732.56 | times: 100 | Wh€ }} par an.

### Faut-il le remplacer avant sa fin de vie naturelle ?

Faut-il remplacer cet ancêtre par un modèle moderne à la meilleure efficacité énergétique ? Comparons !

Lors de notre test d'un {% test seche-linge-a-pompe-a-chaleur sèche-linge avec pompe à chaleur %}, la consommation pour un cycle a été mesurée à {{ 789 | Wh }}. C'est {{ 789 | percentLess: 1732.56 }} de moins que notre sèche-linge à évacuation, soit une économie de {{ 1732.56 | minus: 789 | Wh€ }} par cycle.

Il est cependant à noter que la capacité n'est pas la même : tous les sèches-linges modernes semblent avoir une capacité d'au moins 7kg, beaucoup ont même une capacité de 9kg, soit le double de ce que le modèle des années 80 pouvait sécher en une fois.

Le modèle à pompe à chaleur le moins cher que j'ai trouvé coûte environ {{ 310 | € }}. Il faudrait donc {{ 1732.56 | minus: 789 | countPer€: 310 }} cycles pour rentabiliser le remplacement.
Si l'on souhaite rester sur un modèle Miele, les prix semblent commencer à {{ 1300 | € }}, ce qui nécessiterait {{ 1732.56 | minus: 789 | countPer€: 1300 }} cycles avant de rentrer dans ses frais.

En continuant de supposer que mamie utilise son sèche-linge environ 100 fois par an, il lui faudra donc {{ 1732.56 | minus: 789 | times: 100 | countPer€: 310 }} à {{ 1732.56 | minus: 789 | times: 100 | countPer€: 1300 }} ans pour rentabiliser un remplacement. Si le vieux modèle tient depuis près de 40 ans (avec une ou deux réparations), pas sûr que les modèles récents aient une telle longévité. Sauf si le vieux modèle se met à coûter cher en réparations, le remplacement pourrait n'être jamais amorti. On va donc conseiller à mamie de faire durer son vieux tromblon encore quelques années !

Initialement, en comparant les consommations maximales des deux appareils, j'avais été choqué par la puissance maximale de {{ 3300 | W }} du sèche-linge ancien, très supérieure à la puissance médiane d'environ {{ 500 | W }} du modèle à pompe à chaleur. J'avais rapidement estimé que le vieux consommait {{ 3300 | divided_by: 500 }} fois plus, mais je n'avais pas remarqué que l'ancien ne chauffe pas tout le temps, alors que le récent chauffe tout au long du cycle, avec des cycles plus long.

### Impact thermique

Le sèche-linge à évacuation rejette de l'air chaud et humide à l'extérieur. En hiver, cela représente une perte thermique importante pour le logement. En été, cela peut au contraire être plus avantageux qu'un modèle à condensation qui réchauffe l'air l'intérieur de la pièce.

### Conseils pour l'autoconsommation photovoltaïque

La forte puissance du sèche-linge à évacuation rend difficile son alimentation par des panneaux photovoltaïques. En effet, une installation photovoltaïque résidentielle classique de {{ 3000 | W }} crête produira rarement plus de {{ 2500 | W }}, alors que le sèche linge testé consomme {{ 3300 | W }} pendant toute la période de séchage intensif.

On pourra tout de même essayer d'allumer le sèche linge en début d'après-midi un jour bien ensoleillé pour avoir plus de la moitié de la consommation du séchage couverte par la production photovoltaïque. Mais s'il fait vraiment beau et que la configuration du logement le permet, on pourrait aussi envisager d'étendre le linge en extérieur...

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un sèche-linge à évacuation, on pourrait :
- sécher du linge essoré à différentes vitesses ;
- charger plus ou moins le tambour, en pesant chaque charge ;
- tester les différents programmes à température normale ou faible ;
- évaluer l'influence de la longueur du conduit d'évacuation ;
- mesurer la température de l'air rejeté pour quantifier les pertes thermiques.
- comparer avec d'autres modèles de sèche-linge, en particulier un modèle à condensation, et un {% test seche-linge-a-pompe-a-chaleur modèle à pompe à chaleur %}.
{% endplusloin %}
