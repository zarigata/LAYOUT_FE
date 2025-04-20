// CODEX: Feverducation AnimatedButton (reusable, eye-catching, i18n-ready)
import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/system';

const GlowingButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(90deg, #ff512f 0%, #dd2476 100%)',
  color: '#fff',
  fontWeight: 700,
  fontSize: '1.1rem',
  boxShadow: '0 0 16px 2px #ff512f55',
  borderRadius: 16,
  padding: '0.7em 2.2em',
  transition: 'transform 0.12s, box-shadow 0.12s',
  position: 'relative',
  overflow: 'hidden',
  '&:hover': {
    transform: 'scale(1.06) rotate(-1deg)',
    boxShadow: '0 0 32px 8px #dd247655',
    background: 'linear-gradient(90deg, #dd2476 0%, #ff512f 100%)',
  },
  '&:active': {
    transform: 'scale(0.97)',
  },
}));

const AnimatedButton: React.FC<ButtonProps> = (props) => {
  return <GlowingButton {...props}>{props.children}</GlowingButton>;
};

export default AnimatedButton;
