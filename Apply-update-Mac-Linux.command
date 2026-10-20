#!/bin/sh
if [ -z "$1" ]; then
  printf 'Usage: drag/drop or run with your v6.0 ZIP/HTML as the first argument.\n'
  exit 1
fi
python3 "$(dirname "$0")/apply_warbond_update.py" "$1"
