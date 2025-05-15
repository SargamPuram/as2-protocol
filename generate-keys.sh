#!/bin/bash

# Set up cert directories
mkdir -p certs/partyA certs/partyB

echo "Generating keys and certs for Party A..."

# Party A keys
openssl genrsa -out certs/partyA/private.key 2048
openssl req -new -x509 -sha256 -key certs/partyA/private.key -out certs/partyA/public.crt -days 365 \
  -subj "/C=IN/ST=Maharashtra/L=Mumbai/O=PartyA/OU=IT/CN=partyA.com"
openssl x509 -in certs/partyA/public.crt -outform PEM -out certs/partyA/public.pem

echo "Generating keys and certs for Party B..."

# Party B keys
openssl genrsa -out certs/partyB/private.key 2048
openssl req -new -x509 -sha256 -key certs/partyB/private.key -out certs/partyB/public.crt -days 365 \
  -subj "/C=IN/ST=Maharashtra/L=Pune/O=PartyB/OU=Ops/CN=partyB.com"
openssl x509 -in certs/partyB/public.crt -outform PEM -out certs/partyB/public.pem

echo "Verifying modulus match for Party A..."
openssl rsa -noout -modulus -in certs/partyA/private.key | openssl md5
openssl x509 -noout -modulus -in certs/partyA/public.crt | openssl md5

echo "Verifying modulus match for Party B..."
openssl rsa -noout -modulus -in certs/partyB/private.key | openssl md5
openssl x509 -noout -modulus -in certs/partyB/public.crt | openssl md5

echo "Verifying certificate signature algorithm..."

echo "Party A certificate signature algorithm:"
openssl x509 -in certs/partyA/public.crt -noout -text | grep "Signature Algorithm" | head -n 1

echo "Party B certificate signature algorithm:"
openssl x509 -in certs/partyB/public.crt -noout -text | grep "Signature Algorithm" | head -n 1

echo "All keys and certs generated and verified."
