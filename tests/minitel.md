---
layout: test-layout.njk
title: un Minitel
img: minitel.jpg
date: 2025-12-27
tags: ['test']
---

Le Minitel est l'ancêtre français d'Internet, qui a permis pendant trois décennies l'accès à des services télématiques via le réseau téléphonique. Quelle était la consommation électrique de ces terminaux qui ont équipé des millions de foyers français ?

<!-- excerpt -->

{% tldr %}
- Le Minitel consomme {{ 18.6 | W }} lorsqu'il est allumé ({{ 19.2 | W }} lorsque le modem est actif). C'est bien moins que les {{ 35 | W }} de puissance nominale, qui prévoit l'alimentation de périphériques comme {% test imprimante-minitel une imprimante %}.
- Eteint, il ne consomme rien ; pas besoin de débrancher la prise.
- Le réglage de luminosité ou la veille automatique de l'écran n'ont aucun impact mesurable sur la consommation électrique.
- Il aurait fallu faire {{ 0.940 | countPer€: 0.01 }} recherches de 3 minutes dans l'annuaire pour dépenser 1 centime d'électricité au tarif actuel.
- Une recherche par semaine aurait représenté {{ 0.940 | times: 52 | Wh€ }} par an. Un usage professionnel plus intensif de 2 ou 3 recherches par jour ouvrable aurait représenté {{ 0.940 | times: 2.5 | times: 5 | times: 52 | Wh€ }} par an.
- Une heure de connexion à un service payant comme la messagerie aurait consommé {{ 19.2 | Wh€ }} au tarif actuel. À l'époque, ces services coûtaient environ 9 euros par heure, soit {{ 19.2 | countPer€: 9 }} fois plus que le coût électrique.
- Oublié allumé, le Minitel consomme {{ 18.6 | W€PerDay }} par jour ; {{ 18.6 | W€PerYear }} par an s'il reste allumé en permanence.
{% endtldr %}

{% comment %}
Notes from draft:
minitel 1b

Enfant j'ai su taper mon prénom sur le clavier du minitel de mes parents avant de savoir tenir un crayon. Même si le service minitel n'est plus disponible depuis 2012, j'aimerais faire découvrir l'informatique à la génération suivante grâce au minitel, dont le clavier petit est robuste est très adapté aux petits doigts d'enfant.

Une prise DIN à l'arrière du minitel permet de s'y connecter en série, grâce à un adaptateur USB. 1200 bauds, c'est très lent, mais ça permet tout de même des interactions.

J'ai écrit un jeu où un mot à taper est écrit en haut de l'écran avec en blanc les caractères déjà tapés et en gris ceux restants à taper. En bas de l'écran, le clavier est affiché avec la lettre suivante à taper qui clignote, permettant de la localiser facilement sur le clavier physique.

Lorsque le minitel était en service, il servait à faire des recherches dans l'annuaire. Les 2 premières minutes étaient gratuites, typiquement juste avant la fin des 2 minutes de connexion, on déconnectait le modem, pour garder les derniers résultats à l'écran et pouvoir recopier les informations utiles (numéro de téléphone, adresse) sur un papier (une autre époque !)

J'ai tester ce vieux minitel retrouvé au garage avec différentes variations :
- différents niveaux de luminosité
- avec le modem actif ou inactif
- mise en veille automatique de l'écran au bout de 4 minutes
- cas typique d'une recherche dans l'annuaire
{% endcomment %}

## Le matériel

{% intro "minitel.jpg" "Minitel 1B de La Radiotechnique Industrielle et Commerciale" %}

Le [Minitel](https://fr.wikipedia.org/wiki/Minitel "Page « Minitel » sur Wikipédia") est un terminal télématique qui a marqué l'histoire de l'informatique française. Déployé massivement dans les années 1980 et 1990, il permettait d'accéder à des services en ligne via le réseau téléphonique : annuaire électronique (le célèbre 3611), messagerie, réservations, services bancaires, et bien d'autres applications.

Le modèle testé ici est un Minitel 1B, fabriqué en France par [La Radiotechnique](https://fr.wikipedia.org/wiki/Radiotechnique "Page « Radiotechnique » sur Wikipédia") Industrielle et Commerciale. Il s'agit d'un modèle d'époque, dont la garantie s'est terminée en 1990. Bien que le service Minitel ait fermé définitivement en 2012, le terminal permet toujours une communication en série grâce à une prise à l'arrière.

### Méthode de mesure

Le Minitel est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

#### Étiquette

L'étiquette technique se trouve en dessous du Minitel :

{% image "./images/minitel-etiquette.jpg" "Étiquette technique du Minitel 1B" "500w" 500 %}
{% comment %}minitel 9 NFZ 330
Fabrique en France par LA RADIOTECHNIQUE INDUSTRIELLE ET COMMERCIALE

TERMINAL TELEMATIQUE
MODE 1 VIDEOTEX CEPT ( PROFIL 2 ) 25 L- 40 C
MODE 2 ASCII ( ISO 20 22 ISO 64 29 ) 25 L- 80C

PROPRIETE DE L'ETAT PTT
220V ~ 50 HZ 35 W

Fin de garantie en 1990{% endcomment %}

L'étiquette indique « 220V ~ 50 Hz 35 W », soit une puissance nominale de {{ 35 | W }}.
Comme nous le verrons plus loin dans ce test, cette puissance nominale de {{ 35 | W }} est bien supérieure à la consommation réelle du Minitel. Cette différence s'explique par la possibilité de brancher des périphériques sur la prise péri-informatique à l'arrière du Minitel. Ces périphériques, comme {% test imprimante-minitel l'imprimante du Minitel %}, sont alimentés par le Minitel et peuvent augmenter significativement sa consommation. La puissance nominale de {{ 35 | W }} correspond donc à la consommation maximale de l'ensemble Minitel + périphérique.

On note également que l'appareil était « PROPRIETE DE L'ETAT [PTT](https://fr.wikipedia.org/wiki/Postes,_t%C3%A9l%C3%A9graphes_et_t%C3%A9l%C3%A9phones_(France) "Page « Postes, télégraphes et téléphones (France) » sur Wikipédia") » – ces terminaux étaient prêtés gratuitement aux abonnés du téléphone.

Ce Minitel supporte deux modes de fonctionnement : le mode [Vidéotex](https://fr.wikipedia.org/wiki/Vid%C3%A9otex "Page « Vidéotex » sur Wikipédia") (le mode classique du Minitel français, 40 caractères par ligne) et le mode [ASCII](https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange "Page « American Standard Code for Information Interchange » sur Wikipédia") permettant d'aller jusqu'à 80 caractères par ligne.

### Un jeu pédagogique pour Noël

Enfant, j'ai su taper mon prénom sur le clavier du Minitel de mes parents avant de savoir tenir un crayon ! Le clavier, compact et robuste, est particulièrement bien adapté aux petites mains :

{% image "./images/minitel-clavier.jpg" "Clavier compact du Minitel" "500w" 500 %}
{% comment %}zoom sur le clavier, bien adapté pour des mains de jeune d'enfant{% endcomment %}

Pour les fêtes de Noël, j'ai eu l'idée de faire revivre le vieux Minitel qui prenait la poussière au garage de mes parents, devenus depuis grands-parents. Je voulais faire vivre à mon enfant l'expérience que j'ai eue à son âge.

J'ai commandé un adaptateur permettant de relier le Minitel à un {% test ordinateur-portable-dell-xps-15 ordinateur moderne %} via sa prise péri-informatique ([DIN](https://fr.wikipedia.org/wiki/Connecteur_DIN "Page « Connecteur DIN » sur Wikipédia") 5 broches) :

{% image "./images/minitel-adaptateur.jpg" "Adaptateur DIN vers USB" "500w" 500 %}
{% comment %}adaptateur DIN -> USB{% endcomment %}

Cet adaptateur permet de relier le Minitel à mon MacBook, me donnant ainsi la possibilité de programmer des applications :

{% image "./images/minitel-arriere-branche-macbook.jpg" "Minitel connecté à un MacBook via adaptateur USB" "500w" 500 %}
{% comment %}vue arrière avec le câble adaptateur DIN -> USB connecté à un adaptateur USB A -> USB C lui même connecté à un macbook{% endcomment %}

La communication se fait par défaut à 1200 [bauds](https://fr.wikipedia.org/wiki/Baud_(mesure) "Page « Baud (mesure) » sur Wikipédia"), mais ce modèle de Minitel est également capable de communiquer à 4800 bauds. À l'époque, cette prise servait par exemple à connecter {% test imprimante-minitel une imprimante %}. Aujourd'hui, cette connexion bidirectionnelle permet de contrôler entièrement l'affichage et de recevoir les touches tapées au clavier, ce qui ouvre la porte à des jeux simples ou à l'affichage de texte venant d'Internet.

J'ai écrit [un petit jeu pédagogique](https://github.com/fqueze/minitel?tab=readme-ov-file#jeu-dapprentissage-de-frappe) pour apprendre à mon enfant à taper son prénom. Le mot à taper est facilement configurable lors du démarrage du jeu, et nous avons utilisé « maman » pour ce test. Le mot s'affiche en haut de l'écran : les lettres déjà tapées apparaissent en blanc, celles restantes en gris. En bas, le clavier est représenté avec la lettre suivante à taper qui clignote, permettant de la localiser facilement :

{% image "./images/minitel-jeu-maman.jpg" "Jeu pédagogique pour apprendre à taper au clavier" "500w" 500 %}
{% comment %}jeu permettant d'apprendre à taper au clavier pour un jeune enfant, ici avec le mot "maman" à écrire, avec les lettres "mam" déjà écrites (en blanc en haut) et "an" en gris restant à taper.{% endcomment %}

En action avec un doigt d'enfant appuyant sur la touche « L » :

{% image "./images/minitel-clavier-enfant.jpg" "Clavier du Minitel avec un doigt d'enfant" "500w" 500 %}

La consommation pendant l'utilisation du jeu, en environ 7 minutes, se présente ainsi :

{% profile "minitel.json.gz" '{"name": "allumé pendant quelques minutes, différentes luminosités", "range": "m417107"}' %}
{% comment %}draft: pic au démarrage. différentes positions du bouton de luminosité, mais aucune différence visible sur le profil.{% endcomment %}

On observe un pic à {{ 25.8 | W }} lors de l'allumage, bien inférieur à la puissance nominale de {{ 35 | W }} indiquée sur l'étiquette. La consommation se stabilise ensuite rapidement autour de {{ 18.6 | W }}. La puissance reste remarquablement stable pendant toute la durée d'utilisation. En environ 7 minutes, le Minitel consomme {{ 2.15 | Wh€ }}.

### Tests en détail

#### Réglage de luminosité

J'ai testé différentes positions du bouton de luminosité pendant l'enregistrement précédent. À luminosité maximale, l'écran est très lumineux et on observe un artefact en diagonale sur la photo, probablement dû à l'interaction entre la fréquence de balayage du tube cathodique et le temps de pose du capteur photo :

{% image "./images/minitel-luminosite-max.jpg" "Luminosité maximale" "500w" 500 %}
{% comment %}luminosité réglée au maximum, on voit les balayages sur l'écran, peut-être que la luminosité plus élevée est obtenue sur le minitel en augmentant la fréquence de balayage?{% endcomment %}

À luminosité minimale, les caractères gris deviennent presque invisibles :

{% image "./images/minitel-luminosite-min.jpg" "Luminosité minimale, les lettres grises disparaissent" "500w" 500 %}
{% comment %}la luminosité est réglée au minimum, les lettres "an" de "maman" écrite en gris disparaissent presque{% endcomment %}

Malgré cette différence visuelle importante, aucune variation de consommation n'est visible sur le profil électrique. Le réglage de luminosité semble modifier la fréquence ou l'intensité du balayage du [tube cathodique](https://fr.wikipedia.org/wiki/Tube_cathodique "Page « Tube cathodique » sur Wikipédia"), mais cela n'a pas d'impact mesurable sur la puissance consommée.

#### Mise en veille automatique

Après 4 minutes d'inactivité (aucune touche pressée, aucune donnée reçue sur le port série), l'écran passe automatiquement en veille. Seul le voyant rouge reste allumé :

{% image "./images/minitel-ecran-en-veille.jpg" "Écran en veille après 4 minutes d'inactivité" "500w" 500 %}
{% comment %}l'écran est passé en veille au bout de 4 minutes d'inactivé. Le voyant rouge est encore allumé mais plus rien n'est visible sur l'écran{% endcomment %}

L'enregistrement complet, incluant l'activation de la veille automatique puis la réactivation de l'écran après environ 30 secondes :

{% profile "minitel.json.gz" '{"name": "écran en veille après 4 minutes, puis rallumé", "range": "417106m833377"}' %}
{% comment %}draft: testé à nouveau, et attendu que l'écran passe en veille (il passe en veille au bout de 4 minutes sans activité sur le clavier ou le port série), puis réactivé l'écran après environ 30s. Aucune différence visible sur le profil.{% endcomment %}

Là encore, aucune différence de consommation n'est visible sur le profil. La puissance reste stable à {{ 18.6 | W }} que l'écran soit actif ou en veille. Cette fonction protège le tube cathodique d'un vieillissement prématuré causé par l'affichage prolongé d'une image fixe (notamment pour éviter de « brûler » certaines zones du tube), mais n'économise rien sur le plan électrique.

#### Impact du modem

Le Minitel intègre un [modem](https://fr.wikipedia.org/wiki/Modem "Page « Modem » sur Wikipédia") V.23 pour se connecter au réseau téléphonique. À l'époque, on composait le 3611 pour accéder à l'annuaire électronique. Le bouton « Connexion/Fin » à l'arrière permet d'activer ou de désactiver le modem.

Lorsque le modem essaie d'établir une connexion, la lettre « C » (pour Connexion) clignote en haut à droite de l'écran et devient fixe lorsque la connexion est établie :

{% image "./images/minitel-connecte.jpg" "Modem actif, lettre C affichée" "250w" 250 %}
{% comment %}on voit la lettre 'C' en haut à droite de l'écran, le modem est actif{% endcomment %}

Lorsque le modem est inactif, c'est la lettre « F » (pour Fin) qui s'affiche :

{% image "./images/minitel-fin.jpg" "Modem inactif, lettre F affichée" "250w" 250 %}
{% comment %}on voit la lettre 'F' en haut à droite de l'écran, le modem est inactif{% endcomment %}

Pour mesurer l'impact du modem sur la consommation, j'ai activé et désactivé plusieurs fois le modem :

{% profile "minitel.json.gz" '{"name": "avec ou sans modem", "range": "1269640m397743"}' %}
{% comment %}draft: cette fois ci j'ai activé plusieurs fois le modem en appuyant sur le bouton "Connection/Fin". Lorsque le modem s'active, "C" clignote en haut à droite de l'écran à la place de "F". Au bout de 42s le modem se désactive. On voit une variation de consommation sur l'enregistrement quand le modem est actif ou inactif.{% endcomment %}

Cette fois, on observe bien une différence ! La consommation augmente légèrement lorsque le modem est activé. Le modem se désactive automatiquement au bout de 42 secondes si aucune connexion n'est établie.

Zoomons sur une période de 42 secondes avec le modem activé :

{% profile "minitel.json.gz" '{"name": "zoom sur 42s avec modem activé", "range": "1441800m42119"}' %}

Pendant cette période, la puissance médiane est de {{ 19.2 | W }}, contre {{ 18.6 | W }} en usage normal. L'activation du modem ajoute donc environ 0,6 W à la consommation.

### Simulation d'une recherche dans l'annuaire

À l'époque, l'usage le plus courant du Minitel était la consultation de l'annuaire électronique via le 3611. Les 2 premières minutes de connexion étaient gratuites. L'astuce consistait à se déconnecter juste avant la fin des 2 minutes pour garder les résultats affichés à l'écran : on pouvait alors composer tranquillement le numéro sur le téléphone, ou recopier les informations utiles (numéro de téléphone, adresse) sur un papier. Une autre époque !

Pour simuler cet usage typique, j'ai réactivé le modem à chaque fois qu'il se désactivait automatiquement, puis je l'ai désactivé manuellement au bout d'1 minute 55 secondes. J'ai ensuite laissé le Minitel allumé hors connexion pour simuler le moment où l'on recopiait les résultats :

{% profile "minitel.json.gz" '{"name": "recherche dans l\'annuaire avec modem pendant 1min55 puis déconnecté", "range": "1702237m179766"}' %}
{% comment %}draft: Ici j'ai essayé de simuler une utilisation typique de l'époque. Quand on appelait le 3611 pour avoir accès à l'annuaire, les 2 premières minutes étaient gratuites. Pour simuler cette situation, j'ai réactivé le modem à chaque fois qu'il s'est désactivé automatiquement puis l'ai désactivé au bout d'1m55. J'ai ensuite laissé le minitel un peu allumé hors connexion pour simuler le moment où on recopiait sur un papier les résultats trouvés.{% endcomment %}

Cette utilisation typique de {{ 179766 | divided_by: 1000 | s }} consomme {{ 0.940 | Wh€ }}. On observe que la consommation reste stable tout au long de la session, avec une légère baisse lorsque le modem se désactive.

### Coût d'usage et comparaison avec les tarifs d'époque

Une recherche dans l'annuaire (3 minutes) aurait consommé {{ 0.940 | Wh€ }} au tarif actuel de l'électricité. Il aurait fallu effectuer {{ 0.940 | countPer€: 0.01 }} recherches pour dépenser un centime d'électricité.

Pour un particulier effectuant une recherche par semaine, la consommation annuelle aurait été de {{ 0.940 | times: 52 | Wh€ }}. Pour un usage professionnel plus intensif (2 ou 3 recherches par jour ouvrable), cela aurait représenté {{ 0.940 | times: 2.5 | times: 5 | times: 52 | Wh€ }} par an.

Pour une heure de connexion à un service payant comme la messagerie (consommation de {{ 19.2 | W }} avec le modem activé), le coût électrique au tarif actuel serait de {{ 19.2 | Wh€ }}. À l'époque, ces services coûtaient généralement autour de 60 francs par heure (environ 9 euros), soit {{ 19.2 | countPer€: 9 }} fois plus que le coût de la consommation électrique du terminal. Le coût électrique était vraiment dérisoire comparé au coût de la communication et des services !

Aujourd'hui, le Minitel ne sert plus à se connecter à des services télématiques, mais peut être recyclé comme terminal pour des projets pédagogiques ou artistiques. Dans ce contexte d'usage occasionnel, le coût électrique de quelques sessions reste négligeable. En revanche, si le Minitel reste allumé en permanence, la consommation devient significative.

Si on oublie le Minitel allumé pendant une journée entière, il consommera {{ 18.6 | W€PerDay }}. Et s'il reste branché et allumé en permanence toute l'année, la consommation atteindra {{ 18.6 | W€PerYear }} par an. Heureusement, le Minitel dispose d'un interrupteur marche/arrêt mécanique qui coupe complètement l'alimentation : lorsqu'il est éteint, la consommation est de 0 W. Il n'est donc pas nécessaire de débrancher la prise.

### Comparaison avec les appareils modernes

La consommation de {{ 18.6 | W }} peut sembler faible, mais pour un terminal sans intelligence embarquée, c'est significatif. Aujourd'hui, on utiliserait plutôt un smartphone pour faire une recherche dans l'annuaire ou accéder à un service de messagerie, avec une consommation bien inférieure.

L'écran cathodique du Minitel explique en grande partie cette consommation : ce type de technologie nécessite une haute tension pour faire fonctionner le tube, même lorsque l'écran n'affiche rien. Les écrans modernes sont beaucoup plus efficaces.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation du Minitel, on pourrait :
- mesurer la consommation avec {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un wattmètre de précision %} pour quantifier exactement l'impact du réglage de luminosité et de la veille (variations peut-être trop faibles pour être captées par la prise connectée) ;
- comparer avec d'autres modèles de Minitel (Minitel 2, Magis) pour voir si les générations plus récentes étaient plus économes ;
- mesurer la consommation d'un Minitel réellement connecté à une ligne téléphonique pendant un appel à un des quelques services Minitels remis en service par des passionnés ;
- mesurer la consommation avec {% test imprimante-minitel un périphérique %} branché sur la prise péri-informatique.
{% endplusloin %}
