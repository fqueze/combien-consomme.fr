---
layout: test-layout.njk
title: un sèche-cheveux Braun Silencio 1000
img: seche-cheveux-braun-silencio-1000.jpg
date: 2026-02-18
tags: ['test']
---

Ce sèche-cheveux de {{ 1000 | W }} est un modèle typique des années 80, toujours fonctionnel. Quel est l'impact d'un séchage sur la facture d'électricité ? Vaut-il mieux sécher en vitesse lente ou rapide ?

<!-- excerpt -->

{% tldr %}
- À raison de deux séchages par semaine, la consommation annuelle sera de {{ 14.3 | times: 2 | times: 52 | Wh€ }} (cheveux courts, vitesse 1) à {{ 120 | times: 2 | times: 52 | Wh€ }} (cheveux longs, vitesse 2).
- Un séchage consomme de {{ 14.3 | Wh€ }} (cheveux courts) à {{ 120 | Wh€ }} (cheveux longs).
- Utiliser la vitesse 2 consomme {{ 68.3 | percentMore: 37.7 }} de plus que la vitesse 1 pour un séchage à peine plus court.
- La puissance de {{ 1200 | W }} mesurée en vitesse 2 dépasse de {{ 1200 | percentMore: 1000 }} la puissance nominale de {{ 1000 | W }}.
{% endtldr %}

## Le matériel

{% intro "seche-cheveux-braun-silencio-1000-sur-shelly-plug.jpg" "Sèche-cheveux Braun Silencio 1000 (Type 4588)" %}

Le Braun Silencio 1000 est un sèche-cheveux des années 80, présenté sur son carton d'emballage comme un « *sèche-cheveux silencieux* » avec « *2 allures de chauffe et de ventilation* » et un « *débit d'air élevé pour séchage ultra rapide* ». Un concentrateur d'air est fourni.

L'appareil est fabriqué en Irlande (« *Made in Eire* ») et affiche une puissance nominale de {{ 1000 | W }}.

### Méthode de mesure

Le sèche-cheveux est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

### Fonctionnement

L'interrupteur à glissière sur la poignée propose trois positions : 0, 1 et 2 :

{% image "./images/seche-cheveux-braun-silencio-1000-bouton.jpg" "Interrupteur à trois positions : 0, 1, 2" "300w" 300 %}
{% comment %}interrupteur à trois positions : 0 1 2. Il est très probable que la position 2 soit juste un interrupteur fermé, et que la position 1 utilise une diode pour bloquer la moitié des oscillations du courant alternatif du secteur{% endcomment %}

En ouvrant l'appareil, on comprend comment fonctionnent ces deux vitesses. Cette photo de l'intérieur (© Raimond Spekking / CC BY-SA 4.0 via Wikimedia Commons) montre clairement la résistance chauffante, le ventilateur, et une [diode](https://fr.wikipedia.org/wiki/Diode "Page « Diode » sur Wikipédia") reliant deux broches de l'interrupteur :

{% image "./images/seche-cheveux-braun-silencio-1000-interieur.jpg" "Intérieur du Braun Silencio 1000 : résistance chauffante, ventilateur et diode visibles. © Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons)" "700w" 700 %}
{% comment %}Credit the image with "© Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons)"

Cette image montre l'intérieur du sèche cheveux. On voit nettement :
- la résistance
- le ventilateur derrière la résistance
- une diode reliant 2 broches de l'interrupteur{% endcomment %}

En position 2, l'interrupteur laisse passer le courant alternatif directement : la résistance et le ventilateur fonctionnent à pleine puissance. En position 1, le courant passe par la diode, qui ne laisse passer qu'une alternance sur deux. Résultat : la puissance est environ divisée par deux, et l'air est moins chaud et soufflé moins fort. C'est un mécanisme simple et ingénieux, sans aucune complexité.

## Consommation

### Inscriptions techniques

Les inscriptions techniques sont gravées dans le plastique du manche, ce qui les rend difficiles à photographier. La photo ci-dessous, mise en ligne par Raimond Spekking sur Wikimedia Commons, est plus lisible que la mienne :

{% image "./images/seche-cheveux-braun-silencio-1000-etiquette.jpg" "Inscriptions techniques du Braun Silencio 1000 : Type 4588, Made in Eire, 230V ~ / 1000 W. © Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons)" "300w" 300 %}
{% comment %}BRAUN
Type: 4588
Made in Eire
230V ~ / 1000 W

Credit the image with "© Raimond Spekking / CC BY-SA 4.0 (via Wikimedia Commons)"

Note: ces inscriptions sur le manche incurvé et dans un plastique brillants sont difficiles à photographier lisiblement. La photo mise en ligne par Raimond Spekking sur Wikimedia Commons est plus lisible que la mienne.{% endcomment %}

On peut y lire « *230V ~ / 1000 W* », une puissance nominale à laquelle on s'attendait vu le « *1000* » dans le nom du modèle.

### Impact de la vitesse

Pour mesurer l'impact de la vitesse, nous avons séché les mêmes cheveux — cheveux de longueur moyenne, environ 10 cm, frisés — d'abord en vitesse 1 puis quelques jours plus tard en vitesse 2.

#### Vitesse 1

Ce premier test correspond à un usage personnel plutôt rare (souvent je m'arrange pour laisser sécher naturellement). Le séchage de cheveux moyens en vitesse 1 dure un peu moins de 4 minutes :

{% profile "seche-cheveux-braun-silencio-1000.json.gz" '{"name": "Cheveux moyens — vitesse 1", "range": "68437m230198"}' %}
{% comment %}draft: Premier test, correspondant à mon usage réel lorsque je dois me sécher les cheveux (ce qui est plutôt rare, souvent je m'arrange pour pouvoir les laisser sécher naturellement). J'avais des cheveux d'une longueur moyenne, environ 10cm de long, frisés assez serrés{% endcomment %}

La consommation totale est de {{ 37.7 | Wh€ }}. La puissance est très stable autour de {{ 596 | W }} (médiane), soit nettement moins que la puissance nominale de {{ 1000 | W }}.

#### Vitesse 2

Quelques jours plus tard, mêmes cheveux, mais cette fois en vitesse 2. Le séchage dure environ 3 minutes et demie :

{% profile "seche-cheveux-braun-silencio-1000-vitesse2.json.gz" '{"name": "Cheveux moyens — vitesse 2", "range": "361256m206193"}' %}
{% comment %}draft: Quelques jours plus tard, mêmes cheveux moyens, mais cette fois ci séchage en vitesse 2. C'était tellement chaud que j'ai dû augmenter la distance entre le sèche cheveux et ma tête, occasionnant probablement plus de pertes de chaleur. Le séchage a été un peu plus court, mais la conso totale bien supérieure.{% endcomment %}

La consommation totale est de {{ 68.3 | Wh€ }}. La puissance médiane est de {{ 1200 | W }}, soit {{ 1200 | percentMore: 1000 }} de plus que la puissance nominale de {{ 1000 | W }}. C'est cohérent avec la tension du secteur, mesurée entre 235 V et 239 V au moment des tests, supérieure aux 230 V nominaux.

En comparant avec la vitesse 1 ({{ 596 | W }}), on retrouve bien un rapport de 1 à 2, ce qui confirme le fonctionnement de la diode décrit plus haut.

#### Comparaison

Le séchage a été un peu plus court en vitesse 2 (environ 3 minutes et demie contre un peu moins de 4 minutes), mais la consommation est {{ 68.3 | percentMore: 37.7 }} plus élevée. C'était d'ailleurs tellement chaud en vitesse 2 que j'ai dû augmenter la distance entre le sèche-cheveux et ma tête, occasionnant probablement plus de pertes de chaleur dans la pièce.

La vitesse 1 est donc nettement plus économique pour un résultat équivalent. On peut noter que pour des cheveux longs, la vitesse 2 serait peut-être moins gênante : c'est surtout la tête qui est sensible à la chaleur, alors que le dos l'est beaucoup moins.

### Impact de la longueur des cheveux

#### Cheveux courts — vitesse 1

Après un passage chez le coiffeur, les cheveux font environ 2 cm de long : suffisamment courts pour ne plus vraiment friser, et donc à la fois moins d'eau à faire évaporer et un passage de l'air bien plus facile entre les cheveux. Le séchage en vitesse 1 dure moins d'une minute et demie :

{% profile "seche-cheveux-braun-silencio-1000-court.json.gz" '{"name": "Cheveux courts — vitesse 1", "range": "328664m86380"}' %}
{% comment %}draft: Séchage après le premier shampoing suivant mon passage chez le coiffeur. Cheveux d'environ 2cm de long, suffisamment courts pour ne plus vraiment friser, et donc à la fois moins d'eau à faire évaporer, et passage de l'air bien plus facile entre les cheveux.{% endcomment %}

La consommation n'est plus que de {{ 14.3 | Wh€ }}. La puissance médiane est de {{ 621 | W }}, cohérente avec les autres mesures en vitesse 1.

#### Cheveux longs — vitesse 2

À l'autre extrémité, nous avons séché des cheveux longs arrivant jusqu'au bas du dos. Ils avaient été préalablement frottés trois fois avec une serviette pour enlever le plus gros de l'eau :

{% image "./images/seche-cheveux-braun-silencio-1000-cheveux-longs.jpg" "Les cheveux longs avant le séchage" "300w" 300 %}
{% comment %}Photo des cheveux longs lors de notre dernier test et du niveau de séchage atteint.{% endcomment %}

Le séchage en vitesse 2 dure cette fois environ 6 minutes :

{% profile "seche-cheveux-braun-silencio-1000-long.json.gz" '{"name": "Cheveux longs — vitesse 2", "range": "437859m367586"}' %}
{% comment %}draft: Séchage de cheveux longs d'une femme. Les cheveux arrivent jusqu'au bas du dos. Ils ont préalablement été frottés 3 fois avec une serviette pour enlever le plus gros de l'eau. Le séchage a été arrêté lorsque les cheveux étaient presque secs, mais pas complètement.{% endcomment %}

La consommation totale est de {{ 120 | Wh€ }}, soit {{ 120 | divided_by: 14.3 | round }} fois plus que le séchage de cheveux courts. La puissance est très stable autour de {{ 1190 | W }} (médiane). Le séchage a été arrêté lorsque les cheveux étaient presque secs, mais pas complètement : un séchage intégral aurait consommé un peu plus.

### Comparaison avec l'hydropulseur dentaire

Le sèche-cheveux et l'{% test hydropulseur-dentaire hydropulseur dentaire %} sont les deux appareils électriques utilisés dans la salle de bain au même endroit. Ce profil montre les deux appareils sur la même échelle de temps, ce qui permet de se rendre compte de l'ordre de grandeur de la différence de puissance :

{% profile "seche-cheveux-braun-silencio-1000-seche-cheveux-hydropulseur.json.gz" '{"name": "Comparaison entre sèche cheveux et hydropulseur dentaire", "range": "359577m824263"}' %}
{% comment %}draft: le sèche cheveux et l'hydropulseur (déjà testé) sont les deux appareils utilisés dans la salle de bain au même endroit. voir les deux sur le même profil permet de mieux se rendre compte de l'ordre de grandeur de la différence de puissance et de consommation.{% endcomment %}

L'hydropulseur consomme {{ 0.149 | Wh€ }} par utilisation de 40 secondes. Un seul séchage de cheveux moyens en vitesse 1 ({{ 37.7 | Wh }}) équivaut à environ {{ 37.7 | divided_by: 0.149 | round }} utilisations de l'hydropulseur.

### Consommation au repos

L'interrupteur mécanique à glissière coupe physiquement le circuit en position 0. Le sèche-cheveux ne contient aucune électronique : la consommation est strictement nulle lorsqu'il est éteint. Inutile de le débrancher pour économiser de l'énergie. Cela dit, dans une pièce humide comme la salle de bain, il peut être plus prudent de ne pas le laisser branché s'il risque de recevoir des projections d'eau ou de tomber dans un lavabo.

### Coût d'usage

Le coût d'un séchage dépend principalement de la longueur des cheveux et de la vitesse choisie :

- Cheveux courts, vitesse 1 : {{ 14.3 | Wh€ }}
- Cheveux moyens, vitesse 1 : {{ 37.7 | Wh€ }}
- Cheveux moyens, vitesse 2 : {{ 68.3 | Wh€ }}
- Cheveux longs, vitesse 2 : {{ 120 | Wh€ }}

Il faudrait {{ 14.3 | countPer€: 1 }} séchages de cheveux courts pour dépenser un euro d'électricité, ou {{ 120 | countPer€: 1 }} séchages de cheveux longs.

En supposant deux séchages par semaine pendant un an, la consommation annuelle sera de {{ 14.3 | times: 2 | times: 52 | Wh€ }} pour des cheveux courts en vitesse 1, et de {{ 120 | times: 2 | times: 52 | Wh€ }} pour des cheveux longs en vitesse 2.

### Conseils pour l'autoconsommation photovoltaïque

La puissance du sèche-cheveux reste compatible avec une installation photovoltaïque domestique standard. Une installation en toiture de 3 kWc produira largement assez en milieu de journée ensoleillée pour alimenter ce sèche-cheveux à pleine puissance. Le matin ou en fin de journée par contre, il sera plus facile de couvrir la consommation du sèche-cheveux avec les panneaux solaires si l'on se limite à la vitesse 1 ({{ 596 | W }}).

La durée très courte d'un séchage (quelques minutes) facilite son placement pendant les heures de production solaire. Pour maximiser l'autoconsommation :
- se sécher les cheveux en journée plutôt que le soir ou tôt le matin ;
- éviter de lancer le sèche-cheveux en même temps qu'un gros consommateur comme {% test machine-a-laver un lave-linge %}, {% test seche-linge-a-pompe-a-chaleur un sèche-linge %} ou {% test four-a-micro-ondes un four à micro-ondes %}, pour ne pas dépasser la capacité de production solaire.

Cela dit, avec un coût annuel de {{ 14.3 | times: 2 | times: 52 | Wh€ }} à {{ 120 | times: 2 | times: 52 | Wh€ }}, l'enjeu économique reste très faible. L'intérêt est surtout environnemental : utiliser directement l'énergie solaire.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce sèche-cheveux, on pourrait :
- mesurer la consommation du séchage des cheveux longs en vitesse 1, pour isoler l'impact de la vitesse indépendamment de la longueur ;
- tester l'impact du concentrateur d'air (fourni avec l'appareil) sur la durée et la consommation du séchage ;
- évaluer l'influence du nombre de passages à la serviette avant le séchage sur la consommation totale ;
- comparer avec un sèche-cheveux moderne pour vérifier si les modèles récents sont plus efficaces.
{% endplusloin %}
