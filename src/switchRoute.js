import React from 'react';

export function Route(props) {
  const currentPath = window.location.pathname;

  if (props.path === currentPath) {
    return props.element;
  } else {
    return null;
  }
}