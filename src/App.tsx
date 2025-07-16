import React, { type ChangeEvent } from "react";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { getBase64 } from "./utils/encoding";

const App = () => {
  const [images, setImages] = useLocalStorage<string[]>("images", []);

  const onFileSelected = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const base64 = await getBase64(file);
        setImages([...images, base64]);
      } catch (error) {
        console.error(error);
        return;
      }
    }
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={onFileSelected} />
      {images.map((base64) => (
        <img src={base64} />
      ))}
    </div>
  );
};

export default App;
