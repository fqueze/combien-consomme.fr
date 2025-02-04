---
layout: test-layout.njk 
title: une Freebox Mini 4K
img: freebox-mini4k.jpg
date: 2025-01-25
tags: ['test']
---

Arrivée à la maison en même temps que la fibre, on a vite fait d'oublier qu'elle reste tout le temps allumée, mais sa consommation n'est peut-être pas à négliger. Combien consomme la Freebox Mini 4K ?
<!-- excerpt -->

{% tldr %}
{% assign server_power = 17.1 | times: 24 %}
{% assign player_active_power = 8.3 | times: 4 %}
{% assign player_idle_power = 5.90 | times: 20 %}
{% assign total_power = server_power |plus: player_active_power | plus: player_idle_power %}
- {{ total_power | Wh€PerYear }} consommés par an pour une utilisation typique (Server qui reste allumé, Player utilisé 4 heures par jour et en veille le reste du temps).
- Débrancher le Player plutôt que le laisser en veille permet d'économiser {{ 5.90 | times: 20 | Wh€PerYear }} par an.
- Le Server consomme {{ 17.1 | W }} (dont {{ 5.4 | W }} pour le boîtier le reliant à la fibre).
- Le Player consomme {{ 8.3 | W }} en fonctionnement, {{ 5.9 | W }} en veille.
{% endtldr %}

## Le matériel
{% intro "freebox-mini4k.jpg" "Le boîtier « Server » d'une Freebox Mini 4K, associé à un boîtier fibre optique" %}

La [Freebox Mini 4K](https://fr.wikipedia.org/wiki/Freebox#Quatri%C3%A8me_g%C3%A9n%C3%A9ration_:_version_6_%C2%AB_R%C3%A9volution_%C2%BB_et_%C2%AB_Mini_4K_%C2%BB "Page « Freebox » sur Wikipédia, section Quatrième génération : version 6 « Révolution » et « Mini 4K »"), sortie en 2015 et commercialisée jusqu'en 2022, est composée de 2 boîtiers :
- le boîtier « Freebox Server » qui gère la connexion à internet,
- le boîtier « Freebox Player » qui se raccorde à la télévision.

Si la connexion ADSL est gérée directement par le boîtier « Freebox Server », le raccordement à la fibre optique nécessite l'ajout d'un boîtier supplémentaire.

Les adaptateurs secteurs des deux boîtiers de la Freebox sont des « [FreePlug](https://fr.wikipedia.org/wiki/FreePlug "Page « FreePlug » sur Wikipédia") », qui permettent de communiquer des données d'un boîtier Freebox à l'autre même dans un environnement où le [WiFi](https://fr.wikipedia.org/wiki/Wi-Fi "Page « Wi-Fi» sur Wikipédia") serait très perturbé.

### Méthode de mesure

Chacun des deux boîtiers de la Freebox Mini 4K a été branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer et enregistrer sa consommation une fois par seconde.

La prise connectée perturbant la [liaison par courant porteur](https://fr.wikipedia.org/wiki/Courants_porteurs_en_ligne "Page « Courants porteurs en ligne » sur Wikipédia") entre les deux boîtiers, ils ont été reliés par un câble réseau pendant la mesure de la consommation du boîtier « Player ».

La consommation d'un FreePlug et du boîtier de raccordement à la fibre ont également été mesurées séparément.

{% endintro %}

## Consommation

### Freebox Server

L'étiquette sous le boîtier « Server » ne donne aucune information sur les caractéristiques électriques de cet appareil :  

{% image "./images/freebox-mini4k-server-etiquette.jpg" "Etiquette sous le boîtier « Server» indiquant « Freebox F-GW05LB 0-AN » mais pas d'information sur les caractéristiques électriques" "500w" 500 %}

On en apprend un peu plus en regardant l'étiquette sous le FreePlug qui sert d'adaptateur secteur :  
{% image "./images/freebox-mini4k-freeplug-etiquette.jpg" "Etiquette sous le FreePlug indiquant « Freebox F-PL01D 1-EN » et « Input: 230VAC 50Hz 0.6A Output: +12VDC 2.5A »" "500w" 500 %}

Le courant alternatif d'entrée indiqué (Input: 230VAC 50Hz 0.6A), correspond à {{ 230 | times: 0.6 | W }}, ce qui semble énorme. Le courant continu de sortie (Output: +12VDC 2.5A), correspond à {{ 12 | times: 2.5 | W }}, ce qui est plus réaliste, mais semble encore beaucoup. C'est probablement la puissance maximale que le FreePlug peut délivrer aux équipements qui y sont branchés, mais pas une puissance réellement consommée en utilisation normale.

Pour se rendre compte de la consommation réelle, regardons un enregistrement sur une journée :  
{% profile "freebox-mini4k-server.json.gz" '{"name":"« Freebox Server » pendant une journée","range":"522727m86424273"}' %}

L'enregistrement est très stable, avec un graphique qui est presque un rectangle. Les puissances moyennes et médianes sont mesurées à {{ 17.1 | W }}.
Cela représente une consommation de {{ 17.1 | W€PerDay }} par jour, soit {{ 17.1 | W€PerMonth }} par mois ou {{ 17.1 | W€PerYear }} par an si le Freebox Server reste tout le temps allumé, ce qui est généralement le cas. Le coût en électricité du fonctionnement du boîtier Server correspond environ à un mois du forfait d'abonnement à internet. Dit autrement, la Freebox se fait payer un treizième mois en électricité !

#### Zoom sur le démarrage

Voici un enregistrement de 5 minutes montrant la consommation lors du démarrage du boîtier Server :  
{% profile "freebox-mini4k-server.json.gz" '{"name":"Démarrage du « Freebox Server »","range":"8690m299522"}' %}

Il s'écoule environ 1 minute 30 avant que la puissance consommée ne devienne stable et similaire à celle mesurée pendant l'enregistrement précédent de 24 heures.
La puissance mesurée augmente progressivement pendant la première minute. On peut supposer que les différents composants de la Freebox sont activés au fur et à mesure de la progression du démarrage.

Ensuite pendant environ 30 secondes la puissance mesurée est très légèrement supérieure à la puissance qui sera mesurée en fonctionnement continu, avec une puissance maximale mesurée à {{ 18.2 | W }}. On peut supposer que cette surconsommation temporaire est causée par le démarrage de composants logiciels utilisant au maximum les capacités du processeur de la box.

La consommation de la box est suffisamment importante pour se poser la question de s'il serait préférable de l'éteindre lorsqu'elle n'est pas utilisée. S'il est nécessaire de pouvoir recevoir un appel par le service de téléphonie ou si le WiFi est utilisé en permanence (par exemple pour des appareils de domotique), il ne sera pas envisageable de l'éteindre. Si par contre la box est utilisée uniquement pour aller sur internet avec un ordinateur qui aura lui aussi un temps de démarrage avant de pouvoir être utilisé, éteindre la box lorsque l'ordinateur est éteint pourrait être un bon choix. Si les services de télé de la Freebox sont utilisés depuis une autre pièce, il pourra cependant être ennuyeux de devoir d'abord penser à aller allumer le boîtier Server avant de pouvoir regarder la télé.

### Freebox Player

Le Freebox Player est un petit boîtier à placer près de la télévision :  
{% image "./images/freebox-mini4k-boitier-tv.jpg" "Photo du Freebox Player" "500w" 500 %}

Derrière, on trouve de nombreuses prises : antenne, usb, audio, video, réseau et alimentation :  
{% image "./images/freebox-mini4k-boitier-tv-arriere.jpg" "Photo de l'arrière du Freebox Player" "500w" 500 %}

Mais pas d'information sur la consommation électrique — on voit juste « 12V » qui indique la tension du courant continu entrant dans ce boîtier. On ne trouve rien de plus à ce sujet sur l'étiquette collée sous le boîtier :  
{% image "./images/freebox-mini4k-boitier-tv-dessous.jpg" "Photo du dessous du Freebox Player" "500w" 500 %}

Pour en savoir plus sur la consommation du Freebox Player, il faudra la mesurer ! Cela n'a pas été aussi simple que prévu, car la présence de la prise connectée utilisée pour mesurer la consommation a rendu la liaison par courant porteur (CPL) entre le Player et le Server non fonctionnelle. Pour pouvoir tout de même mesurer la consommation du player, j'ai déplacé celui-ci près du Server et ai relié les deux par un câble réseau. Voici un enregistrement d'un peu plus de 3 heures :  
{% profile "freebox-mini4k-player.json.gz" '{"name": "« Freebox Player » pendant 3 heures", "range": ""}' %}

Si l'on décompose ce qui a été enregistré, nous avons :
- un pic de consommation au démarrage ;
- une chaîne de télé regardée pendant 1 heure 10 ;
- le Player en veille pendant 1 heure 45 ;
- une chaîne de télé regardée à nouveau pendant quelques minutes avant de remettre le Player en veille.

Zoomons sur chacune de ces étapes :

#### Démarrage

{% profile "freebox-mini4k-player.json.gz" '{"name":"Démarrage du « Freebox Player »","range":"1515m601126"}' %}

Après un pic de démarrage à {{ 32.5 | W }} pendant 2 secondes, la puissance mesurée varie pendant environ 2 minutes 30 :

{% profile "freebox-mini4k-player.json.gz" '{"name":"Démarrage du « Freebox Player » — initialisation","range":"6899m149609"}' %}

Pendant cette période d'initialisation la puissance mesurée atteint un maximum de {{ 11.9 | W }}, et reste proche d'{{ 11 | W }} la plupart du temps. Les variations de puissance consommée correspondent probablement à des variations dans la sollicitation du processeur de la box.

#### Utilisation de la télévision

Regardons maintenant la consommation lorsque l'on regarde une chaîne de télé :  
{% profile "freebox-mini4k-player.json.gz" '{"name":"« Freebox Player » — utilisation de la télévision","range":"166423m4179071"}' %}

La puissance moyenne mesurée est d'environ {{ 8.3 | W }} pendant 2 minutes 30 puis descend à {{ 7.24 | W }}, exactement 5 minutes après le démarrage du Player. À ce moment, le voyant vert du FreePlug, s'est mis à clignoter lentement, alors qu'il était statique jusque là. On peut donc supposer que la baisse de la consommation est liée à ce changement de comportement du FreePlug, probablement car ses fonctions de transmissions de données par CPL n'ont pas été utilisées pendant le test.

Sur le graphique, on remarque de nombreux petits pics avec une consommation brièvement plus élevée (puissance maximale mesurée à {{ 10.2 | W }}). On peut supposer que cela correspond à des moments où le logiciel tournant sur le boîtier était plus actif et a sollicité le processeur (ou d'autres composants matériels de la box) plus intensément. Ces petits pics n'ont que très peu d'influence sur la consommation d'énergie totale.

D'après ces mesures, il faudrait regarder la télévision pendant {{ 7.24 | countHPer€: 0.01 }} pour dépenser un centime d'électricité avec le Freebox Player si le CPL n'est pas utilisé, et {{ 8.3 | countHPer€: 0.01 }} s'il est utilisé. La consommation du téléviseur est probablement nettement plus élevée.

#### En veille

Lorsque le Player est éteint depuis la télécommande, le boîtier passe en veille : la télévision ne reçoit plus de signal et un témoin orange s'allume sur la façade du boîtier :  
{% image "./images/freebox-mini4k-boitier-tv-veille.jpg" "Freebox Player en veille — un témoin orange est allumé" "500w" 500 %}

Regardons comment le mode veille affecte la consommation du Player :  
{% profile "freebox-mini4k-player.json.gz" '{"name":"« Freebox Player » — en veille","range":"4317756m6305589"}' %}

La puissance mesurée est assez stable, elle oscille entre {{ 5.5 | W }} et {{ 6 | W }} la plupart du temps, avec quelques pics mesurés à 7 voire {{ 8 | W }}.

On peut remarquer sur le graphique une période d'un peu plus de 10 minutes avec une consommation plus élevée ({{ 7.62 | W }} en moyenne). Je n'ai pas d'explication certaine à ce comportement, mais j'imagine qu'il pourrait s'agir de l'application d'une mise à jour logicielle. Si l'on exclu ces 10 minutes, la puissance moyenne lorsque le player est en veille est d'environ {{ 5.7 | W }}.

Il suffirait donc de laisser le Player en veille pendant {{ 5.7 | countHPer€: 0.01 }} pour dépenser un centime d'électricité. S'il reste en veille tout le temps, il consommera {{ 5.7 | W€PerDay }} par jour, soit {{ 5.7 | W€PerMonth }} par mois ou {{ 5.7 | W€PerYear }} par an.

Si l'on peut accepter d'attendre que le Player démarre avant de commencer à voir son émission préférée, il semble fortement souhaitable d'éteindre complètement ce boîtier Player lorsque la télévision est éteinte (avec une multi-prise à interrupteur par exemple). Si l'on souhaite vraiment pouvoir l'allumer rapidement avec la télécommande, le brancher sur un programmateur permettant de l'éteindre aux heures où l'on est certain de ne pas regarder la télé (la nuit par exemple) permettra quand même de réaliser une économie.

#### Sortie de veille

Observons maintenant le comportement à la sortie de veille, avec un test assez court où l'on a regardé la télé pendant seulement quelques minutes :  
{% profile "freebox-mini4k-player.json.gz" '{"name":"« Freebox Player » — redémarrage","range":"10674946m480671"}' %}

Le redémarrage est ici assez rapide, avec une surconsommation pendant seulement une douzaine de secondes lorsqu'on a choisi la chaîne à regarder.

### FreePlug

On a observé un changement de comportement du FreePlug au bout de 5 minutes, avec le voyant vert qui se mettait à clignoter lentement, et ce changement avait un impact visible sur la consommation mesurée pour le Player. Regardons de plus près ce FreePlug.

Nous avons déjà regardé les indications de l'étiquette collée sur le dessous :  
{% image "./images/freebox-mini4k-freeplug-dessous.jpg" "Photo du dessous du FreePlug, «freebox F-PL01D 1-EN Input: 230VAC 50Hz 0.6A Output: +12VDC 2.5A" "700w" 700 %}

Cela correspond à 138 W maximum en entrée, et à 30 W en sortie, mais comme le FreePlug sert simultanément d'adaptateur secteur et de boîtier CPL, cela ne nous renseigne pas sur sa propre consommation.

Pour en savoir plus, on peut tenter de mesurer sa consommation seul, c'est à dire en ne le raccordant pas au boîtier Server ou Player :  
{% image "./images/freebox-mini4k-freeplug-seul.jpg" "FreePlug branché sur une prise connectée Shelly Plug S, mais pas à la Freebox" "500w" 500 %}

Voici l'enregistrement obtenu :  
{% profile "freebox-mini4k-freeplug-seul.json.gz" '{"name": "FreePlug seul", "range": ""}' %}

On distingue 3 parties :
- un gros pic au démarrage ;
- une consommation mesurable pendant quelques minutes ;
- une consommation très faible (mais pas nulle) après.

Zoomons sur les premières minutes :

{% profile "freebox-mini4k-freeplug-seul.json.gz" '{"name":"FreePlug seul - zoom sur les premières minutes","range":"78695m385850"}' %}

Pendant les 2 premières secondes de l'enregistrement, la puissance mesurée atteint {{ 49.3 | W }}, on peut supposer que c'est des condensateurs qui se chargent en électricité.

Après le pic de démarrage, la consommation est assez stable pendant 5 minutes :  
{% profile "freebox-mini4k-freeplug-seul.json.gz" '{"name":"FreePlug seul - zoom sur 5 minutes","range":"84126m302904"}' %}

La puissance mesurée varie entre {{ 1.2 | W }} et {{ 1.6 | W }}, avec une puissance moyenne de {{ 1.35 | W }}. Pendant ces 5 minutes, le voyant du FreePlug reste allumé en vert de façon permanente. On peut supposer que la communication CPL est active pendant ce temps.

Une fois ces 5 premières minutes passées, le voyant se met à clignoter lentement, et la consommation est beaucoup plus faible :
{% profile "freebox-mini4k-freeplug-seul.json.gz" '{"name":"FreePlug seul - en veille","range":"387029m3625658"}' %}

On observe quelques variations, d'amplitude suffisante pour exclure qu'elles soient causées uniquement par le bruit de l'appareil de mesure. La puissance moyenne mesurée de {{ 0.0627 | W }} correspondrait à une consommation de {{ 0.0627 | W€PerDay }} par jour, soit {{ 0.0627 | W€PerYear }} par an.

Si nous gardons la supposition que la différence de consommation entre le FreePlug avec le voyant vert fixe et le voyant vert clignotant est due à l'utilisation ou non des fonctions CPL, nous pouvons alors estimer l'économie d'énergie liée à l'utilisation d'un câble réseau pour relier directement le Freebox Server au Freebox Player à la différence entre la consommation du FreePlug avec CPL actif ({{ 1.35 | W }} en moyenne) et inactif ({{ 0.0627 | W }} en moyenne), soit {{ 1.35 | minus: 0.0627 | W }}. Si on suppose que le Freebox Player reste en veille toute l'année et est connecté par CPL, il consommera {{ 1.35 | minus: 0.0627 | W€PerYear }} de plus par an que s'il est connecté par un câble réseau.


### Boîtier fibre

Comme indiqué plus tôt, le boîtier Server nécessite l'ajout d'un boîtier d'adaptation (techniquement appelé « boîtier ONU » — [Optical Network Unit](https://fr.wikipedia.org/wiki/Optical_Network_Unit "Page « Optical Network Unit » sur Wikipédia"))  pour être compatible avec une connexion à internet par fibre optique.

{% image "./images/freebox-mini4k-boitier-fibre.jpg" "Photo du boîtier fibre" "500w" 500 %}

Les précédentes mesures du Server le mesuraient dans son ensemble, boîtier fibre compris. Si on approche la main de ces boîtiers, on constate rapidement que le Server est plus chaud que la température ambiante de la pièce, et que le boîtier fibre lui aussi semble chauffer beaucoup.

L'utilisation d'une camera thermique confirme cette impression :  
{% image "./images/freebox-mini4k-thermal.jpg" "Photo en camera thermique du boîtier Server et du boîtier fibre - 34°C mesuré sur le boîtier Server" "500w" 500 %}

Nous voyons sur cette photo thermique que le boîtier Server est à environ 34°C (bien plus chaud que la pièce qui était chauffée à 19°C), et le boîtier fibre, jaune plus vif sur l'image, semble encore plus chaud.

Une photo centrée sur le boîtier fibre confirme : 47,8°C.  
{% image "./images/freebox-mini4k-thermal-boitier-fibre.jpg" "Photo en caméra thermique montrant uniquement le boîtier fibre, avec une température mesurée à 47,8°C" "500w" 500 %}

La chaleur dégagée étant un bon [proxy](https://fr.wikipedia.org/wiki/Proxy_(variable) "Page « Proxy (variable) » sur Wikipédia") pour la consommation d'énergie, on peut se douter que la consommation électrique du boîtier fibre n'est pas négligeable.

L'étiquette collée derrière ce boîtier nous donne des indications :  
{% image "./images/freebox-mini4k-boitier-fibre-etiquette.jpg" "Photo de l'arrière du boîtier fibre, l'étiquette indique « MDL: F-MDC0NU3A 0-JN Input: +12VDC 0.45A »" "700w" 700 %}

« Input: +12VDC 0.45A », soit {{ 12 | times: 0.45 | W }}.

Le boîtier fibre étant alimenté par un câble s'intercalant entre le FreePlug et le boîtier Server, il est possible de l'alimenter temporairement par un autre FreePlug que celui du Server (par exemple par le FreePlug du boîtier Player) afin de mesurer la consommation électrique du boîtier fibre seul :  
{% image "./images/freebox-mini4k-branchement-fibre.jpg" "Câble d’alimentation en T du boîtier fibre" "500w" 500 %}

{% profile "freebox-mini4k-boitier-fibre.json.gz" '{"name": "Boîtier fibre seul", "range": ""}' %}

Sur notre enregistrement, les 5 premières minutes sont une fois de plus différentes de la suite, et c'est à nouveau lié au comportement du FreePlug. Concentrons nous sur l'heure qui suit :  
{% profile "freebox-mini4k-boitier-fibre.json.gz" '{"name": "Boîtier fibre seul - 1h","range":"749278m3601911"}' %}

La puissance mesurée fluctue entre {{ 5.1 | W }} et {{ 5.9 | W }}, avec une puissance moyenne de {{ 5.41 | W }} et médiane de {{ 5.40 | W }}. Cette valeur correspond exactement à ce qui était indiqué sur l'étiquette. (Et c'est plutôt rare !)

Avec sa puissance consommée de {{ 5.4 | W }}, le boîtier fibre consomme {{ 5.4 | W€PerMonth }} par mois ou {{ 5.4 | W€PerYear }} par an s'il reste branché tout le temps.

### Freebox Server sans le boîtier fibre

Puisque le boîtier fibre a été alimenté séparément du Server pour la mesure précédente, profitons en pour mesurer le boîtier Server seul :

{% profile "freebox-mini4k-server-seul.json.gz" '{"name": "Freebox Server sans le boîtier fibre", "range": ""}' %}

Comme sur la mesure précédente du Server, lors du démarrage la puissance augmente progressivement, et la puissance maximum de l'enregistrement est observée pendant quelques secondes un peu plus d'une minute après le début du démarrage.

Les puissances moyennes et médianes sont identiques, mesurées à {{ 11.9 | W }}. Lorsque le boîtier Server avait été mesuré en même temps que le boîtier fibre, la puissance mesurée était de {{ 17.1 | W }}. On a donc mesuré une diminution de {{ 17.1 | minus: 11.9 | W }} en retirant le boîtier fibre. C'est légèrement moins que les {{ 5.4 | W }} mesurés pour le boîtier fibre seul. On peut supposer qu'il y a eu des pertes liées à l'utilisation de 2 FreePlugs au lieu d'un lorsque les mesures sont effectuées séparément.

À la fin du test, j'ai voulu vérifier si la consommation dépendait de l'utilisation qui était faite d'internet :  
{% profile "freebox-mini4k-server-seul.json.gz" '{"name":"Freebox Server sans le boîtier fibre — test de débit et WiFi","range":"7083401m900526"}' %}

Pendant un test de débit, la consommation moyenne est montée à {{ 12.2 | W }} pendant une minute, soit une augmentation assez faible de {{ 12.2 | minus: 11.9 | W }}.

Pendant 5 minutes, j'ai activé le WiFi de la Freebox (habituellement il est désactivé car un point d'accès plus moderne et plus puissant est relié à la Freebox), et la consommation moyenne est montée à {{ 12.1 | W }} pendant cette période, soit une augmentation de {{ 12.1 | minus: 11.9 | W }}, tellement faible que la mesure manque de précision.

Ces variations sont tellement faibles qu'elles donnent l'impression que la plupart des composants restent actifs même lorsqu'ils ne sont pas utilisés.

### Sur un an

Si l'on suppose une utilisation typique des services de la Freebox avec le boîtier Server qui reste tout le temps allumé, connecté à la fibre, et la télévision qui est utilisée 4h par jour (ce qui semble être la moyenne en France) avec le boîtier Player connecté en CPL et éteint lorqu'il n'est pas utilisé, on consommera :
- {{ 17.1 | W }} 24h/24 pour le boîtier Server, soit {{ 17.1 | W€PerYear }} par an ;
- {{ 8.3 | W }} 4 heures par jour pour le boîtier Player connecté par CPL, soit {{ 8.3 | times: 4 | Wh€PerYear }} par an.

Soit un total de {{ 8.3 | divided_by: 6 | plus: 17.1 | W€PerYear }} par an.

Si le boîtier Player reste en veille quand il n'est pas utilisé, on ajoute {{ 5.90 | W }} pendant 20 heures par jour, soit {{ 5.90 | times: 20 | Wh€PerYear }} de plus par an.

Si le boîtier Player est connecté par un câble réseau plutôt que par le CPL, on retire {{ 1.35 | minus: 0.0627 | W }} 4 heures par jour, soit {{ 1.35 | minus: 0.0627 | times: 4 | Wh€PerYear }} par an.

La consommation totale annuelle de cette Freebox sera donc comprise entre {{ 17.1 | W€PerYear }} si l'abonnement a été souscrit uniquement pour avoir internet et que le Player reste dans son carton, et {{ 17.1 | plus: 8.30 | W€PerYear }} si la télé reste allumée tout le temps.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette Freebox, on pourrait :
- tester plus précisément l'impact sur la consommation de différentes fonctions réseau (activer ou désactiver le routeur, le WiFi, …) ;
- mesurer la consommation du boîtier Player pour d'autres programmes que la télé en direct reçue par internet (clé USB, antenne TNT, replay, …) ;
- mesurer avec un taux d'échantillonnage plus élevé la consommation des différents équipements pour essayer de comprendre à quoi correspondent les petits pics de consommation observés ça et là dans nos mesures ;
- comparer à la consommation d'autres modèles de Freebox plus récents (par exemple à la {% test freebox-delta Freebox Delta %}) ou à des box internet d'autres fournisseurs.
{% endplusloin %}
