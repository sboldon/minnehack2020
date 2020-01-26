import googlemaps as gm
import os
from dotenv import load_dotenv
load_dotenv()

class Address:
    def __init__(self):
        self.key = os.getenv("API_KEY") 
        self.client = gm.Client(self.key)
        self.findlatlong()
    
    def findlatlong(self):
        self.geoValue = self.client.geolocate()
        #self.lat = self.geoValue['location']['lat']
        #self.lng = self.geoValue['location']['lng']

    def getAddress(self):
        self.myAddress = self.client.reverse_geocode((self.lat, self.lng))
        return self.myAddress