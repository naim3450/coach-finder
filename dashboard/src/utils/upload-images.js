import axios from "axios";

export default async function uploadImageToCloudinary(file) {
  if (!file) {
    return {
      success: false,
      message: "No images provided!",
    };
  }

  const images = new FormData();
  images.append("images", file);

  try {
    const response = await axios.post(
      `https://media.coachfinder.app/api/v1/upload/image`,
      images
    );

    if (!response.data.success) {
      return {
        success: false,
        error: "Failed to upload images",
      };
    }

    return {
      success: true,
      data: response.data,
    };
  } catch (error) {
    console.error("Upload Error: ", error);
    return {
      success: false,
      error: error.message || "An error occurred while uploading images",
    };
  }
}
