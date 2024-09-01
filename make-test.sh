#!/bin/bash

shortname=`echo "$1"|sed 's/^une //;s/^un //'`
filename=`echo "$shortname"|tr "àéèêëîïôö " "aeeeeiioo-"`
testname="tests/$filename.md"
e=`echo "$1"|sed 's/^une.*/e/;s/^un.*//'`
if [ "$e" = "e" ]
then
    ea="a"
    te="te"
else
    ea="e"
fi
echo $ea
echo $filename
d=`date "+%Y-%m-%d"`

sed "s/@name@/$1/g;s/@shortname@/$shortname/g;s/@filename@/$filename/g;s/(e)/$e/g;s/e(a)/$ea/g;s/@date@/$d/g" > $testname <<EOF
---
layout: test-layout.njk 
title: @name@
img: @filename@.jpg
date: @date@
tags: ['test']
---

TODO
<!-- excerpt -->

{% tldr %}
- TODO
{% endtldr %}

## Le matériel
{% intro "@filename@.jpg" "Un(e) @shortname@" %}

TODO

### Méthode de mesure

Le(a) @shortname@ est branché(e) sur {% post mesurer-la-consommation-avec-shelly-plus-plug-s une prise connectée Shelly Plus PlugS %} qui permet de mesurer sa consommation.

La puissance instantanée est collectée et enregistrée une fois par seconde.
{% endintro %}

## Consommation

TODO
EOF
for file in images/$filename-*; do echo "{% image \"./$file\" \"TODO\" \"500w\" 500 %}" >> $testname ; done
for file in profiles/$filename*; do file=`echo "$file"|sed 's/^profiles\///'`;echo "{% profile \"$file\" '{\"name\": \"TODO\", \"range\": \"\"}' %}" >> $testname ; done

sed "s/@shortname@/$shortname/g;s/(te)/$te/g" >> $testname <<EOF
{% plusloin %}
Pour comprendre de façon plus détaillée la consommation de cet(te) @shortname@, on pourrait :
- TODO
{% endplusloin %}
EOF

