---
layout: test-layout.njk
title: un vélo cargo à assistance électrique
img: velo-cargo.jpg
date: 2025-11-13
tags: ['test']
---

Le vélo cargo sert au quotidien pour déposer la petite dernière à la crèche et permet de limiter l'usage de la voiture. Sa grande caisse permet de transporter beaucoup de courses, parfois même des meubles achetés d'occasion ! Mais combien coûte l'électricité pour recharger la batterie ?

<!-- excerpt -->

{% tldr %}
- Utilisé quotidiennement, le vélo consommera environ {{ 12.1 | divided_by: 4 | times: 7 | plus: 344 | plus: 237 | times: 52 | Wh€ }} par an.
- Une charge complète depuis une batterie vide consomme {{ 413 | Wh€ }}.
- La consommation mesurée par kilomètre varie de {{ 344 | divided_by: 55.4 | Wh€ }} à {{ 237 | divided_by: 21.5 | Wh€ }} selon le relief.
- On parcourt environ {{ 344 | divided_by: 55.4 | countPer€: 0.01 }}km sur terrain plat pour 1 centime d'électricité.
- Le chargeur consomme très peu au repos s'il reste branché : {{ 0.125 | W }}, soit {{ 0.125 | W€PerYear }} par an.
{% endtldr %}

{% comment %}
Notes from draft:
vélo cargo grand volume qui sert au quotidien et permet de limiter l'usage de la voiture. Sa grande caisse permet de transporter beaucoup de courses, parfois même des meubles achetés d'occasion ! 5 fois par semaine il va à la crèche déposée la petite dernière, qui voyage dans un grand confort, à l'abrit de la pluie et du vent.

Nom du modèle : Bakfiets Biporteur Électrique Shadow STEPS
Description sur le site du fabricant :
The Shadow is one of our top models here at Bakfiets.nl. With an aluminum frame, Shimano Steps mid-engine and aluminum profile box with trampoline fabric, this model is the lightest and most firm cargobike in our product range. This makes riding it a real experience. The frame is made with precisely engineered, double walled, aluminium tubing. The hydraulic brakes and strong rims make the Shadow very stable and safe.

The dimensions of the box are equal to the CargoBike Long, so most accessories will fit without any special adjustments.

Sizes Shadow Steps: length 253cm x width 63cm.



Je n'ai pas trouvé de moyen de mesurer la consommation directement sur le vélo lorsqu'il est en fonctionnement, mais pour calculer le coût de reviens et l'énergie consommée pour un parcours, on peut partir d'une batterie pleine, effectuer le parcours, et mesurer la quantité d'énergie qu'il faut remettre dans la batterie pour qu'elle soit de nouveau pleine.
{% endcomment %}

## Le matériel

{% intro "velo-cargo.jpg" "Bakfiets Biporteur Électrique Shadow STEPS avec sa grande caisse à l'avant" %}

Le vélo testé est un Bakfiets Biporteur Électrique Shadow STEPS.

C'est un vélo cargo avec une grande caisse à l'avant qui permet de transporter enfants, courses ou les trouvailles du marché aux puces ({% test couteau-electrique couteau électrique %}, {% test ouvre-boites-electrique ouvre-boîtes %}, {% test scanner-de-documents-scansnap scanner %}...). On peut transporter facilement jusqu'à 2 enfants ou 80 kg de marchandises. La caisse est en tissu avec une armature en aluminium, ce qui permet de réduire le poids du biporteur de 3 kg par rapport aux modèles équivalents avec caisse en bois.

Le vélo est équipé d'un moteur qui fournit une assistance électrique pour faciliter le pédalage, notamment en montée ou avec une charge importante.

Ce vélo a été acheté d'occasion et a déjà parcouru plus de 10 000 km. Bien qu'il ait été bien entretenu, la consommation d'un vélo neuf serait peut-être un peu inférieure.

Au moins cinq fois par semaine, ce vélo fait l'aller-retour à la crèche pour déposer la petite dernière, qui voyage dans un grand confort, à l'abri de la pluie et du vent. Il a permis de réduire significativement l'usage de la voiture pour les trajets quotidiens.
{% endintro %}

### Méthode de mesure

Je n'ai pas trouvé de moyen de mesurer la consommation directement sur le vélo lorsqu'il est en fonctionnement. Pour calculer le coût de revient et l'énergie consommée pour un parcours, je pars d'une batterie pleine, j'effectue le parcours, puis je mesure la quantité d'énergie qu'il faut remettre dans la batterie pour qu'elle soit de nouveau pleine.

Le chargeur de la batterie est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

### Le matériel en détail

Le système d'assistance électrique est composé du moteur Shimano STEPS situé dans le pédalier, et de la batterie fixée verticalement sur le côté de la caisse du cargo :

{% image "./images/velo-cargo-assistance.jpg" "Zoom sur le système d'assistance avec moteur et batterie" "300w" 300 %}
{% comment %}zoom sur le système d'assistance, avec le moteur dans le pédalier et la batterie fixée verticalement sur la caisse du cargo.{% endcomment %}

Voici le moteur Shimano STEPS intégré dans le pédalier :

{% image "./images/velo-cargo-moteur.jpg" "Zoom sur le moteur Shimano dans le pédalier" "500w" 500 %}
{% comment %}Zoom sur le moteur Shimano se trouvant dans le pédalier{% endcomment %}

La batterie du vélo est une BT-E6000, une batterie lithium-ion détachable. Elle possède un indicateur de niveau de charge à 5 LED :

{% image "./images/velo-cargo-batterie.jpg" "La batterie séparée du vélo, avec l'indicateur de niveau de charge" "700w" 700 %}
{% comment %}la batterie séparée du vélo, avec l'indicateur de niveau charge{% endcomment %}

Sa capacité permet de parcourir plusieurs dizaines de kilomètres selon le relief et la charge transportée. Son étiquette indique ses caractéristiques :

{% image "./images/velo-cargo-etiquette-batterie.jpg" "Étiquette de la batterie BT-E6000" "500w" 500 %}
{% comment %}BT-E6000 Li-ion Battery pack
36V 11.6Ah 418Wh{% endcomment %}

La batterie a une tension de 36V, une capacité de 11.6Ah, soit une capacité énergétique totale de {{ 418 | Wh }}. C'est cette énergie que le vélo peut utiliser pour fournir l'assistance électrique.

Le vélo est équipé d'un dérailleur électrique automatique à 8 vitesses. L'écran affiche le niveau de batterie restant en pourcentage ainsi que la vitesse actuelle :

{% image "./images/velo-cargo-ecran.jpg" "L'afficheur du vélo montrant 25% de batterie restante" "250w" 250 %}
{% comment %}photo de l'afficheur du vélo, ici montrant 25% de batterie restante, ce qui correspond à l'une des mesures.{% endcomment %}

## Consommation

### Informations fournies par le fabricant

#### Le chargeur

Le chargeur de la batterie est un modèle EC-E6002 :

{% image "./images/velo-cargo-chargeur.jpg" "Le chargeur de la batterie" "700w" 700 %}
{% comment %}photo du dessous du chargeur (modèle EC-E6002). Beaucoup de texte sur l'étiquette...{% endcomment %}

Zoomons sur les caractéristiques électriques :

{% image "./images/velo-cargo-chargeur-etiquette.jpg" "Zoom sur l'étiquette du chargeur" "700w" 700 %}
{% comment %}zoom sur la partie qui nous intéresse de l'étiquette :
PRODUCT: BATTERY CHARGER INPUT: 100-240V~ 1.5A 50-60Hz
OUTPUT: 42V 1.8A{% endcomment %}

Le chargeur accepte une tension d'entrée de 100-240V (compatible partout dans le monde), avec une intensité maximale de 1.5A. En sortie, il délivre 42V à 1.8A maximum, soit une puissance maximale de {{ 42 | times: 1.8 | W }}.

### Charge complète

J'ai mesuré une charge complète lorsque la batterie était à 9% restant. Quand la batterie devient faible, l'assistance électrique s'arrête pour garder le dérailleur électrique et l'affichage sur l'écran fonctionnels le plus longtemps possible. À 9% restant, je suis rentré jusqu'au chargeur à la force des jambes ! La recharge dure {{ 19805827 | divided_by: 1000 | s }} et consomme {{ 413 | Wh€ }} :

{% profile "velo-cargo.json.gz" '{"name": "Charge complète", "range": "635688m19805827"}' %}
{% comment %}draft: charge complète depuis 9% restant. On peut analyser la forme, avec un démarrage net, une croissance lente jusqu'à la puissance maximale, puis une décroissance régulière clairement marquée pendant les dernières 35 minutes. Probablement une charge lente des derniers pourcents de la batterie pour la préserver.{% endcomment %}

On observe un démarrage net, puis une croissance lente depuis environ {{ 70 | W }} jusqu'à atteindre la puissance maximale de {{ 85.6 | W }}. Cette puissance maximale dépasse la puissance de sortie indiquée sur l'étiquette du chargeur ({{ 42 | times: 1.8 | W }}). Cette différence est probablement due aux pertes du chargeur lui-même, qui chauffe un peu pendant la charge.

Pendant les dernières 35 minutes, la puissance décroît régulièrement. Cette décroissance en fin de charge est probablement une charge lente des derniers pourcents de la batterie pour préserver sa durée de vie. Les batteries lithium-ion sont en effet sensibles aux conditions de charge, et une charge plus lente en fin de cycle permet de réduire leur vieillissement.

Si l'on suppose que la batterie est en bon état, lorsqu'il reste 9%, environ 91% de sa capacité nominale de {{ 418 | Wh }} a été utilisée, soit environ {{ 418 | times: 0.91 | Wh }}. La consommation mesurée est de {{ 413 | Wh }}, ce qui correspond bien et confirme que le chargeur a une bonne efficacité : {{ 418 | times: 0.91 | divided_by: 413 | times: 100 | round }}% de l'énergie consommée est stockée dans la batterie.

Cette première mesure nous donne des informations sur le chargeur et la batterie, mais ne nous apprend rien sur la consommation du vélo, car je n'ai hélas pas noté combien de kilomètres ont été parcourus. Pour calculer le coût au kilomètre, j'ai réalisé d'autres mesures en notant systématiquement la distance parcourue et le pourcentage de batterie restant avant de remettre en charge.

### Charge après 5 allers-retours à la crèche (55,4km)

Après avoir effectué 5 allers-retours à la crèche, il restait 25% dans la batterie du vélo, pas assez pour faire un aller-retour de plus. La charge dure {{ 16456708 | divided_by: 1000 | s }} et consomme {{ 344 | Wh€ }} :

{% profile "velo-cargo-25pct-55.4km.json.gz" '{"name": "Charge avec 25% restants après 5 allers-retours à la crèche (55,4km)", "range": "68096m16456708"}' %}
{% comment %}draft: deuxième mesure, cette fois le vélo a fait 5 aller retour à la crèche, et il restait 25% dans la batterie du vélo ; pas assez pour faire un aller retour de plus. On voit un pic assez fort au démarrage, puis une charge similaire à celle de la première mesure{% endcomment %}

On observe un pic assez fort au démarrage, puis une charge similaire à celle de la première mesure. Zoomons sur ce pic pour mieux le comprendre :

{% profile "velo-cargo-25pct-55.4km.json.gz" '{"name": "Pic au démarrage", "range": "68096m13106"}' %}
{% comment %}draft: zoom sur le pic. Chargement de condensateur lors de la reconnexion du chargeur au secteur ?{% endcomment %}

Le pic atteint {{ 163 | W }} pendant une seconde. Il s'agit probablement du chargement d'un condensateur lors de la reconnexion du chargeur au secteur. C'est un comportement classique des alimentations électroniques.

Regardons maintenant le profil de charge après ce pic initial :

{% profile "velo-cargo-25pct-55.4km.json.gz" '{"name": "Charge avec 25% restants après 5 allers-retours à la crèche (55,4km) — après le pic", "range": "72535m16452268"}' %}
{% comment %}draft: charge. On a le kilométrage, on peut estimer l'énergie utilisée et le coût par km.{% endcomment %}

La charge dure {{ 16452268 | divided_by: 1000 | s }} et consomme {{ 344 | Wh }}. Le vélo a parcouru 55,4km, donc la consommation est d'environ {{ 344 | divided_by: 55.4 | Wh€ }} par kilomètre. Il faudrait parcourir {{ 344 | divided_by: 55.4 | countPer€: 0.01 }}km pour dépenser 1 centime.

### Charge à 86% — 1 seul aller-retour à la crèche

Pour mieux comprendre le comportement du chargeur quand la batterie est presque pleine, j'ai remis en charge la batterie après avoir fait un seul aller-retour à la crèche (donc 5 fois moins de distance qu'à la mesure précédente). Il restait 86% de la charge. La recharge dure {{ 3631794 | divided_by: 1000 | s }} et consomme {{ 72.7 | Wh€ }} :

{% profile "velo-cargo-86pct.json.gz" '{"name": "Charge 86% — 1 seul aller-retour à la crèche", "range": "76594m3631794"}' %}
{% comment %}draft: pour mieux décomposer, j'ai remis en charge la batterie après avoir fait un seul aller retour à la crèche (donc 5 fois moins de distance qu'à la mesure d'avant) Ça permet de voir comment se comporte le chargeur quand la batterie est presque pleine, ici il restait 86% de la charge.{% endcomment %}

On observe que la puissance monte rapidement à plus de {{ 80 | W }} et reste stable pendant environ 45 minutes, puis décroît progressivement pendant 18 minutes. La charge est plus courte que pour les autres mesures, ce qui est logique puisque la batterie était déjà bien chargée.

Un aller-retour à la crèche représente environ {{ 55.4 | divided_by: 5 | round }}km, donc la consommation est d'environ {{ 72.7 | divided_by: 55.4 | times: 5 | Wh€ }} par kilomètre. C'est légèrement plus élevé que lors de la mesure précédente ({{ 344 | divided_by: 55.4 | Wh€ }} par km), mais cette différence peut être attribuée aux incertitudes de la mesure.

### Charge après 21,5km parcourus

21,5km ont été parcourus pendant le week-end, et il restait 55% de batterie lors de la remise en charge. La recharge dure {{ 11313060 | divided_by: 1000 | s }} et consomme {{ 237 | Wh€ }} :

{% profile "velo-cargo-55pct-21.5km.json.gz" '{"name": "Charge après 21,5km parcourus, 55% restant", "range": "648292m11313060"}' %}
{% comment %}draft: 21.5km parcourus pendant le week-end, 55% de batterie restant lors de la remise en charge{% endcomment %}

La consommation est d'environ {{ 237 | divided_by: 21.5 | Wh€ }} par kilomètre. C'est nettement plus élevé que lors de la mesure précédente ({{ 344 | divided_by: 55.4 | Wh€ }} par km) : {{ 237 | times: 55.4 | divided_by: 21.5 | percentMore: 344 }} de plus ! Ces variations importantes peuvent s'expliquer par des conditions différentes : relief, vent, charge transportée, niveau d'assistance utilisé.

### Un aller-retour en haut de la colline

Lors des [élections législatives anticipées](https://fr.wikipedia.org/wiki/%C3%89lections_l%C3%A9gislatives_fran%C3%A7aises_de_2024 "Page « Élections législatives françaises de 2024 » sur Wikipédia"), j'avais indiqué que j'étais disponible pour porter une procuration. Je m'attendais à ce qu'on me propose de porter le vote d'une personne dans un bureau proche du mien. Mais surprise, on m'a mis en relation avec une électrice habitant tout en haut de la colline, dans la direction opposée de celle de mon bureau de vote !

Au final, 12,5km parcourus pour aller voter 2 fois ce dimanche, dont 93m de dénivelé positif pour aller en haut de la colline. Est-ce que cela a affecté la consommation au kilomètre ? Il restait 71% de la batterie à mon retour à la maison. La recharge dure {{ 6435129 | divided_by: 1000 | s }} et consomme {{ 133 | Wh€ }} :

{% profile "velo-cargo-71pct-12.5km-vote-procu.json.gz" '{"name": "Un aller-retour en haut de la colline", "range": "51455m6435129"}' %}
{% comment %}draft: Lors des élections législatives anticipées, j'avais indiqué que j'étais disponible pour porter une procuration. Je m'attendais à ce qu'on me propose de porter le vote d'une personne dans un bureau proche du mien. Mais surprise, on m'a mis en relation avec une électrice habitant tout en haut de la colline, dans la direction opposée de celle de mon bureau de vote ! Au final, 12,5km parcourus pour aller voter 2 fois ce dimanche, dont 93m de dénivelé positif pour aller en haut de la colline. Est-ce que cela a affecté la consommation au kilomètre ? Il restait 71% de la batterie à mon retour à la maison.{% endcomment %}

La consommation est d'environ {{ 133 | divided_by: 12.5 | Wh€ }} par kilomètre. C'est {{ 133 | times: 55.4 | divided_by: 12.5 | percentMore: 344 }} de plus que lors des trajets à plat vers la crèche, mais finalement comparable au parcours du week-end précédent ({{ 237 | divided_by: 21.5 | Wh }} par km).

Le dénivelé de 93m a donc un impact sur la consommation, mais pas autant qu'on pourrait le penser. En montée, le moteur consomme effectivement beaucoup plus d'énergie pour compenser la force de gravité, mais en descente, l'assistance n'est quasiment pas sollicitée, ce qui compense en partie.

### En veille

Le chargeur reste habituellement toujours branché. Comme il était resté sur la prise connectée pour réaliser les différentes mesures de ce test, j'ai pu mesurer sa consommation au repos entre deux charges :

{% profile "velo-cargo.json.gz" '{"name": "Chargeur débranché — 4 jours", "range": "20441515m347146168"}' %}
{% comment %}draft: conso au repos pendant 4 jours{% endcomment %}

Pendant 4 jours, le chargeur branché sans batterie connectée a consommé {{ 12.1 | Wh }}, soit une puissance moyenne de {{ 0.125 | W }}. C'est faible, mais tout de même l'équivalent de {{ 12.1 | divided_by: 344 | times: 55.4 | round }}km parcourus avec le vélo !

Si le chargeur reste branché tout le temps, il consommera {{ 0.125 | W€PerYear }} par an. C'est financièrement négligeable, et on peut donc le laisser branché sans se soucier du coût, mais c'est l'équivalent de {{ 0.125 | times: 24 | times: 365 | divided_by: 344 | times: 55.4 | round }}km par an !

### Sur un an

Si l'on suppose que le vélo est utilisé 5 fois par semaine pour aller à la crèche (comme c'est le cas actuellement), la consommation sera de {{ 344 | Wh }} par semaine, soit {{ 344 | times: 52 | Wh€ }} par an. En ajoutant les trajets du week-end ({{ 237 | Wh }} mesurés), la consommation totale sera d'environ {{ 344 | plus: 237 | times: 52 | Wh€ }} par an. Ce calcul compte sur 52 semaines complètes sans déduire les semaines de vacances, donc la consommation réelle sera probablement un peu inférieure.

La consommation du chargeur en veille est de {{ 0.125 | W€PerYear }} par an. En ajoutant cette veille aux trajets ({{ 344 | plus: 237 | times: 52 | Wh€ }}), la consommation totale sera d'environ {{ 12.1 | divided_by: 4 | times: 7 | plus: 344 | plus: 237 | times: 52 | Wh€ }} par an.

C'est négligeable comparé au prix d'achat un tel vélo qui coûte plusieurs milliers d'euros, et c'est vraiment très économique comparé à l'usage d'une voiture !

Pour donner un ordre d'idée, si l'on considère qu'une voiture consomme environ 6L/100km de carburant à 1.70€/L, cela représente environ 10.2€ pour 100km, soit environ 10 centimes par kilomètre. Le vélo cargo coûte {{ 344 | divided_by: 55.4 | Wh€ }} par kilomètre en électricité. Il faut parcourir {{ 344 | divided_by: 55.4 | countPer€: 0.01 }}km pour dépenser 1 centime, contre seulement 100 mètres en voiture !

Sans compter que le vélo ne nécessite pas d'assurance et très peu d'entretien comparé à une voiture. Il permet aussi de faire du sport au passage, et de ne pas rester bloqué dans les bouchons.

### Conseils pour l'autoconsommation photovoltaïque

La puissance de charge du vélo est relativement faible ({{ 75 | W }} en moyenne) et constante pendant plusieurs heures. Cela le rend tout à fait adapté à l'autoconsommation photovoltaïque.

Avec une installation photovoltaïque typique en toiture de 3 kWc, la charge du vélo peut être réalisée à n'importe quel moment de la journée, même par temps nuageux, car la puissance nécessaire est très faible comparée à la production disponible.

Pour ceux qui souhaiteraient installer un petit kit solaire (300-500W installé soi-même), il faudra brancher le chargeur en milieu de journée lorsque la production solaire est maximale pour assurer une bonne autoconsommation.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du vélo cargo, on pourrait :
- mesurer la consommation selon différents niveaux d'assistance électrique (Éco, Normal, High) ;
- comparer la consommation avec différentes charges transportées (vide, avec enfant, avec 80 kg de marchandises dans la caisse) ;
- mesurer la consommation selon le relief (plat, montée, descente) de façon plus systématique ;
- comparer avec d'autres modèles de vélos à assistance électriques ;
- mesurer l'impact du gonflage des pneus et de la pression du vent sur la consommation ;
- évaluer la dégradation des performances au fil des années d'utilisation.
{% endplusloin %}
