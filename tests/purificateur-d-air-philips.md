---
layout: test-layout.njk
title: un purificateur d'air
img: purificateur-d-air-philips.jpg
date: 2026-03-30
tags: ['test']
---

Un purificateur d'air tourne en permanence dans mon bureau pour filtrer la poussière et les allergènes pendant mes longues journées de télétravail. Quelle énergie est consommée pour respirer un air pur ?

<!-- excerpt -->

{% tldr %}
- Laissé allumé en permanence en mode automatique, ce purificateur d'air consomme {{ 1130 | divided_by: 14 | PerYear | Wh€ }} par an.
- La puissance médiane en mode automatique est de seulement {{ 3.3 | W }}, bien loin des {{ 56 | W }} nominaux indiqués sur l'étiquette.
- Même la journée la plus poussiéreuse ne consomme que {{ 88.1 | percentMore: 79.8 }} de plus qu'une journée d'air pur.
{% endtldr %}

{% comment %}
Notes from draft:
L'appareil est habituellement allumé dans mon bureau. Avant il était dans une chambre pour limiter les allergènes.
Combien consomme la respiration d'air pur lors de mes longues séances de télé-travail ? Serait-il pertinent d'éteindre cet appareil en dehors de mes heures de travail pour économiser de l'énergie ?

Ce modèle assez haut de gamme coûtait plus de 300euros en 2020. J'en ai eu un deuxième exemplaire pour moins de 200euros en 2022.

La description du produit : Philips Séries 2000 Purificateur d'Air - Élimine Germes, Poussière, Allergènes, AeraSense Technologie, Jusqu'à 79m², 3 Vitesses, Mode Veille, Blanc (AC2887/10)
- Rafraîchissez votre air : Purificateur d'Air - Pièce de 79m², 3 réglages de vitesse, mode veille - La filtration à 2 couches élimine germes, poussière, allergènes et 99,9 % d'impuretés* jusqu'à 0,003 micron
- Capteurs intelligents : le purificateur d'air affiche la qualité de l'air en temps réel - Le mode automatique choisit la vitesse pour votre maison - Il purifie une pièce de 20m² en moins de 9 minutes**
- Mode veille ultra-silencieux : purificateur d'air idéal pour chambre, tamise ses lumières et ne fait pas de bruit dans la nuit - Améliore la qualité d'air pour la sécurité de toute la famille
- Faible consommation d'énergie : Grâce à sa conception économe en énergie, notre purificateur d'air avec HEPA filtre l'air en utilisant la même énergie qu'une ampoule électrique standard

Élimine 99,97 % des particules ultrafines
Pré-filtre pour les particules
Filtre HEPA pour germe, poussière, allergène
Charbon actif pour les gaz et les odeurs

Faible consommation d'énergie
Son design économe en énergie lui permet de fonctionner à une puissance max. de 56 W - l'équivalent d'une ampoule

Capteurs intelligents
Analyse l'air 1000 fois par sec afin de détecter les particules ultrafines, et indique la qualité de l'air en temps réel
{% endcomment %}

## Le matériel

{% intro "purificateur-d-air-philips.jpg" "Purificateur d'air Philips AC2887/10 Séries 2000" %}

Ce purificateur d'air Philips AC2887/10 de la gamme Séries 2000 est conçu pour des pièces jusqu'à 79 m². Il aspire l'air de la pièce, le fait passer à travers différents filtres, puis rejette l'air purifié par le dessus. Le fabricant annonce « *l'élimination de 99,97 % des particules ultrafines jusqu'à 0,003 micron* ».

L'appareil est habituellement allumé en permanence dans mon bureau, en mode automatique. Avant, il était dans une chambre pour limiter les allergènes. Ce modèle assez haut de gamme coûtait plus de 300 euros en 2020.
{% endintro %}

En ouvrant le purificateur, on découvre un gros ventilateur central :  
{% image "./images/purificateur-d-air-philips-ventilateur.jpg" "Purificateur ouvert montrant le ventilateur central" "700w" 700 %}{% comment %}purificateur ouvert, sans les filtres. On voit bien qu'il y a un gros ventilateur au centre{% endcomment %}

L'air passe à travers trois filtres successifs avant d'atteindre ce ventilateur :  
{% image "./images/purificateur-d-air-philips-filtres.jpg" "Les trois filtres du purificateur démontés" "700w" 700 %}{% comment %}le purificateur démonté avec ses 3 filtres successifs visibles :
- d'abord le pré-filtre (un peu comme une fine moustiquaire), il est régulièrement bouché par les grosses poussières et les poils de chat, l'appareil indique alors "FO" sur l'écran (Filtre Occluded) pour demander de le nettoyer.
- ensuite un filtre à charbons actifs
- et enfin un filtre ressemblant beaucoup à un filtre à air de voiture.{% endcomment %}  
Le premier est un pré-filtre, semblable à une fine moustiquaire, qui arrête les grosses poussières et les poils de chat.

{% image "./images/purificateur-d-air-philips-chat.jpg" "Un chat roux devant le purificateur d'air" "500w" 500 %}{% comment %}Un chat roux devant le purificateur, il fournit de nombreux poils aspirés par le purificateur, et qui sont arrêtés par le pré-filtre{% endcomment %}  
Avec un tel fournisseur de poils, l'appareil affiche régulièrement « FO » (*Filter Occluded*) sur l'écran pour demander de nettoyer le pré-filtre.

Vient ensuite un filtre à [charbon actif](https://fr.wikipedia.org/wiki/Charbon_actif "Page « Charbon actif » sur Wikipédia") pour les gaz et les odeurs, puis un [filtre HEPA](https://fr.wikipedia.org/wiki/Filtre_HEPA "Page « Filtre HEPA » sur Wikipédia") ressemblant à un filtre à air de voiture.

Sur le côté gauche, une trappe donne accès au capteur de particules, qu'il faudrait apparemment nettoyer régulièrement :  
{% image "./images/purificateur-d-air-philips-capteur.jpg" "Trappe latérale donnant accès au capteur de particules" "500w" 500 %}{% comment %}photo de la trappe sur le côté gauche de l'appareil, où se cache le capteur de particules, qu'il faut apparemment nettoyer régulièrement (je ne l'ai jamais fait, ooops).{% endcomment %}

Vue de trois quarts arrière, on distingue la trappe du capteur, la poignée de transport, l'étiquette et surtout la sortie d'air purifié sur le dessus :  
{% image "./images/purificateur-d-air-philips-trois-quart-arriere.jpg" "Vue de trois quarts arrière du purificateur" "500w" 500 %}{% comment %}vue de 3/4 arrière, on voit la trappe latérale permettant de nettoyer le capteur, la poignée à l'arrière permettant d'attraper l'appareil pour le déplacer, l'étiquette en bas à l'arrière, et surtout la sortie d'air purifié sur le dessus.{% endcomment %}

Le panneau de commandes sur le dessus est entièrement tactile :  
{% image "./images/purificateur-d-air-philips-commandes.jpg" "Panneau de commandes tactiles sur le dessus du purificateur" "700w" 700 %}{% comment %}panneau de commmandes sur le dessus. Tous les boutons sont tactiles, il faut passer le doigt dessus pour les utiliser. Dans l'ordre :
- bouton marche / arrêt
- bouton d'atténuation de la luminosité
- bouton du mode automatique
- afficheur
- bouton de vitesse du ventilateur
- bouton du minuteur
- bouton de réinitialisation (lorsque le filtre a été nettoyé){% endcomment %}

On y trouve, de gauche à droite : le bouton marche/arrêt, le réglage de luminosité, le mode automatique, l'afficheur central, le choix de vitesse, le minuteur et le bouton de réinitialisation du filtre.

## Consommation

### Méthode de mesure

Le purificateur d'air est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Informations fournies par le fabricant

#### Étiquette

L'étiquette se trouve en bas à l'arrière de l'appareil :  
{% image "./images/purificateur-d-air-philips-etiquette.jpg" "Étiquette du Philips AC2887/10 indiquant 220-240V~ 50/60Hz 56W" "300w" 300 %}{% comment %}Philips AC2887
/10
220-240V~ 50/60Hz
56W{% endcomment %}

L'étiquette indique « *220-240V~ 50/60Hz 56W* », soit une puissance nominale de {{ 56 | W }}.

#### Manuel

Le fabricant met en avant la faible consommation de l'appareil : « *son design économe en énergie lui permet de fonctionner à une puissance max. de 56 W — l'équivalent d'une ampoule* ».

### Fonctionnement en mode automatique

En mode automatique, le purificateur adapte la vitesse de son ventilateur en fonction de la qualité de l'air mesurée par son capteur de particules. Le fabricant précise que ce capteur « *analyse l'air 1000 fois par seconde afin de détecter les particules ultrafines* ». Un voyant lumineux sur la façade indique en temps réel le niveau de pollution détecté.

Lorsque l'air est très pollué, le voyant passe au rouge et l'afficheur indique un niveau de particules élevé :  
{% image "./images/purificateur-d-air-philips-rouge.jpg" "Voyant de qualité de l'air en rouge, niveau de particules à 120" "300w" 300 %}{% comment %}voyant de qualité de l'air en rouge, et indication d'un niveau de particules de 120.

Le manuel indique :
couleur - niveau de qualité de l'air
bleu - bien
violet - fair
rouge-pourpre - malsain
rouge - très malsain{% endcomment %}

Lorsque la qualité s'améliore, le voyant passe au violet :  
{% image "./images/purificateur-d-air-philips-violet.jpg" "Voyant violet indiquant un niveau de particules de 25" "300w" 300 %}{% comment %}voyant de qualité de l'air violet, et indication de "25" pour le niveau de particules{% endcomment %}

Et lorsque l'air est pur, le voyant devient bleu et l'afficheur indique un niveau de particules très bas :  
{% image "./images/purificateur-d-air-philips-bleu.jpg" "Voyant bleu indiquant un niveau de particules de 1, air très pur" "300w" 300 %}{% comment %}afficheur du haut indiquant 1, lumière bleue, air très propre !{% endcomment %}

#### Deux semaines de mesure

La consommation a été mesurée en continu pendant 2 semaines, en mode automatique dans le bureau :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "2 semaines", "range": "m1211402080"}' %}
{% comment %}draft: mesure de la conso sur 2 semaines. On voit pics de consommation et des variations à certains moments, mais aussi des jours entiers très calme. La moyenne est très proche de la médiane, la conso lors des brefs moments d'activité n'a donc pas beaucoup d'impact sur la facture.{% endcomment %}

Sur ces 2 semaines, le purificateur a consommé {{ 1130 | Wh€ }}. La puissance médiane est de {{ 3.3 | W }} et la moyenne de {{ 3.35 | W }} : ces deux valeurs sont très proches, ce qui signifie que les brefs pics d'activité n'ont quasiment pas d'impact sur la consommation totale. La puissance maximale mesurée est de {{ 15.6 | W }}, bien loin des {{ 56 | W }} nominaux indiqués sur l'étiquette.

On observe de longues périodes très calmes, où le purificateur tourne en vitesse lente, entrecoupées de pics de consommation ponctuels lorsque le capteur détecte de la poussière.

#### Démarrage

Au démarrage, on observe un petit pic de consommation avant que le mode automatique ne se stabilise en environ 30 secondes :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Démarrage", "range": "7092m90435"}' %}
{% comment %}draft: on voit un pic au démarrage, puis il faut environ 30s pour que le mode automatique se stabilise. Il faut probablement laisser passer un certain volume d'air sur le capteur avant de savoir quel est le niveau de poussière actuel de l'air ambiant.{% endcomment %}

Le pic initial atteint {{ 7.1 | W }}, puis la puissance redescend vers {{ 3.3 | W }}. Il faut probablement laisser passer un certain volume d'air sur le capteur avant que l'appareil puisse évaluer la qualité de l'air ambiant.

#### Comparaison de trois journées

La consommation varie d'un jour à l'autre en fonction de la quantité de poussière dans l'air. Comparons trois journées représentatives.

Une journée d'air pur, sans aucune activité notable du purificateur :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Journée d\'air pur", "range": "962124395m87465855"}' %}
{% comment %}draft: zoom sur 24h sans aucune activité notable{% endcomment %}

La consommation est parfaitement stable à {{ 3.3 | W }} pendant 24 heures, pour un total de {{ 79.8 | Wh€ }}. Le profil est presque une ligne droite.

Une journée avec un peu de poussière montre quelques pics ponctuels :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Journée avec un peu de poussière", "range": "632669678m87465855"}' %}
{% comment %}draft: zoom sur 24h avec un peu d'activité du purificateur observée{% endcomment %}

La consommation totale est de {{ 85.2 | Wh€ }}, soit {{ 85.2 | percentMore: 79.8 }} de plus que la journée d'air pur. Le purificateur a brièvement accéléré son ventilateur à plusieurs reprises, avec une puissance maximale de {{ 5.7 | W }}.

La journée la plus poussiéreuse des 2 semaines de mesure :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Journée la plus poussiéreuse", "range": "332370245m87465855"}' %}
{% comment %}draft: la journée avec le plus d'activité du purif sur les 2 semaines de mesure{% endcomment %}

Même lors de cette journée la plus active, la consommation totale n'est que de {{ 88.1 | Wh€ }}, soit {{ 88.1 | percentMore: 79.8 }} de plus qu'une journée d'air pur. La puissance maximale atteint {{ 15.6 | W }}, mais la médiane reste à {{ 3.3 | W }}.

#### Zoom sur une période d'activité

La journée la plus poussiéreuse contient une période de plus de 2 heures d'activité soutenue, probablement un jour de rangement où de vieux cartons ont fait voler de la poussière :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Zoom sur une période d\'activé", "range": "410597076m9012811"}' %}
{% comment %}draft: zoom sur la fin de la journée précédente, où on voit beaucoup plus d'activité pendant une période de plus de 2h. C'est probablement un jour où j'ai fait du rangement, sorti des vieux cartons et donc fait voler de la poussière dans la pièce.{% endcomment %}

Pendant ces 2h30, la puissance médiane monte à {{ 5 | W }} et la consommation totale est de {{ 12.9 | Wh€ }}. On observe que le purificateur alterne entre plusieurs niveaux de vitesse discrets, formant des paliers en escalier plutôt qu'une variation continue.

#### Pics isolés

Il arrive parfois que le purificateur détecte un bref passage de poussière et accélère pendant environ 50 secondes avant de revenir à son état tranquille :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Zoom sur un pic isolé — 1", "range": "242985376m149753"}' %}
{% comment %}draft: Il y a parfois des pics isolés, où le purificateur passe en vitesse rapide pendant environ 50s avant de revenir à son état tranquille{% endcomment %}

Le profil a une forme trapézoïdale caractéristique : montée progressive par paliers, maintien en vitesse rapide, puis descente par paliers. La puissance maximale atteint {{ 15.5 | W }}.

Parfois, les 50 secondes en vitesse rapide sont suivies par 50 secondes supplémentaires en vitesse intermédiaire :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Zoom sur un pic isolé — 2", "range": "278762550m150387"}' %}
{% comment %}draft: Parfois les 50s du pic d'activité en vitesse rapide sont suivies par 50s en vitesse intermédiaire.{% endcomment %}

On peut supposer que le capteur détecte encore un peu de poussière après le premier pic, et maintient le ventilateur en vitesse intermédiaire le temps de nettoyer l'air complètement.

### Lorsque le purificateur est éteint

Lorsque le purificateur est complètement éteint via le bouton tactile, la consommation mesurée ne tombe pas à zéro :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Éteint pendant 36h", "range": "1404204606m131401465"}' %}
{% comment %}draft: Lorsque le purificateur est complètement éteint, la conso mesurée ne tombe pas à 0. La moyenne est nettement inférieure à la médiane, ce qui donne envie de zoomer pour voir pourquoi{% endcomment %}

Sur 36 heures d'arrêt, l'appareil a consommé {{ 8.32 | Wh€ }}. La puissance moyenne est de {{ 0.228 | W }}, nettement inférieure à la médiane de {{ 0.4 | W }}. Cette différence entre moyenne et médiane est intrigante : zoomons pour comprendre.

En zoomant sur 5 minutes, on découvre une alternance régulière entre une consommation de {{ 0.4 | W }} et {{ 0 | W }} :

{% profile "purificateur-d-air-philips.json.gz" '{"name": "Éteint — zoom sur 5 minutes", "range": "1415507908m300825"}' %}
{% comment %}draft: là on voit qu'il y a une alternance entre une conso mesurée à 0.4W et une conso à 0. C'est assez étonnant car ce wattmètre est capable de descendre à 0.1W, mais ça mériterait de regarder de plus près avec un wattmètre plus précis.{% endcomment %}

C'est assez étonnant : le wattmètre est capable de mesurer des puissances aussi faibles que {{ 0.1 | W }}, mais ici la consommation alterne entre {{ 0.4 | W }} et exactement zéro. Cela mériterait une mesure avec un wattmètre plus précis pour comprendre ce qui se passe.

Si le purificateur reste branché mais éteint en permanence, sa consommation en veille sera de {{ 0.228 | W€PerYear }} par an. C'est très faible, mais autant le débrancher si on ne l'utilise pas.

### Test systématique des modes

Passons maintenant à un test plus méthodique : nous avons testé successivement tous les modes ayant une influence sur la consommation.

La vue d'ensemble du test de tous les modes montre un profil en escalier, des vitesses les plus basses aux plus élevées :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Test de tous les modes", "range": ""}' %}
{% comment %}draft: nous passons maintenant sur un test beaucoup plus systématique et artificiel. Tous les modes ayant probablement une influence directe sur la conso ont été testés. On va zoomer sur chacun d'eux{% endcomment %}

La puissance maximale mesurée pour le mode « turbo » atteint {{ 42.8 | W }}, soit {{ 42.8 | percent: 56 }} de la puissance nominale de {{ 56 | W }} indiquée sur l'étiquette.

#### Démarrage en mode automatique

Au démarrage, on observe un petit pic de consommation puis le mode automatique se stabilise en vitesse lente en une trentaine de secondes :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Démarrage mode auto", "range": "13662m30202"}' %}
{% comment %}draft: Au démarrage, on observe là encore un petit pic de conso, puis il faut 30s pour que le mode auto se stabilise, ici en vitesse lente.{% endcomment %}

Le pic initial atteint {{ 4.8 | W }}, un peu moins élevé que lors du démarrage mesuré pendant le test de 2 semaines ({{ 7.1 | W }}). La puissance se stabilise ensuite autour de {{ 3.2 | W }}.

Le purificateur propose trois modes automatiques, chacun optimisé pour un type de pollution. Le mode général cible les PM2,5 :  
{% image "./images/purificateur-d-air-philips-auto-pm25.jpg" "Mode automatique général ciblant les PM2,5" "250w" 250 %}{% comment %}mode automatique en mode général « Le mode général spécialement conçu permet d'éliminer efficacement les polluants en suspension dans l'air tels que les PM2,5 »{% endcomment %}

Le mode allergènes cible le pollen et les squames d'animaux :  
{% image "./images/purificateur-d-air-philips-auto-allergenes.jpg" "Mode automatique spécial allergènes" "250w" 250 %}{% comment %}mode automatique en mode "spécial allergènes" « Le mode spécial allergènes permet d'éliminer efficacement les allergènes courants, comme le pollen et les squames d'animaux »{% endcomment %}

Le mode bactéries et virus cible les agents pathogènes. Nous avons utilisé ce mode pendant la soirée du réveillon où nous avons invité du monde pour la première fois après les confinements du covid :  
{% image "./images/purificateur-d-air-philips-auto-virus.jpg" "Mode spécial bactéries et virus" "250w" 250 %}{% comment %}mode automatique en "Mode Bactéries et virus" « Le mode spécial bactéries et virus permet d'éliminer efficacement les bactéries et virus tels que le staphylococcus albus et le H1N1. »

Il y a quelques années, nous avons utilisé ce mode pendant la soirée du réveillon où nous avons invité du monde à la maison pour la première fois après les confinements du covid.{% endcomment %}

#### Les vitesses de ventilation

En dehors du mode automatique, le purificateur propose 5 vitesses manuelles. Le test des vitesses montre une progression en escalier très nette :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Test des vitesses de ventilation", "range": "89167m419230"}' %}
{% comment %}draft: On sort du mode auto et on teste les différentes vitesses de ventilation : Sl(ow), 1, 2, 3, t(urbo). On va zoomer sur chacune de ces vitesses pour avoir une bonne mesure. Sur le graphique de ces différentes vitesses on observe qu'il faut un certain temps pour accélérer et passer d'un mode à l'autre, et que plus la vitesse désirée est élevée, plus il faut longtemps pour l'atteindre.{% endcomment %}

On observe qu'il faut un certain temps pour accélérer d'une vitesse à l'autre, et que plus la vitesse désirée est élevée, plus la transition est longue. Zoomons sur chaque vitesse pour obtenir une mesure précise.

{% image "./images/purificateur-d-air-philips-sl.jpg" "Afficheur indiquant SL pour la vitesse lente" "250w" 250 %}{% comment %}"SL" sur l'afficheur indiquant la vitesse lente (et silencieuse) du ventilateur, également appelée "mode Nuit" dans le manuel.{% endcomment %}  
La vitesse « Sl » (slow), également appelée mode Nuit dans le manuel, consomme une puissance médiane de {{ 3.2 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Vitesse « Sl » (slow)", "range": "95387m60127"}' %}

{% image "./images/purificateur-d-air-philips-v1.jpg" "Afficheur indiquant 1 pour la vitesse 1" "250w" 250 %}{% comment %}"1" sur l'afficheur au centre pour la vitesse 1.
Lorsqu'un '1' est affiché pour indiquer un air très pur, il est à droite.{% endcomment %}  
La vitesse 1 consomme une puissance médiane de {{ 5 | W }}. Attention : lorsqu'un « 1 » est affiché à droite de l'écran, il indique un air très pur. Pour la vitesse 1, le chiffre est affiché au centre :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Vitesse « 1 »", "range": "168783m60127"}' %}

{% image "./images/purificateur-d-air-philips-v2.jpg" "Afficheur indiquant 2 pour la vitesse 2" "250w" 250 %}{% comment %}2 au centre pour vitesse 2{% endcomment %}  
La vitesse 2 consomme une puissance médiane de {{ 9 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Vitesse « 2 »", "range": "252546m60127"}' %}

{% image "./images/purificateur-d-air-philips-v3.jpg" "Afficheur indiquant 3 pour la vitesse 3" "250w" 250 %}{% comment %}3 au centre pour vitesse 3{% endcomment %}  
La vitesse 3 consomme une puissance médiane de {{ 16.5 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Vitesse « 3 »", "range": "340848m60404"}' %}

{% image "./images/purificateur-d-air-philips-turbo.jpg" "Afficheur indiquant t pour le mode turbo" "250w" 250 %}{% comment %}afficheur indiquant "t" pour le mode "turbo"{% endcomment %}  
Et enfin le mode turbo atteint une puissance médiane de {{ 42.3 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Vitesse « t » (turbo)", "range": "437073m60127"}' %}

En résumé, la consommation par vitesse :

| Vitesse | Puissance médiane |
|---------|-------------------|
| Sl (slow) | {{ 3.2 | W }} |
| 1 | {{ 5 | W }} |
| 2 | {{ 9 | W }} |
| 3 | {{ 16.5 | W }} |
| Turbo | {{ 42.3 | W }} |

<div style="clear: both"></div>

La puissance est multipliée par 13 entre la vitesse la plus lente et le mode turbo. En mode turbo, la consommation de {{ 42.3 | W }} est comparable à celle d'{% test ventilateur-de-table-rowenta un ventilateur de table %} à pleine vitesse. Mais en mode automatique, le purificateur passe la quasi-totalité de son temps en vitesse lente.

#### Accélération de la vitesse 3 au turbo

La transition entre la vitesse 3 et le mode turbo prend environ 20 secondes :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Accélération vitesse 3 à turbo", "range": "400168m29857"}' %}
{% comment %}draft: il faut environ 20s pour atteindre la vitesse maximum !{% endcomment %}

Le ventilateur accélère progressivement plutôt que de passer brusquement à pleine vitesse. On peut supposer que cette montée en puissance progressive est un choix de conception pour limiter le bruit et la contrainte mécanique.

#### Les niveaux d'éclairage

Le purificateur permet de régler la luminosité du voyant de qualité de l'air sur trois niveaux. La vue d'ensemble du test ne montre honnêtement pas grand-chose :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Test des différents niveaux d\'éclairage", "range": "509477m217523"}' %}
{% comment %}draft: On teste maintenant les différents modes d'éclairage. Honnêtement, sur ce graphique je ne vois rien, mais si on zoome on verra une petite différence dans les statistiques. Entre luminosité maxi et réduite, la différence est très faible et ça mériterait probablement là aussi un wattmètre plus précis. Lorsque l'éclairage est totalement éteint (mode nuit), on observe une différence un tout petit peu plus marquée.{% endcomment %}

Mais en zoomant sur les statistiques de chaque niveau, on observe de très légères différences.

{% image "./images/purificateur-d-air-philips-pleine-luminosite.jpg" "Purificateur en pleine luminosité, reflet visible sur la façade" "300w" 300 %}{% comment %}en pleine luminosité, le voyant de qualité de l'air émet une forte lumière qui se reflète sur le plastique blanc brillant de la façade{% endcomment %}  
En pleine luminosité, le voyant émet une forte lumière qui se reflète sur le plastique blanc de la façade. La puissance moyenne est de {{ 3.32 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Éclairage allumé", "range": "511629m60674"}' %}

{% image "./images/purificateur-d-air-philips-basse-luminosite.jpg" "Purificateur en basse luminosité" "300w" 300 %}{% comment %}en basse luminosité, on voit la couleur faiblement, mais elle ne se reflète que très peu sur le plastique blanc de façade.{% endcomment %}  
En basse luminosité, la couleur est visible mais ne se reflète quasiment pas. La puissance moyenne descend à {{ 3.25 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Éclairage faible luminosité", "range": "597261m60674"}' %}

{% image "./images/purificateur-d-air-philips-lumiere-eteinte.jpg" "Purificateur avec lumière éteinte, seul un tiret blanc est visible" "300w" 300 %}{% comment %}lumière éteinte, seule un petit "-" blanc sur l'afficheur indique que le purificateur est en fonctionnement. Idéal pour l'utilisation la nuit dans une chambre.{% endcomment %}  
En mode nuit, seul un petit « - » blanc sur l'afficheur indique que le purificateur fonctionne. Idéal pour une chambre.

En zoomant sur l'afficheur, on distingue le petit « - » indiquant le mode nuit :  
{% image "./images/purificateur-d-air-philips-nuit.jpg" "Afficheur montrant un tiret indiquant le mode nuit" "250w" 250 %}{% comment %}afficheur avec le "-" indiquant le mode nuit.{% endcomment %}  
La puissance moyenne est de {{ 3.09 | W }} :

{% profile "purificateur-d-air-philips-test.json.gz" '{"name": "Éclairage éteint (mode nuit)", "range": "666110m60674"}' %}

La différence entre pleine luminosité et mode nuit est d'environ {{ 0.2 | W }}. C'est quasiment imperceptible pour le wattmètre, et totalement négligeable sur la facture. Le choix du niveau de luminosité peut donc se faire uniquement en fonction du confort visuel.

### Consommation annuelle

Sur les 2 semaines de mesure en mode automatique, le purificateur a consommé {{ 1130 | Wh€ }}. Extrapolé sur un an, cela représente {{ 1130 | divided_by: 14 | PerYear | Wh€ }}.

C'est l'équivalent de la consommation d'un appareil qui tirerait {{ 3.3 | W }} en permanence, comparable à {% test fontaine-chat une fontaine pour animaux %} ({{ 2.21 | W }}).

Le purificateur a coûté plus de 300 euros à l'achat. Il faudrait {{ 1130 | divided_by: 14 | PerYear | countPer€: 300 }} ans de fonctionnement pour dépenser l'équivalent du prix d'achat en électricité. Le coût énergétique est donc dérisoire comparé au prix de l'appareil, et surtout comparé au prix des filtres de remplacement.

Faut-il éteindre le purificateur la nuit ou en dehors des heures de travail pour économiser de l'énergie ? Avec une consommation de seulement {{ 3.3 | W }} en vitesse lente, l'économie serait minime : l'éteindre 12 heures par jour n'économiserait que {{ 3.3 | divided_by: 2 | W€PerYear }} par an.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de {{ 3.3 | W }} en mode automatique est tellement faible que n'importe quelle installation photovoltaïque, même un simple kit *plug & play*, suffirait à alimenter ce purificateur en journée. Contrairement à {% test machine-a-laver une machine à laver %} ou {% test seche-linge-a-evacuation un sèche-linge %}, il n'y a pas besoin de planifier son utilisation.

Cela dit, le purificateur fonctionne aussi la nuit, quand les panneaux solaires ne produisent rien. Éteindre le purificateur la nuit pour maximiser l'autoconsommation serait le seul cas où l'arrêt nocturne pourrait avoir un sens, mais l'économie de {{ 3.3 | divided_by: 2 | W€PerYear }} par an ne justifie probablement pas de sacrifier la qualité de l'air pendant le sommeil.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce purificateur d'air, on pourrait :
- mesurer la consommation en veille éteint avec un wattmètre plus précis pour les faibles puissances, afin de comprendre l'alternance entre {{ 0.4 | W }} et {{ 0 | W }} ;
- comparer la consommation avec des filtres neufs et des filtres encrassés, pour voir si l'encrassement augmente la résistance au passage de l'air et donc la consommation du ventilateur ;
- mesurer la consommation en fonction de la saison (période de pollen au printemps, chauffage en hiver qui assèche l'air) pour évaluer l'impact de la qualité de l'air extérieur ;
- comparer avec un purificateur d'air d'une autre marque, d'une autre technologie (ionisation, photocatalyse), un modèle beaucoup moins cher ou un modèle destiné à une plus petite pièce ;
- tester l'impact des différents modes automatiques (PM2,5, allergènes, bactéries et virus) sur la fréquence d'activation du ventilateur et donc sur la consommation.
{% endplusloin %}
