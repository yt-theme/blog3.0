import smtplib
import urllib.request
from email.header import Header
from email.mime.text import MIMEText
from pypinyin import lazy_pinyin
import re
def getPositionWeather():
    posResquest = str(urllib.request.urlopen('http://pv.sohu.com/cityjson').read(), encoding="gbk")
    pos_obj = posResquest.split('=')[1].split(',')[2].split('"')[3]
    toPinyin = lazy_pinyin(pos_obj)
    # print('pos_obj', toPinyin.index('sheng'))
    Position_sheng = toPinyin.index('sheng')
    Position_shi   = toPinyin.index('shi')
    sheng = ''.join(toPinyin[0:Position_sheng])
    shi = ''.join(toPinyin[Position_sheng + 1:Position_shi])
    # weatherUrl = 'http://qq.ip138.com/weather/' + sheng + '/' + shi + '.htm'
    weatherUrl = 'http://qq.ip138.com/weather/HeBei/QinHuangDao.htm'
    weatherObj = str(urllib.request.urlopen(weatherUrl).read(), encoding="gbk")
    # print(weatherObj)
    weather_pattern     = 'alt="(.+?)"'
    weather             = re.findall(weather_pattern, weatherObj)
    temperature_pattern = '<td>([-]?\d{1,2}.+)</td>'
    temperature         = re.findall(temperature_pattern, weatherObj)
    # print(weather[0] + temperature[0])
    return [pos_obj, weather[0], temperature[0]]
def sendMail(strings):
    # sender
    sender = '16630501631@163.com'
    senderName = '16630501631'
    senderPasswd = 'm123456'
    # receiver
    receiver = '13133528465@163.com'
    # sever
    smtpServer = 'smtp.163.com'

    # mail title
    mailTitle = 'yt-blog key'
    mailContent = strings

    message = MIMEText(mailContent, 'plain', 'utf-8')
    message['Form']    = sender
    message['To']      = receiver
    message['Subject'] = Header(mailTitle, 'utf-8')

    try: 
        smtp = smtplib.SMTP()
        smtp.connect(smtpServer)
        smtp.login(senderName, senderPasswd)
        smtp.sendmail(sender, receiver, message.as_string())
        print('smtp ok')
        smtp.quit()
    except smtplib.SMTPException:
        print('smtp err')