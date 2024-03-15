

import uploadImage from '@/app/helpers/imageUpload';


describe('uploadImage', () => {
  it('should not allow duplicate images to be uploaded', async () => {
    const mockSetUploading = jest.fn();
    const mockSetAttachImages = jest.fn();

    const mockDataUrl = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUAAAAFCAYAAACNbyblAAAAHElEQVQI12P4//8/w38GIAXDIBKE0DHxgljNBAAO9TXL0Y4OHwAAAABJRU5ErkJggg==';

    const attachImages: string[] = [];
    await uploadImage({ setAttachImages: mockSetAttachImages, setUploading: mockSetUploading, attachImages });
    await uploadImage({ setAttachImages: mockSetAttachImages, setUploading: mockSetUploading, attachImages: [mockDataUrl] });

    expect(mockSetAttachImages.mock.calls.length).toBe(2);
    expect(mockSetAttachImages.mock.calls[1][0].length).toBe(1);
    expect(mockSetAttachImages.mock.calls[1][0][0]).toBe(mockDataUrl);
  });
});


