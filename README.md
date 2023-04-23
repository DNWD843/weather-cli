# WEATHER-CLI   

## CLI for getting weather    

It's very simple console application to get current weather description in your console/terminal.  
Forecast source - [OpenWeather](https://openweathermap.org/)  
By default, `mad_weather_cli` uses demo-api-key, generated for free subscription plan and has calls limitations.  
For your own rules:  
- visit [OpenWeather](https://openweathermap.org/) website,  
- create an [account](https://home.openweathermap.org/users/sign_up),
- choose your [subscription plan](https://openweathermap.org/price),  
- generate your personal API_KEY   
- save your API_KEY in `mad_weather_cli` using command `weather -t [API_KEY]`  

All saved data will be stored in a file `weatherCli-data.json` in your home directory.  

### `Installation`  

Using NPM is recommended:  
`npm i mad_weather_cli -g`

### `Usage`    

Run commands below in your terminal or command line:  

`weather -h` - for help  

`weather` - to get current weather description for saved city  

`weather -s [CITY_NAME] or [CITY_NAME COUNTRY_CODE] or [CITY_NAME STATE_NAME COUNTRY_CODE]` - to save passed city as default  

`weather -w [CITY_NAME] or [CITY_NAME COUNTRY_CODE] or [CITY_NAME STATE_NAME COUNTRY_CODE]` - to get current weather description for passed city  

`weather -t [API_KEY]` - to save your api-key, generated on [OpenWeather](https://openweathermap.org/)  

More details on [OpenWeather](https://openweathermap.org/)  
