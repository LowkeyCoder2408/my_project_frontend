'use client';
import { FacebookProvider, CustomChat } from 'react-facebook';

function FacebookMsg() {
  return (
    <FacebookProvider appId="438185165469297" chatSupport>
      <CustomChat pageId="332494889940621" minimized={false} />
    </FacebookProvider>
  );
}

export default FacebookMsg;
