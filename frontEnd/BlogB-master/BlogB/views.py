from django.http import HttpResponse
from django.shortcuts import render, render_to_response
from django.http import JsonResponse
import time
from . import mongodb
from . import publicFun
import random
from channels.generic.websocket import WebsocketConsumer
import json
import re
import os
import base64
from django.conf import settings
############## db ##################
from pymongo import MongoClient
conn = MongoClient('0.0.0.0', 27017)
db = conn.blog
############## eb end ##############
############## global ##############
# passwdKey = str(random.randint(0, 999999999999999999999999999999999999999999999999999999999999999)).zfill(999)
passwdKey = str('6666')
############## global end ##########
def dbIndex(request):
    user1 = mongodb.User(
            username='aa',
            website='www.google.com',
            tags=['111','121','111']
    )
    user1.save()
    Oid = user1.id
    return HttpResponse(Oid)
def post(request):
    if request.method == 'GET':
        return render(request,'post.html')
    else:
        username = request.POST.get('username','')
        password = request.POST.get('password','')
        return JsonResponse({'username': username, "password": password})
def checkLogin(request):
    if request.method == 'POST':
        userToken = request.POST.get('token', '')
        userName = request.POST.get('name', '')
        userInfo = db.userInfo.find_one({'name': userName})
        if  userInfo is not None:
            if str(userInfo["token"]) == str(userToken):
                return JsonResponse({'res': 'pass'})
            else:
                return JsonResponse({'res': 'error'})
        else:
            return JsonResponse({'res': 'error'})
    else:
        pass
def login(request): 
    if request.method == "POST":
        userName = request.POST.get('name', '')
        userPasswd = request.POST.get('passwd', '')
        userInfo = db.userInfo.find_one({'name': userName})
        if userInfo is not None:
            if str(userInfo['passwd']) == str(userPasswd):
                return JsonResponse({
                    'res': {
                        'state': 'ok',
                        'token': userInfo['token'],
                        'name': userName
                    }
                })
            else:
                return JsonResponse({
                    'res':{'state': 'error'}
                })
        else:
            return JsonResponse({
                'res':{'state': 'error'}
            })
    else:
        pass
def getMenu(request):
    if request.method == 'GET':
        dat =  JsonResponse([
            {
                'label': 'file',
                'action': ''
            },
            {
                'label': 'edit',
                'action': ''
            },
            {
                'label': 'select',
                'action': ''
            }
        ], safe=False)
        return dat
def getNotifyNumber(request):
    if request.method == 'GET':
        col = db.desktopIconList
        countArticle = col.find().count()
        dat = JsonResponse({'data': countArticle}, safe=False)
        return dat
    else: 
        pass
def getDesktopIconList(request):
    if request.method == 'POST':

        userName = request.POST.get('name', '')
        userToken = request.POST.get('token', '')

        if userName and userToken:
            reqArr = []

            colUser = db.userInfo
            col = db.desktopIconList

            # name at userinfo ?
            searchUser = colUser.find_one({'name': userName})

            if searchUser['token'] == userToken:
                if searchUser:
                    # check power
                    if str(searchUser['power']) == 'root':
                        findData = col.find()
                        for i in findData:
                            i.pop('_id')
                            i.pop('content')
                            reqArr.append(i)
                        dat = JsonResponse(reqArr, safe=False)
                        return dat
                    else:
                        findNormanData = col.find({'author': userName})
                        for i in findNormanData:
                            i.pop('_id')
                            i.pop('content')
                            reqArr.append(i)
                        dat = JsonResponse(reqArr, safe=False)
                        return dat
            else:
                return JsonResponse({'msg': 'err'})
        else:
            return JsonResponse({'msg': 'err'})
def getSidebarIconList(request):
    if request.method == 'POST':
        dat = JsonResponse([
            {
                'label': 'Baidu',
                'img': '',
                'url': 'https://www.baidu.com'
            },
            {
                'label': 'Arch',
                'img': '',
                'url': 'https://www.archlinux.org/'
            },
            {
                'label': 'Github',
                'img': '',
                'url': 'https://github.com/'
            },
            {
                'label': 'Kernel',
                'img': '',
                'url': 'https://www.kernel.org/'
            },
            {
                'label': 'Distrowatch',
                'img': '',
                'url': 'https://distrowatch.org/'
            }
        ], safe=False)
        return dat
def getWindowContent(request):
    if request.method == 'POST':
        id = request.POST.get('id','')
        if id:
            findDat = db.desktopIconList.find_one({"id":id})
            return JsonResponse({
                'id': findDat['id'],
                'img': findDat['img'],
                'contentType': findDat['content']['contentType'],
                'data': [
                    {
                        'h1': findDat['content']['data'][0]['h1'],
                        'content': findDat['content']['data'][0]['content'],
                    }    
                ]
            })
def getSidebarPopContent(request):
    if request.method == 'POST':
        id = request.POST.get('id','')
        userName = request.POST.get('name', '')
        userToken = request.POST.get('token', '')

        colUser = db.userInfo
        col = db.desktopIconList
        col_file = db.uploadFile

        searchUser = colUser.find_one({'name': userName})
        if searchUser['token'] == userToken:
            if str(searchUser['power']) == 'root':
                findDat = col.find({},{'label':1,'date':1,'id':1})
                # findDat = col.find({}, {"label": 1})
                dat = {
                    'id': id,
                    'content': []
                }
                if id == 'num0':
                    for i in findDat:
                        label = i['label']
                        date  = i['date']
                        id    = i['id']
                        dat['content'].append({'label':label,'date':date,'id':id})
                else:
                    dat['content'].append({'label': 'other'})
                dat['content'].reverse()
                return JsonResponse(dat)
            else:
                findDat   = col.find({'author': userName})
                findDat_f = col_file.find({'author': userName})
                # findDat = col.find({}, {"label": 1})
                dat = {
                    'id': id,
                    'content': []
                }
                if id == 'num0':
                    for i in findDat:
                        label = i['label']
                        date  = i['date']
                        id    = i['id']
                        types = 'article'
                        dat['content'].append({'label':label,'date':date,'id':id,'type': types})
                    for j in findDat_f:
                        label = j['name']
                        date  = time.strftime("%Y-%m-%d week %w %H:%M:%S", time.localtime(float(j['id'])))
                        id    = j['id']
                        typef = 'file'
                        dat['content'].append({'label':label,'date':date,'id':id,'type': typef})
                else:
                    dat['content'].append({'label': 'other'})
                dat['content'].reverse()
                return JsonResponse(dat)
# key and key check
# set pop pwd
# set
def setSidebarPopEditPasswordCheck(request):
    global passwdKey
    passwdKey = str(random.randint(0, 9999)).zfill(4)
    if request.method == 'POST':
        # set key
        publicFun.sendMail(passwdKey)
        return JsonResponse({'res': '...'})
# get pop pwd
# get
def getSidebarPopEditPasswordCheck(request): 
    if request.method == 'POST':
        pwd = request.POST.get('pwd','')
        if str(pwd) == passwdKey:
            return JsonResponse({'data': 'true'})
        else:
            return JsonResponse({'data': 'false'})
# New Article
def getSubmitNewArticle(request):
    if request.method == 'POST':
        h1          = request.POST.get('h1')
        date        = request.POST.get('date')
        iconLabel   = request.POST.get('img')
        contentType = request.POST.get('contentType')
        content     = request.POST.get('content')
        name        = request.POST.get('name')
        token       = request.POST.get('token')

        userInfo = db.userInfo.find_one({'token': token})
        if userInfo is not None:
            if userInfo['name'] == name:
                col = db.desktopIconList
                times = time.time()
                dbDat = {
                    "label":h1,
                    "img": iconLabel,
                    "url": '',
                    "author": name,
                    "date": date,
                    "id": str( times * 1000),
                    "content" : {
                        "contentType": contentType,
                        "data": [{
                            "h1": h1,
                            "content": content
                        }]
                    }
                }
                col.save(dbDat)
                return JsonResponse({'res': 'ok'})
            else:
                return JsonResponse({'res': 'err'})
        else:
            pass
# Edit Article
def getSubmitEditArticle(request):
    if request.method == 'POST':
        id          = request.POST.get('id')
        h1          = request.POST.get('h1')
        date          = request.POST.get('date')
        iconLabel   = request.POST.get('img')
        contentType = request.POST.get('contentType')
        content     = request.POST.get('content')

        name        = request.POST.get('name')
        token       = request.POST.get('token')
        userInfo = db.userInfo.find_one({'token': token})
        if userInfo is not None:
            if userInfo['name'] == name:
                col = db.desktopIconList
                col.update({"id":id},{"$set": {
                    "label":h1,
                    "img": iconLabel,
                    "url": '',
                    "date": date,
                    "id": id,
                    "content" : {
                        "contentType": contentType,
                        "data": [{
                            "h1": h1,
                            "content": content
                        }]
                    }
                }})
                return JsonResponse({'res': 'ok'})
            else:
                return JsonResponse({'res': 'err'})
        else:
            pass
# Delete History
def getDeleteSidebarPopHistory(request):
    if request.method == 'POST':
        id          = request.POST.get('id')
        name        = request.POST.get('name')
        types       = request.POST.get('type')
        token       = request.POST.get('token')
        userInfo    = db.userInfo.find_one({'token': token})
        print("iii",name, types, token, userInfo)
        if userInfo is not None:
            if userInfo['name'] == name:

                col      = db.desktopIconList
                col_file = db.uploadFile

                if types == 'article':
                    col.remove({'id':id})
                    return JsonResponse({'res': 'ok'})
                elif types == 'file':
                    # del
                    db_findFile = col_file.find_one({'id':id})
                    imgDir = settings.STATIC_URL
                    findFile_name = db_findFile['name']
                    f = os.path.join(imgDir, findFile_name)
                    os.remove(f.lstrip('/'))
                    col_file.remove({'id':id})

                    return JsonResponse({'res': 'ok'})
            else:
                return JsonResponse({'res': 'err'})
        else:
            pass

def getWeather(request):
    if request.method == 'POST':
        dat = publicFun.getPositionWeather()
        return JsonResponse({'res': dat})
def searchArticle(request):
    if request.method == 'POST':
        keyword = request.POST.get('dat','')
        typeword = request.POST.get('type','')
        userName = request.POST.get('name','')
        userToken = request.POST.get('token','')

        colUser = db.userInfo
        col = db.desktopIconList

        tmp_type_arr = []

        searchUser = colUser.find_one({'name': userName})
        if searchUser['token'] == userToken:
            if str(searchUser['power']) == 'root':
                allCollectionItem = col.find()

                # search type
                for ti in allCollectionItem:
                    if typeword == 'All':
                        tmp_type_arr.append(ti)
                    else:
                        if ti['img'] == typeword:
                            tmp_type_arr.append(ti)

                # search keyword
                tmp_label_arr = []
                for i in tmp_type_arr:
                    if re.search(keyword, i['label']):
                        tmp_label_arr.append(i['label'])

                reqArr = []
                for i in tmp_label_arr:
                    result_col = col.find({'label': i})
                    for j in result_col:
                        j.pop('_id')
                        j.pop('content')
                        reqArr.append(j)

                dat = JsonResponse(reqArr, safe=False)
                return dat
            else:
                allCollectionItem = col.find({'author': userName})

                # search type
                for ti in allCollectionItem:
                    if typeword == 'All':
                        tmp_type_arr.append(ti)
                    else:
                        if ti['img'] == typeword:
                            tmp_type_arr.append(ti)

                # search keyword
                tmp_label_arr = []
                for i in tmp_type_arr:
                    if re.search(keyword, i['label']):
                        tmp_label_arr.append(i['label'])

                reqArr = []
                for i in tmp_label_arr:
                    result_col = col.find({'label': i})
                    for j in result_col:
                        j.pop('_id')
                        j.pop('content')
                        reqArr.append(j)

                dat = JsonResponse(reqArr, safe=False)
                return dat

    else:
        return JsonResponse({'res': 'notin'})

# client upload
def uploadFile(request):
    if request.method == "POST":
        myFile = request.FILES.get("upFile", None)
        name = request.POST.get("name", None)
        author = request.POST.get("author", None)
###############################################
        if myFile != None:
            # if req img name == dir in img name
            imgDir = settings.STATIC_URL
            imgNameList = os.listdir(imgDir.lstrip('/'))
            if str(author + '_' + name) in imgNameList:
                return JsonResponse({
                    "res": {
                        'state': 'exist'
                    }
                })
###############################################                
            else:
                # else save img
                file_path = os.path.join('img', author + '_' + name)

                store_f = open(file_path, 'wb')
                for chunk in myFile.chunks():
                    store_f.write(chunk)
                store_f.close()
###############################################
                # save to db
                # f = open(file_path, 'rb')
                # base64_f = base64.b64encode(f.read())
                # f.close()

                col = db.uploadFile
                col.insert({
                    # 'base64': base64_f.decode(),
                    'name': author+ '_' + name,
                    'author': author,
                    'type': '',
                    'id': str(time.time())
                })
                # print(base64_f.decode())
                return JsonResponse({
                     "res": {
                        'state': 'ok',
                        'name': str(file_path),
                        'author': str(author),
                        # 'base64': base64_f.decode()
                    }
                })
###############################################
            # return render_to_response('./img/1535512636311子弹.svg', locals())
        else:
            return JsonResponse({
                "res": {
                    'state': 'err'
                }
            })
# client download
def getImgList(request):
    if request.method == "POST":
        userName = request.POST.get("author", None)
        userToken = request.POST.get('token','')
        if userName and userToken:
            colUser = db.userInfo
            col_f = db.uploadFile

            searchUser = colUser.find_one({'name': userName})

            if searchUser['token'] == userToken:
                linkArr = col_f.find({"author": userName})
                # get img dir list
                imgDir = settings.STATIC_URL
                imgListName_tmp = []
                for list in linkArr:
                    imgListName_tmp.append(
                        imgDir + list['name']
                    )
                return JsonResponse({
                    "res": {
                        'state': 'ok',
                        'list': imgListName_tmp
                    }
                })
            else:
                return JsonResponse({
                    "res": {
                        'state': 'err',
                    }
                })
        else:
            return JsonResponse({
                "res": {
                    'state': 'err',
                }
            })
def getMonitor(request):
    if request.method == "GET":
        cmdRet = os.popen('df -h')
        cmdRet_r = cmdRet.readlines()
        res_line = ''
        for line in cmdRet_r:
            res_line += line
        return JsonResponse({
            "res": {
                'content': res_line,
            }
        }) 