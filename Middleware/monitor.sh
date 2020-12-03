#!/bin
watch -n 1 "(date '+TIME:%H:%M:%S'; echo 'Server1' ; curl 192.168.5.80:5000; echo '' ;echo 'Server2' ; curl 192.168.5.150:5000 ; echo '') >> log.txt"

