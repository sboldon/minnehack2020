import smtplib, ssl

class sendingEmail:
    def __init__(self, otherUser, address):
        self.message = 'I need narcan at ' + str(address)
        self.smtp_server = 'smpt.gmail.com'
        self.otherUser = otherUser
        self.lifePulseEmail = 'lifepulseminnehack@gmail.com'
        self.lifePulsePassword = 'minnehack2020'
        self.sendTheMessage()
    
    def sendTheMessage(self):
        context = ssl.create_default_context()
        with smtplib.SMTP_SSL('smpt.gmail.com', 465, context=context) as server:
            server.login(self.lifePulseEmail, self.lifePulsePassword)
            server.sendmail(self.lifePulseEmail, self.otherUser, self.message)


