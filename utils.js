const fs = require("fs");
const path = require("path");
const { promisify } = require("util");
const ipaddr = require("ipaddr.js");

const appendFileAsync = promisify(fs.appendFile);
const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const outputFile = "proxy.txt";
const indonesianOutputFile = "indo.txt";
const INDONESIAN_IP_RANGES = [
    "36.66.0.0/16",
    "36.67.0.0/16",
    "39.192.0.0/14",
    "42.0.192.0/18",
    "49.128.0.0/13",
    "58.65.232.0/21",
    "61.5.64.0/18",
    "103.0.0.0/8",
    "110.232.64.0/18",
    "114.4.0.0/14",
    "180.244.0.0/14",
    "202.0.92.0/22",
    "202.0.96.0/19",
    "203.0.192.0/19",
    "103.16.0.0/11",
    "103.56.0.0/14",
    "103.104.0.0/13",
    "103.128.0.0/13",
    "103.176.0.0/12",
    "110.136.0.0/14",
    "111.92.0.0/13",
    "113.192.0.0/12",
    "118.96.0.0/12",
    "120.28.0.0/15",
    "122.155.0.0/16",
    "128.199.0.0/16",
    "139.59.0.0/16",
    "202.6.128.0/17",
    "202.152.0.0/14",
    "203.96.0.0/14",
    "203.160.0.0/13",
    "210.56.0.0/14",
    "211.0.0.0/13",
    "218.100.0.0/14",
    "222.124.0.0/15",
    "103.4.0.0/22",
    "103.5.0.0/22",
    "103.8.0.0/22",
    "103.10.0.0/22",
    "103.11.0.0/22",
    "103.12.0.0/22",
    "103.13.0.0/22",
    "103.14.0.0/22",
    "103.15.0.0/22",
    "103.16.0.0/22",
    "103.17.0.0/22",
    "103.18.0.0/22",
    "103.19.0.0/22",
    "103.20.0.0/22",
    "103.21.0.0/22",
    "103.22.0.0/22",
    "103.23.0.0/22",
    "103.24.0.0/22",
    "103.25.0.0/22",
    "103.26.0.0/22",
    "103.27.0.0/22",
    "103.28.0.0/22",
    "103.29.0.0/22",
    "103.30.0.0/22",
    "103.31.0.0/22",
    "103.32.0.0/22",
    "103.0.0.0/22",
    "103.33.0.0/22",
    "103.34.0.0/22",
    "103.35.0.0/22",
    "103.36.0.0/22",
    "103.37.0.0/22",
    "103.38.0.0/22",
    "103.39.0.0/22",
    "103.40.0.0/22",
    "103.41.0.0/22",
    "103.42.0.0/22",
    "103.43.0.0/22",
    "103.44.0.0/22",
    "103.45.0.0/22",
    "103.46.0.0/22",
    "103.47.0.0/22",
    "103.48.0.0/22",
    "103.49.0.0/22",
    "103.50.0.0/22",
    "103.51.0.0/22",
    "103.52.0.0/22",
    "103.53.0.0/22",
    "103.54.0.0/22",
    "103.55.0.0/22",
  "103.56.0.0/22",
  "103.57.0.0/22",
  "103.58.0.0/22",
  "103.59.0.0/22",
  "103.60.0.0/22",
  "103.61.0.0/22",
  "103.62.0.0/22",
  "103.63.0.0/22",
  "103.64.0.0/22",
  "103.65.0.0/22",
  "103.66.0.0/22",
  "103.67.0.0/22",
  "103.68.0.0/22",
  "103.69.0.0/22",
  "103.70.0.0/22",
  "103.71.0.0/22",
  "103.72.0.0/22",
  "103.73.0.0/22",
  "103.74.0.0/22",
  "103.75.0.0/22",
  "103.76.0.0/22",
  "103.77.0.0/22",
  "103.78.0.0/22",
  "103.79.0.0/22",
  "103.80.0.0/22",
  "103.81.0.0/22",
  "103.82.0.0/22",
  "103.83.0.0/22",
  "103.84.0.0/22",
  "103.85.0.0/22",
  "103.86.0.0/22",
  "103.87.0.0/22",
  "103.88.0.0/22",
  "103.89.0.0/22",
  "103.90.0.0/22",
  "103.91.0.0/22",
  "103.92.0.0/22",
  "103.93.0.0/22",
  "103.94.0.0/22",
  "103.95.0.0/22",
  "103.96.0.0/22",
  "103.97.0.0/22",
  "103.98.0.0/22",
  "103.99.0.0/22",
  "103.100.0.0/22",
  "103.101.0.0/22",
  "103.102.0.0/22",
  "103.103.0.0/22",
  "103.104.0.0/22",
  "103.105.0.0/22",
  "103.106.0.0/22",
  "103.107.0.0/22",
  "103.108.0.0/22",
  "103.109.0.0/22",
  "103.110.0.0/22",
  "103.111.0.0/22",
  "103.112.0.0/22",
  "103.113.0.0/22",
  "103.114.0.0/22",
  "103.115.0.0/22",
  "103.116.0.0/22",
  "103.117.0.0/22",
  "103.118.0.0/22",
  "103.119.0.0/22",
  "103.120.0.0/22",
  "103.121.0.0/22",
  "103.122.0.0/22",
  "103.123.0.0/22",
  "103.124.0.0/22",
  "103.125.0.0/22",
  "103.126.0.0/22",
  "103.127.0.0/22",
  "103.128.0.0/22",
  "103.129.0.0/22",
  "103.130.0.0/22",
  "103.131.0.0/22",
  "103.132.0.0/22",
  "103.133.0.0/22",
  "103.134.0.0/22",
  "103.135.0.0/22",
  "103.136.0.0/22",
  "103.137.0.0/22",
  "103.138.0.0/22",
  "103.139.0.0/22",
  "103.140.0.0/22",
  "103.141.0.0/22",
  "103.142.0.0/22",
  "103.143.0.0/22",
  "103.144.0.0/22",
  "103.145.0.0/22",
  "103.146.0.0/22",
  "103.147.0.0/22",
  "103.148.0.0/22",
  "103.149.0.0/22",
  "103.150.0.0/22",
  "103.151.0.0/22",
  "103.152.0.0/22",
  "103.153.0.0/22",
  "103.154.0.0/22",
  "103.155.0.0/22",
  "103.156.0.0/22",
  "103.157.0.0/22",
  "103.158.0.0/22",
  "103.159.0.0/22",
  "103.160.0.0/22",
  "103.161.0.0/22",
  "103.162.0.0/22",
  "103.163.0.0/22",
  "103.164.0.0/22",
  "103.165.0.0/22",
  "103.166.0.0/22",
  "103.167.0.0/22",
  "103.168.0.0/22",
  "103.169.0.0/22",
  "103.170.0.0/22",
  "103.171.0.0/22",
  "103.172.0.0/22",
  "103.173.0.0/22",
  "103.174.0.0/22",
  "103.175.0.0/22",
  "103.176.0.0/22",
  "103.177.0.0/22",
  "103.178.0.0/22",
  "103.179.0.0/22",
  "103.180.0.0/22",
  "103.181.0.0/22",
  "103.182.0.0/22",
  "103.183.0.0/22",
  "103.184.0.0/22",
  "103.185.0.0/22",
  "103.186.0.0/22",
  "103.187.0.0/22",
  "103.188.0.0/22",
  "103.189.0.0/22",
  "103.190.0.0/22",
  "103.191.0.0/22",
  "103.192.0.0/22",
  "103.193.0.0/22",
  "103.194.0.0/22",
  "103.195.0.0/22",
  "103.196.0.0/22",
  "103.197.0.0/22",
  "103.198.0.0/22",
  "103.199.0.0/22",
  "103.200.0.0/22",
  "103.201.0.0/22",
  "103.202.0.0/22",
  "103.203.0.0/22",
  "103.204.0.0/22",
  "103.205.0.0/22",
  "103.206.0.0/22",
  "103.207.0.0/22",
  "103.208.0.0/22",
  "103.209.0.0/22",
  "103.210.0.0/22",
  "103.211.0.0/22",
  "103.212.0.0/22",
  "103.213.0.0/22",
  "103.214.0.0/22",
  "103.215.0.0/22",
  "103.216.0.0/22",
  "103.217.0.0/22",
  "103.218.0.0/22",
  "103.219.0.0/22",
  "103.220.0.0/22",
  "103.221.0.0/22",
  "103.222.0.0/22",
  "103.223.0.0/22",
  "103.224.0.0/22",
  "103.225.0.0/22",
  "103.226.0.0/22",
  "103.227.0.0/22",
  "103.228.0.0/22",
  "103.229.0.0/22",
  "103.230.0.0/22",
  "103.231.0.0/22",
  "103.232.0.0/22",
  "103.233.0.0/22",
  "103.234.0.0/22",
  "103.235.0.0/22",
  "103.236.0.0/22",
  "103.237.0.0/22",
  "103.238.0.0/22",
  "103.239.0.0/22",
  "103.240.0.0/22",
  "103.241.0.0/22",
  "103.242.0.0/22",
  "103.243.0.0/22",
  "103.244.0.0/22",
  "103.245.0.0/22",
  "103.246.0.0/22",
  "103.247.0.0/22",
  "103.248.0.0/22",
  "103.249.0.0/22",
  "103.250.0.0/22",
  "103.251.0.0/22",
  "103.252.0.0/22",
  "103.253.0.0/22",
  "103.254.0.0/22",
  "103.255.0.0/22",
  "202.43.0.0/16",
  "202.44.0.0/16",
  "202.45.0.0/16",
  "202.46.0.0/16",
  "202.47.0.0/16",
  "202.48.0.0/16",
  "202.49.0.0/16",
  "202.50.0.0/16",
  "202.51.0.0/16",
  "202.52.0.0/16",
  "202.53.0.0/16",
  "202.54.0.0/16",
  "202.55.0.0/16",
  "202.56.0.0/16",
  "202.57.0.0/16",
  "202.58.0.0/16",
  "202.59.0.0/16",
  "202.60.0.0/16",
  "202.61.0.0/16",
  "202.62.0.0/16",
  "202.63.0.0/16",
  "202.64.0.0/16",
  "202.65.0.0/16",
  "202.66.0.0/16",
  "202.67.0.0/16",
  "202.68.0.0/16",
  "202.69.0.0/16",
  "202.70.0.0/16",
  "202.71.0.0/16",
  "202.72.0.0/16",
  "202.73.0.0/16",
  "202.74.0.0/16",
  "202.75.0.0/16",
  "202.76.0.0/16",
  "202.77.0.0/16",
  "202.78.0.0/16",
  "202.79.0.0/16",
  "202.80.0.0/16",
  "202.81.0.0/16",
  "202.82.0.0/16",
  "202.83.0.0/16",
  "202.84.0.0/16",
  "202.85.0.0/16",
  "202.86.0.0/16",
  "202.87.0.0/16",
  "202.88.0.0/16",
  "202.89.0.0/16",
  "202.90.0.0/16",
  "202.91.0.0/16",
  "202.92.0.0/16",
  "202.93.0.0/16",
  "202.94.0.0/16",
  "202.95.0.0/16",
  "202.96.0.0/16",
  "202.97.0.0/16",
  "202.98.0.0/16",
  "202.99.0.0/16",
  "202.100.0.0/16",
  "202.101.0.0/16",
  "202.102.0.0/16",
  "202.103.0.0/16",
  "202.104.0.0/16",
  "202.105.0.0/16",
  "202.106.0.0/16",
  "202.107.0.0/16",
  "202.108.0.0/16",
  "202.109.0.0/16",
  "202.110.0.0/16",
  "202.111.0.0/16",
  "202.112.0.0/16",
  "202.113.0.0/16",
  "202.114.0.0/16",
  "202.115.0.0/16",
  "202.116.0.0/16",
  "202.117.0.0/16",
  "202.118.0.0/16",
  "202.119.0.0/16",
  "202.120.0.0/16",
  "202.121.0.0/16",
  "202.122.0.0/16",
  "202.123.0.0/16",
  "202.124.0.0/16",
  "202.125.0.0/16",
  "202.126.0.0/16",
  "202.127.0.0/16",
  "202.128.0.0/16",
  "202.129.0.0/16",
  "202.130.0.0/16",
  "202.131.0.0/16",
  "202.132.0.0/16",
  "202.133.0.0/16",
  "202.134.0.0/16",
  "202.135.0.0/16",
  "202.136.0.0/16",
  "202.137.0.0/16",
  "202.138.0.0/16",
  "202.139.0.0/16",
  "202.140.0.0/16",
  "202.141.0.0/16",
  "202.142.0.0/16",
  "202.143.0.0/16",
  "202.144.0.0/16",
  "202.145.0.0/16",
  "202.146.0.0/16",
  "202.147.0.0/16",
  "202.148.0.0/16",
  "202.149.0.0/16",
  "202.150.0.0/16",
  "202.151.0.0/16",
  "202.152.0.0/16",
  "202.153.0.0/16",
  "202.154.0.0/16",
  "202.155.0.0/16",
  "202.156.0.0/16",
  "202.157.0.0/16",
  "202.158.0.0/16",
  "202.159.0.0/16",
  "202.160.0.0/16",
  "202.161.0.0/16",
  "202.162.0.0/16",
  "202.163.0.0/16",
  "202.164.0.0/16",
  "202.165.0.0/16",
  "202.166.0.0/16",
  "202.167.0.0/16",
  "202.168.0.0/16",
  "202.169.0.0/16",
  "202.170.0.0/16",
  "202.171.0.0/16",
  "202.172.0.0/16",
  "202.173.0.0/16",
  "202.174.0.0/16",
  "202.175.0.0/16",
  "202.176.0.0/16",
  "202.177.0.0/16",
  "202.178.0.0/16",
  "202.179.0.0/16",
  "202.180.0.0/16",
  "202.181.0.0/16",
  "202.182.0.0/16",
  "202.183.0.0/16",
  "202.184.0.0/16",
  "202.185.0.0/16",
  "202.186.0.0/16",
  "202.187.0.0/16",
  "202.188.0.0/16",
  "202.189.0.0/16",
  "202.190.0.0/16",
  "202.191.0.0/16",
  "202.192.0.0/16",
  "202.193.0.0/16",
  "202.194.0.0/16",
  "202.195.0.0/16",
  "202.196.0.0/16",
  "202.197.0.0/16",
  "202.198.0.0/16",
  "202.199.0.0/16",
  "202.200.0.0/16",
  "202.201.0.0/16",
  "202.202.0.0/16",
  "202.203.0.0/16",
  "202.204.0.0/16",
  "202.205.0.0/16",
  "202.206.0.0/16",
  "202.207.0.0/16",
  "202.208.0.0/16",
  "202.209.0.0/16",
  "202.210.0.0/16",
  "202.211.0.0/16",
  "202.212.0.0/16",
  "202.213.0.0/16",
  "202.214.0.0/16",
  "202.215.0.0/16",
  "202.216.0.0/16",
  "202.217.0.0/16",
  "202.218.0.0/16",
  "202.219.0.0/16",
  "202.220.0.0/16",
  "202.221.0.0/16",
  "202.222.0.0/16",
  "202.223.0.0/16",
  "202.224.0.0/16",
  "202.225.0.0/16",
  "202.226.0.0/16",
  "202.227.0.0/16",
  "202.228.0.0/16",
  "202.229.0.0/16",
  "202.230.0.0/16",
  "202.231.0.0/16",
  "202.232.0.0/16",
  "202.233.0.0/16",
  "202.234.0.0/16",
  "202.235.0.0/16",
  "202.236.0.0/16",
  "202.237.0.0/16",
  "202.238.0.0/16",
  "202.239.0.0/16",
  "202.240.0.0/16",
  "202.241.0.0/16",
  "202.242.0.0/16",
  "202.243.0.0/16",
  "202.244.0.0/16",
  "202.245.0.0/16",
  "202.246.0.0/16",
  "202.247.0.0/16",
  "202.248.0.0/16",
  "202.249.0.0/16",
  "202.250.0.0/16",
  "202.251.0.0/16",
  "202.252.0.0/16",
  "202.253.0.0/16",
  "202.254.0.0/16",
  "202.255.0.0/16",
  "203.0.0.0/16",
  "203.1.0.0/16",
  "203.2.0.0/16",
  "203.3.0.0/16",
  "203.4.0.0/16",
  "203.5.0.0/16",
  "203.6.0.0/16",
  "203.7.0.0/16",
  "203.8.0.0/16",
  "203.9.0.0/16",
  "203.10.0.0/16",
  "203.11.0.0/16",
  "203.12.0.0/16",
  "203.13.0.0/16",
  "203.14.0.0/16",
  "203.15.0.0/16",
  "203.16.0.0/16",
  "203.17.0.0/16",
  "203.18.0.0/16",
  "203.19.0.0/16",
  "203.20.0.0/16",
  "203.21.0.0/16",
  "203.22.0.0/16",
  "203.23.0.0/16",
  "203.24.0.0/16",
  "203.25.0.0/16",
  "203.26.0.0/16",
  "203.27.0.0/16",
  "203.28.0.0/16",
  "203.29.0.0/16",
  "203.30.0.0/16",
  "203.31.0.0/16",
  "203.32.0.0/16",
  "203.33.0.0/16",
  "203.34.0.0/16",
  "203.35.0.0/16",
  "203.36.0.0/16",
  "203.37.0.0/16",
  "203.38.0.0/16",
  "203.39.0.0/16",
  "203.40.0.0/16",
  "203.41.0.0/16",
  "203.42.0.0/16",
  "203.43.0.0/16",
  "203.44.0.0/16",
  "203.45.0.0/16",
  "203.46.0.0/16",
  "203.47.0.0/16",
  "203.48.0.0/16",
  "203.49.0.0/16",
  "203.50.0.0/16",
  "203.51.0.0/16",
  "203.52.0.0/16",
  "203.53.0.0/16",
  "203.54.0.0/16",
  "203.55.0.0/16",
  "203.56.0.0/16",
  "203.57.0.0/16",
  "203.58.0.0/16",
  "203.59.0.0/16",
  "203.60.0.0/16",
  "203.61.0.0/16",
  "203.62.0.0/16",
  "203.63.0.0/16",
  "203.64.0.0/16",
  "203.65.0.0/16",
  "203.66.0.0/16",
  "203.67.0.0/16",
  "203.68.0.0/16",
  "203.69.0.0/16",
  "203.70.0.0/16",
  "203.71.0.0/16",
  "203.72.0.0/16",
  "203.73.0.0/16",
  "203.74.0.0/16",
  "203.75.0.0/16",
  "203.76.0.0/16",
  "203.77.0.0/16",
  "203.78.0.0/16",
  "203.79.0.0/16",
  "203.80.0.0/16",
  "203.81.0.0/16",
  "203.82.0.0/16",
  "203.83.0.0/16",
  "203.84.0.0/16",
  "203.85.0.0/16",
  "203.86.0.0/16",
  "203.87.0.0/16",
  "203.88.0.0/16",
  "203.89.0.0/16",
  "203.90.0.0/16",
  "203.91.0.0/16",
  "203.92.0.0/16",
  "203.93.0.0/16",
  "203.94.0.0/16",
  "203.95.0.0/16",
  "203.96.0.0/16",
  "203.97.0.0/16",
  "203.98.0.0/16",
  "203.99.0.0/16",
  "203.100.0.0/16",
  "203.101.0.0/16",
  "203.102.0.0/16",
  "203.103.0.0/16",
  "203.104.0.0/16",
  "203.105.0.0/16",
  "203.106.0.0/16",
  "203.107.0.0/16",
  "203.108.0.0/16",
  "203.109.0.0/16",
  "203.110.0.0/16",
  "203.111.0.0/16",
  "203.112.0.0/16",
  "203.113.0.0/16",
  "203.114.0.0/16",
  "203.115.0.0/16",
  "203.116.0.0/16",
  "203.117.0.0/16",
  "203.118.0.0/16",
  "203.119.0.0/16",
  "203.120.0.0/16",
  "203.121.0.0/16",
  "203.122.0.0/16",
  "203.123.0.0/16",
  "203.124.0.0/16",
  "203.125.0.0/16",
  "203.126.0.0/16",
  "203.127.0.0/16",
  "203.128.0.0/16",
  "203.129.0.0/16",
  "203.130.0.0/16",
  "203.131.0.0/16",
  "203.132.0.0/16",
  "203.133.0.0/16",
  "203.134.0.0/16",
  "203.135.0.0/16",
  "203.136.0.0/16",
  "203.137.0.0/16",
  "203.138.0.0/16",
  "203.139.0.0/16",
  "203.140.0.0/16",
  "203.141.0.0/16",
  "203.142.0.0/16",
  "203.143.0.0/16",
  "203.144.0.0/16",
  "203.145.0.0/16",
  "203.146.0.0/16",
  "203.147.0.0/16",
  "203.148.0.0/16",
  "203.149.0.0/16",
  "203.150.0.0/16",
  "203.151.0.0/16",
  "203.152.0.0/16",
  "203.153.0.0/16",
  "203.154.0.0/16",
  "203.155.0.0/16",
  "203.156.0.0/16",
  "203.157.0.0/16",
  "203.158.0.0/16",
  "203.159.0.0/16",
  "203.160.0.0/16",
  "203.161.0.0/16",
  "203.162.0.0/16",
  "203.163.0.0/16",
  "203.164.0.0/16",
  "203.165.0.0/16",
  "203.166.0.0/16",
  "203.167.0.0/16",
  "203.168.0.0/16",
  "203.169.0.0/16",
  "203.170.0.0/16",
  "203.171.0.0/16",
  "203.172.0.0/16",
  "203.173.0.0/16",
  "203.174.0.0/16",
  "203.175.0.0/16",
  "203.176.0.0/16",
  "203.177.0.0/16",
  "203.178.0.0/16",
  "203.179.0.0/16",
  "203.180.0.0/16",
  "203.181.0.0/16",
  "203.182.0.0/16",
  "203.183.0.0/16",
  "203.184.0.0/16",
  "203.185.0.0/16",
  "203.186.0.0/16",
  "203.187.0.0/16",
  "203.188.0.0/16",
  "203.189.0.0/16",
  "203.190.0.0/16",
  "203.191.0.0/16",
  "203.192.0.0/16",
  "203.193.0.0/16",
  "203.194.0.0/16",
  "203.195.0.0/16",
  "203.196.0.0/16",
  "203.197.0.0/16",
  "203.198.0.0/16",
  "203.199.0.0/16",
  "203.200.0.0/16",
  "203.201.0.0/16",
  "203.202.0.0/16",
  "203.203.0.0/16",
  "203.204.0.0/16",
  "203.205.0.0/16",
  "203.206.0.0/16",
  "203.207.0.0/16",
  "203.208.0.0/16",
  "203.209.0.0/16",
  "203.210.0.0/16",
  "203.211.0.0/16",
  "203.212.0.0/16",
  "203.213.0.0/16",
  "203.214.0.0/16",
  "203.215.0.0/16",
  "203.216.0.0/16",
  "203.217.0.0/16",
  "203.218.0.0/16",
  "203.219.0.0/16",
  "203.220.0.0/16",
  "203.221.0.0/16",
  "203.222.0.0/16",
  "203.223.0.0/16",
  "203.224.0.0/16",
  "203.225.0.0/16",
  "203.226.0.0/16",
  "203.227.0.0/16",
  "203.228.0.0/16",
  "203.229.0.0/16",
  "203.230.0.0/16",
  "203.231.0.0/16",
  "203.232.0.0/16",
  "203.233.0.0/16",
  "203.234.0.0/16",
  "203.235.0.0/16",
  "203.236.0.0/16",
  "203.237.0.0/16",
  "203.238.0.0/16",
  "203.239.0.0/16",
  "203.240.0.0/16",
  "203.241.0.0/16",
  "203.242.0.0/16",
  "203.243.0.0/16",
  "203.244.0.0/16",
  "203.245.0.0/16",
  "203.246.0.0/16",
  "203.247.0.0/16",
  "203.248.0.0/16",
  "203.249.0.0/16",
  "203.250.0.0/16",
  "203.251.0.0/16",
  "203.252.0.0/16",
  "203.253.0.0/16",
  "203.254.0.0/16",
  "203.255.0.0/16",
  "210.0.0.0/16",
  "210.1.0.0/16",
  "210.2.0.0/16",
  "210.3.0.0/16",
  "210.4.0.0/16",
  "210.5.0.0/16",
  "210.6.0.0/16",
  "210.7.0.0/16",
  "210.8.0.0/16",
  "210.9.0.0/16",
  "210.10.0.0/16",
  "210.11.0.0/16",
  "210.12.0.0/16",
  "210.13.0.0/16",
  "210.14.0.0/16",
  "210.15.0.0/16",
  "210.16.0.0/16",
  "210.17.0.0/16",
  "210.18.0.0/16",
  "210.19.0.0/16",
  "210.20.0.0/16",
  "210.21.0.0/16",
  "210.22.0.0/16",
  "210.23.0.0/16",
  "210.24.0.0/16",
  "210.25.0.0/16",
  "210.26.0.0/16",
  "210.27.0.0/16",
  "210.28.0.0/16",
  "210.29.0.0/16",
  "210.30.0.0/16",
  "210.31.0.0/16",
  "210.32.0.0/16",
  "210.33.0.0/16",
  "210.34.0.0/16",
  "210.35.0.0/16",
  "210.36.0.0/16",
  "210.37.0.0/16",
  "210.38.0.0/16",
  "210.39.0.0/16",
  "210.40.0.0/16",
  "210.41.0.0/16",
  "210.42.0.0/16",
  "210.43.0.0/16",
  "210.44.0.0/16",
  "210.45.0.0/16",
  "210.46.0.0/16",
  "210.47.0.0/16",
  "210.48.0.0/16",
  "210.49.0.0/16",
  "210.50.0.0/16",
  "210.51.0.0/16",
  "210.52.0.0/16",
  "210.53.0.0/16",
  "210.54.0.0/16",
  "210.55.0.0/16",
  "210.56.0.0/16",
  "210.57.0.0/16",
  "210.58.0.0/16",
  "210.59.0.0/16",
  "210.60.0.0/16",
  "210.61.0.0/16",
  "210.62.0.0/16",
  "210.63.0.0/16",
  "210.64.0.0/16",
  "210.65.0.0/16",
  "210.66.0.0/16",
  "210.67.0.0/16",
  "210.68.0.0/16",
  "210.69.0.0/16",
  "210.70.0.0/16",
  "210.71.0.0/16"
  ];
const parsedRanges = INDONESIAN_IP_RANGES.map((range) => {
  const [ip, bits] = range.split("/");
  const prefix = Number.parseInt(bits, 10);
  return {
    range: ipaddr.parseCIDR(range),
    prefix,
  };
});
const uniqueProxies = new Set();
const uniqueIndonesianProxies = new Set();
const writtenProxies = new Set();
const writtenIndonesianProxies = new Set();
function isIndonesianIP(ip) {
  try {
    const addr = ipaddr.parse(ip);
    if (addr.kind() !== "ipv4") return false;

    return parsedRanges.some((range) => {
      return addr.match(range.range);
    });
  } catch (e) {
    return false;
  }
}
function isValidProxy(proxy) {
  const pattern = /^(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}):(\d{1,5})$/;
  if (!pattern.test(proxy)) return false;
  const [ip, port] = proxy.split(":");
  const portNum = Number.parseInt(port, 10);
  if (portNum < 1 || portNum > 65535) return false;
  try {
    ipaddr.parse(ip);
    return true;
  } catch (e) {
    return false;
  }
}
const cleanProxyString = (proxyStr) => {
  return proxyStr
    .replace(/http:\/\/|https:\/\/|socks4:\/\/|socks5:\/\/|\s+/g, "")
    .replace(/error|code/g, "")
    .replace(/:[A-Za-z]+/g, "");
};
const processProxies = async (proxyList) => {
  let validCount = 0;
  let indoCount = 0;
  for (const proxyString of proxyList) {
    if (isValidProxy(proxyString)) {
      validCount++;
      if (!uniqueProxies.has(proxyString)) {
        uniqueProxies.add(proxyString);
        const [ip] = proxyString.split(":");
        if (isIndonesianIP(ip)) {
          indoCount++;
          if (!uniqueIndonesianProxies.has(proxyString)) {
            uniqueIndonesianProxies.add(proxyString);
          }
        }
      }
    }
  }
  await writeProxiesToFile();
  return { valid: validCount, indo: indoCount };
};
const writeProxiesToFile = async () => {
  try {
    const newProxies = Array.from(uniqueProxies).filter((proxy) => !writtenProxies.has(proxy));
    const newIndoProxies = Array.from(uniqueIndonesianProxies).filter((proxy) => !writtenIndonesianProxies.has(proxy));
    if (newProxies.length > 0) {
      await appendFileAsync(outputFile, newProxies.join("\n") + "\n");
      newProxies.forEach((proxy) => writtenProxies.add(proxy));
    }
    if (newIndoProxies.length > 0) {
      await appendFileAsync(indonesianOutputFile, newIndoProxies.join("\n") + "\n");
      newIndoProxies.forEach((proxy) => writtenIndonesianProxies.add(proxy));
    }
    
    return { all: newProxies.length, indo: newIndoProxies.length };
  } catch (error) {
    return { all: 0, indo: 0 };
  }
};
const initFiles = () => {
  if (fs.existsSync(outputFile)) {
    fs.unlinkSync(outputFile);
  }
  if (fs.existsSync(indonesianOutputFile)) {
    fs.unlinkSync(indonesianOutputFile);
  }
  fs.writeFileSync(outputFile, "");
  fs.writeFileSync(indonesianOutputFile, "");
};
const createAxiosInstance = (axios) => {
  return axios.create({
    timeout: 15000,
    headers: {
      "User-Agent":
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/134.0.0.0 Safari/537.36",
      "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8",
      "Accept-Language": "en-US,en;q=0.9",
      "Cache-Control": "no-cache",
    },
  });
};
module.exports = {
  isIndonesianIP,
  isValidProxy,
  cleanProxyString,
  processProxies,
  writeProxiesToFile,
  initFiles,
  createAxiosInstance,
  uniqueProxies,
  uniqueIndonesianProxies,
  writtenProxies,
  writtenIndonesianProxies,
  outputFile,
  indonesianOutputFile,
};