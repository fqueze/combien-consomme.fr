---
layout: test-layout.njk 
title: un aspirateur robot Roomba i3 plus
img: roomba-i3plus.jpg
date: 2024-03-26
tags: ['test']
---

Un aspirateur connecté est très pratique, mais quelle consommation supplémentaire cause-t-il ?
<!-- excerpt -->

## Le matériel
<div id="Introduction">
<div>

Il s'agit ici d'un aspirateur robot Roomba i3 plus. L'i3 est un modèle d'entrée de gamme de la famille Roomba i.

Le « plus » dans le nom du modèle indique qu'il est livré avec une tour de vidage, qui est un deuxième aspirateur qui fait partie de la base de recharge, et transfère les poussières du petit bac à poussières de l'aspirateur vers un sac de stockage n'ayant besoin d'être vidé ou remplacé que toutes les quelques semaines.

### Méthode de mesure

L'aspirateur est branché sur [une prise connectée Shelly Plus PlugS]({{ '/posts/mesurer-la-consommation-avec-shelly-plus-plug-s/' | url }}) qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.

</div>
{% image "./images/roomba-i3plus.jpg" "Aspirateur robot Roomba i3 plus, avec sa tour de vidage, branché sur une prise connectée Shelly Plus Plug S" "512w" 512 %}
</div>

## Consommation

### Sur une journée

Voici un profil de consommation de l'aspirateur robot sur une période de 24h :

{% profile "roomba-i3plus.json.gz" '{"name": "Aspirateur Roomba i3 plus pendant une journée"}' %}

### En veille

Au cours de cette journée, Roomba est resté en charge sur sa base la plupart du temps, et ça donne des profils de forme assez peu intéressante. Voici par exemple une période de 12h où Roomba était sur sa base :

{% profile "roomba-i3plus.json.gz" '{"name": "Consommation en veille", "range": "43232092m43173908"}' %}

On observe une consommation très stable d'{{ 1.9 | W }} (avec un peu de bruit de fond sur la mesure) qui correspond probablement à un maintient de la charge de la batterie, pour s'assurer qu'elle soit à 100% lorsqu'on lance une tâche d'aspiration. On peut aussi remarquer deux pics à environ {{ 4 | W }}, qui correspondent probablement à des moments où le logiciel de l'aspirateur fait quelque chose (recherche de mises à jour ?).

Cette consommation en veille représente {{ 45 | Wh€ }} par jour, soit {{ 45 | Wh€PerMonth }} par mois ou {{ 45 | Wh€PerYear }} par an.

### Première tâche d'aspiration

Pour ce test, j'ai limité la tâche à une seule pièce. Roomba a donc aspiré uniquement le séjour (soit environ 20m2).

{% profile "roomba-i3plus.json.gz" '{"name": "Première tâche d\'aspiration", "range": "21377578m4979795"}' %}



{% profile "roomba-i3plus.json.gz" '{"name": "Démarrage", "range": "21377578m214618"}' %}

{% profile "roomba-i3plus.json.gz" '{"name": "Vidage et redémarrage (batterie pleine)", "range": "21594126m41099"}' %}

{% profile "roomba-i3plus.json.gz" '{"name": "Vidage et redémarrage (courte recharge)", "range": "21764565m38830"}' %}

{% profile "roomba-i3plus.json.gz" '{"name": "Fin de tâche et recharge", "range": "24378994m1970890"}' %}

### Deuxième aspiration, avec un filtre propre

J'ai trouvé lors de la première tâche d'aspiration que Roomba retournait très souvent à sa base pour se vider. La pièce était très sale et il y a eu beaucoup de poussières, miettes et poils de chat à aspirer, mais tout de même, cela m'a semblé un peu excessif. J'ai donc nettoyé le filtre et les capteurs de détection de bac plein, et relancé une tâche d'aspiration.

{% profile "roomba-i3plus.json.gz" '{"name": "Deuxième tâche d\'aspiration", "range": "27056424m4864338"}' %}

La durée totale de la tâche est presque identique à celle de la première tâche, mais la consommation totale ({{ 19.2 | Wh }}) n'est que 41,3% de ce qu'elle était la première fois ({{ 46.5 | Wh }}).

Je ne saurai pas (du moins cette fois ci !) si cette grosse différence est causée par mon nettoyage du filtre et des capteurs, ou si c'était car la pièce avait déjà été aspirée une première fois (honnêtement, ça n'avait pas l'air propre !). Probablement un peu des deux.

