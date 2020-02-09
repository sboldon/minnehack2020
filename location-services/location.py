import googlemaps as gm
import os
from dotenv import load_dotenv
import sys
load_dotenv()


class Address:
    def __init__(self):
        self.key = os.getenv("API_KEY")
        self.client = gm.Client(self.key)
        self.getAddress()

    def getAddress(self):
        self.geoValue = self.client.geolocate()
        self.latlong = (self.geoValue['location']
                        ['lat'], self.geoValue['location']['lng'])
        self.addr = self.client.reverse_geocode(self.latlong)
        print(self.addr[0]['formatted_address'])
        sys.stdout.flush()
