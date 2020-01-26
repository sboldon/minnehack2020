from location import Address
import gsmmodem
import sys

class messageToSend:
    def __init__(self, sys.arg[1]):
        self.listOfPhones = sys.arg[1]
        myAddressObject = Address()
        myAddress = myAddressObject.getAddress()
        myMessage = 'I need narcan at ' + str(myAddress)
        sendingSMS(self, self.listOfPhones)

    def sendingSMS(self, listPhones):
        for phones in listPhones:
            gsmmodem.sendSms(destination=phones, text=myMessage)