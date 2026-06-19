---
layout: test-layout.njk
title: un moniteur 4K Dell P2715Q
img: moniteur-27pouces-4k-dell-p2715q.jpg
date: 2026-06-20
tags: ['test']
---

Ce moniteur 27 pouces 4K, mon premier écran de cette définition, m'a accompagné presque quotidiennement pendant dix ans avant de tomber en panne. Avant de m'en séparer, quel bilan énergétique pour une décennie de bons et loyaux services ?

<!-- excerpt -->

{% tldr %}
- Utilisé 8 heures par jour sur les 218 jours d'un forfait jour, l'écran revient à environ {{ 49.7 | times: 8 | times: 218 | Wh€ }} d'électricité par an, soit dans les {{ 87091 | times: 10 | Wh€ }} sur ses dix ans de service.
- Écran allumé, la consommation va de {{ 22.7 | W }} (luminosité minimale) à {{ 48.9 | W }} (maximale) : baisser la luminosité fait plus que diviser la puissance par deux.
- Afficher une page noire plutôt que blanche ne fait économiser que {{ 45.2 | percentLess: 49.6 }} : sur une dalle à rétroéclairage, le « dark mode » a peu d'effet.
- En veille comme une fois éteint, la consommation est si faible (moyenne autour de {{ 0.05 | W }}) qu'elle est à la limite du mesurable et négligeable sur la facture ; le bouton « power » ne coupe pas l'alimentation.
{% endtldr %}

## Le matériel

{% intro "moniteur-27pouces-4k-dell-p2715q.jpg" "Moniteur Dell P2715Q, 27 pouces 4K (3840x2160)" %}

Le Dell P2715Q est un moniteur professionnel de 27 pouces affichant une définition 4K UHD (3840x2160 pixels). C'est le premier écran 4K de cette taille que j'ai eu dans ma carrière : en 2016, c'était révolutionnaire. Jusque-là, mes écrans externes plafonnaient à 24 pouces dans le meilleur des cas.

Cet écran m'a servi presque tous les jours pendant dix ans. Il vient de tomber en panne : un clignotement très gênant de tout le bas de la dalle apparaît au bout d'un jour ou deux d'utilisation. La panne est intermittente, ce qui m'a tout de même permis de réaliser ce test assez bref comme si l'écran fonctionnait normalement. Une façon de lui dire au revoir, en quelque sorte, avant qu'il ne parte pour de nouvelles aventures : il sera réparé en fusionnant avec les pièces d'un autre exemplaire du même modèle, victime d'une autre panne.

### Méthode de mesure

Le moniteur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

L'étiquette signalétique se trouve au dos de l'écran, près des prises :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-dos.jpg" "Dos du moniteur, pied démonté, avec l'étiquette signalétique près des prises" "500w" 500 %}
{% comment %}écran vu de dos, pied démonté. On voit une étiquette derrière l'attache du pied, et une étiquette en bas près des différentes prises. C'est cette dernière qui contient quelques informations techniques.{% endcomment %}

En voici le détail :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-etiquette.jpg" "Étiquette signalétique : Dell P2715Q, 100-240V ~ 50/60Hz 1.8A, fabriqué en octobre 2016" "1000w" 1000 %}
{% comment %}DELL
Moniteur à écran plat
Numéro de modèle : p2715Qt
Tension d'éntrée : 100-240V ~ 50/60Hz 1.8A
Consommation d'énergie : 28.6 Wh
Consommation d'énergie en mode veille : 0.23 Wh{% endcomment %}

L'étiquette indique « *100-240V ~ 50/60Hz 1.8A* », soit un courant maximal de 1,8 A. C'est une valeur étonnamment élevée pour un écran : sous 240 V, cela correspondrait à plus de 430 W, et même sous 100 V à 180 W. La consommation réelle de l'écran s'approchera-t-elle de ce maximum théorique ? Les mesures nous le diront. L'étiquette donne aussi une consommation (moyenne ?) de {{ 28.6 | W }} et une consommation en veille de {{ 0.23 | W }}.

### Un test complet

Pour ce test, j'ai enregistré une session d'un peu moins de trois quarts d'heure couvrant l'ensemble des comportements de l'écran : allumage, raccordement à un ordinateur, réglages de luminosité, contenu affiché, puis veille. La voici dans son ensemble :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Test complet", "range": ""}' %}

On distingue nettement plusieurs blocs séparés par des phases proches de 0 W, qui correspondent aux moments où l'écran est en veille. Un pic isolé atteint {{ 107 | W }}, très au-dessus de tout le reste ; nous l'expliquerons à la fin, après avoir analysé chaque phase. Reprenons justement dans l'ordre.

### À l'allumage, sans ordinateur

J'ai d'abord allumé l'écran sans le raccorder à un ordinateur. Il affiche un message « Entering Power Save Mode » pendant quelques secondes, puis passe en veille :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-entering-power-save-mode.jpg" "Message « Entering Power Save Mode » affiché à l'écran avant le passage en veille" "500w" 500 %}

J'ai répété l'opération plusieurs fois en éteignant puis rallumant l'écran avec le bouton « power ». On obtient à chaque fois exactement le même comportement :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Comportement sans ordinateur branché — 3 redémarrages", "range": "273859m150799"}' %}
{% comment %}draft: J'ai allumé l'écran. Il n'était pas raccordé à un ordinateur, il a affiché "Entering Power Save Mode" quelques secondes puis est passé en veille. 3 fois j'ai éteint l'écran avec le bouton "power" puis l'ai rallumé. On voit qu'on obtient la même chose à chaque fois.{% endcomment %}

On retrouve quatre cycles identiques, chacun avec un palier suivi d'un pic. En zoomant sur le dernier redémarrage, on suit le détail de la séquence :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Zoom sur le dernier redémarrage", "range": "393484m30130"}' %}
{% comment %}draft: zoom sur la dernière fois : on voit qu'il faut environ 8 secondes pour démarrer, puis que l'écran s'allume avec l'affichage du message pendant environ 3s, mais que l'entrée réelle en mode veille ne se fait que 20s après le début de l'affichage du message.{% endcomment %}

L'allumage prend environ 8 secondes, puis l'écran affiche le message pendant environ 3 secondes, avec un pic à {{ 43.2 | W }}. L'entrée réelle en mode veille n'intervient qu'une vingtaine de secondes après le début de l'affichage du message.

### Écran allumé : raccordement à un ordinateur

En raccordant l'écran à un ordinateur, il sort de veille et la dalle reste allumée :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Raccordement à un ordinateur", "range": "440895m163337"}' %}
{% comment %}draft: Lors du raccordement à un ordinateur, l'écran sort de veille, là aussi ça prend environ 8s, mais après la dalle reste allumée. Le petit creux à 43W pendant 5s correspond à un moment il y a eu un mauvais contact sur la prise usb-c reliant l'écran à mon ordinateur portable.
La baisse de conso suivante correspond à un moment où j'ai verrouillé mon ordinateur et donc sa sortie video s'est arrêtée, déclenchant le passage en veille de l'écran. Comme j'ai sorti l'ordinateur du mode verrouillé moins de 20s après l'avoir verrouillé, l'écran n'a pas eu le temps de passer totalement en veille, et j'ai reproduit le test une deuxième fois, où là il passe vraiment en veille après 15s de consommation réduite{% endcomment %}

La sortie de veille prend là aussi environ 8 secondes, puis l'écran se stabilise autour de {{ 49.7 | W }} (médiane). Les deux creux visibles sur le profil ne sont pas dus à l'écran : le premier, à {{ 43.3 | W }} pendant quelques secondes, correspond à un mauvais contact sur la prise USB-C reliant l'écran à mon ordinateur portable. Le second correspond à un moment où j'ai verrouillé l'ordinateur : sa sortie vidéo s'est arrêtée, ce qui a déclenché le passage en veille de l'écran. Comme je l'ai déverrouillé moins de 20 secondes plus tard, l'écran n'a pas eu le temps de passer complètement en veille. J'ai reproduit l'opération une seconde fois, où il finit par basculer en veille après une quinzaine de secondes de consommation réduite.

C'est ce raccordement à l'ordinateur que montre la photo en tête de cet article : l'écran y affiche sa propre consommation, mesurée par {% post mesurer-la-consommation-avec-shelly-plus-plug-s l'outil qui enregistre les profils %} utilisés tout au long de ce test.

### Influence de la luminosité

L'écran était réglé à la luminosité maximale. Après avoir exploré le menu de configuration, j'ai baissé la luminosité au minimum, puis je l'ai remontée par paliers de 10 %, en laissant chaque réglage une dizaine de secondes, avant de finalement laisser l'écran repasser en veille :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Test des différents niveaux de luminosité", "range": "605869m334876"}' %}
{% comment %}draft: L'écran était à la luminosité maximum. J'ai ouvert et exploré le menu de configuration. Ensuite j'ai baissé la luminosité au niveau minimum, puis l'ai ensuite remontée par tranche de 10%, en laissant chaque réglage environ 10s. On voit les paliers correspondant à chaque réglage dans l'enregistrement. A la fin, j'ai reverrouillé l'ordinateur, faisant passer l'écran en veille.{% endcomment %}

Le menu de réglage se présente ainsi, ici avec la luminosité positionnée à 50 % :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-reglage-luminosite-50pct.jpg" "Menu de réglage de la luminosité du moniteur, réglée à 50 %" "500w" 500 %}
{% comment %}photo de l'écran avec le menu de réglage de luminosité, montrant qu'elle est réglée à 50%{% endcomment %}

En zoomant sur la phase de remontée, les paliers correspondant à chaque réglage apparaissent clairement :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Augmentation progressive du niveau de luminosité par paliers de 10%", "range": "656567m209983"}' %}

La luminosité a une influence majeure. En moyennant la consommation sur les dix secondes passées à chaque palier, on obtient :

| Luminosité | Puissance |
|---:|---:|
| 0 % | {{ 22.7 | W }} |
| 10 % | {{ 24.0 | W }} |
| 20 % | {{ 25.5 | W }} |
| 30 % | {{ 26.8 | W }} |
| 40 % | {{ 28.2 | W }} |
| 50 % | {{ 29.6 | W }} |
| 60 % | {{ 31.3 | W }} |
| 70 % | {{ 32.5 | W }} |
| 80 % | {{ 36.3 | W }} |
| 90 % | {{ 42.6 | W }} |
| 100 % | {{ 48.9 | W }} |

<div style="clear: both"></div>

Pour l'affichage d'un même contenu, la consommation passe ainsi de {{ 22.7 | W }} au minimum à {{ 48.9 | W }} au maximum : passer de la luminosité maximale à la minimale fait plus que diviser la puissance par deux (réduction de {{ 22.7 | percentLess: 48.9 }}). Baisser la luminosité est donc un moyen efficace d'économiser de l'énergie, et accessoirement de ménager ses yeux.

On peut au passage situer la consommation de {{ 28.6 | W }} indiquée sur l'étiquette : elle tombe entre les paliers 40 % et 50 %, c'est-à-dire autour de 45 % de luminosité. C'est sans doute le réglage standard utilisé par le fabricant pour mesurer la consommation déclarée.

### Influence du contenu affiché

Sur une dalle à rétroéclairage comme celle-ci, on peut se demander si afficher du noir plutôt que du blanc change quelque chose à la consommation — autrement dit, si le [« dark mode »](https://fr.wikipedia.org/wiki/Mode_sombre "Page « Mode sombre » sur Wikipédia") des sites web et applications a un intérêt énergétique. J'ai alterné entre une page web entièrement blanche et une page web entièrement noire :

Voici la page noire :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-black.jpg" "Page web entièrement noire utilisée pour le test" "700w" 700 %}

Et la page blanche, qui sert de point de comparaison :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-white.jpg" "Page web entièrement blanche utilisée pour le test" "700w" 700 %}

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Impact du contenu affiché sur la consommation", "range": "1109548m341779"}' %}
{% comment %}draft: J'ai alterné entre afficher une page web totalement blanche et une page web totalement noire, pour simuler l'impact d'un "Dark mode" des sites web sur la consommation de l'écran.{% endcomment %}

L'effet existe, mais il est faible. En isolant 20 secondes de page noire, la consommation est stable autour de {{ 45.2 | W }} :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Noir", "range": "1310018m20284"}' %}

Sur 20 secondes de page blanche, elle monte à {{ 49.6 | W }} :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Blanc", "range": "1342809m20284"}' %}

Une page noire consomme donc {{ 45.2 | W }}, contre {{ 49.6 | W }} pour une page blanche : le « dark mode » ne fait économiser que {{ 45.2 | percentLess: 49.6 }}. C'est cohérent avec une technologie à rétroéclairage : la lumière est produite en permanence par le fond de la dalle, et les cristaux liquides la bloquent plus ou moins pour assombrir chaque pixel. Le rétroéclairage reste allumé que l'image soit noire ou blanche, et afficher du noir ne l'éteint pas. Je n'ai pas d'explication certaine pour la légère économie mesurée : elle pourrait venir d'un ajustement automatique du rétroéclairage selon le contenu, ou simplement de l'électronique de pilotage de la dalle. Quoi qu'il en soit, le gain est faible.

### En veille et écran éteint

À la fin du test, j'ai voulu mesurer la consommation en veille, puis une fois l'écran éteint avec son bouton mais toujours branché. Ces puissances sont trop faibles pour que la prise connectée les mesure précisément en continu : les relevés alternent entre des valeurs nulles et des valeurs non nulles. Seule la moyenne sur plusieurs minutes reste exploitable. Elle est crédible, mais sa précision est incertaine : pour obtenir des valeurs plus fines, il faudrait reprendre la mesure avec {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un wattmètre de laboratoire %}, bien plus précis sur les faibles puissances. Je m'en tiendrai ici aux moyennes de la prise.

J'ai laissé l'écran un peu plus de dix minutes en veille, puis un peu plus de dix minutes éteint :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "En veille puis éteint", "range": "1460677m1915323"}' %}
{% comment %}draft: A la fin de mon test, j'ai voulu mesurer la consommation de l'écran en veille. Elle est trop faible pour pouvoir être mesurée précisément en continu, mais la mesure de la prise connectée alterne entre des valeurs non nulles et des valeurs à 0, avec une moyenne qui reste pertinente. J'ai laissé en veille un peu plus de 10 minutes, puis laissé l'écran éteint mais branché pendant un peu plus de 10 minutes de plus. On voit que les échantillons non nuls s'espace un tout petit peu, mais la différence est étonnamment faible entre veille et éteint. Tellement faible que j'ai douté de la prise connectée et j'ai enregistré 10 minutes de plus après avoir débranché physiquement le câble d'alimentation de l'écran ; et là je n'ai eu que des échantillons à 0, ce n'est donc pas ma prise connectée qui renvoie n'importe quoi.{% endcomment %}

On devine que les échantillons non nuls s'espacent très légèrement dans la seconde moitié, une fois l'écran éteint. Les deux zooms suivants confirment cette impression. En veille :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "En veille pendant 10 minutes", "range": "1475923m600326"}' %}

Une fois éteint :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Éteint pendant 10 minutes", "range": "2129610m600326"}' %}

La moyenne ressort à {{ 0.059 | W }} en veille et à {{ 0.0466 | W }} éteint, soit seulement {{ 0.0466 | percentLess: 0.059 }} de moins. Soit la consommation en veille est excellente, soit la consommation une fois éteint est une honte : il est surprenant que les deux valeurs soient aussi proches. Cela s'explique : le bouton « power » n'est pas un interrupteur physique, mais un micro-switch sur un circuit électronique en courant continu. Éteindre l'écran ne coupe pas son alimentation : le transformateur reste sous tension, et c'est lui qui consomme ces quelques dizaines de milliwatts, que l'écran soit en veille ou « éteint ». Pour vraiment couper cette consommation, il faut débrancher l'écran — ce que j'ai vérifié en enregistrant dix minutes de plus une fois le câble retiré : je n'ai alors obtenu que des valeurs à 0, ce qui confirme au passage que les faibles valeurs mesurées juste avant n'étaient pas un simple bruit de la prise.

Ces puissances sont si faibles qu'on peine à les rapporter à quoi que ce soit. Comparons-les tout de même à l'usage actif, à {{ 49.7 | W }} : il suffit d'environ {{ 100 | s }} d'écran allumé pour consommer autant qu'une journée entière en veille. Autrement dit, laisser l'écran en veille jour et nuit pendant {{ 0.059 | countHPer€: 0.01 }} permet tout juste de dépenser un centime d'électricité. Et éteindre l'écran plutôt que de le laisser en veille ne fait gagner que {{ 0.059 | minus: 0.0466 | W }} : il faudrait le faire pendant {{ 0.0124 | countHPer€: 0.01 }} pour économiser ce même centime. On croit souvent, parce qu'une petite lumière clignote, qu'éteindre l'écran change quelque chose ; sur la facture, l'effet est imperceptible.

### Les options du menu « Energy »

Le moniteur propose un sous-menu « Energy » avec deux options : éteindre la LED du bouton « power » quand l'écran est allumé, et garder l'alimentation USB active pendant la veille :

{% image "./images/moniteur-27pouces-4k-dell-p2715q-reglages-energy.jpg" "Sous-menu « Energy » du moniteur : options Power Button LED et USB" "500w" 500 %}
{% comment %}photo du sous menu "Energy" proposant d'éteindre la LED du bouton Power lorsque l'écran est allumé, et de laisser l'USB allumé lorsque l'écran est en veille.{% endcomment %}

#### La LED du bouton « power »

Première option, désactiver la LED du bouton « power » quand l'écran est allumé. Sur le profil correspondant, je ne remarque aucune différence notable de consommation :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Power Button LED Off During Active", "range": "940983m91869"}' %}
{% comment %}draft: Je ne remarque pas de différence notable...{% endcomment %}

La LED consomme trop peu pour que son extinction se voie sur la mesure : cette option relève davantage du confort visuel que de l'économie d'énergie.

#### L'alimentation USB en veille

Seconde option, « USB On During Standby » : garder les ports USB de l'écran alimentés même quand il est en veille. En la mesurant en veille :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "En veille avec USB actif", "range": "1034352m75196"}' %}
{% comment %}draft: la conso en veille quand l'USB reste actif est nettement supérieure à la conso en veille sans USB. Cette option a vraiment un impact sur l'utilisation d'énergie, surtout si l'écran reste en veille longtemps...{% endcomment %}

Avec l'USB maintenu actif, la veille passe à {{ 0.262 | W }} en moyenne, contre {{ 0.059 | W }} sans cette option : plus de quatre fois plus. On notera que cette valeur est proche des {{ 0.23 | W }} de veille annoncés sur l'étiquette — le fabricant a probablement déclaré sa consommation en veille avec cette option activée. Cela reste une très faible puissance, mais si l'écran est laissé en veille en permanence, l'écart représente {{ 0.262 | minus: 0.059 | W€PerYear }} de plus par an — encore négligeable, mais cette fois mesurable.

L'intérêt de cette option n'est probablement pas la recharge d'un périphérique : on peut supposer qu'elle sert surtout à brancher clavier et souris sur l'écran, de sorte qu'une action de l'utilisateur sur ces périphériques réveille l'ordinateur et sorte l'écran de veille. C'est probablement un choix judicieux du constructeur de ne pas l'avoir activée par défaut.

### Le pic du premier branchement

Reste à expliquer le pic à {{ 107 | W }} repéré sur le test complet, très supérieur à toutes les autres valeurs. Il correspond au tout premier branchement, après que l'écran soit resté débranché plusieurs mois :

{% profile "moniteur-27pouces-4k-dell-p2715q.json.gz" '{"name": "Premier branchement", "range": "129435m77600"}' %}
{% comment %}draft: Pic de démarrage notable ; chargement de condensateurs ? L'écran n'avait pas été branché depuis plusieurs mois.{% endcomment %}

Ce pic bref, qui dure moins d'une seconde, est probablement dû à la charge des condensateurs de l'alimentation après une longue période sans courant. Sur l'ensemble de cette phase, l'écran a consommé {{ 0.179 | Wh€ }} ; un démarrage ordinaire sans ordinateur en consommait {{ 0.115 | Wh€ }}. La surconsommation due au pic n'est donc que de {{ 0.179 | minus: 0.115 | Wh€ }} — sans aucune incidence pratique. Le pic reste d'ailleurs très en dessous des 1,8 A annoncés sur l'étiquette, qui correspondraient à plus de 430 W sous 240 V.

### Coût d'usage

Écran allumé, la consommation tourne autour de {{ 49.7 | W }}, à peu près indépendamment du contenu affiché. Pour un usage de bureau de 8 heures par jour, sur les 218 jours travaillés d'un salarié au forfait jour, cela représente une consommation annuelle de {{ 49.7 | times: 8 | times: 218 | Wh€ }}.

Le reste du temps, soit environ {{ 7022 }} heures par an, l'écran est en veille. À {{ 0.059 | W }}, cela ajoute {{ 0.059 | times: 7022 | Wh€ }}, soit moins d'1 % du total annuel. La veille est donc négligeable sur la facture, et le total annuel reste d'environ {{ 49.7 | times: 1744 | plus: 414.3 | Wh€ }}.

Sur les dix années où l'écran m'a servi presque tous les jours, le total cumulé atteint environ {{ 87091 | times: 10 | Wh€ }}. C'est peu comparé à son prix d'achat — ce modèle professionnel haut de gamme valait, à sa sortie, dans les 600 à 800 euros — mais pas insignifiant non plus : l'électricité aura représenté l'équivalent de plus du quart du prix d'achat.

La veille étant déjà négligeable sur ce seul écran, débrancher l'écran en partant le soir ou le week-end n'apportera pas grand-chose à lui seul. L'intérêt apparaît surtout à l'échelle d'un poste de travail complet, où l'écran s'additionne à l'ordinateur et aux autres périphériques : une multiprise à interrupteur permet alors de tout couper d'un geste.

### Conseils pour l'autoconsommation photovoltaïque

Avec une puissance de seulement {{ 49.7 | W }} écran allumé, ce moniteur est l'un des appareils les plus faciles à alimenter par l'énergie solaire. Une installation en toiture standard de 3 kWc produit largement de quoi le faire fonctionner, même par temps couvert ; un simple kit photovoltaïque plug & play de quelques centaines de watts suffirait même lorsqu'il y a du soleil.

Encore faut-il l'utiliser au bon moment. En télétravail (probable pour qui dispose d'un tel écran professionnel) ou à la retraite, l'écran sert en journée, en plein pic de production solaire : l'autoconsommation est alors presque naturelle. Mais si l'écran reste à la maison pendant qu'on travaille au bureau, et qu'il sert surtout le soir, quand la production solaire est faible ou nulle, l'autoconsommation devient bien plus difficile.

L'écran n'est pas forcément le poste à surveiller : c'est l'ordinateur auquel il est relié qui pourrait peser le plus lourd. Lors de notre test d'un {% test ordinateur-portable-dell-xps-15 ordinateur portable %}, la consommation maximale dépassait largement celle de cet écran ; un ordinateur de bureau, que nous n'avons pas encore mesuré, consommerait davantage encore.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce moniteur, on pourrait :
- reprendre la mesure de la veille et de l'écran éteint avec {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un wattmètre de laboratoire %} pour obtenir des valeurs plus précises que la moyenne de la prise connectée ;
- comparer la consommation à celle d'un moniteur 4K récent de même taille, pour voir si dix ans de progrès technologiques se traduisent par une vraie économie ;
- mesurer l'influence de la fréquence de rafraîchissement et de la résolution affichée sur la consommation ;
- évaluer la consommation supplémentaire d'un périphérique réellement alimenté par le port USB de l'écran, plutôt que le port à vide.
{% endplusloin %}
