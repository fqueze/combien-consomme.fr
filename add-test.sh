#!/bin/bash

## Example usage: ./add-test.sh tests/pompe-de-relevage-de-condensats-sanicondens-eco.md

fileprefix=`basename "$1"|sed 's/\.md$//'`
title=`grep "title:" "$1"|head -n 1|sed 's/title: //'`

git add $1 {images,profiles}/"$fileprefix"* && git commit -m "Ajout du test d'$title."
