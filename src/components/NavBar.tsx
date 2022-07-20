import React from 'react';
import { ButtonClip } from './ButtonClip';
import { GoBackButton } from './GoBackButton';

export const NavBar = ({
  copyText,
  title
}: {
  copyText: string;
  title: string;
}) => {
  return (
    <div className="flex items-center justify-between">
      <GoBackButton />
      <h2 className="text-2xl font-bold text-white">{title}</h2>
      <ButtonClip copyText={copyText} />
    </div>
  );
};
