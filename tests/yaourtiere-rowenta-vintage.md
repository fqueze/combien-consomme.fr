---
layout: test-layout.njk
title: une yaourtière Rowenta vintage
img: yaourtiere-rowenta-vintage.jpg
date: 2026-02-01
tags: ['test']
---

Très mignonne avec son design jaune rétro, cette yaourtière vintage avec son thermostat mécanique consomme-t-elle plus ou moins que les modèles contemporains ?

<!-- excerpt -->

{% tldr %}
- En préparant une fournée de 10h par semaine, la consommation annuelle sera de {{ 105 | times: 52 | Wh€ }}.
- Une fournée de 7 yaourts consomme {{ 105 | Wh€ }}, soit {{ 105 | divided_by: 7 | Wh€ }} par yaourt.
- Avec son thermostat mécanique, ce modèle vintage est plus économe que la {% test yaourtiere SEB Classic %} ({{ 105 | percentLess: 147 }} de moins) et que la {% test yaourtiere-seb-multi-delices SEB Multi delices %} moderne (environ {{ 105 | percentLess: 223 }} de moins).
- Le thermostat coupe vraiment l'alimentation entre les chauffages, ne laissant que {{ 0.400 | W }} pour le témoin lumineux.
{% endtldr %}

{% comment %}
Notes from draft:
Cette yaourtière m'a été donnée sur un stand du marché aux puce où je venais d'acheter autre chose. J'avais juste dit "elle est mignonne la vieille yaourtière jaune" et on m'a répondu "tiens, je te la donne, prend la". Pas du tout besoin d'une yaourtière car j'en ai déjà testé plusieurs, mais je me suis dit que j'allais quand même la prendre pour la tester. Finalement elle était plus intéressante que prévue : elle contient un thermostat et sa consommation n'est donc pas du tout constante.
{% endcomment %}

## Le matériel

{% intro "yaourtiere-rowenta-vintage.jpg" "Yaourtière Rowenta KG-76" %}

Cette yaourtière Rowenta vintage m'a été donnée sur un marché aux puces. Je l'ai acceptée sans vraiment en avoir besoin, simplement parce qu'elle était mignonne avec son design jaune rétro. Mais une fois branchée, j'ai découvert qu'elle cachait une surprise : un thermostat mécanique qui claque toutes les quelques minutes pendant la cuisson.

Elle permet de préparer 7 yaourts par fournée, comme la plupart des {% test yaourtiere yaourtières classiques %}.

L'appareil est d'une simplicité désarmante : pas de bouton, pas de réglage, pas même d'interrupteur. Il faut brancher la prise pour la mettre en marche. Un témoin lumineux rouge confirme qu'elle fonctionne. Il faut surveiller soi-même le temps de cuisson et débrancher manuellement.

### Méthode de mesure

La yaourtière Rowenta est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## À l'intérieur

Voici l'intérieur de la yaourtière avec les 7 pots et leurs gros couvercles en plastique jaune :

{% image "./images/yaourtiere-rowenta-vintage-ouverte.jpg" "Yaourtière ouverte avec les 7 pots à yaourt visibles" "500w" 500 %}
{% comment %}yaourtière ouverte. Couvercle retiré, mais les pots sont dedans (et vide). On voit leurs gros couvercles en plastique jaunes.{% endcomment %}

Une fois les pots retirés, on découvre le bac de chauffe en plastique jaune :

{% image "./images/yaourtiere-rowenta-vintage-bac.jpg" "Bac de chauffe en plastique jaune" "500w" 500 %}
{% comment %}partie du bas de la yaourtière lorsqu'elle est ouverte et que les pots ont été retirés. Visuellement, c'est juste un bac en plastique jaune{% endcomment %}

Retourné, le bac ne révèle pas grand-chose de plus, juste une vis centrale et quelques inscriptions :

{% image "./images/yaourtiere-rowenta-vintage-dessous.jpg" "Dessous du bac de chauffe" "500w" 500 %}
{% comment %}le bac jaune retourné. En dessous il n'y a pas grand chose non plus. On voit juste une vis au centre, et des inscriptions à droite sur lesquelles on va zoomer{% endcomment %}

## Consommation

### Informations fournies par le fabricant

Zoomons sur les inscriptions que nous avions aperçues sous le bac :

{% image "./images/yaourtiere-rowenta-vintage-etiquette.jpg" "Inscriptions moulées dans le plastique : Rowenta KG-76, 220V ~ 25W" "250w" 250 %}
{% comment %}Rowenta KG-76
220 V ~ 25W{% endcomment %}

Les inscriptions moulées dans le plastique indiquent « Rowenta KG-76 220 V ~ 25W », soit une puissance nominale de {{ 25 | W }}.

### Une cuisson complète

Pour ce test, nous préparons 7 yaourts selon la recette classique : un yaourt nature mélangé à 3/4 de litre de lait :

{% image "./images/yaourtiere-rowenta-vintage-preparation.jpg" "Préparation des yaourts : mélange d'un yaourt dans du lait" "500w" 500 %}
{% comment %}préparation des yaourts : pour préparer 7 pots de yaourt, on mélange un yaourt du commerce dans 3/4 de litre de lait, puis on verse cette préparation dans les pots.{% endcomment %}

Une fois la préparation versée dans les pots et ceux-ci placés dans la yaourtière, nous sommes prêts à lancer la cuisson :

{% image "./images/yaourtiere-rowenta-vintage-pret.jpg" "Pots remplis placés dans la yaourtière, prêts pour le démarrage" "500w" 500 %}
{% comment %}préparation versée dans les pots, qui sont placés dans la yaourtière (sans couvercle pour l'instant) : prêt pour lancer la cuisson !{% endcomment %}

Après avoir fermé le couvercle et mis en marche, le témoin lumineux rouge s'allume :

{% image "./images/yaourtiere-rowenta-vintage-cuisson.jpg" "Yaourtière en fonctionnement avec témoin lumineux allumé" "500w" 500 %}
{% comment %}yaourtière juste après le démarrage de la cuisson. Les pots de yaourts sont à l'intérieur, le couvercle est fermé. On remarque le témoin lumineux qui est maintenant allumé.{% endcomment %}

Pour une cuisson d'environ 10h, on mesure une consommation de {{ 105 | Wh€ }} :

{% profile "yaourtiere-rowenta-vintage.json.gz" '{"name": "Yaourtière — 10h", "range": "372477m36061190"}' %}
{% comment %}draft: Profil de la cuisson complète des yaourts sur 10h. On observe une alternance entre des périodes de conso marquées à environ 30W et des périodes de conso très faible à moins de 0.5W. Cela correspond parfaitement au comportement d'un thermostat, dont on entend d'ailleurs les claquements toutes les quelques minutes pendant la cuisson.
Au début pendant quelques minutes ça chauffe en continu, puis on a des alternances entre chauffe / non chauffe. On remarque qu'au fil du temps les périodes de chauffe se raccourcissent et s'espacent.{% endcomment %}

On observe un comportement intéressant : après un chauffage initial continu, la consommation alterne entre des périodes de chauffe autour de {{ 32 | W }} et des périodes d'arrêt à {{ 0.400 | W }}. C'est le signe caractéristique d'un thermostat mécanique qui régule la température.

Pendant la cuisson, on entend d'ailleurs régulièrement des petits claquements : c'est le thermostat qui s'enclenche et se déclenche pour maintenir la température idéale. Au fil des heures, les périodes de chauffe deviennent de plus en plus courtes et espacées, car les yaourts chauds conservent mieux leur température.

La puissance moyenne sur l'ensemble du cycle est de {{ 10.5 | W }}, avec une médiane à {{ 0.400 | W }}. Cette médiane très basse indique que l'appareil passe plus de temps éteint qu'allumé, ce qui explique sa faible consommation totale.

Le lendemain matin, les yaourts sont prêts. La condensation sur le couvercle témoigne de la cuisson qui s'est déroulée pendant la nuit :

{% image "./images/yaourtiere-rowenta-vintage-condensation.jpg" "Yaourtière le matin avec condensation sur le couvercle" "500w" 500 %}
{% comment %}yaourtière le matin après une nuit de cuisson des yaourts. On remarque qu'il y a des grosses goutes de condensation sur le couvercle en plastique transparent de la yaourtière{% endcomment %}

### En détail

#### Le chauffage initial

Au tout début de la cuisson, la résistance chauffe en continu pendant environ 10 minutes pour atteindre la température cible :

{% profile "yaourtiere-rowenta-vintage.json.gz" '{"name": "Yaourtière — chauffage initial", "range": "372477m592011"}' %}
{% comment %}draft: chauffe stable pendant presque 10 Minutes en continu au tout début de la cuisson, jusqu'à atteindre la température recherchée par le thermostat{% endcomment %}

La puissance reste stable autour de {{ 31.9 | W }} (médiane), très proche de la puissance maximale mesurée de {{ 32.7 | W }}. C'est {{ 32.7 | percentMore: 25 }} de plus que les {{ 25 | W }} nominaux. Cet écart s'explique en partie par la tension du réseau électrique lors du test : nous sommes à 240V au lieu des 220V de référence. Une résistance de {{ 25 | W }} à 220V consomme {{ 25 | times: 240 | times: 240 | divided_by: 220 | divided_by: 220 | round: 1 | W }} à 240V. Le reste de l'écart peut s'expliquer par les tolérances de fabrication.

Cette phase de chauffe initiale consomme {{ 5.21 | Wh }}.

#### La première heure de maintien

Une fois la température atteinte, le thermostat commence à alterner entre chauffe et arrêt environ toutes les 3 à 4 minutes :

{% profile "yaourtiere-rowenta-vintage.json.gz" '{"name": "Yaourtière — une heure au début", "range": "1085853m3602553"}' %}
{% comment %}draft: zoom sur la première heure de cuisson après la première période de chauffage initiale. Alternance entre chauffe et non-chauffe environ toutes les 3min40, même si à la fin de cette heure ça commence déjà à s'espacer.{% endcomment %}

On observe des cycles réguliers : le thermostat enclenche la résistance pour réchauffer, puis la coupe une fois la température atteinte. La préparation encore froide nécessite des réchauffages fréquents pour maintenir la température.

Cette première heure de maintien consomme {{ 14.3 | Wh }}, soit une puissance moyenne de {{ 14.3 | W }}.

Voici ce que montre la caméra thermique pendant la cuisson :

{% image "./images/yaourtiere-rowenta-vintage-thermal-cuisson.jpg" "Image thermique montrant la yaourtière chaude pendant la cuisson" "500w" 500 %}
{% comment %}image en caméra thermique pendant la cuisson. On voit que l'ensemble de la yaourtière est chaud comparé au reste de la cuisine, et en particulier le bas de la yaourtière est plus chaud.{% endcomment %}

L'ensemble de la yaourtière est chaud, avec une concentration de chaleur plus importante dans le bas où se trouve l'élément chauffant.

#### La dernière heure

En fin de cuisson, les cycles de chauffage s'espacent considérablement :

{% profile "yaourtiere-rowenta-vintage.json.gz" '{"name": "Yaourtière — dernière heure", "range": "32831114m3602553"}' %}
{% comment %}draft: zoom sur la dernière heure de la cuisson, la puissance moyenne a baissé, les périodes de chauffe durent un peu plus de 2min30 et sont espacées d'environ 6min40.{% endcomment %}

Les périodes de chauffe durent environ 2 minutes 30 et sont espacées d'environ 6 minutes 40. Les yaourts chauds conservent bien mieux leur température que la préparation froide du début, le thermostat a donc moins besoin d'intervenir.

Cette dernière heure ne consomme que {{ 9.06 | Wh }}, soit {{ 9.06 | percentLess: 14.3 }} de moins que la première heure de maintien. Cette diminution démontre l'efficacité thermique qui s'améliore au cours de la cuisson, et met en évidence l'intérêt d'avoir un thermostat plutôt qu'une résistance un peu moins puissante restant allumée tout le temps comme sur la {% test yaourtiere yaourtière SEB Classic %}.

#### Le témoin lumineux

Entre deux chauffages, la consommation ne tombe pas à zéro. Observons 5 minutes pendant lesquelles le thermostat a coupé la résistance :

{% profile "yaourtiere-rowenta-vintage.json.gz" '{"name": "Yaourtière — 5 minutes sans chauffage", "range": "29714868m300349"}' %}
{% comment %}draft: consommation lorsque le thermostat a éteint la résistance. C'est probablement juste une ampoule pour le témoin lumineux.{% endcomment %}

La consommation se stabilise autour de {{ 0.400 | W }}. C'est le témoin lumineux rouge qui reste allumé en permanence pendant toute la cuisson pour indiquer que l'appareil fonctionne. Ce petit témoin devient d'ailleurs très visible dans la cuisine pendant la nuit :

{% image "./images/yaourtiere-rowenta-vintage-nuit.jpg" "Témoin lumineux rouge visible dans la cuisine la nuit" "250w" 250 %}
{% comment %}le témoin lumineux devient très visible dans la cuisine pendant la nuit.{% endcomment %}

Un témoin lumineux de ce type, s'il restait branché en permanence, consommerait {{ 0.400 | W€PerYear }} par an.

#### Le système de chauffage

Une fois les yaourts retirés, l'image thermique du bac vide révèle la forme de l'élément chauffant :

{% image "./images/yaourtiere-rowenta-vintage-thermal-fond.jpg" "Image thermique du bac montrant un chauffage rectangulaire homogène" "300w" 300 %}
{% comment %}image thermique de la yaourtière vide après avoir retiré les pots le matin. On voit que le chauffage se fait de façon plutôt homogène avec une forme chauffante rectangulaire{% endcomment %}

Le chauffage se fait de façon relativement homogène avec une forme rectangulaire caractéristique.

### Comparaison avec d'autres yaourtières

Comment cette vieille yaourtière à thermostat mécanique se positionne-t-elle face aux modèles que nous avons déjà testés ?

#### Versus la SEB Classic (résistance simple)

La {% test yaourtiere yaourtière SEB Classic %} utilise une résistance simple sans thermostat. Elle chauffe en continu à {{ 15 | W }} pendant toute la cuisson. Pour 10 heures de cuisson, elle consomme {{ 147 | Wh }}.

La Rowenta vintage avec son thermostat consomme {{ 105 | Wh }} pour la même durée, soit {{ 105 | percentLess: 147 }} de moins. Le thermostat fait la différence : en coupant régulièrement la résistance, il évite de surchauffer inutilement.

#### Versus la SEB Multi delices (électronique moderne)

À l'autre extrême, la {% test yaourtiere-seb-multi-delices yaourtière SEB Multi delices %} est un modèle haut de gamme bourré d'électronique avec écran, programmes automatiques et thermostat électronique. Elle consomme {{ 268 | Wh }} pour 12 heures de cuisson, soit environ {{ 268 | divided_by: 12 | times: 10 | round: 0 }} Wh pour 10 heures.

Son thermostat électronique alterne entre des pics à {{ 450 | W }} et des phases de repos, avec une puissance moyenne de {{ 22.3 | W }}. C'est plus du double de la consommation de notre Rowenta vintage.

#### Le thermostat mécanique vintage, champion de l'économie

Contre toute attente, c'est la vieille yaourtière Rowenta avec son simple thermostat mécanique qui remporte la palme de l'efficacité énergétique. Le simple fait d'avoir un vrai thermostat mécanique qui claque et coupe l'alimentation s'avère plus efficace que l'électronique sophistiquée ou qu'une résistance qui chauffe en continu.

### Coût d'usage

Le coût électrique pour préparer 7 yaourts est de {{ 105 | Wh€ }}, soit {{ 105 | divided_by: 7 | Wh€ }} par yaourt. C'est dérisoire comparé au prix du lait et du yaourt de départ nécessaires à la préparation.

Il faudrait préparer {{ 105 | countPer€: 1 }} fournées de yaourts pour dépenser un euro d'électricité.

Si l'on prépare une fournée par semaine, la consommation annuelle sera de {{ 105 | times: 52 | Wh€ }} par an. Le coût électrique de la yaourtière est négligeable. L'intérêt de faire ses yaourts maison est ailleurs : le plaisir du fait maison, et surtout éviter de jeter des pots à usage unique à chaque fois dans une démarche zéro déchet.

### Conseils pour l'autoconsommation photovoltaïque

La puissance lors des phases de chauffe (autour de {{ 32 | W }}) est très faible. N'importe quelle installation photovoltaïque, même quelques panneaux plug & play sur un balcon, produira largement de quoi alimenter la yaourtière.

En revanche, la longue durée de cuisson (10h) impose de lancer la yaourtière le matin pour profiter de la production solaire sur toute la journée. Sur une bonne partie de l'année, 10h représente presque toute la durée d'ensoleillement disponible.

Cette yaourtière vintage, avec sa régulation par thermostat mécanique et sa faible puissance, est particulièrement bien adaptée à l'autoconsommation. Elle contraste avec la {% test yaourtiere-seb-multi-delices SEB Multi delices %} moderne dont les pics à {{ 450 | W }} sont plus difficiles à absorber avec une petite installation solaire.

Cela dit, avec un coût électrique de {{ 105 | Wh€ }} par fournée, l'enjeu économique et environnemental reste modeste. L'autoconsommation pour la yaourtière doit s'inscrire dans une démarche plus globale pour avoir un véritable impact.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette yaourtière vintage, on pourrait :
- tester avec du lait sorti du réfrigérateur versus du lait à température ambiante, pour mesurer l'impact sur les cycles de chauffage ;
- mesurer l'impact de la température ambiante (été vs hiver) sur la fréquence des cycles du thermostat ;
- tester avec différentes quantités de lait (moins de pots) pour voir si le thermostat adapte ses cycles ;
- comparer avec d'autres modèles vintage à thermostat mécanique pour voir s'ils ont tous cette efficacité ;
- tester différentes durées de cuisson (8h, 10h, 12h) pour voir l'impact sur la consommation totale.
{% endplusloin %}
