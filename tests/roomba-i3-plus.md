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
{% intro "roomba-i3plus.jpg" "Aspirateur robot Roomba i3 plus, avec sa tour de vidage, branché sur une prise connectée Shelly Plus Plug S" %}
Il s'agit ici d'un aspirateur robot Roomba i3 plus. L'i3 est un modèle d'entrée de gamme de la famille Roomba i.

Le « plus » dans le nom du modèle indique qu'il est livré avec une tour de vidage, qui est un deuxième aspirateur qui fait partie de la base de recharge, et transfère les poussières du petit bac à poussières de l'aspirateur vers un sac de stockage n'ayant besoin d'être vidé ou remplacé que toutes les quelques semaines.

### Méthode de mesure

L'aspirateur est branché sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur une journée

Voici un profil de consommation de l'aspirateur robot sur une période de 24h :

{% profile "roomba-i3plus.json.gz" '{"name": "Aspirateur Roomba i3 plus pendant une journée"}' %}

### En veille

Au cours de cette journée, Roomba est resté en charge sur sa base la plupart du temps, et ça donne des profils de forme assez peu intéressante. Voici par exemple une période de 12h où Roomba était sur sa base :

{% profile "roomba-i3plus.json.gz" '{"name": "Consommation en veille", "range": "43232092m43173908"}' %}

On observe une consommation très stable d'{{ 1.9 | W }} (avec un peu de bruit de fond sur la mesure) qui correspond probablement à un maintient de la charge de la batterie, pour s'assurer qu'elle soit à 100% lorsqu'on lance une tâche d'aspiration.

On peut aussi remarquer deux pics à environ {{ 4 | W }}, qui correspondent probablement à des moments où le logiciel de l'aspirateur fait quelque chose (recherche de mises à jour ?).

Cette consommation en veille représente {{ 45 | Wh€ }} par jour, soit {{ 45 | Wh€PerMonth }} par mois ou {{ 45 | Wh€PerYear }} par an.

### Première tâche d'aspiration

Pour ce test, j'ai limité la tâche à une seule pièce. Roomba a donc aspiré uniquement le séjour (soit environ 20m2).

{% profile "roomba-i3plus.json.gz" '{"name": "Première tâche d\'aspiration", "range": "21377578m4979795"}' %}
 On observe des pics répétés qui consomment beaucoup plus que la consommation pendant le reste du temps ; ces pics correspondent aux passages de l'aspirateur sur sa base pour vider son bac à poussière. En dehors des pics, la consommation est quasi nulle pendant l'aspiration, et stable à environ {{ 25 | W }} pendant la phase de recharge.

Regardons maintenant plus en détail, en commençant par le démarrage d'une tâche :
{% profile "roomba-i3plus.json.gz" '{"name": "Démarrage", "range": "21377578m214618"}' %}
Au démarrage, la consommation augmente à environ {{ 4 | W }} pendant environ 30 secondes. Une fois que le robot a quitté la base, la consommation de la base devient quasi nulle (on voit la puissance médiane à {{ 0.1 | W }}).

Regardons maintenant la consommation lors du vidage :
{% profile "roomba-i3plus.json.gz" '{"name": "Vidage et redémarrage (batterie pleine)", "range": "21594126m41099"}' %}

Il s'agit ici du premier vidage (la batterie est encore presque pleine). On observe plusieurs étapes, au cours desquelles la consommation :
- augmente tout doucement pendant les 3 premières secondes pendant lesquelles on n'entend rien.
- augmente ensuite rapidement pendant 6 secondes (on autant l'aspirateur de la base qui fonctionne de plus en plus fort).
- reste à son maximum (avec un bruit d'aspirateur de la base également à son maximum) pendant environ 4 secondes. Je pense que la durée de cette phase dépend de la quantité de poussières à sortir du bac.
- redescend à son niveau de lorsque l'aspirateur était en veille, et y reste pendant 22 secondes jusqu'à ce que l'aspirateur quitte à nouveau sa base. C'est probablement le temps utilisé par l'informatique embarquée pour décider de la suite du parcours du robot.

Voici maintenant un des vidages suivants :
{% profile "roomba-i3plus.json.gz" '{"name": "Vidage et redémarrage (courte recharge)", "range": "21764565m38830"}' %}
La forme globale du profil est similaire, mais l'aspirateur se recharge pendant 20 secondes lors de la dernière étape, avec une consommation d'environ {{ 27 | W }} pendant ce temps.

Regardons finalement la consommation lorsque la tâche se termine :
{% profile "roomba-i3plus.json.gz" '{"name": "Fin de tâche et recharge", "range": "24378994m1970890"}' %}
L'aspirateur se vide ici une dernière fois, puis se recharge pendant un peu plus de 32 minutes. La consommation lors de la recherche ({{ 14.3 | Wh }}) donne une idée de ce qui a été consommé par l'aspirateur lorsqu'il était en déplacement.

### Deuxième aspiration, avec un filtre propre

J'ai trouvé lors de la première tâche d'aspiration que Roomba retournait très souvent à sa base pour se vider. La pièce était très sale et il y a eu beaucoup de poussières, miettes et poils de chat à aspirer, mais tout de même, cela m'a semblé un peu excessif. J'ai donc nettoyé le filtre et les capteurs de détection de bac plein, et relancé une tâche d'aspiration.

{% profile "roomba-i3plus.json.gz" '{"name": "Deuxième tâche d\'aspiration", "range": "27056424m4864338"}' %}

La durée totale de la tâche est presque identique à celle de la première tâche, mais la consommation totale ({{ 19.2 | Wh }}) n'est que 41,3% de ce qu'elle était la première fois ({{ 46.5 | Wh }}). La phase de recharge finale dure environ 33 minutes et consomme {{ 14.3 | Wh }}, ce qui est identique à la recharge à l'issue de la première tâche.

Je ne saurai pas (du moins cette fois ci !) si cette grosse différence est causée par mon nettoyage du filtre et des capteurs, ou si c'était car la pièce avait déjà été aspirée une première fois (honnêtement, ça n'avait pas l'air propre !). Probablement un peu des deux.

### Sur un an

{{ 14.3 | Wh }} de recharge pour compenser l'énergie consommée par 47 (première tâche) à 50 (deuxième tâche) minutes de fonctionnement sur batterie, soit 17 à {{ 18 | W }} en moyenne.

Si on suppose trois nettoyages de deux heures par semaine, ce qui fait l'équivalent d'un peu plus d'une heure de nettoyage par jour, cela nous donne {{ 17.7 | Wh€ }} consommé en moyenne par jour, ou {{ 17.7 | Wh€PerYear }} par an.

Si l'on prend en compte les passages à la base pour le vidage du bac de poussière, la consommation est nettement plus variable selon qu'on se base sur la première ou deuxième tâche mesurée, car l'aspirateur de la base consomme beaucoup plus que celui inclu dans le robot. La consommation moyenne mesurée était de {{ 46.5 | divided_by: 47 | times: 60 | W }} pour la première tâche et de {{ 19.2 | divided_by: 50 | times: 60 | W }} pour la seconde. Si l'on suppose toujours une heure de nettoyage par jour en moyenne, cela nous donne une fourchette de {{ 23.0 | Wh€ }} à {{ 59.4 | Wh€ }} par jour, ou de {{ 23.0 | Wh€PerYear }} à {{ 59.4 | Wh€PerYear }} par an.

Il est donc très possible que la consommation lors du nettoyage, même en utilisant la tour de vidage, soit inférieure à la consommation de veille, qui était estimée à {{ 45 | Wh€PerYear }} par an.

{% plusloin %}
On pourrait :
- aspirer plus de pièces, ce qui augmenterait le temps passé par le robot à faire des aller retour sans aspirer pour aller vider le bac à la base. On verrait ainsi l'influence de la circulation sans aspiration sur la consommation
- mesurer la consommation d'une tâche de cartographie (lors de ces tâches, le robot ne fait que se déplacer partout pour explorer et créer une carte permettant ensuite depuis l'appli sur le téléphone de demander l'aspiration d'une pièce en particulier)
- comparer avec un aspirateur similaire sans tour de vidage.
- comparer avec d'autres modèles, ou d'autres marques d'aspirateurs robot.
{% endplusloin %}
