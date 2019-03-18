#!/bin/bash
git add .
echo 'Introduzca el mensaje del commit:'
read mensaje
git commit -m "$mensaje"
git push
