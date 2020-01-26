import googlemaps

class Address:
    def __init__(self):
        self.key = 'his key'
        self.client = googlemaps.Client(self.key)
        self.findlatlong()
    
    def findlatlong(self):

