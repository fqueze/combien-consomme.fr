---
layout: test-layout.njk
title: un découpe-légumes Moulinex Fresh Express
img: moulinex-fresh-express.jpg
date: 2026-02-20
tags: ['test']
---

Le Moulinex Fresh Express est un découpe-légumes électrique qui permet de râper, trancher et émincer en quelques secondes. Pratique et rapide à nettoyer, on l'utilise facilement au quotidien plutôt que de râper à la main. Combien d'électricité consomme-t-il pour préparer des crudités ?

<!-- excerpt -->

{% tldr %}
- En râpant 5 carottes par semaine, la consommation annuelle sera de {{ 0.622 | divided_by: 2 | times: 5 | times: 52 | Wh€ }}.
- Râper 2 carottes consomme {{ 0.622 | Wh€ }} en moins de 30 secondes, et il faudrait en râper {{ 0.622 | divided_by: 2 | countPer€: 0.01 }} pour dépenser un centime d'électricité.
- La puissance réellement mesurée (médiane {{ 92.1 | W }} à {{ 102 | W }}) est environ la moitié de la puissance nominale de {{ 200 | W }}.
- Le bouton poussoir mécanique garantit une consommation strictement nulle au repos.
{% endtldr %}

{% comment %}
Notes from draft:
sur le site du fabricant :
 "Une efficacité 3-en-1 pour toutes vos envies de légumes
    Un découpe-légumes électrique facile à utiliser pour des résultats parfaits en toute simplicité
    Système de cônes de couleur pour hacher, découper, râper facilement
    Conception intelligente : Une large goulotte, un système de service direct, des cônes amovibles
    Système de cônes empilables et range-cordon qui permettent de gagner de la place
    Facile à nettoyer : la goulotte et les cônes sont compatibles lave-vaisselle. La tête est amovible"
{% endcomment %}

## Le matériel

{% intro "moulinex-fresh-express.jpg" "Découpe-légumes Moulinex Fresh Express 3-en-1" %}

Le [Moulinex](https://fr.wikipedia.org/wiki/Moulinex "« Moulinex » sur Wikipédia") Fresh Express est un découpe-légumes électrique compact. Son principe est simple : on insère les aliments dans une goulotte verticale, un cône rotatif les découpe, et le résultat tombe directement dans un plat posé devant l'appareil. Trois cônes de couleur interchangeables permettent de râper, trancher finement ou émincer.

L'appareil est fabriqué en France par le groupe SEB. Il se distingue par sa facilité de mise en service : on branche, on appuie sur le bouton, et c'est parti. Le nettoyage est tout aussi rapide puisque la goulotte et les cônes passent au lave-vaisselle.

On a déjà testé un appareil du même type : le {% test robot-rapetout robot Rapetout %}, un modèle compact des années 90 que l'on tient à la main au-dessus de l'assiette. Le Fresh Express est plus imposant mais aussi plus stable et plus pratique pour de plus grandes quantités.

### Méthode de mesure

Le Moulinex Fresh Express est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

Les indications techniques sont inscrites en dessous de l'appareil :

{% image "./images/moulinex-fresh-express-etiquette.jpg" "Inscriptions techniques sous l'appareil : DJ753510/35A-1116 R, 220-240V 50-60 Hz, 200W, Type DJ75" "500w" 500 %}
{% comment %}(note : pas une étiquette mais des inscriptions à l'encre noire sur le plastique blanc, en dessous de l'appareil)

DJ753510/35A-1116 R
220-240V 50-60 Hz
200W
Type DJ75{% endcomment %}

On peut lire « *220-240V 50-60 Hz 200W* », soit une puissance nominale de {{ 200 | W }}. Voyons si cette puissance est réellement atteinte en pratique.

### Râper des carottes

Avant de commencer ce premier test de consommation, nous avons épluché 2 carottes :

{% image "./images/moulinex-fresh-express-2-carottes.jpg" "Deux carottes épluchées posées dans une assiette à côté du Fresh Express" "500w" 500 %}
{% comment %}2 carottes épluchées, posées dans une assiette sous le découpe légume{% endcomment %}

Les 2 carottes sont râpées en quelques secondes :

{% profile "moulinex-fresh-express-carottes.json.gz" '{"name": "2 carottes rapées", "range": "106591m28809"}' %}
{% comment %}draft: On a râpé 2 carottes, on voit clairement sur le profil qu'il y a une pause entre les deux quand on a re-rempli la goulotte{% endcomment %}

On observe clairement deux phases de consommation correspondant aux deux carottes, avec une courte pause entre les deux pour reremplir la goulotte. L'opération dure moins de 30 secondes et consomme {{ 0.622 | Wh€ }}. La puissance médiane est de {{ 92.1 | W }} pendant le fonctionnement, avec un maximum à {{ 97.2 | W }}, bien en dessous des {{ 200 | W }} nominaux.

Les carottes râpées tombent directement dans l'assiette placée sous l'appareil, même si quelques-unes ont atterri à côté :

{% image "./images/moulinex-fresh-express-carottes-rapees.jpg" "Carottes râpées tombant de l'appareil dans l'assiette, avec quelques-unes à côté" "500w" 500 %}
{% comment %}Les carottes sont râpées dans l'assiette, mais il y en a pas mal qui est tombé à côté. La prochaine fois j'utiliserai un saladier...{% endcomment %}

La prochaine fois, on utilisera un saladier.

### Râper de l'emmental

Pour le deuxième test, nous avons râpé un bloc d'emmental avec le cône orange. Le bloc entier tient dans la goulotte en un seul remplissage :

{% image "./images/moulinex-fresh-express-emmental-pret-a-raper.jpg" "Bloc d'emmental dans la goulotte du Fresh Express, avec le cône orange" "300w" 300 %}
{% comment %}photo montrant la quantité d'emmental qui a été râpée{% endcomment %}

L'opération est très rapide :

{% profile "moulinex-fresh-express.json.gz" '{"name": "Emmental rapé", "range": "135786m12839"}' %}
{% comment %}draft: On a râpé un bloc d'emmental. Un seul remplissage de la goulotte{% endcomment %}

On observe un seul bloc de consommation continu, sans pause. Le bloc d'emmental est râpé en une dizaine de secondes pour {{ 0.298 | Wh€ }}. La puissance médiane est de {{ 102 | W }}, avec un maximum à {{ 117 | W }}. C'est légèrement plus que pour les carottes (médiane {{ 92.1 | W }}) : on peut supposer que l'emmental, matière un peu élastique, offre davantage de résistance au cône.

L'emmental râpé finement tombe sur la planche à découper :

{% image "./images/moulinex-fresh-express-emmental.jpg" "Emmental râpé finement à la sortie de l'appareil, sur une planche à découper en bois" "500w" 500 %}
{% comment %}Emmental râpé à la sortie de l'appareil, cette fois sur une planche à découper en bois{% endcomment %}

### Découper des radis en lamelles

Pour ce troisième test, nous avons découpé une petite botte de 17 radis en lamelles fines avec le cône vert :

{% image "./images/moulinex-fresh-express-radis.jpg" "17 radis lavés et épluchés sur la planche" "300w" 300 %}
{% comment %}les radis que nous allons découper en tranches fines, lavés et épluchés, posés sur la planche{% endcomment %}

La goulotte ne peut contenir que quelques radis à la fois. On la remplit, on appuie sur le bouton, et on recommence :

{% image "./images/moulinex-fresh-express-radis-dans-la-cheminee.jpg" "5 radis dans la goulotte du Fresh Express, prêts à être découpés, avec le cône vert visible" "500w" 500 %}
{% comment %}5 radis sont dans la goulotte, prêts à être découpés. On voit bien le cône vert{% endcomment %}

L'ensemble de l'opération dure environ 5 minutes et demie, le temps de traiter la botte :

{% profile "moulinex-fresh-express-radis.json.gz" '{"name": "Découpe de radis en lamelles", "range": "278954m326030"}' %}
{% comment %}draft: On a découpé une petite botte de radis (il y en a 17 sur la photo) en lamelles fines avec un cône vert. On a dû reremplir la goulotte d'alimentation plusieurs fois, ce qui explique pourquoi on a sur l'enregistrement des alternances entre une consommation et pas de consommation.{% endcomment %}

Le profil est très caractéristique : on voit clairement les alternances entre les phases de découpe et les pauses pour reremplir la goulotte (0W), un peu comme pour {% test centrifugeuse-philips une centrifugeuse %} où l'on pousse les fruits un par un. La consommation totale est de {{ 1.98 | Wh€ }}. La puissance pendant les phases de découpe est similaire à celle observée sur les carottes (médiane {{ 92.1 | W }}), avec un bref pic à {{ 150 | W }} au tout premier démarrage. La puissance moyenne sur l'ensemble n'est que de {{ 21.9 | W }} car l'appareil passe plus de temps à attendre qu'à découper.

Les radis découpés en fines lamelles ont fait un topping croquant et original pour {% test mixer-une-soupe la soupe %} de la petite dernière :

{% image "./images/moulinex-fresh-express-radis-toping-soupe.jpg" "Un bol de radis coupés finement à côté d'un bol de soupe, avec quelques rondelles de radis en topping" "500w" 500 %}
{% comment %}un bol de radis coupés finement à côté d'un bol de soupe, dans laquelle 3 ou 4 rondelles de radis sont visibles sur le dessus. Les radis ont fait un toping croquant et original pour la soupe de la petite dernière, dont on aperçoit les main (une main déposant une rondelle de radis dans la soupe et l'autre tenant une cuillère).{% endcomment %}

### Synthèse

La puissance réelle du Fresh Express est très similaire pour les trois aliments que nous avons mesurés : la puissance médiane va de {{ 92.1 | W }} pour les carottes à {{ 102 | W }} pour l'emmental. C'est environ la moitié de la puissance nominale de {{ 200 | W }} indiquée sur l'appareil. Seul l'emmental demande un peu plus de puissance (max {{ 117 | W }}), peut-être en raison de sa texture élastique qui offre davantage de résistance.

En comparaison, le {% test robot-rapetout robot Rapetout %} des années 90 consommait {{ 46.8 | W }} en moyenne pour râper des carottes, avec un maximum à {{ 88.4 | W }}. Le Fresh Express est donc un peu plus gourmand, mais aussi bien plus rapide, et reste dans le même ordre de grandeur.

L'appareil n'a pas d'électronique : le bouton est un simple poussoir mécanique. Quand on relâche le bouton, le moteur s'arrête et la consommation est strictement nulle. Pas besoin de le débrancher après utilisation.

### Coût d'usage

Râper 2 carottes coûte {{ 0.622 | Wh€ }}. Il faudrait en râper {{ 0.622 | divided_by: 2 | countPer€: 0.01 }} pour dépenser un centime d'électricité.

Si l'on suppose que l'on râpe 5 carottes par semaine pour préparer des crudités, la consommation annuelle sera de {{ 0.622 | divided_by: 2 | times: 5 | times: 52 | Wh€ }}. Même une famille plus nombreuse qui râperait 5 carottes tous les jours ne dépenserait que {{ 0.622 | divided_by: 2 | times: 5 | Wh€PerYear }} par an.

À ce rythme, la consommation électrique n'approchera jamais le prix d'achat de l'appareil (environ {{ 35 | € }} neuf, au moins {{ 10 | € }} d'occasion). Le coût des carottes dépasse de très loin le coût de l'électricité pour les râper.

### Conseils pour l'autoconsommation photovoltaïque

La puissance du Fresh Express en fonctionnement (médiane de {{ 92.1 | W }} à {{ 102 | W }} selon l'aliment) est très faible par rapport à la capacité d'une installation photovoltaïque domestique standard. Une installation en toiture de 3 kWc produira largement de quoi alimenter cet appareil, même par temps couvert. Même un kit plug & play sur un balcon suffirait en milieu de journée.

La durée d'utilisation est si courte (quelques secondes à quelques minutes) et la puissance si faible qu'il suffit d'un peu de soleil pour couvrir largement la consommation de l'appareil. On privilégiera simplement de l'utiliser en journée, par exemple pour préparer le déjeuner ou le dîner tant qu'il fait jour.

Cela dit, avec un coût électrique de {{ 0.622 | Wh€ }} par utilisation, l'enjeu économique est inexistant. L'intérêt reste de principe : utiliser directement l'énergie solaire plutôt que celle du réseau.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du Fresh Express, on pourrait :
- tester d'autres aliments de duretés variées (concombre, courgette, pommes de terre crues) pour confirmer l'influence de la résistance de l'aliment sur la puissance consommée ;
- comparer la consommation entre les différents cônes (vert pour trancher, orange pour râper fin) sur un même aliment ;
- mesurer la consommation pour une plus grande quantité de carottes (5 ou 10) afin de vérifier la proportionnalité ;
- comparer plus en détail avec des modèles plus anciens comme le {% test robot-rapetout Rapetout %} sur un même aliment, pour mesurer l'évolution de la consommation au fil des générations.
{% endplusloin %}
