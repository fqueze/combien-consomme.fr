---
layout: test-layout.njk
title: une machine à bulles
img: machine-a-bulles.jpg
date: 2026-04-21
tags: ['test']
---

Rien de tel qu'une machine à bulles pour voir briller les yeux d'enfants émerveillés. Combien coûte une après-midi à remplir le jardin de bulles ?

<!-- excerpt -->

{% tldr %}
- Une après-midi de 3 heures à faire des bulles consommerait {{ 11.3 | times: 9 | Wh€ }}.
- En fonctionnement, la machine consomme {{ 31.1 | W }} en médiane, soit {{ 31.1 | percentMore: 25 }} de plus que les {{ 25 | W }} annoncés sur l'étiquette.
- Il faudrait faire tourner la machine pendant {{ 31.1 | countHPer€: 1 }} pour dépenser un euro d'électricité.
- En position « *TÉLÉCOMMANDE* », la machine consomme {{ 0.9 | W }} en attente d'un signal, soit {{ 0.9 | W€PerYear }} si elle reste branchée toute l'année.
{% endtldr %}

## Le matériel
{% intro "machine-a-bulles.jpg" "Machine à bulles NOVISTAR" %}

Cette machine à bulles a été chinée pour 5 € au marché aux puces. L'objet est simple et solide : un ventilateur qui souffle sur une roue dont les trous plongent dans une cuve de produit à bulles.

Au moment de l'achat, je n'avais pas réussi à la faire fonctionner en remplissant la cuve avec du liquide vaisselle. Elle est restée quelques mois au garage. À l'approche d'un anniversaire d'enfant, je me suis décidé à aller acheter un litre de vrai produit à bulles en magasin, et la machine s'est mise à produire des bulles en grande série.
{% endintro %}

La carcasse présente quelques points de rouille qui trahissent son âge, mais la mécanique fonctionne impeccablement :  
{% image "./images/machine-a-bulles-trois-quart-face.jpg" "Vue trois-quart face de la machine, cuve vide, on aperçoit la roue à l'intérieur" "500w" 500 %}
{% comment %}machine nettoyée mais on voit des points de rouilles sur la carcasse, la cuve est vide, la photo est prise en intérieur{% endcomment %}

À l'arrière, on trouve le cordon d'alimentation, un fusible 2,5 A, une grande grille qui laisse passer l'air du ventilateur et un interrupteur à trois positions :  
{% image "./images/machine-a-bulles-arriere.jpg" "Vue arrière avec grille du ventilateur, fusible et interrupteur à trois positions" "500w" 500 %}
{% comment %}arrière de la machine bien visible, photo en intérieur{% endcomment %}

La troisième position de l'interrupteur (« *TÉLÉCOMMANDE* ») permet de piloter la machine à distance. Un arceau fixé sur le dessus suggère d'ailleurs que cette machine peut être accrochée au plafond. On peut imaginer un usage de type équipement de salle de spectacle, où la machine est fixée en hauteur et déclenchée depuis une télécommande pour lâcher des bulles au moment voulu d'une scène.

Posée sur la table de la cuisine pour les mesures, elle a tout de suite attiré l'attention du chat, qui est venu l'inspecter de près :  
{% image "./images/machine-a-bulles-inspection.jpg" "Un chat roux inspecte la machine à bulles en passant la tête dans l'ouverture" "500w" 500 %}
{% comment %}le chat a trouvé très suspecte cette machine sur la table de la cuisine et est venu l'inspecter de plus près{% endcomment %}

## Consommation

### Méthode de mesure

La machine à bulles est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Informations fournies par le fabricant

L'étiquette collée sur la machine indique ses caractéristiques électriques :  
{% image "./images/machine-a-bulles-etiquette.jpg" "Étiquette NOVISTAR indiquant 220-240V AC 50/60Hz, 25W" "500w" 500 %}
{% comment %}Machine à bulle NOVISTAR
Alimentation: 220-240V AC 50/60Hz
Consommation: 25W{% endcomment %}

Elle annonce « *220-240V AC 50/60Hz, 25W* », soit une puissance nominale de {{ 25 | W }}.

### Répétition générale avant l'anniversaire

Installée sur l'appui de fenêtre, cuve remplie, la machine souffle des bulles vers le jardin :  
{% image "./images/machine-a-bulles-vue-cote.jpg" "Machine à bulles en fonctionnement sur un appui de fenêtre, bulles devant la maison voisine et les arbres" "500w" 500 %}
{% comment %}machine sur l'appui de fenêtre, en fonctionnement, vue de côté avec des bulles devant la maison voisine et les arbres{% endcomment %}

Quelques jours avant l'anniversaire, nous avons fait tourner la machine pendant un peu plus de 20 minutes pour vérifier qu'elle produirait bien des bulles le jour J, pour le plus grand bonheur d'une petite personne dont l'anniversaire approchait :

{% profile "machine-a-bulles.json.gz" '{"name": "Des bulles !!!", "range": "667989m1306659"}' %}
{% comment %}draft: on a fait plein de bulles pendant un peu plus de 20 minutes, pour l'immense bonheur d'une petite personne dont l'anniversaire approche{% endcomment %}

La consommation se stabilise sur un long plateau autour de {{ 31.1 | W }} (médiane), avec un maximum à {{ 40 | W }} au démarrage. C'est {{ 31.1 | percentMore: 25 }} de plus que les {{ 25 | W }} annoncés sur l'étiquette. Sur les {{ 1307 | s }} du test, la machine a consommé {{ 11.3 | Wh€ }}.

On remarque également que le plateau n'est pas tout à fait horizontal : la puissance décroît très légèrement au fil du temps. On retrouve ici un comportement déjà observé lors du test d'{% test aspirateur-atelier un aspirateur d'atelier %} : le moteur électrique s'échauffe progressivement et sa consommation diminue à mesure que sa température monte.

Pendant ce temps, la machine a produit suffisamment de bulles pour occuper plusieurs enfants. Vue depuis l'arrière, à contre-jour, la production de bulles est particulièrement visible :  
{% image "./images/machine-a-bulles-bulles-arriere.jpg" "Vue depuis l'arrière de la machine, nuée de bulles s'échappant vers le jardin" "500w" 500 %}
{% comment %}machine à bulles en fonctionnement, sur l'appui de fenêtre, vue de l'arrière. Plein de bulles sont visibles (mais la photo est en contre jour){% endcomment %}

### À vide

Avant de remplir la cuve, j'ai d'abord fait tourner la machine pendant une minute pour vérifier qu'elle était encore en état de marche :

{% profile "machine-a-bulles.json.gz" '{"name": "Une minute à vide", "range": "324864m60178"}' %}
{% comment %}draft: j'ai fait tourner l'appareil pendant une minute sans remplir la cuve{% endcomment %}

La puissance médiane est de {{ 34.8 | W }}, soit un plateau un peu plus élevé que lors de la production de bulles. Cela s'explique sans doute par le fait que c'est ici le tout premier démarrage, moteur froid : on retrouve ensuite la même dérive descendante de la consommation, déjà perceptible en une seule minute, qui correspond à l'échauffement progressif du moteur.

L'enseignement principal de ce test à vide est que la consommation avec ou sans produit à bulles est très comparable : l'énergie supplémentaire dépensée par la roue pour brasser le produit est négligeable devant celle consommée par le ventilateur.

### En veille

L'interrupteur à l'arrière comporte une position « *TÉLÉCOMMANDE* » qui permet normalement de piloter la machine à distance :  
{% image "./images/machine-a-bulles-telecommande.jpg" "Gros plan sur l'interrupteur à trois positions, en position TÉLÉCOMMANDE" "300w" 300 %}
{% comment %}zoom sur le bouton de commande, ici dans la position "TELECOMMANDE"{% endcomment %}

La télécommande a dû être perdue lors de la vie précédente de la machine, avant qu'elle n'arrive au marché aux puces. Je n'ai donc pas pu tester la commande à distance, mais j'ai tout de même placé l'interrupteur dans cette position pour observer la consommation de l'électronique en attente d'un signal :

{% profile "machine-a-bulles.json.gz" '{"name": "mode « TELECOMMANDE »", "range": "268807m54773"}' %}
{% comment %}draft: j'ai placé l'interrupteur sur la position "télécommande", même si je ne dispose pas de la télécommande, pour voir la consommation lorsque cet appareil est en attente.{% endcomment %}

La consommation est très faible, avec une médiane de {{ 0.9 | W }} et un maximum de {{ 1.1 | W }}. Le creux visible au milieu du profil n'est pas une erreur de mesure : j'ai basculé l'interrupteur sur la position « 0 » le temps de quelques secondes, pour vérifier que la consommation tombait bien à zéro dans cette position. Si la machine était laissée branchée en permanence en mode télécommande, elle consommerait {{ 0.9 | W€PerYear }} par an.

Utilisée comme un simple jouet pour enfants, la machine ne sert que quelques fois par an et autant la débrancher entre deux fêtes. Mais on peut imaginer un usage plus régulier grâce à l'arceau de fixation : accrochée au plafond d'une salle de spectacle pour déclencher des bulles au bon moment, avec un interrupteur inaccessible une fois fixée, la télécommande prend alors tout son sens et la position de veille devient utile.

### Coût d'usage

Les 20 minutes de test ont consommé {{ 11.3 | Wh€ }}. Une fête réaliste durera plutôt quelques heures : pour une après-midi ou une soirée complète de 3 heures, la consommation serait de {{ 11.3 | times: 9 | Wh€ }}.

À la puissance mesurée de {{ 31.1 | W }}, le litre de produit à bulles acheté pour l'occasion (0,99 €) représente l'équivalent électrique de {{ 31.1 | countHPer€: 0.99 }} de fonctionnement. Je ne sais pas exactement combien de temps tient un litre de produit (au bout des 20 minutes de test, la cuve n'était pas vide, et je n'y avais pas mis tout le litre), mais le coût du produit à bulles consommé semble tout de même bien supérieur au coût de l'électricité.

Quant aux 5 € que m'a coûté la machine au marché aux puces, c'est plus de la récupération que de l'achat. Sur les petites annonces d'occasion, on trouve des modèles similaires entre 15 et 20 €, ou en location pour 20 € la journée. Dans tous les cas, le prix est amorti dès la première fête d'anniversaire devant le sourire des enfants.

### Conseils pour l'autoconsommation photovoltaïque

Avec une puissance de {{ 31.1 | W }}, la machine à bulles est facile à alimenter par une installation photovoltaïque domestique, même modeste.

Les anniversaires d'enfants se déroulent traditionnellement en milieu de journée, au moment où la production solaire est maximale. En plein air, mieux vaut de toute façon éviter les jours de pluie ou de temps gris qui ne sont guère propices aux bulles. La machine peut aussi être utilisée en intérieur, dans une salle des fêtes par exemple, auquel cas il suffira de privilégier les créneaux ensoleillés.

Cela dit, avec un coût électrique de {{ 31.1 | Wh€ }} par heure de fonctionnement, l'enjeu économique est faible. L'intérêt est surtout poétique : c'est alors un peu de soleil qui s'échappe dans le ciel sous forme de bulles irisées.  
{% image "./images/machine-a-bulles-ciel.jpg" "Nuage de bulles flottant dans un ciel bleu au-dessus d'un arbre" "500w" 500 %}
{% comment %}plein de bulles sur un bon de ciel bleu avec un arbre en arrière plan{% endcomment %}

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette machine à bulles, on pourrait :
- comparer la consommation avec différents produits à bulles (plus ou moins visqueux) pour voir si la densité du liquide modifie l'effort demandé au moteur ;
- mesurer l'impact du niveau de remplissage de la cuve sur la consommation ;
- faire tourner la machine pendant une après-midi complète pour voir au bout de combien de temps la consommation se stabilise ;
- comparer avec les petites machines à bulles « jouet » pour enfants, qui seront probablement bien différentes de cet équipement qui semble plutôt destiné à des salles de spectacle.
{% endplusloin %}
