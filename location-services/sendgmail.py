import smtplib, ssl, sys

class sendingEmail:
    def __init__(self, otherUser, address):
        self.message = 'I need narcan at ' + str(address)
        self.smtp_server = 'smpt.gmail.com'
        self.otherUser = otherUser
        self.lifePulseEmail = 'lifepulseminnehack@gmail.com'
        self.lifePulsePassword = 'minnehack2020'
        self.sendTheMessage()
    
    def sendTheMessage(self):
        server = smtplib.SMTP('smtp.gmail.com', 587)
        server.starttls()
        server.login(self.lifePulseEmail, self.lifePulsePassword)
        server.sendmail(self.lifePulseEmail, self.otherUser, self.message)
        server.quit()

emailToSend = sendingEmail(sys.argv[1], sys.argv[2])
