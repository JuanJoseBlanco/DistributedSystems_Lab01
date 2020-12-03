#!/bin/bash

watch -n 0.5 "(date '+TIME:%H:%M:%S'; echo '3000' ; curl localhost:3000; echo '' ;echo '4000' ; curl localhost:4000 ; echo '') >> log.txt"
