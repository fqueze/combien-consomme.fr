---
layout: post-layout.njk
title: Mesurer la consommation avec un wattmètre de laboratoire programmable ISW8001
img: ies-isw8001.jpg
date: 2025-12-14
tags: ['post']
---

Un wattmètre de laboratoire programmable permet d'enregistrer des profils de consommation avec une précision supérieure aux prises connectées, particulièrement pour les faibles puissances. Comment s'en servir pour obtenir des mesures exploitables ?

<!-- excerpt -->

## Le matériel

{% intro "ies-isw8001.jpg" "Wattmètre ISW8001 de la société IeS, affichant 39.6 V, avec une prise connectée branchée dessus" %}

Le wattmètre ISW8001 est un appareil de mesure professionnel fabriqué par IeS (Instruments Et Systemes), une société française qui a malheureusement été placée en liquidation judiciaire en novembre 2024.

Cet appareil se distingue des {% post mesurer-la-consommation-avec-shelly-plus-plug-s prises connectées Shelly %} que j'utilise habituellement par sa capacité à mesurer des consommations très faibles avec une résolution pouvant aller jusqu'à {{ 0.001 | W }}. Il permet aussi d'obtenir 2 échantillons par seconde, contre 1 seul pour les Shelly.

L'ISW8001 peut mesurer en courant alternatif comme en courant continu, ce qui en fait un outil polyvalent pour différents types d'appareils.
{% endintro %}

## Quand utiliser ce wattmètre ?

Le wattmètre ISW8001 est particulièrement utile dans plusieurs situations :

- **Mesurer des consommations inférieures à {{ 1 | W }}** : Les prises connectées Shelly ont une résolution de {{ 0.1 | W }}, ce qui les rend imprécises pour les très faibles consommations. L'ISW8001 peut descendre à {{ 0.001 | W }} de résolution ;

- **Obtenir une fréquence d'échantillonnage plus élevée** : 2 mesures par seconde contre 1 pour les Shelly, ce qui permet de mieux capturer les variations rapides ;

- **Mesurer en courant continu** : Contrairement aux prises connectées qui ne fonctionnent qu'en alternatif, l'ISW8001 accepte les deux types de courant.

Voici l'appareil vu de face :

{% image "./images/ies-isw8001-face-avant.jpg" "Face avant du wattmètre ISW8001 avec ses boutons de sélection et ses prises de sécurité" "800w" 800 %}
{% comment %}Face avant. Les boutons "W Var PF V A" permettent de choisir la valeur affichée sur l'afficheur numérique. Des LED rouges indiquent la fonction sélectionnée et le calibre sélectionné. 4 prises de sécurité pour fiches bananes sont sur la façade, et un fusible 16A.{% endcomment %}

Les boutons sur la façade permettent de choisir la grandeur affichée : puissance active (W), puissance réactive (Var), facteur de puissance (PF), tension (V) ou courant (A). Des LED rouges indiquent la fonction sélectionnée ainsi que le calibre utilisé.

Les quatre prises de sécurité pour fiches bananes permettent de brancher l'appareil. Ce type de connecteurs est standard dans le domaine des mesures électriques, particulièrement pour les mesures en courant continu avec une alimentation stabilisée de laboratoire.

Sur l'arrière se trouve notamment un port RS-232 qui permet de contrôler l'appareil et de récupérer les mesures (un adaptateur USB vers RS-232 est nécessaire sur les ordinateurs récents qui n'ont plus ce port) :

{% image "./images/ies-isw8001-face-arriere.jpg" "Face arrière du wattmètre avec le port RS-232" "800w" 800 %}
{% comment %}Face arrière, avec notamment un port rs232{% endcomment %}

## Le branchement en toute sécurité

Pour brancher un appareil sur le wattmètre, j'ai fabriqué un montage permettant d'éviter tout contact avec les parties sous tension :

{% image "./images/ies-isw8001-montage-raccordement-en-securite.jpg" "Montage de raccordement sécurisé avec un câble secteur, un bloc prise Legrand Mosaic et des cordons avec fiches bananes" "800w" 800 %}
{% comment %}Montage permettant le branchement en toute sécurité : un câble secteur récupéré sur une vieille multiprise, un bloc prise Legrand Mosaic dans une boîte de montage en saillie, et 3 cordons de test avec fiches bananes de sécurité, et des couleurs correspondant aux prises sur le wattmètre pour éviter toute erreur de branchement.{% endcomment %}

Ce montage utilise :
- Un câble secteur récupéré sur une ancienne multiprise ;
- Un bloc prise Legrand Mosaic dans une boîte de montage en saillie ;
- Trois cordons de test avec fiches bananes de sécurité ;
- Des couleurs correspondant aux prises du wattmètre pour éviter toute erreur de branchement.

## Le logiciel de collecte

### Une aventure de reverse engineering

Pour exploiter ce wattmètre, j'ai dû développer un logiciel permettant de communiquer avec lui via le port série RS-232. Le protocole de communication est documenté dans [un manuel en français](https://web.archive.org/web/20081113070619if_/http://www.instruments-systemes.fr/telechargement/NOTICE/NOT-ISW8001.DOC), mais cette documentation contient plusieurs erreurs significatives qui ont nécessité un travail de [reverse engineering](https://fr.wikipedia.org/wiki/R%C3%A9tro-ing%C3%A9nierie "Page « Rétro-ingénierie » sur Wikipédia").

Quelques exemples de problèmes rencontrés :
- Le caractère de terminaison des commandes indiqué dans le manuel (0x13) est incorrect, il faut utiliser 0x0D ;
- Le format des réponses décrit dans le manuel ne correspond pas à ce que l'appareil renvoie réellement : le manuel indique `U3 I1 W=200.0E+0`, mais l'appareil renvoie en réalité `U3=238.5E+0 I1=0.3E-3 W=0.02E+0`. La différence majeure est que l'appareil transmet systématiquement les valeurs de tension et de courant avec leur calibre, même lorsque ce n'est pas la fonction de mesure sélectionnée ;
- La commande pour mesurer le facteur de puissance documentée (COS) n'existe pas, la commande réelle est PWF.

Pour découvrir cette dernière commande, j'ai dû analyser l'exécutable Windows 3.x fourni par le fabricant. Le logiciel était distribué dans une archive au format CAB obsolète de Windows 3.x, nécessitant [des outils spécialisés](https://github.com/kyz/libmspack "libmspack sur GitHub") pour l'extraire. L'outil [strings](https://fr.wikipedia.org/wiki/Strings "Page « Strings » sur Wikipédia") ne trouvait pas la commande recherchée, j'ai donc ouvert le binaire dans un éditeur hexadécimal et repéré les commandes WATT, VAR, VOLT et AMP. Environ à mi-distance entre VAR et VOLT se trouvait `50 57 46` : **PWF** avec un "W" au milieu, totalement inattendu alors que le bouton sur la façade est simplement étiqueté "PF".

L'appareil envoie aussi des caractères de contrôle de flux (XON et XOFF) au milieu des données de mesure, qu'il faut filtrer avant de pouvoir parser les réponses.

Le code que j'ai développé est [disponible sur GitHub](https://github.com/fqueze/serial-power-profiling) et j'ai [documenté le protocole](https://github.com/fqueze/serial-power-profiling/blob/main/docs/ISW8001-PROTOCOL.md) dans le dépôt.

### L'interface de collecte

Voici l'interface web que j'ai développée pour enregistrer les mesures :

{% image "./images/ies-isw8001-screenshot.jpg" "Interface de mesure avec profil en temps réel, statistiques et contrôles de calibre" "800w" 800 %}
{% comment %}Copie d'écran de l'interface de mesure qui a été développée pour permettre des mesures faciles et de sortir les données sous forme d'un profil utilisable par le Firefox Profiler et par ce site. Une spécificité pour ce wattmètre est que l'interface comportement une case à cocher permettant d'activer ou désactiver le changement de calibre automatique, et des boutons radio permettant de visualiser le calibre actuellement utilisé mais également de le changer.{% endcomment %}

Cette interface affiche en temps réel :
- Un graphique de la consommation qui se met à jour automatiquement ;
- Des statistiques (consommation totale, durée, puissance médiane/moyenne/maximale) ;
- Les calibres actuellement utilisés pour la tension et le courant ;
- Une case à cocher pour activer ou désactiver le changement automatique de calibre.

Une spécificité intéressante : on peut forcer manuellement les calibres de tension et de courant, ce qui permet d'éviter les artéfacts de mesure lors des changements automatiques de calibre.

### Fréquence d'échantillonnage

L'appareil dispose d'un mode d'émission automatique (commande MA1) qui envoie les mesures dès qu'elles sont disponibles, toutes les 470 ms environ (environ 2,1 Hz). Envoyer des requêtes de mesure plus rapidement ne permet pas d'obtenir plus de données : c'est la limite interne de l'appareil, probablement liée au temps nécessaire pour effectuer des mesures précises sur plusieurs cycles du courant alternatif à 50 Hz.

## Exemples de mesures

### Mesurer une prise connectée Shelly

Cette première mesure montre la consommation d'une {% post mesurer-la-consommation-avec-shelly-plus-plug-s prise Shelly Plus Plug S %} :

{% profile "ies-isw8001-shelly.json.gz" '{"name": "Prise Shelly Plus Plug S", "range": "20947m55705"}' %}
{% comment %}draft: Prise shelly Plus Plug S : un leger pic de conso lorsque qu'elle est branchée, puis une conso relativement stable (malgré quelques pics) et un plateau plus haut pendant les 23s où le relai est en position active. Environ 2,5W lorsque le relai est actif, environ 2W lorsqu'il ne l'est pas.
C'est intéressant car c'est des variations trop faible pour pouvoir les mesurer avec un wattmètre moins précis.{% endcomment %}

On observe un léger pic de consommation lorsque la prise est branchée, puis une consommation relativement stable autour de {{ 2 | W }}. Pendant les 23 secondes où le relai est activé, la consommation monte à environ {{ 2.5 | W }}.

Ces variations de quelques centaines de milliwatts sont trop faibles pour être mesurées précisément avec un wattmètre moins sensible.

### Les limites : artéfacts de mesure

Lors de mesures prolongées, j'ai découvert deux problèmes récurrents avec cet appareil.

#### Variations tous les 500 échantillons

Sur cette mesure de 4 heures, on observe des baisses de consommation à intervalles réguliers :

{% profile "ies-isw8001-shelly.json.gz" '{"name": "Mesure sur 4h, avec variation tous les 500 échantillons", "range": ""}' %}
{% comment %}draft: On observe nettement sur ce graphique des consommations brièvement plus faibles à intervalle régulier. Est-ce un comportement de la prise connectée ? Attention, non ! C'est exactement tous les 500 échantillons, et c'est associé à une durée légèrement supérieure entre les échantillons. Probablement un bug du wattmètre. On pourrait essayer de contourner le problème logiciellement en ignorant ces échantillons incorrects.{% endcomment %}

Ces baisses se produisent exactement tous les 500 échantillons et sont associées à une durée légèrement supérieure entre les mesures. Il s'agit probablement d'un bug du wattmètre. On pourrait contourner le problème logiciellement en filtrant ces échantillons incorrects.

#### Pics lors des changements de calibre

Le wattmètre peut changer automatiquement de calibre pour s'adapter à la puissance mesurée. Malheureusement, ces changements génèrent des artéfacts de mesure.

Voici l'allumage d'une ampoule à incandescence de 40 W :

{% profile "ies-isw8001-40w.json.gz" '{"name": "Ampoule 40W - allumage", "range": "6596m129295"}' %}
{% comment %}draft: Mesure d'une vieille ampoule à incandescence de 40W branchée sur une lampe de chevet. On a l'impression d'observer des pics lors des deux premiers allumages. Mais en regardant de plus près le profil (cliquer sur l'icône "Ouvrir dans le Firefox Profiler"), on constate que ces pics ont lieu lors du changement automatique de calibre de 160mA à 16A, que le temps d'échantillonnage est bien plus long (on entend claquer un relai dans l'appareil), et que la valeur du courant est très excessive à presque 180A, valeur totalement impossible.
Les deux derniers allumages n'ont pas de pics, le calibre a été bloqué à 1,6A.{% endcomment %}

On observe des pics impressionnants lors des deux premiers allumages. En examinant les données de plus près, ces pics correspondent à des changements automatiques de calibre de 160 mA à 16 A. Le temps d'échantillonnage devient alors plus long (on entend claquer un relai dans l'appareil), et la valeur du courant mesurée atteint presque 180 A, ce qui est totalement impossible.

Les deux derniers allumages n'ont pas de pics car j'ai bloqué le calibre à 1,6 A.

Sur une mesure plus longue de la même ampoule avec un calibre fixe, la consommation est parfaitement stable :

{% profile "ies-isw8001-40w.json.gz" '{"name": "Ampoule 40W - 20 minutes", "range": "132028m1200629"}' %}
{% comment %}draft: Mesure sur une plus longue durée de la consommation de l'ampoule de 40W. C'est très stable !{% endcomment %}

La consommation médiane est de {{ 42.6 | W }}, très proche des 40 W nominaux.

#### Un cas réel problématique : MacBook Pro en veille

Ce problème de pics lors des changements de calibre devient particulièrement gênant avec des appareils dont la consommation oscille autour de la limite entre deux calibres. C'est le cas de mon MacBook Pro en veille, qui a justement une consommation proche de la limite entre les calibres 160 mA et 1,6 A, provoquant de nombreux changements de calibre et donc de nombreux pics aberrants.

J'ai laissé mon MacBook Pro branché sur le wattmètre toute une nuit pour observer sa consommation en veille :

{% profile "ies-isw8001-range-spikes.json.gz" '{"name": "Macbook Pro en veille", "range": "287745m28803299"}' %}
{% comment %}draft: Mon Macbook Pro est resté branché sur le wattmètre toute la nuit. En apparence il était en veille. Mais en regardant le profil, on voit que toutes les 2h sa consommation a augmenté pendant environ 50 minutes. Vu la forme générale des courbes de puissance dans ces périodes, on peut supposer qu'il a chargé sa batterie dans ces périodes. Mais il y des pics étonnants.{% endcomment %}

La consommation médiane est de seulement {{ 2.40 | W }}, mais on observe des périodes d'activité toutes les 2 heures environ, durant une cinquantaine de minutes. On peut supposer qu'il s'agit de cycles de charge de la batterie.

On remarque aussi des pics surprenants.

En zoomant sur une heure :

{% profile "ies-isw8001-range-spikes.json.gz" '{"name": "Macbook Pro en veille — zoom sur 1h", "range": "4019923m3618219"}' %}
{% comment %}draft: Zoom sur 1h, les pics sont toujours surprenants.{% endcomment %}

Ces pics sont encore plus visibles.

En zoomant davantage sur 2 minutes :

{% profile "ies-isw8001-range-spikes.json.gz" '{"name": "Macbook Pro en veille — zoom sur 2 minutes", "range": "4922494m119844"}' %}
{% comment %}draft: Si on zoome beaucoup plus, et qu'on regarde le profil dans le Firefox Profiler, on voit là aussi que les pics correspondent à des changements de calibre, avec un temps d'échantillonnage plus long. Il y a aussi des pics très excessifs sur le courant, à environ 180A.{% endcomment %}

En examinant les données dans le Firefox Profiler, on constate que ces pics correspondent là aussi à des changements automatiques de calibre, avec des valeurs de courant aberrantes autour de 180 A. Le profil contient des marqueurs indiquant les changements de calibre, ce qui permet de les identifier facilement et de les filtrer logiciellement si nécessaire.

Pour comparer avec une mesure sans ces artéfacts, j'ai refait la mesure la nuit suivante en bloquant le calibre de courant à 1,6 A :

{% profile "ies-isw8001-fixed-range.json.gz" '{"name": "Macbook Pro en veille — calibre 1.6A bloqué", "range": "m28813262"}' %}
{% comment %}draft: Mesure similaire la nuit suivante, après avoir bloqué le calibre de courant à 1,6A, ce qui devrait être largement suffisant pour mesurer la consommation d'un Macbook en veille.{% endcomment %}

Les pics aberrants ont disparu. En zoomant sur une période d'activité :

{% profile "ies-isw8001-fixed-range.json.gz" '{"name": "Macbook Pro en veille — calibre 1.6A bloqué — zoom sur 1h", "range": "8635428m3619470"}' %}
{% comment %}draft: Si on zoome sur une période d'activité, les mesures ont beaucoup plus réalistes.{% endcomment %}

Les mesures sont maintenant beaucoup plus réalistes, avec une consommation médiane de {{ 20 | W }} pendant la charge de la batterie et des variations naturelles sans pics artificiels.

## Avantages et inconvénients

### Les avantages

- **Haute précision** : Résolution jusqu'à {{ 0.001 | W }}, idéale pour les faibles consommations ;
- **Fréquence d'échantillonnage doublée** : 2 mesures par seconde contre 1 pour les prises Shelly ;
- **Versatilité** : Mesure en courant alternatif et continu ;
- **Contrôle des calibres** : Possibilité de bloquer les calibres pour éviter les artéfacts ;
- **Affichage en temps réel** : L'écran LED permet de suivre les mesures sans ordinateur.

### Les limites

- **Artéfacts de mesure** : Pics aberrants lors des changements automatiques de calibre et variations tous les 500 échantillons (filtrables logiciellement) ;
- **Prix** : Appareil professionnel coûteux (environ 1000 € neuf), souvent plus de 200 € même d'occasion ;
- **Disponibilité** : Matériel ancien qui n'était déjà plus dans les catalogues des revendeurs depuis plusieurs années, et fabricant en liquidation judiciaire depuis novembre 2024 ;
- **Branchement** : Nécessite un montage avec fiches bananes, moins pratique qu'une simple prise connectée.

{% plusloin "Conclusion" %}
- Le wattmètre ISW8001 est un excellent outil pour des mesures de laboratoire précises, particulièrement pour les consommations de veille ;
- Pour obtenir des mesures fiables, il est recommandé de bloquer les calibres manuellement lorsque la plage de consommation est connue à l'avance ;
- Pour un usage quotidien et des consommations supérieures à {{ 1 | W }}, une {% post mesurer-la-consommation-avec-shelly-plus-plug-s prise connectée Shelly %} reste plus pratique et suffisamment précise ;
- Le reverse engineering du protocole série a permis de développer une interface utilisable, mais les artéfacts de mesure nécessitent une attention particulière lors de l'analyse des profils.
{% endplusloin %}
