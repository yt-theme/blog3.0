"""BlogB URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from . import views
from django.conf import settings
from django.conf.urls.static import static
# from django.conf from settings
from django.views.static import serve

urlpatterns = [
    # path('admin/', admin.site.urls),
    # url(r'^admin/', include(admin.site.urls)),
    # url(r'^params_test/$',params_test),
    # url(r'^params_test_reg/str(?P<str>\w+)page(?P<page>\d+)/$',params_test_reg),
    url(r'^post/$',views.post),
    url(r'^checkLogin/$',views.checkLogin),
    url(r'^login/$',views.login),
    url(r'^getMenu/$',views.getMenu),
    url(r'^getNotifyNumber/$',views.getNotifyNumber),
    url(r'^getDesktopIconList/$',views.getDesktopIconList),
    url(r'^getSidebarIconList/$',views.getSidebarIconList),
    url(r'^getWindowContent/$',views.getWindowContent),
    url(r'^getSidebarPopContent/$',views.getSidebarPopContent),
    url(r'^dbIndex/$',views.dbIndex),
    url(r'^setSidebarPopEditPasswordCheck/$',views.setSidebarPopEditPasswordCheck),
    url(r'^getSidebarPopEditPasswordCheck/$',views.getSidebarPopEditPasswordCheck),
    url(r'^getSubmitNewArticle/$',views.getSubmitNewArticle),
    url(r'^getSubmitEditArticle/$',views.getSubmitEditArticle),
    url(r'^getDeleteSidebarPopHistory/$',views.getDeleteSidebarPopHistory),
    url(r'^getWeather/$',views.getWeather),
    url(r'^searchArticle/$',views.searchArticle),
    url(r'^uploadFile/$',views.uploadFile),
    url(r'^img/(?P<path>.*)/$', serve, {'document_root': settings.STATICFILES_DIRS[0]}),
    url(r'^getImgList/$',views.getImgList),
    url(r'^getMonitor/$',views.getMonitor),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)