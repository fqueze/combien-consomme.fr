---
layout: test-layout.njk
title: le mixage d'une soupe aux légumes
img: mixer-une-soupe.jpg
date: 2025-12-05
tags: ['test']
---

Après avoir testé le {% test mixer-houmous mixage d'un houmous %}, j'ai voulu mesurer la consommation du même mixeur pour mixer une soupe aux légumes bien épaisse. Combien consomme le mixage d'une soupe ?

<!-- excerpt -->

{% tldr %}
- En mixant une soupe par semaine pendant un an, la consommation annuelle sera de {{ 5.03 | times: 52 | Wh€ }}.
- Il faut mixer {{ 5.03 | divided_by: 4 | countPer€: 0.01 }} litres de soupe pour dépenser un centime d'électricité.
- La puissance maximale mesurée est de {{ 160 | W }}, soit {{ 160 | percentLess: 348 }} de moins que lors du mixage du houmous avec le même mixeur (les légumes cuits sont plus mous que les pois chiches).
- L'enjeu énergétique de la préparation d'une soupe se situe dans la cuisson des légumes, pas dans le mixage.
{% endtldr %}

{% comment %}
Notes from draft:
mesure de la consommation du mixage d'une soupe aux légumes assez épaisse (car contenant des pois chiches).
comparer avec la préparation du houmous ; c'est le même mixeur, reprendre la photo de l'étiquette sur ce test
{% endcomment %}

## Le matériel

{% intro "mixer-une-soupe.jpg" "Mixeur plongeant Moulinex quickchef posé devant une casserole de soupe aux légumes cuite" %}

Nous utilisons ici le même mixeur que lors du {% test mixer-houmous test précédent %} : un mixeur plongeant Moulinex quickchef, 10 vitesses, 1000 W. C'est un modèle plutôt haut de gamme, qui peut aussi bien mixer des ingrédients durs comme des noix de cajou que des aliments plus mous comme des légumes cuits.

### Méthode de mesure

Le mixeur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Recette

La soupe que nous allons mixer pour ce test contient des pois chiches, du chou, du poireau, du radis blanc, du panais et du fenouil, tous cuits ensemble :

{% image "./images/mixer-une-soupe-soupe-cuite.jpg" "Casserole contenant des légumes cuits dans un bouillon" "500w" 500 %}
{% comment %}la soupe cuite, prête à mixer. On voit dedans des pois chiches, du chou, du poireau ; il y a aussi radis blanc, panais, et fenouil. Les ingrédients ont été choisis par ma fille de 2 ans et demi.{% endcomment %}

Les ingrédients ont été choisis par ma fille de 2 ans et demi, ce qui explique cette composition un peu atypique ! Les pois chiches rendent la soupe particulièrement épaisse une fois mixée, ce qui est intéressant pour observer comment le mixeur se comporte avec une préparation qui offre une certaine résistance.

La cocotte utilisée a une contenance de 4,5 L, et contient donc ici environ 4 L de soupe.

## Consommation

Le mixeur plongeant que nous utilisons ici est le même que lors du {% test mixer-houmous test du houmous %} :  
{% image "./images/mixer-une-soupe-mixer.jpg" "Mixeur plongeant Moulinex quickchef 1000W" "250w" 250 %}
{% comment %}photo du mixeur utilisé, un modèle moulinex quickchef 1000W{% endcomment %}

Voici les indications techniques inscrites dessus :  
{% image "./images/mixer-etiquette.jpg" "Étiquette du mixeur Moulinex quickchef indiquant 1000W" "512w" 512 %}

L'étiquette indique « 220-240V ~50-60Hz 1000W », soit une puissance nominale de {{ 1000 | W }}.

### Le mixage complet

L'enregistrement complet du mixage dure {{ 214023 | divided_by: 1000 | s }} et consomme {{ 5.03 | Wh€ }} :

{% profile "mixer-une-soupe.json.gz" '{"name": "mixage d\'une soupe aux légumes puis mixeur au repos", "range": "585916m214023"}' %}
{% comment %}draft: enregistrement complet : on voit bien que j'ai appuyé plusieurs fois sur le bouton du mixeur, et qu'il y a eu quelques pauses d'une ou deux secondes, ensuite le mixeur est resté branché quelques secondes sans être utilisé{% endcomment %}

On observe plusieurs phases de mixage séparées par de courtes pauses d'une ou deux secondes. Comme pour le {% test mixer-houmous houmous %}, je procède par à-coups en déplaçant le mixeur dans différentes zones de la casserole pour bien mixer l'ensemble.

Après le mixage proprement dit, le mixeur reste branché quelques dizaines de secondes sans être utilisé, ce qui permet d'observer sa consommation en veille.

### En détail

Le mixage actif, sans les pauses finales, dure {{ 167450 | divided_by: 1000 | s }} et consomme {{ 5.03 | Wh }} :

{% profile "mixer-une-soupe.json.gz" '{"name": "mixage d\'une soupe aux légumes", "range": "585916m167450"}' %}
{% comment %}draft: zoom sur uniquement le mixage, permettant de voir la consommation moyenne et la durée de l'opération{% endcomment %}

La puissance médiane est de {{ 114 | W }}, et la puissance moyenne de {{ 108 | W }}. Les pics montent jusqu'à {{ 160 | W }}, ce qui reste bien inférieur à la puissance nominale de 1000 W du mixeur. Cela s'explique par la texture relativement molle des légumes cuits, qui n'opposent pas une grande résistance aux lames.

#### Début du mixage

Au début du mixage, lorsque les légumes sont encore en gros morceaux, la consommation est plus élevée :

{% profile "mixer-une-soupe.json.gz" '{"name": "Début du mixage", "range": "585916m41408"}' %}
{% comment %}draft: sur le début du mixage, lorsqu'il y a encore beaucoup de morceaux de légumes, la consommation est plus élevée que...{% endcomment %}

Sur ces premières {{ 41408 | divided_by: 1000 | s }} de mixage, la puissance moyenne est de {{ 125 | W }}, avec une médiane à {{ 136 | W }} et un maximum de {{ 160 | W }}. C'est au tout début de cette phase qu'on observe la consommation maximale, puis la puissance décroit progressivement à mesure que les pois chiches et les légumes sont broyés et que la résistance diminue.

#### Fin du mixage

En fin de mixage, lorsque le mélange est devenu homogène, la consommation redescend :

{% profile "mixer-une-soupe.json.gz" '{"name": "Fin du mixage", "range": "698211m55155"}' %}
{% comment %}draft: sur la fin du mixage où le mélange est homogène, et la consommation est redescendue.{% endcomment %}

Sur cette phase de {{ 55155 | divided_by: 1000 | s }}, la puissance est stable : la moyenne est de {{ 103 | W }}, la médiane de {{ 107 | W }}, et le maximum de {{ 117 | W }}. Ces valeurs proches indiquent une consommation constante. Comparé au début du mixage, c'est {{ 125 | percentLess: 103 }}. La soupe est maintenant lisse et n'oppose plus beaucoup de résistance aux lames du mixeur.

{% image "./images/mixer-une-soupe-resultat.jpg" "Casserole avec la soupe mixée, lisse et homogène" "500w" 500 %}
{% comment %}la soupe une fois mixée, assez épaisse{% endcomment %}

Cette évolution de la consommation au cours du mixage est similaire à ce que nous avions observé lors du {% test mixer-houmous mixage du houmous %} : à mesure que la préparation devient plus homogène, la résistance diminue et la consommation aussi. C'est d'ailleurs une bonne indication que le mixage est terminé !

Pour comparer les deux préparations avec le même mixeur :
- **Houmous :** puissance maximale de {{ 348 | W }}, moyenne de 161 W sur l'ensemble du mixage
- **Soupe aux légumes :** puissance maximale de {{ 160 | W }}, moyenne de {{ 108 | W }}

La soupe consomme donc {{ 160 | percentLess: 348 }} de moins en puissance maximale que le houmous. Cela s'explique par la texture : les légumes cuits dans un bouillon sont beaucoup plus mous que les pois chiches cuits et le tahin du houmous, et opposent donc moins de résistance aux lames du mixeur.

### En veille

Lorsque le mixeur reste branché sans être utilisé, une petite lumière bleue reste allumée sur le dessus :

{% profile "mixer-une-soupe.json.gz" '{"name": "Mixeur branché mais inutilisé", "range": "753366m46573"}' %}
{% comment %}draft: consommation en veille si on oublie de débrancher. une lumière bleue reste allumée sur le dessus du mixeur{% endcomment %}

La consommation moyenne est de {{ 0.185 | W }}, ce qui est du même ordre de grandeur que les {{ 0.189 | W }} mesurés lors du test du houmous. Sur cette mesure courte, on observe une alternance entre 0 et une valeur inférieure à 1 W, ce qui correspond aux limites de précision de la prise connectée pour ces très faibles puissances.

Si le mixeur reste branché en permanence, il consommera {{ 0.185 | W€PerYear }} par an. C'est peu, mais pour un appareil qui n'est utilisé que quelques minutes par-ci par-là, cela représente une consommation inutile qu'on peut facilement éviter en débranchant le mixeur après utilisation.

### Coût d'usage

Le coût électrique du mixage de 4 L de soupe est de {{ 5.03 | Wh€ }}. Il faudrait mixer {{ 5.03 | countPer€: 0.01 }} soupes, soit {{ 5.03 | divided_by: 4 | countPer€: 0.01 }} litres de soupe, pour dépenser un centime d'électricité.

Si l'on suppose qu'on mixe une soupe par semaine, la consommation annuelle sera de {{ 5.03 | times: 52 | Wh€ }}. Même utilisé quotidiennement, soit {{ 5.03 | Wh€PerYear }} par an, il faudrait {{ 5.03 | times: 365 | countPer€: 50 }} ans pour que le coût électrique du mixage égale le prix d'achat du mixeur (environ 50 € neuf). Le mixeur sera probablement tombé en panne bien avant.

À titre de comparaison, la cuisson préalable des légumes consomme bien plus d'énergie que le mixage. Que ce soit sur une plaque de cuisson électrique, une gazinière ou au four, l'énergie nécessaire pour cuire les légumes se compte en centaines de Wh, voire en kWh, alors que le mixage ne représente que quelques Wh. L'enjeu énergétique et économique de la préparation d'une soupe se situe donc essentiellement dans la cuisson, pas dans le mixage.

### Conseils pour l'autoconsommation photovoltaïque

La puissance maximale de {{ 160 | W }} du mixeur en fonctionnement est très compatible avec une installation photovoltaïque domestique. Une installation en toiture de 3 kWc produira largement de quoi alimenter le mixeur, même par temps nuageux. Cette consommation pourrait même être supportée par un simple kit solaire plug and play installé sur un mur ou un balcon.

Cela dit, mixer une soupe se fait généralement le soir après la cuisson, moment où la production solaire est faible ou nulle en hiver. L'enjeu économique est de toute façon dérisoire avec une consommation de {{ 5.03 | Wh€ }} par utilisation.

En revanche, la cuisson préalable des légumes consomme bien plus d'énergie que le mixage et ne peut pas être alimentée par un simple kit solaire plug and play. Pour maximiser l'autoconsommation, c'est donc plutôt sur la cuisson qu'il faut se concentrer : privilégier la cuisson en journée ensoleillée si possible avec une installation en toiture, ou explorer des alternatives comme la cuisson solaire (four solaire, cuiseur parabolique) qui utilisent directement l'énergie du soleil sans passer par l'électricité.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du mixage, on pourrait :
- mesurer la consommation de la cuisson des légumes, qui représente probablement l'essentiel de l'énergie nécessaire pour préparer une soupe ;
- tester le mixage de soupes avec différentes textures (bouillon clair, velouté, soupe très épaisse) pour observer l'impact de la consistance sur la consommation ;
- comparer avec un mixeur sur socle pour voir si le principe de fonctionnement (plongeur vs bol) influence la consommation ;
- mesurer la consommation selon les différentes vitesses du mixeur pour vérifier si cela a un impact significatif ;
- évaluer l'impact du temps de mixage sur la texture finale et la consommation (mixage rapide vs mixage long pour une texture très lisse).
{% endplusloin %}
