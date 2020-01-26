import googlemaps as gm
import os
from dotenv import load_dotenv
load_dotenv()

class Address:
    def __init__(self):
        self.key = os.getenv("API_KEY") 
        self.client = gm.Client(self.key)
    
    def findlatlong(self):
        self.geoValue = self.client.geolocate()
        self.latitude = self.geoValue['location']['lat']
        self.longitude = self.geoValue['location']['lng']
        return (self.latitude, self.longitude)

    def getAddress(self):
        self.findlatlong()
        self.myAddress = self.client.reverse_geocode((self.latitude, self.longitude)) 
        return self.myAddress[0]['formatted_address']