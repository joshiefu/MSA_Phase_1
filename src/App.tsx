import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import * as React from 'react';

import './App.css';
// import { Label } from 'react-bootstrap';

import * as Request from 'request';



interface IState{
  apiValue: any,
  inputString: any,
  searchedCity: any,
  titleC: any,
  weatherString: any,
  woeID: any;
  searchState: boolean;
}

interface ICityQueryResult {
  latt_long: string,
  location_type: string,
  title: string,
  woeid: number,
}



export default class App extends React.Component<{}, IState> {

constructor(props: any){
  super(props);
  this.state = {
    apiValue: 0,
    inputString: '',
    searchState: false,
    searchedCity: '',
  
    titleC: 'Please Enter City Name',
    weatherString: '',
    woeID: 0,
    

  }
  this.whenClicked = this.whenClicked.bind(this);
  this.whenEntered = this.whenEntered.bind(this);
}

/**
 * whenClicked
 */

public whenClicked() {
  if(this.state.inputString === ''){
    this.setState( {
      searchState: false,
      titleC: 'Please enter city name',
      weatherString: '',
    });
    document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/42/55/cold_foliage_forest_hills_landscape_mountains_nature_sky-936796.jpg!d')";
    return;
  }
  this.setState(
    { searchedCity: this.state.inputString, searchState: true}
  ,() => {

    const URI = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/search/?query="+this.state.searchedCity;
  Request.get(URI, (error, response) => {
    if(error) {
      // tslint:disable-next-line:no-console
      console.error(error);
      return;
    }

    const cities: ICityQueryResult[] = JSON.parse(response.body);
    
    if(cities.length === 0){
      
      this.setState( {
        searchState: false,
        titleC: 'City Not Found',
        weatherString: '',
      });
      document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/42/55/cold_foliage_forest_hills_landscape_mountains_nature_sky-936796.jpg!d')";
      return;
    }
   
    const woeID = cities[0].woeid;
    const city = cities[0].title;
    
    const URIWoe = "https://cors-anywhere.herokuapp.com/https://www.metaweather.com/api/location/"+woeID+"/";

  Request.get(URIWoe, (err, resp) => {
    if(error) {
      // tslint:disable-next-line:no-console
      console.error(err);
      return;
    }

    const weathers = JSON.parse(resp.body);
    
    const todaysWeather = weathers.consolidated_weather[0];

    // tslint:disable-next-line:no-console
     console.log(todaysWeather);

    
    this.setState( {
      searchState: false,
      weatherString: todaysWeather.weather_state_name,
  
    }
    )
    this.setState( {
      titleC: city
    }
    )
    
    if (this.state.weatherString === "Snow") {
      document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/ac/46/electric_peak_sunset_twilight_dusk_mountains_gallatin_range_snow_wilderness-1278541.jpg!d')";
    }
    if (this.state.weatherString === "Sleet") {
      document.body.style.filter = "https://get.pxhere.com/photo/tree-forest-branch-plant-leaf-flower-frost-storm-flora-trees-shrub-deciduous-thunderstorm-woodland-protection-hail-precipitate-flowering-plant-hailstones-woody-plant-land-plant-ice-lumps-1025208.jpg";
    }
    if (this.state.weatherString === "Hail") {
      document.body.style.backgroundImage = "url('https://get.pxhere.com/photo/tree-forest-branch-plant-leaf-flower-frost-storm-flora-trees-shrub-deciduous-thunderstorm-woodland-protection-hail-precipitate-flowering-plant-hailstones-woody-plant-land-plant-ice-lumps-1025208.jpg')";
    }
    if (this.state.weatherString === "Thunderstorm") {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1457528877294-b48235bdaa68?ixlib=rb-0.3.5&s=1a08d663fe7b15e6c0ffb707e23d5808&auto=format&fit=crop&w=1350&q=80')";
    }
    if (this.state.weatherString === "Heavy Rain") {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1508558987414-f9a951573609?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d0db21ebd99d8b879142f0b9b56ad44d&auto=format&fit=crop&w=751&q=80')";
    }
    if (this.state.weatherString === "Light Rain") {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1527571083252-f24c32e9d8c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93e5ef605a2fbb21a3aefa5abfe90d7b&auto=format&fit=crop&w=750&q=80')";
    }
    if (this.state.weatherString === "Showers") {
      document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1527571083252-f24c32e9d8c1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=93e5ef605a2fbb21a3aefa5abfe90d7b&auto=format&fit=crop&w=750&q=80')";
    }
    if (this.state.weatherString === "Light Cloud") {
      document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/60/1a/clouds_foggy_haze_HD_wallpaper_landscape_mountains_nature_scenery-942863.jpg!d')";
    }
    if (this.state.weatherString === "Heavy Cloud") {
      document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/4f/9a/japan_sea_winter_road_hokkaido_sea_it_was_cloudy_weather_storm_evening-1196555.jpg!d')";
    }
    if (this.state.weatherString === "Clear") {
      document.body.style.backgroundImage = "url('https://c.pxhere.com/photos/42/55/cold_foliage_forest_hills_landscape_mountains_nature_sky-936796.jpg!d')";
    }

    

  });
    });

    
  });


  
}


 /**
  * whenEntered
  */
 public whenEntered(event: {target: { value: any;};}) {
   this.setState(
     {inputString : event.target.value}
   );
}





  public render() {

  if(this.state.searchState === true){
    return (
      <div className="progress"> 
        <CircularProgress thickness={3} />
      </div>
    )
  }
    return (
      
        <div className="container-fluid">
          <div className="centreText">
            {/* React components must have a wrapper node/element */}
           
            <h1>{this.state.titleC}</h1>
            <h2>{this.state.weatherString}</h2>
          </div>

          <div className="searchBar">
            {/* <input type="text" value={this.state.inputString} onChange={this.whenEntered} /> */}
            <TextField className="searchBar" autoFocus={true} value={this.state.inputString} onChange={this.whenEntered} defaultValue="Auckland" margin="normal" placeholder="Auckland" />
          </div>
          
          <div className="searchButton">
           {/* <button onClick={this.whenClicked} className="button" > Search </button> */}
           <Button variant="contained" size="medium" color="secondary" onClick={this.whenClicked}>
            Search
          </Button>
          </div>
        
      </div>
 
    );
  }
}
