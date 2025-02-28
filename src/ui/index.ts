import { styled } from './styled';
export const Stack = styled('div');
export const Container = styled(Stack, {}, 'app container');
export const AnimatedImage = styled('img', {
  width: '400px',
  position: 'fixed',
  left: '-200px',
  top: '-200px',
  animation: 'rotate 12s linear infinite',
  animationDelay: '0s',
});
export const Panel = styled('nav', {}, 'panel');
export const PanelHeading = styled(
  'p',
  {
    position: 'relative',
    backgroundImage: 'linear-gradient(#161877, #0B0A46)',
    color: 'white',
    textAlign: 'center',
    borderRadius: '10px',
    border: '3px solid #BCBCC9',
    fontWeight: 300,
    lineHeight: 1.25,
    padding: '.5em .75em',
  },
  'panel-heading'
);
export const Figure = styled('figure', {
  width: '100px',
  height: '100px',
  marginRight: '1rem',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'contain',
});

export { styled };
