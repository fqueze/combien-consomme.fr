---
layout: test-layout.njk 
title: un lecteur de DVD Thomson THD300
img: lecteur-dvd-thomson-thd300.jpg
date: 2025-01-02
tags: ['test']
---

Rien de tel qu'un lecteur de DVD pour revoir en famille un chef-d'œuvre du 7e art. Quelle est la consommation électrique de ce petit plaisir partagé ?
<!-- excerpt -->

{% tldr %}
- {{ 11.4 | Wh }} sont consommés pour la lecture d'un film d'environ 2h — puissance moyenne de {{ 5.88 | W }}. C'est probablement moins que le téléviseur affichant l'image.
- La consommation en veille est très faible, {{ 0.0126 | W }} soit {{ 0.0126 | W€PerYear }} par an.
- Il faudra regarder {{ 11.4 | countPer€: 1 }} fois un DVD acheté d'occasion à 1€ pour dépenser autant en électricité.
- Si l'appareil a été acheté neuf pour 35€, il faudra {{ 11.4 | divided_by: 2 | times: 24 | times: 30 | countPer€: 35 }} mois d'utilisation en continu pour dépenser plus en électricité.
{% endtldr %}

## Le matériel
{% intro "lecteur-dvd-thomson-thd300.jpg" "Un lecteur dvd thomson thd300" %}

Le [lecteur de DVD](https://fr.wikipedia.org/wiki/Lecteur_de_DVD "« Lecteur de DVD » sur Wikipédia"), désuet pour certains amateurs de streaming, reste un incontournable du salon de nombreux cinéphiles.

Le modèle testé, vendu moins de 35€, semble avoir été commercialisé à partir de fin 2019.
{%# Mode d'emploi daté de 20191015 : https://thomson-cdn.cyllene.cloud/var/fichiers/manuel-d-utilisation-thd300b.pdf Titre : THD300 IM Fr_En_size A5_20191015.cdr - manuel-d-utilisation-thd300b.pdf #%}C'est un modèle compact et léger.

### Méthode de mesure

Le lecteur de DVD est raccordé à un téléviseur par un câble HDMI et sa prise d'alimentation est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

Combien consomme ce lecteur de DVD ? Commençons par regarder l'étiquette de caractéristiques techniques apposée à l'arrière de l'appareil :  
{% image "./images/lecteur-dvd-thomson-thd300-etiquette.jpg" "Étiquette indiquant « THOMSON Model: THD300 DVD Player 100-240V~50/60Hz 10W USB: 5V 500mA »" "300w" 300 %}

Cette étiquette indique une consommation (probablement maximale) de {{ 10 | W }}.

La ligne « USB: 5V 500mA » indique la puissance maximum ({{ 5 | times: 0.5 | W }}) qui peut être fournie à un périphérique de stockage (clé USB, disque dur, …) branché sur la prise USB présente sur la façade de l'appareil.

Le manuel d'utilisation indique pour sa part :
> Consommation électrique : {{ 10 | W }}  
> Consommation électrique en veille : ≤ {{ 1 | W }}

### Visionnage d'un film

Nous avons profité du re-visionnage en famille d'un film culte déjà vu et revu de nombreuses fois pour effectuer notre test. Lorsque le lecteur de DVD est en allumé, les boutons de commandes sont rétro-éclairés en bleu :  
{% image "./images/lecteur-dvd-thomson-thd300-en-marche.jpg" "Lecteur de DVD Thomson THD300 en fonctionnement — bouton éclairé en bleu" "500w" 500 %}

Voici l'enregistrement de la consommation du lecteur DVD pendant la lecture du film :
{% profile "lecteur-dvd-thomson-thd300.json.gz" '{"name":"Lecture d\'un film","range":"14513m6984919"}' %}

On observe :
- le lecteur a été en fonctionnement pendant un peu moins de 2 heures, ce qui est une durée normale pour un film ;
- après un bref pic de consommation lors du démarrage (puissance maximale mesurée à {{ 8.20 | W }}), la puissance mesurée est très stable au cours du temps, avec une puissance moyenne de {{ 5.88 | W }} très proche de la puissance médiane ({{ 5.90 | W }}) ;
- toutes les puissances mesurées sont inférieures à la puissance de {{ 10 | W }} indiquée par le constructeur ;
- la consommation totale de {{ 11.4 | Wh€ }} semble très raisonnable. Le téléviseur ou projecteur affichant l'image, et l'éclairage de la pièce auront probablement consommé nettement plus pendant ce temps.

Si l'on suppose que le DVD visionné a été acheté d'occasion pour 1 euro symbolique, il faudra le regarder {{ 11.4 | countPer€: 1 }} fois pour dépenser autant en électricité que pour l'achat du disque. Si l'on suppose que le lecteur de DVD a été acheté neuf pour 35€, il faudrait l'utiliser pendant {{ 11.4 | divided_by: 2 | times: 24 | times: 30 | countPer€: 35 }} mois en continu pour que le prix de l'électricité consommée par l'appareil dépasse son prix d'achat.

#### En pause

Notre soirée a été brièvement interrompue par notre bébé qui s'est réveillé pour réclamer un biberon, nous forçant à mettre en pause la lecture pendant quelques minutes. L'impact sur la puissance mesurée est négligeable :
{% profile "lecteur-dvd-thomson-thd300.json.gz" '{"name":"En pause pendant 2 minutes","range":"1809465m120260"}' %}

La puissance médiane mesurée pendant la pause est descendue de {{ 0.2 | W }}. Pas sûr que ça soit significatif. Les quelques minutes où le menu du DVD était affiché avant le début de la lecture et après la fin du générique ne sont pas non plus clairement identifiables sur l'enregistrement.

### En veille

Lorsque l'on éteint ce lecteur de DVD, il reste en veille, permettant de le rallumer d'une pression sur un bouton de sa télécommande. Ce comportement est bien visible avec les boutons de commande rétro-éclairés en rouge :   
{% image "./images/lecteur-dvd-thomson-thd300-en-veille.jpg" "Lecteur de DVD Thomson THD300 en veille — bouton éclairé en rouge" "500w" 500 %}

Voici un enregistrement de 8 heures de la consommation lorsque l'appareil était en veille :
{% profile "lecteur-dvd-thomson-thd300.json.gz" '{"name":"En veille pendant 8h","range":"6999432m28775498"}' %}

La puissance mesurée a été à tout moment inférieure à {{ 1 | W }}, conformément à l'indication dans le manuel d'utilisation. Même si on est au-delà de la précision de l'appareil de mesure utilisé et que les mesures individuelles de puissance ne sont pas précises, la puissance moyenne reste significative : {{ 0.0126 | W }}.

C'est très peu ; on peut supposer que la consommation de veille a reçu une attention particulière lors de la conception de cet appareil, et c'est tant mieux !

Pour dépenser 1 centime d'électricité, il faudrait laisser l'appareil en veille {{ 0.101 | times: 3 | countPer€: 0.01 }} jours. S'il reste branché toute l'année, il consommera {{ 0.0126 | W€PerYear }} par an.

### Allumage, chargement du disque

Regardons maintenant l'évolution de la puissance consommée lors des moments particuliers où les moteurs électriques démarrent et s'arrêtent, c'est-à-dire lorsque l'appareil est allumé, et qu'un disque y est inséré.

{% image "./images/lecteur-dvd-thomson-thd300-ouvert.jpg" "Lecteur de DVD Thomson THD300 en veille — tiroir ouvert" "500w" 500 %}

Voici un enregistrement du scénario suivant :
- l'appareil a été mis en marche alors qu'il ne contenait pas de disque,
- 30 secondes plus tard, le bouton d'éjection a été pressé, causant l'ouverture du tiroir,
- un disque a été déposé sur le tiroir et le tiroir a été refermé 30 secondes après son ouverture,
- l'appareil a été mis en veille 30 secondes plus tard.

{% profile "lecteur-dvd-thomson-thd300.json.gz" '{"name":"Démarrage vide, ouverture du tiroir, chargement d\'un disque","range":"40893221m105343"}' %}

Sur l'enregistrement, nous pouvons réaliser les observations suivantes :
- la puissance dépasse {{ 6 | W }} pendant les 5 secondes qui suivent le démarrage ;
- l'appareil consomme environ {{ 4.3 | W }} lorsqu'il ne contient pas de disque (que le tiroir soit ouvert ou fermé) ;
- l'ouverture du tiroir cause un petit pic de consommation, avec une mesure à {{ 5.6 | W }} ;
- un pic de consommation est observé lorsque le tiroir est refermé et que le moteur d'entrainement du disque démarre, avec une mesure à {{ 7.4 | W }} ;
- la puissance consommée reste supérieure à {{ 6 | W }} pendant un peu plus de 5 secondes après l'insertion du disque, avant de se stabiliser à une puissance moyenne similaire à celle mesurée lors de la lecture d'un film.

On peut supposer que la puissance de {{ 4.3 | W }} mesurée lorsque l'appareil ne contient pas de disque correspond à la puissance consommée par l'électronique utilisée pour produire une image et la communiquer au téléviseur. C'est {{ 4.3 | percent: 5.88 }} de la puissance mesurée lors de la lecture d'un film. Avant de mesurer, j'aurais supposé que la mécanique utilisée pour garder le disque en rotation à vitesse constante aurait été le plus gros consommateur d'énergie.

{%# {% profile "lecteur-dvd-thomson-thd300.json.gz" '{"name":"Démarrage plein, ouverture du tiroir","range":"40688422m47645"}' #%}

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce lecteur de DVD Thomson THD300, on pourrait :
- essayer de lire différents types de support (un CD plutôt qu'un DVD, une clé USB, différents encodages vidéo) ;
- essayer de raccorder le téléviseur par la prise péritel plutôt que par la prise HDMI ;
- mesurer la consommation avec un appareil plus précis sur les faibles puissances et avec un taux d'échantillonnage plus élevé pour mieux visualiser ce qu'il se passe lorsque les moteurs du tiroir ou d'entrainement du disque démarrent ou s'arrêtent.
{% endplusloin %}
