---
layout: test-layout.njk
title: une douchette lecteur de codes-barres
img: douchette-lecteur-codes-barres.jpg
date: 2026-04-05
tags: ['test']
---

Ce lecteur de codes-barres USB trouvé dans un vide-grenier sert à cataloguer les livres pour enfants à la maison. Quel est l'impact sur la consommation de l'ordinateur auquel il est branché ?

<!-- excerpt -->

{% comment %}Variables calculées utilisées dans le tldr et dans le reste du test{% endcomment %}
{% assign repos_actif_jour = 0.74 | times: 12 %}
{% assign jours_ouverture_an = 312 %}
{% assign heures_ouverture_par_jour = 12 %}
{% assign heures_ouverture_an = heures_ouverture_par_jour | times: jours_ouverture_an %}
{% assign heures_fermeture_an = 365 | times: 24 | minus: heures_ouverture_an %}
{% assign veille_fermeture = 0.38 | times: heures_fermeture_an %}
{% assign scans_par_jour = heures_ouverture_par_jour | times: 3600 | divided_by: 2 %}
{% assign conso_repos_2s = 0.74 | times: 2 | divided_by: 3600 %}
{% assign repos_actif_1d = 0.741 | times: 2.8 | divided_by: 3600 %}
{% assign conso_scan_1d = 0.000713 | minus: repos_actif_1d | divided_by: 5 %}
{% assign conso_scan_avec_repos = conso_scan_1d | plus: conso_repos_2s %}
{% assign surconso_reveil_30s = 0.74 | minus: 0.38 | times: 30 | divided_by: 3600 %}
{% assign conso_scan_avec_reveil = surconso_reveil_30s | plus: conso_scan_1d %}
{% assign conso_scans_jour = conso_scan_1d | times: scans_par_jour %}
{% assign conso_jour_ouverture = repos_actif_jour | plus: conso_scans_jour %}
{% assign conso_ouverture_an = conso_jour_ouverture | times: jours_ouverture_an %}
{% tldr %}
- Dans un magasin très actif (un code-barres scanné toutes les 2 secondes, 12 h/jour, 312 jours/an, matériel laissé en veille hors des heures d'ouverture), la consommation annuelle est d'environ {{ conso_ouverture_an | plus: veille_fermeture | Wh€ }}.
- La consommation de la lecture des codes-barres eux-mêmes est négligeable : {{ conso_scan_1d | times: scans_par_jour | percent: repos_actif_jour }} de la consommation d'attente pendant les périodes d'ouverture.
- Le lecteur consomme {{ 1.6 | W }} au maximum pendant un scan, {{ 0.74 | W }} en attente, et {{ 0.38 | W }} en veille.
- Il faudrait scanner {{ conso_scan_avec_repos | countPer€: 0.01 }} codes-barres en utilisation continue pour dépenser un centime, contre {{ conso_scan_avec_reveil | countPer€: 0.01 }} si chaque scan entraîne une sortie de veille pour 30 secondes.
{% endtldr %}

## Le matériel

{% intro "douchette-lecteur-codes-barres.jpg" "Douchette lecteur de codes-barres Eyoyo EY-001" %}

L'Eyoyo EY-001 est un lecteur de codes-barres portable USB capable de lire les codes-barres classiques (1D) et les [QR codes](https://fr.wikipedia.org/wiki/Code_QR "Page « Code QR » sur Wikipédia") (2D). J'ai trouvé ce lecteur pour quelques euros dans un vide-grenier.

Il se connecte en USB à un ordinateur et se comporte comme un clavier : lorsqu'un code-barres est scanné, le texte correspondant est "tapé" automatiquement. Un bouton-gâchette sous le lecteur déclenche le scan, qui active un laser rouge et un éclairage LED pour faciliter la lecture.

Notre petite adore scanner ses livres, entendre le bip, et voir apparaître l'image de la couverture sur l'écran. J'ai codé une petite application web qui liste tous ses livres à partir des codes-barres scannés, ce qui permet de vérifier rapidement lors d'un vide-grenier si un livre créerait un doublon — très pratique pour la collection des [Monsieur Madame](https://fr.wikipedia.org/wiki/Monsieur_Madame "Page « Monsieur Madame » sur Wikipédia") !
{% endintro %}

Vue de côté, on distingue la gâchette et le câble USB :  
{% image "./images/douchette-lecteur-codes-barres-vue-cote.jpg" "La douchette Eyoyo EY-001 vue de côté, avec sa gâchette et son câble USB enroulé." "500w" 500 %}

Vue du dessus, on aperçoit la marque Eyoyo (marque chinoise) et la petite LED bleue à l'arrière qui indique que l'appareil est sous tension :  
{% image "./images/douchette-lecteur-codes-barres-vue-dessus.jpg" "La douchette vue du dessus, avec la marque Eyoyo et la LED bleue d'indication de fonctionnement." "500w" 500 %}

## Consommation

### Méthode de mesure

Le lecteur de codes-barres est branché sur {% post mesurer-la-consommation-avec-un-wattmetre-usb un wattmètre USB AVHzY C3 %} intercalé entre le câble USB du lecteur et le port USB de l'ordinateur, ce qui permet de mesurer précisément la consommation du lecteur seul :  
{% image "./images/douchette-lecteur-codes-barres-wattmetre-usb.jpg" "Le lecteur de codes-barres branché sur le wattmètre USB AVHzY C3 utilisé pour ce test." "700w" 700 %}
{% comment %}le lecteur de code barre et le wattmètre usb AVHzY C3 sur lequel il a été connecté pour ce test.{% endcomment %}

La puissance instantanée est collectée et enregistrée à une fréquence d'échantillonnage de 1 kHz.

### Étiquette

L'étiquette du lecteur indique « *2D SCANNER EY-001* » et « *MAX 1.0MW OUTPUT* » :  
{% image "./images/douchette-lecteur-codes-barres-etiquette.jpg" "Étiquette du lecteur indiquant 2D SCANNER EY-001, MAX 1.0MW OUTPUT, FCC Class A." "700w" 700 %}
{% comment %}2D SCANNER EY—OO1
MAX 1.0MW OUTPUT{% endcomment %}

La mention « *MAX 1.0MW OUTPUT* » fait référence à la puissance maximale du laser (1 milliwatt), et non à la consommation électrique de l'appareil. C'est une indication de sécurité laser.

On n'a donc aucune indication sur la consommation électrique : le manuel ne précise rien non plus, juste que le lecteur est alimenté par USB et ne contient pas de batterie.

### Initialisation et mise en veille

Commençons par observer ce qui se passe lorsqu'on branche le lecteur. L'enregistrement ci-dessous couvre les 2 premières minutes, de l'initialisation à la mise en veille automatique, puis un réveil suivi d'une nouvelle mise en veille :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "Initialisation et veille automatique", "range": "2537m119935"}' %}
{% comment %}draft: Début du test, où on voit l'initialisation, puis j'ai rien fait, et au bout d'une minute on voit une baisse de conso (= mise en veille). Ensuite j'ai appuyé brièvement sur le bouton pour réveiller le lecteur, mais n'ai scanné aucun code barre. Cette fois c'est au bout de 30s qu'il passe en veille, je ne sais pas pourquoi la durée de veille est plus longue après l'initialisation.{% endcomment %}

On observe trois phases distinctes :
1. L'initialisation, qui se termine par des bips signalant que le lecteur est prêt ;
2. Une période d'attente active, suivie d'une mise en veille automatique ;
3. Après un appui bref sur le bouton pour réveiller le lecteur, une nouvelle période d'attente active suivie d'une mise en veille au bout d'une durée nettement plus courte.

Zoomons sur chaque phase pour mieux comprendre.

#### Initialisation

L'initialisation dure environ 5 secondes :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "Initialisation", "range": "2537m5457"}' %}
{% comment %}draft: L'initialisation se finit par 3 bips, probablement pour signaler que le lecteur est prêt.{% endcomment %}

On observe plusieurs variations de puissance, qui correspondent probablement à différentes phases de l'initialisation du lecteur. Les 3 plateaux à la fin (visibles comme des rectangles sur le graphique) correspondent aux 3 bips de confirmation signalant que le lecteur est prêt.

#### Repos actif

Zoomons sur la période d'attente qui suit l'initialisation :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "Veille 1 minute après initialisation", "range": "7994m60027"}' %}

La puissance médiane est de {{ 0.743 | W }}. C'est la consommation en "repos actif", le lecteur est prêt à scanner. Il a fallu exactement une minute avant que le lecteur passe en veille automatiquement.

#### Réveil et veille automatique

Après un appui sur le bouton pour sortir de veille, le lecteur repasse en veille au bout de 30 secondes seulement :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "Réveil et veille automatique", "range": "82189m30358"}' %}
{% comment %}draft: J'ai ensuite appuyé brièvement sur le bouton sans viser un code barres pour sortir de veille. On constate que l'appareil repasse en veille au bout de 30s cette fois.{% endcomment %}

On voit le pic de réveil à {{ 1.6 | W }}, puis un plateau à environ {{ 0.739 | W }} pendant 30 secondes avant la chute vers la veille. On ne sait pas pourquoi la mise en veille est plus rapide après un réveil (30 secondes) qu'après l'initialisation (1 minute).

### En veille

Combien consomme le lecteur en veille ? Un enregistrement de 5 minutes montre une consommation très stable :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "5 minutes en veille", "range": "338710m300438"}' %}
{% comment %}draft: on a vu qu'après 30s le lecteur passe en veille, combien consomme-t-il en veille ?{% endcomment %}

La puissance médiane en veille est de {{ 0.38 | W }}. C'est la consommation du lecteur branché mais inactif.

### Utilisation

#### Codes-barres 1D

Pour mesurer la consommation d'un scan, j'ai scanné 5 fois de suite le même code-barres [ISBN](https://fr.wikipedia.org/wiki/International_Standard_Book_Number "Page « International Standard Book Number » sur Wikipédia") sur un livre pour enfants :  
{% image "./images/douchette-lecteur-codes-barres-scan-1d.jpg" "Le lecteur en train de scanner un code-barres ISBN sur un livre pour enfants." "500w" 500 %}
{% comment %}livre pour enfants dont le code barres ISBN est en train d'être scanné{% endcomment %}

Les 5 scans ne prennent que 3 secondes au total :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "5 code-barres 1D", "range": "124225m2768"}' %}

Au tout début du profil, le premier scan commence par une sortie de veille qui prend environ 60 ms. Sur les 4 scans suivants, on observe aussi une légère montée de puissance à environ {{ 0.89 | W }} pendant une durée similaire. La sortie de veille ne semble donc pas plus lente que le démarrage d'un scan en repos actif, ce qui rend l'utilité de la mise en veille un peu douteuse.

Ensuite vient la période de consommation maximale, lorsque le laser et la LED d'éclairage sont allumés simultanément :  
{% image "./images/douchette-lecteur-codes-barres-led.jpg" "Vue rapprochée de la tête du scanner avec la LED d'éclairage et le laser allumés." "500w" 500 %}
{% comment %}led d'éclairage et laser allumés{% endcomment %}

Pour ces scans rapides, cette phase dure 60 à 100 ms avec une puissance d'environ {{ 1.6 | W }}. On distingue ensuite deux paliers successifs : le premier correspond probablement au bip de confirmation, environ 40 ms à {{ 1.09 | W }}, puis un second palier à environ {{ 0.94 | W }}, qui correspond vraisemblablement au temps écoulé avant que je relâche le bouton.

L'énergie totale pour ces 5 scans est de {{ 0.000713 | Wh }}. En soustrayant la consommation de repos actif ({{ 0.741 | W }} pendant 2,8 secondes, soit {{ repos_actif_1d | Wh }}), la surconsommation due aux scans eux-mêmes n'est que de {{ 0.000713 | minus: repos_actif_1d | Wh }} pour 5 scans, soit environ {{ 0.000713 | minus: repos_actif_1d | divided_by: 5 | Wh }} par scan.

#### Codes-barres 2D (QR codes)

Ce lecteur peut également scanner les QR codes, ce qui permet par exemple d'écouter une histoire audio dans les revues pour enfants :  
{% image "./images/douchette-lecteur-codes-barres-scan-2d.jpg" "Le lecteur en train de scanner un QR code sur une revue pour enfants pour écouter une belle histoire." "500w" 500 %}
{% comment %}QR code en train d'être scanné pour écouter une belle histoire !{% endcomment %}

Pour comparer avec les codes-barres 1D, j'ai voulu reproduire la même chose : 5 scans rapides à la chaîne :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "5 code-barres 2D", "range": "185005m4471"}' %}

La forme générale de chaque scan est la même que pour les codes-barres 1D : montée de puissance, pic avec laser et LED, puis paliers de descente. En analysant le profil de plus près, on observe que la période pendant laquelle la consommation est plus élevée est d'environ 420 ms par scan contre 260 ms par scan en 1D. La phase avec la lumière allumée dure environ 170 ms en QR code contre 60 à 100 ms en 1D.

{% assign repos_actif_2d = 0.743 | times: 4.5 | divided_by: 3600 %}
{% assign surconso_par_scan_2d = 0.00118 | minus: repos_actif_2d | divided_by: 5 %}
L'énergie totale est de {{ 0.00118 | Wh }} pour 5 scans. En soustrayant le repos actif ({{ 0.743 | W }} pendant 4,5 secondes, soit {{ repos_actif_2d | Wh }}), la surconsommation des scans seuls est d'environ {{ 0.00118 | minus: repos_actif_2d | Wh }} pour 5 scans, soit {{ surconso_par_scan_2d | Wh }} par scan — {{ surconso_par_scan_2d | percentMore: conso_scan_1d }} de plus qu'un scan 1D. Ces valeurs sont toutefois tellement petites qu'on ne peut pas exclure que la différence soit liée à l'incertitude expérimentale.

#### Quand le scan prend plus de temps

En pratique, il m'a fallu de nombreux essais avant d'arriver à obtenir ces 5 scans de QR code rapides. L'enregistrement complet de la série de tests montre bien la différence entre les scans 1D rapides au début et les tentatives de scans 2D ensuite :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "utilisation", "range": "123779m66216"}' %}
{% comment %}draft: profil des tests de scan de codes barre. D'abord 5 fois un même code barres simple (1d). Puis ensuite j'ai essayé de scanner 5 fois un QR code, mais il m'a fallu pas mal d'essais avant d'obtenir 5 scans réussis du premier coup. On voit donc sur l'enregistrement comment la consommation diffère lorsqu'on est maladroit et que le scan prend quelques secondes au lieu d'un très bref instant.{% endcomment %}

Zoomons sur les tentatives de scans 2D, où la luminosité de la pièce (le test a été fait en soirée) compliquait peut-être la lecture :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "scans maladroits de codes-barres 2D", "range": "137066m45178"}' %}
{% comment %}draft: On voit donc sur l'enregistrement comment la consommation diffère lorsqu'on est maladroit et que le scan prend quelques secondes au lieu d'un très bref instant.{% endcomment %}

{% assign repos_actif_maladroits = 0.741 | times: 45 | divided_by: 3600 %}
{% assign surconso_par_scan_maladroit = 0.0129 | minus: repos_actif_maladroits | divided_by: 35 %}
Ce profil contient 35 tentatives de scan pour une consommation totale de {{ 0.0129 | Wh }}. En soustrayant le repos actif ({{ 0.741 | W }} pendant 45 secondes, soit {{ repos_actif_maladroits | Wh }}), la surconsommation des scans est de {{ 0.0129 | minus: repos_actif_maladroits | Wh }} pour 35 scans, soit environ {{ surconso_par_scan_maladroit | Wh }} par scan ({{ surconso_par_scan_maladroit | percentMore: surconso_par_scan_2d }} de plus que pour les scans brefs), car le laser et la LED d'éclairage restent allumés plus longtemps pendant les tentatives.

### Bouton resté enfoncé

Que se passe-t-il si on maintient le bouton enfoncé sans scanner ?
{% image "./images/douchette-lecteur-codes-barres-led-on.jpg" "Le lecteur en fonctionnement avec le laser rouge et l'éclairage LED qui projette un trapèze de lumière blanche bleutée." "500w" 500 %}{% comment %}le lecteur de codes-barres en train de scanner à un endroit où il n'y a rien, avec le laser (ligne rouge) et l'éclairage LED a été activé qui fait un trapèze de lumière blanche un peu bleutée{% endcomment %}  
On distingue la ligne rouge du laser et le trapèze de lumière blanche légèrement bleutée produit par la LED d'éclairage. Regardons leur consommation :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "bouton resté enfoncé", "range": "202640m30944"}' %}
{% comment %}draft: après les tests de scan, j'ai testé ce qui se passe si on reste appuyé sur le bouton. Le laser rouge et la led d'éclairage restent visibles. On voit un petit motif répétitif, zoomons{% endcomment %}

La consommation se maintient à environ {{ 1.56 | W }}. On remarque un léger motif répétitif. Zoomons :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "bouton resté enfoncé — zoom", "range": "211626m1967"}' %}
{% comment %}draft: Il y a une alternance entre une conso de 1,55W et une conso de 1,61W, je ne sais pas pourquoi. Peut-être que le lecteur fait des tentatives de lectures à intervalle régulier plutôt qu'en continu, et qu'il consomme plus lorsqu'il essaye de lire.{% endcomment %}

On observe une alternance entre environ {{ 1.55 | W }} et {{ 1.61 | W }}. Peut-être que le lecteur effectue des tentatives de lecture à intervalle régulier plutôt qu'en continu, et consomme légèrement plus lors de chaque tentative.

#### Après un scan réussi

Lorsqu'un code-barres est finalement scanné alors que le bouton est resté enfoncé, on entend un bip, puis la lumière et le laser s'éteignent même si on garde le doigt enfoncé :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "bouton resté enfoncé puis scan", "range": "242380m7880"}' %}
{% comment %}draft: lorsqu'un code barre est finalement scanné, on entend un bip puis la lumière et le laser s'éteignent même si on garde le doigt enfoncé. Mais la conso ne retombe pas à la conso de repo tant qu'on garde le doigt enfoncé, même après le scan, aucune idée de pourquoi.{% endcomment %}

Curieusement, bien que la lumière et le laser s'éteignent, la consommation ne retombe pas au niveau de repos tant que le doigt reste enfoncé.
Pour visualiser ce phénomène sans ambiguïté, j'ai volontairement laissé le doigt enfoncé pendant plusieurs secondes après un scan :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "appui long puis scan puis bouton laissé enfoncé", "range": "259869m13284"}' %}
{% comment %}draft: ici un enregistrement où j'ai volontairement laissé le doigt enfoncé pendant plusieurs secondes après avoir scanné un code barre.{% endcomment %}

Et la même chose avec un scan bref :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "scan puis bouton laissé enfoncé", "range": "278191m12743"}' %}
{% comment %}draft: et ici la même chose, mais avec un scan bref cette fois.{% endcomment %}

Dans les deux cas, la consommation après le scan reste autour de {{ 0.915 | W }} tant que le bouton est enfoncé, au lieu de retomber à {{ 0.74 | W }}. Aucune idée de pourquoi le lecteur continue à consommer davantage alors que la lumière et le laser sont éteints.

#### Appuis répétés vs bouton enfoncé

Plutôt que de maintenir le bouton enfoncé, on peut essayer de "cliquer" rapidement de façon répétée. L'éclairage clignote alors :

{% profile "douchette-lecteur-codes-barres.json.gz" '{"name": "appuis répétés plutôt que de laisser enfoncé", "range": "301752m6361"}' %}
{% comment %}draft: Cette fois ci j'ai essayé de "cliquer" en continu sur le bouton plutôt que de laisser enfoncé en permanence. L'éclairage clignotait. Est-ce une économie d'énergie ?{% endcomment %}

La puissance moyenne est de {{ 1.09 | W }}, contre {{ 1.57 | W }} en maintenant le bouton enfoncé. Les appuis répétés consomment effectivement {{ 1.09 | percentLess: 1.57 }} de moins, car le laser et la LED ne sont pas allumés en continu. Ce n'est toutefois pas une façon très utile d'économiser de l'énergie, et cela fatigue probablement inutilement le mécanisme du bouton.

### Impact de l'éclairage LED et du bip

En scannant des codes-barres spéciaux de configuration, on peut modifier le comportement du lecteur. J'ai testé l'impact de la désactivation de l'éclairage LED et du bip de confirmation.

L'enregistrement de l'ensemble des tests de configuration dure environ 40 secondes, avec un pic inhabituel à {{ 3.15 | W }} lors du changement de paramètres :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "configuration avec ou sans éclairage", "range": "22222m41464"}' %}
{% comment %}draft: j'ai découvert plus tard qu'il existe des codes barres spéciaux à scanner pour changer la configuration du lecteur. Voici donc un enregistrement où j'ai fait quelques essais{% endcomment %}

Détaillons chaque partie de cet enregistrement.

#### Baseline : avec éclairage

D'abord, un appui prolongé suivi d'un scan rapide en configuration par défaut (avec éclairage LED), pour servir de référence :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "appui prolongé puis scan avec éclairage", "range": "22632m4102"}' %}
{% comment %}draft: d'après avant de changer la config un premier appui long sans rien scanner, puis un scan bref. Ça nous donne une "baseline" pour comparer ce qu'on obtiendra ensuite.{% endcomment %}

Pas de surprise ici, on retrouve des profils très similaires à ceux observés précédemment, avec une puissance maximale de {{ 1.65 | W }}.

#### Changement de configuration

Le scan du code-barres de configuration « *Éteindre LED* » provoque un pic de consommation inhabituel :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "scan du code barres « Éteindre LED »", "range": "31001m2003"}' %}
{% comment %}draft: là j'ai scanné le code indiquant au lecteur de ne pas allumer la LED lorsqu'on appuie sur le bouton. Il n'allumera donc plus que le laser. La puissance maximale consommée sur cet enregistrement est bien supérieure à ce qu'on a vu jusqu'ici. Peut-être qu'il y a besoin de plus d'énergie pour mémoriser la nouvelle configuration. Ensuite quand le lecteur a fini de se réinitialiser dans sa nouvelle config, il émet quelques bips pour confirmer. On voit 2 périodes de 100ms chacune avec une conso légèrement plus élevée, c'est probablement les bips. Le changement de configuration a pris environ 2s au total.{% endcomment %}

La puissance maximale atteint {{ 3.15 | W }}, bien au-dessus de tout ce qu'on a mesuré jusqu'ici. On peut supposer que la mémorisation de la nouvelle configuration en mémoire non volatile nécessite plus d'énergie. On distingue également 2 petits plateaux de 100 ms chacun à la fin, qui correspondent probablement aux bips de confirmation. Le changement de configuration a pris environ 2 secondes au total.

#### Sans éclairage LED

Dans cette nouvelle configuration, seul le laser reste actif :  
{% image "./images/douchette-lecteur-codes-barres-led-off.jpg" "Le lecteur en fonctionnement sans éclairage LED : seul le laser rouge est visible." "500w" 500 %}
{% comment %}le lecteur de codes-barres en train de scanner à un endroit où il n'y a rien, avec uniquement le laser (l'éclairage LED a été désactivé){% endcomment %}

Le même test (appui prolongé puis scan rapide) :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "appui prolongé et scan sans éclairage", "range": "38914m8285"}' %}
{% comment %}draft: Dans cette nouvelle configuration sans éclairage, on peut voir que la consommation pour faire la même chose que sur notre baseline (d'abord un appuis long sans scanner, puis ensuite un scan rapide) consomme moins.{% endcomment %}

La puissance maximale passe de {{ 1.65 | W }} à {{ 1.22 | W }}, soit une économie d'environ {{ 1.65 | minus: 1.22 | W }} due à l'absence d'éclairage.

Le motif périodique observé lors d'un appui prolongé est encore plus visible sans la LED :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "zoom sur l\'appui prolongé", "range": "39652m2033"}' %}
{% comment %}draft: Et les variations de conso périodiques pendant l'appui long sont plus visibles{% endcomment %}

On observe une alternance entre environ {{ 1.1 | W }} et {{ 1.22 | W }}, confirmant l'hypothèse de tentatives de lecture périodiques.

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "scan sans éclairage", "range": "46101m885"}' %}

La puissance maximale pendant ce scan est de {{ 1.2 | W }}, contre {{ 1.62 | W }} pour un scan 1D avec éclairage, soit {{ 1.2 | percentLess: 1.62 }} de moins. Ce profil n'est toutefois pas directement comparable aux scans brefs précédents, car il inclut un appui un peu plus long sur le bouton.

#### Réinitialisation

Le scan du code de réinitialisation aux paramètres par défaut :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "reset", "range": "54335m2133"}' %}
{% comment %}draft: ensuite, j'ai scanné le code barres de réinitialisation en configuration par défaut. Nous voyons donc ce que donne un scan de configuration sans éclairage.{% endcomment %}

Le pic est moins élevé que lors du changement précédent ({{ 1.35 | W }} contre {{ 3.15 | W }}). L'absence d'éclairage ({{ 1.65 | minus: 1.22 | W }}) ne suffit pas à expliquer une telle différence. Peut-être que la réinitialisation en configuration par défaut est plus simple à écrire en mémoire ?

#### Sans éclairage et sans bip

Pour tenter d'atteindre la consommation minimale lors d'un scan, j'ai désactivé à la fois l'éclairage LED et le bip de confirmation :

{% profile "douchette-lecteur-codes-barres-led-bip.json.gz" '{"name": "scan sans éclairage et sans bip", "range": "118056m1514"}' %}
{% comment %}draft: et pour finir, pour essayer d'avoir la conso minimale, j'ai scanné un code barres après avoir réglé le lecteur dans le mode où il ne fait ni éclairage, ni bip. La période de légère sur consommation de 90ms à la fin du scan a disparu, c'était probablement le bip !{% endcomment %}

La période de légère surconsommation d'environ 90 ms qui apparaissait à la fin de chaque scan a disparu. C'était donc bien le bip ! Sa contribution reste toutefois minime.

### Coût d'usage

#### En veille permanente

Si le lecteur reste branché 24 heures sur 24 sans être utilisé, ses {{ 0.38 | W }} en veille représentent {{ 0.38 | W€PerYear }} par an.

#### En magasin

Dans un commerce, imaginons une caisse très active pendant 12 heures d'ouverture par jour, 6 jours par semaine, avec un scan toutes les 2 secondes. Cela représente {{ scans_par_jour }} scans par jour. Pendant les heures d'ouverture, le lecteur n'a jamais le temps de passer en veille et reste donc en repos actif à {{ 0.74 | W }}, soit {{ repos_actif_jour | Wh€ }} par jour. La surconsommation des {{ scans_par_jour }} scans ne représente que {{ conso_scan_1d | times: scans_par_jour | Wh }}, soit {{ conso_scan_1d | times: scans_par_jour | percent: repos_actif_jour }} de la consommation de repos actif : c'est négligeable.

Si l'ordinateur de caisse est éteint la nuit, la consommation annuelle (attente + scans) est de {{ conso_ouverture_an | Wh€ }} pour {{ jours_ouverture_an }} jours d'ouverture.

Si l'ordinateur de caisse reste allumé en permanence, il faut ajouter la consommation en veille pendant les heures de fermeture. Sur une année, cela représente {{ heures_fermeture_an }} heures de fermeture (8 760 heures dans l'année moins {{ heures_ouverture_an }} heures d'ouverture) à {{ 0.38 | W }}, soit {{ veille_fermeture | Wh€ }}. Le total annuel est alors d'environ {{ conso_ouverture_an | plus: veille_fermeture | Wh€ }} par lecteur de codes-barres.

#### Par code-barres scanné

Si le lecteur est utilisé régulièrement (par exemple un scan toutes les 2 secondes en caisse), il ne passe jamais en veille. Chaque scan consomme alors {{ conso_scan_avec_repos | Wh }} ({{ conso_scan_1d | Wh }} pour le scan lui-même, plus {{ conso_repos_2s | Wh }} de repos actif pendant les 2 secondes d'attente). Il faudrait scanner {{ conso_scan_avec_repos | countPer€: 0.01 }} codes-barres pour dépenser un centime d'électricité.

En revanche, si le lecteur est utilisé occasionnellement et passe en veille entre chaque utilisation, il faut compter la surconsommation du réveil et des 30 secondes d'attente active par rapport à la veille. Pendant ces 30 secondes, le lecteur consomme {{ 0.74 | W }} au lieu de {{ 0.38 | W }} en veille, soit une surconsommation de {{ surconso_reveil_30s | Wh }}. Avec le scan lui-même, le coût total d'un scan avec réveil est d'environ {{ conso_scan_avec_reveil | Wh }}. Il faudrait alors {{ conso_scan_avec_reveil | countPer€: 0.01 }} scans avec réveil pour dépenser un centime.

En valeur absolue, la consommation reste infime dans les deux cas.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'une douchette lecteur de codes-barres, on pourrait :
- comparer avec un lecteur de codes-barres de type "mains libres" (fixé sur un support, où l'on passe l'article devant), qui n'a pas de bouton-gâchette et reste actif en permanence ;
- comparer à la consommation d'autres périphériques de caisse : imprimante de tickets, afficheur client, terminal de paiement, caisse à écran tactile ;
- tester avec des codes-barres de complexités différentes (codes longs, petits QR codes, codes abîmés) pour voir si la durée de lecture varie significativement ;
- comparer avec d'autres modèles de douchettes USB pour évaluer si la consommation est similaire d'un modèle à l'autre.
{% endplusloin %}
