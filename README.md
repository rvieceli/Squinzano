# Squinzano project

Copy of [Uber App](https://www.uber.com)


## How to test

1. ```$ git clone```
1. ```cd squinzano```
1. ```$ yarn```
1. [Create your google maps api](https://cloud.google.com/maps-platform/#get-started)
1. ```$ cp .env.example.json .env.json```
1. and put your google maps api key on ```.env.json```
1. and ```./android/app/src/main/AndroidManifest.xml```
>```
><meta-data
>  android:name="com.google.android.geo.API_KEY"
>  android:value="HERE"/>
>```
1. start android or ios emulator
1. ```$ npx react-native run-android``` or ```$ npx react-native run-ios```

<br />
<br />

_[**Squinzano**](https://wikipedia.org/wiki/Squinzano) is located in the province of Lecce, in the Puglia region, south of Italy._
