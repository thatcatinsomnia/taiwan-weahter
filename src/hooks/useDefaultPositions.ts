import { useMediaQuery } from 'react-responsive';

const TAIWAN_POSITION_MOBILE = {
  x: 0,
  y: 0,
  z: 0
};

const TAIWAN_POSITION_TABLET_PROTRAIT = {
  x: 0,
  y: 0,
  z: 0
};

const TAIWAN_POSITION_TABLET_LANDSCAPE = {
  x: 0.8,
  y: 0.2,
  z: 0
};

const TAIWAN_POSITION_DESKTOP = {
  x: 0.8,
  y: 0.2,
  z: 0
};

const TAIWAN_POSITION_LARGE_SCREEN = {
  x: 1,
  y: 0.1,
  z: 0
};

const CAMERA_POSITION_MOBILE = {
  x: 0,
  y: 0,
  z: 5
};

const CAMERA_POSITION_TABLET_PROTRAIT = {
  x: 0,
  y: 0,
  z: 4.8
};

const CAMERA_POSITION_TABLET_LANDSCAPE = {
  x: 0,
  y: 0,
  z: 4.8
};

const CAMERA_POSITION_DESKTOP = {
  x: 0,
  y: 0,
  z: 3.8
};

const CAMERA_POSITION_LARGE_SCREEN = {
  x: 0,
  y: 0,
  z: 3.8
};

const CAMERA_OFFSET_MOBILE = {
  x: 0,
  y: -1.3,
  z: 0.8
};

const CAMERA_OFFSET_TABLET_PROTRAIT = {
  x: 0,
  y: -1.3,
  z: 0.8
};

const CAMERA_OFFSET_TABLET_LANDSCAPE = {
  x: 0.3,
  y: -1.3,
  z: 0.8
};

const CAMERA_OFFSET_DESKTOP = {
  x: 0.4,
  y: -1,
  z: 0.8
};

const CAMERA_OFFSET_LARGE_SCREEN = {
  x: 0.6,
  y: -1,
  z: 0.8
};

const CAMERA_RX = 1.18;

const ICON_Z = 5;

export default function useDefaultPositions() {
  const isMobile = useMediaQuery({ maxWidth: '600px' });
  const isTablet = useMediaQuery({ maxWidth: '1366px' });
  const isProtrait = useMediaQuery({ orientation: 'portrait' });
  const isLandScape = useMediaQuery({ orientation: 'landscape' });
  const isDesktop = useMediaQuery({ maxWidth: '1600px' });

  if (isMobile) {
    return {
      taiwan: {
        position: TAIWAN_POSITION_MOBILE
      },
      camera: {
        position: CAMERA_POSITION_MOBILE,
        offset: CAMERA_OFFSET_MOBILE,
        rx: CAMERA_RX
      },
      iconZ: ICON_Z
    };
  }

  // return mobile position if user is using tablet in protrait mode to center the 3d model
  if (isProtrait && isTablet) {
    return {
      taiwan: {
        position: TAIWAN_POSITION_TABLET_PROTRAIT
      },
      camera: {
        position: CAMERA_POSITION_TABLET_PROTRAIT,
        offset: CAMERA_OFFSET_TABLET_PROTRAIT,
        rx: CAMERA_RX
      },
      iconZ: ICON_Z
    }; 
  }

  if (isLandScape && isTablet) {
    return {
      taiwan: {
        position: TAIWAN_POSITION_TABLET_LANDSCAPE
      },
      camera: {
        position: CAMERA_POSITION_TABLET_LANDSCAPE,
        offset: CAMERA_OFFSET_TABLET_LANDSCAPE,
        rx: CAMERA_RX
      },
      iconZ: ICON_Z
    }; 
  }

  if (isDesktop) {
    return {
      taiwan: {
        position: TAIWAN_POSITION_DESKTOP
      },
      camera: {
        position: CAMERA_POSITION_DESKTOP,
        offset: CAMERA_OFFSET_DESKTOP,
        rx: CAMERA_RX
      },
      iconZ: ICON_Z
    };
  }

  // fallback to large screen
  return {
    taiwan: {
      position: TAIWAN_POSITION_LARGE_SCREEN
    },
    camera: {
      position: CAMERA_POSITION_LARGE_SCREEN,
      offset: CAMERA_OFFSET_LARGE_SCREEN,
      rx: CAMERA_RX
    },
    iconZ: ICON_Z
  };
}