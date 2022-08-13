case "$1" in
"") FILE=../.env ;;
*) FILE="$1" ;;
esac

if [[ ! -f "$FILE" ]]; then
  touch "$FILE"
  {
    printf "API_URL=\n"
  } >>"$FILE"
fi
