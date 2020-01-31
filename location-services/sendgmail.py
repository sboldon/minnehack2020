import smtplib, ssl, sys
def sendGmail(otherUser, address):
    message = 'I need narcan at' + str(address)
    server = smtplib.SMTP('smpt.gmail.com', 587)
    server.starttls()
    server.login('lifepulseminnehack@gmail.com', 'minnehack2020')
    server.sendmail('lifepulseminnehack@gmail.com', otherUser, message)
    server.quit()
sendGmail(sys.argv[1], sys.argv[2])