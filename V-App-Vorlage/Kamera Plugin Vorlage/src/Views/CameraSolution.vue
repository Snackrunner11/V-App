<template>
  <div class="app-container">
    <h1>Kamera Plugin Lösung</h1>
    <div class="button-group">
      <button @click="takePhoto">Foto aufnehmen</button>
      <button @click="pickImage">Bild aus Galerie</button>
    </div>
    
    <div class="image-preview">
      <img v-if="imageUrl" :src="imageUrl" alt="Anzeige" />
      <p v-else>Kein Bild vorhanden</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Filesystem, Directory } from '@capacitor/filesystem';

// Die reaktive Variable speichert den Pfad des Bildes für die Benutzeroberfläche.
const imageUrl = ref(null);

// Lösung zu Aufgabe 1: Foto aufnehmen
const takePhoto = async () => {
  try {
    // Die Methode getPhoto öffnet die Kamera des Geräts.
    const photo = await Camera.getPhoto({
      // resultType Uri liefert einen Pfad zurück, den der Browser direkt im img Tag anzeigen kann.
      resultType: CameraResultType.Uri,
      // CameraSource.Camera erzwingt, dass direkt ein neues Foto gemacht wird.
      source: CameraSource.Camera,
      quality: 90
    });
    
    // Der zurückgegebene webPath wird der reaktiven Variablen zugewiesen.
    // Vue aktualisiert daraufhin automatisch das Bild auf dem Bildschirm.
    imageUrl.value = photo.webPath;
    
    // Aufruf der Bonusaufgabe: Das temporäre Bild wird nun fest gespeichert.
    await saveImageToFilesystem(photo);
  } catch (error) {
    console.error('Fehler bei der Kameraaufnahme:', error);
  }
};

// Lösung zu Aufgabe 2: Bild aus der Galerie wählen
const pickImage = async () => {
  try {
    // Die Methode wird erneut aufgerufen, diesmal mit einer anderen Quelle.
    const photo = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      // CameraSource.Photos öffnet die bestehende Fotogalerie des Geräts anstelle der Kamera.
      source: CameraSource.Photos,
      quality: 90
    });
    
    // Speichern des Pfades für die sofortige Anzeige auf dem Bildschirm.
    imageUrl.value = photo.webPath;
    
    // Aufruf der Bonusaufgabe: Das ausgewählte Bild wird fest gespeichert.
    await saveImageToFilesystem(photo);
  } catch (error) {
    console.error('Fehler bei der Bildauswahl:', error);
  }
};

// Lösung zur Bonusaufgabe: Bild im Dateisystem sichern
const saveImageToFilesystem = async (photo) => {
  try {
    // Der webPath ist nur temporär. Das Bild muss zuerst heruntergeladen werden.
    // fetch holt die Datei über den temporären Pfad.
    const response = await fetch(photo.webPath);
    
    // Die Antwort wird in ein rohes binäres Dateiformat (Blob) umgewandelt.
    const blob = await response.blob();
    
    // Das Capacitor Dateisystem benötigt Bilder oft als Text.
    // Die Hilfsfunktion wandelt die binären Daten in einen Base64 String um.
    const base64Data = await convertBlobToBase64(blob);

    // Es wird ein eindeutiger Dateiname erzeugt, basierend auf der aktuellen Uhrzeit in Millisekunden.
    const fileName = new Date().getTime() + '.jpeg';
    
    // writeFile schreibt die Base64 Daten als echte Datei in den Speicher.
    // Directory.Data sorgt dafür, dass die Datei im internen Speicher der App landet.
    await Filesystem.writeFile({
      path: fileName,
      data: base64Data,
      directory: Directory.Data
    });
    
    console.log('Bild erfolgreich gespeichert.');
  } catch (error) {
    console.error('Fehler beim Speichern im Dateisystem:', error);
  }
};

// Hilfsfunktion für die Umwandlung von Blob zu Base64
const convertBlobToBase64 = (blob) => new Promise((resolve, reject) => {
  const reader = new FileReader();
  reader.onerror = reject;
  reader.onload = () => {
    resolve(reader.result);
  };
  // readAsDataURL konvertiert die rohen Bilddaten in eine lange Zeichenkette (Base64).
  reader.readAsDataURL(blob);
});
</script>

<style scoped>
.app-container {
  max-width: 400px;
  margin: 0 auto;
  text-align: center;
  padding: 20px;
  font-family: sans-serif;
}
.button-group {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
button {
  padding: 10px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
.image-preview {
  margin-top: 20px;
  min-height: 200px;
  border: 2px solid #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.image-preview img {
  max-width: 100%;
}
</style>