---
layout: base-layout.njk
img: hp-a-propos.png
pagetitle: À propos de combien-consomme.fr
pagedesc: À quelles questions combien-consomme.fr répond, pour quelle raison il a été créé, dans quel esprit.
---

<article>

# {{ pagetitle }}

<div id="Introduction">
<div>

L'idée de ce site est venue d'une simple recherche sur internet. On se demandait combien consomme une yaourtière, combien ça coûte en électricité de faire ses yaourts, et si c'est rentable, à la fois en euros, et en CO<sub>2</sub> de faire ses yaourt soi-même plutôt que de les acheter.

La réponse trouvée était absurde. La yaourtière dont il était question avait une puissance indiquée de 400W. L'auteur du contenu expliquant la consommation avait multiplié cette consommation (qui je suppose était une consommation maximum au démarrage) par la durée (une nuit) pour faire les yaourts, et était arrivé à une estimation très élevée du coût de l'électricité utilisée pour faire ses propres yaourts. Aucun recul critique bien évidemment sur les chiffres avancés, alors que la quantité d'énergie annoncée (plusieurs kWh !) aurait fait largement bouillir le lait des yaourts...

Parce qu'on en a marre de voir de telles absurdités, et des publications qu'il faut croire sur parole, l'idée est venue de faire un site où les données brutes seront visibles. Où ce qui est indiqué est le résultat de mesures, et où le résultat de la mesure peut-être directement affiché, sans qu'il n'y ait besoin de croire mon interprêtation.
</div>
{% image "./images/hp-a-propos.png" "Image contenant un cadrant avec des aiguilles, et des nuages de fumée colorée autour" "512w" 512 %}
</div>

Il se trouve que pour mon travail j'avais déjà dévelopé des outils précis de mesure de consommation (visant en particulier [un navigateur web](https://www.mozilla.org/fr/firefox/new/)), et qu'il n'a pas été très difficile de les modifier pour mesurer les objets du quotidien plutôt que des logiciels.

Si les mesures seront réalisées sérieusement, certaines questions abordées ou comparaisons utilisées pourront prêter à sourire. Ce n'est pas parce qu'on traite un sujet sérieux qu'il faut forcément se prendre au sérieux.

N'hésitez pas à vous demander "Combien consomme *&lt;objet du quotidien>* ?" et à vouloir trouver [des réponses]({{ "/tests/" | url }}).

*Bonne lecture !*
</article>
