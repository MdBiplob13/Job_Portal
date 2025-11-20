const hostPhoto = async (photo) => {
  const photoData = new FormData();
  photoData.append("file", photo);
  photoData.append("upload_preset", "test-upload");
  photoData.append("cloud_name", "dqeuy96cs");

  try {
    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dqeuy96cs/image/upload",
      {
        method: "POST",
        body: photoData,
      },
    );

    const data = await response.json();
    return data?.url;
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
export default hostPhoto;