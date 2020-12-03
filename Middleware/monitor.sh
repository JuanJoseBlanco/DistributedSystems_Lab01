#!/bin/bash

watch -n 1 "(date '+TIME:%H:%M:%S'; echo 'Server1' ; curl localhost:3000; echo '' ;echo 'Server2' ; curl localhost:4000 ; echo '') >> log.txt"
