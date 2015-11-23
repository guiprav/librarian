#!/bin/bash
set -e
shopt -s globstar extglob

rm -rf build

cp -r docs build

if [ -f "pre-build.js" ];
then
    ./pre-build.js
fi

function replaceExt {
    echo "$(dirname "$1")/$(basename "$1" "$2")$3"
}

for file in build/**/!(*.partial).hbs
do
    mohawk "$file" >"$(replaceExt "$file" .hbs .html)"
    rm "$file"
done

for file in build/**/@(*.partial.hbs|*.helper.js)
do
    rm "$file"
done
