from location import Address
import gsmmodem
import sys

class messageToSend:
    def __init__(self, listOfPhones):
        self.listOfPhones = listOfPhones
        myAddressObject = Address()
        myAddress = myAddressObject.getAddress()
        myMessage = 'I need narcan at ' + str(myAddress)
        sendingSMS(self, self.listOfPhones)

    def sendingSMS(self, listPhones):
        for phones in listPhones:
            gsmmodem.sendSms(destination=phones, text=myMessage)

emergency = messageToSend(sys.arg[1])