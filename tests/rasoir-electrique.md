---
layout: test-layout.njk
title: un rasoir électrique
img: rasoir-electrique.jpg
date: 2026-03-06
tags: ['test']
---

Le rasage électrique est un geste fréquent de l'hygiène masculine. Quel est le coût en électricité de ce rituel régulier ?

<!-- excerpt -->

{% tldr %}
- La consommation annuelle sera de {{ 0.327 | times: 122 | Wh€ }} en se rasant tous les 3 jours et en rechargeant le rasoir après chaque rasage.
- La recharge après un rasage de 8 minutes 30 consomme {{ 0.327 | Wh }} : il faudrait {{ 0.327 | countPer€: 0.01 }} rasages pour dépenser un centime.
- La recharge complète d'une batterie vide consomme {{ 2.85 | Wh }} : il faudrait {{ 2.85 | countPer€: 0.01 }} recharges complètes pour dépenser un centime.
- La puissance maximale mesurée est de {{ 3.2 | W }}, très loin des 9 W annoncés sur le chargeur.
- La consommation en veille est indétectable par la prise connectée : on peut oublier le rasoir branché sans culpabilité.
{% endtldr %}

{% comment %}
Notes from draft:
lorsque j'ai voulu me raser ce matin, impossible, la batterie était vide. c'était l'occasion de mesurer la consommation de sa recharge. Pour avoir plus de données de consommation, j'ai ensuite essayé de le remettre en charge immédiatement après alors que la batterie était pleine. Ensuite je me suis rasé, et j'ai remis en charge. On a donc l'info de combien mon rasage a consommé. Lorsque le rasoir est plein et reste branché la conso était tellement faible que ma prise connectée a toujours indiqué 0. Du coup j'aurai moins mauvaise conscience d'oublier parfois ce rasoir branché pendant plusieurs jours lorsque je le mets en charge à la fin d'un rasage... Je serais quand même curieux de mesurer la conso à vide du chargeur avec un wattmètre plus précis.
{% endcomment %}

## Le matériel

{% intro "rasoir-electrique.jpg" "Rasoir électrique Philips Series 5000 S5530" %}

Le Philips Series 5000 est un rasoir électrique à trois têtes rotatives, un modèle courant que l'on trouve dans beaucoup de salles de bain. Il fonctionne sur batterie rechargeable, avec un petit chargeur secteur.

Comme pour le {% test casque-sans-fil-reduction-de-bruit casque sans fil Sony %} ou le {% test velo-cargo vélo cargo électrique %}, on mesure ici la consommation d'un appareil à batterie lithium-ion dont la recharge est la seule consommation électrique.

### Méthode de mesure

Le chargeur du rasoir est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Informations fournies par le fabricant

Les caractéristiques électriques du chargeur sont inscrites en creux dans le plastique :

{% image "./images/rasoir-electrique-etiquette-chargeur.jpg" "Inscriptions en creux sur le chargeur HQ8505 : INPUT 100-240V ~50/60Hz 9W, OUTPUT 15V 5.4W" "500w" 500 %}
{% comment %}TYPE: HQ8505 AC/DC ADAPTER PHILIPS
INPUT: 100-240v ~50/60Hz 9W
OUTPUT: 15V 5.4W{% endcomment %}

On peut y lire « *INPUT: 100-240V ~50/60Hz 9W* » et « *OUTPUT: 15V 5.4W* ». Le chargeur accepte donc n'importe quelle tension secteur dans le monde, et consomme au maximum 9 W côté prise pour fournir 5,4 W au rasoir. Le rendement théorique maximal est de 60 %.

Les inscriptions sur le rasoir lui-même, en encre claire sur le plastique noir, confirment ces valeurs :

{% image "./images/rasoir-electrique-etiquette-rasoir.jpg" "Inscriptions sur le rasoir Philips S5530 : 15V 5.4W, Made in Netherlands, IPX7" "500w" 500 %}
{% comment %}PHILIPS
S5530
15V 5.4W{% endcomment %}

On y lit « *15V 5.4W* », cohérent avec la sortie du chargeur. Le rasoir est aussi certifié [IPX7](https://fr.wikipedia.org/wiki/Indice_de_protection "Page « Indice de protection » sur Wikipédia"), ce qui signifie qu'il peut être rincé sous l'eau.

### Recharge d'une batterie vide

Ce matin, impossible de se raser : la batterie était vide. Le témoin orange en bas du rasoir clignotait pour l'indiquer :

{% image "./images/rasoir-electrique-vide.jpg" "Témoin orange clignotant indiquant une batterie faible" "300w" 300 %}
{% comment %}lorsque j'ai pris le rasoir en main pour me raser, impossible, la batterie était faible, et le témoin orange clignotait pour l'indiquer{% endcomment %}

C'était l'occasion rêvée de mesurer la consommation d'une recharge complète. J'ai branché le rasoir sur la prise connectée :

{% image "./images/rasoir-electrique-en-charge-sur-shelly.jpg" "Le rasoir branché sur la prise connectée Shelly Plus PlugS pendant la recharge" "700w" 700 %}

Pendant la charge, le rasoir affiche une animation lumineuse qui semble indiquer la progression. Au début de la recharge, les barres s'animent de 0 à 3 :

{% image "./images/rasoir-electrique-anim0.jpg" "Animation de charge : aucune barre allumée" "300w" 300 %}

{% image "./images/rasoir-electrique-anim1.jpg" "Animation de charge : une barre allumée" "300w" 300 %}

{% image "./images/rasoir-electrique-anim2.jpg" "Animation de charge : deux barres allumées" "300w" 300 %}

{% image "./images/rasoir-electrique-anim3.jpg" "Animation de charge : trois barres allumées" "300w" 300 %}

La recharge complète de la batterie vide a duré environ une heure :

{% profile "rasoir-electrique.json.gz" '{"name": "recharge complète", "range": "13410m3793126"}' %}
{% comment %}draft: consommation pour la recharge complète de la batterie quand elle est vide, on voit 2 parties différentes dans le profil, sur lesquelles on va zoomer.{% endcomment %}

La consommation totale est de {{ 2.85 | Wh }}. On observe deux phases bien distinctes : une longue phase de charge stable qui occupe la majorité du temps, suivie d'une phase de fin de charge où la puissance décroît progressivement. La puissance maximale mesurée est de {{ 3.2 | W }}, très loin des 9 W annoncés sur le chargeur.

### En détail

#### Phase de charge stable

La première phase dure environ 55 minutes :

{% profile "rasoir-electrique.json.gz" '{"name": "recharge stable", "range": "13410m3286062"}' %}
{% comment %}draft: premier partie qui dure longtemps avec une puissance stable très légèrement croissante de 2,8W à 3,1W{% endcomment %}

On observe une lente montée de {{ 2.8 | W }} à environ {{ 3.1 | W }} sur toute la durée. C'est un comportement typique de la charge d'une batterie lithium-ion : le chargeur maintient un courant quasi constant, et comme la tension de la batterie augmente progressivement au fur et à mesure qu'elle se remplit, la puissance augmente légèrement. Cette phase représente {{ 2.59 | Wh€ }}, soit {{ 2.59 | percent: 2.85 }} de la consommation totale de la recharge.

#### Fin de charge

La seconde phase dure environ 8 minutes, avec une puissance qui décroît progressivement depuis {{ 3 | W }} jusqu'à zéro :

{% profile "rasoir-electrique.json.gz" '{"name": "fin de charge", "range": "3299472m507065"}' %}
{% comment %}draft: Fin de la charge, avec une décroissance marquée{% endcomment %}

La batterie a atteint sa tension maximale, et le chargeur réduit le courant pour ne pas l'endommager. C'est la phase dite de « charge à tension constante », classique pour les batteries lithium-ion. Cette fin de charge ne consomme que {{ 0.262 | Wh€ }}.

### Recharger un rasoir déjà chargé

Par curiosité, j'ai immédiatement rebranché le rasoir alors que sa batterie était pleine :

{% profile "rasoir-electrique.json.gz" '{"name": "déjà chargé", "range": "4063419m82078"}' %}
{% comment %}draft: profil montrant ce qui se passe lorsqu'on rebranche sur le chargeur le rasoir alors qu'il est déjà chargé. 3s de charge à 2,7W suivies d'1min15 de décroissance rapide{% endcomment %}

On observe un bref pic à {{ 2.7 | W }} pendant environ 3 secondes, le temps que le chargeur détecte l'état de la batterie, suivi d'une décroissance rapide vers zéro en un peu plus d'une minute. Au total, {{ 0.0313 | Wh€ }} consommés. Bonne nouvelle : rebrancher un rasoir déjà chargé ne consomme quasi rien.

### En veille

Lorsque le rasoir reste branché après la fin de la charge, la prise connectée a systématiquement indiqué {{ 0 | W }}. La consommation résiduelle est donc inférieure à la résolution de mesure de la {% post mesurer-la-consommation-avec-shelly-plus-plug-s Shelly Plus PlugS %}.

On peut donc oublier son rasoir branché quelques jours sans culpabilité. Pour les curieux, il faudrait un wattmètre plus précis pour quantifier cette consommation résiduelle.

### Charge après un rasage

Après m'être rasé (barbe de 3 jours, environ 8 minutes 30 d'utilisation), j'ai remis le rasoir en charge. L'animation de charge alternait cette fois entre 2 et 3 barres, confirmant que la batterie n'était que légèrement déchargée.

La recharge a duré environ 9 minutes, à peine plus que le temps de rasage :

{% profile "rasoir-electrique.json.gz" '{"name": "charge après rasage de 8min30", "range": "4738594m539238"}' %}
{% comment %}draft: après un rasage de 8min30 (barbe de 3 jours) le rasoir remis en charge s'est chargé en 9min, à peine plus que le temps d'utilisation. La charge à pleine puissance dure 2min50, suivie d'une fin de charge à puissance décroissante d'un peu plus de 6 minutes.{% endcomment %}

La consommation est de {{ 0.327 | Wh€ }}. On retrouve les deux phases observées lors de la recharge complète : environ 2 minutes 50 de charge à pleine puissance autour de {{ 3.2 | W }}, suivies d'un peu plus de 6 minutes de décroissance progressive. Le profil ressemble à une version miniature de la recharge complète, avec la phase stable beaucoup plus courte.

### Coût d'usage

Recharger le rasoir après un rasage consomme {{ 0.327 | Wh }} : il faudrait {{ 0.327 | countPer€: 0.01 }} recharges pour dépenser un centime d'électricité.

Recharger une batterie complètement vide consomme {{ 2.85 | Wh }} : il faudrait {{ 2.85 | countPer€: 0.01 }} recharges complètes pour dépenser un centime.

En se rasant tous les 3 jours (soit environ 122 rasages par an) et en rechargeant après chaque rasage, la consommation annuelle sera de {{ 0.327 | times: 122 | Wh€ }}.

C'est une consommation totalement dérisoire.

### Conseils pour l'autoconsommation photovoltaïque

Avec une puissance maximale de {{ 3.2 | W }}, le chargeur du rasoir est compatible avec n'importe quelle installation photovoltaïque, même la plus modeste, même par temps très couvert.

Pour maximiser l'autoconsommation, il suffit de brancher le rasoir après le rasage du matin. Sauf peut-être en plein hiver quand il fait encore nuit au moment de partir au travail.

Cela dit, avec un coût électrique de {{ 0.327 | Wh€ }} par rasage, l'enjeu économique est inexistant. L'intérêt est purement symbolique.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de ce rasoir, on pourrait :
- mesurer la consommation d'un rasage d'une barbe d'un seul jour, pour vérifier si se raser tous les 3 jours économise réellement de l'énergie par rapport à un rasage quotidien (barbe plus longue = rasage plus long, mais moins fréquent) ;
- mesurer combien de rasages on peut faire sur une seule charge complète de la batterie, et déterminer s'il est préférable de recharger après chaque rasage ou d'attendre que la batterie soit vide ;
- comparer avec un rasoir électrique directement raccordé au secteur (sans batterie) ;
- mesurer la consommation résiduelle du chargeur branché à vide avec {% post mesurer-la-consommation-avec-un-wattmetre-de-laboratoire-isw8001 un wattmètre de laboratoire plus précis %} ;
- comparer les profils de charge de différents appareils à batterie lithium-ion ({% test casque-sans-fil-reduction-de-bruit casque sans fil %}, {% test velo-cargo vélo cargo %}, rasoir) pour comprendre les différences de comportement.
{% endplusloin %}
