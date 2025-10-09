// cspell:disable
import { Zekr, ZekrPage } from "#types/content.model";
import { _azkar_alestikaz } from "./azkar-alestikaz";
import { _azkar_alkhalaa } from "./azkar-alkhalaa";
import { _azkar_almanzel } from "./azkar-almanzel";
import { _azkar_almasged } from "./azkar-almasged";
import { _azkar_almsaa } from "./azkar-almsaa";
import { _azkar_alnoum } from "./azkar-alnoum";
import { _azkar_alsalat } from "./azkar-alsalat";
import { _azkar_alsbah } from "./azkar-alsbah";
import { _azkar_alta3am } from "./azkar-alta3am";
import { _azkar_alwdoua } from "./azkar-alwdoua";
import { _azkar_khatm_alquran } from "./azkar-khatm-alquran";



export const AzkarPages: ZekrPage[] = [
    {
        id: '1',
        title: 'اذكار الصباح',
        icon: 'LightModeIcon',
        azkar: _azkar_alsbah
    },
    {
        id: '2',
        title: 'اذكار المساء',
        icon: 'NightsStayIcon',
        azkar: _azkar_almsaa
    },
    {
        id: '3',
        title: 'اذكار الاستيقاظ',
        icon: 'AccessibilityNewIcon',
        azkar: _azkar_alestikaz
    },
    {
        id: '4',
        title: 'اذكار النوم',
        icon: 'HotelIcon',
        azkar: _azkar_alnoum
    },
    {
        id: '5',
        title: 'اذكار الوضوء',
        icon: 'WashIcon',
        azkar: _azkar_alwdoua
    },
    {
        id: '6',
        title: 'اذكار المسجد',
        icon: 'MosqueIcon',
        azkar: _azkar_almasged
    },
    {
        id: '7',
        title: 'اذكار الطعام',
        icon: 'FastfoodIcon',
        azkar: _azkar_alta3am
    },
    {
        id: '8',
        title: 'اذكار الخلاء',
        icon: 'BathtubIcon',
        azkar: _azkar_alkhalaa
    },
    {
        id: '9',
        title: 'اذكار المنزل',
        icon: 'MapsHomeWorkIcon',
        azkar: _azkar_almanzel
    },
    {
        id: '10',
        title: 'اذكار ختم القرآن',
        icon: 'AutoStoriesIcon',
        azkar: _azkar_khatm_alquran
    },
    {
        id: '11',
        title: 'اذكار الصلاة',
        icon: 'Man4Icon',
        azkar: _azkar_alsalat
    },

]