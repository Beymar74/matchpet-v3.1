export const uploadToCloudinary = async (file: File): Promise<string | null> => {
  const cloudName = "dsblosz1l";
  const uploadPreset = "matchpet_mascotas"; 
  const folder = "matchpet_mascotas";

  const url = `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);
  formData.append("folder", folder);

  try {
    const response = await fetch(url, {
      method: "POST",
      body: formData,
    });

    const data = await response.json();

    if (data.secure_url) {
      return data.secure_url;
    } else {
      console.error("Error en respuesta Cloudinary:", data);
      return null;
    }
  } catch (error) {
    console.error("Error al subir a Cloudinary:", error);
    return null;
  }
};
