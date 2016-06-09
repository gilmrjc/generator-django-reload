#!/usr/bin/env bash
echo "***********************************************"
echo "*                                             *"
echo "*                 Install                     *"
echo "*                                             *"
echo "***********************************************"
echo " "

echo "***********************************************"
echo "*                                             *"
echo "*           apt update and upgrade            *"
echo "*                                             *"
echo "***********************************************"
echo " "
apt-get -y update

echo " "
echo "***********************************************"
echo "*                                             *"
echo "*                 Utilities                   *"
echo "*                                             *"
echo "***********************************************"
echo " "

apt-get -y install python3-pip
apt-get -y install python3-dev python3-setuptools
apt-get -y install git

echo " "
echo "***********************************************"
echo "*                                             *"
echo "*  install dependencies (including django)    *"
echo "*                                             *"
echo "***********************************************"
echo " "
pip install --upgrade pip
pip install -r requirements/development.txt

echo " "
echo "***********************************************"
echo "*             List dependencies               *"
echo "***********************************************"
echo " "
pip freeze

echo " "
echo "***********************************************"
echo "*              Migrate database               *"
echo "***********************************************"
echo " "
python3 ./manage.py migrate
