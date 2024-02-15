 class LaundryPro {

  toRadians = function(degree){
    return (degree * Math.PI) / 180;
  };

  haversineDistance = function(coord1, coord2) {
      const R = 3959; // Earth radius in miles
      const lat1 = this.toRadians(coord1.latitude);
      const lon1 = this.toRadians(coord1.longitude);
      const lat2 = this.toRadians(coord2.lat);
      const lon2 = this.toRadians(coord2.lng);

      const dlat = lat2 - lat1;
      const dlon = lon2 - lon1;

      const a =
        Math.sin(dlat / 2) ** 2 +
        Math.cos(lat1) * Math.cos(lat2) * Math.sin(dlon / 2) ** 2;

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

      const distance = R * c;
      return distance;
    };

    handleCalculateDistance = function(otherCoords){
      const calculatedDistance = this.haversineDistance(this.address.location, otherCoords);

      return calculatedDistance.toFixed(1);
    };


    constructor(data) {
      this.userPaused = data.userPaused;
      this.extraServices = data.extraServices?.map(serviceData => new ExtraService(serviceData));
      this.workingRadiusInMiles = data.workingRadiusInMiles;
      this.description = data.description;
      this.enabled = data.enabled;
      this.creationDateMilliseconds = data.creationDateMilliseconds;
      this.dreeId = data.dreeId;
      this.name = data.name;
      this.openDaysAndHours = data.openDaysAndHours.map(dayData => new OpenDayAndHour(dayData));
      this.capacityPerDay = data.capacityPerDay;
      this.rating = new Rating(data.rating);
      this.id = data.id;
      this.address = new Address(data.address);
      this.machines = data.machines.map(machineData => new Machine(machineData));
      this.state = data.state;
      this.primaryPhotoUrl = data.primaryPhotoUrl || null;
      this.additionalHolidays = data.additionalHolidays ? data.additionalHolidays.map(date => new Holiday(date)) : [];
      this.userPaused = data.userPaused;
    }
  }
  
  class ExtraService {
    constructor(data) {
      this.price = data.price || null;
      this.service = data.service;
    }
  }
  
  class OpenDayAndHour {
    constructor(data) {
      this.dayOfTheWeek = data.dayOfTheWeek;
      this.closeTime = data.closeTime;
      this.openTime = data.openTime;
    }
  }
  
  class Rating {
    constructor(data) {
      this.dreeId = data.dreeId;
      this.reviewSummation = data.reviewSummation;
      this.numReviews = data.numReviews;
      this.id = data.id;
      this.storeId = data.storeId;
    }
  }
  
  class Address {
    constructor(data) {
      this.zip = data.zip;
      this.city = data.city;
      this.street = data.street;
      this.state = data.state;
      this.placeId = data.placeId;
      this.location = new Location(data.location);
    }
  }
  
  class Machine {
    constructor(data) {
      this.approvedMachineImageIds = data.approvedMachineImageIds;
      this.unapprovedMachineImageIds = data.unapprovedMachineImageIds || [];
      this.name = data.name;
      this.model = data.model;
      this.id = data.id;
      this.creationDateMilliseconds = data.creationDateMilliseconds;
    }
  }
  
  class Location {
    constructor(data) {
      this.latitude = data._latitude;
      this.longitude = data._longitude;
    }
  }
  
  class Holiday {
    constructor(date) {
      this.date = date;
    }
  }
  export default LaundryPro;