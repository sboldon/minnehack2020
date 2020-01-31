import sys
sendGmail(sys.argv[1], sys.argv[2])
def sendGmail(otherUser, address):
    import smtplib, ssl
    message = 'I need narcan at' + str(address)
    server = smtplib.SMTP('smpt.gmail.com', 587)
    server.starttls()
    server.login('lifepulseminnehack@gmail.com', 'minnehack2020')
    server.sendmail('lifepulseminnehack@gmail.com', otherUser, message)
    server.quit()