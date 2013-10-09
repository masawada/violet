#!/bin/bash

BINDIR="$(pwd)/bin"
mkdir -p $BINDIR
cd $BINDIR
curl -O http://dl.google.com/closure-compiler/compiler-latest.zip
unzip compiler-latest.zip

echo ""
echo "compiler.jar is now installed."
echo "You need the Java Runtime Environment."
