---
layout: test-layout.njk
title: un vieux vidéoprojecteur
img: vieux-videoprojecteur.jpg
date: 2026-07-03
tags: ['test']
---

Projeter un film sur le mur du salon à l'ancienne, avec un vieux vidéoprojecteur à lampe : entre la lampe qu'on n'éteint pas d'un simple clic et la veille permanente, combien coûte ce plaisir démodé ?

<!-- excerpt -->

{% assign veille_wh_an = 0.309 | times: 24 | PerYear %}
{% assign veille_heures = veille_wh_an | divided_by: 223 | round %}
{% assign veille_films = veille_wh_an | divided_by: 391 | round %}

{% tldr %}
- Une projection de film d'1h45 consomme {{ 391 | Wh€ }}, à une puissance remarquablement stable d'environ {{ 223 | W }}, soit {{ 223 | Wh€ }} par heure.
- À raison d'un film par semaine, cela représente {{ 391 | times: 52 | Wh€ }} d'électricité sur l'année.
- En veille il consomme {{ 0.309 | W }} : oublié branché toute l'année, cela fait {{ 0.309 | W€PerYear }}, autant que {{ veille_heures }} heures de projection. Le débrancher entre deux séances supprime cette consommation.
{% endtldr %}

{% comment %}
Notes from draft:
un vieux vidéoprojecteur Nobo WX28 achetée pour une très petite somme au marché aux puces, mais en fait il était en panne, on voit sur les images qu'il y a plein de pixels morts. Ça n'a pas empêché de l'utiliser de temps en temps (rarement) pour regarder un film projeté sur un mur du salon, voire même parfois au plafond.

Sa lampe est donnée pour 185W

Features
• Ultra bright 2800 ANSI lumens lamp and a 3000:1 contrast ratio provides sparkling image quality
• Weight 2.3 kg
• Whisper quiet in use (28 dB)
• 3 year warranty
• Digital HDMI port

From the manual: "Eco (<1W) mode will disable the VGA-out function when the projector is in standby."

Brightness Mode
- STD: Choose “STD” to dim the projector lamp which will lower power consumption and extend the lamp life by up to 130%.
- BRIGHT: Choose “BRIGHT” to increase the brightness
{% endcomment %}

## Le matériel

{% intro "vieux-videoprojecteur.jpg" "Le vidéoprojecteur Nobo WX28, allumé, posé sur une table" %}

Ce Nobo WX28 est un vidéoprojecteur [DLP](https://fr.wikipedia.org/wiki/Digital_Light_Processing "Page « Digital Light Processing » sur Wikipédia") de salon des années 2010, compact (2,3 kg) et au boîtier deux tons, noir laqué sur le dessus et gris argent sur les flancs. Le fabricant l'annonce pour 2800 lumens ANSI et un contraste de 3000:1.

Je l'ai acheté une bouchée de pain au marché aux puces, vendu « en l'état ». Il fonctionne encore, mais il a manifestement beaucoup vécu : une fois rentré, j'ai découvert que l'image était criblée de pixels morts. Cela ne m'a pas empêché de m'en servir de temps en temps, assez rarement, pour regarder un film projeté sur un mur du salon, et même parfois au plafond.
{% endintro %}

L'objectif occupe un coin de la façade, avec la molette de mise au point sur le dessus et, à côté, ce qui ressemble à un capteur infrarouge pour une télécommande (que je n'ai pas) :

{% image "./images/vieux-videoprojecteur-trois-quart-avant-gauche.jpg" "Vue de trois-quarts avant gauche : objectif, molette de mise au point et capteur infrarouge" "500w" 500 %}
{% comment %}de ce côté on voit l'objectif, le réglage de mise point sur le dessus, et sur la façade quelque chose qui ressemble à un capteur infrarouge pour une télécommande (que je n'ai pas){% endcomment %}

De l'autre côté, la façade est largement occupée par la grille de ventilation, indispensable pour évacuer la chaleur de la lampe :

{% image "./images/vieux-videoprojecteur-trois-quart-avant-droit.jpg" "Vue de trois-quarts avant droit : la grille de ventilation occupe une bonne partie de la façade" "500w" 500 %}
{% comment %}on voit beaucoup la grille de ventilation de la façade{% endcomment %}

À l'arrière, la connectique trahit son âge : deux prises VGA (entrée et sortie), de la vidéo composite et S-Video, des prises audio, et la prise d'alimentation. On distingue aussi une prise HDMI, un peu moins visible car le câble qui relie le projecteur à l'ordinateur y est déjà branché :

{% image "./images/vieux-videoprojecteur-arriere.jpg" "Vue arrière : connectique VGA, composite, S-Video et audio" "500w" 500 %}
{% comment %}2 prises vga, une prise hdmi, etc...{% endcomment %}

## Consommation

### Informations fournies par le fabricant

L'étiquette sous l'appareil confirme le modèle et indique l'alimentation acceptée :

{% image "./images/vieux-videoprojecteur-etiquette.jpg" "Étiquette signalétique : Nobo WX28, AC 100-240V~ 50-60Hz/2.6A" "500w" 500 %}
{% comment %}nobo
DLP Projection Display
Model :WX28
Input :AC 100-240V~ 50-60Hz/2.6A
Made in China{% endcomment %}

On y lit « *AC 100-240V~ 50-60Hz/2.6A* », soit une intensité maximale de 2,6 A. Sous 230 V, cela laisse de la marge pour une consommation de quelques centaines de watts, sans nous dire ce que l'appareil tire réellement.

Le manuel est un peu plus précis : la lampe est donnée pour 185 W, et un mode « *Eco (<1W)* » est annoncé pour la veille. Le manuel décrit aussi deux modes de luminosité, *STD* (lampe atténuée, qui réduit la consommation et prolonge la durée de vie de la lampe) et *BRIGHT* (luminosité maximale). Mesurons ce qu'il consomme réellement.

### Méthode de mesure

Avec une intensité maximale de 2,6 A, l'appareil reste largement sous les capacités d'une prise connectée classique. Je l'ai donc branché sur une prise Shelly, comme décrit dans {% post mesurer-la-consommation-avec-shelly-plus-plug-s la mesure de consommation avec une prise Shelly Plus Plug S %}.

### Un film

Pour le test, j'ai projeté *L'Aile ou la cuisse*, un grand classique de la comédie française, bien plus vieux encore que le projecteur. Voici le mur pendant le générique de début :

{% image "./images/vieux-videoprojecteur-film.jpg" "Le générique de début du film projeté sur le mur, avec de nombreux points blancs" "500w" 500 %}
{% comment %}photo du mur pendant le générique de début du film l'aile ou la cuisse. On voit différents niveaux de luminosité avec un premier rectangle extérieur, contenant un trapèze plus clair, puis l'image du film dans un rectangle plus clair encore. On voit aussi (surtout ?) de nombreux points blancs qui montrent que ce videoprojecteur est en fin de vie (voire au delà){% endcomment %}

On distingue plusieurs niveaux de luminosité : un grand rectangle extérieur, un trapèze plus clair à l'intérieur, puis l'image du film à proprement parler. Ce trapèze vient de la correction de parallélisme intégrée : l'objectif n'étant pas parfaitement en face du mur, je m'en suis servi pour redresser l'image réellement projetée. Surtout, on remarque les nombreux points blancs, un nuage de pixels morts concentré en haut à droite, qui montrent que ce vidéoprojecteur est en fin de vie, voire au-delà. Ils restent bien visibles jusqu'à la fin du film :

{% image "./images/vieux-videoprojecteur-fin-du-film.jpg" "Une scène de fin du film, avec le même nuage de pixels morts en haut à droite" "500w" 500 %}
{% comment %}image de fin du film, où l'acteur principal a une surprise dans son repas{% endcomment %}

Côté consommation, sur les {{ 6306978 | divided_by: 1000 | s }} du film, du premier gag jusqu'au bouquet final où Louis de Funès retrouve sa montre dans le plat qu'on lui sert à l'Académie française, la puissance est remarquablement stable autour de {{ 223 | W }}, pour une énergie totale de {{ 391 | Wh€ }} :

{% profile "vieux-videoprojecteur.json.gz" '{"name": "Film d\'1h45", "range": "118917m6306978"}' %}

La courbe est quasiment plate : médiane et moyenne sont identiques ({{ 223 | W }}), et le maximum ne dépasse pas {{ 229 | W }}. La consommation ne dépend donc pas du contenu projeté : qu'une scène soit claire ou sombre, c'est la lampe qui domine, et elle reste allumée à pleine puissance du début à la fin. À {{ 223 | W }}, l'appareil complet consomme nettement plus que les 185 W annoncés pour la seule lampe : il faut y ajouter la ventilation, l'électronique de commande, et les pertes de l'alimentation qui convertit le courant alternatif du secteur en courant continu.

### Le démarrage

L'allumage suit plusieurs étapes :

{% profile "vieux-videoprojecteur.json.gz" '{"name": "Démarrage", "range": "30345m88572"}' %}
{% comment %}draft: un premier pic de 2 secondes à 78,6W correspondant probablement à la charge de condensateur, puis une faible conso jusqu'au démarrage où la consommation augmente progressivement sur 40s.{% endcomment %}

On observe d'abord un pic d'environ 2 secondes à {{ 78.6 | W }}, au moment où j'ai rebranché ce projecteur pour la première fois après des mois sans servir : il correspond probablement à la charge des condensateurs de l'alimentation. La consommation retombe ensuite très bas pendant un moment, le temps que l'appareil reste en veille. Puis, quand j'appuie sur le bouton de mise en marche, la lampe s'amorce et la puissance remonte progressivement sur une quarantaine de secondes jusqu'au régime de fonctionnement. C'est une fois la lampe pleinement allumée que la puissance est la plus élevée, avec une pointe à {{ 240 | W }} avant de se stabiliser autour de {{ 223 | W }}.

### L'arrêt

À l'extinction, l'appareil ne se coupe pas immédiatement :

{% profile "vieux-videoprojecteur.json.gz" '{"name": "Arrêt", "range": "6649253m59563"}' %}
{% comment %}draft: Lors de l'arrêt la consommation descend d'abord un peu pendant 10s, puis beaucoup pendant 15s de plus où il ne reste probablement plus que le ventilateur pour refroidir la lampe{% endcomment %}

La consommation descend d'abord un peu pendant une dizaine de secondes, puis chute fortement. Pendant les quinze secondes suivantes, il ne reste probablement plus que le ventilateur en marche pour refroidir la lampe avant l'arrêt complet. Ce comportement est classique sur les vidéoprojecteurs à lampe : la ventilation doit continuer à tourner un moment, car laisser une lampe chaude sans refroidissement réduirait sa durée de vie. C'est pour cela qu'on ne débranche pas l'appareil juste après l'avoir éteint.

### La veille

Une fois éteint mais resté branché, l'appareil signale qu'il est en veille par un voyant rouge sur le dessus :

{% image "./images/vieux-videoprojecteur-dessus.jpg" "Vue de dessus : le voyant rouge indique la mise en veille" "500w" 500 %}
{% comment %}point rouge = il est en veille{% endcomment %}

Sur 8 heures de veille, la consommation moyenne est de {{ 0.309 | W }} :

{% profile "vieux-videoprojecteur.json.gz" '{"name": "8h éteint", "range": "6941621m28821260"}' %}

C'est conforme au mode « *Eco (<1W)* » annoncé dans le manuel, qui désactive la sortie VGA pour rester sous 1 W. En valeur absolue, c'est peu. Mais comparé à des appareils plus récents, cette veille reste élevée : un {% test moniteur-27pouces-4k-dell-p2715q moniteur 4K récent %} ou un {% test lecteur-dvd-thomson-thd300 lecteur de DVD %} restent tous deux sous {{ 0.06 | W }} en veille, soit environ cinq fois moins. Laissé branché toute l'année, ce vidéoprojecteur consommerait ainsi {{ 0.309 | W€PerYear }} sans rien projeter. Mieux vaut donc le débrancher entre deux séances : quelques secondes de geste par an suffisent à ramener cette consommation à zéro.

## Coût d'usage

Le coût électrique d'une projection de film, {{ 391 | Wh€ }}, est faible : il faudrait projeter {{ 391 | countPer€: 1 }} films pour dépenser un seul euro d'électricité. Ramené à l'heure, à {{ 223 | W }} de puissance, cela représente {{ 223 | Wh€ }} par heure de projection, ce qui vaut aussi pour un autre usage courant de ce genre d'appareil, projeter des diapositives ou une présentation.

Reste à voir ce que cela donne selon la fréquence d'usage :

- un film par mois : {{ 391 | times: 12 | Wh€ }} sur l'année ;
- un film par semaine : {{ 391 | times: 52 | Wh€ }} sur l'année ;
- un film par soir : {{ 391 | Wh€PerYear }} sur l'année.

Il faut donc en faire un usage quotidien et soutenu pour que la facture devienne sensible. Pour un usage occasionnel comme le mien, quelques films par an, le coût annuel de la projection reste anecdotique.

À côté, la veille n'est pas négligeable pour autant : laissé branché toute l'année, l'appareil consomme {{ 0.309 | W€PerYear }} sans rien projeter. C'est autant que {{ veille_heures }} heures de projection, soit à peu près l'équivalent de {{ veille_films }} films. Autrement dit, oublier de le débrancher revient, sur l'année, à regarder quelques films de plus. Le débrancher entre deux séances suffit à supprimer entièrement cette consommation.

### Faut-il le remplacer ?

Sur le plan purement électrique, la question ne se pose pas vraiment : acheté une bouchée de pain « en l'état », ce vidéoprojecteur ne doit presque rien à personne, et le surcoût de consommation d'un vieux modèle à lampe reste sans commune mesure avec le prix d'un appareil neuf. Ce n'est donc pas l'électricité qui justifierait de le changer.

Mais côté image, le verdict est tout autre : avec ce nuage de pixels morts, la qualité est médiocre, et oui, il mériterait clairement d'être remplacé. Idéalement par un modèle plus récent, à LED, à la fois plus net et moins énergivore, et de préférence lui aussi d'occasion, pour rester dans l'esprit de la récup'.

## Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ 223 | W }} de ce vidéoprojecteur est modeste et remarquablement stable : quelques centaines de watts de panneaux suffiraient largement à la couvrir en milieu de journée ensoleillée, et une installation en toiture standard de 3 kWc l'alimenterait sans difficulté du moment qu'il fait jour. Sur le papier, c'est donc un appareil facile à faire tourner au solaire.

En pratique, le problème vient de l'usage. Si le vidéoprojecteur sert à regarder un film, c'est le plus souvent le soir, précisément le moment où la production solaire est faible ou nulle. Le seul créneau qui coïnciderait avec une bonne production serait une rare séance de jour, un week-end par exemple, dans une pièce qu'on peut assombrir aux heures les plus ensoleillées. Autant dire que ce vidéoprojecteur épouse mal le rythme d'une installation domestique : ce n'est pas une question de puissance, mais d'horaire.

Cela dit, avec un coût électrique de {{ 391 | Wh€ }} par film, l'enjeu économique est de toute façon limité. Brancher cet appareil au moment où le soleil produit relève plus du geste symbolique que de l'économie réelle.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce vidéoprojecteur, on pourrait :
- mesurer l'écart de consommation entre les deux modes de luminosité, *STD* (lampe atténuée) et *BRIGHT* (luminosité maximale), pour savoir combien d'énergie économise le mode *STD* ;
- vérifier si la consommation reste la même en affichant un menu fixe ou une mire plutôt qu'un film, pour confirmer que c'est bien la lampe, et non le traitement de l'image, qui domine ;
- comparer cette projection à celle d'un vidéoprojecteur récent à LED, ou à un téléviseur de taille d'écran équivalente, pour le même film, afin de situer ce vieux modèle à lampe face aux technologies actuelles.
{% endplusloin %}
