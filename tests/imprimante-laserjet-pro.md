---
layout: test-layout.njk 
title: une imprimante HP LaserJet Pro
img: imprimante-laserjet-pro-M452dn.jpg
date: 2024-08-06
tags: ['test']
---

Combien consomme une imprimante laser professionnelle quand elle imprime ? Et quand on ne s'en sert pas ?
<!-- excerpt -->

{% tldr %}
- L'impression d'une seule page consomme {{ 2.44 | Wh }}. Il faudrait imprimer {{ 2.44 | countPer€: 0.01 }} pages pour dépenser 1 centime d'euro en électricité.
- La consommation par page diminue significativement lorsque les pages sont imprimées à la suite. Cela s'explique car le gros de la consommation correspond au préchauffage de l'imprimante pour atteindre sa température de fonctionnement.
- La consommation lorsque l'imprimante reste en éveil pendant 5 minutes après la dernière impression avant de passer en veille n'est pas négligeable. Si l'on est certain d'avoir fini d'utiliser l'imprimante, l'éteindre immédiatement est une bonne idée.
- Laisser l'imprimante en veille tout le temps consommerait {{ 14 | times: 3 | Wh€PerYear }} par an (puissance moyenne de {{ 1.75 | W }}).
{% endtldr %}

## Le matériel
{% intro "imprimante-laserjet-pro-M452dn.jpg" "Imprimante HP Color LaserJet Pro M452dn." %}

L'imprimante testée est le modèle « Color LaserJet Pro M452dn » d'<abbr title="Hewlett-Packard">HP</abbr>. C'est un modèle laser couleur qui peut imprimer 27 pages par minute, permet l'impression en recto-verso, et est connecté au réseau par un câble RJ45.

Le constructeur [indique une consommation moyenne](https://support.hp.com/be-fr/document/c04824463#N67703) de {{ 570 | W }} pendant l'impression, {{ 17.6 | W }} lorsque l'imprimante est prête à fonctionner, {{ 2.4 | W }} en veille, et {{ 0.05 | W }} à l'arrêt. Notre test permettra de vérifier si nous retrouvons ces valeurs.

### Méthode de mesure

L'imprimante est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

J'ai mesuré la consommation pendant une utilisation typique :
{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Utilisations multiples de l\'imprimante", "range": ""}' %}


Voici ce qui est visible sur l'enregistrement :
- Il y a d'abord un premier pic de consommation lorsque l'imprimante est branchée (mais pas allumée) ;
- Juste après, un pic plus gros se produit lorsque l'imprimante est allumée ;
- les deux pics suivants correspondent à l'impression d'une page, puis de 4 pages recto-verso (2 feuilles) ;
- bien plus tard, l'imprimante est sortie de veille, sans que je ne sache pourquoi, et on observe à nouveau un pic de consommation.

Regardons en détail ces différentes parties de l'enregistrement.

### Démarrage

Lorsque l'imprimante est branchée (ou lorsque la multiprise sur laquelle elle est branchée est allumée), l'imprimante émet des sons pendant quelques secondes.

Lorsqu'elle est ensuite allumée, elle fait des bruits pendant un peu plus longtemps avant d'être prête à imprimer. Pendant ce temps, l'afficheur indique « Initialisation » :  
{% image "./images/imprimante-laserjet-pro-M452dn-startup.jpg" "Photo de l'afficheur pendant le démarrage" "300w" 300 %}

L'imprimante reste ensuite à l'état « Prêt » pendant environ 5 minutes avant de passer en veille.

Voici un profil de cette séquence :
{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Branchement puis démarrage", "range": "m439055"}' %}

Si on décompose :
- {{ 0.099 | Wh }} ont été consommés lors du branchement, pendant une période d'activité de 8 secondes, avec une puissance maximale mesurée à {{ 178 | W }}.
- {{ 0.79 | Wh }} ont été consommés lorsque l'imprimante a été allumée, en 17 secondes. Un pic de consommation à {{ 812 | W }} a été observé.
- {{ 1.39 | Wh }} ont été consommés pendant les 5 minutes et 28 secondes qui ont suivi, avant que l'imprimante ne passe en veille. La consommation moyenne a été de {{ 15.3 | W }} pendant cette période. On remarquera que cette attente avant de passer en veille consomme nettement plus d'énergie que l'allumage de l'imprimante.

### Impression

{% image "./images/imprimante-laserjet-pro-M452dn-printing.jpg" "Photo de l'afficheur pendant l'impression" "300w" 300 %}

Sur l'enregistrement qui suit, une page a été imprimée, puis 50 secondes plus tard, une autre impression a été lancée, de 4 pages (2 feuilles recto-verso).
{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Impression d\'une page, puis de 4 pages recto-verso (2 feuilles)", "range": "738573m399288"}' %}


#### Une seule page

Zoomons sur l'impression de la première page :
{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Impression d\'une page", "range": "739262m21150"}' %}

L'impression dure au total 19 secondes, elle commence par 12 secondes pendant lesquelles la consommation est importante ({{ 726 | W }} en moyenne), puis 7 secondes pendant lesquelles la consommation moyenne redescend à {{ 50 | W }}.

La consommation forte de la première partie (avec une puissance maximale d'{{ 1218.9 | W }}) correspond certainement au besoin de chauffer pour faire fondre l'encre (sur une [imprimante laser](https://fr.wikipedia.org/wiki/Imprimante_laser), l'encre est sous forme de poudre, contenant des pigments mélangés à une cire, qui colle les pigments au papier lorsqu'elle est cuite).

La consommation plus faible sur la fin de l'impression correspond peut-être à l'éjection de la feuille une fois qu'elle est déjà entièrement imprimée, avec un moteur pour faire tourner les rouleaux qui entraînent la feuille, et un ventilateur pour refroidir la feuille.

La consommation totale mesurée pour l'impression d'une seule page est de {{ 2.44 | Wh }}. Il faudrait imprimer {{ 2.44 | countPer€: 0.01 }} pages pour dépenser 1 centime d'euro en électricité.

#### Plusieurs pages à la suite

{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Impression de 4 pages recto-verso (2 feuilles)", "range": "801861m32911"}' %}

Cette impression de 4 pages dure 33 secondes. Elle se compose à nouveau d'une partie du temps avec une consommation élevée, et des 7 dernières secondes avec une consommation nettement plus faible.

L'enregistrement n'est pas assez précis pour décomposer la consommation pour chacune des pages.

La consommation totale de {{ 3.79 | Wh }} donne une consommation par page imprimée de {{ 3.79 | divided_by: 4 | Wh }} nettement inférieure à la consommation pour imprimer une seule page ({{ 2.44 | Wh }}). Si possible, il est donc préférable de grouper les impressions.

#### Réveil sans impression

Pour une raison que j'ignore, l'imprimante est sortie de veille sans qu'aucune impression n'ait été demandée.

{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Réveil sans impression", "range": "1952463m373480"}' %}

On observe une forte consommation pendant 15 secondes (puissance maximale {{ 790 | W }} ; puissance moyenne {{ 187 | W }} ; énergie consommée environ {{ 0.8 | Wh }}), suivie de 5 minutes 55 secondes avec une puissance moyenne d'environ {{ 15 | W }} avant que l'imprimante ne retourne à son sommeil qu'elle n'aurait pas dû quitter.

### En veille

Lorsque l'imprimante vient de finir une impression, elle reste prête à imprimer pendant environ 5 minutes :

{% profile "laserjet-pro-M452dn.json.gz" '{"name": "Mise en veille après 5 minutes", "range": "834377m359515"}' %}

Pendant ces 5 minutes, la puissance consommée est d'environ {{ 15 | W }}. {{ 1.26 | Wh }} sont consommés ici pendant ces 5 minutes, ce qui représente {{ 1.26 | percent: 2.44 }} de l'énergie nécessaire pour imprimer une page.

Une fois ces 5 minutes passées, l'imprimante passe en veille. Voici un enregistrement de 8 heures du comportement de l'imprimante lorsqu'elle est en veille :
{% profile "laserjet-pro-M452dn-idle.json.gz" '{"name": "En veille pendant 8h", "range": "m28800547"}' %}

On observe une puissance moyenne d'{{ 1.75 | W }}, légèrement inférieure à la puissance médiane de {{ 2 | W }}. Si l'imprimante reste allumée en veille tout le temps, {{ 14 | times: 3 | Wh€ }} seront consommés par jour, ce qui représente {{ 14 | times: 3 | Wh€PerYear }} par an.

Si on zoome sur ce profil, on peut observer que l'imprimante alterne entre une consommation d'environ {{ 2 | W }} et une consommation d'environ {{ 0.7 | W }} :

{% profile "laserjet-pro-M452dn-idle.json.gz" '{"name": "En veille, zoom sur 15 minutes — 1 ", "range": "13470829m900467"}' %}

La consommation moyenne mesurée sur ce quart d'heure est de {{ 1.47 | W }}. Si on zoome sur une autre partie du profil, on peut constater que l'imprimante est cette fois presque tout le temps dans le mode où elle consomme environ {{ 2 | W }} :

{% profile "laserjet-pro-M452dn-idle.json.gz" '{"name": "En veille, zoom sur 15 minutes — 2", "range": "15114014m900467"}' %}

La consommation moyenne mesurée cette fois ({{ 1.98 | W }}), est très proche de la médiane ({{ 2 | W }}).

Je ne sais pas vraiment ce qui explique cette différence de comportement, mais j'ai l'impression que les moments où l'imprimante en veille consommait plus correspondent aux moments où j'étais actif sur mon ordinateur. Il y avait peut-être plus d'activité sur le réseau ; même si je ne cherchais pas à communiquer avec l'imprimante pendant ce temps, il est possible que des paquets aient été échangés par [un protocole d'auto découverte](https://fr.wikipedia.org/wiki/Zeroconf).

### Extinction

Je n'ai pas trouvé de façon d'éteindre l'imprimante sans la sortir d'abord de veille. Le profil suivant montre :
- une sortie de veille précédent un arrêt de l'imprimante ;
- l'imprimante reste éteinte 35 secondes ;
- l'imprimante est rallumée ;
- elle reste en attente jusqu'à sa mise en veille ;
- elle est à nouveau éteinte (ce qui cause une sortie de veille).

{% profile "laserjet-pro-M452dn-idle.json.gz" '{"name": "Redémarrage, puis arrêt", "range": "29114434m544233"}' %}

Le premier arrêt a consommé {{ 0.457 | Wh }} en 11 secondes, le deuxième {{ 0.560 | Wh }} en 17 secondes. Le redémarrage a consommé {{ 0.525 | Wh }} en 13 secondes.

Le redémarrage complet (sortie de veille, arrêt, démarrage) a consommé {{ 0.986 | Wh }}. C'est moins que la consommation pendant les 5 minutes que l'imprimante attend pour se mettre en veille. Cela correspond aussi à la consommation de l'imprimante restant en veille pendant {{ 0.986 | divided_by: 1.75 | times: 60 | round }} minutes.

Une fois éteinte, l'imprimante a une consommation très faible. Voici un enregistrement d'une journée complète :
{% profile "laserjet-pro-M452dn-idle.json.gz" '{"name": "Éteinte", "range": "32257422m88087578"}' %}

La consommation mesurée est de {{ 0.0108 | Wh }}, avec une puissance moyenne de {{ 0.000444 | W }}. C'est négligeable : il faudrait laisser l'imprimante branchée et éteinte pendant {{ 0.0108 | times: 365.2425 | countPer€: 0.01 }} ans pour dépenser 1 centime d'électricité. Difficile de dire si ces valeurs sont réalistes, on a probablement largement dépassé la précision de la prise connectée utilisée comme appareil de mesure.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette imprimante laser, on pourrait :
- imprimer des pages plus ou moins remplies, en noir et blanc ou en couleur, avec ou sans recto-verso, à différent niveaux de qualités, pour voir si cela affecte la consommation d'énergie ;
- mesurer la consommation avec un appareil permettant une fréquence d'échantillonnage plus élevée afin de distinguer les différentes phases d'une impression ;
- mesurer de nombreuses fois les mêmes impressions ou l'attente avant la mise en veille pour obtenir une consommation moyenne plus précise ;
- mesurer la consommation lorsque l'imprimante est éteinte avec un appareil ayant une meilleure précision pour les très faibles consommations.
{% endplusloin %}
