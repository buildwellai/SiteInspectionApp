import * as React from 'react';
import * as ReactNativeScript from 'react-nativescript';
import { MainStack } from './components/MainStack';
import { ErrorBoundary } from './components/ErrorBoundary';

// Controls react-nativescript log verbosity.
Object.defineProperty(global, '__DEV__', { value: false });

ReactNativeScript.start(
  React.createElement(
    ErrorBoundary,
    {},
    React.createElement(MainStack, {}, null)
  )
);