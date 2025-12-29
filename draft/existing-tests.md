# Existing Tests Cross-Reference

This file lists all existing tests with their slugs, descriptions, and key findings to help with cross-referencing when writing new tests.

## Tests Analyzed

### aspirateur-atelier
**Title:** Un aspirateur d'atelier
**Device:** Aspirateur Kärcher Eau et Poussières WD3
**Key findings:**
- Puissant aspirateur pour chantier/bricolage
- Consommation: 1180W stable, pic au démarrage à 1789W
- Consommation diminue quand le tuyau est bouché (981W)
- Peut aussi aspirer de l'eau (dégivrage de congélateur)

### broyeur-wc
**Title:** Un broyeur WC
**Device:** Broyeur WC compact Watermatic W30S
**Key findings:**
- Permet d'installer des sanitaires sans gros tuyau d'évacuation
- Deux programmes: petite goutte (2L, 0.505 Wh) et grosse goutte (4L, 1.14 Wh)
- Consommation en attente: 0.435W (représente 70% de la consommation totale)
- Consommation annuelle négligeable: 14.9 Wh/jour pour usage normal

### carillon-filaire
**Title:** Un carillon filaire
**Device:** Carillon Urmet Captiv 44172
**Key findings:**
- Sonnette filaire toujours branchée
- Consommation en veille: 1.09W (9.5€/an)
- Consommation par sonnerie quasi négligeable (0.003 Wh)
- Tests multiples: sonnerie normale, 10 sonneries, 30s continues, appui continu 20s, sonneries insistantes
- Coût électricité dépasse prix d'achat après 27 ans

### chauffe-biberon
**Title:** Un chauffe-biberon
**Device:** Chauffe-biberon BEABA Bib'secondes
**Key findings:**
- Chauffe par vapeur d'eau avec minuterie réglable
- Réchauffage 2 minutes: 13.1 Wh
- Consommation en attente: 0.460W (4€/an si branché tout le temps)
- Consommation annuelle pour 1 an de tire-allaitement: 88.3 Wh
- Attention: veille représente 70% de la consommation, penser à débrancher

### fontaine-chat
**Title:** Une fontaine pour animaux de compagnie
**Device:** Fontaine à papillon Drinkwell PetSafe
**Key findings:**
- Eau filtrée en mouvement constant pour chat/chien
- Consommation stable: 2.21W en moyenne
- Consommation annuelle: 53 Wh (4.63€/an)
- Plus de 40 ans d'utilisation pour égaler le prix d'achat en électricité
- Filtres consommables coûtent plus cher que l'électricité

### four-a-micro-ondes
**Title:** Un four à micro-ondes
**Device:** Four Thompson M2201G (années 90)
**Key findings:**
- Vieux modèle des années 90
- Puissance max: 1410-1450W (légèrement plus que les 1300W indiqués)
- Mode décongélation: alterne cycles 30s (5s chauffe / 25s pause)
- Forces I, II, III: durée de chauffe variable toutes les 30s
- Consommation annuelle (3min/jour + 5min décongélation): 36.8 Wh
- Pas adapté à l'autoconsommation photovoltaïque (cycles marche/arrêt)

### freebox-mini4k
**Title:** Une Freebox Mini 4K
**Device:** Freebox Mini 4K (Server + Player + boîtier fibre)
**Key findings:**
- Système complexe: Server, Player, FreePlug (CPL), boîtier fibre
- **Server:** 17.1W constant (11.9W Server seul + 5.4W boîtier fibre)
- **Player actif:** 8.3W (avec CPL) ou 7.24W (sans CPL)
- **Player en veille:** 5.9W
- **FreePlug seul:** 1.35W (CPL actif) ou 0.0627W (CPL inactif)
- Consommation annuelle: 43-66€ selon utilisation
- Coût électricité ≈ un mois d'abonnement ("treizième mois")
- Mesures avec caméra thermique (boîtier fibre à 47.8°C)

### machine-a-laver
**Title:** Une machine à laver
**Device:** Lave-linge Samsung 7kg
**Key findings:**
- Programme "Quotidien" 40°C: test principal
- Chauffage eau domine: 618 Wh (84% du total) pour 40°C
- Essorage: 49.8 Wh (7% du total)
- Comparaisons températures: 30°C (348 Wh, -53%), 40°C (736 Wh), 60°C (835 Wh, +13%)
- Programme 15' Express: 16.5 Wh seulement
- Cycles identifiés: remplissage, chauffage, lavage, rinçage, essorage
- Consommation annuelle: 36.8-268 Wh selon fréquence (50-365 lessives/an)
- Bon pour autoconsommation photovoltaïque si lancé en journée ensoleillée

### roomba-i3-plus
**Title:** Un aspirateur robot Roomba i3 plus
**Device:** Roomba i3+ avec tour de vidage
**Key findings:**
- Robot avec base qui vide automatiquement le bac
- Consommation en veille: 1.9W (maintien charge batterie)
- Aspiration 20m²: 14.3 Wh de recharge après nettoyage
- Vidages fréquents très consommateurs (aspirateur de la base puissant)
- Grosse variation: 46.5 Wh (filtre sale) vs 19.2 Wh (filtre propre) pour même pièce
- Consommation annuelle: 21.7-59.4 Wh (selon propreté filtre)
- Consommation veille peut dépasser consommation d'utilisation

### seche-linge-a-pompe-a-chaleur
**Title:** Un sèche-linge avec pompe à chaleur
**Device:** Sèche-linge Samsung avec pompe à chaleur
**Key findings:**
- Modèle récent, très bonne efficacité énergétique (pompe à chaleur)
- Programme "coton": 789 Wh pour 1h40 (prévu 3h10, capteur humidité)
- Consommation régulière: 400-500W pendant presque tout le cycle
- Peu consommant pour un appareil qui chauffe (grâce à pompe à chaleur)
- Coût comparable à la lessive qui l'a précédé
- Bien adapté à l'autoconsommation photovoltaïque (puissance étalée)
- Cycle court (40min): 248 Wh

### yaourtiere
**Title:** Une yaourtière
**Device:** Yaourtière SEB Classic YG100100
**Key findings:**
- Fait 7 yaourts de 125g par fournée
- Consommation proportionnelle au temps: 8h (119 Wh), 10h (147 Wh), 12h (178 Wh)
- Puissance stable environ 15W pendant cuisson
- Après cuisson: consommation résiduelle très faible (0.0301W)
- Coût électrique par yaourt négligeable: 0.25-0.37 centimes
- Rentabilité dépend du prix du lait vs yaourts achetés
- Il faudrait 24 jours en veille post-cuisson pour dépenser 1 centime

### congelateur
**Title:** Un congélateur
**Device:** Congélateur coffre récent, efficace énergétiquement
**Key findings:**
- Comportement cyclique: 36 cycles par jour
- Chaque cycle: 15min fonctionnement + 25min arrêt
- Pic démarrage: 1720W (démarrage moteur compresseur)
- Consommation stable: 80W → 68W pendant fonctionnement
- Consommation journalière: 652 Wh (238 Wh/an)
- Pistes amélioration: impact ouverture, givre, température ambiante

### couteau-electrique
**Title:** Un couteau électrique
**Device:** Couteau électrique Moulinex années 70 (60W)
**Key findings:**
- Nostalgie années 70, prêté par vendeur marché aux puces
- Pain de mie: 0.0652 Wh/tranche, 56W stable
- Pain au maïs (croûte dure): 0.238 Wh/tranche (+3.5x), 66.7W, 12-17s/tranche
- Pain rassis: 1.15 Wh, 92.9W max (+55% puissance nominale), résultat médiocre
- Premier démarrage: pic à 117W (double puissance nominale)
- Consommation annuelle négligeable: 1.03€/an pour 12 tranches/jour pain dur
- Cross-ref: ouvre-boîtes électrique (notice mentionne)

### destructeur-insectes
**Title:** Un destructeur d'insectes
**Device:** Destructeur ELKC212ET 12W Electris (2 tubes UV 6W + grille haute tension)
**Key findings:**
- Lampe anti-insectes à grille électrifiée
- Puissance étiquette: 18.5W (vs 12W description)
- Mesure réelle: 11.5W stable, pic démarrage 25.3W
- Électrocution insectes: pas de surconsommation visible
- Usage nocturne une nuit: 142 Wh
- Été complet (3 mois nuits): 12.8€
- Usage continu 24h/24: 8.28€/mois

### freebox-delta
**Title:** Une Freebox Delta
**Device:** Freebox Delta Server uniquement (abonnement Delta S sans vidéo)
**Key findings:**
- Box haut de gamme, pas sobre (Freebox Ultra plus récente plus économe)
- Fonctionnalités: machines virtuelles, stockage réseau
- Consommation très stable: 27W constant
- Peu de variation selon utilisation
- Consommation annuelle: 238 Wh (même que congélateur!)
- Suggestion: débrancher pendant vacances/nuit avec programmateur
- Cross-ref: freebox-mini4k pour comparaison

### guirlande-electrique
**Title:** Une guirlande électrique
**Device:** Comparaison guirlande ancienne à incandescence vs LED moderne
**Key findings:**
- **Ancienne (35 ampoules incandescence):** 28W nominal, 15.3W moyenne
  - Clignotement mécanique par bilame
  - Démarrage: 30s sans clignotement (bilame chauffe)
  - Consommation Noël: 2.85€ (6h/soir, 31 jours)
- **LED moderne:** 1.8W nominal, 1.94W moyenne, clignotement électronique
  - Consommation Noël: 0.36€ (-87%)
- Remplacement rentable en 25 ans (10€ guirlande neuve)
- Énergie grise fabrication rend économie douteuse
- Mieux: récupérer LED d'occasion vide-grenier/poubelles janvier

### hydropulseur-dentaire
**Title:** Un hydropulseur dentaire
**Device:** Oral-B WaterJet Braun (18W)
**Key findings:**
- Alternative jet d'eau au fil dentaire
- Usage 40s: 0.149 Wh (420 lavages/centime)
- Cuve complète 600mL: 0.523 Wh, 2min vidage
- Forces réglables 1-5: 8.4W à 15.2W
- Robinet fermé augmente consommation
- Veille: 0.0259W (très faible, 4x consommation d'un lavage/jour!)
- Consommation annuelle négligeable vs prix achat

### machine-a-pain
**Title:** Une machine à pain
**Device:** Kenwood BM250 (480W) - récupérée Emmaüs
**Key findings:**
- Années 2000-2010, maintenant souvent au placard
- **Pain normal (3h):** 265 Wh - Pétrissage 31.2 Wh (12%), Levée, Cuisson 216 Wh (82%)
- **Pain complet:** 292 Wh (+10%) - ajout préchauffage 30min
- **Avec maintien chaud:** 329 Wh (+13%)
- Résistance 400W + moteur 50W
- Cuisson: résistance modulée (25s/30s)
- Levée: chauffage intermittent + malaxage
- Usage quotidien: 96-120€/an
- Usage hebdomadaire: 13.8-17.1€/an
- Autoconsommation solaire: cuisson en journée si pas petit-dèj

### ordinateur-portable-dell-xps-15
**Title:** Un ordinateur portable Dell XPS 15 pouces
**Device:** Dell XPS 15 2022 haut de gamme (processeur 45W base/115W turbo, batterie 86Wh, chargeur 130W)
**Key findings:**
- Charge complète batterie vide: 87.4 Wh (2h20)
- **Utilisation:** 11W moyenne (interactif) à 76W (calcul intensif)
- Compilation Firefox 25min: 31.6 Wh (37% batterie)
- **Éteint branché:** 0.351W à 0.857W selon situation
- **Chargeur seul:** 0.00973W (négligeable, 0.09€/an)
- **Veille mode performance:** 4.24W (37€/an) - pics toutes les 15min
- **Veille mode économie:** 0.978W (8.6€/an) - bien meilleur
- Préférable d'éteindre que laisser en veille
- Paramètres alimentation ont impact énorme

### tondeuse-a-gazon
**Title:** Une tondeuse à gazon
**Device:** Tondeuse Bosch Rotak 43 (1800W, Ø43cm, bac 50L)
**Key findings:**
- Pic démarrage: 2673W
- Puissance étiquette 1800W atteinte seulement si bourrage/moteur force
- **Herbes hautes:** 1074W moyenne, 1118W médiane, variations selon hauteur/bourrages
- **Herbes régulières:** 1024W médiane, plus stable
- **À vide:** 900W très stable
- Consommation +10% herbes très hautes vs régulières
- Usage annuel (12 tontes 1h): 12€/an
- Cross-ref: aspirateur-atelier (comportement arrêt similaire)

### imprimante-laserjet-pro
**Title:** Une imprimante HP LaserJet Pro
**Device:** HP Color LaserJet Pro M452dn (laser couleur, 27 pages/min, recto-verso, réseau)
**Key findings:**
- Fabricant indique: 570W impression, 17.6W prêt, 2.4W veille, 0.05W arrêt
- Une page: 2.44 Wh (256 pages/centime)
- Consommation/page diminue si impression suite (préchauffage = gros de conso)
- Éveil 5min après impression non négligeable - éteindre si fini
- Veille permanente: 42 Wh/an (1.75W moyenne)

### lecteur-dvd-thomson-thd300
**Title:** Un lecteur de DVD Thomson THD300
**Device:** Thomson THD300 (compact, <35€ neuf, commercialisé 2019)
**Key findings:**
- Film 2h: 11.4 Wh (5.88W moyenne) - moins que le téléviseur
- Veille très faible: 0.0126W (0.11€/an)
- 625 visionnages DVD 1€ d'occasion pour égaler coût électricité
- Si acheté neuf 35€: 109 mois utilisation continue pour dépenser plus en électricité
- Incontournable cinéphiles malgré streaming

### machine-apnee-sommeil
**Title:** Une machine de traitement de l'apnée du sommeil
**Device:** Löwenstein prisma SMART max + humidificateur prismaAQUA (PPC/CPAP)
**Key findings:**
- Traitement apnée par pression positive continue (masque nocturne)
- **Utilisation:** 9.37W à 19.0W moyenne, pics 56.5W pendant apnées
- **Veille:** 2.70W à 3.34W
- Annuelle (8h/nuit): 51.2-81.2€
- Veille représente 16-19% du total - débrancher si non-utilisé
- Stocke données, modem télétransmission supervision médicale
- Pression adaptée selon débit, augmente si pause respiratoire

### meuleuse-d'angle-carrelage
**Title:** Une meuleuse d'angle pour couper du carrelage
**Device:** Parkside PWS 125 B2 (1200W) - achetée d'occasion
**Key findings:**
- Usage rare (saignée mur, découpe carrelage)
- 2 morceaux carrelage: 74.2 Wh, 10min utilisation intermittente
- Pics démarrage, plateau, augmentation quand contact/appui
- Usure disque coûte plus que électricité
- Multiple pauses pour vérifier/repositionner (11 reprises pour 6cm!)

### mixer-houmous
**Title:** La préparation d'un houmous
**Device:** Mixeur plongeant Moulinex quickchef (1000W, 10 vitesses, haut de gamme)
**Key findings:**
- Houmous (pois chiches cuits, tahin, huile, épices, eau)
- Puissance max mesurée: 348W (bien < 1000W) - aliment mou
- Puissance diminue pendant mixage (résistance lame réduit)
- Mixage par à-coups 3-5s
- Veille: 0.189W (1.66€/an si branché tout le temps)
- Peut mixer noix de cajou (puissant)

### mixer-une-soupe
**Title:** le mixage d'une soupe aux légumes
**Device:** Mixeur plongeant Moulinex quickchef 1000W (même appareil que mixer-houmous)
**Key findings:**
- Mixage de 4L de soupe: 2min47s pour 5.03 Wh (moins d'un centime)
- Il faut mixer 32 litres de soupe pour dépenser un centime d'électricité
- Puissance diminue pendant mixage: 125W moyenne au début (légumes en morceaux) → 104W en fin (soupe lisse)
- Consommation maximale 160W (54% de moins que houmous) - légumes cuits plus mous que pois chiches
- Usage hebdomadaire: 262 Wh/an (0.066€/an) - coût totalement dérisoire
- L'enjeu énergétique est dans la cuisson des légumes, pas le mixage

### motorisation-porte-de-garage-basculante
**Title:** Une porte de garage basculante
**Device:** CAME V6000 automatisme pour porte basculante 6m² (kit ~200€, bas gamme)
**Key findings:**
- Télécommandée, récepteur toujours allumé
- Ouverture+fermeture: 0.9 Wh (0.73€/centime)
- **Veille très consommatrice:** 11.5W = 101€/an
- Veille >> utilisation: 101€/an veille vs 0.60€/an usage quotidien
- Débrancher pendant vacances recommandé
- Moteur 100W (max étiquette), pic 80.8W mesuré
- Éclairage LED reste allumé quelques minutes après manœuvre
- Variation puissance pendant course (30-80W) = effort variable

### moulinette-s
**Title:** Une « moulinette S » de Moulinex
**Device:** Moulinex type 643 années 70-80 (750W, 10000 tr/min)
**Key findings:**
- Hachoir vintage multi-générations (viande, poisson, légumes, fromages)
- Hacher bac poisson cru 7s: 1.00 Wh (62 bacs/centime)
- Puissance max mesurée: 625W, médiane 520W
- Veille avec voyant rouge: 0.277W (13.2 jours/centime, 2.43€/an)
- Pas d'écrasement cellules → garde jus/saveur
- Manuel détaillé: produits durs vs mous, éviter liquides/juteux

### nettoyeur-ultrasons
**Title:** Un nettoyeur à ultrasons
**Device:** CD-2820 bas de gamme asiatique (50W max, 3 programmes: 1.5/3/5 min)
**Key findings:**
- Cuve petite (lunettes)
- Programme 5min: 3.18 Wh (196 nettoyages/centime)
- Programmes 3 durées: 1.5min, 3min, 5min
- Puissance diminue au fil du temps (chauffe)
- **Veille problématique:** 2.4W = 21€/an
- Veille peut dépasser consommation utilisation - débrancher!
- Numéro programme rétro-éclairé rouge

### ouvre-boites-electrique
**Title:** Un ouvre-boîtes électrique
**Device:** Moulinex Type 343.2.00 85W années 70 (1€ marché aux puces)
**Key findings:**
- Objet vintage cuisine idéale années 70
- Ouvrir une boîte: 0.19 Wh (331 boîtes/centime)
- Maintenant presque toutes boîtes ont anneau ouverture facile
- Pas d'électronique: consomme 0 si branché mais non-utilisé
- Cross-ref: couteau-électrique (notice mentionne ouvre-boîtes)
- Désuet, reste au fond tiroir sauf exception

### pompe-de-relevage-de-condensats-sanicondens-eco
**Title:** Une pompe de relevage de condensats Sanicondens Eco
**Device:** SFA CD10 (60W étiquette, pour chaudière condensation/clim/déshumidificateur)
**Key findings:**
- Relève condensats jusqu'à 4.5m haut, 50m long, 6.2L/min
- Ici: évacue eau groupe sécurité cumulus mal installé
- Déclenchement 9s: 0.163 Wh
- Puissance mesurée 70-75W (> 60W étiquette)
- **Zéro consommation au repos** - flotteur mécanique, pas d'électronique
- Annuel (1x/jour): 0.06€ - négligeable vs cumulus
- 42885 déclenchements pour égaler prix achat 70€

### raclette-a-deux
**Title:** Une raclette à deux
**Device:** Essentiel B Raclette Duo Multiplug Green (300W, 2 poêlons)
**Key findings:**
- Raclette en amoureux (vs grandes tablées)
- Peut chaîner jusqu'à 6 appareils (12 tranches simultanées)
- Soirée 50min: 254 Wh (1.32€)
- 12.7 Wh/tranche fromage moyenne
- Efficacité: utiliser 2 poêlons + cuire sur plaque dessus
- Conso proportionnelle durée utilisation
- 1212 tranches pour égaler prix achat 20€

### robot-rapetout
**Title:** Un robot Rapetout
**Device:** Robot Rapetout années 90 (25W étiquette) - râpe/émince compact tenu à la main
**Key findings:**
- Compact vs robots encombrants - tenu à main au-dessus assiette
- Version électrique des râpes à manivelle de grand-mère
- 2 disques: râpeur (carottes/gruyère), éminceur (concombre/pommes de terre)
- Râper 5 carottes 3min: 1.62 Wh (3100 carottes/centime)
- **Puissance mesurée 2-3x étiquette:** max 88.4W (>3.5x 25W!), moyenne 46.8W (~2x)
- Varie selon résistance aliments
- À vide: 20W (enfin < étiquette!)
- Zéro au repos - pas d'électronique

### scanner-de-documents-scansnap
**Title:** Un scanner de documents
**Device:** Fujitsu ScanSnap S1500M (2010, acheté 10€ marché aux puces, neuf cher)
**Key findings:**
- Recto-verso automatique 50 feuilles, professionnel
- Peut scanner petits documents (tickets caisse)
- Numérisation 1 page: 0.008 Wh (négligeable)
- **Attente 14min avant veille:** 4.55 Wh (577x plus qu'une numérisation!)
- **Veille couvercle ouvert:** 17.2W = 103€/an
- **Veille couvercle fermé:** 1.21W = 7.3€/an
- Refermer couvercle crucial pour économiser
- Débrancher encore mieux

### seche-linge-a-evacuation
**Title:** Un sèche-linge à évacuation
**Device:** Miele De Luxe-Electronic T 366 années 80 (3300W, 4.5kg, résistance 3000W)
**Key findings:**
- Technologie ancienne: évacue air chaud/humide extérieur
- Toujours fonctionnel 40 ans après (hérité de mamie devenue maman)
- **Cycle intensif 47min:** 1704 Wh (2.21€) - bien essoré 1400 tr/min
- **2x/semaine:** 173€/an
- Vs {% test seche-linge-a-pompe-a-chaleur pompe à chaleur %}: consomme 2.2x plus (789 Wh)
- Puissance chauffage: 3300W stable (vs 400-500W progressif pompe chaleur)
- Résistance ON/OFF, pas modulation progressive
- **Remplacement peu rentable:** 3-13 ans pour amortir (310-1300€)
- Modèle dure 40 ans, récents durent moins
- Perte thermique hiver (air chaud évacué)
- Difficile autoconsommation solaire (3300W >> production standard 2500W)
- Phases: séchage intensif, séchage normal+, air froid, rotation infroissable 1h
- Manuel détaille conseils économies énergie

### ventilateur-carrefour-home
**Title:** Un ventilateur de table Carrefour Home 3 vitesses
**Device:** Carrefour Home CDF730-11 (40W étiquette, hélice moyenne, 3 vitesses mécaniques)
**Key findings:**
- Bon marché, tête orientable, oscillation latérale
- **Vitesses très proches:** V1: 28.4W, V2: 30.5W (+7%), V3: 37W (+21%)
- Écart ressenti faible V1→V2, concepteurs auraient pu mettre 2 vitesses
- Compare mal à {% test ventilateur-de-table-rowenta Rowenta %}: +58% V1→V2
- Oscillation: pas d'impact notable (<1W variation)
- Serviette devant: pas de variation notable
- Légère décroissance 36.6→36.2W en 40min (échauffement moteur)
- Été (4h/jour, 3 mois, V3): 10.44€
- Usage 24h/24 tout été: coût ≈ prix achat
- Zéro consommation arrêt (interrupteur mécanique)
- Adapté autoconsommation solaire (<40W)

### ventilateur-de-table-rowenta
**Title:** Un ventilateur de table Rowenta Essential
**Device:** Rowenta Essential VU2110 (hélice 25cm, 2 vitesses, 28W, oscillant)
**Key findings:**
- Petit ventilateur table/bureau compact
- Commande mécanique simple
- **Vitesse 1:** 19W
- **Vitesse 2:** 30W (étiquette indique 28W)
- Oscillation: pas de changement significatif consommation
- Été (4h/jour, 3 mois, pleine puissance): 10.44€
- Interrupteur mécanique: 0 consommation à l'arrêt, inutile débrancher

### yaourtiere-seb-multi-delices
**Title:** Une yaourtière SEB Multi delices
**Device:** SEB Multi delices YG654 (450W max, 6 pots, 5 programmes, électronique moderne)
**Key findings:**
- Haut de gamme vs {% test yaourtiere SEB Classic %} simple
- 5 programmes: P1 yaourts express, P2 yaourts, P3 faisselles, P4 desserts lactés, P5 desserts moelleux
- P1/P4/P5: ajouter eau (vapeur), P2/P3: sans eau
- **Programme yaourts 12h:** 268 Wh (3.48€) - 22.3W moyenne (+51% vs Classic 14.8W)
- Par yaourt: 0.58 centimes (lait coûte bien plus: 19 centimes!)
- **Chauffage intermittent thermostat:** 450W→480W max (pics) puis pause
- Pic 480W > 450W étiquette (dépend tension 232-239V)
- Changement température après 1h30: 40W→20W moyenne
- Veille: 0.211W = 1.85€/an
- Quotidien: veille = 8% total (négligeable)
- Hebdomadaire: veille = 36% total - débrancher!
- **Mal adapté autoconsommation solaire:** pics 450W alternés vs {% test yaourtiere Classic %} puissance constante faible
- Afficheur temps restant
- Claquements relais thermostat audibles

### machine-a-laver-miele
**Title:** une machine à laver Mièle récente
**Device:** Miele W1 Series 120 (modèle WVDD 025, 8kg, A+++)
**Key findings:**
- Consommation programme Coton 40°C pleine charge: 1040 Wh (fabricant annonce 530 Wh à demi-charge)
- Le chauffage initial de l'eau représente 671 Wh (65% de la consommation totale)
- Machine à capacité variable: charge légère consomme 79% de moins (218 Wh vs 1040 Wh)
- Consommation veille quasi nulle: 0.111W moyenne (0.97€/an)
- Fonction Infroissable prolonge le cycle de 30 minutes après fin lavage

### velo-cargo
**Title:** un vélo cargo à assistance électrique
**Device:** Bakfiets Biporteur Électrique Shadow STEPS (batterie 418Wh, moteur Shimano STEPS)
**Key findings:**
- Utilisé quotidiennement pour trajets crèche (remplace voiture)
- Consommation: 6.2 Wh/km en moyenne, variations selon dénivelé et charge
- Coût électrique: environ 0.15 centime/km (vs 10-15 centimes/km en voiture)
- Veille chargeur quasi nulle (0.125W) - peut rester branché sans problème
- Charge complète (batterie vide): 413 Wh, environ 5h30
- Autonomie réelle: environ 55km avec 75% de batterie utilisée

### casque-sans-fil-reduction-de-bruit
**Title:** un casque sans fil à réduction de bruit
**Device:** Sony WH-1000XM3 (modèle 2018, après 6 ans d'utilisation intensive)
**Key findings:**
- Charge complète d'une batterie vide : 4.34 Wh en 2h36, soit moins d'un centime
- Charge rapide : 10 minutes fournissent 19% de la charge totale (environ 5h30 d'autonomie sur les 30h annoncées)
- Consommation résiduelle après charge : 0.00567W (0.013€/an si laissé branché en permanence)
- Coût annuel : 0.057€ pour une charge par semaine, totalement dérisoire comparé au prix d'achat (350€)
- Courbe de charge typique Li-ion : pic initial 9.5W, stabilisation à 5W, décroissance progressive jusqu'à 0W

### soiree-gaufres
**Title:** une soirée gaufres
**Device:** TEFAL Croque Gaufre Grill Type 690 Serie 1 (700W)
**Key findings:**
- Soirée gaufres complète (salées patate douce + sucrées) : 831 Wh pour 1h31 de cuisine
- Préchauffage nécessaire : environ 10 minutes de chauffe continue avant la première gaufre
- Cuire une paire de gaufres : entre 44 et 69 Wh selon la recette
- Coût électrique dérisoire comparé au coût des ingrédients et au prix d'achat
- ATTENTION : pas d'interrupteur, il faut impérativement débrancher après utilisation (maintient température indéfiniment sinon)

### machine-a-cafe-expresso
**Title:** une machine à café expresso
**Device:** Machine à expresso De'Longhi ECP33.21.BK
**Key findings:**
- Préchauffage consomme 16.8 Wh en un peu plus d'une minute (puissance médiane 973W)
- Préparation d'un double expresso consomme 7.84 Wh en environ 40 secondes
- En attente après préchauffage : 1.69W (extinction automatique après 9 minutes)
- Cycle complet : 24.6 Wh soit moins d'un centime
- Il faudrait 29 ans de cafés quotidiens (2/jour) pour égaler le prix d'achat en coût électrique
- Pas de consommation en veille quand éteinte (interrupteur mécanique)

### balance-precision
**Title:** une balance de précision
**Device:** Balance de précision MATFER MII-3000 (UWE) - 3000 g × 0.5 g
**Key findings:**
- Consommation permanente: 0.850 W (7.4€/an) même éteinte, due à l'adaptateur secteur
- L'adaptateur seul consomme 0.849 W - la balance éteinte ne consomme presque rien
- Allumer la balance n'ajoute que 0.129 W (+15% par rapport à éteinte)
- Mesure avec ISW8001 nécessaire : Shelly Plus Plug S trop imprécis pour cette faible consommation
- Rétro-éclairage LCD provoque des pics jusqu'à 1.44 W
- Fonctionnement sur pile (9 V) éliminerait la consommation permanente de l'adaptateur

### minitel
**Title:** un Minitel
**Device:** Minitel 1B (Radiotechnique Industrielle et Commerciale, 1990)
**Key findings:**
- Consommation stable autour de 18,6 W que l'écran soit actif ou en veille
- Le modem augmente légèrement la consommation à 19,2 W pendant 42 secondes
- La luminosité réglable n'a aucun impact visible sur la consommation électrique
- Une utilisation typique de 3 minutes pour consulter l'annuaire coûte moins d'un centime
- Si branché en permanence, consomme 446 Wh par jour soit 163 kWh par an

### centrifugeuse-philips
**Title:** une centrifugeuse Philips HR1858
**Device:** Centrifugeuse Philips HR1858 (650W, 2 vitesses)
**Key findings:**
- Coût par pomme : environ 0,83 Wh (moins d'un demi-centime)
- Transformation de 4 pommes en jus : 3,33 Wh en 1min9s
- Deux vitesses : vitesse 1 (33W à vide) pour fruits tendres, vitesse 2 (132W à vide) pour fruits durs
- Puissance maximale mesurée : 948W lors de la transformation
- Consommation branchée mais éteinte : 0,0151W (négligeable)
- Couper les fruits facilite le passage et évite les blocages dans la cheminée
