import { useEffect, useState } from "react";
import defaultImgSrc from "assets/images/profile.png";

const ProfileImageFallback = (props) => {
  const { src, onClick, width, fallbackSrc, loading, ...rest } = props;
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
      onLoad={loading}
      onClick={onClick}
      className={width}
    />
  );
};

export default ProfileImageFallback;
