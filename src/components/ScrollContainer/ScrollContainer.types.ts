import React, { ReactNode } from 'react';

export interface ScrollContainerProps {
  propRef?: React.LegacyRef<HTMLDivElement> | undefined;
  children: ReactNode;
}
