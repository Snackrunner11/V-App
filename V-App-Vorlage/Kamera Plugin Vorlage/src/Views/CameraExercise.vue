<template>
  <div class="app-container">
    <h1>Kamera Plugin Übung</h1>
    <div class="button-group">
      <button @click="takePhoto">Foto aufnehmen</button>
      <button @click="pickImage">Bild aus Galerie</button>
    </div>
    
    <div class="image-preview">
      <img v-if="imageUrl" :src="imageUrl" alt="Vorschau" />
      <p v-else>Noch kein Bild vorhanden</p>
    </div>
  </div>
</template>

<script setup>
//Offizielle Dokumentation für das Filesystem Plugin:
// https://capacitorjs.com/docs/apis/filesystem

//Offizielle Dokumentation für das Camera Plugin:
// https://capacitorjs.com/docs/apis/camera

import { ref } from 'vue';
// TODO: Importiere die benötigten Module von @capacitor/camera
// TODO: Importiere die benötigten Module von @capacitor/filesystem

const imageUrl = ref(null);

const takePhoto = async () => {
  // TODO: Aufgabe 1
  // 1. Rufe Camera.getPhoto auf.
  // 2. Setze den resultType auf Uri und die source auf Camera.
  // 3. Speichere den webPath des Fotos in der Variablen imageUrl.value.
};

const pickImage = async () => {
  // TODO: Aufgabe 2
  // 1. Rufe Camera.getPhoto auf.
  // 2. Setze die source auf Photos.
  // 3. Speichere den webPath des Fotos in der Variablen imageUrl.value.
};

const saveImageToFilesystem = async (photo) => {
  // TODO: Bonusaufgabe
  // 1. Lese die Datei über den webPath als Blob ein.
  // 2. Wandle den Blob in einen Base64 String um.
  // 3. Nutze Filesystem.writeFile, um das Bild lokal zu speichern.
};
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
  gap: 10px;
  flex-direction: column;
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