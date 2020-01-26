import googlemaps as gm
import os
from dotenv import load_dotenv
load_dotenv()
key = os.getenv("API_KEY")
from location import Address
import sys
gmaps = gm.Client(key) 
my_dist = gmaps.distance_matrix('Delhi','Mumbai')['rows'][0]['elements'][0] 
loc1 = Address.getAddress()
loc2 = sys.argv[1]
def get_distance(loc1,loc2):
    return gmaps.distance_matrix(loc1,loc2)['rows'][0]['elements'][0]

def check_closeness(distmatrix):
    if distmatrix['distance']['value'] <= 1600:
        print('true')
        return True
    else:
        print('true1223')
        return False
def get_directions(loc1,loc2):
    if check_closeness(get_distance(loc1,loc2)) == True:
        return gmaps.directions(loc1,loc2)
    return False



