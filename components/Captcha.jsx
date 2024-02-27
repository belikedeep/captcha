export default function Captcha() {
  const imageLocations = new Array(9).fill(null).map((value, index) => {
    return `/api/captcha-image?index=${index}`;
  });
  return (
    <div className="captcha">
      <h2>Select all dogs:</h2>
      <div className="captcha-images">
        {imageLocations.map((imageUrl) => (
          <div>
            <img src={imageUrl} alt="" />
          </div>
        ))}
      </div>
    </div>
  );
}
