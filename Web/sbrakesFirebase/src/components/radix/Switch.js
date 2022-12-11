import React from 'react';
import * as Switch from '@radix-ui/react-switch';
import './Switch.css';

export const SwitchComponent = ({ label, id, event, checked }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <label className="Label" htmlFor={id} style={{ paddingRight: 15 }}>
        {label}
      </label>
      <Switch.Root
        className="SwitchRoot"
        id={id}
        onCheckedChange={event}
        checked={checked}
      >
        <Switch.Thumb className="SwitchThumb" />
      </Switch.Root>
    </div>
  );
};
