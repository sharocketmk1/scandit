import React, { Component } from "react";
import PropTypes from "prop-types";
import { configure, BarcodePicker as ScanditSDKBarcodePicker } from "scandit-sdk";

configure("Af89/VdwSWUnBPcwliDrt3INUu9TRPN5iyaao0p7uap/XRxjXWd1VSB3PC5mejRobWgZwL4/AUE6fpoegzGK6URbkBR4SI+G5CvLmKkuLFNXGY0FKGyhJ51l+KqbToGI3V461ztMSpZqbtfCoS/omnJ79qrKL4+5v1+HXmAyA44KU3n2QF9j3dRDxumCQBB4xkPBQQloZqUMdb1U01l/Bh5cs6P9Xtl+6Vdu5y1g/wzZRmVqd3YjTihYSGj+fDufKW6nrxNQ9hXpW0Vd+2r5/eht/5ciRm3DQQpOl/9I2Nj1IH/NpUeY1WVVexVLVHuPrHaepmdctUyFU/lLHGmx4tlYf4RkS68XpFNsLZBLd6E1cZWg/FYSB1JXs/BXSwwWd1ftDmBxDFiwVo2El0xTvOAvRznlXfzwPHiarWZ6FUr6Wa89mGuCvGd3s1O2WXtom15dLT9t1LisOiWqzkvoBNJUTs/2USs4IGGEWMN+Oe43bcq1m15fbd8Qv4zjZJZ4CT75S4IWUurdFHy63Lv3JlYCsfxJBIkFJj+t88yyeCU9++tFfW6hRJSFfM6B9gsdxB296kwj8LQbHXFytIy566kaaUqDfp1OzpdFW5s8S947LHME5vkz2i0T7duiBhXaXOy+DlZMDW59OFqHmN4rcraODAovyP6Y0WEFXqjHHpW4jbCbL3J5x1ZsnJFcpeh2seGMtJMAGHILnqWHWG/9QCFKSq3D1JOonbJQouMTn5IuvoKfSPUQH5ZFmSopeuAChn+J8AJ8k+i7R74Sx7OeMqKnv/uyEmNvmk5Lc0Y40E1NR/Yw8nfCGI8W81+Q+jFChZnln+aG3gPrSuzKXY+Lm5uSdhV8eG7m3unb81mpqyJeTG2YnOfv4ErffctwcnwV47jCBVatChvT97lKMrIAQQNBU85xo4c4vmaouZ4zjjpbfFuMqEwwQqdTYB8uJt4+AakEQht6sajnHQ3bYDgIW1ggK/Jo8MIcDWKjYVA8ebReI8FClfOo54DZrnHZgCT9pfgqP1IHH+60Fvsb2qQ42TTOcHCSVH/je+VZZgoJRdk6QxmpB/7dA4sPeM/lVB5tJCokcD3CmZ3dq1lcKqetDvZwh/y47y98zgYftFcRyIMGoxbZo9Cgvg5yspfAwNh2HeS57qCZ3PoEumEIc7zmYpr5YtC3FrsRXlHIC2mBItVENJZoy68P1ppWcD0=", {
  engineLocation: "docs/",
  preloadEngineLibrary: true,
  preloadCameras: true
}).catch(error => {
  alert(error);
});

const style = {
  position: "absolute",
  top: "0",
  bottom: "0",
  left: "0",
  right: "0",
  margin: "auto",
  maxWidth: "1280px",
  maxHeight: "80%"
};

class BarcodePicker extends Component {
  static propTypes = {
    visible: PropTypes.bool,
    playSoundOnScan: PropTypes.bool,
    vibrateOnScan: PropTypes.bool,
    scanningPaused: PropTypes.bool,
    guiStyle: PropTypes.string,
    videoFit: PropTypes.string,
    scanSettings: PropTypes.object,
    enableCameraSwitcher: PropTypes.bool,
    enableTorchToggle: PropTypes.bool,
    enableTapToFocus: PropTypes.bool,
    enablePinchToZoom: PropTypes.bool,
    accessCamera: PropTypes.bool,
    camera: PropTypes.object,
    cameraSettings: PropTypes.object,
    targetScanningFPS: PropTypes.number,
    onScan: PropTypes.func,
    onError: PropTypes.func
  };

  constructor(props) {
    super(props);
    this.ref = React.createRef();
  }

  componentDidMount() {
    ScanditSDKBarcodePicker.create(this.ref.current, this.props).then(barcodePicker => {
      this.barcodePicker = barcodePicker;
      if (this.props.onScan != null) {
        barcodePicker.on("scan", this.props.onScan);
      }
      if (this.props.onError != null) {
        barcodePicker.on("scanError", this.props.onError);
      }
    });
  }

  componentWillUnmount() {
    if (this.barcodePicker != null) {
      this.barcodePicker.destroy();
    }
  }

  componentDidUpdate(prevProps) {
    if (JSON.stringify(prevProps.scanSettings) !== JSON.stringify(this.props.scanSettings)) {
      this.barcodePicker.applyScanSettings(this.props.scanSettings);
    }

    if (prevProps.visible !== this.props.visible) {
      this.barcodePicker.setVisible(this.props.visible);
    }
  }

  render() {
    return <div ref={this.ref} style={style} />;
  }
}

export default BarcodePicker;
