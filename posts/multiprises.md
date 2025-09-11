---
layout: post-layout.njk 
title: Toutes les multiprises ne se valent pas
date: 2025-09-11
img: multiprise-legrand-mini.jpg
tags: ['post']
---

On entend souvent dire que les multiprises peuvent être dangereuses, et pourtant on en a tous chez nous. Mythe ou réalité ? Regardons à l'intérieur...
<!-- excerpt -->

## Ça aurait pu mal finir...

{% intro "multiprise-dangereuse.jpg" "Multiprise en apparence correcte" %}

### Pour la petite histoire

Mon père vient me voir un peu paniqué : il vient de brancher un chargeur de batterie sur une multiprise et... il n'y a plus de courant. Il a regardé les disjoncteurs sur le tableau électrique, mais aucun n'était baissé. Il n'y a donc pas eu de surconsommation ou de court-circuit.

Je viens voir le tableau électrique, et constate que l'interrupteur différentiel de 30mA a sauté. Je le remets en position « ON » et vais voir le branchement problématique.

Là, tout fonctionne, et je ne vois vraiment pas comment le chargeur de batterie qui venait d'être branché aurait pu faire sauter le différentiel, car il bénéficie d'une double isolation, et n'est donc pas relié à la terre.
{% endintro %}

La seule chose inhabituelle étant l'utilisation de la multiprise, on la retire du circuit. Elle semble pourtant d'assez bonne facture. Bizarre.

Perplexe, je pars avec la multiprise à la main, et lorsque j'explique à ma mère que le disjoncteur a sauté mais qu'on ne sait pas pourquoi, je me rends compte que deux des trois broches de terre de la multiprise bougent, et peuvent facilement s'enfoncer :  
{% image "./images/multiprise-dangereuse-broches-de-terre-enfoncees.jpg" "Vue rapprochée montrant les deux broches de terre enfoncées dans le boîtier de la multiprise" "500w" 500 %}

Voilà donc l'explication ! Ce n'est pas le chargeur de batterie qui a provoqué le défaut électrique, mais la multiprise qui est abîmée.

### Démontage

Curieux, je démonte la multiprise en question pour voir comment le défaut a pu se produire. Voici le problème clairement visible :  
{% image "./images/multiprise-dangereuse-fixation-plastique-cassees.jpg" "Intérieur de la multiprise démontée montrant les fixations en plastique cassées qui maintenaient la plaque métallique de terre" "500w" 500 %}

Les broches de terre sont reliées à l'intérieur de la multiprise par une plaque métallique. Cette plaque tient en place avec quelques tout petits plots de plastique fondus. Il a suffi que quelqu'un branche un appareil à l'envers et force un peu avant de se rendre compte de son erreur pour que ces minuscules plots en plastique cassent. Conception mauvaise. Vraiment très mauvaise.

### Attention, danger ! ☠

Mais il y a pire encore ! Lorsque l'on regarde la multiprise dans son ensemble, on voit...  
{% image "./images/multiprise-dangereuse-court-circuit-phase.jpg" "Plaque métallique de terre détachée entrant en contact avec la barre de phase (fil marron), créant un danger mortel" "700w" 700 %}  
... que la plaque métallique assurant les connexions à la terre, lorsqu'elle se détache, vient en contact non pas avec les deux rangées de bornes des prises, mais avec une seule, et qu'il s'agit de celle connectée à un fil marron, c'est-à-dire la phase !

Là, ça devient vraiment très dangereux : si la terre avait été en court-circuit avec les deux barres métalliques, les plombs auraient sauté. Même des vieux fusibles d'une installation ancienne auraient fait l'affaire pour protéger les utilisateurs. Mais en étant en court-circuit avec uniquement la phase, cela veut dire que les bornes de terre qui dépassent des prises sont toutes directement à la phase, et que si quelqu'un les touche... c'est comme s'il mettait sa main directement sur un fil sous tension ! Là, il ne reste que le disjoncteur différentiel (ou une bonne liaison à la terre de la maison) pour protéger les occupants. Heureusement que le tableau électrique de mes parents a été rénové récemment pour y ajouter des différentiels !

Cette multiprise a bien évidemment atterri à la poubelle juste après avoir pris les photos.

## Un modèle de grande marque

Comparons maintenant avec une multiprise similaire, mais d'une grande marque française :  
{% image "./images/multiprise-legrand.jpg" "Multiprise Legrand de qualité supérieure, extérieur" "700w" 700 %}

Au démontage, on constate que la plaque métallique qui relie les bornes de terre est séparée des barrettes de phase et neutre par les blocs en plastique tenant en place les obturateurs des prises.  
{% image "./images/multiprise-legrand-interieur.jpg" "Intérieur de la multiprise Legrand montrant la séparation sécurisée entre la plaque de terre et les barres de phase/neutre" "700w" 700 %}  
Mieux encore, les supports des obturateurs (les pièces en plastique bleu) disposent d'un petit renfort au niveau des broches de terre des prises, pour s'assurer qu'elles ne puissent pas bouger.

{% image "./images/multiprise-legrand-obturateurs.jpg" "Détail des obturateurs montés sur ressort avec renforts au niveau des broches de terre" "300w" 300 %}  

Plutôt que d'être un morceau de plastique flexible qui se déforme lorsqu'on branche une prise (et qui durcit avec le temps au point qu'il arrive un moment où on n'arrive plus à brancher quoi que ce soit), les obturateurs sont ici montés sur ressort.

La conception est excellente : quelle que soit la force appliquée sur les bornes de terre, il ne pourra pas y avoir de court-circuit.


{% plusloin "Conclusion" %}
- Deux multiprises en apparence très similaires sont à l'intérieur très différentes.
- La première, de marque inconnue, est tellement dangereuse qu'il ne faut vraiment pas l'acheter, et que si hélas on en possède déjà un ou plusieurs exemplaires, il sera souhaitable de s'en débarrasser là où elle ne pourra nuire à personne, c'est-à-dire au fond d'une poubelle.
- La seconde, d'une grande marque réputée, probablement un peu plus coûteuse à l'achat, ne présente absolument aucun danger, même en cas d'utilisation maladroite.
{% endplusloin %}
