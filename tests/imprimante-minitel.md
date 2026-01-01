---
layout: test-layout.njk
title: l'imprimante du Minitel
img: imprimante-minitel.jpg
date: 2026-01-01
tags: ['test']
---

Avant que le web ne se popularise, les Minitels permettaient déjà d'accéder à divers services en ligne. Pour garder une trace des informations consultées, il existait une imprimante dédiée qui se connectait directement au Minitel. Quelle est la consommation électrique de cette relique des années 1990 ?

<!-- excerpt -->

{% tldr %}
- L'imprimante est alimentée par le Minitel. Lorsqu'elle est connectée mais inactive, l'imprimante ajoute {{ 20.1 | minus: 18.8 | W }} à la consommation du Minitel, soit une augmentation de {{ 20.1 | percentMore: 18.8 }}.
- Pendant l'impression, la puissance de l'imprimante atteint {{ 26.2 | minus: 18.8 | W }} au maximum, augmentant d'autant la consommation totale du Minitel. Ceci explique pourquoi le Minitel a une puissance nominale de {{ 35 | W }} alors qu'il consomme lui-même légèrement moins de {{ 20 | W }}.
- L'imprimante seule consomme {{ 0.080 | Wh }} par impression, il faudrait {{ 0.080 | countPer€: 0.01 }} impressions pour dépenser un centime d'électricité (mais le coût du papier thermique est bien supérieur).
- L'impression depuis le clavier du Minitel (FNCT+I F) prend {{ 55 | s }} et restitue fidèlement les accents, tandis que l'impression par le bouton de l'imprimante est plus rapide ({{ 43 | s }}) mais corrompt les caractères accentués.
{% endtldr %}

## Le matériel

{% intro "imprimante-minitel.jpg" "L'imprimante du Minitel" %}

L'imprimante du Minitel est un périphérique qui se connecte à l'arrière d'un [Minitel](https://fr.wikipedia.org/wiki/Minitel "Page « Minitel » sur Wikipédia") via une prise [DIN](https://fr.wikipedia.org/wiki/Connecteur_DIN "Page « Connecteur DIN » sur Wikipédia") 5 broches appelée « prise péri-informatique ». Elle utilise du [papier thermique](https://fr.wikipedia.org/wiki/Papier_thermique "Page « Papier thermique » sur Wikipédia") sur rouleau pour imprimer le contenu affiché à l'écran. Celle que nous testons ici a été fabriquée fin 1994, comme l'indique son étiquette.

Cette imprimante est branchée sur {% test minitel un Minitel 1B que nous avons déjà testé %}. Elle est alimentée directement par le Minitel, sans source d'alimentation externe. C'est cette possibilité de brancher des périphériques qui explique pourquoi le Minitel a une puissance nominale de {{ 35 | W }}, bien supérieure à sa consommation réelle légèrement inférieure à {{ 20 | W }}.

### Méthode de mesure

Le Minitel est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer la consommation de l'ensemble Minitel + imprimante.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations sur le matériel

Ni l'étiquette ni le manuel de l'imprimante ne donnent d'information sur ses caractéristiques électriques.

L'étiquette sous l'imprimante indique :

{% image "./images/imprimante-minitel-etiquette.jpg" "Étiquette de l'imprimante" "300w" 300 %}
{% comment %}étiquette sous l'imprimante :

L'IMPRIMANTE DU MINITEL
FAB: 94 47 FG: 01/96
MARCHE: 94.4D.G13{% endcomment %}

L'imprimante a été fabriquée la 47e semaine de 1994. L'étiquette indique également « FG: 01/96 », ce qui signifie que la garantie se terminait en janvier 1996.

L'imprimante se connecte au Minitel via une prise DIN 5 broches :

{% image "./images/imprimante-minitel-prise-din.jpg" "Connecteur DIN 5 broches de l'imprimante" "300w" 300 %}
{% comment %}gros plan sur la prise DIN 5 de l'imprimante{% endcomment %}

Voici une vue complète de l'imprimante avec son câble :

{% image "./images/imprimante-minitel-vue-complete-avec-fil.jpg" "L'imprimante du Minitel avec son câble DIN" "500w" 500 %}
{% comment %}image montrant l'imprimante de dessus dans son ensemble, avec le câble DIN permettant de la relier au minitel débranché, et donc clairement visible sur l'image{% endcomment %}

### Déroulement du test

Pour ce test, j'ai d'abord allumé le Minitel seul pour établir une référence de consommation, puis j'ai connecté l'imprimante et testé ses deux modes d'impression.

Le manuel du Minitel explique que l'impression est « *un cas particulier de l'utilisation d'un périphérique branché sur la prise péri-informatique* ». Il indique deux méthodes d'impression par copie d'écran :
- « *FNCT* » + « *I* » puis « *F* » pour une imprimante travaillant avec le jeu ASCII français
- « *FNCT* » + « *I* » puis « *A* » pour une imprimante travaillant avec le jeu ASCII américain

Le manuel précise que « *les lettres sont les initiales des parties du terminal concernées par la commande* » : « *I* » pour impression, « *F* » pour ASCII français, « *A* » pour ASCII américain.

Le manuel de l'imprimante mentionne également qu'on peut appuyer directement sur le bouton rouge de l'imprimante.

Voyons ce que donnent ces méthodes en termes de consommation et de qualité d'impression.

#### Vue d'ensemble du test

Voici une vue d'ensemble de notre enregistrement de la consommation pendant le test :

{% profile "imprimante-minitel.json.gz" '{"name": "test complet", "range": "88142m1028701"}' %}
{% comment %}draft: Vue globale du test. On va décomposer{% endcomment %}

On observe plusieurs phases distinctes : l'allumage du Minitel, la connexion de l'imprimante, quelques pics de consommation correspondant aux impressions, puis deux longues périodes stables avant la déconnexion de l'imprimante et l'extinction du minitel. Regardons chaque phase en détail.

### Le Minitel seul

Avant de connecter l'imprimante, j'ai allumé le Minitel et l'ai connecté à un ordinateur pour afficher une page de texte :

{% profile "imprimante-minitel.json.gz" '{"name": "Minitel allumé, imprimante non connectée", "range": "88142m96664"}' %}
{% comment %}draft: allumage du minitel sans que l'imprimante ne soit connectée. J'ai connecté le minitel à mon ordinateur pour afficher une page de texte sur l'écran (ça ne change pas la conso car l'adaptateur usb n'est pas alimenté par le minitel mais par l'ordinateur).
On note un pic de conso au démarrage assez important, qui dépasse même la conso nominale de 35 W du minitel (on pourrait afficher ici l'image du de l'étiquette du minitel, ré-utilisée depuis le test du minitel)
L'intérêt de ce profil c'est surtout d'en conserver la puissance médiane, qu'on pourra soustraire aux autres profils pour obtenir la puissance consommée par l'imprimante plutôt que par l'ensemble minitel + imprimante.
La puissance mesurée ici, 18,8W en médiane, est légèrement supérieure aux 18,6W qu'on avait dans notre test du minitel, je n'ai pas d'explication à cette différence.{% endcomment %}

On observe un important pic de consommation au démarrage qui atteint {{ 43.6 | W }}, dépassant même la puissance nominale de {{ 35 | W }} indiquée sur le Minitel. La consommation se stabilise ensuite à {{ 18.8 | W }} en médiane. Cette valeur est légèrement supérieure aux {{ 18.6 | W }} mesurés lors de notre {% test minitel test du Minitel %}, je n'ai pas d'explication à cette légère différence.

Cette mesure nous servira de référence pour calculer la consommation de l'imprimante seule en soustrayant cette valeur des mesures suivantes.

### Connexion de l'imprimante

Lorsque j'ai branché l'imprimante sur la prise DIN à l'arrière du Minitel, j'ai entendu un bref mouvement mécanique à l'intérieur ; probablement un mouvement du rouleau de papier.

{% image "./images/imprimante-minitel-prise-din-minitel.jpg" "Imprimante branchée à l'arrière du Minitel" "300w" 300 %}
{% comment %}vue de l'arrière du minitel avec le câble de l'imprimante branché{% endcomment %}

Voici le profil de consommation au moment de la connexion :

{% profile "imprimante-minitel.json.gz" '{"name": "Connexion de l\'imprimante", "range": "184805m81401"}' %}
{% comment %}draft: Lorsque j'ai connecté l'imprimante, j'ai entendu le rouleau de l'imprimante tourner pendant quelques secondes. Le pic de conso durant 2s qu'on voit au début de cette plage correspond à ça ! Sur le reste de ce profil on regardera surtout la médiane, et sa différence comparée à la médiane du minitel seul, pour voir la conso de l'imprimante en attente. Et donc calculer combien ça consomme si on laisse l'imprimante tout le temps connectée lorsqu'on utilise le minitel. Combien de % de conso en plus ?{% endcomment %}

On observe un pic de consommation durant environ 2 secondes au moment de la connexion, correspondant au mouvement du rouleau. La consommation se stabilise ensuite à {{ 20.1 | W }} en médiane, soit {{ 20.1 | minus: 18.8 | W }} de plus que le Minitel seul. C'est la consommation de l'imprimante en veille, lorsqu'elle est connectée mais inactive.

L'imprimante dispose d'un voyant d'alimentation vert qui reste allumé en permanence lorsqu'elle est connectée à un Minitel allumé :

{% image "./images/imprimante-minitel-voyant-alimentation.jpg" "Voyant d'alimentation et bouton d'impression" "300w" 300 %}
{% comment %}gros plan sur la "touche d'impression" (l'unique bouton de l'imprimante, il est rond et rouge) et le "voyant d'alimentation" (une petite led verte) dans le coin en bas à gauche de l'imprimante. Le voyant reste tout le temps allumé quand l'imprimante est connecté au minitel allumé, même lorsque son écran est en veille.{% endcomment %}

Voici l'imprimante posée sur le Minitel, prête à imprimer :

{% image "./images/imprimante-minitel-sur-minitel-en-attente.jpg" "Imprimante en attente, posée sur le Minitel" "500w" 500 %}
{% comment %}imprimante posée au dessus du minitel, en attente. Le voyant est allumé, mais c'est très peu visible.{% endcomment %}

### Première tentative d'impression

J'ai appuyé sur le bouton rouge de l'imprimante pour lancer une première impression, mais le résultat n'a pas été celui espéré :

{% profile "imprimante-minitel.json.gz" '{"name": "Première tentative d\'impression", "range": "269322m29972"}' %}
{% comment %}draft: Cette première tentative d'impression dure moins longtemps que les suivantes, mais le papier n'est sorti que de 2 ou 3 mm, et rien n'a été imprimé ! Que s'est-il passé ? Le papier était-il mal installé ? Le début du rouleau s'était-il abîme après des années de stockage dans un lieu non chauffé ? (garage) Après cet échec, j'ai tiré sur le papier à la main et ai éliminé quelques cm de papier.{% endcomment %}

Cette première tentative dure environ {{ 30 | s }}. La consommation de l'ensemble Minitel + imprimante atteint {{ 24.1 | W }} en médiane. Malheureusement, le papier n'est sorti que de 2 ou 3 millimètres, sans rien imprimer. Le début du rouleau s'était probablement abîmé après des années de stockage dans un garage non chauffé. J'ai tiré manuellement sur le papier pour éliminer quelques centimètres de papier défraîchi.

### Impressions réussies

#### Première impression depuis le clavier

J'ai ensuite utilisé la méthode d'impression depuis le clavier du Minitel (FNCT+I puis F) :

{% profile "imprimante-minitel.json.gz" '{"name": "Première vraie impression", "range": "360298m55175"}' %}
{% comment %}draft: Première vraie impression : j'ai lancé l'impression avec la suite de touches à presser sur le clavier du minitel donnée dans le manuel de l'imprimante. La page écran du minitel s'est imprimée correctement. Pendant l'impression la lettre "R" est apparue dans le coin en haut à droite de l'écran avant le "F". Mais une partie des lignes était très claire, probablement du papier abîmé.
On remarque une conso plus élevée pendant environ 1s (léger mouvement du rouleau ?), puis 5s avec une conso similaire à l'imprimante au repos, puis l'impression qui démarre vraiment.{% endcomment %}

Cette impression dure {{ 55 | s }} et consomme {{ 0.367 | Wh€ }} pour l'ensemble Minitel + imprimante. On observe trois phases distinctes :
1. Un premier pic de consommation durant environ 1 seconde, probablement un mouvement du rouleau ;
2. Une pause d'environ 5 secondes avec une consommation similaire au repos (attente de réception des données depuis le Minitel ?) ;
3. L'impression proprement dite avec une consommation médiane de {{ 24.6 | W }} (maximum {{ 26.2 | W }}) pour l'ensemble Minitel + imprimante, soit {{ 24.6 | minus: 18.8 | W }} en médiane et {{ 26.2 | minus: 18.8 | W }} en maximum pour l'imprimante seule.

Pendant le début de l'impression, un indicateur « R » (pour « Recopie ») apparaît dans le coin en haut à droite de l'écran :

{% image "./images/imprimante-minitel-ecran-rf.jpg" "Indicateur R pendant l'impression" "250w" 250 %}
{% comment %}gros plan sur le coin en haut à droite de l'écran qui montre un caractère "R" précédant le "F" habituel.

Les "Spécifications Techniques d'Utilisation du Minitel 1B" indiquent :
Lorsque l'écran est dans le format 40 colonnes Vidéotex, on dispose de:
- en colonne 37: lettre "|" en noir sur fond blanc indiquant l'état inhibé de la prise péri-informatique;
- en colonne 38: lettre "R" en blanc sur fond noir indiquant qu'une copie d'écran est en cours;
- en colonne 39: lettre "F" ou "C" en noir sur fond blanc indiquant l'état local ou connecté. Le "C" clignote lorsque le terminal est en phase de connexion.
Le "f" est en minuscule lorsque le modem est dans l'état opposé.{% endcomment %}

Les spécifications techniques du Minitel 1B précisent que cette lettre « R » en blanc sur fond noir indique qu'une copie d'écran est en cours.

Le titre affiché en gros caractères sur l'écran est imprimé en taille normale sur le papier, avec des espaces supplémentaires pour respecter la disposition des caractères à l'écran :

{% image "./images/imprimante-minitel-impression-en-cours-titre-visible.jpg" "Début de l'impression" "500w" 500 %}
{% comment %}gros plan sur l'imprimante au dessus du minitel, en train de commencer à imprimer. On voit les 3 premières lignes et la moitié de la 4e. Les deux premières lignes sont le titre qui est affiché sur l'écran du minitel en caractères de taille double, mais est imprimé en caractère normaux sur le papier, avec des espaces supplémentaires pour respecter la disposition des caractères sur l'écran.{% endcomment %}

Sur cette première impression, certaines lignes sont très peu lisibles, le début du rouleau de papier thermique s'étant probablement dégradé :

{% image "./images/imprimante-minitel-impression-en-cours.jpg" "Papier sortant lors de la première impression" "500w" 500 %}
{% comment %}gros plan sur le papier qui sort lors de la première impression. Certaines lignes sont très peu lisibles, le papier thermique qui est resté longtemps dans l'imprimante s'est probablement dégradé sur le début du rouleau.{% endcomment %}

#### Deuxième impression depuis le clavier

J'ai immédiatement relancé une impression avec la même méthode. L'impression se poursuit jusqu'à reproduire toute la page écran :

{% image "./images/imprimante-minitel-impression-presque-finie.jpg" "Impression presque terminée" "500w" 500 %}
{% comment %}impression presque finie, vue montrant l'imprimante posée sur le minitel{% endcomment %}

C'est beaucoup plus lisible cette fois ci !

Une fois l'impression terminée, le papier s'enroule naturellement sur lui-même :

{% image "./images/imprimante-minitel-impression-finie.jpg" "Impression terminée" "500w" 500 %}
{% comment %}vue montrant l'impression terminée, avec l'imprimante posée au dessus du minitel dont on voit l'écran complet et le clavier. Le texte imprimé est très peu lisible, on aperçoit environ 5 lignes ; le papier imprimé s'enroule sur lui-même.{% endcomment %}

Il suffit de tenir et tirer vers l'avant le papier déroulé pour le détacher :

{% image "./images/imprimante-minitel-impression-finie-feuille-tenue-a-la-main.jpg" "Papier imprimé tenu déroulé" "500w" 500 %}
{% comment %}impression terminée et rouleau de papier imprimé tenu déroulé par ma main, prêt à déchirer au ras de l'imprimante.{% endcomment %}

Voici le résultat final :

{% image "./images/imprimante-minitel-impression-reussie.jpg" "Impression réussie de la page écran" "500w" 500 %}
{% comment %}photo de l'impression réussie de la page écran "combien consomme un minitel ?", qui avait été affichée pour la photo du test du minitel{% endcomment %}

On retrouve fidèlement le contenu de la page écran « Combien consomme un Minitel ? ».

Regardons maintenant l'enregistrement de la consommation :

{% profile "imprimante-minitel.json.gz" '{"name": "Deuxième impression", "range": "465176m55175"}' %}
{% comment %}draft: Deuxième impression avec la même méthode. Cette fois ci le noir des caractères imprimés est assez homogène. Ce profil est remarquablement proche du précédent : même forme générale avec le premier pic au début puis la pause de 5s avant l'impression réelle, même durée, même moyenne, même conso totale.{% endcomment %}

Ce profil est remarquablement similaire au précédent : même forme générale, même durée de {{ 55 | s }}, même consommation de {{ 0.367 | Wh€ }} pour l'ensemble Minitel + imprimante.

#### Impression via le bouton de l'imprimante

J'ai ensuite testé l'autre méthode d'impression en appuyant directement sur le bouton rouge de l'imprimante :

{% profile "imprimante-minitel.json.gz" '{"name": "Impression par appui sur le bouton de l\'imprimante", "range": "614236m43368"}' %}
{% comment %}draft: Cette fois ci j'ai testé l'autre méthode d'impression documentée : j'ai appuyé sur le bouton de l'imprimante. Cette impression est plus rapide, mais en regardant ce qui est sur le papier : surprise ! Tous les caractères accentués ont été remplacés par des caractères spéciaux. C'est très peu lisible.{% endcomment %}

Cette méthode est plus rapide : l'impression ne dure que {{ 43 | s }} au lieu de {{ 55 | s }}, et consomme {{ 0.293 | Wh€ }} pour l'ensemble Minitel + imprimante. La consommation médiane pendant l'impression est de {{ 24.7 | W }} pour l'ensemble Minitel + imprimante, similaire aux impressions précédentes.

Surprise : tous les caractères accentués sont remplacés par des caractères spéciaux sur le papier :

{% image "./images/imprimante-minitel-impression-en-cours-accents-corrompus.jpg" "Impression en cours via le bouton" "500w" 500 %}
{% comment %}impression en cours, on voit 5 lignes et demi, et les accents sont remplacés par des caractères spéciaux.{% endcomment %}

Le résultat final est très peu lisible :

{% image "./images/imprimante-minitel-impression-ratee-accents-corrompus.jpg" "Impression avec caractères accentués corrompus" "500w" 500 %}
{% comment %}photo de l'impression ratée avec des caractères spéciaux à la place de tous les caractères accentués.{% endcomment %}

Cette différence s'explique par le jeu de caractères utilisé. La méthode depuis le clavier (FNCT+I F) utilise le jeu [ASCII](https://fr.wikipedia.org/wiki/American_Standard_Code_for_Information_Interchange "Page « American Standard Code for Information Interchange » sur Wikipédia") français qui inclut les caractères accentués. Le bouton de l'imprimante semble utiliser le jeu ASCII américain qui ne comporte pas d'accents, d'où leur remplacement par des caractères spéciaux. C'est probablement l'équivalent d'une impression avec la commande FNCT+I A.

### En veille

Après les impressions, j'ai laissé le Minitel et l'imprimante allumés sans y toucher pendant 5 minutes :

{% profile "imprimante-minitel.json.gz" '{"name": "5 minutes d\'inactivité", "range": "656888m300192"}' %}
{% comment %}draft: avant de débrancher l'imprimante, j'ai laissé le minitel allumé 5 minutes sans le toucher. Au bout de 4 minutes sans activité, le minitel a supprimé l'affichage sur son écran. Je ne vois aucune variation dans la conso, donc l'imprimante reste allumée lorsque l'écran passe en veille.{% endcomment %}

La consommation reste stable à {{ 19.8 | W }} en médiane. Au bout de 4 minutes sans activité, le Minitel a éteint l'affichage de son écran, mais je n'observe aucune variation de consommation. L'imprimante reste donc alimentée même lorsque l'écran du Minitel passe en veille.

### Déconnexion

Enfin, j'ai débranché l'imprimante avant d'éteindre le Minitel :

{% profile "imprimante-minitel.json.gz" '{"name": "Déconnexion imprimante puis extinction Minitel", "range": "957079m160604"}' %}
{% comment %}draft: lorsque j'ai déconnecté l'imprimante du minitel, sa conso a diminué. On retrouve ici la médiane à 18,6W que j'avais dans l'autre test.{% endcomment %}

Lorsque j'ai déconnecté l'imprimante, la consommation a immédiatement chuté. On retrouve une médiane à {{ 18.6 | W }}, identique à celle mesurée lors du {% test minitel test du Minitel %}.

### Coût d'usage

Une impression complète (incluant les phases de préparation) dure {{ 55 | s }} et consomme {{ 0.367 | Wh€ }} pour l'ensemble Minitel + imprimante. Durant ces {{ 55 | s }}, le Minitel seul à {{ 18.8 | W }} aurait consommé {{ 18.8 | times: 55 | divided_by: 3600 | Wh }}. L'imprimante seule consomme donc {{ 0.080 | Wh }} par impression (par différence). Il faudrait {{ 0.367 | countPer€: 0.01 }} impressions complètes (Minitel + imprimante) pour dépenser un centime d'électricité, ou {{ 0.080 | countPer€: 0.01 }} impressions pour l'imprimante seule.

Le coût électrique est donc dérisoire. Le véritable enjeu économique est le coût du papier thermique : les rouleaux de 112 mm de large et 7,5 m de long étaient vendus par lot de 5 par France Télécom à l'époque. Un rouleau permettait environ 70 impressions de pages complètes.

Lorsqu'elle est connectée mais inactive, l'imprimante augmente la consommation du Minitel de {{ 20.1 | percentMore: 18.8 }}. Dans notre {% test minitel test du Minitel %}, nous avions estimé qu'une recherche de 3 minutes dans l'annuaire consommait {{ 0.940 | Wh }}. Si l'imprimante reste branchée pendant cette recherche, elle ajoutera {{ 20.1 | minus: 18.8 | times: 3 | divided_by: 60 | Wh }}. C'est dérisoire.

Si le Minitel est oublié allumé une journée complète avec l'imprimante branchée, celle-ci ajoutera {{ 20.1 | minus: 18.8 | W€PerDay }} au coût quotidien du Minitel seul ({{ 18.6 | W€PerDay }}). Sur une année, si le Minitel restait allumé en permanence avec l'imprimante connectée, le surcoût serait de {{ 20.1 | minus: 18.8 | W€PerYear }} par an. Autant la débrancher lorsqu'elle n'est pas utilisée.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cette imprimante, on pourrait :
- tester l'impression de pages contenant plus ou moins de texte pour voir si cela influence la consommation ;
- comparer avec d'autres imprimante Minitel plus anciennes, ou d'autres imprimantes sur papier thermique (tickets de caisse, fax, ...) ;
- mesurer la consommation avec un wattmètre ayant un taux d'échantillonage plus élevé pour essayer de décomposer plus précisément les différentes phases de l'impression ;
- mesurer la consommation lorsque l'imprimante est à court de papier ou en situation de bourrage.
{% endplusloin %}
