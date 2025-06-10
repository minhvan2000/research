arr=(866547075561657)

while true; do

    for element in "${arr[@]}"
    do
        query="LTEM-$element"

        url="https://broker1.2ifactory.com/api/v5/clients/$query"

        curl --location --request DELETE "$url" \
        --header 'Authorization: Basic ZTNlMmRiOWEzZGIzZTliZjpCRm5Ld2VQdTlCZlFLOUFvdHpQRVNCeFFDRUgweGtVdHdQenR3S1dqdWN5OUFI'

        echo "Query sent: $query"
    done

    echo "🕐 Waiting 3 minutes before next run..."
    sleep 180  # 3 minutes
done