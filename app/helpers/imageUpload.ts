import { compressImage } from "../utils";

type CompressAndUploadImages = {
  files: any
  maxImages?: number
  maxSize?: number
  setUploading: (val:boolean) => void
}



const compressAndUploadImages = async ({files, maxImages = 3, maxSize = 256 * 1024, setUploading}:CompressAndUploadImages) => {
    setUploading(true);
    const imagesData = [];
    for (let i = 0; i < files.length; i++) {
      try {
        const dataUrl = await compressImage(files[i], maxSize);
        imagesData.push(dataUrl);
        if (imagesData.length === maxImages || imagesData.length === files.length) {
          setUploading(false);
          
        }
        return imagesData;
      } catch (e) {
        setUploading(false);
        throw e;
      }
    }
  };

  type OpenFileInput = {
    setAttachImages: (images:string[]) => void,
    setUploading: (val:boolean) => void
    attachImages: string[]
  }
  
  const openFileInput = ({setAttachImages, setUploading, attachImages}: OpenFileInput) => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/png, image/jpeg, image/webp, image/heic, image/heif';
    fileInput.multiple = true;
    fileInput.onchange = (event: any) => handleFileInputChange({files: event.target.files, setAttachImages, setUploading, attachImages});
    fileInput.click();
  };

  type HandleFileInputChange = {
    setAttachImages: (images:string[]) => void,
    setUploading: (val:boolean) => void
    files: any
    attachImages: string[]
  }
  
  const handleFileInputChange = async ({files, setAttachImages, setUploading, attachImages}:HandleFileInputChange) => {
    try {
      const imagesData = await compressAndUploadImages({ files, setUploading}) as string[]
      const newImages = [...attachImages, ...imagesData];
      const setWithNoDuplicates = new Set(newImages);
      if (newImages.length > 3) {
        newImages.splice(3, newImages.length - 3);
      }
      setAttachImages([...setWithNoDuplicates]);
    } catch (e) {
      console.error('Error uploading images:', e);
    }
  };
  
  const uploadImage = ({setAttachImages, setUploading, attachImages}:OpenFileInput) => {
    openFileInput({ setAttachImages, setUploading, attachImages});
  };

  export default uploadImage
  