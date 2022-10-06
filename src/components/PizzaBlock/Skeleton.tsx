import React from 'react';
import ContentLoader from 'react-content-loader';

const Skeleton = () => (
  <ContentLoader
    className="pizza-block"
    speed={2}
    width={280}
    height={466}
    viewBox="0 0 280 466"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb">
    <circle cx="139" cy="127" r="122" />
    <rect x="1" y="263" rx="8" ry="8" width="280" height="27" />
    <rect x="1" y="309" rx="16" ry="16" width="280" height="88" />
    <rect x="2" y="410" rx="19" ry="19" width="90" height="36" />
    <rect x="110" y="411" rx="15" ry="15" width="171" height="36" />
  </ContentLoader>
);

export default Skeleton;
