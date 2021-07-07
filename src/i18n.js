import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
    resources : {
        en: {
            translations: { 
                'Sign Up': 'Sign Up',
                'Login': 'Login',
                'Logout': 'Logout',
                'Password mismatch': 'Password mismatch',
                'Username': 'User Name',
                'Display Name': 'Display Name',
                'Password': 'Password',
                'Password Repeat': 'Password Repeat',
                'Users': 'Users',
                'Next': 'Next >',
                'Previous': '< Previous',
                'Load Failure':'Load Failure',
                'User Not Found':'User Not Found!',
                'Edit':'Edit',
                'Change Display Name':'Change Display Name',
                'Save':'Save',
                'Cancel':'Cancel',
                'Features': 'Features',
                'ABOUT':'ABOUT',
                'SERVICES':'SERVICES',
                'Contact':'Contact',
                'Access Deny': 'Access Deny',
                'My Profile' : 'My Profile',
                'User List' : 'User List',
                'DOWNLOAD':'DOWNLOAD',
                'Download':'Download',
                'Click For Download': 'Click For Download',
                'The password you entered does not match our records.':'The password you entered does not match our records.',
                'Entered same password with old password':'Entered same password with old password',
                'Enter Address Information':'Enter Address Information',
                'ABOUT US':'ABOUT US',
                'Signup for Download':'Signup for Download',
                'Our Services':'Our Services',
                'Temel Değerlerimiz':'Our Core Values',
                'fill the form':'Get In TouchPlease fill out the form below to send us an email and we will get back to you as soon as possible.',
                'Get In Touch':'Get In Touch',
                'Address':'Address',
                'Contact Info':'Contact Info'

               


            }
        },
        tr: {
            translations:{ 
                'Sign Up': 'Kayıt ol',
                'Login': 'Giriş',
                'Logout': 'Çıkış',
                'Password mismatch': 'Aynı şifreyi giriniz',
                'Username': 'Kullanıcı Adı',
                'Display Name': 'Tercih Edilen İsim',
                'Password': 'Şifre',
                'Password Repeat': 'Şifreyi Tekrarla',
                'Users': 'Kullanıcılar',
                'Next': 'Sonraki >',
                'Previous': '< Önceki',
                'Load Failure': 'Liste alınamadı, Tekrar giriş yaparak deneyebilirsiniz.',
                'User Not Found': 'Kullanıcı Bulunamadı! Tekrar giriş yaparak deneyebilirsiniz.',
                'Edit':'Düzenle',
                'Change Display Name':'Kullanıcı Adını Değiştir',
                'Save':'Kaydet',
                'Cancel':'İptal Et',
                'Features': 'Özellikler',
                'ABOUT':'HAKKIMIZDA',
                'SERVICES':'SERVİSLER',
                'Contact':'İletişim',
                'Access Deny': 'Yetkisiz işlem',
                'My Profile' : 'Hesabım',
                'User List' : 'Kullanıcı Listesi',
                'DOWNLOAD': 'İNDİR',
                'Download':'İndir',
                'Click For Download': 'İndirmek İçin Tıklayınız',
                'The password you entered does not match our records.':'Girmiş olduğunuz şifre kayıtlarımızdakiyle uyuşmamaktadır.',
                'Entered same password with old password': 'Değiştirmek istediğiniz şifre, eski şifreniz ile aynı.',
                'Enter Address Information':'Adres Bilgilerini Giriniz',
                'ABOUT US':'HAKKIMIZDA',
                'Signup for Download':'KMYS Programını İndirmek İçin Kayıt Olunuz',
                'Our Services':'Servislerimiz',
                'Temel Değerlerimiz':'Temel Değerlerimiz',
                'fill the form': 'Bize bir e-posta göndermek için lütfen aşağıdaki formu doldurun, en kısa sürede size geri döneceğiz.',
                'Get In Touch':'İletişim',
                'Address':'Adres',
                'Contact Info':'İletişim Bilgisi'







 
            }
        }
    },
    fallbackLng: 'tr',
    ns:['translations'],
    defaultNS: 'translations',
    keySeparator: false,
    interpolation: {
        escapeValue: false,
        formatSeparator: ','
    },
    react: {
        wait: true
    }
});

export default i18n;