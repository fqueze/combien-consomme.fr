---
layout: test-layout.njk
title: la cuisson d'artichauts à la cocotte-minute
img: cuisson-artichauts.jpg
date: 2026-06-25
tags: ['test']
---

Cinq artichauts, une cocotte-minute et une plaque à induction : la cuisson à la vapeur sous pression a la réputation d'être économe. Mais combien consomme-t-elle vraiment, et où part l'énergie ?

<!-- excerpt -->

{% tldr %}
- Une cuisson de légumes d'une petite demi-heure par semaine revient à {{ 531 | times: 52 | Wh€ }} sur l'année.
- Cuire cinq artichauts coûte {{ 531 | Wh€ }} d'électricité en 27 minutes : c'est négligeable comparé au prix des artichauts.
- La montée en pression (5 minutes à {{ 2320 | W }}) représente {{ 199 | percent: 531 }} de l'énergie pour {{ 309999 | divided_by: 1000 | percent: 1620 }} du temps : c'est le démarrage à froid qui coûte, pas la cuisson.
- Une fois en pression, {{ 952 | W }} suffisent à entretenir le jet de vapeur pendant les 20 minutes de cuisson.
{% endtldr %}

{% comment %}
Notes from draft:
5 artichauts ont été cuits à la vapeur dans une cocotte minute de 4,5L. La plaque à induction sur laquelle la cocotte a été posée a d'abord été réglée à la puissance maximale jusqu'à ce que la cocotte émette de la vapeur, puis la puissance de la plaque a été réduite de façon à conserver juste assez de puissance pour que le jet de vapeur continue, et une minuterie de 20 minutes a été utilisée pour décider d'arrêter la plaque après. On observe sur le profil qu'après l'arrêt, il reste une petite consommation résiduelle ; on entendait un bruit de ventilateur.
{% endcomment %}

## Le matériel

{% intro "cuisson-artichauts.jpg" "Cinq artichauts dans une cocotte-minute posée sur une plaque à induction" %}

Au menu : cinq artichauts de taille moyenne, que l'on va cuire à la vapeur sous pression dans un [autocuiseur](https://fr.wikipedia.org/wiki/Autocuiseur "Page « Autocuiseur » sur Wikipédia") SEB Clipso de 4,5 litres, posé sur une table à induction IKEA HÖGKLASSIG. La cocotte ne consomme rien par elle-même : c'est un simple récipient qui retient la pression, et l'énergie mesurée est celle de la plaque.
{% endintro %}

Avant de les cuire, il faut retirer aux artichauts leur queue, encore présente sur cette photo :

{% image "./images/cuisson-artichauts-5-artichauts-avec-queues.jpg" "Cinq artichauts crus, avec leur queue, sur le plan de travail" "500w" 500 %}
{% comment %}5 artichauts de taille moyenne sur le plan de travail, ils ont encore leur queue, qu'il faudra enlever avant la cuisson{% endcomment %}

Le couvercle de la cocotte porte la marque, le nom du modèle, la soupape à quatre positions (2, 1, décompression, 0) et le témoin de pression rouge :

{% image "./images/cuisson-artichauts-cocotte-dessus.jpg" "Le couvercle de la cocotte-minute SEB Clipso vu de dessus" "500w" 500 %}
{% comment %}la cocotte vue de dessus, on voit bien la marque "SEB", le nom de modèle "Clipso", la soupape avec ses 4 positions (2, 1, dépressurisation, 0) et le témoin de pression en plastique rouge{% endcomment %}

Son fond, vu de dessous, indique une contenance de 4,5 L et une compatibilité induction (« DIFFUSAL — INDUCTION »), avec la mention « MADE IN FRANCE » :

{% image "./images/cuisson-artichauts-cocotte-dessous-zoom.jpg" "Le fond de la cocotte, zoom sur les indications SEB DIFFUSAL 4,5 L" "500w" 500 %}
{% comment %}DIFFUSAL - INDUCTION
SEB
4,5L
18-10
MADE IN FRANCE{% endcomment %}

L'étiquette de la plaque à induction annonce une puissance totale de 7,35 kW, répartie sur l'ensemble des foyers :

{% image "./images/cuisson-artichauts-etiquette.jpg" "Étiquette signalétique de la plaque à induction IKEA HÖGKLASSIG" "700w" 700 %}
{% comment %}HÖGKLASSIG
Voltage: 220-240V 50-60Hz
Rated power: 7,35 kW
Induction: 7,35 kW{% endcomment %}

### Méthode de mesure
La consommation a été enregistrée avec un module Shelly Pro EM-50 et une pince ampèremétrique placée sur la ligne de la plaque, le même montage que celui utilisé pour {% test seche-linge-a-evacuation un sèche-linge %} : ce type d'{% post mesurer-la-consommation-avec-shelly-em enregistreur %} est bien adapté à un appareil aussi puissant qu'une plaque à induction.

## Consommation

Voici le profil complet de la fournée, du moment où la plaque est allumée jusqu'à son extinction après les 20 minutes de cuisson :

{% profile "cuisson-artichauts.json.gz" '{"name": "Cuisson complète", "range": ""}' %}

En 27 minutes, la cuisson a consommé {{ 531 | Wh€ }}. Le profil montre clairement deux plateaux : un premier plateau élevé pendant que la cocotte monte en pression, puis un plateau plus bas pendant la cuisson proprement dite, et enfin une chute à l'extinction vers une valeur proche de zéro, mais pas tout à fait nulle. Regardons ces trois phases l'une après l'autre.

### La montée en pression

Les artichauts sont placés dans la cocotte avec un peu d'eau au fond, juste avant de démarrer :

{% image "./images/cuisson-artichauts-prets-a-cuire.jpg" "Les cinq artichauts dans la cocotte avec un peu d'eau, prêts à cuire" "500w" 500 %}
{% comment %}les artichauts dans la cocotte, avec un peu d'eau au fond, juste avant de démarrer la cuisson{% endcomment %}

Une fois la cocotte fermée, on lance la plaque à sa puissance maximale (« 9 ») pour porter l'eau à ébullition le plus vite possible. L'afficheur de la plaque indique bien le foyer réglé à 9 :

{% image "./images/cuisson-artichauts-plaque-a-9.jpg" "La cocotte fermée sur la plaque, dont l'afficheur indique la puissance 9" "500w" 500 %}
{% comment %}la mise en pression démarre, la plaque est à la force maximum (9), la cocotte est en place mais son indicateur de pression n'est pas encore visible{% endcomment %}

Au bout de quelques minutes, le témoin de pression rouge se soulève, signe que la pression monte à l'intérieur, mais aucune vapeur ne sort encore par la soupape :

{% image "./images/cuisson-artichauts-indicateur-pression.jpg" "Le témoin de pression rouge soulevé sur le couvercle de la cocotte" "500w" 500 %}
{% comment %}l'indicateur de pression (en morceau de plastique rouge de forme ronde) est maintenant visible, mais il n'y a pas encore de vapeur qui sort{% endcomment %}

La mise en pression est terminée lorsque la vapeur commence à s'échapper de la soupape :

{% image "./images/cuisson-artichauts-vapeur.jpg" "De la vapeur s'échappe de la soupape de la cocotte en pression" "500w" 500 %}
{% comment %}la mise en pression est terminée : l'indicateur de pression est présent, et de la vapeur sort par la soupape.{% endcomment %}

Voici la consommation pendant cette mise en pression :

{% profile "cuisson-artichauts.json.gz" '{"name": "Montée en pression", "range": "m309999"}' %}

Pendant ces 5 minutes, la plaque tire {{ 2320 | W }} en continu (médiane), avec une pointe à {{ 2404 | W }}. C'est un plateau bien plat : à plein régime, l'induction délivre une puissance constante pour chauffer l'eau le plus vite possible. Les {{ 7350 | W }} affichés sur l'étiquette correspondent à la puissance totale de la table sur l'ensemble de ses foyers : un seul foyer au maximum n'en représente ici qu'environ un tiers. Cette phase consomme {{ 199 | Wh€ }}.

### Les 20 minutes de cuisson

Une fois la vapeur établie, on baisse la puissance de la plaque pour garder juste assez de chaleur pour que le jet de vapeur continue, sans gaspiller en chauffant plus que nécessaire. La position « 7 » est le réglage le plus bas qui convienne : à « 6 », le jet de vapeur s'arrête au bout de quelques secondes, signe que la pression n'est plus entretenue. On lance alors une minuterie de 20 minutes.

{% image "./images/cuisson-artichauts-cuisson-a-7.jpg" "La cocotte en pression sur la plaque réglée à la puissance 7" "500w" 500 %}
{% comment %}la cuisson à proprement parler est lancée : la cocotte est en pression, de la vapeur en sort par la soupape, et la force de la plaque est réduite à "7" pour garder la pression{% endcomment %}

Le jet de vapeur monte vers {% test hotte-de-cuisine la hotte de cuisine %}, que nous avons donc allumée pour évacuer la vapeur pendant la cuisson :

{% image "./images/cuisson-artichauts-allumage-hote-de-cuisine.jpg" "Le jet de vapeur de la cocotte qui monte vers la hotte de cuisine allumée" "500w" 500 %}
{% comment %}la cocotte minute est en pression, on voit un jet de vapeur qui s'échappe de la soupape, vers la hotte de cuisine (on pourra mettre un lien vers ce test !) qui est en fonctionnement{% endcomment %}

Voici la consommation pendant ces 20 minutes :

{% profile "cuisson-artichauts.json.gz" '{"name": "20 minutes de cuisson sous pression", "range": "310065m1257120"}' %}

La plaque se stabilise à {{ 952 | W }} (médiane comme moyenne sont identiques, le plateau est très régulier), avec une pointe à seulement {{ 984 | W }}. Entretenir la pression coûte donc bien moins cher que de la créer : cette phase consomme {{ 333 | Wh€ }}.

La comparaison entre les deux phases est frappante : les 5 minutes de montée en pression pèsent {{ 199 | percent: 531 }} de l'énergie totale, alors qu'elles ne représentent que {{ 309999 | divided_by: 1000 | percent: 1620 }} du temps. Autrement dit, amener la cocotte en pression consomme plus de la moitié de l'énergie des 20 minutes de cuisson qui suivent ({{ 333 | percent: 531 }} du total), pour quatre fois moins de temps. C'est le démarrage à froid qui pèse, pas la cuisson elle-même.

### Après l'extinction

Quand la minuterie sonne, on coupe la plaque. La cuisson, elle, continue encore un peu : la cocotte reste chaude et sous pression plusieurs minutes, et l'on attend avant de la dépressuriser pour profiter de cette chaleur résiduelle plutôt que de la gaspiller. Côté plaque, en revanche, une fois éteinte, elle ne consomme presque plus rien, juste de quoi faire tourner son ventilateur de refroidissement pendant une petite minute :

{% profile "cuisson-artichauts.json.gz" '{"name": "Ventilation", "range": "1567184m51816"}' %}

Cette ventilation résiduelle dure une cinquantaine de secondes à un peu plus de {{ 2 | W }}, pour une consommation totale de {{ 0.0154 | Wh }} : de quoi entendre le ventilateur, mais rien de plus. La toute première partie du profil affiche même des valeurs négatives, sans doute un effet de l'induction qui renvoie un peu de courant au moment de l'arrêt ; si on les exclut, le total monte à {{ 0.029 | Wh }}, soit presque le double, mais cela reste infime. Quoi qu'il en soit, à cette puissance, il faudrait que le ventilateur tourne en continu pendant de nombreuses heures pour dépenser un seul centime.

## Coût d'usage

Cuire cinq artichauts coûte {{ 531 | Wh€ }} d'électricité, soit {{ 531 | divided_by: 5 | Wh€ }} par artichaut. Il faudrait répéter la cuisson {{ 531 | countPer€: 1 }} fois pour dépenser un euro d'électricité : autant dire que le poste énergétique est négligeable comparé au prix des artichauts.

Les artichauts se mangent surtout au printemps et en été. En supposant une cuisson toutes les deux semaines pendant les six mois de pleine saison, soit une douzaine de fois dans l'année, l'électricité représenterait {{ 531 | times: 12 | Wh€ }} sur l'année.

Cet autocuiseur ne sert d'ailleurs pas qu'aux artichauts : la soupe en hiver, par exemple. Une cuisson de légumes d'une petite demi-heure chaque semaine de l'année revient à {{ 531 | times: 52 | Wh€ }}. L'autocuiseur lui-même a été acheté d'occasion une dizaine d'euros au marché aux puces : à ce rythme hebdomadaire, il faudrait {{ 531 | times: 52 | countPer€: 10 }} an de cuissons pour dépenser en électricité l'équivalent de ce prix d'achat. Un autocuiseur neuf coûte plutôt près de 100 €, soit {{ 531 | times: 52 | countPer€: 100 }} ans d'électricité au même rythme : avant de les atteindre, ce sont sans doute les joints qui fatigueront, et il n'est pas toujours facile d'en retrouver pour un vieux modèle.

## Conseils pour l'autoconsommation photovoltaïque

La cuisson est courte (27 minutes), mais comme les artichauts se mangent chauds, on les cuit juste avant de passer à table : l'heure de la cuisson est donc dictée par celle du repas. La meilleure façon de la faire coïncider avec la production solaire est alors de manger ses artichauts le midi plutôt que le soir, quand le soleil est à son maximum.

La difficulté tient à la puissance : pendant les 5 minutes de montée en pression, la plaque tire {{ 2320 | W }}, ce qui est élevé pour une installation photovoltaïque domestique. Une installation en toiture standard de 3 kWc produit assez en milieu de journée bien ensoleillée pour absorber cette pointe ; le reste de la cuisson, à {{ 952 | W }}, est nettement plus facile à couvrir.

Pour ne pas dépasser ce que les panneaux fournissent, mieux vaut éviter de lancer la montée en pression en même temps qu'un autre gros appareil. Dans la cuisine, c'est surtout le risque de cumuler les cuissons (le four, une autre plaque) ou de faire tourner le lave-vaisselle au même moment ; ailleurs dans la maison, {% test machine-a-laver un lave-linge %} ou {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} tirent eux aussi beaucoup d'un coup.

Cela dit, avec un coût électrique de {{ 531 | Wh€ }} par cuisson, l'enjeu économique reste très faible. L'intérêt est surtout environnemental : cuire ses artichauts directement avec l'électricité du soleil plutôt qu'avec celle du réseau.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette cuisson d'artichauts, on pourrait :
- cuire cinq artichauts similaires à l'eau bouillante dans une casserole, sans pression, pour comparer l'énergie totale à celle de l'autocuiseur et chiffrer ce que fait gagner la cuisson sous pression ;
- refaire la même cuisson dans des autocuiseurs de tailles différentes : les 4,5 L utilisés ici sont parmi les plus petits, alors que les modèles de 6 L sont très répandus et certains montent jusqu'à 10 L, ce qui change la masse de métal et le volume à monter en pression ;
- refaire la cuisson avec un volume d'eau différent au fond de la cocotte, pour mesurer l'effet de l'eau à chauffer sur la phase de montée en pression ;
- comparer la montée en pression sur cette plaque à induction avec la même cocotte posée sur une plaque vitrocéramique ou un foyer gaz, dont le rendement est probablement très différent.
{% endplusloin %}
