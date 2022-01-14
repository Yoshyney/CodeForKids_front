#!/bin/bash

sudo docker build . --tag api/api
sudo docker run -d --name API -p 4242:4242 api/api
