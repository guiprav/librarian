#!/bin/bash
set -e

script_dir="$(dirname "$(readlink -f "${BASH_SOURCE[0]}")")"

cd "$script_dir/demo"

case "$1" in
    build)
        ../demo-build.sh
        ;;

    *)
        "$1" "${@:2}"
        ;;
esac
