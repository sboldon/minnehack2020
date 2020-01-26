import googlemaps as gm
import os
from dotenv import load_dotenv
from location import Address
import sys

load_dotenv()
key = os.getenv("API_KEY")
gmaps = gm.Client(key) 
loc1 = sys.argv[1]
loc2 = sys.argv[2]

def checkIfClose(loc1, loc2):
    distanceMatrix = gmaps.distance_matrix(lo1,lo2)['rows'][0]['elements'][0]
    if distanceMatrix['distance']['value'] <= 1600:
        return True

checkIfClose(loc1, loc2)