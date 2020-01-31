import smtplib, ssl, sys
def sendGmail(otherUser, address):
    message = 'I need narcan at' + str(address)
    lifePulseUser = 'lifepulseminnehack@gmail.com'
    lifePulsePass = 'minnehack2020'
    toSend = otherUser
    server = smtplib.SMTP('smpt.gmail.com', 587)
    server.starttls()
    server.login(lifePulseUser, lifePulsePass)
    server.sendmail(lifePulseUser, toSend, message)
    server.quit()
sendGmail(sys.argv[1], sys.argv[2])