// Görüntü dosyaları için yardımcı fonksiyonlar

// Resim görüntülenemediğinde kullanılacak yedek resim
export const fallbackImage = "/placeholder.jpg";

// URL'in geçerli bir resim URL'i olup olmadığını kontrol eden fonksiyon
export const isValidImageUrl = (url) => {
  if (!url) return false;
  return url.match(/\.(jpeg|jpg|gif|png|webp)$/) !== null;
};

// Görüntü yükleme hatası durumunda yedek resmi kullanmak için olay işleyicisi
export const handleImageError = (event) => {
  event.target.src = fallbackImage;
};

// Resim URL'ini standart hale getirmek için kullanılan fonksiyon
export const normalizeImageUrl = (url) => {
  if (!url) return fallbackImage;

  // URL zaten https:// ile başlıyorsa, olduğu gibi kullan
  if (url.startsWith("https://")) {
    return url;
  }

  // URL http:// ile başlıyorsa, https:// ile değiştir
  if (url.startsWith("http://")) {
    return url.replace("http://", "https://");
  }

  // URL / ile başlıyorsa, bu bir göreceli yol olarak kabul edilir
  if (url.startsWith("/")) {
    return url;
  }

  // Hiçbir şema yoksa, göreceli bir yol olarak kabul et
  return `/${url}`;
};
