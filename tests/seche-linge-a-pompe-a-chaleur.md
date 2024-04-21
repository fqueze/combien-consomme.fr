---
layout: test-layout.njk 
title: un sèche-linge avec pompe à chaleur
img: seche-linge.jpg
date: 2024-04-15
tags: ['test']
---

Le sèche-linge, un appareil qui chauffe, fait partie des gros consommateurs d'énergie d'une maison. Au point qu'il est même souvent recommandé d'étendre son linge sur une corde lorsque la météo le permet. Mythe ou réalité ?
<!-- excerpt -->

## Le matériel
{% intro "seche-linge.jpg" "Sèche-linge Samsung" %}
Le sèche-linge utilisé pour ce test est un modèle Samsung récent, équipé d'une pompe à chaleur. D'après l'étiquette énergétique affichée sur les documents commerciaux, c'est un modèle ayant une très bonne efficacité énergétique. Eh oui, comme on l'a acheté neuf, on a pris ce qui nous paraissait le mieux !

Il a de nombreux programmes, mais la plupart du temps on ne se casse pas trop la tête. On sort le linge de la {% test machine-a-laver machine à laver %}, on met le coton très humide au sèche-linge, et le synthétique va sécher naturellement sur un tancarville.

Notre sèche-linge tourne donc presque toujours sur le programme « coton ». C'est ce que nous testerons aujourd'hui.

### Méthode de mesure

Le sèche-linge est branché sur une prise de courant qui a une ligne dédiée allant jusqu'au tableau électrique.

{% post mesurer-la-consommation-avec-shelly-em Le tableau électrique contient un module Shelly EM %} qui mesure la consommation sur les lignes dédiées au lave-linge et au sèche-linge.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

### Sur un cycle complet

Voici le profil d'un sèchage :
{% profile "seche-linge-coton.json.gz" '{"name": "Un sèchage au programme « coton »"}' %}

Les consommations médianes, moyennes, et maximales sont proches les unes des autres.

Le cycle a duré au total environ 1 heure 40, alors qu'initialement il était prévu pour durer 3h10, comme on peut le voir sur la photo :
{% image "./images/seche-linge-programme.jpg" "Programme sélectionné : coton, durée prévue 3:10" "512w" 512 %}

Ceci s'explique car le sèche-linge utilise une sonde d'humidité pour décider quand le linge est suffisamment sec pour qu'il puisse s'arrêter.

La consommation et le coût totaux, {{ 789 |  Wh€ }}, sont très proches de la consommation et du coût de {% test machine-a-laver la lessive qui a précédé %}.

### En détail
Regardons plus en détail la forme du profil, et décomposons les différentes phases.

#### Démarrage

Le cycle de séchage semble démarrer par quelques rotations de tambour et probablement un peu de ventilateur. Cette période dure environ 2 minutes :

{% profile "seche-linge-coton.json.gz" '{"name": "Démarrage…", "range": "83677m125636"}' %}

#### Séchage

Le séchage en lui même présente une consommation très régulière :

{% profile "seche-linge-coton.json.gz" '{"name": "Séchage", "range": "203192m5917975"}' %}

Ce graphique montre une courbe très régulière. On démarre le séchage par une consommation d'environ {{ 350 | W }}, qui monte tout doucement pendant 1 heure 15 jusqu'à une consommation maximale de {{ 534 | W }} avant de redescendre lentement (en 20 minutes) jusqu'à {{ 500 | W }}.

L'évolution du taux d'humidité et de la température du linge au cours du cycle explique probablement ces variations lentes.

#### Arrêt

À la fin du cycle, on observe à nouveau 3 rotations de tambour, et pour finir une toute petite consommation (inférieure à {{ 2 | W }}) pendant environ 25 secondes. Ça doit être le moment où le sèche-linge nous joue une petite musique pour nous signaler qu'il a fini, avant de s'éteindre complètement.

{% profile "seche-linge-coton.json.gz" '{"name": "Fin du cycle", "range": "6116616m86471"}' %}

### Un cycle plus court

Voici un autre profil de séchage :
{% profile "seche-linge-cycle-court.json.gz" '{"name": "Un sèchage plus court"}' %}

Les phases de démarrage et d'arrêt du cycle ressemblent beaucoup à celles du profil étudié précédemment. Sur la phase de chauffage, on peut observer un pic de démarrage à {{ 1346.2 | W }}, qui n'est pas surprenant pour un démarrage de moteur électrique (rotation du tambour).

Je ne me souviens plus exactement si c'était un séchage sur le programme synthétique, ou si j'ai relancé un cycle après avoir trouvé quelques vêtements encore humides à la fin d'un précédent cycle, mais on peut constater que ce cycle n'a duré que 40 inutes, et a utilisé beaucoup moins d'énergie ({{ 248 | Wh }}, contre {{ 789 | Wh }} pour le cycle étudié précédemment ; 3,2 fois moins).

{% profile "seche-linge-cycle-court.json.gz" '{"name": "Phase de chauffe", "range": "134552m2216151"}' %}

La consommation maximale pendant la phase de chauffe se limite ici à {{ 442 | W }}, contre {{ 534 | W }} pour le cycle précédent.

### Conseils pour l'autoconsommation photovoltaïque

La consommation totale du séchage est élevée, mais elle est bien répartie sur tout le cycle de séchage, ce qui fait qu'il est assez facile d'utiliser une électricité auto-produite pour sécher son linge avec un sèche-linge d'une efficacité similaire à celui testé, même si la puissance totale de l'installation photovoltaïque est limitée ou si quelques nuages passent dans le ciel.

{% plusloin %}
Pour comprendre de façon plus détaillée la consommation d'un sèche-linge, on pourrait :
- mesurer la consommation des différents programmes de ce sèche-linge ;
- observer l'impact du choix de la vitesse d'essorage de {% test machine-a-laver la machine à laver %} sur la consommation du séchage ;
- comparer avec d'autres modèles de sèche-linge :
  - un modèle à condensation sans pompe à chaleur ;
  - un modèle à évacuation, qui jete beaucoup d'air chaud à l'extérieur.
{% endplusloin %}
