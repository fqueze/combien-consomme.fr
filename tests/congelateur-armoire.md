---
layout: test-layout.njk
title: un vieux congélateur armoire
img: congelateur-armoire.jpg
date: 2026-02-23
tags: ['test']
---

Acheté par mes parents en octobre 1990, ce congélateur armoire a largement dépassé son espérance de vie. Après 35 ans de bons et loyaux services, combien coûte en électricité un congélateur aussi ancien ?

<!-- excerpt -->

{% tldr %}
- Ce congélateur de 1990 consomme {{ 73 | W€PerYear }} par an, soit {{ 73 | W€PerMonth }} par mois.
- La consommation mesurée est {{ 1752 | percentMore: 1450 }} supérieure à l'indication de l'étiquette (1,45 kWh/24h).
- Le {% test congelateur congélateur coffre récent %} que nous avons testé consomme {{ 652 | percentLess: 1752 }} de moins.
- En {{ 1752 | PerYear | countPer€: 1067 }} ans, le coût de l'électricité égale le prix d'achat.
{% endtldr %}

## Le matériel
{% intro "congelateur-armoire.jpg" "Congélateur armoire Derby UF 30" %}

Ce congélateur armoire Derby de type UF 30 a été fabriqué au Danemark. Il a été acheté en octobre 1990 pour 3900 francs.

Nous avons déjà testé {% test congelateur un congélateur coffre %} plus récent. Ce test permet de comparer avec un modèle bien plus ancien.
{% endintro %}

C'est un appareil imposant, avec un volume brut de 256 litres (211 litres nets) :

{% image "./images/congelateur-armoire-face.jpg" "Vue de face du congélateur armoire Derby UF 30" "300w" 300 %}
{% comment %}Vue de face complète ; c'est un modèle assez imposant{% endcomment %}

Le bandeau supérieur comporte trois voyants :

{% image "./images/congelateur-armoire-boutons.jpg" "Bandeau de commande du congélateur avec voyants vert, rouge et orange" "512w" 512 %}
{% comment %}Le bandeau du haut, contenant des témoins lumineux et un bouton. Le témoin vert est allumé pour indiqué que le congélateur est en fonctionnement. Le témoin rouge est allumé lorsque la température de congélation normale n'est pas atteinte et qu'il y a un danger pour la conservation d'aliments qui seraient placés à l'intérieur. Typiquement il est allumé lorsqu'on vient de mettre en servir le congélateur, lorsqu'on vient de le dégivrer, après une longue panne d'électricité, ou en cas de panne. Le voyant orange est un interrupteur, qui permet d'activer un mode dans lequel la pompe du congélateur tourne en permanence. Le manuel recommande d'activer ce mode pour baisser fortement la température lorsqu'on se prépare à congeler une grosse quantité de nourriture (par exemple du gibier).{% endcomment %}

- Le voyant vert indique que le congélateur est en fonctionnement.
- Le voyant rouge s'allume lorsque la température de congélation normale n'est pas atteinte : typiquement après un dégivrage, une remise en service, ou une longue panne d'électricité.
- Le voyant orange est un interrupteur qui active un mode de congélation rapide : le compresseur tourne alors en permanence, ce que le manuel recommande avant de congeler une grosse quantité de nourriture.

## Consommation

### Méthode de mesure

La mesure a été faite avec un module {% post mesurer-la-consommation-avec-shelly-em Shelly Pro EM %} déjà installé pour {% test seche-linge-a-evacuation une autre mesure %} dans la pièce où se trouve le congélateur, même si la puissance était suffisamment faible pour qu'on ait pu utiliser {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %}.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Informations fournies par le fabricant

L'étiquette se trouve à l'intérieur du congélateur. J'ai pu la photographier pendant le dégivrage :

{% image "./images/congelateur-armoire-etiquette.jpg" "Étiquette du congélateur Derby UF 30 : Vol.Gross 256 L, Vol.Nett 211 L, V 220 Hz 50 W 125, kWh/24h 1,45, KG R 12 0,160 Class N" "500w" 500 %}
{% comment %}Étiquette se trouvant à l'intérieur du congélateur, que j'ai pu photographier pendant le dégivrage

Derby
Made in Denmark
Type UF 30
VOL.GROSS 256 L
VOL.NETT 211 L
V 220 Hz 50 W 125 kWh/24h 1,45
KG R 12 0,160 Class N{% endcomment %}

L'étiquette indique « *V 220 Hz 50 W 125 kWh/24h 1,45* », soit une puissance de {{ 125 | W }} et une consommation de 1,45 kWh par 24 heures. On note également que le réfrigérant utilisé est le [R-12](https://fr.wikipedia.org/wiki/Dichlorodifluorom%C3%A9thane "Page « Dichlorodifluorométhane » sur Wikipédia"), un [CFC](https://fr.wikipedia.org/wiki/Chlorofluorocarbure "Page « Chlorofluorocarbure » sur Wikipédia") désormais interdit en raison de son impact sur la couche d'ozone. Les congélateurs modernes utilisent du [R-600a](https://fr.wikipedia.org/wiki/Isobutane "Page « Isobutane » sur Wikipédia") (isobutane), bien moins nocif pour l'environnement.

L'appareil est de classe climatique N, c'est-à-dire conçu pour fonctionner dans un environnement domestique normal avec des températures comprises entre 16°C et 32°C.

### Fonctionnement normal

Sur plus d'une journée d'enregistrement, on observe la consommation typique de ce congélateur en fonctionnement normal :

{% profile "congelateur-armoire.json.gz" '{"name": "Fonctionnement normal pendant plus d\'une journée", "range": "8545297m113253703"}' %}
{% comment %}draft: profil plus long avec des périodes complètes, pour avoir une conso moyenne juste{% endcomment %}

On observe une alternance très régulière entre des phases de fonctionnement du compresseur et des phases de repos complet. La puissance moyenne sur cette période est de {{ 73 | W }}, pour une consommation de {{ 2300 | Wh€ }} en un peu plus de 31 heures.

### Sur 24 heures

Sur une journée, on compte 15 cycles de fonctionnement du compresseur, chacun d'environ 50 minutes, suivis de 45 à 50 minutes de repos :

{% profile "congelateur-armoire.json.gz" '{"name": "24h", "range": "10622546m86479327"}' %}
{% comment %}draft: Sur 24h, on voit une alternance entre fonctionnement du compresseur et repos. Le compresseur fonctionne 15 fois, à chaque fois pendant environ 50 minutes, suivies de 45 à 50 minutes de repos. Sur certaines des périodes de fonctionnement, on voit un pic de démarrage très élevé, qui s'explique par le démarrage du moteur électrique. Avec un wattmètre ayant un plus fort taux d'échantillonnage, on verrait probablement le pic à chaque fois.
La moyenne est un peu surestimée car on commence et finit la période d'enregistrement de 24h par des phases de fonctionnement du compresseur. Voir le profil plus long pour une moyenne plus réaliste.{% endcomment %}

La consommation sur 24 heures est de {{ 1800 | Wh€ }}, avec une puissance moyenne de {{ 75 | W }}. Cette moyenne est légèrement surestimée car l'enregistrement commence et se termine par des phases de fonctionnement du compresseur. Le profil plus long ci-dessus donne une moyenne plus représentative de {{ 73 | W }}.

Sur certaines des phases de fonctionnement, on remarque un pic de démarrage très élevé. Le wattmètre utilisé échantillonne une fois par seconde, ce qui ne permet pas de capturer le pic à chaque démarrage.

### En détail

#### Un cycle complet

En zoomant sur un cycle, on voit nettement l'alternance entre une phase active avec le compresseur qui tourne et une phase de repos à puissance nulle :

{% profile "congelateur-armoire.json.gz" '{"name": "Zoom sur une période", "range": "22907634m6273063"}' %}
{% comment %}draft: On voit nettement l'alternance entre une phase de consommation avec le compresseur qui tourne et une phase de repos avec une puissance mesurée à 0. La régulation thermique se fait par un thermostat mécanique, pas d'électronique. Et il est possible que l'ampoule du témoin de fonctionnement soit grillée{% endcomment %}

La régulation de la température se fait par un thermostat à [bilame](https://fr.wikipedia.org/wiki/Bilame "Page « Bilame » sur Wikipédia") : il n'y a aucune électronique dans cet appareil. Lorsque la température intérieure remonte au-dessus du seuil, le thermostat déclenche le compresseur, qui fonctionne jusqu'à ce que la température redescende suffisamment.

Pendant la phase de repos, la puissance mesurée est de 0 W. Il est possible que l'ampoule du voyant de fonctionnement soit grillée, car on ne mesure aucune consommation résiduelle. Après 35 ans de fonctionnement permanent, on le lui pardonne aisément !

#### La phase active du compresseur

En zoomant sur la phase active d'un cycle, on observe un comportement qui se reproduit à chaque phase de fonctionnement :

{% profile "congelateur-armoire.json.gz" '{"name": "Zoom sur la phase active", "range": "22913796m3108653"}' %}
{% comment %}draft: Sur la phase de fonctionnement, on voit une puissance plus élevée pendant environ 1min40, avec un maximum à 187W après un peu plus de 30s puis une décroissance lente. Après 1min40, la puissance redescend rapidement à 155W. Ensuite descente très lente jusqu'à environ 140W. Je ne sais pas ce qui explique ce comportement, mais il se reproduit sur chaque phase de fonctionnement du compresseur.{% endcomment %}

On observe trois phases :
1. Une consommation plus élevée pendant environ 1 minute 40, avec un maximum à {{ 187 | W }} après une trentaine de secondes puis une décroissance lente ;
2. Une descente rapide à environ {{ 155 | W }} ;
3. Une descente très lente jusqu'à environ {{ 140 | W }} avant l'arrêt du compresseur.

Je n'ai pas d'explication pour ce comportement en deux paliers, mais il se reproduit fidèlement à chaque cycle.

La puissance médiane sur l'ensemble de la phase active est de {{ 144 | W }}, pour une consommation de {{ 125 | Wh€ }} en environ 52 minutes. C'est {{ 144 | percentMore: 125 }} au-dessus de la puissance nominale de {{ 125 | W }} indiquée sur l'étiquette. La tension secteur pendant la mesure était d'environ 230 V, légèrement supérieure aux 220 V indiqués sur l'étiquette, ce qui contribue à une puissance médiane un peu plus élevée.

#### Le pic de démarrage

En zoomant sur un pic de démarrage, on voit l'amplitude impressionnante du courant d'appel du compresseur :

{% profile "congelateur-armoire.json.gz" '{"name": "Zoom sur un pic de démarrage", "range": "64728648m110471"}' %}
{% comment %}draft: Le pic de démarrage atteint 1,8kW!{% endcomment %}

Le pic atteint {{ 1810 | W }}, ce qui correspond au courant d'appel du moteur électrique du compresseur. Il ne dure qu'une fraction de seconde, puis la puissance redescend rapidement au niveau normal de fonctionnement. Sur un circuit 220 V, cela représente un courant d'appel d'environ 8 A, ce qui reste dans les limites d'un circuit domestique standard.

C'est d'ailleurs l'importance de ce courant d'appel lors du démarrage de moteurs qui explique pourquoi on installe typiquement un disjoncteur 20 A avec un câblage en 2,5 mm² sur les circuits dédiés au gros électroménager ({% test machine-a-laver machine à laver %}, par exemple), alors que la prise de raccordement de l'appareil n'est qu'en 16 A.

### Premier démarrage après dégivrage

Le congélateur a été dégivré puis déplacé d'une pièce à une autre. Lorsque nous l'avons remis en fonctionnement, il était presque à température ambiante à l'intérieur. Le compresseur a fonctionné plus de 2 heures en continu pour ramener le congélateur à sa température normale :

{% profile "congelateur-armoire.json.gz" '{"name": "Premier démarrage après dégivrage", "range": "m8333545"}' %}
{% comment %}draft: Le congélateur a été dégivré puis déménager d'une pièce à une autre. Lorsque nous l'avons remis en fonctionnement, il était presque à température ambiante à l'intérieur, et le compresseur a fonctionné plus de 2h pour ramener le congélateur à sa température normale de fonctionnement.{% endcomment %}

La consommation de ce premier démarrage est de {{ 330 | Wh€ }} en 2h18. On observe le même pic de démarrage à {{ 1800 | W }}, suivi d'un fonctionnement continu sans les pauses habituelles.

En excluant le pic de démarrage, on retrouve la même forme de courbe que lors d'un cycle normal, mais très étirée dans le temps :

{% profile "congelateur-armoire.json.gz" '{"name": "Premier démarrage après dégivrage — après le pic de démarrage", "range": "8227m8309532"}' %}
{% comment %}draft: Forme similaire au profil d'une phase de fonctionnement du compresseur lorsqu'il est à une température normale, mais beaucoup plus étirée sur la durée. Il faut plus d'une heure pour que la puissance mesurée descente à 140W, Le fonctionnement continue encore à environ 140W pendant plus d'une heure.{% endcomment %}

Il faut plus d'une heure pour que la puissance descende à {{ 140 | W }}, puis le fonctionnement continue encore plus d'une heure à ce niveau. La puissance médiane est de {{ 141 | W }}, proche de celle d'un cycle normal, mais la durée est bien plus longue. Cela s'explique par la quantité de chaleur à évacuer pour ramener l'ensemble du congélateur de la température ambiante à la température de congélation.

En fonctionnement normal, un cycle de compresseur consomme {{ 125 | Wh }}. La surconsommation liée au dégivrage est donc d'environ {{ 330 | minus: 125 | Wh€ }}, soit l'équivalent de moins de deux cycles normaux supplémentaires.

### Pas de consommation en veille

Ce congélateur n'a aucune électronique : la régulation se fait entièrement par thermostat mécanique. Lorsque le compresseur est à l'arrêt, la puissance mesurée est de 0 W. Il n'y a donc aucune consommation en veille à signaler.

### Coût d'utilisation

Avec une puissance moyenne de {{ 73 | W }} en fonctionnement normal, la consommation est de {{ 1752 | Wh€ }} par jour, {{ 73 | W€PerMonth }} par mois, ou {{ 73 | W€PerYear }} par an.

L'étiquette indique 1,45 kWh par 24 heures. Notre mesure donne une consommation journalière supérieure de {{ 1752 | percentMore: 1450 }} à la valeur de l'étiquette. On peut supposer que l'âge de l'appareil, l'usure du compresseur, et la dégradation de l'isolation thermique expliquent cette différence.

Pour comparaison, le {% test congelateur congélateur coffre récent %} que nous avons déjà testé consomme {{ 652 | Wh }} par jour, soit {{ 652 | percentLess: 1752 }} de moins.

### Le congélateur a-t-il coûté plus cher en électricité qu'à l'achat ?

Le congélateur a été acheté en 1990 pour 3900 francs, soit l'équivalent d'environ {{ 1067 | € }} actuels d'après le [convertisseur de l'INSEE](https://www.insee.fr/fr/information/2417794 "Convertisseur franc-euro de l'INSEE"). Avec une consommation journalière d'environ {{ 1752 | Wh }}, il aura fallu {{ 1752 | PerYear | countPer€: 1067 }} ans pour que le coût de l'électricité égale le prix d'achat.

Pour 35 ans de fonctionnement, la consommation totale d'électricité s'élève à {{ 1752 | times: 35 | PerYear | Wh€ }}, soit environ 5 fois le prix d'achat ! Pour un appareil qui fonctionne en permanence, il n'est pas rare que la consommation électrique sur sa durée de vie dépasse largement le prix d'achat initial.

### Faut-il le remplacer avant sa fin de vie naturelle ?

L'écart de consommation avec un congélateur récent est important, mais pas surprenant pour un appareil ayant 35 ans de différence d'âge. Le {% test congelateur congélateur coffre récent %} que nous avons testé consomme {{ 652 | percentLess: 1752 }} de moins, soit une économie quotidienne d'environ {{ 1752 | minus: 652 | Wh€ }}.

Un congélateur armoire moderne de volume comparable (200-250 litres) coûte environ {{ 400 | € }}. Avec une économie d'environ {{ 1752 | minus: 652 | Wh€PerYear }} par an, quelques années suffiraient pour rentabiliser le remplacement.

Cependant, ce Derby fonctionne sans faille depuis 35 ans. Les modèles récents n'ont pas cette réputation de longévité. De plus, l'[énergie grise](https://fr.wikipedia.org/wiki/%C3%89nergie_grise "Page « Énergie grise » sur Wikipédia") nécessaire à la fabrication de cet appareil est largement amortie après toutes ces années, alors que la fabrication d'un nouveau congélateur impliquerait à nouveau ce coût environnemental. On va donc conseiller de profiter de ce vieux congélateur tant qu'il tient, tout en gardant en tête que le remplacer serait financièrement pertinent si une panne se présentait.

### Conseils pour l'autoconsommation photovoltaïque

La puissance du compresseur, autour de {{ 144 | W }} en fonctionnement, est parfaitement compatible avec une installation photovoltaïque domestique standard de 3&nbsp;kWc. Le congélateur ne consommerait qu'une petite fraction de la production solaire, même en hiver.

Cependant, un congélateur fonctionne 24 heures sur 24, y compris la nuit. Environ la moitié des cycles de fonctionnement du compresseur ont lieu en dehors des heures d'ensoleillement, et il n'est évidemment pas possible de décaler ces cycles : le thermostat déclenche le compresseur lorsque la température l'exige.

En pratique, une installation photovoltaïque couvrira naturellement une partie de la consommation du congélateur pendant la journée, sans qu'il soit nécessaire de faire quoi que ce soit.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce congélateur, on pourrait :
- mesurer l'impact de l'ouverture de la porte sur la consommation, en comparant un profil sur une journée avec et sans ouvertures fréquentes ;
- mesurer l'impact de la température ambiante en comparant un profil en hiver et un profil en plein été, car le compresseur devrait tourner plus longtemps lorsqu'il fait chaud ;
- tester le mode de congélation rapide (voyant orange) pour mesurer la surconsommation lorsque le compresseur tourne en permanence ;
- mesurer l'impact du givre sur la consommation en comparant les profils juste après un dégivrage et après plusieurs mois sans dégivrage ;
- comparer l'efficacité d'un congélateur armoire avec {% test congelateur un congélateur coffre %} de volume similaire : un congélateur coffre devrait logiquement être avantagé lors des ouvertures, car la chaleur monte et une ouverture par le dessus cause donc moins de perte de froid qu'une ouverture frontale ;
- comparer avec un congélateur armoire récent de volume similaire pour quantifier précisément les progrès d'efficacité énergétique en 35 ans.
{% endplusloin %}
