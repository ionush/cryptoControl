import React, { Component } from 'react';
import { ART, LayoutAnimation, UIManager, Platform } from 'react-native';
import Morph from 'art/morph/path';
import * as shape from 'd3-shape';

const { Shape } = ART;

export default class AnimatePie extends Component {
  constructor(props) {
    super(props);
    this.state = {
      path: '',
    };
    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  componentWillMount() {
    this.computeNextState(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.computeNextState(nextProps);
  }

  // Animations based on: https://github.com/hswolff/BetterWeather
  computeNextState(nextProps) {
    const { d } = nextProps;
    const pie = this.props.d();
    // console.log('fuck', pie);
    this.setState({
      path: pie,
    });
    // console.log('pie state', this.state.path);

    // The first time this function is hit we need to set the initial
    // this.previousGraph value.
    if (!this.previousPie) {
      this.previousPie = pie;
    }

    // Only animate if our properties change. Typically this is when our
    // yAccessor function changes.
    if (this.previousPie !== pie) {
      const pathFrom = this.previousPie;
      const pathTo = pie;

      cancelAnimationFrame(this.animating);
      this.animating = null;

      // Opt-into layout animations so our y tickLabel's animate.
      // If we wanted more discrete control over their animation behavior
      // we could use the Animated component from React Native, however this
      // was a nice shortcut to get the same effect.
      LayoutAnimation.configureNext(LayoutAnimation.create(
        this.props.animationMs,
        LayoutAnimation.Types.easeInEaseOut,
        LayoutAnimation.Properties.opacity,
      ));
      this.setState(
        {
          // Create the ART Morph.Tween instance.
          path: Morph.Tween(pathFrom, pathTo),
        },
        () => {
          // Kick off our animations!
          this.animate();
        },
      );

      this.previousPie = pie;
    }
  }

  // This is where we animate our graph's path value.
  animate(start) {
    this.animating = requestAnimationFrame((timestamp) => {
      if (!start) {
        start = timestamp;
      }

      // Get the delta on how far long in our animation we are.
      const delta = (timestamp - start) / this.props.animationMs;

      // If we're above 1 then our animation should be complete.
      if (delta > 1) {
        this.animating = null;
        // Just to be safe set our final value to the new graph path.
        this.setState({ path: this.previousPie });
        // Stop our animation loop.
        return;
      }
      // Tween the SVG path value according to what delta we're currently at.

      try {
        this.state.path.tween(delta);
      } catch (e) {
        console.log('error in tween(delta)', e);
      }

      this.setState(this.state, () => {
        this.animate(start);
      });
    });
  }

  render() {
    const { path } = this.state;
    return (
      <Shape d={path} stroke="white" strokeWidth={this.props.strokeWidth} fill={this.props.fill} />
    );
  }
}
