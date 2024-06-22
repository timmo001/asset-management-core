let mockImages = [
  "https://utfs.io/f/079fe122-f29c-4f53-9316-cc344ac5c82f-5nw3rt.png",
  "https://utfs.io/f/bcdf2cba-a07a-4d5d-bd26-e8db15a087ef-kc0ia5.png",
  "https://utfs.io/f/c4d353eb-91de-4970-b726-0d590cd5a3df-se5sys.png",
  "https://utfs.io/f/dafd034c-b1b3-4811-9151-e43c537d7014-e6hk9p.png",
];
mockImages = [...mockImages, ...mockImages, ...mockImages, ...mockImages];

export default function HomePage() {
  return (
    <>
      <h1 className="text-5xl font-light drop-shadow-xl">Asset Management</h1>

      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
        {mockImages.map((image, index) => (
          <div
            key={index}
            className="w-64 transform shadow-lg transition duration-300 hover:scale-105"
          >
            <img src={image} className="rounded-lg" />
          </div>
        ))}
      </div>
    </>
  );
}
