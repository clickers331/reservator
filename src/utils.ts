import type { AllRandezvous, Rendezvous } from "./data/mockDatabase";
import Chance from "chance";

const monthNamesTR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

const dayNamesTR = [
  "Pazartesi",
  "Salı",
  "Çarşamba",
  "Perşembe",
  "Cuma",
  "Cumartesi",
  "Pazar",
];

const monthNamesURL = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "june",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

function flattenObjectSimple<T>(object: object): T[] {
  const flattenedObject: any[] = [];
  Object.values(object).map((value) => flattenedObject.push(...value));
  return flattenedObject as T[];
}

function getWeekNo(date: string | Date): number {
  const currentDate: Date = new Date(date);
  const startDate: Date = new Date(currentDate.getFullYear(), 0, 1);
  const days: number = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (24 * 60 * 60 * 1000)
  );

  const weekNumber: number = Math.ceil(days / 7);
  return weekNumber;
}

function createAllRendezvous(
  startYear: number,
  yearCount: number = 1
): AllRandezvous {
  let allRendezvous: AllRandezvous = {};
  const chance = new Chance();
  for (let i = 0; i < yearCount; i++) {
    const currentFullYear: number = startYear + yearCount - 1;
    const currentYear: Rendezvous[][] = [];
    for (let j = 0; j < 12; i++) {
      const currentMonth: Rendezvous[] = [];
      for (let k = 0; k < new Date(currentFullYear, j, 0).getDate(); k++) {
        currentMonth.push({
          date: new Date(currentFullYear, j, k),
          name: chance.name(),
          cancelled: chance.bool(),
          uid: chance.guid(),
        });
      }
      currentYear.push(currentMonth);
    }
    allRendezvous[currentFullYear] = currentYear;
  }
  return allRendezvous;
}

const authCodes = {
  "admin-restricted-operation": "Bu işlem yalnızca yöneticilere kısıtlıdır.",
  "argument-error": "",
  "app-not-authorized":
    "Barındırıldığı alan adı ile belirlenen bu uygulama, sağlanan API anahtarı ile Firebase Kimlik Doğrulamayı kullanma yetkisine sahip değildir. Google API konsolunda anahtar yapılandırmanızı gözden geçirin.",
  "app-not-installed":
    "Sağlanan tanımlayıcıya (Android paket ismi veya iOS paket ID) karşılık gelen istenen mobil uygulama, bu cihaza yüklenmemiş.",
  "captcha-check-failed":
    "Sağlanan reCAPTCHA yanıt belirteci ya geçersiz, süresi dolmuş, zaten kullanılmış veya bununla ilişkilendirilen alan adı beyaz listeye alınmış alan adları listesiyle eşleşmiyor.",
  "code-expired":
    "SMS kodunun süresi doldu. Lütfen doğrulama kodunu tekrar gönderin ve yeniden deneyin.",
  "cordova-not-ready": "Cordova çerçevesi hazır değil.",
  "cors-unsupported": "Bu tarayıcı desteklenmiyor.",
  "credential-already-in-use":
    "Bu kimlik bilgisi zaten farklı bir kullanıcı hesabıyla ilişkilendirildi.",
  "custom-token-mismatch": "Özel belirteç, farklı bir hedefe karşılık geliyor.",
  "requires-recent-login":
    "Bu işlem hassas bir işlem ve son zamanlarda gerçekleştirilen kimlik doğrulamayı gerektirir. Bu isteği yeniden denemeden önce tekrar oturum açın.",
  "dynamic-link-not-activated":
    "Lütfen Firebase Konsol'da Dinamik Bağlantıları etkinleştirin ve şartlar ve koşulları kabul edin.",
  "email-change-needs-verification":
    "Çok faktörlü kullanıcıların her zaman doğrulanmış bir e-postaları olmalıdır.",
  "email-already-in-use":
    "E-posta adresi zaten başka bir hesap tarafından kullanılıyor.",
  "expired-action-code": "Eylem kodunun süresi doldu.",
  "cancelled-popup-request":
    "Başka bir çelişkili açılış penceresi açıldığı için bu işlem iptal edildi.",
  "internal-error": "Bir dahili hata oluştu.",
  "invalid-app-credential":
    "Telefon doğrulama isteği, geçersiz bir uygulama doğrulayıcı içeriyor. reCAPTCHA belirteç yanıtı ya geçersiz ya da süresi dolmuş.",
  "invalid-app-id": "Mobil uygulama kimliği, mevcut proje için kayıtlı değil.",
  "invalid-user-token":
    "Bu kullanıcının kimlik bilgisi, bu proje için geçerli değil. Bu, kullanıcının belirtecinin bozulması durumunda veya kullanıcı bu API anahtarına bağlı projede değilse olabilir.",
  "invalid-auth-event": "Bir dahili hata oluştu.",
  "invalid-verification-code":
    "Telefon kimlik doğrulama bilgisi oluşturmak için kullanılan SMS doğrulama kodu geçersiz. Lütfen doğrulama kodu SMS'ini yeniden gönderin ve kullanıcının sağladığı doğrulama kodunu kullanmaya özen gösterin.",
  "invalid-continue-uri": "İsteğinde sağlanan devam URL'si geçersiz.",
  "invalid-cordova-configuration":
    "OAuth oturum açmayı etkinleştirmek için aşağıdaki Cordova eklentilerinin yüklenmesi gerekir: cordova-plugin-buildinfo, cordova-universal-links-plugin, cordova-plugin-browsertab, cordova-plugin-inappbrowser and cordova-plugin-customurlscheme.",
  "invalid-custom-token":
    "Özel belirteç formatı yanlış. Lütfen belgeleri kontrol edin.",
  "invalid-dynamic-link-domain":
    "Sağlanan dinamik bağlantı alanı, mevcut proje için yapılandırılmamış veya yetkilendirilmemiştir.",
  "invalid-email": "E-posta adresi düzgün bir biçimde biçimlendirilmemiş.",
  "invalid-api-key":
    "API anahtarınız geçersiz, lütfen doğru bir şekilde kopyaladığınızı kontrol edin.",
  "invalid-cert-hash": "Sağlanan SHA-1 sertifika hash'ı geçersiz.",
  "invalid-credential":
    "Sağlanan yetkilendirme bilgisi hatalı biçimlendirilmiş veya süresi dolmuş.",
  "invalid-message-payload":
    "Bu eylemi ifade eden e-posta şablonu, mesajında geçersiz karakterler içeriyor. Lütfen Firebase Konsol'daki Auth e-posta şablonları bölümüne giderek düzeltin.",
  "invalid-multi-factor-session":
    "İsteği, ilk faktörün başarılı oturum açma işlemine dair geçerli bir kanıt içermiyor.",
  "invalid-oauth-provider":
    "EmailAuthProvider bu işlem için desteklenmiyor. Bu işlem yalnızca OAuth sağlayıcılarını destekler.",
  "invalid-oauth-client-id":
    "Sağlanan OAuth istemci ID'si ya geçersiz ya da belirtilen API anahtarıyla eşleşmiyor.",
  "unauthorized-domain":
    "Bu alan adı, Firebase projeniz için OAuth işlemlerine yetkisi yok. Firebase konsoldan yetkili alan adları listesini düzenleyin.",
  "invalid-action-code":
    "Eylem kodu geçersiz. Bu, kodun hatalı, süresinin dolmuş olması veya kodun zaten kullanılmış olması durumunda olabilir.",
  "wrong-password": "Parola geçersiz veya kullanıcı bir parola koymamış.",
  "invalid-persistence-type":
    "Belirtilen persistence tipi geçerli değil. Yalnızca yerel, oturum veya hiçbiri olabilir.",
  "invalid-phone-number":
    "Sağlanan telefon numarası formatı yanlış. Telefon numarasını, E.164 formatına çözümlenebilecek bir formatda girin. E.164 telefon numaraları, [+][ülke kodu][abone numarası alan kodu dahil] formatında yazılır.",
  "invalid-provider-id": "Belirtilen sağlayıcı ID geçersiz.",
  "invalid-recipient-email":
    "Bu eylemi ifade eden e-posta şablonu, sağlanan alıcı e-posta adresi geçersiz olduğu için gönderilemedi.",
  "invalid-sender":
    "Bu eylemi ifade eden e-posta şablonu geçersiz bir gönderen e-posta veya ad içeriyor. Lütfen Firebase Konsol'daki Auth e-posta şablonları bölümüne giderek düzeltin.",
  "invalid-verification-id":
    "Telefon kimlik doğrulama bilgisi oluşturmak için kullanılan doğrulama ID'si geçersiz.",
  "invalid-tenant-id": "Auth örneği kiracı ID'si geçerli değil.",
  "multi-factor-info-not-found":
    "Kullanıcı, sağlanan tanımlayıcı ile eşleşen ikinci bir faktöre sahip değil.",
  "multi-factor-auth-required":
    "İkinci bir faktörün mülkiyetinin kanıtı, oturum açmayı tamamlamak için gereklidir.",
  "missing-android-pkg-name":
    "Android Uygulamasının yüklenmesi gerekiyorsa bir Android Paket Adı sağlanmalıdır.",
  "auth-domain-config-required":
    "firebase.initializeApp() çağırdığınızda authDomain dahil edildiğinden emin olun, Firebase konsoldan talimatları izleyerek.",
  "missing-app-credential":
    "Telefon doğrulama isteği, bir uygulama doğrulayıcı iddiası eksik. Bir reCAPTCHA yanıt belirteci sağlanmalıdır.",
  "missing-verification-code":
    "Telefon kimlik doğrulama bilgisi, boş bir SMS doğrulama koduyla oluşturuldu.",
  "missing-continue-uri": "İsteğinizde bir devam URL'si sağlanmalıdır.",
  "missing-iframe-start": "Dahili bir hata oluştu.",
  "missing-ios-bundle-id":
    "Bir App Store ID sağlanıyorsa bir iOS Paket ID'si sağlanmalıdır.",
  "missing-multi-factor-info": "İkinci faktör tanımlayıcısı sağlanmıyor.",
  "missing-multi-factor-session":
    "Bu talep, ilk faktör başarılı oturum açma işlemine dair bir kanıt içermiyor.",
  "missing-or-invalid-nonce":
    "İstek, geçerli bir nöns içermemektedir. Bu, sağlanan ham nönsonun SHA-256 hash'ının, ID belirteci yükü içindeki hash'le eşleşmemesi durumunda olur.",
  "missing-phone-number":
    "Doğrulama kodları göndermek için alıcıya ait bir telefon numarası sağlayın.",
  "missing-verification-id":
    "Telefon kimlik doğrulama bilgisi, boş bir doğrulama ID'siyle oluşturuldu.",
  "app-deleted": "FirebaseApp örneği silindi.",
  "account-exists-with-different-credential":
    "Aynı e-posta adresine sahip bir hesap zaten var, ancak farklı oturum açma kimlik bilgilerine sahip. Bu e-posta adresiyle ilişkili bir sağlayıcı ile oturum açın.",
  "network-request-failed":
    "Bir ağ hatası oluştu (zaman aşımı, kesintiye uğramış bağlantı veya ulaşılamaz sunucu gibi).",
  "no-auth-event": "Dahili bir hata oluştu.",
  "no-such-provider":
    "Kullanıcı, verilen sağlayıcıyla ilişkilendirilmiş bir hesaba bağlı değil.",
  "null-user":
    "Boş kullanıcı nesnesi, boş olmayan bir kullanıcı nesnesi gerektiren bir işlem için argüman olarak sağlandı.",
  "operation-not-allowed":
    "Verilen oturum açma sağlayıcı bu Firebase projesi için devre dışı bırakıldı. Firebase konsolda, Auth bölümünün oturum açma yöntemi sekmesini etkinleştirin.",
  "operation-not-supported-in-this-environment":
    'Bu işlem, bu uygulamanın çalıştığı ortamda desteklenmiyor. "location.protocol" http, https veya chrome-extension olmalı ve web depolaması etkin olmalı.',
  "popup-blocked":
    "Açılış penceresi ile bağlantı kurulamadı. Tarayıcı tarafından engellenmiş olabilir.",
  "popup-closed-by-user":
    "İşlem tamamlanmadan önce kullanıcı tarafından açılış penceresi kapatıldı.",
  "provider-already-linked":
    "Kullanıcı, verilen sağlayıcı için yalnızca bir kimliğe bağlanabilir.",
  "quota-exceeded": "Bu işlem için proje kotası aşıldı.",
  "redirect-cancelled-by-user":
    "Yönlendirme işlemi, tamamlanmadan önce kullanıcı tarafından iptal edildi.",
  "redirect-operation-pending":
    "Zaten bekleyen bir yönlendirme oturum açma işlemi var.",
  "rejected-credential":
    "İstek yanlış veya eşleşmeyen kimlik bilgileri içeriyor.",
  "second-factor-already-in-use": "İkinci faktör zaten bu hesapta kayıtlı.",
  "maximum-second-factor-count-exceeded":
    "Bir kullanıcıdaki ikinci faktörlerin maksimum izin verilen sayısı aşıldı.",
  "tenant-id-mismatch":
    "Sağlanan kiracı ID'si, Auth örneğin kiracı ID'siyle eşleşmiyor.",
  timeout: "İşlem zaman aşımına uğradı.",
  "user-token-expired":
    "Kullanıcının kimlik bilgisi artık geçerli değil. Kullanıcının tekrar oturum açması gerekiyor.",
  "too-many-requests":
    "Olağandışı aktivite nedeniyle bu cihazdan gelen tüm istekleri engelledik. Daha sonra tekrar deneyin.",
  "unauthorized-continue-uri":
    "Devam URL'sinin alan adı beyaz listeye alınmamış. Lütfen Firebase konsolunda alan adını beyaz listeye alın.",
  "unsupported-first-factor":
    "İkinci bir faktör kaydetme veya çoklu faktör hesabıyla oturum açma, desteklenen bir ilk faktörle oturum açmayı gerektirir.",
  "unsupported-persistence-type":
    "Mevcut ortam belirtilen kalıcılık tipini desteklemiyor.",
  "unsupported-tenant-operation":
    "Bu işlem çok kiracılı bir bağlamda desteklenmiyor.",
  "unverified-email": "İşlem doğrulanmış bir e-postayı gerektirir.",
  "user-cancelled": "Kullanıcı, uygulamanızın istediği izinleri vermedi.",
  "user-not-found":
    "Bu kimliğe karşılık gelen bir kullanıcı kaydı yok. Kullanıcı silinmiş olabilir.",
  "user-disabled":
    "Kullanıcı hesabı bir yönetici tarafından devre dışı bırakıldı.",
  "user-mismatch":
    "Sağlanan kimlik bilgileri, önceden oturum açan kullanıcıya karşılık gelmiyor.",
  "user-signed-out": "",
  "weak-password": "Şifre 6 karakter veya daha fazla olmalı.",
  "web-storage-unsupported":
    "Bu tarayıcı desteklenmiyor veya 3. parti çerezler ve veriler devre dışı bırakılmış olabilir.",
};

export {
  createAllRendezvous,
  getWeekNo,
  flattenObjectSimple,
  monthNamesTR,
  monthNamesURL,
  dayNamesTR,
  authCodes,
};
