---
layout: test-layout.njk 
title: un ordinateur portable Dell XPS 15 pouces
img: dell-xps15.jpg
date: 2024-07-05
tags: ['test']
---

Combien consomme la charge d'une batterie d'ordinateur portable ? Et le chargeur lorsqu'on le laisse branché ? Et l'ordinateur lorsqu'on s'en sert... ou pas ?
<!-- excerpt -->

{% tldr %}
- Charger la batterie lorsqu'elle est vide consomme {{ 87.4 | Wh€ }}. La charger entièrement tous les jours consommerait {{ 87.4 | Wh€PerYear }} par an.
- Pendant l'utilisation, la consommation moyenne varie de {{ 11 | W }} pour une utilisation modérée à {{ 76 | W }} pour une utilisation intensive du processeur.
- Laisser l'ordinateur tout le temps branché lorsqu'il est éteint consomme entre {{ 0.351 | W€PerYear }} et {{ 0.857 | W€PerYear }} par an.
- Laisser le chargeur branché lorsque l'ordinateur n'est pas connecté consomme environ {{ 0.00973 | W€PerYear }} par an. C'est négligeable, et ce n'est pas là qu'on pourra faire de vraies économies d'énergie.
- La consommation moyenne en veille dépend beaucoup des paramètres d'alimentation choisis, et a varié lors du test de {{ 0.978 | W }} à {{ 4.73 | W }}. Laisser l'ordinateur tout le temps en veille consommerait de {{ 0.978 | W€PerYear }} à {{ 4.73 | W€PerYear }} par an. Il est  préférable de l'éteindre lorsqu'on ne s'en sert pas.
{% endtldr %}

## Le matériel
{% intro "dell-xps15.jpg" "Ordinateur Dell XPS 15 pouces de 2022." %}

L'ordinateur portable testé est un modèle Dell 15 pouces de la série XPS, fabriqué en 2022. C'est un modèle haut de gamme, destiné à un usage professionnel.

Son processeur a une puissance de base de {{ 45 | W }}, qui peut brièvement monter à {{ 115 | W }} (fonction turbo boost). Il est fourni avec un chargeur {{ 130 | W }} et contient une batterie de {{ 86 | Wh }}.

Le système d'exploitation est Windows 11. Toutes les mises à jour sont installées.

### Méthode de mesure

Le chargeur de l'ordinateur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

J'ai mesuré la consommation pendant plusieurs jours :
{% profile "dell-xps15.json.gz" '{"name": "Mesure de la consommation de l\'ordinateur portable pendant plusieurs jours", "range": ""}' %}

Voici ce qui est visible sur l'enregistrement :
- J'ai d'abord allumé l'ordinateur et m'en suis servi pendant un peu plus de 4 minutes. J'ai observé que la batterie était presque vide (« 1% » affiché) et j'ai alors éteint l'ordinateur pour le laisser se recharger.
- J'ai laissé l'ordinateur se recharger entièrement, ce qui a pris environ 2 heures 20.
- L'ordinateur est resté éteint, chargé à 100% et branché au chargeur pendant environ 11 heures.
- J'ai débranché l'ordinateur du chargeur, et le chargeur est resté branché à vide pendant un peu plus de 6 heures.
- L'ordinateur a ensuite été rebranché au chargeur, mais toujours pas allumé pendant une journée.
- L'ordinateur a été démarré et une compilation de Firefox a été effectuée (24 minutes 50 d'utilisation du processeur au maximum de ses capacités).
- L'ordinateur est resté en veille pendant 18 heures.
- L'ordinateur a été utilisé de façon interactive pendant environ 3 heures.

Regardons en détail ces différentes parties de l'enregistrement.

### Charge de la batterie

{% profile "dell-xps15.json.gz" '{"name": "Recharge complète de la batterie", "range": "271461m8525558"}' %}

Au démarrage de la charge, la puissance consommée est légèrement supérieure à {{ 5 | W }} pendant 5 secondes, avant d'augmenter linéairement pendant 6 secondes jusqu'à {{ 47 | W }}.

La puissance consommée augmente ensuite très lentement pour atteindre un maximum de {{ 50.6 | W }} au bout d'1h13. {{ 59 | Wh }} ont été consommés pendant cette phase.

Ensuite, la charge se poursuit plus lentement pendant 1h9, avec une puissance consommée qui décroît régulièrement jusqu'à {{ 6.4 | W }}, pour une consommation totale de {{ 24.5 | Wh }} pendant cette phase.

Au total pendant la charge, {{ 84 | Wh }} ont été consommés. Sachant que l'ordinateur a d'abord été utilisé pendant 4min20 pendant lesquelles il chargeait également et la charge pendant cette période ayant été d'une puissance d'environ {{ 47 | W }}, on peut ajouter {{ 47 | times: 260 | divided_by: 3600 | Wh }}, ce qui amène la consommation totale à {{ 47 | times: 260 | divided_by: 3600 | plus: 84 | Wh€ }}. La batterie ayant une capacité annoncée de {{ 86 | Wh }}, on peut supposer soit que la batterie était moins vide qu'annoncée par l'ordinateur (très probable car laisser la batterie se vider entièrement nuit à sa durée de vie), soit que les pertes liées au chargeur étaient très faibles (mais c'est peu probable car il était un peu chaud).

Si l'on suppose que chaque jour l'ordinateur portable est utilisé sur batterie jusqu'à ce qu'elle soit vide, puis qu'il est rechargé entièrement, la consommation annuelle sera de {{ 87.4 | Wh€PerYear }}.

### Branché, batterie pleine

#### Après la charge
Voici un zoom sur la consommation une fois que la charge de la batterie a été terminée :
{% profile "dell-xps15.json.gz" '{"name": "Chargeur laissé branché après la charge", "range": "8797019m41372663"}' %}

Lorsque la batterie est complètement chargée, la puissance consommée par le chargeur diminue énormément mais n'est pas nulle. La précision de l'appareil de mesure utilisé n'est pas suffisante pour voir parfaitement ce qui se passe, mais on peut quand même constater une consommation moyenne de {{ 0.351 | W }}. Si l'ordinateur restait branché au chargeur une année complète après la fin de la charge, {{ 0.351 | W€PerYear }} seraient consommés.

#### Ordinateur débranché du chargeur

Ce profil montre ce qu'il s'est passé quand j'ai débranché l'ordinateur du chargeur, puis l'ai rebranché quelques heures plus tard.
{% profile "dell-xps15.json.gz" '{"name": "Chargeur débranché puis rebranché à l\'ordinateur", "range": "47893198m27256292"}' %}

On constate que lorsque l'ordinateur est débranché du chargeur, la consommation baisse à nouveau significativement. On voit donc que l'ordinateur éteint avait une consommation non-nulle.

Une fois l'ordinateur rebranché au chargeur, la consommation est supérieure à la consommation immédiatement après la charge de la batterie. Je n'ai pas d'explication à ce phénomène.

Regardons plus précisément la consommation lorsque l'ordinateur n'est pas branché au chargeur :
{% profile "dell-xps15.json.gz" '{"name": "Chargeur débranché", "range": "50470890m21585370"}' %}

La consommation moyenne est ici descendue à {{ 0.00973 | W }}, ce qui représente une consommation de {{ 0.00973 | W€PerYear }} par an si le chargeur reste tout le temps branché.

Lorsque le chargeur a été rebranché, la consommation a curieusement été plus élevée qu'avant qu'il ne soit débranché :
{% profile "dell-xps15.json.gz" '{"name": "Chargeur rebranché", "range": "73786675m86636070"}' %}

On observe maintenant une consommation moyenne de {{ 0.857 | W }}, soit {{ 0.857 | W€PerYear }}.

### Consommation maximale 

Sous l'ordinateur des inscriptions indiquent ses caractéristiques électriques :  
{% image "./images/dell-xps15-dessous.jpg" "Photo du dessous de l'ordinateur Dell XPS 15 pouces" "512w" 512 %}

Si on regarde de plus près :  
{% image "./images/dell-xps15-etiquette.jpg" "Zoom sur les caractéristiques techniques indiquées sous l'ordinateur" "512w" 512 %}
On peut lire « 20V 4.5A/6.5A » ce qui correspond à {{ 20 | times: 4.5 | W }} ou {{ 20 | times: 6.5 | W }}, deux modèles de chargeur pouvant être compatibles avec cet ordinateur.

Ici, le chargeur utilisé est un modèle de {{ 130 | W }} :  
{% image "./images/dell-xps15-chargeur.jpg" "Photo du chargeur de l'ordinateur portable Dell" "512w" 512 %}&nbsp;{% image "./images/dell-xps15-chargeur-etiquette.jpg" "Zoom sur les caractéristiques techniques indiquées sous le chargeur" "512w" 512 %}

Ces {{ 130 | W }} sont donc la puissance maximale qui peut être consommée lorsque l'ordinateur est branché au secteur.

### En utilisation

Voyons maintenant deux situations qui permettent d'approcher la puissance maximale.

#### Utilisation pendant la charge

Ici, l'ordinateur a été utilisé pendant un peu plus de 4 minutes alors que la batterie était vide.

{% profile "dell-xps15.json.gz" '{"name": "Utilisation pendant la charge", "range": "8720m267130"}' %}

La puissance maximale mesurée est montée à {{ 126 | W }}, très proche des {{ 130 | W }} inscrits sur l'adaptateur secteur. On peut supposer que {{ 47 | W }} étaient consommés par la charge de la batterie, et que le reste correspondait au fonctionnement de l'ordinateur.

#### Calcul intensif (compilation)

Un autre exemple de consommation élevée, approchant le maximum permis par l'adaptateur secteur est l'utilisation des capacités de calcul de l'ordinateur à leur maximum.

{% profile "dell-xps15.json.gz" '{"name": "Compilation de Firefox", "range": "161232236m1490899"}' %}

Le profil présenté correspond à la compilation du navigateur web [Mozilla Firefox](https://www.mozilla.org/fr/firefox/new/). Cette compilation a duré 24 minutes et 50 secondes. Pendant une grande partie du temps, la totalité des coeurs du processeurs ont été utilisés à leur maximum.

Les variations de consommation pendant la période où le processeur est utilisé au maximum de ses capacités correspondent initialement à l'augmentation temporaire de la fréquence d'horloge (fonction [turbo boost](https://en.wikipedia.org/wiki/Intel_Turbo_Boost)) jusqu'à ce que la température du processeur augmente. Ensuite la fréquence (et la puissance) diminuent pour laisser le processeur refroidir un peu, puis réaugmente avant de finalement se stabiliser, suivant l'algorithme <abbr title="Running Average Power Limit">RAPL</abbr>.

Pendant cette compilation, {{ 31.6 | Wh }} ont été consommés, soit {{ 31.6 | percent: 86 }} de la capacité de la batterie consommés en moins d'une demi-heure.

#### Utilisation interactive

Lors d'une utilisation plus « normale » de l'ordinateur, où l'ordinateur passe la plus grosse partie de son temps à attendre des actions de l'utilisateur, la consommation est beaucoup plus irrégulière :
{% profile "dell-xps15.json.gz" '{"name": "Utilisation interactive", "range": "225469763m11228971"}' %}

On notera ici la puissance médiane inférieure à {{ 10 | W }}, et la consommation totale de {{ 35.2 | Wh }} pour plus de 3 heures d'utilisation, à peine supérieure à la consommation précédemment mesurée pour 25 minutes d'utilisation intensive.

### En veille

Lorsque l'ordinateur était en veille après être resté inactif pendant longtemps, j'ai obtenu ce profil :

{% profile "dell-xps15.json.gz" '{"name": "En veille", "range": "162726362m61200409"}' %}

La puissance médiane est tombée à {{ 3.1 | W }}, mais on remarque de nombreux pics :
- toutes les 15 minutes, la puissance mesurée est montée à environ {{ 50 | W }} pendant quelques secondes ;
- la consommation est montée à {{ 14 | W }} (en moyenne) pendant environ 20 minutes toutes les 6 heures ;
- en zoomant plus sur le profil, on observe que la consommation monte à {{ 6 | W }} pendant une seconde toutes les minutes.

Tous ces pics révèlent des activités de l'ordinateur, alors qu'en tant qu'utilisateur, je me serais attendu à ce qu'il soit totalement inactif. Si l'ordinateur restait toute une année dans ce mode de veille, cela consommerait {{ 4.24 | W€PerYear }}. Toutes les {{ 4.24 | countPer€: 0.01 }} heures, un centime d'électricité est dépensé lorsque l'ordinateur est dans ce mode de veille.

J'ai plus tard observé que ce mode de veille qui consomme beaucoup d'énergie semble lié à l'utilisation du mode de gestion de l'alimentation « performances maximales ».

J'ai enregistré un autre profil après avoir configuré le mode de gestion de l'alimentation sur « économie d'énergie » et ai réglé les paramètres pour que l'écran s'éteigne au bout de 10 minutes d'inactivé et que l'ordinateur passe en veille au bout de 45 minutes d'inactivité. Voici un profil obtenu après avoir fait ces changements :

{% profile "dell-xps15-sleep.json.gz" '{"name": "Inactif - mode économie d\'énergie", "range": ""}' %}

La puissance médiane est ici descendue à seulement {{ 1.1 | W }}.

Si on zoome sur la première partie du profil :

{% profile "dell-xps15-sleep.json.gz" '{"name": "Avant la mise en veille", "range": "m2736226"}' %}

On observe :
- pendant les 10 premières minutes d'inactivité, en dehors des pics de consommation, la puissance est à peu près stable à environ {{ 6 | W }} ;
- une fois l'écran éteint, la puissance en dehors des pics diminue de moitié, à environ {{ 3 | W }} ;
- la puissance consommée est plus élevée juste avant le passage en veille.

Si on zoome maintenant sur la deuxième partie du profil :

{% profile "dell-xps15-sleep.json.gz" '{"name": "En veille - mode économie d\'énergie", "range": "2736225m4865651"}' %}

On observe :
- la puissance médiane est tombée à {{ 1 | W }} ;
- les pics de consommations, à environ {{ 7 | W }} ont maintenant lieu toutes les 28 minutes. Ils n'affectent que très peu la consommation moyenne.

Si l'ordinateur restait dans ce mode de veille pendant une année complète, il consommerait {{ 0.978 | W€PerYear }}. Dit autrement, il faudrait laisser l'ordinateur dans ce mode de veille pendant {{ 0.978 | countPer€: 0.01 }} heures pour dépenser un centime d'électricité.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'ordinateurs portables, on pourrait :
- essayer de mesurer séparément la puissance consommée par différents composants (changer la luminosité de l'écran, activer ou désactiver le wifi ou le bluetooth, ...) ;
- refaire les mesures en utilisant l'ordinateur avec un autre système d'exploitation, par exemple Ubuntu ;
- comparer avec d'autres modèles d'ordinateur portables ;
- mesurer la consommation pendant l'utilisation pour des jeux vidéos sollicitant beaucoup les capacités graphiques et 3D de l'ordinateur.
{% endplusloin %}
