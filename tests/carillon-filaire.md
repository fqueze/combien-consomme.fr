---
layout: test-layout.njk 
title: un carillon filaire
img: carillon-filaire.jpg
date: 2025-05-30
tags: ['test']
---

Une sonnette près de la porte d'entrée, c’est simple, pratique, et… toujours branché. Ce petit appareil consomme-t-il beaucoup ?
<!-- excerpt -->

{% tldr %}
- Le carillon Urmet 44172 consomme {{ 1.09 | W }} en veille, soit {{ 1.09 | W€PerYear }} par an.
- Lorsque quelqu'un sonne, la puissance mesurée monte brièvement à {{ 12.8 | W }}.
- La consommation liée à l'utilisation est tellement faible qu'elle est difficile à mesurer : entre {{ 0.0235 | minus: 0.0181 | divided_by: 10 | Wh }} et {{ 0.0211 | minus: 0.0181 | Wh }}, soit {{ 0.0211 | minus: 0.0181 | countPer€: 0.01 }} à {{ 0.0235 | minus: 0.0181 | divided_by: 10 | countPer€: 0.01 }} sonneries pour un centime d'électricité.
- L'électricité coûte plus cher que l'achat du carillon au bout de {{ 1.09 | times: 24 | times: 365.2425 | countPer€: 25.99 }} ans.
{% endtldr %}

## Le matériel
{% intro "carillon-filaire.jpg" "Le carillon Urmet Captiv 44172 installé sur un mur" %}

Nous étudions ici un carillon filaire de la marque Urmet, modèle 44172, typiquement installé à l'entrée d'un logement, et relié à un bouton poussoir de l'autre côté de la porte d'entrée.

Ce modèle se branche sur le secteur via un petit transformateur intégré, assurant une basse tension dans le bouton de sonnette, pour garantir la sécurité des utilisateurs dans le cas où le bouton viendrait à être arraché en laissant les fils accessibles.

### Méthode de mesure

Pour le test, un câble avec une prise électrique standard a été branché sur les bornes d'alimentations du carillon, et un bouton poussoir a également été connecté. L'installation de test est branchée sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

Voici une photo du montage de test :  
{% image "./images/carillon-filaire-montage-de-test.jpg" "Photo montrant le carillon ouvert, avec un bouton poussoir et un câble d'alimentation raccordés." "800w" 800 %}

Le carillon étant ouvert sur la photo, on peut observer à l'intérieur :
- au centre, un petit marteau commandé électriquement ;
- en bas, le transfo, dont les caractéristiques indiquées sont « 8V 1.0A » ;
- à gauche et à droite, deux plaques métalliques de longueurs différentes permettant de faire deux notes lorsqu'elles sont frappées par le marteau.

## Consommation

Au dos de l'appareil et à l'intérieur de son couvercle, on trouve la petite étiquette suivante :  
{% image "./images/carillon-filaire-etiquette.jpg" "Photo de l'étiquette indiquant « Réf. 44172 200-240 Vac / 50 Hz / 30 VA IP44 »" "500w" 500 %}

L'inscription « 30 VA » concerne la puissance apparente de l'appareil, mais ne nous renseigne pas sur la puissance effectivement consommée.

L'inscription « 8V 1.0A » relevée précédemment sur le transfo indique que le marteau électrique peut recevoir une puissance jusqu'à {{ 8 | W }} en courant continu, mais cela ne prend pas en compte l'énergie perdue par le transfo.

Les caractéristiques techniques données sur le site du fabriquant sont :
> - Sonnerie 2 tons.
> - Alimentation 230V.
> - Consommation : 0,06 A – 14 W.
> - Puissance sonore : 80 dB(A).

On peut supposer que {{ 14 | W }} est la puissance maximum, ce qui là encore ne nous renseigne pas beaucoup sur la consommation réelle. Mesurons !

### En veille

{% profile "carillon-filaire.json.gz" '{"name":"une journée sans sonnerie","range":"m86403599"}' %}

Lorsque le carillon est simplement branché mais ne sonne pas, la consommation mesurée est très stable, {{ 1.09 | W }} en moyenne.

Cela représente :
- {{ 1.09 | W€PerMonth }} par mois  
- {{ 1.09 | W€PerYear }} par an.

C’est peu, mais pourrait finalement revenir plus cher qu'un jeu de piles si elles tiennent plusieurs années, ce qui est souvent le cas sur un carillon à piles.

Si l'on suppose un prix d'achat neuf du carillon à {{ 25.99 | € }} (prix relevé sur le site d'une grande enseigne de bricolage), le coût de la consommation en veille du carillon dépasserait le prix d'achat après {{ 1.09 | times: 24 | times: 365.2425 | countPer€: 25.99 }} années.

### En utilisation

#### Une sonnerie dans la journée

Regardons maintenant l'enregistrement de la consommation du carillon sur une journée où quelqu'un a appuyé une fois sur le bouton de la sonnette :  
{% profile "carillon-filaire.json.gz" '{"name":"une journée avec une sonnerie","range":"52073995m86403599"}' %}

Les puissances moyennes et médianes mesurées sont identiques à celle mesurée quand le carillon n'avait pas été utilisé. La consommation d'énergie est inférieure de {{ 0.1 | Wh }} à celle mesurée précédemment, mais cette différence est tellement faible qu'elle est probablement due aux incertitudes expérimentales.
La puissance maximum mesurée à {{ 9.30 | W }} est par contre bien supérieure, avec un pic bien visible sur le graphique lorsque la sonnette a été utilisée.

#### Zoom sur une sonnerie

Si nous zoomons sur la minute où la sonnerie a retenti :  
{% profile "carillon-filaire.json.gz" '{"name":"une sonnerie — zoom sur une minute","range":"122094660m59776"}' %}

Puis sur la minute qui précède :  
{% profile "carillon-filaire.json.gz" '{"name":"une sonnerie — zoom sur la minute précédente","range":"122023315m59776"}' %}

Nous pouvons comparer la consommation électrique mesurée, {{ 0.0181 | Wh }} sans sonnerie, {{ 0.0211 | Wh }} avec. La consommation d'un appui sur le bouton de sonnette serait donc d'environ {{ 0.0211 | minus: 0.0181 | Wh€ }}. Si cette estimation est correcte, il faudrait appuyer {{ 0.0211 | minus: 0.0181 | countPer€: 0.01 }} fois sur le bouton de la sonnette pour faire dépenser un centime d'électricité à l'occupant du logement.

#### 10 sonneries

Pour affiner cette estimation, regardons maintenant un enregistrement de 10 appuis brefs sur le bouton de la sonnette :  
{% profile "carillon-filaire.json.gz" '{"name":"10 sonneries","range":"138853094m60434"}' %}

La consommation mesurée, {{ 0.0235 | Wh }}, n'est supérieure que de {{ 0.0235 | minus: 0.0181 | Wh }} à la consommation au repos, ce qui ne fait que {{ 0.0235 | minus: 0.0181 | divided_by: 10 | Wh }} par sonnerie. Si cette estimation est meilleure, il faudra alors appuyer {{ 0.0235 | minus: 0.0181 | divided_by: 10 | countPer€: 0.01 }} fois sur le bouton pour dépenser un centime.

La consommation maximale mesurée n'est que de {{ 3.40 | W }}, c'est beaucoup moins que pour la mesure précédente d'une seule sonnerie. Cela donne l'impression que la précision de l'appareil de mesure est insuffisante.

#### Un maximum de bruit

Imaginons maintenant qu'un visiteur très énervé appuie frénétiquement sur le bouton, de façon à faire le maximum de bruit pendant 30 secondes.

{% profile "carillon-filaire.json.gz" '{"name":"30 secondes qui cassent les oreilles","range":"138957882m60434"}' %}

Ce mode d'utilisation du carillon est particulièrement bruyant car le marteau frappe à nouveau les plaques métalliques avant même que les vibrations causées par le coup précédent aient cessé.

Ces 30 secondes de bruit on causé une surconsommation de {{ 0.0519 | minus: 0.0181 | Wh }}. Il faudrait appuyer sur le bouton répétitivement pendant {{ 0.0519 | minus: 0.0181 | times: 2 | times: 60 | countPer€: 0.01 }} heures pour dépenser un centime d'électricité ! Honnêtement, ces 30 secondes m'ont déjà paru très longues pendant le test.

#### Appui continu

Les instructions du fabriquant précisent :
> « Ne pas utiliser le bouton d'appel de manière continue. La durée d'appel doit être inférieure à 20s. »

Il n'en fallait pas plus pour me rendre curieux, et me donner envie d'appuyer 20 secondes en continu sur le bouton. Voici l'enregistrement :  
{% profile "carillon-filaire.json.gz" '{"name":"20 secondes de pression continue sur le bouton","range":"139013325m60434"}' %}

Lorsque j'ai enfoncé le bouton, l'une des deux plaques métalliques a été frappée, puis j'ai entendu un ronflement pendant que le bouton restait enfoncé, et finalement la deuxième plaque a été frappée lorsque j'ai relâché le bouton.

La puissance maximale mesurée à {{ 12.4 | W }} nous donne une bonne indication de la puissance réellement consommée par l'appareil lors des tests précédents, pour lesquels le bouton était resté enfoncé moins de 2 secondes. Cette puissance maximale mesurée est proche des {{ 14 | W }} indiqués par le fabriquant.

Vu la consommation plus élevée, on peut supposer que la limite de 20 secondes recommandée par le fabricant est pour éviter une surchauffe de l'appareil.

#### Sonneries insistantes

Finalement, pour faire un test plus réaliste, j'ai demandé à une personne de mon entourage d'appuyer sur le bouton et de sonner comme si elle s'impatientait, avait peur de ne pas être entendue, voire s'énervait.

{% profile "carillon-filaire.json.gz" '{"name":"sonneries insistantes","range":"139307175m60434"}' %}

Comme on peut le deviner en regardant le graphique, le bouton a été pressé de façon répétitive pendant environ 10 secondes, puis après 10 secondes d'attente il a été pressé à nouveau une fois, puis après à nouveau 10 secondes, il a de nouveau été pressé répétitivement pendant une dizaine de secondes.

La surconsommation pendant cette expérience, {{ 0.0404 | minus: 0.0181 | Wh }}, reste très faible. Il faudrait {{ 0.0404 | minus: 0.0181 | countPer€: 0.01 }} visiteurs excités pour consommer un centime d'électricité.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un carillon, on pourrait :
- mesurer précisément la consommation d'une sonnerie en utilisant un wattmètre ayant un plus fort taux d'échantillonnage ;
- tester un carillon sans fil ;
- comparer le coût de revient avec celui d'un carillon à piles ou sur batterie rechargeable ;
- essayer de remplacer le transformateur par une alimentation plus efficace (par exemple un chargeur de téléphone).
{% endplusloin %}
