import React, { useState, ChangeEvent, MouseEvent } from "react";
import axios from "axios";

interface CarForm {
  model: string;
  make: string;
  price: number;
  vin: string;
  stock: string;
  color: string;
  year: number;
  condition: string;
  miles: number;
  image: string;
}

const CreateCar: React.FC = () => {
  const [carForm, setCarForm] = useState<CarForm>({
    model: "",
    make: "",
    price: 0,
    vin: "",
    stock: "",
    color: "",
    year: 0,
    condition: "",
    miles: 0,
    image: "",
  });

  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const uploadImage = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    if (!file) return alert("Select a file first.");

    console.log("File Name: ", file.name);
    console.log("File Type: ", file.type);

    try {
      const { data } = await axios.get(
        `http://localhost:3000/image/upload-url?fileName=${file.name}&fileType=${file.type}`
      );

      const uploadUrl: string = data.uploadUrl;
      const key: string = data.key;

      console.log("Upload Url: ", uploadUrl);
      console.log("Key: ", key);

      await axios.put(uploadUrl, file, {
        headers: { "Content-Type": file.type },
      });

      console.log("Uploaded to S3!");
      setCarForm((prev) => ({ ...prev, image: key }));
    } catch (error) {
      console.error("Failed to upload image", error);
    }
  };

  const createCar = async (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/car/create",
        carForm
      );
      console.log("Car created", response.data);
    } catch (e) {
      console.error("Failed to create car", e);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-10 p-6 bg-white shadow rounded-lg">
      <h1 className="text-2xl font-semibold mb-4 text-gray-800">Create Car</h1>
      <form className="flex flex-col gap-4">
        <input
          type="file"
          onChange={handleFileChange}
          className="border p-2 rounded"
        />

        <button
          onClick={uploadImage}
          className="bg-blue-500 hover:bg-blue-600 text-white font-medium py-2 px-4 rounded transition"
        >
          Upload Image
        </button>

        <button
          onClick={createCar}
          className="bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded transition"
        >
          Create Car
        </button>
      </form>

      {carForm.image && (
        <p className="mt-2 text-sm text-gray-700">
          Image Key: <span className="font-mono">{carForm.image}</span>
        </p>
      )}
    </div>
  );
};

export default CreateCar;
