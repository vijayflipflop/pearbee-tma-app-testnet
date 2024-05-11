import { useEffect, useState } from "react";
import defaultImgSrc from "assets/images/user.png";

const ImageFallback = (props) => {
  const { src, onClick, width, height, fallbackSrc, loading, ...rest } = props;
  // const imageUrl = process.env.REACT_APP_IMAGE_URL;
  const [imgSrc, setImgSrc] = useState(src);

  useEffect(() => {
    setImgSrc(src);
  }, [src]);

  return (
    <img
      {...rest}
      src={imgSrc}
      onError={() => {
        const defaultImg =
          fallbackSrc !== undefined ? fallbackSrc : defaultImgSrc;
        setImgSrc(defaultImg);
      }}
      // onLoadingComplete={(result) => {
      //     if (result.naturalWidth === 0) {
      //         // Broken image
      //         const loadImageSrc = fallbackSrc !== undefined ? fallbackSrc : defaultImgSrc;
      //         setImgSrc(loadImageSrc);
      //     }
      // }}
      onLoad={loading}
      onClick={onClick}
      className={width}
      width={width}
      height={height}
    />
  );
};

export default ImageFallback;
