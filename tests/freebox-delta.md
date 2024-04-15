---
layout: test-layout.njk 
title: une Freebox Delta
img: freebox-delta.jpg
date: 2024-04-10
tags: ['test']
---

Une connexion internet rapide comme la fibre, mais pour quel coût énergétique ?
<!-- excerpt -->

## Le matériel
<div id="Introduction">
<div>
Il s'agit ici uniquement du serveur de la Freebox Delta (abonnement Delta S, donc offre sans la partie vidéo).

Cette box, haut de gamme lors de sa sortie, a plein de fonctionnalités intéressantes. Par exemple, elle peut faire tourner des machines virtuelles, des disques pour un stockage réseau, etc...

Elle n'est par contre pas la plus sobre en énergie. Le nouveau modèle sorti récemment (Freebox Ultra) est annoncé comme plus économe.
</div>
{% image "./images/freebox-delta.jpg" "Freebox Delta (server)" "512w" 512 %}
</div>

### Méthode de mesure

Un enregistreur Shelly EM avec une pince ampèremétrique est installé dans le tableau électrique sur la ligne électrique allant vers mon bureau. La valeur de la puissance instantanée mesurée est collectée et enregistrée une fois par seconde.

L'enregistrement correspond à un jour où je ne travaillais pas, et donc les autres appareils de mon bureau étaient débranchés.

## Consommation

### Sur une journée

{% profile "freebox-delta.json.gz" '{"name": "Freebox Delta server pendant une journée"}' %}

La consommation est assez stable toute la journée. Elle varie peu en fonction de l'utilisation, et reste autour de {{ 27 | W }}.

### Sur l'année

Si on suppose que la consommation mesurée sur 24h ({{ 652 | Wh }}) est représentative, en extrapolant, on obtient {{ 652 | energyCostPerYear }} par an, ou {{ 652 | energyCostPerMonth }} par mois.

Cette consommation d'énergie étant assez élevée, les utilisateurs qui n'utilisent pas internet tout le temps pourraient envisager de débrancher cette box lorsqu'elle ne sert pas. Par exemple pendant les vacances. Ou pendant la nuit en utilisant un programmateur.

<div id="plusloin">

## Pour aller plus loin

Pour comprendre de façon plus détaillée la consommation de cette freebox, on pourrait mesurer :
- la consommation lors du démarrage.
- l'impact de différents composants. On pourrait désactiver les machines virtuelles, retirer le disque dur amovible, désactiver le wifi.
- l'impact de l'utilisation : on pourrait faire pendant quelques minutes un test de débit internet, et voir si cela augmente significativement la consommation.
</div>